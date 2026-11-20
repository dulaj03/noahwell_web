/**
 * NOAHVELLE — products.js
 * Central Product Catalog & Rendering Utilities
 */

(function () {
  'use strict';

  // 20 Curated Fashion Products with verified high-res Unsplash imagery
  const PRODUCTS = [
    {
      id: 1,
      name: "Luna Silk Slip Dress",
      category: "dresses",
      subcategory: "Evening Collection",
      price: 245.00,
      oldPrice: 320.00,
      isOnSale: true,
      discountPercent: 23,
      isNew: false,
      isFeatured: true,
      isBestSeller: true,
      rating: 4.9,
      reviewCount: 88,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Champagne", "Black", "Ivory"],
      description: "A bias-cut maxi slip dress woven from pure 19mm mulberry silk. Drapes effortlessly along the body with delicate rouleau straps and a soft cowl neckline.",
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["dresses", "featured", "sale", "evening"]
    },
    {
      id: 2,
      name: "Aurelia Cashmere Trench Coat",
      category: "jackets",
      subcategory: "Outerwear",
      price: 490.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      rating: 5.0,
      reviewCount: 34,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Camel", "Soft Charcoal"],
      description: "Crafted from double-faced cashmere and virgin wool blend. Features a relaxed storm flap, horn buttons, and a tie belt that defines the waist.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["jackets", "featured", "new-arrivals"]
    },
    {
      id: 3,
      name: "Céleste Pleated Linen Blouse",
      category: "tops",
      subcategory: "Ready-to-Wear",
      price: 135.00,
      oldPrice: 175.00,
      isOnSale: true,
      discountPercent: 23,
      isNew: false,
      isFeatured: true,
      isBestSeller: true,
      rating: 4.8,
      reviewCount: 62,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Warm White", "Beige", "Sky"],
      description: "Airy Belgian linen blouse detailed with micro-pin tuck pleating through the yoke and balloon sleeves finished with mother-of-pearl buttons.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["tops", "featured", "sale"]
    },
    {
      id: 4,
      name: "Seraphine Wide-Leg Silk Trousers",
      category: "bottoms",
      subcategory: "Tailored Separates",
      price: 185.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      rating: 4.7,
      reviewCount: 41,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Sand", "Soft Black"],
      description: "High-waisted fluid trousers featuring tailored front pleats, slant pockets, and an elongated wide-leg silhouette that flows with every stride.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["bottoms", "featured", "new-arrivals"]
    },
    {
      id: 5,
      name: "Vienne Minimalist Leather Mule",
      category: "shoes",
      subcategory: "Footwear",
      price: 210.00,
      oldPrice: 280.00,
      isOnSale: true,
      discountPercent: 25,
      isNew: false,
      isFeatured: true,
      isBestSeller: true,
      rating: 4.9,
      reviewCount: 119,
      sizes: ["36", "37", "38", "39", "40"],
      colors: ["Ivory", "Black", "Tan"],
      description: "Sculpted Italian nappa leather mule with an architectural 50mm kitten heel and cushioned footbed designed for all-day elegance.",
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["shoes", "featured", "sale"]
    },
    {
      id: 6,
      name: "Margaux Leather Shoulder Bag",
      category: "accessories",
      subcategory: "Leather Goods",
      price: 340.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: true,
      isFeatured: true,
      isBestSeller: true,
      rating: 5.0,
      reviewCount: 77,
      sizes: ["One Size"],
      colors: ["Espresso", "Cognac", "Alabaster"],
      description: "Full-grain calfskin leather shoulder bag with brushed gold hardware. Clean geometric curves with suede-lined interior compartments.",
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["accessories", "featured", "new-arrivals"]
    },
    {
      id: 7,
      name: "Élodie Ribbed Knit Midi Dress",
      category: "dresses",
      subcategory: "Knitwear",
      price: 195.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: true,
      isFeatured: true,
      isBestSeller: false,
      rating: 4.8,
      reviewCount: 52,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Oatmeal", "Charcoal"],
      description: "Fine-gauge merino wool rib-knit dress with a gentle scoop neckline and side slit. A minimalist canvas for layering through every season.",
      image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["dresses", "featured", "new-arrivals"]
    },
    {
      id: 8,
      name: "Solene Tailored Linen Blazer",
      category: "jackets",
      subcategory: "Tailoring",
      price: 275.00,
      oldPrice: 350.00,
      isOnSale: true,
      discountPercent: 21,
      isNew: false,
      isFeatured: true,
      isBestSeller: false,
      rating: 4.6,
      reviewCount: 29,
      sizes: ["S", "M", "L"],
      colors: ["Ecru", "Taupe"],
      description: "Single-breasted relaxed blazer in washed structured linen. Unlined for breathable, effortless drape with padded shoulders and welt pockets.",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["jackets", "featured", "sale"]
    },
    {
      id: 9,
      name: "Camille Poplin Wrap Shirt",
      category: "tops",
      subcategory: "Shirts",
      price: 120.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: true,
      isFeatured: false,
      isBestSeller: true,
      rating: 4.8,
      reviewCount: 64,
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Crisp White", "French Blue"],
      description: "Crisp organic cotton poplin tailored with an asymmetrical crossover wrap waist and extended French cuffs.",
      image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["tops", "new-arrivals"]
    },
    {
      id: 10,
      name: "Isla Tiered Cotton Maxi Skirt",
      category: "bottoms",
      subcategory: "Skirts",
      price: 145.00,
      oldPrice: 190.00,
      isOnSale: true,
      discountPercent: 24,
      isNew: false,
      isFeatured: false,
      isBestSeller: false,
      rating: 4.7,
      reviewCount: 38,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Off-White", "Sage"],
      description: "Voluminous tiered skirt crafted from breathable textured cotton gauze with a comfortable gathered elasticated waistline.",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["bottoms", "sale"]
    },
    {
      id: 11,
      name: "Noor Tiered Ruffle Chiffon Gown",
      category: "dresses",
      subcategory: "Evening Collection",
      price: 360.00,
      oldPrice: 480.00,
      isOnSale: true,
      discountPercent: 25,
      isNew: false,
      isFeatured: false,
      isBestSeller: false,
      rating: 5.0,
      reviewCount: 45,
      sizes: ["S", "M", "L"],
      colors: ["Blush", "Champagne"],
      description: "Float through gala evenings in ethereal layered silk chiffon. Features cascading ruffles and an open back tie fastening.",
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["dresses", "sale", "evening"]
    },
    {
      id: 12,
      name: "Clara Cropped Mohair Cardigan",
      category: "tops",
      subcategory: "Knitwear",
      price: 165.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: true,
      isFeatured: false,
      isBestSeller: false,
      rating: 4.6,
      reviewCount: 22,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Cream", "Dusty Rose"],
      description: "Spun from ultra-soft brushed kid mohair and silk blend. Finished with tortoiseshell buttons and rib-trimmed hems.",
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["tops", "new-arrivals"]
    },
    {
      id: 13,
      name: "Paloma Strappy Leather Sandal",
      category: "shoes",
      subcategory: "Footwear",
      price: 180.00,
      oldPrice: 240.00,
      isOnSale: true,
      discountPercent: 25,
      isNew: false,
      isFeatured: false,
      isBestSeller: false,
      rating: 4.5,
      reviewCount: 31,
      sizes: ["36", "37", "38", "39", "40", "41"],
      colors: ["Gold", "Black"],
      description: "Fine leather cord ankle ties and square open toe. Handcrafted in Tuscany with smooth leather soles and a slim 40mm block heel.",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["shoes", "sale"]
    },
    {
      id: 14,
      name: "Athena Hammered Gold Earrings",
      category: "accessories",
      subcategory: "Fine Jewelry",
      price: 95.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: true,
      isFeatured: false,
      isBestSeller: true,
      rating: 4.9,
      reviewCount: 142,
      sizes: ["One Size"],
      colors: ["18k Gold Vermeil"],
      description: "Sculptural drop earrings with an organic hand-hammered finish that catches the light with subtle brilliance. Hypoallergenic.",
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["accessories", "new-arrivals"]
    },
    {
      id: 15,
      name: "Giselle Sculpted Wool Coat",
      category: "jackets",
      subcategory: "Outerwear",
      price: 420.00,
      oldPrice: 560.00,
      isOnSale: true,
      discountPercent: 25,
      isNew: false,
      isFeatured: false,
      isBestSeller: false,
      rating: 4.9,
      reviewCount: 40,
      sizes: ["S", "M", "L"],
      colors: ["Ivory", "Midnight"],
      description: "Architectural structured cocoon coat made from 100% boiled wool. Features a high stand collar and hidden snap placket.",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["jackets", "sale"]
    },
    {
      id: 16,
      name: "Helena Pleated Satin Midi Skirt",
      category: "bottoms",
      subcategory: "Skirts",
      price: 155.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: true,
      isFeatured: false,
      isBestSeller: false,
      rating: 4.8,
      reviewCount: 26,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Champagne", "Black"],
      description: "Accordion-pleated Japanese satin with a soft lustrous sheen. Moves gracefully with every step, paired effortlessly with knitwear or tailoring.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["bottoms", "new-arrivals"]
    },
    {
      id: 17,
      name: "Vivienne Silk Velvet Evening Blazer",
      category: "jackets",
      subcategory: "Evening Collection",
      price: 310.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: false,
      isFeatured: false,
      isBestSeller: true,
      rating: 4.9,
      reviewCount: 58,
      sizes: ["S", "M", "L"],
      colors: ["Noir", "Deep Emerald"],
      description: "Plush silk-rayon velvet tuxedo jacket with contrast silk satin peak lapels and covered buttons. The epitome of modern black-tie dressing.",
      image: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["jackets", "evening"]
    },
    {
      id: 18,
      name: "Sienna Woven Raffia Tote",
      category: "accessories",
      subcategory: "Bags",
      price: 160.00,
      oldPrice: 220.00,
      isOnSale: true,
      discountPercent: 27,
      isNew: false,
      isFeatured: false,
      isBestSeller: false,
      rating: 4.7,
      reviewCount: 39,
      sizes: ["One Size"],
      colors: ["Natural / Black Leather"],
      description: "Hand-braided Madagascan raffia basket bag with smooth saddle leather handles and a removable linen pouch insert.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["accessories", "sale"]
    },
    {
      id: 19,
      name: "Sora Silk Organza Shirtdress",
      category: "dresses",
      subcategory: "Dresses",
      price: 280.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: true,
      isFeatured: false,
      isBestSeller: false,
      rating: 4.8,
      reviewCount: 19,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Alabaster"],
      description: "Sheer silk organza shirtdress layered over a matching silk slip. Features a sharp collar, mother-of-pearl buttons, and a sash tie belt.",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["dresses", "new-arrivals"]
    },
    {
      id: 20,
      name: "Genevieve Italian Suede Loafers",
      category: "shoes",
      subcategory: "Footwear",
      price: 225.00,
      oldPrice: null,
      isOnSale: false,
      discountPercent: 0,
      isNew: false,
      isFeatured: false,
      isBestSeller: true,
      rating: 4.8,
      reviewCount: 84,
      sizes: ["36", "37", "38", "39", "40", "41"],
      colors: ["Taupe Suede", "Black Suede"],
      description: "Butter-soft velvety calf suede loafers unlined for glove-like comfort. Classic penny saddle strap and stitched leather sole.",
      image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
      hoverImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
      inStock: true,
      tags: ["shoes"]
    }
  ];

  // Helper getters
  window.PRODUCTS = PRODUCTS;
  window.products = PRODUCTS; // alias

  window.getProductById = function (id) {
    return PRODUCTS.find(p => p.id === Number(id)) || null;
  };

  window.getFeaturedProducts = function () {
    return PRODUCTS.filter(p => p.isFeatured);
  };

  window.getNewArrivals = function () {
    return PRODUCTS.filter(p => p.isNew);
  };

  window.getSaleProducts = function () {
    return PRODUCTS.filter(p => p.isOnSale);
  };

  window.getProductsByCategory = function (cat) {
    if (!cat || cat === 'all') return PRODUCTS;
    const c = cat.toLowerCase();
    if (c === 'new' || c === 'new-arrivals') return PRODUCTS.filter(p => p.isNew);
    if (c === 'sale') return PRODUCTS.filter(p => p.isOnSale);
    if (c === 'women') return PRODUCTS;
    return PRODUCTS.filter(p => p.category.toLowerCase() === c || p.tags.includes(c));
  };

  // Star rating helper
  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '★';
    while (stars.length < 5) stars += '☆';
    return stars;
  }

  // Currency formatting helper
  const formatPrice = window.formatPrice || function (amount) {
    const num = Number(amount) || 0;
    return `LKR ${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  if (!window.formatPrice) window.formatPrice = formatPrice;

  // Generate HTML string for single product card
  window.renderProductCard = function (product, isSlider = false) {
    const isWish = window.isWishlisted ? window.isWishlisted(product.id) : false;
    const badgeHtml = product.isOnSale
      ? `<span class="badge badge-sale">-${product.discountPercent}%</span>`
      : product.isNew
      ? `<span class="badge badge-new">NEW</span>`
      : '';

    const priceHtml = product.isOnSale
      ? `<span class="product-price-current">${formatPrice(product.price)}</span>
         <span class="product-price-old">${formatPrice(product.oldPrice)}</span>`
      : `<span class="product-price-current">${formatPrice(product.price)}</span>`;

    const cardClass = isSlider ? 'product-card slider-item' : 'product-card';

    return `
      <article class="${cardClass}" data-id="${product.id}" data-category="${product.category}">
        <div class="product-image product-card-image">
          <div class="product-badge product-badge-group">${badgeHtml}</div>
          <button class="wishlist-btn ${isWish ? 'active wishlisted' : ''}" 
                  aria-label="${isWish ? 'Remove from wishlist' : 'Add to wishlist'}" 
                  data-id="${product.id}" 
                  onclick="event.stopPropagation(); window.toggleWishlist && window.toggleWishlist(${product.id})">
            <svg viewBox="0 0 24 24" fill="${isWish ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.6">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <div class="product-img-wrap product-card-image-wrap" onclick="window.openQuickView && window.openQuickView(${product.id})">
            <img class="product-img-main product-card-img" src="${product.image}" alt="${product.name}" loading="lazy" />
            <img class="product-img-hover product-card-img-hover" src="${product.hoverImage}" alt="${product.name} alternate view" loading="lazy" />
          </div>
          <div class="product-card-actions">
            <button class="quick-view-btn" onclick="event.stopPropagation(); window.openQuickView && window.openQuickView(${product.id})">
              QUICK VIEW
            </button>
            <button class="add-to-cart-btn" onclick="event.stopPropagation(); window.addToCart && window.addToCart(${product.id}, '${product.sizes[0]}', '${product.colors[0]}', 1)">
              + ADD TO BAG
            </button>
          </div>
        </div>
        <div class="product-info product-card-info" onclick="window.openQuickView && window.openQuickView(${product.id})">
          <span class="product-category product-card-category">${product.subcategory || product.category}</span>
          <h3 class="product-name product-card-title">${product.name}</h3>
          <div class="product-rating product-card-rating" title="Rated ${product.rating} out of 5">
            <span class="stars">${renderStars(product.rating)}</span>
            <span class="rating-count">(${product.reviewCount})</span>
          </div>
          <div class="product-price product-card-price">
            ${priceHtml}
          </div>
        </div>
      </article>
    `;
  };

  // DOM node creator
  window.createProductCard = function (product, isSlider = false) {
    const div = document.createElement('div');
    div.innerHTML = window.renderProductCard(product, isSlider).trim();
    return div.firstElementChild;
  };

  // Render cards into container element
  window.renderProductCards = function (productList, container, isSlider = false) {
    if (!container) return;
    if (!productList || productList.length === 0) {
      container.innerHTML = `<div class="empty-products"><p>No pieces found in this selection.</p></div>`;
      return;
    }
    container.innerHTML = productList.map(p => window.renderProductCard(p, isSlider)).join('');
  };

})();
