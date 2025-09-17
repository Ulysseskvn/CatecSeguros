/**
 * CatecSeguros - Main Application
 * Aplicação principal do site fintech
 */

class CatecSegurosApp {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = false;
        this.formSubmissions = new Map();
        this.init();
    }

    /**
     * Inicializa a aplicação
     */
    init() {
        this.setupNavigation();
        this.setupForms();
        this.setupModals();
        this.setupAnimations();
        this.setupScrollEffects();
        this.setupResponsiveMenu();
        this.setupSecurityFeatures();
        this.setupPerformanceOptimizations();
    }

    /**
     * Configura navegação
     */
    setupNavigation() {
        // Smooth scrolling para links internos
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Atualiza seção ativa no scroll
        window.addEventListener('scroll', () => {
            this.updateActiveSection();
        });
    }

    /**
     * Rola para seção específica
     */
    scrollToSection(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            this.currentSection = sectionId;
            this.updateNavigation();
        }
    }

    /**
     * Atualiza seção ativa baseada no scroll
     */
    updateActiveSection() {
        const sections = ['home', 'services', 'security', 'about', 'contact'];
        const scrollPosition = window.scrollY + 100;

        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    this.currentSection = sectionId;
                    this.updateNavigation();
                    break;
                }
            }
        }
    }

    /**
     * Atualiza navegação ativa
     */
    updateNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${this.currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    /**
     * Configura formulários
     */
    setupForms() {
        // Formulário de contato
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(e.target);
            });
        }

        // Formulário de cotação
        const quoteForm = document.getElementById('quoteForm');
        if (quoteForm) {
            quoteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleQuoteForm(e.target);
            });
        }

        // Validação em tempo real
        this.setupFormValidation();
    }

    /**
     * Configura validação de formulários
     */
    setupFormValidation() {
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    /**
     * Valida campo individual
     */
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        let isValid = true;
        let errorMessage = '';

        // Validação obrigatória
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório';
        }

        // Validação de e-mail
        if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Formato de e-mail inválido';
        }

        // Validação de telefone
        if (name === 'phone' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Formato de telefone inválido';
        }

        // Validação de mensagem
        if (name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    /**
     * Valida e-mail
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Valida telefone
     */
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    /**
     * Mostra erro de campo
     */
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        
        field.style.borderColor = '#ef4444';
        field.parentNode.appendChild(errorDiv);
    }

    /**
     * Remove erro de campo
     */
    clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '#e5e7eb';
    }

    /**
     * Processa formulário de contato
     */
    async handleContactForm(form) {
        if (this.isLoading) return;

        // Valida todos os campos
        const fields = form.querySelectorAll('input, textarea, select');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Por favor, corrija os erros no formulário', 'error');
            return;
        }

        this.isLoading = true;
        this.setFormLoading(form, true);

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Criptografa dados sensíveis
            if (window.securityManager) {
                const encryptedData = window.securityManager.encryptData(data);
                console.log('Dados criptografados:', encryptedData);
            }

            // Simula envio para servidor
            await this.simulateFormSubmission(data);

            this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Erro no envio:', error);
            this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            this.isLoading = false;
            this.setFormLoading(form, false);
        }
    }

    /**
     * Processa formulário de cotação
     */
    async handleQuoteForm(form) {
        if (this.isLoading) return;

        // Valida todos os campos
        const fields = form.querySelectorAll('input, select');
        let isFormValid = true;

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Por favor, corrija os erros no formulário', 'error');
            return;
        }

        this.isLoading = true;
        this.setFormLoading(form, true);

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Criptografa dados sensíveis
            if (window.securityManager) {
                const encryptedData = window.securityManager.encryptData(data);
                console.log('Dados de cotação criptografados:', encryptedData);
            }

            // Simula envio para servidor
            await this.simulateFormSubmission(data);

            this.showNotification('Cotação solicitada com sucesso! Enviaremos uma proposta em até 24h.', 'success');
            this.closeSecureModal();
            form.reset();
            
        } catch (error) {
            console.error('Erro no envio:', error);
            this.showNotification('Erro ao solicitar cotação. Tente novamente.', 'error');
        } finally {
            this.isLoading = false;
            this.setFormLoading(form, false);
        }
    }

    /**
     * Simula envio de formulário
     */
    async simulateFormSubmission(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simula sucesso 90% das vezes
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Erro simulado do servidor'));
                }
            }, 2000);
        });
    }

    /**
     * Define estado de carregamento do formulário
     */
    setFormLoading(form, isLoading) {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            if (isLoading) {
                submitButton.disabled = true;
                submitButton.textContent = 'Enviando...';
                submitButton.classList.add('loading');
            } else {
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Mensagem';
                submitButton.classList.remove('loading');
            }
        }
    }

    /**
     * Configura modais
     */
    setupModals() {
        // Modal de cotação segura
        const modal = document.getElementById('secureModal');
        if (modal) {
            // Fecha modal ao clicar fora
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeSecureModal();
                }
            });

            // Fecha modal com ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    this.closeSecureModal();
                }
            });
        }
    }

    /**
     * Abre modal seguro
     */
    openSecureModal() {
        const modal = document.getElementById('secureModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Foca no primeiro campo
            const firstInput = modal.querySelector('input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    /**
     * Fecha modal seguro
     */
    closeSecureModal() {
        const modal = document.getElementById('secureModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Configura animações
     */
    setupAnimations() {
        // Animação de entrada para elementos
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observa elementos para animação
        document.querySelectorAll('.security-card, .service-card, .about-text, .contact-info').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Configura efeitos de scroll
     */
    setupScrollEffects() {
        let lastScrollTop = 0;
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scroll para baixo
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scroll para cima
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    /**
     * Configura menu responsivo
     */
    setupResponsiveMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Fecha menu ao clicar em link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }

    /**
     * Configura recursos de segurança
     */
    setupSecurityFeatures() {
        // Bloqueia clique direito em imagens
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
                this.showNotification('Proteção de imagem ativa', 'info');
            }
        });

        // Detecta tentativas de seleção de texto sensível
        document.addEventListener('selectstart', (e) => {
            if (e.target.classList.contains('sensitive')) {
                e.preventDefault();
                this.showNotification('Conteúdo protegido', 'info');
            }
        });

        // Monitora tentativas de print
        window.addEventListener('beforeprint', () => {
            this.logSecurityEvent('Print attempt detected');
        });
    }

    /**
     * Configura otimizações de performance
     */
    setupPerformanceOptimizations() {
        // Lazy loading para imagens
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Debounce para eventos de scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateActiveSection();
            }, 100);
        });
    }

    /**
     * Mostra notificação
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        // Cores por tipo
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Anima entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove após 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    /**
     * Registra evento de segurança
     */
    logSecurityEvent(event) {
        console.log('🛡️ CCS Security Event:', event);
        
        if (window.securityManager) {
            window.securityManager.logSuspiciousActivity(event);
        }
    }

    /**
     * Utilitário para scroll suave
     */
    smoothScrollTo(element, offset = 0) {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    /**
     * Utilitário para formatar moeda
     */
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }

    /**
     * Utilitário para formatar data
     */
    formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    }
}

// Funções globais para compatibilidade
function openSecureModal() {
    if (window.catecApp) {
        window.catecApp.openSecureModal();
    }
}

function closeSecureModal() {
    if (window.catecApp) {
        window.catecApp.closeSecureModal();
    }
}

function scrollToSection(sectionId) {
    if (window.catecApp) {
        window.catecApp.scrollToSection(sectionId);
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.catecApp = new CatecSegurosApp();
    
    // Adiciona classe para indicar que JavaScript está ativo
    document.body.classList.add('js-enabled');
    
    console.log('🚀 CatecSeguros App inicializada com sucesso!');
});

// Exporta para uso global
window.CatecSegurosApp = CatecSegurosApp;
