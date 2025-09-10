// تحسين نظام الحفظ التلقائي ليدعم Firebase والتشفير
class EnhancedAutoSaveSystem extends AutoSaveSystem {
    constructor() {
        super();
        this.encryptSensitiveData = true;
        this.useFirebase = true;
        this.compressionEnabled = true;
    }

    // حفظ محسن مع التشفير والضغط
    async enhancedSave() {
        if (this.pendingChanges.size === 0) return;

        console.log('🔄 بدء الحفظ المحسن...');
        
        try {
            // حفظ في localStorage (غير مشفر للوصول السريع)
            this.saveToLocalStorage();
            
            // حفظ في IndexedDB (مشفر)
            await this.saveToIndexedDBEncrypted();
            
            // حفظ في Firebase (مشفر ومضغوط)
            if (this.useFirebase && window.firebaseManager?.isInitialized) {
                await this.saveToFirebaseEncrypted();
            }
            
            // مزامنة فورية
            if (window.syncSystem) {
                await window.syncSystem.performSync();
            }
            
            this.pendingChanges.clear();
            console.log('✅ تم الحفظ المحسن بنجاح');
            
        } catch (error) {
            console.error('❌ خطأ في الحفظ المحسن:', error);
        }
    }

    // حفظ مشفر في IndexedDB
    async saveToIndexedDBEncrypted() {
        try {
            const db = await this.openIndexedDB();
            const transaction = db.transaction(['monjizData'], 'readwrite');
            const store = transaction.objectStore('monjizData');
            
            // جمع جميع البيانات
            const allData = this.collectAllData();
            
            // تشفير البيانات الحساسة
            if (this.encryptSensitiveData && window.encryptionSystem) {
                allData.loginData = await window.encryptionSystem.encryptSensitiveData(allData.loginData);
                allData.userSettings = await window.encryptionSystem.encryptSensitiveData(allData.userSettings);
            }
            
            // ضغط البيانات
            const compressedData = this.compressionEnabled ? this.compressData(allData) : allData;
            
            await store.put({
                id: 'monjizBackupEncrypted',
                data: compressedData,
                timestamp: new Date().toISOString(),
                encrypted: this.encryptSensitiveData,
                compressed: this.compressionEnabled
            });
            
            console.log('🔐 تم حفظ البيانات مشفرة في IndexedDB');
            
        } catch (error) {
            console.error('❌ خطأ في حفظ البيانات المشفرة:', error);
        }
    }

    // حفظ مشفر في Firebase
    async saveToFirebaseEncrypted() {
        try {
            const allData = this.collectAllData();
            
            // تشفير البيانات الحساسة
            if (this.encryptSensitiveData && window.encryptionSystem) {
                allData.loginData = await window.encryptionSystem.encryptSensitiveData(allData.loginData);
                allData.userSettings = await window.encryptionSystem.encryptSensitiveData(allData.userSettings);
            }
            
            // ضغط البيانات
            const compressedData = this.compressionEnabled ? this.compressData(allData) : allData;
            
            await window.firebaseManager.saveToFirebase('backups', {
                data: compressedData,
                deviceId: window.encryptionSystem?.getDeviceId(),
                encrypted: this.encryptSensitiveData,
                compressed: this.compressionEnabled
            }, `backup_${new Date().getTime()}`);
            
            console.log('🔐☁️ تم حفظ البيانات مشفرة في Firebase');
            
        } catch (error) {
            console.error('❌ خطأ في حفظ البيانات في Firebase:', error);
        }
    }

    // جمع جميع البيانات
    collectAllData() {
        return {
            // بيانات النظام
            products: JSON.parse(localStorage.getItem('monjizProducts') || '[]'),
            customers: JSON.parse(localStorage.getItem('monjizCustomers') || '[]'),
            suppliers: JSON.parse(localStorage.getItem('monjizSuppliers') || '[]'),
            sales: JSON.parse(localStorage.getItem('monjizSales') || '[]'),
            purchases: JSON.parse(localStorage.getItem('monjizPurchases') || '[]'),
            accounts: JSON.parse(localStorage.getItem('monjizAccounts') || '[]'),
            stockMovements: JSON.parse(localStorage.getItem('monjizStockMovements') || '[]'),
            
            // إعدادات النظام
            companySettings: JSON.parse(localStorage.getItem('monjizCompanySettings') || '{}'),
            systemSettings: JSON.parse(localStorage.getItem('monjizSystemSettings') || '{}'),
            taxSettings: JSON.parse(localStorage.getItem('monjizTaxSettings') || '{}'),
            
            // بيانات تسجيل الدخول (ستُشفر)
            loginData: {
                users: JSON.parse(localStorage.getItem('monjizUsers') || '[]'),
                currentUser: localStorage.getItem('monjizCurrentUser'),
                isLoggedIn: localStorage.getItem('monjizLoggedIn')
            },
            
            // إعدادات المستخدم (ستُشفر)
            userSettings: JSON.parse(localStorage.getItem('monjizUserSettings') || '{}'),
            
            timestamp: new Date().toISOString()
        };
    }

    // ضغط البيانات
    compressData(data) {
        try {
            // ضغط بسيط باستخدام JSON.stringify مع إزالة المسافات
            const jsonString = JSON.stringify(data);
            // يمكن إضافة خوارزمية ضغط أكثر تقدماً هنا
            return {
                compressed: true,
                data: jsonString,
                originalSize: jsonString.length,
                compressedSize: jsonString.length // سيتم تحديثه مع خوارزمية ضغط حقيقية
            };
        } catch (error) {
            console.error('❌ خطأ في ضغط البيانات:', error);
            return data;
        }
    }

    // إلغاء ضغط البيانات
    decompressData(compressedData) {
        try {
            if (compressedData.compressed) {
                return JSON.parse(compressedData.data);
            }
            return compressedData;
        } catch (error) {
            console.error('❌ خطأ في إلغاء ضغط البيانات:', error);
            return compressedData;
        }
    }

    // استعادة محسنة من IndexedDB
    async enhancedRestoreFromIndexedDB() {
        try {
            const db = await this.openIndexedDB();
            const transaction = db.transaction(['monjizData'], 'readonly');
            const store = transaction.objectStore('monjizData');
            const result = await store.get('monjizBackupEncrypted');
            
            if (result && result.data) {
                let data = result.data;
                
                // إلغاء ضغط البيانات
                if (result.compressed) {
                    data = this.decompressData(data);
                }
                
                // فك تشفير البيانات الحساسة
                if (result.encrypted && window.encryptionSystem) {
                    if (data.loginData) {
                        data.loginData = await window.encryptionSystem.decryptSensitiveData(data.loginData);
                    }
                    if (data.userSettings) {
                        data.userSettings = await window.encryptionSystem.decryptSensitiveData(data.userSettings);
                    }
                }
                
                // استعادة البيانات
                this.restoreDataToLocalStorage(data);
                
                console.log('🔓✅ تم استعادة البيانات المشفرة من IndexedDB');
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('❌ خطأ في استعادة البيانات المشفرة:', error);
            return false;
        }
    }

    // استعادة البيانات إلى localStorage
    restoreDataToLocalStorage(data) {
        // استعادة بيانات النظام
        if (data.products) localStorage.setItem('monjizProducts', JSON.stringify(data.products));
        if (data.customers) localStorage.setItem('monjizCustomers', JSON.stringify(data.customers));
        if (data.suppliers) localStorage.setItem('monjizSuppliers', JSON.stringify(data.suppliers));
        if (data.sales) localStorage.setItem('monjizSales', JSON.stringify(data.sales));
        if (data.purchases) localStorage.setItem('monjizPurchases', JSON.stringify(data.purchases));
        if (data.accounts) localStorage.setItem('monjizAccounts', JSON.stringify(data.accounts));
        if (data.stockMovements) localStorage.setItem('monjizStockMovements', JSON.stringify(data.stockMovements));
        
        // استعادة الإعدادات
        if (data.companySettings) localStorage.setItem('monjizCompanySettings', JSON.stringify(data.companySettings));
        if (data.systemSettings) localStorage.setItem('monjizSystemSettings', JSON.stringify(data.systemSettings));
        if (data.taxSettings) localStorage.setItem('monjizTaxSettings', JSON.stringify(data.taxSettings));
        if (data.userSettings) localStorage.setItem('monjizUserSettings', JSON.stringify(data.userSettings));
        
        // استعادة بيانات تسجيل الدخول
        if (data.loginData) {
            if (data.loginData.users) localStorage.setItem('monjizUsers', JSON.stringify(data.loginData.users));
            if (data.loginData.currentUser) localStorage.setItem('monjizCurrentUser', data.loginData.currentUser);
            if (data.loginData.isLoggedIn) localStorage.setItem('monjizLoggedIn', data.loginData.isLoggedIn);
        }
    }

    // استبدال دالة الحفظ التلقائي الأصلية
    autoSave() {
        this.enhancedSave();
    }
}

// استبدال نظام الحفظ التلقائي بالنسخة المحسنة
if (window.autoSaveSystem) {
    window.autoSaveSystem.destroy();
}

const enhancedAutoSaveSystem = new EnhancedAutoSaveSystem();
window.autoSaveSystem = enhancedAutoSaveSystem;
window.enhancedAutoSaveSystem = enhancedAutoSaveSystem;

console.log('🚀 تم تفعيل نظام الحفظ التلقائي المحسن');