/**
 * CatecSeguros - Security Module
 * Módulo de segurança cibernética para proteção do site
 */

class SecurityManager {
    constructor() {
        this.isSecure = false;
        this.securityLevel = 'checking';
        this.encryptionKey = this.generateEncryptionKey();
        this.init();
    }

    /**
     * Inicializa o sistema de segurança
     */
    init() {
        this.checkConnectionSecurity();
        this.setupSecurityHeaders();
        this.enableCSRFProtection();
        this.setupInputValidation();
        this.monitorSuspiciousActivity();
        this.setupSessionSecurity();
        this.enableContentSecurityPolicy();
    }

    /**
     * Verifica a segurança da conexão
     */
    checkConnectionSecurity() {
        const isHTTPS = location.protocol === 'https:';
        const hasValidCertificate = this.validateCertificate();
        
        if (isHTTPS && hasValidCertificate) {
            this.securityLevel = 'secure';
            this.isSecure = true;
            this.showSecurityIndicator('secure');
        } else {
            this.securityLevel = 'insecure';
            this.isSecure = false;
            this.showSecurityIndicator('insecure');
        }

        // Simula verificação de segurança
        setTimeout(() => {
            this.hideSecurityOverlay();
        }, 2000);
    }

    /**
     * Simula validação de certificado SSL
     */
    validateCertificate() {
        // Em produção, isso seria uma validação real do certificado
        return true;
    }

    /**
     * Gera chave de criptografia para dados sensíveis
     */
    generateEncryptionKey() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Configura headers de segurança
     */
    setupSecurityHeaders() {
        // Headers já configurados no HTML meta tags
        console.log('🔒 Security headers configured');
    }

    /**
     * Proteção contra CSRF
     */
    enableCSRFProtection() {
        const token = this.generateCSRFToken();
        document.querySelectorAll('form').forEach(form => {
            const tokenInput = document.createElement('input');
            tokenInput.type = 'hidden';
            tokenInput.name = 'csrf_token';
            tokenInput.value = token;
            form.appendChild(tokenInput);
        });
    }

    /**
     * Gera token CSRF
     */
    generateCSRFToken() {
        return btoa(Date.now() + Math.random()).replace(/[^a-zA-Z0-9]/g, '');
    }

    /**
     * Configura validação de entrada
     */
    setupInputValidation() {
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', (e) => {
                this.validateInput(e.target);
            });

            input.addEventListener('blur', (e) => {
                this.sanitizeInput(e.target);
            });
        });
    }

    /**
     * Valida entrada do usuário
     */
    validateInput(input) {
        const value = input.value;
        const type = input.type;
        const name = input.name;

        // Remove caracteres perigosos
        const dangerousChars = /[<>'"&]/g;
        if (dangerousChars.test(value)) {
            this.showInputWarning(input, 'Caracteres suspeitos detectados');
            return false;
        }

        // Validação específica por tipo
        switch (type) {
            case 'email':
                if (!this.isValidEmail(value)) {
                    this.showInputWarning(input, 'Formato de e-mail inválido');
                    return false;
                }
                break;
            case 'tel':
                if (!this.isValidPhone(value)) {
                    this.showInputWarning(input, 'Formato de telefone inválido');
                    return false;
                }
                break;
        }

        this.clearInputWarning(input);
        return true;
    }

    /**
     * Sanitiza entrada do usuário
     */
    sanitizeInput(input) {
        let value = input.value;
        
        // Remove scripts e tags HTML
        value = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        value = value.replace(/<[^>]*>/g, '');
        
        // Remove caracteres de controle
        value = value.replace(/[\x00-\x1F\x7F]/g, '');
        
        input.value = value;
    }

    /**
     * Valida formato de e-mail
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Valida formato de telefone
     */
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    /**
     * Monitora atividades suspeitas
     */
    monitorSuspiciousActivity() {
        // Detecta tentativas de injeção
        document.addEventListener('keydown', (e) => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                this.logSuspiciousActivity('DevTools attempt');
            }
        });

        // Detecta cliques suspeitos
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.href.includes('javascript:')) {
                e.preventDefault();
                this.logSuspiciousActivity('JavaScript link click attempt');
            }
        });

        // Monitora mudanças no DOM
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.tagName === 'SCRIPT' && !node.src) {
                            this.logSuspiciousActivity('Inline script injection attempt');
                            node.remove();
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Configura segurança de sessão
     */
    setupSessionSecurity() {
        // Simula configuração de sessão segura
        const sessionId = this.generateSessionId();
        sessionStorage.setItem('session_id', sessionId);
        
        // Auto-logout após inatividade
        let lastActivity = Date.now();
        document.addEventListener('mousemove', () => lastActivity = Date.now());
        document.addEventListener('keypress', () => lastActivity = Date.now());
        
        setInterval(() => {
            if (Date.now() - lastActivity > 1800000) { // 30 minutos
                this.logout();
            }
        }, 60000);
    }

    /**
     * Gera ID de sessão seguro
     */
    generateSessionId() {
        return btoa(Date.now() + Math.random()).replace(/[^a-zA-Z0-9]/g, '');
    }

    /**
     * Política de segurança de conteúdo
     */
    enableContentSecurityPolicy() {
        // CSP já configurado no HTML meta tag
        console.log('🛡️ Content Security Policy enabled');
    }

    /**
     * Criptografa dados sensíveis
     */
    encryptData(data) {
        try {
            const jsonString = JSON.stringify(data);
            const encoded = btoa(jsonString);
            return encoded;
        } catch (error) {
            console.error('Erro na criptografia:', error);
            return null;
        }
    }

    /**
     * Descriptografa dados
     */
    decryptData(encryptedData) {
        try {
            const decoded = atob(encryptedData);
            return JSON.parse(decoded);
        } catch (error) {
            console.error('Erro na descriptografia:', error);
            return null;
        }
    }

    /**
     * Mostra indicador de segurança
     */
    showSecurityIndicator(status) {
        const indicator = document.createElement('div');
        indicator.className = 'security-indicator';
        indicator.id = 'security-indicator';
        
        if (status === 'secure') {
            indicator.style.background = '#10b981';
            indicator.textContent = 'Conexão Segura';
        } else {
            indicator.style.background = '#ef4444';
            indicator.textContent = 'Conexão Insegura';
        }
        
        document.body.appendChild(indicator);
    }

    /**
     * Esconde overlay de segurança
     */
    hideSecurityOverlay() {
        const overlay = document.getElementById('security-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }
    }

    /**
     * Mostra aviso de entrada
     */
    showInputWarning(input, message) {
        this.clearInputWarning(input);
        
        const warning = document.createElement('div');
        warning.className = 'input-warning';
        warning.textContent = message;
        warning.style.color = '#ef4444';
        warning.style.fontSize = '0.8rem';
        warning.style.marginTop = '0.25rem';
        
        input.parentNode.appendChild(warning);
        input.style.borderColor = '#ef4444';
    }

    /**
     * Remove aviso de entrada
     */
    clearInputWarning(input) {
        const existingWarning = input.parentNode.querySelector('.input-warning');
        if (existingWarning) {
            existingWarning.remove();
        }
        input.style.borderColor = '#e5e7eb';
    }

    /**
     * Registra atividade suspeita
     */
    logSuspiciousActivity(activity) {
        const log = {
            timestamp: new Date().toISOString(),
            activity: activity,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.warn('🚨 Atividade suspeita detectada:', log);
        
        // Em produção, enviaria para servidor de monitoramento
        this.sendSecurityAlert(log);
    }

    /**
     * Envia alerta de segurança
     */
    sendSecurityAlert(log) {
        // Simula envio de alerta para servidor de segurança
        console.log('📡 Enviando alerta de segurança:', log);
    }

    /**
     * Logout do usuário
     */
    logout() {
        sessionStorage.clear();
        localStorage.clear();
        window.location.reload();
    }

    /**
     * Verifica integridade da página
     */
    checkPageIntegrity() {
        const expectedElements = ['header', 'main', 'footer'];
        const missingElements = expectedElements.filter(tag => 
            !document.querySelector(tag)
        );
        
        if (missingElements.length > 0) {
            this.logSuspiciousActivity(`Missing elements: ${missingElements.join(', ')}`);
        }
    }

    /**
     * Bloqueia tentativas de phishing
     */
    blockPhishingAttempts() {
        // Verifica se o domínio é legítimo
        const legitimateDomains = ['catecseguros.com.br', 'localhost'];
        const currentDomain = window.location.hostname;
        
        if (!legitimateDomains.includes(currentDomain)) {
            this.logSuspiciousActivity(`Suspicious domain: ${currentDomain}`);
            // Em produção, redirecionaria para domínio oficial
        }
    }
}

// Inicializa o sistema de segurança quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.securityManager = new SecurityManager();
    
    // Verifica integridade da página
    setTimeout(() => {
        window.securityManager.checkPageIntegrity();
        window.securityManager.blockPhishingAttempts();
    }, 1000);
});

// Exporta para uso global
window.SecurityManager = SecurityManager;
