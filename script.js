// Project Origin Website JavaScript

// NAVIGATION SCROLL EFFECT - MUST RUN IMMEDIATELY
(function() {
    'use strict';
    
    function updateNavOnScroll() {
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
        const threshold = 50;
        
        const nav = document.querySelector('.nav');
        const mobileNav = document.querySelector('.mobile-nav');
        
        if (nav) {
            if (scrollY > threshold) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        
        if (mobileNav) {
            if (scrollY > threshold) {
                mobileNav.classList.add('scrolled');
            } else {
                mobileNav.classList.remove('scrolled');
            }
        }
    }
    
    // Run immediately
    updateNavOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', updateNavOnScroll, { passive: true });
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateNavOnScroll);
    } else {
        updateNavOnScroll();
    }
    
    // Run after a delay to catch any timing issues
    setTimeout(updateNavOnScroll, 100);
    setTimeout(updateNavOnScroll, 500);
})();

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation link clicks
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll-based fade-in animations for statistics
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.stat-highlight');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = parseInt(element.getAttribute('data-delay')) || 0;
                    
                    setTimeout(() => {
                        element.classList.add('scroll-fade-in');
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize scroll animations
    initScrollAnimations();

    // Alternating fly-in animations for "What It Looks Like" section
    function initFlyInAnimations() {
        const flyInElements = document.querySelectorAll('.model-item');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = parseInt(element.getAttribute('data-delay')) || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animate-in');
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        flyInElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Initialize fly-in animations
    initFlyInAnimations();

    // Timeline fly-in animations for challenge page
    function initTimelineAnimations() {
        const timelineElements = document.querySelectorAll('.timeline-item');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = parseInt(element.getAttribute('data-delay')) || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animate-in');
                    }, delay);
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        timelineElements.forEach(el => {
            observer.observe(el);
        });
    }

// Initialize timeline animations
initTimelineAnimations();

// Feature card animations
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = Array.from(featureCards).indexOf(element) * 100;
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize feature cards
initFeatureCards();

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.process-step, .point, .mentor-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });


    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherQuestion = otherItem.querySelector('.faq-question');
                otherAnswer.style.display = 'none';
                otherQuestion.classList.remove('active');
            });
            
            // Toggle current item
            if (!isOpen) {
                answer.style.display = 'block';
                question.classList.add('active');
            }
        });
    });

    // Contact form functionality
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Let Formspree handle the submission
            // Just show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Show success message after a delay (Formspree will redirect)
            setTimeout(() => {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                `;
                successMessage.style.cssText = `
                    background: #10b981;
                    color: white;
                    padding: 20px;
                    border-radius: 12px;
                    text-align: center;
                    margin: 20px 0;
                `;
                
                this.parentNode.insertBefore(successMessage, this);
                this.style.display = 'none';
            }, 1000);
        });
    }
});

// Utility function to check if user prefers reduced motion
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Adjust animations based on user preference
if (prefersReducedMotion()) {
    const style = document.createElement('style');
    style.textContent = `
        .globe-animation {
            animation: none !important;
        }
        .cta-button:hover,
        .process-step:hover,
        .point:hover,
        .mentor-card:hover {
            transform: none !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// SCROLL-TRIGGERED ANIMATIONS (Apple-style)
// ============================================
(function() {
    'use strict';
    
    // Elements to animate on scroll
    const animateSelectors = [
        '.pillar-card',
        '.winner-card',
        '.testimonial-card',
        '.stat-card',
        '.gallery-item',
        '.section-header',
        '.pillars-header',
        '.winners-header',
        '.testimonials-header',
        '.gallery-header',
        '.why-card',
        '.journey-step',
        '.proof-stat',
        '.ai-preview-content'
    ];
    
    // Initialize intersection observer
    function initScrollAnimations() {
        if (prefersReducedMotion()) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on siblings
                    const siblings = entry.target.parentElement.children;
                    const siblingIndex = Array.from(siblings).indexOf(entry.target);
                    const delay = siblingIndex * 0.08;
                    
                    entry.target.style.transitionDelay = `${delay}s`;
                    entry.target.classList.add('animate-visible');
                    
                    // Unobserve after animation
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Add initial styles and observe elements
        animateSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('animate-on-scroll');
                observer.observe(el);
            });
        });
    }
    
    // Add CSS for scroll animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(32px);
            transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), 
                        transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-on-scroll.animate-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Reduce motion preference */
        @media (prefers-reduced-motion: reduce) {
            .animate-on-scroll {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }
})();

// ============================================
// SMOOTH PARALLAX EFFECT (Subtle)
// ============================================
(function() {
    'use strict';
    
    if (prefersReducedMotion()) return;
    
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.scrollY;
        
        // Subtle parallax for hero section
        const heroNew = document.querySelector('.hero-new');
        if (heroNew) {
            const heroContent = heroNew.querySelector('.hero-new-container');
            if (heroContent && scrollY < window.innerHeight) {
                const parallaxAmount = scrollY * 0.15;
                heroContent.style.transform = `translateY(${parallaxAmount}px)`;
                heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.8));
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
})();

// ============================================
// FULL-SCREEN SCROLL TRANSITION
// Apple visionOS-style immersive effect
// ============================================
(function() {
    'use strict';
    
    // Skip if user prefers reduced motion
    if (typeof prefersReducedMotion === 'function' && prefersReducedMotion()) return;
    
    function init() {
        const overlay = document.getElementById('transition-overlay');
        const aiSection = document.getElementById('ai-section');
        const socialProof = document.querySelector('.social-proof');
        
        if (!overlay || !aiSection) return;
        
        let ticking = false;
        
        // Easing functions
        function easeOutCubic(x) {
            return 1 - Math.pow(1 - x, 3);
        }
        
        function easeInOutCubic(x) {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        }
        
        function clamp(val, min, max) {
            return Math.max(min, Math.min(max, val));
        }
        
        function updateScrollTransition() {
            const viewportHeight = window.innerHeight;
            const aiRect = aiSection.getBoundingClientRect();
            
            // Get position of social proof section
            const triggerStart = socialProof ? socialProof.getBoundingClientRect().bottom : aiRect.top + viewportHeight;
            
            // PHASE 1: Screen fades to black as we approach AI section
            const fadeStart = viewportHeight * 0.8;
            const fadeEnd = viewportHeight * 0.4;
            
            let overlayFadeIn = 0;
            if (triggerStart < fadeStart) {
                overlayFadeIn = clamp((fadeStart - triggerStart) / (fadeStart - fadeEnd), 0, 1);
            }
            
            // PHASE 2: Keep overlay solid while in AI section, fade out when leaving
            // Overlay stays at 1 until AI section bottom is near viewport top
            let overlayFadeOut = 0;
            if (aiRect.bottom < viewportHeight * 0.3) {
                overlayFadeOut = clamp((viewportHeight * 0.3 - aiRect.bottom) / (viewportHeight * 0.4), 0, 1);
            }
            
            // Final overlay: fades in, stays solid, fades out when leaving
            const finalOverlay = clamp(overlayFadeIn - overlayFadeOut, 0, 1);
            overlay.style.opacity = easeInOutCubic(finalOverlay).toFixed(3);
            
            if (finalOverlay > 0.05) {
                overlay.classList.add('active');
            } else {
                overlay.classList.remove('active');
            }
            
            // PHASE 3: Content reveals INSIDE the black screen
            // Once screen is mostly black (overlayFadeIn > 0.7), content starts appearing
            // Content tied to how far into AI section we've scrolled
            let contentProgress = 0;
            if (overlayFadeIn > 0.7) {
                // Calculate progress based on AI section position
                const contentStart = viewportHeight * 0.5;
                const scrolledIntoAI = contentStart - aiRect.top;
                contentProgress = clamp(scrolledIntoAI / (viewportHeight * 0.6), 0, 1);
            }
            
            // Staggered element reveals
            const badgeProgress = clamp((contentProgress - 0) * 2, 0, 1);
            const titleProgress = clamp((contentProgress - 0.1) * 2, 0, 1);
            const descProgress = clamp((contentProgress - 0.2) * 2, 0, 1);
            const featuresProgress = clamp((contentProgress - 0.3) * 2, 0, 1);
            const btnProgress = clamp((contentProgress - 0.45) * 2, 0, 1);
            const visualProgress = clamp((contentProgress - 0.15) * 1.8, 0, 1);
            
            // Apply easing
            const easedBadge = easeOutCubic(badgeProgress);
            const easedTitle = easeOutCubic(titleProgress);
            const easedDesc = easeOutCubic(descProgress);
            const easedFeatures = easeOutCubic(featuresProgress);
            const easedBtn = easeOutCubic(btnProgress);
            const easedVisual = easeOutCubic(visualProgress);
            
            // Glow appears with content
            const glowProgress = clamp(contentProgress * 1.2, 0, 1);
            
            // Set CSS custom properties
            aiSection.style.setProperty('--glow-opacity', (easeOutCubic(glowProgress) * 0.4).toFixed(3));
            aiSection.style.setProperty('--badge-opacity', easedBadge.toFixed(3));
            aiSection.style.setProperty('--badge-progress', easedBadge.toFixed(3));
            aiSection.style.setProperty('--title-opacity', easedTitle.toFixed(3));
            aiSection.style.setProperty('--title-progress', easedTitle.toFixed(3));
            aiSection.style.setProperty('--desc-opacity', easedDesc.toFixed(3));
            aiSection.style.setProperty('--desc-progress', easedDesc.toFixed(3));
            aiSection.style.setProperty('--features-opacity', easedFeatures.toFixed(3));
            aiSection.style.setProperty('--features-progress', easedFeatures.toFixed(3));
            aiSection.style.setProperty('--btn-opacity', easedBtn.toFixed(3));
            aiSection.style.setProperty('--btn-progress', easedBtn.toFixed(3));
            aiSection.style.setProperty('--visual-opacity', easedVisual.toFixed(3));
            aiSection.style.setProperty('--visual-progress', easedVisual.toFixed(3));
            
            ticking = false;
        }
        
        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(updateScrollTransition);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Initial call
        updateScrollTransition();
        
        // ========================================
        // OTHER SECTIONS - IntersectionObserver
        // ========================================
        const revealSections = document.querySelectorAll('.why-us, .journey-timeline, .final-cta');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            root: null,
            rootMargin: '-10% 0px',
            threshold: 0.1
        });
        
        revealSections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // ========================================
        // FADE-UP ELEMENTS
        // ========================================
        const fadeUpElements = document.querySelectorAll('.pillar-card, .proof-stat, .why-card, .step');
        
        const fadeUpObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -30px 0px',
            threshold: 0.1
        });
        
        fadeUpElements.forEach(el => {
            fadeUpObserver.observe(el);
        });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// ============================================
// PITCH CAROUSEL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.pitch-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.pitch-carousel-track');
    const images = track.querySelectorAll('img');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (!dotsContainer) {
        const dots = document.createElement('div');
        dots.className = 'carousel-dots';
        carousel.appendChild(dots);
    }
    
    // Create dots
    images.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        carousel.querySelector('.carousel-dots').appendChild(dot);
    });
    
    const dots = carousel.querySelectorAll('.carousel-dot');
    let currentIndex = 0;
    let interval;
    
    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${index * 100}%)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % images.length;
        goToSlide(currentIndex);
    }
    
    function startInterval() {
        interval = setInterval(nextSlide, 3000);
    }
    
    function stopInterval() {
        clearInterval(interval);
    }
    
    // Start auto-scroll
    startInterval();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', stopInterval);
    carousel.addEventListener('mouseleave', startInterval);
});