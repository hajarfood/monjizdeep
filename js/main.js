// ملف JavaScript الرئيسي للنظام

// تصريح الدوال في النطاق العام
// سيتم تعريف هذه الدوال لاحقًا في الملف
// window.showAddInvoiceModal = null;
// window.showAddPurchaseModal = null;

document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('🚀 بدء تهيئة النظام الرئيسي...');

        // تهيئة التطبيق
        initApp();

        // إضافة مستمعي الأحداث للأزرار
        setupEventListeners();

        // تحميل البيانات الإحصائية
        loadStatistics();

        console.log('✅ تم تهيئة النظام الرئيسي بنجاح');
    } catch (error) {
        console.error('❌ خطأ في تهيئة النظام الرئيسي:', error);
    }
});

// دالة تهيئة التطبيق
function initApp() {
    console.log('تم تهيئة التطبيق بنجاح');
    
    // تحديث روابط التنقل
    updateNavigationLinks();
}

// دالة لتحديث روابط التنقل
function updateNavigationLinks() {
    // لا نحتاج لتحديث الروابط لأنها موجودة بالفعل في HTML
    console.log('روابط التنقل جاهزة');
}

// دالة لإعداد مستمعي الأحداث مع معالجة الأخطاء
function setupEventListeners() {
    try {
        console.log('🔧 إعداد مستمعي الأحداث...');

        // الإجراءات السريعة
        setupQuickActions();

        // مستمعي أحداث أخرى
        setupOtherListeners();

        console.log('✅ تم إعداد مستمعي الأحداث بنجاح');
    } catch (error) {
        console.error('❌ خطأ في إعداد مستمعي الأحداث:', error);
    }
}

// دالة لإعداد مستمعي أحداث الإجراءات السريعة
function setupQuickActions() {
    // زر التقارير
    const reportsBtn = document.querySelector('.reports-btn');
    if (reportsBtn) {
        reportsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'reports.html';
        });
    }
    
    // زر منتج جديد
    const newProductBtn = document.querySelector('.new-product-btn');
    if (newProductBtn) {
        newProductBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAddProductModal();
        });
    }
    
    // زر عميل جديد
    const newCustomerBtn = document.querySelector('.new-customer-btn');
    if (newCustomerBtn) {
        newCustomerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAddCustomerModal();
        });
    }
    
    // زر فاتورة جديدة
    const newInvoiceBtn = document.querySelector('.new-invoice-btn');
    if (newInvoiceBtn) {
        newInvoiceBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAddInvoiceModal();
        });
    }
}

// دالة لإعداد مستمعي أحداث أخرى
function setupOtherListeners() {
    // زر عرض المنتجات
    const viewProductsBtn = document.querySelector('.view-products-btn');
    if (viewProductsBtn) {
        viewProductsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'products.html';
        });
    }
    
    // زر عرض الكل للفواتير
    const viewAllInvoices = document.querySelector('.recent-invoices .view-all');
    if (viewAllInvoices) {
        viewAllInvoices.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'sales.html';
        });
    }
    
    // زر عرض الكل لتنبيهات المخزون
    const viewAllAlerts = document.querySelector('.inventory-alerts .view-all');
    if (viewAllAlerts) {
        viewAllAlerts.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'products.html?filter=low-stock';
        });
    }
}

// دالة لتحميل البيانات الإحصائية
function loadStatistics() {
    // في التطبيق الحقيقي، هذه البيانات ستأتي من الخادم
    // هنا نستخدم بيانات ثابتة للعرض فقط
    
    // تأخير قصير لمحاكاة تحميل البيانات من الخادم
    setTimeout(() => {
        updateStatCards();
        updateRecentInvoices();
        updateInventoryAlerts();
    }, 500);
}

// دالة لتحديث البطاقات الإحصائية
function updateStatCards() {
    // تحديث عدد المنتجات
    const productsValue = document.querySelector('.products-card .card-value');
    if (productsValue) {
        productsValue.textContent = '15';
    }
    
    // تحديث عدد العملاء
    const customersValue = document.querySelector('.customers-card .card-value');
    if (customersValue) {
        customersValue.textContent = '8';
    }
    
    // تحديث مبيعات الشهر
    const monthlySalesValue = document.querySelector('.monthly-sales-card .card-value');
    if (monthlySalesValue) {
        monthlySalesValue.innerHTML = '12,500.00 <span>ر.س</span>';
    }
    
    // تحديث مبيعات اليوم
    const dailySalesValue = document.querySelector('.daily-sales-card .card-value');
    if (dailySalesValue) {
        dailySalesValue.innerHTML = '1,250.00 <span>ر.س</span>';
    }
}

// دالة لتحديث آخر الفواتير
function updateRecentInvoices() {
    const invoicesContainer = document.querySelector('.invoices-container');
    if (!invoicesContainer) return;
    
    // بيانات الفواتير (نموذج)
    const recentInvoices = [
        { id: 'INV-2023-001', date: '2023-06-15', customer: 'شركة الأمل', amount: 2500, status: 'مدفوعة' },
        { id: 'INV-2023-002', date: '2023-06-10', customer: 'مؤسسة النور', amount: 1800, status: 'معلقة' },
        { id: 'INV-2023-003', date: '2023-06-05', customer: 'محمد أحمد', amount: 950, status: 'مدفوعة' }
    ];
    
    // إزالة حالة الفراغ إذا كانت موجودة
    const emptyState = invoicesContainer.querySelector('.empty-state');
    if (emptyState) {
        invoicesContainer.removeChild(emptyState);
    }
    
    // إنشاء جدول الفواتير
    const table = document.createElement('table');
    table.className = 'invoices-table';
    
    // إنشاء رأس الجدول
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>رقم الفاتورة</th>
            <th>التاريخ</th>
            <th>العميل</th>
            <th>المبلغ</th>
            <th>الحالة</th>
        </tr>
    `;
    table.appendChild(thead);
    
    // إنشاء جسم الجدول
    const tbody = document.createElement('tbody');
    
    recentInvoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.id}</td>
            <td>${invoice.date}</td>
            <td>${invoice.customer}</td>
            <td>${invoice.amount.toLocaleString('ar-SA')} ر.س</td>
            <td><span class="status ${invoice.status === 'مدفوعة' ? 'paid' : 'pending'}">${invoice.status}</span></td>
        `;
        tbody.appendChild(row);
    });
    
    table.appendChild(tbody);
    invoicesContainer.appendChild(table);
}

// دالة لتحديث تنبيهات المخزون
function updateInventoryAlerts() {
    const alertsContainer = document.querySelector('.alerts-container');
    if (!alertsContainer) return;
    
    // بيانات التنبيهات (نموذج)
    const inventoryAlerts = [
        { id: 1, product: 'لابتوب HP', stock: 2, minStock: 5 },
        { id: 2, product: 'طابعة Canon', stock: 1, minStock: 3 },
        { id: 3, product: 'سماعات رأس', stock: 3, minStock: 5 }
    ];
    
    // إزالة التنبيهات الحالية
    alertsContainer.innerHTML = '';
    
    // إضافة التنبيهات الجديدة
    inventoryAlerts.forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = 'alert';
        alertElement.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${alert.product} (المتبقي: ${alert.stock})</span>
        `;
        alertsContainer.appendChild(alertElement);
    });
    
    // تحديث عدد التنبيهات في العنوان
    const alertCount = document.querySelector('.inventory-alerts .section-header h3');
    if (alertCount) {
        alertCount.innerHTML = `<i class="fas fa-exclamation-triangle"></i> تنبيهات المخزون (${inventoryAlerts.length})`;
    }
}

// دالة لعرض نافذة إضافة منتج جديد
function showAddProductModal() {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // تحقق من وجود النظام المركزي
    if (!window.dataManager) {
        console.error('النظام المركزي غير متاح');
        return;
    }
    
    // الحصول على الفئات من النظام المركزي
    const categories = window.dataManager.getCategories() || [];
    
    // إنشاء خيارات الفئات
    let categoryOptions = '<option value="">اختر الفئة</option>';
    categories.forEach(category => {
        categoryOptions += `<option value="${category.name}">${category.name}</option>`;
    });
    
    modal.innerHTML = `
        <div class="modal-content-modern" style="max-width: 800px;">
            <div class="modal-header-modern">
                <h3><i class="fas fa-plus"></i> إضافة منتج جديد</h3>
                <button class="close-btn" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body-modern">
                <form class="form-modern" id="new-product-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>رقم المنتج</label>
                            <input type="text" class="input-modern" value="PROD-" readonly>
                        </div>
                        <div class="form-group">
                            <label>اسم المنتج</label>
                            <input type="text" class="input-modern" placeholder="اسم المنتج" id="product-name">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>الفئة</label>
                            <select class="select-modern" id="product-category">
                                ${categoryOptions}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>رمز المنتج</label>
                            <input type="text" class="input-modern" placeholder="رمز المنتج" id="product-code">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>سعر البيع</label>
                            <input type="number" class="input-modern" placeholder="0.00" step="0.01" id="product-price">
                        </div>
                        <div class="form-group">
                            <label>سعر التكلفة</label>
                            <input type="number" class="input-modern" placeholder="0.00" step="0.01" id="product-cost">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>الكمية الحالية</label>
                            <input type="number" class="input-modern" placeholder="0" min="0" id="product-quantity">
                        </div>
                        <div class="form-group">
                            <label>الحد الأدنى</label>
                            <input type="number" class="input-modern" placeholder="0" min="0" id="product-min-stock">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>وصف المنتج</label>
                        <textarea class="textarea-modern" rows="3" placeholder="وصف المنتج..." id="product-description"></textarea>
                    </div>

                    <div class="form-actions">
                        <button type="button" class="btn-modern btn-primary" onclick="saveProductFromDashboard()">
                            <i class="fas fa-save"></i> حفظ المنتج
                        </button>
                        <button type="button" class="btn-modern btn-secondary" onclick="closeModal(this)">
                            <i class="fas fa-times"></i> إلغاء
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // إضافة النافذة المنبثقة إلى الصفحة
    document.body.appendChild(modal);
    
    // إضافة نمط CSS للنافذة المنبثقة إذا لم يكن موجوداً
    if (!document.querySelector('#modal-styles-modern')) {
        const style = document.createElement('style');
        style.id = 'modal-styles-modern';
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
            
            .modal-content-modern {
                background-color: #fff;
                margin: 5% auto;
                padding: 0;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
                width: 90%;
                max-width: 800px;
                animation: modalFadeIn 0.3s;
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; transform: translateY(-50px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .modal-header-modern {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 20px;
                background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
                color: white;
                border-radius: 10px 10px 0 0;
            }
            
            .modal-header-modern h3 {
                margin: 0;
                font-size: 1.4rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .close-btn:hover {
                transform: scale(1.2);
            }
            
            .modal-body-modern {
                padding: 20px;
            }
            
            .form-modern {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .form-row {
                display: flex;
                gap: 15px;
            }
            
            .form-group {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .form-group label {
                font-weight: 600;
                color: #333;
                font-size: 14px;
            }
            
            .input-modern, .select-modern, .textarea-modern {
                padding: 10px 12px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
                transition: all 0.3s;
            }
            
            .input-modern:focus, .select-modern:focus, .textarea-modern:focus {
                border-color: #3498db;
                box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
                outline: none;
            }
            
            .form-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 10px;
            }
            
            .btn-modern {
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s;
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
                color: white;
            }
            
            .btn-primary:hover {
                background: linear-gradient(135deg, #2980b9 0%, #2573a7 100%);
                transform: translateY(-2px);
            }
            
            .btn-secondary {
                background: linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%);
                color: #333;
            }
            
            .btn-secondary:hover {
                background: linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%);
                transform: translateY(-2px);
            }
            
            @media (max-width: 768px) {
                .form-row {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// دالة لحفظ المنتج من لوحة التحكم
function saveProductFromDashboard() {
    // التحقق من وجود النظام المركزي
    if (!window.dataManager) {
        alert('النظام المركزي غير متاح');
        return;
    }
    
    // الحصول على قيم الحقول
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const barcode = document.getElementById('product-code').value;
    const salePrice = parseFloat(document.getElementById('product-price').value) || 0;
    const purchasePrice = parseFloat(document.getElementById('product-cost').value) || 0;
    const quantity = parseInt(document.getElementById('product-quantity').value) || 0;
    const minQuantity = parseInt(document.getElementById('product-min-stock').value) || 0;
    const description = document.getElementById('product-description').value;
    
    // التحقق من صحة البيانات
    if (!name) {
        alert('يرجى إدخال اسم المنتج');
        return;
    }
    
    // إنشاء كائن المنتج
    const productData = {
        name,
        category,
        barcode,
        salePrice,
        purchasePrice,
        quantity,
        minQuantity,
        description,
        status: 'active',
        createdAt: new Date().toISOString()
    };
    
    try {
        // حفظ المنتج في النظام المركزي
        const savedProduct = window.dataManager.addProduct(productData);
        
        if (savedProduct) {
            alert(`تم إضافة المنتج "${name}" بنجاح`);
            
            // إغلاق النافذة المنبثقة
            const modal = document.querySelector('.modal');
            if (modal) {
                document.body.removeChild(modal);
            }
            
            // تحديث الإحصائيات إذا كانت موجودة
            if (typeof updateStatCards === 'function') {
                updateStatCards();
            }
        } else {
            alert('حدث خطأ أثناء حفظ المنتج');
        }
    } catch (error) {
        console.error('خطأ في حفظ المنتج:', error);
        alert('حدث خطأ أثناء حفظ المنتج: ' + error.message);
    }
}

// دالة لإغلاق النافذة المنبثقة
function closeModal(element) {
    const modal = element.closest('.modal');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// دالة لحفظ العميل من لوحة التحكم
function saveCustomerFromDashboard() {
    // التحقق من وجود النظام المركزي
    if (!window.dataManager) {
        alert('النظام المركزي غير متاح');
        return;
    }
    
    // الحصول على قيم الحقول
    const type = document.getElementById('customer-type').value;
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const email = document.getElementById('customer-email').value;
    const address = document.getElementById('customer-address').value;
    
    // التحقق من صحة البيانات
    if (!name) {
        alert('يرجى إدخال اسم العميل');
        return;
    }
    
    if (!phone) {
        alert('يرجى إدخال رقم هاتف العميل');
        return;
    }
    
    // إنشاء كائن العميل
    const customerData = {
        type,
        name,
        phone,
        email,
        address,
        status: 'active',
        balance: 0,
        createdAt: new Date().toISOString()
    };
    
    try {
        // حفظ العميل في النظام المركزي
        const savedCustomer = window.dataManager.addCustomer(customerData);
        
        if (savedCustomer) {
            alert(`تم إضافة العميل "${name}" بنجاح`);
            
            // إغلاق النافذة المنبثقة
            const modal = document.querySelector('.modal');
            if (modal) {
                document.body.removeChild(modal);
            }
            
            // تحديث الإحصائيات إذا كانت موجودة
            if (typeof updateStatCards === 'function') {
                updateStatCards();
            }
        } else {
            alert('حدث خطأ أثناء حفظ العميل');
        }
    } catch (error) {
        console.error('خطأ في حفظ العميل:', error);
        alert('حدث خطأ أثناء حفظ العميل: ' + error.message);
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
                    <div class="form-group">
                        <label for="customer-type">نوع العميل</label>
                        <select id="customer-type" name="customer-type">
                            <option value="individual">فرد</option>
                            <option value="company">شركة</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="customer-name">الاسم</label>
                        <input type="text" id="customer-name" name="customer-name" required>
                    </div>
                    <div class="form-group">
                        <label for="customer-phone">رقم الهاتف</label>
                        <input type="tel" id="customer-phone" name="customer-phone" required>
                    </div>
                    <div class="form-group">
                        <label for="customer-email">البريد الإلكتروني</label>
                        <input type="email" id="customer-email" name="customer-email">
                    </div>
                    <div class="form-group">
                        <label for="customer-address">العنوان</label>
                        <input type="text" id="customer-address" name="customer-address">
                    </div>
                    <div class="form-actions">
                        <button type="button" onclick="saveCustomerFromDashboard()" class="btn primary-btn">إضافة</button>
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
    const form = modal.querySelector('#add-customer-form');
    
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

}

// دالة لعرض نافذة إضافة فاتورة جديدة
function showAddInvoiceModal() {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // تحميل العملاء من النظام المركزي
    let customerOptions = '<option value="">اختر العميل</option>';
    if (window.dataManager) {
        const customers = window.dataManager.getCustomers() || [];
        customers.forEach(customer => {
            customerOptions += `<option value="${customer.id}">${customer.name}</option>`;
        });
    } else {
        // عملاء افتراضيون للعرض
        customerOptions += `
            <option value="1">شركة الأمل</option>
            <option value="2">مؤسسة النور</option>
            <option value="3">محمد أحمد</option>
        `;
    }
    
    // تحميل المنتجات من النظام المركزي
    let productOptions = '<option value="">اختر المنتج</option>';
    let productsData = {}; // تعريف كائن المنتجات
    
    if (window.dataManager) {
        const products = window.dataManager.getProducts() || [];
        products.forEach(product => {
            productOptions += `<option value="${product.id}">${product.name}</option>`;
            // تخزين بيانات المنتج في كائن productsData
            productsData[product.id] = {
                name: product.name,
                price: product.salePrice || 0
            };
        });
    } else {
        // منتجات افتراضية للعرض
        productOptions += `
            <option value="1">لابتوب HP</option>
            <option value="2">طابعة Canon</option>
            <option value="3">سماعات رأس</option>
        `;
        // بيانات منتجات افتراضية
        productsData = {
            1: { name: 'لابتوب HP', price: 3500 },
            2: { name: 'طابعة Canon', price: 1200 },
            3: { name: 'سماعات رأس', price: 350 }
        };
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>إضافة فاتورة جديدة</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <form id="add-invoice-form">
                    <div class="form-group">
                        <label for="invoice-customer">العميل</label>
                        <select id="invoice-customer" name="invoice-customer" required>
                            ${customerOptions}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="invoice-date">التاريخ</label>
                        <input type="date" id="invoice-date" name="invoice-date" required>
                    </div>
                    <div class="form-group">
                        <label>المنتجات</label>
                        <div class="products-list">
                            <div class="product-item">
                                <select class="product-select" required>
                                    ${productOptions}
                                </select>
                                <input type="number" class="product-quantity" min="1" value="1" required>
                                <input type="number" class="product-price" value="0" readonly>
                                <input type="number" class="product-total" value="0" readonly>
                                <button type="button" class="remove-product-btn">×</button>
                            </div>
                        </div>
                        <button type="button" class="add-product-row-btn">+ إضافة منتج</button>
                    </div>
                    <div class="form-group">
                        <label for="invoice-subtotal">المجموع الفرعي</label>
                        <input type="number" id="invoice-subtotal" name="invoice-subtotal" value="0" readonly>
                    </div>
                    <div class="form-group">
                        <label for="invoice-tax">الضريبة (15%)</label>
                        <input type="number" id="invoice-tax" name="invoice-tax" value="0" readonly>
                    </div>
                    <div class="form-group">
                        <label for="invoice-total">المجموع الكلي</label>
                        <input type="number" id="invoice-total" name="invoice-total" value="0" readonly>
                    </div>
                    <div class="form-group">
                        <label for="invoice-notes">ملاحظات</label>
                        <textarea id="invoice-notes" name="invoice-notes" rows="3"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" onclick="saveInvoiceFromDashboard()" class="btn primary-btn">إضافة</button>
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
                max-height: 70vh;
                overflow-y: auto;
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
            
            .products-list {
                margin-bottom: 10px;
            }
            
            .product-item {
                display: grid;
                grid-template-columns: 3fr 1fr 1fr 1fr 40px;
                gap: 10px;
                margin-bottom: 10px;
                align-items: center;
            }
            
            .remove-product-btn {
                background-color: #e74c3c;
                color: white;
                border: none;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                font-size: 1.2rem;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .add-product-row-btn {
                background-color: #2ecc71;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 15px;
                font-size: 0.9rem;
                cursor: pointer;
                margin-top: 10px;
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
                
                .product-item {
                    grid-template-columns: 1fr 1fr;
                    gap: 5px;
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
    const form = modal.querySelector('#add-invoice-form');
    const addProductRowBtn = modal.querySelector('.add-product-row-btn');
    
    // دالة لتحديث حسابات الفاتورة
    function updateInvoiceCalculations() {
        let subtotal = 0;
        
        // حساب المجموع الفرعي
        const productItems = modal.querySelectorAll('.product-item');
        productItems.forEach(item => {
            const total = parseFloat(item.querySelector('.product-total').value) || 0;
            subtotal += total;
        });
        
        // تحديث المجموع الفرعي
        const subtotalInput = document.getElementById('invoice-subtotal');
        subtotalInput.value = subtotal.toFixed(2);
        
        // حساب الضريبة (15%)
        const tax = subtotal * 0.15;
        const taxInput = document.getElementById('invoice-tax');
        taxInput.value = tax.toFixed(2);
        
        // حساب المجموع الكلي
        const total = subtotal + tax;
        const totalInput = document.getElementById('invoice-total');
        totalInput.value = total.toFixed(2);
    }
    
    // دالة لتحديث سعر المنتج وإجمالي السطر
    function updateProductRow(row) {
        const productSelect = row.querySelector('.product-select');
        const quantityInput = row.querySelector('.product-quantity');
        const priceInput = row.querySelector('.product-price');
        const totalInput = row.querySelector('.product-total');
        
        const productId = productSelect.value;
        const quantity = parseInt(quantityInput.value) || 0;
        
        if (productId && productsData[productId]) {
            const price = productsData[productId].price;
            priceInput.value = price.toFixed(2);
            totalInput.value = (price * quantity).toFixed(2);
        } else {
            priceInput.value = '0.00';
            totalInput.value = '0.00';
        }
        
        updateInvoiceCalculations();
    }
    
    // دالة لإضافة صف منتج جديد
    function addProductRow() {
        const productsList = modal.querySelector('.products-list');
        const newRow = document.createElement('div');
        newRow.className = 'product-item';
        newRow.innerHTML = `
            <select class="product-select" required>
                ${productOptions}
            </select>
            <input type="number" class="product-quantity" min="1" value="1" required>
            <input type="number" class="product-price" step="0.01" value="0.00" readonly>
            <input type="number" class="product-total" step="0.01" value="0.00" readonly>
            <button type="button" class="remove-product-btn">×</button>
        `;
        
        productsList.appendChild(newRow);
        
        // إضافة مستمعي الأحداث للصف الجديد
        const productSelect = newRow.querySelector('.product-select');
        const quantityInput = newRow.querySelector('.product-quantity');
        const removeBtn = newRow.querySelector('.remove-product-btn');
        
        productSelect.addEventListener('change', () => updateProductRow(newRow));
        quantityInput.addEventListener('input', () => updateProductRow(newRow));
        removeBtn.addEventListener('click', () => {
            productsList.removeChild(newRow);
            updateInvoiceCalculations();
        });
        
        // تحديث السعر والإجمالي
        updateProductRow(newRow);
    }
    
    // إضافة مستمعي الأحداث للصف الأول
    const firstRow = modal.querySelector('.product-item');
    const firstProductSelect = firstRow.querySelector('.product-select');
    const firstQuantityInput = firstRow.querySelector('.product-quantity');
    const firstRemoveBtn = firstRow.querySelector('.remove-product-btn');
    
    firstProductSelect.addEventListener('change', function() {
        updateProductRow(firstRow);
    });
    
    firstQuantityInput.addEventListener('input', function() {
        updateProductRow(firstRow);
    });
    
    firstRemoveBtn.addEventListener('click', function() {
        alert('يجب أن يكون هناك منتج واحد على الأقل');
    });
    
    // إضافة مستمع حدث لزر إضافة منتج
    addProductRowBtn.addEventListener('click', function() {
        addProductRow();
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
    
    // تعيين تاريخ اليوم كقيمة افتراضية
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoice-date').value = today;
    
    // لا نحتاج لمعالجة إرسال النموذج هنا لأننا نستخدم زر بحدث onclick
}

// دالة لحفظ الفاتورة من لوحة التحكم
function saveInvoiceFromDashboard() {
    // التحقق من وجود النظام المركزي
    if (!window.dataManager) {
        alert('النظام المركزي غير متاح');
        return;
    }
    
    // الحصول على قيم الحقول
    const customerId = document.getElementById('invoice-customer').value;
    const customerName = document.getElementById('invoice-customer').options[document.getElementById('invoice-customer').selectedIndex].text;
    const date = document.getElementById('invoice-date').value;
    
    // جمع بيانات المنتجات
    const products = [];
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach(item => {
        const productId = item.querySelector('.product-select').value;
        const productName = item.querySelector('.product-select').options[item.querySelector('.product-select').selectedIndex].text;
        const quantity = parseInt(item.querySelector('.product-quantity').value) || 0;
        const price = parseFloat(item.querySelector('.product-price').value) || 0;
        const total = parseFloat(item.querySelector('.product-total').value) || 0;
        
        if (productId && quantity > 0) {
            products.push({
                productId: productId,
                name: productName,
                quantity: quantity,
                price: price,
                total: total
            });
        }
    });
    
    // التحقق من صحة البيانات
    if (!customerId) {
        alert('يرجى اختيار العميل');
        return;
    }
    
    if (!date) {
        alert('يرجى تحديد تاريخ الفاتورة');
        return;
    }
    
    if (products.length === 0) {
        alert('يرجى إضافة منتج واحد على الأقل');
        return;
    }
    
    // حساب المجاميع
    const subtotal = parseFloat(document.getElementById('invoice-subtotal').value) || 0;
    const tax = parseFloat(document.getElementById('invoice-tax').value) || 0;
    const total = parseFloat(document.getElementById('invoice-total').value) || 0;
    const notes = document.getElementById('invoice-notes').value || '';
    
    // إنشاء كائن الفاتورة
    const invoiceData = {
        id: 'INV-' + Date.now(),
        customerId: customerId,
        customer: customerName,
        customerName: customerName, // إضافة خاصية customerName للتوافق مع بقية الملفات
        date: date,
        products: products,
        subtotal: subtotal,
        tax: tax,
        total: total,
        notes: notes,
        status: 'completed',
        paymentMethod: 'cash',
        createdAt: new Date().toISOString()
    };
    
    try {
        // حفظ الفاتورة في النظام المركزي
        const savedInvoice = window.dataManager.addSale(invoiceData);
        
        if (savedInvoice) {
            alert(`تم إضافة الفاتورة رقم "${savedInvoice.id}" بنجاح`);
            
            // إغلاق النافذة المنبثقة
            const modal = document.querySelector('.modal');
            if (modal) {
                document.body.removeChild(modal);
            }
            
            // تحديث الإحصائيات والفواتير الأخيرة
            updateStatCards();
            updateRecentInvoices();
        } else {
            alert('حدث خطأ أثناء حفظ الفاتورة');
        }
    } catch (error) {
        console.error('خطأ في حفظ الفاتورة:', error);
        alert('حدث خطأ أثناء حفظ الفاتورة: ' + error.message);
    }
}

// إضافة دالة showAddInvoiceModal إلى النطاق العام (window)
window.showAddInvoiceModal = showAddInvoiceModal;
console.log('تم تحميل دالة إنشاء الفاتورة بنجاح');

// دالة لعرض نافذة إضافة فاتورة مشتريات جديدة
function showAddPurchaseModal() {
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>إضافة فاتورة مشتريات جديدة</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <form id="add-purchase-form">
                    <div class="form-group">
                        <label for="purchase-supplier">المورد</label>
                        <select id="purchase-supplier" name="purchase-supplier" required>
                            <option value="">اختر المورد</option>
                            <option value="1">شركة الأمل للتوريدات</option>
                            <option value="2">مؤسسة النور التجارية</option>
                            <option value="3">شركة الصفا للمنتجات</option>
                            <option value="4">مؤسسة الإبداع للتجارة</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="purchase-date">التاريخ</label>
                        <input type="date" id="purchase-date" name="purchase-date" required>
                    </div>
                    <div class="form-group">
                        <label>المنتجات</label>
                        <div class="products-list">
                            <div class="product-item">
                                <select class="product-select" required>
                                    <option value="">اختر المنتج</option>
                                    <option value="1">لابتوب HP</option>
                                    <option value="2">طابعة Canon</option>
                                    <option value="3">سماعات رأس</option>
                                </select>
                                <input type="number" class="product-quantity" min="1" value="1" required>
                                <input type="number" class="product-price" value="0" required>
                                <input type="number" class="product-total" value="0" readonly>
                                <button type="button" class="remove-product-btn">×</button>
                            </div>
                        </div>
                        <button type="button" class="add-product-row-btn">+ إضافة منتج</button>
                    </div>
                    <div class="form-group">
                        <label for="purchase-subtotal">المجموع الفرعي</label>
                        <input type="number" id="purchase-subtotal" name="purchase-subtotal" value="0" readonly>
                    </div>
                    <div class="form-group">
                        <label for="purchase-tax">الضريبة (15%)</label>
                        <input type="number" id="purchase-tax" name="purchase-tax" value="0" readonly>
                    </div>
                    <div class="form-group">
                        <label for="purchase-total">المجموع الكلي</label>
                        <input type="number" id="purchase-total" name="purchase-total" value="0" readonly>
                    </div>
                    <div class="form-group">
                        <label for="purchase-notes">ملاحظات</label>
                        <textarea id="purchase-notes" name="purchase-notes" rows="3"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn primary-btn">إضافة</button>
                        <button type="button" class="btn cancel-btn">إلغاء</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // إضافة النافذة المنبثقة إلى الصفحة
    document.body.appendChild(modal);
    
    // إضافة مستمعي الأحداث للنافذة المنبثقة
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const form = modal.querySelector('#add-purchase-form');
    const addProductRowBtn = modal.querySelector('.add-product-row-btn');
    
    // بيانات المنتجات (نموذج)
    const productsData = {
        1: { name: 'لابتوب HP', price: 3000 },
        2: { name: 'طابعة Canon', price: 1000 },
        3: { name: 'سماعات رأس', price: 300 }
    };
    
    // دالة لتحديث حسابات الفاتورة
    function updatePurchaseCalculations() {
        let subtotal = 0;
        
        // حساب المجموع الفرعي
        const productItems = modal.querySelectorAll('.product-item');
        productItems.forEach(item => {
            const quantity = parseFloat(item.querySelector('.product-quantity').value) || 0;
            const price = parseFloat(item.querySelector('.product-price').value) || 0;
            const total = quantity * price;
            
            // تحديث إجمالي السطر
            item.querySelector('.product-total').value = total.toFixed(2);
            
            subtotal += total;
        });
        
        // تحديث المجموع الفرعي
        const subtotalInput = document.getElementById('purchase-subtotal');
        subtotalInput.value = subtotal.toFixed(2);
        
        // حساب الضريبة (15%)
        const tax = subtotal * 0.15;
        const taxInput = document.getElementById('purchase-tax');
        taxInput.value = tax.toFixed(2);
        
        // حساب المجموع الكلي
        const total = subtotal + tax;
        const totalInput = document.getElementById('purchase-total');
        totalInput.value = total.toFixed(2);
    }
    
    // دالة لتحديث سعر المنتج وإجمالي السطر
    function updateProductRow(row) {
        const productSelect = row.querySelector('.product-select');
        const quantityInput = row.querySelector('.product-quantity');
        const priceInput = row.querySelector('.product-price');
        
        // تحديث السعر بناءً على المنتج المحدد
        const productId = productSelect.value;
        if (productId && productsData[productId]) {
            priceInput.value = productsData[productId].price.toFixed(2);
        } else {
            priceInput.value = '0.00';
        }
        
        // تحديث الحسابات
        updatePurchaseCalculations();
    }
    
    // إضافة مستمع حدث لتغيير المنتج والكمية
    function setupProductRowListeners(row) {
        const productSelect = row.querySelector('.product-select');
        const quantityInput = row.querySelector('.product-quantity');
        const priceInput = row.querySelector('.product-price');
        const removeBtn = row.querySelector('.remove-product-btn');
        
        productSelect.addEventListener('change', function() {
            updateProductRow(row);
        });
        
        quantityInput.addEventListener('input', function() {
            updatePurchaseCalculations();
        });
        
        priceInput.addEventListener('input', function() {
            updatePurchaseCalculations();
        });
        
        removeBtn.addEventListener('click', function() {
            // لا نحذف الصف إذا كان الوحيد
            const productItems = modal.querySelectorAll('.product-item');
            if (productItems.length > 1) {
                row.parentNode.removeChild(row);
                updatePurchaseCalculations();
            } else {
                alert('يجب أن يكون هناك منتج واحد على الأقل');
            }
        });
    }
    
    // إعداد مستمعي الأحداث للصف الأول
    const firstProductRow = modal.querySelector('.product-item');
    setupProductRowListeners(firstProductRow);
    
    // إضافة مستمع حدث لزر إضافة منتج جديد
    addProductRowBtn.addEventListener('click', function() {
        const productsList = modal.querySelector('.products-list');
        const newRow = document.createElement('div');
        newRow.className = 'product-item';
        newRow.innerHTML = `
            <select class="product-select" required>
                <option value="">اختر المنتج</option>
                <option value="1">لابتوب HP</option>
                <option value="2">طابعة Canon</option>
                <option value="3">سماعات رأس</option>
            </select>
            <input type="number" class="product-quantity" min="1" value="1" required>
            <input type="number" class="product-price" value="0" required>
            <input type="number" class="product-total" value="0" readonly>
            <button type="button" class="remove-product-btn">×</button>
        `;
        
        productsList.appendChild(newRow);
        setupProductRowListeners(newRow);
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
    
    // تعيين تاريخ اليوم كقيمة افتراضية
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('purchase-date').value = today;
    
    // معالجة إرسال النموذج
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع بيانات الفاتورة
        const purchaseData = {
            supplier: document.getElementById('purchase-supplier').value,
            date: document.getElementById('purchase-date').value,
            products: [],
            subtotal: document.getElementById('purchase-subtotal').value,
            tax: document.getElementById('purchase-tax').value,
            total: document.getElementById('purchase-total').value,
            notes: document.getElementById('purchase-notes').value
        };
        
        // جمع بيانات المنتجات
        const productItems = modal.querySelectorAll('.product-item');
        productItems.forEach(item => {
            const productId = item.querySelector('.product-select').value;
            if (productId) {
                purchaseData.products.push({
                    id: productId,
                    name: productsData[productId].name,
                    quantity: item.querySelector('.product-quantity').value,
                    price: item.querySelector('.product-price').value,
                    total: item.querySelector('.product-total').value
                });
            }
        });
        
        // في التطبيق الحقيقي، سيتم إرسال البيانات إلى الخادم
        console.log('بيانات فاتورة المشتريات الجديدة:', purchaseData);
        
        // عرض رسالة نجاح
        alert('تم إضافة فاتورة المشتريات بنجاح!');
        
        // إغلاق النافذة
        document.body.removeChild(modal);
    });
}

// إضافة دالة showAddPurchaseModal إلى النطاق العام (window)
window.showAddPurchaseModal = showAddPurchaseModal;
console.log('تم تحميل دالة إنشاء فاتورة المشتريات بنجاح');