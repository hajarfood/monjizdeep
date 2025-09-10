// تعريف دالة showNewInvoiceModal مع معالجة محسنة للأخطاء
function showNewInvoiceModal() {
    try {
        // First check if function is available
        if (typeof window.showAddInvoiceModal === 'function') {
            window.showAddInvoiceModal();
            return;
        }

        // If not available, wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                attemptToShowModal();
            });
        } else {
            attemptToShowModal();
        }
    } catch (error) {
        console.error('خطأ في showNewInvoiceModal:', error);
        showAlert('حدث خطأ في فتح نافذة الفاتورة الجديدة', 'error');
    }
}

// دالة مساعدة لمحاولة عرض النافذة
function attemptToShowModal() {
    if (typeof window.showAddInvoiceModal === 'function') {
        window.showAddInvoiceModal();
    } else {
        // If still not available, check again after delay
        setTimeout(() => {
            if (typeof window.showAddInvoiceModal === 'function') {
                window.showAddInvoiceModal();
            } else {
                console.error('showAddInvoiceModal function not found in window object');
                showAlert('تعذر فتح نافذة الفاتورة الجديدة. يرجى إعادة تحميل الصفحة والمحاولة مرة أخرى.', 'warning');
            }
        }, 500);
    }
}

// ملف JavaScript لإدارة المبيعات

document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل نظام إدارة المبيعات');

    // تهيئة النظام
    initSalesSystem();

    // إضافة مستمعي الأحداث
    setupEventListeners();

    // تحميل البيانات
    loadInvoicesData();
});

// دالة تهيئة نظام المبيعات
function initSalesSystem() {
    console.log('تهيئة نظام المبيعات...');

    // تحديث الإحصائيات
    updateSalesStats();

    // تهيئة البحث والتصفية
    initSearchAndFilters();
}

// دالة إعداد مستمعي الأحداث
function setupEventListeners() {
    // زر إضافة فاتورة جديدة
    const addInvoiceBtn = document.querySelector('.add-invoice-btn');
    if (addInvoiceBtn) {
        addInvoiceBtn.addEventListener('click', showAddInvoiceModal);
    }

    // زر مسح التصفية
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // حقل البحث
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // قوائم التصفية
    const statusFilter = document.getElementById('status-filter');
    const paymentFilter = document.getElementById('payment-filter');

    if (statusFilter) {
        statusFilter.addEventListener('change', applyFilters);
    }

    if (paymentFilter) {
        paymentFilter.addEventListener('change', applyFilters);
    }

    // إعداد مستمعي الأحداث الإضافية
    setupAdditionalEventListeners();
}

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

// بيانات الفواتير (بيانات تجريبية)
const invoicesData = [
    {
        id: "INV-2023-001",
        date: "2023-06-20",
        customer: "أحمد محمد",
        productsCount: 5,
        total: 1250.00,
        paymentMethod: "بطاقة ائتمان",
        status: "completed"
    },
    {
        id: "INV-2023-002",
        date: "2023-06-20",
        customer: "شركة النور للتجارة",
        productsCount: 12,
        total: 3500.00,
        paymentMethod: "تحويل بنكي",
        status: "completed"
    },
    {
        id: "INV-2023-003",
        date: "2023-06-19",
        customer: "سارة عبدالله",
        productsCount: 3,
        total: 750.00,
        paymentMethod: "نقدي",
        status: "completed"
    },
    {
        id: "INV-2023-004",
        date: "2023-06-19",
        customer: "مؤسسة الأمل",
        productsCount: 8,
        total: 4200.00,
        paymentMethod: "تحويل بنكي",
        status: "pending"
    },
    {
        id: "INV-2023-005",
        date: "2023-06-18",
        customer: "خالد العمري",
        productsCount: 2,
        total: 500.00,
        paymentMethod: "نقدي",
        status: "cancelled"
    },
    {
        id: "INV-2023-006",
        date: "2023-06-18",
        customer: "شركة البناء الحديث",
        productsCount: 15,
        total: 8750.00,
        paymentMethod: "شيك",
        status: "completed"
    },
    {
        id: "INV-2023-007",
        date: "2023-06-17",
        customer: "محمد علي",
        productsCount: 4,
        total: 1200.00,
        paymentMethod: "بطاقة ائتمان",
        status: "completed"
    },
    {
        id: "INV-2023-008",
        date: "2023-06-17",
        customer: "نورة سعيد",
        productsCount: 1,
        total: 350.00,
        paymentMethod: "نقدي",
        status: "completed"
    },
    {
        id: "INV-2023-009",
        date: "2023-06-16",
        customer: "شركة الأفق",
        productsCount: 10,
        total: 5500.00,
        paymentMethod: "تحويل بنكي",
        status: "pending"
    },
    {
        id: "INV-2023-010",
        date: "2023-06-15",
        customer: "عبدالله محمد",
        productsCount: 6,
        total: 1800.00,
        paymentMethod: "بطاقة ائتمان",
        status: "completed"
    }
];

// عرض الفواتير في الجدول
function displayInvoices(invoices) {
    const tableBody = document.getElementById('invoices-table-body');
    tableBody.innerHTML = '';

    if (invoices.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="9" class="no-results">لا توجد فواتير مطابقة للبحث</td>`;
        tableBody.appendChild(emptyRow);
        return;
    }

    invoices.forEach(invoice => {
        const row = document.createElement('tr');
        // إضافة سمة data-id للصف لتسهيل تحديثه لاحقًا
        row.setAttribute('data-id', invoice.id);
        
        // تحديد فئة حالة الفاتورة
        let statusClass = '';
        let statusText = '';
        
        switch (invoice.status) {
            case 'completed':
                statusClass = 'status-completed';
                statusText = 'مكتملة';
                break;
            case 'pending':
                statusClass = 'status-pending';
                statusText = 'معلقة';
                break;
            case 'cancelled':
                statusClass = 'status-cancelled';
                statusText = 'ملغاة';
                break;
            default:
                statusClass = '';
                statusText = invoice.status;
        }
        
        // تحديد طريقة الدفع بالعربية
        let paymentMethodText = invoice.paymentMethod;
        if (typeof invoice.paymentMethod === 'string') {
            switch(invoice.paymentMethod.toLowerCase()) {
                case 'cash':
                    paymentMethodText = 'نقداً';
                    break;
                case 'card':
                    paymentMethodText = 'بطاقة ائتمان';
                    break;
                case 'transfer':
                    paymentMethodText = 'تحويل بنكي';
                    break;
                case 'credit':
                    paymentMethodText = 'آجل';
                    break;
            }
        }
        
        // تنسيق التاريخ (ميلادي)
        const invoiceDate = new Date(invoice.date);
        const day = invoiceDate.getDate().toString().padStart(2, '0');
        const month = (invoiceDate.getMonth() + 1).toString().padStart(2, '0');
        const year = invoiceDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`; // dd/mm/yyyy ميلادي
        
        // تنسيق المبلغ
        const formattedTotal = invoice.total.toLocaleString('ar-SA', {minimumFractionDigits: 2}) + ' ر.س';
        
        // تحديد عرض المنتجات
        let productsDisplay = invoice.productsCount || 0;
        if (invoice.products && invoice.products.length > 0) {
            productsDisplay = invoice.products.map(p => p.name).join(', ');
        }
        
        row.innerHTML = `
            <td>
                <div class="checkbox-wrapper">
                    <input type="checkbox" class="invoice-checkbox" data-id="${invoice.id}" onchange="updatePrintSelectedButton()">
                </div>
            </td>
            <td>${invoice.id}</td>
            <td>${formattedDate}</td>
            <td>${invoice.customer}</td>
            <td>${productsDisplay}</td>
            <td>${formattedTotal}</td>
            <td><span class="payment-badge">${paymentMethodText}</span></td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
            <td>
                <div class="invoice-actions">
                    <button class="action-btn view-btn" data-id="${invoice.id}" title="عرض التفاصيل">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn print-btn" data-id="${invoice.id}" title="طباعة">
                        <i class="fas fa-print"></i>
                    </button>
                    <button class="action-btn edit-btn" data-id="${invoice.id}" title="تعديل">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${invoice.id}" title="حذف">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });

    // إضافة مستمعي الأحداث لأزرار الإجراءات
    addActionButtonListeners();
}

// إضافة مستمعي الأحداث لأزرار الإجراءات
function addActionButtonListeners() {
    // أزرار عرض التفاصيل
    document.querySelectorAll('.view-btn').forEach(button => {
        button.addEventListener('click', () => {
            const invoiceId = button.getAttribute('data-id');
            viewInvoiceDetails(invoiceId);
        });
    });

    // أزرار الطباعة
    document.querySelectorAll('.print-btn').forEach(button => {
        button.addEventListener('click', () => {
            const invoiceId = button.getAttribute('data-id');
            printInvoice(invoiceId);
        });
    });

    // أزرار التعديل
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', () => {
            const invoiceId = button.getAttribute('data-id');
            editInvoice(invoiceId);
        });
    });

    // أزرار الحذف
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', () => {
            const invoiceId = button.getAttribute('data-id');
            deleteInvoice(invoiceId);
        });
    });
}

// البحث وتصفية الفواتير
function searchAndFilterInvoices() {
    const searchTerm = document.getElementById('invoice-search').value.trim().toLowerCase();
    const dateFilter = document.getElementById('date-filter').value;
    const statusFilter = document.getElementById('status-filter').value;
    const paymentFilter = document.getElementById('payment-filter').value;
    
    // تحديد نطاق التاريخ بناءً على التصفية المحددة
    let startDate = null;
    let endDate = null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    switch (dateFilter) {
        case 'today':
            startDate = today;
            endDate = new Date(today);
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'yesterday':
            startDate = new Date(today);
            startDate.setDate(today.getDate() - 1);
            endDate = new Date(startDate);
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'week':
            startDate = new Date(today);
            startDate.setDate(today.getDate() - today.getDay()); // بداية الأسبوع (الأحد)
            endDate = new Date(today);
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'month':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
            break;
        case 'custom':
            const customStartDate = document.getElementById('start-date').value;
            const customEndDate = document.getElementById('end-date').value;
            if (customStartDate) {
                startDate = new Date(customStartDate);
                startDate.setHours(0, 0, 0, 0);
            }
            if (customEndDate) {
                endDate = new Date(customEndDate);
                endDate.setHours(23, 59, 59, 999);
            }
            break;
    }
    
    // تطبيق التصفية
    let filteredInvoices = invoicesData.filter(invoice => {
        const invoiceDate = new Date(invoice.date);
        invoiceDate.setHours(0, 0, 0, 0);
        
        // تصفية حسب التاريخ
        if (startDate && endDate) {
            if (invoiceDate < startDate || invoiceDate > endDate) {
                return false;
            }
        }
        
        // تصفية حسب الحالة
        if (statusFilter !== 'all' && invoice.status !== statusFilter) {
            return false;
        }
        
        // تصفية حسب طريقة الدفع
        if (paymentFilter !== 'all') {
            // تحويل طرق الدفع الإنجليزية إلى العربية للمقارنة
            let paymentMethodForComparison = invoice.paymentMethod.toLowerCase();
            
            switch(paymentFilter) {
                case 'cash':
                    if (!['نقدي', 'نقداً', 'cash'].includes(paymentMethodForComparison)) {
                        return false;
                    }
                    break;
                case 'card':
                    if (!['بطاقة ائتمان', 'بطاقة', 'card'].includes(paymentMethodForComparison)) {
                        return false;
                    }
                    break;
                case 'transfer':
                    if (!['تحويل بنكي', 'تحويل', 'transfer'].includes(paymentMethodForComparison)) {
                        return false;
                    }
                    break;
                case 'cheque':
                    if (!['شيك', 'cheque'].includes(paymentMethodForComparison)) {
                        return false;
                    }
                    break;
                case 'credit':
                    if (!['آجل', 'credit'].includes(paymentMethodForComparison)) {
                        return false;
                    }
                    break;
                default:
                    // إذا كان هناك قيمة أخرى، نقارن بشكل مباشر
                    if (paymentMethodForComparison !== paymentFilter) {
                        return false;
                    }
            }
        }
        
        // تصفية حسب مصطلح البحث
        if (searchTerm) {
            return invoice.id.toLowerCase().includes(searchTerm) || 
                   invoice.customer.toLowerCase().includes(searchTerm) ||
                   (invoice.products && invoice.products.some(p => p.name.toLowerCase().includes(searchTerm)));
        }
        
        return true;
    });
    
    // عرض النتائج
    displayInvoices(filteredInvoices);
    
    // تحديث إحصائيات المبيعات بناءً على الفواتير المصفاة
    updateSalesStats(filteredInvoices);
    
    // عرض عدد النتائج
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `${filteredInvoices.length} فاتورة`;
    }
}

// عرض تفاصيل الفاتورة
function viewInvoiceDetails(invoiceId) {
    // البحث عن الفاتورة بالمعرف
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (!invoice) {
        alert('لم يتم العثور على الفاتورة');
        return;
    }
    
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // تحديد حالة الفاتورة وطريقة الدفع بالعربية
    let statusText, statusClass;
    switch(invoice.status) {
        case 'completed':
            statusText = 'مكتملة';
            statusClass = 'completed';
            break;
        case 'pending':
            statusText = 'معلقة';
            statusClass = 'pending';
            break;
        case 'cancelled':
            statusText = 'ملغية';
            statusClass = 'cancelled';
            break;
        default:
            statusText = invoice.status;
            statusClass = '';
    }
    
    let paymentText = invoice.paymentMethod;
    
    // تنسيق التاريخ (ميلادي)
    const invoiceDate = new Date(invoice.date);
    const formattedDate = invoiceDate.toLocaleDateString('en-GB'); // dd/mm/yyyy ميلادي
    
    // تنسيق المبلغ
    const formattedTotal = new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR'
    }).format(invoice.total);
    
    // إنشاء محتوى النافذة المنبثقة
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>تفاصيل الفاتورة ${invoice.id}</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="invoice-details">
                    <div class="invoice-info">
                        <h4>معلومات الفاتورة</h4>
                        <p><strong>رقم الفاتورة:</strong> ${invoice.id}</p>
                        <p><strong>التاريخ:</strong> ${formattedDate}</p>
                        <p><strong>العميل:</strong> ${invoice.customer}</p>
                        <p><strong>عدد المنتجات:</strong> ${invoice.productsCount}</p>
                        <p><strong>طريقة الدفع:</strong> <span class="payment-badge">${paymentText}</span></p>
                        <p><strong>الحالة:</strong> <span class="status-badge ${statusClass}">${statusText}</span></p>
                    </div>
                    
                    <div class="invoice-summary">
                        <h4>ملخص الفاتورة</h4>
                        <div class="total-amount">
                            <span>إجمالي المبلغ:</span>
                            <span class="amount">${formattedTotal}</span>
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn primary-btn edit-invoice-btn" data-id="${invoice.id}">تعديل</button>
                    <button class="btn primary-btn print-invoice-btn" data-id="${invoice.id}">طباعة</button>
                    <button class="btn cancel-btn close-modal-btn">إغلاق</button>
                </div>
            </div>
        </div>
    `;
    
    // إضافة النافذة المنبثقة إلى الصفحة
    document.body.appendChild(modal);
    
    // إضافة نمط CSS للنافذة المنبثقة إذا لم يكن موجوداً
    if (!document.querySelector('#invoice-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'invoice-modal-styles';
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
                max-width: 700px;
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
            
            .invoice-details {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            
            .invoice-info h4,
            .invoice-summary h4 {
                margin-top: 0;
                margin-bottom: 15px;
                color: #333;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
            }
            
            .invoice-info p {
                margin: 8px 0;
            }
            
            .total-amount {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                background-color: #f9f9f9;
                border-radius: 4px;
                margin-top: 20px;
            }
            
            .amount {
                font-size: 1.5rem;
                font-weight: bold;
                color: #3498db;
            }
            
            .status-badge {
                display: inline-block;
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 0.85rem;
            }
            
            .status-badge.completed {
                background-color: #e6f7ee;
                color: #27ae60;
            }
            
            .status-badge.pending {
                background-color: #fff5e6;
                color: #f39c12;
            }
            
            .status-badge.cancelled {
                background-color: #fee;
                color: #e74c3c;
            }
            
            .payment-badge {
                display: inline-block;
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 0.85rem;
                background-color: #f8f9fa;
                color: #495057;
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
                
                .invoice-details {
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
    const editInvoiceBtn = modal.querySelector('.edit-invoice-btn');
    const printInvoiceBtn = modal.querySelector('.print-invoice-btn');
    
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
    
    // تعديل الفاتورة عند النقر على زر التعديل
    editInvoiceBtn.addEventListener('click', function() {
        const invoiceId = this.getAttribute('data-id');
        document.body.removeChild(modal);
        editInvoice(invoiceId);
    });
    
    // طباعة الفاتورة عند النقر على زر الطباعة
    printInvoiceBtn.addEventListener('click', function() {
        const invoiceId = this.getAttribute('data-id');
        document.body.removeChild(modal);
        printInvoice(invoiceId);
    });
}

// طباعة الفاتورة
function printInvoice(invoiceId) {
    // البحث عن الفاتورة بالمعرف
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (!invoice) {
        alert('لم يتم العثور على الفاتورة');
        return;
    }
    
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // تحديد حالة الفاتورة وطريقة الدفع بالعربية
    let statusText, statusClass;
    switch(invoice.status) {
        case 'completed':
            statusText = 'مكتملة';
            statusClass = 'completed';
            break;
        case 'pending':
            statusText = 'معلقة';
            statusClass = 'pending';
            break;
        case 'cancelled':
            statusText = 'ملغية';
            statusClass = 'cancelled';
            break;
        default:
            statusText = invoice.status;
            statusClass = '';
    }
    
    // تحديد طريقة الدفع بالعربية
    let paymentMethodText;
    switch(invoice.paymentMethod) {
        case 'cash':
            paymentMethodText = 'نقداً';
            break;
        case 'card':
            paymentMethodText = 'بطاقة ائتمان';
            break;
        case 'transfer':
            paymentMethodText = 'تحويل بنكي';
            break;
        case 'credit':
            paymentMethodText = 'آجل';
            break;
        default:
            paymentMethodText = invoice.paymentMethod;
    }
    
    // تنسيق التاريخ
    const invoiceDate = new Date(invoice.date);
    const day = invoiceDate.getDate().toString().padStart(2, '0');
    const month = (invoiceDate.getMonth() + 1).toString().padStart(2, '0');
    const year = invoiceDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    
    // إنشاء جدول المنتجات
    let productsTable = '';
    if (invoice.products && invoice.products.length > 0) {
        productsTable = `
            <table class="products-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>المنتج</th>
                        <th>الكمية</th>
                        <th>السعر</th>
                        <th>الإجمالي</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        invoice.products.forEach((product, index) => {
            productsTable += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.price.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س</td>
                    <td>${(product.quantity * product.price).toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س</td>
                </tr>
            `;
        });
        
        productsTable += `
                </tbody>
            </table>
        `;
    } else {
        productsTable = '<p>لا توجد منتجات في هذه الفاتورة</p>';
    }
    
    // إنشاء محتوى النافذة المنبثقة
    modal.innerHTML = `
        <div class="modal-content print-modal">
            <div class="modal-header">
                <h3>طباعة الفاتورة</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="print-header">
                    <div class="company-info">
                        <h2>شركة منجز</h2>
                        <p>الرياض، المملكة العربية السعودية</p>
                        <p>هاتف: 966123456789+</p>
                        <p>البريد الإلكتروني: info@monjiz.com</p>
                    </div>
                    <div class="invoice-info">
                        <h3>فاتورة رقم: ${invoice.id}</h3>
                        <p>التاريخ: ${formattedDate}</p>
                        <p>العميل: ${invoice.customer}</p>
                        <p>طريقة الدفع: ${paymentMethodText}</p>
                        <p>الحالة: <span class="status-badge ${statusClass}">${statusText}</span></p>
                    </div>
                </div>
                
                <div class="print-products">
                    <h4>المنتجات</h4>
                    ${productsTable}
                </div>
                
                <div class="print-summary">
                    <div class="summary-item">
                        <span>المجموع الفرعي:</span>
                        <span>${(invoice.total * 0.85).toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س</span>
                    </div>
                    <div class="summary-item">
                        <span>الضريبة (15%):</span>
                        <span>${(invoice.total * 0.15).toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س</span>
                    </div>
                    <div class="summary-item total">
                        <span>الإجمالي:</span>
                        <span>${invoice.total.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س</span>
                    </div>
                </div>
                
                <div class="print-notes">
                    <h4>ملاحظات</h4>
                    <p>${invoice.notes || 'لا توجد ملاحظات'}</p>
                </div>
                
                <div class="print-footer">
                    <p>شكراً لتعاملكم معنا</p>
                </div>
            </div>
            <div class="modal-actions">
                <button class="btn primary-btn" onclick="window.print()">طباعة</button>
                <button class="btn cancel-btn close-modal-btn">إغلاق</button>
            </div>
        </div>
    `;
    
    // إضافة النافذة المنبثقة إلى الصفحة
    document.body.appendChild(modal);
    
    // إضافة CSS للنافذة المنبثقة
    addPrintModalStyles();
    
    // إضافة مستمعي الأحداث للنافذة المنبثقة
    const closeBtn = modal.querySelector('.close');
    const closeModalBtn = modal.querySelector('.close-modal-btn');
    
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
}

// إضافة أنماط CSS للنافذة المنبثقة للطباعة
function addPrintModalStyles() {
    // التحقق من وجود الأنماط
    if (document.getElementById('print-modal-styles')) {
        return;
    }
    
    // إنشاء عنصر الأنماط
    const style = document.createElement('style');
    style.id = 'print-modal-styles';
    style.textContent = `
        .print-modal .modal-body {
            padding: 20px;
        }
        
        .print-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            border-bottom: 1px solid #eee;
            padding-bottom: 20px;
        }
        
        .company-info h2 {
            margin-top: 0;
            color: #3498db;
        }
        
        .company-info p {
            margin: 5px 0;
            color: #555;
        }
        
        .invoice-info h3 {
            margin-top: 0;
            color: #333;
        }
        
        .invoice-info p {
            margin: 5px 0;
            color: #555;
        }
        
        .print-products h4 {
            margin-top: 0;
            margin-bottom: 15px;
            color: #333;
        }
        
        .products-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        
        .products-table th, .products-table td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: right;
        }
        
        .products-table th {
            background-color: #f8f9fa;
            font-weight: 600;
        }
        
        .print-summary {
            margin-bottom: 30px;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
        
        .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .summary-item.total {
            font-weight: bold;
            font-size: 1.2rem;
            border-top: 1px solid #ddd;
            padding-top: 10px;
            margin-top: 10px;
        }
        
        .print-notes {
            margin-bottom: 30px;
        }
        
        .print-notes h4 {
            margin-top: 0;
            margin-bottom: 10px;
            color: #333;
        }
        
        .print-footer {
            text-align: center;
            margin-top: 50px;
            color: #777;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
        
        @media print {
            .modal-header, .modal-actions, .close {
                display: none;
            }
            
            .modal {
                position: static;
                background: white;
            }
            
            .modal-content {
                box-shadow: none;
                width: 100%;
                margin: 0;
                padding: 0;
            }
            
            body * {
                visibility: hidden;
            }
            
            .modal, .modal * {
                visibility: visible;
            }
            
            .modal {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// تعديل الفاتورة
function editInvoice(invoiceId) {
    // البحث عن الفاتورة بالمعرف
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (!invoice) {
        alert('لم يتم العثور على الفاتورة');
        return;
    }
    
    // إنشاء عنصر النافذة المنبثقة
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // تحديد حالة الفاتورة وطريقة الدفع بالعربية
    let statusText, statusClass;
    switch(invoice.status) {
        case 'completed':
            statusText = 'مكتملة';
            statusClass = 'completed';
            break;
        case 'pending':
            statusText = 'معلقة';
            statusClass = 'pending';
            break;
        case 'cancelled':
            statusText = 'ملغية';
            statusClass = 'cancelled';
            break;
        default:
            statusText = invoice.status;
            statusClass = '';
    }
    
    // تنسيق التاريخ
    const invoiceDate = new Date(invoice.date);
    const formattedDate = invoiceDate.toISOString().split('T')[0]; // تنسيق YYYY-MM-DD للإدخال
    
    // إنشاء محتوى النافذة المنبثقة
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>تعديل الفاتورة ${invoice.id}</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <form id="edit-invoice-form">
                    <div class="form-group">
                        <label for="customer">العميل</label>
                        <input type="text" id="customer" value="${invoice.customer}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="date">التاريخ</label>
                        <input type="date" id="date" value="${formattedDate}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="payment-method">طريقة الدفع</label>
                        <select id="payment-method">
                            <option value="cash" ${invoice.paymentMethod === 'cash' ? 'selected' : ''}>نقداً</option>
                            <option value="card" ${invoice.paymentMethod === 'card' ? 'selected' : ''}>بطاقة ائتمان</option>
                            <option value="transfer" ${invoice.paymentMethod === 'transfer' ? 'selected' : ''}>تحويل بنكي</option>
                            <option value="credit" ${invoice.paymentMethod === 'credit' ? 'selected' : ''}>آجل</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="status">الحالة</label>
                        <select id="status">
                            <option value="completed" ${invoice.status === 'completed' ? 'selected' : ''}>مكتملة</option>
                            <option value="pending" ${invoice.status === 'pending' ? 'selected' : ''}>معلقة</option>
                            <option value="cancelled" ${invoice.status === 'cancelled' ? 'selected' : ''}>ملغية</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="total">المبلغ الإجمالي</label>
                        <input type="number" id="total" value="${invoice.total}" step="0.01" required>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn primary-btn">حفظ التغييرات</button>
                        <button type="button" class="btn cancel-btn close-modal-btn">إلغاء</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    // إضافة النافذة المنبثقة إلى الصفحة
    document.body.appendChild(modal);
    
    // إضافة نمط CSS للنافذة المنبثقة إذا لم يكن موجوداً
    if (!document.querySelector('#invoice-edit-modal-styles')) {
        const style = document.createElement('style');
        style.id = 'invoice-edit-modal-styles';
        style.textContent = `
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
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                border-color: #3498db;
                outline: none;
                box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
            }
            
            .form-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 20px;
            }
        `;
        document.head.appendChild(style);
    }
    
    // إضافة مستمعي الأحداث للنافذة المنبثقة
    const closeBtn = modal.querySelector('.close');
    const closeModalBtn = modal.querySelector('.close-modal-btn');
    const editInvoiceForm = modal.querySelector('#edit-invoice-form');
    
    // إغلاق النافذة عند النقر على زر الإغلاق
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // إغلاق النافذة عند النقر على زر الإلغاء
    closeModalBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // إغلاق النافذة عند النقر خارجها
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // معالجة تقديم النموذج
    editInvoiceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع البيانات من النموذج
        const updatedInvoice = {
            ...invoice,
            customer: document.getElementById('customer').value,
            date: document.getElementById('date').value,
            paymentMethod: document.getElementById('payment-method').value,
            status: document.getElementById('status').value,
            total: parseFloat(document.getElementById('total').value)
        };
        
        // تحديث الفاتورة في البيانات
        const index = invoicesData.findIndex(inv => inv.id === invoiceId);
        if (index !== -1) {
            invoicesData[index] = updatedInvoice;
            
            // تحديث صف الفاتورة في الجدول
            updateInvoiceRow(updatedInvoice);
            
            // عرض رسالة نجاح
            showAlert('تم تحديث الفاتورة بنجاح', 'success');
            
            // إغلاق النافذة المنبثقة
            document.body.removeChild(modal);
        }
    });
}

// حذف الفاتورة
function deleteInvoice(invoiceId) {
    const invoice = invoicesData.find(inv => inv.id === invoiceId);
    if (invoice) {
        if (confirm(`هل أنت متأكد من حذف الفاتورة: ${invoice.id}؟`)) {
            // في التطبيق الحقيقي، سيتم إرسال طلب حذف إلى الخادم
            
            // تحديث واجهة المستخدم
            const index = invoicesData.findIndex(inv => inv.id === invoiceId);
            if (index !== -1) {
                invoicesData.splice(index, 1);
                // تحديث الجدول والإحصائيات
                searchAndFilterInvoices();
                updateSalesStats();
                // عرض رسالة نجاح
                showAlert(`تم حذف الفاتورة: ${invoice.id} بنجاح`, 'success');
            }
        }
    }
}

// تحديث صف الفاتورة في الجدول
function updateInvoiceRow(invoice) {
    // البحث عن صف الفاتورة في الجدول
    const invoiceRow = document.querySelector(`tr[data-id="${invoice.id}"]`);
    if (!invoiceRow) {
        return;
    }
    
    // تحديد حالة الفاتورة وطريقة الدفع بالعربية
    let statusText, statusClass;
    switch(invoice.status) {
        case 'completed':
            statusText = 'مكتملة';
            statusClass = 'completed';
            break;
        case 'pending':
            statusText = 'معلقة';
            statusClass = 'pending';
            break;
        case 'cancelled':
            statusText = 'ملغية';
            statusClass = 'cancelled';
            break;
        default:
            statusText = invoice.status;
            statusClass = '';
    }
    
    // تحديد طريقة الدفع بالعربية
    let paymentMethodText;
    switch(invoice.paymentMethod) {
        case 'cash':
            paymentMethodText = 'نقداً';
            break;
        case 'card':
            paymentMethodText = 'بطاقة ائتمان';
            break;
        case 'transfer':
            paymentMethodText = 'تحويل بنكي';
            break;
        case 'credit':
            paymentMethodText = 'آجل';
            break;
        default:
            paymentMethodText = invoice.paymentMethod;
    }
    
    // تنسيق التاريخ
    const invoiceDate = new Date(invoice.date);
    const day = invoiceDate.getDate().toString().padStart(2, '0');
    const month = (invoiceDate.getMonth() + 1).toString().padStart(2, '0');
    const year = invoiceDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    
    // تحديث محتوى الصف
    invoiceRow.querySelector('td:nth-child(2)').textContent = formattedDate;
    invoiceRow.querySelector('td:nth-child(3)').textContent = invoice.customer;
    
    // تحديث المنتجات
    const productsCell = invoiceRow.querySelector('td:nth-child(4)');
    if (invoice.products && invoice.products.length > 0) {
        productsCell.textContent = invoice.products.map(p => p.name).join(', ');
    } else {
        productsCell.textContent = 'لا توجد منتجات';
    }
    
    // تحديث المبلغ الإجمالي
    invoiceRow.querySelector('td:nth-child(5)').textContent = `${invoice.total.toLocaleString('ar-SA', {minimumFractionDigits: 2})} ر.س`;
    
    // تحديث طريقة الدفع
    const paymentMethodCell = invoiceRow.querySelector('td:nth-child(6)');
    paymentMethodCell.innerHTML = `<span class="payment-badge">${paymentMethodText}</span>`;
    
    // تحديث الحالة
    const statusCell = invoiceRow.querySelector('td:nth-child(7)');
    statusCell.innerHTML = `<span class="status-badge ${statusClass}">${statusText}</span>`;
    
    // تحديث الإحصائيات
    updateSalesStats();
}

// إضافة فاتورة جديدة
function addNewInvoice() {
    // استدعاء دالة showAddInvoiceModal من ملف main.js
    if (typeof showAddInvoiceModal === 'function') {
        showAddInvoiceModal();
    } else {
        alert("حدث خطأ في تحميل نموذج إنشاء فاتورة جديدة");
    }
}

// دالة لتحديث الإحصائيات
function updateSalesStats() {
    const today = new Date().toISOString().split('T')[0];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // حساب مبيعات اليوم
    const todaySales = invoicesData
        .filter(invoice => invoice.date === today && invoice.status === 'completed')
        .reduce((sum, invoice) => sum + invoice.total, 0);

    // حساب مبيعات الشهر
    const monthSales = invoicesData
        .filter(invoice => {
            const invoiceDate = new Date(invoice.date);
            return invoiceDate.getMonth() === currentMonth &&
                   invoiceDate.getFullYear() === currentYear &&
                   invoice.status === 'completed';
        })
        .reduce((sum, invoice) => sum + invoice.total, 0);

    // عدد الفواتير
    const totalInvoices = invoicesData.length;

    // متوسط قيمة الفاتورة
    const completedInvoices = invoicesData.filter(invoice => invoice.status === 'completed');
    const avgInvoice = completedInvoices.length > 0 ?
        completedInvoices.reduce((sum, invoice) => sum + invoice.total, 0) / completedInvoices.length : 0;

    // تحديث العناصر في الصفحة
    const todaySalesElement = document.getElementById('today-sales');
    if (todaySalesElement) {
        todaySalesElement.innerHTML = `${todaySales.toLocaleString('ar-SA', {minimumFractionDigits: 2})} <span>ر.س</span>`;
    }

    const monthSalesElement = document.getElementById('month-sales');
    if (monthSalesElement) {
        monthSalesElement.innerHTML = `${monthSales.toLocaleString('ar-SA', {minimumFractionDigits: 2})} <span>ر.س</span>`;
    }

    const totalInvoicesElement = document.getElementById('total-invoices');
    if (totalInvoicesElement) {
        totalInvoicesElement.textContent = totalInvoices;
    }

    const avgInvoiceElement = document.getElementById('avg-invoice');
    if (avgInvoiceElement) {
        avgInvoiceElement.innerHTML = `${avgInvoice.toLocaleString('ar-SA', {minimumFractionDigits: 2})} <span>ر.س</span>`;
    }
}

// عرض رسالة تنبيه للمستخدم
function showAlert(message, type = 'info') {
    // إنشاء عنصر التنبيه
    const alertElement = document.createElement('div');
    alertElement.className = `alert alert-${type}`;
    alertElement.textContent = message;
    
    // إضافة التنبيه إلى الصفحة
    const alertContainer = document.querySelector('.alert-container');
    if (alertContainer) {
        alertContainer.appendChild(alertElement);
    } else {
        // إنشاء حاوية التنبيهات إذا لم تكن موجودة
        const container = document.createElement('div');
        container.className = 'alert-container';
        container.appendChild(alertElement);
        document.body.appendChild(container);
        
        // إضافة CSS للتنبيهات
        if (!document.getElementById('alert-styles')) {
            const style = document.createElement('style');
            style.id = 'alert-styles';
            style.textContent = `
                .alert-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                
                .alert {
                    padding: 15px 20px;
                    border-radius: 4px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    animation: slideIn 0.3s ease-out forwards;
                    max-width: 300px;
                }
                
                .alert-success {
                    background-color: #d4edda;
                    color: #155724;
                    border-left: 4px solid #28a745;
                }
                
                .alert-error {
                    background-color: #f8d7da;
                    color: #721c24;
                    border-left: 4px solid #dc3545;
                }
                
                .alert-info {
                    background-color: #d1ecf1;
                    color: #0c5460;
                    border-left: 4px solid #17a2b8;
                }
                
                .alert-warning {
                    background-color: #fff3cd;
                    color: #856404;
                    border-left: 4px solid #ffc107;
                }
                
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                    }
                    to {
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // إزالة التنبيه بعد 3 ثوانٍ
    setTimeout(() => {
        alertElement.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            if (alertElement.parentNode) {
                alertElement.parentNode.removeChild(alertElement);
            }
        }, 300);
    }, 3000);
}

// إضافة مستمعي الأحداث عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تعديل تنسيق حقول التاريخ
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        // تغيير تنسيق التاريخ إلى dd/mm/yyyy
        input.addEventListener('input', function(e) {
            const date = new Date(this.value);
            if (!isNaN(date.getTime())) {
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;
                this.setAttribute('data-formatted-date', formattedDate);
            }
        });
        
        // تنسيق التاريخ عند تحميل الصفحة
        if (input.value) {
            const date = new Date(input.value);
            if (!isNaN(date.getTime())) {
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;
                input.setAttribute('data-formatted-date', formattedDate);
            }
        }
    });
    
    // تنسيق التاريخ عند تغيير القيمة
    document.querySelectorAll('input[type="date"].filter-date-modern').forEach(input => {
        input.addEventListener('change', function() {
            if (this.value) {
                const date = new Date(this.value);
                if (!isNaN(date.getTime())) {
                    const day = date.getDate().toString().padStart(2, '0');
                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                    const year = date.getFullYear();
                    const formattedDate = `${day}/${month}/${year}`;
                    this.setAttribute('data-formatted-date', formattedDate);
                }
            } else {
                this.removeAttribute('data-formatted-date');
            }
        });
    });
});

// عرض الفواتير عند تحميل الصفحة
displayInvoices(invoicesData);

// مستمع حدث للبحث
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', searchAndFilterInvoices);
}

// مستمع حدث لزر فاتورة جديدة
const newInvoiceBtn = document.querySelector('.new-invoice-btn');
if (newInvoiceBtn) {
    newInvoiceBtn.addEventListener('click', addNewInvoice);
}

// مستمعي أحداث للتصفية
const statusFilter = document.getElementById('status-filter');
if (statusFilter) {
    statusFilter.addEventListener('change', searchAndFilterInvoices);
}

const paymentFilter = document.getElementById('payment-filter');
if (paymentFilter) {
    paymentFilter.addEventListener('change', searchAndFilterInvoices);
}

const dateFromFilter = document.getElementById('date-from');
if (dateFromFilter) {
    dateFromFilter.addEventListener('change', searchAndFilterInvoices);
}

const dateToFilter = document.getElementById('date-to');
if (dateToFilter) {
    dateToFilter.addEventListener('change', searchAndFilterInvoices);
}

// مستمع حدث لزر مسح التصفية
const clearFiltersBtn = document.getElementById('clear-filters');
if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearFilters);
}

// دالة مسح التصفية
function clearFilters() {
    // إعادة تعيين حقول التصفية
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.value = '';
    }
    
    const paymentFilter = document.getElementById('payment-filter');
    if (paymentFilter) {
        paymentFilter.value = '';
    }
    
    const dateFilter = document.getElementById('date-filter');
    if (dateFilter) {
        dateFilter.value = 'all';
    }
    
    const dateFromFilter = document.getElementById('date-from');
    if (dateFromFilter) {
        dateFromFilter.value = '';
    }
    
    const dateToFilter = document.getElementById('date-to');
    if (dateToFilter) {
        dateToFilter.value = '';
    }
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // إخفاء حقول التاريخ المخصص
    const customDateFilter = document.getElementById('custom-date-filter');
    if (customDateFilter) {
        customDateFilter.style.display = 'none';
    }
    
    // إعادة عرض جميع الفواتير
    displayInvoices(invoicesData);
    
    // عرض رسالة نجاح
    showAlert('تم مسح جميع عوامل التصفية', 'info');
}

// مستمع حدث لتصفية التاريخ
document.getElementById('date-filter').addEventListener('change', function() {
    // إظهار/إخفاء حقول التاريخ المخصص
    const customDateFilter = document.getElementById('custom-date-filter');
    if (this.value === 'custom') {
        customDateFilter.style.display = 'block';
    } else {
        customDateFilter.style.display = 'none';
        searchAndFilterInvoices();
    }
});

// دالة لإعداد مستمعي الأحداث الإضافية
function setupAdditionalEventListeners() {
    console.log('🔧 إعداد مستمعي الأحداث الإضافية...');

    // مستمع حدث لتصفية الحالة
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', searchAndFilterInvoices);
        console.log('✅ تم ربط مستمع حدث تصفية الحالة');
    } else {
        console.log('⚠️ عنصر تصفية الحالة غير موجود');
    }

    // مستمع حدث لزر تطبيق التاريخ المخصص
    const applyDateBtn = document.querySelector('.apply-date-btn');
    if (applyDateBtn) {
        applyDateBtn.addEventListener('click', searchAndFilterInvoices);
        console.log('✅ تم ربط مستمع حدث زر تطبيق التاريخ');
    } else {
        console.log('⚠️ زر تطبيق التاريخ غير موجود في هذه الصفحة');
    }

    // مستمع حدث لزر التصفية المتقدمة
    const advancedFilterBtn = document.getElementById('advanced-filter-btn');
    if (advancedFilterBtn) {
        advancedFilterBtn.addEventListener('click', function() {
            alert("سيتم فتح خيارات تصفية متقدمة هنا");
        });
        console.log('✅ تم ربط مستمع حدث زر التصفية المتقدمة');
    } else {
        console.log('⚠️ زر التصفية المتقدمة غير موجود');
    }

    // مستمع حدث لزر تصدير الفواتير
    const exportBtn = document.getElementById('export-invoices-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportInvoicesToExcel);
        console.log('✅ تم ربط مستمع حدث زر التصدير');
    } else {
        console.log('⚠️ زر تصدير الفواتير غير موجود');
    }

    // مستمع حدث لزر تصدير الفواتير المحددة
    const exportSelectedBtn = document.getElementById('export-selected-invoices');
    if (exportSelectedBtn) {
        exportSelectedBtn.addEventListener('click', exportSelectedInvoicesToExcel);
        console.log('✅ تم ربط مستمع حدث زر تصدير المحددة');
    } else {
        console.log('⚠️ زر تصدير الفواتير المحددة غير موجود');
    }

    console.log('✅ تم الانتهاء من إعداد مستمعي الأحداث الإضافية');
}

// تم إزالة مستمع حدث لزر إضافة فاتورة جديدة غير الموجود

// مستمعي أحداث لأزرار ترقيم الصفحات
document.querySelectorAll('.pagination-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled && !this.classList.contains('active')) {
            document.querySelector('.pagination-btn.active').classList.remove('active');
            this.classList.add('active');
            // في التطبيق الحقيقي، سيتم تحميل الصفحة المناسبة من الفواتير
        }
    });
});

// مستمع حدث لزر تحديد الكل
const selectAllBtn = document.getElementById('select-all-invoices');
if (selectAllBtn) {
    selectAllBtn.addEventListener('click', toggleSelectAllInvoices);
}

// مستمع حدث لزر طباعة المحدد
const printSelectedBtn = document.getElementById('print-selected-invoices');
if (printSelectedBtn) {
    printSelectedBtn.addEventListener('click', printSelectedInvoices);
}

// إضافة أنماط CSS لخانات الاختيار وأزرار التحديد
const checkboxStyles = document.createElement('style');
checkboxStyles.textContent = `
    .checkbox-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .invoice-checkbox {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: #3498db;
    }
    
    .selection-actions {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
    }
    
    .selection-actions button {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 8px 12px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.2s ease;
    }
    
    .selection-actions button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
    
    #select-all-invoices {
        background-color: #f8f9fa;
        color: #495057;
        border: 1px solid #ced4da;
    }
    
    #select-all-invoices:hover:not(:disabled) {
        background-color: #e9ecef;
    }
    
    #print-selected-invoices {
        background-color: #17a2b8;
        color: white;
    }
    
    #print-selected-invoices:hover:not(:disabled) {
        background-color: #138496;
    }
    
    #export-selected-invoices {
        background-color: #28a745;
        color: white;
    }
    
    #export-selected-invoices:hover:not(:disabled) {
        background-color: #218838;
    }
`;
document.head.appendChild(checkboxStyles);
});

// دالة لمسح التصفية
function clearFilters() {
    // مسح حقل البحث
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }

    // مسح تصفية الحالة
    const statusFilter = document.getElementById('status-filter');
    if (statusFilter) {
        statusFilter.value = '';
    }

    // مسح تصفية طريقة الدفع
    const paymentFilter = document.getElementById('payment-filter');
    if (paymentFilter) {
        paymentFilter.value = '';
    }

    // مسح تصفية التاريخ
    const dateFromFilter = document.getElementById('date-from');
    if (dateFromFilter) {
        dateFromFilter.value = '';
    }

    const dateToFilter = document.getElementById('date-to');
    if (dateToFilter) {
        dateToFilter.value = '';
    }

    // إعادة عرض جميع الفواتير
    displayInvoices(invoicesData);
}

// دالة تبديل تحديد كل الفواتير
function toggleSelectAllInvoices() {
    const selectAllBtn = document.getElementById('select-all-invoices');
    const isSelectingAll = selectAllBtn.getAttribute('data-selecting') !== 'true';
    
    // تحديث حالة الزر
    selectAllBtn.setAttribute('data-selecting', isSelectingAll ? 'true' : 'false');
    selectAllBtn.innerHTML = isSelectingAll ? 
        '<i class="fas fa-times"></i> إلغاء التحديد' : 
        '<i class="fas fa-check-square"></i> تحديد الكل';
    
    // تحديث حالة خانات الاختيار
    const checkboxes = document.querySelectorAll('.invoice-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = isSelectingAll;
    });
    
    // تحديث حالة زر الطباعة
    updatePrintSelectedButton();
}

// دالة تحديث حالة زر طباعة المحدد
function updatePrintSelectedButton() {
    const printSelectedBtn = document.getElementById('print-selected-invoices');
    const selectedCount = document.querySelectorAll('.invoice-checkbox:checked').length;
    
    if (printSelectedBtn) {
        printSelectedBtn.disabled = selectedCount === 0;
        printSelectedBtn.innerHTML = `<i class="fas fa-print"></i> طباعة المحدد (${selectedCount})`;
    }
}

// دالة طباعة الفواتير المحددة
function printSelectedInvoices() {
    // الحصول على الفواتير المحددة
    const selectedCheckboxes = document.querySelectorAll('.invoice-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(checkbox => checkbox.getAttribute('data-id'));
    
    if (selectedIds.length === 0) {
        showAlert('الرجاء تحديد فاتورة واحدة على الأقل للطباعة', 'warning');
        return;
    }
    
    // إنشاء نافذة الطباعة
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>طباعة الفواتير - المنجز</title>
            <style>
                @media print {
                    @page { size: A4; margin: 1cm; }
                }
                body {
                    font-family: 'Cairo', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    direction: rtl;
                    padding: 20px;
                    margin: 0;
                }
                .print-header {
                    text-align: center;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #ddd;
                }
                .print-header h1 {
                    margin: 0;
                    color: #2c3e50;
                }
                .print-date {
                    color: #7f8c8d;
                    font-size: 14px;
                    margin-top: 5px;
                }
                .invoice-container {
                    page-break-after: always;
                    margin-bottom: 30px;
                }
                .invoice-container:last-child {
                    page-break-after: avoid;
                }
                .invoice-header {
                    background-color: #f8f9fa;
                    padding: 15px;
                    border-radius: 5px;
                    margin-bottom: 15px;
                    display: flex;
                    justify-content: space-between;
                }
                .invoice-details {
                    margin-bottom: 20px;
                }
                .invoice-details table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .invoice-details th, .invoice-details td {
                    padding: 8px;
                    text-align: right;
                    border-bottom: 1px solid #ddd;
                }
                .invoice-details th {
                    background-color: #f2f2f2;
                }
                .invoice-summary {
                    margin-top: 20px;
                    text-align: left;
                    padding: 10px;
                    background-color: #f8f9fa;
                    border-radius: 5px;
                }
                .status-badge {
                    padding: 5px 10px;
                    border-radius: 15px;
                    font-size: 12px;
                    font-weight: bold;
                    display: inline-block;
                }
                .status-completed {
                    background-color: #d4edda;
                    color: #155724;
                }
                .status-pending {
                    background-color: #fff3cd;
                    color: #856404;
                }
                .status-cancelled {
                    background-color: #f8d7da;
                    color: #721c24;
                }
                .print-footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 12px;
                    color: #7f8c8d;
                }
                .print-actions {
                    display: flex;
                    justify-content: center;
                    margin: 20px 0;
                }
                .print-btn {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                    margin: 0 10px;
                }
                .print-btn:hover {
                    background-color: #2980b9;
                }
                @media print {
                    .print-actions {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="print-header">
                <h1>فواتير المنجز</h1>
                <div class="print-date">تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')}</div>
            </div>
            <div class="print-actions">
                <button class="print-btn" onclick="window.print()">طباعة الفواتير</button>
                <button class="print-btn" onclick="window.close()">إغلاق</button>
            </div>
    `);
    
    // إضافة محتوى كل فاتورة
    selectedIds.forEach(id => {
        const invoice = invoicesData.find(inv => inv.id === id);
        if (invoice) {
            // تحديد حالة الفاتورة وطريقة الدفع بالعربية
            let statusText, statusClass;
            switch(invoice.status) {
                case 'completed':
                    statusText = 'مكتملة';
                    statusClass = 'status-completed';
                    break;
                case 'pending':
                    statusText = 'معلقة';
                    statusClass = 'status-pending';
                    break;
                case 'cancelled':
                    statusText = 'ملغية';
                    statusClass = 'status-cancelled';
                    break;
                default:
                    statusText = invoice.status;
                    statusClass = '';
            }
            
            // تنسيق التاريخ
            const invoiceDate = new Date(invoice.date);
            const formattedDate = invoiceDate.toLocaleDateString('ar-SA');
            
            // تنسيق المبلغ
            const formattedTotal = new Intl.NumberFormat('ar-SA', {
                style: 'currency',
                currency: 'SAR'
            }).format(invoice.total);
            
            // إنشاء جدول المنتجات
            let productsTable = '';
            if (invoice.products && invoice.products.length > 0) {
                productsTable = `
                    <table>
                        <thead>
                            <tr>
                                <th>المنتج</th>
                                <th>الكمية</th>
                                <th>السعر</th>
                                <th>الإجمالي</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                
                invoice.products.forEach(product => {
                    const productTotal = product.price * product.quantity;
                    productsTable += `
                        <tr>
                            <td>${product.name}</td>
                            <td>${product.quantity}</td>
                            <td>${product.price.toLocaleString('ar-SA')} ر.س</td>
                            <td>${productTotal.toLocaleString('ar-SA')} ر.س</td>
                        </tr>
                    `;
                });
                
                productsTable += '</tbody></table>';
            } else {
                productsTable = '<p>لا توجد منتجات مسجلة</p>';
            }
            
            // إضافة محتوى الفاتورة
            printWindow.document.write(`
                <div class="invoice-container">
                    <div class="invoice-header">
                        <div>
                            <h2>فاتورة #${invoice.id}</h2>
                            <div>التاريخ: ${formattedDate}</div>
                        </div>
                        <div>
                            <div>الحالة: <span class="status-badge ${statusClass}">${statusText}</span></div>
                            <div>طريقة الدفع: ${invoice.paymentMethod}</div>
                        </div>
                    </div>
                    
                    <div class="invoice-details">
                        <h3>بيانات العميل</h3>
                        <p>الاسم: ${invoice.customer}</p>
                        
                        <h3>المنتجات</h3>
                        ${productsTable}
                    </div>
                    
                    <div class="invoice-summary">
                        <div>المبلغ الإجمالي: ${formattedTotal}</div>
                    </div>
                </div>
            `);
        }
    });
    
    // إغلاق المستند
    printWindow.document.write(`
            <div class="print-footer">
                <p>شكراً لتعاملكم مع المنجز</p>
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // تنفيذ الطباعة بعد تحميل المحتوى
    printWindow.onload = function() {
        // تأخير قصير لضمان تحميل الأنماط
        setTimeout(() => {
            printWindow.focus();
            // في بعض المتصفحات، قد تحتاج إلى تعليق هذا السطر للسماح للمستخدم بالطباعة يدويًا
            // printWindow.print();
        }, 500);
    };
    
    // عرض رسالة نجاح
    showAlert(`تم إعداد ${selectedIds.length} فاتورة للطباعة`, 'success');
}

// دالة تصدير الفواتير إلى ملف Excel
function exportInvoicesToExcel() {
    try {
        // التحقق من وجود مكتبة XLSX
        if (typeof XLSX === 'undefined') {
            // إذا لم تكن المكتبة موجودة، نقوم بتحميلها ديناميكيًا
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
            script.onload = function() {
                // بعد تحميل المكتبة، نقوم بتنفيذ عملية التصدير
                performExport();
            };
            script.onerror = function() {
                showAlert('فشل في تحميل مكتبة التصدير. يرجى التحقق من اتصالك بالإنترنت.', 'error');
            };
            document.head.appendChild(script);
        } else {
            // إذا كانت المكتبة موجودة بالفعل، نقوم بتنفيذ عملية التصدير مباشرة
            performExport();
        }
    } catch (error) {
        console.error('خطأ في تصدير الفواتير:', error);
        showAlert('حدث خطأ أثناء تصدير الفواتير', 'error');
    }
}

// دالة تنفيذ عملية التصدير
function performExport(selectedOnly = false) {
    // الحصول على الفواتير المصفاة حاليًا
    const tableBody = document.getElementById('invoices-table-body');
    const rows = tableBody.querySelectorAll('tr');
    
    // إنشاء مصفوفة لبيانات التصدير
    const exportData = [];
    
    // إضافة رأس الجدول
    exportData.push([
        'رقم الفاتورة',
        'التاريخ',
        'العميل',
        'المنتجات',
        'المبلغ الإجمالي',
        'طريقة الدفع',
        'الحالة'
    ]);
    
    // إضافة بيانات الفواتير
    rows.forEach(row => {
        // تخطي صفوف الرسائل (مثل 'لا توجد فواتير')
        if (row.querySelector('.no-results')) {
            return;
        }
        
        // إذا كان التصدير للمحدد فقط، نتحقق من حالة خانة الاختيار
        if (selectedOnly) {
            const checkbox = row.querySelector('.invoice-checkbox');
            if (!checkbox || !checkbox.checked) {
                return;
            }
        }
        
        const cells = row.querySelectorAll('td');
        if (cells.length >= 8) { // تم تعديل الرقم لأن لدينا الآن عمود إضافي لخانة الاختيار
            // استخراج النص من كل خلية
            const invoiceId = cells[1].textContent.trim(); // تعديل الفهارس بسبب عمود خانة الاختيار
            const date = cells[2].textContent.trim();
            const customer = cells[3].textContent.trim();
            const products = cells[4].textContent.trim();
            const total = cells[5].textContent.trim();
            const paymentMethod = cells[6].querySelector('.payment-badge') ? 
                                 cells[6].querySelector('.payment-badge').textContent.trim() : 
                                 cells[6].textContent.trim();
            const status = cells[7].querySelector('.status-badge') ? 
                          cells[7].querySelector('.status-badge').textContent.trim() : 
                          cells[7].textContent.trim();
            
            exportData.push([invoiceId, date, customer, products, total, paymentMethod, status]);
        }
    });
    
    // التحقق من وجود بيانات للتصدير
    if (exportData.length <= 1) { // فقط رأس الجدول
        showAlert('لا توجد بيانات للتصدير', 'warning');
        return;
    }
    
    // إنشاء ورقة عمل
    const ws = XLSX.utils.aoa_to_sheet(exportData);
    
    // تعديل اتجاه الورقة للغة العربية
    ws['!rtl'] = true;
    
    // إنشاء مصنف عمل
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'الفواتير');
    
    // تحديد اسم الملف
    const fileName = `فواتير_المنجز_${new Date().toISOString().slice(0, 10)}.xlsx`;
    
    // تصدير الملف
    XLSX.writeFile(wb, fileName);
    
    // عرض رسالة نجاح
    const message = selectedOnly ? 
        `تم تصدير ${exportData.length - 1} فاتورة محددة بنجاح` : 
        'تم تصدير الفواتير بنجاح';
    showAlert(message, 'success');
}

// دالة تصدير الفواتير المحددة
function exportSelectedInvoicesToExcel() {
    try {
        // التحقق من وجود فواتير محددة
        const selectedCount = document.querySelectorAll('.invoice-checkbox:checked').length;
        if (selectedCount === 0) {
            showAlert('الرجاء تحديد فاتورة واحدة على الأقل للتصدير', 'warning');
            return;
        }
        
        // التحقق من وجود مكتبة XLSX
        if (typeof XLSX === 'undefined') {
            // إذا لم تكن المكتبة موجودة، نقوم بتحميلها ديناميكيًا
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
            script.onload = function() {
                // بعد تحميل المكتبة، نقوم بتنفيذ عملية التصدير
                performExport(true);
            };
            script.onerror = function() {
                showAlert('فشل في تحميل مكتبة التصدير. يرجى التحقق من اتصالك بالإنترنت.', 'error');
            };
            document.head.appendChild(script);
        } else {
            // إذا كانت المكتبة موجودة بالفعل، نقوم بتنفيذ عملية التصدير مباشرة
            performExport(true);
        }
    } catch (error) {
        console.error('خطأ في تصدير الفواتير المحددة:', error);
        showAlert('حدث خطأ أثناء تصدير الفواتير المحددة', 'error');
    }
}

// وظيفة لعرض نافذة إنشاء فاتورة جديدة
function showNewInvoiceModal() {
    console.log('محاولة فتح نافذة الفاتورة الجديدة...');

    // استدعاء دالة showAddInvoiceModal من ملف main.js
    // نستخدم setTimeout للتأكد من أن window.showAddInvoiceModal قد تم تعريفها
    setTimeout(function() {
        if (typeof window.showAddInvoiceModal === 'function') {
            window.showAddInvoiceModal();
        } else {
            console.error("الدالة window.showAddInvoiceModal غير معرفة. تأكد من تحميل ملف main.js بشكل صحيح.");
            showAlert("حدث خطأ في فتح نافذة الفاتورة الجديدة", "error");
        }
    }, 100); // انتظار 100 مللي ثانية للتأكد من تحميل جميع الدوال
}

// وظيفة لطباعة تقرير المبيعات
function printSales() {
    // إنشاء نافذة طباعة جديدة
    const printWindow = window.open('', '_blank');
    
    // إنشاء محتوى HTML للطباعة
    let printContent = `
        <html dir="rtl">
        <head>
            <title>تقرير المبيعات</title>
            <style>
                body { font-family: 'Cairo', sans-serif; padding: 20px; }
                h1 { text-align: center; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                th { background-color: #f2f2f2; }
                .invoice-status { padding: 5px 10px; border-radius: 4px; font-size: 0.9rem; }
                .status-completed { background-color: #d4edda; color: #155724; }
                .status-pending { background-color: #fff3cd; color: #856404; }
                .status-cancelled { background-color: #f8d7da; color: #721c24; }
                .print-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
                .print-date { text-align: left; }
            </style>
        </head>
        <body>
            <div class="print-header">
                <h1>تقرير المبيعات</h1>
                <div class="print-date">تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')}</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>رقم الفاتورة</th>
                        <th>التاريخ</th>
                        <th>العميل</th>
                        <th>المنتجات</th>
                        <th>الإجمالي</th>
                        <th>طريقة الدفع</th>
                        <th>الحالة</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // إضافة بيانات الفواتير
    invoicesData.forEach(invoice => {
        // تحديد فئة حالة الفاتورة
        let statusClass = '';
        let statusText = '';
        
        switch (invoice.status) {
            case 'completed':
                statusClass = 'status-completed';
                statusText = 'مكتملة';
                break;
            case 'pending':
                statusClass = 'status-pending';
                statusText = 'معلقة';
                break;
            case 'cancelled':
                statusClass = 'status-cancelled';
                statusText = 'ملغاة';
                break;
        }
        
        // تنسيق التاريخ
        const formattedDate = new Date(invoice.date).toLocaleDateString('ar-SA');
        
        // تنسيق المبلغ
        const formattedTotal = new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: 'SAR'
        }).format(invoice.total);
        
        printContent += `
            <tr>
                <td>${invoice.id}</td>
                <td>${formattedDate}</td>
                <td>${invoice.customer}</td>
                <td>${invoice.productsCount}</td>
                <td>${formattedTotal}</td>
                <td>${invoice.paymentMethod}</td>
                <td><span class="invoice-status ${statusClass}">${statusText}</span></td>
            </tr>
        `;
    });
    
    printContent += `
                </tbody>
            </table>
        </body>
        </html>
    `;
    
    // كتابة المحتوى في نافذة الطباعة
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // انتظار تحميل الصفحة ثم طباعتها
    printWindow.onload = function() {
        printWindow.print();
    };
}

// وظيفة لتصدير البيانات إلى ملف Excel
function exportToExcel() {
    // إنشاء مصفوفة لبيانات الفواتير
    const excelData = [];
    
    // إضافة رأس الجدول
    excelData.push(['رقم الفاتورة', 'التاريخ', 'العميل', 'المنتجات', 'الإجمالي', 'طريقة الدفع', 'الحالة']);
    
    // إضافة بيانات الفواتير
    invoicesData.forEach(invoice => {
        // تحديد نص حالة الفاتورة
        let statusText = '';
        switch (invoice.status) {
            case 'completed':
                statusText = 'مكتملة';
                break;
            case 'pending':
                statusText = 'معلقة';
                break;
            case 'cancelled':
                statusText = 'ملغاة';
                break;
        }
        
        // تنسيق التاريخ
        const formattedDate = new Date(invoice.date).toLocaleDateString('ar-SA');
        
        excelData.push([
            invoice.id,
            formattedDate,
            invoice.customer,
            invoice.productsCount,
            invoice.total,
            invoice.paymentMethod,
            statusText
        ]);
    });
    
    // إنشاء ورقة عمل Excel
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    
    // إنشاء مصنف Excel
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'تقرير المبيعات');
    
    // تصدير المصنف إلى ملف Excel
    XLSX.writeFile(wb, 'تقرير_المبيعات.xlsx');
}

// وظيفة لتصدير البيانات إلى ملف PDF
function exportToPDF() {
    // إنشاء عنصر div مؤقت لتخزين محتوى PDF
    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);
    
    // إنشاء محتوى HTML للتصدير
    tempDiv.innerHTML = `
        <div id="pdf-content" dir="rtl" style="padding: 20px;">
            <h1 style="text-align: center; margin-bottom: 20px;">تقرير المبيعات</h1>
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div></div>
                <div>تاريخ التصدير: ${new Date().toLocaleDateString('ar-SA')}</div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">رقم الفاتورة</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">التاريخ</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">العميل</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">المنتجات</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">الإجمالي</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">طريقة الدفع</th>
                        <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">الحالة</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // إضافة بيانات الفواتير
    invoicesData.forEach(invoice => {
        // تحديد نص حالة الفاتورة ونمط الخلية
        let statusText = '';
        let statusStyle = '';
        
        switch (invoice.status) {
            case 'completed':
                statusText = 'مكتملة';
                statusStyle = 'background-color: #d4edda; color: #155724;';
                break;
            case 'pending':
                statusText = 'معلقة';
                statusStyle = 'background-color: #fff3cd; color: #856404;';
                break;
            case 'cancelled':
                statusText = 'ملغاة';
                statusStyle = 'background-color: #f8d7da; color: #721c24;';
                break;
        }
        
        // تنسيق التاريخ
        const formattedDate = new Date(invoice.date).toLocaleDateString('ar-SA');
        
        // تنسيق المبلغ
        const formattedTotal = new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: 'SAR'
        }).format(invoice.total);
        
        tempDiv.innerHTML += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${invoice.id}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${formattedDate}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${invoice.customer}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${invoice.productsCount}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${formattedTotal}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${invoice.paymentMethod}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right; ${statusStyle}">${statusText}</td>
            </tr>
        `;
    });
    
    tempDiv.innerHTML += `
                </tbody>
            </table>
        </div>
    `;
    
    // استخدام html2pdf لتحويل المحتوى إلى PDF
    const element = document.getElementById('pdf-content');
    const opt = {
        margin: 10,
        filename: 'تقرير_المبيعات.pdf',
        image: { type: 'jpeg', quality: 0.7 }, // تغيير من png إلى jpeg وتقليل الجودة
        html2canvas: { scale: 1 }, // تقليل مقياس الصورة
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'landscape',
            compress: true // تفعيل ضغط PDF
        }
    };
    
    // تصدير إلى PDF
    html2pdf().from(element).set(opt).save().then(() => {
        // إزالة العنصر المؤقت بعد التصدير
        document.body.removeChild(tempDiv);
    });
}

// وظيفة لطباعة جدول الفواتير
function printInvoicesTable() {
    // إنشاء نافذة طباعة جديدة
    const printWindow = window.open('', '_blank');
    
    // إنشاء محتوى HTML للطباعة
    let printContent = `
        <html dir="rtl">
        <head>
            <title>جدول الفواتير</title>
            <style>
                body { font-family: 'Cairo', sans-serif; padding: 20px; }
                h1 { text-align: center; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: right; }
                th { background-color: #f2f2f2; }
                .invoice-status { padding: 5px 10px; border-radius: 4px; font-size: 0.9rem; }
                .status-completed { background-color: #d4edda; color: #155724; }
                .status-pending { background-color: #fff3cd; color: #856404; }
                .status-cancelled { background-color: #f8d7da; color: #721c24; }
                .print-header { display: flex; justify-content: space-between; margin-bottom: 20px; }
                .print-date { text-align: left; }
            </style>
        </head>
        <body>
            <div class="print-header">
                <h1>جدول الفواتير</h1>
                <div class="print-date">تاريخ الطباعة: ${new Date().toLocaleDateString('ar-SA')}</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>رقم الفاتورة</th>
                        <th>التاريخ</th>
                        <th>العميل</th>
                        <th>المنتجات</th>
                        <th>الإجمالي</th>
                        <th>طريقة الدفع</th>
                        <th>الحالة</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    // إضافة بيانات الفواتير
    invoicesData.forEach(invoice => {
        // تحديد نص حالة الفاتورة
        let statusText = '';
        switch (invoice.status) {
            case 'completed':
                statusText = 'مكتملة';
                break;
            case 'pending':
                statusText = 'معلقة';
                break;
            case 'cancelled':
                statusText = 'ملغاة';
                break;
        }
        
        // تنسيق التاريخ (ميلادي)
        const formattedDate = new Date(invoice.date).toLocaleDateString('en-GB');
        
        // تنسيق المبلغ
        const formattedTotal = new Intl.NumberFormat('ar-SA', {
            style: 'currency',
            currency: 'SAR'
        }).format(invoice.total);
        
        printContent += `
            <tr>
                <td>${invoice.id}</td>
                <td>${formattedDate}</td>
                <td>${invoice.customer}</td>
                <td>${invoice.productsCount}</td>
                <td>${formattedTotal}</td>
                <td>${invoice.paymentMethod}</td>
                <td>${statusText}</td>
            </tr>
        `;
    });
    
    printContent += `
                </tbody>
            </table>
        </body>
        </html>
    `;
    
    // كتابة المحتوى في نافذة الطباعة
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // انتظار تحميل الصفحة ثم طباعتها
    printWindow.onload = function() {
        printWindow.print();
    };
}

// ... existing code ...