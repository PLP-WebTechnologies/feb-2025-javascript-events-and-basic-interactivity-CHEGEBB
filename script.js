// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Event Handling: Button Click
    const heroBtn = document.getElementById('hero-btn');
    heroBtn.addEventListener('click', function() {
        scrollToSection('contact');
    });

    // Event Handling: Hover Effects
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#3a5a80';
        });
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });

    // Event Handling: Secret Action (Double-click)
    document.addEventListener('dblclick', function(e) {
        const secretPopup = document.getElementById('secret-popup');
        secretPopup.classList.remove('hidden');
    });

    // Close popup
    const closePopupBtn = document.getElementById('close-popup');
    closePopupBtn.addEventListener('click', function() {
        document.getElementById('secret-popup').classList.add('hidden');
    });

    // Interactive Elements: Theme Toggle
    const themeBtn = document.getElementById('theme-btn');
    themeBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        themeBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });

    // Interactive Elements: Tab System
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all panels
            const panels = document.querySelectorAll('.tab-panel');
            panels.forEach(panel => panel.classList.remove('active'));
            
            // Show the selected panel
            const targetPanel = document.getElementById(`${this.dataset.tab}-panel`);
            targetPanel.classList.add('active');
        });
    });

    // Interactive Elements: Image Gallery/Slideshow
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlideIndex = 0;

    // Show slide function
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Make sure index is within bounds
        if (index < 0) {
            currentSlideIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentSlideIndex = 0;
        } else {
            currentSlideIndex = index;
        }
        
        // Show the current slide
        slides[currentSlideIndex].classList.add('active');
    }

    // Previous slide button
    prevBtn.addEventListener('click', function() {
        showSlide(currentSlideIndex - 1);
    });

    // Next slide button
    nextBtn.addEventListener('click', function() {
        showSlide(currentSlideIndex + 1);
    });

    // Auto-advance slides every 5 seconds
    setInterval(function() {
        showSlide(currentSlideIndex + 1);
    }, 5000);

    // Event Handling: Keypress Detection
    document.addEventListener('keydown', function(e) {
        // Left arrow key - Previous slide
        if (e.key === 'ArrowLeft') {
            showSlide(currentSlideIndex - 1);
        }
        // Right arrow key - Next slide
        else if (e.key === 'ArrowRight') {
            showSlide(currentSlideIndex + 1);
        }
        // Escape key - Close popup
        else if (e.key === 'Escape') {
            document.getElementById('secret-popup').classList.add('hidden');
        }
    });

    // Form Validation
    const repairForm = document.getElementById('repair-form');
    const formSuccess = document.getElementById('form-success');
    
    // Input fields
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const deviceInput = document.getElementById('device');
    const issueInput = document.getElementById('issue');
    const passwordInput = document.getElementById('password');
    
    // Error messages
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const deviceError = document.getElementById('device-error');
    const issueError = document.getElementById('issue-error');
    const passwordError = document.getElementById('password-error');

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    deviceInput.addEventListener('change', validateDevice);
    issueInput.addEventListener('input', validateIssue);
    passwordInput.addEventListener('input', validatePassword);

    // Form submission
    repairForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields before submission
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isDeviceValid = validateDevice();
        const isIssueValid = validateIssue();
        const isPasswordValid = true; // Password is optional
        
        if (isNameValid && isEmailValid && isPhoneValid && isDeviceValid && isIssueValid && isPasswordValid) {
            // Hide form and show success message
            repairForm.classList.add('hidden');
            formSuccess.classList.remove('hidden');
            
            // For demo purposes - reset form after 5 seconds and show it again
            setTimeout(function() {
                repairForm.reset();
                repairForm.classList.remove('hidden');
                formSuccess.classList.add('hidden');
            }, 5000);
        }
    });

    // Reset button
    const resetBtn = document.getElementById('reset-btn');
    resetBtn.addEventListener('click', function() {
        // Clear all error messages
        nameError.textContent = '';
        emailError.textContent = '';
        phoneError.textContent = '';
        deviceError.textContent = '';
        issueError.textContent = '';
        passwordError.textContent = '';
    });

    // Validation functions
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            return false;
        }
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        }
        nameError.textContent = '';
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            return false;
        }
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        }
        emailError.textContent = '';
        return true;
    }

    function validatePhone() {
        const phoneRegex = /^\d{10,15}$/;
        if (phoneInput.value.trim() === '') {
            phoneError.textContent = 'Phone number is required';
            return false;
        }
        if (!phoneRegex.test(phoneInput.value.replace(/\D/g, ''))) {
            phoneError.textContent = 'Please enter a valid phone number (10-15 digits)';
            return false;
        }
        phoneError.textContent = '';
        return true;
    }

    function validateDevice() {
        if (deviceInput.value === '') {
            deviceError.textContent = 'Please select a device type';
            return false;
        }
        deviceError.textContent = '';
        return true;
    }

    function validateIssue() {
        if (issueInput.value.trim() === '') {
            issueError.textContent = 'Please describe the issue';
            return false;
        }
        if (issueInput.value.trim().length < 10) {
            issueError.textContent = 'Please provide more details (at least 10 characters)';
            return false;
        }
        issueError.textContent = '';
        return true;
    }

    function validatePassword() {
        // Password is optional, but if provided, it must meet requirements
        if (passwordInput.value === '') {
            passwordError.textContent = '';
            return true;
        }
        
        const hasMinLength = passwordInput.value.length >= 8;
        const hasNumber = /\d/.test(passwordInput.value);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(passwordInput.value);
        
        if (!hasMinLength || !hasNumber || !hasSpecial) {
            passwordError.textContent = 'Password must be at least 8 characters with numbers and special characters';
            return false;
        }
        
        passwordError.textContent = '';
        return true;
    }

    // Helper function to scroll to section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Navigation menu scrolling
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                scrollToSection(targetId);
                
                // Update active link
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                    navLink.style.backgroundColor = '';
                });
                this.classList.add('active');
                this.style.backgroundColor = '#3a5a80';
            }
        });
    });
});