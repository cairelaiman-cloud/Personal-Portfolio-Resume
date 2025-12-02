// DOM References
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const typingTextElement = document.getElementById('typing-text');
const projectModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModalBtn = document.querySelector('.close-btn');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const skillBars = document.querySelectorAll('.skill-bar');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Mobile Menu
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Typing Effect
const targetGreeting = "Hello, I'm Haziq";
let charIndex = 0;

function typeWriter() {
    if (charIndex < targetGreeting.length) {
        typingTextElement.textContent = targetGreeting.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, 50);
    }
}
window.addEventListener('load', typeWriter);

// Image Modal
document.querySelectorAll('.view-image-btn').forEach(button => {
    button.addEventListener('click', () => {
        modalImage.src = button.dataset.imageSrc;
        projectModal.style.display = "block";
    });
});

closeModalBtn.addEventListener('click', () => {
    projectModal.style.display = "none";
});

// Scroll To Top
window.addEventListener('scroll', () => {
    scrollToTopBtn.style.display =
        window.scrollY > 500 ? "block" : "none";
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: "smooth"});
});

// Skill Bar Animation
function animateSkills() {
    skillBars.forEach(bar => {
        const visible = bar.getBoundingClientRect().top < window.innerHeight;
        if (visible) {
            bar.querySelector('.bar-fill').style.width = bar.dataset.skillLevel + '%';
        }
    });
}
window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);

// Contact Form Mock Handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString();
    formStatus.textContent = `Message received at ${time} (Front-End Only)`;
    formStatus.style.color = "green";
    contactForm.reset();
});
