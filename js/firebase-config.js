// تكوين Firebase لنظام منجز
class FirebaseManager {
    constructor() {
        this.config = {
            apiKey: "AIzaSyD5Gq8IXwJJq0jlQnRYvF_XJVjNt9ZQyA8",
            authDomain: "monjiz-system.firebaseapp.com",
            databaseURL: "https://monjiz-system-default-rtdb.firebaseio.com",
            projectId: "monjiz-system",
            storageBucket: "monjiz-system.appspot.com",
            messagingSenderId: "123456789012",
            appId: "1:123456789012:web:abcdef1234567890abcdef"
        };
        this.isInitialized = false;
        this.isOnline = navigator.onLine;
        this.pendingOperations = [];
        this.init();
    }

    // تهيئة Firebase
    async init() {
        try {
            // تحميل Firebase SDK
            await this.loadFirebaseSDK();
            
            // تهيئة Firebase
            if (!firebase.apps.length) {
                firebase.initializeApp(this.config);
            }
            
            this.db = firebase.firestore();
            this.auth = firebase.auth();
            this.storage = firebase.storage();
            
            this.isInitialized = true;
            console.log('✅ تم تهيئة Firebase بنجاح');
            
            // تنفيذ العمليات المعلقة
            this.processPendingOperations();
            
        } catch (error) {
            console.error('❌ خطأ في تهيئة Firebase:', error);
            this.fallbackToLocalStorage();
        }
    }

    // تحميل Firebase SDK
    async loadFirebaseSDK() {
        return new Promise((resolve, reject) => {
            if (typeof firebase !== 'undefined') {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
            script.onload = () => {
                const firestoreScript = document.createElement('script');
                firestoreScript.src = 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';
                firestoreScript.onload = () => {
                    const authScript = document.createElement('script');
                    authScript.src = 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
                    authScript.onload = resolve;
                    authScript.onerror = reject;
                    document.head.appendChild(authScript);
                };
                firestoreScript.onerror = reject;
                document.head.appendChild(firestoreScript);
            };
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    // حفظ البيانات في Firebase
    async saveToFirebase(collection, data, docId = null) {
        if (!this.isInitialized || !this.isOnline) {
            this.pendingOperations.push({ type: 'save', collection, data, docId });
            return false;
        }

        try {
            const docRef = docId 
                ? this.db.collection(collection).doc(docId)
                : this.db.collection(collection).doc();
            
            await docRef.set({
                ...data,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                lastModified: new Date().toISOString()
            });
            
            console.log(`✅ تم حفظ البيانات في Firebase: ${collection}`);
            return true;
        } catch (error) {
            console.error(`❌ خطأ في حفظ البيانات في Firebase:`, error);
            this.pendingOperations.push({ type: 'save', collection, data, docId });
            return false;
        }
    }

    // استرجاع البيانات من Firebase
    async getFromFirebase(collection, docId = null) {
        if (!this.isInitialized || !this.isOnline) {
            return null;
        }

        try {
            if (docId) {
                const doc = await this.db.collection(collection).doc(docId).get();
                return doc.exists ? doc.data() : null;
            } else {
                const snapshot = await this.db.collection(collection).get();
                const data = [];
                snapshot.forEach(doc => {
                    data.push({ id: doc.id, ...doc.data() });
                });
                return data;
            }
        } catch (error) {
            console.error(`❌ خطأ في استرجاع البيانات من Firebase:`, error);
            return null;
        }
    }

    // مزامنة البيانات
    async syncData() {
        if (!this.isInitialized || !this.isOnline) {
            console.log('⚠️ Firebase غير متاح، تأجيل المزامنة');
            return;
        }

        console.log('🔄 بدء مزامنة البيانات مع Firebase...');
        
        const dataTypes = ['products', 'customers', 'suppliers', 'sales', 'purchases', 'accounts', 'settings'];
        
        for (const dataType of dataTypes) {
            try {
                // رفع البيانات المحلية إلى Firebase
                const localData = JSON.parse(localStorage.getItem(`monjiz${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`) || '[]');
                if (localData.length > 0 || (typeof localData === 'object' && Object.keys(localData).length > 0)) {
                    await this.saveToFirebase(dataType, localData, 'main');
                }
                
                // تحديث البيانات المحلية من Firebase
                const firebaseData = await this.getFromFirebase(dataType, 'main');
                if (firebaseData) {
                    localStorage.setItem(`monjiz${dataType.charAt(0).toUpperCase() + dataType.slice(1)}`, JSON.stringify(firebaseData));
                }
            } catch (error) {
                console.error(`❌ خطأ في مزامنة ${dataType}:`, error);
            }
        }
        
        console.log('✅ تمت مزامنة البيانات بنجاح');
    }

    // معالجة العمليات المعلقة
    async processPendingOperations() {
        if (this.pendingOperations.length === 0) return;
        
        console.log(`🔄 معالجة ${this.pendingOperations.length} عملية معلقة...`);
        
        for (const operation of this.pendingOperations) {
            try {
                if (operation.type === 'save') {
                    await this.saveToFirebase(operation.collection, operation.data, operation.docId);
                }
            } catch (error) {
                console.error('❌ خطأ في معالجة العملية المعلقة:', error);
            }
        }
        
        this.pendingOperations = [];
        console.log('✅ تمت معالجة جميع العمليات المعلقة');
    }

    // التراجع إلى التخزين المحلي
    fallbackToLocalStorage() {
        console.log('⚠️ التراجع إلى التخزين المحلي');
        // يمكن إضافة منطق إضافي هنا
    }
}

// إنشاء مدير Firebase
const firebaseManager = new FirebaseManager();
window.firebaseManager = firebaseManager;

// مراقبة حالة الاتصال
window.addEventListener('online', () => {
    firebaseManager.isOnline = true;
    firebaseManager.syncData();
});

window.addEventListener('offline', () => {
    firebaseManager.isOnline = false;
});