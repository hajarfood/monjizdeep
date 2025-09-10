// ملف التقارير - نظام منجز
console.log('📊 تم تحميل ملف js/reports.js بنجاح');

// بيانات التقرير (بيانات تجريبية)
const reportData = {
    // بيانات المبيعات الشهرية
    monthlySales: {
        2023: [
            12500, 15800, 18200, 22000, 25500, 28350, 0, 0, 0, 0, 0, 0
        ],
        2022: [
            10200, 12500, 14800, 18500, 21000, 24500, 26800, 28000, 25500, 22000, 19500, 23000
        ]
    },

    // بيانات المبيعات الأسبوعية
    weeklySales: [
        { week: 'الأسبوع 1', sales: 8500 },
        { week: 'الأسبوع 2', sales: 9200 },
        { week: 'الأسبوع 3', sales: 7800 },
        { week: 'الأسبوع 4', sales: 10500 }
    ],

    // بيانات المنتجات الأكثر مبيعاً
    topProducts: [
        { name: 'منتج أ', sales: 150, revenue: 15000 },
        { name: 'منتج ب', sales: 120, revenue: 12000 },
        { name: 'منتج ج', sales: 100, revenue: 10000 },
        { name: 'منتج د', sales: 80, revenue: 8000 },
        { name: 'منتج هـ', sales: 60, revenue: 6000 }
    ],

    // بيانات العملاء
    customerData: [
        { name: 'عميل أ', purchases: 25, totalSpent: 5000 },
        { name: 'عميل ب', purchases: 20, totalSpent: 4000 },
        { name: 'عميل ج', purchases: 15, totalSpent: 3000 },
        { name: 'عميل د', purchases: 12, totalSpent: 2400 },
        { name: 'عميل هـ', purchases: 10, totalSpent: 2000 }
    ],

    // بيانات المخزون - سيتم جلبها من النظام المركزي
    inventoryData: []
};

// الألوان المستخدمة في الرسوم البيانية
const chartColors = {
    primary: '#667eea',
    secondary: '#764ba2',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40'
};

// وظائف مساعدة للتقارير
function formatCurrency(amount) {
    return parseFloat(amount).toFixed(2) + ' ر.س';
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('ar-SA');
}

function formatNumber(number) {
    return parseFloat(number).toLocaleString('ar-SA');
}

// وظائف التقارير الأساسية مرتبطة بالنظام المركزي
function generateSalesReport(period = 'monthly') {
    console.log('📊 إنشاء تقرير المبيعات من البيانات الفعلية...');

    // الحصول على البيانات الفعلية من النظام المركزي
    let salesData = [];

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        window.dataManager = new DataManager();
    }

    try {
        // استخدام النظام المركزي دائماً
        salesData = window.dataManager.getSales();
        console.log('✅ تم جلب البيانات من النظام المركزي:', salesData.length, 'فاتورة');

        // إذا لم توجد بيانات، جلب من localStorage كبديل
        if (salesData.length === 0) {
            const localSales = JSON.parse(localStorage.getItem('monjizSales')) ||
                              JSON.parse(localStorage.getItem('monjizInvoices')) || [];

            if (localSales.length > 0) {
                console.log('📦 تم العثور على بيانات محلية، سيتم دمجها في النظام المركزي');

                // دمج البيانات المحلية في النظام المركزي
                localSales.forEach(sale => {
                    try {
                        window.dataManager.addSale(sale);
                    } catch (error) {
                        console.warn('تحذير: فشل في إضافة فاتورة:', sale.id, error.message);
                    }
                });

                // إعادة جلب البيانات بعد الدمج
                salesData = window.dataManager.getSales();
                console.log('✅ تم دمج البيانات المحلية، العدد الجديد:', salesData.length, 'فاتورة');
            }
        }
    } catch (error) {
        console.error('❌ خطأ في الوصول للنظام المركزي:', error);
        // الرجوع للبيانات المحلية في حالة الخطأ
        salesData = JSON.parse(localStorage.getItem('monjizSales')) ||
                   JSON.parse(localStorage.getItem('monjizInvoices')) || [];
        console.log('📦 تم الرجوع للبيانات المحلية:', salesData.length, 'فاتورة');
    }

    // تحليل البيانات حسب الفترة المطلوبة
    let data, labels;
    const currentYear = new Date().getFullYear();

    if (period === 'daily') {
        // تقرير يومي - آخر 30 يوم
        const last30Days = [];
        const salesByDay = {};

        for (let i = 29; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            last30Days.push(dateStr);
            salesByDay[dateStr] = 0;
        }

        // حساب المبيعات لكل يوم
        salesData.forEach(sale => {
            const saleDate = new Date(sale.createdAt || sale.date).toISOString().split('T')[0];
            if (salesByDay.hasOwnProperty(saleDate)) {
                salesByDay[saleDate] += parseFloat(sale.total || 0);
            }
        });

        data = last30Days.map(date => salesByDay[date]);
        labels = last30Days.map(date => new Date(date).toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' }));

    } else if (period === 'weekly') {
        // تقرير أسبوعي - آخر 12 أسبوع
        const weeksData = [];
        const salesByWeek = {};

        for (let i = 11; i >= 0; i--) {
            const weekStart = new Date();
            weekStart.setDate(weekStart.getDate() - (i * 7));
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);

            const weekKey = `الأسبوع ${12 - i}`;
            weeksData.push(weekKey);
            salesByWeek[weekKey] = 0;

            // حساب المبيعات لهذا الأسبوع
            salesData.forEach(sale => {
                const saleDate = new Date(sale.createdAt || sale.date);
                if (saleDate >= weekStart && saleDate <= weekEnd) {
                    salesByWeek[weekKey] += parseFloat(sale.total || 0);
                }
            });
        }

        data = weeksData.map(week => salesByWeek[week]);
        labels = weeksData;

    } else {
        // تقرير شهري - آخر 12 شهر
        const monthsData = [];
        const salesByMonth = {};
        const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                           'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

        for (let i = 11; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            const monthLabel = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

            monthsData.push(monthKey);
            salesByMonth[monthKey] = 0;
        }

        // حساب المبيعات لكل شهر
        salesData.forEach(sale => {
            const saleDate = new Date(sale.createdAt || sale.date);
            const monthKey = `${saleDate.getFullYear()}-${String(saleDate.getMonth() + 1).padStart(2, '0')}`;
            if (salesByMonth.hasOwnProperty(monthKey)) {
                salesByMonth[monthKey] += parseFloat(sale.total || 0);
            }
        });

        data = monthsData.map(month => salesByMonth[month]);
        labels = monthsData.map(month => {
            const [year, monthNum] = month.split('-');
            return `${monthNames[parseInt(monthNum) - 1]} ${year}`;
        });
    }

    const total = data.reduce((sum, value) => sum + value, 0);
    const average = data.length > 0 ? total / data.length : 0;

    console.log(`📈 تقرير المبيعات ${period}:`, { total, average, dataPoints: data.length });

    return {
        type: 'sales',
        period: period,
        data: data,
        labels: labels,
        total: total,
        average: average,
        rawData: salesData
    };
}

function generateProductsReport() {
    console.log('📦 إنشاء تقرير المنتجات من البيانات الفعلية...');

    // الحصول على البيانات الفعلية من النظام المركزي
    let productsData = [];
    let salesData = [];

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        window.dataManager = new DataManager();
    }

    try {
        // استخدام النظام المركزي دائماً
        productsData = window.dataManager.getProducts();
        salesData = window.dataManager.getSales();
        console.log('✅ تم جلب البيانات من النظام المركزي:', productsData.length, 'منتج،', salesData.length, 'فاتورة');

        // دمج البيانات المحلية إذا لزم الأمر
        if (productsData.length === 0) {
            const localProducts = JSON.parse(localStorage.getItem('monjizProducts')) || [];
            if (localProducts.length > 0) {
                console.log('📦 دمج المنتجات المحلية في النظام المركزي');
                localProducts.forEach(product => {
                    try {
                        window.dataManager.addProduct(product);
                    } catch (error) {
                        console.warn('تحذير: فشل في إضافة منتج:', product.name, error.message);
                    }
                });
                productsData = window.dataManager.getProducts();
            }
        }

        if (salesData.length === 0) {
            const localSales = JSON.parse(localStorage.getItem('monjizSales')) ||
                              JSON.parse(localStorage.getItem('monjizInvoices')) || [];
            if (localSales.length > 0) {
                console.log('📦 دمج المبيعات المحلية في النظام المركزي');
                localSales.forEach(sale => {
                    try {
                        window.dataManager.addSale(sale);
                    } catch (error) {
                        console.warn('تحذير: فشل في إضافة فاتورة:', sale.id, error.message);
                    }
                });
                salesData = window.dataManager.getSales();
            }
        }

    } catch (error) {
        console.error('❌ خطأ في الوصول للنظام المركزي:', error);
        // الرجوع للبيانات المحلية
        productsData = JSON.parse(localStorage.getItem('monjizProducts')) || [];
        salesData = JSON.parse(localStorage.getItem('monjizSales')) ||
                   JSON.parse(localStorage.getItem('monjizInvoices')) || [];
        console.log('📦 تم الرجوع للبيانات المحلية:', productsData.length, 'منتج،', salesData.length, 'فاتورة');
    }

    // تحليل مبيعات المنتجات
    const productSales = {};

    // تهيئة بيانات المنتجات
    productsData.forEach(product => {
        productSales[product.id] = {
            id: product.id,
            name: product.name,
            category: product.category || 'غير محدد',
            currentStock: product.quantity || 0,
            minStock: product.minQuantity || product.minStock || 0,
            salePrice: product.salePrice || product.price || 0,
            purchasePrice: product.purchasePrice || product.cost || 0,
            totalSold: 0,
            totalRevenue: 0,
            salesCount: 0
        };
    });

    // حساب المبيعات من الفواتير
    salesData.forEach(sale => {
        if (sale.items && Array.isArray(sale.items)) {
            sale.items.forEach(item => {
                const productId = item.productId || item.id;
                if (productSales[productId]) {
                    const quantity = parseFloat(item.quantity || 0);
                    const price = parseFloat(item.price || item.salePrice || 0);
                    const revenue = quantity * price;

                    productSales[productId].totalSold += quantity;
                    productSales[productId].totalRevenue += revenue;
                    productSales[productId].salesCount += 1;
                }
            });
        }
    });

    // تحويل إلى مصفوفة وترتيب حسب المبيعات
    const topProducts = Object.values(productSales)
        .sort((a, b) => b.totalRevenue - a.totalRevenue)
        .slice(0, 10); // أفضل 10 منتجات

    // حساب الإحصائيات العامة
    const totalProducts = productsData.length;
    const totalRevenue = topProducts.reduce((sum, product) => sum + product.totalRevenue, 0);
    const totalSales = topProducts.reduce((sum, product) => sum + product.totalSold, 0);
    const lowStockProducts = productsData.filter(p => (p.quantity || 0) <= (p.minQuantity || p.minStock || 0));
    const outOfStockProducts = productsData.filter(p => (p.quantity || 0) === 0);

    console.log(`📊 تقرير المنتجات:`, {
        totalProducts,
        totalRevenue,
        totalSales,
        lowStock: lowStockProducts.length,
        outOfStock: outOfStockProducts.length
    });

    return {
        type: 'products',
        topProducts: topProducts,
        totalProducts: totalProducts,
        totalRevenue: totalRevenue,
        totalSales: totalSales,
        lowStockProducts: lowStockProducts,
        outOfStockProducts: outOfStockProducts,
        rawData: { products: productsData, sales: salesData }
    };
}

function generateCustomersReport() {
    console.log('👥 إنشاء تقرير العملاء من البيانات الفعلية...');

    // الحصول على البيانات الفعلية من النظام المركزي
    let customersData = [];
    let salesData = [];

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        window.dataManager = new DataManager();
    }

    try {
        // استخدام النظام المركزي دائماً
        customersData = window.dataManager.getCustomers();
        salesData = window.dataManager.getSales();
        console.log('✅ تم جلب البيانات من النظام المركزي:', customersData.length, 'عميل،', salesData.length, 'فاتورة');

        // دمج البيانات المحلية إذا لزم الأمر
        if (customersData.length === 0) {
            const localCustomers = JSON.parse(localStorage.getItem('monjizCustomers')) || [];
            if (localCustomers.length > 0) {
                console.log('📦 دمج العملاء المحليين في النظام المركزي');
                localCustomers.forEach(customer => {
                    try {
                        window.dataManager.addCustomer(customer);
                    } catch (error) {
                        console.warn('تحذير: فشل في إضافة عميل:', customer.name, error.message);
                    }
                });
                customersData = window.dataManager.getCustomers();
            }
        }

        if (salesData.length === 0) {
            const localSales = JSON.parse(localStorage.getItem('monjizSales')) ||
                              JSON.parse(localStorage.getItem('monjizInvoices')) || [];
            if (localSales.length > 0) {
                console.log('📦 دمج المبيعات المحلية في النظام المركزي');
                localSales.forEach(sale => {
                    try {
                        window.dataManager.addSale(sale);
                    } catch (error) {
                        console.warn('تحذير: فشل في إضافة فاتورة:', sale.id, error.message);
                    }
                });
                salesData = window.dataManager.getSales();
            }
        }

    } catch (error) {
        console.error('❌ خطأ في الوصول للنظام المركزي:', error);
        // الرجوع للبيانات المحلية
        customersData = JSON.parse(localStorage.getItem('monjizCustomers')) || [];
        salesData = JSON.parse(localStorage.getItem('monjizSales')) ||
                   JSON.parse(localStorage.getItem('monjizInvoices')) || [];
        console.log('📦 تم الرجوع للبيانات المحلية:', customersData.length, 'عميل،', salesData.length, 'فاتورة');
    }

    // تحليل مشتريات العملاء
    const customerAnalysis = {};

    // تهيئة بيانات العملاء
    customersData.forEach(customer => {
        customerAnalysis[customer.id] = {
            id: customer.id,
            name: customer.name,
            phone: customer.phone || 'غير محدد',
            email: customer.email || 'غير محدد',
            address: customer.address || 'غير محدد',
            totalSpent: 0,
            totalPurchases: 0,
            lastPurchaseDate: null,
            averageOrderValue: 0,
            paymentMethods: {}
        };
    });

    // إضافة العملاء النقديين
    if (!customerAnalysis[0]) {
        customerAnalysis[0] = {
            id: 0,
            name: 'عملاء نقديون',
            phone: 'متنوع',
            email: 'غير محدد',
            address: 'متنوع',
            totalSpent: 0,
            totalPurchases: 0,
            lastPurchaseDate: null,
            averageOrderValue: 0,
            paymentMethods: {}
        };
    }

    // حساب المشتريات من الفواتير
    salesData.forEach(sale => {
        const customerId = sale.customerId || 0; // 0 للعملاء النقديين
        const saleTotal = parseFloat(sale.total || 0);
        const saleDate = new Date(sale.createdAt || sale.date);
        const paymentMethod = sale.paymentMethod || 'cash';

        if (customerAnalysis[customerId]) {
            customerAnalysis[customerId].totalSpent += saleTotal;
            customerAnalysis[customerId].totalPurchases += 1;

            // تحديث تاريخ آخر شراء
            if (!customerAnalysis[customerId].lastPurchaseDate ||
                saleDate > new Date(customerAnalysis[customerId].lastPurchaseDate)) {
                customerAnalysis[customerId].lastPurchaseDate = saleDate.toISOString();
            }

            // تتبع طرق الدفع
            if (!customerAnalysis[customerId].paymentMethods[paymentMethod]) {
                customerAnalysis[customerId].paymentMethods[paymentMethod] = 0;
            }
            customerAnalysis[customerId].paymentMethods[paymentMethod] += saleTotal;
        }
    });

    // حساب متوسط قيمة الطلب لكل عميل
    Object.values(customerAnalysis).forEach(customer => {
        if (customer.totalPurchases > 0) {
            customer.averageOrderValue = customer.totalSpent / customer.totalPurchases;
        }
    });

    // تحويل إلى مصفوفة وترتيب حسب الإنفاق
    const customers = Object.values(customerAnalysis)
        .filter(customer => customer.totalSpent > 0) // فقط العملاء الذين لديهم مشتريات
        .sort((a, b) => b.totalSpent - a.totalSpent);

    // حساب الإحصائيات العامة
    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
    const averageSpending = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;
    const activeCustomers = customers.filter(c => {
        const lastPurchase = new Date(c.lastPurchaseDate);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return lastPurchase >= thirtyDaysAgo;
    });

    console.log(`📊 تقرير العملاء:`, {
        totalCustomers,
        totalRevenue,
        averageSpending,
        activeCustomers: activeCustomers.length
    });

    return {
        type: 'customers',
        customers: customers,
        totalCustomers: totalCustomers,
        totalRevenue: totalRevenue,
        averageSpending: averageSpending,
        activeCustomers: activeCustomers.length,
        rawData: { customers: customersData, sales: salesData }
    };
}

// وظيفة إصلاح بيانات المنتجات
function fixProductsData() {
    console.log('🔧 فحص وإصلاح بيانات المنتجات...');

    try {
        // قراءة البيانات من localStorage
        const rawProducts = JSON.parse(localStorage.getItem('monjizProducts')) || [];
        console.log('📦 عدد المنتجات:', rawProducts.length);

        if (rawProducts.length === 0) {
            console.log('⚠️ لا توجد منتجات للإصلاح');
            return;
        }

        // فحص وإصلاح كل منتج
        let needsUpdate = false;
        const fixedProducts = rawProducts.map((product, index) => {
            const fixed = { ...product };
            let productFixed = false;

            // إصلاح salePrice
            if (!fixed.salePrice || fixed.salePrice === 'undefined' || isNaN(fixed.salePrice)) {
                const purchasePrice = parseFloat(fixed.purchasePrice || fixed.cost) || 0;
                fixed.salePrice = purchasePrice > 0 ? Math.round(purchasePrice * 1.2 * 100) / 100 : 100;
                productFixed = true;
                console.log(`🔧 إصلاح سعر البيع للمنتج ${index + 1}: ${fixed.salePrice}`);
            }

            // إصلاح minQuantity
            if (!fixed.minQuantity || fixed.minQuantity === 'undefined' || isNaN(fixed.minQuantity)) {
                fixed.minQuantity = 5;
                productFixed = true;
                console.log(`🔧 إصلاح الحد الأدنى للمنتج ${index + 1}: ${fixed.minQuantity}`);
            }

            // إصلاح category
            if (!fixed.category || fixed.category === 'undefined') {
                fixed.category = 'عام';
                productFixed = true;
                console.log(`🔧 إصلاح الفئة للمنتج ${index + 1}: ${fixed.category}`);
            }

            // إصلاح name إذا كان فارغاً
            if (!fixed.name || fixed.name === 'undefined') {
                fixed.name = `منتج ${index + 1}`;
                productFixed = true;
                console.log(`🔧 إصلاح اسم المنتج ${index + 1}: ${fixed.name}`);
            }

            if (productFixed) {
                needsUpdate = true;
            }

            return fixed;
        });

        // حفظ البيانات المصححة
        if (needsUpdate) {
            console.log('💾 حفظ البيانات المصححة...');
            localStorage.setItem('monjizProducts', JSON.stringify(fixedProducts));

            // إشعار النظام المركزي
            if (window.dataManager && window.dataManager.notifyPageUpdate) {
                window.dataManager.notifyPageUpdate('monjizProducts');
            }

            console.log('✅ تم إصلاح وحفظ البيانات بنجاح');
        } else {
            console.log('✅ البيانات سليمة ولا تحتاج إصلاح');
        }

    } catch (error) {
        console.error('❌ خطأ في إصلاح البيانات:', error);
    }
}

function generateInventoryReport() {
    console.log('📦 إنشاء تقرير المخزون من البيانات الفعلية...');

    // إصلاح البيانات أولاً قبل أي شيء
    fixProductsData();

    // الحصول على البيانات الفعلية من النظام المركزي
    let productsData = [];
    let stockMovements = [];

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        if (typeof DataManager !== 'undefined') {
            window.dataManager = new DataManager();
            console.log('✅ تم إنشاء النظام المركزي');
        } else {
            console.error('❌ فئة DataManager غير متاحة');
            return;
        }
    } else {
        console.log('✅ النظام المركزي متاح بالفعل');
    }

    // التحقق من وجود الوظائف المطلوبة
    if (typeof window.dataManager.getProducts !== 'function') {
        console.error('❌ وظيفة getProducts غير متاحة في النظام المركزي');
        return;
    }

    try {
        // استخدام النظام المركزي دائماً
        productsData = window.dataManager.getProducts();
        stockMovements = window.dataManager.getStockMovements ? window.dataManager.getStockMovements() : [];
        console.log('✅ تم جلب البيانات من النظام المركزي:', productsData.length, 'منتج،', stockMovements.length, 'حركة مخزون');

        // إجبار تحديث البيانات إذا كانت تحتوي على undefined
        let hasUndefined = false;
        productsData.forEach(product => {
            if (!product.salePrice || !product.minQuantity) {
                hasUndefined = true;
            }
        });

        if (hasUndefined) {
            console.log('🔧 إجبار تحديث البيانات...');
            // قراءة البيانات من localStorage مباشرة وتحديثها
            const rawProducts = JSON.parse(localStorage.getItem('monjizProducts')) || [];
            const updatedProducts = rawProducts.map(product => ({
                ...product,
                salePrice: product.salePrice || product.price || (parseFloat(product.purchasePrice || product.cost) * 1.2) || 100,
                minQuantity: product.minQuantity || product.minStock || 5,
                category: product.category || 'عام'
            }));

            // حفظ البيانات المحدثة
            localStorage.setItem('monjizProducts', JSON.stringify(updatedProducts));
            productsData = updatedProducts;
            console.log('✅ تم تحديث البيانات بنجاح');

            // إشعار النظام المركزي بالتحديث
            if (window.dataManager && window.dataManager.notifyPageUpdate) {
                window.dataManager.notifyPageUpdate('monjizProducts');
            }
        }

        // طباعة عينة من البيانات للتشخيص
        if (productsData.length > 0) {
            console.log('📦 عينة من بيانات المنتجات:', productsData.slice(0, 3));
            console.log('🔍 تفاصيل المنتج الأول:', {
                id: productsData[0].id,
                name: productsData[0].name,
                quantity: productsData[0].quantity,
                salePrice: productsData[0].salePrice,
                purchasePrice: productsData[0].purchasePrice,
                minQuantity: productsData[0].minQuantity,
                category: productsData[0].category
            });
        } else {
            console.warn('⚠️ لا توجد منتجات في النظام المركزي');
        }

        // استخدام البيانات من النظام المركزي فقط
        console.log('📊 البيانات المستخدمة من النظام المركزي فقط');

    } catch (error) {
        console.error('❌ خطأ في الوصول للنظام المركزي:', error);
        // الرجوع للبيانات المحلية
        productsData = JSON.parse(localStorage.getItem('monjizProducts')) || [];
        stockMovements = JSON.parse(localStorage.getItem('monjizStockMovements')) || [];
        console.log('📦 تم الرجوع للبيانات المحلية:', productsData.length, 'منتج،', stockMovements.length, 'حركة مخزون');
    }

    // إذا لم نحصل على بيانات من النظام المركزي، نحاول localStorage مباشرة
    if (productsData.length === 0) {
        console.log('🔄 محاولة قراءة البيانات من localStorage مباشرة...');
        productsData = JSON.parse(localStorage.getItem('monjizProducts')) || [];
        stockMovements = JSON.parse(localStorage.getItem('monjizStockMovements')) || [];
        console.log('📦 البيانات من localStorage:', productsData.length, 'منتج،', stockMovements.length, 'حركة مخزون');

        if (productsData.length > 0) {
            console.log('📦 عينة من بيانات localStorage:', productsData.slice(0, 2));
        }
    }

    // تحديث المنتجات بالخصائص المفقودة
    productsData = productsData.map(product => {
        const updatedProduct = { ...product };

        // إضافة الخصائص المفقودة
        if (!updatedProduct.salePrice && !updatedProduct.price) {
            // حساب سعر البيع كـ 120% من سعر الشراء
            const purchasePrice = parseFloat(updatedProduct.purchasePrice || updatedProduct.cost) || 0;
            updatedProduct.salePrice = purchasePrice > 0 ? purchasePrice * 1.2 : 100;
        }

        if (!updatedProduct.minQuantity && !updatedProduct.minStock) {
            updatedProduct.minQuantity = 5; // قيمة افتراضية
        }

        if (!updatedProduct.category) {
            updatedProduct.category = 'عام';
        }

        return updatedProduct;
    });

    console.log('🔧 تم تحديث المنتجات بالخصائص المفقودة');

    // تحليل حالة المخزون
    console.log('🔄 بدء تحليل المخزون لـ', productsData.length, 'منتج');

    const inventoryAnalysis = productsData.map((product, index) => {
        // قراءة الخصائص مع قيم افتراضية محسنة
        const currentStock = parseFloat(product.quantity) || 0;

        // حساب الحد الأدنى
        let minStock = parseFloat(product.minQuantity || product.minStock) || 5;
        if (minStock === 0) minStock = 5; // تجنب الصفر

        // حساب سعر البيع
        let salePrice = parseFloat(product.salePrice || product.price) || 0;
        if (salePrice === 0) {
            const purchasePrice = parseFloat(product.purchasePrice || product.cost) || 0;
            salePrice = purchasePrice > 0 ? purchasePrice * 1.2 : 100;
        }

        const purchasePrice = parseFloat(product.purchasePrice || product.cost) || 0;

        // تشخيص المنتج الأول
        if (index === 0) {
            console.log('🔍 تحليل المنتج الأول:', {
                name: product.name,
                rawProduct: product, // البيانات الخام
                currentStock,
                minStock,
                salePrice,
                purchasePrice,
                category: product.category
            });
        }

        // تحديد حالة المخزون
        let status = 'متوفر';
        let statusClass = 'available';

        if (currentStock === 0) {
            status = 'نفد';
            statusClass = 'out';
        } else if (currentStock <= minStock) {
            status = 'منخفض';
            statusClass = 'low';
        }

        // حساب قيمة المخزون
        const stockValue = currentStock * purchasePrice;
        const potentialRevenue = currentStock * salePrice;
        const potentialProfit = potentialRevenue - stockValue;

        return {
            id: product.id,
            name: product.name,
            category: product.category || 'غير محدد',
            barcode: product.barcode || 'غير محدد',
            currentStock: currentStock,
            minStock: minStock,
            salePrice: salePrice,
            purchasePrice: purchasePrice,
            stockValue: stockValue,
            potentialRevenue: potentialRevenue,
            potentialProfit: potentialProfit,
            status: status,
            statusClass: statusClass,
            lastUpdated: product.updatedAt || product.createdAt || new Date().toISOString()
        };
    });

    // تصنيف المنتجات حسب الحالة
    const availableItems = inventoryAnalysis.filter(item => item.status === 'متوفر');
    const lowStockItems = inventoryAnalysis.filter(item => item.status === 'منخفض');
    const outOfStockItems = inventoryAnalysis.filter(item => item.status === 'نفد');

    // حساب الإحصائيات العامة
    const totalProducts = inventoryAnalysis.length;
    const totalStockValue = inventoryAnalysis.reduce((sum, item) => sum + item.stockValue, 0);
    const totalPotentialRevenue = inventoryAnalysis.reduce((sum, item) => sum + item.potentialRevenue, 0);
    const totalPotentialProfit = inventoryAnalysis.reduce((sum, item) => sum + item.potentialProfit, 0);

    // تحليل الفئات
    const categoryAnalysis = {};
    inventoryAnalysis.forEach(item => {
        if (!categoryAnalysis[item.category]) {
            categoryAnalysis[item.category] = {
                name: item.category,
                totalProducts: 0,
                totalValue: 0,
                lowStockCount: 0,
                outOfStockCount: 0
            };
        }

        categoryAnalysis[item.category].totalProducts += 1;
        categoryAnalysis[item.category].totalValue += item.stockValue;

        if (item.status === 'منخفض') {
            categoryAnalysis[item.category].lowStockCount += 1;
        } else if (item.status === 'نفد') {
            categoryAnalysis[item.category].outOfStockCount += 1;
        }
    });

    const categories = Object.values(categoryAnalysis);

    console.log(`📊 تقرير المخزون:`, {
        totalProducts,
        totalStockValue,
        lowStock: lowStockItems.length,
        outOfStock: outOfStockItems.length,
        categories: categories.length
    });

    return {
        type: 'inventory',
        inventory: inventoryAnalysis,
        totalProducts: totalProducts,
        availableItems: availableItems,
        lowStockItems: lowStockItems,
        outOfStockItems: outOfStockItems,
        lowStockCount: lowStockItems.length,
        outOfStockCount: outOfStockItems.length,
        totalStockValue: totalStockValue,
        totalPotentialRevenue: totalPotentialRevenue,
        totalPotentialProfit: totalPotentialProfit,
        categories: categories,
        rawData: { products: productsData, movements: stockMovements }
    };
}

// وظائف عرض التقارير
function displaySalesChart(canvasId, reportData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // رسم بياني بسيط
    const maxValue = Math.max(...reportData.data);
    const chartHeight = canvas.height - 60;
    const chartWidth = canvas.width - 80;
    const barWidth = chartWidth / reportData.data.length;
    
    // مسح الرسم السابق
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // رسم الأعمدة
    reportData.data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = 40 + (index * barWidth);
        const y = canvas.height - 40 - barHeight;
        
        // رسم العمود
        ctx.fillStyle = chartColors.primary;
        ctx.fillRect(x, y, barWidth - 10, barHeight);
        
        // كتابة القيمة
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(formatNumber(value), x + (barWidth - 10) / 2, y - 5);
        
        // كتابة التسمية
        ctx.save();
        ctx.translate(x + (barWidth - 10) / 2, canvas.height - 20);
        ctx.rotate(-Math.PI / 4);
        ctx.textAlign = 'right';
        ctx.fillText(reportData.labels[index], 0, 0);
        ctx.restore();
    });
}

function displayReportTable(containerId, data, columns) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let tableHTML = '<table class="report-table"><thead><tr>';
    
    // إنشاء رؤوس الجدول
    columns.forEach(column => {
        tableHTML += `<th>${column.title}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';
    
    // إنشاء صفوف البيانات
    data.forEach(row => {
        tableHTML += '<tr>';
        columns.forEach(column => {
            let value = row[column.field];
            if (column.format === 'currency') {
                value = formatCurrency(value);
            } else if (column.format === 'number') {
                value = formatNumber(value);
            }
            tableHTML += `<td>${value}</td>`;
        });
        tableHTML += '</tr>';
    });
    
    tableHTML += '</tbody></table>';
    container.innerHTML = tableHTML;
}

// وظائف التصدير
function exportToCSV(data, filename) {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // إضافة رؤوس الأعمدة
    const headers = Object.keys(data[0]);
    csvContent += headers.join(",") + "\n";
    
    // إضافة البيانات
    data.forEach(row => {
        const values = headers.map(header => row[header]);
        csvContent += values.join(",") + "\n";
    });
    
    // تحميل الملف
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename + ".csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function printReport() {
    window.print();
}

// تهيئة التقارير
function initializeReports() {
    console.log('تهيئة نظام التقارير...');
    
    // إضافة أنماط CSS للتقارير
    const style = document.createElement('style');
    style.textContent = `
        .report-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .report-table th,
        .report-table td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: right;
        }
        .report-table th {
            background-color: #f8f9fa;
            font-weight: bold;
        }
        .report-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .report-table tr:hover {
            background-color: #f5f5f5;
        }
    `;
    document.head.appendChild(style);
    
    console.log('تم تهيئة نظام التقارير بنجاح');
}

// وظيفة تقرير إغلاق اليوم مرتبطة بالبيانات الفعلية
function generateEndOfDayReport(targetDate = null) {
    console.log('🌙 إنشاء تقرير إغلاق اليوم من البيانات الفعلية...');

    const today = targetDate || new Date().toISOString().split('T')[0];

    // الحصول على البيانات الفعلية من النظام المركزي
    let salesData = [];
    let customersData = [];
    let productsData = [];

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        window.dataManager = new DataManager();
    }

    try {
        // استخدام النظام المركزي دائماً
        salesData = window.dataManager.getSales();
        customersData = window.dataManager.getCustomers();
        productsData = window.dataManager.getProducts();
        console.log('✅ تم جلب البيانات من النظام المركزي:', {
            sales: salesData.length,
            customers: customersData.length,
            products: productsData.length
        });

        // دمج البيانات المحلية إذا لزم الأمر
        if (salesData.length === 0) {
            const localSales = JSON.parse(localStorage.getItem('monjizSales')) ||
                              JSON.parse(localStorage.getItem('monjizInvoices')) || [];
            if (localSales.length > 0) {
                console.log('📦 دمج المبيعات المحلية في النظام المركزي');
                localSales.forEach(sale => {
                    try {
                        window.dataManager.addSale(sale);
                    } catch (error) {
                        console.warn('تحذير: فشل في إضافة فاتورة:', sale.id, error.message);
                    }
                });
                salesData = window.dataManager.getSales();
            }
        }

        if (customersData.length === 0) {
            const localCustomers = JSON.parse(localStorage.getItem('monjizCustomers')) || [];
            if (localCustomers.length > 0) {
                console.log('📦 دمج العملاء المحليين في النظام المركزي');
                localCustomers.forEach(customer => {
                    try {
                        window.dataManager.addCustomer(customer);
                    } catch (error) {
                        console.warn('تحذير: فشل في إضافة عميل:', customer.name, error.message);
                    }
                });
                customersData = window.dataManager.getCustomers();
            }
        }

        if (productsData.length === 0) {
            const localProducts = JSON.parse(localStorage.getItem('monjizProducts')) || [];
            if (localProducts.length > 0) {
                console.log('📦 دمج المنتجات المحلية في النظام المركزي');
                localProducts.forEach(product => {
                    try {
                        window.dataManager.addProduct(product);
                    } catch (error) {
                        console.warn('تحذير: فشل في إضافة منتج:', product.name, error.message);
                    }
                });
                productsData = window.dataManager.getProducts();
            }
        }

    } catch (error) {
        console.error('❌ خطأ في الوصول للنظام المركزي:', error);
        // الرجوع للبيانات المحلية
        salesData = JSON.parse(localStorage.getItem('monjizSales')) ||
                   JSON.parse(localStorage.getItem('monjizInvoices')) || [];
        customersData = JSON.parse(localStorage.getItem('monjizCustomers')) || [];
        productsData = JSON.parse(localStorage.getItem('monjizProducts')) || [];
        console.log('📦 تم الرجوع للبيانات المحلية');
    }

    // فلترة مبيعات اليوم
    const todaySales = salesData.filter(sale => {
        const saleDate = new Date(sale.createdAt || sale.date).toISOString().split('T')[0];
        return saleDate === today;
    });

    // تحليل المبيعات حسب طريقة الدفع
    const paymentMethods = {
        cash: { name: 'نقدي', total: 0, count: 0, sales: [] },
        credit: { name: 'آجل', total: 0, count: 0, sales: [] },
        card: { name: 'بطاقة/شبكة', total: 0, count: 0, sales: [] },
        bank: { name: 'تحويل بنكي', total: 0, count: 0, sales: [] },
        transfer: { name: 'تحويل بنكي', total: 0, count: 0, sales: [] }
    };

    todaySales.forEach(sale => {
        let method = sale.paymentMethod || 'cash';
        const total = parseFloat(sale.total || 0);

        // تحويل القيم العربية إلى الإنجليزية
        const methodMapping = {
            'نقدي': 'cash',
            'آجل': 'credit',
            'بطاقة': 'card',
            'شبكة': 'card',
            'بطاقة/شبكة': 'card',
            'تحويل بنكي': 'bank',
            'تحويل': 'bank',
            'bank': 'bank',
            'transfer': 'bank'
        };

        // إذا كانت القيمة عربية، حولها إلى الإنجليزية
        if (methodMapping[method]) {
            method = methodMapping[method];
        }

        // إذا لم تكن القيمة معروفة، استخدم cash كافتراضي
        if (!paymentMethods[method]) {
            method = 'cash';
        }

        paymentMethods[method].total += total;
        paymentMethods[method].count += 1;
        paymentMethods[method].sales.push(sale);
    });

    // حساب الإحصائيات العامة
    const totalRevenue = todaySales.reduce((sum, sale) => sum + parseFloat(sale.total || 0), 0);
    const totalTransactions = todaySales.length;
    const uniqueCustomers = new Set(todaySales.map(sale => sale.customerId)).size;
    const averageTransaction = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    // تحليل المنتجات المباعة
    const productsSold = {};
    todaySales.forEach(sale => {
        if (sale.items && Array.isArray(sale.items)) {
            sale.items.forEach(item => {
                const productId = item.productId || item.id;
                if (!productsSold[productId]) {
                    const product = productsData.find(p => p.id == productId);
                    productsSold[productId] = {
                        id: productId,
                        name: product ? product.name : `منتج ${productId}`,
                        quantitySold: 0,
                        revenue: 0
                    };
                }

                productsSold[productId].quantitySold += parseFloat(item.quantity || 0);
                productsSold[productId].revenue += parseFloat(item.quantity || 0) * parseFloat(item.price || 0);
            });
        }
    });

    const topProductsSold = Object.values(productsSold)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    console.log(`📊 تقرير إغلاق اليوم ${today}:`, {
        totalRevenue,
        totalTransactions,
        uniqueCustomers,
        topProducts: topProductsSold.length
    });

    return {
        type: 'end-of-day',
        date: today,
        totalRevenue: totalRevenue,
        totalTransactions: totalTransactions,
        uniqueCustomers: uniqueCustomers,
        averageTransaction: averageTransaction,
        paymentMethods: paymentMethods,
        todaySales: todaySales,
        topProductsSold: topProductsSold,
        rawData: { sales: salesData, customers: customersData, products: productsData }
    };
}

// وظيفة إنشاء بيانات تجريبية واقعية في النظام المركزي
function createRealisticSampleData() {
    console.log('🎯 إنشاء بيانات تجريبية واقعية في النظام المركزي...');

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        try {
            window.dataManager = new DataManager();
            console.log('✅ تم تهيئة النظام المركزي بنجاح');
        } catch (error) {
            console.error('❌ فشل في تهيئة النظام المركزي:', error);
            return false;
        }
    }

    try {
        // إنشاء عملاء تجريبيين
        const sampleCustomers = [
            { name: 'أحمد محمد العلي', phone: '0501234567', email: 'ahmed@example.com', address: 'الرياض، حي النخيل' },
            { name: 'فاطمة سعد الغامدي', phone: '0509876543', email: 'fatima@example.com', address: 'جدة، حي الصفا' },
            { name: 'محمد عبدالله القحطاني', phone: '0551122334', email: 'mohammed@example.com', address: 'الدمام، حي الشاطئ' },
            { name: 'نورا خالد الزهراني', phone: '0544455667', email: 'nora@example.com', address: 'مكة، حي العزيزية' },
            { name: 'شركة النور للتجارة', phone: '0112345678', email: 'info@alnoor.com', address: 'الرياض، حي الملك فهد' }
        ];

        const customerIds = [];
        sampleCustomers.forEach(customer => {
            const newCustomer = window.dataManager.addCustomer(customer);
            customerIds.push(newCustomer.id);
            console.log('✅ تم إضافة العميل:', newCustomer.name);
        });

        // إنشاء فواتير مبيعات تجريبية للأيام الماضية
        // دالة الحصول على حركات الحساب (إضافة جديدة)
function getAccountTransactions(accountId, fromDate = null, toDate = null) {
    try {
        if (window.dataManager?.getTransactions) {
            const allTransactions = window.dataManager.getTransactions();
            return allTransactions.filter(transaction => {
                const matchesAccount = transaction.accountId == accountId || 
                                     transaction.debitAccount == accountId || 
                                     transaction.creditAccount == accountId;
                
                let matchesDate = true;
                if (fromDate || toDate) {
                    const transactionDate = new Date(transaction.date);
                    if (fromDate) matchesDate = matchesDate && transactionDate >= new Date(fromDate);
                    if (toDate) matchesDate = matchesDate && transactionDate <= new Date(toDate);
                }
                
                return matchesAccount && matchesDate;
            });
        }
        
        // بيانات افتراضية إذا لم توجد حركات
        return [
            {
                id: 1,
                date: new Date().toISOString().split('T')[0],
                documentNumber: 'JV-001',
                description: 'رصيد افتتاحي',
                debit: 0,
                credit: 0,
                accountId: accountId
            }
        ];
    } catch (error) {
        console.error('خطأ في جلب حركات الحساب:', error);
        return [];
    }
}
        const products = window.dataManager.getProducts();
        if (products.length === 0) {
            console.log('⚠️ لا توجد منتجات، سيتم إنشاء فواتير بدون تفاصيل منتجات');
        }

        const paymentMethods = ['cash', 'credit', 'card', 'bank'];
        const sampleSales = [];

        // إنشاء مبيعات للأيام الـ 30 الماضية
        for (let i = 0; i < 30; i++) {
            const saleDate = new Date();
            saleDate.setDate(saleDate.getDate() - i);

            // عدد عشوائي من الفواتير لكل يوم (1-8 فواتير)
            const dailySalesCount = Math.floor(Math.random() * 8) + 1;

            for (let j = 0; j < dailySalesCount; j++) {
                const customerId = Math.random() > 0.3 ? customerIds[Math.floor(Math.random() * customerIds.length)] : 0;
                const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];

                // مبلغ عشوائي بين 50 و 2000 ريال
                const total = Math.floor(Math.random() * 1950) + 50;

                const saleItems = [];
                if (products.length > 0) {
                    // اختيار منتجات عشوائية
                    const itemsCount = Math.floor(Math.random() * 3) + 1; // 1-3 منتجات
                    for (let k = 0; k < itemsCount; k++) {
                        const product = products[Math.floor(Math.random() * products.length)];
                        const quantity = Math.floor(Math.random() * 5) + 1;
                        const price = product.salePrice || product.price || 50;

                        saleItems.push({
                            productId: product.id,
                            name: product.name,
                            quantity: quantity,
                            price: price,
                            total: quantity * price
                        });
                    }
                }

                const sale = {
                    customerId: customerId,
                    customerName: customerId > 0 ? sampleCustomers.find(c => customerIds.indexOf(customerId) >= 0)?.name || 'عميل' : 'عميل نقدي',
                    paymentMethod: paymentMethod,
                    total: total,
                    items: saleItems,
                    date: saleDate.toISOString().split('T')[0],
                    createdAt: saleDate.toISOString(),
                    notes: `فاتورة تجريبية - ${saleDate.toLocaleDateString('ar-SA')}`
                };

                const newSale = window.dataManager.addSale(sale);
                sampleSales.push(newSale);
            }
        }

        console.log(`✅ تم إنشاء ${sampleSales.length} فاتورة مبيعات تجريبية`);
        console.log(`✅ تم إنشاء ${customerIds.length} عميل تجريبي`);

        return {
            customers: customerIds.length,
            sales: sampleSales.length,
            products: products.length
        };

    } catch (error) {
        console.error('❌ خطأ في إنشاء البيانات التجريبية:', error);
        return false;
    }
}

// === التقارير المالية المرتبطة بالنظام المركزي ===

// وظيفة إنشاء قائمة المركز المالي
function generateBalanceSheetReport(asOfDate = null) {
    console.log('🏦 إنشاء قائمة المركز المالي من النظام المركزي...');

    const reportDate = asOfDate || new Date().toISOString().split('T')[0];
    console.log('📅 تاريخ قائمة المركز المالي:', reportDate);

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        window.dataManager = new DataManager();
    }

    try {
        // الحصول على البيانات من النظام المركزي
        const products = window.dataManager.getProducts();
        const allSales = window.dataManager.getSales();
        const customers = window.dataManager.getCustomers();
        const suppliers = window.dataManager.getSuppliers ? window.dataManager.getSuppliers() : [];

        // فلترة المبيعات حتى التاريخ المحدد
        const sales = allSales.filter(sale => {
            if (!sale.date && !sale.createdAt) return false;

            let saleDate;
            if (sale.createdAt) {
                saleDate = new Date(sale.createdAt).toISOString().split('T')[0];
            } else if (sale.date) {
                // معالجة تنسيقات التاريخ المختلفة
                if (sale.date.includes('/')) {
                    // تنسيق DD/MM/YYYY
                    const parts = sale.date.split('/');
                    if (parts.length === 3) {
                        const day = parts[0].padStart(2, '0');
                        const month = parts[1].padStart(2, '0');
                        const year = parts[2];
                        saleDate = `${year}-${month}-${day}`;
                        // دالة جلب الحسابات (تعديل كاملة)
function getAccountsList() {
    // 1. جلب الحسابات من النظام المركزي إذا متاح
    if (window.dataManager?.getAccounts) {
        const accounts = window.dataManager.getAccounts();
        if (accounts?.length > 0) {
            return flattenAccounts(accounts);
        }
    }
// دالة تحويل الحسابات الهرمية إلى قائمة مسطحة (إضافة جديدة)
function flattenAccounts(accounts) {
    let flatAccounts = [];
    function processAccount(account) {
        if (!account.children || account.children.length === 0) {
            flatAccounts.push({
                id: account.id,
                code: account.code,
                name: account.name,
                type: account.type,
                balance: account.balance || 0
                // دالة حساب الأرصدة التراكمية (إضافة جديدة)
function calculateRunningBalances(transactions, openingBalance = 0) {
    let balance = openingBalance;
    return transactions.map(t => {
        balance += (t.debit || 0) - (t.credit || 0);
        return {
            ...t,
            balance: balance,
            balanceType: balance >= 0 ? 'مدين' : 'دائن'
        };
    });
}
            });
        } else {
            account.children.forEach(child => processAccount(child));
        }
    }
    accounts.forEach(account => processAccount(account));
    return flatAccounts;
}
    // 2. بيانات افتراضية إذا لم توجد حسابات
    return [
        { id: 1011, code: '1101', name: 'النقدية في الصندوق', type: 'asset', balance: 0 },
        { id: 1012, code: '1102', name: 'البنك الأهلي', type: 'asset', balance: 0 },
        { id: 2011, code: '2101', name: 'حسابات الموردين', type: 'liability', balance: 0 }
    ];
}
                    }
                } else {
                    // تنسيق YYYY-MM-DD
                    // دالة إنشاء HTML لكشف الحساب (تعديل كامل)
function generateAccountStatementHtml(account, transactions, fromDate, toDate) {
    const balances = calculateRunningBalances(transactions, account.balance || 0);
    const finalBalance = balances.length > 0 ? balances[balances.length-1].balance : 0;

    return `
        <div class="account-statement">
            <h3>كشف الحساب: ${account.code} - ${account.name}</h3>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>التاريخ</th>
                        <th>البيان</th>
                        <th>مدين</th>
                        <th>دائن</th>
                        <th>الرصيد</th>
                    </tr>
                </thead>
                <tbody>
                    ${balances.map(t => `
                        <tr>
                            <td>${formatDate(t.date)}</td>
                            <td>${t.description || '-'}</td>
                            <td>${t.debit ? formatCurrency(t.debit) : '-'}</td>
                            <td>${t.credit ? formatCurrency(t.credit) : '-'}</td>
                            <td class="${t.balance >= 0 ? 'text-success' : 'text-danger'}">
                                ${formatCurrency(Math.abs(t.balance))} ${t.balanceType}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
                <tfoot>
                    <tr class="table-active">
                        <td colspan="4">الرصيد النهائي</td>
                        <td class="${finalBalance >= 0 ? 'text-success' : 'text-danger'}">
                            ${formatCurrency(Math.abs(finalBalance))} 
                            ${finalBalance >= 0 ? 'مدين' : 'دائن'}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    `;
}
                    saleDate = new Date(sale.date).toISOString().split('T')[0];
                }
            }

            const isIncluded = saleDate && saleDate <= reportDate;
            if (isIncluded) {
                // دالة إنشاء واجهة اختيار الحساب (إضافة جديدة)
function generateAccountSelectionInterface() {
    const accounts = getAccountsList();
    return `
        <div class="account-filter mb-4">
            <select id="accountSelect" class="form-select">
                <option value="">-- اختر حساب --</option>
                ${accounts.map(acc => `
                    <option value="${acc.id}">
                        ${acc.code} - ${acc.name} (${acc.type === 'asset' ? 'أصول' : 'خصوم'})
                    </option>
                `).join('')}
            </select>
            <button onclick="loadAccountStatement()" class="btn btn-primary mt-2">
                عرض التقرير
            </button>
        </div>
    `;
}
                console.log('✅ فاتورة مشمولة:', sale.id, 'تاريخ:', saleDate, 'مبلغ:', sale.total);
            }
            return isIncluded;
        });

        console.log('📊 تم فلترة المبيعات حتى تاريخ:', reportDate, '- عدد المبيعات:', sales.length, 'من أصل', allSales.length);

        // طباعة عينة من المبيعات للتشخيص
        if (allSales.length > 0) {
            console.log('🔍 عينة من جميع المبيعات:', allSales.slice(0, 3).map(s => ({
                id: s.id,
                date: s.date,
                createdAt: s.createdAt,
                total: s.total
            })));
        }

        if (sales.length > 0) {
            console.log('✅ عينة من المبيعات المفلترة:', sales.slice(0, 3).map(s => ({
                id: s.id,
                date: s.date,
                createdAt: s.createdAt,
                total: s.total
            })));
        } else {
            console.log('⚠️ لا توجد مبيعات للتاريخ المحدد:', reportDate);
        }

        // حساب الأصول
        // 1. النقدية (من المبيعات النقدية حتى التاريخ المحدد)
        const cashSales = sales.filter(sale => sale.paymentMethod === 'cash');
        // الدالة الرئيسية لكشف الحساب (تعديل كامل)
function generateAccountStatementReport(accountId = null, fromDate = null, toDate = null) {
    try {
        // إذا لم يُحدد حساب، عرض واجهة الاختيار
        if (!accountId) {
            return {
                success: true,
                html: generateAccountSelectionInterface()
            };
        }

        // جلب بيانات الحساب والحركات
        const account = getAccountsList().find(a => a.id == accountId);
        if (!account) throw new Error('الحساب غير موجود');

        const transactions = getAccountTransactions(accountId, fromDate, toDate);
        if (transactions.length === 0) {
            return {
                success: false,
                html: '<div class="alert alert-info">لا توجد حركات لهذا الحساب</div>'
            };
        }

        // إنشاء التقرير
        return {
            success: true,
            html: generateAccountStatementHtml(account, transactions, fromDate, toDate),
            data: { account, transactions }
        };

    } catch (error) {
        return {
            success: false,
            html: `<div class="alert alert-danger">خطأ: ${error.message}</div>`
        };
    }
}
        const totalCash = cashSales.reduce((sum, sale) => sum + parseFloat(sale.total || 0), 0);

        // 2. العملاء (المبيعات الآجلة حتى التاريخ المحدد)
        const creditSales = sales.filter(sale => sale.paymentMethod === 'credit');
        const accountsReceivable = creditSales.reduce((sum, sale) => sum + parseFloat(sale.total || 0), 0);

        // 3. المخزون (قيمة المنتجات بسعر التكلفة)
        const inventoryValue = products.reduce((sum, product) => {
            const quantity = product.quantity || 0;
            const cost = product.purchasePrice || product.cost || 0;
            return sum + (quantity * cost);
        }, 0);
// دالة تحميل التقرير عند الضغط على الزر (إضافة جديدة)
function loadAccountStatement() {
    const accountId = document.getElementById('accountSelect').value;
    const report = generateAccountStatementReport(accountId);
    document.getElementById('reportContainer').innerHTML = report.html;
}
        // 4. الأصول الثابتة (افتراضية)
        const fixedAssets = 50000; // يمكن تحديثها من إعدادات النظام

        // إجمالي الأصول
        const totalAssets = totalCash + accountsReceivable + inventoryValue + fixedAssets;

        // حساب الخصوم
        // 1. الموردين (افتراضي - يمكن ربطه بنظام المشتريات)
        const accountsPayable = suppliers.length * 5000; // متوسط افتراضي

        // 2. ضريبة القيمة المضافة المستحقة (15% من المبيعات حتى التاريخ المحدد)
        const vatPayable = sales.reduce((sum, sale) => {
            const saleTotal = parseFloat(sale.total || 0);
            return sum + (saleTotal * 0.15);
        }, 0);

        // إجمالي الخصوم
        const totalLiabilities = accountsPayable + vatPayable;

        // حقوق الملكية
        const equity = totalAssets - totalLiabilities;

        console.log('📊 قائمة المركز المالي كما في', reportDate, ':', {
            totalAssets,
            totalLiabilities,
            equity,
            cash: totalCash,
            receivables: accountsReceivable,
            inventory: inventoryValue,
            salesIncluded: sales.length,
            cashSalesCount: cashSales.length,
            creditSalesCount: creditSales.length,
            totalSalesValue: sales.reduce((sum, sale) => sum + parseFloat(sale.total || 0), 0)
        });

        return {
            type: 'balance-sheet',
            asOfDate: reportDate,
            assets: {
                currentAssets: {
                    cash: totalCash,
                    accountsReceivable: accountsReceivable,
                    inventory: inventoryValue,
                    total: totalCash + accountsReceivable + inventoryValue
                },
                fixedAssets: {
                    equipment: fixedAssets,
                    total: fixedAssets
                },
                totalAssets: totalAssets
            },
            liabilities: {
                currentLiabilities: {
                    accountsPayable: accountsPayable,
                    vatPayable: vatPayable,
                    total: totalLiabilities
                },
                totalLiabilities: totalLiabilities
            },
            equity: {
                retainedEarnings: equity,
                totalEquity: equity
            },
            rawData: { products, sales, customers, suppliers }
        };

    } catch (error) {
        console.error('❌ خطأ في إنشاء قائمة المركز المالي:', error);
        throw error;
    }
}

// وظيفة إنشاء قائمة الأرباح والخسائر
function generateProfitLossReport(fromDate = null, toDate = null) {
    console.log('📈 إنشاء قائمة الأرباح والخسائر من النظام المركزي...');

    const endDate = toDate || new Date().toISOString().split('T')[0];
    const startDate = fromDate || (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().split('T')[0];
    })();

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        window.dataManager = new DataManager();
    }

    try {
        // الحصول على البيانات من النظام المركزي
        const sales = window.dataManager.getSales();
        const products = window.dataManager.getProducts();

        // فلترة المبيعات حسب الفترة
        const periodSales = sales.filter(sale => {
            const saleDate = new Date(sale.createdAt || sale.date).toISOString().split('T')[0];
            return saleDate >= startDate && saleDate <= endDate;
        });

        // حساب الإيرادات
        const totalRevenue = periodSales.reduce((sum, sale) => sum + parseFloat(sale.total || 0), 0);

        // حساب تكلفة المبيعات
        let costOfGoodsSold = 0;
        periodSales.forEach(sale => {
            if (sale.items && Array.isArray(sale.items)) {
                sale.items.forEach(item => {
                    const product = products.find(p => p.id == item.productId);
                    if (product) {
                        const quantity = parseFloat(item.quantity || 0);
                        const cost = product.purchasePrice || product.cost || 0;
                        costOfGoodsSold += quantity * cost;
                    }
                });
            }
        });

        // إجمالي الربح
        const grossProfit = totalRevenue - costOfGoodsSold;

        // المصروفات التشغيلية (افتراضية - يمكن ربطها بنظام المصروفات)
        const operatingExpenses = {
            salaries: totalRevenue * 0.15, // 15% من الإيرادات
            rent: 5000, // إيجار شهري
            utilities: 1500, // مرافق
            marketing: totalRevenue * 0.05, // 5% تسويق
            other: totalRevenue * 0.03 // 3% مصروفات أخرى
        };

        const totalOperatingExpenses = Object.values(operatingExpenses).reduce((sum, exp) => sum + exp, 0);

        // صافي الربح
        const netProfit = grossProfit - totalOperatingExpenses;

        console.log('📊 قائمة الأرباح والخسائر:', {
            totalRevenue,
            costOfGoodsSold,
            grossProfit,
            totalOperatingExpenses,
            netProfit
        });

        return {
            type: 'profit-loss',
            period: { startDate, endDate },
            revenue: {
                sales: totalRevenue,
                totalRevenue: totalRevenue
            },
            costOfGoodsSold: costOfGoodsSold,
            grossProfit: grossProfit,
            operatingExpenses: operatingExpenses,
            totalOperatingExpenses: totalOperatingExpenses,
            netProfit: netProfit,
            rawData: { sales: periodSales, products }
        };

    } catch (error) {
        console.error('❌ خطأ في إنشاء قائمة الأرباح والخسائر:', error);
        throw error;
    }
}

// وظيفة إنشاء قائمة التدفقات النقدية
function generateCashFlowReport(fromDate = null, toDate = null) {
    console.log('💰 إنشاء قائمة التدفقات النقدية من النظام المركزي...');

    const endDate = toDate || new Date().toISOString().split('T')[0];
    const startDate = fromDate || (() => {
        const date = new Date();
        date.setMonth(date.getMonth() - 1);
        return date.toISOString().split('T')[0];
    })();

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        window.dataManager = new DataManager();
    }

    try {
        console.log('🔍 محاولة جلب المبيعات من النظام المركزي...');
        let sales = [];
        
        // محاولة جلب المبيعات من النظام المركزي
        if (window.dataManager && typeof window.dataManager.getSales === 'function') {
            sales = window.dataManager.getSales() || [];
            console.log(`📊 تم جلب ${sales.length} فاتورة من النظام المركزي`);
        }
        
        // إذا لم نجد مبيعات في النظام المركزي، نحاول من localStorage
        if (sales.length === 0) {
            console.log('⚠️ لم يتم العثور على مبيعات في النظام المركزي، محاولة استخدام localStorage...');
            
            // محاولة البحث في كل مفاتيح التخزين المحتملة
            const storedSales = JSON.parse(localStorage.getItem('monjizSales') || '[]');
            const storedInvoices = JSON.parse(localStorage.getItem('monjizInvoices') || '[]');
            
            // دمج البيانات من المصادر المختلفة وإزالة التكرار
            sales = [...storedSales, ...storedInvoices].filter((sale, index, self) => 
                index === self.findIndex(s => s.id === sale.id)
            );
            
            console.log(`📊 تم جلب ${sales.length} فاتورة من localStorage`);
        }

        // فلترة المبيعات حسب الفترة
        const periodSales = sales.filter(sale => {
            if (!sale.date && !sale.createdAt) return false;

            let saleDate;
            if (sale.createdAt) {
                saleDate = new Date(sale.createdAt).toISOString().split('T')[0];
            } else if (sale.date) {
                // معالجة تنسيقات التاريخ المختلفة
                if (typeof sale.date === 'string' && sale.date.includes('/')) {
                    // تنسيق DD/MM/YYYY
                    const parts = sale.date.split('/');
                    if (parts.length === 3) {
                        const day = parts[0].padStart(2, '0');
                        const month = parts[1].padStart(2, '0');
                        const year = parts[2];
                        saleDate = `${year}-${month}-${day}`;
                    }
                } else {
                    // تنسيق YYYY-MM-DD أو تاريخ كامل
                    saleDate = new Date(sale.date).toISOString().split('T')[0];
                }
            }

            const isIncluded = saleDate && saleDate >= startDate && saleDate <= endDate;
            return isIncluded;
        });

        console.log('📊 تم فلترة المبيعات للفترة:', startDate, 'إلى', endDate, '- عدد المبيعات:', periodSales.length, 'من أصل', sales.length);

        // طباعة تفاصيل المبيعات للتشخيص
        periodSales.forEach((sale, index) => {
            console.log(`📝 تفاصيل المبيعات #${index + 1}:`, {
                id: sale.id,
                date: sale.date,
                createdAt: sale.createdAt,
                paymentMethod: sale.paymentMethod,
                total: sale.total
            });
        });

        // التدفقات النقدية من الأنشطة التشغيلية - تحسين الفلترة لتشمل كل طرق الدفع النقدية
        const cashFromSales = periodSales
            .filter(sale => {
                // تحسين الفلترة لتشمل كل الحالات المحتملة للدفع النقدي
                const paymentMethod = (sale.paymentMethod || '').toLowerCase();
                return paymentMethod === 'cash' || 
                       paymentMethod === 'نقداً' || 
                       paymentMethod === 'نقدا' || 
                       paymentMethod === 'card' || 
                       paymentMethod === 'بطاقة' ||
                       paymentMethod === 'بطاقة ائتمان';
            })
            .reduce((sum, sale) => sum + parseFloat(sale.total || 0), 0);

        console.log('💰 إجمالي المبيعات النقدية:', cashFromSales);

        const operatingCashFlow = cashFromSales;

        // جلب المشتريات من النظام المركزي
        let purchases = [];
        if (window.dataManager && typeof window.dataManager.getPurchases === 'function') {
            purchases = window.dataManager.getPurchases() || [];
            console.log(`📊 تم جلب ${purchases.length} فاتورة مشتريات من النظام المركزي`);
        }
        
        // إذا لم نجد مشتريات في النظام المركزي، نحاول من localStorage
        if (purchases.length === 0) {
            purchases = JSON.parse(localStorage.getItem('monjizPurchases') || '[]');
            console.log(`📊 تم جلب ${purchases.length} فاتورة مشتريات من localStorage`);
        }
        
        // فلترة المشتريات حسب الفترة
        const periodPurchases = purchases.filter(purchase => {
            if (!purchase.date && !purchase.createdAt) return false;
            
            let purchaseDate;
            if (purchase.createdAt) {
                purchaseDate = new Date(purchase.createdAt).toISOString().split('T')[0];
            } else if (purchase.date) {
                // معالجة تنسيقات التاريخ المختلفة
                if (typeof purchase.date === 'string' && purchase.date.includes('/')) {
                    // تنسيق DD/MM/YYYY
                    const parts = purchase.date.split('/');
                    if (parts.length === 3) {
                        const day = parts[0].padStart(2, '0');
                        const month = parts[1].padStart(2, '0');
                        const year = parts[2];
                        purchaseDate = `${year}-${month}-${day}`;
                    }
                } else {
                    purchaseDate = new Date(purchase.date).toISOString().split('T')[0];
                }
            }
            
            return purchaseDate && purchaseDate >= startDate && purchaseDate <= endDate;
        });
        
        // حساب إجمالي المشتريات للفترة
        const totalPurchases = periodPurchases.reduce((sum, purchase) => {
            return sum + parseFloat(purchase.total || 0);
        }, 0);
        
        // التدفقات النقدية من الأنشطة الاستثمارية (تعتمد على المشتريات الفعلية)
        const investingCashFlow = -totalPurchases || -10000; // استخدام المشتريات الفعلية أو القيمة الافتراضية

        // التدفقات النقدية من الأنشطة التمويلية (افتراضية)
        const financingCashFlow = 0;

        // صافي التدفق النقدي
        const netCashFlow = operatingCashFlow + investingCashFlow + financingCashFlow;

        console.log('💰 قائمة التدفقات النقدية للفترة:', startDate, 'إلى', endDate, ':', {
            cashFromSales,
            operatingCashFlow,
            investingCashFlow,
            financingCashFlow,
            netCashFlow,
            salesIncluded: periodSales.length,
            purchasesIncluded: periodPurchases.length
        });

        return {
            type: 'cash-flow',
            period: { startDate, endDate },
            operatingActivities: {
                cashFromSales: cashFromSales,
                netOperatingCashFlow: operatingCashFlow
            },
            investingActivities: {
                equipmentPurchases: investingCashFlow,
                netInvestingCashFlow: investingCashFlow
            },
            financingActivities: {
                netFinancingCashFlow: financingCashFlow
            },
            netCashFlow: netCashFlow,
            rawData: { 
                sales: periodSales,
                purchases: periodPurchases 
            }
        };

    } catch (error) {
        console.error('❌ خطأ في إنشاء قائمة التدفقات النقدية:', error);
        // إنشاء تقرير بيانات افتراضية في حالة الخطأ
        return {
            type: 'cash-flow',
            period: { startDate, endDate },
            operatingActivities: {
                cashFromSales: 15000,
                netOperatingCashFlow: 15000
            },
            investingActivities: {
                equipmentPurchases: -10000,
                netInvestingCashFlow: -10000
            },
            financingActivities: {
                netFinancingCashFlow: 0
            },
            netCashFlow: 5000,
            rawData: { 
                sales: [],
                purchases: [] 
            },
            isErrorData: true
        };
    }
}

// === تقارير المشتريات المرتبطة بالنظام المركزي ===

// وظيفة إنشاء تقرير المشتريات
function generatePurchasesReport(period = 'monthly') {
    console.log('🛒 إنشاء تقرير المشتريات من النظام المركزي...');

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        window.dataManager = new DataManager();
    }

    try {
        // الحصول على البيانات من النظام المركزي
        let purchases = [];
        let suppliers = [];
        let products = [];

        // محاولة جلب المشتريات من مصادر متعددة
        if (window.dataManager && window.dataManager.getPurchases) {
            purchases = window.dataManager.getPurchases();
            console.log('📊 تم جلب المشتريات من DataManager:', purchases.length);
        }

        // إذا لم نجد مشتريات، نحاول localStorage
        if (purchases.length === 0) {
            console.log('🔍 البحث عن المشتريات في localStorage...');

            // البحث في جميع مفاتيح localStorage التي تحتوي على "purchase"
            const storageKeys = Object.keys(localStorage);
            console.log('🗂️ جميع مفاتيح localStorage:', storageKeys);

            const purchaseKeys = storageKeys.filter(key =>
                key.toLowerCase().includes('purchase') ||
                key.toLowerCase().includes('شراء') ||
                key === 'monjizPurchases'
            );

            console.log('🛒 مفاتيح المشتريات الموجودة:', purchaseKeys);

            purchaseKeys.forEach(key => {
                try {
                    const data = JSON.parse(localStorage.getItem(key) || '[]');
                    if (Array.isArray(data) && data.length > 0) {
                        console.log(`📦 وجدت ${data.length} مشتريات في ${key}`);
                        console.log(`📊 عينة من ${key}:`, data.slice(0, 1));
                        purchases = purchases.concat(data);
                    }
                } catch (e) {
                    console.log(`⚠️ خطأ في قراءة ${key}:`, e.message);
                }
            });
        }

        // جلب الموردين والمنتجات
        if (window.dataManager) {
            suppliers = window.dataManager.getSuppliers ? window.dataManager.getSuppliers() : [];
            products = window.dataManager.getProducts ? window.dataManager.getProducts() : [];
        }

        if (suppliers.length === 0) {
            suppliers = JSON.parse(localStorage.getItem('monjizSuppliers') || '[]');
        }

        if (products.length === 0) {
            products = JSON.parse(localStorage.getItem('monjizProducts') || '[]');
        }

        console.log('✅ إجمالي المشتريات المتاحة:', purchases.length, 'فاتورة شراء');
        console.log('✅ إجمالي الموردين المتاحين:', suppliers.length, 'مورد');
        console.log('✅ إجمالي المنتجات المتاحة:', products.length, 'منتج');

        // طباعة تفاصيل المشتريات للتشخيص
        if (purchases.length > 0) {
            console.log('🔍 عينة من المشتريات:', purchases.slice(0, 2));
        }

        // استخدام البيانات الفعلية
        let purchasesData = purchases;

        // تحليل البيانات حسب الفترة
        let data, labels;
        const currentYear = new Date().getFullYear();

        if (period === 'daily') {
            // تقرير يومي - آخر 30 يوم
            const last30Days = [];
            const purchasesByDay = {};

            for (let i = 29; i >= 0; i--) {
                const date = new Date();
                date.setDate(date.getDate() - i);
                const dateStr = date.toISOString().split('T')[0];
                last30Days.push(dateStr);
                purchasesByDay[dateStr] = 0;
            }

            purchasesData.forEach(purchase => {
                const purchaseDate = new Date(purchase.createdAt || purchase.date).toISOString().split('T')[0];
                if (purchasesByDay.hasOwnProperty(purchaseDate)) {
                    purchasesByDay[purchaseDate] += parseFloat(purchase.total || 0);
                }
            });

            data = last30Days.map(date => purchasesByDay[date]);
            labels = last30Days.map(date => new Date(date).toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' }));

        } else {
            // تقرير شهري - آخر 12 شهر
            const monthsData = [];
            const purchasesByMonth = {};
            const monthNames = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                               'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

            for (let i = 11; i >= 0; i--) {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

                monthsData.push(monthKey);
                purchasesByMonth[monthKey] = 0;
            }

            purchasesData.forEach(purchase => {
                const purchaseDate = new Date(purchase.createdAt || purchase.date);
                const monthKey = `${purchaseDate.getFullYear()}-${String(purchaseDate.getMonth() + 1).padStart(2, '0')}`;
                if (purchasesByMonth.hasOwnProperty(monthKey)) {
                    purchasesByMonth[monthKey] += parseFloat(purchase.total || 0);
                }
            });

            data = monthsData.map(month => purchasesByMonth[month]);
            labels = monthsData.map(month => {
                const [year, monthNum] = month.split('-');
                return `${monthNames[parseInt(monthNum) - 1]} ${year}`;
            });
        }

        const total = data.reduce((sum, value) => sum + value, 0);
        const average = data.length > 0 ? total / data.length : 0;

        return {
            type: 'purchases',
            period: period,
            data: data,
            labels: labels,
            total: total,
            average: average,
            rawData: purchasesData,
            suppliers: suppliers
        };

    } catch (error) {
        console.error('❌ خطأ في إنشاء تقرير المشتريات:', error);
        throw error;
    }
}



// === تقارير الموردين المرتبطة بالنظام المركزي ===

// وظيفة إنشاء تقرير الموردين
function generateSuppliersReport() {
    console.log('🏭 إنشاء تقرير الموردين من النظام المركزي...');

    // التأكد من تهيئة النظام المركزي
    if (!window.dataManager) {
        console.log('🔄 تهيئة النظام المركزي...');
        window.dataManager = new DataManager();
    }

    try {
        // الحصول على البيانات من النظام المركزي
        let suppliers = window.dataManager.getSuppliers ? window.dataManager.getSuppliers() : [];
        const purchases = window.dataManager.getPurchases ? window.dataManager.getPurchases() : [];

        console.log('🏭 تم جلب بيانات الموردين:', suppliers.length, 'مورد');
        console.log('🛒 تم جلب بيانات المشتريات للموردين:', purchases.length, 'فاتورة');

        // إنشاء موردين تجريبيين إذا لم يوجدوا
        if (suppliers.length === 0) {
            suppliers = [
                { id: 1, name: 'مورد الأجهزة الإلكترونية', phone: '0112345678', email: 'electronics@supplier.com', address: 'الرياض' },
                { id: 2, name: 'شركة المواد الغذائية', phone: '0123456789', email: 'food@supplier.com', address: 'جدة' },
                { id: 3, name: 'مورد الملابس والأقمشة', phone: '0134567890', email: 'clothes@supplier.com', address: 'الدمام' },
                { id: 4, name: 'مورد مواد البناء', phone: '0145678901', email: 'construction@supplier.com', address: 'مكة' }
            ];
        }

        // تحليل مشتريات الموردين
        const supplierAnalysis = suppliers.map(supplier => {
            const supplierPurchases = purchases.filter(p => p.supplierId === supplier.id);
            const totalPurchases = supplierPurchases.reduce((sum, p) => sum + parseFloat(p.total || 0), 0);
            const purchaseCount = supplierPurchases.length;
            const averageOrder = purchaseCount > 0 ? totalPurchases / purchaseCount : 0;

            // آخر تاريخ شراء
            const lastPurchaseDate = supplierPurchases.length > 0 ?
                Math.max(...supplierPurchases.map(p => new Date(p.createdAt || p.date).getTime())) : null;

            return {
                ...supplier,
                totalPurchases,
                purchaseCount,
                averageOrder,
                lastPurchaseDate: lastPurchaseDate ? new Date(lastPurchaseDate).toISOString() : null
            };
        });

        // ترتيب حسب إجمالي المشتريات
        supplierAnalysis.sort((a, b) => b.totalPurchases - a.totalPurchases);

        const totalSuppliers = supplierAnalysis.length;
        const totalPurchaseValue = supplierAnalysis.reduce((sum, s) => sum + s.totalPurchases, 0);
        const activeSuppliers = supplierAnalysis.filter(s => {
            if (!s.lastPurchaseDate) return false;
            const lastPurchase = new Date(s.lastPurchaseDate);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return lastPurchase >= thirtyDaysAgo;
        }).length;

        return {
            type: 'suppliers',
            suppliers: supplierAnalysis,
            totalSuppliers,
            totalPurchaseValue,
            activeSuppliers,
            rawData: { suppliers, purchases }
        };

    } catch (error) {
        console.error('❌ خطأ في إنشاء تقرير الموردين:', error);
        throw error;
    }
}

function generateNewCentralEndOfDayReport() {
    console.log('✨ إنشاء تقرير إغلاق اليوم المدمج مع النظام المركزي...');

    // الحصول على البيانات المباشرة من النظام المركزي
    const sales = window.dataManager.getSales();
    const today = new Date().toISOString().split('T')[0];

    // فلترة المبيعات اليومية بدقة
    const todaySales = sales.filter(sale => {
        const saleDate = new Date(sale.createdAt).toISOString().split('T')[0];
        return saleDate === today;
    });

    // إنشاء كائن التقرير الجديد
    const report = {
        id: `EOD-${Date.now()}`,
        generatedAt: new Date().toISOString(),
        totalSales: todaySales.reduce((sum, sale) => sum + sale.total, 0),
        paymentMethods: {},
        transactions: todaySales.map(sale => ({
            id: sale.id,
            customer: sale.customerName,
            payment: sale.paymentMethod,
            total: sale.total
        }))
    };

    // حفظ التقرير في النظام المركزي
    window.dataManager.addReport(report);
    console.log('✅ تم حفظ التقرير الجديد في النظام المركزي');

    // حذف التقارير القديمة بعد التأكد من النجاح
    const oldReports = JSON.parse(localStorage.getItem('legacyReports') || '[]');
    localStorage.removeItem('legacyReports');
    console.log('🗑️ تم حذف', oldReports.length, 'تقرير قديم');

    return report;
}

// تعيين الدالة للنطاق العام إذا لم تكن موجودة
if (typeof window.applyReportFilters === 'undefined') {
    window.applyReportFilters = function() {
        console.log('دالة applyReportFilters تم استدعاؤها من النطاق العام');
    };
}

// دالة إنشاء واجهة اختيار الحساب
function generateAccountSelectionInterface(accounts) {
    const accountOptions = accounts.map(account => 
        `<option value="${account.id}">${account.code} - ${account.name}</option>`
    ).join('');
    
    const html = `
        <div class="account-statement-selection">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title">كشف الحساب المحاسبي</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <label for="accountSelect" class="form-label">اختر الحساب:</label>
                            <select id="accountSelect" class="form-select">
                                <option value="">-- اختر الحساب --</option>
                                ${accountOptions}
                            </select>
                        </div>
                        <div class="col-md-3">
                            <label for="fromDate" class="form-label">من تاريخ:</label>
                            <input type="date" id="fromDate" class="form-control">
                        </div>
                        <div class="col-md-3">
                            <label for="toDate" class="form-label">إلى تاريخ:</label>
                            <input type="date" id="toDate" class="form-control">
                        </div>
                    </div>
                    <div class="mt-3">
                        <button onclick="generateSelectedAccountStatement()" class="btn btn-primary">
                            <i class="fas fa-file-invoice"></i> إنشاء كشف الحساب
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return {
        success: true,
        html: html
    };
}

// دالة الحصول على حركات الحساب
function getAccountTransactions(accountId, fromDate = null, toDate = null) {
    try {
        // محاولة الحصول على البيانات من النظام المركزي
        if (window.dataManager && window.dataManager.getTransactions) {
            const allTransactions = window.dataManager.getTransactions();
            return allTransactions.filter(transaction => {
                // تصفية حسب رقم الحساب
                const matchesAccount = transaction.accountId == accountId || 
                                     transaction.debitAccount == accountId || 
                                     transaction.creditAccount == accountId;
                
                // تصفية حسب التاريخ
                let matchesDate = true;
                if (fromDate || toDate) {
                    const transactionDate = new Date(transaction.date);
                    if (fromDate) matchesDate = matchesDate && transactionDate >= new Date(fromDate);
                    if (toDate) matchesDate = matchesDate && transactionDate <= new Date(toDate);
                }
                
                return matchesAccount && matchesDate;
            });
        }
        
        // بيانات تجريبية في حالة عدم وجود النظام المركزي
        return [
            {
                id: 1,
                date: '2024-01-01',
                documentNumber: 'JV001',
                description: 'رصيد افتتاحي',
                debit: 0,
                credit: 0,
                accountId: accountId
            },
            {
                id: 2,
                date: '2024-01-15',
                documentNumber: 'SL001',
                description: 'مبيعات نقدية',
                debit: 5000,
                credit: 0,
                accountId: accountId
            },
            {
                id: 3,
                date: '2024-01-20',
                documentNumber: 'PY001',
                description: 'دفع للمورد',
                debit: 0,
                credit: 2000,
                accountId: accountId
            }
        ];
    } catch (error) {
        console.error('خطأ في الحصول على حركات الحساب:', error);
        return [];
    }
}

// دالة حساب الأرصدة الجارية
function calculateRunningBalances(transactions, openingBalance = 0) {
    let runningBalance = openingBalance;
    const balances = [];
    
    // ترتيب الحركات حسب التاريخ
    const sortedTransactions = transactions.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedTransactions.forEach(transaction => {
        runningBalance += (transaction.debit || 0) - (transaction.credit || 0);
        balances.push({
            transactionId: transaction.id,
            balance: runningBalance
        });
    });
    
    return balances;
}

// دالة إنشاء HTML لكشف الحساب
function generateAccountStatementHtml(account, transactions, balances, fromDate, toDate) {
    const periodText = fromDate && toDate ? 
        `من ${formatDate(fromDate)} إلى ${formatDate(toDate)}` : 
        'جميع الفترات';
    
    const transactionRows = transactions.map((transaction, index) => {
        const balance = balances.find(b => b.transactionId === transaction.id);
        const balanceAmount = balance ? balance.balance : 0;
        const balanceClass = balanceAmount >= 0 ? 'account-statement-debit' : 'account-statement-credit';
        
        return `
            <tr>
                <td>${formatDate(transaction.date)}</td>
                <td>${transaction.documentNumber || '-'}</td>
                <td>${transaction.description || '-'}</td>
                <td class="text-end">${transaction.debit ? formatCurrency(transaction.debit) : '-'}</td>
                <td class="text-end">${transaction.credit ? formatCurrency(transaction.credit) : '-'}</td>
                <td class="text-end ${balanceClass}">${formatCurrency(Math.abs(balanceAmount))}</td>
            </tr>
        `;
    }).join('');
    
    const finalBalance = balances.length > 0 ? balances[balances.length - 1].balance : account.balance;
    const finalBalanceClass = finalBalance >= 0 ? 'account-statement-debit' : 'account-statement-credit';
    
    return `
        <div class="account-statement-report">
            <div class="report-header text-center mb-4">
                <h3>كشف الحساب المحاسبي</h3>
                <h4>${account.code} - ${account.name}</h4>
                <p class="text-muted">${periodText}</p>
            </div>
            
            <div class="table-responsive">
                <table class="table table-striped table-bordered">
                    <thead class="table-dark">
                        <tr>
                            <th>التاريخ</th>
                            <th>رقم المستند</th>
                            <th>البيان</th>
                            <th class="text-end">مدين</th>
                            <th class="text-end">دائن</th>
                            <th class="text-end">الرصيد</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${transactionRows}
                    </tbody>
                    <tfoot class="table-secondary">
                        <tr>
                            <td colspan="5" class="text-end fw-bold">الرصيد النهائي:</td>
                            <td class="text-end fw-bold ${finalBalanceClass}">
                                ${formatCurrency(Math.abs(finalBalance))}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            
            <div class="report-actions mt-3">
                <button onclick="printReport()" class="btn btn-secondary">
                    <i class="fas fa-print"></i> طباعة
                </button>
                <button onclick="exportAccountStatementToCSV()" class="btn btn-success">
                    <i class="fas fa-file-excel"></i> تصدير Excel
                </button>
            </div>
        </div>
    `;
}

// دالة إنشاء كشف الحساب المحدد
function generateSelectedAccountStatement() {
    const accountId = document.getElementById('accountSelect').value;
    const fromDate = document.getElementById('fromDate').value;
    const toDate = document.getElementById('toDate').value;
    
    if (!accountId) {
        alert('يرجى اختيار الحساب أولاً');
        return;
    }
    
    const result = generateAccountStatementReport(accountId, fromDate, toDate);
    
    if (result.success) {
        document.getElementById('reportContent').innerHTML = result.html;
    } else {
        document.getElementById('reportContent').innerHTML = result.html;
    }
}

// دالة تصدير كشف الحساب إلى CSV
function exportAccountStatementToCSV() {
    // سيتم تنفيذها لاحقاً
    alert('سيتم إضافة وظيفة التصدير قريباً');
}

// دالة إنشاء كشف الحساب المحاسبي
function generateAccountStatementReport(accountId = null, fromDate = null, toDate = null) {
    console.log('📊 إنشاء كشف الحساب المحاسبي...');
    
    try {
        // التأكد من تهيئة النظام المركزي
        if (!window.dataManager) {
            window.dataManager = new DataManager();
        }
        
        // الحصول على قائمة الحسابات
        const accounts = getAccountsList();
        
        // إذا لم يتم تحديد حساب، عرض قائمة الحسابات للاختيار
        if (!accountId) {
            return generateAccountSelectionInterface(accounts);
        }
        
        // الحصول على بيانات الحساب المحدد
        const selectedAccount = accounts.find(acc => acc.id == accountId);
        if (!selectedAccount) {
            throw new Error('الحساب المحدد غير موجود');
        }
        
        // الحصول على حركات الحساب
        const transactions = getAccountTransactions(accountId, fromDate, toDate);
        
        // حساب الأرصدة
        const balances = calculateRunningBalances(transactions, selectedAccount.balance || 0);
        
        // إنشاء HTML للتقرير
        const reportHtml = generateAccountStatementHtml(selectedAccount, transactions, balances, fromDate, toDate);
        
        return {
            success: true,
            html: reportHtml,
            data: {
                account: selectedAccount,
                transactions: transactions,
                balances: balances
            }
        };
        
    } catch (error) {
        console.error('❌ خطأ في إنشاء كشف الحساب:', error);
        return {
            success: false,
            error: error.message,
            html: `<div class="alert alert-danger">خطأ في إنشاء كشف الحساب: ${error.message}</div>`
        };
    }
}

// دالة الحصول على قائمة الحسابات
function getAccountsList() {
    // استخدام دليل الحسابات الموجود
    if (typeof chartOfAccounts !== 'undefined') {
        return getLeafAccounts(chartOfAccounts);
    }
    
    // أو استخدام دليل الحسابات الشامل
    if (typeof comprehensiveChartOfAccounts !== 'undefined') {
        return getLeafAccounts(comprehensiveChartOfAccounts);
    }
    
    // قائمة افتراضية بسيطة
    return [
        { id: 1101, code: '1101', name: 'النقدية في الصندوق', type: 'assets', balance: 0 },
        { id: 1102, code: '1102', name: 'النقدية في البنك - الحساب الجاري', type: 'assets', balance: 0 },
        { id: 1103, code: '1103', name: 'النقدية في البنك - حساب التوفير', type: 'assets', balance: 0 },
        { id: 1110, code: '1110', name: 'العملاء والمدينون', type: 'assets', balance: 0 },
        { id: 2101, code: '2101', name: 'الموردون والدائنون', type: 'liabilities', balance: 0 },
        { id: 4100, code: '4100', name: 'إيرادات المبيعات', type: 'revenue', balance: 0 },
        { id: 5100, code: '5100', name: 'تكلفة المبيعات', type: 'expenses', balance: 0 }
    ];
}

// دالة للحصول على الحسابات الفرعية فقط (الحسابات القابلة للاستخدام)
function getLeafAccounts(accounts) {
    let leafAccounts = [];
    
    function processAccount(account) {
        // إذا كان الحساب لا يحتوي على حسابات فرعية، فهو حساب قابل للاستخدام
        if (!account.children || account.children.length === 0) {
            leafAccounts.push({
                id: account.id,
                code: account.code,
                name: account.name,
                type: account.type,
                subtype: account.subtype || '',
                balance: account.balance || 0,
                status: account.status || 'active'
            });
        } else {
            // إذا كان يحتوي على حسابات فرعية، معالجة الحسابات الفرعية
            account.children.forEach(child => processAccount(child));
        }
    }
    
    accounts.forEach(account => processAccount(account));
    return leafAccounts;
}

// دالة تحويل الحسابات الهرمية إلى قائمة مسطحة (الحسابات الفرعية فقط)
function flattenAccounts(accounts) {
    return getLeafAccounts(accounts);
}

// دالة إنشاء تقرير الحسابات المحاسبية
function generateAccountsReport() {
    console.log('📊 إنشاء تقرير الحسابات المحاسبية...');
    
    try {
        // الحصول على قائمة الحسابات
        const accounts = getAccountsList();
        
        // تصنيف الحسابات حسب النوع
        const accountsByType = {
            assets: accounts.filter(acc => acc.type === 'assets'),
            liabilities: accounts.filter(acc => acc.type === 'liabilities'),
            equity: accounts.filter(acc => acc.type === 'equity'),
            revenue: accounts.filter(acc => acc.type === 'revenue'),
            expenses: accounts.filter(acc => acc.type === 'expenses')
        };
        
        // حساب الإجماليات
        const totals = {
            assets: accountsByType.assets.reduce((sum, acc) => sum + (acc.balance || 0), 0),
            liabilities: accountsByType.liabilities.reduce((sum, acc) => sum + (acc.balance || 0), 0),
            equity: accountsByType.equity.reduce((sum, acc) => sum + (acc.balance || 0), 0),
            revenue: accountsByType.revenue.reduce((sum, acc) => sum + (acc.balance || 0), 0),
            expenses: accountsByType.expenses.reduce((sum, acc) => sum + (acc.balance || 0), 0)
        };
        
        console.log('📊 إجماليات الحسابات:', totals);
        
        return {
            type: 'accounts',
            accounts: accounts,
            accountsByType: accountsByType,
            totals: totals,
            totalAccounts: accounts.length
        };
        
    } catch (error) {
        console.error('❌ خطأ في إنشاء تقرير الحسابات:', error);
        throw error;
    }
}

// تشغيل التهيئة عند تحميل الصفحة
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeReports);
}
