/**
 * نظام قاعدة البيانات الخارجية مع Firebase
 * يوفر حفظ واستعادة البيانات من السحابة
 */

class FirebaseDatabase {
    constructor() {
        this.isInitialized = false;
        this.isOnline = navigator.onLine;
        this.pendingOperations = [];
        this.setupEventListeners();
        this.initializeFirebase();
    }

    // تهيئة Firebase
    async initializeFirebase() {
        try {
            // إعدادات Firebase (يجب تخصيصها حسب مشروعك)
            const firebaseConfig = {
                apiKey: "AIzaSyD5Gq8IXwJJq0jlQnRYvF_XJVjNt9ZQyA8",
                authDomain: "monjiz-system.firebaseapp.com",
                databaseURL: "https://monjiz-system-default-rtdb.firebaseio.com",
                projectId: "monjiz-system",
                storageBucket: "monjiz-system.appspot.com",
                messagingSenderId: "123456789012",
                appId: "1:123456789012:web:abcdef1234567890abcdef"
            };

            // تحميل Firebase SDK
            if (!window.firebase) {
                await this.loadFirebaseSDK();
            }

            // تهيئة Firebase
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }

            this.database = firebase.database();
            this.auth = firebase.auth();
            this.isInitialized = true;

            console.log('✅ تم تهيئة Firebase بنجاح');
            
            // تسجيل دخول مجهول للمستخدمين
            await this.signInAnonymously();
            
            // معالجة العمليات المعلقة
            this.processPendingOperations();
            
        } catch (error) {
            console.error('❌ خطأ في تهيئة Firebase:', error);
            this.isInitialized = false;
        }
    }

    // تحميل Firebase SDK
    async loadFirebaseSDK() {
        return new Promise((resolve, reject) => {
            const scripts = [
                'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js',
                'https://www.gstatic.com/firebasejs/9.0.0/firebase-database-compat.js',
                'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js'
            ];

            let loadedCount = 0;
            
            scripts.forEach(src => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => {
                    loadedCount++;
                    if (loadedCount === scripts.length) {
                        resolve();
                    }
                };
                script.onerror = reject;
                document.head.appendChild(script);
            });
        });
    }

    // تسجيل دخول مجهول
    async signInAnonymously() {
        try {
            await this.auth.signInAnonymously();
            console.log('✅ تم تسجيل الدخول المجهول في Firebase');
        } catch (error) {
            console.error('❌ خطأ في تسجيل الدخول المجهول:', error);
        }
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncPendingOperations();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }

    // حفظ البيانات في Firebase
    async saveToFirebase(dataType, data) {
        if (!this.isInitialized || !this.isOnline) {
            // إضافة العملية للقائمة المعلقة
            this.pendingOperations.push({ type: 'save', dataType, data });
            console.log(`⏳ تم إضافة عملية حفظ ${dataType} للقائمة المعلقة`);
            return;
        }

        try {
            const userId = this.auth.currentUser?.uid || 'anonymous';
            const timestamp = new Date().toISOString();
            
            const dataToSave = {
                data: data,
                timestamp: timestamp,
                version: this.generateVersion(),
                userId: userId
            };

            await this.database.ref(`monjiz/${userId}/${dataType}`).set(dataToSave);
            console.log(`✅ تم حفظ ${dataType} في Firebase`);
            
        } catch (error) {
            console.error(`❌ خطأ في حفظ ${dataType} في Firebase:`, error);
            // إضافة العملية للقائمة المعلقة في حالة الفشل
            this.pendingOperations.push({ type: 'save', dataType, data });
        }
    }

    // استعادة البيانات من Firebase
    async restoreFromFirebase(dataType) {
        if (!this.isInitialized || !this.isOnline) {
            console.log(`⏳ Firebase غير متاح، لا يمكن استعادة ${dataType}`);
            return null;
        }

        try {
            const userId = this.auth.currentUser?.uid || 'anonymous';
            const snapshot = await this.database.ref(`monjiz/${userId}/${dataType}`).once('value');
            
            if (snapshot.exists()) {
                const result = snapshot.val();
                console.log(`✅ تم استعادة ${dataType} من Firebase`);
                return result.data;
            } else {
                console.log(`ℹ️ لا توجد بيانات ${dataType} في Firebase`);
                return null;
            }
            
        } catch (error) {
            console.error(`❌ خطأ في استعادة ${dataType} من Firebase:`, error);
            return null;
        }
    }

    // حفظ جميع البيانات
    async saveAllData() {
        const dataTypes = [
            'Products', 'Customers', 'Suppliers', 'Sales', 
            'Purchases', 'Accounts', 'StockMovements',
            'CompanySettings', 'UserSettings', 'SystemSettings'
        ];

        for (const dataType of dataTypes) {
            const data = this.getLocalData(dataType);
            if (data) {
                await this.saveToFirebase(dataType, data);
            }
        }

        // حفظ بيانات تسجيل الدخول (مشفرة)
        const loginData = this.getEncryptedLoginData();
        if (loginData) {
            await this.saveToFirebase('LoginData', loginData);
        }
    }

    // استعادة جميع البيانات
    async restoreAllData() {
        const dataTypes = [
            'Products', 'Customers', 'Suppliers', 'Sales', 
            'Purchases', 'Accounts', 'StockMovements',
            'CompanySettings', 'UserSettings', 'SystemSettings'
        ];

        let restoredCount = 0;

        for (const dataType of dataTypes) {
            const data = await this.restoreFromFirebase(dataType);
            if (data) {
                this.setLocalData(dataType, data);
                restoredCount++;
            }
        }

        // استعادة بيانات تسجيل الدخول
        const loginData = await this.restoreFromFirebase('LoginData');
        if (loginData) {
            this.setDecryptedLoginData(loginData);
            restoredCount++;
        }

        console.log(`✅ تم استعادة ${restoredCount} نوع من البيانات من Firebase`);
        return restoredCount > 0;
    }

    // الحصول على البيانات المحلية
    getLocalData(dataType) {
        const key = `monjiz${dataType}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // تعيين البيانات المحلية
    setLocalData(dataType, data) {
        const key = `monjiz${dataType}`;
        localStorage.setItem(key, JSON.stringify(data));
    }

    // الحصول على بيانات تسجيل الدخول المشفرة
    getEncryptedLoginData() {
        const users = localStorage.getItem('monjizUsers');
        const userSettings = localStorage.getItem('monjizUserSettings');
        
        if (users || userSettings) {
            const loginData = {
                users: users ? JSON.parse(users) : [],
                userSettings: userSettings ? JSON.parse(userSettings) : {}
            };
            
            // تشفير البيانات
            return this.encryptData(JSON.stringify(loginData));
        }
        
        return null;
    }

    // تعيين بيانات تسجيل الدخول المفكوكة التشفير
    setDecryptedLoginData(encryptedData) {
        try {
            const decryptedData = this.decryptData(encryptedData);
            const loginData = JSON.parse(decryptedData);
            
            if (loginData.users) {
                localStorage.setItem('monjizUsers', JSON.stringify(loginData.users));
            }
            
            if (loginData.userSettings) {
                localStorage.setItem('monjizUserSettings', JSON.stringify(loginData.userSettings));
            }
            
        } catch (error) {
            console.error('❌ خطأ في فك تشفير بيانات تسجيل الدخول:', error);
        }
    }

    // تشفير البيانات
    encryptData(data) {
        // تشفير بسيط باستخدام Base64 (يمكن تحسينه)
        return btoa(unescape(encodeURIComponent(data)));
    }

    // فك تشفير البيانات
    decryptData(encryptedData) {
        // فك تشفير Base64
        return decodeURIComponent(escape(atob(encryptedData)));
    }

    // توليد رقم إصدار
    generateVersion() {
        return Date.now().toString();
    }

    // معالجة العمليات المعلقة
    async processPendingOperations() {
        if (this.pendingOperations.length === 0) return;
        
        console.log(`🔄 معالجة ${this.pendingOperations.length} عملية معلقة...`);
        
        const operations = [...this.pendingOperations];
        this.pendingOperations = [];
        
        for (const operation of operations) {
            if (operation.type === 'save') {
                await this.saveToFirebase(operation.dataType, operation.data);
            }
        }
    }

    // مزامنة العمليات المعلقة
    async syncPendingOperations() {
        if (this.isOnline && this.isInitialized) {
            await this.processPendingOperations();
        }
    }

    // تدمير النظام
    destroy() {
        if (this.auth) {
            this.auth.signOut();
        }
    }
}

// إنشاء نظام قاعدة البيانات
const firebaseDatabase = new FirebaseDatabase();
window.firebaseDatabase = firebaseDatabase;