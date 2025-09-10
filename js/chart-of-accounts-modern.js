// إدارة دليل الحسابات المحسن
// Modern Chart of Accounts Management

// متغيرات عامة
let currentChartOfAccounts = [];
let filteredAccounts = [];

// تهيئة دليل الحسابات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تحميل البيانات من الملف المنفصل
    if (typeof comprehensiveChartOfAccounts !== 'undefined') {
        currentChartOfAccounts = [...comprehensiveChartOfAccounts];
        initializeChartOfAccounts();
    }
});

// تهيئة دليل الحسابات
function initializeChartOfAccounts() {
    displayAccountsTable();
    setupAccountsEventListeners();
    updateAccountSubTypes();
}

// تم حذف عرض بطاقات الحسابات الرئيسية حسب طلب المستخدم

// تم حذف دالة إنشاء بطاقة الحساب حسب طلب المستخدم

// حساب رصيد الحساب الإجمالي (شامل الحسابات الفرعية)
function calculateAccountBalance(account) {
    let totalBalance = account.balance || 0;
    
    if (account.children && account.children.length > 0) {
        account.children.forEach(child => {
            totalBalance += calculateAccountBalance(child);
        });
    }
    
    return totalBalance;
}

// عد الحسابات الفرعية
function countAccountChildren(account) {
    let count = 0;
    
    if (account.children && account.children.length > 0) {
        count += account.children.length;
        account.children.forEach(child => {
            count += countAccountChildren(child);
        });
    }
    
    return count;
}

// عرض جدول الحسابات
function displayAccountsTable() {
    const tableBody = document.getElementById('accounts-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    // تحويل الشجرة إلى قائمة مسطحة
    const flatAccounts = flattenAccountsTree(currentChartOfAccounts);
    filteredAccounts = flatAccounts;

    flatAccounts.forEach(account => {
        const row = createAccountTableRow(account);
        tableBody.appendChild(row);
    });
}

// تحويل شجرة الحسابات إلى قائمة مسطحة
function flattenAccountsTree(accounts, level = 0) {
    let flatList = [];
    
    accounts.forEach(account => {
        // إضافة الحساب الحالي
        flatList.push({
            ...account,
            level: level,
            hasChildren: account.children && account.children.length > 0
        });
        
        // إضافة الحسابات الفرعية
        if (account.children && account.children.length > 0) {
            const childrenFlat = flattenAccountsTree(account.children, level + 1);
            flatList = flatList.concat(childrenFlat);
        }
    });
    
    return flatList;
}

// إنشاء صف في جدول الحسابات
function createAccountTableRow(account) {
    const row = document.createElement('tr');
    row.dataset.accountId = account.id;
    
    // إضافة مسافة بادئة للحسابات الفرعية
    const indent = '&nbsp;'.repeat(account.level * 4);
    const accountName = account.hasChildren ? 
        `${indent}<strong>${account.name}</strong>` : 
        `${indent}${account.name}`;

    row.innerHTML = `
        <td>${account.code}</td>
        <td class="account-name-cell">${accountName}</td>
        <td>
            <span class="account-type-badge badge-${account.type}">
                ${getAccountTypeLabel(account.type)}
            </span>
        </td>
        <td class="balance-cell ${getBalanceClass(account.balance)}">
            ${formatCurrency(account.balance)}
        </td>
        <td>
            <span class="status-badge status-${account.status}">
                ${account.status === 'active' ? 'نشط' : 'غير نشط'}
            </span>
        </td>
        <td class="actions-cell">
            <button class="action-btn edit" onclick="editAccount(${account.id})" title="تعديل">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" onclick="deleteAccount(${account.id})" title="حذف">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    return row;
}

// الحصول على تسمية نوع الحساب
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

// الحصول على فئة CSS للرصيد
function getBalanceClass(balance) {
    if (balance > 0) return 'balance-positive';
    if (balance < 0) return 'balance-negative';
    return 'balance-zero';
}

// تنسيق العملة
function formatCurrency(amount) {
    if (typeof amount !== 'number') amount = 0;
    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 2
    }).format(amount);
}

// إعداد مستمعي الأحداث
function setupAccountsEventListeners() {
    // البحث في الحسابات
    const searchInput = document.getElementById('accounts-search');
    if (searchInput) {
        searchInput.addEventListener('input', filterAccounts);
    }

    // تصفية حسب النوع
    const typeFilter = document.getElementById('account-type-filter');
    if (typeFilter) {
        typeFilter.addEventListener('change', filterAccounts);
    }

    // تصفية حسب الحالة
    const statusFilter = document.getElementById('account-status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterAccounts);
    }
}

// تصفية الحسابات
function filterAccounts() {
    const searchTerm = document.getElementById('accounts-search')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('account-type-filter')?.value || '';
    const statusFilter = document.getElementById('account-status-filter')?.value || '';

    const flatAccounts = flattenAccountsTree(currentChartOfAccounts);
    
    filteredAccounts = flatAccounts.filter(account => {
        const matchesSearch = !searchTerm || 
            account.name.toLowerCase().includes(searchTerm) ||
            account.code.includes(searchTerm) ||
            (account.description && account.description.toLowerCase().includes(searchTerm));
        
        const matchesType = !typeFilter || account.type === typeFilter;
        const matchesStatus = !statusFilter || account.status === statusFilter;
        
        return matchesSearch && matchesType && matchesStatus;
    });

    // إعادة عرض الجدول بالنتائج المفلترة
    displayFilteredAccountsTable();
}

// عرض الحسابات المفلترة في الجدول
function displayFilteredAccountsTable() {
    const tableBody = document.getElementById('accounts-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    filteredAccounts.forEach(account => {
        const row = createAccountTableRow(account);
        tableBody.appendChild(row);
    });
}

// عرض نافذة إضافة حساب جديد
function showAddAccountModal() {
    const modal = document.getElementById('add-account-modal');
    if (modal) {
        modal.classList.add('active');
        populateParentAccountOptions();
        
        // إعادة تعيين النموذج
        const form = document.getElementById('add-account-form');
        if (form) {
            form.reset();
        }
    }
}

// إغلاق نافذة إضافة حساب
function closeAddAccountModal() {
    const modal = document.getElementById('add-account-modal');
    if (modal) {
        modal.style.setProperty('display', 'none', 'important');
        modal.classList.remove('active');
    }
}

// تحديث الأنواع الفرعية عند تغيير النوع الرئيسي
function updateSubTypes() {
    const typeSelect = document.getElementById('account-type');
    const subtypeSelect = document.getElementById('account-subtype');
    
    if (!typeSelect || !subtypeSelect) return;
    
    const selectedType = typeSelect.value;
    subtypeSelect.innerHTML = '<option value="">اختر النوع الفرعي</option>';
    
    if (selectedType && accountSubTypes[selectedType]) {
        accountSubTypes[selectedType].forEach(subtype => {
            const option = document.createElement('option');
            option.value = subtype.value;
            option.textContent = subtype.label;
            subtypeSelect.appendChild(option);
        });
    }
}

// تحديث خيارات الحساب الأب
function updateAccountSubTypes() {
    // تحديث خيارات الأنواع الفرعية في النموذج
    updateSubTypes();
}

// ملء خيارات الحساب الأب
function populateParentAccountOptions() {
    const parentSelect = document.getElementById('parent-account');
    if (!parentSelect) return;

    parentSelect.innerHTML = '<option value="">حساب رئيسي</option>';
    
    const flatAccounts = flattenAccountsTree(currentChartOfAccounts);
    flatAccounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = `${account.code} - ${account.name}`;
        parentSelect.appendChild(option);
    });
}

// معالجة إرسال نموذج إضافة حساب
document.addEventListener('DOMContentLoaded', function() {
    const addAccountForm = document.getElementById('add-account-form');
    if (addAccountForm) {
        addAccountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddAccount();
        });
    }
});

// معالجة إضافة حساب جديد
function handleAddAccount() {
    const formData = new FormData(document.getElementById('add-account-form'));
    
    const newAccount = {
        id: generateAccountId(),
        code: formData.get('account-code'),
        name: formData.get('account-name'),
        type: formData.get('account-type'),
        subtype: formData.get('account-subtype') || 'main',
        balance: parseFloat(formData.get('initial-balance')) || 0,
        status: formData.get('account-status') || 'active',
        description: formData.get('account-description') || ''
    };

    // التحقق من عدم تكرار رقم الحساب
    if (isAccountCodeExists(newAccount.code)) {
        alert('رقم الحساب موجود بالفعل. يرجى اختيار رقم آخر.');
        return;
    }

    // إضافة الحساب
    const parentId = formData.get('parent-account');
    if (parentId) {
        addAccountToParent(newAccount, parseInt(parentId));
    } else {
        currentChartOfAccounts.push(newAccount);
    }

    // إعادة عرض البيانات
    initializeChartOfAccounts();

    // حفظ البيانات في التخزين المحلي
    saveAccountsToLocalStorage();

    closeAddAccountModal();

    alert('تم إضافة الحساب بنجاح!');
}

// توليد معرف فريد للحساب
function generateAccountId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// التحقق من وجود رقم الحساب
function isAccountCodeExists(code) {
    const flatAccounts = flattenAccountsTree(currentChartOfAccounts);
    return flatAccounts.some(account => account.code === code);
}

// إضافة حساب إلى حساب أب
function addAccountToParent(newAccount, parentId) {
    const flatAccounts = flattenAccountsTree(currentChartOfAccounts);
    const parentAccount = flatAccounts.find(account => account.id === parentId);
    
    if (parentAccount) {
        if (!parentAccount.children) {
            parentAccount.children = [];
        }
        parentAccount.children.push(newAccount);
        return true;
    }
    return false;
}

// تصدير الحسابات
function exportAccounts() {
    const dataStr = JSON.stringify(currentChartOfAccounts, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `chart-of-accounts-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// طباعة جدول الحسابات
function printAccountsTable() {
    window.print();
}

// تعديل حساب
function editAccount(accountId) {
    const flatAccounts = flattenAccountsTree(currentChartOfAccounts);
    const account = flatAccounts.find(acc => acc.id === accountId);

    if (!account) {
        alert('الحساب غير موجود!');
        return;
    }

    // ملء نموذج التعديل
    document.getElementById('edit-account-id').value = account.id;
    document.getElementById('edit-account-code').value = account.code;
    document.getElementById('edit-account-name').value = account.name;
    document.getElementById('edit-account-type').value = account.type;
    document.getElementById('edit-account-balance').value = account.balance;
    document.getElementById('edit-account-status').value = account.status;
    document.getElementById('edit-account-description').value = account.description || '';

    // إظهار النافذة المنبثقة
    const modal = document.getElementById('edit-account-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// حذف حساب
function deleteAccount(accountId) {
    if (!confirm('هل أنت متأكد من حذف هذا الحساب؟\nسيتم حذف جميع الحسابات الفرعية أيضاً.')) {
        return;
    }

    // البحث عن الحساب وحذفه
    if (removeAccountFromTree(currentChartOfAccounts, accountId)) {
        initializeChartOfAccounts();
        alert('تم حذف الحساب بنجاح!');
    } else {
        alert('حدث خطأ أثناء حذف الحساب!');
    }
}

// إزالة حساب من الشجرة
function removeAccountFromTree(accounts, accountId) {
    for (let i = 0; i < accounts.length; i++) {
        if (accounts[i].id === accountId) {
            accounts.splice(i, 1);
            return true;
        }

        if (accounts[i].children && accounts[i].children.length > 0) {
            if (removeAccountFromTree(accounts[i].children, accountId)) {
                return true;
            }
        }
    }
    return false;
}

// عرض تفاصيل الحساب
function showAccountDetails(accountId) {
    const flatAccounts = flattenAccountsTree(currentChartOfAccounts);
    const account = flatAccounts.find(acc => acc.id === accountId);

    if (!account) return;

    // يمكن إضافة نافذة منبثقة لعرض تفاصيل الحساب
    console.log('تفاصيل الحساب:', account);
}

// تم حذف دالة تبديل العرض لأن المربعات الكبيرة تم حذفها

// إعداد مستمعي الأحداث للنوافذ المنبثقة
document.addEventListener('DOMContentLoaded', function() {
    // إغلاق النوافذ المنبثقة
    const closeButtons = document.querySelectorAll('.close-modal, .modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal, .modal-overlay');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
            }
        });
    });

    // إغلاق النافذة عند النقر خارجها
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // معالجة نموذج تعديل الحساب
    const editAccountForm = document.getElementById('edit-account-form');
    if (editAccountForm) {
        editAccountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEditAccount();
        });
    }
});

// معالجة تعديل الحساب
function handleEditAccount() {
    const formData = new FormData(document.getElementById('edit-account-form'));
    const accountId = parseInt(formData.get('account-id'));

    const updatedAccount = {
        code: formData.get('account-code'),
        name: formData.get('account-name'),
        type: formData.get('account-type'),
        status: formData.get('account-status'),
        description: formData.get('account-description') || ''
    };

    // البحث عن الحساب وتحديثه
    if (updateAccountInTree(currentChartOfAccounts, accountId, updatedAccount)) {
        initializeChartOfAccounts();
        document.getElementById('edit-account-modal').style.display = 'none';
        alert('تم تحديث الحساب بنجاح!');
    } else {
        alert('حدث خطأ أثناء تحديث الحساب!');
    }
}

// تحديث حساب في الشجرة
function updateAccountInTree(accounts, accountId, updatedData) {
    for (let account of accounts) {
        if (account.id === accountId) {
            Object.assign(account, updatedData);
            return true;
        }

        if (account.children && account.children.length > 0) {
            if (updateAccountInTree(account.children, accountId, updatedData)) {
                return true;
            }
        }
    }
    return false;
}

// حفظ البيانات في التخزين المحلي
function saveAccountsToLocalStorage() {
    try {
        localStorage.setItem('chartOfAccounts', JSON.stringify(currentChartOfAccounts));
        return true;
    } catch (error) {
        console.error('خطأ في حفظ البيانات:', error);
        return false;
    }
}

// تحميل البيانات من التخزين المحلي
function loadAccountsFromLocalStorage() {
    try {
        const savedData = localStorage.getItem('chartOfAccounts');
        if (savedData) {
            currentChartOfAccounts = JSON.parse(savedData);
            return true;
        }
    } catch (error) {
        console.error('خطأ في تحميل البيانات:', error);
    }
    return false;
}

// تم دمج حفظ البيانات في الدالة الأصلية

// تحميل البيانات عند بدء التطبيق
document.addEventListener('DOMContentLoaded', function() {
    // محاولة تحميل البيانات المحفوظة أولاً
    if (!loadAccountsFromLocalStorage()) {
        // إذا لم توجد بيانات محفوظة، استخدم البيانات الافتراضية
        if (typeof comprehensiveChartOfAccounts !== 'undefined') {
            currentChartOfAccounts = [...comprehensiveChartOfAccounts];
        }
    }

    // تهيئة دليل الحسابات
    if (currentChartOfAccounts.length > 0) {
        initializeChartOfAccounts();
    }
});
