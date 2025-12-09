/**
 * Modern Portfolio - Theme Management & Interactions
 */

(function() {
  'use strict';

  // ==========================================
  // Theme Management
  // ==========================================
  
  const ThemeManager = {
    // Get stored theme or detect system preference (defaults to dark)
    getInitialTheme: function() {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme;
      }
      
      // Check for system preference, but default to dark theme
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
      
      return 'dark';
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
  // Scroll Animations with Stagger Effect
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

    // Observe elements with stagger animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.animationDelay = `${index * 0.1}s`;
      observer.observe(card);
    });

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.animationDelay = `${index * 0.15}s`;
      observer.observe(item);
    });

    // Observe other elements
    document.querySelectorAll('.contact-item').forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  }

  // ==========================================
  // Parallax Effect on Mouse Move
  // ==========================================
  
  function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const codeBlock = document.querySelector('.code-block');
      if (codeBlock) {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        codeBlock.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
  }

  // ==========================================
  // Add Particle Effect to Hero
  // ==========================================
  
  function addParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create subtle floating particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: var(--accent);
        border-radius: 50%;
        opacity: ${Math.random() * 0.3 + 0.1};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
        pointer-events: none;
      `;
      hero.appendChild(particle);
    }
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
        initParallaxEffect();
        addParticleEffect();
      });
    } else {
      initScrollAnimations();
      initFormHandling();
      initParallaxEffect();
      addParticleEffect();
    }
  }

  // Start the application
  init();

})();
