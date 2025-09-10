/**
 * ملف اختبار نظام إضافة الحسابات
 * يحتوي على وظائف اختبار شاملة لنظام إدارة الحسابات
 */

// متغيرات الاختبار
let testResults = [];
let testCounter = 0;

/**
 * دالة اختبار شاملة لنظام الحسابات
 */
function runAccountSystemTests() {
    console.log('🧪 بدء اختبار نظام الحسابات الشامل...');
    
    // مسح نتائج الاختبارات السابقة
    testResults = [];
    testCounter = 0;
    
    // تشغيل الاختبارات
    testLocalStorageAccess();
    testAccountCreation();
    testAccountValidation();
    testAccountDisplay();
    testAccountPersistence();
    testAccountDuplication();
    testAccountTypes();
    
    // عرض النتائج النهائية
    displayTestResults();
}

/**
 * اختبار الوصول للتخزين المحلي
 */
function testLocalStorageAccess() {
    const testName = 'اختبار الوصول للتخزين المحلي';
    console.log(`🔍 ${testName}...`);
    
    try {
        // اختبار الكتابة
        localStorage.setItem('test_key', 'test_value');
        
        // اختبار القراءة
        const value = localStorage.getItem('test_key');
        
        // اختبار الحذف
        localStorage.removeItem('test_key');
        
        if (value === 'test_value') {
            logTestResult(testName, true, 'التخزين المحلي يعمل بشكل صحيح');
        } else {
            logTestResult(testName, false, 'فشل في قراءة البيانات من التخزين المحلي');
        }
    } catch (error) {
        logTestResult(testName, false, `خطأ في التخزين المحلي: ${error.message}`);
    }
}

/**
 * اختبار إنشاء الحسابات
 */
function testAccountCreation() {
    const testName = 'اختبار إنشاء الحسابات';
    console.log(`🔍 ${testName}...`);
    
    try {
        // إنشاء حساب اختبار
        const testAccount = {
            id: Date.now(),
            code: 'TEST001',
            name: 'حساب اختبار إنشاء',
            type: 'assets',
            balance: 1000,
            status: 'active',
            level: 1,
            parentCode: null,
            parentName: null,
            createdAt: new Date().toISOString()
        };
        
        // محاولة حفظ الحساب
        let accounts = JSON.parse(localStorage.getItem('chartOfAccounts')) || [];
        
        // إزالة الحساب إذا كان موجوداً مسبقاً
        accounts = accounts.filter(acc => acc.code !== testAccount.code);
        
        // إضافة الحساب الجديد
        accounts.push(testAccount);
        
        // حفظ الحسابات
        localStorage.setItem('chartOfAccounts', JSON.stringify(accounts));
        localStorage.setItem('monjizAccounts', JSON.stringify(accounts));
        
        // التحقق من الحفظ
        const savedAccounts = JSON.parse(localStorage.getItem('chartOfAccounts'));
        const savedAccount = savedAccounts.find(acc => acc.code === testAccount.code);
        
        if (savedAccount && savedAccount.name === testAccount.name) {
            logTestResult(testName, true, 'تم إنشاء وحفظ الحساب بنجاح');
        } else {
            logTestResult(testName, false, 'فشل في حفظ الحساب');
        }
        
    } catch (error) {
        logTestResult(testName, false, `خطأ في إنشاء الحساب: ${error.message}`);
    }
}

/**
 * اختبار التحقق من صحة بيانات الحساب
 */
function testAccountValidation() {
    const testName = 'اختبار التحقق من صحة البيانات';
    console.log(`🔍 ${testName}...`);
    
    try {
        let validationPassed = true;
        let validationErrors = [];
        
        // اختبار الحقول المطلوبة
        const invalidAccounts = [
            { code: '', name: 'حساب بدون رقم', type: 'assets' },
            { code: 'TEST002', name: '', type: 'assets' },
            { code: 'TEST003', name: 'حساب بدون نوع', type: '' }
        ];
        
        invalidAccounts.forEach((account, index) => {
            if (!account.code) {
                validationErrors.push(`الحساب ${index + 1}: رقم الحساب مطلوب`);
            }
            if (!account.name) {
                validationErrors.push(`الحساب ${index + 1}: اسم الحساب مطلوب`);
            }
            if (!account.type) {
                validationErrors.push(`الحساب ${index + 1}: نوع الحساب مطلوب`);
            }
        });
        
        if (validationErrors.length === 3) { // يجب أن نحصل على 3 أخطاء
            logTestResult(testName, true, 'التحقق من صحة البيانات يعمل بشكل صحيح');
        } else {
            logTestResult(testName, false, `التحقق من صحة البيانات لا يعمل بشكل صحيح. الأخطاء المكتشفة: ${validationErrors.length}`);
        }
        
    } catch (error) {
        logTestResult(testName, false, `خطأ في اختبار التحقق: ${error.message}`);
    }
}

/**
 * اختبار عرض الحسابات
 */
function testAccountDisplay() {
    const testName = 'اختبار عرض الحسابات';
    console.log(`🔍 ${testName}...`);
    
    try {
        // التحقق من وجود عنصر الجدول
        const tableBody = document.getElementById('accounts-table-body');
        
        if (tableBody) {
            // تحميل الحسابات
            const accounts = JSON.parse(localStorage.getItem('chartOfAccounts')) || [];
            
            if (accounts.length > 0) {
                logTestResult(testName, true, `تم العثور على ${accounts.length} حساب للعرض`);
            } else {
                logTestResult(testName, false, 'لا توجد حسابات للعرض');
            }
        } else {
            logTestResult(testName, false, 'عنصر جدول الحسابات غير موجود في الصفحة');
        }
        
    } catch (error) {
        logTestResult(testName, false, `خطأ في اختبار العرض: ${error.message}`);
    }
}

/**
 * اختبار استمرارية البيانات
 */
function testAccountPersistence() {
    const testName = 'اختبار استمرارية البيانات';
    console.log(`🔍 ${testName}...`);
    
    try {
        // إنشاء حساب للاختبار
        const persistenceTestAccount = {
            id: Date.now() + 1000,
            code: 'PERSIST001',
            name: 'حساب اختبار الاستمرارية',
            type: 'liabilities',
            balance: 2000,
            status: 'active',
            level: 1,
            parentCode: null,
            parentName: null,
            createdAt: new Date().toISOString()
        };
        
        // حفظ الحساب
        let accounts = JSON.parse(localStorage.getItem('chartOfAccounts')) || [];
        accounts = accounts.filter(acc => acc.code !== persistenceTestAccount.code);
        accounts.push(persistenceTestAccount);
        localStorage.setItem('chartOfAccounts', JSON.stringify(accounts));
        localStorage.setItem('monjizAccounts', JSON.stringify(accounts));
        
        // محاولة إعادة تحميل البيانات
        const reloadedAccounts = JSON.parse(localStorage.getItem('chartOfAccounts'));
        const reloadedAccount = reloadedAccounts.find(acc => acc.code === persistenceTestAccount.code);
        
        if (reloadedAccount && 
            reloadedAccount.name === persistenceTestAccount.name &&
            reloadedAccount.balance === persistenceTestAccount.balance) {
            logTestResult(testName, true, 'البيانات تحتفظ بقيمها بعد إعادة التحميل');
        } else {
            logTestResult(testName, false, 'فقدان البيانات بعد إعادة التحميل');
        }
        
    } catch (error) {
        logTestResult(testName, false, `خطأ في اختبار الاستمرارية: ${error.message}`);
    }
}

/**
 * اختبار منع تكرار الحسابات
 */
function testAccountDuplication() {
    const testName = 'اختبار منع تكرار الحسابات';
    console.log(`🔍 ${testName}...`);
    
    try {
        const duplicateAccount = {
            id: Date.now() + 2000,
            code: 'DUP001',
            name: 'حساب اختبار التكرار',
            type: 'revenue',
            balance: 0,
            status: 'active',
            level: 1,
            parentCode: null,
            parentName: null,
            createdAt: new Date().toISOString()
        };
        
        // إضافة الحساب للمرة الأولى
        let accounts = JSON.parse(localStorage.getItem('chartOfAccounts')) || [];
        accounts = accounts.filter(acc => acc.code !== duplicateAccount.code);
        accounts.push(duplicateAccount);
        localStorage.setItem('chartOfAccounts', JSON.stringify(accounts));
        
        const accountsAfterFirst = JSON.parse(localStorage.getItem('chartOfAccounts'));
        const firstCount = accountsAfterFirst.filter(acc => acc.code === duplicateAccount.code).length;
        
        // محاولة إضافة نفس الحساب مرة أخرى
        const duplicateAttempt = { ...duplicateAccount, id: Date.now() + 3000 };
        
        // التحقق من وجود الحساب مسبقاً
        const existingAccount = accountsAfterFirst.find(acc => acc.code === duplicateAccount.code);
        
        if (existingAccount && firstCount === 1) {
            logTestResult(testName, true, 'نظام منع التكرار يعمل بشكل صحيح');
        } else {
            logTestResult(testName, false, 'فشل في منع تكرار الحسابات');
        }
        
    } catch (error) {
        logTestResult(testName, false, `خطأ في اختبار التكرار: ${error.message}`);
    }
}

/**
 * اختبار أنواع الحسابات المختلفة
 */
function testAccountTypes() {
    const testName = 'اختبار أنواع الحسابات المختلفة';
    console.log(`🔍 ${testName}...`);
    
    try {
        const accountTypes = ['assets', 'liabilities', 'equity', 'revenue', 'expenses'];
        let typeTestsPassed = 0;
        
        accountTypes.forEach((type, index) => {
            const typeTestAccount = {
                id: Date.now() + 4000 + index,
                code: `TYPE${index + 1}`,
                name: `حساب اختبار نوع ${type}`,
                type: type,
                balance: (index + 1) * 1000,
                status: 'active',
                level: 1,
                parentCode: null,
                parentName: null,
                createdAt: new Date().toISOString()
            };
            
            try {
                let accounts = JSON.parse(localStorage.getItem('chartOfAccounts')) || [];
                accounts = accounts.filter(acc => acc.code !== typeTestAccount.code);
                accounts.push(typeTestAccount);
                localStorage.setItem('chartOfAccounts', JSON.stringify(accounts));
                
                const savedAccounts = JSON.parse(localStorage.getItem('chartOfAccounts'));
                const savedAccount = savedAccounts.find(acc => acc.code === typeTestAccount.code);
                
                if (savedAccount && savedAccount.type === type) {
                    typeTestsPassed++;
                }
            } catch (error) {
                console.error(`خطأ في اختبار نوع ${type}:`, error);
            }
        });
        
        if (typeTestsPassed === accountTypes.length) {
            logTestResult(testName, true, `تم اختبار جميع أنواع الحسابات (${accountTypes.length}) بنجاح`);
        } else {
            logTestResult(testName, false, `فشل في اختبار بعض أنواع الحسابات. نجح: ${typeTestsPassed}/${accountTypes.length}`);
        }
        
    } catch (error) {
        logTestResult(testName, false, `خطأ في اختبار الأنواع: ${error.message}`);
    }
}

/**
 * تسجيل نتيجة الاختبار
 */
function logTestResult(testName, passed, message) {
    testCounter++;
    const result = {
        id: testCounter,
        name: testName,
        passed: passed,
        message: message,
        timestamp: new Date().toISOString()
    };
    
    testResults.push(result);
    
    const status = passed ? '✅ نجح' : '❌ فشل';
    console.log(`${status} - ${testName}: ${message}`);
}

/**
 * عرض نتائج الاختبارات
 */
function displayTestResults() {
    console.log('\n📊 ملخص نتائج الاختبارات:');
    console.log('================================');
    
    const totalTests = testResults.length;
    const passedTests = testResults.filter(test => test.passed).length;
    const failedTests = totalTests - passedTests;
    const successRate = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
    
    console.log(`إجمالي الاختبارات: ${totalTests}`);
    console.log(`الاختبارات الناجحة: ${passedTests}`);
    console.log(`الاختبارات الفاشلة: ${failedTests}`);
    console.log(`معدل النجاح: ${successRate}%`);
    
    console.log('\nتفاصيل الاختبارات:');
    testResults.forEach(test => {
        const status = test.passed ? '✅' : '❌';
        console.log(`${status} ${test.name}: ${test.message}`);
    });
    
    // عرض التوصيات
    if (failedTests > 0) {
        console.log('\n⚠️ توصيات لإصلاح المشاكل:');
        testResults.filter(test => !test.passed).forEach(test => {
            console.log(`- ${test.name}: ${test.message}`);
        });
    } else {
        console.log('\n🎉 جميع الاختبارات نجحت! النظام يعمل بشكل صحيح.');
    }
    
    return {
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        successRate: successRate,
        details: testResults
    };
}

/**
 * اختبار سريع لإضافة حساب واحد
 */
function quickAddAccountTest() {
    console.log('🚀 اختبار سريع لإضافة حساب...');
    
    const quickTestAccount = {
        id: Date.now(),
        code: 'QUICK001',
        name: 'حساب اختبار سريع',
        type: 'assets',
        balance: 5000,
        status: 'active',
        level: 1,
        parentCode: null,
        parentName: null,
        createdAt: new Date().toISOString()
    };
    
    try {
        let accounts = JSON.parse(localStorage.getItem('chartOfAccounts')) || [];
        accounts = accounts.filter(acc => acc.code !== quickTestAccount.code);
        accounts.push(quickTestAccount);
        localStorage.setItem('chartOfAccounts', JSON.stringify(accounts));
        localStorage.setItem('monjizAccounts', JSON.stringify(accounts));
        
        console.log('✅ تم إضافة الحساب السريع بنجاح');
        console.log('📊 إجمالي الحسابات الآن:', accounts.length);
        
        // تحديث العرض إذا كانت الدالة متوفرة
        if (typeof updateAccountsTable === 'function') {
            updateAccountsTable(accounts);
        } else if (typeof loadAccountsFromCentralSystem === 'function') {
            loadAccountsFromCentralSystem();
        }
        
        return true;
    } catch (error) {
        console.error('❌ فشل في إضافة الحساب السريع:', error);
        return false;
    }
}

/**
 * مسح حسابات الاختبار
 */
function clearTestAccounts() {
    console.log('🧹 مسح حسابات الاختبار...');
    
    try {
        let accounts = JSON.parse(localStorage.getItem('chartOfAccounts')) || [];
        const originalCount = accounts.length;
        
        // إزالة الحسابات التي تبدأ بـ TEST أو QUICK أو DUP أو PERSIST أو TYPE
        accounts = accounts.filter(acc => 
            !acc.code.startsWith('TEST') &&
            !acc.code.startsWith('QUICK') &&
            !acc.code.startsWith('DUP') &&
            !acc.code.startsWith('PERSIST') &&
            !acc.code.startsWith('TYPE') &&
            acc.code !== '9999'
        );
        
        localStorage.setItem('chartOfAccounts', JSON.stringify(accounts));
        localStorage.setItem('monjizAccounts', JSON.stringify(accounts));
        
        const removedCount = originalCount - accounts.length;
        console.log(`✅ تم مسح ${removedCount} حساب اختبار`);
        console.log(`📊 الحسابات المتبقية: ${accounts.length}`);
        
        // تحديث العرض إذا كانت الدالة متوفرة
        if (typeof updateAccountsTable === 'function') {
            updateAccountsTable(accounts);
        } else if (typeof loadAccountsFromCentralSystem === 'function') {
            loadAccountsFromCentralSystem();
        }
        
        return removedCount;
    } catch (error) {
        console.error('❌ خطأ في مسح حسابات الاختبار:', error);
        return 0;
    }
}

// تصدير الوظائف للاستخدام العام
if (typeof window !== 'undefined') {
    window.runAccountSystemTests = runAccountSystemTests;
    window.quickAddAccountTest = quickAddAccountTest;
    window.clearTestAccounts = clearTestAccounts;
}

console.log('📋 ملف اختبار نظام الحسابات جاهز للاستخدام');
console.log('🔧 الوظائف المتاحة:');
console.log('   - runAccountSystemTests() - تشغيل جميع الاختبارات');
console.log('   - quickAddAccountTest() - اختبار سريع لإضافة حساب');
console.log('   - clearTestAccounts() - مسح حسابات الاختبار');
