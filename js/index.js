/* ============================
        NAVBAR SCROLL EFFECT
        ============================ */
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        /* ============================
        MOBILE MENU TOGGLE
        ============================ */
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (hamburger) {
            hamburger.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                hamburger.innerHTML = navLinks.classList.contains('active') ?
                    '<i class="fas fa-times"></i>' :
                    '<i class="fas fa-bars"></i>';
            });
        }

        /* ============================
        SMOOTH SCROLLING
        ============================ */
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#' || targetId === '') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {

                    // Tutup menu mobile
                    navLinks.classList.remove('active');
                    if (hamburger) hamburger.innerHTML = '<i class="fas fa-bars"></i>';

                    const headerOffset = document.getElementById('header').offsetHeight;
                    const elementPosition = targetElement.offsetTop;
                    const offsetPosition = elementPosition - headerOffset + 10;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        /* ============================
        DONATION AMOUNT SELECTION
        ============================ */
        const donationOptions = document.querySelectorAll('.donation-option');
        donationOptions.forEach(option => {
            option.addEventListener('click', function() {
                donationOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                document.getElementById('custom-amount').value = '';
            });
        });

        // Custom amount
        document.getElementById('custom-amount').addEventListener('input', function() {
            donationOptions.forEach(opt => opt.classList.remove('active'));
        });

        /* ============================
        PAYMENT METHOD
        ============================ */
        const paymentMethods = document.querySelectorAll('.payment-method');

        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                paymentMethods.forEach(m => m.classList.remove('active'));
                this.classList.add('active');
            });
        });

        /* ============================
        TESTIMONIAL SLIDER
        ============================ */
        const testimonialTrack = document.querySelector('.testimonial-track');
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;

        function showSlide(index) {
            testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
            currentSlide = index;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });

        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }, 5000);

        /* ============================
        DONATION FORM → REDIRECT CHECKOUT
        ============================ */
        document.getElementById('donationForm').addEventListener('submit', function(e) {
            e.preventDefault();

            const selectedOption = document.querySelector('.donation-option.active');
            let amount = selectedOption ? selectedOption.dataset.amount : '';

            const customAmount = document.getElementById('custom-amount').value;
            if (customAmount.trim() !== '') amount = customAmount;

            const paymentMethod = document.querySelector('.payment-method.active').dataset.method;

            // Data object
            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                amount: amount,
                method: paymentMethod,
                message: document.getElementById('message').value
            };

            // Simpan ke sessionStorage
            sessionStorage.setItem('donationData', JSON.stringify(data));

            // Pindah Halaman
            window.location.href = "checkout.html";
        });

        /* ============================
        CONTACT FORM SIMULATION
        ============================ */
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Pesan Anda telah terkirim! Kami akan membalas dalam 1x24 jam.');
                this.reset();
            });
        }

        /* ============================
        FADE-IN SCROLL ANIMATION
        ============================ */
        const fadeElements = document.querySelectorAll('.fade-in');

        function checkScroll() {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', checkScroll);
        window.addEventListener('load', checkScroll);

        /* ============================
        QR AUTO-GENERATE (GoPay / OVO / BANK)
        ============================ */
        function loadQR() {
            const qrContainer = document.getElementById('qrContainer');
            const qrImage = document.getElementById('qrImage');
            const qrNote  = document.getElementById('qrNote');

            const data = JSON.parse(sessionStorage.getItem('donationData'));
            if (!data) return;

            let qrSrc = "";
            let note  = "";

            switch (data.method) {
                case "gopay":
                    qrSrc = `https://chart.googleapis.com/chart?cht=qr&chs=220x220&chl=${encodeURIComponent('081234567890')}`;
                    note  = "Scan menggunakan aplikasi GoPay.";
                    break;
                case "ovo":
                    qrSrc = `https://chart.googleapis.com/chart?cht=qr&chs=220x220&chl=${encodeURIComponent('08122223333')}`;
                    note  = "Scan menggunakan aplikasi OVO.";
                    break;
                case "bank":
                    qrSrc = `https://chart.googleapis.com/chart?cht=qr&chs=220x220&chl=${encodeURIComponent('123456789012')}`;
                    note  = "QRIS untuk transfer semua bank.";
                    break;
            }


            qrImage.src = qrSrc;
            qrNote.innerText = note;

            // Animasi slide-up muncul otomatis
            setTimeout(() => {
                qrContainer.classList.add("visible");
            }, 300);
        }

        // Jalankan otomatis di checkout.html
        window.addEventListener("load", loadQR);