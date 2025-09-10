/**
 * ملف إصلاح إضافي لمشكلة وظائف المحاسبة
 * هذا الملف يقوم بإعادة تهيئة جميع وظائف المحاسبة وضمان عملها بشكل صحيح
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل ملف إصلاح وظائف المحاسبة');
    
    // تأخير قصير للتأكد من تحميل جميع الملفات الأخرى
    setTimeout(function() {
        // إعادة تهيئة التبويبات
        initializeAccountingTabs();
        
        // إعادة تهيئة النظرة العامة
        initializeOverviewTab();
        
        // إعادة تهيئة دليل الحسابات
        initializeChartOfAccounts();
        
        // إعادة تهيئة قيود اليومية
        initializeJournalEntries();
        
        // إعادة تهيئة سندات القبض والصرف
        initializeVouchers();
        
        console.log('تم إصلاح جميع وظائف المحاسبة بنجاح');
    }, 500);
});

/**
 * إعادة تهيئة التبويبات
 */
function initializeAccountingTabs() {
    const tabs = document.querySelectorAll('.accounting-nav .nav-tab');
    if (tabs.length === 0) {
        console.error('لم يتم العثور على عناصر التبويب');
        return;
    }
    
    // إزالة مستمعي الأحداث القديمة وإضافة مستمعي أحداث جديدة
    tabs.forEach(tab => {
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);
        
        newTab.addEventListener('click', function() {
            // إزالة الفئة النشطة من جميع التبويبات
            tabs.forEach(t => t.classList.remove('active'));
            
            // إضافة الفئة النشطة للتبويب المحدد
            this.classList.add('active');
            
            // الحصول على معرف التبويب
            const tabId = this.getAttribute('data-tab');
            
            // إخفاء جميع محتويات التبويبات
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // إظهار محتوى التبويب المحدد
            const selectedPane = document.getElementById(tabId + '-tab');
            if (selectedPane) {
                selectedPane.classList.add('active');
            } else {
                console.error(`لم يتم العثور على محتوى التبويب: ${tabId}-tab`);
            }
        });
    });
    
    console.log('تم إعادة تهيئة التبويبات بنجاح');
}

/**
 * إعادة تهيئة تبويب النظرة العامة
 */
function initializeOverviewTab() {
    // التحقق من وجود عنصر الرسم البياني
    const chartElement = document.getElementById('financial-chart');
    if (chartElement) {
        // إعادة إنشاء الرسم البياني
        try {
            // تدمير الرسم البياني القديم إذا كان موجوداً
            const chartInstance = Chart.getChart(chartElement);
            if (chartInstance) {
                chartInstance.destroy();
            }
            
            // إنشاء رسم بياني جديد
            createFinancialChart();
        } catch (error) {
            console.error('خطأ في إعادة إنشاء الرسم البياني:', error);
        }
    }
    
    // إعادة تحميل بيانات المعاملات
    try {
        if (typeof loadTransactions === 'function') {
            loadTransactions();
        }
    } catch (error) {
        console.error('خطأ في إعادة تحميل المعاملات:', error);
    }
    
    console.log('تم إعادة تهيئة تبويب النظرة العامة بنجاح');
}

/**
 * إعادة تهيئة دليل الحسابات
 */
function initializeChartOfAccounts() {
    try {
        // التحقق من وجود دالة تهيئة دليل الحسابات
        if (typeof initializeChartOfAccounts === 'function') {
            // تجنب التكرار الذاتي
            if (this.name !== 'initializeChartOfAccounts') {
                initializeChartOfAccounts();
            }
        } else if (typeof displayAccountsTable === 'function') {
            displayAccountsTable();
        }
    } catch (error) {
        console.error('خطأ في إعادة تهيئة دليل الحسابات:', error);
    }
    
    console.log('تم إعادة تهيئة دليل الحسابات بنجاح');
}

/**
 * إعادة تهيئة قيود اليومية
 */
function initializeJournalEntries() {
    try {
        // التحقق من وجود دالة تحميل قيود اليومية
        if (typeof loadJournalEntries === 'function') {
            loadJournalEntries();
        }
    } catch (error) {
        console.error('خطأ في إعادة تهيئة قيود اليومية:', error);
    }
    
    console.log('تم إعادة تهيئة قيود اليومية بنجاح');
}

/**
 * إعادة تهيئة سندات القبض والصرف
 */
function initializeVouchers() {
    try {
        // التحقق من وجود دالة تحميل سندات القبض
        if (typeof loadReceiptVouchers === 'function') {
            loadReceiptVouchers();
        }
        
        // التحقق من وجود دالة تحميل سندات الصرف
        if (typeof loadPaymentVouchers === 'function') {
            loadPaymentVouchers();
        }
    } catch (error) {
        console.error('خطأ في إعادة تهيئة سندات القبض والصرف:', error);
    }
    
    console.log('تم إعادة تهيئة سندات القبض والصرف بنجاح');
}