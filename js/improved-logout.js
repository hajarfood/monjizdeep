// تحسين وظيفة تسجيل الخروج
function improvedLogout() {
    try {
        // عرض نافذة تأكيد مع معلومات الحفظ
        const lastSaveTime = localStorage.getItem('monjizLastSave');
        const saveMessage = lastSaveTime ? 
            `آخر حفظ: ${new Date(lastSaveTime).toLocaleString('ar-SA')}` : 
            'لم يتم الحفظ مؤخراً';
            
        const confirmMessage = `هل أنت متأكد من تسجيل الخروج؟\n\n${saveMessage}\n\nسيتم حفظ جميع التغييرات تلقائياً.`;
        
        if (confirm(confirmMessage)) {
            console.log('🚪 بدء عملية تسجيل الخروج...');
            
            // إظهار مؤشر التحميل
            showLogoutProgress();
            
            // حفظ فوري لجميع البيانات
            performFinalSave().then(() => {
                // مسح بيانات الجلسة فقط (ليس البيانات الأساسية)
                localStorage.removeItem('monjizLoggedIn');
                localStorage.removeItem('monjizCurrentUser');
                localStorage.removeItem('monjizSessionData');
                
                // تحديث وقت آخر حفظ
                localStorage.setItem('monjizLastSave', new Date().toISOString());
                
                console.log('✅ تم تسجيل الخروج بنجاح مع حفظ البيانات');
                
                // إعادة توجيه بعد التأكد من الحفظ
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 500);
            }).catch(error => {
                console.error('❌ خطأ في حفظ البيانات أثناء الخروج:', error);
                
                // السؤال عن المتابعة رغم الخطأ
                if (confirm('حدث خطأ في حفظ البيانات. هل تريد المتابعة؟')) {
                    window.location.href = 'login.html';
                }
            });
        }
    } catch (error) {
        console.error('❌ خطأ في تسجيل الخروج:', error);
        // في حالة الخطأ، إعادة توجيه مباشرة
        if (confirm('حدث خطأ. هل تريد الخروج على أي حال؟')) {
            window.location.href = 'login.html';
        }
    }
}

// عرض مؤشر تقدم الخروج
function showLogoutProgress() {
    const progressModal = document.createElement('div');
    progressModal.id = 'logout-progress';
    progressModal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.8); display: flex; align-items: center; 
                    justify-content: center; z-index: 10000; color: white; font-family: Arial;">
            <div style="text-align: center; background: white; color: #333; 
                        padding: 30px; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
                <div style="margin-bottom: 20px;">
                    <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: #667eea;"></i>
                </div>
                <h3>جاري حفظ البيانات...</h3>
                <p style="margin-top: 10px; color: #666;">يرجى الانتظار حتى اكتمال عملية الحفظ</p>
            </div>
        </div>
    `;
    document.body.appendChild(progressModal);
}

// إخفاء مؤشر التقدم
function hideLogoutProgress() {
    const progressModal = document.getElementById('logout-progress');
    if (progressModal) {
        progressModal.remove();
    }
}

// حفظ نهائي لجميع البيانات
async function performFinalSave() {
    console.log('💾 بدء الحفظ النهائي...');
    
    try {
        // حفظ جميع أنواع البيانات
        const dataTypes = ['Products', 'Customers', 'Suppliers', 'Sales', 'Purchases', 'Accounts'];
        
        for (const dataType of dataTypes) {
            if (window.dataManager && typeof window.dataManager[`save${dataType}`] === 'function') {
                const data = window.dataManager[`get${dataType}`]();
                if (data && data.length > 0) {
                    window.dataManager[`save${dataType}`](data);
                    console.log(`✅ تم حفظ ${dataType}`);
                }
            }
        }
        
        // إنشاء نسخة احتياطية تلقائية
        if (window.dataManager && typeof window.dataManager.createAutoBackup === 'function') {
            window.dataManager.createAutoBackup();
            console.log('✅ تم إنشاء نسخة احتياطية');
        }
        
        // حفظ في IndexedDB
        if (window.autoSaveSystem) {
            await window.autoSaveSystem.saveToIndexedDB();
            console.log('✅ تم الحفظ في IndexedDB');
        }
        
        hideLogoutProgress();
        
    } catch (error) {
        hideLogoutProgress();
        throw error;
    }
}

// استبدال وظيفة logout الأصلية
window.logout = improvedLogout;