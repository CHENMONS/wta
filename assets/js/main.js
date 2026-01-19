// ===================================
// PT WIDYA TECHNO ABADI
// Main JavaScript File
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== MOBILE MENU TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Change icon
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default if it's not just "#"
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // ===== ANIMATED COUNTER FOR STATS =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    function animateCounter(element) {
        const target = element.textContent;
        const isNumber = /^\d+$/.test(target);
        
        if (!isNumber) return;
        
        const targetNumber = parseInt(target);
        const duration = 2000; // 2 seconds
        const increment = targetNumber / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNumber) {
                element.textContent = targetNumber + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }
    
    function checkStatsInView() {
        if (hasAnimated) return;
        
        const statsSection = document.querySelector('.stats-section');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        const isInView = (rect.top >= 0 && rect.bottom <= window.innerHeight) ||
                        (rect.top < window.innerHeight && rect.bottom >= 0);
        
        if (isInView) {
            hasAnimated = true;
            statNumbers.forEach(stat => {
                // Remove '+' for animation
                const text = stat.textContent.replace('+', '');
                stat.textContent = text;
                animateCounter(stat);
            });
        }
    }
    
    window.addEventListener('scroll', checkStatsInView);
    checkStatsInView(); // Check on load
    
    // ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.card, .service-card, .section-header');
    animatedElements.forEach(el => observer.observe(el));
    
    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ff6b35';
                    
                    // Remove error style after 3 seconds
                    setTimeout(() => {
                        field.style.borderColor = '';
                    }, 3000);
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Thank you for your message! We will contact you soon.');
                contactForm.reset();
                
                // In production, you would send the data to a server here
                // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) })
            } else {
                alert('Please fill in all required fields.');
            }
        });
        
        // Remove error styling on input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    // ===== LOADING ANIMATION =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== LAZY LOADING IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===== PREVENT FORM RESUBMISSION ON REFRESH =====
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
    
    // ===== CONSOLE LOG (Development) =====
    console.log('%cPT Widya Techno Abadi', 'font-size: 24px; font-weight: bold; color: #0a4d2e;');
    console.log('%cWebsite loaded successfully', 'font-size: 14px; color: #666;');
    
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format number with thousands separator
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Get current year for footer
const currentYearElements = document.querySelectorAll('.current-year');
if (currentYearElements.length > 0) {
    const currentYear = new Date().getFullYear();
    currentYearElements.forEach(el => {
        el.textContent = currentYear;
    });
}
