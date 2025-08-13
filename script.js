class FarmAuthenticator {
    constructor() {
        this.isLogin = true;
        this.isSubmitting = false;
        this.initializeElements();
        this.bindEvents();
        this.setupPasswordToggles();
    }

    initializeElements() {
        // Form elements
        this.authForm = document.getElementById('authForm');
        this.authTitle = document.getElementById('authTitle');
        this.authSubtitle = document.getElementById('authSubtitle');
        this.signupFields = document.getElementById('signupFields');
        this.confirmPasswordGroup = document.getElementById('confirmPasswordGroup');
        this.loginOptions = document.getElementById('loginOptions');
        this.submitBtn = document.getElementById('submitBtn');
        this.btnText = document.getElementById('btnText');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.toggleBtn = document.getElementById('toggleBtn');
        this.toggleQuestion = document.getElementById('toggleQuestion');

        // Form inputs
        this.inputs = {
            fullName: document.getElementById('fullName'),
            phone: document.getElementById('phone'),
            farmLocation: document.getElementById('farmLocation'),
            email: document.getElementById('email'),
            password: document.getElementById('password'),
            confirmPassword: document.getElementById('confirmPassword')
        };

        // Error elements
        this.errors = {
            fullName: document.getElementById('fullNameError'),
            phone: document.getElementById('phoneError'),
            farmLocation: document.getElementById('farmLocationError'),
            email: document.getElementById('emailError'),
            password: document.getElementById('passwordError'),
            confirmPassword: document.getElementById('confirmPasswordError')
        };
    }

    bindEvents() {
        this.authForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.toggleBtn.addEventListener('click', () => this.toggleMode());
        
        // Real-time validation
        Object.keys(this.inputs).forEach(key => {
            if (this.inputs[key]) {
                this.inputs[key].addEventListener('input', () => this.clearError(key));
                this.inputs[key].addEventListener('blur', () => this.validateField(key));
            }
        });
    }

    setupPasswordToggles() {
        const passwordToggle = document.getElementById('passwordToggle');
        const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');

        passwordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility('password', passwordToggle);
        });

        confirmPasswordToggle.addEventListener('click', () => {
            this.togglePasswordVisibility('confirmPassword', confirmPasswordToggle);
        });
    }

    togglePasswordVisibility(inputId, toggleBtn) {
        const input = this.inputs[inputId];
        const isPassword = input.type === 'password';
        
        input.type = isPassword ? 'text' : 'password';
        
        // Update icon
        const eyeIcon = toggleBtn.querySelector('.eye-icon');
        if (isPassword) {
            eyeIcon.innerHTML = `
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
            `;
        } else {
            eyeIcon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    }

    validateField(fieldName) {
        const input = this.inputs[fieldName];
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldName) {
            case 'fullName':
                if (!this.isLogin && !value) {
                    errorMessage = 'Full name is required';
                    isValid = false;
                } else if (!this.isLogin && value.length < 2) {
                    errorMessage = 'Full name must be at least 2 characters';
                    isValid = false;
                }
                break;

            case 'phone':
                if (!this.isLogin && !value) {
                    errorMessage = 'Phone number is required';
                    isValid = false;
                } else if (!this.isLogin && !/^[\d\s\-\+\(\)]{10,}$/.test(value)) {
                    errorMessage = 'Please enter a valid phone number';
                    isValid = false;
                }
                break;

            case 'farmLocation':
                if (!this.isLogin && !value) {
                    errorMessage = 'Farm location is required';
                    isValid = false;
                } else if (!this.isLogin && value.length < 3) {
                    errorMessage = 'Please enter a valid location';
                    isValid = false;
                }
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value) {
                    errorMessage = 'Email is required';
                    isValid = false;
                } else if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;

            case 'password':
                if (!value) {
                    errorMessage = 'Password is required';
                    isValid = false;
                } else if (value.length < 6) {
                    errorMessage = 'Password must be at least 6 characters';
                    isValid = false;
                }
                break;

            case 'confirmPassword':
                if (!this.isLogin && !value) {
                    errorMessage = 'Please confirm your password';
                    isValid = false;
                } else if (!this.isLogin && value !== this.inputs.password.value) {
                    errorMessage = 'Passwords do not match';
                    isValid = false;
                }
                break;
        }

        this.showError(fieldName, errorMessage);
        this.updateInputState(input, isValid);
        return isValid;
    }

    validateForm() {
        let isValid = true;
        const fieldsToValidate = ['email', 'password'];
        
        if (!this.isLogin) {
            fieldsToValidate.push('fullName', 'phone', 'farmLocation', 'confirmPassword');
        }

        fieldsToValidate.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    showError(fieldName, message) {
        const errorElement = this.errors[fieldName];
        if (errorElement) {
            errorElement.textContent = message;
            if (message) {
                errorElement.classList.add('show');
            } else {
                errorElement.classList.remove('show');
            }
        }
    }

    clearError(fieldName) {
        this.showError(fieldName, '');
        const input = this.inputs[fieldName];
        if (input) {
            input.classList.remove('error');
            if (input.value.trim()) {
                this.validateField(fieldName);
            }
        }
    }

    updateInputState(input, isValid) {
        input.classList.remove('error', 'success');
        if (input.value.trim()) {
            input.classList.add(isValid ? 'success' : 'error');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting || !this.validateForm()) {
            return;
        }

        this.setSubmitting(true);

        // Simulate API call
        try {
            await this.simulateApiCall();
            
            // Get form data
            const formData = this.getFormData();
            console.log(this.isLogin ? 'Login attempt:' : 'Signup attempt:', formData);
            
            // Show success (in a real app, you'd redirect or show success message)
            this.showSuccess();
            
        } catch (error) {
            console.error('Authentication error:', error);
            this.showError('email', 'Authentication failed. Please try again.');
        } finally {
            this.setSubmitting(false);
        }
    }

    getFormData() {
        const data = {
            email: this.inputs.email.value.trim(),
            password: this.inputs.password.value
        };

        if (!this.isLogin) {
            data.fullName = this.inputs.fullName.value.trim();
            data.phone = this.inputs.phone.value.trim();
            data.farmLocation = this.inputs.farmLocation.value.trim();
        }

        return data;
    }

    simulateApiCall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });
    }

    setSubmitting(isSubmitting) {
        this.isSubmitting = isSubmitting;
        this.submitBtn.disabled = isSubmitting;
        
        if (isSubmitting) {
            this.submitBtn.classList.add('loading');
            this.btnText.textContent = this.isLogin ? 'Signing In...' : 'Creating Account...';
        } else {
            this.submitBtn.classList.remove('loading');
            this.btnText.textContent = this.isLogin ? 'Sign In' : 'Create Account';
        }
    }

    showSuccess() {
        // In a real application, you might redirect or show a success message
        const message = this.isLogin ? 'Successfully signed in!' : 'Account created successfully!';
        
        // Temporary success indication
        this.submitBtn.style.background = '#10b981';
        this.btnText.textContent = '✓ ' + (this.isLogin ? 'Signed In!' : 'Account Created!');
        
        setTimeout(() => {
            this.submitBtn.style.background = '';
            this.btnText.textContent = this.isLogin ? 'Sign In' : 'Create Account';
        }, 2000);
    }

    toggleMode() {
        if (this.isSubmitting) return;

        this.isLogin = !this.isLogin;
        
        // Add transition class
        document.body.classList.add('transitioning');
        
        // Update UI elements
        this.updateUIForMode();
        
        // Clear form and errors
        this.clearForm();
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('transitioning');
        }, 300);
    }

    updateUIForMode() {
        if (this.isLogin) {
            // Switch to login mode
            this.authTitle.textContent = 'Welcome Back!';
            this.authSubtitle.textContent = 'Sign in to manage your farm operations';
            this.btnText.textContent = 'Sign In';
            this.toggleQuestion.textContent = "Don't have an account?";
            this.toggleBtn.textContent = 'Sign Up';
            
            // Hide signup fields
            this.signupFields.classList.remove('show');
            this.confirmPasswordGroup.classList.remove('show');
            this.loginOptions.classList.remove('hide');
            
            setTimeout(() => {
                this.signupFields.style.display = 'none';
                this.confirmPasswordGroup.style.display = 'none';
            }, 300);
            
        } else {
            // Switch to signup mode
            this.authTitle.textContent = 'Join FarmConnect';
            this.authSubtitle.textContent = 'Create your account to start farming smarter';
            this.btnText.textContent = 'Create Account';
            this.toggleQuestion.textContent = 'Already have an account?';
            this.toggleBtn.textContent = 'Sign In';
            
            // Show signup fields
            this.signupFields.style.display = 'flex';
            this.confirmPasswordGroup.style.display = 'flex';
            this.loginOptions.classList.add('hide');
            
            setTimeout(() => {
                this.signupFields.classList.add('show');
                this.confirmPasswordGroup.classList.add('show');
            }, 50);
        }
    }

    clearForm() {
        // Clear all inputs
        Object.values(this.inputs).forEach(input => {
            if (input) {
                input.value = '';
                input.classList.remove('error', 'success');
            }
        });

        // Clear all errors
        Object.keys(this.errors).forEach(key => {
            this.showError(key, '');
        });

        // Reset password visibility
        this.inputs.password.type = 'password';
        this.inputs.confirmPassword.type = 'password';
        
        // Reset password toggle icons
        document.querySelectorAll('.eye-icon').forEach(icon => {
            icon.innerHTML = `
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        });
    }
}

// Initialize the authenticator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FarmAuthenticator();
});

// Add some nice scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.background');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Adjust layout for mobile if needed
    const isMobile = window.innerWidth < 640;
    const authCard = document.querySelector('.auth-card');
    
    if (authCard) {
        if (isMobile) {
            authCard.style.margin = '0 0.5rem';
        } else {
            authCard.style.margin = '0';
        }
    }
});