class AutoSaveSystem {
    constructor() {
        this.saveInterval = null;
        this.pendingChanges = new Set();
        this.isOnline = navigator.onLine;
        this.setupEventListeners();
        this.startAutoSave();
        this.initializeAdvancedFeatures();
    }

    // تهيئة الميزات المتقدمة
    async initializeAdvancedFeatures() {
        // انتظار تحميل الأنظمة الأخرى
        await this.waitForSystems();
        
        // استعادة البيانات من جميع المصادر
        await this.restoreFromAllSources();
        
        console.log('✅ تم تهيئة نظام الحفظ التلقائي المتقدم');
    }

    // انتظار تحميل الأنظمة
    async waitForSystems() {
        let attempts = 0;
        const maxAttempts = 50;
        
        while (attempts < maxAttempts) {
            if (window.firebaseDatabase && window.syncSystem && window.encryptionSystem) {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // مراقبة تغييرات الاتصال
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncPendingChanges();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });

        // حفظ تلقائي عند الخروج من الصفحة
        window.addEventListener('beforeunload', (e) => {
            this.forceSave();
            if (this.pendingChanges.size > 0) {
                e.preventDefault();
                e.returnValue = 'لديك تغييرات غير محفوظة. هل تريد المغادرة؟';
            }
        });

        // حفظ عند فقدان التركيز
        window.addEventListener('blur', () => {
            this.forceSave();
        });
    }

    // بدء الحفظ التلقائي
    startAutoSave() {
        this.saveInterval = setInterval(() => {
            this.autoSave();
        }, 5000); // كل 5 ثوانٍ بدلاً من 30 ثانية
    }

    // حفظ تلقائي
    async autoSave() {
        if (this.pendingChanges.size === 0) return;

        console.log('🔄 بدء الحفظ التلقائي المتقدم...');
        
        try {
            // 1. حفظ في localStorage
            this.saveToLocalStorage();
            
            // 2. حفظ في IndexedDB
            await this.saveToIndexedDB();
            
            // 3. حفظ في Firebase (إذا كان متاحاً)
            if (this.isOnline && window.firebaseDatabase?.isInitialized) {
                await this.saveToFirebase();
            }
            
            // 4. تشفير وحفظ البيانات الحساسة
            await this.saveEncryptedData();
            
            this.pendingChanges.clear();
            console.log('✅ تم الحفظ التلقائي المتقدم بنجاح');
            
        } catch (error) {
            console.error('❌ خطأ في الحفظ التلقائي المتقدم:', error);
        }
    }

    // حفظ في Firebase
    async saveToFirebase() {
        if (!window.firebaseDatabase) return;
        
        for (const dataType of this.pendingChanges) {
            const data = this.getData(dataType);
            if (data) {
                await window.firebaseDatabase.saveToFirebase(dataType, data);
            }
        }
    }

    // حفظ البيانات المشفرة
    async saveEncryptedData() {
        if (!window.encryptionSystem) return;
        
        try {
            // تشفير بيانات تسجيل الدخول
            const loginData = {
                users: JSON.parse(localStorage.getItem('monjizUsers') || '[]'),
                userSettings: JSON.parse(localStorage.getItem('monjizUserSettings') || '{}')
            };
            
            const encryptedLoginData = await window.encryptionSystem.encryptLoginData(loginData);
            localStorage.setItem('monjizEncryptedLogin', encryptedLoginData);
            
            // تشفير البيانات الحساسة الأخرى
            const sensitiveData = {
                companySettings: JSON.parse(localStorage.getItem('monjizCompanySettings') || '{}'),
                systemSettings: JSON.parse(localStorage.getItem('monjizSystemSettings') || '{}')
            };
            
            const encryptedSensitiveData = await window.encryptionSystem.encryptData(sensitiveData, 'system-key');
            localStorage.setItem('monjizEncryptedSensitive', encryptedSensitiveData);
            
        } catch (error) {
            console.error('❌ خطأ في تشفير البيانات:', error);
        }
    }

    // استعادة من جميع المصادر
    async restoreFromAllSources() {
        console.log('🔄 بدء استعادة البيانات من جميع المصادر...');
        
        let restored = false;
        
        // 1. محاولة الاستعادة من Firebase
        if (this.isOnline && window.firebaseDatabase?.isInitialized) {
            const firebaseRestored = await window.firebaseDatabase.restoreAllData();
            if (firebaseRestored) {
                restored = true;
                console.log('✅ تم استعادة البيانات من Firebase');
            }
        }
        
        // 2. محاولة الاستعادة من IndexedDB
        if (!restored) {
            const indexedDBRestored = await this.restoreFromIndexedDB();
            if (indexedDBRestored) {
                restored = true;
                console.log('✅ تم استعادة البيانات من IndexedDB');
            }
        }
        
        // 3. محاولة الاستعادة من البيانات المشفرة
        if (!restored) {
            const encryptedRestored = await this.restoreFromEncryptedData();
            if (encryptedRestored) {
                restored = true;
                console.log('✅ تم استعادة البيانات من النسخ المشفرة');
            }
        }
        
        // 4. إنشاء بيانات افتراضية إذا لم تتم الاستعادة
        if (!restored) {
            this.createDefaultData();
            console.log('🆕 تم إنشاء بيانات افتراضية جديدة');
        }
        
        return restored;
    }

    // استعادة من البيانات المشفرة
    async restoreFromEncryptedData() {
        if (!window.encryptionSystem) return false;
        
        try {
            // استعادة بيانات تسجيل الدخول المشفرة
            const encryptedLoginData = localStorage.getItem('monjizEncryptedLogin');
            if (encryptedLoginData) {
                const loginData = await window.encryptionSystem.decryptLoginData(encryptedLoginData);
                
                if (loginData.users) {
                    localStorage.setItem('monjizUsers', JSON.stringify(loginData.users));
                }
                
                if (loginData.userSettings) {
                    localStorage.setItem('monjizUserSettings', JSON.stringify(loginData.userSettings));
                }
            }
            
            // استعادة البيانات الحساسة المشفرة
            const encryptedSensitiveData = localStorage.getItem('monjizEncryptedSensitive');
            if (encryptedSensitiveData) {
                const sensitiveData = await window.encryptionSystem.decryptData(encryptedSensitiveData, 'system-key');
                
                if (sensitiveData.companySettings) {
                    localStorage.setItem('monjizCompanySettings', JSON.stringify(sensitiveData.companySettings));
                }
                
                if (sensitiveData.systemSettings) {
                    localStorage.setItem('monjizSystemSettings', JSON.stringify(sensitiveData.systemSettings));
                }
            }
            
            return true;
            
        } catch (error) {
            console.error('❌ خطأ في استعادة البيانات المشفرة:', error);
            return false;
        }
    }

    // إنشاء بيانات افتراضية
    createDefaultData() {
        // إنشاء مستخدم افتراضي
        const defaultUsers = [{
            username: 'admin',
            password: 'admin123',
            role: 'admin',
            createdAt: new Date().toISOString()
        }];
        
        localStorage.setItem('monjizUsers', JSON.stringify(defaultUsers));
        
        // إنشاء إعدادات افتراضية
        const defaultUserSettings = {
            adminUser: 'admin',
            adminPassword: 'admin123',
            language: 'ar',
            theme: 'light'
        };
        
        localStorage.setItem('monjizUserSettings', JSON.stringify(defaultUserSettings));
        
        // إنشاء إعدادات الشركة الافتراضية
        const defaultCompanySettings = {
            name: 'شركتي',
            taxNumber: '',
            address: '',
            phone: '',
            email: ''
        };
        
        localStorage.setItem('monjizCompanySettings', JSON.stringify(defaultCompanySettings));
    }

    // ... rest of existing code ...
}

// إنشاء نظام الحفظ التلقائي
const autoSaveSystem = new AutoSaveSystem();
window.autoSaveSystem = autoSaveSystem;


## تشخيص المشكلة الأساسية 🔍

المشكلة الجذرية هي أن النظام **يعتمد كلياً على localStorage** لحفظ جميع البيانات، بما في ذلك:
- بيانات تسجيل الدخول (اسم المستخدم وكلمة المرور)
- جميع بيانات النظام (العملاء، الموردين، الفواتير، المنتجات)
- الإعدادات والتكوينات

**عندما تحذف محفوظات المتصفح، يتم حذف localStorage تماماً!**

## لماذا لا يحفظ النظام؟ ❌

### 1. **localStorage محدود بالمتصفح:**
- يُحذف عند مسح بيانات المتصفح
- لا يتزامن بين المتصفحات المختلفة
- لا يتزامن بين الأجهزة المختلفة

### 2. **عدم وجود قاعدة بيانات خارجية:**
- لا يوجد خادم لحفظ البيانات
- لا يوجد قاعدة بيانات مركزية
- النظام محلي بالكامل

### 3. **نظام الحفظ التلقائي غير مكتمل:**
- يحفظ في localStorage فقط
- لا يحفظ في مواقع متعددة
- لا يوجد نسخ احتياطية خارجية

## الحلول الفورية 🚀

### الحل الأول: تفعيل IndexedDB كنسخة احتياطية

سأضيف نظام حفظ محسن يحفظ في IndexedDB (أكثر استقراراً من localStorage):
```javascript
    // تحسين دالة الحفظ في IndexedDB
    async saveToIndexedDB() {
        try {
            const db = await this.openIndexedDB();
            const transaction = db.transaction(['monjizData'], 'readwrite');
            const store = transaction.objectStore('monjizData');
            
            // حفظ جميع أنواع البيانات بما في ذلك بيانات تسجيل الدخول
            const allData = {
                // بيانات النظام
                products: JSON.parse(localStorage.getItem('monjizProducts') || '[]'),
                customers: JSON.parse(localStorage.getItem('monjizCustomers') || '[]'),
                suppliers: JSON.parse(localStorage.getItem('monjizSuppliers') || '[]'),
                sales: JSON.parse(localStorage.getItem('monjizSales') || '[]'),
                purchases: JSON.parse(localStorage.getItem('monjizPurchases') || '[]'),
                accounts: JSON.parse(localStorage.getItem('monjizAccounts') || '[]'),
                
                // إعدادات النظام
                companySettings: JSON.parse(localStorage.getItem('monjizCompanySettings') || '{}'),
                userSettings: JSON.parse(localStorage.getItem('monjizUserSettings') || '{}'),
                systemSettings: JSON.parse(localStorage.getItem('monjizSystemSettings') || '{}'),
                
                // بيانات تسجيل الدخول
                loginData: {
                    users: JSON.parse(localStorage.getItem('monjizUsers') || '[{"username":"admin","password":"admin123","role":"admin"}]'),
                    currentUser: localStorage.getItem('monjizCurrentUser'),
                    isLoggedIn: localStorage.getItem('monjizLoggedIn')
                },
                
                timestamp: new Date().toISOString()
            };
            
            await store.put({
                id: 'monjizBackup',
                data: allData,
                timestamp: new Date().toISOString()
            });
            
            console.log('✅ تم حفظ جميع البيانات في IndexedDB');
            
        } catch (error) {
            console.error('❌ خطأ في حفظ البيانات في IndexedDB:', error);
        }
    }
    
    // دالة استعادة البيانات من IndexedDB
    async restoreFromIndexedDB() {
        try {
            const db = await this.openIndexedDB();
            const transaction = db.transaction(['monjizData'], 'readonly');
            const store = transaction.objectStore('monjizData');
            const result = await store.get('monjizBackup');
            
            if (result && result.data) {
                const data = result.data;
                
                // استعادة بيانات النظام
                if (data.products) localStorage.setItem('monjizProducts', JSON.stringify(data.products));
                if (data.customers) localStorage.setItem('monjizCustomers', JSON.stringify(data.customers));
                if (data.suppliers) localStorage.setItem('monjizSuppliers', JSON.stringify(data.suppliers));
                if (data.sales) localStorage.setItem('monjizSales', JSON.stringify(data.sales));
                if (data.purchases) localStorage.setItem('monjizPurchases', JSON.stringify(data.purchases));
                if (data.accounts) localStorage.setItem('monjizAccounts', JSON.stringify(data.accounts));
                
                // استعادة الإعدادات
                if (data.companySettings) localStorage.setItem('monjizCompanySettings', JSON.stringify(data.companySettings));
                if (data.userSettings) localStorage.setItem('monjizUserSettings', JSON.stringify(data.userSettings));
                if (data.systemSettings) localStorage.setItem('monjizSystemSettings', JSON.stringify(data.systemSettings));
                
                // استعادة بيانات تسجيل الدخول
                if (data.loginData) {
                    if (data.loginData.users) localStorage.setItem('monjizUsers', JSON.stringify(data.loginData.users));
                }
                
                console.log('✅ تم استعادة جميع البيانات من IndexedDB');
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('❌ خطأ في استعادة البيانات من IndexedDB:', error);
            return false;
        }
    }