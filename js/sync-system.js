// نظام المزامنة المتقدم
class SyncSystem {
    constructor() {
        this.syncInterval = null;
        this.conflictResolution = 'latest'; // latest, manual, merge
        this.syncFrequency = 30000; // 30 ثانية
        this.lastSyncTime = null;
        this.syncQueue = [];
        this.isOnline = navigator.onLine;
        this.setupEventListeners();
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.startSync();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.stopSync();
        });

        // مزامنة عند إغلاق النافذة
        window.addEventListener('beforeunload', () => {
            this.forceSyncAll();
        });
    }

    // بدء المزامنة التلقائية
    startSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
        }

        this.syncInterval = setInterval(() => {
            this.performSync();
        }, this.syncFrequency);

        console.log('🔄 تم بدء نظام المزامنة التلقائية');
    }

    // إيقاف المزامنة التلقائية
    stopSync() {
        if (this.syncInterval) {
            clearInterval(this.syncInterval);
            this.syncInterval = null;
        }
        console.log('⏸️ تم إيقاف نظام المزامنة التلقائية');
    }

    // تنفيذ المزامنة
    async performSync() {
        if (!this.isOnline || !window.firebaseManager?.isInitialized) {
            console.log('⚠️ المزامنة غير متاحة - لا يوجد اتصال أو Firebase غير مهيأ');
            return;
        }

        console.log('🔄 بدء عملية المزامنة...');

        try {
            // مزامنة جميع أنواع البيانات
            const dataTypes = [
                'Products', 'Customers', 'Suppliers', 'Sales', 
                'Purchases', 'Accounts', 'StockMovements'
            ];

            for (const dataType of dataTypes) {
                await this.syncDataType(dataType);
            }

            // مزامنة الإعدادات
            await this.syncSettings();

            // مزامنة بيانات تسجيل الدخول (مشفرة)
            await this.syncLoginData();

            this.lastSyncTime = new Date().toISOString();
            localStorage.setItem('monjizLastSyncTime', this.lastSyncTime);

            console.log('✅ تمت المزامنة بنجاح');
            this.showSyncStatus('success');

        } catch (error) {
            console.error('❌ خطأ في المزامنة:', error);
            this.showSyncStatus('error');
        }
    }

    // مزامنة نوع بيانات محدد
    async syncDataType(dataType) {
        const localKey = `monjiz${dataType}`;
        const localData = JSON.parse(localStorage.getItem(localKey) || '[]');
        const localTimestamp = localStorage.getItem(`${localKey}_timestamp`);

        // الحصول على البيانات من Firebase
        const firebaseData = await window.firebaseManager.getFromFirebase(dataType.toLowerCase(), 'main');
        
        if (!firebaseData) {
            // لا توجد بيانات في Firebase، رفع البيانات المحلية
            if (localData.length > 0) {
                await window.firebaseManager.saveToFirebase(dataType.toLowerCase(), {
                    data: localData,
                    timestamp: new Date().toISOString(),
                    version: 1
                }, 'main');
                console.log(`📤 تم رفع ${dataType} إلى Firebase`);
            }
            return;
        }

        // مقارنة الطوابع الزمنية
        const firebaseTimestamp = firebaseData.timestamp;
        
        if (!localTimestamp || new Date(firebaseTimestamp) > new Date(localTimestamp)) {
            // البيانات في Firebase أحدث
            if (this.hasLocalChanges(localData, firebaseData.data)) {
                // يوجد تعارض، حل التعارض
                const resolvedData = await this.resolveConflict(localData, firebaseData.data, dataType);
                localStorage.setItem(localKey, JSON.stringify(resolvedData));
                localStorage.setItem(`${localKey}_timestamp`, new Date().toISOString());
                
                // رفع البيانات المحلولة إلى Firebase
                await window.firebaseManager.saveToFirebase(dataType.toLowerCase(), {
                    data: resolvedData,
                    timestamp: new Date().toISOString(),
                    version: (firebaseData.version || 1) + 1
                }, 'main');
            } else {
                // لا يوجد تعارض، تحديث البيانات المحلية
                localStorage.setItem(localKey, JSON.stringify(firebaseData.data));
                localStorage.setItem(`${localKey}_timestamp`, firebaseTimestamp);
                console.log(`📥 تم تحديث ${dataType} من Firebase`);
            }
        } else if (this.hasLocalChanges(localData, firebaseData.data)) {
            // البيانات المحلية أحدث، رفعها إلى Firebase
            await window.firebaseManager.saveToFirebase(dataType.toLowerCase(), {
                data: localData,
                timestamp: new Date().toISOString(),
                version: (firebaseData.version || 1) + 1
            }, 'main');
            localStorage.setItem(`${localKey}_timestamp`, new Date().toISOString());
            console.log(`📤 تم رفع ${dataType} المحدث إلى Firebase`);
        }
    }

    // فحص وجود تغييرات محلية
    hasLocalChanges(localData, firebaseData) {
        return JSON.stringify(localData) !== JSON.stringify(firebaseData);
    }

    // حل التعارضات
    async resolveConflict(localData, firebaseData, dataType) {
        switch (this.conflictResolution) {
            case 'latest':
                // استخدام البيانات الأحدث (Firebase)
                return firebaseData;
            
            case 'local':
                // استخدام البيانات المحلية
                return localData;
            
            case 'merge':
                // دمج البيانات
                return this.mergeData(localData, firebaseData, dataType);
            
            case 'manual':
                // طلب تدخل المستخدم
                return await this.requestUserResolution(localData, firebaseData, dataType);
            
            default:
                return firebaseData;
        }
    }

    // دمج البيانات
    mergeData(localData, firebaseData, dataType) {
        // منطق دمج مخصص لكل نوع بيانات
        const merged = [...firebaseData];
        
        localData.forEach(localItem => {
            const existingIndex = merged.findIndex(item => 
                item.id === localItem.id || 
                (item.name && item.name === localItem.name)
            );
            
            if (existingIndex >= 0) {
                // تحديث العنصر الموجود بالبيانات الأحدث
                const localTime = new Date(localItem.lastModified || localItem.createdAt || 0);
                const firebaseTime = new Date(merged[existingIndex].lastModified || merged[existingIndex].createdAt || 0);
                
                if (localTime > firebaseTime) {
                    merged[existingIndex] = localItem;
                }
            } else {
                // إضافة عنصر جديد
                merged.push(localItem);
            }
        });
        
        return merged;
    }

    // طلب حل يدوي من المستخدم
    async requestUserResolution(localData, firebaseData, dataType) {
        return new Promise((resolve) => {
            const modal = this.createConflictModal(localData, firebaseData, dataType, resolve);
            document.body.appendChild(modal);
        });
    }

    // إنشاء نافذة حل التعارض
    createConflictModal(localData, firebaseData, dataType, resolve) {
        const modal = document.createElement('div');
        modal.className = 'conflict-resolution-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>تعارض في البيانات - ${dataType}</h3>
                <p>تم العثور على تعارض في البيانات. اختر الإجراء المناسب:</p>
                <div class="conflict-options">
                    <button onclick="resolveConflict('local')">استخدام البيانات المحلية</button>
                    <button onclick="resolveConflict('firebase')">استخدام بيانات السحابة</button>
                    <button onclick="resolveConflict('merge')">دمج البيانات</button>
                </div>
            </div>
        `;
        
        // إضافة الأنماط
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        window.resolveConflict = (choice) => {
            document.body.removeChild(modal);
            switch (choice) {
                case 'local':
                    resolve(localData);
                    break;
                case 'firebase':
                    resolve(firebaseData);
                    break;
                case 'merge':
                    resolve(this.mergeData(localData, firebaseData, dataType));
                    break;
            }
        };
        
        return modal;
    }

    // مزامنة الإعدادات
    async syncSettings() {
        const settingsKeys = [
            'monjizCompanySettings',
            'monjizUserSettings', 
            'monjizSystemSettings',
            'monjizTaxSettings'
        ];
        
        for (const key of settingsKeys) {
            const localSettings = JSON.parse(localStorage.getItem(key) || '{}');
            if (Object.keys(localSettings).length > 0) {
                await window.firebaseManager.saveToFirebase('settings', localSettings, key);
            }
        }
    }

    // مزامنة بيانات تسجيل الدخول (مشفرة)
    async syncLoginData() {
        try {
            const loginData = {
                users: JSON.parse(localStorage.getItem('monjizUsers') || '[]'),
                userSettings: JSON.parse(localStorage.getItem('monjizUserSettings') || '{}')
            };
            
            if (loginData.users.length > 0 || Object.keys(loginData.userSettings).length > 0) {
                // تشفير بيانات تسجيل الدخول
                const encryptedData = await window.encryptionSystem.encryptLoginData(loginData);
                await window.firebaseManager.saveToFirebase('auth', { encryptedData }, 'loginData');
                console.log('🔐 تم حفظ بيانات تسجيل الدخول مشفرة');
            }
        } catch (error) {
            console.error('❌ خطأ في مزامنة بيانات تسجيل الدخول:', error);
        }
    }

    // مزامنة فورية لجميع البيانات
    async forceSyncAll() {
        if (!this.isOnline) {
            console.log('⚠️ لا يمكن المزامنة - لا يوجد اتصال بالإنترنت');
            return;
        }
        
        console.log('⚡ بدء المزامنة الفورية...');
        await this.performSync();
    }

    // عرض حالة المزامنة
    showSyncStatus(status) {
        const indicator = document.getElementById('sync-status-indicator');
        if (indicator) {
            indicator.className = `sync-status ${status}`;
            indicator.textContent = status === 'success' ? '✅ متزامن' : '❌ خطأ في المزامنة';
            
            setTimeout(() => {
                indicator.textContent = '';
            }, 3000);
        }
    }

    // الحصول على حالة المزامنة
    getSyncStatus() {
        return {
            lastSyncTime: this.lastSyncTime,
            isOnline: this.isOnline,
            isActive: !!this.syncInterval,
            queueLength: this.syncQueue.length
        };
    }
}

// إنشاء نظام المزامنة
const syncSystem = new SyncSystem();
window.syncSystem = syncSystem;

// بدء المزامنة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    if (navigator.onLine) {
        syncSystem.startSync();
    }
});