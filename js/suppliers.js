// ملف JavaScript لصفحة الموردين

// بيانات الموردين (مؤقتة)
let suppliersData = [
    {
        id: 1,
        name: 'شركة التقنية المتقدمة',
        type: 'company',
        phone: '+966112345678',
        email: 'info@techadvanced.com',
        category: 'electronics',
        address: 'الرياض، المملكة العربية السعودية',
        taxNumber: '123456789',
        paymentTerms: 'credit_30',
        notes: 'مورد موثوق للأجهزة الإلكترونية',
        createdAt: '2023-01-15'
    },
    {
        id: 2,
        name: 'مؤسسة الإمداد الشامل',
        type: 'company',
        phone: '+966501234567',
        email: 'supply@comprehensive.com',
        category: 'food',
        address: 'جدة، المملكة العربية السعودية',
        taxNumber: '987654321',
        paymentTerms: 'credit_15',
        notes: 'متخصص في المواد الغذائية',
        createdAt: '2023-02-20'
    },
    {
        id: 3,
        name: 'شركة المواد الأولية',
        type: 'company',
        phone: '+966509876543',
        email: 'materials@rawmaterials.com',
        category: 'construction',
        address: 'الدمام، المملكة العربية السعودية',
        taxNumber: '456789123',
        paymentTerms: 'credit_60',
        notes: 'مورد مواد البناء والإنشاءات',
        createdAt: '2023-03-10'
    },
    {
        id: 4,
        name: 'أحمد محمد الخضار',
        type: 'individual',
        phone: '+966555123456',
        email: 'ahmed.vegetables@gmail.com',
        category: 'food',
        address: 'الرياض، المملكة العربية السعودية',
        taxNumber: '',
        paymentTerms: 'cash',
        notes: 'مورد خضار وفواكه طازجة',
        createdAt: '2023-04-05'
    },
    {
        id: 5,
        name: 'سالم علي القرطاسية',
        type: 'individual',
        phone: '+966544987654',
        email: 'salem.stationery@hotmail.com',
        category: 'stationery',
        address: 'مكة المكرمة، المملكة العربية السعودية',
        taxNumber: '',
        paymentTerms: 'credit_7',
        notes: 'مورد أدوات مكتبية وقرطاسية',
        createdAt: '2023-05-12'
    }
];

let nextSupplierId = 6;

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل صفحة الموردين');
    
    // تهيئة النظام
    initSuppliersSystem();
    
    // إضافة مستمعي الأحداث
    setupEventListeners();
    
    // تحديث الإحصائيات
    updateStats();
});

// دالة تهيئة نظام الموردين
function initSuppliersSystem() {
    console.log('تهيئة نظام الموردين...');
    
    // تحميل الموردين الموجودين من الجدول
    loadExistingSuppliers();
    
    // تهيئة البحث والتصفية
    initSearchAndFilters();
}

// دالة إعداد مستمعي الأحداث
function setupEventListeners() {
    // زر إضافة مورد جديد
    const addSupplierBtn = document.querySelector('.add-supplier-btn');
    if (addSupplierBtn) {
        addSupplierBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAddSupplierModal();
        });
    }
    
    // حقل البحث
    const searchInput = document.getElementById('search-suppliers');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterSuppliers();
        });
    }
    
    // مرشحات التصفية
    const filterType = document.getElementById('filter-type');
    const filterCategory = document.getElementById('filter-category');
    
    if (filterType) {
        filterType.addEventListener('change', filterSuppliers);
    }
    
    if (filterCategory) {
        filterCategory.addEventListener('change', filterSuppliers);
    }
}

// دالة تهيئة البحث والتصفية
function initSearchAndFilters() {
    console.log('تهيئة البحث والتصفية...');
}

// دالة تحميل الموردين الموجودين
function loadExistingSuppliers() {
    console.log('تحميل الموردين الموجودين...');
    
    const rows = document.querySelectorAll('.suppliers-table tbody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 6) {
            const supplierId = parseInt(cells[0].textContent.trim());
            const supplierName = cells[1].textContent.trim();
            const supplierType = cells[2].textContent.includes('شركة') ? 'company' : 'individual';
            const supplierPhone = cells[3].textContent.trim();
            const supplierEmail = cells[4].textContent.trim();
            const supplierCategory = cells[5].textContent.trim();
            
            // التحقق من عدم وجود المورد في المصفوفة
            const existingSupplier = suppliersData.find(s => s.id === supplierId);
            if (!existingSupplier && supplierName && supplierPhone) {
                suppliersData.push({
                    id: supplierId,
                    name: supplierName,
                    type: supplierType,
                    phone: supplierPhone,
                    email: supplierEmail !== '-' ? supplierEmail : '',
                    category: getCategoryKey(supplierCategory),
                    address: '',
                    taxNumber: '',
                    paymentTerms: 'cash',
                    notes: '',
                    createdAt: new Date().toLocaleDateString('ar-SA')
                });
                
                // تحديث nextSupplierId
                if (supplierId >= nextSupplierId) {
                    nextSupplierId = supplierId + 1;
                }
            }
        }
    });
    
    console.log('تم تحميل الموردين الموجودين:', suppliersData);
}

// دالة للحصول على مفتاح الفئة
function getCategoryKey(categoryText) {
    const categoryMap = {
        'إلكترونيات': 'electronics',
        'مواد غذائية': 'food',
        'ملابس': 'clothing',
        'أثاث': 'furniture',
        'قرطاسية': 'stationery',
        'مستلزمات طبية': 'medical',
        'قطع غيار': 'automotive',
        'مواد بناء': 'construction',
        'أخرى': 'other'
    };
    
    return categoryMap[categoryText] || 'other';
}

// دالة تحديث الإحصائيات
function updateStats() {
    const totalSuppliers = suppliersData.length;
    const individualSuppliers = suppliersData.filter(s => s.type === 'individual').length;
    const companySuppliers = suppliersData.filter(s => s.type === 'company').length;
    const activeSuppliers = suppliersData.length; // جميع الموردين نشطون افتراضياً
    
    // تحديث البطاقات الإحصائية
    const totalElement = document.getElementById('total-suppliers');
    const individualElement = document.getElementById('individual-suppliers');
    const companyElement = document.getElementById('company-suppliers');
    const activeElement = document.getElementById('active-suppliers');
    
    if (totalElement) totalElement.textContent = totalSuppliers;
    if (individualElement) individualElement.textContent = individualSuppliers;
    if (companyElement) companyElement.textContent = companySuppliers;
    if (activeElement) activeElement.textContent = activeSuppliers;
}

// دالة تصفية الموردين
function filterSuppliers() {
    const searchTerm = document.getElementById('search-suppliers').value.toLowerCase();
    const typeFilter = document.getElementById('filter-type').value;
    const categoryFilter = document.getElementById('filter-category').value;
    
    const rows = document.querySelectorAll('.suppliers-table tbody tr');
    
    rows.forEach(row => {
        const name = row.cells[1].textContent.toLowerCase();
        const type = row.cells[2].textContent.includes('شركة') ? 'company' : 'individual';
        const category = getCategoryKey(row.cells[5].textContent.trim());
        
        let showRow = true;
        
        // تصفية البحث
        if (searchTerm && !name.includes(searchTerm)) {
            showRow = false;
        }
        
        // تصفية النوع
        if (typeFilter && type !== typeFilter) {
            showRow = false;
        }
        
        // تصفية الفئة
        if (categoryFilter && category !== categoryFilter) {
            showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

// دالة مسح التصفية
function clearFilters() {
    document.getElementById('search-suppliers').value = '';
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-category').value = '';
    
    // إظهار جميع الصفوف
    const rows = document.querySelectorAll('.suppliers-table tbody tr');
    rows.forEach(row => {
        row.style.display = '';
    });
}

// دوال إدارة الموردين
function editSupplier(supplierId) {
    console.log('تعديل المورد:', supplierId);
    const supplier = suppliersData.find(s => s.id === supplierId);
    if (supplier) {
        showEditSupplierModal(supplier);
    } else {
        alert('لم يتم العثور على بيانات المورد');
    }
}

function viewSupplier(supplierId) {
    console.log('عرض المورد:', supplierId);
    const supplier = suppliersData.find(s => s.id === supplierId);
    if (supplier) {
        showViewSupplierModal(supplier);
    } else {
        alert('لم يتم العثور على بيانات المورد');
    }
}

function deleteSupplier(supplierId) {
    console.log('حذف المورد:', supplierId);
    if (confirm('هل أنت متأكد من حذف هذا المورد؟')) {
        // إزالة المورد من المصفوفة
        const index = suppliersData.findIndex(s => s.id === supplierId);
        if (index > -1) {
            suppliersData.splice(index, 1);
        }
        
        // إزالة الصف من الجدول
        const row = document.querySelector(`tr:has(button[onclick="deleteSupplier(${supplierId})"])`);
        if (row) {
            row.remove();
        }
        
        // تحديث الإحصائيات
        updateStats();
        
        alert('تم حذف المورد بنجاح');
    }
}

// دالة عرض نافذة عرض تفاصيل المورد
function showViewSupplierModal(supplier) {
    // سيتم تنفيذها لاحقاً
    alert(`عرض تفاصيل المورد: ${supplier.name}`);
}

// دالة عرض نافذة تعديل المورد
function showEditSupplierModal(supplier) {
    // سيتم تنفيذها لاحقاً
    alert(`تعديل المورد: ${supplier.name}`);
}

// دالة لعرض نافذة إضافة مورد جديد
function showAddSupplierModal() {
    // إنشاء النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content-modern">
            <div class="modal-header-modern">
                <h3><i class="fas fa-user-plus"></i> إضافة مورد جديد</h3>
                <button class="close-btn" onclick="closeModal(this)">&times;</button>
            </div>
            <div class="modal-body-modern">
                <form id="add-supplier-form" class="form-modern">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="supplier-type">نوع المورد *</label>
                            <select id="supplier-type" class="select-modern" required>
                                <option value="">اختر نوع المورد</option>
                                <option value="individual">فرد</option>
                                <option value="company">شركة</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="supplier-name">اسم المورد *</label>
                            <input type="text" id="supplier-name" class="input-modern" required placeholder="أدخل اسم المورد">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="supplier-phone">رقم الهاتف *</label>
                            <input type="tel" id="supplier-phone" class="input-modern" required placeholder="05xxxxxxxx">
                        </div>
                        <div class="form-group">
                            <label for="supplier-email">البريد الإلكتروني</label>
                            <input type="email" id="supplier-email" class="input-modern" placeholder="supplier@example.com">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="supplier-company">اسم الشركة</label>
                            <input type="text" id="supplier-company" class="input-modern" placeholder="اسم الشركة (اختياري)">
                        </div>
                        <div class="form-group">
                            <label for="supplier-tax-number">الرقم الضريبي</label>
                            <input type="text" id="supplier-tax-number" class="input-modern" placeholder="الرقم الضريبي (اختياري)">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group full-width">
                            <label for="supplier-address">العنوان</label>
                            <textarea id="supplier-address" class="textarea-modern" rows="3" placeholder="أدخل عنوان المورد"></textarea>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="supplier-category">فئة المورد</label>
                            <select id="supplier-category" class="select-modern">
                                <option value="">اختر الفئة</option>
                                <option value="electronics">إلكترونيات</option>
                                <option value="food">مواد غذائية</option>
                                <option value="clothing">ملابس</option>
                                <option value="furniture">أثاث</option>
                                <option value="stationery">قرطاسية</option>
                                <option value="medical">مستلزمات طبية</option>
                                <option value="automotive">قطع غيار</option>
                                <option value="construction">مواد بناء</option>
                                <option value="other">أخرى</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="supplier-payment-terms">شروط الدفع</label>
                            <select id="supplier-payment-terms" class="select-modern">
                                <option value="">اختر شروط الدفع</option>
                                <option value="cash">نقداً</option>
                                <option value="credit_7">آجل 7 أيام</option>
                                <option value="credit_15">آجل 15 يوم</option>
                                <option value="credit_30">آجل 30 يوم</option>
                                <option value="credit_60">آجل 60 يوم</option>
                                <option value="credit_90">آجل 90 يوم</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group full-width">
                            <label for="supplier-notes">ملاحظات</label>
                            <textarea id="supplier-notes" class="textarea-modern" rows="2" placeholder="ملاحظات إضافية عن المورد"></textarea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer-modern">
                <button type="button" class="btn-modern btn-secondary" onclick="closeModal(this)">
                    <i class="fas fa-times"></i> إلغاء
                </button>
                <button type="submit" form="add-supplier-form" class="btn-modern btn-success">
                    <i class="fas fa-save"></i> حفظ المورد
                </button>
            </div>
        </div>
    `;

    // إضافة النافذة للصفحة
    document.body.appendChild(modal);

    // إضافة مستمع الحدث لإرسال النموذج
    const form = document.getElementById('add-supplier-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSupplierFormSubmit();
    });

    // التركيز على أول حقل
    setTimeout(() => {
        const firstInput = modal.querySelector('select, input');
        if (firstInput) firstInput.focus();
    }, 100);
}

// دالة لمعالجة إرسال نموذج المورد
function handleSupplierFormSubmit() {
    // جمع بيانات النموذج
    const supplierData = {
        id: nextSupplierId++,
        type: document.getElementById('supplier-type').value,
        name: document.getElementById('supplier-name').value,
        phone: document.getElementById('supplier-phone').value,
        email: document.getElementById('supplier-email').value,
        company: document.getElementById('supplier-company').value,
        taxNumber: document.getElementById('supplier-tax-number').value,
        address: document.getElementById('supplier-address').value,
        category: document.getElementById('supplier-category').value,
        paymentTerms: document.getElementById('supplier-payment-terms').value,
        notes: document.getElementById('supplier-notes').value,
        createdAt: new Date().toLocaleDateString('ar-SA')
    };

    // التحقق من صحة البيانات
    if (!supplierData.name.trim()) {
        alert('يرجى إدخال اسم المورد');
        return;
    }

    if (!supplierData.phone.trim()) {
        alert('يرجى إدخال رقم الهاتف');
        return;
    }

    if (!supplierData.type) {
        alert('يرجى اختيار نوع المورد');
        return;
    }

    // إضافة المورد للمصفوفة
    suppliersData.push(supplierData);

    // إضافة المورد للجدول
    addSupplierToTable(supplierData);

    // تحديث الإحصائيات
    updateStats();

    // عرض رسالة نجاح
    showSupplierSuccessMessage(supplierData);

    // إغلاق النافذة
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// دالة لإضافة المورد للجدول
function addSupplierToTable(supplier) {
    const tbody = document.querySelector('.suppliers-table tbody');
    if (!tbody) {
        console.log('لم يتم العثور على جدول الموردين');
        return;
    }

    const row = document.createElement('tr');
    row.style.animation = 'slideInRow 0.5s ease';

    const categoryText = getCategoryText(supplier.category);
    const typeText = supplier.type === 'company' ? 'شركة' : 'فرد';
    const badgeClass = supplier.type === 'company' ? 'primary' : 'success';
    const categoryBadgeClass = getCategoryBadgeClass(supplier.category);

    row.innerHTML = `
        <td><strong>${String(supplier.id).padStart(3, '0')}</strong></td>
        <td><strong>${supplier.name}</strong></td>
        <td><span class="badge ${badgeClass}">${typeText}</span></td>
        <td>${supplier.phone}</td>
        <td>${supplier.email || '-'}</td>
        <td><span class="badge ${categoryBadgeClass}">${categoryText}</span></td>
        <td>
            <div class="action-buttons-horizontal">
                <button class="action-btn edit" onclick="editSupplier(${supplier.id})" title="تعديل">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn view" onclick="viewSupplier(${supplier.id})" title="عرض">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn delete" onclick="deleteSupplier(${supplier.id})" title="حذف">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;

    // إضافة الصف في المقدمة
    tbody.insertBefore(row, tbody.firstChild);

    console.log('تم إضافة المورد للجدول:', supplier.name);
}

// دالة للحصول على نص الفئة
function getCategoryText(categoryKey) {
    const categoryMap = {
        'electronics': 'إلكترونيات',
        'food': 'مواد غذائية',
        'clothing': 'ملابس',
        'furniture': 'أثاث',
        'stationery': 'قرطاسية',
        'medical': 'مستلزمات طبية',
        'automotive': 'قطع غيار',
        'construction': 'مواد بناء',
        'other': 'أخرى'
    };

    return categoryMap[categoryKey] || 'أخرى';
}

// دالة للحصول على فئة شارة الفئة
function getCategoryBadgeClass(categoryKey) {
    const badgeMap = {
        'electronics': 'success',
        'food': 'warning',
        'clothing': 'info',
        'furniture': 'secondary',
        'stationery': 'primary',
        'medical': 'danger',
        'automotive': 'dark',
        'construction': 'secondary',
        'other': 'secondary'
    };

    return badgeMap[categoryKey] || 'secondary';
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
                    <p><strong>اسم المورد:</strong> ${supplierData.name}</p>
                    <p><strong>النوع:</strong> ${supplierData.type === 'company' ? 'شركة' : 'فرد'}</p>
                    <p><strong>رقم الهاتف:</strong> ${supplierData.phone}</p>
                    ${supplierData.email ? `<p><strong>البريد الإلكتروني:</strong> ${supplierData.email}</p>` : ''}
                    ${supplierData.category ? `<p><strong>الفئة:</strong> ${getCategoryText(supplierData.category)}</p>` : ''}
                </div>
            </div>
            <div class="modal-footer-modern">
                <button type="button" class="btn-modern btn-secondary" onclick="closeModal(this)">
                    <i class="fas fa-times"></i> إغلاق
                </button>
                <button type="button" class="btn-modern btn-success" onclick="showAddSupplierModal(); closeModal(this)">
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

// دالة إغلاق النافذة المنبثقة
function closeModal(element) {
    const modal = element.closest('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

// إضافة أنماط CSS للانيميشن
if (!document.querySelector('#suppliers-animations')) {
    const style = document.createElement('style');
    style.id = 'suppliers-animations';
    style.textContent = `
        @keyframes slideInRow {
            from { opacity: 0; transform: translateX(50px); background: #e8f5e8; }
            to { opacity: 1; transform: translateX(0); background: transparent; }
        }

        .success-modal .modal-header-modern.success {
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        }

        .success-details {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #28a745;
        }

        .success-details p {
            margin: 8px 0;
            color: #2c3e50;
        }

        .success-details strong {
            color: #28a745;
        }
    `;
    document.head.appendChild(style);
}
