        // MBG Indonesia - Premium Modern JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 500);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Smooth scroll to target
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Location Map Interaction
    const mapPoints = document.querySelectorAll('.map-point');
    const locationCards = document.querySelectorAll('.location-card');
    
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const location = this.dataset.location;
            
            // Update active map point
            mapPoints.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding location card
            locationCards.forEach(card => {
                card.classList.remove('active');
                if (card.id === `${location}-card`) {
                    card.classList.add('active');
                    
                    // Scroll to card if on mobile
                    if (window.innerWidth < 768) {
                        card.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }
            });
        });
    });

    // Menu Tabs
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const day = this.dataset.day;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${day}-menu`) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Donation Form
    const donationForm = document.getElementById('donationForm');
    const amountOptions = document.querySelectorAll('.amount-option');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const customAmountInput = document.getElementById('customAmount');
    
    // Amount selection
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            amountOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            customAmountInput.value = '';
        });
    });
    
    // Custom amount input
    customAmountInput.addEventListener('input', function() {
        amountOptions.forEach(opt => opt.classList.remove('active'));
        
        // Format input with thousand separators
        let value = this.value.replace(/\D/g, '');
        if (value) {
            value = parseInt(value).toLocaleString('id-ID');
            this.value = value;
        }
    });
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form submission
    donationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = document.getElementById('donorName').value;
        const email = document.getElementById('donorEmail').value;
        const amount = getSelectedAmount();
        
        // Show success notification
        showNotification('success', `
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Terima kasih ${name}!</strong><br>
                Donasi sebesar <strong>${amount}</strong> telah berhasil direkam.<br>
                Konfirmasi akan dikirim ke email: ${email}
            </div>
        `);
        
        // Reset form
        this.reset();
        amountOptions[0].click();
        paymentMethods[0].click();
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        
        showNotification('success', `
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>Pesan terkirim!</strong><br>
                Terima kasih ${name}, pesan Anda telah berhasil dikirim.<br>
                Kami akan membalas ke email: ${email}
            </div>
        `);
        
        this.reset();
    });

    // Newsletter Form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            showNotification('success', `
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>Berhasil berlangganan!</strong><br>
                    Terima kasih telah berlangganan newsletter MBG.<br>
                    Update akan dikirim ke: ${email}
                </div>
            `);
            
            this.reset();
        });
    });

    // Impact Stats Counter
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.dataset.count);
                const duration = 2000;
                const steps = 60;
                const increment = target / steps;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    statNumber.textContent = Math.floor(current);
                }, duration / steps);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Notification System
    const notification = document.getElementById('notification');
    let notificationTimeout;
    
    function showNotification(type, content) {
        // Clear any existing timeout
        if (notificationTimeout) {
            clearTimeout(notificationTimeout);
        }
        
        // Update notification content and type
        notification.innerHTML = content;
        notification.className = `notification ${type}`;
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', hideNotification);
        notification.appendChild(closeBtn);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide after 5 seconds
        notificationTimeout = setTimeout(hideNotification, 5000);
    }
    
    function hideNotification() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.innerHTML = '';
        }, 300);
    }

    // Helper Functions
    function getSelectedAmount() {
        const activeAmount = document.querySelector('.amount-option.active');
        if (activeAmount) {
            return activeAmount.querySelector('.amount').textContent;
        } else if (customAmountInput.value) {
            return 'Rp ' + customAmountInput.value;
        }
        return 'Rp 0';
    }

    // Initialize animations
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.dataset.animation || 'animate__fadeInUp';
                
                element.style.animationDelay = element.dataset.delay || '0s';
                element.classList.add(animation);
                
                animationObserver.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => animationObserver.observe(element));

    // Parallax effect for hero shapes
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.1 * (index + 1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });

    // Add CSS for tooltips
    const tooltipStyle = document.createElement('style');
    tooltipStyle.textContent = `
        .tooltip {
            position: fixed;
            background: var(--dark);
            color: var(--white);
            padding: 0.5rem 1rem;
            border-radius: var(--radius);
            font-size: 0.875rem;
            font-weight: 500;
            z-index: 9999;
            pointer-events: none;
            white-space: nowrap;
            box-shadow: var(--shadow-lg);
        }
        
        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-top-color: var(--dark);
        }
    `;
    document.head.appendChild(tooltipStyle);

    // Initialize
    console.log('MBG Indonesia - Premium Modern Website Initialized');
});