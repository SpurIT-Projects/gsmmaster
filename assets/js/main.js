// Main JavaScript file for GSM Master website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initScrollToTop();
    initFormValidation();
    initAnimateOnScroll();
    initNavigationHighlight();
    initConsultationModal();
    initOrderRepairModal();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Form Validation and Submission
function initFormValidation() {
    const callbackForm = document.getElementById('callback-form');
    
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const phone = formData.get('phone').trim();
            const message = formData.get('message').trim();
            
            // Reset previous validation states
            clearFormValidation();
            
            let isValid = true;
            
            // Validate name
            if (name.length < 2) {
                showFieldError('name', 'Имя должно содержать минимум 2 символа');
                isValid = false;
            } else {
                showFieldSuccess('name');
            }
            
            // Validate phone
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                showFieldError('phone', 'Введите корректный номер телефона');
                isValid = false;
            } else {
                showFieldSuccess('phone');
            }
            
            if (isValid) {
                submitForm(formData);
            }
        });
    }
}

function clearFormValidation() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorMsg = group.querySelector('.error-message');
        const successMsg = group.querySelector('.success-message');
        if (errorMsg) errorMsg.remove();
        if (successMsg) successMsg.remove();
    });
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function showFieldSuccess(fieldName) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
}

function submitForm(formData) {
    const submitBtn = document.querySelector('#callback-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Отправка...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        document.getElementById('callback-form').reset();
        clearFormValidation();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success notification
        showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Animate on Scroll
function initAnimateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('aos-item');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add animation to advantage items
    const advantages = document.querySelectorAll('.advantage');
    advantages.forEach((advantage, index) => {
        advantage.classList.add('aos-item');
        advantage.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(advantage);
    });
}

// Navigation Highlight on Scroll
function initNavigationHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Service Card Modal (placeholder for future implementation)
function openServiceModal(serviceType) {
    // This function can be expanded to show detailed service information
    console.log(`Opening modal for service: ${serviceType}`);
    showNotification('Подробная информация скоро будет доступна!', 'info');
}

// Phone number formatting
function formatPhoneNumber(input) {
    const value = input.value.replace(/\D/g, '');
    let formattedValue = value;
    
    if (value.startsWith('375')) {
        formattedValue = value.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    } else if (value.length >= 10) {
        formattedValue = value.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '+375 ($1) $2-$3-$4');
    }
    
    input.value = formattedValue;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Add click handlers for service buttons
document.addEventListener('DOMContentLoaded', function() {
    const serviceButtons = document.querySelectorAll('.service-card .btn-outline');
    serviceButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const serviceTypes = ['smartphones', 'tablets', 'laptops', 'diagnostics'];
            openServiceModal(serviceTypes[index] || 'general');
        });
    });
});

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Performance optimization: debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Consultation Modal Functions
function initConsultationModal() {
    const consultationBtn = document.querySelector('.consultation-btn');
    const modal = document.getElementById('consultation-modal');
    const closeBtn = modal.querySelector('.modal-close');
    const form = document.getElementById('consultation-form');
    const deviceButtons = document.querySelectorAll('.device-btn');
    
    // Open modal
    consultationBtn.addEventListener('click', function() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        form.reset();
        clearConsultationFormValidation();
        // Reset device selection
        deviceButtons.forEach(btn => btn.classList.remove('active'));
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Device selection
    deviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            deviceButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const phone = formData.get('phone').trim();
        const name = formData.get('name').trim();
        const agreement = formData.get('agreement');
        
        // Clear previous validation
        clearConsultationFormValidation();
        
        let isValid = true;
        
        // Validate required fields
        if (name.length < 2) {
            showConsultationFieldError('consultation-name', 'Введите ваше имя');
            isValid = false;
        }
        
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showConsultationFieldError('consultation-phone', 'Введите корректный номер телефона');
            isValid = false;
        }
        
        if (!agreement) {
            showNotification('Необходимо согласие с обработкой персональных данных', 'error');
            isValid = false;
        }
        
        if (isValid) {
            submitConsultationForm(formData);
        }
    });
    
    // Phone formatting
    const phoneInput = document.getElementById('consultation-phone');
    phoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
}

function clearConsultationFormValidation() {
    const formGroups = document.querySelectorAll('#consultation-form .form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    });
}

function showConsultationFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function submitConsultationForm(formData) {
    const submitBtn = document.querySelector('#consultation-form .btn-submit');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Отправка...';
    submitBtn.disabled = true;
    
    // Get selected device
    const activeDevice = document.querySelector('.device-btn.active');
    const deviceType = activeDevice ? activeDevice.dataset.device : 'not-specified';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Close modal and reset form
        document.getElementById('consultation-modal').classList.remove('show');
        document.body.style.overflow = '';
        document.getElementById('consultation-form').reset();
        clearConsultationFormValidation();
        
        // Reset device selection
        document.querySelectorAll('.device-btn').forEach(btn => btn.classList.remove('active'));
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success notification
        showNotification('Заявка на консультацию успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        
        console.log('Consultation form data:', {
            name: formData.get('name'),
            phone: formData.get('phone'),
            time: formData.get('time'),
            device: deviceType
        });
    }, 2000);
}

// Order Repair Modal Functions
function initOrderRepairModal() {
    const orderBtn = document.querySelector('.order-repair-btn');
    const modal = document.getElementById('order-repair-modal');
    

    
    if (!orderBtn) {
        console.error('Order repair button not found');
        return;
    }
    
    if (!modal) {
        console.error('Order repair modal not found');
        return;
    }
    
    const closeBtn = modal.querySelector('.modal-close');
    const form = document.getElementById('order-repair-form');
    const deviceButtons = modal.querySelectorAll('.device-btn');
    
    // Open modal
    orderBtn.addEventListener('click', function() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    function closeOrderModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        form.reset();
        clearOrderFormValidation();
        // Reset device selection
        deviceButtons.forEach(btn => btn.classList.remove('active'));
    }
    
    closeBtn.addEventListener('click', closeOrderModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeOrderModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeOrderModal();
        }
    });
    
    // Device selection
    deviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            deviceButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const phone = formData.get('phone').trim();
        const problem = formData.get('problem').trim();
        const agreement = formData.get('agreement');
        
        // Clear previous validation
        clearOrderFormValidation();
        
        let isValid = true;
        
        // Validate required fields
        if (name.length < 2) {
            showOrderFieldError('order-name', 'Введите ваше имя');
            isValid = false;
        }
        
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showOrderFieldError('order-phone', 'Введите корректный номер телефона');
            isValid = false;
        }
        
        if (problem.length < 10) {
            showOrderFieldError('order-problem', 'Опишите проблему более подробно (минимум 10 символов)');
            isValid = false;
        }
        
        // Check if device is selected
        const activeDevice = modal.querySelector('.device-btn.active');
        if (!activeDevice) {
            showNotification('Выберите тип устройства', 'error');
            isValid = false;
        }
        
        if (!agreement) {
            showNotification('Необходимо согласие с обработкой персональных данных', 'error');
            isValid = false;
        }
        
        if (isValid) {
            submitOrderRepairForm(formData);
        }
    });
    
    // Phone formatting
    const phoneInput = document.getElementById('order-phone');
    phoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });
}

function clearOrderFormValidation() {
    const formGroups = document.querySelectorAll('#order-repair-form .form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    });
}

function showOrderFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function submitOrderRepairForm(formData) {
    const submitBtn = document.querySelector('#order-repair-form .btn-submit');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> Отправка заявки...';
    submitBtn.disabled = true;
    
    // Get selected device
    const activeDevice = document.querySelector('#order-repair-modal .device-btn.active');
    const deviceType = activeDevice ? activeDevice.dataset.device : 'not-specified';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Close modal and reset form
        document.getElementById('order-repair-modal').classList.remove('show');
        document.body.style.overflow = '';
        document.getElementById('order-repair-form').reset();
        clearOrderFormValidation();
        
        // Reset device selection
        document.querySelectorAll('#order-repair-modal .device-btn').forEach(btn => btn.classList.remove('active'));
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success notification
        showNotification('Заявка на ремонт успешно отправлена! Наш специалист свяжется с вами в течение 30 минут для уточнения деталей.', 'success');
        
        console.log('Order repair form data:', {
            name: formData.get('name'),
            phone: formData.get('phone'),
            brand: formData.get('brand'),
            model: formData.get('model'),
            problem: formData.get('problem'),
            preferred_time: formData.get('preferred_time'),
            device: deviceType
        });
    }, 2500);
}
