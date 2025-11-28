// --- Global DOM References ---
const navLinks = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const typingTextElement = document.getElementById('typing-text');
const skillBars = document.querySelectorAll('.skill-bar');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
const projectModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModalBtn = document.querySelector('.close-btn');

// --- JS Feature 1: Mobile Navigation Toggle ---
function toggleMenu() {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    const isExpanded = menuToggle.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
}
menuToggle.addEventListener('click', toggleMenu);

// Close menu when a link is clicked (for smooth scrolling on mobile)
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        if (navLinks.classList.contains('active')) {
            toggleMenu();
        }
    }
});

// --- JS Feature 2: Typing Effect for Home Greeting ---
// CHANGED: Simplified to directly set the target text.
const targetGreeting = "Hello, I'm Haziq"; // Corrected greeting
const typingSpeed = 50; // ms
let charIndex = 0;

function typeWriter() {
    // If the element already contains "Hello, I'm", append " Haziq"
    if (typingTextElement.textContent.trim() === "Hello, I'm") {
        const haziqPart = targetGreeting.substring(typingTextElement.textContent.length);
        if (charIndex < haziqPart.length) {
            typingTextElement.textContent += haziqPart.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        }
    } else if (charIndex < targetGreeting.length) { // For initial load or if text is empty
        typingTextElement.textContent = targetGreeting.substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeWriter, typingSpeed);
    }
}

// Set initial text to "Hello, I'm" then trigger typing for " Haziq"
window.addEventListener('load', () => {
    typingTextElement.textContent = "Hello, I'm";
    // Reset charIndex for the " Haziq" part
    charIndex = 0; 
    setTimeout(typeWriter, typingSpeed);
});


// --- JS Feature 3: Project Image Modal (Viewer) ---
document.querySelectorAll('.view-image-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const src = e.target.getAttribute('data-image-src');
        const alt = e.target.getAttribute('data-image-alt');
        
        modalImage.src = src;
        modalImage.alt = alt;
        projectModal.style.display = "block";
        projectModal.setAttribute('aria-hidden', 'false');
    });
});

// Close modal functionality
function closeProjectModal() {
    projectModal.style.display = "none";
    projectModal.setAttribute('aria-hidden', 'true');
}

closeModalBtn.addEventListener('click', closeProjectModal);

// Close modal when user clicks outside the image
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});
// Close modal when Escape key is pressed (Accessibility)
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && projectModal.style.display === "block") {
        closeProjectModal();
    }
});


// --- JS Feature 4: Skill Bar Animation (On Scroll Visibility) ---
function animateSkills() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        // Check if the skill bar is visible in the viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const level = bar.getAttribute('data-skill-level');
            const fill = bar.querySelector('.bar-fill');
            fill.style.width = level + '%';
        }
    });
}
window.addEventListener('scroll', animateSkills);
// Run on load in case the section is visible immediately
window.addEventListener('load', animateSkills);


// --- JS Feature 5: Front-End Only Form Submission Feedback ---
contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop actual submission (required constraint)
    
    // Simple front-end validation check
    const name = document.getElementById('name').value.trim();
    if (!name) {
        formStatus.textContent = 'Please fill out your name.';
        formStatus.style.color = 'var(--accent-color)';
        return;
    }

    // Display success feedback
    const timestamp = new Date().toLocaleTimeString();
    formStatus.textContent = `✅ Message received (Front-End Only) at ${timestamp}. Haziq will reply via email!`;
    formStatus.style.color = 'var(--primary-color)';
    
    // Clear the form after a successful "submission"
    contactForm.reset();
    document.getElementById('submit-btn').disabled = true;

    // Re-enable button after a short delay
    setTimeout(() => {
        formStatus.textContent = '';
        document.getElementById('submit-btn').disabled = false;
    }, 5000);
});


// --- JS Feature 6: Scroll-to-Top Button Visibility and Functionality ---
window.addEventListener('scroll', () => {
    // Show button if the user has scrolled down more than 500px
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

scrollToTopBtn.addEventListener('click', () => {
    // Smooth scroll back to the top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// --- JS Feature 7: Active Navigation Link Indicator ---
// Function to check which section is currently visible
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-links a');
    
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Check if the current scroll position is within the section boundaries
        // Adjusted by -200px to account for the sticky header and ensure early activation
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
// Initial check on load
window.addEventListener('load', updateActiveLink);