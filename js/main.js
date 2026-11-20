/**
 * NOAHVELLE — main.js
 * Global JavaScript — runs on every page.
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     Constants & Global Currency Configuration
  ───────────────────────────────────────────── */
  const CART_KEY      = 'noahvelle_cart';
  const WISHLIST_KEY  = 'noahvelle_wishlist';
  const SCROLL_CLASS  = 'scrolled';
  const MENU_CLASS    = 'open';
  const TOAST_DURATION = 3500; // ms

  window.CURRENCY_CODE = 'LKR';
  window.CURRENCY_SYMBOL = 'LKR ';
  window.formatPrice = function (amount) {
    const num = Number(amount) || 0;
    return `LKR ${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  /* ─────────────────────────────────────────────
     Helpers
  ───────────────────────────────────────────── */
  function qs(selector, root = document) {
    return root.querySelector(selector);
  }

  function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  /* ─────────────────────────────────────────────
     1. Mobile Navigation Toggle
  ───────────────────────────────────────────── */
  function toggleMobileMenu(forceState) {
    const hamburger  = qs('.hamburger, #mobile-menu-toggle');
    const mobileMenu = qs('.mobile-menu');
    const backdrop   = qs('.mobile-menu-backdrop');
    if (!mobileMenu) return;

    const shouldOpen = typeof forceState === 'boolean'
      ? forceState
      : !mobileMenu.classList.contains(MENU_CLASS);

    mobileMenu.classList.toggle(MENU_CLASS, shouldOpen);
    if (hamburger) {
      hamburger.classList.toggle(MENU_CLASS, shouldOpen);
      hamburger.setAttribute('aria-expanded', String(shouldOpen));
    }
    if (backdrop) {
      backdrop.classList.toggle(MENU_CLASS, shouldOpen);
    }
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  function closeMobileMenu() {
    toggleMobileMenu(false);
  }

  function openMobileMenu() {
    toggleMobileMenu(true);
  }

  window.toggleMobileMenu = toggleMobileMenu;
  window.closeMobileMenu  = closeMobileMenu;
  window.openMobileMenu   = openMobileMenu;

  function initMobileNav() {
    // Delegated click handler on document — works regardless of injection timing
    document.addEventListener('click', (e) => {
      // 1. Hamburger button toggle
      const hamburger = e.target.closest('.hamburger, #mobile-menu-toggle');
      if (hamburger) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
        return;
      }

      // 2. Explicit close button inside mobile menu
      const closeBtn = e.target.closest('.mobile-menu-close, #mobile-menu-close');
      if (closeBtn) {
        e.preventDefault();
        closeMobileMenu();
        return;
      }

      // 3. Backdrop overlay clicked
      if (e.target.closest('.mobile-menu-backdrop')) {
        e.preventDefault();
        closeMobileMenu();
        return;
      }

      // 4. Any link clicked inside mobile menu
      if (e.target.closest('.mobile-menu a')) {
        closeMobileMenu();
        return;
      }

      // 5. Click outside open mobile menu
      const mobileMenu = qs('.mobile-menu.open');
      if (mobileMenu && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const mobileMenu = qs('.mobile-menu.open');
        if (mobileMenu) {
          closeMobileMenu();
          const hamburger = qs('.hamburger');
          if (hamburger) hamburger.focus();
        }
      }
    });

    // Close on window resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        closeMobileMenu();
      }
    }, { passive: true });
  }

  /* ─────────────────────────────────────────────
     2. Sticky Header on Scroll
  ───────────────────────────────────────────── */
  function initStickyHeader() {
    const THRESHOLD = 20;

    function onScroll() {
      const header = qs('.header');
      if (header) {
        header.classList.toggle(SCROLL_CLASS, window.scrollY > THRESHOLD);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ─────────────────────────────────────────────
     3. Smooth Scroll for Anchor Links
  ───────────────────────────────────────────── */
  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = qs(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10
      ) || 80;

      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  /* ─────────────────────────────────────────────
     4. Cart & Wishlist Count Badges
  ───────────────────────────────────────────── */
  function getStorageCount(key) {
    try {
      const data = JSON.parse(localStorage.getItem(key));
      if (Array.isArray(data)) return data.length;
      if (data && typeof data === 'object') return Object.keys(data).length;
      return 0;
    } catch {
      return 0;
    }
  }

  function updateCountBadge(selector, count) {
    qsa(selector).forEach((el) => {
      el.textContent = count;
      el.setAttribute('data-count', count);
      el.style.display = count > 0 ? '' : 'none';
    });
  }

  function updateCounts() {
    updateCountBadge('.cart-count',     getStorageCount(CART_KEY));
    updateCountBadge('.wishlist-count', getStorageCount(WISHLIST_KEY));
  }

  function initCountBadges() {
    updateCounts();
    // Re-sync when other tabs change localStorage
    window.addEventListener('storage', (e) => {
      if (e.key === CART_KEY || e.key === WISHLIST_KEY) updateCounts();
    });
  }

  // Expose so cart/wishlist pages can call it after mutations
  window.refreshCountBadges = updateCounts;

  /* ─────────────────────────────────────────────
     5. Toast Notification System
  ───────────────────────────────────────────── */
  function getOrCreateToastContainer() {
    let container = qs('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  const TOAST_ICONS = {
    success: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17l-5-5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    error: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6" stroke-linecap="round"/>
    </svg>`,
    info: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/>
    </svg>`,
  };

  window.showToast = function (message, type = 'info') {
    const container = getOrCreateToastContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <span class="toast-icon">${TOAST_ICONS[type] || TOAST_ICONS.info}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => dismissToast(toast));

    container.appendChild(toast);

    // Auto-dismiss
    const timer = setTimeout(() => dismissToast(toast), TOAST_DURATION);
    toast._dismissTimer = timer;
  };

  function dismissToast(toast) {
    clearTimeout(toast._dismissTimer);
    toast.classList.add('hiding');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
    // Fallback if animation doesn't fire
    setTimeout(() => toast.remove(), 400);
  }

  /* ─────────────────────────────────────────────
     6. Scroll Reveal (IntersectionObserver)
  ───────────────────────────────────────────── */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
      // Fallback: show everything immediately
      qsa('.reveal').forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    qsa('.reveal').forEach((el) => observer.observe(el));
  }

  /* ─────────────────────────────────────────────
     7. Active Nav Link
  ───────────────────────────────────────────── */
  function initActiveNav() {
    const path = window.location.pathname;
    qsa('.nav-links a, .mobile-menu a').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      // Normalize: strip leading slash and .html
      const normalize = (s) => s.replace(/^\//, '').replace(/\.html$/, '').replace(/\/$/, '') || 'index';
      if (normalize(href) === normalize(path)) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }
  window.initActiveNav = initActiveNav;

  /* ─────────────────────────────────────────────
     8. Search Overlay Toggle
  ───────────────────────────────────────────── */
  function initSearchOverlay() {
    function openSearch() {
      if (typeof window.openSearch === 'function') {
        window.openSearch();
        return;
      }
      const overlay = qs('.search-overlay');
      if (!overlay) return;
      const input   = qs('.search-input, #search-input', overlay);
      overlay.classList.add('open', 'active', 'is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input && input.focus(), 100);
    }

    function closeSearch() {
      if (typeof window.closeSearch === 'function') {
        window.closeSearch();
        return;
      }
      const overlay = qs('.search-overlay');
      if (!overlay) return;
      overlay.classList.remove('open', 'active', 'is-open');
      document.body.style.overflow = '';
    }

    // Delegated click for search triggers
    document.addEventListener('click', (e) => {
      if (e.target.closest('.search-toggle')) {
        e.preventDefault();
        openSearch();
      }
      if (e.target.closest('.search-overlay-close, #search-close')) {
        e.preventDefault();
        closeSearch();
      }
    });

    document.addEventListener('click', (e) => {
      const overlay = qs('.search-overlay');
      if (overlay && e.target === overlay) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      const overlay = qs('.search-overlay');
      if (e.key === 'Escape' && overlay && (overlay.classList.contains('open') || overlay.classList.contains('active'))) {
        closeSearch();
      }
    });
  }

  /* ─────────────────────────────────────────────
     9. Quick View Modal System
  ───────────────────────────────────────────── */
  function getOrCreateQuickViewModal() {
    // Look for the outer .modal-overlay wrapper first (id="quick-view-modal")
    let overlay = document.getElementById('quick-view-modal');
    // Fallback: old HTML had id="quick-view-overlay" on the outer wrapper
    if (!overlay || !overlay.classList.contains('modal-overlay')) {
      overlay = document.getElementById('quick-view-overlay');
    }
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'quick-view-modal';
      overlay.className = 'modal-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.innerHTML = `
        <div class="modal quick-view-modal-inner">
          <button class="modal-close" id="quick-view-close" aria-label="Close quick view">&times;</button>
          <div class="modal__content quick-view-content" id="quick-view-content"></div>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  window.openQuickView = function (productId) {
    const product = window.getProductById ? window.getProductById(productId) : null;
    if (!product) return;

    const overlay = getOrCreateQuickViewModal();
    const content = overlay.querySelector('#quick-view-content') || overlay.querySelector('.modal__content');
    if (!content) return;

    let selectedSize = product.sizes ? product.sizes[0] : 'M';
    let selectedColor = product.colors ? product.colors[0] : 'Default';
    let qty = 1;

    const isWish = window.isWishlisted ? window.isWishlisted(product.id) : false;
    const format = window.formatPrice || (val => `LKR ${Number(val).toFixed(2)}`);
    const priceHtml = product.isOnSale
      ? `<span class="qv-price-current">${format(product.price)}</span>
         <span class="qv-price-old">${format(product.oldPrice)}</span>
         <span class="badge badge-sale">-${product.discountPercent}% OFF</span>`
      : `<span class="qv-price-current">${format(product.price)}</span>`;

    content.innerHTML = `
      <div class="qv-grid">
        <div class="qv-gallery">
          <img src="${product.image}" alt="${product.name}" class="qv-main-img" id="qv-main-img" />
        </div>
        <div class="qv-details">
          <span class="qv-category">${product.subcategory || product.category}</span>
          <h2 class="qv-title">${product.name}</h2>
          <div class="qv-rating">
            <span class="stars">★★★★★</span>
            <span class="rating-text">${product.rating} (${product.reviewCount} reviews)</span>
          </div>
          <div class="qv-pricing">${priceHtml}</div>
          <p class="qv-description">${product.description}</p>

          ${product.sizes ? `
            <div class="qv-option-group">
              <label class="qv-option-label">SIZE: <strong id="qv-size-label">${selectedSize}</strong></label>
              <div class="qv-size-selector">
                ${product.sizes.map((s, idx) => `
                  <button type="button" class="qv-size-btn ${idx === 0 ? 'selected' : ''}" data-size="${s}">${s}</button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          ${product.colors ? `
            <div class="qv-option-group">
              <label class="qv-option-label">COLOR: <strong id="qv-color-label">${selectedColor}</strong></label>
              <div class="qv-color-selector">
                ${product.colors.map((c, idx) => `
                  <button type="button" class="qv-color-pill ${idx === 0 ? 'selected' : ''}" data-color="${c}">${c}</button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="qv-actions">
            <div class="qv-qty-selector">
              <button type="button" class="qv-qty-btn" id="qv-qty-minus">−</button>
              <span id="qv-qty-num" class="qv-qty-num">1</span>
              <button type="button" class="qv-qty-btn" id="qv-qty-plus">+</button>
            </div>
            <button type="button" class="btn btn-primary qv-add-btn" id="qv-add-btn">
              ADD TO BAG
            </button>
            <button type="button" class="icon-btn qv-wishlist-btn ${isWish ? 'active' : ''}" id="qv-wishlist-btn" title="Save to wishlist">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="${isWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          <div class="qv-perks">
            <span>✨ Complimentary shipping on orders over LKR 150</span>
            <span>🌿 Consciously crafted from sustainable materials</span>
          </div>
        </div>
      </div>
    `;

    // Size clicks
    content.querySelectorAll('.qv-size-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        content.querySelectorAll('.qv-size-btn').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        selectedSize = this.getAttribute('data-size');
        const label = content.querySelector('#qv-size-label');
        if (label) label.textContent = selectedSize;
      });
    });

    // Color clicks
    content.querySelectorAll('.qv-color-pill').forEach(btn => {
      btn.addEventListener('click', function () {
        content.querySelectorAll('.qv-color-pill').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        selectedColor = this.getAttribute('data-color');
        const label = content.querySelector('#qv-color-label');
        if (label) label.textContent = selectedColor;
      });
    });

    // Quantity buttons
    const qtyNum = content.querySelector('#qv-qty-num');
    const minusBtn = content.querySelector('#qv-qty-minus');
    const plusBtn = content.querySelector('#qv-qty-plus');

    if (minusBtn && qtyNum) {
      minusBtn.addEventListener('click', () => {
        if (qty > 1) {
          qty--;
          qtyNum.textContent = qty;
        }
      });
    }
    if (plusBtn && qtyNum) {
      plusBtn.addEventListener('click', () => {
        qty++;
        qtyNum.textContent = qty;
      });
    }

    // Add to cart from quick view
    const addBtn = content.querySelector('#qv-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (window.addToCart) {
          window.addToCart(product.id, selectedSize, selectedColor, qty);
        }
        window.closeQuickView();
      });
    }

    // Wishlist from quick view
    const wishBtn = content.querySelector('#qv-wishlist-btn');
    if (wishBtn) {
      wishBtn.addEventListener('click', () => {
        if (window.toggleWishlist) {
          window.toggleWishlist(product.id);
          const activeNow = window.isWishlisted(product.id);
          wishBtn.classList.toggle('active', activeNow);
          const svg = wishBtn.querySelector('svg');
          if (svg) svg.setAttribute('fill', activeNow ? 'currentColor' : 'none');
        }
      });
    }

    // Close button
    const closeBtn = overlay.querySelector('.modal-close, #quick-view-close');
    if (closeBtn) {
      closeBtn.onclick = window.closeQuickView;
    }

    overlay.onclick = function (e) {
      if (e.target === overlay) window.closeQuickView();
    };

    overlay.classList.add('open', 'active', 'is-open');
    document.body.style.overflow = 'hidden';
  };

  window.closeQuickView = function () {
    // Try the new id first, then fallback to old id
    const overlay = document.getElementById('quick-view-modal') || document.getElementById('quick-view-overlay');
    if (overlay) {
      overlay.classList.remove('open', 'active', 'is-open');
      document.body.style.overflow = '';
    }
  };

  // Close Quick View on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      window.closeQuickView();
    }
  });

  /* ─────────────────────────────────────────────
     10. Subtle Luxury Holiday Snowfall
  ───────────────────────────────────────────── */
  function initFestiveSnowfall() {
    const SNOW_KEY = 'noahvelle_snow_enabled';
    let isSnowEnabled = localStorage.getItem(SNOW_KEY) !== 'false';

    let canvas = document.getElementById('festive-snow-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'festive-snow-canvas';
      canvas.className = 'festive-snow-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // 42 delicate luxury snowflakes
    const FLAKE_COUNT = Math.min(45, Math.max(20, Math.floor(window.innerWidth / 26)));
    const flakes = [];

    for (let i = 0; i < FLAKE_COUNT; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 1.0,
        density: Math.random() * FLAKE_COUNT,
        speedY: Math.random() * 0.75 + 0.35,
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.45 + 0.25,
        isGold: Math.random() > 0.82
      });
    }

    let angle = 0;
    let animId = null;

    function renderSnow() {
      if (!isSnowEnabled) {
        ctx.clearRect(0, 0, width, height);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      angle += 0.008;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        f.y += f.speedY;
        f.x += Math.sin(angle + f.density) * 0.5 + f.speedX;

        // Wrap around
        if (f.y > height) {
          f.y = -8;
          f.x = Math.random() * width;
        }
        if (f.x > width + 8) f.x = -8;
        if (f.x < -8) f.x = width + 8;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = f.isGold
          ? `rgba(224, 197, 148, ${f.opacity * 0.85})`
          : `rgba(255, 255, 255, ${f.opacity})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(renderSnow);
    }

    if (isSnowEnabled) {
      animId = requestAnimationFrame(renderSnow);
    }

    // Toggle button sync & handler
    function syncToggleBtn() {
      const toggleBtn = document.getElementById('festive-snow-toggle') || document.querySelector('.festive-snow-toggle');
      if (toggleBtn) {
        toggleBtn.classList.toggle('active', isSnowEnabled);
        toggleBtn.setAttribute('aria-pressed', String(isSnowEnabled));
        const textSpan = toggleBtn.querySelector('.snow-toggle-text');
        if (textSpan) {
          textSpan.textContent = isSnowEnabled ? 'Holiday Snow: On' : 'Holiday Snow: Off';
        }
      }
    }
    syncToggleBtn();

    document.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('#festive-snow-toggle, .festive-snow-toggle');
      if (!toggleBtn) return;
      e.preventDefault();

      isSnowEnabled = !isSnowEnabled;
      localStorage.setItem(SNOW_KEY, String(isSnowEnabled));
      syncToggleBtn();

      if (isSnowEnabled) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(renderSnow);
        if (window.showToast) window.showToast('Holiday snowfall enabled ✨', 'info');
      } else {
        cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, width, height);
        if (window.showToast) window.showToast('Holiday snowfall paused ❄️', 'info');
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else if (isSnowEnabled) {
        animId = requestAnimationFrame(renderSnow);
      }
    });
  }

  /* ─────────────────────────────────────────────
     Init
  ───────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initStickyHeader();
    initSmoothScroll();
    initCountBadges();
    initScrollReveal();
    initActiveNav();
    initSearchOverlay();
    initFestiveSnowfall();
  });
})();
