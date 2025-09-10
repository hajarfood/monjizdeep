// ملف JavaScript لصفحة المشتريات

document.addEventListener('DOMContentLoaded', function() {
    // تهيئة الصفحة
    initPage();

    // إضافة مستمعي الأحداث للأزرار
    setupEventListeners();

    // إعداد البحث والتصفية
    setupSearchAndFilter();

    // تحميل بيانات المشتريات
    loadPurchases();
});

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

// دالة تهيئة الصفحة
function initPage() {
    console.log('تم تهيئة صفحة المشتريات بنجاح');
    
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
    // زر إضافة فاتورة مشتريات جديدة
    const addPurchaseBtn = document.querySelector('.add-purchase-btn');
    if (addPurchaseBtn) {
        addPurchaseBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // استدعاء دالة إظهار نافذة فاتورة مشتريات جديدة من النطاق العام
            if (typeof window.showAddPurchaseModal === 'function') {
                window.showAddPurchaseModal();
                return;
            }
            
            // إذا لم تكن الدالة متاحة، انتظر حتى يتم تحميل DOM بالكامل
            document.addEventListener('DOMContentLoaded', function() {
                if (typeof window.showAddPurchaseModal === 'function') {
                    window.showAddPurchaseModal();
                } else {
                    // إذا لم تكن متاحة بعد تحميل DOM، حاول مرة أخرى بعد تأخير
                    setTimeout(() => {
                        if (typeof window.showAddPurchaseModal === 'function') {
                            window.showAddPurchaseModal();
                        } else {
                            console.error('showAddPurchaseModal function not found in window object');
                            alert('تعذر فتح نافذة فاتورة المشتريات الجديدة. يرجى التأكد من تحميل جميع الملفات المطلوبة ثم المحاولة مرة أخرى.');
                        }
                    }, 500);
                }
            });
        });
    }

    // زر إضافة مورد جديد
    const addSupplierBtn = document.querySelector('.add-supplier-btn');
    if (addSupplierBtn) {
        addSupplierBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAddSupplierModal();
        });
    }

    // أزرار البحث والتصفية
    setupSearchAndFilter();
    
    // أزرار الصفحات
    setupPagination();
}

// دالة لإعداد البحث والتصفية
function setupSearchAndFilter() {
    // مربع البحث
    const searchInput = document.getElementById('purchase-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterPurchases();
            showSearchSuggestions(this.value);
        });

        // إضافة البحث عند الضغط على Enter
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterPurchases();
            }
        });

        // إخفاء الاقتراحات عند فقدان التركيز
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                hideSearchSuggestions();
            }, 200);
        });
    }

    // قائمة المورد
    const supplierFilter = document.getElementById('supplier-filter');
    if (supplierFilter) {
        supplierFilter.addEventListener('change', function() {
            filterPurchases();
        });
    }

    // قائمة تصفية التاريخ
    const dateFilter = document.getElementById('date-filter');
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            filterPurchases();
        });
    }
    
    // زر إعادة تعيين التصفية
    const resetFilterBtn = document.getElementById('reset-filter');
    if (resetFilterBtn) {
        resetFilterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetFilters();
        });
    }
}

// دالة لإعداد الصفحات
function setupPagination() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة الفئة النشطة من جميع الروابط
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // إضافة الفئة النشطة للرابط المحدد
            this.classList.add('active');
            
            // تحميل صفحة المشتريات المناسبة
            // في التطبيق الحقيقي، سيتم استدعاء الخادم لتحميل الصفحة المناسبة
            console.log('تم النقر على رابط الصفحة:', this.textContent);
        });
    });
}

// تم نقل دالة showAddPurchaseModal إلى ملف main.js وتعيينها إلى window.showAddPurchaseModal

// متغيرات عامة لإدارة عرض البيانات والصفحات
let purchasesAllData = [];
let purchasesTotalItems = 0;
let purchasesCurrentPage = 1;
let purchasesItemsPerPage = 10;

// دالة تحديث عرض بيانات المشتريات
function updatePurchasesDataDisplay() {
    const tableBody = document.getElementById('purchases-list');
    if (!tableBody) return;
    
    // مسح الجدول الحالي
    tableBody.innerHTML = '';
    
    // حساب نطاق العناصر للصفحة الحالية
    const startIndex = (purchasesCurrentPage - 1) * purchasesItemsPerPage;
    const endIndex = Math.min(startIndex + purchasesItemsPerPage, purchasesTotalItems);
    
    // تحديث معلومات النتائج
    document.getElementById('start-result').textContent = purchasesTotalItems > 0 ? startIndex + 1 : 0;
    document.getElementById('end-result').textContent = endIndex;
    document.getElementById('total-results').textContent = purchasesTotalItems;
    
    // إذا لم تكن هناك بيانات
    if (purchasesTotalItems === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="8" class="no-results">لا توجد فواتير مشتريات</td>`;
        tableBody.appendChild(emptyRow);
        updatePaginationControls();
        return;
    }
    
    // عرض البيانات للصفحة الحالية
    const currentPageData = purchasesAllData.slice(startIndex, endIndex);
    
    currentPageData.forEach(purchase => {
        const row = document.createElement('tr');
        
        // تحديد فئة حالة الفاتورة
        let statusClass = '';
        let statusText = purchase.status || 'معلق';
        
        switch (statusText.toLowerCase()) {
            case 'مدفوع':
            case 'مدفوعة':
            case 'paid':
                statusClass = 'primary';
                statusText = 'مدفوع';
                break;
            case 'معلق':
            case 'معلقة':
            case 'pending':
                statusClass = 'secondary';
                statusText = 'معلق';
                break;
            case 'ملغي':
            case 'ملغية':
            case 'cancelled':
                statusClass = 'danger';
                statusText = 'ملغي';
                break;
            default:
                statusClass = 'secondary';
        }
        
        // تحديد طريقة الدفع
        let paymentMethod = purchase.paymentMethod || 'نقداً';
        let paymentClass = '';
        
        switch(paymentMethod.toLowerCase()) {
            case 'نقداً':
            case 'نقدي':
            case 'cash':
                paymentClass = 'success';
                paymentMethod = 'نقداً';
                break;
            case 'تحويل':
            case 'تحويل بنكي':
            case 'bank':
            case 'transfer':
                paymentClass = 'info';
                paymentMethod = 'تحويل بنكي';
                break;
            case 'آجل':
            case 'credit':
                paymentClass = 'warning';
                paymentMethod = 'آجل';
                break;
            default:
                paymentClass = 'info';
        }
        
        // تنسيق التاريخ
        const purchaseDate = purchase.date ? new Date(purchase.date) : new Date();
        const day = purchaseDate.getDate().toString().padStart(2, '0');
        const month = (purchaseDate.getMonth() + 1).toString().padStart(2, '0');
        const year = purchaseDate.getFullYear();
        const formattedDate = `${year}-${month}-${day}`;
        
        // تنسيق المبلغ
        const total = purchase.total || 0;
        const formattedTotal = total.toLocaleString('ar-SA') + ' ر.س';
        
        // عدد المنتجات
        const productsCount = purchase.items || 0;
        
        // اسم المورد
        const supplierName = purchase.supplier ? 
            (typeof purchase.supplier === 'object' ? purchase.supplier.name : purchase.supplier) : 
            'غير محدد';
        
        row.innerHTML = `
            <td><strong>${purchase.id}</strong></td>
            <td>${formattedDate}</td>
            <td>${supplierName}</td>
            <td>${productsCount}</td>
            <td><strong class="positive">${formattedTotal}</strong></td>
            <td><span class="badge ${paymentClass}">${paymentMethod}</span></td>
        `;
        `;
        
        tableBody.appendChild(row);
    });
    
    // تحديث أزرار الصفحات
    updatePaginationControls();
}

// دالة تحديث أزرار الصفحات
function updatePaginationControls() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(purchasesTotalItems / purchasesItemsPerPage);
    
    let paginationHTML = '';
    
    // زر الصفحة السابقة
    const prevDisabled = purchasesCurrentPage === 1 ? 'disabled' : '';
    paginationHTML += `
        <button class="page-btn prev ${prevDisabled}" onclick="changePurchasesPage('prev')">
            <i class="fas fa-chevron-right"></i> السابق
        </button>
    `;
    
    // أزرار الصفحات
    const maxVisiblePages = 5;
    let startPage = Math.max(1, purchasesCurrentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === purchasesCurrentPage ? 'active' : '';
        paginationHTML += `<button class="page-btn ${activeClass}" onclick="changePurchasesPage(${i})">${i}</button>`;
    }
    
    // زر الصفحة التالية
    const nextDisabled = purchasesCurrentPage === totalPages ? 'disabled' : '';
    paginationHTML += `
        <button class="page-btn next ${nextDisabled}" onclick="changePurchasesPage('next')">
            التالي <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    paginationContainer.innerHTML = paginationHTML;
}

// دالة تغيير صفحة المشتريات
function changePurchasesPage(page) {
    const totalPages = Math.ceil(purchasesTotalItems / purchasesItemsPerPage);
    
    if (page === 'prev') {
        if (purchasesCurrentPage > 1) {
            purchasesCurrentPage--;
        }
    } else if (page === 'next') {
        if (purchasesCurrentPage < totalPages) {
            purchasesCurrentPage++;
        }
    } else if (typeof page === 'number') {
        if (page >= 1 && page <= totalPages) {
            purchasesCurrentPage = page;
        }
    }
    
    updatePurchasesDataDisplay();
}

// دالة لتحميل بيانات المشتريات
function loadPurchases() {
    console.log('📊 تحميل بيانات المشتريات...');
    
    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        try {
            window.dataManager = new DataManager();
            console.log('✅ تم تهيئة النظام المركزي بنجاح');
        } catch (error) {
            console.error('❌ فشل في تهيئة النظام المركزي:', error);
            // الرجوع للبيانات المحلية
            const localPurchases = JSON.parse(localStorage.getItem('monjizPurchases')) || [];
            purchasesAllData = localPurchases;
            purchasesTotalItems = purchasesAllData.length;
            purchasesCurrentPage = 1;
            updatePurchasesDataDisplay();
            return;
        }
    }
    
    try {
        // الحصول على المشتريات من النظام المركزي
        let purchasesData = window.dataManager.getPurchases ? window.dataManager.getPurchases() : [];
        console.log('✅ تم جلب المشتريات من النظام المركزي:', purchasesData.length, 'فاتورة');
        
        // إذا لم توجد بيانات، جلب من localStorage
        if (purchasesData.length === 0) {
            const localPurchases = JSON.parse(localStorage.getItem('monjizPurchases')) || [];
            
            if (localPurchases.length > 0) {
                console.log('📦 استخدام البيانات المحلية:', localPurchases.length, 'فاتورة');
                purchasesData = localPurchases;
            }
        }
        
        // ترتيب الفواتير حسب التاريخ (الأحدث أولاً)
        purchasesData.sort((a, b) => {
            let timeA, timeB;
            
            if (a.date) {
                timeA = new Date(a.date).getTime();
            } else if (a.id && a.id.includes('-')) {
                const parts = a.id.split('-');
                timeA = parseInt(parts[parts.length - 1]) || 0;
            } else {
                timeA = 0;
            }
            
            if (b.date) {
                timeB = new Date(b.date).getTime();
            } else if (b.id && b.id.includes('-')) {
                const parts = b.id.split('-');
                timeB = parseInt(parts[parts.length - 1]) || 0;
            } else {
                timeB = 0;
            }
            
            return timeB - timeA; // ترتيب تنازلي (الأحدث أولاً)
        });
        
        // تحديث المتغيرات العامة
        purchasesAllData = purchasesData;
        purchasesTotalItems = purchasesAllData.length;
        purchasesCurrentPage = 1;
        
        updatePurchasesDataDisplay();
        
    } catch (error) {
        console.error('❌ خطأ في تحميل بيانات المشتريات:', error);
        
        // الرجوع للبيانات المحلية في حالة الخطأ
        const localPurchases = JSON.parse(localStorage.getItem('monjizPurchases')) || [];
        console.log('📦 تم الرجوع للبيانات المحلية:', localPurchases.length, 'فاتورة');
        
        purchasesAllData = localPurchases;
        purchasesTotalItems = purchasesAllData.length;
        purchasesCurrentPage = 1;
        
        updatePurchasesDataDisplay();
    }
}

// دالة لتحديث قائمة الموردين
function updateSuppliersList(suppliers) {
    const supplierFilter = document.getElementById('supplier-filter');
    if (!supplierFilter) return;
    
    // مسح الخيارات الحالية باستثناء الخيار الافتراضي
    while (supplierFilter.options.length > 1) {
        supplierFilter.remove(1);
    }
    
    // ترتيب الموردين أبجدياً
    suppliers.sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        return nameA.localeCompare(nameB, 'ar');
    });
    
    // إضافة خيارات الموردين
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.id;
        option.textContent = supplier.name;
        supplierFilter.appendChild(option);
    });
    
    // إضافة فئة للموردين الأكثر نشاطاً
    const topSuppliers = [...suppliers]
        .sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0))
        .slice(0, 5);
    
    if (topSuppliers.length > 0) {
        // إضافة فاصل
        const separator = document.createElement('option');
        separator.disabled = true;
        separator.textContent = '──────────';
        supplierFilter.insertBefore(separator, supplierFilter.options[1]);
        
        // إضافة عنوان للموردين الأكثر نشاطاً
        const topHeader = document.createElement('option');
        topHeader.disabled = true;
        topHeader.textContent = '🔝 الموردين الأكثر نشاطاً';
        supplierFilter.insertBefore(topHeader, supplierFilter.options[1]);
        
        // إضافة الموردين الأكثر نشاطاً
        topSuppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier.id;
            option.textContent = supplier.name;
            option.classList.add('top-supplier');
            supplierFilter.insertBefore(option, separator);
        });
    }
}

// دالة لتحديث جدول المشتريات
function updatePurchasesTable(purchases) {
    const tableBody = document.querySelector('.purchases-table tbody');
    if (!tableBody) return;
    
    // مسح الجدول الحالي
    tableBody.innerHTML = '';
    
    // إضافة الصفوف الجديدة
    purchases.forEach(purchase => {
        const row = document.createElement('tr');
        
        // تحديد لون حالة الفاتورة
        let statusClass = '';
        switch(purchase.status) {
            case 'مدفوعة':
                statusClass = 'paid';
                break;
            case 'معلقة':
                statusClass = 'pending';
                break;
            case 'مدفوعة جزئياً':
                statusClass = 'partial';
                break;
            default:
                statusClass = '';
        }
        
        row.innerHTML = `
            <td>${purchase.id}</td>
            <td>${formatDate(purchase.date)}</td>
            <td>${purchase.supplier.name}</td>
            <td><strong>${purchase.total.toLocaleString('ar-SA')} ر.س</strong></td>
            <td><span class="badge ${statusClass}">${purchase.status}</span></td>
            <td>
                <div class="action-buttons-horizontal">
                    <button class="action-btn edit" data-id="${purchase.id}" title="تعديل">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn view" data-id="${purchase.id}" title="عرض">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn delete" data-id="${purchase.id}" title="حذف">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // إضافة مستمعي الأحداث لأزرار العرض والتعديل والحذف
    addActionButtonsListeners();
}

// دالة لتنسيق التاريخ
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
}

// دالة لإضافة مستمعي الأحداث لأزرار العرض والتعديل والحذف
function addActionButtonsListeners() {
    // أزرار العرض
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const purchaseId = this.getAttribute('data-id');
            viewPurchase(purchaseId);
        });
    });
    
    // أزرار التعديل
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const purchaseId = this.getAttribute('data-id');
            editPurchase(purchaseId);
        });
    });
    
    // أزرار الحذف
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const purchaseId = this.getAttribute('data-id');
            deletePurchase(purchaseId);
        });
    });
}

// دالة لتحديث إحصائيات المشتريات
function updatePurchaseStats(purchases) {
    // إجمالي عدد الفواتير
    const totalPurchases = purchases.length;
    const totalPurchasesElement = document.querySelector('.total-purchases');
    if (totalPurchasesElement) {
        totalPurchasesElement.textContent = totalPurchases;
    }
    
    // إجمالي المشتريات
    const totalAmount = purchases.reduce((sum, purchase) => sum + purchase.total, 0);
    const totalAmountElement = document.querySelector('.total-amount');
    if (totalAmountElement) {
        totalAmountElement.textContent = totalAmount.toLocaleString('ar-SA') + ' ر.س';
    }
    
    // عدد الفواتير المدفوعة
    const paidPurchases = purchases.filter(purchase => purchase.status === 'مدفوعة').length;
    const paidPurchasesElement = document.querySelector('.paid-purchases');
    if (paidPurchasesElement) {
        paidPurchasesElement.textContent = paidPurchases;
    }
    
    // عدد الفواتير المعلقة
    const pendingPurchases = purchases.filter(purchase => purchase.status === 'معلقة').length;
    const pendingPurchasesElement = document.querySelector('.pending-purchases');
    if (pendingPurchasesElement) {
        pendingPurchasesElement.textContent = pendingPurchases;
    }
    
    // عدد الفواتير المدفوعة جزئياً
    const partialPurchases = purchases.filter(purchase => purchase.status === 'مدفوعة جزئياً').length;
    const partialPurchasesElement = document.querySelector('.partial-purchases');
    if (partialPurchasesElement) {
        partialPurchasesElement.textContent = partialPurchases;
    }
}

// دالة لتصفية المشتريات
function filterPurchases() {
    const searchInput = document.getElementById('purchase-search');
    const supplierFilter = document.getElementById('supplier-filter');
    const dateFilter = document.getElementById('date-filter');

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedSupplier = supplierFilter ? supplierFilter.value : 'all';
    const selectedDate = dateFilter ? dateFilter.value : 'all';
    
    // الحصول على جميع صفوف المشتريات
    const rows = document.querySelectorAll('.purchases-table tbody tr');
    
    // الحصول على التاريخ الحالي
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // تاريخ الأمس
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // بداية الأسبوع الحالي (الأحد)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    // بداية الشهر الحالي
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // بداية الشهر الماضي
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    
    // بداية ربع السنة الحالي
    const currentQuarter = Math.floor(today.getMonth() / 3);
    const startOfQuarter = new Date(today.getFullYear(), currentQuarter * 3, 1);
    
    // بداية السنة الحالية
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    
    rows.forEach(row => {
        // تجاهل الصفوف التي ليست صفوف بيانات (مثل صف "لا توجد نتائج")
        if (row.cells.length < 5) return;
        
        const id = row.cells[0].textContent.toLowerCase();
        const dateText = row.cells[1].textContent;
        const supplier = row.cells[2].textContent.toLowerCase();
        
        // تحويل نص التاريخ إلى كائن Date
        let rowDate;
        try {
            // محاولة تحليل التاريخ بتنسيق YYYY-MM-DD
            const dateParts = dateText.split('-');
            if (dateParts.length === 3) {
                rowDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
                console.log('تم تحليل التاريخ:', dateText, 'إلى:', rowDate);
            } else {
                // إذا كان التنسيق مختلفًا، استخدم Date.parse
                rowDate = new Date(Date.parse(dateText));
                console.log('تم تحليل التاريخ بواسطة Date.parse:', dateText, 'إلى:', rowDate);
            }
            rowDate.setHours(0, 0, 0, 0);
        } catch (e) {
            console.error('خطأ في تحليل التاريخ:', dateText, e);
            rowDate = new Date(0); // تاريخ افتراضي في حالة الخطأ
        }
        
        // تعديل البحث ليركز على رقم الفاتورة
        let matchesSearch = true;
        if (searchTerm) {
            // البحث في رقم الفاتورة فقط
            matchesSearch = id.includes(searchTerm);
        }
        
        // التحقق من تطابق المورد
        let matchesSupplier = true;
        if (selectedSupplier && selectedSupplier !== 'all') {
            const supplierName = getSupplierNameById(selectedSupplier);
            matchesSupplier = supplier.includes(supplierName.toLowerCase());
        }
        
        // التحقق من تطابق التاريخ
        let matchesDate = true;
        if (selectedDate && selectedDate !== 'all') {
            switch (selectedDate) {
                case 'today':
                    matchesDate = rowDate.getTime() === today.getTime();
                    break;
                case 'yesterday':
                    matchesDate = rowDate.getTime() === yesterday.getTime();
                    break;
                case 'week':
                    matchesDate = rowDate >= startOfWeek && rowDate <= today;
                    break;
                case 'month':
                    matchesDate = rowDate >= startOfMonth && rowDate <= today;
                    break;
                case 'last-month':
                    matchesDate = rowDate >= startOfLastMonth && rowDate <= endOfLastMonth;
                    break;
                case 'quarter':
                    matchesDate = rowDate >= startOfQuarter && rowDate <= today;
                    break;
                case 'year':
                    matchesDate = rowDate >= startOfYear && rowDate <= today;
                    break;
                default:
                    matchesDate = true;
            }
        }
        
        // إظهار أو إخفاء الصف
        if (matchesSearch && matchesSupplier && matchesDate) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
    
    // تحديث عدد النتائج
    updateResultsCount();
}

// دالة للحصول على اسم المورد من خلال المعرف
function getSupplierNameById(supplierId) {
    const supplierOption = document.querySelector(`.supplier-filter option[value="${supplierId}"]`);
    return supplierOption ? supplierOption.textContent : '';
}

// دالة لإعادة تعيين التصفية
function resetFilters() {
    const searchInput = document.getElementById('purchase-search');
    const supplierFilter = document.getElementById('supplier-filter');
    const dateFilter = document.getElementById('date-filter');
    
    if (searchInput) searchInput.value = '';
    if (supplierFilter) supplierFilter.value = 'all';
    if (dateFilter) dateFilter.value = 'all';
    
    // إظهار جميع الصفوف
    const rows = document.querySelectorAll('.purchases-table tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
    
    // تحديث عدد النتائج
    updateResultsCount();
}

// دالة لتحديث عدد النتائج
function updateResultsCount() {
    const visibleRows = document.querySelectorAll('.purchases-table tbody tr[style=""]').length;
    const resultsCount = document.querySelector('.results-count');
    
    if (resultsCount) {
        resultsCount.textContent = visibleRows;
    }
}

// دالة لعرض تفاصيل فاتورة مشتريات
function viewPurchase(purchaseId) {
    console.log('عرض تفاصيل فاتورة المشتريات رقم:', purchaseId);
    
    // في التطبيق الحقيقي، سيتم استدعاء الخادم للحصول على بيانات الفاتورة
    // هنا نستخدم بيانات ثابتة للعرض فقط
    const purchase = {
        id: purchaseId,
        date: '2023-06-15',
        supplier: { id: 1, name: 'شركة الأمل للتوريدات', phone: '0512345678', email: 'info@alamal.com' },
        items: [
            { id: 1, name: 'لابتوب HP', quantity: 2, price: 1500, total: 3000 },
            { id: 2, name: 'طابعة Canon', quantity: 1, price: 800, total: 800 },
            { id: 3, name: 'ماوس لاسلكي', quantity: 5, price: 50, total: 250 },
            { id: 4, name: 'لوحة مفاتيح', quantity: 3, price: 100, total: 300 },
            { id: 5, name: 'شاشة LG', quantity: 1, price: 650, total: 650 }
        ],
        subtotal: 5000,
        tax: 750,
        shipping: 100,
        discount: 100,
        total: 5750,
        status: 'مدفوعة',
        notes: 'تم استلام جميع المنتجات بحالة جيدة',
        payments: [
            { id: 'PMT-2023-001', date: '2023-06-15', amount: 5750, method: 'تحويل بنكي' }
        ]
    };
    
    // عرض نافذة تفاصيل الفاتورة
    showPurchaseDetailsModal(purchase);
}

// دالة لتعديل فاتورة مشتريات
function editPurchase(purchaseId) {
    console.log('تعديل فاتورة المشتريات رقم:', purchaseId);
    
    // في التطبيق الحقيقي، سيتم استدعاء الخادم للحصول على بيانات الفاتورة
    // هنا نستخدم بيانات ثابتة للعرض فقط
    const purchase = {
        id: purchaseId,
        date: '2023-06-15',
        supplier: { id: 1, name: 'شركة الأمل للتوريدات' },
        items: [
            { id: 1, name: 'لابتوب HP', quantity: 2, price: 1500, total: 3000 },
            { id: 2, name: 'طابعة Canon', quantity: 1, price: 800, total: 800 },
            { id: 3, name: 'ماوس لاسلكي', quantity: 5, price: 50, total: 250 },
            { id: 4, name: 'لوحة مفاتيح', quantity: 3, price: 100, total: 300 },
            { id: 5, name: 'شاشة LG', quantity: 1, price: 650, total: 650 }
        ],
        subtotal: 5000,
        tax: 750,
        shipping: 100,
        discount: 100,
        total: 5750,
        status: 'مدفوعة',
        notes: 'تم استلام جميع المنتجات بحالة جيدة'
    };
    
    // عرض نافذة تعديل الفاتورة
    showEditPurchaseModal(purchase);
}

// دالة لحذف فاتورة مشتريات
function deletePurchase(purchaseId) {
    console.log('حذف فاتورة المشتريات رقم:', purchaseId);
    
    // عرض تأكيد الحذف
    if (confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) {
        // في التطبيق الحقيقي، سيتم استدعاء الخادم لحذف الفاتورة
        console.log('تم حذف الفاتورة بنجاح');
        
        // إزالة صف الفاتورة من الجدول
        const row = document.querySelector(`.delete-btn[data-id="${purchaseId}"]`).closest('tr');
        row.remove();
        
        // تحديث إحصائيات المشتريات
        const remainingPurchases = document.querySelectorAll('.purchases-table tbody tr').length;
        const totalPurchasesElement = document.querySelector('.total-purchases');
        if (totalPurchasesElement) {
            totalPurchasesElement.textContent = remainingPurchases;
        }
    }
}

// دالة لعرض نافذة تعديل فاتورة مشتريات
function showEditPurchaseModal(purchase) {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>تعديل فاتورة مشتريات</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <form id="edit-purchase-form">
                    <input type="hidden" id="purchase-id" value="${purchase.id}">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="purchase-date">التاريخ</label>
                            <input type="date" id="purchase-date" name="purchase-date" value="${purchase.date}" required>
                        </div>
                        <div class="form-group">
                            <label for="supplier">المورد</label>
                            <select id="supplier" name="supplier" required>
                                <option value="">اختر المورد</option>
                                <option value="1" ${purchase.supplier.id == 1 ? 'selected' : ''}>شركة الأمل للتوريدات</option>
                                <option value="2" ${purchase.supplier.id == 2 ? 'selected' : ''}>مؤسسة النور التجارية</option>
                                <option value="3" ${purchase.supplier.id == 3 ? 'selected' : ''}>شركة الصفا للمنتجات</option>
                                <option value="4" ${purchase.supplier.id == 4 ? 'selected' : ''}>مؤسسة الإبداع للتجارة</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="items-section">
                        <h4>المنتجات</h4>
                        <table class="items-table">
                            <thead>
                                <tr>
                                    <th>المنتج</th>
                                    <th>الكمية</th>
                                    <th>السعر</th>
                                    <th>الإجمالي</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="items-container">
                                ${purchase.items.map((item, index) => `
                                    <tr class="item-row">
                                        <td>
                                            <select class="product-select" required>
                                                <option value="">اختر المنتج</option>
                                                <option value="1" ${item.id == 1 ? 'selected' : ''}>لابتوب HP</option>
                                                <option value="2" ${item.id == 2 ? 'selected' : ''}>طابعة Canon</option>
                                                <option value="3" ${item.id == 3 ? 'selected' : ''}>ماوس لاسلكي</option>
                                                <option value="4" ${item.id == 4 ? 'selected' : ''}>لوحة مفاتيح</option>
                                                <option value="5" ${item.id == 5 ? 'selected' : ''}>شاشة LG</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="number" class="quantity-input" min="1" value="${item.quantity}" required>
                                        </td>
                                        <td>
                                            <input type="number" class="price-input" min="0" step="0.01" value="${item.price}" required>
                                        </td>
                                        <td>
                                            <span class="item-total">${item.total.toFixed(2)}</span> ر.س
                                        </td>
                                        <td>
                                            <button type="button" class="remove-item-btn">&times;</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <button type="button" class="btn add-item-btn">إضافة منتج</button>
                    </div>
                    
                    <div class="totals-section">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="subtotal">المجموع الفرعي</label>
                                <input type="text" id="subtotal" name="subtotal" value="${purchase.subtotal.toFixed(2)}" readonly>
                            </div>
                            <div class="form-group">
                                <label for="tax">الضريبة (%)</label>
                                <input type="number" id="tax" name="tax" min="0" max="100" value="${(purchase.tax / purchase.subtotal * 100).toFixed(0)}">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="shipping">الشحن</label>
                                <input type="number" id="shipping" name="shipping" min="0" value="${purchase.shipping}">
                            </div>
                            <div class="form-group">
                                <label for="discount">الخصم</label>
                                <input type="number" id="discount" name="discount" min="0" value="${purchase.discount}">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group total-group">
                                <label for="total">الإجمالي</label>
                                <input type="text" id="total" name="total" value="${purchase.total.toFixed(2)}" readonly>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="status">حالة الفاتورة</label>
                            <select id="status" name="status" required>
                                <option value="مدفوعة" ${purchase.status === 'مدفوعة' ? 'selected' : ''}>مدفوعة</option>
                                <option value="معلقة" ${purchase.status === 'معلقة' ? 'selected' : ''}>معلقة</option>
                                <option value="مدفوعة جزئياً" ${purchase.status === 'مدفوعة جزئياً' ? 'selected' : ''}>مدفوعة جزئياً</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="payment-method">طريقة الدفع</label>
                            <select id="payment-method" name="payment-method">
                                <option value="">اختر طريقة الدفع</option>
                                <option value="cash">نقداً</option>
                                <option value="bank_transfer" selected>تحويل بنكي</option>
                                <option value="credit_card">بطاقة ائتمان</option>
                                <option value="check">شيك</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="notes">ملاحظات</label>
                        <textarea id="notes" name="notes" rows="3">${purchase.notes || ''}</textarea>
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
    
    // إضافة نمط CSS للنافذة المنبثقة إذا لم يكن موجوداً
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
                max-width: 900px;
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
                max-height: 70vh;
                overflow-y: auto;
            }
            
            .form-row {
                display: flex;
                gap: 15px;
                margin-bottom: 15px;
            }
            
            .form-row .form-group {
                flex: 1;
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
            
            .items-section {
                margin: 20px 0;
            }
            
            .items-section h4 {
                margin-top: 0;
                margin-bottom: 10px;
                color: #333;
            }
            
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 10px;
            }
            
            .items-table th,
            .items-table td {
                padding: 10px;
                text-align: right;
                border-bottom: 1px solid #eee;
            }
            
            .items-table th {
                background-color: #f9f9f9;
                font-weight: 600;
            }
            
            .remove-item-btn {
                background-color: #e74c3c;
                color: white;
                border: none;
                border-radius: 50%;
                width: 25px;
                height: 25px;
                font-size: 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .add-item-btn {
                background-color: #2ecc71;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 15px;
                font-size: 0.9rem;
                cursor: pointer;
                margin-top: 10px;
            }
            
            .totals-section {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 4px;
                margin-bottom: 20px;
            }
            
            .total-group {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
            }
        `;

        document.head.appendChild(style);
    }
}

// دالة لعرض اقتراحات البحث للمشتريات
function showSearchSuggestions(searchTerm) {
    if (!searchTerm || searchTerm.length < 1) {
        hideSearchSuggestions();
        return;
    }

    // إنشاء قائمة الاقتراحات إذا لم تكن موجودة
    let suggestionsContainer = document.getElementById('purchase-search-suggestions');
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'purchase-search-suggestions';
        suggestionsContainer.className = 'search-suggestions';

        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            searchBox.appendChild(suggestionsContainer);
        }
    }

    // الحصول على المشتريات المطابقة
    const matchingPurchases = getMatchingPurchases(searchTerm.toLowerCase());

    if (matchingPurchases.length === 0) {
        hideSearchSuggestions();
        return;
    }

    // إنشاء HTML للاقتراحات
    const suggestionsHTML = matchingPurchases.slice(0, 5).map(purchase => `
        <div class="suggestion-item" onclick="selectPurchaseSuggestion('${purchase.id}')">
            <div class="suggestion-name">فاتورة رقم ${highlightMatch(purchase.id, searchTerm)}</div>
            <div class="suggestion-details">${purchase.supplier} - ${purchase.date}</div>
        </div>
    `).join('');

    suggestionsContainer.innerHTML = suggestionsHTML;
    suggestionsContainer.style.display = 'block';
}

// دالة لإخفاء اقتراحات البحث
function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('purchase-search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// دالة للحصول على المشتريات المطابقة
function getMatchingPurchases(searchTerm) {
    const rows = document.querySelectorAll('.purchases-table tbody tr');
    const matchingPurchases = [];

    rows.forEach(row => {
        const id = row.cells[0].textContent;
        const date = row.cells[1].textContent;
        const supplier = row.cells[2].textContent;

        if (id.toLowerCase().includes(searchTerm) ||
            date.toLowerCase().includes(searchTerm) ||
            supplier.toLowerCase().includes(searchTerm)) {
            matchingPurchases.push({
                id: id,
                date: date,
                supplier: supplier
            });
        }
    });

    return matchingPurchases;
}

// دالة لتمييز النص المطابق
function highlightMatch(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

// دالة لاختيار اقتراح المشتريات
function selectPurchaseSuggestion(purchaseId) {
    const searchInput = document.getElementById('purchase-search');
    if (searchInput) {
        searchInput.value = purchaseId;
        filterPurchases();
        hideSearchSuggestions();
    }
}

// إضافة CSS للاقتراحات
function addPurchaseSearchSuggestionsCSS() {
    if (document.getElementById('purchase-search-suggestions-style')) return;

    const style = document.createElement('style');
    style.id = 'purchase-search-suggestions-style';
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
    addPurchaseSearchSuggestionsCSS();
});

// دالة لعرض نافذة إضافة مورد جديد
function showAddSupplierModal() {
    // إنشاء النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content-modern">
            <div class="modal-header-modern">
                <h3><i class="fas fa-user-plus"></i> إضافة مورد جديد</h3>
                <button class="close-btn" onclick="closeSupplierModal()">&times;</button>
            </div>
            <div class="modal-body-modern">
                <form id="add-supplier-form" class="form-modern">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="supplier-type">نوع المورد *</label>
                            <select id="supplier-type" class="select-modern">
                                <option value="">اختر نوع المورد</option>
                                <option value="individual">فرد</option>
                                <option value="company">شركة</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="supplier-name">اسم المورد *</label>
                            <input type="text" id="supplier-name" class="input-modern" placeholder="أدخل اسم المورد">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="supplier-phone">رقم الهاتف *</label>
                            <input type="tel" id="supplier-phone" class="input-modern" placeholder="05xxxxxxxx">
                        </div>
                        <div class="form-group">
                            <label for="supplier-email">البريد الإلكتروني</label>
                            <input type="email" id="supplier-email" class="input-modern" placeholder="supplier@example.com">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="supplier-tax-number">الرقم الضريبي</label>
                            <input type="text" id="supplier-tax-number" class="input-modern" placeholder="الرقم الضريبي (اختياري)">
                        </div>
                        <div class="form-group">
                            <label for="supplier-address">العنوان</label>
                            <input type="text" id="supplier-address" class="input-modern" placeholder="أدخل عنوان المورد">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer-modern">
                <button type="button" class="btn-modern btn-secondary" onclick="closeSupplierModal()">
                    <i class="fas fa-times"></i> إلغاء
                </button>
                <button type="button" class="btn-modern btn-success" onclick="setTimeout(handleSupplierFormSubmit, 50)">
                    <i class="fas fa-save"></i> حفظ المورد
                </button>
            </div>
        </div>
    `;

    // إضافة النافذة للصفحة
    document.body.appendChild(modal);

    // إضافة event listener لحفظ قيمة نوع المورد
    const supplierTypeSelect = document.getElementById('supplier-type');
    let savedSupplierType = '';

    supplierTypeSelect.addEventListener('change', function() {
        savedSupplierType = this.value;
        console.log('تم حفظ نوع المورد:', savedSupplierType);
        // حفظ في data attribute أيضاً
        this.setAttribute('data-selected-type', this.value);
    });

    // إضافة دالة مساعدة للحصول على نوع المورد
    window.getSavedSupplierType = function() {
        const element = document.getElementById('supplier-type');
        return savedSupplierType || element.value || element.getAttribute('data-selected-type') || '';
    };

    console.log('تم إنشاء نافذة المورد الجديد');

    // إضافة مستمع للتحقق من التغييرات في نوع المورد
    const supplierTypeSelect = document.getElementById('supplier-type');
    let lastSelectedType = '';

    supplierTypeSelect.addEventListener('change', function() {
        lastSelectedType = this.value;
        console.log('تم تغيير نوع المورد إلى:', this.value);
        console.log('selectedIndex:', this.selectedIndex);
        console.log('النص المختار:', this.options[this.selectedIndex].text);

        // إزالة أي رسائل خطأ سابقة
        this.style.borderColor = '';

        // حفظ القيمة في attribute مخصص
        this.setAttribute('data-selected-value', this.value);
    });

    // إضافة مستمع للنقر أيضاً
    supplierTypeSelect.addEventListener('click', function() {
        console.log('تم النقر على قائمة نوع المورد');
        console.log('القيمة الحالية:', this.value);
        console.log('selectedIndex:', this.selectedIndex);
    });

    // إضافة مستمعين للحقول المطلوبة
    ['supplier-name', 'supplier-phone'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function() {
                // إزالة أي رسائل خطأ سابقة
                this.style.borderColor = '';
            });
        }
    });

    // التركيز على أول حقل
    setTimeout(() => {
        const firstInput = modal.querySelector('select, input');
        if (firstInput) firstInput.focus();
    }, 100);
}

// دالة لمعالجة إرسال نموذج المورد
function handleSupplierFormSubmit() {
    console.log('=== بدء معالجة إرسال نموذج المورد ===');

    // الحصول على العناصر
    const typeElement = document.getElementById('supplier-type');
    const nameElement = document.getElementById('supplier-name');
    const phoneElement = document.getElementById('supplier-phone');
    const emailElement = document.getElementById('supplier-email');
    const taxElement = document.getElementById('supplier-tax-number');
    const addressElement = document.getElementById('supplier-address');

    // التحقق من وجود العناصر الأساسية
    if (!typeElement || !nameElement || !phoneElement) {
        alert('خطأ في النظام: لم يتم العثور على حقول النموذج');
        return;
    }

    // جمع البيانات مع استخدام طرق متعددة لقراءة نوع المورد
    let supplierType = typeElement.value;

    // إذا كانت القيمة فارغة، جرب الطرق البديلة
    if (!supplierType) {
        supplierType = window.getSavedSupplierType ? window.getSavedSupplierType() : '';
        console.log('تم الحصول على نوع المورد من الدالة المساعدة:', supplierType);
    }

    if (!supplierType && typeElement.selectedIndex > 0) {
        supplierType = typeElement.options[typeElement.selectedIndex].value;
        console.log('تم الحصول على نوع المورد من selectedIndex:', supplierType);
    }

    const supplierData = {
        type: supplierType,
        name: nameElement.value.trim(),
        phone: phoneElement.value.trim(),
        email: emailElement ? emailElement.value.trim() : '',
        taxNumber: taxElement ? taxElement.value.trim() : '',
        address: addressElement ? addressElement.value.trim() : '',
        company: '',
        category: 'general',
        paymentTerms: 'cash',
        notes: '',
        createdAt: new Date().toISOString()
    };

    console.log('البيانات المجمعة:', supplierData);
    console.log('قيمة نوع المورد:', `"${supplierData.type}"`);
    console.log('selectedIndex:', typeElement.selectedIndex);
    console.log('قيمة العنصر مباشرة:', `"${typeElement.value}"`);

    // التحقق من صحة البيانات مع تشخيص مفصل
    if (!supplierData.type || supplierData.type === '') {
        console.error('خطأ: نوع المورد فارغ');
        console.error('selectedIndex:', typeElement.selectedIndex);
        console.error('جميع الخيارات:');
        for (let i = 0; i < typeElement.options.length; i++) {
            console.error(`  ${i}: "${typeElement.options[i].value}" - "${typeElement.options[i].text}" - selected: ${typeElement.options[i].selected}`);
        }

        // جرب قراءة القيمة بطريقة أخرى
        if (typeElement.selectedIndex > 0) {
            const selectedValue = typeElement.options[typeElement.selectedIndex].value;
            console.log('محاولة قراءة من selectedIndex:', selectedValue);
            if (selectedValue) {
                supplierData.type = selectedValue;
                console.log('تم إصلاح قيمة نوع المورد:', supplierData.type);
            } else {
                alert('يرجى اختيار نوع المورد من القائمة');
                typeElement.focus();
                return;
            }
        } else {
            alert('يرجى اختيار نوع المورد من القائمة');
            typeElement.focus();
            return;
        }
    }

    if (!supplierData.name) {
        alert('يرجى إدخال اسم المورد');
        nameElement.focus();
        return;
    }

    if (!supplierData.phone) {
        alert('يرجى إدخال رقم الهاتف');
        phoneElement.focus();
        return;
    }

    console.log('✅ جميع البيانات صحيحة');

    // إضافة المورد إلى localStorage
    addSupplierToStorage(supplierData);

    // في التطبيق الحقيقي، سيتم إرسال البيانات إلى الخادم
    console.log('بيانات المورد الجديد:', supplierData);

    // عرض رسالة نجاح
    showSupplierSuccessMessage(supplierData);

    // إغلاق النافذة
    closeSupplierModal();
}

// دالة لعرض رسالة نجاح إضافة المورد
function showSupplierSuccessMessage(supplierData) {
    const successModal = document.createElement('div');
    successModal.className = 'modal-overlay';
    successModal.innerHTML = `
        <div class="modal-content-modern success-modal">
            <div class="modal-header-modern success">
                <h3><i class="fas fa-check-circle"></i> تم إضافة المورد بنجاح</h3>
            </div>
            <div class="modal-body-modern">
                <div class="success-details">
                    <p><strong>نوع المورد:</strong> ${supplierData.type === 'individual' ? 'فرد' : 'شركة'}</p>
                    <p><strong>اسم المورد:</strong> ${supplierData.name}</p>
                    <p><strong>رقم الهاتف:</strong> ${supplierData.phone}</p>
                    ${supplierData.email ? `<p><strong>البريد الإلكتروني:</strong> ${supplierData.email}</p>` : ''}
                    ${supplierData.address ? `<p><strong>العنوان:</strong> ${supplierData.address}</p>` : ''}
                    ${supplierData.taxNumber ? `<p><strong>الرقم الضريبي:</strong> ${supplierData.taxNumber}</p>` : ''}
                </div>
                <div class="success-note">
                    <p><i class="fas fa-info-circle"></i> تم حفظ المورد وإضافته لقائمة الموردين المتاحة</p>
                </div>
            </div>
            <div class="modal-footer-modern">
                <button type="button" class="btn-modern btn-secondary" onclick="closeSuccessModal(this)">
                    <i class="fas fa-times"></i> إغلاق
                </button>
                <button type="button" class="btn-modern btn-success" onclick="showAddSupplierModal(); closeSuccessModal(this)">
                    <i class="fas fa-plus"></i> إضافة مورد آخر
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(successModal);

    // إغلاق تلقائي بعد 5 ثوانٍ
    setTimeout(() => {
        if (document.body.contains(successModal)) {
            document.body.removeChild(successModal);
        }
    }, 5000);
}

// دالة لإغلاق نافذة النجاح
function closeSuccessModal(button) {
    const modal = button.closest('.modal-overlay');
    if (modal && document.body.contains(modal)) {
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';

        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 200);
    }
}

// دالة لعرض خطأ في حقل معين
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        // تمييز الحقل بلون أحمر
        field.style.borderColor = '#dc3545';
        field.style.borderWidth = '2px';

        // التركيز على الحقل
        field.focus();

        // إزالة التمييز بعد التعديل
        const removeError = () => {
            field.style.borderColor = '';
            field.style.borderWidth = '';
            field.removeEventListener('input', removeError);
            field.removeEventListener('change', removeError);
        };

        field.addEventListener('input', removeError);
        field.addEventListener('change', removeError);
    }

    // عرض رسالة الخطأ
    alert(message);
}

// دالة لإضافة المورد إلى localStorage
function addSupplierToStorage(supplierData) {
    // الحصول على الموردين الحاليين
    let suppliers = JSON.parse(localStorage.getItem('monjizSuppliers')) || [];

    // إنشاء معرف جديد
    const newId = suppliers.length > 0 ? Math.max(...suppliers.map(s => s.id || 0)) + 1 : 1;

    // إضافة المعرف للمورد الجديد
    const newSupplier = {
        id: newId,
        ...supplierData
    };

    // إضافة المورد للقائمة
    suppliers.push(newSupplier);

    // حفظ في localStorage
    localStorage.setItem('monjizSuppliers', JSON.stringify(suppliers));

    console.log('تم حفظ المورد في localStorage:', newSupplier);

    // تحديث قوائم الموردين في الصفحة
    updateSuppliersInPage();

    return newSupplier;
}

// دالة لتحديث قوائم الموردين في الصفحة
function updateSuppliersInPage() {
    const suppliers = JSON.parse(localStorage.getItem('monjizSuppliers')) || [];
    const supplierSelects = document.querySelectorAll('#supplier-filter, #new-purchase-supplier');

    supplierSelects.forEach(select => {
        // حفظ القيمة المختارة حالياً
        const currentValue = select.value;

        // مسح الخيارات الموجودة عدا الخيار الأول
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }

        // إضافة الموردين الجدد
        suppliers.forEach(supplier => {
            const option = document.createElement('option');
            option.value = supplier.id; // تغيير من supplier.name إلى supplier.id
            option.textContent = supplier.name;
            select.appendChild(option);
        });

        // استعادة القيمة المختارة
        if (currentValue) {
            select.value = currentValue;
        }
    });

    console.log('تم تحديث قوائم الموردين في الصفحة');
}

// دالة مخصصة لإغلاق نافذة المورد
function closeSupplierModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        // إضافة تأثير الإغلاق
        modal.style.opacity = '0';
        modal.style.transform = 'scale(0.9)';

        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 200);
    }
}