// دليل الحسابات الشامل والنظامي
// Chart of Accounts - Comprehensive and Systematic

const comprehensiveChartOfAccounts = [
    // 1000 - الأصول (Assets)
    {
        id: 1000,
        code: '1000',
        name: 'الأصول',
        type: 'assets',
        subtype: 'main',
        balance: 0,
        status: 'active',
        description: 'إجمالي الأصول',
        children: [
            // 1100 - الأصول المتداولة (Current Assets)
            {
                id: 1100,
                code: '1100',
                name: 'الأصول المتداولة',
                type: 'assets',
                subtype: 'current',
                balance: 0,
                status: 'active',
                description: 'الأصول التي يمكن تحويلها إلى نقد خلال سنة',
                children: [
                    {
                        id: 1101,
                        code: '1101',
                        name: 'النقدية في الصندوق',
                        type: 'assets',
                        subtype: 'cash',
                        balance: 0,
                        status: 'active',
                        description: 'النقود المتوفرة في الصندوق'
                    },
                    {
                        id: 1102,
                        code: '1102',
                        name: 'النقدية في البنك - الحساب الجاري',
                        type: 'assets',
                        subtype: 'bank',
                        balance: 0,
                        status: 'active',
                        description: 'الرصيد في الحساب الجاري بالبنك'
                    },
                    {
                        id: 1103,
                        code: '1103',
                        name: 'النقدية في البنك - حساب التوفير',
                        type: 'assets',
                        subtype: 'bank',
                        balance: 0,
                        status: 'active',
                        description: 'الرصيد في حساب التوفير'
                    },
                    {
                        id: 1110,
                        code: '1110',
                        name: 'العملاء والمدينون',
                        type: 'assets',
                        subtype: 'receivables',
                        balance: 0,
                        status: 'active',
                        description: 'المبالغ المستحقة من العملاء'
                    },
                    {
                        id: 1120,
                        code: '1120',
                        name: 'أوراق القبض',
                        type: 'assets',
                        subtype: 'receivables',
                        balance: 0,
                        status: 'active',
                        description: 'الكمبيالات والشيكات المستحقة القبض'
                    },
                    {
                        id: 1130,
                        code: '1130',
                        name: 'المخزون - البضاعة',
                        type: 'assets',
                        subtype: 'inventory',
                        balance: 0,
                        status: 'active',
                        description: 'قيمة البضاعة المتوفرة للبيع'
                    },
                    {
                        id: 1140,
                        code: '1140',
                        name: 'المصروفات المدفوعة مقدماً',
                        type: 'assets',
                        subtype: 'prepaid',
                        balance: 0,
                        status: 'active',
                        description: 'المصروفات المدفوعة مسبقاً'
                    }
                ]
            },
            // 1200 - الأصول الثابتة (Fixed Assets)
            {
                id: 1200,
                code: '1200',
                name: 'الأصول الثابتة',
                type: 'assets',
                subtype: 'fixed',
                balance: 0,
                status: 'active',
                description: 'الأصول طويلة الأجل',
                children: [
                    {
                        id: 1201,
                        code: '1201',
                        name: 'الأراضي',
                        type: 'assets',
                        subtype: 'fixed',
                        balance: 0,
                        status: 'active',
                        description: 'قيمة الأراضي المملوكة'
                    },
                    {
                        id: 1202,
                        code: '1202',
                        name: 'المباني',
                        type: 'assets',
                        subtype: 'fixed',
                        balance: 0,
                        status: 'active',
                        description: 'قيمة المباني والمنشآت'
                    },
                    {
                        id: 1203,
                        code: '1203',
                        name: 'مجمع إهلاك المباني',
                        type: 'assets',
                        subtype: 'accumulated_depreciation',
                        balance: 0,
                        status: 'active',
                        description: 'إهلاك المباني المتراكم'
                    },
                    {
                        id: 1210,
                        code: '1210',
                        name: 'الآلات والمعدات',
                        type: 'assets',
                        subtype: 'fixed',
                        balance: 0,
                        status: 'active',
                        description: 'قيمة الآلات والمعدات'
                    },
                    {
                        id: 1211,
                        code: '1211',
                        name: 'مجمع إهلاك الآلات والمعدات',
                        type: 'assets',
                        subtype: 'accumulated_depreciation',
                        balance: 0,
                        status: 'active',
                        description: 'إهلاك الآلات والمعدات المتراكم'
                    },
                    {
                        id: 1220,
                        code: '1220',
                        name: 'الأثاث والتجهيزات',
                        type: 'assets',
                        subtype: 'fixed',
                        balance: 0,
                        status: 'active',
                        description: 'قيمة الأثاث والتجهيزات المكتبية'
                    },
                    {
                        id: 1221,
                        code: '1221',
                        name: 'مجمع إهلاك الأثاث والتجهيزات',
                        type: 'assets',
                        subtype: 'accumulated_depreciation',
                        balance: 0,
                        status: 'active',
                        description: 'إهلاك الأثاث والتجهيزات المتراكم'
                    },
                    {
                        id: 1230,
                        code: '1230',
                        name: 'السيارات',
                        type: 'assets',
                        subtype: 'fixed',
                        balance: 0,
                        status: 'active',
                        description: 'قيمة السيارات والمركبات'
                    },
                    {
                        id: 1231,
                        code: '1231',
                        name: 'مجمع إهلاك السيارات',
                        type: 'assets',
                        subtype: 'accumulated_depreciation',
                        balance: 0,
                        status: 'active',
                        description: 'إهلاك السيارات المتراكم'
                    }
                ]
            }
        ]
    },

    // 2000 - الخصوم (Liabilities)
    {
        id: 2000,
        code: '2000',
        name: 'الخصوم',
        type: 'liabilities',
        subtype: 'main',
        balance: 0,
        status: 'active',
        description: 'إجمالي الخصوم والالتزامات',
        children: [
            // 2100 - الخصوم المتداولة (Current Liabilities)
            {
                id: 2100,
                code: '2100',
                name: 'الخصوم المتداولة',
                type: 'liabilities',
                subtype: 'current',
                balance: 0,
                status: 'active',
                description: 'الالتزامات قصيرة الأجل',
                children: [
                    {
                        id: 2101,
                        code: '2101',
                        name: 'الموردون والدائنون',
                        type: 'liabilities',
                        subtype: 'payables',
                        balance: 0,
                        status: 'active',
                        description: 'المبالغ المستحقة للموردين'
                    },
                    {
                        id: 2102,
                        code: '2102',
                        name: 'أوراق الدفع',
                        type: 'liabilities',
                        subtype: 'payables',
                        balance: 0,
                        status: 'active',
                        description: 'الكمبيالات والشيكات المستحقة الدفع'
                    },
                    {
                        id: 2110,
                        code: '2110',
                        name: 'الرواتب والأجور المستحقة',
                        type: 'liabilities',
                        subtype: 'accrued',
                        balance: 0,
                        status: 'active',
                        description: 'الرواتب والأجور غير المدفوعة'
                    },
                    {
                        id: 2120,
                        code: '2120',
                        name: 'الضرائب المستحقة',
                        type: 'liabilities',
                        subtype: 'accrued',
                        balance: 0,
                        status: 'active',
                        description: 'الضرائب المستحقة الدفع'
                    },
                    {
                        id: 2130,
                        code: '2130',
                        name: 'المصروفات المستحقة',
                        type: 'liabilities',
                        subtype: 'accrued',
                        balance: 0,
                        status: 'active',
                        description: 'المصروفات المستحقة غير المدفوعة'
                    }
                ]
            },
            // 2200 - الخصوم طويلة الأجل (Long-term Liabilities)
            {
                id: 2200,
                code: '2200',
                name: 'الخصوم طويلة الأجل',
                type: 'liabilities',
                subtype: 'long_term',
                balance: 0,
                status: 'active',
                description: 'الالتزامات طويلة الأجل',
                children: [
                    {
                        id: 2201,
                        code: '2201',
                        name: 'القروض طويلة الأجل',
                        type: 'liabilities',
                        subtype: 'long_term',
                        balance: 0,
                        status: 'active',
                        description: 'القروض المستحقة خلال أكثر من سنة'
                    },
                    {
                        id: 2202,
                        code: '2202',
                        name: 'السندات المستحقة الدفع',
                        type: 'liabilities',
                        subtype: 'long_term',
                        balance: 0,
                        status: 'active',
                        description: 'السندات الصادرة من الشركة'
                    }
                ]
            }
        ]
    },

    // 3000 - حقوق الملكية (Equity)
    {
        id: 3000,
        code: '3000',
        name: 'حقوق الملكية',
        type: 'equity',
        subtype: 'main',
        balance: 0,
        status: 'active',
        description: 'حقوق أصحاب المشروع',
        children: [
            {
                id: 3100,
                code: '3100',
                name: 'رأس المال',
                type: 'equity',
                subtype: 'capital',
                balance: 0,
                status: 'active',
                description: 'رأس المال المدفوع'
            },
            {
                id: 3200,
                code: '3200',
                name: 'الأرباح المحتجزة',
                type: 'equity',
                subtype: 'retained_earnings',
                balance: 0,
                status: 'active',
                description: 'الأرباح المتراكمة من السنوات السابقة'
            },
            {
                id: 3300,
                code: '3300',
                name: 'احتياطي عام',
                type: 'equity',
                subtype: 'reserves',
                balance: 0,
                status: 'active',
                description: 'الاحتياطي العام للشركة'
            },
            {
                id: 3400,
                code: '3400',
                name: 'احتياطي قانوني',
                type: 'equity',
                subtype: 'reserves',
                balance: 0,
                status: 'active',
                description: 'الاحتياطي القانوني المطلوب'
            }
        ]
    },

    // 4000 - الإيرادات (Revenue)
    {
        id: 4000,
        code: '4000',
        name: 'الإيرادات',
        type: 'revenue',
        subtype: 'main',
        balance: 0,
        status: 'active',
        description: 'إجمالي الإيرادات',
        children: [
            {
                id: 4100,
                code: '4100',
                name: 'إيرادات المبيعات',
                type: 'revenue',
                subtype: 'sales',
                balance: 0,
                status: 'active',
                description: 'إيرادات بيع البضائع والمنتجات'
            },
            {
                id: 4200,
                code: '4200',
                name: 'إيرادات الخدمات',
                type: 'revenue',
                subtype: 'services',
                balance: 0,
                status: 'active',
                description: 'إيرادات تقديم الخدمات'
            },
            {
                id: 4300,
                code: '4300',
                name: 'إيرادات أخرى',
                type: 'revenue',
                subtype: 'other_income',
                balance: 0,
                status: 'active',
                description: 'الإيرادات المتنوعة الأخرى'
            },
            {
                id: 4400,
                code: '4400',
                name: 'إيرادات الاستثمار',
                type: 'revenue',
                subtype: 'other_income',
                balance: 0,
                status: 'active',
                description: 'عوائد الاستثمارات والودائع'
            }
        ]
    },

    // 5000 - المصروفات (Expenses)
    {
        id: 5000,
        code: '5000',
        name: 'المصروفات',
        type: 'expenses',
        subtype: 'main',
        balance: 0,
        status: 'active',
        description: 'إجمالي المصروفات',
        children: [
            // 5100 - تكلفة المبيعات
            {
                id: 5100,
                code: '5100',
                name: 'تكلفة المبيعات',
                type: 'expenses',
                subtype: 'cost_of_sales',
                balance: 0,
                status: 'active',
                description: 'التكلفة المباشرة للبضائع المباعة'
            },
            // 5200 - المصروفات التشغيلية
            {
                id: 5200,
                code: '5200',
                name: 'المصروفات التشغيلية',
                type: 'expenses',
                subtype: 'operating',
                balance: 0,
                status: 'active',
                description: 'المصروفات اللازمة لتشغيل النشاط',
                children: [
                    {
                        id: 5201,
                        code: '5201',
                        name: 'الرواتب والأجور',
                        type: 'expenses',
                        subtype: 'operating',
                        balance: 0,
                        status: 'active',
                        description: 'رواتب وأجور الموظفين'
                    },
                    {
                        id: 5202,
                        code: '5202',
                        name: 'الإيجارات',
                        type: 'expenses',
                        subtype: 'operating',
                        balance: 0,
                        status: 'active',
                        description: 'إيجار المكاتب والمحلات'
                    },
                    {
                        id: 5203,
                        code: '5203',
                        name: 'الكهرباء والماء',
                        type: 'expenses',
                        subtype: 'operating',
                        balance: 0,
                        status: 'active',
                        description: 'فواتير المرافق العامة'
                    },
                    {
                        id: 5204,
                        code: '5204',
                        name: 'الهاتف والإنترنت',
                        type: 'expenses',
                        subtype: 'operating',
                        balance: 0,
                        status: 'active',
                        description: 'مصروفات الاتصالات'
                    },
                    {
                        id: 5205,
                        code: '5205',
                        name: 'الصيانة والإصلاح',
                        type: 'expenses',
                        subtype: 'operating',
                        balance: 0,
                        status: 'active',
                        description: 'مصروفات صيانة الأصول'
                    }
                ]
            },
            // 5300 - المصروفات الإدارية
            {
                id: 5300,
                code: '5300',
                name: 'المصروفات الإدارية',
                type: 'expenses',
                subtype: 'administrative',
                balance: 0,
                status: 'active',
                description: 'المصروفات الإدارية والعمومية',
                children: [
                    {
                        id: 5301,
                        code: '5301',
                        name: 'القرطاسية والمطبوعات',
                        type: 'expenses',
                        subtype: 'administrative',
                        balance: 0,
                        status: 'active',
                        description: 'مصروفات القرطاسية والمطبوعات'
                    },
                    {
                        id: 5302,
                        code: '5302',
                        name: 'الاستشارات المهنية',
                        type: 'expenses',
                        subtype: 'administrative',
                        balance: 0,
                        status: 'active',
                        description: 'أتعاب المحاسبين والمستشارين'
                    },
                    {
                        id: 5303,
                        code: '5303',
                        name: 'التأمينات',
                        type: 'expenses',
                        subtype: 'administrative',
                        balance: 0,
                        status: 'active',
                        description: 'أقساط التأمين المختلفة'
                    }
                ]
            },
            // 5400 - مصروفات البيع والتسويق
            {
                id: 5400,
                code: '5400',
                name: 'مصروفات البيع والتسويق',
                type: 'expenses',
                subtype: 'selling',
                balance: 0,
                status: 'active',
                description: 'مصروفات الترويج والتسويق',
                children: [
                    {
                        id: 5401,
                        code: '5401',
                        name: 'الإعلان والدعاية',
                        type: 'expenses',
                        subtype: 'selling',
                        balance: 0,
                        status: 'active',
                        description: 'مصروفات الحملات الإعلانية'
                    },
                    {
                        id: 5402,
                        code: '5402',
                        name: 'عمولات المبيعات',
                        type: 'expenses',
                        subtype: 'selling',
                        balance: 0,
                        status: 'active',
                        description: 'عمولات مندوبي المبيعات'
                    }
                ]
            },
            // 5500 - المصروفات المالية
            {
                id: 5500,
                code: '5500',
                name: 'المصروفات المالية',
                type: 'expenses',
                subtype: 'financial',
                balance: 0,
                status: 'active',
                description: 'الفوائد والمصروفات المالية',
                children: [
                    {
                        id: 5501,
                        code: '5501',
                        name: 'فوائد القروض',
                        type: 'expenses',
                        subtype: 'financial',
                        balance: 0,
                        status: 'active',
                        description: 'فوائد القروض البنكية'
                    },
                    {
                        id: 5502,
                        code: '5502',
                        name: 'رسوم بنكية',
                        type: 'expenses',
                        subtype: 'financial',
                        balance: 0,
                        status: 'active',
                        description: 'الرسوم والعمولات البنكية'
                    }
                ]
            }
        ]
    }
];

// الأنواع الفرعية للحسابات
const accountSubTypes = {
    assets: [
        { value: 'cash', label: 'النقدية' },
        { value: 'bank', label: 'البنوك' },
        { value: 'receivables', label: 'المدينون' },
        { value: 'inventory', label: 'المخزون' },
        { value: 'prepaid', label: 'المدفوع مقدماً' },
        { value: 'fixed', label: 'الأصول الثابتة' },
        { value: 'accumulated_depreciation', label: 'مجمع الإهلاك' }
    ],
    liabilities: [
        { value: 'payables', label: 'الدائنون' },
        { value: 'accrued', label: 'المستحقات' },
        { value: 'current', label: 'قصيرة الأجل' },
        { value: 'long_term', label: 'طويلة الأجل' }
    ],
    equity: [
        { value: 'capital', label: 'رأس المال' },
        { value: 'retained_earnings', label: 'الأرباح المحتجزة' },
        { value: 'reserves', label: 'الاحتياطيات' }
    ],
    revenue: [
        { value: 'sales', label: 'المبيعات' },
        { value: 'services', label: 'الخدمات' },
        { value: 'other_income', label: 'إيرادات أخرى' }
    ],
    expenses: [
        { value: 'cost_of_sales', label: 'تكلفة المبيعات' },
        { value: 'operating', label: 'مصروفات تشغيلية' },
        { value: 'administrative', label: 'مصروفات إدارية' },
        { value: 'selling', label: 'مصروفات بيع وتسويق' },
        { value: 'financial', label: 'مصروفات مالية' }
    ]
};

// أيقونات الحسابات
const accountIcons = {
    assets: 'fas fa-coins',
    liabilities: 'fas fa-credit-card',
    equity: 'fas fa-balance-scale',
    revenue: 'fas fa-arrow-up',
    expenses: 'fas fa-arrow-down'
};

// ألوان الحسابات
const accountColors = {
    assets: '#4CAF50',
    liabilities: '#FF5722',
    equity: '#9C27B0',
    revenue: '#2196F3',
    expenses: '#FF9800'
};
