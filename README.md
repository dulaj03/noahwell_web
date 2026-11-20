# NOAHVELLE — Elegant Fashion E-Commerce Frontend

**NOAHVELLE** is a complete, modern, responsive fashion e-commerce frontend designed with an editorial aesthetic inspired by luxury international fashion houses. Built purely with semantic **HTML5**, modern **CSS3**, and **Vanilla JavaScript** (no external UI libraries, no Tailwind, no Bootstrap, no React).

---

## 📁 Project Folder Structure

```text
noahvelle/
│
├── index.html                  # Homepage (Hero Carousel, Categories, Featured, Slider, Promo, Offers, Newsletter)
├── README.md                   # Project documentation & backend integration guide
│
├── pages/                      # Inner Pages
│   ├── shop.html               # Shop All Catalog (Sidebar Filters, Sorting, Grid/List views)
│   ├── offers.html             # Offers & Seasonal Sales (Live Countdown Timer, Sale Grid)
│   ├── wishlist.html           # Dedicated Saved Wishlist (Move All to Bag, Empty State)
│   ├── about.html              # Brand Story, Philosophy, Values, Atelier & Stats
│   ├── privacy-policy.html     # Comprehensive Legal & Privacy Policy
│   ├── cart.html               # Interactive Shopping Bag (Quantity, Promo Codes, Order Summary)
│   ├── account.html            # Customer Dashboard (Orders, Wishlist, Profile, Addresses, Settings)
│   └── login.html              # Authentication (Split Layout, Sign In & Create Account, Validation)
│
├── assets/
│   ├── images/
│   │   ├── hero/               # Hero carousel imagery
│   │   ├── products/           # Product photography
│   │   ├── categories/         # Category banner images
│   │   ├── banners/            # Promotional campaign banners
│   │   └── logo/               # Brand logos and favicons
│   ├── icons/                  # SVG iconography
│   └── fonts/                  # Custom web typography
│
├── css/
│   ├── style.css               # Global variables, reset, typography & utility classes
│   ├── components.css          # Navigation, buttons, badges, modals, toast notifications & footer
│   ├── responsive.css          # Breakpoints (Mobile 320px–767px, Tablet 768px–1023px, Desktop 1024px+)
│   └── pages/
│       ├── home.css            # Home page specific layout & animations
│       ├── shop.css            # Shop layout, sidebar filters, category tabs & offer grids
│       ├── product.css         # Product card styling & Quick View modal
│       ├── about.css           # About page alternating panels & atelier banner
│       ├── cart.css            # Shopping bag layout & order summary card
│       ├── account.css         # Account dashboard tabs & orders list
│       └── auth.css            # Login/Signup split layout & form styling
│
└── js/
    ├── main.js                 # Global header, mobile menu, scroll reveal, toasts & Quick View modal
    ├── products.js             # Central 20-item product catalog data & card rendering engine
    ├── cart.js                 # Cart state in localStorage, quantity controls, shipping & promo codes
    ├── wishlist.js             # Wishlist state in localStorage & toggle synchronization
    ├── search.js               # Real-time search overlay, keyword indexing & autocomplete tags
    ├── filters.js              # Shop page category tabs, sidebar filters, price slider & sorting
    ├── auth.js                 # Form validation, password visibility toggles, strength meter & user session
    └── components.js           # Shared header & footer injection with relative path resolution
```

---

## 🎨 Visual Identity & Design System

- **Palette**: Refined neutrals (Ivory `#FAFAF7`, Warm White `#F5F4F0`, Soft Beige `#E8E0D5`, Champagne `#D4C5A9`, Taupe `#A89880`, Charcoal `#2C2C2C`, Soft Black `#1A1A1A`).
- **Typography**:
  - Headings: *Playfair Display* (classic high-fashion editorial serif).
  - Body & Navigation: *Jost* (clean, modern geometric sans-serif with spacious tracking).
- **Aesthetic**: Luxury fashion editorial, generous whitespace, subtle micro-interactions, minimal borders, and smooth transitions.

---

## ⚡ Interactive Features

1. **Hero Carousel**: Multi-slide transition on the homepage with autoplay, previous/next arrows, and dot indicators.
2. **Dynamic Product Rendering**: Centralized product database in `js/products.js` with 20 curated luxury pieces across dresses, tops, bottoms, jackets, shoes, and accessories.
3. **Product Quick View Modal**: Inspect any piece from any page with size selection, color swatches, quantity controls, add to bag, and wishlist toggling.
4. **Persistent Shopping Bag**: Stored in browser `localStorage`. Real-time count badges, item removal, quantity adjustment, free shipping calculation (orders over LKR 150), and active promo codes (`NOAHVELLE10`, `WELCOME20`).
5. **Persistent Wishlist**: One-click heart toggling with visual state synchronization across cards and the Account dashboard.
6. **Real-Time Search Overlay**: Instant filtering by product name, category, or description with popular search tag suggestions.
7. **Shop Catalog Filtering & Sorting**: Filter by category, clothing size (XS–XXL), color palette, price range (LKR 0–LKR 500), in-stock availability, and customer rating. Sort by Featured, Newest, Price (Low/High), and Best Selling.
8. **Offers Page Countdown**: Live 3-day sale countdown timer with persistent expiration timestamp.
9. **Authentication & Form Validation**: Client-side validation with inline error feedback, password visibility eye toggles, password strength meter, and seamless redirect to the account dashboard.
10. **Toast Notification System**: Global `window.showToast(message, type)` notification toasts for feedback on bag updates, wishlist actions, newsletter subscriptions, and login events.

---

## 🚀 How to Run Locally

1. **Direct Browser Access**:
   Double click `index.html` or open it with any web browser (`Chrome`, `Edge`, `Safari`, `Firefox`).
   > All navigation links and assets use relative paths, ensuring full functionality when loaded directly via `file:///`.

2. **Using a Local Development Server**:
   ```bash
   # Using VS Code Live Server extension:
   # Right click index.html -> "Open with Live Server"

   # Or using Python:
   python -m http.server 8000

   # Or using Node.js:
   npx serve .
   ```

---

## 🔌 Connecting a Backend / API Later

The frontend is modular and designed for straightforward API integration without refactoring markup or CSS:

| Module | Current Frontend Source | Future Backend Endpoint |
|---|---|---|
| **Products** | `js/products.js` (`window.PRODUCTS`) | `GET /api/v1/products` |
| **Search** | `js/search.js` (client filter) | `GET /api/v1/products/search?q=...` |
| **Cart** | `js/cart.js` (`localStorage`) | `GET/POST /api/v1/cart` |
| **Wishlist** | `js/wishlist.js` (`localStorage`) | `GET/POST /api/v1/wishlist` |
| **Authentication** | `js/auth.js` (`localStorage`) | `POST /api/v1/auth/login`, `POST /api/v1/auth/register` |
| **Orders** | `pages/account.html` | `GET /api/v1/orders` |
| **Checkout** | `pages/cart.html` | `POST /api/v1/checkout/session` (Stripe/PayPal) |

---

## © License & Brand
© 2026 NOAHVELLE. All rights reserved. Designed for modern luxury fashion.
