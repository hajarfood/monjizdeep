class SaveStatusIndicator {
    constructor() {
        this.createIndicator();
        this.updateStatus('محفوظ', 'success');
    }

    createIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'save-status-indicator';
        indicator.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; 
                        background: #4CAF50; color: white; padding: 10px 15px; 
                        border-radius: 25px; font-size: 14px; z-index: 1000;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.2); 
                        transition: all 0.3s ease; display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-check-circle"></i>
                <span id="save-status-text">محفوظ</span>
            </div>
        `;
        document.body.appendChild(indicator);
    }

    updateStatus(text, type = 'success') {
        const indicator = document.getElementById('save-status-indicator');
        const textElement = document.getElementById('save-status-text');
        
        if (indicator && textElement) {
            textElement.textContent = text;
            
            // تغيير اللون حسب النوع
            const colors = {
                success: '#4CAF50',
                saving: '#FF9800', 
                error: '#F44336',
                warning: '#FF5722'
            };
            
            const icons = {
                success: 'fa-check-circle',
                saving: 'fa-spinner fa-spin',
                error: 'fa-exclamation-circle',
                warning: 'fa-exclamation-triangle'
            };
            
            indicator.style.background = colors[type] || colors.success;
            
            const icon = indicator.querySelector('i');
            icon.className = `fas ${icons[type] || icons.success}`;
        }
    }

    showSaving() {
        this.updateStatus('جاري الحفظ...', 'saving');
    }

    showSaved() {
        this.updateStatus('محفوظ', 'success');
    }

    showError(message = 'خطأ في الحفظ') {
        this.updateStatus(message, 'error');
        
        // إخفاء رسالة الخطأ بعد 5 ثوان
        setTimeout(() => {
            this.showSaved();
        }, 5000);
    }
}

// إنشاء مؤشر حالة الحفظ
const saveStatusIndicator = new SaveStatusIndicator();
window.saveStatusIndicator = saveStatusIndicator;