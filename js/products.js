// ملف JavaScript لصفحة المنتجات

// بيانات المنتجات التجريبية مع المواد الغذائية
let originalProducts = [
    // المواد الغذائية
    {
        id: 1,
        name: 'أرز بسمتي - كيس 5 كيلو',
        category: 'food',
        sku: 'RICE-BASMATI-5KG',
        price: 45.00,
        cost: 35.00,
        quantity: 120,
        minQuantity: 20,
        status: 'active',
        description: 'أرز بسمتي فاخر من الهند'
    },
    {
        id: 2,
        name: 'زيت زيتون بكر ممتاز - 1 لتر',
        category: 'food',
        sku: 'OLIVE-OIL-1L',
        price: 85.00,
        cost: 65.00,
        quantity: 45,
        minQuantity: 10,
        status: 'active',
        description: 'زيت زيتون بكر ممتاز من إسبانيا'
    },
    {
        id: 3,
        name: 'دقيق أبيض - كيس 2 كيلو',
        category: 'food',
        sku: 'FLOUR-WHITE-2KG',
        price: 18.00,
        cost: 14.00,
        quantity: 80,
        minQuantity: 15,
        status: 'active',
        description: 'دقيق أبيض فاخر للخبز والحلويات'
    },
    {
        id: 4,
        name: 'سكر أبيض - كيس 1 كيلو',
        category: 'food',
        sku: 'SUGAR-WHITE-1KG',
        price: 12.00,
        cost: 9.00,
        quantity: 150,
        minQuantity: 25,
        status: 'active',
        description: 'سكر أبيض ناعم'
    },
    {
        id: 5,
        name: 'شاي أحمر - علبة 500 جرام',
        category: 'food',
        sku: 'TEA-BLACK-500G',
        price: 35.00,
        cost: 25.00,
        quantity: 60,
        minQuantity: 12,
        status: 'active',
        description: 'شاي أحمر سيلاني فاخر'
    },
    {
        id: 6,
        name: 'قهوة عربية - كيس 250 جرام',
        category: 'food',
        sku: 'COFFEE-ARABIC-250G',
        price: 55.00,
        cost: 40.00,
        quantity: 35,
        minQuantity: 8,
        status: 'active',
        description: 'قهوة عربية أصيلة محمصة'
    },
    {
        id: 7,
        name: 'معكرونة إسباجيتي - علبة 500 جرام',
        category: 'food',
        sku: 'PASTA-SPAGHETTI-500G',
        price: 8.50,
        cost: 6.00,
        quantity: 200,
        minQuantity: 30,
        status: 'active',
        description: 'معكرونة إسباجيتي إيطالية'
    },
    {
        id: 8,
        name: 'صلصة طماطم - علبة 400 جرام',
        category: 'food',
        sku: 'TOMATO-SAUCE-400G',
        price: 6.50,
        cost: 4.50,
        quantity: 180,
        minQuantity: 25,
        status: 'active',
        description: 'صلصة طماطم طبيعية'
    },
    {
        id: 9,
        name: 'تونة في الماء - علبة 185 جرام',
        category: 'food',
        sku: 'TUNA-WATER-185G',
        price: 15.00,
        cost: 11.00,
        quantity: 5,
        minQuantity: 20,
        status: 'active',
        description: 'تونة طبيعية في الماء'
    },
    {
        id: 10,
        name: 'حليب طويل الأمد - لتر',
        category: 'food',
        sku: 'MILK-UHT-1L',
        price: 7.50,
        cost: 5.50,
        quantity: 90,
        minQuantity: 20,
        status: 'active',
        description: 'حليب طويل الأمد كامل الدسم'
    },
    {
        id: 11,
        name: 'جبنة بيضاء - علبة 500 جرام',
        category: 'food',
        sku: 'CHEESE-WHITE-500G',
        price: 25.00,
        cost: 18.00,
        quantity: 2,
        minQuantity: 15,
        status: 'active',
        description: 'جبنة بيضاء طازجة'
    },
    {
        id: 12,
        name: 'زبدة طبيعية - علبة 250 جرام',
        category: 'food',
        sku: 'BUTTER-NATURAL-250G',
        price: 22.00,
        cost: 16.00,
        quantity: 40,
        minQuantity: 10,
        status: 'active',
        description: 'زبدة طبيعية من حليب البقر'
    },
    // منتجات أخرى
    {
        id: 13,
        name: 'لابتوب ديل XPS 13',
        category: 'electronics',
        sku: 'DELL-XPS-13',
        price: 4500.00,
        cost: 3500.00,
        quantity: 15,
        minQuantity: 5,
        status: 'active',
        description: 'لابتوب عالي الأداء للأعمال'
    },
    {
        id: 14,
        name: 'هاتف آيفون 14',
        category: 'electronics',
        sku: 'IPHONE-14',
        price: 3200.00,
        cost: 2800.00,
        quantity: 8,
        minQuantity: 10,
        status: 'active',
        description: 'هاتف ذكي من آبل'
    },
    {
        id: 15,
        name: 'كتاب إدارة الأعمال',
        category: 'books',
        sku: 'BOOK-BM-001',
        price: 85.00,
        cost: 60.00,
        quantity: 25,
        minQuantity: 10,
        status: 'active',
        description: 'كتاب تعليمي في إدارة الأعمال'
    },
    {
        id: 16,
        name: 'قميص قطني أزرق',
        category: 'clothing',
        sku: 'SHIRT-BLUE-M',
        price: 120.00,
        cost: 80.00,
        quantity: 3,
        minQuantity: 15,
        status: 'active',
        description: 'قميص قطني عالي الجودة'
    },

    // منتجات التنظيف والعناية
    {
        id: 17,
        name: 'مسحوق غسيل - كيس 3 كيلو',
        category: 'cleaning',
        sku: 'DETERGENT-POWDER-3KG',
        price: 28.00,
        cost: 22.00,
        quantity: 65,
        minQuantity: 12,
        status: 'active',
        description: 'مسحوق غسيل فعال لجميع أنواع الأقمشة'
    },
    {
        id: 18,
        name: 'سائل تنظيف الأطباق - 750 مل',
        category: 'cleaning',
        sku: 'DISH-SOAP-750ML',
        price: 12.50,
        cost: 9.00,
        quantity: 85,
        minQuantity: 15,
        status: 'active',
        description: 'سائل تنظيف الأطباق برائحة الليمون'
    },
    {
        id: 19,
        name: 'منظف الأرضيات - 1 لتر',
        category: 'cleaning',
        sku: 'FLOOR-CLEANER-1L',
        price: 18.00,
        cost: 14.00,
        quantity: 50,
        minQuantity: 10,
        status: 'active',
        description: 'منظف الأرضيات متعدد الاستخدامات'
    },
    {
        id: 20,
        name: 'مناديل ورقية - عبوة 200 منديل',
        category: 'cleaning',
        sku: 'TISSUES-200PCS',
        price: 8.50,
        cost: 6.00,
        quantity: 120,
        minQuantity: 20,
        status: 'active',
        description: 'مناديل ورقية ناعمة ومقاومة'
    },
    {
        id: 21,
        name: 'شامبو للشعر - 400 مل',
        category: 'personal_care',
        sku: 'SHAMPOO-400ML',
        price: 35.00,
        cost: 25.00,
        quantity: 45,
        minQuantity: 10,
        status: 'active',
        description: 'شامبو طبيعي لجميع أنواع الشعر'
    },
    {
        id: 22,
        name: 'معجون أسنان - 100 جرام',
        category: 'personal_care',
        sku: 'TOOTHPASTE-100G',
        price: 15.00,
        cost: 11.00,
        quantity: 80,
        minQuantity: 15,
        status: 'active',
        description: 'معجون أسنان بالفلورايد'
    },

    // أدوات مكتبية
    {
        id: 23,
        name: 'دفتر ملاحظات A4 - 200 صفحة',
        category: 'office',
        sku: 'NOTEBOOK-A4-200',
        price: 25.00,
        cost: 18.00,
        quantity: 60,
        minQuantity: 15,
        status: 'active',
        description: 'دفتر ملاحظات عالي الجودة'
    },
    {
        id: 24,
        name: 'أقلام حبر جاف - عبوة 10 قطع',
        category: 'office',
        sku: 'PENS-BALLPOINT-10PCS',
        price: 12.00,
        cost: 8.00,
        quantity: 95,
        minQuantity: 20,
        status: 'active',
        description: 'أقلام حبر جاف زرقاء'
    },
    {
        id: 25,
        name: 'ورق طباعة A4 - رزمة 500 ورقة',
        category: 'office',
        sku: 'PAPER-A4-500',
        price: 22.00,
        cost: 16.00,
        quantity: 40,
        minQuantity: 8,
        status: 'active',
        description: 'ورق طباعة أبيض عالي الجودة'
    },

    // منتجات صحية
    {
        id: 26,
        name: 'فيتامين سي - 60 قرص',
        category: 'health',
        sku: 'VITAMIN-C-60TABS',
        price: 45.00,
        cost: 32.00,
        quantity: 30,
        minQuantity: 8,
        status: 'active',
        description: 'مكمل غذائي فيتامين سي'
    },
    {
        id: 27,
        name: 'كمامات طبية - عبوة 50 قطعة',
        category: 'health',
        sku: 'MASKS-MEDICAL-50PCS',
        price: 25.00,
        cost: 18.00,
        quantity: 75,
        minQuantity: 15,
        status: 'active',
        description: 'كمامات طبية ثلاث طبقات'
    },
    {
        id: 28,
        name: 'جل معقم لليدين - 250 مل',
        category: 'health',
        sku: 'HAND-SANITIZER-250ML',
        price: 18.00,
        cost: 13.00,
        quantity: 55,
        minQuantity: 12,
        status: 'active',
        description: 'جل معقم لليدين بنسبة كحول 70%'
    }
];

// نسخة للعمل عليها
let products = [...originalProducts];

document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل DOM - بدء تهيئة صفحة المنتجات');
    console.log('عدد المنتجات الأصلية:', originalProducts.length);

    // تهيئة الصفحة
    initPage();

    // إضافة مستمعي الأحداث للأزرار
    setupEventListeners();

    // إعداد البحث والتصفية
    setupSearchAndFilter();

    // تحميل بيانات المنتجات
    loadProducts();

    // إعداد معالجات النماذج
    setupFormHandlers();

    console.log('انتهت تهيئة صفحة المنتجات');

    // استدعاء إضافي لضمان ظهور التنقل
    setTimeout(() => {
        console.log('استدعاء إضافي لدالة التنقل...');
        if (products.length > 10) {
            updateProductsPagination();
        }
    }, 1000);
});

// دالة تهيئة الصفحة
function initPage() {
    console.log('تم تهيئة صفحة المنتجات بنجاح');

    // تحديث روابط التنقل
    updateNavigationLinks();

    // تحديث قوائم الفئات
    updateCategoryFilter();
    updateProductCategoryOptions();

    // تهيئة نظام التنقل الجديد
    initializeProductsPagination();

    // عرض المنتجات
    displayProducts();
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
    console.log('إعداد مستمعي الأحداث');

    // أزرار البحث والتصفية
    setupSearchAndFilter();

    // أزرار الصفحات
    setupPagination();

    console.log('تم إعداد جميع مستمعي الأحداث');
}

// دالة لإعداد البحث والتصفية
function setupSearchAndFilter() {
    // مربع البحث - تصحيح المحدد
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        // إضافة البحث الفوري
        searchInput.addEventListener('input', function() {
            filterProducts();
            showSearchSuggestions(this.value);
        });

        // إضافة البحث عند الكتابة
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterProducts();
            }
        });

        // إخفاء الاقتراحات عند فقدان التركيز
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                hideSearchSuggestions();
            }, 200);
        });
    }

    // قائمة التصنيفات - تصحيح المحدد
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterProducts();
        });
    }

    // قائمة تصفية المخزون - تصحيح المحدد
    const stockFilter = document.getElementById('stock-filter');
    if (stockFilter) {
        stockFilter.addEventListener('change', function() {
            filterProducts();
        });
    }

    // زر مسح التصفية - تصحيح المحدد
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
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // إزالة الفئة النشطة من جميع الروابط
            paginationLinks.forEach(l => l.classList.remove('active'));
            
            // إضافة الفئة النشطة للرابط المحدد
            this.classList.add('active');
            
            // تحميل صفحة المنتجات المناسبة
            // في التطبيق الحقيقي، سيتم استدعاء الخادم لتحميل الصفحة المناسبة
            console.log('تم النقر على رابط الصفحة:', this.textContent);
        });
    });
}

// دالة لتحميل بيانات المنتجات
function loadProducts() {
    console.log('تحميل المنتجات:', products.length);

    // تحديث جدول المنتجات
    displayProducts();

    // تحديث إحصائيات المنتجات
    updateProductStats(products);

    // تحديث قائمة التصنيفات
    updateCategoriesList(products);

    // التحقق من وجود تصفية في عنوان URL
    checkUrlFilters();
}

// دالة لتحديث جدول المنتجات
function updateProductsTable(productsToShow) {
    const tableBody = document.querySelector('.products-table tbody');
    if (!tableBody) return;

    // مسح الجدول الحالي
    tableBody.innerHTML = '';

    // إضافة الصفوف الجديدة
    productsToShow.forEach(product => {
        const row = document.createElement('tr');
        const categoryName = categories.find(cat => cat.code === product.category)?.name || product.category;

        // تحديد فئة المخزون
        const stockClass = getStockClass(product.quantity || product.stock, product.minQuantity || product.minStock);

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${categoryName}</td>
            <td>${(product.price || 0).toLocaleString('ar-SA')} ر.س</td>
            <td>${product.sku || 'غير محدد'}</td>
            <td>${(product.price || 0).toLocaleString('ar-SA')} ر.س</td>
            <td>${(product.cost || 0).toLocaleString('ar-SA')} ر.س</td>
            <td class="${stockClass}">${product.quantity || product.stock || 0}</td>
            <td>${product.minQuantity || product.minStock || 0}</td>
            <td><span class="status-badge ${product.status === 'active' ? 'status-active' : 'status-inactive'}">${product.status === 'active' ? 'نشط' : 'غير نشط'}</span></td>
            <td>
                <button class="btn-modern btn-sm btn-secondary" onclick="editProduct(${product.id})" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-modern btn-sm btn-danger" onclick="deleteProduct(${product.id})" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    // تحديث عداد النتائج
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = products.length;
    }
}

// دالة لإضافة مستمعي الأحداث لأزرار التعديل والحذف
function addActionButtonsListeners() {
    // أزرار التعديل
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            editProduct(productId);
        });
    });
    
    // أزرار الحذف
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            deleteProduct(productId);
        });
    });
}

// دالة لتحديث إحصائيات المنتجات
function updateProductStats(products) {
    // إجمالي عدد المنتجات
    const totalProducts = products.length;
    const totalProductsElement = document.getElementById('total-products');
    if (totalProductsElement) {
        totalProductsElement.textContent = totalProducts;
    }

    // عدد المنتجات منخفضة المخزون
    const lowStockProducts = products.filter(product =>
        (product.quantity || product.stock || 0) <= (product.minQuantity || product.minStock || 0)
    ).length;
    const lowStockElement = document.getElementById('low-stock-products');
    if (lowStockElement) {
        lowStockElement.textContent = lowStockProducts;
    }

    // إجمالي قيمة المخزون
    const totalValue = products.reduce((sum, product) =>
        sum + ((product.price || 0) * (product.quantity || product.stock || 0)), 0
    );
    const totalValueElement = document.getElementById('total-value');
    if (totalValueElement) {
        totalValueElement.textContent = totalValue.toLocaleString('ar-SA') + ' ر.س';
    }
}

// دالة لتحديث قائمة التصنيفات
function updateCategoriesList(products) {
    // تحديث قائمة الفئات في الفلتر
    updateCategoryFilter();
}

// دالة للتحقق من وجود تصفية في عنوان URL
function checkUrlFilters() {
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    
    if (filter === 'low-stock') {
        // تصفية المنتجات منخفضة المخزون
        document.querySelector('.category-filter').value = '';
        filterLowStockProducts();
    }
}

// دالة لتصفية المنتجات
function filterProducts() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const stockFilter = document.getElementById('stock-filter');

    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : '';
    const selectedStock = stockFilter ? stockFilter.value : '';

    // تصفية المنتجات من البيانات الأصلية
    let filteredProducts = originalProducts.filter(product => {
        // التحقق من تطابق البحث
        const matchesSearch = searchTerm === '' ||
                            product.name.toLowerCase().includes(searchTerm) ||
                            product.id.toString().includes(searchTerm) ||
                            product.sku.toLowerCase().includes(searchTerm) ||
                            product.price.toString().includes(searchTerm);

        // التحقق من تطابق التصنيف
        const matchesCategory = selectedCategory === '' || product.category === selectedCategory;

        // التحقق من تطابق حالة المخزون
        const quantity = product.quantity || product.stock || 0;
        const minQuantity = product.minQuantity || product.minStock || 0;
        let matchesStock = true;

        if (selectedStock === 'in-stock') {
            matchesStock = quantity > minQuantity;
        } else if (selectedStock === 'low-stock') {
            matchesStock = quantity > 0 && quantity <= minQuantity;
        } else if (selectedStock === 'out-of-stock') {
            matchesStock = quantity === 0;
        }

        return matchesSearch && matchesCategory && matchesStock;
    });

    // إعادة تعيين الصفحة الحالية إلى الأولى عند التصفية
    currentPage = 1;

    // تحديث المنتجات المعروضة
    products = filteredProducts;
    displayProducts();


        // التحقق من تطابق حالة المخزون
        let matchesStock = true;
        if (selectedStock !== '') {
            const hasLowStock = stockCell.classList.contains('low-stock');
            switch(selectedStock) {
                case 'in-stock':
                    matchesStock = stockValue > 0 && !hasLowStock;
                    break;
                case 'low-stock':
                    matchesStock = hasLowStock;
                    break;
                case 'out-of-stock':
                    matchesStock = stockValue === 0;
                    break;
            }
        }

        // إظهار أو إخفاء الصف
        if (matchesSearch && matchesCategory && matchesStock) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    // تحديث عدد النتائج
    updateResultsCount();
}

// دالة لتصفية المنتجات منخفضة المخزون
function filterLowStockProducts() {
    // الحصول على جميع صفوف المنتجات
    const rows = document.querySelectorAll('.products-table tbody tr');
    
    rows.forEach(row => {
        const hasLowStock = row.cells[4].classList.contains('low-stock');
        
        // إظهار أو إخفاء الصف
        if (hasLowStock) {
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
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const stockFilter = document.getElementById('stock-filter');

    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = '';
    if (stockFilter) stockFilter.value = '';

    // إخفاء الاقتراحات
    hideSearchSuggestions();

    // استعادة جميع المنتجات
    products = [...originalProducts];
    currentPage = 1;
    displayProducts();
}

// دالة للحصول على اسم التصنيف بالعربية
function getCategoryArabicName(category) {
    const categoryMap = {
        'electronics': 'إلكترونيات',
        'clothing': 'ملابس',
        'furniture': 'أثاث',
        'other': 'أخرى'
    };
    return categoryMap[category] || category;
}

// دالة لعرض اقتراحات البحث
function showSearchSuggestions(searchTerm) {
    if (!searchTerm || searchTerm.length < 1) {
        hideSearchSuggestions();
        return;
    }

    // إنشاء قائمة الاقتراحات إذا لم تكن موجودة
    let suggestionsContainer = document.getElementById('search-suggestions');
    if (!suggestionsContainer) {
        suggestionsContainer = document.createElement('div');
        suggestionsContainer.id = 'search-suggestions';
        suggestionsContainer.className = 'search-suggestions';

        const searchBox = document.querySelector('.search-box');
        searchBox.appendChild(suggestionsContainer);
    }

    // الحصول على المنتجات المطابقة
    const matchingProducts = getMatchingProducts(searchTerm.toLowerCase());

    if (matchingProducts.length === 0) {
        hideSearchSuggestions();
        return;
    }

    // إنشاء HTML للاقتراحات
    const suggestionsHTML = matchingProducts.slice(0, 5).map(product => `
        <div class="suggestion-item" onclick="selectSuggestion('${product.name}')">
            <div class="suggestion-name">${highlightMatch(product.name, searchTerm)}</div>
            <div class="suggestion-details">${product.category} - ${product.price.toLocaleString('ar-SA')} ر.س</div>
        </div>
    `).join('');

    suggestionsContainer.innerHTML = suggestionsHTML;
    suggestionsContainer.style.display = 'block';
}

// دالة لإخفاء اقتراحات البحث
function hideSearchSuggestions() {
    const suggestionsContainer = document.getElementById('search-suggestions');
    if (suggestionsContainer) {
        suggestionsContainer.style.display = 'none';
    }
}

// دالة للحصول على المنتجات المطابقة
function getMatchingProducts(searchTerm) {
    return originalProducts.filter(product => {
        return product.name.toLowerCase().includes(searchTerm) ||
               product.id.toString().includes(searchTerm) ||
               product.sku.toLowerCase().includes(searchTerm) ||
               product.price.toString().includes(searchTerm);
    }).map(product => {
        const categoryName = categories.find(cat => cat.code === product.category)?.name || product.category;
        return {
            id: product.id,
            name: product.name,
            category: categoryName,
            price: product.price
        });
}

// دالة لتمييز النص المطابق
function highlightMatch(text, searchTerm) {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
}

// دالة لاختيار اقتراح
function selectSuggestion(productName) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = productName;
        filterProducts();
        hideSearchSuggestions();
    }
}

// دالة لتحديث عدد النتائج
function updateResultsCount() {
    const visibleRows = document.querySelectorAll('.products-table tbody tr[style=""]').length;
    const resultsCount = document.querySelector('.results-count');
    
    if (resultsCount) {
        resultsCount.textContent = visibleRows;
    }
}

// دالة لتعديل منتج
function editProduct(productId) {
    console.log('تعديل المنتج رقم:', productId);
    
    // في التطبيق الحقيقي، سيتم استدعاء الخادم للحصول على بيانات المنتج
    // هنا نستخدم بيانات ثابتة للعرض فقط
    const product = {
        id: productId,
        name: 'لابتوب HP',
        category: 'إلكترونيات',
        price: 3500,
        stock: 10,
        minStock: 5
    };
    
    // عرض نافذة تعديل المنتج
    showEditProductModal(product);
}

// دالة لحذف منتج
function deleteProduct(productId) {
    console.log('حذف المنتج رقم:', productId);
    
    // عرض تأكيد الحذف
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        // في التطبيق الحقيقي، سيتم استدعاء الخادم لحذف المنتج
        console.log('تم حذف المنتج بنجاح');
        
        // إزالة صف المنتج من الجدول
        const row = document.querySelector(`.delete-btn[data-id="${productId}"]`).closest('tr');
        row.remove();
        
        // تحديث إحصائيات المنتجات
        const remainingProducts = document.querySelectorAll('.products-table tbody tr').length;
        const totalProductsElement = document.querySelector('.total-products');
        if (totalProductsElement) {
            totalProductsElement.textContent = remainingProducts;
        }
    }
}

// تم حذف الوظيفة القديمة
    
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
            .form-group select {
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
    const form = modal.querySelector('#add-product-form');
    
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
        
        // جمع بيانات المنتج
        const productData = {
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            price: document.getElementById('product-price').value,
            stock: document.getElementById('product-stock').value,
            minStock: document.getElementById('product-min-stock').value
        };
        
        // في التطبيق الحقيقي، سيتم إرسال البيانات إلى الخادم
        console.log('بيانات المنتج الجديد:', productData);
        
        // إضافة المنتج إلى الجدول
        addProductToTable(productData);
        
        // عرض رسالة نجاح
        alert('تم إضافة المنتج بنجاح!');
        
        // إغلاق النافذة
        document.body.removeChild(modal);
    });
}

// دالة لعرض نافذة تعديل منتج
function showEditProductModal(product) {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>تعديل منتج</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <form id="edit-product-form">
                    <input type="hidden" id="product-id" value="${product.id}">
                    <div class="form-group">
                        <label for="product-name">اسم المنتج</label>
                        <input type="text" id="product-name" name="product-name" value="${product.name}" required>
                    </div>
                    <div class="form-group">
                        <label for="product-category">الفئة</label>
                        <select id="product-category" name="product-category">
                            <option value="">اختر الفئة</option>
                            <option value="إلكترونيات" ${product.category === 'إلكترونيات' ? 'selected' : ''}>إلكترونيات</option>
                            <option value="أثاث" ${product.category === 'أثاث' ? 'selected' : ''}>أثاث</option>
                            <option value="ملابس" ${product.category === 'ملابس' ? 'selected' : ''}>ملابس</option>
                            <option value="أحذية" ${product.category === 'أحذية' ? 'selected' : ''}>أحذية</option>
                            <option value="أخرى" ${product.category === 'أخرى' ? 'selected' : ''}>أخرى</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="product-price">السعر</label>
                        <input type="number" id="product-price" name="product-price" min="0" step="0.01" value="${product.price}" required>
                    </div>
                    <div class="form-group">
                        <label for="product-stock">الكمية المتوفرة</label>
                        <input type="number" id="product-stock" name="product-stock" min="0" value="${product.stock}" required>
                    </div>
                    <div class="form-group">
                        <label for="product-min-stock">الحد الأدنى للمخزون</label>
                        <input type="number" id="product-min-stock" name="product-min-stock" min="0" value="${product.minStock}" required>
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
            .form-group select {
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
    const form = modal.querySelector('#edit-product-form');
    
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
        
        // جمع بيانات المنتج
        const productData = {
            id: document.getElementById('product-id').value,
            name: document.getElementById('product-name').value,
            category: document.getElementById('product-category').value,
            price: document.getElementById('product-price').value,
            stock: document.getElementById('product-stock').value,
            minStock: document.getElementById('product-min-stock').value
        };
        
        // في التطبيق الحقيقي، سيتم إرسال البيانات إلى الخادم
        console.log('بيانات المنتج المعدل:', productData);
        
        // تحديث صف المنتج في الجدول
        updateProductRow(productData);
        
        // عرض رسالة نجاح
        alert('تم تعديل المنتج بنجاح!');
        
        // إغلاق النافذة
        document.body.removeChild(modal);
    });
}

// دالة لإضافة منتج إلى الجدول
function addProductToTable(productData) {
    const tableBody = document.querySelector('.products-table tbody');
    if (!tableBody) return;
    
    // إنشاء معرف جديد للمنتج
    const newId = document.querySelectorAll('.products-table tbody tr').length + 1;
    
    // إنشاء صف جديد
    const row = document.createElement('tr');
    
    // تحديد لون الخلفية للمخزون المنخفض
    const stockClass = parseInt(productData.stock) <= parseInt(productData.minStock) ? 'low-stock' : '';
    
    row.innerHTML = `
        <td>${newId}</td>
        <td>${productData.name}</td>
        <td>${productData.category}</td>
        <td>${parseFloat(productData.price).toLocaleString('ar-SA')} ر.س</td>
        <td class="${stockClass}">${productData.stock}</td>
        <td>
            <button class="action-btn edit-btn" data-id="${newId}">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" data-id="${newId}">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    tableBody.appendChild(row);
    
    // إضافة مستمعي الأحداث لأزرار التعديل والحذف
    const editBtn = row.querySelector('.edit-btn');
    const deleteBtn = row.querySelector('.delete-btn');
    
    editBtn.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        editProduct(productId);
    });
    
    deleteBtn.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        deleteProduct(productId);
    });
    
    // تحديث إحصائيات المنتجات
    const totalProducts = document.querySelectorAll('.products-table tbody tr').length;
    const totalProductsElement = document.querySelector('.total-products');
    if (totalProductsElement) {
        totalProductsElement.textContent = totalProducts;
    }
}

// دالة لتحديث صف منتج في الجدول
function updateProductRow(productData) {
    // البحث عن صف المنتج
    const row = document.querySelector(`.edit-btn[data-id="${productData.id}"]`).closest('tr');
    
    // تحديد لون الخلفية للمخزون المنخفض
    const stockClass = parseInt(productData.stock) <= parseInt(productData.minStock) ? 'low-stock' : '';
    
    // تحديث بيانات الصف
    row.cells[1].textContent = productData.name;
    row.cells[2].textContent = productData.category;
    row.cells[3].textContent = parseFloat(productData.price).toLocaleString('ar-SA') + ' ر.س';
    row.cells[4].textContent = productData.stock;
    row.cells[4].className = stockClass;
}

// إضافة CSS للاقتراحات
function addSearchSuggestionsCSS() {
    if (document.getElementById('search-suggestions-style')) return;

    const style = document.createElement('style');
    style.id = 'search-suggestions-style';
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

        @media (max-width: 768px) {
            .search-suggestions {
                position: fixed;
                left: 10px;
                right: 10px;
                top: auto;
                max-height: 200px;
            }
        }
    `;

    document.head.appendChild(style);
}

// تهيئة CSS عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    addSearchSuggestionsCSS();
    // سيتم تهيئة التنقل في initPage()
});

// قائمة الفئات المحدثة
let categories = [
    { code: 'food', name: 'مواد غذائية', description: 'جميع أنواع المواد الغذائية والمشروبات' },
    { code: 'cleaning', name: 'منتجات التنظيف', description: 'مواد التنظيف والعناية بالمنزل' },
    { code: 'personal_care', name: 'العناية الشخصية', description: 'منتجات العناية الشخصية والجمال' },
    { code: 'office', name: 'أدوات مكتبية', description: 'أدوات ومستلزمات مكتبية' },
    { code: 'health', name: 'منتجات صحية', description: 'مكملات غذائية ومنتجات صحية' },
    { code: 'electronics', name: 'إلكترونيات', description: 'أجهزة إلكترونية وتقنية' },
    { code: 'clothing', name: 'ملابس', description: 'ملابس وأزياء' },
    { code: 'furniture', name: 'أثاث', description: 'أثاث منزلي ومكتبي' },
    { code: 'books', name: 'كتب', description: 'كتب ومواد تعليمية' },
    { code: 'other', name: 'أخرى', description: 'منتجات متنوعة' }
];

// وظائف القوائم المنسدلة
function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    if (dropdown) {
        // تبديل حالة العرض بين block و none
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }

    // إغلاق القوائم الأخرى
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        if (menu.id !== dropdownId) {
            menu.style.display = 'none';
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

// وظائف استيراد وتصدير البيانات

// عرض نافذة الاستيراد
function showImportModal() {
    const modal = document.getElementById('import-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
    
    // إغلاق القائمة المنسدلة
    const dropdown = document.getElementById('import-export-dropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
}

// إغلاق النوافذ المنبثقة
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// تنزيل قالب الاستيراد
function downloadTemplate() {
    try {
        // إغلاق القائمة المنسدلة
        const dropdown = document.getElementById('import-export-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
        
        // إنشاء بيانات القالب
        const headers = ['اسم المنتج*', 'الفئة*', 'رمز المنتج*', 'السعر*', 'التكلفة', 'الكمية*', 'الحد الأدنى', 'الوصف'];
        
        // الحصول على الفئات الحالية من نظام إدارة المنتجات
        let categories = [];
        if (window.dataManager) {
            categories = window.dataManager.getCategories();
        }
        
        // إنشاء أمثلة باستخدام الفئات الحقيقية إذا كانت متوفرة
        const sampleData = [];
        
        // إضافة أمثلة باستخدام الفئات الحقيقية
        if (categories.length > 0) {
            // استخدام الفئات الحقيقية في الأمثلة
            categories.slice(0, Math.min(5, categories.length)).forEach((category, index) => {
                const samples = [
                    ['لابتوب ديل XPS', category.code, `PROD-${100+index}`, '4500', '3500', '10', '5', 'منتج عالي الجودة'],
                    ['قميص قطني', category.code, `PROD-${200+index}`, '120', '80', '50', '10', 'متوفر بألوان متعددة']
                ];
                sampleData.push(samples[index % 2]);
            });
        } else {
            // استخدام أمثلة افتراضية
            sampleData.push(
                ['لابتوب ديل XPS', 'electronics', 'DELL-XPS-001', '4500', '3500', '10', '5', 'لابتوب عالي الأداء مع معالج i7'],
                ['قميص قطني', 'clothing', 'SHIRT-COT-001', '120', '80', '50', '10', 'قميص قطني بألوان متعددة'],
                ['أرز بسمتي 5 كجم', 'food', 'RICE-BSM-5KG', '45', '35', '100', '20', 'أرز بسمتي فاخر عبوة 5 كيلو جرام'],
                ['كتاب تعلم البرمجة', 'books', 'BOOK-PRG-001', '85', '60', '30', '5', 'كتاب شامل لتعلم أساسيات البرمجة'],
                ['شامبو للشعر 500 مل', 'personal_care', 'SHMP-500ML', '25', '15', '80', '15', 'شامبو للشعر العادي 500 مل']
            );
        }
        
        // إضافة سطر فارغ
        sampleData.push(['', '', '', '', '', '', '', '']);
        
        // إضافة معلومات توضيحية في بداية الملف
        const instructions = [
            ['قالب استيراد المنتجات - منجز'],
            ['تعليمات الاستخدام:'],
            ['1. الحقول المميزة بعلامة * إلزامية'],
            ['2. رمز المنتج يجب أن يكون فريداً'],
            ['3. الفئة يجب أن تكون موجودة مسبقاً في النظام'],
            ['4. السعر والتكلفة يجب أن تكون أرقاماً'],
            ['5. الكمية والحد الأدنى يجب أن تكون أرقاماً صحيحة'],
            [''],
            headers
        ];
        
        // دمج التعليمات مع القالب
        const fullTemplate = [...instructions, ...sampleData];
        const csvContent = fullTemplate.map(row => row.join(',')).join('\n');
        
        // إضافة BOM للدعم الصحيح للغة العربية
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'قالب_استيراد_المنتجات.csv';
        link.style.display = 'none';
        
        // إضافة الرابط للصفحة وتنفيذ النقر عليه ثم إزالته
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showAlert('تم تحميل قالب الاستيراد بنجاح', 'success');
    } catch (error) {
        console.error('خطأ في تحميل القالب:', error);
        showAlert('حدث خطأ أثناء تحميل القالب: ' + error.message, 'error');
    }
}

// تصدير البيانات إلى CSV
function exportToCSV() {
    try {
        // إغلاق القائمة المنسدلة
        const dropdown = document.getElementById('import-export-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
        
        // الحصول على بيانات المنتجات من نظام إدارة المنتجات
        let productsToExport = [];
        
        if (window.dataManager) {
            productsToExport = window.dataManager.getProducts();
        } else {
            // استخدام البيانات المحلية كبديل
            productsToExport = products.length > 0 ? products : originalProducts;
        }
        
        if (productsToExport.length === 0) {
            showAlert('لا توجد منتجات لتصديرها', 'warning');
            return;
        }
        
        // إنشاء مصفوفة الرؤوس
        const headers = ['رقم المنتج', 'اسم المنتج', 'الفئة', 'رمز المنتج', 'السعر', 'التكلفة', 'الكمية', 'الحد الأدنى', 'الحالة', 'الوصف'];
        
        // تحويل بيانات المنتجات إلى مصفوفة
        const rows = productsToExport.map(product => {
            // الحصول على اسم الفئة إذا كان متاحاً
            let categoryName = product.category;
            if (window.dataManager) {
                const categories = window.dataManager.getCategories();
                const category = categories.find(cat => cat.code === product.category);
                if (category) {
                    categoryName = category.name;
                }
            } else {
                categoryName = categories.find(cat => cat.code === product.category)?.name || product.category;
            }
            
            return [
                product.id,
                product.name,
                categoryName,
                product.sku || '',
                product.salePrice || product.price || '',
                product.purchasePrice || product.cost || '',
                product.quantity || 0,
                product.minQuantity || 5,
                product.status === 'active' ? 'نشط' : 'غير نشط',
                product.description || ''
            ];
        });
        
        // إنشاء مصفوفة تحتوي على الرؤوس وبيانات المنتجات
        const csvContent = [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');
        
        // إنشاء رابط التنزيل مع دعم اللغة العربية (BOM)
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        const date = new Date().toISOString().split('T')[0];
        link.setAttribute('download', `تصدير_المنتجات_${date}.csv`);
        link.style.display = 'none';
        
        // إضافة الرابط للصفحة وتنفيذ النقر عليه ثم إزالته
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showAlert('تم تصدير البيانات بنجاح إلى ملف CSV', 'success');
    } catch (error) {
        console.error('خطأ في تصدير البيانات إلى CSV:', error);
        showAlert('حدث خطأ أثناء التصدير إلى CSV', 'error');
    }
}

// تصدير البيانات إلى Excel
function exportToExcel() {
    try {
        // إغلاق القائمة المنسدلة
        const dropdown = document.getElementById('import-export-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
        
        // الحصول على بيانات المنتجات من نظام إدارة المنتجات
        let productsToExport = [];
        
        if (window.dataManager) {
            productsToExport = window.dataManager.getProducts();
        } else {
            // استخدام البيانات المحلية كبديل
            productsToExport = products.length > 0 ? products : originalProducts;
        }
        
        if (productsToExport.length === 0) {
            showAlert('لا توجد منتجات لتصديرها', 'warning');
            return;
        }
        
        // إنشاء مصفوفة الرؤوس
        const headers = ['رقم المنتج', 'اسم المنتج', 'الفئة', 'رمز المنتج', 'السعر', 'التكلفة', 'الكمية', 'الحد الأدنى', 'الحالة', 'الوصف'];
        
        // تحويل بيانات المنتجات إلى مصفوفة
        const rows = productsToExport.map(product => {
            // الحصول على اسم الفئة إذا كان متاحاً
            let categoryName = product.category;
            if (window.dataManager) {
                const categories = window.dataManager.getCategories();
                const category = categories.find(cat => cat.code === product.category);
                if (category) {
                    categoryName = category.name;
                }
            }
            
            return [
                product.id,
                product.name,
                categoryName,
                product.sku || '',
                product.salePrice || product.price || '',
                product.purchasePrice || product.cost || '',
                product.quantity || 0,
                product.minQuantity || 5,
                product.status === 'active' ? 'نشط' : 'غير نشط',
                product.description || ''
            ];
        });
        
        // إنشاء مصفوفة تحتوي على الرؤوس وبيانات المنتجات
        const csvContent = [headers, ...rows]
            .map(row => row.join(','))
            .join('\n');
        
        // إنشاء رابط التنزيل
        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        const date = new Date().toISOString().split('T')[0];
        link.setAttribute('download', `تصدير_المنتجات_${date}.csv`);
        link.style.display = 'none';
        
        // إضافة الرابط للصفحة وتنفيذ النقر عليه ثم إزالته
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showAlert('تم تصدير البيانات بنجاح', 'success');
    } catch (error) {
        console.error('خطأ في تصدير البيانات:', error);
        showAlert('حدث خطأ أثناء التصدير', 'error');
    }
}

// تصدير البيانات إلى PDF
function exportToPDF() {
    // إغلاق القائمة المنسدلة
    const dropdown = document.getElementById('import-export-dropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
    }
    
    // فتح نافذة طباعة للتصدير كـ PDF
    window.print();
}

// وظائف النوافذ المنبثقة - تعريف في النطاق العام
window.showAddCategoryModal = function() {
    console.log('محاولة فتح نافذة إضافة فئة');
    const modal = document.getElementById('add-category-modal');
    if (modal) {
        // إزالة أي أخطاء سابقة
        clearFormErrors('add-category-form');

        // إعادة تعيين النموذج
        const form = document.getElementById('add-category-form');
        if (form) {
            form.reset();
        }

        modal.style.display = 'flex';
        
        // التركيز على أول حقل
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        console.log('تم فتح نافذة إضافة الفئة');
    } else {
        console.error('لم يتم العثور على نافذة إضافة الفئة');
    }
}

window.showImportModal = function() {
    console.log('محاولة فتح نافذة الاستيراد');
    const modal = document.getElementById('import-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        // إغلاق القائمة المنسدلة
        const dropdown = document.getElementById('import-export-dropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
        
        console.log('تم فتح نافذة الاستيراد');
    } else {
        console.error('لم يتم العثور على نافذة الاستيراد');
    }
}

window.closeModal = function(modalId) {
    console.log('محاولة إغلاق النافذة:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        
        // إزالة أي أخطاء من النموذج
        const formId = modalId.replace('-modal', '-form');
        clearFormErrors(formId);
        
        console.log('تم إغلاق النافذة:', modalId);
    } else {
        console.error('لم يتم العثور على النافذة:', modalId);
    }
}

// دالة لإعداد معالجات النماذج المحسنة
function setupFormHandlers() {
    console.log('إعداد معالجات النماذج المحسنة');

    // معالجة إضافة فئة جديدة مع تحسينات
    const categoryForm = document.getElementById('add-category-form');
    if (categoryForm) {
        categoryForm.addEventListener('submit', handleCategoryFormSubmit);

        // إضافة التحقق الفوري من رمز الفئة
        const categoryCodeInput = document.getElementById('category-code');
        if (categoryCodeInput) {
            categoryCodeInput.addEventListener('input', validateCategoryCode);
            categoryCodeInput.addEventListener('blur', formatCategoryCode);
        }

        // إضافة التحقق الفوري من اسم الفئة
        const categoryNameInput = document.getElementById('category-name');
        if (categoryNameInput) {
            categoryNameInput.addEventListener('input', validateCategoryName);
        }

        console.log('تم إعداد معالجات نموذج الفئة بنجاح');
    } else {
        console.log('نموذج الفئة غير موجود');
    }

    // معالج نموذج إضافة/تعديل منتج مع تحسينات
    const productForm = document.getElementById('add-product-form');
    if (productForm) {
        console.log('تم العثور على نموذج المنتج، إضافة معالجات محسنة');
        productForm.addEventListener('submit', handleProductFormSubmit);

        // إضافة التحقق الفوري من رمز المنتج
        const productSkuInput = document.getElementById('product-sku');
        if (productSkuInput) {
            productSkuInput.addEventListener('input', validateProductSku);
            productSkuInput.addEventListener('blur', formatProductSku);
        }

        // إضافة التحقق الفوري من اسم المنتج مع اقتراح الرمز
        const productNameInput = document.getElementById('product-name');
        if (productNameInput) {
            productNameInput.addEventListener('input', function(e) {
                validateProductName(e);
                suggestProductSku();
            });
        }

        // إضافة اقتراح الرمز عند تغيير الفئة
        const productCategorySelect = document.getElementById('product-category');
        if (productCategorySelect) {
            productCategorySelect.addEventListener('change', suggestProductSku);
        }

        // إضافة التحقق الفوري من الأسعار
        const priceInputs = ['product-price', 'product-cost'];
        priceInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', validatePrice);
                input.addEventListener('blur', formatPrice);
            }
        });

        // إضافة التحقق الفوري من الكميات
        const quantityInputs = ['product-quantity', 'product-min-quantity'];
        quantityInputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', validateQuantity);
            }
        });

        console.log('تم إضافة معالجات نموذج المنتج المحسنة بنجاح');
    } else {
        console.log('نموذج المنتج غير موجود');
    }
}

// معالج نموذج إضافة فئة جديدة محسن
function handleCategoryFormSubmit(e) {
    console.log('تم إرسال نموذج الفئة');
    e.preventDefault();

    // إزالة رسائل الخطأ السابقة
    clearFormErrors('add-category-form');

    const name = document.getElementById('category-name').value.trim();
    const code = document.getElementById('category-code').value.trim().toLowerCase();
    const description = document.getElementById('category-description').value.trim();

    console.log('بيانات الفئة:', { name, code, description });

    // التحقق الشامل من صحة البيانات
    const validationErrors = validateCategoryData(name, code, description);
    if (validationErrors.length > 0) {
        displayFormErrors('add-category-form', validationErrors);
        return;
    }

    try {
        // إضافة الفئة الجديدة
        const newCategory = { code, name, description };
        categories.push(newCategory);

        // تحديث قائمة الفئات في الفلتر ونموذج المنتج
        updateCategoryFilter();
        updateProductCategoryOptions();

        // إغلاق النافذة وإعادة تعيين النموذج
        closeModal('add-category-modal');
        this.reset();

        showAlert('تم إضافة الفئة بنجاح! يمكنك الآن استخدامها في المنتجات.', 'success');

        // تحديث الإحصائيات
        updateProductStats(products);

        console.log('تم إضافة الفئة بنجاح:', newCategory);
    } catch (error) {
        console.error('خطأ في إضافة الفئة:', error);
        showAlert('حدث خطأ أثناء إضافة الفئة. يرجى المحاولة مرة أخرى.', 'error');
    }
}

// معالج نموذج إضافة/تعديل منتج محسن
function handleProductFormSubmit(e) {
    console.log('تم إرسال نموذج المنتج');
    e.preventDefault();

    // إزالة رسائل الخطأ السابقة
    clearFormErrors('add-product-form');

    const formData = new FormData(this);
    const name = formData.get('product-name').trim();
    const category = formData.get('product-category');
    const sku = formData.get('product-sku').trim().toUpperCase();
    const price = parseFloat(formData.get('product-price'));
    const cost = parseFloat(formData.get('product-cost'));
    const quantity = parseInt(formData.get('product-quantity'));
    const minQuantity = parseInt(formData.get('product-min-quantity'));
    const description = formData.get('product-description').trim();
    const editId = this.getAttribute('data-edit-id');

    console.log('بيانات المنتج:', { name, category, sku, price, cost, quantity, minQuantity, editId });

    // التحقق الشامل من صحة البيانات
    const validationErrors = validateProductData(name, category, sku, price, cost, quantity, minQuantity, editId);
    if (validationErrors.length > 0) {
        displayFormErrors('add-product-form', validationErrors);
        return;
    }

    try {
        if (editId) {
            // تعديل منتج موجود
            const productIndex = originalProducts.findIndex(p => p.id === parseInt(editId));
            if (productIndex > -1) {
                originalProducts[productIndex] = {
                    ...originalProducts[productIndex],
                    name: name,
                    category: category,
                    sku: sku,
                    price: price,
                    cost: cost,
                    quantity: quantity,
                    minQuantity: minQuantity,
                    description: description || ''
                };

                showAlert('تم تعديل المنتج بنجاح!', 'success');
                console.log('تم تعديل المنتج:', originalProducts[productIndex]);
            }
        } else {
            // إضافة منتج جديد
            const newId = Math.max(...originalProducts.map(p => p.id)) + 1;

            const newProduct = {
                id: newId,
                name: name,
                category: category,
                sku: sku,
                price: price,
                cost: cost,
                quantity: quantity,
                minQuantity: minQuantity,
                status: 'active',
                description: description || ''
            };

            originalProducts.push(newProduct);
            showAlert('تم إضافة المنتج بنجاح! يمكنك الآن رؤيته في قائمة المنتجات.', 'success');
            console.log('تم إضافة المنتج الجديد:', newProduct);
        }

        // تحديث البيانات والعرض
        products = [...originalProducts];
        loadProducts();

        // إعادة تعيين النافذة والنموذج
        const modal = document.getElementById('add-product-modal');
        const title = modal.querySelector('h3');
        title.innerHTML = '<i class="fas fa-plus-circle"></i> إضافة منتج جديد';
        this.removeAttribute('data-edit-id');

        // إغلاق النافذة وإعادة تعيين النموذج
        closeModal('add-product-modal');
        this.reset();

    } catch (error) {
        console.error('خطأ في معالجة المنتج:', error);
        showAlert('حدث خطأ أثناء حفظ المنتج. يرجى المحاولة مرة أخرى.', 'error');
    }
}

// تحديث قائمة الفئات في الفلتر
function updateCategoryFilter() {
    const categoryFilter = document.getElementById('category-filter');
    const currentValue = categoryFilter.value;

    // مسح الخيارات الحالية (عدا الخيار الأول)
    while (categoryFilter.children.length > 1) {
        categoryFilter.removeChild(categoryFilter.lastChild);
    }

    // إضافة الفئات المحدثة
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.code;
        option.textContent = category.name;
        categoryFilter.appendChild(option);
    });

    // استعادة القيمة المحددة
    categoryFilter.value = currentValue;
}

// تحديث قائمة الفئات في نموذج إضافة المنتج
function updateProductCategoryOptions() {
    const productCategorySelect = document.getElementById('product-category');
    if (productCategorySelect) {
        const currentValue = productCategorySelect.value;

        // مسح الخيارات الحالية (عدا الخيار الأول)
        while (productCategorySelect.children.length > 1) {
            productCategorySelect.removeChild(productCategorySelect.lastChild);
        }

        // إضافة الفئات المحدثة
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.code;
            option.textContent = category.name;
            productCategorySelect.appendChild(option);
        });

        // استعادة القيمة المحددة
        productCategorySelect.value = currentValue;
    }
}

// معالجة استيراد المنتجات
document.addEventListener('DOMContentLoaded', function() {
    const importForm = document.getElementById('import-form');
    if (importForm) {
        importForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const fileInput = document.getElementById('excel-file');
            const file = fileInput.files[0];

            if (!file) {
                showAlert('يرجى اختيار ملف Excel أو CSV', 'error');
                return;
            }

            // التحقق من نوع الملف
            const allowedTypes = ['.xlsx', '.xls', '.csv'];
            const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));

            if (!allowedTypes.includes(fileExtension)) {
                showAlert('يرجى اختيار ملف Excel أو CSV صحيح (.xlsx, .xls, .csv)', 'error');
                return;
            }

            // عرض مؤشر التحميل
            showAlert('جاري معالجة الملف...', 'info');

            // قراءة الملف
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    let importedProducts = [];
                    
                    // معالجة ملف CSV
                    if (fileExtension === '.csv') {
                        const csvData = e.target.result;
                        importedProducts = parseCSV(csvData);
                    } 
                    // معالجة ملفات Excel (xlsx, xls) باستخدام مكتبة SheetJS
                    else if (fileExtension === '.xlsx' || fileExtension === '.xls') {
                        if (typeof XLSX === 'undefined') {
                            // تحميل مكتبة SheetJS إذا لم تكن متوفرة
                            const script = document.createElement('script');
                            script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
                            script.onload = function() {
                                // إعادة المحاولة بعد تحميل المكتبة
                                reader.onload(e);
                            };
                            script.onerror = function() {
                                showAlert('فشل في تحميل مكتبة SheetJS. يرجى التحقق من اتصال الإنترنت.', 'error');
                            };
                            document.head.appendChild(script);
                            return;
                        }
                        
                        const data = e.target.result;
                        const workbook = XLSX.read(data, { type: 'binary' });
                        
                        // استخدام الورقة الأولى
                        const firstSheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[firstSheetName];
                        
                        // تحويل البيانات إلى مصفوفة من الكائنات
                        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
                        
                        // تحليل بيانات Excel
                        importedProducts = parseExcelData(excelData);
                    }
                    
                    if (importedProducts.length > 0) {
                        // إضافة المنتجات المستوردة إلى النظام المركزي
                        addImportedProducts(importedProducts);
                    } else {
                        showAlert('لم يتم العثور على بيانات صالحة في الملف', 'error');
                    }
                    
                    closeModal('import-modal');
                    fileInput.value = '';
                } catch (error) {
                    console.error('خطأ في استيراد الملف:', error);
                    showAlert('حدث خطأ أثناء قراءة الملف: ' + error.message, 'error');
                }
            };

            reader.onerror = function() {
                showAlert('حدث خطأ أثناء قراءة الملف', 'error');
            };

            if (fileExtension === '.csv') {
                reader.readAsText(file);
            } else {
                // للملفات الأخرى (xlsx, xls) - استخدام قراءة ثنائية
                reader.readAsBinaryString(file);
            }
        });
    }
});

// تحليل بيانات Excel
function parseExcelData(excelData) {
    console.log('بدء تحليل بيانات Excel');
    
    if (!excelData || excelData.length < 2) {
        console.warn('بيانات Excel فارغة أو غير كافية');
        return [];
    }
    
    // البحث عن سطر العناوين (يحتوي على "اسم المنتج*" أو "اسم المنتج")
    let headerRowIndex = -1;
    for (let i = 0; i < Math.min(10, excelData.length); i++) {
        const row = excelData[i];
        if (row.some(cell => 
            typeof cell === 'string' && 
            (cell.includes('اسم المنتج*') || cell.includes('اسم المنتج') || 
             cell.includes('Product Name')))) {
            headerRowIndex = i;
            break;
        }
    }
    
    // إذا لم يتم العثور على سطر العناوين، نفترض أنه السطر الأول
    if (headerRowIndex === -1) headerRowIndex = 0;
    
    // الحصول على العناوين
    const headers = excelData[headerRowIndex];
    console.log('العناوين المكتشفة:', headers);
    
    const products = [];
    
    // معالجة الأسطر بعد العناوين
    for (let i = headerRowIndex + 1; i < excelData.length; i++) {
        const row = excelData[i];
        
        // تخطي الأسطر الفارغة
        if (!row.length || row.every(cell => !cell)) continue;
        
        // تخطي الأسطر التي تبدأ بملاحظات أو تعليمات
        const firstCell = String(row[0] || '');
        if (firstCell.startsWith('ملاحظات') || firstCell.startsWith('Note') || 
            /^\d+\./.test(firstCell) || firstCell.startsWith('#') || firstCell.startsWith('*')) {
            continue;
        }
        
        // تحديد مؤشرات الأعمدة المهمة
        let nameIndex = -1, categoryIndex = -1, skuIndex = -1, priceIndex = -1, 
            costIndex = -1, quantityIndex = -1, minQuantityIndex = -1, descriptionIndex = -1;
        
        headers.forEach((header, index) => {
            const headerStr = String(header).toLowerCase();
            if (headerStr.includes('اسم المنتج') || headerStr.includes('product name')) {
                nameIndex = index;
            } else if (headerStr.includes('الفئة') || headerStr.includes('category')) {
                categoryIndex = index;
            } else if (headerStr.includes('رمز المنتج') || headerStr.includes('sku') || headerStr.includes('product code')) {
                skuIndex = index;
            } else if (headerStr.includes('السعر') || headerStr.includes('price')) {
                priceIndex = index;
            } else if (headerStr.includes('التكلفة') || headerStr.includes('cost')) {
                costIndex = index;
            } else if (headerStr.includes('الكمية') && !headerStr.includes('الحد الأدنى') || headerStr.includes('quantity') && !headerStr.includes('min')) {
                quantityIndex = index;
            } else if (headerStr.includes('الحد الأدنى') || headerStr.includes('min quantity')) {
                minQuantityIndex = index;
            } else if (headerStr.includes('الوصف') || headerStr.includes('description')) {
                descriptionIndex = index;
            }
        });
        
        // التأكد من وجود الأعمدة الأساسية
        if (nameIndex === -1 || categoryIndex === -1 || skuIndex === -1) {
            console.warn('الأعمدة الأساسية غير موجودة في الصف:', i);
            continue;
        }
        
        // إنشاء كائن المنتج
        const product = {
            name: String(row[nameIndex] || '').trim(),
            category: String(row[categoryIndex] || '').trim(),
            sku: String(row[skuIndex] || '').trim().toUpperCase(),
            price: parseFloat(String(row[priceIndex] || '0').replace(/,/g, '.')) || 0,
            cost: costIndex !== -1 ? parseFloat(String(row[costIndex] || '0').replace(/,/g, '.')) || 0 : 0,
            quantity: quantityIndex !== -1 ? parseInt(row[quantityIndex]) || 0 : 0,
            minQuantity: minQuantityIndex !== -1 ? parseInt(row[minQuantityIndex]) || 1 : 1,
            description: descriptionIndex !== -1 ? String(row[descriptionIndex] || '').trim() : '',
            status: 'active'
        };
        
        // التحقق من صحة البيانات الأساسية
        if (product.name && product.category && product.sku) {
            products.push(product);
        }
    }
    
    console.log(`تم تحليل ${products.length} منتج من ملف Excel`);
    return products;
}

// تحليل بيانات CSV
function parseCSV(csvData) {
    // إضافة دعم للترميز UTF-8 مع BOM
    if (csvData.charCodeAt(0) === 0xFEFF) {
        csvData = csvData.substring(1);
    }
    
    // تقسيم البيانات إلى أسطر
    const lines = csvData.split(/\r?\n/); // دعم نهايات الأسطر المختلفة
    const products = [];
    
    // البحث عن سطر العناوين (يحتوي على "اسم المنتج*")
    let headerRowIndex = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('اسم المنتج*') || lines[i].includes('اسم المنتج')) {
            headerRowIndex = i;
            break;
        }
    }
    
    // إذا لم يتم العثور على سطر العناوين، نفترض أنه السطر الأول
    if (headerRowIndex === -1) headerRowIndex = 0;
    
    // الحصول على العناوين
    const headers = lines[headerRowIndex].split(',');
    
    // معالجة الأسطر بعد العناوين
    for (let i = headerRowIndex + 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // تخطي الأسطر الفارغة
        
        // تقسيم السطر إلى قيم مع مراعاة الفواصل داخل النصوص المحاطة بعلامات اقتباس
        const values = parseCSVLine(lines[i]);
        
        if (values.length < 3) continue; // تخطي الأسطر غير المكتملة
        
        // تخطي الأسطر التي تبدأ بملاحظات أو تعليمات
        if (values[0].startsWith('ملاحظات') || values[0].startsWith('1.') || values[0].startsWith('2.')) {
            continue;
        }
        
        // إنشاء كائن المنتج
        const product = {
            name: values[0]?.trim() || '',
            category: values[1]?.trim() || '',
            sku: values[2]?.trim().toUpperCase() || '',
            price: parseFloat(values[3]?.replace(/,/g, '.')) || 0,
            cost: parseFloat(values[4]?.replace(/,/g, '.')) || 0,
            quantity: parseInt(values[5]) || 0,
            minQuantity: parseInt(values[6]) || 1,
            description: values[7]?.trim() || '',
            status: 'active'
        };
        
        // التحقق من صحة البيانات الأساسية
        if (product.name && product.category && product.sku) {
            products.push(product);
        }
    }
    
    return products;
}

// تحليل سطر CSV مع مراعاة الفواصل داخل النصوص المحاطة بعلامات اقتباس
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            // تبديل حالة الاقتباس
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            // إضافة القيمة الحالية إلى النتيجة وبدء قيمة جديدة
            result.push(current);
            current = '';
        } else {
            // إضافة الحرف إلى القيمة الحالية
            current += char;
        }
    }
    
    // إضافة القيمة الأخيرة
    result.push(current);
    
    // إزالة علامات الاقتباس من القيم
    return result.map(value => {
        value = value.trim();
        if (value.startsWith('"') && value.endsWith('"')) {
            return value.substring(1, value.length - 1);
        }
        return value;
    });
}

// إضافة المنتجات المستوردة إلى النظام المركزي
function addImportedProducts(importedProducts) {
    console.log('بدء استيراد المنتجات:', importedProducts.length);
    
    let newProductsCount = 0;
    let updatedProductsCount = 0;
    let skippedProducts = 0;
    let invalidProducts = [];
    
    // استخدام مدير البيانات إذا كان متاحاً
    if (window.dataManager) {
        const existingProducts = window.dataManager.getProducts();
        
        importedProducts.forEach((product) => {
            // التحقق من صحة البيانات الأساسية
            if (!product.name || !product.category || !product.sku) {
                invalidProducts.push({
                    name: product.name || 'بدون اسم',
                    sku: product.sku || 'بدون رمز',
                    errors: ['بيانات غير مكتملة']
                });
                skippedProducts++;
                return;
            }
            
            // البحث عن المنتج بواسطة رمز المنتج (SKU)
            const existingProduct = existingProducts.find(p => 
                p.sku && p.sku.toLowerCase() === product.sku.toLowerCase());
            
            if (existingProduct) {
                // تحديث المنتج الموجود
                const updatedProduct = {
                    ...existingProduct,
                    name: product.name,
                    category: product.category,
                    salePrice: parseFloat(product.price) || existingProduct.salePrice,
                    purchasePrice: parseFloat(product.cost) || existingProduct.purchasePrice,
                    quantity: parseInt(product.quantity) || existingProduct.quantity,
                    minQuantity: parseInt(product.minQuantity) || existingProduct.minQuantity,
                    description: product.description || existingProduct.description
                };
                
                window.dataManager.updateProduct(existingProduct.id, updatedProduct);
                updatedProductsCount++;
            } else {
                // إضافة منتج جديد
                const newProduct = {
                    name: product.name,
                    category: product.category,
                    sku: product.sku,
                    salePrice: parseFloat(product.price) || 0,
                    purchasePrice: parseFloat(product.cost) || 0,
                    quantity: parseInt(product.quantity) || 0,
                    minQuantity: parseInt(product.minQuantity) || 5,
                    description: product.description || '',
                    status: 'active'
                };
                
                window.dataManager.addProduct(newProduct);
                newProductsCount++;
            }
        });
        
        // عرض ملخص الاستيراد
        const message = `تم استيراد البيانات بنجاح:\n${newProductsCount} منتج جديد\n${updatedProductsCount} منتج محدث\n${skippedProducts} منتج تم تخطيه`;
        showAlert(message, 'success');
        
        // تحديث عرض المنتجات
        loadProductsFromCentralSystem();
    } else {
        // استخدام localStorage كبديل
        const existingProducts = JSON.parse(localStorage.getItem('monjizProducts')) || [];
        
        // الحصول على أعلى معرف حالي
        const maxId = existingProducts.length > 0 ? 
            Math.max(...existingProducts.map(p => p.id)) : 0;
        
        importedProducts.forEach((product, index) => {
            // التحقق من صحة البيانات الأساسية
            if (!product.name || !product.category || !product.sku) {
                invalidProducts.push({
                    name: product.name || 'بدون اسم',
                    sku: product.sku || 'بدون رمز',
                    errors: ['بيانات غير مكتملة']
                });
                skippedProducts++;
                return;
            }
            
            // البحث عن المنتج بواسطة رمز المنتج (SKU)
            const existingProductIndex = existingProducts.findIndex(p => 
                p.sku && p.sku.toLowerCase() === product.sku.toLowerCase());
            
            if (existingProductIndex >= 0) {
                // تحديث المنتج الموجود
                existingProducts[existingProductIndex] = {
                    ...existingProducts[existingProductIndex],
                    name: product.name,
                    category: product.category,
                    salePrice: parseFloat(product.price) || existingProducts[existingProductIndex].salePrice,
                    purchasePrice: parseFloat(product.cost) || existingProducts[existingProductIndex].purchasePrice,
                    quantity: parseInt(product.quantity) || existingProducts[existingProductIndex].quantity,
                    minQuantity: parseInt(product.minQuantity) || existingProducts[existingProductIndex].minQuantity,
                    description: product.description || existingProducts[existingProductIndex].description
                };
                updatedProductsCount++;
            } else {
                // إضافة منتج جديد
                const newProduct = {
                    id: maxId + newProductsCount + 1,
                    name: product.name,
                    category: product.category,
                    sku: product.sku,
                    salePrice: parseFloat(product.price) || 0,
                    purchasePrice: parseFloat(product.cost) || 0,
                    quantity: parseInt(product.quantity) || 0,
                    minQuantity: parseInt(product.minQuantity) || 5,
                    description: product.description || '',
                    status: 'active',
                    createdAt: new Date().toISOString()
                };
                existingProducts.push(newProduct);
                newProductsCount++;
            }
        });
        
        // حفظ البيانات المحدثة
        localStorage.setItem('monjizProducts', JSON.stringify(existingProducts));
    }
    
    // تحديث العرض
    if (typeof loadProductsData === 'function') {
        loadProductsData();
    } else if (typeof loadProducts === 'function') {
        loadProducts();
    } else {
        location.reload(); // إعادة تحميل الصفحة كحل بديل
    }
    
    // عرض تفاصيل الاستيراد
    if (newProductsCount > 0 || updatedProductsCount > 0) {
        let message = 'تم استيراد البيانات بنجاح: ';
        if (newProductsCount > 0) {
            message += `${newProductsCount} منتج جديد`;
        }
        if (updatedProductsCount > 0) {
            message += newProductsCount > 0 ? ` و ${updatedProductsCount} منتج محدث` : `${updatedProductsCount} منتج محدث`;
        }
        
        // إضافة معلومات عن المنتجات المتخطاة إذا وجدت
        if (skippedProducts > 0) {
            message += `<br>تم تخطي ${skippedProducts} منتج بسبب بيانات غير صالحة`;
        }
        
        showAlert(message, skippedProducts > 0 ? 'warning' : 'success');
    } else if (skippedProducts > 0) {
        showAlert(`لم يتم استيراد أي منتجات. تم تخطي ${skippedProducts} منتج بسبب بيانات غير صالحة.`, 'error');
    } else {
        showAlert('لم يتم استيراد أي منتجات.', 'info');
    }
    
    return {
        newProducts: newProductsCount,
        updatedProducts: updatedProductsCount,
        skippedProducts: skippedProducts,
        invalidProducts: invalidProducts
    };
}

// نظام التنقل البسيط للمنتجات
let productsCurrentPage = 1;
const productsItemsPerPage = 10;

function initializeProductsPagination() {
    console.log('تهيئة نظام التنقل للمنتجات...');
    displayProductsPage();
}

function displayProductsPage() {
    const startIndex = (productsCurrentPage - 1) * productsItemsPerPage;
    const endIndex = startIndex + productsItemsPerPage;
    const pageProducts = products.slice(startIndex, endIndex);

    console.log('عرض المنتجات - الصفحة:', productsCurrentPage, 'المنتجات:', pageProducts.length);

    const tableBody = document.getElementById('products-table-body');
    if (!tableBody) {
        console.error('جدول المنتجات غير موجود');
        return;
    }

    if (pageProducts.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-box-open" style="font-size: 48px; margin-bottom: 16px; display: block;"></i>
                    لا توجد منتجات لعرضها
                </td>
            </tr>
        `;
        updateProductsPagination();
        return;
    }

    let tableHTML = '';
    pageProducts.forEach(product => {
        const stockStatus = getStockStatus(product.stock);
        const stockClass = product.stock <= 5 ? (product.stock === 0 ? 'out-of-stock' : 'low-stock') : '';

        tableHTML += `
            <tr>
                <td><strong>${product.code}</strong></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td class="${stockClass}">${product.stock}</td>
                <td><strong>${product.price} ر.س</strong></td>
                <td><span class="badge ${stockStatus.class}">${stockStatus.text}</span></td>
                <td>${product.supplier}</td>
                <td>
                    <div class="action-buttons-horizontal">
                        <button class="action-btn edit" onclick="editProduct('${product.code}')" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn view" onclick="viewProduct('${product.code}')" title="عرض">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn delete" onclick="deleteProduct('${product.code}')" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = tableHTML;
    updateProductsPagination();
}

function getStockStatus(stock) {
    if (stock === 0) {
        return { class: 'danger', text: 'نفد المخزون' };
    } else if (stock <= 5) {
        return { class: 'warning', text: 'مخزون منخفض' };
    } else {
        return { class: 'success', text: 'متوفر' };
    }
}

function updateProductsPagination() {
    console.log('updateProductsPagination: عدد المنتجات =', products.length);
    const totalPages = Math.ceil(products.length / productsItemsPerPage);
    console.log('updateProductsPagination: عدد الصفحات =', totalPages);

    const paginationContainer = document.getElementById('pagination');

    if (!paginationContainer) {
        console.error('حاوي التنقل غير موجود');
        return;
    }

    if (totalPages <= 1) {
        console.log('updateProductsPagination: إخفاء التنقل - صفحة واحدة فقط');
        paginationContainer.style.display = 'none';
        return;
    }

    console.log('updateProductsPagination: إظهار التنقل');

    paginationContainer.style.display = 'flex';
    paginationContainer.style.justifyContent = 'center';
    paginationContainer.style.gap = '8px';
    paginationContainer.style.margin = '20px 0';

    let paginationHTML = '';

    // زر السابق
    const prevDisabled = productsCurrentPage === 1 ? 'disabled' : '';
    paginationHTML += `
        <button class="page-btn prev ${prevDisabled}" onclick="changeProductsPage('prev')" style="
            padding: 8px 12px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            ${prevDisabled ? 'opacity: 0.5; cursor: not-allowed;' : ''}
        ">
            <i class="fas fa-chevron-right"></i> السابق
        </button>
    `;

    // أزرار الصفحات
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === productsCurrentPage ? 'active' : '';
        const activeStyle = i === productsCurrentPage ? 'background: #007bff; color: white; border-color: #007bff;' : '';

        paginationHTML += `
            <button class="page-btn ${activeClass}" onclick="changeProductsPage(${i})" style="
                padding: 8px 12px;
                border: 1px solid #ddd;
                background: white;
                border-radius: 6px;
                cursor: pointer;
                min-width: 40px;
                ${activeStyle}
            ">${i}</button>
        `;
    }

    // زر التالي
    const nextDisabled = productsCurrentPage === totalPages ? 'disabled' : '';
    paginationHTML += `
        <button class="page-btn next ${nextDisabled}" onclick="changeProductsPage('next')" style="
            padding: 8px 12px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 6px;
            cursor: pointer;
            ${nextDisabled ? 'opacity: 0.5; cursor: not-allowed;' : ''}
        ">
            التالي <i class="fas fa-chevron-left"></i>
        </button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

function changeProductsPage(page) {
    const totalPages = Math.ceil(products.length / productsItemsPerPage);

    if (page === 'prev') {
        if (productsCurrentPage > 1) {
            productsCurrentPage--;
        }
    } else if (page === 'next') {
        if (productsCurrentPage < totalPages) {
            productsCurrentPage++;
        }
    } else {
        productsCurrentPage = parseInt(page);
    }

    displayProductsPage();
}

// إضافة بيانات تجريبية للمنتجات إذا لم تكن موجودة
function addSampleProductsIfEmpty() {
    const existingProducts = JSON.parse(localStorage.getItem('monjizProducts')) || [];

    if (existingProducts.length === 0) {
        console.log('إضافة منتجات تجريبية...');
        const sampleProducts = [];

        // إضافة 25 منتج للاختبار (لإظهار التنقل)
        for (let i = 1; i <= 25; i++) {
            sampleProducts.push({
                code: `PROD-${i.toString().padStart(3, '0')}`,
                name: `منتج رقم ${i}`,
                category: i <= 8 ? 'إلكترونيات' : i <= 16 ? 'ملابس' : 'أغذية',
                stock: Math.floor(Math.random() * 50) + 1,
                price: (Math.random() * 500 + 50).toFixed(2),
                supplier: `مورد رقم ${Math.floor(Math.random() * 5) + 1}`,
                createdAt: new Date().toISOString()
            });
        }

        localStorage.setItem('monjizProducts', JSON.stringify(sampleProducts));
        products.length = 0; // مسح المصفوفة
        products.push(...sampleProducts);
        console.log('تم إضافة', sampleProducts.length, 'منتج تجريبي');
    } else {
        // تحميل البيانات الموجودة إلى متغير products
        products.length = 0; // مسح المصفوفة
        products.push(...existingProducts);
        console.log('تم تحميل', existingProducts.length, 'منتج من localStorage');
    }
}

// تحديث عرض المنتجات مع النظام الجديد
function displayProducts() {
    console.log('displayProducts: بدء عرض المنتجات');

    // إضافة البيانات التجريبية إذا لم تكن موجودة
    addSampleProductsIfEmpty();

    console.log('displayProducts: عدد المنتجات بعد التحميل =', products.length);

    productsCurrentPage = 1; // إعادة تعيين للصفحة الأولى
    displayProductsPage();

    console.log('displayProducts: انتهى عرض المنتجات');
}

function getStockClass(quantity, minQuantity) {
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= minQuantity) return 'low-stock';
    return 'in-stock';
}

// وظائف إضافية مطلوبة - تعريف في النطاق العام
window.showAddProductModal = function() {
    console.log('محاولة فتح نافذة إضافة منتج');
    const modal = document.getElementById('add-product-modal');
    if (modal) {
        console.log('تم العثور على النافذة، فتحها الآن');
        modal.style.display = 'flex';

        // إعادة تعيين النموذج
        const form = document.getElementById('add-product-form');
        if (form) {
            form.reset();
            console.log('تم إعادة تعيين النموذج');

            // إزالة معرف التعديل إذا كان موجوداً
            form.removeAttribute('data-edit-id');

            // إعادة تعيين عنوان النافذة
            const title = modal.querySelector('h3');
            if (title) {
                title.innerHTML = '<i class="fas fa-plus-circle"></i> إضافة منتج جديد';
            }
        }
    } else {
        console.log('لم يتم العثور على النافذة!');
    }
}

// تعريف الدوال في النطاق العام للوصول من HTML
window.editProduct = function(productId) {
    const product = originalProducts.find(p => p.id === productId);
    if (!product) {
        showAlert('المنتج غير موجود', 'error');
        return;
    }

    // ملء نموذج التعديل بالبيانات الحالية
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-sku').value = product.sku;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-cost').value = product.cost;
    document.getElementById('product-quantity').value = product.quantity;
    document.getElementById('product-min-quantity').value = product.minQuantity;
    document.getElementById('product-description').value = product.description || '';

    // تغيير عنوان النافذة ووظيفة النموذج
    const modal = document.getElementById('add-product-modal');
    const title = modal.querySelector('h3');
    const form = document.getElementById('add-product-form');

    if (title) title.innerHTML = '<i class="fas fa-edit"></i> تعديل المنتج';
    if (form) form.setAttribute('data-edit-id', productId);

    // فتح النافذة
    modal.style.display = 'flex';
}

window.deleteProduct = function(productId) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        // حذف المنتج من البيانات الأصلية
        const index = originalProducts.findIndex(p => p.id == productId);
        if (index > -1) {
            originalProducts.splice(index, 1);
            // تحديث البيانات المعروضة
            products = [...originalProducts];
            displayProducts();
            showAlert('تم حذف المنتج بنجاح', 'success');
        }
    }
}

// تعريف الدالة أيضاً بالطريقة التقليدية للتوافق
function showAddProductModal() {
    window.showAddProductModal();
}

// الدوال المكررة محذوفة - تم نقلها إلى النطاق العام أعلاه

// عرض رسالة تنبيه للمستخدم
function showAlert(message, type = 'info') {
    // التحقق من وجود عنصر التنبيهات
    let alertsContainer = document.getElementById('alerts-container');
    
    // إنشاء عنصر التنبيهات إذا لم يكن موجوداً
    if (!alertsContainer) {
        alertsContainer = document.createElement('div');
        alertsContainer.id = 'alerts-container';
        alertsContainer.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            width: 80%;
            max-width: 500px;
        `;
        document.body.appendChild(alertsContainer);
    }
    
    // إنشاء عنصر التنبيه
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="alert-close">&times;</button>
    `;
    
    // تنسيق التنبيه
    alert.style.cssText = `
        background-color: ${type === 'success' ? '#d4edda' : type === 'warning' ? '#fff3cd' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'warning' ? '#856404' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'warning' ? '#ffeeba' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 8px;
        padding: 12px 15px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 0.3s, transform 0.3s;
    `;
    
    // تنسيق محتوى التنبيه
    const alertContent = alert.querySelector('.alert-content');
    alertContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // تنسيق زر الإغلاق
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: inherit;
        opacity: 0.7;
    `;
    
    // إضافة التنبيه للحاوية
    alertsContainer.appendChild(alert);
    
    // تحريك التنبيه للأعلى
    setTimeout(() => {
        alert.style.opacity = '1';
        alert.style.transform = 'translateY(0)';
    }, 10);
    
    // إضافة مستمع حدث لزر الإغلاق
    closeBtn.addEventListener('click', () => {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            alertsContainer.removeChild(alert);
        }, 300);
    });
    
    // إغلاق التنبيه تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (alert.parentNode === alertsContainer) {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (alert.parentNode === alertsContainer) {
                    alertsContainer.removeChild(alert);
                }
            }, 300);
        }
    }, 5000);
}

// وظائف التحقق من صحة البيانات المحسنة

// التحقق من صحة بيانات الفئة
function validateCategoryData(name, code, description) {
    const errors = [];

    // التحقق من اسم الفئة
    if (!name || name.length < 2) {
        errors.push({ field: 'category-name', message: 'اسم الفئة يجب أن يكون على الأقل حرفين' });
    } else if (name.length > 50) {
        errors.push({ field: 'category-name', message: 'اسم الفئة يجب أن يكون أقل من 50 حرف' });
    }

    // التحقق من رمز الفئة
    if (!code || code.length < 2) {
        errors.push({ field: 'category-code', message: 'رمز الفئة يجب أن يكون على الأقل حرفين' });
    } else if (code.length > 20) {
        errors.push({ field: 'category-code', message: 'رمز الفئة يجب أن يكون أقل من 20 حرف' });
    } else if (!/^[a-z0-9_]+$/.test(code)) {
        errors.push({ field: 'category-code', message: 'رمز الفئة يجب أن يحتوي على أحرف إنجليزية وأرقام و _ فقط' });
    } else if (categories.find(cat => cat.code === code)) {
        errors.push({ field: 'category-code', message: 'رمز الفئة موجود مسبقاً' });
    }

    // التحقق من الوصف (اختياري)
    if (description && description.length > 200) {
        errors.push({ field: 'category-description', message: 'الوصف يجب أن يكون أقل من 200 حرف' });
    }

    return errors;
}

// التحقق من صحة بيانات المنتج
function validateProductData(name, category, sku, price, cost, quantity, minQuantity, editId) {
    const errors = [];

    // التحقق من اسم المنتج
    if (!name || name.length < 2) {
        errors.push({ field: 'product-name', message: 'اسم المنتج يجب أن يكون على الأقل حرفين' });
    } else if (name.length > 100) {
        errors.push({ field: 'product-name', message: 'اسم المنتج يجب أن يكون أقل من 100 حرف' });
    }

    // التحقق من الفئة
    if (!category) {
        errors.push({ field: 'product-category', message: 'يرجى اختيار فئة المنتج' });
    } else if (!categories.find(cat => cat.code === category)) {
        errors.push({ field: 'product-category', message: 'الفئة المحددة غير صحيحة' });
    }

    // التحقق من رمز المنتج
    if (!sku || sku.length < 2) {
        errors.push({ field: 'product-sku', message: 'رمز المنتج يجب أن يكون على الأقل حرفين' });
    } else if (sku.length > 30) {
        errors.push({ field: 'product-sku', message: 'رمز المنتج يجب أن يكون أقل من 30 حرف' });
    } else if (!/^[A-Z0-9\-_]+$/.test(sku)) {
        errors.push({ field: 'product-sku', message: 'رمز المنتج يجب أن يحتوي على أحرف إنجليزية كبيرة وأرقام و - _ فقط' });
    } else {
        const existingProduct = originalProducts.find(product =>
            product.sku === sku && product.id !== parseInt(editId)
        );
        if (existingProduct) {
            errors.push({ field: 'product-sku', message: 'رمز المنتج موجود مسبقاً' });
        }
    }

    // التحقق من السعر
    if (isNaN(price) || price <= 0) {
        errors.push({ field: 'product-price', message: 'سعر البيع يجب أن يكون رقم أكبر من الصفر' });
    } else if (price > 999999) {
        errors.push({ field: 'product-price', message: 'سعر البيع كبير جداً' });
    }

    // التحقق من التكلفة
    if (isNaN(cost) || cost <= 0) {
        errors.push({ field: 'product-cost', message: 'تكلفة المنتج يجب أن تكون رقم أكبر من الصفر' });
    } else if (cost > 999999) {
        errors.push({ field: 'product-cost', message: 'تكلفة المنتج كبيرة جداً' });
    } else if (cost >= price) {
        errors.push({ field: 'product-cost', message: 'تكلفة المنتج يجب أن تكون أقل من سعر البيع' });
    }

    // التحقق من الكمية
    if (isNaN(quantity) || quantity < 0) {
        errors.push({ field: 'product-quantity', message: 'الكمية يجب أن تكون رقم صحيح غير سالب' });
    } else if (quantity > 999999) {
        errors.push({ field: 'product-quantity', message: 'الكمية كبيرة جداً' });
    }

    // التحقق من الحد الأدنى
    if (isNaN(minQuantity) || minQuantity <= 0) {
        errors.push({ field: 'product-min-quantity', message: 'الحد الأدنى يجب أن يكون رقم صحيح أكبر من الصفر' });
    } else if (minQuantity > 999999) {
        errors.push({ field: 'product-min-quantity', message: 'الحد الأدنى كبير جداً' });
    }

    return errors;
}

// وظائف التحقق الفوري والتنسيق

// التحقق الفوري من اسم الفئة
function validateCategoryName(e) {
    const input = e.target;
    const value = input.value.trim();

    clearFieldError(input);

    if (value.length > 0 && value.length < 2) {
        showFieldError(input, 'اسم الفئة يجب أن يكون على الأقل حرفين');
    } else if (value.length > 50) {
        showFieldError(input, 'اسم الفئة يجب أن يكون أقل من 50 حرف');
    }
}

// التحقق الفوري من رمز الفئة
function validateCategoryCode(e) {
    const input = e.target;
    const value = input.value.trim().toLowerCase();

    clearFieldError(input);

    if (value.length > 0) {
        if (value.length < 2) {
            showFieldError(input, 'رمز الفئة يجب أن يكون على الأقل حرفين');
        } else if (value.length > 20) {
            showFieldError(input, 'رمز الفئة يجب أن يكون أقل من 20 حرف');
        } else if (!/^[a-z0-9_]+$/.test(value)) {
            showFieldError(input, 'رمز الفئة يجب أن يحتوي على أحرف إنجليزية وأرقام و _ فقط');
        } else if (categories.find(cat => cat.code === value)) {
            showFieldError(input, 'رمز الفئة موجود مسبقاً');
        }
    }
}

// تنسيق رمز الفئة
function formatCategoryCode(e) {
    const input = e.target;
    input.value = input.value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
}

// التحقق الفوري من اسم المنتج
function validateProductName(e) {
    const input = e.target;
    const value = input.value.trim();

    clearFieldError(input);

    if (value.length > 0 && value.length < 2) {
        showFieldError(input, 'اسم المنتج يجب أن يكون على الأقل حرفين');
    } else if (value.length > 100) {
        showFieldError(input, 'اسم المنتج يجب أن يكون أقل من 100 حرف');
    }
}

// التحقق الفوري من رمز المنتج
function validateProductSku(e) {
    const input = e.target;
    const value = input.value.trim().toUpperCase();

    clearFieldError(input);

    if (value.length > 0) {
        if (value.length < 2) {
            showFieldError(input, 'رمز المنتج يجب أن يكون على الأقل حرفين');
        } else if (value.length > 30) {
            showFieldError(input, 'رمز المنتج يجب أن يكون أقل من 30 حرف');
        } else if (!/^[A-Z0-9\-_]+$/.test(value)) {
            showFieldError(input, 'رمز المنتج يجب أن يحتوي على أحرف إنجليزية كبيرة وأرقام و - _ فقط');
        } else {
            const form = input.closest('form');
            const editId = form ? form.getAttribute('data-edit-id') : null;
            const existingProduct = originalProducts.find(product =>
                product.sku === value && product.id !== parseInt(editId)
            );
            if (existingProduct) {
                showFieldError(input, 'رمز المنتج موجود مسبقاً');
            }
        }
    }
}

// تنسيق رمز المنتج
function formatProductSku(e) {
    const input = e.target;
    input.value = input.value.trim().toUpperCase().replace(/[^A-Z0-9\-_]/g, '');
}

// التحقق الفوري من الأسعار
function validatePrice(e) {
    const input = e.target;
    const value = parseFloat(input.value);

    clearFieldError(input);

    if (input.value.trim() !== '' && (isNaN(value) || value <= 0)) {
        showFieldError(input, 'يجب أن يكون السعر رقم أكبر من الصفر');
    } else if (value > 999999) {
        showFieldError(input, 'السعر كبير جداً');
    }
}

// تنسيق الأسعار
function formatPrice(e) {
    const input = e.target;
    const value = parseFloat(input.value);
    if (!isNaN(value) && value > 0) {
        input.value = value.toFixed(2);
    }
}

// التحقق الفوري من الكميات
function validateQuantity(e) {
    const input = e.target;
    const value = parseInt(input.value);

    clearFieldError(input);

    if (input.value.trim() !== '' && (isNaN(value) || value < 0)) {
        showFieldError(input, 'يجب أن تكون الكمية رقم صحيح غير سالب');
    } else if (value > 999999) {
        showFieldError(input, 'الكمية كبيرة جداً');
    }
}

// وظائف عرض وإدارة الأخطاء

// عرض خطأ في حقل معين
function showFieldError(input, message) {
    // إزالة الخطأ السابق إن وجد
    clearFieldError(input);

    // إضافة فئة الخطأ للحقل
    input.classList.add('error');

    // إنشاء عنصر رسالة الخطأ
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #dc3545;
        font-size: 12px;
        margin-top: 5px;
        display: block;
    `;

    // إضافة رسالة الخطأ بعد الحقل
    input.parentNode.appendChild(errorDiv);
}

// إزالة خطأ من حقل معين
function clearFieldError(input) {
    input.classList.remove('error');
    const errorDiv = input.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// عرض أخطاء النموذج
function displayFormErrors(formId, errors) {
    errors.forEach(error => {
        const input = document.getElementById(error.field);
        if (input) {
            showFieldError(input, error.message);
        }
    });

    // التركيز على أول حقل به خطأ
    if (errors.length > 0) {
        const firstErrorField = document.getElementById(errors[0].field);
        if (firstErrorField) {
            firstErrorField.focus();
        }
    }
}

// إزالة جميع أخطاء النموذج
function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const errorInputs = form.querySelectorAll('.error');
        errorInputs.forEach(input => clearFieldError(input));
    }
}

// تحسين وظائف النوافذ المنبثقة
window.showAddCategoryModal = function() {
    console.log('فتح نافذة إضافة فئة جديدة');
    const modal = document.getElementById('add-category-modal');
    if (modal) {
        // إزالة أي أخطاء سابقة
        clearFormErrors('add-category-form');

        // إعادة تعيين النموذج
        const form = document.getElementById('add-category-form');
        if (form) {
            form.reset();
        }

        // فتح النافذة
        modal.style.display = 'flex';

        // التركيز على أول حقل
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }

        console.log('تم فتح نافذة إضافة الفئة بنجاح');
    } else {
        console.error('لم يتم العثور على نافذة إضافة الفئة');
    }
}

window.showAddProductModal = function() {
    console.log('فتح نافذة إضافة منتج جديد');
    const modal = document.getElementById('add-product-modal');
    if (modal) {
        // إزالة أي أخطاء سابقة
        clearFormErrors('add-product-form');

        // إعادة تعيين النموذج
        const form = document.getElementById('add-product-form');
        if (form) {
            form.reset();
            form.removeAttribute('data-edit-id');
        }

        // إعادة تعيين عنوان النافذة
        const title = modal.querySelector('h3');
        if (title) {
            title.innerHTML = '<i class="fas fa-plus-circle"></i> إضافة منتج جديد';
        }

        // فتح النافذة
        modal.style.display = 'flex';

        // التركيز على أول حقل
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }

        console.log('تم فتح نافذة إضافة المنتج بنجاح');
    } else {
        console.error('لم يتم العثور على نافذة إضافة المنتج');
    }
}

// وظائف التحسين الإضافية

// توليد رمز منتج تلقائي
function generateProductSku(productName, categoryCode) {
    if (!productName || !categoryCode) return '';

    // أخذ أول 3 أحرف من اسم المنتج (بالعربية أو الإنجليزية)
    let namePrefix = '';
    const arabicWords = productName.split(' ');
    if (arabicWords.length > 0) {
        // إذا كان النص عربي، أخذ أول حرف من كل كلمة
        namePrefix = arabicWords.slice(0, 3).map(word =>
            word.charAt(0).replace(/[^\u0600-\u06FF]/g, '')
        ).join('').substring(0, 3);

        // إذا لم نحصل على أحرف عربية، استخدم الأحرف الإنجليزية
        if (namePrefix.length === 0) {
            namePrefix = productName.replace(/[^A-Za-z0-9]/g, '').substring(0, 3).toUpperCase();
        }
    }

    // إذا لم نحصل على بادئة، استخدم PRD
    if (namePrefix.length === 0) {
        namePrefix = 'PRD';
    }

    // أخذ رمز الفئة
    const catPrefix = categoryCode.toUpperCase().substring(0, 3);

    // إنشاء رقم تسلسلي
    const existingSkus = originalProducts.map(p => p.sku);
    let counter = 1;
    let newSku;

    do {
        const counterStr = counter.toString().padStart(3, '0');
        newSku = `${catPrefix}-${namePrefix}-${counterStr}`;
        counter++;
    } while (existingSkus.includes(newSku) && counter < 1000);

    return newSku;
}

// اقتراح رمز منتج عند تغيير الاسم أو الفئة
function suggestProductSku() {
    const nameInput = document.getElementById('product-name');
    const categorySelect = document.getElementById('product-category');
    const skuInput = document.getElementById('product-sku');

    if (nameInput && categorySelect && skuInput && !skuInput.value.trim()) {
        const productName = nameInput.value.trim();
        const categoryCode = categorySelect.value;

        if (productName && categoryCode) {
            const suggestedSku = generateProductSku(productName, categoryCode);
            skuInput.value = suggestedSku;

            // إزالة أي خطأ سابق من حقل الرمز
            clearFieldError(skuInput);
        }
    }
}

// تحسين تحديث خيارات فئات المنتج
function updateProductCategoryOptions() {
    const categorySelect = document.getElementById('product-category');
    if (categorySelect) {
        // حفظ القيمة المحددة حالياً
        const currentValue = categorySelect.value;

        // مسح الخيارات الحالية
        categorySelect.innerHTML = '<option value="">اختر الفئة</option>';

        // إضافة الفئات الجديدة
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.code;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });

        // استعادة القيمة المحددة إن أمكن
        if (currentValue && categories.find(cat => cat.code === currentValue)) {
            categorySelect.value = currentValue;
        }

        console.log('تم تحديث خيارات فئات المنتج');
    }
}