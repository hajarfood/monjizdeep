// إصلاح مشكلة تسجيل الدخول وحفظ الإعدادات

(function() {
    // تعديل وظيفة firstTimeSetup لتكون أكثر بساطة
    if (typeof window.firstTimeSetup === 'function') {
        // استبدال وظيفة إعداد النظام للمرة الأولى
        window.firstTimeSetup = function() {
            // تسجيل دخول مباشر بدون إعداد أولي
            localStorage.setItem('monjizLoggedIn', 'true');
            localStorage.setItem('monjizCurrentUser', 'admin');
            localStorage.setItem('monjizLoginTime', new Date().toISOString());
            
            // تخزين بيانات المستخدم في sessionStorage أيضاً للحفاظ عليها بين التبويبات
            sessionStorage.setItem('monjizLoggedIn', 'true');
            sessionStorage.setItem('monjizCurrentUser', 'admin');
            sessionStorage.setItem('monjizLoginTime', new Date().toISOString());
            
            // الانتقال مباشرة للصفحة الرئيسية
            window.location.href = 'index.html';
        };
        
        console.log('✅ تم تحسين وظيفة إعداد النظام للمرة الأولى');
    }
    
    // تحسين وظيفة تسجيل الدخول
    if (typeof window.validateLogin === 'function') {
        // حفظ النسخة الأصلية من الوظيفة
        const originalValidateLogin = window.validateLogin;
        
        // استبدال وظيفة التحقق من تسجيل الدخول
        window.validateLogin = function(username, password) {
            // البحث عن المستخدم في قائمة المستخدمين
            const users = JSON.parse(localStorage.getItem('monjizUsers')) || [];
            const user = users.find(u => u.username === username && u.password === password);
            
            // التحقق من المستخدم الإداري في إعدادات المستخدم
            const userSettings = JSON.parse(localStorage.getItem('monjizUserSettings'));
            
            // إعدادات افتراضية إذا لم توجد
            const defaultUsername = 'admin';
            const defaultPassword = 'admin123';
            
            let validUsername = defaultUsername;
            let validPassword = defaultPassword;
            
            // استخدام الإعدادات المحفوظة إذا وجدت
            if (userSettings) {
                validUsername = userSettings.adminUser || defaultUsername;
                validPassword = userSettings.adminPassword || defaultPassword;
                
                // طباعة قيم التحقق للتشخيص (يمكن إزالتها لاحقاً)
                console.log('المستخدم المدخل:', username);
                console.log('كلمة المرور المدخلة:', password);
                console.log('المستخدم الصحيح:', validUsername);
                console.log('كلمة المرور الصحيحة:', validPassword);
            }
            
            // التحقق من المستخدم في قائمة المستخدمين أو المستخدم الإداري
            if (user || (username === validUsername && password === validPassword)) {
                // تسجيل دخول ناجح
                localStorage.setItem('monjizLoggedIn', 'true');
                localStorage.setItem('monjizCurrentUser', username);
                localStorage.setItem('monjizLoginTime', new Date().toISOString());
                
                // حفظ دور المستخدم
                if (user) {
                    localStorage.setItem('monjizCurrentUserRole', user.role);
                } else {
                    localStorage.setItem('monjizCurrentUserRole', 'admin');
                }
                
                // إضافة تخزين في sessionStorage للحفاظ على الجلسة بين التبويبات
                sessionStorage.setItem('monjizLoggedIn', 'true');
                sessionStorage.setItem('monjizCurrentUser', username);
                sessionStorage.setItem('monjizLoginTime', new Date().toISOString());
                sessionStorage.setItem('monjizCurrentUserRole', localStorage.getItem('monjizCurrentUserRole'));
                
                // عمل نسخة احتياطية من الإعدادات
                backupSettings();
                
                showSuccess('تم تسجيل الدخول بنجاح');
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            } else {
                showError('اسم المستخدم أو كلمة المرور غير صحيحة');
            }
            
            showLoading(false);
        };
        
        console.log('✅ تم تحسين وظيفة تسجيل الدخول');
    }
    
    // تحسين وظيفة فحص حالة تسجيل الدخول
    if (typeof window.checkLoginStatus === 'function') {
        // حفظ النسخة الأصلية من الوظيفة
        const originalCheckLoginStatus = window.checkLoginStatus;
        
        // استبدال وظيفة فحص حالة تسجيل الدخول
        window.checkLoginStatus = function() {
            try {
                // التحقق من localStorage و sessionStorage
                const isLoggedInLocal = localStorage.getItem('monjizLoggedIn') === 'true';
                const isLoggedInSession = sessionStorage.getItem('monjizLoggedIn') === 'true';
                
                // التحقق من صلاحية الجلسة (24 ساعة)
                const loginTime = localStorage.getItem('monjizLoginTime');
                let sessionValid = true;
                
                if (loginTime) {
                    const loginDate = new Date(loginTime);
                    const currentDate = new Date();
                    const hoursDiff = (currentDate - loginDate) / (1000 * 60 * 60);
                    
                    // إذا مر أكثر من 24 ساعة، تعتبر الجلسة منتهية
                    if (hoursDiff > 24) {
                        sessionValid = false;
                        console.log('⚠️ انتهت صلاحية الجلسة');
                    }
                }
                
                if ((!isLoggedInLocal && !isLoggedInSession) || !sessionValid) {
                    console.log('ℹ️ المستخدم غير مسجل الدخول، إعادة توجيه لصفحة تسجيل الدخول');
                    // مسح بيانات الجلسة
                    localStorage.removeItem('monjizLoggedIn');
                    sessionStorage.removeItem('monjizLoggedIn');
                    // إعادة توجيه لصفحة تسجيل الدخول
                    window.location.href = 'login.html';
                    return false;
                }
                
                // مزامنة حالة تسجيل الدخول بين localStorage و sessionStorage
                if (isLoggedInLocal && !isLoggedInSession) {
                    sessionStorage.setItem('monjizLoggedIn', 'true');
                    sessionStorage.setItem('monjizCurrentUser', localStorage.getItem('monjizCurrentUser'));
                    sessionStorage.setItem('monjizLoginTime', localStorage.getItem('monjizLoginTime'));
                } else if (!isLoggedInLocal && isLoggedInSession) {
                    localStorage.setItem('monjizLoggedIn', 'true');
                    localStorage.setItem('monjizCurrentUser', sessionStorage.getItem('monjizCurrentUser'));
                    localStorage.setItem('monjizLoginTime', sessionStorage.getItem('monjizLoginTime'));
                }
                
                return true;
            } catch (error) {
                console.error('❌ خطأ في فحص حالة تسجيل الدخول:', error);
                // في حالة الخطأ، إعادة توجيه لصفحة تسجيل الدخول للأمان
                window.location.href = 'login.html';
                return false;
            }
        };
        
        console.log('✅ تم تحسين وظيفة فحص حالة تسجيل الدخول');
    }
    
    // تحسين وظيفة تسجيل الخروج
    if (typeof window.logout === 'function') {
        // حفظ النسخة الأصلية من الوظيفة
        const originalLogout = window.logout;
        
        // استبدال وظيفة تسجيل الخروج
        window.logout = function() {
            try {
                if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
                    console.log('🚪 تسجيل خروج المستخدم...');
                    
                    // عمل نسخة احتياطية من الإعدادات قبل تسجيل الخروج
                    backupSettings();
                    
                    // مسح بيانات تسجيل الدخول من localStorage و sessionStorage
                    localStorage.removeItem('monjizLoggedIn');
                    localStorage.removeItem('monjizCurrentUser');
                    localStorage.removeItem('monjizLoginTime');
                    
                    sessionStorage.removeItem('monjizLoggedIn');
                    sessionStorage.removeItem('monjizCurrentUser');
                    sessionStorage.removeItem('monjizLoginTime');
                    
                    console.log('✅ تم تسجيل الخروج بنجاح');
                    
                    // إعادة توجيه لصفحة تسجيل الدخول
                    window.location.href = 'login.html';
                }
            } catch (error) {
                console.error('❌ خطأ في تسجيل الخروج:', error);
                // في حالة الخطأ، إعادة توجيه مباشرة
                window.location.href = 'login.html';
            }
        };
        
        console.log('✅ تم تحسين وظيفة تسجيل الخروج');
    }
    
    // وظيفة لعمل نسخة احتياطية من الإعدادات
    function backupSettings() {
        try {
            // حفظ نسخة احتياطية من الإعدادات في sessionStorage
            const settingsToBackup = [
                'monjizCompanySettings',
                'monjizUserSettings',
                'monjizTaxSettings',
                'monjizSystemSettings',
                'monjizBackupSettings',
                'monjizCustomers',
                'monjizSuppliers',
                'monjizProducts',
                'monjizSales',
                'monjizPurchases',
                'monjizAccounts'
            ];
            
            settingsToBackup.forEach(key => {
                const value = localStorage.getItem(key);
                if (value) {
                    sessionStorage.setItem(`backup_${key}`, value);
                }
            });
            
            console.log('✅ تم عمل نسخة احتياطية من الإعدادات');
        } catch (error) {
            console.error('❌ خطأ في عمل نسخة احتياطية من الإعدادات:', error);
        }
    }
    
    // إضافة مستمع للتخزين لمزامنة حالة تسجيل الدخول بين التبويبات
    window.addEventListener('storage', function(event) {
        if (event.key === 'monjizLoggedIn') {
            // إذا تم تسجيل الخروج من تبويب آخر
            if (event.newValue !== 'true') {
                // مسح بيانات الجلسة من التبويب الحالي
                sessionStorage.removeItem('monjizLoggedIn');
                sessionStorage.removeItem('monjizCurrentUser');
                sessionStorage.removeItem('monjizLoginTime');
                
                // إعادة تحميل الصفحة للتحقق من حالة تسجيل الدخول
                window.location.reload();
            }
        }
    });
    
    console.log('✅ تم تحميل إصلاحات تسجيل الدخول وحفظ الإعدادات');
})();

    // إخفاء رابط إعداد النظام للمرة الأولى
    document.addEventListener('DOMContentLoaded', function() {
        const setupLink = document.querySelector('.setup-link');
        if (setupLink) {
            setupLink.style.display = 'none';
        }
    });