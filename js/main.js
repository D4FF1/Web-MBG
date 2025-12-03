// MBG Indonesia - Enhanced JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
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
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
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

    // Location Map Interaction - IMPROVED
    const mapPoints = document.querySelectorAll('.map-point');
    const locationCards = document.querySelectorAll('.location-card');
    const locationSearch = document.getElementById('locationSearch');
    const provinceFilter = document.getElementById('provinceFilter');
    const statusFilter = document.getElementById('statusFilter');
    const searchButton = document.querySelector('.search-box .btn-primary');
    
    // Initialize tooltips
    mapPoints.forEach(point => {
        const tooltipText = point.dataset.tooltip;
        if (tooltipText) {
            point.addEventListener('mouseenter', function(e) {
                showTooltip(this, tooltipText);
            });
            
            point.addEventListener('mouseleave', function() {
                hideTooltip();
            });
        }
    });
    
    function showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.getElementById('tooltip-container').appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
        
        setTimeout(() => tooltip.classList.add('show'), 10);
        
        element.tooltip = tooltip;
    }
    
    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
    
    // Map point interaction
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const location = this.dataset.location;
            
            // Update active map point
            mapPoints.forEach(p => {
                p.classList.remove('active');
                p.querySelector('.point-pulse').style.animation = 'none';
                void p.querySelector('.point-pulse').offsetWidth;
                p.querySelector('.point-pulse').style.animation = null;
            });
            this.classList.add('active');
            
            // Show corresponding location card
            locationCards.forEach(card => {
                card.classList.remove('active');
                if (card.id === `${location}-card`) {
                    card.classList.add('active');
                    
                    // Scroll to card if on mobile
                    if (window.innerWidth < 768) {
                        setTimeout(() => {
                            card.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }, 300);
                    }
                }
            });
        });
    });

    // Location search functionality - IMPROVED
    function initLocationSearch() {
        if (locationSearch) {
            locationSearch.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                filterLocationCards(searchTerm);
            });
        }
        
        if (searchButton) {
            searchButton.addEventListener('click', function() {
                const searchTerm = locationSearch ? locationSearch.value.toLowerCase() : '';
                filterLocationCards(searchTerm);
            });
        }
        
        if (provinceFilter) {
            provinceFilter.addEventListener('change', function() {
                filterLocationCards();
            });
        }
        
        if (statusFilter) {
            statusFilter.addEventListener('change', function() {
                filterLocationCards();
            });
        }
    }
    
    function filterLocationCards(searchTerm = '') {
        locationCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const address = card.querySelector('.info-item p').textContent.toLowerCase();
            const province = provinceFilter ? provinceFilter.value : '';
            const status = statusFilter ? statusFilter.value : '';
            
            const matchesSearch = !searchTerm || 
                title.includes(searchTerm) || 
                address.includes(searchTerm);
            
            const matchesProvince = !province || 
                (province === 'jakarta' && card.id.includes('jakarta')) ||
                (province === 'jabar' && card.id.includes('bandung')) ||
                (province === 'jatim' && card.id.includes('surabaya')) ||
                (province === 'yogyakarta' && card.id.includes('yogyakarta')) ||
                (province === 'sumut' && card.id.includes('medan')) ||
                (province === 'sulsel' && card.id.includes('makassar'));
            
            const matchesStatus = !status || 
                (status === 'active' && card.querySelector('.location-status.active')) ||
                (status === 'coming' && !card.querySelector('.location-status.active'));
            
            if (matchesSearch && matchesProvince && matchesStatus) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Show message if no cards found
        const visibleCards = Array.from(locationCards).filter(card => 
            card.style.display !== 'none' && card.style.opacity !== '0'
        );
        
        if (visibleCards.length === 0) {
            showNoResultsMessage();
        } else {
            removeNoResultsMessage();
        }
    }
    
    function showNoResultsMessage() {
        removeNoResultsMessage();
        
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.innerHTML = `
            <i class="fas fa-search"></i>
            <h4>Tidak ada lokasi yang ditemukan</h4>
            <p>Coba gunakan kata kunci lain atau filter yang berbeda</p>
        `;
        
        const container = document.querySelector('.location-cards-container');
        if (container) {
            container.appendChild(message);
        }
    }
    
    function removeNoResultsMessage() {
        const message = document.querySelector('.no-results-message');
        if (message) {
            message.remove();
        }
    }

    // Menu Tabs - COMPLETELY FIXED
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
                    
                    // Add animation effect
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                    }, 50);
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
            this.value = `Rp ${value}`;
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
        const name = document.getElementById('donorName').value;
        const email = document.getElementById('donorEmail').value;
        const phone = document.getElementById('donorPhone').value;
        const amount = getSelectedAmount();
        const method = document.querySelector('.payment-method.active').dataset.method;
        const message = document.getElementById('donorMessage').value;
        
        // Validate form
        if (!name || !email || !phone) {
            showNotification('error', `
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <strong>Form tidak lengkap!</strong><br>
                    Harap lengkapi semua field yang wajib diisi.
                </div>
            `);
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('error', `
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <strong>Email tidak valid!</strong><br>
                    Harap masukkan alamat email yang valid.
                </div>
            `);
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success notification
            showNotification('success', `
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>Terima kasih ${name}!</strong><br>
                    Donasi sebesar <strong>${amount}</strong> via ${getMethodName(method)} telah berhasil direkam.<br>
                    Invoice telah dikirim ke email: ${email}
                </div>
            `);
            
            // Reset form
            this.reset();
            amountOptions[0].classList.add('active');
            paymentMethods[0].classList.add('active');
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Send to analytics (simulated)
            console.log('Donation recorded:', { name, email, phone, amount, method });
            
        }, 1500);
    });

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        const subscribe = document.getElementById('subscribeNewsletter').checked;
        
        // Validate form
        if (!name || !email || !phone || !subject || !message) {
            showNotification('error', `
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <strong>Form tidak lengkap!</strong><br>
                    Harap lengkapi semua field yang wajib diisi.
                </div>
            `);
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('error', `
                <i class="fas fa-exclamation-circle"></i>
                <div>
                    <strong>Email tidak valid!</strong><br>
                    Harap masukkan alamat email yang valid.
                </div>
            `);
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('success', `
                <i class="fas fa-check-circle"></i>
                <div>
                    <strong>Pesan terkirim!</strong><br>
                    Terima kasih ${name}, pesan Anda telah berhasil dikirim.<br>
                    Kami akan membalas ke email: ${email}
                    ${subscribe ? '<br><small>Anda telah berlangganan newsletter MBG</small>' : ''}
                </div>
            `);
            
            this.reset();
            
            // Reset button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Send to analytics (simulated)
            console.log('Contact form submitted:', { name, email, phone, subject, subscribe });
            
        }, 1500);
    });

    // Newsletter Form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('error', `
                    <i class="fas fa-exclamation-circle"></i>
                    <div>
                        <strong>Email tidak valid!</strong><br>
                        Harap masukkan alamat email yang valid.
                    </div>
                `);
                return;
            }
            
            // Show loading
            const button = this.querySelector('button');
            const originalHtml = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;
            
            setTimeout(() => {
                showNotification('success', `
                    <i class="fas fa-check-circle"></i>
                    <div>
                        <strong>Berhasil berlangganan!</strong><br>
                        Terima kasih telah berlangganan newsletter MBG.<br>
                        Update akan dikirim ke: ${email}
                    </div>
                `);
                
                this.reset();
                button.innerHTML = originalHtml;
                button.disabled = false;
                
                console.log('Newsletter subscription:', { email });
                
            }, 1000);
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

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        let scrollPosition = window.scrollY + 200; // Offset for better accuracy
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${currentSection}` || 
                (currentSection === '' && href === '#home')) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial update
    updateActiveNavLink();
    
    // Update on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveNavLink();
        });
    });

    // Helper Functions
    function getSelectedAmount() {
        const activeAmount = document.querySelector('.amount-option.active');
        if (activeAmount) {
            return activeAmount.querySelector('.amount').textContent;
        } else if (customAmountInput && customAmountInput.value) {
            return customAmountInput.value;
        }
        return 'Rp 0';
    }
    
    function getMethodName(method) {
        switch(method) {
            case 'bank': return 'Transfer Bank';
            case 'ewallet': return 'E-Wallet';
            case 'qris': return 'QRIS';
            default: return 'Transfer';
        }
    }

    // Initialize animations on scroll
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Remove existing animation classes
                element.classList.remove('animate__fadeIn', 'animate__fadeInUp', 'animate__fadeInDown', 'animate__fadeInLeft', 'animate__fadeInRight');
                
                // Add new animation based on data attribute or default
                const animation = element.dataset.animation || 'animate__fadeInUp';
                element.classList.add(animation);
                
                // Add delay if specified
                if (element.dataset.delay) {
                    element.style.animationDelay = element.dataset.delay;
                }
                
                animationObserver.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => animationObserver.observe(element));

    // Parallax effect for hero shapes
    let parallaxTimeout;
    window.addEventListener('scroll', () => {
        if (parallaxTimeout) {
            window.cancelAnimationFrame(parallaxTimeout);
        }
        
        parallaxTimeout = window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.05 * (index + 1);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });
    });

    // Video modal functionality
    const videoButtons = document.querySelectorAll('[href*="youtu.be"], [href*="youtube.com"]');
    
    videoButtons.forEach(button => {
        if (button.getAttribute('target') !== '_blank') {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const videoUrl = this.href;
                
                // Create modal
                const modal = document.createElement('div');
                modal.className = 'video-modal';
                modal.innerHTML = `
                    <div class="modal-content">
                        <button class="modal-close"><i class="fas fa-times"></i></button>
                        <div class="video-container">
                            <iframe src="${videoUrl.replace('watch?v=', 'embed/')}" 
                                    frameborder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen></iframe>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(modal);
                document.body.style.overflow = 'hidden';
                
                // Close modal
                const closeModal = () => {
                    modal.remove();
                    document.body.style.overflow = '';
                };
                
                modal.querySelector('.modal-close').addEventListener('click', closeModal);
                
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        closeModal();
                    }
                });
                
                // Close on Escape key
                document.addEventListener('keydown', function closeOnEscape(e) {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', closeOnEscape);
                    }
                });
            });
        }
    });

    // Add CSS for video modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            position: relative;
            width: 90%;
            max-width: 800px;
            animation: scaleIn 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            transition: transform 0.3s ease;
        }
        
        .modal-close:hover {
            transform: scale(1.1);
        }
        
        .video-container {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        .no-results-message {
            text-align: center;
            padding: 3rem;
            grid-column: 1 / -1;
            background: var(--white);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow);
            margin-top: 2rem;
        }
        
        .no-results-message i {
            font-size: 3rem;
            color: var(--gray-light);
            margin-bottom: 1rem;
        }
        
        .no-results-message h4 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--dark);
        }
        
        .no-results-message p {
            color: var(--gray);
            margin: 0;
        }
    `;
    document.head.appendChild(modalStyle);

    // Location card click handler
    locationCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Only trigger if not clicking on buttons or links
            if (!e.target.closest('a') && !e.target.closest('button')) {
                locationCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // Update corresponding map point
                const locationId = this.id.replace('-card', '');
                mapPoints.forEach(p => {
                    p.classList.remove('active');
                    if (p.dataset.location === locationId) {
                        p.classList.add('active');
                        
                        // Add pulse animation
                        const pulse = p.querySelector('.point-pulse');
                        pulse.style.animation = 'none';
                        void pulse.offsetWidth;
                        pulse.style.animation = 'pointPulse 2s infinite';
                    }
                });
                
                // Scroll to card with offset for header
                setTimeout(() => {
                    const headerHeight = header.offsetHeight;
                    const cardTop = this.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: cardTop,
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    });

    // Initialize location search
    initLocationSearch();
    
    // Add animation for map points
    const addMapAnimations = () => {
        mapPoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.opacity = '0';
                point.style.transform = 'scale(0)';
                
                setTimeout(() => {
                    point.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    point.style.opacity = '1';
                    point.style.transform = 'scale(1)';
                }, index * 200);
            }, 500);
        });
    };
    
    // Trigger map animations when section is in view
    const locationsSection = document.getElementById('locations-menu');
    if (locationsSection) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    addMapAnimations();
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        sectionObserver.observe(locationsSection);
    }

    // Form input animations
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add CSS for form animations
    const formStyle = document.createElement('style');
    formStyle.textContent = `
        .form-group {
            position: relative;
        }
        
        .form-group.focused label {
            color: var(--primary);
            transform: translateY(-5px);
        }
        
        input:focus, select:focus, textarea:focus {
            border-color: var(--primary) !important;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
        }
        
        @keyframes pointPulse {
            0% {
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
            }
        }
        
        .search-box {
            display: flex;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .search-box i {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--gray);
        }
        
        .search-box input {
            flex: 1;
            padding: 0.75rem 1rem 0.75rem 3rem;
            border: 2px solid var(--light);
            border-radius: var(--radius);
            font-family: var(--font-primary);
            font-size: 1rem;
        }
        
        .search-filters {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .search-filters select {
            flex: 1;
            padding: 0.75rem;
            border: 2px solid var(--light);
            border-radius: var(--radius);
            background: var(--white);
            font-family: var(--font-primary);
        }
        
        @media (max-width: 768px) {
            .search-box {
                flex-direction: column;
            }
            
            .search-filters {
                flex-direction: column;
            }
        }
    `;
    document.head.appendChild(formStyle);

    // Initialize with animation
    setTimeout(() => {
        // Add initial animation to hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 300);
        }
    }, 100);

    console.log('🎯 MBG Indonesia - Enhanced Website Initialized');
    console.log('✅ Features loaded:');
    console.log('   - Smooth Navigation');
    console.log('   - Location Map Interaction');
    console.log('   - Menu System');
    console.log('   - Donation Form');
    console.log('   - Contact System');
    console.log('   - Impact Stats Counter');
    console.log('   - Notification System');
    console.log('   - Responsive Design');
});