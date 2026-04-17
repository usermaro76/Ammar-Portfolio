// Initialize EmailJS
(function() {
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // ضع مفتاحك من EmailJS
    if (PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(PUBLIC_KEY);
    }
})();

// Mobile Menu Toggle
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle?.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active Nav Link
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const height = section.offsetHeight;
        const top = section.offsetTop - 200;
        const id = section.getAttribute('id');
        if (scrollY > top && scrollY <= top + height) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', highlightNavLink);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// Scroll To Top
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 600) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typewriter Effect
const typingText = document.getElementById('typing-text');
const roles = [
    'Senior IT Engineer',
    'Cybersecurity Expert',
    'Solutions Architect',
    'CEO @ Armor IT'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
}
document.addEventListener('DOMContentLoaded', typeRole);

// Animated Counters
const counters = document.querySelectorAll('.animated-counter .count');
let hasCounted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            animateCounter(entry.target.parentElement);
        }
    });
}, { threshold: 0.5 });

function animateCounter(element) {
    const target = +element.getAttribute('data-target');
    const count = element.querySelector('.count');
    const increment = target / 50;
    let c = 0;

    const updateCount = () => {
        c += increment;
        if (c < target) {
            count.textContent = Math.ceil(c);
            requestAnimationFrame(updateCount);
        } else {
            count.textContent = target;
        }
    };
    updateCount();
}
document.querySelectorAll('.animated-counter').forEach(el => counterObserver.observe(el));

// Tabs Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        formStatus.className = 'form-status';

        try {
            await emailjs.sendForm(
                'SERVICE_ID',      // استبدل بمعرف الخدمة الخاص بك
                'TEMPLATE_ID',     // استبدل بمعرف القالب الخاص بك
                this,
                'PUBLIC_KEY'       // استبدل بمفتاحك العام
            );
            formStatus.textContent = '✅ Message sent successfully! Will reply within 2 hours.';
            formStatus.classList.add('success', 'show');
            contactForm.reset();
        } catch (err) {
            console.error('Error:', err);
            formStatus.innerHTML = `❌ Please contact via WhatsApp: <a href="https://wa.me/201278548269" style="color:#25D366;">+20 127 854 8269</a>`;
            formStatus.classList.add('error', 'show');
        } finally {
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
            }, 2000);
        }
    });
}

// Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// Console Welcome
console.log('%c💼 Welcome to Engineer Ammar\'s Portfolio!', 'color: #0ea5e9; font-size: 24px; font-weight: bold;');
console.log('%c👨💻 Elite IT Engineer | 7+ Years Experience | Alexandria, Egypt', 'color: #8b5cf6; font-size: 16px;');

// AOS Initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}