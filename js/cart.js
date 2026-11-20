/**
 * NOAHVELLE — cart.js
 * Shopping Bag state management & localStorage persistence
 */

(function () {
  'use strict';

  const CART_KEY = 'noahvelle_cart';
  const PROMO_KEY = 'noahvelle_promo';
  const SHIPPING_THRESHOLD = 150.00;
  const STANDARD_SHIPPING = 15.00;

  // Active promo codes
  const PROMO_CODES = {
    'NOAHVELLE10': 0.10, // 10% off
    'WELCOME20': 0.20,   // 20% off
    'ELEGANCE15': 0.15   // 15% off
  };

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
  }

  window.getCart = function () {
    return loadCart();
  };

  window.getCartCount = function () {
    const cart = loadCart();
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  window.getCartSubtotal = function () {
    const cart = loadCart();
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  window.addToCart = function (productId, size, color, quantity = 1) {
    const product = window.getProductById ? window.getProductById(productId) : null;
    if (!product) return;

    const cart = loadCart();
    const chosenSize = size || (product.sizes && product.sizes[0]) || 'M';
    const chosenColor = color || (product.colors && product.colors[0]) || 'Default';
    const qty = parseInt(quantity, 10) || 1;

    // Check if item already exists with matching size and color
    const existingIndex = cart.findIndex(
      item => item.id === product.id && item.size === chosenSize && item.color === chosenColor
    );

    if (existingIndex > -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        size: chosenSize,
        color: chosenColor,
        quantity: qty
      });
    }

    saveCart(cart);

    if (typeof window.showToast === 'function') {
      window.showToast(`"${product.name}" added to your bag.`, 'success');
    }

    // If on cart page, re-render
    if (document.getElementById('cart-items-container')) {
      renderCartPage();
    }
  };

  window.removeFromCart = function (index) {
    const cart = loadCart();
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1)[0];
      saveCart(cart);
      if (typeof window.showToast === 'function' && removed) {
        window.showToast(`Removed "${removed.name}" from your bag.`, 'info');
      }
      renderCartPage();
    }
  };

  window.updateCartQuantity = function (index, delta) {
    const cart = loadCart();
    if (index >= 0 && index < cart.length) {
      cart[index].quantity += delta;
      if (cart[index].quantity <= 0) {
        window.removeFromCart(index);
        return;
      }
      saveCart(cart);
      renderCartPage();
    }
  };

  window.clearCart = function () {
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(PROMO_KEY);
    updateCartBadge();
    renderCartPage();
  };

  function updateCartBadge() {
    const count = window.getCartCount();
    const badges = document.querySelectorAll('.cart-count');
    badges.forEach(badge => {
      badge.textContent = count;
      badge.setAttribute('data-count', count);
      if (count > 0) {
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    });

    const pageCountEl = document.getElementById('cart-item-count');
    if (pageCountEl) {
      pageCountEl.textContent = count;
    }
  }
  window.updateCartBadge = updateCartBadge;

  function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('empty-cart');
    if (!container) return;

    const cart = loadCart();
    const subtotal = window.getCartSubtotal();

    // Check Promo
    let discountRate = 0;
    const storedPromo = localStorage.getItem(PROMO_KEY);
    if (storedPromo && PROMO_CODES[storedPromo]) {
      discountRate = PROMO_CODES[storedPromo];
    }

    const discountAmount = subtotal * discountRate;
    const shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0.00 : STANDARD_SHIPPING;
    const total = Math.max(0, subtotal - discountAmount + shipping);

    if (cart.length === 0) {
      container.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      if (emptyState) emptyState.style.display = 'none';
      container.style.display = 'block';

      container.innerHTML = cart.map((item, idx) => `
        <div class="cart-item" data-index="${idx}">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="cart-item-details">
            <div class="cart-item-info">
              <h3 class="cart-item-name">${item.name}</h3>
              <p class="cart-item-category">${item.category}</p>
              <p class="cart-item-meta">Size: <strong>${item.size}</strong> &nbsp;|&nbsp; Color: <strong>${item.color}</strong></p>
            </div>
            <div class="cart-item-price-col">
              <p class="cart-item-price">${window.formatPrice ? window.formatPrice(item.price) : 'LKR ' + item.price.toFixed(2)}</p>
              <div class="quantity-control">
                <button class="qty-btn qty-minus" onclick="window.updateCartQuantity(${idx}, -1)" aria-label="Decrease quantity">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn qty-plus" onclick="window.updateCartQuantity(${idx}, 1)" aria-label="Increase quantity">+</button>
              </div>
              <p class="cart-item-subtotal">${window.formatPrice ? window.formatPrice(item.price * item.quantity) : 'LKR ' + (item.price * item.quantity).toFixed(2)}</p>
              <button class="remove-item" onclick="window.removeFromCart(${idx})" aria-label="Remove item" title="Remove">✕</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Update Summary fields
    const format = window.formatPrice || (val => `LKR ${Number(val).toFixed(2)}`);
    const subtotalEl = document.getElementById('summary-subtotal');
    if (subtotalEl) subtotalEl.textContent = format(subtotal);

    const shippingEl = document.getElementById('summary-shipping');
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : format(shipping);

    const discountRow = document.getElementById('discount-row');
    const discountEl = document.getElementById('summary-discount');
    if (discountRow && discountEl) {
      if (discountAmount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-${format(discountAmount)} (${Math.round(discountRate * 100)}% off)`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    const totalEl = document.getElementById('summary-total');
    if (totalEl) totalEl.textContent = format(total);
  }
  window.renderCartPage = renderCartPage;

  // Setup Promo Code handling
  function initPromoForm() {
    const applyBtn = document.getElementById('apply-promo');
    const promoInput = document.getElementById('promo-input');
    const promoMsg = document.getElementById('promo-message');
    if (!applyBtn || !promoInput) return;

    applyBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const code = promoInput.value.trim().toUpperCase();
      if (!code) return;

      if (PROMO_CODES[code]) {
        localStorage.setItem(PROMO_KEY, code);
        if (promoMsg) {
          promoMsg.textContent = `Code ${code} applied successfully!`;
          promoMsg.className = 'promo-message promo-success';
        }
        if (typeof window.showToast === 'function') {
          window.showToast(`Promo code ${code} applied!`, 'success');
        }
        renderCartPage();
      } else {
        if (promoMsg) {
          promoMsg.textContent = 'Invalid promo code. Try NOAHVELLE10 or WELCOME20.';
          promoMsg.className = 'promo-message promo-error';
        }
        if (typeof window.showToast === 'function') {
          window.showToast('Invalid promo code.', 'error');
        }
      }
    });

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function () {
        const cart = loadCart();
        if (cart.length === 0) {
          if (typeof window.showToast === 'function') {
            window.showToast('Your bag is currently empty.', 'error');
          }
          return;
        }
        if (typeof window.showToast === 'function') {
          window.showToast('Proceeding to checkout — connecting to secure gateway...', 'info');
        }
      });
    }
  }

  // Populate recommendations on cart page
  function initCartRecommendations() {
    const recGrid = document.getElementById('recommendations-grid');
    if (!recGrid || !window.PRODUCTS) return;
    const recs = window.PRODUCTS.slice(4, 8);
    if (window.renderProductCards) {
      window.renderProductCards(recs, recGrid);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    renderCartPage();
    initPromoForm();
    initCartRecommendations();
  });

})();
