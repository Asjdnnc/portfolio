/**
 * Modern Portfolio - Theme Management & Interactions
 */

(function() {
  'use strict';

  // ==========================================
  // Theme Management
  // ==========================================
  
  const ThemeManager = {
    // Get stored theme or detect system preference
    getInitialTheme: function() {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      
      // Check for system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
      
      return 'light';
    },

    // Apply theme to the document
    applyTheme: function(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      this.updateToggleButton(theme);
    },

    // Update toggle button text and icon
    updateToggleButton: function(theme) {
      const toggle = document.querySelector('.theme-toggle');
      if (!toggle) return;
      
      const icon = toggle.querySelector('.icon');
      const text = toggle.querySelector('.text');
      
      if (theme === 'dark') {
        icon.textContent = '☀️';
        if (text) text.textContent = 'Light';
      } else {
        icon.textContent = '🌙';
        if (text) text.textContent = 'Dark';
      }
    },

    // Toggle between light and dark themes
    toggleTheme: function() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      this.applyTheme(newTheme);
    },

    // Listen for system theme changes
    watchSystemTheme: function() {
      if (!window.matchMedia) return;
      
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      darkModeQuery.addEventListener('change', (e) => {
        // Only auto-switch if user hasn't manually set a preference
        const storedTheme = localStorage.getItem('theme');
        if (!storedTheme) {
          const newTheme = e.matches ? 'dark' : 'light';
          this.applyTheme(newTheme);
        }
      });
    },

    // Initialize theme system
    init: function() {
      const initialTheme = this.getInitialTheme();
      this.applyTheme(initialTheme);
      this.watchSystemTheme();
      
      // Set up toggle button
      const toggle = document.querySelector('.theme-toggle');
      if (toggle) {
        toggle.addEventListener('click', () => this.toggleTheme());
      }
    }
  };

  // ==========================================
  // Smooth Scrolling for Anchor Links
  // ==========================================
  
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ==========================================
  // Auto-Update Footer Year
  // ==========================================
  
  function updateFooterYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  // ==========================================
  // Scroll Animations
  // ==========================================
  
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements with animation class
    document.querySelectorAll('.project-card, .skill-item, .contact-item').forEach(el => {
      observer.observe(el);
    });
  }

  // ==========================================
  // Form Handling
  // ==========================================
  
  function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Here you would typically send data to a server
      // For now, just show success message
      
      // Show success message (you can customize this)
      alert('Thank you for your message! I\'ll get back to you soon.');
      this.reset();
    });
  }

  // ==========================================
  // Initialize Everything
  // ==========================================
  
  function init() {
    // Initialize theme system
    ThemeManager.init();
    
    // Initialize other features
    updateFooterYear();
    initSmoothScroll();
    
    // Wait for DOM to be ready for animations
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initFormHandling();
      });
    } else {
      initScrollAnimations();
      initFormHandling();
    }
  }

  // Start the application
  init();

})();
