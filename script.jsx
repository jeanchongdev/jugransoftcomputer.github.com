 // Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(function() {
        preloader.style.display = 'none';
    }, 500);
    
    // Inicializar partículas
    initParticles();
});




    
    // Navegación activa según sección
    const sections = document.querySelectorAll('section');
    
    function activeNavLink() {
        let position = window.scrollY + 200;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href*=${id}]`);
            
            if (position >= top && position < top + height && navLink) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', activeNavLink);
    
    // Animación de contadores mejorada
    const counters = document.querySelectorAll('.counter');
    let counted = false;
    
    function startCounting() {
        const counterSection = document.querySelector('.counter-section');
        if (!counterSection) return;
        
        const sectionTop = counterSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75 && !counted) {
            counted = true;
            
            counters.forEach(counter => {
                const target = +counter.dataset.target;
                let count = 0;
                const duration = 2000; // 2 segundos
                const increment = target / (duration / 16); // 60fps
                
                function updateCount() {
                    if (count < target) {
                        count += increment;
                        counter.textContent = Math.min(Math.ceil(count), target);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target;
                    }
                }
                
                updateCount();
            });
        }
    }
    
    window.addEventListener('scroll', startCounting);
    window.addEventListener('load', startCounting);
    
    // Filtro de productos
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Slider de testimonios
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex === 0) ? testimonialCards.length - 1 : currentIndex - 1;
            showTestimonial(currentIndex);
        });
        
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
            showTestimonial(currentIndex);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto cambio de testimonios
    setInterval(function() {
        if (testimonialCards.length > 0) {
            currentIndex = (currentIndex === testimonialCards.length - 1) ? 0 : currentIndex + 1;
            showTestimonial(currentIndex);
        }
    }, 5000);
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
    
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    if (successModal) {
                        successModal.classList.add('active');
                    }
                    contactForm.reset();
                } else {
                    alert("Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.");
                }
            })
            .catch(error => {
                alert("Error: " + error.message);
            });
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }
    
    if (modalBtn) {
        modalBtn.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }
    
    // Animaciones al hacer scroll
    const revealLeft = document.querySelectorAll('.reveal-left');
    const revealRight = document.querySelectorAll('.reveal-right');
    const revealItems = document.querySelectorAll('.reveal-item');
    
    function reveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealLeft.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
                element.style.transform = 'translateX(0)';
            } else {
                element.classList.remove('active');
                element.style.transform = 'translateX(-100px)';
            }
        });
        
        revealRight.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
                element.style.transform = 'translateX(0)';
            } else {
                element.classList.remove('active');
                element.style.transform = 'translateX(100px)';
            }
        });
        
        revealItems.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const delay = element.getAttribute('data-delay') || 0;
            
            if (elementTop < windowHeight - revealPoint) {
                setTimeout(() => {
                    element.classList.add('active');
                    element.style.transform = 'translateY(0)';
                }, delay);
            } else {
                element.classList.remove('active');
                element.style.transform = 'translateY(50px)';
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    window.addEventListener('load', reveal);
    
    // Año actual en el footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
