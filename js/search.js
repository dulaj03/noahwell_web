/**
 * NOAHVELLE — search.js
 * Real-time Product Search Overlay & Autocomplete
 * Globally accessible across all pages with auto-creation fallback
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     getOrCreateSearchOverlay()
  ───────────────────────────────────────────── */
  function getOrCreateSearchOverlay() {
    let overlay = document.getElementById('search-overlay') || document.querySelector('.search-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'search-overlay';
      overlay.className = 'search-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-label', 'Search Collection');
      document.body.appendChild(overlay);
    }

    // If overlay is empty or missing inner content, inject standard template
    if (!overlay.querySelector('#search-input')) {
      overlay.innerHTML = `
        <button class="search-overlay-close" id="search-close" aria-label="Close search" type="button">&times;</button>
        <div class="search-wrapper">
          <label class="search-label" for="search-input">What are you looking for?</label>
          <form class="search-form" id="search-form" role="search" onsubmit="event.preventDefault();">
            <div class="search-input-row">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
                <circle cx="11" cy="11" r="7"/>
                <path d="M16.5 16.5l4 4" stroke-linecap="round"/>
              </svg>
              <input
                type="search"
                id="search-input"
                class="search-input"
                placeholder="Search styles, fabrics, collections…"
                autocomplete="off"
                spellcheck="false"
              />
            </div>
          </form>
          <div class="search-results" id="search-results"></div>
        </div>
      `;
    }
    return overlay;
  }

  /* ─────────────────────────────────────────────
     Open & Close Controls
  ───────────────────────────────────────────── */
  function openSearch() {
    const overlay = getOrCreateSearchOverlay();
    overlay.classList.add('open', 'active', 'is-open');
    document.body.style.overflow = 'hidden';

    const searchInput = overlay.querySelector('.search-input, #search-input');
    const resultsContainer = overlay.querySelector('.search-results, #search-results');

    if (searchInput) {
      setTimeout(() => searchInput.focus(), 120);
      if (!searchInput.value.trim() && resultsContainer) {
        showPopularSearches(resultsContainer, searchInput);
      }
    }
  }

  function closeSearch() {
    const overlay = document.getElementById('search-overlay') || document.querySelector('.search-overlay');
    if (overlay) {
      overlay.classList.remove('open', 'active', 'is-open');
      document.body.style.overflow = '';
      const searchInput = overlay.querySelector('.search-input, #search-input');
      const resultsContainer = overlay.querySelector('.search-results, #search-results');
      if (searchInput) searchInput.value = '';
      if (resultsContainer) resultsContainer.innerHTML = '';
    }
  }

  window.openSearch = openSearch;
  window.closeSearch = closeSearch;

  /* ─────────────────────────────────────────────
     Popular Searches
  ───────────────────────────────────────────── */
  function showPopularSearches(resultsContainer, searchInput) {
    if (!resultsContainer) return;
    resultsContainer.innerHTML = `
      <div class="search-suggestions">
        <p class="search-suggestions-title">POPULAR SEARCHES</p>
        <div class="search-tag-group">
          <button type="button" class="search-tag" data-query="dress">Silk Dresses</button>
          <button type="button" class="search-tag" data-query="coat">Cashmere Coats</button>
          <button type="button" class="search-tag" data-query="linen">Linen Blouses</button>
          <button type="button" class="search-tag" data-query="trouser">Silk Trousers</button>
          <button type="button" class="search-tag" data-query="mule">Leather Mules</button>
          <button type="button" class="search-tag" data-query="knit">Cashmere Knits</button>
        </div>
      </div>
    `;

    resultsContainer.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        if (searchInput) {
          const q = tag.getAttribute('data-query');
          searchInput.value = q;
          performSearch(q, resultsContainer);
        }
      });
    });
  }

  /* ─────────────────────────────────────────────
     Live Product Search
  ───────────────────────────────────────────── */
  function performSearch(query, resultsContainer) {
    if (!resultsContainer) return;
    const items = window.PRODUCTS || window.products || [];

    if (!items.length) {
      resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p>Explore our boutique collection in the <a href="shop.html" style="text-decoration:underline;">Shop</a></p>
        </div>
      `;
      return;
    }

    const q = query.trim().toLowerCase();
    const matches = items.filter(p => {
      const nameMatch = p.name && p.name.toLowerCase().includes(q);
      const catMatch  = p.category && p.category.toLowerCase().includes(q);
      const subMatch  = p.subcategory && p.subcategory.toLowerCase().includes(q);
      const descMatch = p.description && p.description.toLowerCase().includes(q);
      const tagMatch  = p.tags && Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(q));
      return nameMatch || catMatch || subMatch || descMatch || tagMatch;
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="search-no-results">
          <p>No silhouettes found matching "<strong>${escapeHtml(query)}</strong>"</p>
          <small>Try searching for "silk", "dress", "coat", or "linen"</small>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="search-results-list">
        <p class="search-results-count">${matches.length} piece${matches.length === 1 ? '' : 's'} found</p>
        <div class="search-results-grid">
          ${matches.map(p => `
            <div class="search-result-item" data-id="${p.id}" tabindex="0" role="button">
              <img src="${p.image}" alt="${escapeHtml(p.name)}" class="search-result-thumb" loading="lazy" />
              <div class="search-result-info">
                <span class="search-result-cat">${p.subcategory || p.category}</span>
                <h4 class="search-result-title">${escapeHtml(p.name)}</h4>
                <span class="search-result-price">${window.formatPrice ? window.formatPrice(p.price) : 'LKR ' + p.price.toFixed(2)}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Click handler on search result item -> open Quick View or navigate
    resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
      const id = parseInt(item.getAttribute('data-id'), 10);
      item.addEventListener('click', () => {
        closeSearch();
        if (typeof window.openQuickView === 'function') {
          window.openQuickView(id);
        } else {
          // If on subpage or quick view not present
          const isPages = window.location.pathname.includes('/pages/');
          window.location.href = (isPages ? 'shop.html' : 'pages/shop.html') + `?highlight=${id}`;
        }
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /* ─────────────────────────────────────────────
     Delegated Event Listeners (Document-level)
  ───────────────────────────────────────────── */
  function initSearch() {
    // 1. Search trigger click (magnifying glass)
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('.search-toggle');
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        openSearch();
        return;
      }

      // 2. Search close button click
      const closeBtn = e.target.closest('.search-overlay-close, .search-overlay__close, .search-close, #search-close');
      if (closeBtn) {
        e.preventDefault();
        closeSearch();
        return;
      }

      // 3. Click directly on overlay backdrop
      const overlay = document.getElementById('search-overlay') || document.querySelector('.search-overlay');
      if (overlay && (overlay.classList.contains('open') || overlay.classList.contains('active'))) {
        if (e.target === overlay) {
          closeSearch();
        }
      }
    });

    // 4. Keyboard: Escape closes search
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const overlay = document.getElementById('search-overlay') || document.querySelector('.search-overlay');
        if (overlay && (overlay.classList.contains('open') || overlay.classList.contains('active'))) {
          closeSearch();
        }
      }
    });

    // 5. Input search handler (delegated)
    let debounceTimer;
    document.addEventListener('input', (e) => {
      if (e.target && e.target.matches('.search-input, #search-input')) {
        clearTimeout(debounceTimer);
        const searchInput = e.target;
        const overlay = searchInput.closest('.search-overlay') || document;
        const resultsContainer = overlay.querySelector('.search-results, #search-results');
        const query = searchInput.value.trim();

        if (!query) {
          if (resultsContainer) showPopularSearches(resultsContainer, searchInput);
          return;
        }

        debounceTimer = setTimeout(() => {
          if (resultsContainer) performSearch(query, resultsContainer);
        }, 180);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }

})();
