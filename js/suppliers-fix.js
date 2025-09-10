/**
 * إصلاح مشكلة ظهور المورد مرتين في دليل الحسابات
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 تم تحميل إصلاح مشكلة الموردين');
    
    // الدالة الأصلية التي تضيف المورد لدليل الحسابات
    const originalAddSupplierToAccounts = window.addSupplierToAccounts;
    
    // استبدال الدالة بدالة جديدة لا تقوم بأي شيء
    window.addSupplierToAccounts = function(supplier) {
        console.log('🛑 تم منع الإضافة المزدوجة للمورد في دليل الحسابات:', supplier.name);
        // لا تقم بأي شيء، لأن dataManager.addSupplier قد أضاف المورد بالفعل
        return null;
    };
    
    console.log('✅ تم تطبيق إصلاح مشكلة ظهور المورد مرتين في دليل الحسابات');
});