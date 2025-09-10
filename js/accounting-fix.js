/**
 * ملف إصلاح مشكلة وظائف إدارة الحسابات
 * هذا الملف يعالج مشكلة عدم عمل وظائف إدارة الحسابات مثل نظرة عامة، دليل الحسابات، قيد اليومية، سند القبض، سند الصرف
 */

document.addEventListener('DOMContentLoaded', function() {
    // إصلاح مشكلة التبويبات في صفحة الحسابات
    fixAccountingTabs();
    
    // إصلاح مشكلة عرض البيانات في تبويب النظرة العامة
    fixOverviewTab();
    
    // إصلاح مشكلة عرض دليل الحسابات
    fixChartOfAccounts();
    
    // إصلاح مشكلة قيد اليومية
    fixJournalEntries();
    
    // إصلاح مشكلة سندات القبض والصرف
    fixVouchers();
    
    // تم إلغاء رسالة التأكيد
    // showFixConfirmation();
});

/**
 * إصلاح مشكلة التبويبات في صفحة الحسابات
 */
function fixAccountingTabs() {
    // التحقق من وجود التبويبات
    const tabs = document.querySelectorAll('.accounting-nav .nav-tab');
    if (tabs.length === 0) {
        console.error('لم يتم العثور على عناصر التبويب');
        return;
    }
    
    // إعادة تعيين مستمعي الأحداث للتبويبات
    tabs.forEach(tab => {
        // إزالة مستمعي الأحداث القديمة لتجنب التكرار
        const newTab = tab.cloneNode(true);
        tab.parentNode.replaceChild(newTab, tab);
        
        // إضافة مستمع حدث جديد
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
    
    console.log('تم إصلاح مشكلة التبويبات بنجاح');
}

/**
 * إصلاح مشكلة عرض البيانات في تبويب النظرة العامة
 */
function fixOverviewTab() {
    // التحقق من وجود عنصر الرسم البياني
    const chartElement = document.getElementById('financial-chart');
    if (!chartElement) {
        // إذا لم يتم العثور على عنصر الرسم البياني، قم بإنشائه
        const chartContainer = document.querySelector('.chart-body');
        if (chartContainer) {
            const canvas = document.createElement('canvas');
            canvas.id = 'financial-chart';
            chartContainer.appendChild(canvas);
            console.log('تم إنشاء عنصر الرسم البياني');
            
            // إنشاء الرسم البياني
            createFinancialChart();
        }
    }
    
    // التحقق من وجود جدول المعاملات
    const transactionsTable = document.getElementById('transactions-table-body');
    if (transactionsTable) {
        // إعادة تحميل بيانات المعاملات
        loadTransactions();
    }
    
    console.log('تم إصلاح مشكلة تبويب النظرة العامة');
}

/**
 * إصلاح مشكلة عرض دليل الحسابات
 */
function fixChartOfAccounts() {
    // التحقق من وجود شجرة الحسابات
    const accountsTree = document.getElementById('accounts-tree');
    if (accountsTree) {
        // إعادة تحميل بيانات دليل الحسابات
        loadChartOfAccounts();
    }
    
    console.log('تم إصلاح مشكلة دليل الحسابات');
}

/**
 * إصلاح مشكلة قيد اليومية
 */
function fixJournalEntries() {
    // التحقق من وجود تبويب قيد اليومية
    const journalTab = document.getElementById('journal-entries-tab');
    if (journalTab) {
        // إعادة تحميل بيانات قيود اليومية
        loadJournalEntries();
    }
    
    console.log('تم إصلاح مشكلة قيد اليومية');
}

/**
 * إصلاح مشكلة سندات القبض والصرف
 */
function fixVouchers() {
    // التحقق من وجود تبويب سند القبض
    const receiptTab = document.getElementById('receipt-voucher-tab');
    if (receiptTab) {
        // إعادة تحميل بيانات سندات القبض
        loadReceiptVouchers();
    }
    
    // التحقق من وجود تبويب سند الصرف
    const paymentTab = document.getElementById('payment-voucher-tab');
    if (paymentTab) {
        // إعادة تحميل بيانات سندات الصرف
        loadPaymentVouchers();
    }
    
    console.log('تم إصلاح مشكلة سندات القبض والصرف');
}

/**
 * إنشاء الرسم البياني للإيرادات والمصروفات
 */
function createFinancialChart() {
    const ctx = document.getElementById('financial-chart');
    if (!ctx) {
        console.error('لم يتم العثور على عنصر الرسم البياني');
        return;
    }
    
    // بيانات الرسم البياني (نموذج)
    const chartData = {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'],
        datasets: [
            {
                label: 'الإيرادات',
                data: [12000, 15000, 10000, 18000, 14000, 15500, 17000],
                backgroundColor: 'rgba(39, 174, 96, 0.2)',
                borderColor: 'rgba(39, 174, 96, 1)',
                borderWidth: 2,
                tension: 0.4
            },
            {
                label: 'المصروفات',
                data: [8000, 9000, 7500, 10000, 8500, 9950, 10500],
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2,
                tension: 0.4
            }
        ]
    };

    // إنشاء الرسم البياني
    try {
        new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'end',
                        labels: {
                            boxWidth: 15,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += formatCurrency(context.raw);
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return formatCurrency(value, true);
                            }
                        }
                    }
                }
            }
        });
        console.log('تم إنشاء الرسم البياني بنجاح');
    } catch (error) {
        console.error('خطأ في إنشاء الرسم البياني:', error);
    }
}

/**
 * تحميل بيانات المعاملات
 */
function loadTransactions() {
    // بيانات المعاملات (نموذج)
    const transactions = [
        { id: 1, date: '2023-06-01', type: 'income', category: 'المبيعات', description: 'مبيعات شهر يونيو', amount: 5000, reference: 'INV-2023-001' },
        { id: 2, date: '2023-06-05', type: 'expense', category: 'الإيجار', description: 'إيجار المكتب', amount: 1200, reference: 'RENT-2023-06' },
        { id: 3, date: '2023-06-10', type: 'income', category: 'الخدمات', description: 'خدمات استشارية', amount: 2500, reference: 'SRV-2023-010' },
        { id: 4, date: '2023-06-15', type: 'expense', category: 'الرواتب', description: 'رواتب الموظفين', amount: 3500, reference: 'SAL-2023-06' },
        { id: 5, date: '2023-06-20', type: 'expense', category: 'المرافق', description: 'فواتير الكهرباء والماء', amount: 350, reference: 'UTIL-2023-06' }
    ];
    
    const tableBody = document.getElementById('transactions-table-body');
    if (!tableBody) {
        console.error('لم يتم العثور على جدول المعاملات');
        return;
    }
    
    // مسح الجدول
    tableBody.innerHTML = '';
    
    // إضافة المعاملات إلى الجدول
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.reference}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td>
                <span class="transaction-type ${transaction.type === 'income' ? 'type-income' : 'type-expense'}">
                    ${transaction.type === 'income' ? 'إيراد' : 'مصروف'}
                </span>
            </td>
            <td class="transaction-amount ${transaction.type === 'income' ? 'amount-income' : 'amount-expense'}">
                ${formatCurrency(transaction.amount)}
            </td>
            <td>الصندوق</td>
            <td>
                <div class="transaction-actions">
                    <button class="action-btn view-btn" data-id="${transaction.id}" title="عرض التفاصيل">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" data-id="${transaction.id}" title="تعديل">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${transaction.id}" title="حذف">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    console.log('تم تحميل بيانات المعاملات بنجاح');
}

/**
 * تحميل بيانات دليل الحسابات
 */
function loadChartOfAccounts() {
    // بيانات دليل الحسابات (نموذج)
    const accounts = [
        { id: 1, code: '1000', name: 'الأصول', type: 'assets', parent: null, hasChildren: true },
        { id: 2, code: '1100', name: 'الأصول المتداولة', type: 'assets', parent: 1, hasChildren: true },
        { id: 3, code: '1110', name: 'النقدية', type: 'assets', parent: 2, hasChildren: true },
        { id: 4, code: '1111', name: 'الصندوق', type: 'assets', parent: 3, hasChildren: false },
        { id: 5, code: '1112', name: 'البنك', type: 'assets', parent: 3, hasChildren: false },
        { id: 6, code: '2000', name: 'الخصوم', type: 'liabilities', parent: null, hasChildren: true },
        { id: 7, code: '3000', name: 'حقوق الملكية', type: 'equity', parent: null, hasChildren: true },
        { id: 8, code: '4000', name: 'الإيرادات', type: 'revenue', parent: null, hasChildren: true },
        { id: 9, code: '5000', name: 'المصروفات', type: 'expenses', parent: null, hasChildren: true }
    ];
    
    const accountsTree = document.getElementById('accounts-tree');
    if (!accountsTree) {
        console.error('لم يتم العثور على شجرة الحسابات');
        return;
    }
    
    // مسح الشجرة
    accountsTree.innerHTML = '';
    
    // إنشاء شجرة الحسابات
    const rootAccounts = accounts.filter(account => account.parent === null);
    
    rootAccounts.forEach(account => {
        const accountElement = createAccountElement(account, accounts);
        accountsTree.appendChild(accountElement);
    });
    
    console.log('تم تحميل بيانات دليل الحسابات بنجاح');
}

/**
 * إنشاء عنصر حساب في شجرة الحسابات
 */
function createAccountElement(account, allAccounts) {
    const accountElement = document.createElement('div');
    accountElement.className = 'account-item';
    accountElement.setAttribute('data-id', account.id);
    
    // إنشاء رأس الحساب
    const accountHeader = document.createElement('div');
    accountHeader.className = 'account-header';
    
    // إضافة زر التوسيع/الطي إذا كان الحساب له أبناء
    if (account.hasChildren) {
        const expandButton = document.createElement('button');
        expandButton.className = 'expand-btn';
        expandButton.innerHTML = '<i class="fas fa-chevron-down"></i>';
        expandButton.addEventListener('click', function() {
            const accountChildren = accountElement.querySelector('.account-children');
            if (accountChildren) {
                accountChildren.classList.toggle('expanded');
                expandButton.querySelector('i').classList.toggle('fa-chevron-down');
                expandButton.querySelector('i').classList.toggle('fa-chevron-left');
            }
        });
        accountHeader.appendChild(expandButton);
    } else {
        // إضافة مساحة فارغة للمحاذاة
        const spacer = document.createElement('span');
        spacer.className = 'expand-spacer';
        accountHeader.appendChild(spacer);
    }
    
    // إضافة معلومات الحساب
    const accountInfo = document.createElement('div');
    accountInfo.className = 'account-info';
    accountInfo.innerHTML = `
        <span class="account-code">${account.code}</span>
        <span class="account-name">${account.name}</span>
        <span class="account-type">${getAccountTypeName(account.type)}</span>
    `;
    accountHeader.appendChild(accountInfo);
    
    // إضافة أزرار الإجراءات
    const accountActions = document.createElement('div');
    accountActions.className = 'account-actions';
    accountActions.innerHTML = `
        <button class="action-btn view-btn" data-id="${account.id}" title="عرض التفاصيل">
            <i class="fas fa-eye"></i>
        </button>
        <button class="action-btn edit-btn" data-id="${account.id}" title="تعديل">
            <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete-btn" data-id="${account.id}" title="حذف">
            <i class="fas fa-trash"></i>
        </button>
    `;
    accountHeader.appendChild(accountActions);
    
    accountElement.appendChild(accountHeader);
    
    // إضافة الأبناء إذا كان الحساب له أبناء
    if (account.hasChildren) {
        const childAccounts = allAccounts.filter(a => a.parent === account.id);
        
        if (childAccounts.length > 0) {
            const accountChildren = document.createElement('div');
            accountChildren.className = 'account-children';
            
            childAccounts.forEach(childAccount => {
                const childElement = createAccountElement(childAccount, allAccounts);
                accountChildren.appendChild(childElement);
            });
            
            accountElement.appendChild(accountChildren);
        }
    }
    
    return accountElement;
}

/**
 * الحصول على اسم نوع الحساب
 */
function getAccountTypeName(type) {
    switch (type) {
        case 'assets':
            return 'أصول';
        case 'liabilities':
            return 'خصوم';
        case 'equity':
            return 'حقوق ملكية';
        case 'revenue':
            return 'إيرادات';
        case 'expenses':
            return 'مصروفات';
        default:
            return type;
    }
}

/**
 * تحميل بيانات قيود اليومية
 */
function loadJournalEntries() {
    // التحقق من وجود تبويب قيد اليومية
    const journalTab = document.getElementById('journal-entries-tab');
    if (!journalTab) {
        console.error('لم يتم العثور على تبويب قيد اليومية');
        return;
    }
    
    // إنشاء محتوى تبويب قيد اليومية إذا كان فارغًا
    if (journalTab.children.length === 0) {
        journalTab.innerHTML = `
            <div class="section-header">
                <h3><i class="fas fa-journal-whills"></i> قيود اليومية</h3>
                <div class="header-actions">
                    <button class="btn secondary-btn add-entry-btn" onclick="showAddJournalEntryModal()">
                        <i class="fas fa-plus"></i> إضافة قيد
                    </button>
                    <button class="btn secondary-btn import-entries-btn" onclick="importJournalEntries()">
                        <i class="fas fa-upload"></i> استيراد
                    </button>
                    <button class="btn secondary-btn export-entries-btn" onclick="exportJournalEntries()">
                        <i class="fas fa-download"></i> تصدير
                    </button>
                </div>
            </div>
            
            <div class="journal-entries-search-filter">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="journal-entries-search" placeholder="البحث في قيود اليومية...">
                </div>
                <div class="filter-options">
                    <div class="date-range">
                        <div class="date-input">
                            <label for="journal-start-date">من تاريخ:</label>
                            <input type="date" id="journal-start-date">
                        </div>
                        <div class="date-input">
                            <label for="journal-end-date">إلى تاريخ:</label>
                            <input type="date" id="journal-end-date">
                        </div>
                        <button class="apply-date-btn">تطبيق</button>
                    </div>
                </div>
            </div>
            
            <div class="journal-entries-table-container">
                <table class="journal-entries-table">
                    <thead>
                        <tr>
                            <th>التاريخ</th>
                            <th>رقم القيد</th>
                            <th>البيان</th>
                            <th>المبلغ</th>
                            <th>الحالة</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody id="journal-entries-table-body">
                        <!-- سيتم إضافة قيود اليومية هنا -->
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // تحميل بيانات قيود اليومية
    const journalEntries = [
        { id: 1, date: '2023-06-01', number: 'JE-2023-001', description: 'قيد افتتاحي', amount: 10000, status: 'مرحل' },
        { id: 2, date: '2023-06-05', number: 'JE-2023-002', description: 'مبيعات نقدية', amount: 5000, status: 'مرحل' },
        { id: 3, date: '2023-06-10', number: 'JE-2023-003', description: 'مصروفات تشغيلية', amount: 2500, status: 'معلق' },
        { id: 4, date: '2023-06-15', number: 'JE-2023-004', description: 'رواتب الموظفين', amount: 7500, status: 'معلق' },
        { id: 5, date: '2023-06-20', number: 'JE-2023-005', description: 'إيرادات خدمات', amount: 3500, status: 'مرحل' }
    ];
    
    const tableBody = document.getElementById('journal-entries-table-body');
    if (tableBody) {
        // مسح الجدول
        tableBody.innerHTML = '';
        
        // إضافة قيود اليومية إلى الجدول
        journalEntries.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.date}</td>
                <td>${entry.number}</td>
                <td>${entry.description}</td>
                <td>${formatCurrency(entry.amount)}</td>
                <td><span class="status-badge ${entry.status === 'مرحل' ? 'status-posted' : 'status-pending'}">${entry.status}</span></td>
                <td>
                    <div class="entry-actions">
                        <button class="action-btn view-btn" data-id="${entry.id}" title="عرض التفاصيل">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" data-id="${entry.id}" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${entry.id}" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    console.log('تم تحميل بيانات قيود اليومية بنجاح');
}

/**
 * تحميل بيانات سندات القبض
 */
function loadReceiptVouchers() {
    // التحقق من وجود تبويب سند القبض
    const receiptTab = document.getElementById('receipt-voucher-tab');
    if (!receiptTab) {
        console.error('لم يتم العثور على تبويب سند القبض');
        return;
    }
    
    // إنشاء محتوى تبويب سند القبض إذا كان فارغًا
    if (receiptTab.children.length === 0) {
        receiptTab.innerHTML = `
            <div class="section-header">
                <h3><i class="fas fa-receipt"></i> سندات القبض</h3>
                <div class="header-actions">
                    <button class="btn secondary-btn add-receipt-btn" onclick="showAddReceiptVoucherModal()">
                        <i class="fas fa-plus"></i> إضافة سند قبض
                    </button>
                    <button class="btn secondary-btn import-receipts-btn" onclick="importReceiptVouchers()">
                        <i class="fas fa-upload"></i> استيراد
                    </button>
                    <button class="btn secondary-btn export-receipts-btn" onclick="exportReceiptVouchers()">
                        <i class="fas fa-download"></i> تصدير
                    </button>
                </div>
            </div>
            
            <div class="receipt-vouchers-search-filter">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="receipt-vouchers-search" placeholder="البحث في سندات القبض...">
                </div>
                <div class="filter-options">
                    <div class="date-range">
                        <div class="date-input">
                            <label for="receipt-start-date">من تاريخ:</label>
                            <input type="date" id="receipt-start-date">
                        </div>
                        <div class="date-input">
                            <label for="receipt-end-date">إلى تاريخ:</label>
                            <input type="date" id="receipt-end-date">
                        </div>
                        <button class="apply-date-btn">تطبيق</button>
                    </div>
                </div>
            </div>
            
            <div class="receipt-vouchers-table-container">
                <table class="receipt-vouchers-table">
                    <thead>
                        <tr>
                            <th>التاريخ</th>
                            <th>رقم السند</th>
                            <th>المستلم من</th>
                            <th>البيان</th>
                            <th>المبلغ</th>
                            <th>طريقة الدفع</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody id="receipt-vouchers-table-body">
                        <!-- سيتم إضافة سندات القبض هنا -->
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // تحميل بيانات سندات القبض
    const receiptVouchers = [
        { id: 1, date: '2023-06-01', number: 'RV-2023-001', from: 'شركة الأمل', description: 'دفعة مقدمة', amount: 5000, paymentMethod: 'نقدي' },
        { id: 2, date: '2023-06-05', number: 'RV-2023-002', from: 'مؤسسة النور', description: 'تسديد فاتورة', amount: 3500, paymentMethod: 'شيك' },
        { id: 3, date: '2023-06-10', number: 'RV-2023-003', from: 'محمد أحمد', description: 'دفعة جزئية', amount: 1500, paymentMethod: 'تحويل بنكي' },
        { id: 4, date: '2023-06-15', number: 'RV-2023-004', from: 'شركة الصفا', description: 'تسديد فاتورة', amount: 4200, paymentMethod: 'نقدي' },
        { id: 5, date: '2023-06-20', number: 'RV-2023-005', from: 'مؤسسة الرياض', description: 'دفعة مقدمة', amount: 2800, paymentMethod: 'شيك' }
    ];
    
    const tableBody = document.getElementById('receipt-vouchers-table-body');
    if (tableBody) {
        // مسح الجدول
        tableBody.innerHTML = '';
        
        // إضافة سندات القبض إلى الجدول
        receiptVouchers.forEach(voucher => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${voucher.date}</td>
                <td>${voucher.number}</td>
                <td>${voucher.from}</td>
                <td>${voucher.description}</td>
                <td>${formatCurrency(voucher.amount)}</td>
                <td>${voucher.paymentMethod}</td>
                <td>
                    <div class="voucher-actions">
                        <button class="action-btn view-btn" data-id="${voucher.id}" title="عرض التفاصيل">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" data-id="${voucher.id}" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn print-btn" data-id="${voucher.id}" title="طباعة">
                            <i class="fas fa-print"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${voucher.id}" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    console.log('تم تحميل بيانات سندات القبض بنجاح');
}

/**
 * تحميل بيانات سندات الصرف
 */
function loadPaymentVouchers() {
    // التحقق من وجود تبويب سند الصرف
    const paymentTab = document.getElementById('payment-voucher-tab');
    if (!paymentTab) {
        console.error('لم يتم العثور على تبويب سند الصرف');
        return;
    }
    
    // إنشاء محتوى تبويب سند الصرف إذا كان فارغًا
    if (paymentTab.children.length === 0) {
        paymentTab.innerHTML = `
            <div class="section-header">
                <h3><i class="fas fa-money-bill-wave"></i> سندات الصرف</h3>
                <div class="header-actions">
                    <button class="btn secondary-btn add-payment-btn" onclick="showAddPaymentVoucherModal()">
                        <i class="fas fa-plus"></i> إضافة سند صرف
                    </button>
                    <button class="btn secondary-btn import-payments-btn" onclick="importPaymentVouchers()">
                        <i class="fas fa-upload"></i> استيراد
                    </button>
                    <button class="btn secondary-btn export-payments-btn" onclick="exportPaymentVouchers()">
                        <i class="fas fa-download"></i> تصدير
                    </button>
                </div>
            </div>
            
            <div class="payment-vouchers-search-filter">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="payment-vouchers-search" placeholder="البحث في سندات الصرف...">
                </div>
                <div class="filter-options">
                    <div class="date-range">
                        <div class="date-input">
                            <label for="payment-start-date">من تاريخ:</label>
                            <input type="date" id="payment-start-date">
                        </div>
                        <div class="date-input">
                            <label for="payment-end-date">إلى تاريخ:</label>
                            <input type="date" id="payment-end-date">
                        </div>
                        <button class="apply-date-btn">تطبيق</button>
                    </div>
                </div>
            </div>
            
            <div class="payment-vouchers-table-container">
                <table class="payment-vouchers-table">
                    <thead>
                        <tr>
                            <th>التاريخ</th>
                            <th>رقم السند</th>
                            <th>المدفوع له</th>
                            <th>البيان</th>
                            <th>المبلغ</th>
                            <th>طريقة الدفع</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody id="payment-vouchers-table-body">
                        <!-- سيتم إضافة سندات الصرف هنا -->
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // تحميل بيانات سندات الصرف
    const paymentVouchers = [
        { id: 1, date: '2023-06-01', number: 'PV-2023-001', to: 'شركة التوريدات', description: 'شراء مواد', amount: 3500, paymentMethod: 'شيك' },
        { id: 2, date: '2023-06-05', number: 'PV-2023-002', to: 'مؤسسة الخدمات', description: 'صيانة دورية', amount: 1200, paymentMethod: 'نقدي' },
        { id: 3, date: '2023-06-10', number: 'PV-2023-003', to: 'شركة الكهرباء', description: 'فاتورة كهرباء', amount: 850, paymentMethod: 'تحويل بنكي' },
        { id: 4, date: '2023-06-15', number: 'PV-2023-004', to: 'الموظفين', description: 'رواتب شهرية', amount: 7500, paymentMethod: 'تحويل بنكي' },
        { id: 5, date: '2023-06-20', number: 'PV-2023-005', to: 'مكتب المحاسبة', description: 'خدمات محاسبية', amount: 1500, paymentMethod: 'شيك' }
    ];
    
    const tableBody = document.getElementById('payment-vouchers-table-body');
    if (tableBody) {
        // مسح الجدول
        tableBody.innerHTML = '';
        
        // إضافة سندات الصرف إلى الجدول
        paymentVouchers.forEach(voucher => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${voucher.date}</td>
                <td>${voucher.number}</td>
                <td>${voucher.to}</td>
                <td>${voucher.description}</td>
                <td>${formatCurrency(voucher.amount)}</td>
                <td>${voucher.paymentMethod}</td>
                <td>
                    <div class="voucher-actions">
                        <button class="action-btn view-btn" data-id="${voucher.id}" title="عرض التفاصيل">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" data-id="${voucher.id}" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn print-btn" data-id="${voucher.id}" title="طباعة">
                            <i class="fas fa-print"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${voucher.id}" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    
    console.log('تم تحميل بيانات سندات الصرف بنجاح');
}

/**
 * تنسيق المبلغ كعملة
 */
function formatCurrency(amount, short = false) {
    if (short) {
        // تنسيق مختصر للرسوم البيانية
        if (amount >= 1000000) {
            return (amount / 1000000).toFixed(1) + ' م';
        } else if (amount >= 1000) {
            return (amount / 1000).toFixed(1) + ' ألف';
        } else {
            return amount.toFixed(0);
        }
    }
    
    // تنسيق كامل للعرض العادي
    return amount.toLocaleString('ar-SA', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * عرض رسالة تأكيد الإصلاح
 */
function showFixConfirmation() {
    // إنشاء عنصر الرسالة
    const messageElement = document.createElement('div');
    messageElement.className = 'fix-confirmation-message';
    messageElement.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <p>تم إصلاح مشكلة وظائف إدارة الحسابات بنجاح!</p>
        </div>
        <button class="close-btn"><i class="fas fa-times"></i></button>
    `;
    
    // إضافة الأنماط
    const style = document.createElement('style');
    style.textContent = `
        .fix-confirmation-message {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #2ecc71;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 9999;
            animation: slideIn 0.5s ease-out;
        }
        
        .message-content {
            display: flex;
            align-items: center;
        }
        
        .message-content i {
            font-size: 24px;
            margin-left: 10px;
        }
        
        .message-content p {
            margin: 0;
            font-size: 16px;
        }
        
        .close-btn {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 16px;
            margin-right: 10px;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    // إضافة العناصر إلى الصفحة
    document.head.appendChild(style);
    document.body.appendChild(messageElement);
    
    // إضافة مستمع حدث لزر الإغلاق
    const closeBtn = messageElement.querySelector('.close-btn');
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(messageElement);
    });
    
    // إخفاء الرسالة تلقائيًا بعد 5 ثوانٍ
    setTimeout(() => {
        if (document.body.contains(messageElement)) {
            document.body.removeChild(messageElement);
        }
    }, 5000);
}