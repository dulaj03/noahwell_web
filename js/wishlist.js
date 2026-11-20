/**
 * NOAHVELLE — wishlist.js
 * Wishlist management & localStorage persistence
 */

(function () {
  'use strict';

  const WISHLIST_KEY = 'noahvelle_wishlist';

  function loadWishlist() {
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveWishlist(list) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    updateWishlistBadge();
    syncWishlistButtons();
    renderAllWishlists();
  }

  window.getWishlist = function () {
    return loadWishlist();
  };

  window.isWishlisted = function (productId) {
    const list = loadWishlist();
    return list.includes(Number(productId));
  };

  window.toggleWishlist = function (productId) {
    const id = Number(productId);
    let list = loadWishlist();
    const product = window.getProductById ? window.getProductById(id) : null;
    const prodName = product ? product.name : 'Item';

    if (list.includes(id)) {
      list = list.filter(item => item !== id);
      saveWishlist(list);
      if (typeof window.showToast === 'function') {
        window.showToast(`Removed "${prodName}" from wishlist.`, 'info');
      }
    } else {
      list.push(id);
      saveWishlist(list);
      if (typeof window.showToast === 'function') {
        window.showToast(`Added "${prodName}" to your wishlist.`, 'success');
      }
    }
  };

  window.clearWishlist = function () {
    saveWishlist([]);
    if (typeof window.showToast === 'function') {
      window.showToast('Your wishlist has been cleared.', 'info');
    }
  };

  window.moveAllWishlistToBag = function () {
    const list = loadWishlist();
    if (list.length === 0) {
      if (typeof window.showToast === 'function') {
        window.showToast('Your wishlist is empty.', 'info');
      }
      return;
    }

    let movedCount = 0;
    list.forEach(id => {
      const p = window.getProductById ? window.getProductById(id) : null;
      if (p && window.addToCart) {
        window.addToCart(p.id, p.sizes ? p.sizes[0] : 'M', p.colors ? p.colors[0] : 'Default', 1);
        movedCount++;
      }
    });

    if (typeof window.showToast === 'function') {
      window.showToast(`Moved ${movedCount} saved pieces to your bag!`, 'success');
    }
  };

  function updateWishlistBadge() {
    const count = loadWishlist().length;
    const badges = document.querySelectorAll('.wishlist-count');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.setAttribute('data-count', count);
      if (count > 0) {
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });
  }
  window.updateWishlistBadge = updateWishlistBadge;

  function syncWishlistButtons() {
    const list = loadWishlist();
    document.querySelectorAll('.wishlist-btn[data-id]').forEach(btn => {
      const id = Number(btn.getAttribute('data-id'));
      const active = list.includes(id);
      btn.classList.toggle('active', active);
      btn.classList.toggle('wishlisted', active);
      const svg = btn.querySelector('svg');
      if (svg) {
        svg.setAttribute('fill', active ? 'currentColor' : 'none');
      }
    });
  }
  window.syncWishlistButtons = syncWishlistButtons;

  // Render both dedicated wishlist page & account wishlist tab
  function renderAllWishlists() {
    renderDedicatedWishlistPage();
    renderAccountWishlistTab();
  }

  // 1. Dedicated Wishlist Page (pages/wishlist.html)
  function renderDedicatedWishlistPage() {
    const grid = document.getElementById('wishlist-grid');
    const toolbar = document.getElementById('wishlist-toolbar');
    const emptyState = document.getElementById('wishlist-empty');
    const countEl = document.getElementById('wishlist-page-count');
    if (!grid) return;

    const list = loadWishlist();
    if (countEl) countEl.textContent = list.length;

    if (list.length === 0) {
      grid.style.display = 'none';
      if (toolbar) toolbar.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      if (toolbar) toolbar.style.display = 'flex';
      grid.style.display = 'grid';

      if (window.PRODUCTS && window.renderProductCards) {
        const items = window.PRODUCTS.filter(p => list.includes(p.id));
        window.renderProductCards(items, grid);
      }
    }
  }

  // 2. Account Wishlist Tab (pages/account.html#wishlist)
  function renderAccountWishlistTab() {
    const grid = document.getElementById('account-wishlist-grid');
    const emptyMsg = document.getElementById('empty-wishlist-msg');
    if (!grid) return;

    const list = loadWishlist();
    if (list.length === 0) {
      grid.innerHTML = '';
      if (emptyMsg) emptyMsg.style.display = 'block';
      return;
    }

    if (emptyMsg) emptyMsg.style.display = 'none';

    if (window.PRODUCTS && window.renderProductCards) {
      const items = window.PRODUCTS.filter(p => list.includes(p.id));
      window.renderProductCards(items, grid);
    }
  }

  // Toolbar button listeners on dedicated wishlist page
  function initWishlistToolbar() {
    const moveAllBtn = document.getElementById('btn-move-all');
    const clearBtn = document.getElementById('btn-clear-wishlist');

    if (moveAllBtn) {
      moveAllBtn.addEventListener('click', window.moveAllWishlistToBag);
    }
    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to remove all items from your wishlist?')) {
          window.clearWishlist();
        }
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateWishlistBadge();
    syncWishlistButtons();
    renderAllWishlists();
    initWishlistToolbar();
  });

})();
