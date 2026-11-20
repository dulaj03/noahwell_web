/**
 * NOAHVELLE — filters.js
 * Shop page filtering, sorting, pagination & responsive sidebar controls
 */

(function () {
  'use strict';

  function initShopFilters() {
    const shopGrid = document.getElementById('shop-grid');
    if (!shopGrid || !window.PRODUCTS) return;

    let activeCategory = 'all';
    let selectedCategories = [];
    let selectedSizes = [];
    let selectedColors = [];
    let maxPrice = 500;
    let inStockOnly = false;
    let minRating = 0;
    let sortOrder = 'featured';
    let visibleCount = 12;

    // Read URL params (e.g. ?cat=dresses, ?category=tops, ?sale=true)
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat') || urlParams.get('category');
    const saleParam = urlParams.get('sale');

    if (catParam) {
      activeCategory = catParam.toLowerCase();
    }
    if (saleParam === 'true') {
      activeCategory = 'sale';
    }

    // Set active tab
    const tabBtns = document.querySelectorAll('.category-tabs .tab-btn');
    tabBtns.forEach(btn => {
      const filter = btn.getAttribute('data-filter');
      if (filter === activeCategory) {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      btn.addEventListener('click', function () {
        tabBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeCategory = this.getAttribute('data-filter');
        selectedCategories = []; // reset sidebar category override
        uncheckSidebarCategories();
        visibleCount = 12;
        applyFilters();
      });
    });

    function uncheckSidebarCategories() {
      document.querySelectorAll('.filter-section[data-section="category"] input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });
    }

    // Bind sidebar categories
    document.querySelectorAll('.filter-section[data-section="category"] input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        selectedCategories = Array.from(
          document.querySelectorAll('.filter-section[data-section="category"] input[type="checkbox"]:checked')
        ).map(el => el.value.toLowerCase());
        visibleCount = 12;
        applyFilters();
      });
    });

    // Bind sizes
    document.querySelectorAll('.size-grid input[type="checkbox"], .filter-section[data-section="size"] input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        selectedSizes = Array.from(
          document.querySelectorAll('.filter-section[data-section="size"] input[type="checkbox"]:checked')
        ).map(el => el.value.toUpperCase());
        visibleCount = 12;
        applyFilters();
      });
    });

    // Bind colors
    document.querySelectorAll('.color-swatches input[type="checkbox"], .filter-section[data-section="color"] input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', () => {
        selectedColors = Array.from(
          document.querySelectorAll('.filter-section[data-section="color"] input[type="checkbox"]:checked')
        ).map(el => el.value.toLowerCase());
        visibleCount = 12;
        applyFilters();
      });
    });

    // Bind Price Range slider
    const priceRange = document.getElementById('price-range') || document.getElementById('price-max') || document.querySelector('.price-slider');
    const priceDisplay = document.getElementById('price-val') || document.getElementById('price-max-display') || document.querySelector('.price-value');
    if (priceRange) {
      priceRange.addEventListener('input', function () {
        maxPrice = parseFloat(this.value);
        if (priceDisplay) {
          priceDisplay.textContent = `LKR ${maxPrice}`;
        }
        visibleCount = 12;
        applyFilters();
      });
    }

    // Bind In Stock Only
    const inStockCb = document.getElementById('in-stock-only') || document.querySelector('input[value="in-stock"]');
    if (inStockCb) {
      inStockCb.addEventListener('change', function () {
        inStockOnly = this.checked;
        visibleCount = 12;
        applyFilters();
      });
    }

    // Bind Rating checkboxes / radios
    document.querySelectorAll('.filter-section[data-section="rating"] input').forEach(el => {
      el.addEventListener('change', function () {
        minRating = parseFloat(this.value) || 0;
        visibleCount = 12;
        applyFilters();
      });
    });

    // Bind Sort dropdown
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        sortOrder = this.value;
        applyFilters();
      });
    }

    // Bind View toggles (grid vs list)
    document.querySelectorAll('.view-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const view = this.getAttribute('data-view');
        if (view === 'list') {
          shopGrid.classList.add('list-view');
        } else {
          shopGrid.classList.remove('list-view');
        }
      });
    });

    // Clear filters button
    const clearBtn = document.getElementById('clear-filters');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        window.clearAllFilters();
      });
    }

    window.clearAllFilters = function () {
      activeCategory = 'all';
      selectedCategories = [];
      selectedSizes = [];
      selectedColors = [];
      maxPrice = 500;
      inStockOnly = false;
      minRating = 0;
      sortOrder = 'featured';
      visibleCount = 12;

      tabBtns.forEach(b => b.classList.remove('active'));
      const allTab = document.querySelector('.tab-btn[data-filter="all"]');
      if (allTab) allTab.classList.add('active');

      document.querySelectorAll('.shop-sidebar input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });

      if (priceRange) {
        priceRange.value = 500;
        if (priceDisplay) priceDisplay.textContent = 'LKR 500';
      }

      if (sortSelect) sortSelect.value = 'featured';

      applyFilters();
    };

    // Filter section accordion toggles
    document.querySelectorAll('.filter-section-toggle').forEach(btn => {
      btn.addEventListener('click', function () {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        const content = this.nextElementSibling;
        if (content) {
          content.style.display = expanded ? 'none' : 'block';
        }
        const icon = this.querySelector('.toggle-icon');
        if (icon) {
          icon.style.transform = expanded ? 'rotate(-90deg)' : 'rotate(0deg)';
        }
      });
    });

    // Mobile filter drawer controls
    const mobileFilterBtn = document.getElementById('mobile-filter-btn');
    const sidebar = document.getElementById('shop-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (mobileFilterBtn && sidebar) {
      mobileFilterBtn.addEventListener('click', () => {
        sidebar.classList.add('active', 'is-open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    function closeMobileSidebar() {
      if (sidebar) sidebar.classList.remove('active', 'is-open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (overlay) {
      overlay.addEventListener('click', closeMobileSidebar);
    }

    // Load More button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        visibleCount += 8;
        applyFilters();
      });
    }

    function applyFilters() {
      let filtered = [...window.PRODUCTS];

      // 1. Category filter
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(p => selectedCategories.includes(p.category.toLowerCase()));
      } else if (activeCategory && activeCategory !== 'all') {
        if (activeCategory === 'new-arrivals' || activeCategory === 'new') {
          filtered = filtered.filter(p => p.isNew);
        } else if (activeCategory === 'sale' || activeCategory === 'offers') {
          filtered = filtered.filter(p => p.isOnSale);
        } else if (activeCategory === 'women') {
          // All women's fashion
        } else {
          filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory || p.tags.includes(activeCategory));
        }
      }

      // 2. Sizes
      if (selectedSizes.length > 0) {
        filtered = filtered.filter(p => {
          if (!p.sizes) return false;
          return p.sizes.some(s => selectedSizes.includes(s.toUpperCase()));
        });
      }

      // 3. Colors
      if (selectedColors.length > 0) {
        filtered = filtered.filter(p => {
          if (!p.colors) return false;
          return p.colors.some(c => selectedColors.some(sc => c.toLowerCase().includes(sc)));
        });
      }

      // 4. Price
      filtered = filtered.filter(p => p.price <= maxPrice);

      // 5. In Stock
      if (inStockOnly) {
        filtered = filtered.filter(p => p.inStock);
      }

      // 6. Rating
      if (minRating > 0) {
        filtered = filtered.filter(p => p.rating >= minRating);
      }

      // 7. Sort
      switch (sortOrder) {
        case 'price-asc':
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0) || b.id - a.id);
          break;
        case 'best-selling':
          filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.rating - a.rating);
          break;
        case 'featured':
        default:
          filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || a.id - b.id);
          break;
      }

      // Update count display
      const countEl = document.getElementById('product-count') || document.getElementById('results-count');
      if (countEl) {
        countEl.textContent = filtered.length;
      }

      // Slice for pagination
      const visibleItems = filtered.slice(0, visibleCount);

      if (window.renderProductCards) {
        window.renderProductCards(visibleItems, shopGrid);
      }

      // Update Load More button state
      if (loadMoreBtn) {
        if (visibleCount >= filtered.length) {
          loadMoreBtn.style.display = 'none';
        } else {
          loadMoreBtn.style.display = 'inline-block';
          loadMoreBtn.textContent = `Load More (${filtered.length - visibleCount} remaining)`;
        }
      }

      if (window.syncWishlistButtons) {
        window.syncWishlistButtons();
      }
    }

    // Initial render
    applyFilters();
  }

  document.addEventListener('DOMContentLoaded', initShopFilters);

})();
