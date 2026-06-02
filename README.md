# DryTuch.com — Premium Dried Foods eCommerce

Production-ready React + Vite mobile-first PWA for **Dry Meat**, **Dry Vegetables**, **Dry Fruits**, and **Nuts**.

## Tech Stack

- **React 19** + **Vite 8**
- **React Router 7**
- **Redux Toolkit** (cart, auth, wishlist, UI)
- **Zustand** (header scroll state)
- **TanStack React Query**
- **Tailwind CSS 4**
- **Axios** + **JSON Server** mock API
- **Framer Motion**
- **React Hook Form**
- **vite-plugin-pwa**

## Quick Start

```bash
# Install dependencies
npm install

# Run app + mock API (ports 5173 + 3001)
npm run dev

# Client only
npm run dev:client

# Mock API only
npm run server

# Production build
npm run build
npm run preview
```

Open [http://localhost:5173](http://localhost:5173)

## Demo Login

- **Email:** `rahul@drytuch.com`
- **Password:** `demo123`

## Coupon Codes

- `DRYTUCH10` — 10% off (min ₹299)
- `WELCOME50` — ₹50 off (min ₹499)
- `NUTS20` — 20% off nuts category

## Folder Structure

```
├── public/                 # Static assets, logo, PWA icons
├── server/
│   └── db.json             # JSON Server mock database
├── src/
│   ├── api/                # Axios client + service layer
│   ├── components/
│   │   ├── home/           # Hero, categories, reviews
│   │   ├── layout/         # Header, bottom nav, splash
│   │   ├── product/        # ProductCard, ProductGrid
│   │   └── ui/             # Button, Input, Toast, etc.
│   ├── constants/
│   ├── hooks/
│   ├── pages/              # All 15+ screens
│   ├── routes/
│   ├── store/              # Redux + Zustand
│   └── utils/
├── index.html
├── vite.config.js
└── package.json
```

## Pages

| Route | Page |
|-------|------|
| `/splash` | Splash Screen |
| `/` | Home |
| `/categories` | Categories |
| `/categories/:slug` | Category Products |
| `/product/:id` | Product Details |
| `/search` | Search |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/orders` | Orders |
| `/orders/:id/track` | Order Tracking |
| `/profile` | Profile |
| `/wishlist` | Wishlist |
| `/notifications` | Notifications |
| `/offers` | Offers |
| `/about` | About Us |
| `/contact` | Contact |

## Brand Colors

| Token | Hex |
|-------|-----|
| Primary | `#7A2E0B` |
| Secondary | `#4D7C0F` |
| Accent | `#EAB308` |
| Background | `#F8F7F3` |

## Mock API Entities

`users`, `products`, `categories`, `orders`, `addresses`, `reviews`, `coupons`, `offers`, `notifications`, `banners`

## Mobile Features

- Bottom tab navigation
- Splash screen (first visit)
- Pull-to-refresh on home
- Framer Motion page transitions
- PWA installable
- Safe area insets for notched devices

## License

MIT
