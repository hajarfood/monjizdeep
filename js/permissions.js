// نظام التحقق من صلاحيات المستخدمين

(function() {
    // تعريف الصلاحيات لكل دور
    const rolePermissions = {
        'admin': {
            // المدير لديه وصول كامل لجميع الصفحات
            'settings.html': true,
            'sales.html': true,
            'purchases.html': true,
            'products.html': true,
            'customers.html': true,
            'suppliers.html': true,
            'accounting.html': true,
            'reports.html': true,
            'index.html': true,
            // صلاحيات الحذف والتعديل للمدير (كاملة)
            'actions': {
                'sales': { 'edit': true, 'delete': true },
                'purchases': { 'edit': true, 'delete': true },
                'products': { 'edit': true, 'delete': true },
                'customers': { 'edit': true, 'delete': true },
                'suppliers': { 'edit': true, 'delete': true },
                'accounting': { 'edit': true, 'delete': true }
            }
        },
        'manager': {
            // المدير لديه وصول لمعظم الصفحات ولكن ليس الإعدادات
            'settings.html': false,
            'sales.html': true,
            'purchases.html': true,
            'products.html': true,
            'customers.html': true,
            'suppliers.html': true,
            'accounting.html': true,
            'reports.html': true,
            'index.html': true,
            // صلاحيات الحذف والتعديل للمدير (محدودة)
            'actions': {
                'sales': { 'edit': true, 'delete': true },
                'purchases': { 'edit': true, 'delete': true },
                'products': { 'edit': true, 'delete': true },
                'customers': { 'edit': true, 'delete': false },
                'suppliers': { 'edit': true, 'delete': false },
                'accounting': { 'edit': true, 'delete': false }
            }
        },
        'accountant': {
            // المحاسب لديه وصول للمحاسبة والتقارير والمشتريات
            'settings.html': false,
            'sales.html': false,
            'purchases.html': true,
            'products.html': false,
            'customers.html': false,
            'suppliers.html': true,
            'accounting.html': true,
            'reports.html': true,
            'index.html': true,
            // صلاحيات الحذف والتعديل للمحاسب
            'actions': {
                'sales': { 'edit': false, 'delete': false },
                'purchases': { 'edit': true, 'delete': false },
                'products': { 'edit': false, 'delete': false },
                'customers': { 'edit': false, 'delete': false },
                'suppliers': { 'edit': true, 'delete': false },
                'accounting': { 'edit': true, 'delete': true }
            }
        },
        'cashier': {
            // الكاشير لديه وصول للمبيعات والعملاء فقط
            'settings.html': false,
            'sales.html': true,
            'purchases.html': false,
            'products.html': false,
            'customers.html': true,
            'suppliers.html': false,
            'accounting.html': false,
            'reports.html': false,
            'index.html': true,
            // صلاحيات الحذف والتعديل للكاشير
            'actions': {
                'sales': { 'edit': true, 'delete': false },
                'purchases': { 'edit': false, 'delete': false },
                'products': { 'edit': false, 'delete': false },
                'customers': { 'edit': true, 'delete': false },
                'suppliers': { 'edit': false, 'delete': false },
                'accounting': { 'edit': false, 'delete': false }
            }
        },
        'seller': {
            // البائع لديه وصول للمبيعات والعملاء والمنتجات
            'settings.html': false,
            'sales.html': true,
            'purchases.html': false,
            'products.html': true,
            'customers.html': true,
            'suppliers.html': false,
            'accounting.html': false,
            'reports.html': false,
            'index.html': true,
            // صلاحيات الحذف والتعديل للبائع
            'actions': {
                'sales': { 'edit': true, 'delete': false },
                'purchases': { 'edit': false, 'delete': false },
                'products': { 'edit': true, 'delete': false },
                'customers': { 'edit': true, 'delete': false },
                'suppliers': { 'edit': false, 'delete': false },
                'accounting': { 'edit': false, 'delete': false }
            }
        }
    };
    
    // دالة التحقق من صلاحيات المستخدم للصفحة الحالية
    function checkPagePermission() {
        try {
            // الحصول على دور المستخدم الحالي
            const userRole = localStorage.getItem('monjizCurrentUserRole') || 'admin';
            
            // الحصول على اسم الصفحة الحالية
            const currentPage = window.location.pathname.split('/').pop();
            
            // التحقق من وجود المستخدم
            const isLoggedIn = localStorage.getItem('monjizLoggedIn') === 'true';
            if (!isLoggedIn) {
                // إعادة توجيه لصفحة تسجيل الدخول
                window.location.href = 'login.html';
                return false;
            }
            
            // التحقق من صلاحيات المستخدم للصفحة الحالية
            const permissions = rolePermissions[userRole] || rolePermissions['admin'];
            
            // إذا كانت الصفحة هي login.html أو index.html، السماح بالوصول
            if (currentPage === 'login.html' || currentPage === '' || currentPage === 'index.html') {
                return true;
            }
            
            // التحقق من صلاحيات الوصول للصفحة الحالية
            if (!permissions[currentPage]) {
                alert('ليس لديك صلاحية للوصول إلى هذه الصفحة');
                window.location.href = 'index.html';
                return false;
            }
            
            return true;
        } catch (error) {
            console.error('❌ خطأ في التحقق من الصلاحيات:', error);
            return false;
        }
    }
    
    // دالة التحقق من صلاحيات الحذف والتعديل
    function checkActionPermission(module, action) {
        try {
            // الحصول على دور المستخدم الحالي
            const userRole = localStorage.getItem('monjizCurrentUserRole') || 'admin';
            
            // التحقق من صلاحيات المستخدم
            const permissions = rolePermissions[userRole] || rolePermissions['admin'];
            
            // التحقق من صلاحيات الإجراء المطلوب
            if (permissions.actions && 
                permissions.actions[module] && 
                permissions.actions[module][action] === true) {
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('❌ خطأ في التحقق من صلاحيات الإجراء:', error);
            return false;
        }
    }
    
    // تحميل الصلاحيات المخصصة من localStorage
    function loadCustomPermissions() {
        try {
            const permissionsData = JSON.parse(localStorage.getItem('monjizPermissionsSettings')) || {};
            
            // تحديث الصلاحيات في نظام الصلاحيات
            for (const role in permissionsData) {
                if (rolePermissions[role]) {
                    rolePermissions[role].actions = permissionsData[role];
                }
            }
            
            console.log('✅ تم تحميل الصلاحيات المخصصة من localStorage');
        } catch (error) {
            console.error('❌ خطأ في تحميل الصلاحيات المخصصة:', error);
        }
    }
    
    // إعداد صلاحيات الإجراءات (الحذف والتعديل)
    function setupActionPermissions() {
        // تحديد الصفحة الحالية
        const currentPage = window.location.pathname.split('/').pop();
        let module = '';
        
        // تحديد الوحدة بناءً على الصفحة الحالية
        if (currentPage === 'sales.html') module = 'sales';
        else if (currentPage === 'purchases.html') module = 'purchases';
        else if (currentPage === 'products.html') module = 'products';
        else if (currentPage === 'customers.html') module = 'customers';
        else if (currentPage === 'suppliers.html') module = 'suppliers';
        else if (currentPage === 'accounting.html') module = 'accounting';
        
        if (module) {
            // التحقق من صلاحيات التعديل
            if (!checkActionPermission(module, 'edit')) {
                // إخفاء أزرار التعديل
                document.querySelectorAll('.edit-btn, .update-btn, .action-btn.edit, [data-action="edit"], button[onclick*="editInvoice"], button[onclick*="edit"]').forEach(btn => {
                    btn.style.display = 'none';
                });
            }
            
            // التحقق من صلاحيات الحذف
            if (!checkActionPermission(module, 'delete')) {
                // إخفاء أزرار الحذف
                document.querySelectorAll('.delete-btn, .action-btn.delete, [data-action="delete"], button[onclick*="deleteInvoice"], button[onclick*="delete"], button[onclick*="confirmDeleteInvoice"]').forEach(btn => {
                    btn.style.display = 'none';
                });
                
                // تعطيل وظائف الحذف
                if (typeof window.deleteInvoice === 'function') {
                    window.originalDeleteInvoice = window.deleteInvoice;
                    window.deleteInvoice = function() {
                        console.log('❌ ليس لديك صلاحية لحذف الفواتير');
                        return false;
                    };
                }
                
                if (typeof window.confirmDeleteInvoice === 'function') {
                    window.originalConfirmDeleteInvoice = window.confirmDeleteInvoice;
                    window.confirmDeleteInvoice = function() {
                        console.log('❌ ليس لديك صلاحية لحذف الفواتير');
                        return false;
                    };
                }
            }
        }
    }
    
    // تنفيذ التحقق من الصلاحيات عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        // تحميل الصلاحيات المخصصة أولاً
        loadCustomPermissions();
        
        // ثم التحقق من الصلاحيات
        checkPagePermission();
        setupActionPermissions();
    });
    
    // إضافة متغير الصلاحيات للنافذة العامة
    window.rolePermissions = rolePermissions;
    
    // إضافة الدوال للنافذة العامة
    window.checkPagePermission = checkPagePermission;
    window.checkActionPermission = checkActionPermission;
    window.loadCustomPermissions = loadCustomPermissions; // إضافة الدالة للنافذة العامة
    
    console.log('✅ تم تحميل نظام الصلاحيات');
})();