// نظام إدارة البيانات المركزي - ربط جميع الأقسام
// هذا الملف يدير الربط بين المبيعات والمشتريات والمخزون والعملاء والموردين

class DataManager {
    constructor() {
        this.initializeData();
        this.setupEventListeners();
        this.setupAutoBackup();
    }

    // تهيئة البيانات الأساسية
    initializeData() {
        // فحص واستعادة البيانات أولاً
        this.checkAndRestoreData();

        // تهيئة المنتجات الأساسية إذا لم تكن موجودة
        if (!localStorage.getItem('monjizProducts')) {
            const defaultProducts = [
                {
                    id: 1,
                    name: 'أرز بسمتي - كيس 5 كيلو',
                    barcode: 'RICE-BASMATI-5KG',
                    category: 'مواد غذائية',
                    purchasePrice: 35.00,
                    salePrice: 50.00,
                    quantity: 100,
                    minQuantity: 20,
                    status: 'active',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'سكر أبيض - كيس 2 كيلو',
                    barcode: 'SUGAR-WHITE-2KG',
                    category: 'مواد غذائية',
                    purchasePrice: 18.00,
                    salePrice: 25.00,
                    quantity: 80,
                    minQuantity: 15,
                    status: 'active',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    name: 'زيت طبخ - عبوة 1 لتر',
                    barcode: 'OIL-COOK-1L',
                    category: 'مواد غذائية',
                    purchasePrice: 12.00,
                    salePrice: 15.00,
                    quantity: 60,
                    minQuantity: 10,
                    status: 'active',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    name: 'لابتوب Dell',
                    barcode: 'LAPTOP-DELL-001',
                    category: 'إلكترونيات',
                    purchasePrice: 1800.00,
                    salePrice: 2000.00,
                    quantity: 5,
                    minQuantity: 2,
                    status: 'active',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveProducts(defaultProducts);
        }

        // تهيئة العملاء الأساسيين
        if (!localStorage.getItem('monjizCustomers')) {
            const defaultCustomers = [
                {
                    id: 1,
                    name: 'أحمد محمد',
                    phone: '0501234567',
                    email: 'ahmed@example.com',
                    address: 'الرياض، المملكة العربية السعودية',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveCustomers(defaultCustomers);
        }

        // تهيئة الموردين الأساسيين
        if (!localStorage.getItem('monjizSuppliers')) {
            const defaultSuppliers = [
                {
                    id: 1,
                    name: 'شركة الأغذية المتحدة',
                    phone: '0112345678',
                    email: 'info@foodunited.com',
                    type: 'مواد غذائية',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveSuppliers(defaultSuppliers);
        }

        // تهيئة الفئات الأساسية
        if (!localStorage.getItem('monjizCategories')) {
            const defaultCategories = [
                {
                    id: 1,
                    name: 'مواد غذائية',
                    code: 'food',
                    description: 'المواد الغذائية والمشروبات',
                    color: '#28a745',
                    icon: 'fas fa-utensils',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    name: 'مواد نظافة',
                    code: 'cleaning',
                    description: 'مواد التنظيف والنظافة',
                    color: '#17a2b8',
                    icon: 'fas fa-broom',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    name: 'مجمدات',
                    code: 'frozen',
                    description: 'المنتجات المجمدة',
                    color: '#6f42c1',
                    icon: 'fas fa-snowflake',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    name: 'مواد تعبئة',
                    code: 'packaging',
                    description: 'مواد التعبئة والتغليف',
                    color: '#fd7e14',
                    icon: 'fas fa-box',
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveCategories(defaultCategories);
        }

        // تهيئة المبيعات والمشتريات
        if (!localStorage.getItem('monjizSales')) {
            localStorage.setItem('monjizSales', JSON.stringify([]));
        }
        if (!localStorage.getItem('monjizPurchases')) {
            localStorage.setItem('monjizPurchases', JSON.stringify([]));
        }
    }

    // إعداد مستمعي الأحداث للتحديثات
    setupEventListeners() {
        // مراقبة تغييرات localStorage
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('monjiz')) {
                this.notifyPageUpdate(e.key);
            }
        });
    }

    // === إدارة المنتجات ===
    getProducts() {
        const products = JSON.parse(localStorage.getItem('monjizProducts')) || [];

        // تحديث المنتجات بالخصائص المفقودة
        let needsUpdate = false;
        const updatedProducts = products.map(product => {
            const updated = { ...product };

            // إضافة salePrice إذا كان مفقوداً
            if (!updated.salePrice && !updated.price) {
                const purchasePrice = parseFloat(updated.purchasePrice || updated.cost) || 0;
                updated.salePrice = purchasePrice > 0 ? purchasePrice * 1.2 : 100;
                needsUpdate = true;
            }

            // إضافة minQuantity إذا كان مفقوداً
            if (!updated.minQuantity && !updated.minStock) {
                updated.minQuantity = 5;
                needsUpdate = true;
            }

            // إضافة category إذا كان مفقوداً
            if (!updated.category) {
                updated.category = 'عام';
                needsUpdate = true;
            }

            return updated;
        });

        // حفظ التحديثات إذا لزم الأمر
        if (needsUpdate) {
            console.log('🔧 تحديث المنتجات بالخصائص المفقودة...');
            localStorage.setItem('monjizProducts', JSON.stringify(updatedProducts));
            this.notifyPageUpdate('monjizProducts');
            console.log('✅ تم حفظ التحديثات بشكل دائم');
            return updatedProducts;
        }

        return products;
    }

    saveProducts(products) {
        console.log('💾 حفظ المنتجات:', products.length, 'منتج');
        localStorage.setItem('monjizProducts', JSON.stringify(products));
        this.notifyPageUpdate('monjizProducts');
        console.log('✅ تم حفظ المنتجات في localStorage');
    }

    addProduct(product) {
        const products = this.getProducts();
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        const newProduct = {
            ...product,
            id: newId,
            createdAt: new Date().toISOString(),
            // إضافة الخصائص المفقودة بقيم افتراضية
            salePrice: product.salePrice || product.price || (product.purchasePrice ? product.purchasePrice * 1.2 : 100),
            minQuantity: product.minQuantity || product.minStock || 5,
            category: product.category || 'عام',
            status: product.status || 'active'
        };
        products.push(newProduct);
        this.saveProducts(products);
        return newProduct;
    }

    updateProduct(productId, updates) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            this.saveProducts(products);
            return products[index];
        }
        return null;
    }

    // تحديث كمية المنتج مع تسجيل الحركة
    updateProductQuantity(productId, quantityChange, operation = 'add', reference = '', referenceType = 'manual') {
        console.log(`🔄 محاولة تحديث المخزون: productId=${productId}, quantityChange=${quantityChange}, operation=${operation}`);

        const products = this.getProducts();
        console.log(`📦 عدد المنتجات الموجودة: ${products.length}`);
        console.log(`🔍 البحث عن منتج بـ ID: ${productId} (نوع: ${typeof productId})`);

        // البحث بطرق مختلفة للتأكد
        let product = products.find(p => p.id === productId);
        if (!product) {
            product = products.find(p => p.id == productId); // مقارنة مرنة
        }
        if (!product) {
            product = products.find(p => String(p.id) === String(productId)); // تحويل للنص
        }

        console.log(`🎯 المنتج الموجود:`, product);

        if (product) {
            const oldQuantity = parseFloat(product.quantity) || 0;
            const changeAmount = parseFloat(quantityChange) || 0;

            console.log(`📊 تفاصيل التحديث: oldQuantity=${oldQuantity}, changeAmount=${changeAmount}, operation=${operation}`);

            if (operation === 'add') {
                product.quantity = oldQuantity + changeAmount;
            } else if (operation === 'subtract') {
                product.quantity = Math.max(0, oldQuantity - changeAmount);
            }

            console.log(`📊 النتيجة: ${oldQuantity} → ${product.quantity}`);

            // تسجيل حركة المخزون
            this.addStockMovement({
                productId: productId,
                productName: product.name,
                productCode: product.code || product.id,
                movementType: operation === 'add' ? 'in' : 'out',
                quantity: quantityChange,
                oldQuantity: oldQuantity,
                newQuantity: product.quantity,
                reference: reference,
                referenceType: referenceType, // sale, purchase, adjustment, manual
                date: new Date().toLocaleDateString('ar-SA'),
                time: new Date().toLocaleTimeString('ar-SA'),
                createdAt: new Date().toISOString()
            });

            this.saveProducts(products);
            console.log(`✅ تم تحديث كمية المنتج ${product.name}: ${oldQuantity} → ${product.quantity}`);
            return product;
        } else {
            console.error(`❌ لم يتم العثور على منتج بـ ID: ${productId}`);
            console.log('📋 قائمة المنتجات المتاحة:', products.map(p => ({ id: p.id, name: p.name, type: typeof p.id })));
            return null;
        }
    }

    // إضافة حركة مخزون
    addStockMovement(movement) {
        const movements = this.getStockMovements();
        const newId = Math.max(...movements.map(m => m.id), 0) + 1;
        const newMovement = {
            ...movement,
            id: newId,
            createdAt: movement.createdAt || new Date().toISOString()
        };

        movements.push(newMovement);
        this.saveStockMovements(movements);
        return newMovement;
    }

    // الحصول على حركات المخزون
    getStockMovements() {
        return JSON.parse(localStorage.getItem('monjizStockMovements')) || [];
    }

    // حفظ حركات المخزون
    saveStockMovements(movements) {
        localStorage.setItem('monjizStockMovements', JSON.stringify(movements));
        this.notifyPageUpdate('monjizStockMovements');
    }

    // ===== إدارة الحسابات =====

    // الحصول على الحسابات
    getAccounts() {
        return JSON.parse(localStorage.getItem('monjizAccounts')) ||
               JSON.parse(localStorage.getItem('chartOfAccounts')) || [];
    }

    // حفظ الحسابات
    saveAccounts(accounts) {
        localStorage.setItem('monjizAccounts', JSON.stringify(accounts));
        localStorage.setItem('chartOfAccounts', JSON.stringify(accounts));
        this.notifyPageUpdate('monjizAccounts');
        this.notifyPageUpdate('chartOfAccounts');
    }

    // إضافة حساب جديد
    addAccount(account) {
        const accounts = this.getAccounts();

        // التحقق من عدم تكرار رقم الحساب
        if (accounts.some(a => a.code === account.code)) {
            console.error('رقم الحساب موجود بالفعل:', account.code);
            return null;
        }

        // إنشاء ID جديد
        const newId = Math.max(...accounts.map(a => a.id), 0) + 1;

        // إنشاء الحساب الجديد
        const newAccount = {
            ...account,
            id: newId,
            createdAt: account.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: account.isActive !== false
        };

        // إضافة الحساب
        accounts.push(newAccount);

        // حفظ الحسابات
        this.saveAccounts(accounts);

        console.log('✅ تم إضافة حساب جديد:', newAccount.code, '-', newAccount.name);
        return newAccount;
    }

    // تحديث حساب موجود
    updateAccount(accountCode, updates) {
        const accounts = this.getAccounts();
        const accountIndex = accounts.findIndex(a => a.code === accountCode);

        if (accountIndex === -1) {
            console.error('الحساب غير موجود:', accountCode);
            return null;
        }

        // تحديث الحساب
        accounts[accountIndex] = {
            ...accounts[accountIndex],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        // حفظ الحسابات
        this.saveAccounts(accounts);

        console.log('✅ تم تحديث الحساب:', accountCode);
        return accounts[accountIndex];
    }

    // حذف حساب
    deleteAccount(accountCode) {
        const accounts = this.getAccounts();
        const filteredAccounts = accounts.filter(a => a.code !== accountCode);

        if (filteredAccounts.length === accounts.length) {
            console.error('الحساب غير موجود:', accountCode);
            return false;
        }

        // حفظ الحسابات بعد الحذف
        this.saveAccounts(filteredAccounts);

        console.log('✅ تم حذف الحساب:', accountCode);
        return true;
    }

    // === إدارة المبيعات ===
    getSales() {
        // البحث في كلا المفتاحين للتوافق
        const sales = JSON.parse(localStorage.getItem('monjizSales')) || [];
        const invoices = JSON.parse(localStorage.getItem('monjizInvoices')) || [];

        // دمج البيانات من المفتاحين
        const allSales = [...sales, ...invoices];

        // إزالة المكررات بناءً على ID
        const uniqueSales = allSales.filter((sale, index, self) =>
            index === self.findIndex(s => s.id === sale.id)
        );

        return uniqueSales;
    }

    saveSales(sales) {
        console.log('💾 حفظ الفواتير في localStorage...');
        console.log('📊 عدد الفواتير للحفظ:', sales.length);

        try {
            // حفظ في كلا المفتاحين للتوافق
            const salesData = JSON.stringify(sales);
            localStorage.setItem('monjizSales', salesData);
            localStorage.setItem('monjizInvoices', salesData);

            console.log('✅ تم حفظ البيانات في localStorage');

            // التحقق من الحفظ
            const savedSales = JSON.parse(localStorage.getItem('monjizSales')) || [];
            const savedInvoices = JSON.parse(localStorage.getItem('monjizInvoices')) || [];

            console.log('🔍 التحقق من الحفظ:');
            console.log('   - monjizSales:', savedSales.length);
            console.log('   - monjizInvoices:', savedInvoices.length);

            this.notifyPageUpdate('monjizSales');
            this.notifyPageUpdate('monjizInvoices');

        } catch (error) {
            console.error('❌ خطأ في حفظ الفواتير:', error);
            throw error;
        }
    }

    addSale(sale) {
        console.log('🔄 بدء حفظ الفاتورة في النظام المركزي...');
        console.log('📝 بيانات الفاتورة الواردة:', sale);

        try {
            const sales = this.getSales();
            console.log('📊 عدد الفواتير الحالية:', sales.length);

            // استخدام ID الموجود أو إنشاء جديد
            const newSale = {
                ...sale,
                createdAt: sale.createdAt || new Date().toISOString()
            };

            console.log('✅ تم إنشاء الفاتورة الجديدة:', newSale);

            // تحديث المخزون (تقليل الكميات) - مع معالجة الأخطاء
            if (sale.products && sale.products.length > 0) {
                console.log('🔄 تحديث المخزون...');

                sale.products.forEach((product, index) => {
                    console.log(`📦 معالجة المنتج ${index + 1}:`, product);

                    try {
                        // التحقق من وجود productId
                        const productId = product.productId || product.id;
                        if (!productId) {
                            console.warn(`⚠️ لا يوجد معرف للمنتج ${index + 1}`);
                            return;
                        }

                        this.updateProductQuantity(
                            productId,
                            product.quantity,
                            'subtract',
                            `فاتورة مبيعات ${newSale.id}`,
                            'sale'
                        );

                        console.log(`✅ تم تحديث مخزون المنتج ${productId}`);
                    } catch (error) {
                        console.error(`❌ خطأ في تحديث مخزون المنتج ${index + 1}:`, error);
                        // لا نوقف العملية، نكمل الحفظ
                    }
                });
            } else {
                console.log('ℹ️ لا توجد منتجات لتحديث المخزون');
            }

            // حفظ الفاتورة
            sales.push(newSale);
            this.saveSales(sales);

            console.log('✅ تم حفظ الفاتورة في النظام المركزي بنجاح:', newSale.id);
            console.log('📊 إجمالي الفواتير بعد الحفظ:', sales.length);

            return newSale;

        } catch (error) {
            console.error('❌ خطأ في حفظ الفاتورة:', error);
            throw error;
        }
    }

    // حذف فاتورة مبيعات
    deleteSale(saleId) {
        try {
            console.log('🗑️ محاولة حذف فاتورة المبيعات:', saleId);
            const sales = this.getSales();
            const saleIndex = sales.findIndex(s => s.id === saleId);

            if (saleIndex === -1) {
                console.error(`❌ فاتورة المبيعات ${saleId} غير موجودة`);
                return false;
            }

            const deletedSale = sales[saleIndex];

            // إرجاع المنتجات للمخزون (زيادة الكميات)
            if (deletedSale.products && Array.isArray(deletedSale.products)) {
                deletedSale.products.forEach(product => {
                    try {
                        this.updateProductQuantity(
                            product.productId,
                            product.quantity,
                            'add',
                            `حذف فاتورة مبيعات ${saleId}`,
                            'sale_delete'
                        );
                    } catch (error) {
                        console.warn(`تحذير: فشل في إرجاع المنتج ${product.productId} للمخزون:`, error.message);
                    }
                });
            }

            // حذف الفاتورة من المصفوفة
            sales.splice(saleIndex, 1);
            this.saveSales(sales);

            console.log('✅ تم حذف فاتورة المبيعات بنجاح:', saleId);
            return true;

        } catch (error) {
            console.error('❌ خطأ في حذف فاتورة المبيعات:', error);
            return false;
        }
    }

    // === إدارة المشتريات ===
    getPurchases() {
        return JSON.parse(localStorage.getItem('monjizPurchases')) || [];
    }

    savePurchases(purchases) {
        localStorage.setItem('monjizPurchases', JSON.stringify(purchases));
        this.notifyPageUpdate('monjizPurchases');
    }

    addPurchase(purchase) {
        try {
            const purchases = this.getPurchases();

            // إنشاء معرف جديد
            let newId;
            if (purchase.id && !purchases.find(p => p.id === purchase.id)) {
                // استخدام المعرف الموجود إذا لم يكن مكرراً
                newId = purchase.id;
            } else {
                // إنشاء معرف جديد
                const maxId = purchases.length > 0 ? Math.max(...purchases.map(p => {
                    if (typeof p.id === 'string' && p.id.startsWith('PUR-')) {
                        return parseInt(p.id.split('-')[1]) || 0;
                    }
                    return typeof p.id === 'number' ? p.id : 0;
                })) : 0;
                newId = `PUR-${String(maxId + 1).padStart(3, '0')}`;
            }

            const newPurchase = {
                ...purchase,
                id: newId,
                createdAt: purchase.createdAt || new Date().toISOString(),
                date: purchase.date || new Date().toISOString().split('T')[0]
            };

            // تحديث المخزون (زيادة الكميات)
            if (purchase.items && Array.isArray(purchase.items)) {
                purchase.items.forEach(item => {
                    try {
                        this.updateProductQuantity(
                            item.productId,
                            item.quantity,
                            'add',
                            `فاتورة مشتريات ${newPurchase.id}`,
                            'purchase'
                        );
                    } catch (error) {
                        console.warn(`تحذير: فشل في تحديث مخزون المنتج ${item.productId}:`, error.message);
                    }
                });
            }

            purchases.push(newPurchase);
            this.savePurchases(purchases);

            console.log('✅ تم إضافة فاتورة الشراء بنجاح:', newPurchase.id);
            return newPurchase;

        } catch (error) {
            console.error('❌ خطأ في إضافة فاتورة الشراء:', error);
            throw error;
        }
    }

    updatePurchase(purchaseId, updatedData) {
        try {
            const purchases = this.getPurchases();
            const purchaseIndex = purchases.findIndex(p => p.id === purchaseId);

            if (purchaseIndex === -1) {
                throw new Error(`فاتورة الشراء ${purchaseId} غير موجودة`);
            }

            purchases[purchaseIndex] = { ...purchases[purchaseIndex], ...updatedData };
            this.savePurchases(purchases);

            console.log('✅ تم تحديث فاتورة الشراء بنجاح:', purchaseId);
            return true;

        } catch (error) {
            console.error('❌ خطأ في تحديث فاتورة الشراء:', error);
            throw error;
        }
    }

    deletePurchase(purchaseId) {
        try {
            const purchases = this.getPurchases();
            const purchaseIndex = purchases.findIndex(p => p.id === purchaseId);

            if (purchaseIndex === -1) {
                throw new Error(`فاتورة الشراء ${purchaseId} غير موجودة`);
            }

            const deletedPurchase = purchases[purchaseIndex];

            // إرجاع المنتجات للمخزون (تقليل الكميات)
            if (deletedPurchase.items && Array.isArray(deletedPurchase.items)) {
                deletedPurchase.items.forEach(item => {
                    try {
                        this.updateProductQuantity(
                            item.productId,
                            -item.quantity,
                            'subtract',
                            `حذف فاتورة مشتريات ${purchaseId}`,
                            'purchase_delete'
                        );
                    } catch (error) {
                        console.warn(`تحذير: فشل في إرجاع المنتج ${item.productId} للمخزون:`, error.message);
                    }
                });
            }

            purchases.splice(purchaseIndex, 1);
            this.savePurchases(purchases);

            console.log('✅ تم حذف فاتورة الشراء بنجاح:', purchaseId);
            return true;

        } catch (error) {
            console.error('❌ خطأ في حذف فاتورة الشراء:', error);
            throw error;
        }
    }

    // مسح جميع بيانات المشتريات
    clearAllPurchases() {
        console.log('🗑️ مسح جميع بيانات المشتريات...');
        localStorage.removeItem('monjizPurchases');
        console.log('✅ تم مسح جميع بيانات المشتريات');
    }

    // مسح جميع بيانات المبيعات
    clearAllSales() {
        console.log('🗑️ مسح جميع بيانات المبيعات...');
        localStorage.removeItem('monjizSales');
        localStorage.removeItem('monjizInvoices');
        console.log('✅ تم مسح جميع بيانات المبيعات');
    }

    // مسح جميع البيانات التجريبية يدوياً
    clearAllTestDataManually() {
        console.log('🧹 مسح جميع البيانات التجريبية يدوياً...');
        localStorage.removeItem('monjizSales');
        localStorage.removeItem('monjizInvoices');
        localStorage.removeItem('monjizPurchases');
        console.log('✅ تم مسح جميع البيانات التجريبية');

        // إعادة تحميل الصفحة لتطبيق التغييرات
        if (typeof location !== 'undefined') {
            location.reload();
        }
    }

    // === إدارة العملاء ===
    getCustomers() {
        return JSON.parse(localStorage.getItem('monjizCustomers')) || [];
    }

    saveCustomers(customers) {
        localStorage.setItem('monjizCustomers', JSON.stringify(customers));
        this.notifyPageUpdate('monjizCustomers');
    }

    addCustomer(customer) {
        const customers = this.getCustomers();
        const newId = Math.max(...customers.map(c => c.id), 0) + 1;
        const newCustomer = {
            ...customer,
            id: newId,
            createdAt: new Date().toISOString()
        };
        customers.push(newCustomer);
        this.saveCustomers(customers);

        // إضافة حساب العميل تلقائياً في دليل الحسابات
        this.addCustomerAccount(newCustomer);
        console.log(`تم إضافة حساب العميل "${newCustomer.name}" في دليل الحسابات`);

        // إرسال إشعار للواجهات
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('customerAdded', { detail: newCustomer }));
            document.dispatchEvent(new CustomEvent('accountsUpdated', { detail: { type: 'customer', data: newCustomer } }));
        }, 100);

        return newCustomer;
    }

    // === إدارة الموردين ===
    getSuppliers() {
        return JSON.parse(localStorage.getItem('monjizSuppliers')) || [];
    }

    saveSuppliers(suppliers) {
        localStorage.setItem('monjizSuppliers', JSON.stringify(suppliers));
        this.notifyPageUpdate('monjizSuppliers');
    }

    addSupplier(supplier) {
        const suppliers = this.getSuppliers();
        const newId = Math.max(...suppliers.map(s => s.id), 0) + 1;
        const newSupplier = {
            ...supplier,
            id: newId,
            createdAt: new Date().toISOString()
        };
        suppliers.push(newSupplier);
        this.saveSuppliers(suppliers);

        // إضافة حساب المورد تلقائياً في دليل الحسابات
        this.addSupplierAccount(newSupplier);
        console.log(`تم إضافة حساب المورد "${newSupplier.name}" في دليل الحسابات`);

        // إرسال إشعار للواجهات
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent('supplierAdded', { detail: newSupplier }));
            document.dispatchEvent(new CustomEvent('accountsUpdated', { detail: { type: 'supplier', data: newSupplier } }));
        }, 100);

        return newSupplier;
    }

    updateSupplier(supplierId, updates) {
        const suppliers = this.getSuppliers();
        const index = suppliers.findIndex(s => s.id === supplierId);
        if (index !== -1) {
            suppliers[index] = { ...suppliers[index], ...updates, updatedAt: new Date().toISOString() };
            this.saveSuppliers(suppliers);
            return suppliers[index];
        }
        return null;
    }

    // === إدارة الفئات ===
    getCategories() {
        return JSON.parse(localStorage.getItem('monjizCategories')) || [];
    }

    saveCategories(categories) {
        localStorage.setItem('monjizCategories', JSON.stringify(categories));
        this.notifyPageUpdate('monjizCategories');
    }

    addCategory(category) {
        const categories = this.getCategories();
        const newId = Math.max(...categories.map(c => c.id), 0) + 1;
        const newCategory = {
            ...category,
            id: newId,
            createdAt: new Date().toISOString()
        };
        categories.push(newCategory);
        this.saveCategories(categories);
        return newCategory;
    }

    updateCategory(categoryId, updates) {
        const categories = this.getCategories();
        const index = categories.findIndex(c => c.id === categoryId);
        if (index !== -1) {
            categories[index] = { ...categories[index], ...updates };
            this.saveCategories(categories);
            return categories[index];
        }
        return null;
    }

    deleteCategory(categoryId) {
        const categories = this.getCategories();
        const index = categories.findIndex(c => c.id === categoryId);
        if (index !== -1) {
            const deletedCategory = categories.splice(index, 1)[0];
            this.saveCategories(categories);
            return deletedCategory;
        }
        return null;
    }

    // === إشعار الصفحات بالتحديثات ===
    notifyPageUpdate(dataType) {
        // إرسال حدث مخصص للصفحات الأخرى
        console.log(`📢 إشعار تحديث البيانات: ${dataType}`);
        const event = new CustomEvent('monjizDataUpdate', {
            detail: { dataType, timestamp: new Date().toISOString() }
        });
        window.dispatchEvent(event);

        // إشعار خاص لتحديث تقارير المخزون
        if (dataType === 'monjizProducts') {
            const inventoryEvent = new CustomEvent('inventoryUpdated', {
                detail: { timestamp: new Date().toISOString() }
            });
            window.dispatchEvent(inventoryEvent);
            console.log('📦 إشعار تحديث المخزون تم إرساله');
        }
    }

    // === تقارير وإحصائيات ===
    getInventoryReport() {
        const products = this.getProducts();
        return {
            totalProducts: products.length,
            lowStockProducts: products.filter(p => p.quantity <= p.minQuantity),
            totalValue: products.reduce((sum, p) => sum + (p.quantity * p.salePrice), 0),
            outOfStockProducts: products.filter(p => p.quantity === 0)
        };
    }

    getSalesReport(startDate, endDate) {
        const sales = this.getSales();
        const filteredSales = sales.filter(sale => {
            const saleDate = new Date(sale.createdAt);
            return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
        });
        
        return {
            totalSales: filteredSales.length,
            totalRevenue: filteredSales.reduce((sum, sale) => sum + sale.total, 0),
            averageSale: filteredSales.length > 0 ? 
                filteredSales.reduce((sum, sale) => sum + sale.total, 0) / filteredSales.length : 0
        };
    }

    getPurchasesReport(startDate, endDate) {
        const purchases = this.getPurchases();
        const filteredPurchases = purchases.filter(purchase => {
            const purchaseDate = new Date(purchase.createdAt);
            return purchaseDate >= new Date(startDate) && purchaseDate <= new Date(endDate);
        });
        
        return {
            totalPurchases: filteredPurchases.length,
            totalCost: filteredPurchases.reduce((sum, purchase) => sum + purchase.total, 0),
            averagePurchase: filteredPurchases.length > 0 ?
                filteredPurchases.reduce((sum, purchase) => sum + purchase.total, 0) / filteredPurchases.length : 0
        };
    }

    // === نظام النسخ الاحتياطي التلقائي ===
    setupAutoBackup() {
        console.log('🔄 تفعيل نظام النسخ الاحتياطي التلقائي...');

        // إنشاء نسخة احتياطية كل 5 دقائق
        setInterval(() => {
            this.createAutoBackup();
        }, 5 * 60 * 1000);

        // إنشاء نسخة احتياطية عند إغلاق الصفحة
        window.addEventListener('beforeunload', () => {
            this.createAutoBackup();
        });

        // إنشاء نسخة احتياطية عند تحميل الصفحة
        setTimeout(() => {
            this.createAutoBackup();
        }, 2000);
    }

    createAutoBackup() {
        try {
            const allData = this.getAllData();
            const dataStr = JSON.stringify(allData);

            // حفظ في localStorage مع مفتاح خاص
            localStorage.setItem('monjizAutoBackup', dataStr);
            localStorage.setItem('monjizBackupDate', new Date().toISOString());

            // حفظ في sessionStorage أيضاً
            sessionStorage.setItem('monjizAutoBackup', dataStr);

            console.log('💾 تم إنشاء نسخة احتياطية تلقائية');
        } catch (error) {
            console.error('❌ خطأ في إنشاء النسخة الاحتياطية:', error);
        }
    }

    getAllData() {
        const allData = {};
        const keys = [
            'monjizProducts', 'monjizSales', 'monjizInvoices', 'monjizPurchases',
            'monjizCustomers', 'monjizSuppliers', 'monjizCategories',
            'monjizAccounts', 'chartOfAccounts', 'monjizStockMovements'
        ];

        keys.forEach(key => {
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    allData[key] = JSON.parse(data);
                } catch (error) {
                    console.warn(`تحذير: خطأ في قراءة ${key}:`, error);
                }
            }
        });

        return allData;
    }

    restoreFromBackup() {
        try {
            // محاولة الاستعادة من localStorage أولاً
            let backupData = localStorage.getItem('monjizAutoBackup');

            // إذا لم توجد، محاولة الاستعادة من sessionStorage
            if (!backupData) {
                backupData = sessionStorage.getItem('monjizAutoBackup');
            }

            if (backupData) {
                const data = JSON.parse(backupData);
                this.importAllData(data);

                const backupDate = localStorage.getItem('monjizBackupDate');
                console.log('✅ تم استعادة البيانات من النسخة الاحتياطية:', backupDate);
                return true;
            } else {
                console.log('⚠️ لم يتم العثور على نسخة احتياطية');
                return false;
            }
        } catch (error) {
            console.error('❌ خطأ في استعادة النسخة الاحتياطية:', error);
            return false;
        }
    }

    importAllData(data) {
        Object.keys(data).forEach(key => {
            if (data[key]) {
                // معالجة خاصة للفئات
                if (key === 'monjizCategories') {
                    // فلترة الفئات القديمة من النسخة الاحتياطية
                    const backupCategories = data[key].filter(category => 
                        !['electronics', 'clothing', 'home'].includes(category.code)
                    );
                    
                    // استعادة الفئات الفعلية من النسخة الاحتياطية
                    if (backupCategories.length > 0) {
                        localStorage.setItem(key, JSON.stringify(backupCategories));
                        console.log('📥 تم استيراد الفئات الفعلية من النسخة الاحتياطية:', backupCategories.length);
                        console.log('📋 الفئات المستعادة:', backupCategories.map(cat => cat.name));
                    } else {
                        // إنشاء فئات افتراضية جديدة فقط إذا لم توجد فئات في النسخة الاحتياطية
                        const defaultCategories = [
                            {
                                id: 1,
                                name: 'مواد غذائية',
                                code: 'food',
                                description: 'المواد الغذائية والمشروبات',
                                color: '#28a745',
                                icon: 'fas fa-utensils',
                                createdAt: new Date().toISOString()
                            },
                            {
                                id: 2,
                                name: 'مواد نظافة',
                                code: 'cleaning',
                                description: 'مواد التنظيف والنظافة',
                                color: '#17a2b8',
                                icon: 'fas fa-broom',
                                createdAt: new Date().toISOString()
                            },
                            {
                                id: 3,
                                name: 'مجمدات',
                                code: 'frozen',
                                description: 'المنتجات المجمدة',
                                color: '#6f42c1',
                                icon: 'fas fa-snowflake',
                                createdAt: new Date().toISOString()
                            },
                            {
                                id: 4,
                                name: 'مواد تعبئة',
                                code: 'packaging',
                                description: 'مواد التعبئة والتغليف',
                                color: '#fd7e14',
                                icon: 'fas fa-box',
                                createdAt: new Date().toISOString()
                            }
                        ];
                        localStorage.setItem(key, JSON.stringify(defaultCategories));
                        console.log('🆕 تم إنشاء الفئات الافتراضية الجديدة');
                    }
                } 
                // معالجة خاصة للمنتجات لضمان توافق الفئات
                else if (key === 'monjizProducts') {
                    const products = data[key];
                    const updatedProducts = products.map(product => {
                        // تحديث الفئات القديمة في المنتجات
                        if (product.category === 'إلكترونيات' || product.category === 'electronics') {
                            product.category = 'عام';
                        } else if (product.category === 'ملابس' || product.category === 'clothing') {
                            product.category = 'عام';
                        } else if (product.category === 'منزلية' || product.category === 'home') {
                            product.category = 'عام';
                        }
                        return product;
                    });
                    localStorage.setItem(key, JSON.stringify(updatedProducts));
                    console.log('📥 تم استيراد المنتجات مع تحديث الفئات:', updatedProducts.length);
                }
                // باقي البيانات تستعاد بشكل طبيعي
                else {
                    localStorage.setItem(key, JSON.stringify(data[key]));
                    console.log(`📥 تم استيراد ${key}:`, Array.isArray(data[key]) ? data[key].length : 'كائن');
                }
            }
        });
    }

    // فحص وجود البيانات واستعادتها إذا لزم الأمر
    checkAndRestoreData() {
        const hasData = this.hasAnyData();

        if (!hasData) {
            console.log('🔍 لم يتم العثور على بيانات، محاولة الاستعادة...');
            const restored = this.restoreFromBackup();

            if (!restored) {
                console.log('🆕 إنشاء بيانات افتراضية جديدة...');
                this.initializeData();
            }
        } else {
            console.log('✅ تم العثور على البيانات الموجودة');
        }
    }

    hasAnyData() {
        const keys = ['monjizProducts', 'monjizSales', 'monjizCustomers'];
        return keys.some(key => {
            const data = localStorage.getItem(key);
            return data && JSON.parse(data).length > 0;
        });
    }

    // === إدارة الحسابات ===
    getAccounts() {
        // قراءة من كلا المفتاحين للتوافق
        return JSON.parse(localStorage.getItem('chartOfAccounts')) ||
               JSON.parse(localStorage.getItem('monjizAccounts')) ||
               this.getDefaultAccounts();
    }

    saveAccounts(accounts) {
        // حفظ في كلا المفتاحين للتوافق
        localStorage.setItem('chartOfAccounts', JSON.stringify(accounts));
        localStorage.setItem('monjizAccounts', JSON.stringify(accounts));
        this.notifyPageUpdate('monjizAccounts');
    }

    getDefaultAccounts() {
        return [
            { id: 1, code: '1001', name: 'النقدية', type: 'assets', balance: 0, status: 'active' },
            { id: 2, code: '1002', name: 'البنك', type: 'assets', balance: 0, status: 'active' },
            { id: 3, code: '2001', name: 'الموردون', type: 'liabilities', balance: 0, status: 'active' },
            { id: 4, code: '1003', name: 'العملاء', type: 'assets', balance: 0, status: 'active' },
            { id: 5, code: '4001', name: 'المبيعات', type: 'revenue', balance: 0, status: 'active' },
            { id: 6, code: '5001', name: 'المشتريات', type: 'expenses', balance: 0, status: 'active' }
        ];
    }

    addAccount(account) {
        const accounts = this.getAccounts();
        const newId = Math.max(...accounts.map(a => a.id), 0) + 1;
        const newAccount = {
            ...account,
            id: newId,
            createdAt: new Date().toISOString()
        };
        accounts.push(newAccount);
        this.saveAccounts(accounts);
        return newAccount;
    }

    // إضافة حساب عميل تلقائياً
    addCustomerAccount(customer) {
        const account = {
            code: `11030${String(customer.id).padStart(3, '0')}`,
            name: customer.name,
            type: 'assets',
            subType: 'current_assets',
            category: 'customers',
            parentCode: '11030',
            parentName: 'العملاء',
            balance: 0,
            status: 'active',
            linkedType: 'customer',
            linkedId: customer.id,
            level: 4,
            autoCreated: true
        };

        // التأكد من وجود الحسابات الأساسية
        this.ensureBasicCustomerAccounts();

        return this.addAccount(account);
    }

    // إضافة حساب مورد تلقائياً
    addSupplierAccount(supplier) {
        const account = {
            code: `21030${String(supplier.id).padStart(3, '0')}`,
            name: supplier.name,
            type: 'liabilities',
            subType: 'current_liabilities',
            category: 'suppliers',
            parentCode: '21030',
            parentName: 'الموردون',
            balance: 0,
            status: 'active',
            linkedType: 'supplier',
            linkedId: supplier.id,
            level: 3,
            autoCreated: true
        };

        // التأكد من وجود الحسابات الأساسية
        this.ensureBasicSupplierAccounts();

        return this.addAccount(account);
    }

    // التأكد من وجود الحسابات الأساسية للعملاء
    ensureBasicCustomerAccounts() {
        const accounts = this.getAccounts();
        const basicAccounts = [
            { code: '1', name: 'الأصول', type: 'assets', level: 1, parentCode: null },
            { code: '11', name: 'الأصول المتداولة', type: 'assets', level: 2, parentCode: '1' },
            { code: '1103', name: 'الذمم المدينة', type: 'assets', level: 3, parentCode: '11' },
            { code: '11030', name: 'العملاء', type: 'assets', level: 3, parentCode: '1103' }
        ];

        let needsSave = false;
        basicAccounts.forEach(basicAccount => {
            const exists = accounts.find(acc => acc.code === basicAccount.code);
            if (!exists) {
                accounts.push({
                    ...basicAccount,
                    id: Date.now() + Math.random(),
                    balance: 0,
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    autoCreated: true
                });
                needsSave = true;
            }
        });

        if (needsSave) {
            this.saveAccounts(accounts);
        }
    }

    // التأكد من وجود الحسابات الأساسية للموردين
    ensureBasicSupplierAccounts() {
        const accounts = this.getAccounts();
        const basicAccounts = [
            { code: '2', name: 'الخصوم', type: 'liabilities', level: 1, parentCode: null },
            { code: '21', name: 'الخصوم المتداولة', type: 'liabilities', level: 2, parentCode: '2' },
            { code: '2103', name: 'الذمم الدائنة', type: 'liabilities', level: 3, parentCode: '21' },
            { code: '21030', name: 'الموردون', type: 'liabilities', level: 3, parentCode: '2103' }
        ];

        let needsSave = false;
        basicAccounts.forEach(basicAccount => {
            const exists = accounts.find(acc => acc.code === basicAccount.code);
            if (!exists) {
                accounts.push({
                    ...basicAccount,
                    id: Date.now() + Math.random(),
                    balance: 0,
                    status: 'active',
                    createdAt: new Date().toISOString(),
                    autoCreated: true
                });
                needsSave = true;
            }
        });

        if (needsSave) {
            this.saveAccounts(accounts);
        }
    }

    // دالة لحذف النسخة الاحتياطية القديمة
    clearOldBackup() {
        try {
            localStorage.removeItem('monjizAutoBackup');
            sessionStorage.removeItem('monjizAutoBackup');
            localStorage.removeItem('monjizBackupDate');
            console.log('🗑️ تم حذف النسخة الاحتياطية القديمة');
            return true;
        } catch (error) {
            console.error('❌ خطأ في حذف النسخة الاحتياطية:', error);
            return false;
        }
    }

    // دالة لإنشاء نسخة احتياطية جديدة نظيفة
    createCleanBackup() {
        try {
            const cleanData = this.getAllData();
            
            // التأكد من نظافة الفئات
            if (cleanData.monjizCategories) {
                cleanData.monjizCategories = cleanData.monjizCategories.filter(category => 
                    !['electronics', 'clothing', 'home'].includes(category.code)
                );
            }
            
            localStorage.setItem('monjizAutoBackup', JSON.stringify(cleanData));
            localStorage.setItem('monjizBackupDate', new Date().toISOString());
            console.log('✅ تم إنشاء نسخة احتياطية نظيفة جديدة');
            return true;
        } catch (error) {
            console.error('❌ خطأ في إنشاء النسخة الاحتياطية النظيفة:', error);
            return false;
        }
    }

    // دالة لحذف النسخة الاحتياطية القديمة
    clearOldBackup() {
        try {
            localStorage.removeItem('monjizAutoBackup');
            sessionStorage.removeItem('monjizAutoBackup');
            localStorage.removeItem('monjizBackupDate');
            console.log('�️ تم حذف النسخة الاحتياطية القديمة');
            return true;
        } catch (error) {
            console.error('❌ خطأ في حذف النسخة الاحتياطية:', error);
            return false;
        }
    }

    // دالة لإنشاء نسخة احتياطية جديدة نظيفة
    createCleanBackup() {
        try {
            const cleanData = this.getAllData();
            
            // التأكد من نظافة الفئات
            if (cleanData.monjizCategories) {
                cleanData.monjizCategories = cleanData.monjizCategories.filter(category => 
                    !['electronics', 'clothing', 'home'].includes(category.code)
                );
            }
            
            localStorage.setItem('monjizAutoBackup', JSON.stringify(cleanData));
            localStorage.setItem('monjizBackupDate', new Date().toISOString());
            console.log('✅ تم إنشاء نسخة احتياطية نظيفة جديدة');
            return true;
        } catch (error) {
            console.error('❌ خطأ في إنشاء النسخة الاحتياطية النظيفة:', error);
            return false;
        }
    }

    // === إدارة الإشعارات ===
    notifyPageUpdate(dataType) {
        // يمكن استخدامها لاحقاً لإشعار الصفحات بالتحديثات
        console.log(`تم تحديث البيانات: ${dataType}`);

        // إرسال حدث تحديث الحسابات
        if (dataType === 'monjizCustomers' || dataType === 'monjizSuppliers') {
            const event = new CustomEvent('accountsUpdated', {
                detail: { dataType, timestamp: new Date().toISOString() }
            });
            document.dispatchEvent(event);
        }

        // إرسال حدث عام لتحديث البيانات
        const generalEvent = new CustomEvent('monjizDataUpdate', {
            detail: { dataType, timestamp: new Date().toISOString() }
        });
        window.dispatchEvent(generalEvent);
    }
}

// إنشاء مثيل عام من مدير البيانات
window.dataManager = new DataManager();

// تصدير الكلاس للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DataManager;
}
