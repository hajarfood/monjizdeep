// تحسينات تجربة المستخدم - نظام منجز
console.log('🎨 تم تحميل تحسينات تجربة المستخدم');

document.addEventListener('DOMContentLoaded', function() {
    initUserExperienceEnhancements();
});

function initUserExperienceEnhancements() {
    // تحسين التنقل
    enhanceNavigation();
    
    // تحسين النوافذ المنبثقة
    enhanceModals();
    
    // تحسين الجداول
    enhanceTables();
    
    // تحسين النماذج
    enhanceForms();
    
    // تحسين الإشعارات
    enhanceNotifications();
    
    // تحسين التحميل
    enhanceLoading();
    
    // تحسين إمكانية الوصول
    enhanceAccessibility();
    
    console.log('✅ تم تطبيق جميع تحسينات تجربة المستخدم');
}

// تحسين التنقل
function enhanceNavigation() {
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        // إضافة تأثير التحميل عند النقر
        link.addEventListener('click', function(e) {
            if (this.href && this.href !== window.location.href) {
                showLoadingIndicator();
            }
        });
        
        // إضافة tooltip للروابط
        if (!link.title) {
            const text = link.textContent.trim();
            link.title = `انتقل إلى ${text}`;
        }
    });
}

// تحسين النوافذ المنبثقة
function enhanceModals() {
    // إضافة مستمع للنوافذ المنبثقة الجديدة
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && node.classList && node.classList.contains('modal')) {
                    enhanceModal(node);
                }
            });
        });
    });
    
    observer.observe(document.body, { childList: true });
    
    // تحسين النوافذ الموجودة
    document.querySelectorAll('.modal').forEach(enhanceModal);
}

function enhanceModal(modal) {
    // إضافة إغلاق بمفتاح Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display !== 'none') {
            const closeBtn = modal.querySelector('.close, .cancel-btn');
            if (closeBtn) closeBtn.click();
        }
    });
    
    // تحسين التركيز
    const firstInput = modal.querySelector('input, select, textarea, button');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
    }
}

// تحسين الجداول
function enhanceTables() {
    const tables = document.querySelectorAll('table');
    
    tables.forEach(table => {
        // إضافة تأثيرات التمرير
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(102, 126, 234, 0.05)';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
        
        // إضافة إمكانية الفرز للجداول
        const headers = table.querySelectorAll('th');
        headers.forEach((header, index) => {
            if (header.textContent.trim()) {
                header.style.cursor = 'pointer';
                header.title = `انقر للفرز حسب ${header.textContent}`;
                
                header.addEventListener('click', function() {
                    sortTable(table, index);
                });
            }
        });
    });
}

// دالة فرز الجداول
function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const isNumeric = rows.every(row => {
        const cell = row.cells[columnIndex];
        return cell && !isNaN(parseFloat(cell.textContent));
    });
    
    rows.sort((a, b) => {
        const aText = a.cells[columnIndex]?.textContent || '';
        const bText = b.cells[columnIndex]?.textContent || '';
        
        if (isNumeric) {
            return parseFloat(aText) - parseFloat(bText);
        } else {
            return aText.localeCompare(bText, 'ar');
        }
    });
    
    // إعادة ترتيب الصفوف
    rows.forEach(row => tbody.appendChild(row));
    
    // إضافة مؤشر الفرز
    table.querySelectorAll('th').forEach(th => th.classList.remove('sorted'));
    table.querySelectorAll('th')[columnIndex].classList.add('sorted');
}

// تحسين النماذج
function enhanceForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // إضافة التحقق المباشر
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                clearValidationError(this);
            });
        });
        
        // تحسين إرسال النموذج
        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = submitBtn.dataset.originalText || 'حفظ';
                }, 2000);
            }
        });
    });
}

// التحقق من صحة الإدخال
function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    // التحقق من الحقول المطلوبة
    if (input.required && !value) {
        isValid = false;
        message = 'هذا الحقل مطلوب';
    }
    
    // التحقق من البريد الإلكتروني
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'يرجى إدخال بريد إلكتروني صحيح';
        }
    }
    
    // التحقق من رقم الهاتف
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            message = 'يرجى إدخال رقم هاتف صحيح';
        }
    }
    
    // عرض رسالة الخطأ
    if (!isValid) {
        showValidationError(input, message);
    } else {
        clearValidationError(input);
    }
    
    return isValid;
}

// عرض رسالة خطأ التحقق
function showValidationError(input, message) {
    clearValidationError(input);
    
    input.style.borderColor = '#dc3545';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'validation-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    input.parentNode.appendChild(errorDiv);
}

// إزالة رسالة خطأ التحقق
function clearValidationError(input) {
    input.style.borderColor = '';
    const errorDiv = input.parentNode.querySelector('.validation-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// تحسين الإشعارات
function enhanceNotifications() {
    // إنشاء حاوي الإشعارات
    if (!document.getElementById('notifications-container')) {
        const container = document.createElement('div');
        container.id = 'notifications-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }
}

// عرض إشعار
function showNotification(message, type = 'info', duration = 5000) {
    const container = document.getElementById('notifications-container');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        border-left: 4px solid ${getNotificationColor(type)};
        animation: slideInRight 0.5s ease;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="margin-left: auto; background: none; border: none; cursor: pointer;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    container.appendChild(notification);
    
    // إزالة تلقائية
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }
    }, duration);
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        warning: '#ffc107',
        error: '#dc3545',
        info: '#17a2b8'
    };
    return colors[type] || colors.info;
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        error: 'fa-times-circle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// تحسين التحميل
function enhanceLoading() {
    // إضافة مؤشر التحميل العام
    if (!document.getElementById('global-loading')) {
        const loading = document.createElement('div');
        loading.id = 'global-loading';
        loading.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255,255,255,0.9);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        loading.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-spinner fa-spin" style="font-size: 48px; color: #667eea; margin-bottom: 20px;"></i>
                <p style="color: #667eea; font-size: 18px;">جاري التحميل...</p>
            </div>
        `;
        document.body.appendChild(loading);
    }
}

// عرض مؤشر التحميل
function showLoadingIndicator() {
    const loading = document.getElementById('global-loading');
    if (loading) {
        loading.style.display = 'flex';
    }
}

// إخفاء مؤشر التحميل
function hideLoadingIndicator() {
    const loading = document.getElementById('global-loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// تحسين إمكانية الوصول
function enhanceAccessibility() {
    // إضافة تسميات للعناصر التفاعلية
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    
    interactiveElements.forEach(element => {
        if (!element.getAttribute('aria-label') && !element.title) {
            const text = element.textContent || element.value || element.placeholder;
            if (text) {
                element.setAttribute('aria-label', text.trim());
            }
        }
    });
    
    // تحسين التنقل بلوحة المفاتيح
    document.addEventListener('keydown', function(e) {
        // Alt + H للانتقال للصفحة الرئيسية
        if (e.altKey && e.key === 'h') {
            window.location.href = 'index.html';
        }
        
        // Alt + S للانتقال لصفحة المبيعات
        if (e.altKey && e.key === 's') {
            window.location.href = 'sales.html';
        }
        
        // Alt + P للانتقال لصفحة المنتجات
        if (e.altKey && e.key === 'p') {
            window.location.href = 'products.html';
        }
    });
}

// تصدير الدوال للاستخدام العام
window.showNotification = showNotification;
window.showLoadingIndicator = showLoadingIndicator;
window.hideLoadingIndicator = hideLoadingIndicator;
