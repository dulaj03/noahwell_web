/**
 * NOAHVELLE — auth.js
 * Authentication UI, Form Validation & Account Management
 */

(function () {
  'use strict';

  const USER_KEY = 'noahvelle_user';
  const SESSION_KEY = 'noahvelle_session';

  // Demo user fallback
  const DEMO_USER = {
    firstName: "Elena",
    lastName: "Vance",
    email: "elena.vance@example.com",
    phone: "+1 (555) 234-8971",
    dob: "1994-06-18"
  };

  function getCurrentUser() {
    try {
      const stored = localStorage.getItem(USER_KEY);
      return stored ? JSON.parse(stored) : DEMO_USER;
    } catch (e) {
      return DEMO_USER;
    }
  }

  function saveCurrentUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_KEY, 'true');
  }

  window.getCurrentUser = getCurrentUser;

  // Init Auth Forms on login.html
  function initAuth() {
    const authContainer = document.querySelector('.auth-container');
    if (!authContainer) return;

    // Tab Switching
    const tabs = document.querySelectorAll('.auth-tab');
    const sections = document.querySelectorAll('.auth-section');

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        this.classList.add('active');
        const targetId = `${this.getAttribute('data-tab')}-form-section`;
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.classList.add('active');
        }
      });
    });

    // Check for query parameter (e.g. ?tab=signup or ?tab=register)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam === 'signup' || tabParam === 'register') {
        const signupBtn = document.querySelector('.auth-tab[data-tab="signup"]');
        if (signupBtn) signupBtn.click();
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    // Password Visibility Toggles
    document.querySelectorAll('.toggle-password').forEach(btn => {
      btn.addEventListener('click', function () {
        const input = this.previousElementSibling || this.parentElement.querySelector('input');
        if (!input) return;
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        this.textContent = isPassword ? '👁️‍🗨️' : '👁';
      });
    });

    // Password Strength Meter
    const signupPass = document.getElementById('signup-password');
    const strengthBar = document.getElementById('password-strength');
    if (signupPass && strengthBar) {
      signupPass.addEventListener('input', function () {
        const val = this.value;
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        strengthBar.className = 'password-strength';
        if (val.length === 0) {
          strengthBar.textContent = '';
        } else if (score <= 1) {
          strengthBar.classList.add('strength-weak');
          strengthBar.textContent = 'Weak password';
        } else if (score <= 3) {
          strengthBar.classList.add('strength-medium');
          strengthBar.textContent = 'Good password';
        } else {
          strengthBar.classList.add('strength-strong');
          strengthBar.textContent = 'Strong password';
        }
      });
    }

    // Login Form Validation & Submit
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;
        let hasError = false;

        if (!email) {
          showError('login-email-error', 'Please enter your email address.');
          hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showError('login-email-error', 'Please enter a valid email address.');
          hasError = true;
        }

        if (!password) {
          showError('login-password-error', 'Please enter your password.');
          hasError = true;
        } else if (password.length < 6) {
          showError('login-password-error', 'Password must be at least 6 characters.');
          hasError = true;
        }

        if (hasError) return;

        // Success login
        let user = getCurrentUser();
        if (user.email !== email) {
          user = { ...user, email: email, firstName: email.split('@')[0] };
        }
        saveCurrentUser(user);

        if (typeof window.showToast === 'function') {
          window.showToast(`Welcome back, ${user.firstName}!`, 'success');
        }

        setTimeout(() => {
          window.location.href = 'account.html';
        }, 800);
      });
    }

    // Signup Form Validation & Submit
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();

        const first = document.getElementById('signup-first').value.trim();
        const last = document.getElementById('signup-last').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const pass = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        const agree = document.getElementById('agree-terms');
        let hasError = false;

        if (!first) {
          showError('signup-first-error', 'First name is required.');
          hasError = true;
        }
        if (!last) {
          showError('signup-last-error', 'Last name is required.');
          hasError = true;
        }
        if (!email) {
          showError('signup-email-error', 'Email is required.');
          hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showError('signup-email-error', 'Please enter a valid email address.');
          hasError = true;
        }
        if (!pass || pass.length < 8) {
          showError('signup-password-error', 'Password must be at least 8 characters.');
          hasError = true;
        }
        if (pass !== confirm) {
          showError('signup-confirm-error', 'Passwords do not match.');
          hasError = true;
        }
        if (agree && !agree.checked) {
          showError('terms-error', 'You must agree to the Privacy Policy.');
          hasError = true;
        }

        if (hasError) return;

        const newUser = {
          firstName: first,
          lastName: last,
          email: email,
          phone: "+1 (555) 000-0000",
          dob: ""
        };
        saveCurrentUser(newUser);

        if (typeof window.showToast === 'function') {
          window.showToast('Account created! Welcome to NOAHVELLE.', 'success');
        }

        setTimeout(() => {
          window.location.href = 'account.html';
        }, 1000);
      });
    }

    function showError(elementId, message) {
      const el = document.getElementById(elementId);
      if (el) {
        el.textContent = message;
        el.style.display = 'block';
      }
    }

    function clearErrors() {
      document.querySelectorAll('.field-error').forEach(el => {
        el.textContent = '';
        el.style.display = 'none';
      });
    }
  }

  // Populate user data on account.html
  function populateAccountPage() {
    const user = getCurrentUser();
    const nameSpan = document.getElementById('customer-name');
    if (nameSpan) {
      nameSpan.textContent = user.firstName || 'Elena';
    }

    const firstInput = document.getElementById('first-name');
    const lastInput = document.getElementById('last-name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const dobInput = document.getElementById('dob');

    if (firstInput && !firstInput.value) firstInput.value = user.firstName || '';
    if (lastInput && !lastInput.value) lastInput.value = user.lastName || '';
    if (emailInput && !emailInput.value) emailInput.value = user.email || '';
    if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';
    if (dobInput && !dobInput.value && user.dob) dobInput.value = user.dob;

    // Handle Profile Form Submit
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const updated = {
          ...user,
          firstName: firstInput ? firstInput.value.trim() : user.firstName,
          lastName: lastInput ? lastInput.value.trim() : user.lastName,
          email: emailInput ? emailInput.value.trim() : user.email,
          phone: phoneInput ? phoneInput.value.trim() : user.phone,
          dob: dobInput ? dobInput.value : user.dob
        };
        saveCurrentUser(updated);
        if (nameSpan) nameSpan.textContent = updated.firstName;
        if (typeof window.showToast === 'function') {
          window.showToast('Profile information updated.', 'success');
        }
      });
    }

    // Handle Logout
    const logoutBtn = document.getElementById('logout-btn') || document.querySelector('.nav-logout a');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem(SESSION_KEY);
        if (typeof window.showToast === 'function') {
          window.showToast('You have been signed out.', 'info');
        }
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 600);
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAuth();
    populateAccountPage();
  });

})();
