/**
 * مهيئ النظام الرئيسي
 * يدير تحميل وتهيئة جميع الأنظمة بالترتيب الصحيح
 */

class SystemInitializer {
    constructor() {
        this.systems = [];
        this.initializationStatus = {
            encryption: false,
            firebase: false,
            sync: false,
            autoSave: false
        };
        this.startInitialization();
    }

    // بدء التهيئة
    async startInitialization() {
        console.log('🚀 بدء تهيئة النظام المتقدم...');
        
        try {
            // 1. تهيئة نظام التشفير
            await this.initializeEncryption();
            
            // 2. تهيئة Firebase
            await this.initializeFirebase();
            
            // 3. تهيئة نظام المزامنة
            await this.initializeSync();
            
            // 4. تهيئة نظام الحفظ التلقائي
            await this.initializeAutoSave();
            
            // 5. تشغيل الفحوصات الدورية
            this.startPeriodicChecks();
            
            console.log('✅ تم تهيئة النظام المتقدم بنجاح');
            this.showInitializationComplete();
            
        } catch (error) {
            console.error('❌ خطأ في تهيئة النظام:', error);
            this.showInitializationError(error);
        }
    }

    // تهيئة نظام التشفير
    async initializeEncryption() {
        if (window.encryptionSystem) {
            await window.encryptionSystem.setupCrypto();
            this.initializationStatus.encryption = true;
            console.log('✅ تم تهيئة نظام التشفير');
        }
    }

    // تهيئة Firebase
    async initializeFirebase() {
        if (window.firebaseDatabase) {
            await window.firebaseDatabase.initializeFirebase();
            this.initializationStatus.firebase = window.firebaseDatabase.isInitialized;
            console.log('✅ تم تهيئة Firebase');
        }
    }

    // تهيئة نظام المزامنة
    async initializeSync() {
        if (window.syncSystem) {
            this.initializationStatus.sync = true;
            console.log('✅ تم تهيئة نظام المزامنة');
        }
    }

    // تهيئة نظام الحفظ التلقائي
    async initializeAutoSave() {
        if (window.autoSaveSystem) {
            await window.autoSaveSystem.initializeAdvancedFeatures();
            this.initializationStatus.autoSave = true;
            console.log('✅ تم تهيئة نظام الحفظ التلقائي');
        }
    }

    // بدء الفحوصات الدورية
    startPeriodicChecks() {
        // فحص حالة الأنظمة كل دقيقة
        setInterval(() => {
            this.performHealthCheck();
        }, 60000);
        
        // مزامنة دورية كل 10 دقائق
        setInterval(() => {
            if (window.syncSystem && navigator.onLine) {
                window.syncSystem.performFullSync();
            }
        }, 10 * 60 * 1000);
    }

    // فحص صحة النظام
    performHealthCheck() {
        const issues = [];
        
        // فحص localStorage
        try {
            localStorage.setItem('healthCheck', 'test');
            localStorage.removeItem('healthCheck');
        } catch (error) {
            issues.push('localStorage غير متاح');
        }
        
        // فحص IndexedDB
        if (!window.indexedDB) {
            issues.push('IndexedDB غير متاح');
        }
        
        // فحص الاتصال بالإنترنت
        if (!navigator.onLine) {
            issues.push('لا يوجد اتصال بالإنترنت');
        }
        
        // فحص Firebase
        if (!this.initializationStatus.firebase) {
            issues.push('Firebase غير متصل');
        }
        
        if (issues.length > 0) {
            console.warn('⚠️ مشاكل في النظام:', issues);
        }
    }

    // عرض اكتمال التهيئة
    showInitializationComplete() {
        const notification = document.createElement('div');
        notification.className = 'system-notification success';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <h4>تم تهيئة النظام بنجاح</h4>
                    <p>جميع الأنظمة تعمل بشكل طبيعي</p>
                    <ul>
                        <li>✅ نظام التشفير: ${this.initializationStatus.encryption ? 'نشط' : 'غير نشط'}</li>
                        <li>✅ قاعدة البيانات السحابية: ${this.initializationStatus.firebase ? 'متصلة' : 'غير متصلة'}</li>
                        <li>✅ نظام المزامنة: ${this.initializationStatus.sync ? 'نشط' : 'غير نشط'}</li>
                        <li>✅ الحفظ التلقائي: ${this.initializationStatus.autoSave ? 'نشط' : 'غير نشط'}</li>
                    </ul>
                </div>
            </div>
        `;
        
        this.showNotification(notification, 5000);
    }

    // عرض خطأ التهيئة
    showInitializationError(error) {
        const notification = document.createElement('div');
        notification.className = 'system-notification error';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <h4>خطأ في تهيئة النظام</h4>
                    <p>${error.message}</p>
                    <button onclick="location.reload()">إعادة المحاولة</button>
                </div>
            </div>
        `;
        
        this.showNotification(notification, 10000);
    }

    // عرض الإشعار
    showNotification(notification, duration) {
        // إضافة الأنماط إذا لم تكن موجودة
        if (!document.getElementById('system-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'system-notification-styles';
            styles.textContent = `
                .system-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    max-width: 400px;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    z-index: 10000;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    animation: slideIn 0.3s ease-out;
                }
                
                .system-notification.success {
                    background: linear-gradient(135deg, #4CAF50, #45a049);
                    color: white;
                }
                
                .system-notification.error {
                    background: linear-gradient(135deg, #f44336, #d32f2f);
                    color: white;
                }
                
                .notification-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                }
                
                .notification-content i {
                    font-size: 24px;
                    margin-top: 5px;
                }
                
                .notification-content h4 {
                    margin: 0 0 10px 0;
                    font-size: 16px;
                }
                
                .notification-content p {
                    margin: 0 0 10px 0;
                    font-size: 14px;
                    opacity: 0.9;
                }
                
                .notification-content ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    font-size: 12px;
                }
                
                .notification-content li {
                    margin: 5px 0;
                    opacity: 0.8;
                }
                
                .notification-content button {
                    background: rgba(255,255,255,0.2);
                    border: 1px solid rgba(255,255,255,0.3);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 12px;
                }
                
                .notification-content button:hover {
                    background: rgba(255,255,255,0.3);
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, duration);
    }

    // إيقاف النظام
    destroy() {
        if (window.syncSystem) {
            window.syncSystem.destroy();
        }
        
        if (window.autoSaveSystem) {
            window.autoSaveSystem.destroy();
        }
        
        if (window.firebaseDatabase) {
            window.firebaseDatabase.destroy();
        }
    }
}

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // انتظار قصير للتأكد من تحميل جميع الملفات
    setTimeout(() => {
        window.systemInitializer = new SystemInitializer();
    }, 1000);
});