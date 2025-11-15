// ================================
// TECH CREATOR DASHBOARD
// Interactive Dashboard JavaScript
//
// (c) 2025 Plu101 – All rights reserved.
// Custom UI logic and blog parsing workflow are proprietary.
// Third-party libraries (e.g. marked.js, Font Awesome) remain under
// their own licenses.
// ================================

(function() {
  'use strict';

  // ================================
  // INITIALIZATION
  // ================================

  document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initExpandableText();
    initCounters();
    initCanvasBackground();
    initScrollAnimations();
    
    // Ensure fullpost section is hidden initially
    const fullpostSection = document.getElementById('fullpost');
    if (fullpostSection) {
      fullpostSection.style.display = 'none';
      fullpostSection.classList.remove('active');
    }
    
    initAutoBlogGeneration(); // Auto-generate blog cards from markdown files
    initBlogPostViewer();
    initDownloadModal(); // Initialize app download modal with Ko-fi prompt
    initDetailsModal(); // Initialize app details modal
    initProjectsBanner(); // Initialize projects banner animations
    initProjectsLoader(); // Load and render projects from JSON
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
  // EXPANDABLE TEXT WITH TYPEWRITER (Simplified)
  // ================================

  const TYPING_SPEED = 25; // milliseconds per character
  const TRUNCATE_LENGTH = 100; // characters to show in collapsed state

  function truncateText(text) {
    if (!text) return '';
    if (text.length <= TRUNCATE_LENGTH) {
      return text;
    }
    return text.substring(0, TRUNCATE_LENGTH).trimEnd() + '...';
  }

  function initExpandableText() {
    // Initialize all expandable text elements with truncated content
    initializeTruncatedText();
    
    // Use event delegation for dynamically generated content
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.read-more-btn');
      if (!btn) return;

      e.preventDefault();
      e.stopPropagation();

      const expandableText = btn.closest('.expandable-text');
      if (!expandableText) return;

      const textElement = expandableText.querySelector('.text-content');
      if (!textElement) return;

      // Store the full text on first interaction
      if (!expandableText.dataset.fullText) {
        expandableText.dataset.fullText = textElement.textContent.trim();
      }
      const fullText = expandableText.dataset.fullText;

      // Check if currently expanded
      const isExpanded = expandableText.getAttribute('data-expanded') === 'true';

      if (!isExpanded) {
        // EXPAND: Show full text with typing animation
        expandableText.setAttribute('data-expanded', 'true');
        
        // Clear text and start typing
        textElement.textContent = '';
        textElement.classList.add('typing');
        
        // Ensure any previous typing interval is cleared before starting
        const activeInterval = expandableText.dataset.typingInterval;
        if (activeInterval) {
          clearInterval(parseInt(activeInterval, 10));
          delete expandableText.dataset.typingInterval;
        }

        // Typewriter effect
        let charIndex = 0;
        const typingInterval = setInterval(() => {
          if (charIndex < fullText.length) {
            textElement.textContent += fullText.charAt(charIndex);
            charIndex++;
          } else {
            clearInterval(typingInterval);
            delete expandableText.dataset.typingInterval;
            textElement.classList.remove('typing');
            textElement.classList.add('typed');
          }
        }, TYPING_SPEED);

        // Store interval ID to clear if needed
        expandableText.dataset.typingInterval = typingInterval.toString();

        // Update button
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fas fa-chevron-down';
        const textNode = Array.from(btn.childNodes).find(node => node.nodeType === 3);
        if (textNode) textNode.textContent = ' READ LESS';
        
      } else {
        // COLLAPSE: Show truncated text
        const typingInterval = expandableText.dataset.typingInterval;
        if (typingInterval) {
          clearInterval(parseInt(typingInterval, 10));
          delete expandableText.dataset.typingInterval;
        }
        
        expandableText.setAttribute('data-expanded', 'false');
        textElement.classList.remove('typing', 'typed');
        
        // Restore truncated version
        textElement.textContent = truncateText(fullText);

        // Update button
        const icon = btn.querySelector('i');
        if (icon) icon.className = 'fas fa-chevron-right';
        const textNode = Array.from(btn.childNodes).find(node => node.nodeType === 3);
        if (textNode) textNode.textContent = ' READ MORE';
      }
    });
  }

  // Helper function to initialize all text in truncated state
  function initializeTruncatedText() {
    const expandableTexts = document.querySelectorAll('.expandable-text');
    
    expandableTexts.forEach(expandableText => {
      const textElement = expandableText.querySelector('.text-content');
      if (!textElement) return;
      
      // Store full text
      const fullText = textElement.textContent.trim();
      expandableText.dataset.fullText = fullText;
      
      // Set initial truncated text
      textElement.textContent = truncateText(fullText);
      
      // Ensure expanded state is false
      expandableText.setAttribute('data-expanded', 'false');
    });
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
        ctx.fillStyle = `rgba(119, 141, 169, ${this.opacity})`;
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
            ctx.strokeStyle = `rgba(119, 141, 169, ${0.1 * (1 - distance / 150)})`;
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
      color: rgba(119, 141, 169, ${Math.random() * 0.5 + 0.5});
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
  // AUTO BLOG GENERATION FROM MARKDOWN
  // ================================

  async function initAutoBlogGeneration() {
    // List of blog post files to load (add new posts here)
    // Or fetch from a blog-index.json file for full automation
    const blogPosts = [
      '10k-downloads.md',
      '3d-modeling-basics.md',
      // Add more posts here, or load from blog-index.json
    ];

    const blogTimeline = document.querySelector('.blog-timeline');
    if (!blogTimeline) return;

    // Check if we're using file:// protocol
    if (window.location.protocol === 'file:') {
      console.warn('⚠️ BLOG SYSTEM WARNING:');
      console.warn('You are viewing this page using the file:// protocol.');
      console.warn('Blog posts cannot load due to CORS restrictions.');
      console.warn('');
      console.warn('SOLUTION: Use a local web server instead:');
      console.warn('  • Python: python -m http.server 8000');
      console.warn('  • Node.js: npx serve');
      console.warn('  • PHP: php -S localhost:8000');
      console.warn('');
      console.warn('Then open: http://localhost:8000');
      
      // Show a user-friendly message in the timeline
      blogTimeline.innerHTML = `
        <div style="text-align: center; padding: 3rem; max-width: 600px; margin: 0 auto;">
          <div style="font-size: 4rem; margin-bottom: 1rem;">⚠️</div>
          <h2 style="color: var(--color-accent); margin-bottom: 1rem;">Local Server Required</h2>
          <p style="color: var(--color-text-dim); margin-bottom: 2rem;">
            Blog posts cannot load when opening HTML files directly (file:// protocol).
            This is a browser security restriction.
          </p>
        <div style="background: rgba(119, 141, 169, 0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
            <h3 style="color: var(--color-accent); margin-bottom: 1rem;">Quick Fix:</h3>
            <p style="color: var(--color-text); font-family: 'IBM Plex Mono', monospace; margin-bottom: 0.5rem;">
              <strong>Python:</strong> python -m http.server 8000
            </p>
            <p style="color: var(--color-text); font-family: 'IBM Plex Mono', monospace; margin-bottom: 0.5rem;">
              <strong>Node.js:</strong> npx serve
            </p>
            <p style="color: var(--color-text); font-family: 'IBM Plex Mono', monospace;">
              <strong>PHP:</strong> php -S localhost:8000
            </p>
          </div>
          <p style="color: var(--color-text-muted); font-size: 0.9rem;">
            Then open <code style="background: rgba(255,255,255,0.1); padding: 0.2rem 0.5rem; border-radius: 4px;">http://localhost:8000</code> in your browser
          </p>
        </div>
      `;
      return; // Exit early
    }

    // Check if there's a blog-index.json file for automatic discovery
    try {
      const indexResponse = await fetch('blog/blog-index.json');
      if (indexResponse.ok) {
        const index = await indexResponse.json();
        blogPosts.length = 0; // Clear default list
        blogPosts.push(...index.posts);
      }
    } catch (e) {
      console.log('No blog-index.json found, using manual list');
    }

    // Clear existing timeline (keep the line)
    const timelineLine = blogTimeline.querySelector('.timeline-line');
    blogTimeline.innerHTML = '';
    if (timelineLine) {
      blogTimeline.appendChild(timelineLine);
    }

    let postIndex = 0;
    for (const postFile of blogPosts) {
      try {
        const postId = postFile.replace('.md', '');
        const response = await fetch(`blog/posts/${postFile}`);
        
        if (!response.ok) continue;
        
        const content = await response.text();
        const metadata = parseYAMLFrontmatter(content);
        
        // Generate blog card from metadata
        const blogCard = createBlogCard(metadata, postId, postIndex);
        blogTimeline.appendChild(blogCard);
        
        postIndex++;
      } catch (error) {
        console.error(`Error loading blog post ${postFile}:`, error);
      }
    }

    console.log(`✓ Loaded ${postIndex} blog posts`);
  }

  // Parse YAML frontmatter from markdown
  function parseYAMLFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    
    if (!match) {
      // No frontmatter, extract from content
      return extractMetadataFromContent(content);
    }

    const yamlText = match[1];
    const markdownContent = match[2];
    
    const metadata = {};
    const lines = yamlText.split('\n');
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }
      
      // Parse arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.substring(1, value.length - 1)
          .split(',')
          .map(v => v.trim().replace(/['"]/g, ''));
      }
      
      metadata[key] = value;
    }
    
    // Add markdown content
    metadata.content = markdownContent;
    
    return metadata;
  }

  // Extract metadata from content if no frontmatter
  function extractMetadataFromContent(content) {
    const lines = content.split('\n');
    const metadata = {
      title: 'Untitled Post',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: '',
      tags: [],
      category: 'General',
      image: 'fas fa-blog',
      readTime: '5 min read',
      content: content
    };
    
    // Extract title from first heading
    for (const line of lines) {
      if (line.startsWith('# ')) {
        metadata.title = line.substring(2).trim();
        break;
      }
    }
    
    // Extract description from first paragraph
    const paragraphs = content.split('\n\n');
    for (const para of paragraphs) {
      if (para.trim() && !para.startsWith('#')) {
        metadata.description = para.trim().substring(0, 150) + '...';
        break;
      }
    }
    
    // Extract tags from end of document
    const tagsMatch = content.match(/\*\*Tags:\*\*\s*(.+)/i);
    if (tagsMatch) {
      metadata.tags = tagsMatch[1].split(',').map(t => t.trim());
    }
    
    // Estimate read time
    const wordCount = content.split(/\s+/).length;
    const readMinutes = Math.ceil(wordCount / 200);
    metadata.readTime = `${readMinutes} min read`;
    
    return metadata;
  }

  // Create blog card element from metadata
  function createBlogCard(metadata, postId, index) {
    const article = document.createElement('article');
    article.className = `blog-post ${index % 2 === 0 ? 'blog-post--left' : 'blog-post--right'}`;
    article.setAttribute('data-post', index + 1);
    
    // Determine icon based on category or default
    const iconClass = metadata.icon || metadata.image || 'fas fa-blog';
    const statusLabel = metadata.status || metadata.category || 'POST';
    
    article.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="dashboard-card card-3d blog-card">
        <div class="blog-thumbnail">
          <div class="thumbnail-placeholder"><i class="${iconClass}"></i></div>
          <div class="blog-status"><i class="fas fa-circle"></i> ${statusLabel.toUpperCase()}</div>
        </div>
        <div class="blog-card-header">
          <span class="card-date"><i class="far fa-calendar"></i> ${metadata.date || 'RECENT'}</span>
          <h3>${metadata.title || 'Untitled Post'}</h3>
        </div>
        <div class="card-body">
          <p>${metadata.description || metadata.excerpt || 'Click to read the full post...'}</p>
          ${metadata.tags && metadata.tags.length > 0 ? `
          <div class="blog-tags">
            ${metadata.tags.map(tag => `<span class="tag"><i class="fas fa-tag"></i> ${tag}</span>`).join('')}
          </div>
          ` : ''}
        </div>
        <div class="card-footer">
          <a class="card-link read-full-post" href="#" data-post-id="${postId}"><i class="fas fa-arrow-right"></i> READ FULL POST</a>
          <span class="read-time"><i class="far fa-clock"></i> ${metadata.readTime || '5 min read'}</span>
        </div>
      </div>
    `;
    
    return article;
  }

  // ================================
  // BLOG POST VIEWER (Markdown Support)
  // ================================

  function initBlogPostViewer() {
    const fullPostSection = document.getElementById('fullpost');
    const postContent = document.getElementById('postContent');
    const postDate = document.getElementById('postDate');
    const postReadtime = document.getElementById('postReadtime');
    const fullPostTab = document.getElementById('fullPostTab');

    // Use event delegation for dynamically generated blog cards
    document.addEventListener('click', function(e) {
      const link = e.target.closest('.read-full-post');
      if (link) {
        e.preventDefault();
        const postId = link.dataset.postId;
        loadBlogPost(postId);
      }
    });

    function applyDocumentPresentation(root) {
      if (!root) return;

      if (!root.classList.contains('document-body')) {
        root.classList.add('document-body');
      }

      const title = root.querySelector('h1');
      if (title) {
        title.classList.add('document-title');
      }

      const leadParagraph = Array.from(root.querySelectorAll('p')).find(paragraph => paragraph.textContent.trim().length > 0);
      if (leadParagraph) {
        leadParagraph.classList.add('document-lead');
      }

      root.querySelectorAll('h2').forEach(heading => heading.classList.add('section-heading'));
      root.querySelectorAll('h3').forEach(heading => heading.classList.add('subsection-heading'));
      root.querySelectorAll('blockquote').forEach(block => block.classList.add('document-quote'));

      root.querySelectorAll('table').forEach(table => {
        if (!table.closest('.table-scroll')) {
          const wrapper = document.createElement('div');
          wrapper.className = 'table-scroll';
          table.parentNode.insertBefore(wrapper, table);
          wrapper.appendChild(table);
        }
      });

      root.querySelectorAll('figure').forEach(figure => figure.classList.add('document-figure'));

      root.querySelectorAll('img').forEach(image => {
        if (!image.hasAttribute('loading')) {
          image.setAttribute('loading', 'lazy');
        }
        if (!image.hasAttribute('decoding')) {
          image.setAttribute('decoding', 'async');
        }
      });
    }

    async function loadBlogPost(postId) {
      // Hide blog section and show full post section
      const blogSection = document.getElementById('blog');
      const fullPostSection = document.getElementById('fullpost');
      
      if (blogSection) {
        blogSection.classList.remove('active');
        blogSection.style.display = 'none';
      }
      
      if (fullPostSection) {
        fullPostSection.style.display = 'block';
        setTimeout(() => {
          fullPostSection.classList.add('active');
        }, 10);
      }
      
      // Update nav tabs (hide blog, show back button if needed)
      const blogTab = document.querySelector('[data-section="blog"]');
      const fullPostTab = document.getElementById('fullPostTab');
      if (blogTab) blogTab.classList.remove('active');
      if (fullPostTab) fullPostTab.classList.add('active');
      
      // Show loading
      postContent.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i> Loading post...</div>';
      
      // Scroll to top immediately
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      try {
        // Try to load markdown file
        const response = await fetch(`blog/posts/${postId}.md`);
        
        if (!response.ok) {
          throw new Error('Post not found');
        }
        
        const markdown = await response.text();
        
        // Strip YAML frontmatter before rendering
        const markdownWithoutFrontmatter = markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
        
        // Parse markdown to HTML using marked.js
        if (typeof marked !== 'undefined') {
          const html = marked.parse(markdownWithoutFrontmatter);
          const documentBody = document.createElement('div');
          documentBody.className = 'document-body';
          documentBody.innerHTML = html;

          postContent.innerHTML = '';
          postContent.appendChild(documentBody);

          applyDocumentPresentation(documentBody);
        } else {
          // Fallback: display as plain text with basic formatting
          postContent.innerHTML = `<pre>${markdownWithoutFrontmatter}</pre>`;
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
        
        // Scroll to top again after content loads
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
        
      } catch (error) {
        console.error('Error loading blog post:', error);
        postContent.innerHTML = `
          <div style="text-align: center; padding: 3rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: var(--color-warning); margin-bottom: 1rem;"></i>
            <h2>Post Not Found</h2>
            <p style="color: var(--color-text-dim); margin: 1rem 0;">The blog post file <code>blog/posts/${postId}.md</code> could not be loaded.</p>
            <p style="color: var(--color-text-muted); font-size: 0.9rem;">Create a markdown file at this location to display the full post.</p>
            <button class="back-to-blog-btn" style="margin-top: 2rem; padding: 0.8rem 1.5rem; background: var(--color-accent); color: var(--color-bg); border: none; border-radius: 4px; cursor: pointer;">
              <i class="fas fa-arrow-left"></i> Back to Blog
            </button>
          </div>
        `;
      }
    }

    // Make "Back to Blog" button functional
    document.addEventListener('click', function(e) {
      if (e.target.closest('.back-to-blog-btn') || e.target.closest('#fullPostTab')) {
        e.preventDefault();
        
        // Hide fullpost section
        const fullPostSection = document.getElementById('fullpost');
        const blogSection = document.getElementById('blog');
        
        if (fullPostSection) {
          fullPostSection.classList.remove('active');
          setTimeout(() => {
            fullPostSection.style.display = 'none';
          }, 300);
        }
        
        // Show blog section
        if (blogSection) {
          blogSection.style.display = 'block';
          setTimeout(() => {
            blogSection.classList.add('active');
          }, 10);
        }
        
        // Update nav tabs
        const blogTab = document.querySelector('[data-section="blog"]');
        const fullPostTab = document.getElementById('fullPostTab');
        if (blogTab) blogTab.classList.add('active');
        if (fullPostTab) fullPostTab.classList.remove('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ================================
  // APP DOWNLOAD MODAL WITH KO-FI SUPPORT
  // ================================

  function initDownloadModal() {
    const downloadBtn = document.getElementById('downloadAppBtn');
    const modal = document.getElementById('downloadModal');
    const continueBtn = document.getElementById('continueDownloadBtn');
    const closeBtn = modal?.querySelector('.download-modal__close');
    const backdrop = modal?.querySelector('.download-modal__backdrop');
    const kofiBtn = document.getElementById('kofiSupportBtn');

    // Configuration - Update this when you upload your actual app file
    const APP_CONFIG = {
      version: '1.0.0',
      fileName: 'my-app-1.0.0.zip',
      // For local files (small apps):
      downloadUrl: 'assets/downloads/my-app-1.0.0.zip',
      // For GitHub Releases (recommended for larger apps):
      // downloadUrl: 'https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v1.0.0/my-app-1.0.0.zip',
      // For external CDN:
      // downloadUrl: 'https://your-cdn-url.com/downloads/my-app-1.0.0.zip',
    };

    function showModal() {
      if (!modal) return;
      modal.setAttribute('aria-hidden', 'false');
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      // Focus trap
      const firstFocusable = modal.querySelector('button, a');
      if (firstFocusable) firstFocusable.focus();
      
      announcePageChange('Download support modal opened');
    }

    function hideModal() {
      if (!modal) return;
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('is-open');
      document.body.style.overflow = ''; // Restore scrolling
      announcePageChange('Download support modal closed');
    }

    function triggerDownload() {
      const a = document.createElement('a');
      a.href = APP_CONFIG.downloadUrl;
      a.download = APP_CONFIG.fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      
      // Clean up and show confirmation
      setTimeout(() => {
        document.body.removeChild(a);
        announcePageChange(`Download started: ${APP_CONFIG.fileName}`);
        
        // Show success message (optional)
        showDownloadConfirmation();
      }, 100);
    }

    function showDownloadConfirmation() {
      const confirmation = document.createElement('div');
      confirmation.className = 'download-confirmation';
      confirmation.innerHTML = `
        <div class="confirmation-content">
          <i class="fas fa-check-circle"></i>
          <span>Download started! Check your downloads folder.</span>
        </div>
      `;
      confirmation.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(76, 175, 80, 0.95);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInUp 0.3s ease-out;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      `;
      
      document.body.appendChild(confirmation);
      
      setTimeout(() => {
        confirmation.style.animation = 'slideOutDown 0.3s ease-in';
        setTimeout(() => confirmation.remove(), 300);
      }, 3000);
    }

    // Event: Show modal when download button is clicked
    if (downloadBtn) {
      downloadBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showModal();
      });
    }

    // Event: Continue to download (skip Ko-fi)
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        hideModal();
        triggerDownload();
      });
    }

    // Event: Ko-fi button clicked
    if (kofiBtn) {
      kofiBtn.addEventListener('click', () => {
        // Ko-fi link opens in new tab automatically
        // After a short delay, offer download
        setTimeout(() => {
          hideModal();
          triggerDownload();
        }, 500);
      });
    }

    // Event: Close modal button
    if (closeBtn) {
      closeBtn.addEventListener('click', hideModal);
    }

    // Event: Click backdrop to close
    if (backdrop) {
      backdrop.addEventListener('click', hideModal);
    }

    // Event: Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
        hideModal();
      }
    });

    console.log('✓ Download modal initialized');
  }

  // ================================
  // APP DETAILS MODAL
  // ================================

  function initDetailsModal() {
    const detailsBtn = document.getElementById('viewDetailsBtn');
    const detailsModal = document.getElementById('detailsModal');
    const closeBtn = detailsModal?.querySelector('.download-modal__close');
    const backdrop = detailsModal?.querySelector('.download-modal__backdrop');
    const downloadFromDetailsBtn = document.getElementById('downloadFromDetailsBtn');

    function showDetailsModal() {
      if (!detailsModal) return;
      detailsModal.setAttribute('aria-hidden', 'false');
      detailsModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      
      const firstFocusable = detailsModal.querySelector('button, a');
      if (firstFocusable) firstFocusable.focus();
      
      announcePageChange('App details modal opened');
    }

    function hideDetailsModal() {
      if (!detailsModal) return;
      detailsModal.setAttribute('aria-hidden', 'true');
      detailsModal.classList.remove('is-open');
      document.body.style.overflow = '';
      announcePageChange('App details modal closed');
    }

    // Event: Show details modal
    if (detailsBtn) {
      detailsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showDetailsModal();
      });
    }

    // Event: Download from details modal
    if (downloadFromDetailsBtn) {
      downloadFromDetailsBtn.addEventListener('click', () => {
        hideDetailsModal();
        // Trigger the download modal with Ko-fi prompt
        setTimeout(() => {
          const downloadModal = document.getElementById('downloadModal');
          if (downloadModal) {
            downloadModal.setAttribute('aria-hidden', 'false');
            downloadModal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
          }
        }, 300);
      });
    }

    // Event: Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', hideDetailsModal);
    }

    // Event: Click backdrop to close
    if (backdrop) {
      backdrop.addEventListener('click', hideDetailsModal);
    }

    // Event: Escape key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && detailsModal?.classList.contains('is-open')) {
        hideDetailsModal();
      }
    });

    // Handle inline links that might close modal
    const inlineLinks = detailsModal?.querySelectorAll('.inline-link');
    inlineLinks?.forEach(link => {
      link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) {
          hideDetailsModal();
        }
      });
    });

    console.log('✓ Details modal initialized');
  }

  // ================================
  // PROJECTS BANNER ANIMATION
  // ================================

  function initProjectsBanner() {
    const bannerParticles = document.getElementById('bannerParticles');
    if (!bannerParticles) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'banner-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: var(--color-accent);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        animation: floatParticle ${Math.random() * 10 + 5}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      bannerParticles.appendChild(particle);
    }

    // Add particle animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatParticle {
        0%, 100% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
        }
      }
    `;
    document.head.appendChild(style);

    console.log('✓ Projects banner initialized');
  }

  // ================================
  // PROJECTS LOADER (Dynamic from JSON)
  // ================================

  async function initProjectsLoader() {
    try {
      // Load projects data
      const response = await fetch('projects/projects.json');
      if (!response.ok) {
        console.warn('Projects JSON not found, using inline projects');
        return;
      }

      const projectsData = await response.json();
      
      // Render categorized projects
      renderProjectCategories(projectsData);
      
      // Update banner stats
      updateBannerStats(projectsData);
      
      console.log('✓ Projects loaded from JSON');
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  }

  function renderProjectCategories(projectsData) {
    const categoriesContainer = document.getElementById('projectsCategories');
    if (!categoriesContainer || !projectsData.categories) return;

    categoriesContainer.innerHTML = '';

    Object.entries(projectsData.categories).forEach(([categoryId, categoryData]) => {
      const categorySection = document.createElement('div');
      categorySection.className = 'project-category';
      categorySection.id = `category-${categoryId}`;

      const projectsCount = categoryData.projects.length;
      
      categorySection.innerHTML = `
        <div class="category-header">
          <div class="category-title-group">
            <div class="category-icon">
              <i class="${categoryData.icon}"></i>
            </div>
            <div class="category-title-text">
              <h3>${categoryData.title}</h3>
              <p>${categoryData.description}</p>
            </div>
          </div>
          <div class="category-count">${projectsCount} ${projectsCount === 1 ? 'Project' : 'Projects'}</div>
        </div>
        <div class="category-projects-grid"></div>
      `;

      const projectsGrid = categorySection.querySelector('.category-projects-grid');

      if (projectsCount === 0) {
        projectsGrid.innerHTML = `
          <div class="category-empty">
            <i class="${categoryData.icon}"></i>
            <p>No projects in this category yet</p>
          </div>
        `;
      } else {
        categoryData.projects.forEach(project => {
          projectsGrid.appendChild(createProjectCard(project));
        });
      }

      categoriesContainer.appendChild(categorySection);
    });

    // Re-initialize expandable text for new cards
    initializeTruncatedText();
  }

  function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = `dashboard-card card-3d project-card project-card--${project.statusType || 'default'}`;

    const tagsHTML = project.tags ? project.tags.map(tag => `<span>${tag}</span>`).join('') : '';
    const linkHTML = project.link ? 
      `<a class="card-link" href="${project.link}" target="_blank"><i class="fas fa-external-link-alt"></i> VIEW PROJECT</a>` :
      `<span class="card-link card-link--disabled"><i class="fas fa-link-slash"></i> NO LINK</span>`;

    card.innerHTML = `
      <div class="project-thumbnail">
        <div class="thumbnail-placeholder">
          <i class="${project.icon}"></i>
        </div>
        <div class="project-status project-status--${project.statusType}">
          <i class="${getStatusIcon(project.statusType)}"></i> ${project.status.toUpperCase()}
        </div>
      </div>
      <div class="blog-card-header">
        <span class="card-eyebrow"><i class="${project.icon}"></i> ${project.category.toUpperCase()}</span>
        <h3>${project.title}</h3>
      </div>
      <div class="card-body">
        <p class="expandable-text" data-expanded="false">
          <span class="text-content">${project.description}</span>
          <button class="read-more-btn"><i class="fas fa-chevron-right"></i> READ MORE</button>
        </p>
        ${tagsHTML ? `<div class="project-tags">${tagsHTML}</div>` : ''}
      </div>
      <div class="card-footer">
        ${linkHTML}
        <span class="card-year">${project.year}</span>
      </div>
    `;

    return card;
  }

  function getStatusIcon(statusType) {
    const icons = {
      'testing': 'fas fa-flask',
      'active': 'fas fa-circle',
      'stable': 'fas fa-check-circle',
      'paused': 'fas fa-pause-circle',
      'released': 'fas fa-rocket',
      'archived': 'fas fa-archive'
    };
    return icons[statusType] || 'fas fa-circle';
  }

  function updateBannerStats(projectsData) {
    // Count total projects
    let totalProjects = projectsData.featured ? projectsData.featured.length : 0;
    let categoriesCount = 0;
    
    if (projectsData.categories) {
      Object.values(projectsData.categories).forEach(category => {
        totalProjects += category.projects.length;
      });
      categoriesCount = Object.keys(projectsData.categories).length;
    }

    // Update stat numbers
    const statNumbers = document.querySelectorAll('.banner-stat .stat-number');
    if (statNumbers[0]) statNumbers[0].setAttribute('data-count', totalProjects);
    if (statNumbers[2]) statNumbers[2].setAttribute('data-count', categoriesCount);

    // Re-animate counters
    statNumbers.forEach(counter => {
      counter.dataset.counted = 'false';
      animateCounter(counter);
    });
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
