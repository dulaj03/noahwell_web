/**
 * NOAHVELLE — components.js
 * Shared Header & Footer components with relative local path resolution
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     Determine current path depth for clean local links
  ───────────────────────────────────────────── */
  const path = window.location.pathname.replace(/\\/g, '/');
  const isInsidePages = path.includes('/pages/') || (!path.endsWith('index.html') && window.location.href.includes('/pages/'));

  const ROOT_PATH = isInsidePages ? '../' : './';
  const PAGES_PATH = isInsidePages ? './' : './pages/';

  const LINKS = {
    home: `${ROOT_PATH}index.html`,
    shop: `${PAGES_PATH}shop.html`,
    offers: `${PAGES_PATH}offers.html`,
    about: `${PAGES_PATH}about.html`,
    wishlist: `${PAGES_PATH}wishlist.html`,
    account: `${PAGES_PATH}account.html`,
    cart: `${PAGES_PATH}cart.html`,
    login: `${PAGES_PATH}login.html`,
    privacy: `${PAGES_PATH}privacy-policy.html`
  };

  /* ─────────────────────────────────────────────
     SVG Icons (inline, 24×24, stroke-based)
  ───────────────────────────────────────────── */
  const ICONS = {
    search: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <circle cx="11" cy="11" r="7"/>
      <path d="M16.5 16.5l4 4" stroke-linecap="round"/>
    </svg>`,

    heart: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    account: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    bag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 6h18M16 10a4 4 0 0 1-8 0" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    close: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

    instagram: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4.5"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>`,

    pinterest: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.44.84-2.52 1.88-2.52.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.86 3.48-.25 1.04.51 1.88 1.52 1.88 1.83 0 3.06-2.33 3.06-5.09 0-2.1-1.42-3.67-3.98-3.67-2.9 0-4.71 2.17-4.71 4.59 0 .83.24 1.42.62 1.87.17.2.19.28.13.51-.04.17-.14.57-.18.73-.06.23-.24.32-.44.23-1.25-.51-1.84-1.89-1.84-3.44 0-2.55 2.15-5.6 6.43-5.6 3.44 0 5.71 2.5 5.71 5.19 0 3.56-1.97 6.21-4.87 6.21-.97 0-1.89-.52-2.2-1.11l-.6 2.3c-.22.84-.8 1.89-1.19 2.53.9.27 1.84.42 2.83.42C17.52 22 22 17.52 22 12S17.52 2 12 2z"/>
    </svg>`,

    tiktok: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.03a8.26 8.26 0 004.84 1.55V7.14a4.86 4.86 0 01-1.07-.45z"/>
    </svg>`
  };

  /* ─────────────────────────────────────────────
     Festive Santa Hat SVG (Tilted over 'LE')
  ───────────────────────────────────────────── */
  const SANTA_HAT_SVG = `<span class="santa-hat-icon" aria-hidden="true" title="Holiday Season at NOAHVELLE">
    <svg class="santa-hat-svg" viewBox="0 0 54 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hatRed" x1="12" y1="6" x2="42" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#D32F2F"/>
          <stop offset="50%" stop-color="#B71C1C"/>
          <stop offset="100%" stop-color="#880E14"/>
        </linearGradient>
        <filter id="hatShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="rgba(0,0,0,0.25)"/>
        </filter>
      </defs>
      <!-- Velvet Red Cap curved towards right -->
      <path d="M10 29 C12 17, 22 6, 35 7 C39 7, 45 13, 47 21 C48 25, 45 28, 41 27 C35 25, 27 25, 10 29 Z" fill="url(#hatRed)" filter="url(#hatShadow)"/>
      <!-- Soft inner velvet crease -->
      <path d="M26 13 C32 11, 38 15, 44 22 C40 24, 34 21, 26 13 Z" fill="#5F090D" opacity="0.4"/>
      <!-- Fluffy white fur trim base spanning across the letters -->
      <rect x="6" y="26" width="31" height="8" rx="4" fill="#FDFBF7" filter="url(#hatShadow)"/>
      <circle cx="10" cy="30" r="3.2" fill="#FFFFFF"/>
      <circle cx="16" cy="30" r="3.4" fill="#FFFFFF"/>
      <circle cx="21.5" cy="30" r="3.4" fill="#FFFFFF"/>
      <circle cx="27" cy="30" r="3.4" fill="#FFFFFF"/>
      <circle cx="32.5" cy="30" r="3.2" fill="#FFFFFF"/>
      <!-- Pom-pom at tipped corner -->
      <circle cx="46" cy="23.5" r="5.2" fill="#FDFBF7" filter="url(#hatShadow)"/>
      <circle cx="46" cy="23.5" r="4.2" fill="#FFFFFF"/>
    </svg>
  </span>`;

  /* ─────────────────────────────────────────────
     renderHeader()
  ───────────────────────────────────────────── */
  window.renderHeader = function () {
    return `
<!-- Luxury Holiday Announcement Ribbon -->
<div class="holiday-banner" id="holiday-banner">
  <div class="holiday-banner-inner">
    <span class="holiday-sparkle">✦</span>
    <span class="holiday-text">THE HOLIDAY EDIT &bull; COMPLIMENTARY SIGNATURE GIFT PACKAGING &amp; EXPRESS DELIVERY &bull; CODE: <strong>NOEL</strong></span>
    <span class="holiday-sparkle">✦</span>
  </div>
</div>

<header class="header">
  <div class="container">
    <nav class="nav">

      <!-- Left: Nav links -->
      <div class="nav-left">
        <ul class="nav-links">
          <li><a href="${LINKS.home}">HOME</a></li>
          <li><a href="${LINKS.shop}">SHOP</a></li>
          <li><a href="${LINKS.offers}">OFFERS</a></li>
          <li><a href="${LINKS.about}">ABOUT</a></li>
        </ul>
      </div>

      <!-- Centre: Brand wordmark wearing Santa Hat on 'LE' -->
      <div class="nav-logo">
        <a href="${LINKS.home}">NOAHVEL<span class="logo-festive-wrap">LE${SANTA_HAT_SVG}</span></a>
      </div>

      <!-- Right: Utility icons -->
      <div class="nav-right nav-icons">
        <button class="icon-btn search-toggle" aria-label="Search" title="Search" type="button">
          ${ICONS.search}
        </button>
        <a href="${LINKS.wishlist}" class="icon-btn" aria-label="Wishlist" title="Wishlist">
          ${ICONS.heart}
          <span class="wishlist-count" data-count="0" style="display:none">0</span>
        </a>

        <!-- Account / Sign In with Luxury Desktop Dropdown -->
        <div class="nav-account-item">
          <a href="${LINKS.account}" class="icon-btn" aria-label="My Account" title="My Account">
            ${ICONS.account}
          </a>
          <a href="${LINKS.login}" class="nav-auth-text" title="Sign In or Register">SIGN IN</a>
          <div class="nav-account-dropdown">
            <span class="account-dropdown-tag">NOAHVELLE CLIENT SERVICES</span>
            <h4 class="account-dropdown-title">WELCOME</h4>
            <p class="account-dropdown-desc">Sign in to access your personal wardrobe, order tracking, and bespoke edits.</p>
            <div class="account-dropdown-btns">
              <a href="${LINKS.login}" class="btn btn-primary btn-sm btn-full account-dropdown-signin">SIGN IN</a>
              <a href="${LINKS.login}?tab=signup" class="account-dropdown-register">New to NOAHVELLE? <strong>Create an Account</strong></a>
            </div>
            <div class="account-dropdown-divider"></div>
            <ul class="account-dropdown-links">
              <li><a href="${LINKS.account}">My Account Dashboard</a></li>
              <li><a href="${LINKS.account}#orders">Orders &amp; Tracking</a></li>
              <li><a href="${LINKS.wishlist}">Saved Wishlist</a></li>
            </ul>
          </div>
        </div>

        <a href="${LINKS.cart}" class="icon-btn cart-icon" aria-label="Shopping Bag" title="Shopping Bag">
          ${ICONS.bag}
          <span class="cart-count" data-count="0" style="display:none">0</span>
        </a>
      </div>

      <!-- Mobile hamburger toggle -->
      <button class="hamburger" id="mobile-menu-toggle" aria-label="Open menu" aria-expanded="false" type="button">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>
  </div>
</header>

<!-- Mobile slide-out menu (placed outside <header> to avoid backdrop-filter viewport traps) -->
<div class="mobile-menu" id="mobile-menu" role="dialog" aria-label="Navigation menu">
  <div class="mobile-menu-header">
    <span class="mobile-menu-title">NOAHVEL<span class="logo-festive-wrap">LE${SANTA_HAT_SVG}</span> &bull; MENU</span>
    <button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close menu" type="button">&times;</button>
  </div>
  <ul class="mobile-nav-links">
    <li><a href="${LINKS.home}">Home</a></li>
    <li><a href="${LINKS.shop}">Shop Collection</a></li>
    <li><a href="${LINKS.offers}">Special Offers</a></li>
    <li><a href="${LINKS.about}">Our Story</a></li>
    <li><a href="${LINKS.wishlist}">My Wishlist</a></li>
    <li><a href="${LINKS.account}">My Account</a></li>
    <li><a href="${LINKS.login}">Sign In / Register</a></li>
    <li><a href="${LINKS.privacy}">Privacy Policy</a></li>
  </ul>
  <div class="mobile-icons">
    <a href="${LINKS.wishlist}" class="icon-btn" aria-label="Wishlist" title="Wishlist">
      ${ICONS.heart}
      <span class="wishlist-count" data-count="0" style="display:none">0</span>
    </a>
    <a href="${LINKS.account}" class="icon-btn" aria-label="Account" title="Account">
      ${ICONS.account}
    </a>
    <a href="${LINKS.cart}" class="icon-btn cart-icon" aria-label="Shopping Bag" title="Shopping Bag">
      ${ICONS.bag}
      <span class="cart-count" data-count="0" style="display:none">0</span>
    </a>
  </div>
</div>
<!-- Mobile backdrop overlay -->
<div class="mobile-menu-backdrop" id="mobile-menu-backdrop" aria-hidden="true"></div>
`;
  };

  /* ─────────────────────────────────────────────
     renderFooter()
  ───────────────────────────────────────────── */
  window.renderFooter = function () {
    const year = new Date().getFullYear();
    return `
<footer class="footer">
  <div class="container">

    <!-- Newsletter strip -->
    <div class="footer-newsletter">
      <div class="footer-newsletter-text">
        <h3>Join the NOAHVELLE Edit</h3>
        <p>New arrivals, curated edits, and exclusive invitations — delivered quietly.</p>
      </div>
      <form class="footer-newsletter-form" onsubmit="window.handleFooterNewsletter(event)">
        <input
          type="email"
          name="email"
          placeholder="Your email address"
          required
          aria-label="Email address"
        />
        <button type="submit">SUBSCRIBE</button>
      </form>
    </div>

    <!-- Main columns -->
    <div class="footer-columns">

      <!-- Brand col -->
      <div class="footer-brand">
        <a href="${LINKS.home}" class="footer-logo">NOAHVEL<span class="logo-festive-wrap">LE${SANTA_HAT_SVG}</span></a>
        <p>Refined silhouettes for the modern woman. Timeless craftsmanship, modern minimalism, and effortless elegance.</p>
        <div class="footer-social">
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener">
            ${ICONS.instagram}
          </a>
          <a href="https://pinterest.com" aria-label="Pinterest" target="_blank" rel="noopener">
            ${ICONS.pinterest}
          </a>
          <a href="https://tiktok.com" aria-label="TikTok" target="_blank" rel="noopener">
            ${ICONS.tiktok}
          </a>
        </div>
      </div>

      <!-- Shop col -->
      <div>
        <p class="footer-col-title">SHOP</p>
        <ul class="footer-links">
          <li><a href="${LINKS.shop}">All Collections</a></li>
          <li><a href="${LINKS.shop}?cat=new-arrivals">New Arrivals</a></li>
          <li><a href="${LINKS.shop}?cat=dresses">Dresses</a></li>
          <li><a href="${LINKS.shop}?cat=tops">Tops &amp; Blouses</a></li>
          <li><a href="${LINKS.shop}?cat=bottoms">Bottoms</a></li>
          <li><a href="${LINKS.shop}?cat=jackets">Jackets &amp; Coats</a></li>
          <li><a href="${LINKS.shop}?cat=shoes">Shoes &amp; Footwear</a></li>
          <li><a href="${LINKS.offers}">Special Offers</a></li>
        </ul>
      </div>

      <!-- Customer Care col -->
      <div>
        <p class="footer-col-title">CUSTOMER CARE</p>
        <ul class="footer-links">
          <li><a href="${LINKS.login}">Sign In / Register</a></li>
          <li><a href="${LINKS.account}">My Account</a></li>
          <li><a href="${LINKS.cart}">Shopping Bag</a></li>
          <li><a href="${LINKS.account}#orders">Order History</a></li>
          <li><a href="${LINKS.wishlist}">Saved Items</a></li>
          <li><a href="${LINKS.about}">Size Guide</a></li>
          <li><a href="${LINKS.about}">Shipping &amp; Returns</a></li>
        </ul>
      </div>

      <!-- Company col -->
      <div>
        <p class="footer-col-title">COMPANY</p>
        <ul class="footer-links">
          <li><a href="${LINKS.about}">Our Story &amp; Atelier</a></li>
          <li><a href="${LINKS.about}">Our Philosophy</a></li>
          <li><a href="${LINKS.login}">Sign In / Register</a></li>
          <li><a href="${LINKS.privacy}">Privacy Policy</a></li>
          <li><a href="${LINKS.privacy}">Terms of Service</a></li>
        </ul>
      </div>

    </div><!-- /footer-columns -->

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <p>&copy; ${year} NOAHVELLE Atelier. All rights reserved. &bull; <span class="holiday-blessing">Season's Greetings &bull; Holiday 2026</span></p>
      <div class="footer-bottom-links">
        <a href="${LINKS.privacy}">Privacy Policy</a>
        <a href="${LINKS.privacy}">Terms of Service</a>
        <a href="${LINKS.about}">Sustainability</a>
      </div>
    </div>

    <!-- Festive Snowfall Toggle -->
    <button class="festive-snow-toggle active" id="festive-snow-toggle" aria-label="Toggle festive snowfall" aria-pressed="true" type="button" title="Toggle holiday snowfall">
      <span class="snow-toggle-icon">❄</span>
      <span class="snow-toggle-text">Holiday Snow</span>
    </button>

  </div>
</footer>
`;
  };

  /* ─────────────────────────────────────────────
     Footer Newsletter Handler
  ───────────────────────────────────────────── */
  window.handleFooterNewsletter = function (e) {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (!input || !input.value.trim()) return;

    if (typeof window.showToast === 'function') {
      window.showToast("Welcome to the NOAHVELLE Edit! You're on the list.", 'success');
    }
    input.value = '';
  };

  /* ─────────────────────────────────────────────
     Auto-inject into DOM
  ───────────────────────────────────────────── */
  function injectComponents() {
    // 1. Header injection (only if placeholder exists)
    const headerPlaceholder = document.getElementById('header-placeholder') || document.getElementById('header-slot');
    if (headerPlaceholder) {
      headerPlaceholder.outerHTML = window.renderHeader();
    }

    // 2. Footer injection (only if placeholder exists)
    const footerPlaceholder = document.getElementById('footer-placeholder') || document.getElementById('footer-slot');
    if (footerPlaceholder) {
      footerPlaceholder.outerHTML = window.renderFooter();
    }

    // Sync count badges and active nav
    if (typeof window.refreshCountBadges === 'function') window.refreshCountBadges();
    if (typeof window.updateCartBadge === 'function') window.updateCartBadge();
    if (typeof window.updateWishlistBadge === 'function') window.updateWishlistBadge();
    if (typeof window.initActiveNav === 'function') window.initActiveNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
  } else {
    injectComponents();
  }

})();
