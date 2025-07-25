document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica do Menu Hambúrguer (Mobile)
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = mainNav.querySelectorAll('a');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpened = document.body.classList.toggle('nav-open');
            menuToggle.setAttribute('aria-expanded', isOpened);
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('nav-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Fechar menu com a tecla 'Escape'
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && document.body.classList.contains('nav-open')) {
                document.body.classList.remove('nav-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 2. Header Sticky com transição
    const header = document.getElementById('main-header');
    if(header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // 3. Animação de Revelar ao Rolar com Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));
    
    // 4. Slider de Serviços (Swiper.js) com navegação
    const servicesSwiper = new Swiper('.services-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 20,
        grabCursor: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            600: { slidesPerView: 2.2, spaceBetween: 20, },
            768: { slidesPerView: 2.5, spaceBetween: 30, },
            1024: { slidesPerView: 4, spaceBetween: 30, },
        },
    });

    // 5. Slider de Comparação "Antes e Depois"
    const comparisonSlider = document.querySelector('.comparison-slider');
    if (comparisonSlider) {
        const handle = comparisonSlider.querySelector('.comparison-handle');
        const afterImage = comparisonSlider.querySelector('.comparison-image.after');
        let isDragging = false;
        const startDrag = () => isDragging = true;
        const stopDrag = () => isDragging = false;
        handle.addEventListener('mousedown', startDrag);
        handle.addEventListener('touchstart', startDrag, { passive: true });
        window.addEventListener('mouseup', stopDrag);
        window.addEventListener('touchend', stopDrag);
        
        const moveHandler = (e) => {
            if (!isDragging) return;
            const pageX = e.pageX || e.touches[0].pageX;
            let rect = comparisonSlider.getBoundingClientRect();
            let x = Math.max(0, Math.min(pageX - rect.left, rect.width));
            let widthPercent = (x / rect.width) * 100;
            requestAnimationFrame(() => {
                handle.style.left = `${widthPercent}%`;
                afterImage.style.width = `${widthPercent}%`;
            });
        };
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('touchmove', moveHandler, { passive: true });
    }
    
    // 6. Slider de Depoimentos (Swiper.js)
    const testimonialsSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true, },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            768: { slidesPerView: 2, },
            1024: { slidesPerView: 3, },
        },
    });

    // 7. Efeito Parallax na imagem da seção "Sobre"
    const parallaxImage = document.querySelector('.about-image');
    if(parallaxImage) {
        window.addEventListener('scroll', () => {
            let offset = window.pageYOffset;
            let elementTop = parallaxImage.getBoundingClientRect().top + window.scrollY;
            let speed = -0.3; 
            if(offset > elementTop - window.innerHeight && offset < elementTop + parallaxImage.offsetHeight){
               let parallaxValue = (offset - elementTop) * speed;
               parallaxImage.style.backgroundPositionY = `calc(50% + ${parallaxValue}px)`;
            }
        });
    }

    // 8. Correção de Flip Card para Mobile
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            // Apenas para telas touch. Evita que o clique interfira no hover do desktop
            if (window.matchMedia("(pointer: coarse)").matches) {
                // Remove a classe de outros cards se houver algum aberto
                teamCards.forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('is-flipped')) {
                        otherCard.classList.remove('is-flipped');
                    }
                });
                card.classList.toggle('is-flipped');
            }
        });
    });

});