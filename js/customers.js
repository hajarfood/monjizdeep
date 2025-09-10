// ملف JavaScript لصفحة العملاء

// دالة لإدارة القوائم المنسدلة
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        dropdown.classList.toggle('show');
    }

    // إغلاق القوائم الأخرى
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu.id !== dropdownId) {
            menu.classList.remove('show');
        }
    });
}

// إغلاق القوائم المنسدلة عند النقر خارجها
document.addEventListener('click', function(event) {
    if (!event.target.matches('.dropdown-toggle')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('show');
        });
    }
});

// متغير لحفظ بيانات العملاء من النظام المركزي
let customers = [];

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 تحميل صفحة العملاء مع النظام المركزي...');

    // التأكد من تهيئة النظام المركزي
    initializeCentralSystem();

    // تحميل البيانات من النظام المركزي
    loadCustomersFromCentralSystem();

    // تهيئة الصفحة
    initPage();

    // إضافة مستمعي الأحداث للأزرار
    setupEventListeners();

    // إعداد البحث والتصفية
    setupSearchAndFilter();

    // الاستماع لتحديثات النظام المركزي
    setupCentralSystemListeners();
});

// دالة تهيئة النظام المركزي
function initializeCentralSystem() {
    try {
        if (!window.dataManager) {
            console.log('🔄 تهيئة النظام المركزي...');
            window.dataManager = new DataManager();
            console.log('✅ تم تهيئة النظام المركزي بنجاح');
        }
    } catch (error) {
        console.error('❌ فشل في تهيئة النظام المركزي:', error);
    }
}

// دالة تحميل العملاء من النظام المركزي
function loadCustomersFromCentralSystem() {
    try {
        console.log('📊 تحميل العملاء من النظام المركزي...');

        if (window.dataManager && typeof window.dataManager.getCustomers === 'function') {
            customers = window.dataManager.getCustomers();
            console.log('✅ تم تحميل', customers.length, 'عميل من النظام المركزي');

            // تحديث العرض
            updateCustomersDisplay();
        } else {
            console.warn('⚠️ النظام المركزي غير متاح، استخدام البيانات المحلية');
            loadCustomersFromLocalStorage();
        }
    } catch (error) {
        console.error('❌ خطأ في تحميل العملاء من النظام المركزي:', error);
        loadCustomersFromLocalStorage();
    }
}

// دالة تحميل العملاء من التخزين المحلي (كبديل)
function loadCustomersFromLocalStorage() {
    try {
        const localCustomers = JSON.parse(localStorage.getItem('monjizCustomers')) || [];
        customers = localCustomers;
        console.log('📦 تم تحميل', customers.length, 'عميل من التخزين المحلي');
        updateCustomersDisplay();
    } catch (error) {
        console.error('❌ خطأ في تحميل العملاء من التخزين المحلي:', error);
        customers = [];
        updateCustomersDisplay();
    }
}

// دالة إعداد مستمعي النظام المركزي
function setupCentralSystemListeners() {
    // الاستماع لإضافة عملاء جدد
    document.addEventListener('customerAdded', function(event) {
        console.log('🔔 تم إضافة عميل جديد:', event.detail);
        loadCustomersFromCentralSystem();
    });

    // الاستماع لتحديث البيانات
    window.addEventListener('monjizDataUpdate', function(event) {
        if (event.detail.dataType === 'monjizCustomers') {
            console.log('🔔 تحديث بيانات العملاء');
            loadCustomersFromCentralSystem();
        }
    });
}

// دالة تحديث عرض العملاء
function updateCustomersDisplay() {
    try {
        // تحديث الجدول
        updateCustomersTable(customers);

        // تحديث الإحصائيات
        updateCustomerStats(customers);

        // تحديث العدادات
        updateCustomersCount();

        console.log('✅ تم تحديث عرض العملاء');
    } catch (error) {
        console.error('❌ خطأ في تحديث عرض العملاء:', error);
    }
}

// دالة تهيئة الصفحة
function initPage() {
    console.log('تم تهيئة صفحة العملاء بنجاح');

    // تحديث روابط التنقل
    updateNavigationLinks();
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
                link.href = '#';
        }
    });
}

// دالة لإعداد مستمعي الأحداث
function setupEventListeners() {
    // زر إضافة عميل جديد
    const addCustomerBtn = document.querySelector('.add-customer-btn');
    if (addCustomerBtn) {
        addCustomerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAddCustomerModal();
        });
    }
    
    // أزرار البحث والتصفية
    setupSearchAndFilter();
    
    // أزرار الصفحات
    setupPagination();
}

// دالة لإعداد البحث والتصفية
function setupSearchAndFilter() {
    // مربع البحث - تصحيح المحدد
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterCustomers();
            showSearchSuggestions(this.value);
        });

        // إضافة البحث عند الضغط على Enter
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterCustomers();
            }
        });

        // إخفاء الاقتراحات عند فقدان التركيز
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                hideSearchSuggestions();
            }, 200);
        });
    }

    // قائمة نوع العميل - تصحيح المحدد
    const typeFilter = document.getElementById('customer-type-filter');
    if (typeFilter) {
        typeFilter.addEventListener('change', function() {
            filterCustomers();
        });
    }

    // قائمة تصفية الرصيد
    const balanceFilter = document.getElementById('balance-filter');
    if (balanceFilter) {
        balanceFilter.addEventListener('change', function() {
            filterCustomers();
        });
    }

    // زر مسح التصفية
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetFilters();
        });
    }
}

// دالة لإعداد الصفحات
function setupPagination() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    const itemsPerPage = 5; // عدد العملاء في كل صفحة
    
    // تحديث عدد الصفحات بناءً على عدد العملاء
    function updatePaginationLinks() {
        const totalPages = Math.ceil(customers.length / itemsPerPage);
        const paginationContainer = document.querySelector('.pagination');
        
        if (!paginationContainer) return;
        
        // إنشاء روابط الصفحات
        paginationContainer.innerHTML = '';
        
        // زر الصفحة السابقة
        const prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.innerHTML = '&laquo;';
        prevLink.classList.add('prev-page');
        paginationContainer.appendChild(prevLink);
        
        // روابط الصفحات
        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            if (i === 1) pageLink.classList.add('active');
            pageLink.setAttribute('data-page', i);
            paginationContainer.appendChild(pageLink);
        }
        
        // زر الصفحة التالية
        const nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.innerHTML = '&raquo;';
        nextLink.classList.add('next-page');
        paginationContainer.appendChild(nextLink);
        
        // إضافة مستمعي الأحداث للروابط
        addPaginationEventListeners();
    }
    
    // إضافة مستمعي الأحداث لروابط الصفحات
    function addPaginationEventListeners() {
        const paginationLinks = document.querySelectorAll('.pagination a');
        let currentPage = 1;
        
        paginationLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // التعامل مع أزرار السابق والتالي
                if (this.classList.contains('prev-page')) {
                    if (currentPage > 1) {
                        currentPage--;
                    } else {
                        return; // لا يمكن الانتقال للخلف من الصفحة الأولى
                    }
                } else if (this.classList.contains('next-page')) {
                    const totalPages = Math.ceil(customers.length / itemsPerPage);
                    if (currentPage < totalPages) {
                        currentPage++;
                    } else {
                        return; // لا يمكن الانتقال للأمام من الصفحة الأخيرة
                    }
                } else {
                    currentPage = parseInt(this.getAttribute('data-page'));
                }
                
                // إزالة الفئة النشطة من جميع الروابط
                document.querySelectorAll('.pagination a').forEach(l => l.classList.remove('active'));
                
                // إضافة الفئة النشطة للرابط المحدد
                document.querySelector(`.pagination a[data-page="${currentPage}"]`).classList.add('active');
                
                // عرض العملاء للصفحة المحددة
                displayCustomersForPage(currentPage);
            });
        });
    }
    
    // عرض العملاء للصفحة المحددة
    function displayCustomersForPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const customersToDisplay = customers.slice(startIndex, endIndex);
        
        // تحديث جدول العملاء
        updateCustomersTable(customersToDisplay);
        
        console.log(`تم الانتقال إلى الصفحة ${page}`);
    }
    
    // تحديث روابط الصفحات عند تحميل الصفحة
    updatePaginationLinks();
    
    // عرض العملاء للصفحة الأولى
    displayCustomersForPage(1);
}

// دالة لتحميل بيانات العملاء
function loadCustomers() {
    // في التطبيق الحقيقي، سيتم استدعاء الخادم لتحميل البيانات
    // هنا نستخدم بيانات ثابتة للعرض فقط
    
    // بيانات العملاء (نموذج)
    const customers = [
        { id: 1, name: 'شركة الأمل', type: 'company', phone: '0512345678', email: 'info@alamal.com', address: 'الرياض، حي العليا', balance: 5000 },
        { id: 2, name: 'مؤسسة النور', type: 'company', phone: '0523456789', email: 'info@alnoor.com', address: 'جدة، حي الروضة', balance: 3500 },
        { id: 3, name: 'محمد أحمد', type: 'individual', phone: '0534567890', email: 'mohammed@example.com', address: 'الدمام، حي الفيصلية', balance: 1200 },
        { id: 4, name: 'شركة الصفا', type: 'company', phone: '0545678901', email: 'info@alsafa.com', address: 'مكة، حي العزيزية', balance: 8000 },
        { id: 5, name: 'أحمد محمد', type: 'individual', phone: '0556789012', email: 'ahmed@example.com', address: 'المدينة، حي قباء', balance: 500 },
        { id: 6, name: 'مؤسسة الإبداع', type: 'company', phone: '0567890123', email: 'info@ibda.com', address: 'الرياض، حي الملز', balance: 4500 },
        { id: 7, name: 'سارة علي', type: 'individual', phone: '0578901234', email: 'sara@example.com', address: 'جدة، حي السلامة', balance: 0 },
        { id: 8, name: 'خالد عبدالله', type: 'individual', phone: '0589012345', email: 'khalid@example.com', address: 'الرياض، حي النزهة', balance: 2000 }
    ];
    
    // تحديث جدول العملاء
    updateCustomersTable(customers);
    
    // تحديث إحصائيات العملاء
    updateCustomerStats(customers);
}

// دالة لتحديث جدول العملاء
function updateCustomersTable(customers) {
    const tableBody = document.querySelector('.customers-table tbody');
    if (!tableBody) return;
    
    // مسح الجدول الحالي
    tableBody.innerHTML = '';
    
    // إضافة الصفوف الجديدة
    customers.forEach(customer => {
        const row = document.createElement('tr');
        
        // تحديد نوع العميل بالعربية
        const customerType = customer.type === 'company' ? 'شركة' : 'فرد';
        
        // تحديد لون الرصيد
        const balanceClass = customer.balance > 0 ? 'positive-balance' : (customer.balance < 0 ? 'negative-balance' : '');
        
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customerType}</td>
            <td>${customer.phone}</td>
            <td>${customer.email || '-'}</td>
            <td class="${balanceClass}">${customer.balance.toLocaleString('ar-SA')} ر.س</td>
            <td class="action-buttons-horizontal">
                <button class="action-btn view" data-id="${customer.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" data-id="${customer.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" data-id="${customer.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // إضافة مستمعي الأحداث لأزرار العرض والتعديل والحذف
    addActionButtonsListeners();
}

// دالة لإضافة مستمعي الأحداث لأزرار العرض والتعديل والحذف
function addActionButtonsListeners() {
    // أزرار العرض
    const viewButtons = document.querySelectorAll('.action-btn.view');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            viewCustomer(customerId);
        });
    });
    
    // أزرار التعديل
    const editButtons = document.querySelectorAll('.action-btn.edit');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            editCustomer(customerId);
        });
    });
    
    // أزرار الحذف
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const customerId = this.getAttribute('data-id');
            deleteCustomer(customerId);
        });
    });
}

// دالة لتحديث إحصائيات العملاء
function updateCustomerStats(customers) {
    // إجمالي عدد العملاء
    const totalCustomers = customers.length;
    const totalCustomersElement = document.querySelector('.total-customers');
    if (totalCustomersElement) {
        totalCustomersElement.textContent = totalCustomers;
    }
    
    // عدد الشركات
    const companiesCount = customers.filter(customer => customer.type === 'company').length;
    const companiesCountElement = document.querySelector('.companies-count');
    if (companiesCountElement) {
        companiesCountElement.textContent = companiesCount;
    }
    
    // عدد الأفراد
    const individualsCount = customers.filter(customer => customer.type === 'individual').length;
    const individualsCountElement = document.querySelector('.individuals-count');
    if (individualsCountElement) {
        individualsCountElement.textContent = individualsCount;
    }
    
    // إجمالي الأرصدة
    const totalBalance = customers.reduce((sum, customer) => sum + customer.balance, 0);
    const totalBalanceElement = document.querySelector('.total-balance');
    if (totalBalanceElement) {
        totalBalanceElement.textContent = totalBalance.toLocaleString('ar-SA') + ' ر.س';
    }
}

// دالة لتصفية العملاء
function filterCustomers() {
    const searchInput = document.getElementById('search-input');
    const typeFilter = document.getElementById('customer-type-filter');
    const balanceFilter = document.getElementById('balance-filter');

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedType = typeFilter ? typeFilter.value : '';
    const selectedBalance = balanceFilter ? balanceFilter.value : '';
    
    // الحصول على جميع صفوف العملاء
    const rows = document.querySelectorAll('.customers-table tbody tr');
    
    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const type = row.cells[2].textContent;
        const phone = row.cells[3].textContent;
        const email = row.cells[4].textContent.toLowerCase();
        
        // التحقق من تطابق البحث ونوع العميل
        const matchesSearch = name.includes(searchTerm) || phone.includes(searchTerm) || email.includes(searchTerm);
        const matchesType = typeFilter === '' || 
                          (typeFilter === 'company' && type === 'شركة') || 
                          (typeFilter === 'individual' && type === 'فرد');
        
        // إظهار أو إخفاء الصف
        if (matchesSearch && matchesType) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    // تحديث عدد النتائج
    updateResultsCount();
}

// دالة لإعادة تعيين التصفية
function resetFilters() {
    document.querySelector('.search-input').value = '';
    document.querySelector('.type-filter').value = '';
    
    // إظهار جميع الصفوف
    const rows = document.querySelectorAll('.customers-table tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // تحديث عدد النتائج
    updateResultsCount();
}

// دالة لتحديث عدد النتائج
function updateResultsCount() {
    const visibleRows = document.querySelectorAll('.customers-table tbody tr[style=""]').length;
    const resultsCount = document.querySelector('.results-count');
    
    if (resultsCount) {
        resultsCount.textContent = visibleRows;
    }
}

// دالة لعرض تفاصيل عميل
function viewCustomer(customerId) {
    console.log('عرض تفاصيل العميل رقم:', customerId);

    // البحث عن العميل في البيانات
    const customer = customers.find(c => c.id == customerId);

    if (!customer) {
        alert('لم يتم العثور على العميل!');
        return;
    }

    // إضافة بيانات إضافية للعرض
    const customerWithDetails = {
        ...customer,
        transactions: [
            { id: 'INV-2023-001', date: '2023-06-15', type: 'فاتورة مبيعات', amount: 2500, status: 'مدفوعة' },
            { id: 'PMT-2023-001', date: '2023-06-15', type: 'دفعة', amount: 2500, status: 'مكتملة' },
            { id: 'INV-2023-002', date: '2023-06-10', type: 'فاتورة مبيعات', amount: 1800, status: 'معلقة' }
        ]
    };

    // عرض نافذة تفاصيل العميل
    showCustomerDetailsModal(customerWithDetails);
}

// دالة لتعديل عميل
function editCustomer(customerId) {
    console.log('تعديل العميل رقم:', customerId);

    // البحث عن العميل في البيانات
    const customer = customers.find(c => c.id == customerId);

    if (!customer) {
        alert('لم يتم العثور على العميل!');
        return;
    }

    // عرض نافذة تعديل العميل
    showEditCustomerModal(customer);
}

// دالة لحذف عميل
function deleteCustomer(customerId) {
    console.log('حذف العميل رقم:', customerId);

    // البحث عن العميل في البيانات
    const customerIndex = customers.findIndex(c => c.id == customerId);

    if (customerIndex === -1) {
        alert('لم يتم العثور على العميل!');
        return;
    }

    const customer = customers[customerIndex];

    // عرض تأكيد الحذف
    if (confirm(`هل أنت متأكد من حذف العميل "${customer.name}"؟\n\nهذا الإجراء لا يمكن التراجع عنه.`)) {
        // حذف العميل من المصفوفة
        customers.splice(customerIndex, 1);

        // تحديث الجدول
        updateCustomersTable(customers);

        // تحديث الإحصائيات
        updateCustomerStats(customers);

        // عرض رسالة نجاح
        alert('تم حذف العميل بنجاح');

        console.log('تم حذف العميل بنجاح');
    }
}

// دالة طباعة قائمة العملاء
function printCustomers() {
    const printWindow = window.open('', '_blank');
    const printContent = generateCustomersPrintContent();

    printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
            <meta charset="UTF-8">
            <title>قائمة العملاء</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; }
                .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 15px; }
                .company-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
                .report-title { font-size: 18px; color: #666; }
                .report-date { font-size: 14px; color: #888; margin-top: 10px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                th { background-color: #f5f5f5; font-weight: bold; }
                .positive-balance { color: #27ae60; font-weight: bold; }
                .negative-balance { color: #e74c3c; font-weight: bold; }
                .summary { margin-top: 30px; padding: 15px; background-color: #f9f9f9; border-radius: 5px; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            ${printContent}
            <script>window.print(); window.close();</script>
        </body>
        </html>
    `);

    printWindow.document.close();
}

// إنشاء محتوى طباعة العملاء
function generateCustomersPrintContent() {
    const currentDate = new Date().toLocaleDateString('ar-SA');
    let content = `
        <div class="header">
            <div class="company-name">نظام إدارة الأعمال</div>
            <div class="report-title">قائمة العملاء</div>
            <div class="report-date">تاريخ الطباعة: ${currentDate}</div>
        </div>
    `;

    if (customers.length === 0) {
        content += '<p style="text-align: center; color: #666;">لا توجد عملاء للعرض</p>';
        return content;
    }

    // جدول العملاء
    content += `
        <table>
            <thead>
                <tr>
                    <th>الرقم</th>
                    <th>الاسم</th>
                    <th>النوع</th>
                    <th>رقم الهاتف</th>
                    <th>البريد الإلكتروني</th>
                    <th>الرصيد</th>
                </tr>
            </thead>
            <tbody>
    `;

    let totalBalance = 0;
    let activeCustomers = 0;
    let companies = 0;
    let individuals = 0;

    customers.forEach(customer => {
        const customerType = customer.type === 'company' ? 'شركة' : 'فرد';
        const balanceClass = customer.balance > 0 ? 'positive-balance' : (customer.balance < 0 ? 'negative-balance' : '');

        content += `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customerType}</td>
                <td>${customer.phone}</td>
                <td>${customer.email || '-'}</td>
                <td class="${balanceClass}">${customer.balance.toLocaleString('ar-SA')} ر.س</td>
            </tr>
        `;

        totalBalance += customer.balance;
        if (customer.status === 'active') activeCustomers++;
        if (customer.type === 'company') companies++;
        else individuals++;
    });

    content += `
            </tbody>
        </table>

        <div class="summary">
            <h3>ملخص الإحصائيات</h3>
            <p><strong>إجمالي العملاء:</strong> ${customers.length}</p>
            <p><strong>العملاء النشطون:</strong> ${activeCustomers}</p>
            <p><strong>الشركات:</strong> ${companies}</p>
            <p><strong>الأفراد:</strong> ${individuals}</p>
            <p><strong>إجمالي الأرصدة:</strong> ${totalBalance.toLocaleString('ar-SA')} ر.س</p>
        </div>
    `;

    return content;
}

// دالة لعرض نافذة إضافة عميل جديد
function showAddCustomerModal() {
    // التأكد من عدم وجود نوافذ منبثقة سابقة
    const existingModals = document.querySelectorAll('.modal');
    existingModals.forEach(modal => {
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    });
    
    // إنشاء عنصر النافذة المنبثقة
    const modalHTML = `
        <div id="customerModal" class="modal" style="display: block; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); overflow: auto;">
            <div class="modal-content" style="background-color: #fff; margin: 10% auto; padding: 20px; border-radius: 8px; width: 80%; max-width: 600px;">
                <div class="modal-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">
                    <h3>إضافة عميل جديد</h3>
                    <span id="closeModalX" style="font-size: 24px; cursor: pointer;">&times;</span>
                </div>
                <div class="modal-body">
                    <form id="add-customer-form">
                        <!-- محتوى النموذج -->
                    </form>
                </div>
                <div class="modal-footer" style="margin-top: 20px; text-align: left;">
                    <button type="button" id="saveCustomerBtn" style="background-color: #4CAF50; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">حفظ</button>
                    <button type="button" id="cancelModalBtn" style="background-color: #f44336; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">إلغاء</button>
                </div>
            </div>
        </div>
    `;
    
    // إضافة النافذة للصفحة
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // تعريف دالة إغلاق النافذة
    function removeModal() {
        const modal = document.getElementById('customerModal');
        if (modal) {
            modal.remove(); // استخدام طريقة remove() الحديثة
            console.log('تم إغلاق النافذة');
        }
    }
    
    // إضافة مستمعي الأحداث للأزرار
    document.getElementById('closeModalX').onclick = removeModal;
    document.getElementById('cancelModalBtn').onclick = removeModal;
    
    // إغلاق النافذة عند النقر خارجها
    const modal = document.getElementById('customerModal');
    modal.addEventListener('click', function(event) {
        if (event.target === this) {
            removeModal();
        }
    });
    
    // باقي الكود الخاص بالنموذج...
}

// دالة مبسطة لعرض نافذة النجاح
function showSimpleSuccessModal(customerData) {
    // إنشاء النافذة
    const successModal = document.createElement('div');
    successModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    successModal.innerHTML = `
        <div style="
            background: white;
            border-radius: 12px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        ">
            <div style="
                color: #28a745;
                font-size: 4rem;
                margin-bottom: 20px;
            ">
                ✅
            </div>

            <h3 style="
                color: #28a745;
                margin: 0 0 15px 0;
                font-size: 1.5rem;
            ">تم الحفظ بنجاح!</h3>

            <div style="
                background: #f8fff9;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #28a745;
                text-align: right;
            ">
                <p style="margin: 5px 0; color: #333;"><strong>اسم العميل:</strong> ${customerData.name}</p>
                <p style="margin: 5px 0; color: #333;"><strong>رقم العميل:</strong> ${customerData.id}</p>
                <p style="margin: 5px 0; color: #333;"><strong>نوع العميل:</strong> ${customerData.type === 'company' ? 'شركة' : 'فرد'}</p>
                <p style="margin: 5px 0; color: #333;"><strong>رقم الهاتف:</strong> ${customerData.phone}</p>
            </div>

            <h4 style="color: #333; margin: 20px 0 15px 0;">ماذا تريد أن تفعل الآن؟</h4>

            <div style="
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin-top: 20px;
            ">
                <button onclick="closeSuccessAndAddAnother()" style="
                    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
                    color: white;
                    border: none;
                    padding: 12px 15px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    ➕ إضافة عميل آخر
                </button>

                <button onclick="viewNewCustomer('${customerData.id}')" style="
                    background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
                    color: white;
                    border: none;
                    padding: 12px 15px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    👁️ عرض العميل
                </button>

                <button onclick="editNewCustomer('${customerData.id}')" style="
                    background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
                    color: white;
                    border: none;
                    padding: 12px 15px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    ✏️ تعديل العميل
                </button>

                <button onclick="closeSuccessModal()" style="
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                    color: white;
                    border: none;
                    padding: 12px 15px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: transform 0.2s;
                " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                    ✅ إنهاء
                </button>
            </div>
        </div>
    `;

    // إضافة الأنماط للانيميشن
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-50px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
    `;
    document.head.appendChild(style);

    // إضافة النافذة للصفحة
    document.body.appendChild(successModal);

    // إضافة الوظائف العامة
    window.closeSuccessModal = function() {
        document.body.removeChild(successModal);
        document.head.removeChild(style);
    };

    window.closeSuccessAndAddAnother = function() {
        document.body.removeChild(successModal);
        document.head.removeChild(style);
        showAddCustomerModal();
    };

    window.viewNewCustomer = function(customerId) {
        document.body.removeChild(successModal);
        document.head.removeChild(style);
        viewCustomer(customerId);
    };

    window.editNewCustomer = function(customerId) {
        document.body.removeChild(successModal);
        document.head.removeChild(style);
        editCustomer(customerId);
    };

    // إغلاق عند النقر خارج النافذة
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            closeSuccessModal();
        }
    });

    // إغلاق تلقائي بعد 15 ثانية
    setTimeout(() => {
        if (document.body.contains(successModal)) {
            closeSuccessModal();
        }
    }, 15000);
}

// دالة لعرض نافذة تعديل عميل
function showEditCustomerModal(customer) {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>تعديل عميل</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <form id="edit-customer-form">
                    <input type="hidden" id="customer-id" value="${customer.id}">
                    <div class="form-group">
                        <label for="customer-type">نوع العميل</label>
                        <select id="customer-type" name="customer-type">
                            <option value="individual" ${customer.type === 'individual' ? 'selected' : ''}>فرد</option>
                            <option value="company" ${customer.type === 'company' ? 'selected' : ''}>شركة</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="customer-name">الاسم</label>
                        <input type="text" id="customer-name" name="customer-name" value="${customer.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="customer-phone">رقم الهاتف</label>
                        <input type="tel" id="customer-phone" name="customer-phone" value="${customer.phone}" required>
                    </div>
                    <div class="form-group">
                        <label for="customer-email">البريد الإلكتروني</label>
                        <input type="email" id="customer-email" name="customer-email" value="${customer.email || ''}">
                    </div>
                    <div class="form-group">
                        <label for="customer-address">العنوان</label>
                        <input type="text" id="customer-address" name="customer-address" value="${customer.address || ''}">
                    </div>
                    <div class="company-fields" style="display: ${customer.type === 'company' ? 'block' : 'none'};">
                        <div class="form-group">
                            <label for="contact-person">الشخص المسؤول</label>
                            <input type="text" id="contact-person" name="contact-person" value="${customer.contactPerson || ''}">
                        </div>
                        <div class="form-group">
                            <label for="tax-number">الرقم الضريبي</label>
                            <input type="text" id="tax-number" name="tax-number" value="${customer.taxNumber || ''}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="customer-notes">ملاحظات</label>
                        <textarea id="customer-notes" name="customer-notes" rows="3">${customer.notes || ''}</textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn primary-btn">حفظ التغييرات</button>
                        <button type="button" class="btn cancel-btn">إلغاء</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // إضافة النافذة المنبثقة إلى الصفحة
    document.body.appendChild(modal);
    
    // إضافة نمط CSS للنافذة المنبثقة إذا لم يكن موجود
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal {
                display: block;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                overflow: auto;
            }
            
            .modal-content {
                background-color: #fff;
                margin: 10% auto;
                padding: 0;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                width: 80%;
                max-width: 600px;
                animation: modalFadeIn 0.3s;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; transform: translateY(-50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                background-color: #3498db;
                color: white;
                border-radius: 8px 8px 0 0;
            }
            
            .modal-header h3 {
                margin: 0;
                font-size: 1.4rem;
            }
            
            .close {
                color: white;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .close:hover {
                color: #f1f1f1;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
                color: #333;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 1rem;
            }
            
            .form-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
            }
            
            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                font-size: 1rem;
            }
            
            .primary-btn {
                background-color: #3498db;
                color: white;
            }
            
            .primary-btn:hover {
                background-color: #2980b9;
            }
            
            .cancel-btn {
                background-color: #e74c3c;
                color: white;
            }
            
            .cancel-btn:hover {
                background-color: #c0392b;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 5% auto;
                }
                
                .form-actions {
                    flex-direction: column;
                }
                
                .btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // إضافة مستمعي الأحداث للنافذة المنبثقة
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const form = modal.querySelector('#edit-customer-form');
    const customerTypeSelect = modal.querySelector('#customer-type');
    const companyFields = modal.querySelector('.company-fields');
    
    // إظهار/إخفاء حقول الشركة بناءً على نوع العميل
    customerTypeSelect.addEventListener('change', function() {
        if (this.value === 'company') {
            companyFields.style.display = 'block';
        } else {
            companyFields.style.display = 'none';
        }
    });
    
    // إغلاق النافذة عند النقر على زر الإغلاق
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // إغلاق النافذة عند النقر على زر الإلغاء
    cancelBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // معالجة إرسال النموذج
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع بيانات العميل
        const customerData = {
            id: document.getElementById('customer-id').value,
            type: document.getElementById('customer-type').value,
            name: document.getElementById('customer-name').value,
            phone: document.getElementById('customer-phone').value,
            email: document.getElementById('customer-email').value,
            address: document.getElementById('customer-address').value,
            contactPerson: document.getElementById('contact-person') ? document.getElementById('contact-person').value : '',
            taxNumber: document.getElementById('tax-number') ? document.getElementById('tax-number').value : '',
            notes: document.getElementById('customer-notes').value
        };
        
        // في التطبيق الحقيقي، سيتم إرسال البيانات إلى الخادم
        console.log('بيانات العميل المعدل:', customerData);
        
        // تحديث صف العميل في الجدول
        updateCustomerRow(customerData);
        
        // عرض رسالة نجاح
        alert('تم تعديل العميل بنجاح!');
        
        // إغلاق النافذة
        document.body.removeChild(modal);
    });
}

// دالة لعرض نافذة تفاصيل العميل
function showCustomerDetailsModal(customer) {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // تحديد نوع العميل بالعربية
    const customerType = customer.type === 'company' ? 'شركة' : 'فرد';
    
    // تحديد لون الرصيد
    const balanceClass = customer.balance > 0 ? 'positive-balance' : (customer.balance < 0 ? 'negative-balance' : '');
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>تفاصيل العميل</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="customer-details">
                    <div class="customer-info">
                        <h4>${customer.name}</h4>
                        <p><strong>نوع العميل:</strong> ${customerType}</p>
                        <p><strong>رقم الهاتف:</strong> ${customer.phone}</p>
                        <p><strong>البريد الإلكتروني:</strong> ${customer.email || '-'}</p>
                        <p><strong>العنوان:</strong> ${customer.address || '-'}</p>
                        ${customer.type === 'company' ? `
                            <p><strong>الشخص المسؤول:</strong> ${customer.contactPerson || '-'}</p>
                            <p><strong>الرقم الضريبي:</strong> ${customer.taxNumber || '-'}</p>
                        ` : ''}
                        <p><strong>ملاحظات:</strong> ${customer.notes || '-'}</p>
                        <p><strong>الرصيد:</strong> <span class="${balanceClass}">${customer.balance.toLocaleString('ar-SA')} ر.س</span></p>
                    </div>
                    
                    <div class="customer-transactions">
                        <h4>المعاملات الأخيرة</h4>
                        ${customer.transactions && customer.transactions.length > 0 ? `
                            <table class="transactions-table">
                                <thead>
                                    <tr>
                                        <th>الرقم</th>
                                        <th>التاريخ</th>
                                        <th>النوع</th>
                                        <th>المبلغ</th>
                                        <th>الحالة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${customer.transactions.map(transaction => `
                                        <tr>
                                            <td>${transaction.id}</td>
                                            <td>${transaction.date}</td>
                                            <td>${transaction.type}</td>
                                            <td>${transaction.amount.toLocaleString('ar-SA')} ر.س</td>
                                            <td><span class="status ${transaction.status === 'مدفوعة' || transaction.status === 'مكتملة' ? 'paid' : 'pending'}">${transaction.status}</span></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        ` : '<p>لا توجد معاملات سابقة</p>'}
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="btn primary-btn edit-customer-btn" data-id="${customer.id}">تعديل</button>
                    <button class="btn cancel-btn close-modal-btn">إغلاق</button>
                </div>
            </div>
        </div>
    `;
    
    // إضافة النافذة المنبثقة إلى الصفحة
    document.body.appendChild(modal);
    
    // إضافة نمط CSS للنافذة المنبثقة إذا لم يكن موجود
    if (!document.querySelector('#modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal {
                display: block;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                overflow: auto;
            }
            
            .modal-content {
                background-color: #fff;
                margin: 5% auto;
                padding: 0;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                width: 90%;
                max-width: 800px;
                animation: modalFadeIn 0.3s;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; transform: translateY(-50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                background-color: #3498db;
                color: white;
                border-radius: 8px 8px 0 0;
            }
            
            .modal-header h3 {
                margin: 0;
                font-size: 1.4rem;
            }
            
            .close {
                color: white;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
            }
            
            .close:hover {
                color: #f1f1f1;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .customer-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            
            .customer-info h4,
            .customer-transactions h4 {
                margin-top: 0;
                margin-bottom: 15px;
                color: #333;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
            }
            
            .customer-info p {
                margin: 8px 0;
            }
            
            .positive-balance {
                color: #27ae60;
                font-weight: bold;
            }
            
            .negative-balance {
                color: #e74c3c;
                font-weight: bold;
            }
            
            .transactions-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            
            .transactions-table th,
            .transactions-table td {
                padding: 10px;
                text-align: right;
                border-bottom: 1px solid #eee;
            }
            
            .transactions-table th {
                background-color: #f9f9f9;
                font-weight: 600;
            }
            
            .status {
                display: inline-block;
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 0.85rem;
            }
            
            .status.paid {
                background-color: #e6f7ee;
                color: #27ae60;
            }
            
            .status.pending {
                background-color: #fff5e6;
                color: #f39c12;
            }
            
            .modal-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
            }
            
            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 600;
                font-size: 1rem;
            }
            
            .primary-btn {
                background-color: #3498db;
                color: white;
            }
            
            .primary-btn:hover {
                background-color: #2980b9;
            }
            
            .cancel-btn {
                background-color: #e74c3c;
                color: white;
            }
            
            .cancel-btn:hover {
                background-color: #c0392b;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 5% auto;
                }
                
                .customer-details {
                    grid-template-columns: 1fr;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
                
                .btn {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // إضافة مستمعي الأحداث للنافذة المنبثقة
    const closeBtn = modal.querySelector('.close');
    const closeModalBtn = modal.querySelector('.close-modal-btn');
    const editCustomerBtn = modal.querySelector('.edit-customer-btn');
    
    // إغلاق النافذة عند النقر على زر الإغلاق
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // إغلاق النافذة عند النقر على زر الإغلاق
    closeModalBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // فتح نافذة تعديل العميل عند النقر على زر التعديل
    editCustomerBtn.addEventListener('click', function() {
        const customerId = this.getAttribute('data-id');
        document.body.removeChild(modal);
        editCustomer(customerId);
    });
}

// دالة لإضافة عميل إلى الجدول
function addCustomerToTable(customerData) {
    const tableBody = document.querySelector('.customers-table tbody');
    if (!tableBody) return;
    
    // استخدام معرف العميل من البيانات
    const customerId = customerData.id;
    
    // إنشاء صف جديد
    const row = document.createElement('tr');
    
    // تحديد نوع العميل بالعربية
    const customerType = customerData.type === 'company' ? 'شركة' : 'فرد';
    
    // تحديد لون الرصيد
    const balanceClass = customerData.balance > 0 ? 'positive-balance' : (customerData.balance < 0 ? 'negative-balance' : '');
    
    row.innerHTML = `
        <td>${customerId}</td>
        <td>${customerData.name}</td>
        <td>${customerType}</td>
        <td>${customerData.phone}</td>
        <td>${customerData.email || '-'}</td>
        <td class="${balanceClass}">${parseFloat(customerData.balance).toLocaleString('ar-SA')} ر.س</td>
        <td class="action-buttons-horizontal">
            <button class="action-btn view" data-id="${customerId}">
                <i class="fas fa-eye"></i>
            </button>
            <button class="action-btn edit" data-id="${customerId}">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" data-id="${customerId}">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    tableBody.appendChild(row);
    
    // إضافة مستمعي الأحداث لأزرار العرض والتعديل والحذف
    const viewBtn = row.querySelector('.view');
    const editBtn = row.querySelector('.edit');
    const deleteBtn = row.querySelector('.delete');
    
    viewBtn.addEventListener('click', function() {
        const customerId = this.getAttribute('data-id');
        viewCustomer(customerId);
    });
    
    editBtn.addEventListener('click', function() {
        const customerId = this.getAttribute('data-id');
        editCustomer(customerId);
    });
    
    deleteBtn.addEventListener('click', function() {
        const customerId = this.getAttribute('data-id');
        deleteCustomer(customerId);
    });
    
    // تحديث إحصائيات العملاء
    const totalCustomers = document.querySelectorAll('.customers-table tbody tr').length;
    const totalCustomersElement = document.querySelector('.total-customers');
    if (totalCustomersElement) {
        totalCustomersElement.textContent = totalCustomers;
    }
    
    // تحديث عدد الشركات أو الأفراد
    if (customerData.type === 'company') {
        const companiesCount = parseInt(document.querySelector('.companies-count').textContent) + 1;
        document.querySelector('.companies-count').textContent = companiesCount;
    } else {
        const individualsCount = parseInt(document.querySelector('.individuals-count').textContent) + 1;
        document.querySelector('.individuals-count').textContent = individualsCount;
    }
}

// دالة لتحديث صف عميل في الجدول
function updateCustomerRow(customerData) {
    // البحث عن صف العميل
    const row = document.querySelector(`.action-btn.edit[data-id="${customerData.id}"]`).closest('tr');
    
    // تحديد نوع العميل بالعربية
    const customerType = customerData.type === 'company' ? 'شركة' : 'فرد';
    
    // تحديث بيانات الصف
    row.cells[1].textContent = customerData.name;
    row.cells[2].textContent = customerType;
    row.cells[3].textContent = customerData.phone;
    row.cells[4].textContent = customerData.email || '-';
}

// دالة لعرض اقتراحات البحث للعملاء
function showSearchSuggestions(searchTerm) {
    if (!searchTerm || searchTerm.length < 1) {
        hideSearchSuggestions();
        return;
    }

    // إنشاء قائمة الاقتراحات إذا لم تكن موجودة
    let suggestionsContainer = document.getElementById('customer-search-suggestions');
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'customer-search-suggestions';
        suggestionsContainer.className = 'search-suggestions';

        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.appendChild(suggestionsContainer);
        }
    }

    // الحصول على العملاء المطابقين
    const matchingCustomers = getMatchingCustomers(searchTerm.toLowerCase());

    if (matchingCustomers.length === 0) {
        hideSearchSuggestions();
        return;
    }

    // إنشاء HTML للاقتراحات
    const suggestionsHTML = matchingCustomers.slice(0, 5).map(customer => `
        <div class="suggestion-item" onclick="selectCustomerSuggestion('${customer.name}')">
            <div class="suggestion-name">${highlightMatch(customer.name, searchTerm)}</div>
            <div class="suggestion-details">${customer.phone} - ${customer.email}</div>
        </div>
    `).join('');

    suggestionsContainer.innerHTML = suggestionsHTML;
    suggestionsContainer.style.display = 'block';
}

// دالة لإخفاء اقتراحات البحث
function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('customer-search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// دالة للحصول على العملاء المطابقين
function getMatchingCustomers(searchTerm) {
    const rows = document.querySelectorAll('.customers-table tbody tr');
    const matchingCustomers = [];

    rows.forEach(row => {
        const name = row.cells[1].textContent;
        const phone = row.cells[3].textContent;
        const email = row.cells[4].textContent;

        if (name.toLowerCase().includes(searchTerm) ||
            phone.toLowerCase().includes(searchTerm) ||
            email.toLowerCase().includes(searchTerm)) {
            matchingCustomers.push({
                name: name,
                phone: phone,
                email: email
            });
        }
    });

    return matchingCustomers;
}

// دالة لتمييز النص المطابق
function highlightMatch(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

// دالة لاختيار اقتراح العملاء
function selectCustomerSuggestion(customerName) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = customerName;
        filterCustomers();
        hideSearchSuggestions();
    }
}

// إضافة CSS للاقتراحات
function addCustomerSearchSuggestionsCSS() {
    if (document.getElementById('customer-search-suggestions-style')) return;

    const style = document.createElement('style');
    style.id = 'customer-search-suggestions-style';
    style.textContent = `
        .search-box {
            position: relative;
        }

        .search-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
            display: none;
        }

        .suggestion-item {
            padding: 12px 15px;
            cursor: pointer;
            border-bottom: 1px solid #f0f0f0;
            transition: background-color 0.2s;
        }

        .suggestion-item:hover {
            background-color: #f8f9fa;
        }

        .suggestion-item:last-child {
            border-bottom: none;
        }

        .suggestion-name {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 4px;
        }

        .suggestion-name strong {
            background-color: #fff3cd;
            color: #856404;
            padding: 1px 3px;
            border-radius: 3px;
        }

        .suggestion-details {
            font-size: 12px;
            color: #6c757d;
        }
    `;

    document.head.appendChild(style);
}

// تهيئة CSS عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    addCustomerSearchSuggestionsCSS();
});

// دالة لعرض نافذة تأكيد النجاح مع خيارات
function showSuccessModal(customerData) {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal success-modal';
    modal.innerHTML = `
        <div class="modal-content success-content">
            <div class="modal-header success-header">
                <h3><i class="fas fa-check-circle"></i> تم الحفظ بنجاح!</h3>
            </div>
            <div class="modal-body">
                <div class="success-message">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="success-text">
                        <h4>تم إضافة العميل بنجاح</h4>
                        <p><strong>اسم العميل:</strong> ${customerData.name}</p>
                        <p><strong>رقم العميل:</strong> ${customerData.id}</p>
                        <p><strong>نوع العميل:</strong> ${customerData.type === 'company' ? 'شركة' : 'فرد'}</p>
                        <p><strong>رقم الهاتف:</strong> ${customerData.phone}</p>
                    </div>
                </div>

                <div class="success-actions">
                    <h5>ماذا تريد أن تفعل الآن؟</h5>
                    <div class="action-buttons">
                        <button class="btn primary-btn add-another-btn">
                            <i class="fas fa-plus"></i>
                            إضافة عميل آخر
                        </button>
                        <button class="btn secondary-btn view-customer-btn" data-id="${customerData.id}">
                            <i class="fas fa-eye"></i>
                            عرض العميل
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة النافذة للصفحة
    document.body.appendChild(modal);
    
    // تعريف الأزرار
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const form = modal.querySelector('#add-customer-form');
    
    // دالة إغلاق النافذة
    function closeModalWindow() {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
            console.log('تم إغلاق نافذة إضافة عميل');
        }
    }
    
    // إغلاق النافذة عند النقر على زر الإغلاق (X)
    if (closeBtn) {
        closeBtn.onclick = function() {
            closeModalWindow();
            return false;
        };
    }
    
    // إغلاق النافذة عند النقر على زر الإلغاء
    if (cancelBtn) {
        cancelBtn.onclick = function() {
            closeModalWindow();
            return false;
        };
    }
    
    // إغلاق النافذة عند النقر خارجها
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModalWindow();
        }
    };
    
    // باقي الكود الخاص بالنموذج
    // ...
}

// دالة إغلاق النافذة المنبثقة
function closeModal(element) {
    const modal = element.closest('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// دالة لعرض نافذة إضافة عميل جديد
function showAddCustomerModal() {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>إضافة عميل جديد</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <form id="add-customer-form">
                    <!-- محتوى النموذج -->
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn save-btn">حفظ</button>
                <button type="button" class="btn cancel-btn">إلغاء</button>
            </div>
        </div>
    `;
    
    // إضافة النافذة للصفحة
    document.body.appendChild(modal);
    
    // تعريف الأزرار
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.cancel-btn');
    
    // دالة إغلاق النافذة
    function closeCustomerModal() {
        document.body.removeChild(modal);
    }
    
    // إضافة مستمعي الأحداث للأزرار
    closeBtn.addEventListener('click', closeCustomerModal);
    cancelBtn.addEventListener('click', closeCustomerModal);
    
    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCustomerModal();
        }
    });
    
    // باقي الكود الخاص بالنموذج...
}

// تعريف دالة عامة لإغلاق النوافذ المنبثقة
window.closeCustomerModal = function(element) {
    const modal = element.closest('.modal');
    if (modal && modal.parentNode) {
        modal.parentNode.removeChild(modal);
    }
};
                background-color: #34495e;
                color: white;
            }

            .info-btn:hover {
                background-color: #2c3e50;
            }

            .success-btn {
                background-color: #27ae60;
                color: white;
            }

            .success-btn:hover {
                background-color: #229970;
            }
        `;
        document.head.appendChild(style);
    }
}
                flex: 1;
            }

            .success-text h4 {
                margin: 0 0 10px 0;
                font-size: 1.2rem;
                color: #333;
            }

            .success-text p {
                margin: 5px 0;
                color: #555;
            }

            .success-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .action-buttons {
                display: flex;
                gap: 10px;
            }

            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1rem;
                transition: background-color 0.3s;
            }

            .primary-btn {
                background-color: #28a745;
                color: white;
            }

            .primary-btn:hover {
                background-color: #218838;
            }

            .secondary-btn {
                background-color: #6c757d;
                color: white;
            }

            .secondary-btn:hover {
                background-color: #5a6268;
            }

            .info-btn {
                background-color: #17a2b8;
                color: white;
            }

            .info-btn:hover {
                background-color: #138496;
            }

            .success-btn {
                background-color: #28a745;
                color: white;
            }

            .success-btn:hover {
                background-color: #218838;
            }
        `;
        document.head.appendChild(style);
    }
}
                flex: 0 0 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #d4edda;
                border-radius: 50%;
                margin-right: 15px;
            }

            .success-icon i {
                font-size: 2.5rem;
                color: #155724;
            }

            .success-text {
                flex: 1;
            }

            .success-text h4 {
                margin: 0 0 10px 0;
                font-size: 1.2rem;
                color: #333;
            }

            .success-text p {
                margin: 5px 0;
                font-size: 1rem;
                color: #555;
            }

            .success-actions {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .action-buttons {
                display: flex;
                gap: 10px;
            }

            .action-buttons button {
                padding: 10px 15px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1rem;
                transition: background-color 0.3s;
            }

            .primary-btn {
                background-color: #28a745;
                color: white;
            }

            .primary-btn:hover {
                background-color: #218838;
            }

            .secondary-btn {
                background-color: #6c757d;
                color: white;
            }

            .secondary-btn:hover {
                background-color: #5a6268;
            }
        `;
        document.head.appendChild(style);
    }
}
                border-left: 4px solid #27ae60;
            }

            .success-icon {
                font-size: 3rem;
                color: #27ae60;
                flex-shrink: 0;
            }

            .success-text h4 {
                margin: 0 0 15px 0;
                color: #27ae60;
                font-size: 1.2rem;
            }

            .success-text p {
                margin: 5px 0;
                color: #333;
                font-size: 0.95rem;
            }

            .success-actions h5 {
                margin: 0 0 15px 0;
                color: #333;
                text-align: center;
                font-size: 1.1rem;
            }

            .action-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }

            .action-buttons .btn {
                padding: 12px 15px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                font-size: 0.9rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.3s ease;
            }

            .action-buttons .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }

            .secondary-btn {
                background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
                color: white;
            }

            .secondary-btn:hover {
                background: linear-gradient(135deg, #495057 0%, #343a40 100%);
            }

            .info-btn {
                background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
                color: white;
            }

            .info-btn:hover {
                background: linear-gradient(135deg, #138496 0%, #0c5460 100%);
            }

            .success-btn {
                background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                color: white;
            }

            .success-btn:hover {
                background: linear-gradient(135deg, #20c997 0%, #17a2b8 100%);
            }

            @media (max-width: 600px) {
                .action-buttons {
                    grid-template-columns: 1fr;
                }

                .success-message {
                    flex-direction: column;
                    text-align: center;
                }

                .success-icon {
                    align-self: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // إضافة مستمعي الأحداث للأزرار
    const addAnotherBtn = modal.querySelector('.add-another-btn');
    const viewCustomerBtn = modal.querySelector('.view-customer-btn');
    const editCustomerBtn = modal.querySelector('.edit-customer-btn');
    const closeSuccessBtn = modal.querySelector('.close-success-btn');

    // زر إضافة عميل آخر
    addAnotherBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
        showAddCustomerModal();
    });

    // زر عرض تفاصيل العميل
    viewCustomerBtn.addEventListener('click', function() {
        const customerId = this.getAttribute('data-id');
        document.body.removeChild(modal);
        viewCustomer(customerId);
    });

    // زر تعديل العميل
    editCustomerBtn.addEventListener('click', function() {
        const customerId = this.getAttribute('data-id');
        document.body.removeChild(modal);
        editCustomer(customerId);
    });

    // زر الإنهاء
    closeSuccessBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });

    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });

    // إغلاق تلقائي بعد 15 ثانية
    setTimeout(() => {
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    }, 15000);
}

// دالة لتحديث الإحصائيات
function updateCustomerStats(customers) {
    // حساب الإحصائيات
    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'active').length;
    const companies = customers.filter(c => c.type === 'company').length;
    const individuals = customers.filter(c => c.type === 'individual').length;

    // تحديث العناصر في الصفحة
    const totalElement = document.getElementById('total-customers');
    const activeElement = document.getElementById('active-customers');
    const companiesElement = document.getElementById('companies-count');
    const individualsElement = document.getElementById('individuals-count');

    if (totalElement) {
        totalElement.textContent = totalCustomers;
        // إضافة تأثير بصري للتحديث
        totalElement.style.transform = 'scale(1.2)';
        totalElement.style.color = '#28a745';
        setTimeout(() => {
            totalElement.style.transform = 'scale(1)';
            totalElement.style.color = '';
        }, 500);
    }

    if (activeElement) {
        activeElement.textContent = activeCustomers;
        activeElement.style.transform = 'scale(1.2)';
        activeElement.style.color = '#28a745';
        setTimeout(() => {
            activeElement.style.transform = 'scale(1)';
            activeElement.style.color = '';
        }, 500);
    }

    if (companiesElement) {
        companiesElement.textContent = companies;
    }

    if (individualsElement) {
        individualsElement.textContent = individuals;
    }

    console.log('تم تحديث الإحصائيات:', {
        total: totalCustomers,
        active: activeCustomers,
        companies: companies,
        individuals: individuals
    });
}








