// ملف JavaScript لصفحة الحسابات

document.addEventListener('DOMContentLoaded', function() {
    // بيانات المعاملات المالية (نموذج)
    const transactions = [
        { id: 1, date: '2023-06-01', type: 'income', category: 'المبيعات', description: 'مبيعات شهر يونيو', amount: 5000, reference: 'INV-2023-001' },
        { id: 2, date: '2023-06-05', type: 'expense', category: 'الإيجار', description: 'إيجار المكتب', amount: 1200, reference: 'RENT-2023-06' },
        { id: 3, date: '2023-06-10', type: 'income', category: 'الخدمات', description: 'خدمات استشارية', amount: 2500, reference: 'SRV-2023-010' },
        { id: 4, date: '2023-06-15', type: 'expense', category: 'الرواتب', description: 'رواتب الموظفين', amount: 3500, reference: 'SAL-2023-06' },
        { id: 5, date: '2023-06-20', type: 'expense', category: 'المرافق', description: 'فواتير الكهرباء والماء', amount: 350, reference: 'UTIL-2023-06' },
        { id: 6, date: '2023-06-25', type: 'income', category: 'المبيعات', description: 'مبيعات نهاية الشهر', amount: 4200, reference: 'INV-2023-002' },
        { id: 7, date: '2023-07-01', type: 'expense', category: 'التسويق', description: 'حملة إعلانية', amount: 800, reference: 'MKT-2023-07' },
        { id: 8, date: '2023-07-05', type: 'income', category: 'المبيعات', description: 'مبيعات بداية الشهر', amount: 3800, reference: 'INV-2023-003' },
        { id: 9, date: '2023-07-10', type: 'expense', category: 'الصيانة', description: 'صيانة المعدات', amount: 600, reference: 'MNT-2023-07' },
        { id: 10, date: '2023-07-15', type: 'expense', category: 'الرواتب', description: 'رواتب الموظفين', amount: 3500, reference: 'SAL-2023-07' }
    ];

    // فئات الإيرادات (نموذج)
    const incomeCategories = [
        { id: 1, name: 'المبيعات', icon: 'shopping-cart' },
        { id: 2, name: 'الخدمات', icon: 'cogs' },
        { id: 3, name: 'الاستثمارات', icon: 'chart-line' },
        { id: 4, name: 'الإيجارات', icon: 'building' },
        { id: 5, name: 'أخرى', icon: 'ellipsis-h' }
    ];

    // فئات المصروفات (نموذج)
    const expenseCategories = [
        { id: 1, name: 'الرواتب', icon: 'users' },
        { id: 2, name: 'الإيجار', icon: 'home' },
        { id: 3, name: 'المرافق', icon: 'bolt' },
        { id: 4, name: 'التسويق', icon: 'bullhorn' },
        { id: 5, name: 'الصيانة', icon: 'tools' },
        { id: 6, name: 'المشتريات', icon: 'shopping-basket' },
        { id: 7, name: 'أخرى', icon: 'ellipsis-h' }
    ];

    // تحميل البيانات الإحصائية
    loadFinancialStats();

    // إنشاء الرسم البياني
    createFinancialChart();

    // عرض المعاملات المالية مع التنقل
    displayTransactionsWithPagination(transactions);

    // عرض فئات الإيرادات والمصروفات
    displayCategories(incomeCategories, expenseCategories);

    // إضافة مستمعي الأحداث
    setupEventListeners();

    // تهيئة دليل الحسابات
    initChartOfAccounts();

    // تهيئة التبويبات
    initTabs();

    // التحقق من تهيئة التبويبات
    setTimeout(() => {
        const tabs = document.querySelectorAll('.nav-tab');
        const panes = document.querySelectorAll('.tab-pane');
        if (tabs.length === 0 || panes.length === 0) {
            console.error('خطأ: لم يتم العثور على التبويبات أو اللوحات');
        }
    }, 1000);

    // إعداد مستمعي الأحداث لدليل الحسابات
    setupAccountsEventListeners();

    // تحميل البيانات الأولية
    loadInitialData();

    // إضافة زر الاختبار (للتطوير فقط)
    // addTestButton();
});

// دالة لتحميل البيانات الإحصائية
function loadFinancialStats() {
    // في التطبيق الحقيقي، هذه البيانات ستأتي من الخادم
    const stats = {
        income: 15500,
        expenses: 9950,
        profit: 5550,
        balance: 25550
    };

    // تحديث قيم الإحصائيات
    document.querySelector('.income .stat-value').textContent = formatCurrency(stats.income);
    document.querySelector('.expenses .stat-value').textContent = formatCurrency(stats.expenses);
    document.querySelector('.profit .stat-value').textContent = formatCurrency(stats.profit);
    document.querySelector('.balance .stat-value').textContent = formatCurrency(stats.balance);
}

// دالة لإنشاء الرسم البياني للإيرادات والمصروفات
function createFinancialChart() {
    const ctx = document.getElementById('financialChart').getContext('2d');
    
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
}

// دالة لعرض المعاملات المالية
function displayTransactions(transactions) {
    const tableBody = document.querySelector('.transactions-table tbody');
    tableBody.innerHTML = '';

    if (transactions.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="7" class="text-center">لا توجد معاملات مالية</td>`;
        tableBody.appendChild(emptyRow);
        return;
    }

    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>
                <span class="transaction-type ${transaction.type === 'income' ? 'type-income' : 'type-expense'}">
                    ${transaction.type === 'income' ? 'إيراد' : 'مصروف'}
                </span>
            </td>
            <td>${transaction.category}</td>
            <td>${transaction.description}</td>
            <td>${transaction.reference}</td>
            <td class="transaction-amount ${transaction.type === 'income' ? 'amount-income' : 'amount-expense'}">
                ${formatCurrency(transaction.amount)}
            </td>
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

    // إضافة مستمعي الأحداث لأزرار الإجراءات
    addTransactionActionListeners();
}

// دالة لعرض فئات الإيرادات والمصروفات
function displayCategories(incomeCategories, expenseCategories) {
    const incomeList = document.querySelector('.income-categories');
    const expenseList = document.querySelector('.expense-categories');

    // عرض فئات الإيرادات
    incomeList.innerHTML = '';
    incomeCategories.forEach(category => {
        const item = document.createElement('li');
        item.className = 'category-item income-category';
        item.innerHTML = `
            <div class="category-name">
                <div class="category-icon">
                    <i class="fas fa-${category.icon}"></i>
                </div>
                <span>${category.name}</span>
            </div>
            <div class="category-actions">
                <button class="edit-category-btn" data-id="${category.id}" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-category-btn" data-id="${category.id}" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        incomeList.appendChild(item);
    });

    // عرض فئات المصروفات
    expenseList.innerHTML = '';
    expenseCategories.forEach(category => {
        const item = document.createElement('li');
        item.className = 'category-item expense-category';
        item.innerHTML = `
            <div class="category-name">
                <div class="category-icon">
                    <i class="fas fa-${category.icon}"></i>
                </div>
                <span>${category.name}</span>
            </div>
            <div class="category-actions">
                <button class="edit-category-btn" data-id="${category.id}" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-category-btn" data-id="${category.id}" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        expenseList.appendChild(item);
    });

    // إضافة مستمعي الأحداث لأزرار الإجراءات
    addCategoryActionListeners();
}

// دالة لإضافة مستمعي الأحداث لأزرار إجراءات المعاملات
function addTransactionActionListeners() {
    // أزرار عرض التفاصيل
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', function() {
            const transactionId = this.getAttribute('data-id');
            viewTransactionDetails(transactionId);
        });
    });

    // أزرار التعديل
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const transactionId = this.getAttribute('data-id');
            editTransaction(transactionId);
        });
    });

    // أزرار الحذف
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const transactionId = this.getAttribute('data-id');
            deleteTransaction(transactionId);
        });
    });
}

// دالة لإضافة مستمعي الأحداث لأزرار إجراءات الفئات
function addCategoryActionListeners() {
    // أزرار تعديل الفئات
    document.querySelectorAll('.edit-category-btn').forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-id');
            editCategory(categoryId);
        });
    });

    // أزرار حذف الفئات
    document.querySelectorAll('.delete-category-btn').forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-id');
            deleteCategory(categoryId);
        });
    });
}

// دالة لإعداد مستمعي الأحداث
function setupEventListeners() {
    // زر إضافة معاملة جديدة
    const addTransactionBtn = document.querySelector('.add-transaction-btn');
    if (addTransactionBtn) {
        addTransactionBtn.addEventListener('click', function() {
            showAddTransactionModal();
        });
    }

    // زر تصدير البيانات
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportFinancialData();
        });
    }

    // حقل البحث
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            searchTransactions(this.value);
        });
    }

    // قائمة تصفية النوع
    const typeFilter = document.querySelector('#typeFilter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            filterTransactionsByType(this.value);
        });
    }

    // قائمة تصفية الفئة
    const categoryFilter = document.querySelector('#categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterTransactionsByCategory(this.value);
        });
    }

    // أزرار تصفية التاريخ
    const applyDateBtn = document.querySelector('.apply-date-btn');
    if (applyDateBtn) {
        applyDateBtn.addEventListener('click', function() {
            const startDate = document.querySelector('#startDate').value;
            const endDate = document.querySelector('#endDate').value;
            filterTransactionsByDate(startDate, endDate);
        });
    }

    // قائمة فترة الرسم البياني
    const chartPeriod = document.querySelector('#chartPeriod');
    if (chartPeriod) {
        chartPeriod.addEventListener('change', function() {
            updateChartPeriod(this.value);
        });
    }

    // أزرار إضافة فئة جديدة
    const addIncomeCategoryBtn = document.querySelector('.add-income-category-btn');
    if (addIncomeCategoryBtn) {
        addIncomeCategoryBtn.addEventListener('click', function() {
            showAddCategoryModal('income');
        });
    }

    const addExpenseCategoryBtn = document.querySelector('.add-expense-category-btn');
    if (addExpenseCategoryBtn) {
        addExpenseCategoryBtn.addEventListener('click', function() {
            showAddCategoryModal('expense');
        });
    }

    // أزرار ترقيم الصفحات
    document.querySelectorAll('.pagination-btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.hasAttribute('disabled') && !this.classList.contains('active')) {
                const page = this.getAttribute('data-page');
                goToPage(page);
            }
        });
    });
}

// دالة لعرض تفاصيل المعاملة
function viewTransactionDetails(transactionId) {
    // في التطبيق الحقيقي، سيتم جلب بيانات المعاملة من الخادم
    console.log(`عرض تفاصيل المعاملة رقم ${transactionId}`);
    alert(`عرض تفاصيل المعاملة رقم ${transactionId}`);
}

// دالة لتعديل المعاملة
function editTransaction(transactionId) {
    // في التطبيق الحقيقي، سيتم جلب بيانات المعاملة من الخادم وعرضها في نموذج التعديل
    console.log(`تعديل المعاملة رقم ${transactionId}`);
    alert(`تعديل المعاملة رقم ${transactionId}`);
}

// دالة لحذف المعاملة
function deleteTransaction(transactionId) {
    // في التطبيق الحقيقي، سيتم إرسال طلب حذف إلى الخادم
    if (confirm('هل أنت متأكد من حذف هذه المعاملة؟')) {
        console.log(`حذف المعاملة رقم ${transactionId}`);
        alert(`تم حذف المعاملة رقم ${transactionId}`);
    }
}

// دالة لتعديل الفئة
function editCategory(categoryId) {
    // في التطبيق الحقيقي، سيتم جلب بيانات الفئة من الخادم وعرضها في نموذج التعديل
    console.log(`تعديل الفئة رقم ${categoryId}`);
    alert(`تعديل الفئة رقم ${categoryId}`);
}

// دالة لحذف الفئة
function deleteCategory(categoryId) {
    // في التطبيق الحقيقي، سيتم إرسال طلب حذف إلى الخادم
    if (confirm('هل أنت متأكد من حذف هذه الفئة؟')) {
        console.log(`حذف الفئة رقم ${categoryId}`);
        alert(`تم حذف الفئة رقم ${categoryId}`);
    }
}

// دالة لعرض نافذة إضافة معاملة جديدة
function showAddTransactionModal() {
    // في التطبيق الحقيقي، سيتم عرض نافذة منبثقة لإضافة معاملة جديدة
    console.log('عرض نافذة إضافة معاملة جديدة');
    alert('عرض نافذة إضافة معاملة جديدة');
}

// دالة لعرض نافذة إضافة فئة جديدة
function showAddCategoryModal(type) {
    // في التطبيق الحقيقي، سيتم عرض نافذة منبثقة لإضافة فئة جديدة
    console.log(`عرض نافذة إضافة فئة ${type === 'income' ? 'إيرادات' : 'مصروفات'} جديدة`);
    alert(`عرض نافذة إضافة فئة ${type === 'income' ? 'إيرادات' : 'مصروفات'} جديدة`);
}

// دالة لتصدير البيانات المالية
function exportFinancialData() {
    // في التطبيق الحقيقي، سيتم تصدير البيانات إلى ملف
    console.log('تصدير البيانات المالية');
    alert('تم تصدير البيانات المالية');
}

// دالة للبحث في المعاملات
function searchTransactions(query) {
    // في التطبيق الحقيقي، سيتم البحث في البيانات وعرض النتائج
    console.log(`البحث عن: ${query}`);
}

// دالة لتصفية المعاملات حسب النوع
function filterTransactionsByType(type) {
    // في التطبيق الحقيقي، سيتم تصفية البيانات وعرض النتائج
    console.log(`تصفية حسب النوع: ${type}`);
}

// دالة لتصفية المعاملات حسب الفئة
function filterTransactionsByCategory(category) {
    // في التطبيق الحقيقي، سيتم تصفية البيانات وعرض النتائج
    console.log(`تصفية حسب الفئة: ${category}`);
}

// دالة لتصفية المعاملات حسب التاريخ
function filterTransactionsByDate(startDate, endDate) {
    // في التطبيق الحقيقي، سيتم تصفية البيانات وعرض النتائج
    console.log(`تصفية حسب التاريخ: من ${startDate} إلى ${endDate}`);
}

// دالة لتحديث فترة الرسم البياني
function updateChartPeriod(period) {
    // في التطبيق الحقيقي، سيتم تحديث بيانات الرسم البياني وإعادة رسمه
    console.log(`تحديث فترة الرسم البياني: ${period}`);
}

// دالة للانتقال إلى صفحة معينة
function goToPage(page) {
    // في التطبيق الحقيقي، سيتم تحميل البيانات للصفحة المحددة
    console.log(`الانتقال إلى الصفحة: ${page}`);
}

// دالة لتنسيق المبالغ المالية
function formatCurrency(amount, abbreviated = false) {
    if (abbreviated && amount >= 1000) {
        return (amount / 1000).toFixed(1) + ' ألف ر.س';
    }
    return amount.toLocaleString('ar-SA') + ' ر.س';
}

// بيانات دليل الحسابات
const chartOfAccounts = [
    // الأصول
    {
        id: 1,
        code: '1000',
        name: 'الأصول',
        type: 'assets',
        parentId: null,
        balance: 0,
        status: 'active',
        description: 'مجموعة الأصول الرئيسية',
        children: [
            {
                id: 11,
                code: '1100',
                name: 'الأصول المتداولة',
                type: 'assets',
                parentId: 1,
                balance: 0,
                status: 'active',
                description: 'الأصول قصيرة الأجل',
                children: [
                    {
                        id: 111,
                        code: '1101',
                        name: 'النقدية في الصندوق',
                        type: 'assets',
                        parentId: 11,
                        balance: 15000.00,
                        status: 'active',
                        description: 'النقدية المتوفرة في الصندوق'
                    },
                    {
                        id: 112,
                        code: '1102',
                        name: 'البنك - الحساب الجاري',
                        type: 'assets',
                        parentId: 11,
                        balance: 85000.00,
                        status: 'active',
                        description: 'الحساب الجاري في البنك'
                    },
                    {
                        id: 113,
                        code: '1103',
                        name: 'العملاء',
                        type: 'assets',
                        parentId: 11,
                        balance: 45000.00,
                        status: 'active',
                        description: 'مستحقات العملاء'
                    },
                    {
                        id: 114,
                        code: '1104',
                        name: 'المخزون',
                        type: 'assets',
                        parentId: 11,
                        balance: 120000.00,
                        status: 'active',
                        description: 'قيمة المخزون'
                    }
                ]
            },
            {
                id: 12,
                code: '1200',
                name: 'الأصول الثابتة',
                type: 'assets',
                parentId: 1,
                balance: 0,
                status: 'active',
                description: 'الأصول طويلة الأجل',
                children: [
                    {
                        id: 121,
                        code: '1201',
                        name: 'الأراضي والمباني',
                        type: 'assets',
                        parentId: 12,
                        balance: 500000.00,
                        status: 'active',
                        description: 'قيمة الأراضي والمباني'
                    },
                    {
                        id: 122,
                        code: '1202',
                        name: 'المعدات والآلات',
                        type: 'assets',
                        parentId: 12,
                        balance: 150000.00,
                        status: 'active',
                        description: 'قيمة المعدات والآلات'
                    },
                    {
                        id: 123,
                        code: '1203',
                        name: 'الأثاث والتجهيزات',
                        type: 'assets',
                        parentId: 12,
                        balance: 25000.00,
                        status: 'active',
                        description: 'قيمة الأثاث والتجهيزات'
                    }
                ]
            }
        ]
    },
    // الخصوم
    {
        id: 2,
        code: '2000',
        name: 'الخصوم',
        type: 'liabilities',
        parentId: null,
        balance: 0,
        status: 'active',
        description: 'مجموعة الخصوم الرئيسية',
        children: [
            {
                id: 21,
                code: '2100',
                name: 'الخصوم المتداولة',
                type: 'liabilities',
                parentId: 2,
                balance: 0,
                status: 'active',
                description: 'الخصوم قصيرة الأجل',
                children: [
                    {
                        id: 211,
                        code: '2101',
                        name: 'الموردون',
                        type: 'liabilities',
                        parentId: 21,
                        balance: 35000.00,
                        status: 'active',
                        description: 'مستحقات الموردين'
                    },
                    {
                        id: 212,
                        code: '2102',
                        name: 'الرواتب المستحقة',
                        type: 'liabilities',
                        parentId: 21,
                        balance: 12000.00,
                        status: 'active',
                        description: 'رواتب مستحقة للموظفين'
                    },
                    {
                        id: 213,
                        code: '2103',
                        name: 'الضرائب المستحقة',
                        type: 'liabilities',
                        parentId: 21,
                        balance: 8000.00,
                        status: 'active',
                        description: 'ضرائب مستحقة للحكومة'
                    }
                ]
            },
            {
                id: 22,
                code: '2200',
                name: 'الخصوم طويلة الأجل',
                type: 'liabilities',
                parentId: 2,
                balance: 0,
                status: 'active',
                description: 'الخصوم طويلة الأجل',
                children: [
                    {
                        id: 221,
                        code: '2201',
                        name: 'القروض البنكية',
                        type: 'liabilities',
                        parentId: 22,
                        balance: 200000.00,
                        status: 'active',
                        description: 'قروض من البنوك'
                    }
                ]
            }
        ]
    },
    // حقوق الملكية
    {
        id: 3,
        code: '3000',
        name: 'حقوق الملكية',
        type: 'equity',
        parentId: null,
        balance: 0,
        status: 'active',
        description: 'مجموعة حقوق الملكية',
        children: [
            {
                id: 31,
                code: '3100',
                name: 'رأس المال',
                type: 'equity',
                parentId: 3,
                balance: 500000.00,
                status: 'active',
                description: 'رأس المال المدفوع'
            },
            {
                id: 32,
                code: '3200',
                name: 'الأرباح المحتجزة',
                type: 'equity',
                parentId: 3,
                balance: 150000.00,
                status: 'active',
                description: 'الأرباح المحتجزة من السنوات السابقة'
            }
        ]
    },
    // الإيرادات
    {
        id: 4,
        code: '4000',
        name: 'الإيرادات',
        type: 'revenue',
        parentId: null,
        balance: 0,
        status: 'active',
        description: 'مجموعة الإيرادات',
        children: [
            {
                id: 41,
                code: '4100',
                name: 'إيرادات المبيعات',
                type: 'revenue',
                parentId: 4,
                balance: 250000.00,
                status: 'active',
                description: 'إيرادات من بيع البضائع'
            },
            {
                id: 42,
                code: '4200',
                name: 'إيرادات الخدمات',
                type: 'revenue',
                parentId: 4,
                balance: 75000.00,
                status: 'active',
                description: 'إيرادات من تقديم الخدمات'
            }
        ]
    },
    // المصروفات
    {
        id: 5,
        code: '5000',
        name: 'المصروفات',
        type: 'expenses',
        parentId: null,
        balance: 0,
        status: 'active',
        description: 'مجموعة المصروفات',
        children: [
            {
                id: 51,
                code: '5100',
                name: 'تكلفة البضاعة المباعة',
                type: 'expenses',
                parentId: 5,
                balance: 150000.00,
                status: 'active',
                description: 'تكلفة البضائع المباعة'
            },
            {
                id: 52,
                code: '5200',
                name: 'مصروفات التشغيل',
                type: 'expenses',
                parentId: 5,
                balance: 0,
                status: 'active',
                description: 'مصروفات التشغيل العامة',
                children: [
                    {
                        id: 521,
                        code: '5201',
                        name: 'الرواتب والأجور',
                        type: 'expenses',
                        parentId: 52,
                        balance: 45000.00,
                        status: 'active',
                        description: 'رواتب وأجور الموظفين'
                    },
                    {
                        id: 522,
                        code: '5202',
                        name: 'الإيجار',
                        type: 'expenses',
                        parentId: 52,
                        balance: 18000.00,
                        status: 'active',
                        description: 'إيجار المكاتب والمحلات'
                    },
                    {
                        id: 523,
                        code: '5203',
                        name: 'المرافق العامة',
                        type: 'expenses',
                        parentId: 52,
                        balance: 8000.00,
                        status: 'active',
                        description: 'فواتير الكهرباء والماء والهاتف'
                    }
                ]
            }
        ]
    }
];

// دالة تهيئة دليل الحسابات
function initChartOfAccounts() {
    displayAccountsTree();
    displayAccountsTable();
    setupAccountsEventListeners();
}

// دالة عرض شجرة الحسابات
function displayAccountsTree() {
    const treeContainer = document.getElementById('accounts-tree');
    if (!treeContainer) return;

    treeContainer.innerHTML = '';

    chartOfAccounts.forEach(account => {
        const accountElement = createAccountTreeNode(account);
        treeContainer.appendChild(accountElement);
    });
}

// دالة إنشاء عقدة في شجرة الحسابات
function createAccountTreeNode(account, level = 0) {
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'account-node';
    nodeDiv.style.marginRight = `${level * 20}px`;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'account-item';
    itemDiv.dataset.accountId = account.id;

    // زر التوسيع/الطي
    if (account.children && account.children.length > 0) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'account-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleAccountChildren(account.id);
        });
        itemDiv.appendChild(toggleBtn);
    } else {
        const spacer = document.createElement('div');
        spacer.style.width = '20px';
        itemDiv.appendChild(spacer);
    }

    // معلومات الحساب
    const infoDiv = document.createElement('div');
    infoDiv.className = 'account-info';

    const codeSpan = document.createElement('span');
    codeSpan.className = 'account-code';
    codeSpan.textContent = account.code;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'account-name';
    nameSpan.textContent = account.name;

    const balanceSpan = document.createElement('span');
    balanceSpan.className = `account-balance ${account.balance < 0 ? 'negative' : ''}`;
    balanceSpan.textContent = `${account.balance.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س`;

    const statusSpan = document.createElement('span');
    statusSpan.className = `account-status ${account.status}`;
    statusSpan.textContent = account.status === 'active' ? 'نشط' : 'غير نشط';

    infoDiv.appendChild(codeSpan);
    infoDiv.appendChild(nameSpan);
    infoDiv.appendChild(balanceSpan);
    infoDiv.appendChild(statusSpan);

    itemDiv.appendChild(infoDiv);
    nodeDiv.appendChild(itemDiv);

    // إضافة الحسابات الفرعية
    if (account.children && account.children.length > 0) {
        const childrenDiv = document.createElement('div');
        childrenDiv.className = 'account-children';
        childrenDiv.id = `children-${account.id}`;

        account.children.forEach(child => {
            const childNode = createAccountTreeNode(child, level + 1);
            childrenDiv.appendChild(childNode);
        });

        nodeDiv.appendChild(childrenDiv);
    }

    return nodeDiv;
}

// دالة توسيع/طي الحسابات الفرعية
function toggleAccountChildren(accountId) {
    const childrenDiv = document.getElementById(`children-${accountId}`);
    const toggleBtn = document.querySelector(`[data-account-id="${accountId}"] .account-toggle`);

    if (childrenDiv) {
        if (childrenDiv.classList.contains('hidden')) {
            childrenDiv.classList.remove('hidden');
            toggleBtn.classList.add('expanded');
        } else {
            childrenDiv.classList.add('hidden');
            toggleBtn.classList.remove('expanded');
        }
    }
}

// دالة عرض جدول الحسابات
function displayAccountsTable() {
    const tableBody = document.getElementById('accounts-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    const flatAccounts = flattenAccounts(chartOfAccounts);

    flatAccounts.forEach(account => {
        const row = createAccountTableRow(account);
        tableBody.appendChild(row);
    });
}

// دالة تحويل شجرة الحسابات إلى قائمة مسطحة
function flattenAccounts(accounts, result = []) {
    accounts.forEach(account => {
        result.push(account);
        if (account.children && account.children.length > 0) {
            flattenAccounts(account.children, result);
        }
    });
    return result;
}

// دالة إنشاء صف في جدول الحسابات
function createAccountTableRow(account) {
    const row = document.createElement('tr');

    // رقم الحساب
    const codeCell = document.createElement('td');
    codeCell.className = 'account-code';
    codeCell.textContent = account.code;

    // اسم الحساب
    const nameCell = document.createElement('td');
    nameCell.className = 'account-name';
    nameCell.textContent = account.name;

    // نوع الحساب
    const typeCell = document.createElement('td');
    const typeSpan = document.createElement('span');
    typeSpan.className = `account-type ${account.type}`;
    typeSpan.textContent = getAccountTypeLabel(account.type);
    typeCell.appendChild(typeSpan);

    // الحساب الأب
    const parentCell = document.createElement('td');
    const parentAccount = findAccountById(account.parentId);
    parentCell.textContent = parentAccount ? parentAccount.name : '-';

    // الرصيد
    const balanceCell = document.createElement('td');
    balanceCell.className = `account-balance ${account.balance < 0 ? 'negative' : ''}`;
    balanceCell.textContent = `${account.balance.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س`;

    // الحالة
    const statusCell = document.createElement('td');
    const statusSpan = document.createElement('span');
    statusSpan.className = `account-status ${account.status}`;
    statusSpan.textContent = account.status === 'active' ? 'نشط' : 'غير نشط';
    statusCell.appendChild(statusSpan);

    // الإجراءات
    const actionsCell = document.createElement('td');
    actionsCell.innerHTML = `
        <button class="action-btn view-btn" onclick="viewAccount(${account.id})" title="عرض">
            <i class="fas fa-eye"></i>
        </button>
        <button class="action-btn edit-btn" onclick="editAccount(${account.id})" title="تعديل">
            <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete-btn" onclick="deleteAccount(${account.id})" title="حذف">
            <i class="fas fa-trash"></i>
        </button>
    `;

    row.appendChild(codeCell);
    row.appendChild(nameCell);
    row.appendChild(typeCell);
    row.appendChild(parentCell);
    row.appendChild(balanceCell);
    row.appendChild(statusCell);
    row.appendChild(actionsCell);

    return row;
}

// دالة الحصول على تسمية نوع الحساب
function getAccountTypeLabel(type) {
    const labels = {
        'assets': 'الأصول',
        'liabilities': 'الخصوم',
        'equity': 'حقوق الملكية',
        'revenue': 'الإيرادات',
        'expenses': 'المصروفات'
    };
    return labels[type] || type;
}

// دالة البحث عن حساب بالمعرف
function findAccountById(id, accounts = chartOfAccounts) {
    for (const account of accounts) {
        if (account.id === id) {
            return account;
        }
        if (account.children) {
            const found = findAccountById(id, account.children);
            if (found) return found;
        }
    }
    return null;
}

// دالة إعداد مستمعي الأحداث لدليل الحسابات
function setupAccountsEventListeners() {
    // البحث في الحسابات
    const searchInput = document.getElementById('accounts-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterAccounts);
    }

    // تصفية نوع الحساب
    const typeFilter = document.getElementById('account-type-filter');
    if (typeFilter) {
        typeFilter.addEventListener('change', filterAccounts);
    }

    // تصفية حالة الحساب
    const statusFilter = document.getElementById('account-status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterAccounts);
    }

    // زر إضافة حساب جديد
    const addAccountBtn = document.querySelector('.add-account-btn');
    if (addAccountBtn) {
        addAccountBtn.addEventListener('click', showAddAccountModal);
    }

    // أزرار إغلاق النوافذ المنبثقة
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // أزرار الإلغاء
    const cancelButtons = document.querySelectorAll('#cancel-add-account, #cancel-edit-account');
    cancelButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // نماذج الحسابات
    const addForm = document.getElementById('add-account-form');
    if (addForm) {
        addForm.addEventListener('submit', handleAddAccount);
    }

    const editForm = document.getElementById('edit-account-form');
    if (editForm) {
        editForm.addEventListener('submit', handleEditAccount);
    }
}

// دالة تصفية الحسابات
function filterAccounts() {
    const searchTerm = document.getElementById('accounts-search').value.toLowerCase();
    const typeFilter = document.getElementById('account-type-filter').value;
    const statusFilter = document.getElementById('account-status-filter').value;

    const flatAccounts = flattenAccounts(chartOfAccounts);

    const filteredAccounts = flatAccounts.filter(account => {
        const matchesSearch = account.name.toLowerCase().includes(searchTerm) ||
                            account.code.includes(searchTerm);
        const matchesType = !typeFilter || account.type === typeFilter;
        const matchesStatus = !statusFilter || account.status === statusFilter;

        return matchesSearch && matchesType && matchesStatus;
    });

    // إعادة عرض الجدول مع النتائج المفلترة
    const tableBody = document.getElementById('accounts-table-body');
    if (tableBody) {
        tableBody.innerHTML = '';
        filteredAccounts.forEach(account => {
            const row = createAccountTableRow(account);
            tableBody.appendChild(row);
        });
    }
}

// دالة عرض نافذة إضافة حساب
function showAddAccountModal() {
    const modal = document.getElementById('add-account-modal');
    if (modal) {
        populateParentAccountOptions('parent-account');
        modal.classList.add('show');
    }
}

// دالة ملء خيارات الحساب الأب
function populateParentAccountOptions(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return;

    // مسح الخيارات الحالية (عدا الخيار الأول)
    while (select.children.length > 1) {
        select.removeChild(select.lastChild);
    }

    const flatAccounts = flattenAccounts(chartOfAccounts);

    flatAccounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = `${account.code} - ${account.name}`;
        select.appendChild(option);
    });
}

// دالة إغلاق النافذة المنبثقة
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.classList.remove('show');
    });
}

// دالة معالجة إضافة حساب جديد
function handleAddAccount(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newAccount = {
        id: Date.now(), // معرف مؤقت
        code: formData.get('account-code'),
        name: formData.get('account-name'),
        type: formData.get('account-type'),
        parentId: formData.get('parent-account') ? parseInt(formData.get('parent-account')) : null,
        balance: parseFloat(formData.get('account-balance')) || 0,
        status: formData.get('account-status'),
        description: formData.get('account-description')
    };

    // التحقق من عدم تكرار رقم الحساب
    const existingAccount = flattenAccounts(chartOfAccounts).find(acc => acc.code === newAccount.code);
    if (existingAccount) {
        alert('رقم الحساب موجود بالفعل. يرجى اختيار رقم آخر.');
        return;
    }

    // إضافة الحساب الجديد
    if (newAccount.parentId) {
        const parentAccount = findAccountById(newAccount.parentId);
        if (parentAccount) {
            if (!parentAccount.children) {
                parentAccount.children = [];
            }
            parentAccount.children.push(newAccount);
        }
    } else {
        chartOfAccounts.push(newAccount);
    }

    // إعادة عرض البيانات
    displayAccountsTree();
    displayAccountsTable();

    // إغلاق النافذة المنبثقة
    closeModal();

    // مسح النموذج
    e.target.reset();

    alert('تم إضافة الحساب بنجاح!');
}

// دالة عرض تفاصيل الحساب
function viewAccount(accountId) {
    const account = findAccountById(accountId);
    if (account) {
        alert(`تفاصيل الحساب:\nرقم الحساب: ${account.code}\nاسم الحساب: ${account.name}\nالنوع: ${getAccountTypeLabel(account.type)}\nالرصيد: ${account.balance.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س\nالحالة: ${account.status === 'active' ? 'نشط' : 'غير نشط'}\nالوصف: ${account.description || 'لا يوجد وصف'}`);
    }
}

// دالة تعديل الحساب
function editAccount(accountId) {
    const account = findAccountById(accountId);
    if (!account) return;

    // ملء النموذج بالبيانات الحالية
    document.getElementById('edit-account-id').value = account.id;
    document.getElementById('edit-account-code').value = account.code;
    document.getElementById('edit-account-name').value = account.name;
    document.getElementById('edit-account-type').value = account.type;
    document.getElementById('edit-account-balance').value = account.balance;
    document.getElementById('edit-account-status').value = account.status;
    document.getElementById('edit-account-description').value = account.description || '';

    // ملء خيارات الحساب الأب
    populateParentAccountOptions('edit-parent-account');
    if (account.parentId) {
        document.getElementById('edit-parent-account').value = account.parentId;
    }

    // عرض النافذة المنبثقة
    const modal = document.getElementById('edit-account-modal');
    if (modal) {
        modal.classList.add('show');
    }
}

// دالة معالجة تعديل الحساب
function handleEditAccount(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const accountId = parseInt(formData.get('account-id'));
    const account = findAccountById(accountId);

    if (!account) return;

    // تحديث بيانات الحساب
    account.code = formData.get('account-code');
    account.name = formData.get('account-name');
    account.type = formData.get('account-type');
    account.status = formData.get('account-status');
    account.description = formData.get('account-description');

    // إعادة عرض البيانات
    displayAccountsTree();
    displayAccountsTable();

    // إغلاق النافذة المنبثقة
    closeModal();

    alert('تم تحديث الحساب بنجاح!');
}

// دالة حذف الحساب
function deleteAccount(accountId) {
    const account = findAccountById(accountId);
    if (!account) return;

    if (confirm(`هل أنت متأكد من حذف الحساب "${account.name}"؟\nسيتم حذف جميع الحسابات الفرعية أيضاً.`)) {
        // البحث عن الحساب وحذفه
        removeAccountFromTree(accountId, chartOfAccounts);

        // إعادة عرض البيانات
        displayAccountsTree();
        displayAccountsTable();

        alert('تم حذف الحساب بنجاح!');
    }
}

// دالة حذف الحساب من الشجرة
function removeAccountFromTree(accountId, accounts) {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id === accountId) {
            accounts.splice(i, 1);
            return true;
        }
        if (accounts[i].children) {
            if (removeAccountFromTree(accountId, accounts[i].children)) {
                return true;
            }
        }
    }
    return false;
}

// وظائف التبويبات
function initTabs() {
    // الحصول على جميع أزرار التبويبات
    const navTabs = document.querySelectorAll('.nav-tab');

    // إضافة مستمع أحداث لكل تبويب
    navTabs.forEach((tab) => {
        const tabName = tab.getAttribute('data-tab');

        tab.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // تفعيل التبويب
            activateTab(tabName);
        });
    });

    // تفعيل التبويب الأول افتراضياً
    if (navTabs.length > 0) {
        const firstTabName = navTabs[0].getAttribute('data-tab');
        activateTab(firstTabName);
    }
}

// وظيفة تفعيل التبويب
function activateTab(tabName) {
    // إزالة الفئة النشطة من جميع التبويبات
    const allTabs = document.querySelectorAll('.nav-tab');
    const allPanes = document.querySelectorAll('.tab-pane');

    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    allPanes.forEach(pane => {
        pane.classList.remove('active');
        pane.style.display = 'none';
    });

    // تفعيل التبويب المحدد
    const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }

    // تفعيل اللوحة المقابلة
    const targetPane = document.getElementById(`${tabName}-tab`);
    if (targetPane) {
        targetPane.classList.add('active');
        targetPane.style.display = 'block';

        // تحميل محتوى التبويب
        loadTabContent(tabName);
    }
}

// تحميل محتوى التبويب
function loadTabContent(tabName) {
    switch(tabName) {
        case 'overview':
            // تحديث الإحصائيات
            loadFinancialStats();
            break;
        case 'chart-of-accounts':
            // تحديث دليل الحسابات
            displayAccountsTree();
            displayAccountsTable();
            break;
        case 'journal-entries':
            // تحميل قيود اليومية
            loadJournalEntries();
            loadJournalEntriesTab();
            break;
        case 'receipt-voucher':
            // تحميل سندات القبض
            loadReceiptVouchers();
            loadReceiptVouchersTab();
            break;
        case 'payment-voucher':
            // تحميل سندات الصرف
            loadPaymentVouchers();
            loadPaymentVouchersTab();
            break;
    }
}

// بيانات قيود اليومية (نموذج)
const journalEntries = [
    {
        id: 1,
        entryNumber: 'JE-2023-001',
        date: '2023-07-01',
        description: 'قيد افتتاحي للنقدية',
        debit: 15000.00,
        credit: 15000.00,
        status: 'posted'
    },
    {
        id: 2,
        entryNumber: 'JE-2023-002',
        date: '2023-07-02',
        description: 'شراء بضاعة نقداً',
        debit: 5000.00,
        credit: 5000.00,
        status: 'posted'
    },
    {
        id: 3,
        entryNumber: 'JE-2023-003',
        date: '2023-07-03',
        description: 'بيع بضاعة نقداً',
        debit: 8000.00,
        credit: 8000.00,
        status: 'draft'
    }
];

// بيانات سندات القبض (نموذج)
const receiptVouchers = [
    {
        id: 1,
        voucherNumber: 'RV-2023-001',
        date: '2023-07-01',
        receivedFrom: 'شركة الأمل للتجارة',
        amount: 12000.00,
        description: 'تحصيل فاتورة رقم INV-001',
        status: 'approved'
    },
    {
        id: 2,
        voucherNumber: 'RV-2023-002',
        date: '2023-07-02',
        receivedFrom: 'محمد أحمد علي',
        amount: 3500.00,
        description: 'تحصيل مستحقات عميل',
        status: 'pending'
    }
];

// بيانات سندات الصرف (نموذج)
const paymentVouchers = [
    {
        id: 1,
        voucherNumber: 'PV-2023-001',
        date: '2023-07-01',
        paidTo: 'شركة الكهرباء',
        amount: 2500.00,
        description: 'دفع فاتورة الكهرباء',
        status: 'approved'
    },
    {
        id: 2,
        voucherNumber: 'PV-2023-002',
        date: '2023-07-02',
        paidTo: 'مكتب المحاسبة القانونية',
        amount: 1800.00,
        description: 'أتعاب مهنية',
        status: 'pending'
    }
];

// تحميل قيود اليومية
function loadJournalEntries() {
    const tableBody = document.getElementById('journal-entries-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    journalEntries.forEach(entry => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.entryNumber}</td>
            <td>${entry.date}</td>
            <td>${entry.description}</td>
            <td>${entry.debit.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س</td>
            <td>${entry.credit.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س</td>
            <td>
                <button class="action-btn view-btn" onclick="viewJournalEntry(${entry.id})" title="عرض">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" onclick="editJournalEntry(${entry.id})" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteJournalEntry(${entry.id})" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// تحميل سندات القبض
function loadReceiptVouchers() {
    const tableBody = document.getElementById('receipt-vouchers-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    receiptVouchers.forEach(voucher => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${voucher.voucherNumber}</td>
            <td>${voucher.date}</td>
            <td>${voucher.receivedFrom}</td>
            <td>${voucher.amount.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س</td>
            <td>${voucher.description}</td>
            <td>
                <button class="action-btn view-btn" onclick="viewReceiptVoucher(${voucher.id})" title="عرض">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" onclick="editReceiptVoucher(${voucher.id})" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deleteReceiptVoucher(${voucher.id})" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// تحميل سندات الصرف
function loadPaymentVouchers() {
    const tableBody = document.getElementById('payment-vouchers-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    paymentVouchers.forEach(voucher => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${voucher.voucherNumber}</td>
            <td>${voucher.date}</td>
            <td>${voucher.paidTo}</td>
            <td>${voucher.amount.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س</td>
            <td>${voucher.description}</td>
            <td>
                <button class="action-btn view-btn" onclick="viewPaymentVoucher(${voucher.id})" title="عرض">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit-btn" onclick="editPaymentVoucher(${voucher.id})" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" onclick="deletePaymentVoucher(${voucher.id})" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// وظائف قيود اليومية
function viewJournalEntry(id) {
    const entry = journalEntries.find(e => e.id === id);
    if (entry) {
        alert(`تفاصيل القيد:\nرقم القيد: ${entry.entryNumber}\nالتاريخ: ${entry.date}\nالبيان: ${entry.description}\nالمدين: ${entry.debit.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س\nالدائن: ${entry.credit.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س`);
    }
}

function editJournalEntry(id) {
    alert('سيتم إضافة نافذة تعديل قيد اليومية قريباً');
}

function deleteJournalEntry(id) {
    if (confirm('هل أنت متأكد من حذف هذا القيد؟')) {
        const index = journalEntries.findIndex(e => e.id === id);
        if (index > -1) {
            journalEntries.splice(index, 1);
            loadJournalEntries();
            alert('تم حذف القيد بنجاح!');
        }
    }
}

// وظائف سندات القبض
function viewReceiptVoucher(id) {
    const voucher = receiptVouchers.find(v => v.id === id);
    if (voucher) {
        alert(`تفاصيل سند القبض:\nرقم السند: ${voucher.voucherNumber}\nالتاريخ: ${voucher.date}\nالمستلم من: ${voucher.receivedFrom}\nالمبلغ: ${voucher.amount.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س\nالبيان: ${voucher.description}`);
    }
}

function editReceiptVoucher(id) {
    alert('سيتم إضافة نافذة تعديل سند القبض قريباً');
}

function deleteReceiptVoucher(id) {
    if (confirm('هل أنت متأكد من حذف هذا السند؟')) {
        const index = receiptVouchers.findIndex(v => v.id === id);
        if (index > -1) {
            receiptVouchers.splice(index, 1);
            loadReceiptVouchers();
            alert('تم حذف السند بنجاح!');
        }
    }
}

// وظائف سندات الصرف
function viewPaymentVoucher(id) {
    const voucher = paymentVouchers.find(v => v.id === id);
    if (voucher) {
        alert(`تفاصيل سند الصرف:\nرقم السند: ${voucher.voucherNumber}\nالتاريخ: ${voucher.date}\nالمدفوع إلى: ${voucher.paidTo}\nالمبلغ: ${voucher.amount.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س\nالبيان: ${voucher.description}`);
    }
}

function editPaymentVoucher(id) {
    alert('سيتم إضافة نافذة تعديل سند الصرف قريباً');
}

function deletePaymentVoucher(id) {
    if (confirm('هل أنت متأكد من حذف هذا السند؟')) {
        const index = paymentVouchers.findIndex(v => v.id === id);
        if (index > -1) {
            paymentVouchers.splice(index, 1);
            loadPaymentVouchers();
            alert('تم حذف السند بنجاح!');
        }
    }
}

// نظام التنقل للمحاسبة باستخدام النظام الموحد
let accountingPagination;

function initializeAccountingPagination(transactions) {
    accountingPagination = new UnifiedPagination({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: transactions.length,
        containerId: 'pagination',
        data: transactions,
        displayFunction: displayAccountingPage,
        onPageChange: function(page) {
            console.log('تم الانتقال إلى صفحة المحاسبة:', page);
        }
    });
}

function displayAccountingPage(pageTransactions, currentPage) {
    console.log('عرض المحاسبة - الصفحة:', currentPage, 'المعاملات:', pageTransactions.length);

    const tableBody = document.getElementById('transactions-table-body');
    if (!tableBody) {
        console.error('جدول المعاملات غير موجود');
        return;
    }

    if (pageTransactions.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-calculator" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
                    لا توجد معاملات مالية لعرضها
                </td>
            </tr>
        `;
        return;
    }

    let tableHTML = '';
    pageTransactions.forEach(transaction => {
        const typeClass = transaction.type === 'income' ? 'type-income' : 'type-expense';
        const typeText = transaction.type === 'income' ? 'إيراد' : 'مصروف';
        const amountClass = transaction.type === 'income' ? 'amount-income' : 'amount-expense';

        tableHTML += `
            <tr>
                <td>${transaction.date}</td>
                <td>${transaction.reference || transaction.id}</td>
                <td>${transaction.description}</td>
                <td>${transaction.category}</td>
                <td>
                    <span class="transaction-type ${typeClass}">
                        ${typeText}
                    </span>
                </td>
                <td class="transaction-amount ${amountClass}">
                    ${formatCurrency(transaction.amount)}
                </td>
                <td>${transaction.account || 'النقدية'}</td>
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
            </tr>
        `;
    });

    tableBody.innerHTML = tableHTML;

    // إضافة مستمعي الأحداث لأزرار الإجراءات
    addTransactionActionListeners();
}

// تحديث دالة displayTransactions لتستخدم النظام الجديد
function displayTransactionsWithPagination(transactions) {
    // إضافة المزيد من البيانات للاختبار
    const extendedTransactions = [
        ...transactions,
        { id: 11, date: '2023-07-20', type: 'income', category: 'المبيعات', description: 'مبيعات منتصف الشهر', amount: 2800, reference: 'INV-2023-004' },
        { id: 12, date: '2023-07-25', type: 'expense', category: 'المشتريات', description: 'شراء مواد خام', amount: 1500, reference: 'PUR-2023-07' },
        { id: 13, date: '2023-08-01', type: 'expense', category: 'الإيجار', description: 'إيجار المكتب', amount: 1200, reference: 'RENT-2023-08' },
        { id: 14, date: '2023-08-05', type: 'income', category: 'الخدمات', description: 'خدمات تقنية', amount: 3200, reference: 'SRV-2023-020' },
        { id: 15, date: '2023-08-10', type: 'expense', category: 'الرواتب', description: 'رواتب الموظفين', amount: 3500, reference: 'SAL-2023-08' },
        { id: 16, date: '2023-08-15', type: 'income', category: 'المبيعات', description: 'مبيعات منتصف أغسطس', amount: 4100, reference: 'INV-2023-005' },
        { id: 17, date: '2023-08-20', type: 'expense', category: 'التسويق', description: 'إعلانات رقمية', amount: 900, reference: 'MKT-2023-08' },
        { id: 18, date: '2023-08-25', type: 'income', category: 'الاستثمارات', description: 'عوائد استثمارية', amount: 1800, reference: 'INV-2023-08' }
    ];

    initializeAccountingPagination(extendedTransactions);
}

// دالة لتحديث روابط التنقل
function updateNavigationLinks() {
    const navLinks = document.querySelectorAll('.main-nav a');

    navLinks.forEach(link => {
        const href = link.textContent.trim();

        switch(href) {
            case 'الرئيسية':
                link.href = 'index.html';
                break;
            case 'المبيعات':
                link.href = 'sales.html';
                break;
            case 'المشتريات':
                link.href = 'purchases.html';
                break;
            case 'العملاء':
                link.href = 'customers.html';
                break;
            case 'المنتجات':
            case 'المخزون':
                link.href = 'products.html';
                break;
            case 'التقارير':
                link.href = 'reports.html';
                break;
            case 'الحسابات':
                link.href = 'accounting.html';
                break;
            default:
                // لا نغير الرابط إذا لم نجد تطابق
                break;
        }
    });
}

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    updateNavigationLinks();
});

/**
 * إضافة مورد جديد إلى دليل الحسابات مع منع التكرار
 * @param {Object} supplier - بيانات المورد (يجب أن يحتوي على name و code)
 * @returns {boolean} true إذا تمت الإضافة، false إذا كان موجود مسبقاً
 */
function addSupplierToChartOfAccounts(supplier) {
    // ابحث عن حساب الموردين الرئيسي
    const suppliersParent = findAccountById(21); // 21 هو id "الخصوم المتداولة"
    if (!suppliersParent || !suppliersParent.children) return false;

    // تحقق من وجود المورد مسبقاً بالاسم أو رقم الحساب
    const exists = suppliersParent.children.some(acc =>
        acc.name === supplier.name || acc.code === supplier.code
    );
    if (exists) {
        // المورد موجود مسبقاً، لا تضف مرة أخرى
        return false;
    }

    // أضف المورد كحساب فرعي جديد
    suppliersParent.children.push({
        id: Date.now(), // أو استخدم منطق توليد معرف مناسب
        code: supplier.code,
        name: supplier.name,
        type: 'liabilities',
        parentId: suppliersParent.id,
        balance: 0,
        status: 'active',
        description: supplier.description || 'مورد جديد'
    });
    return true;
}