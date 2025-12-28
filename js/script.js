// --- TABLE OF CONTENTS ---
// 1. Theme Toggle
// 2. Sticky Header on Scroll
// 3. Mobile Navigation (Hamburger Menu)
// 4. Smooth Scrolling for Nav Links
// 5. Scroll-Reveal Animations

document.addEventListener('DOMContentLoaded', () => {

    // 1. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle-icon');
    const body = document.body;

    const sunIcon = `<path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.59a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.836 17.894a.75.75 0 01-1.06 0l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.59a.75.75 0 010 1.06zM12 21a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0V20.25a.75.75 0 01-.75.75zM5.106 17.836a.75.75 0 010-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.106 5.106a.75.75 0 011.06 0l1.59 1.591a.75.75 0 11-1.06 1.06l-1.59-1.59a.75.75 0 010-1.06z"/>`;
    const moonIcon = `<path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.463-.948.75.75 0 01.819.162l.32.32a.75.75 0 01-.256 1.078A10.5 10.5 0 0118 18a10.5 10.5 0 01-10.5-10.5c0-1.05.148-2.062.433-3.003a.75.75 0 011.078-.256l.32.32zM12 3.5A8.5 8.5 0 003.5 12a8.5 8.5 0 008.5 8.5 8.5 8.5 0 008.5-8.5c0-.28-.012-.557-.035-.83a.75.75 0 01.5-.755 9.01 9.01 0 00-2.6-6.495.75.75 0 01-.755.5A8.45 8.45 0 0012 3.5z" clip-rule="evenodd"/>`;
    
    // Function to apply theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            themeToggle.innerHTML = sunIcon;
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeToggle.innerHTML = moonIcon;
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 2. Sticky Header on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation (Hamburger Menu)
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // 4. Smooth Scrolling & Active Link Highlighting
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // 5. Scroll-Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const elementsToAnimate = document.querySelectorAll('.section-title, .section-subtitle, .skill-category, .timeline-item, .project-card, .education-card, .contact-methods, .contact-form, .hero-text, .hero-image');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in'); // Add initial state class
        observer.observe(el);
    });
});
