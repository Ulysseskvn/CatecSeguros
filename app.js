/**
 * CatecSeguros - Main Application
 * Aplicação principal do site da seguradora
 */

class CatecSegurosApp {
    constructor() {
        this.currentSection = 'home';
        this.isLoading = false;
        this.formSubmissions = new Map();
        this.currentSlide = 0;
        this.totalSlides = 6; // Atualizado para 6 slides
        this.carouselInterval = null;
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
        this.setupCarousel();
    }

    /**
     * Configura navegação
     */
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.updateActiveNavLink(link);
            });
        });

        // Scroll spy
        window.addEventListener('scroll', () => {
            this.updateActiveSection(sections);
        });
    }

    /**
     * Configura formulários
     */
    setupForms() {
        const contactForm = document.getElementById('contactForm');
        const quoteForm = document.getElementById('quoteForm');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(contactForm);
            });
        }

        if (quoteForm) {
            quoteForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleQuoteForm(quoteForm);
            });
        }
    }

    /**
     * Configura modais
     */
    setupModals() {
        const modal = document.getElementById('secureModal');
        const closeBtn = document.querySelector('.close');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeSecureModal();
            });
        }

        // Fechar modal clicando fora
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeSecureModal();
                }
            });
        }
    }

    /**
     * Configura animações
     */
    setupAnimations() {
        // Animações de entrada
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

        // Observar elementos
        const elementsToAnimate = document.querySelectorAll('.security-card, .service-card, .stat, .gallery-item');
        elementsToAnimate.forEach(el => observer.observe(el));
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
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Fechar menu ao clicar em link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    /**
     * Configura recursos de segurança
     */
    setupSecurityFeatures() {
        // Detectar tentativas de dev tools
        let devtools = {open: false, orientation: null};
        const threshold = 160;

        setInterval(() => {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    devtools.open = true;
                    this.logSecurityEvent('DevTools opened');
                }
            } else {
                devtools.open = false;
            }
        }, 500);

        // Detectar clique direito
        document.addEventListener('contextmenu', (e) => {
            this.logSecurityEvent('Right click detected');
        });

        // Detectar seleção de texto
        document.addEventListener('selectstart', (e) => {
            this.logSecurityEvent('Text selection detected');
        });
    }

    /**
     * Configura otimizações de performance
     */
    setupPerformanceOptimizations() {
        // Lazy loading para imagens
        const images = document.querySelectorAll('img[data-src]');
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

        images.forEach(img => imageObserver.observe(img));

        // Preload de recursos críticos
        this.preloadCriticalResources();
    }

    /**
     * Configura carrossel
     */
    setupCarousel() {
        const indicators = document.querySelectorAll('.indicator');
        const slides = document.querySelectorAll('.carousel-slide');

        // Configurar indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Auto-play do carrossel
        this.startCarousel();

        // Pausar carrossel ao passar o mouse
        const carousel = document.querySelector('.hero-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => {
                this.stopCarousel();
            });

            carousel.addEventListener('mouseleave', () => {
                this.startCarousel();
            });
        }
    }

    /**
     * Inicia o carrossel automático
     */
    startCarousel() {
        this.stopCarousel(); // Limpar intervalo anterior
        this.carouselInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Trocar slide a cada 5 segundos
    }

    /**
     * Para o carrossel automático
     */
    stopCarousel() {
        if (this.carouselInterval) {
            clearInterval(this.carouselInterval);
            this.carouselInterval = null;
        }
    }

    /**
     * Vai para o próximo slide
     */
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }

    /**
     * Vai para o slide anterior
     */
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }

    /**
     * Vai para um slide específico
     */
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateCarousel();
    }

    /**
     * Atualiza o carrossel
     */
    updateCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.indicator');

        // Atualizar slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index === (this.currentSlide - 1 + this.totalSlides) % this.totalSlides) {
                slide.classList.add('prev');
            }
        });

        // Atualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    /**
     * Precarrega recursos críticos
     */
    preloadCriticalResources() {
        const criticalResources = [
            'styles.css',
            'security.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }

    /**
     * Scroll suave para seção
     */
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const topPosition = section.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: topPosition,
                behavior: 'smooth'
            });
        }
    }

    /**
     * Atualiza link ativo da navegação
     */
    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    /**
     * Atualiza seção ativa baseada no scroll
     */
    updateActiveSection(sections) {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.currentSection = sectionId;
                this.updateActiveNavLink(document.querySelector(`[href="#${sectionId}"]`));
            }
        });
    }

    /**
     * Processa formulário de contato
     */
    handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validação básica
        if (!this.validateForm(data)) {
            this.showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Simular envio
        this.showLoading(true);
        
        setTimeout(() => {
            this.showLoading(false);
            this.showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
            this.logSecurityEvent('Contact form submitted');
        }, 2000);
    }

    /**
     * Processa formulário de cotação
     */
    handleQuoteForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validação básica
        if (!this.validateForm(data)) {
            this.showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        // Simular envio
        this.showLoading(true);
        
        setTimeout(() => {
            this.showLoading(false);
            this.showMessage('Cotação solicitada com sucesso! Enviaremos sua proposta em até 24 horas.', 'success');
            form.reset();
            this.closeSecureModal();
            this.logSecurityEvent('Quote form submitted');
        }, 2000);
    }

    /**
     * Valida formulário
     */
    validateForm(data) {
        const requiredFields = ['name', 'email'];
        
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                return false;
            }
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return false;
        }

        return true;
    }

    /**
     * Mostra mensagem de feedback
     */
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        messageDiv.style.display = 'block';

        const form = document.querySelector('.contact-form') || document.querySelector('#quoteForm');
        if (form) {
            form.insertBefore(messageDiv, form.firstChild);
            
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }

    /**
     * Mostra/esconde loading
     */
    showLoading(show) {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            if (show) {
                form.classList.add('loading');
            } else {
                form.classList.remove('loading');
            }
        });
    }

    /**
     * Abre modal seguro
     */
    openSecureModal() {
        const modal = document.getElementById('secureModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.logSecurityEvent('Secure modal opened');
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
            this.logSecurityEvent('Secure modal closed');
        }
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
     * Inicializa overlay de segurança
     */
    initSecurityOverlay() {
        const overlay = document.getElementById('security-overlay');
        if (overlay) {
            // Simular verificação de segurança
            setTimeout(() => {
                overlay.classList.add('hidden');
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 500);
            }, 2000);
        }
    }

    /**
     * Configura indicadores de segurança
     */
    setupSecurityIndicators() {
        const indicator = document.createElement('div');
        indicator.className = 'security-indicator';
        indicator.innerHTML = '🛡️ Conexão Segura';
        document.body.appendChild(indicator);

        // Atualizar status da conexão
        this.updateSecurityStatus();
    }

    /**
     * Atualiza status de segurança
     */
    updateSecurityStatus() {
        const isSecure = location.protocol === 'https:';
        const indicator = document.querySelector('.security-indicator');
        
        if (indicator) {
            if (isSecure) {
                indicator.innerHTML = '🛡️ Conexão Segura';
                indicator.style.background = 'linear-gradient(135deg, #2d7a7a 0%, #1a365d 100%)';
            } else {
                indicator.innerHTML = '⚠️ Conexão Não Segura';
                indicator.style.background = 'linear-gradient(135deg, #e53e3e 0%, #fc8181 100%)';
            }
        }
    }

    /**
     * Configura analytics
     */
    setupAnalytics() {
        // Eventos de clique em botões
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.trackEvent('button_click', {
                    button_text: button.textContent.trim(),
                    button_location: button.closest('section')?.id || 'unknown'
                });
            });
        });

        // Eventos de scroll
        let scrollEvents = 0;
        window.addEventListener('scroll', () => {
            scrollEvents++;
            if (scrollEvents % 10 === 0) {
                this.trackEvent('scroll', {
                    scroll_position: window.scrollY,
                    scroll_percentage: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
                });
            }
        });
    }

    /**
     * Rastreia eventos
     */
    trackEvent(eventName, eventData) {
        console.log('📊 Event tracked:', eventName, eventData);
        
        // Aqui você pode integrar com Google Analytics ou outras ferramentas
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, eventData);
        }
    }

    /**
     * Configura notificações push
     */
    setupPushNotifications() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('🔔 Push notifications enabled');
                }
            });
        }
    }

    /**
     * Configura cache offline
     */
    setupOfflineCache() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('📱 Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        }
    }

    /**
     * Configura modo escuro
     */
    setupDarkMode() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌙';
        darkModeToggle.title = 'Alternar modo escuro';
        
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
            localStorage.setItem('darkMode', isDark);
        });

        // Restaurar preferência
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '☀️';
        }

        document.body.appendChild(darkModeToggle);
    }

    /**
     * Configura acessibilidade
     */
    setupAccessibility() {
        // Navegação por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Alto contraste
        const highContrastToggle = document.createElement('button');
        highContrastToggle.className = 'high-contrast-toggle';
        highContrastToggle.innerHTML = '🔍';
        highContrastToggle.title = 'Alto contraste';
        
        highContrastToggle.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            const isHighContrast = document.body.classList.contains('high-contrast');
            localStorage.setItem('highContrast', isHighContrast);
        });

        // Restaurar preferência
        const savedHighContrast = localStorage.getItem('highContrast');
        if (savedHighContrast === 'true') {
            document.body.classList.add('high-contrast');
        }

        document.body.appendChild(highContrastToggle);
    }

    /**
     * Configura internacionalização
     */
    setupInternationalization() {
        const languageSelector = document.createElement('select');
        languageSelector.className = 'language-selector';
        
        const languages = [
            { code: 'pt-BR', name: 'Português' },
            { code: 'en-US', name: 'English' },
            { code: 'es-ES', name: 'Español' }
        ];

        languages.forEach(lang => {
            const option = document.createElement('option');
            option.value = lang.code;
            option.textContent = lang.name;
            languageSelector.appendChild(option);
        });

        languageSelector.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            localStorage.setItem('preferredLanguage', selectedLang);
            this.loadLanguage(selectedLang);
        });

        // Restaurar preferência
        const savedLanguage = localStorage.getItem('preferredLanguage') || 'pt-BR';
        languageSelector.value = savedLanguage;
        this.loadLanguage(savedLanguage);

        document.body.appendChild(languageSelector);
    }

    /**
     * Carrega idioma
     */
    loadLanguage(langCode) {
        // Aqui você implementaria a lógica de carregamento de idiomas
        console.log('🌍 Language loaded:', langCode);
    }

    /**
     * Configura PWA
     */
    setupPWA() {
        // Manifest
        const manifest = {
            name: 'CatecSeguros',
            short_name: 'CatecSeguros',
            description: 'Seguradora de Confiança',
            start_url: '/',
            display: 'standalone',
            background_color: '#1a365d',
            theme_color: '#2d7a7a',
            icons: [
                {
                    src: 'icon-192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'icon-512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ]
        };

        const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
        const manifestURL = URL.createObjectURL(manifestBlob);
        
        const manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        manifestLink.href = manifestURL;
        document.head.appendChild(manifestLink);
    }

    /**
     * Configura testes automatizados
     */
    setupAutomatedTests() {
        // Testes básicos de funcionalidade
        this.runBasicTests();
    }

    /**
     * Executa testes básicos
     */
    runBasicTests() {
        const tests = [
            () => document.querySelector('.nav-logo') !== null,
            () => document.querySelector('#contactForm') !== null,
            () => document.querySelector('#secureModal') !== null,
            () => document.querySelectorAll('.security-card').length >= 6,
            () => document.querySelectorAll('.service-card').length >= 3,
            () => document.querySelectorAll('.carousel-slide').length >= 6, // Atualizado para 6 slides
            () => document.querySelectorAll('.gallery-item').length >= 6 // Novo teste para galeria
        ];

        const results = tests.map(test => test());
        const passedTests = results.filter(result => result).length;
        
        console.log(`🧪 Tests: ${passedTests}/${tests.length} passed`);
        
        if (passedTests === tests.length) {
            console.log('✅ All tests passed!');
        } else {
            console.log('❌ Some tests failed');
        }
    }

    /**
     * Configura monitoramento de performance
     */
    setupPerformanceMonitoring() {
        // Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.log('📊 Performance metric:', entry.name, entry.value);
                });
            });

            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }

        // Tempo de carregamento
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
        });
    }

    /**
     * Configura backup automático
     */
    setupAutoBackup() {
        // Backup de dados do formulário
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, textarea, select');
            
            inputs.forEach(input => {
                input.addEventListener('input', () => {
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData);
                    localStorage.setItem(`form_backup_${form.id}`, JSON.stringify(data));
                });
            });

            // Restaurar dados salvos
            const savedData = localStorage.getItem(`form_backup_${form.id}`);
            if (savedData) {
                try {
                    const data = JSON.parse(savedData);
                    Object.keys(data).forEach(key => {
                        const input = form.querySelector(`[name="${key}"]`);
                        if (input && data[key]) {
                            input.value = data[key];
                        }
                    });
                } catch (e) {
                    console.log('❌ Error restoring form data:', e);
                }
            }
        });
    }
}

// Funções globais
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

function changeSlide(direction) {
    if (window.catecApp) {
        if (direction === 1) {
            window.catecApp.nextSlide();
        } else {
            window.catecApp.prevSlide();
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    window.catecApp = new CatecSegurosApp();
    window.catecApp.initSecurityOverlay();
    window.catecApp.setupSecurityIndicators();
    window.catecApp.setupAnalytics();
    window.catecApp.setupPushNotifications();
    window.catecApp.setupOfflineCache();
    window.catecApp.setupDarkMode();
    window.catecApp.setupAccessibility();
    window.catecApp.setupInternationalization();
    window.catecApp.setupPWA();
    window.catecApp.setupAutomatedTests();
    window.catecApp.setupPerformanceMonitoring();
    window.catecApp.setupAutoBackup();
    
    console.log('🚀 CatecSeguros App initialized successfully!');
});

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('📱 SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('❌ SW registration failed: ', registrationError);
            });
    });
}