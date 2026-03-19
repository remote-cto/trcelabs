
// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-open');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.toggle('bx-menu');
    icon.classList.toggle('bx-x');
});


document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor Glow
    const cursorGlow = document.getElementById('cursorGlow');
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Expand cursor glow on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .dashboard-mockup');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '800px';
            cursorGlow.style.height = '800px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, rgba(0, 0, 0, 0) 60%)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '600px';
            cursorGlow.style.height = '600px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.06) 0%, rgba(0, 0, 0, 0) 70%)';
        });
    });

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Scroll Reveal Animations utilizing IntersectionObserver
    const revealElements = document.querySelectorAll('.fade-up, .fade-in, .fade-right, .fade-left');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Number Counter Animation for Stats
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Lower is faster

    const startCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    // Specific logic for decimals vs integers
                    const isDecimal = target % 1 !== 0;
                    const inc = target / speed;

                    if (count < target) {
                        if (isDecimal) {
                            counter.innerText = (count + inc).toFixed(2);
                        } else {
                            counter.innerText = Math.ceil(count + inc);
                        }
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    };

    const counterObserver = new IntersectionObserver(startCounters, {
        threshold: 0.5
    });

    counters.forEach(counter => counterObserver.observe(counter));

    // 5. Active Nav Link Update on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset for fixed navbar
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 6. Interactive Dashboard bars (Simulating live data)
    const bars = document.querySelectorAll('.bar');
    if (bars.length > 0) {
        setInterval(() => {
            bars.forEach(bar => {
                const randomHeight = Math.floor(Math.random() * 80) + 20; // 20% to 100%
                bar.style.height = `${randomHeight}%`;
            });
        }, 2000);
    }
});
