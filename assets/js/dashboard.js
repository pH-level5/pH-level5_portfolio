// ================================
// TECH CREATOR DASHBOARD
// Interactive Dashboard JavaScript
// ================================

(function() {
  'use strict';

  // ================================
  // INITIALIZATION
  // ================================

  document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initExpandableText();
    init3DTilt();
    initCounters();
    initCanvasBackground();
    initScrollAnimations();
    initBlogPostViewer();
    console.log('✓ Dashboard initialized');
  });

  // ================================
  // NAVIGATION SYSTEM
  // ================================

  function initNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.dashboard-section');

    navTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const targetSection = this.dataset.section;

        // Update active tab
        navTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        // Update active section with fade animation
        sections.forEach(section => {
          if (section.id === targetSection) {
            section.style.display = 'block';
            setTimeout(() => {
              section.classList.add('active');
            }, 10);
          } else {
            section.classList.remove('active');
            setTimeout(() => {
              if (!section.classList.contains('active')) {
                section.style.display = 'none';
              }
            }, 300);
          }
        });

        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // ================================
  // EXPANDABLE TEXT WITH TYPEWRITER (Fast Character-by-Character)
  // ================================

  function initExpandableText() {
    const expandableTexts = document.querySelectorAll('.expandable-text');

    expandableTexts.forEach(text => {
      const btn = text.querySelector('.read-more-btn');
      if (!btn) return;

      const preview = text.querySelector('.text-preview');
      const full = text.querySelector('.text-full');
      if (!preview || !full) return;

      let isExpanded = false;
      let typingInterval = null;

      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (!isExpanded) {
          // Expand: Show full text with fast typewriter effect
          preview.style.display = 'none';
          
          // Store the original text
          const fullText = full.textContent;
          full.textContent = '';
          full.classList.add('typing');
          full.style.display = 'block';
          
          // Fast typewriter effect (8ms per character)
          let charIndex = 0;
          typingInterval = setInterval(() => {
            if (charIndex < fullText.length) {
              full.textContent += fullText.charAt(charIndex);
              charIndex++;
            } else {
              clearInterval(typingInterval);
              full.classList.remove('typing');
              full.classList.add('typed');
            }
          }, 8); // Very fast - 8 milliseconds per character

          // Update button text and icon
          const icon = btn.querySelector('i');
          if (icon) {
            icon.className = 'fas fa-chevron-down';
          }
          const textNode = Array.from(btn.childNodes).find(node => node.nodeType === 3);
          if (textNode) {
            textNode.textContent = ' READ LESS';
          }
          
          isExpanded = true;
        } else {
          // Collapse: Show preview
          if (typingInterval) {
            clearInterval(typingInterval);
          }
          full.classList.remove('typing', 'typed');
          full.style.display = 'none';
          preview.style.display = 'block';
          
          // Update button text and icon
          const icon = btn.querySelector('i');
          if (icon) {
            icon.className = 'fas fa-chevron-right';
          }
          const textNode = Array.from(btn.childNodes).find(node => node.nodeType === 3);
          if (textNode) {
            textNode.textContent = ' READ MORE';
          }
          
          isExpanded = false;
        }
      });
    });
  }

  // ================================
  // 3D TILT EFFECT ON CARDS (DISABLED)
  // ================================

  function init3DTilt() {
    // 3D tilt effect disabled per user request
    // Cards will still have hover effects via CSS
    console.log('3D tilt disabled - using CSS hover effects instead');
  }

  // ================================
  // ANIMATED COUNTERS
  // ================================

  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          animateCounter(entry.target);
          entry.target.dataset.counted = 'true';
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  // ================================
  // CANVAS BACKGROUND ANIMATION
  // ================================

  function initCanvasBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(76, 194, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Draw lines to nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(76, 194, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Mouse interaction
    canvas.addEventListener('mousemove', function(e) {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          particle.x -= dx / 50;
          particle.y -= dy / 50;
        }
      });
    });
  }

  // ================================
  // SCROLL ANIMATIONS
  // ================================

  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  }

  // ================================
  // KEYBOARD NAVIGATION
  // ================================

  document.addEventListener('keydown', function(e) {
    const navTabs = Array.from(document.querySelectorAll('.nav-tab'));
    const activeIndex = navTabs.findIndex(tab => tab.classList.contains('active'));

    // Left/Right arrows for tab navigation
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = activeIndex > 0 ? activeIndex - 1 : navTabs.length - 1;
      navTabs[prevIndex].click();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = activeIndex < navTabs.length - 1 ? activeIndex + 1 : 0;
      navTabs[nextIndex].click();
    }
  });

  // ================================
  // STORE DISPLAY INTERACTION
  // ================================

  const storeDisplay = document.getElementById('storeDisplay');
  if (storeDisplay) {
    let isPaused = false;

    storeDisplay.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
      isPaused = true;
    });

    storeDisplay.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
      isPaused = false;
    });

    // Manual rotation on drag
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;

    storeDisplay.addEventListener('mousedown', function(e) {
      isDragging = true;
      startX = e.clientX;
      this.style.animation = 'none';
    });

    document.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      
      const diff = e.clientX - startX;
      const rotation = currentRotation + (diff * 0.5);
      storeDisplay.style.transform = `rotateY(${rotation}deg)`;
    });

    document.addEventListener('mouseup', function(e) {
      if (!isDragging) return;
      
      isDragging = false;
      const diff = e.clientX - startX;
      currentRotation += (diff * 0.5);
      
      // Resume animation after a delay
      setTimeout(() => {
        if (!isPaused) {
          storeDisplay.style.animation = 'rotate-display 20s linear infinite';
        }
      }, 1000);
    });
  }

  // ================================
  // SMOOTH SCROLL FOR LINKS
  // ================================

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ================================
  // PERFORMANCE OPTIMIZATION
  // ================================

  // Throttle function for performance
  function throttle(func, delay) {
    let timeoutId;
    let lastRan;
    return function(...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
          if ((Date.now() - lastRan) >= delay) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, delay - (Date.now() - lastRan));
      }
    };
  }

  // Debounce function for performance
  function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // Optimize resize events
  window.addEventListener('resize', debounce(function() {
    // Recalculate any dynamic sizes here
    console.log('Window resized');
  }, 250));

  // ================================
  // EASTER EGG: KONAMI CODE
  // ================================

  let konamiCode = [];
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-konamiSequence.length);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
      activateEasterEgg();
      konamiCode = [];
    }
  });

  function activateEasterEgg() {
    // Add special visual effect
    document.body.style.animation = 'rainbow-bg 2s ease-in-out';
    
    // Create floating symbols
    for (let i = 0; i < 20; i++) {
      createFloatingSymbol();
    }

    console.log('🎉 Easter egg activated!');

    setTimeout(() => {
      document.body.style.animation = '';
    }, 2000);
  }

  function createFloatingSymbol() {
    const symbols = ['◆', '◈', '◉', '▣', '▲', '●', '◇', '♦'];
    const symbol = document.createElement('div');
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.cssText = `
      position: fixed;
      left: ${Math.random() * 100}vw;
      top: ${Math.random() * 100}vh;
      font-size: ${Math.random() * 3 + 1}rem;
      color: rgba(76, 194, 255, ${Math.random() * 0.5 + 0.5});
      pointer-events: none;
      z-index: 9999;
      animation: float-away 3s ease-out forwards;
    `;
    document.body.appendChild(symbol);

    setTimeout(() => symbol.remove(), 3000);
  }

  // Add CSS for easter egg animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes rainbow-bg {
      0%, 100% { filter: hue-rotate(0deg); }
      50% { filter: hue-rotate(180deg); }
    }
    
    @keyframes float-away {
      0% {
        transform: translateY(0) rotate(0deg) scale(1);
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg) scale(0);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // ================================
  // LOADING STATE
  // ================================

  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('✓ All resources loaded');
  });

  // ================================
  // BLOG POST VIEWER (Markdown Support)
  // ================================

  function initBlogPostViewer() {
    const readFullPostLinks = document.querySelectorAll('.read-full-post');
    const fullPostSection = document.getElementById('fullpost');
    const postContent = document.getElementById('postContent');
    const postDate = document.getElementById('postDate');
    const postReadtime = document.getElementById('postReadtime');
    const fullPostTab = document.getElementById('fullPostTab');

    readFullPostLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const postId = this.dataset.postId;
        loadBlogPost(postId);
      });
    });

    async function loadBlogPost(postId) {
      // Show loading
      postContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading post...</div>';
      
      // Switch to full post section
      document.querySelector('[data-section="fullpost"]').click();
      
      try {
        // Try to load markdown file
        const response = await fetch(`blog/posts/${postId}.md`);
        
        if (!response.ok) {
          throw new Error('Post not found');
        }
        
        const markdown = await response.text();
        
        // Parse markdown to HTML using marked.js
        if (typeof marked !== 'undefined') {
          const html = marked.parse(markdown);
          postContent.innerHTML = html;
        } else {
          // Fallback: display as plain text with basic formatting
          postContent.innerHTML = `<pre>${markdown}</pre>`;
        }
        
        // Extract and display metadata from blog card
        const blogCard = document.querySelector(`[data-post-id="${postId}"]`).closest('.blog-card');
        if (blogCard) {
          const dateElement = blogCard.querySelector('.card-date');
          const readTimeElement = blogCard.querySelector('.read-time');
          
          if (dateElement) {
            postDate.innerHTML = dateElement.innerHTML;
          }
          if (readTimeElement) {
            postReadtime.innerHTML = readTimeElement.innerHTML;
          }
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
      } catch (error) {
        console.error('Error loading blog post:', error);
        postContent.innerHTML = `
          <div style="text-align: center; padding: 3rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--color-warning); margin-bottom: 1rem;"></i>
            <h2>Post Not Found</h2>
            <p style="color: var(--color-text-dim); margin: 1rem 0;">The blog post file <code>blog/posts/${postId}.md</code> could not be loaded.</p>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">Create a markdown file at this location to display the full post.</p>
            <button class="back-to-blog-btn" onclick="document.querySelector('[data-section=blog]').click()" style="margin-top: 2rem;">
              <i class="fas fa-arrow-left"></i> Back to Blog
            </button>
          </div>
        `;
      }
    }

    // Make "Back to Blog" tab functional
    if (fullPostTab) {
      fullPostTab.addEventListener('click', function() {
        document.querySelector('[data-section="blog"]').click();
      });
    }
  }

  // ================================
  // UTILITY FUNCTIONS
  // ================================

  // Get random number in range
  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Lerp (linear interpolation)
  function lerp(start, end, factor) {
    return start + (end - start) * factor;
  }

  // Map value from one range to another
  function map(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
  }

  // ================================
  // ACCESSIBILITY ENHANCEMENTS
  // ================================

  // Add skip to content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-accent);
    color: var(--color-bg);
    padding: 8px;
    z-index: 10000;
    text-decoration: none;
  `;
  skipLink.addEventListener('focus', function() {
    this.style.top = '0';
  });
  skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
  });
  document.body.prepend(skipLink);

  // Announce page changes to screen readers
  function announcePageChange(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }

  // ================================
  // ERROR HANDLING
  // ================================

  window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
  });

  // ================================
  // EXPORT FOR TESTING
  // ================================

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      throttle,
      debounce,
      randomRange,
      lerp,
      map
    };
  }

})();
