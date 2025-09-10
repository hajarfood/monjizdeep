// نظام التشفير المتقدم لحماية البيانات الحساسة
class EncryptionSystem {
    constructor() {
        this.algorithm = 'AES-GCM';
        this.keyLength = 256;
        this.ivLength = 12;
        this.tagLength = 16;
        this.saltLength = 16;
        this.iterations = 100000;
        this.isInitialized = false;
    }

    // إعداد وتهيئة نظام التشفير
    async setupCrypto() {
        try {
            console.log('🔄 بدء تهيئة نظام التشفير...');
            // التحقق من دعم المتصفح لـ Web Crypto API
            if (!window.crypto || !window.crypto.subtle) {
                console.error('❌ المتصفح لا يدعم Web Crypto API');
                throw new Error('المتصفح لا يدعم Web Crypto API');
            }
            console.log('✓ المتصفح يدعم Web Crypto API');

            // اختبار عمليات التشفير الأساسية
            const testData = { test: 'encryption_test' };
            const testPassword = 'test_password_123';
            
            console.log('🔄 اختبار التشفير...');
            const encrypted = await this.encrypt(testData, testPassword);
            console.log('✓ تم التشفير بنجاح');
            
            console.log('🔄 اختبار فك التشفير...');
            const decrypted = await this.decrypt(encrypted, testPassword);
            console.log('✓ تم فك التشفير بنجاح');
            
            if (JSON.stringify(testData) !== JSON.stringify(decrypted)) {
                console.error('❌ فشل في اختبار التشفير: البيانات المشفرة لا تطابق البيانات الأصلية');
                throw new Error('فشل في اختبار التشفير');
            }
            console.log('✓ اختبار التشفير ناجح: البيانات متطابقة');

            // إعداد معرف الجهاز إذا لم يكن موجوداً
            this.getDeviceId();
            
            this.isInitialized = true;
            console.log('✅ تم إعداد نظام التشفير بنجاح');
            
            return true;
        } catch (error) {
            console.error('❌ خطأ في إعداد نظام التشفير:', error);
            this.isInitialized = false;
            throw error;
        }
    }

    // توليد مفتاح التشفير من كلمة مرور
    async deriveKey(password, salt) {
        const encoder = new TextEncoder();
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: this.iterations,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: this.algorithm, length: this.keyLength },
            false,
            ['encrypt', 'decrypt']
        );
    }

    // تشفير البيانات
    async encrypt(data, password) {
        try {
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(JSON.stringify(data));
            
            // توليد salt و IV عشوائيين
            const salt = crypto.getRandomValues(new Uint8Array(this.saltLength));
            const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
            
            // اشتقاق المفتاح
            const key = await this.deriveKey(password, salt);
            
            // التشفير
            const encryptedData = await crypto.subtle.encrypt(
                {
                    name: this.algorithm,
                    iv: iv
                },
                key,
                dataBuffer
            );
            
            // دمج salt و IV مع البيانات المشفرة
            const result = new Uint8Array(salt.length + iv.length + encryptedData.byteLength);
            result.set(salt, 0);
            result.set(iv, salt.length);
            result.set(new Uint8Array(encryptedData), salt.length + iv.length);
            
            // تحويل إلى Base64
            return btoa(String.fromCharCode(...result));
        } catch (error) {
            console.error('❌ خطأ في التشفير:', error);
            throw error;
        }
    }

    // فك التشفير
    async decrypt(encryptedData, password) {
        try {
            // تحويل من Base64
            const dataBuffer = new Uint8Array(
                atob(encryptedData).split('').map(char => char.charCodeAt(0))
            );
            
            // استخراج salt و IV
            const salt = dataBuffer.slice(0, this.saltLength);
            const iv = dataBuffer.slice(this.saltLength, this.saltLength + this.ivLength);
            const encrypted = dataBuffer.slice(this.saltLength + this.ivLength);
            
            // اشتقاق المفتاح
            const key = await this.deriveKey(password, salt);
            
            // فك التشفير
            const decryptedBuffer = await crypto.subtle.decrypt(
                {
                    name: this.algorithm,
                    iv: iv
                },
                key,
                encrypted
            );
            
            // تحويل إلى نص
            const decoder = new TextDecoder();
            const decryptedText = decoder.decode(decryptedBuffer);
            
            return JSON.parse(decryptedText);
        } catch (error) {
            console.error('❌ خطأ في فك التشفير:', error);
            throw error;
        }
    }

    // تشفير بيانات تسجيل الدخول
    async encryptLoginData(loginData) {
        const masterPassword = this.generateMasterPassword();
        return await this.encrypt(loginData, masterPassword);
    }

    // فك تشفير بيانات تسجيل الدخول
    async decryptLoginData(encryptedLoginData) {
        const masterPassword = this.generateMasterPassword();
        return await this.decrypt(encryptedLoginData, masterPassword);
    }

    // توليد كلمة مرور رئيسية
    generateMasterPassword() {
        // يمكن تحسين هذا باستخدام معرف فريد للجهاز
        const deviceId = this.getDeviceId();
        return `monjiz_${deviceId}_master_key_2024`;
    }

    // الحصول على معرف الجهاز
    getDeviceId() {
        let deviceId = localStorage.getItem('monjizDeviceId');
        if (!deviceId) {
            deviceId = this.generateRandomId();
            localStorage.setItem('monjizDeviceId', deviceId);
        }
        return deviceId;
    }

    // توليد معرف عشوائي
    generateRandomId() {
        return Array.from(crypto.getRandomValues(new Uint8Array(16)))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    // تشفير البيانات الحساسة
    async encryptSensitiveData(data) {
        const password = this.generateMasterPassword();
        return await this.encrypt(data, password);
    }

    // فك تشفير البيانات الحساسة
    async decryptSensitiveData(encryptedData) {
        const password = this.generateMasterPassword();
        return await this.decrypt(encryptedData, password);
    }
}

// إنشاء نظام التشفير
const encryptionSystem = new EncryptionSystem();
window.encryptionSystem = encryptionSystem;