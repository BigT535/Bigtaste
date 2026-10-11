# BIG TASTE NIGERIA — Authentic Nigerian Restaurant & Kitchen Management

A production-oriented full-stack restaurant ordering web application with customer-facing storefront, authoritative server-side order calculation, unguessable token-based customer order tracking, and a private, role-based Kitchen Management Dashboard (Kitchen Display System), specialized in authentic Nigerian cuisine.

---

## 1. Nigerian Cuisine & Menu Offerings

- **Rice Specialties**:
  - **Smoky Nigerian Party Jollof Rice**: Signature slow-steamed long-grain rice infused with blended scotch bonnets (ata rodo), tomatoes, sweet onions, and bottom-pot firewood smokiness. Paired with crispy grilled chicken, fried beef, or assorted meats and sweet fried plantains (dodo).
  - **Nigerian Special Fried Rice**: Fragrant basmati rice stir-fried in rich chicken stock, curry, thyme, sweet corn, diced carrots, runner beans, and seasoned beef liver.
  - **Authentic Ofada Rice & Ayamase Stew**: Fermented unpolished brown Ofada rice paired with bleached palm oil green pepper Designer Stew, iru locust beans, and boiled egg.
  - **Native Village Concoction Rice**: Homestyle palm oil rice cooked slowly with flaked smoked catfish, dried prawns, locust beans, and scent leaves.

- **Traditional Soups & Swallows**:
  - **Lump Egusi Soup**: Rich ground melon seed soup simmered in palm oil with wild spinach, stockfish, dried catfish, and assorted meats.
  - **Draw Ogbono Soup**: Silky, aromatic wild bush mango seed soup cooked with dry fish, uziza pepper leaves, and braised meats.
  - **Yoruba Efo Riro Elegusi**: Vibrant vegetable stew loaded with blanched green shoko leaves, coarse blended tatase peppers, locust beans (iru), and smoked ponmo.
  - **Seafood Ila Alasepo Okra Soup**: Hand-chopped fresh okra soup in rich seafood stock loaded with jumbo tiger prawns, blue crab clusters, and fresh fish.
  - **Calabar Royal Edikang Ikong**: Nutrient-dense Cross River vegetable soup prepared with fresh waterleaf, fluted pumpkin (ugwu), periwinkle, and snails.
  - **Swallows**: Fresh Pounded Yam (Iyan), Yellow Ijebu Eba, Smooth Amala Dudu (Elubo), and Soft Fermented Cassava Fufu.

- **Grills, Small Chops & Sides**:
  - **Authentic Northern Beef Suya**: Thinly sliced tender beef skewers coated in roasted peanut yaji spice, flame-grilled and served with sliced red onions and tomatoes on butcher paper.
  - **Fiery Goat Meat Pepper Soup**: Bone-in goat meat slow-simmered in an aromatic broth with Aidan fruit, calabash nutmeg, and scotch bonnets.
  - **Steamed Moi Moi Elegusi**: Silky steamed bean pudding blended with crayfish, boiled eggs, and flaked fish.
  - **Crispy Golden Akara**: Light and fluffy whipped bean fritters deep-fried with minced onions and scotch bonnets.
  - **Crispy Nigerian Grilled Peppered Chicken**: Hard country chicken glazed in sizzling ata din-din pepper reduction.
  - **Golden Fried Sweet Plantains (Dodo)**: Caramelized ripe plantains fried golden brown.

- **Authentic Drinks**:
  - **Chilled Artisan Zobo**: Steeped dried roselle hibiscus petals with fresh crushed ginger, cloves, and pineapple puree.
  - **Signature Nigerian Chapman Mocktail**: Fanta, Sprite, Angostura bitters, pomegranate grenadine, cucumber wheels, and citrus.
  - **Fresh Spiced Kunu Zaki**: Traditional spiced beverage from sprouted millet, tiger nuts, and ginger.
  - **Chilled Fresh Palm Wine (Emu)**: Sweet, naturally effervescent tapped palm sap.
  - **Chilled Malta Guinness & Soft Drinks**: Rich non-alcoholic dark malt beverage.

### B. Private Kitchen Management Dashboard (`/kitchen` or `#kitchen`)
- **Access Control & Staff Sign-in**:
  - Completely hidden from customer navigation; accessible via direct route or discreet footer portal.
  - Rejects unauthenticated requests with HTTP 401; interface shows staff login form.
  - Role-Based Access Control (RBAC): `kitchen_staff`, `manager`, and `owner`.
- **Kitchen Display System (KDS)**:
  - Multi-column/filtered order queue (All Active, New Pending, Preparing, Ready, Completed).
  - Elapsed waiting time counter ("3 mins ago", "12 mins ago").
  - Clear visual tickets with quantities, highlighted modifications, and customer notes.
  - One-click workflow state transitions (`pending` → `confirmed` → `preparing` → `ready` → `completed`).
  - Audio chime toggle for incoming orders.
  - Full modal ticket view with printable kitchen docket.
- **Manager Section** (`manager` & `owner`):
  - Live Menu Manager: Add items, edit prices/descriptions, and toggle instant availability ("In Stock" / "Sold Out").
  - Store Settings: Toggle kitchen accepting/paused, adjust tax rate, delivery fee, prep times, and opening hours.
- **Owner Section** (`owner` only):
  - Staff Management: Provision staff credentials, toggle active/disabled status, and assign roles.

---

## 2. Project File Structure

```
├── .env.example                     # Environment configuration reference
├── index.html                       # Entry HTML with meta and Google Fonts
├── metadata.json                    # AI Studio applet metadata
├── netlify.toml                     # Netlify deployment, redirect, & SPA fallback configuration
├── package.json                     # Dependencies & scripts
├── server.ts                        # Full-stack Express server with Vite middleware integration
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite build configuration with Tailwind CSS plugin
├── data/
│   └── restaurant-db.json           # Persistent database file (auto-seeded)
└── src/
    ├── App.tsx                      # Root coordinator with deep-linking & views
    ├── index.css                    # Tailwind CSS configuration & font variables
    ├── main.tsx                     # React 19 application mount
    ├── assets/
    │   └── images/                  # High-resolution food photography assets
    │       ├── big_taste_hero_spread_*.jpg
    │       ├── big_taste_smashed_burger_*.jpg
    │       ├── big_taste_artisan_pizza_*.jpg
    │       └── big_taste_crispy_chicken_*.jpg
    ├── components/
    │   ├── Header.tsx               # Top Bar Contract header
    │   ├── HeroSection.tsx          # Split hero banner & trust counters
    │   ├── MenuSection.tsx          # Menu grid, search, categories, & dietary filters
    │   ├── ItemCustomizationModal.tsx # Option customizer & quantity stepper
    │   ├── CartDrawer.tsx           # Slide-out bag with fee calculations
    │   ├── CheckoutModal.tsx        # Checkout form with authoritative submit
    │   ├── OrderTrackingView.tsx    # Live customer tracking with polling
    │   ├── WhyChooseSection.tsx     # Quality pillars
    │   ├── HowOrderingWorksSection.tsx # 3-step order guide
    │   ├── TestimonialsSection.tsx  # Customer reviews
    │   ├── ContactSection.tsx       # Opening hours & restaurant information
    │   ├── Footer.tsx               # Footer with discrete staff portal entry
    │   └── kitchen/
    │       ├── KitchenDashboard.tsx # Kitchen Display System & staff tabs
    │       ├── OrderCard.tsx        # Touch-friendly order ticket card
    │       ├── OrderTicketModal.tsx # Full docket & audit trail modal
    │       ├── MenuManager.tsx      # Manager menu & availability tools
    │       ├── SettingsManager.tsx  # Manager store & fee settings
    │       └── StaffManager.tsx     # Owner user provisioning & RBAC
    ├── context/
    │   ├── CartContext.tsx          # Cart state with localStorage persistence
    │   └── StaffAuthContext.tsx     # Staff authentication & role helper
    ├── server/
    │   ├── api.ts                   # Express router, authentication & validation
    │   └── db.ts                    # Persistent database engine, PBKDF2 hashing, & state machine
    ├── services/
    │   └── api.ts                   # Typed frontend API client
    └── types/
        └── restaurant.ts            # TypeScript domain interfaces
```

---

## 3. Architecture Overview

### Frontend
- **React 19 + TypeScript**: Modular components using hooks and Context API.
- **Tailwind CSS v4**: High-contrast, domain-specific styling with `@theme` token definitions.
- **Client Routing**: Hash-based deep routing (`#kitchen`, `#track=<UUID>`, `#menu`) compatible with static hosting, Netlify, and Cloud Run.

### Backend & Authorization
- **Express 4.21** running in `server.ts` with Vite middlewares in dev mode, serving compiled assets in production.
- **Server-Side Authoritative Pricing**: Clients submit only item IDs and chosen options. Prices, taxes, delivery fees, and order totals are calculated exclusively by the backend using trusted menu items.
- **Cryptographic Staff Sessions**: HMAC-SHA256 signed bearer tokens with 24-hour expiration.
- **Salted Password Hashing**: PBKDF2 with 10,000 iterations and 64-byte keys.
- **Least-Privilege RBAC**:
  - Anonymous: Read menu, read public settings, place order, track order using token.
  - `kitchen_staff`: Read kitchen orders, update order status.
  - `manager`: Kitchen privileges + edit menu items, adjust prices, edit settings.
  - `owner`: All manager privileges + provision staff accounts and modify roles.

---

## 4. Database Schema & Security Rules

### Entities
1. **`menuItems`**: `id`, `name`, `description`, `category`, `price`, `imageUrl`, `isAvailable`, `isPopular`, `dietaryTags`, `customizations`, `createdAt`, `updatedAt`.
2. **`orders`**: `id` (e.g. `BT-8021`), `trackingToken` (UUIDv4), `customer` (`name`, `phone`, `email`, `address`, `notes`), `fulfillment`, `items` (authoritatively calculated), `subtotal`, `tax`, `deliveryFee`, `total`, `paymentMethod`, `paymentStatus`, `status`, `createdAt`, `updatedAt`, `estimatedMinutes`.
3. **`orderStatusHistory`**: `id`, `orderId`, `fromStatus`, `toStatus`, `timestamp`, `staffId`, `staffName`, `staffRole`, `note`.
4. **`staffProfiles`**: `id`, `username`, `fullName`, `role`, `passwordHash`, `salt`, `isActive`, `createdAt`.
5. **`restaurantSettings`**: `restaurantName`, `currency`, `taxRatePercent`, `deliveryFee`, `minimumOrderDelivery`, `openingHours`, `isOpen`, `phone`, `address`.

### Access Rules Summary
| Resource | Anonymous Customer | Kitchen Staff | Manager | Owner |
|---|---|---|---|---|
| `GET /api/menu` | Allowed | Allowed | Allowed | Allowed |
| `GET /api/settings` | Allowed | Allowed | Allowed | Allowed |
| `POST /api/orders` | Allowed (Validated) | Allowed | Allowed | Allowed |
| `GET /api/orders/track/:token` | Allowed (Token only) | Allowed | Allowed | Allowed |
| `GET /api/staff/orders` | **DENIED (401)** | Allowed | Allowed | Allowed |
| `PATCH /api/staff/orders/:id/status` | **DENIED (401)** | Allowed | Allowed | Allowed |
| `POST /api/manager/menu` | **DENIED (401)** | **DENIED (403)** | Allowed | Allowed |
| `PATCH /api/manager/settings` | **DENIED (401)** | **DENIED (403)** | Allowed | Allowed |
| `GET/POST /api/owner/staff` | **DENIED (401)** | **DENIED (403)** | **DENIED (403)** | Allowed |

---

## 5. Environment Variables

### Secret Variables (Server-Only — NEVER expose to client)
- `JWT_SECRET`: High-entropy key used to sign staff session tokens.
- `OWNER_INITIAL_PASSWORD`: Initial bootstrap password for the primary owner account (defaults to `BigTaste2026!` if omitted).
- `PORT`: Server listen port (default `3000`).

### Public Variables (Client-Accessible)
- `VITE_API_URL`: Optional custom backend URL if frontend is hosted on a separate CDN. (Leave blank when using Netlify redirects or monolithic hosting).

---

## 6. How to Set Up the First Owner Account

1. Set the initial password in your environment or `.env`:
   ```bash
   OWNER_INITIAL_PASSWORD="YourSecureOwnerPassword2026!"
   ```
2. Start the server (`npm run dev` or `npm run start`).
3. If no database exists, the system automatically bootstraps the owner profile:
   - **Username**: `owner`
   - **Password**: Defined by `OWNER_INITIAL_PASSWORD` (or default `BigTaste2026!`).
4. Navigate to `/kitchen` (or click "Staff & Kitchen Portal" in the footer) and log in.
5. In the **Staff Team** tab, you can provision additional kitchen staff and manager accounts with dedicated credentials.

---

## 7. Netlify Deployment Steps

1. **Build Configuration**:
   - Build command: `npm run build`
   - Publish directory: `dist`
2. **Netlify Configuration File (`netlify.toml`)**:
   Already included in the root directory:
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
     functions = "netlify/functions"

   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/api/:splat"
     status = 200

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```
3. **Deploying on Netlify**:
   - Push your repository to GitHub / GitLab.
   - Link the repository in Netlify.
   - Under **Site configuration > Environment variables**, add:
     - `JWT_SECRET`: `<A random 32+ character string>`
     - `OWNER_INITIAL_PASSWORD`: `<Your secure password>`
   - Trigger deployment.
   - For complete server-side persistence with Netlify Functions, configure the functions directory or use Netlify with the Node.js Express server on Render, Railway, or Google Cloud Run.

---

## 8. Executed Security Testing Checklist

- [x] **Anonymous access to kitchen queue rejected**:
  `curl http://localhost:3000/api/staff/orders` → Returned `HTTP 401 Unauthorized`.
- [x] **Sequential order ID guessing denied**:
  `curl http://localhost:3000/api/orders/track/BT-8021` → Returned `HTTP 404 Not Found`.
- [x] **Unguessable tracking token verified**:
  `curl http://localhost:3000/api/orders/track/0be3144f-c3f2-44fe-ab34-f83464896dfd` → Returned exact order and status timeline.
- [x] **Authoritative server pricing**:
  Submitting items with extra cheddar ($1.50) and fries ($6.99) calculated $22.48 subtotal + $1.91 tax = $24.39 total.
- [x] **RBAC enforcement**:
  Staff user `kitchen` attempting to access `/api/owner/staff` → Returned `HTTP 403 Forbidden`.
- [x] **Owner privileged operations**:
  Owner user `owner` accessing `/api/owner/staff` → Returned full active staff roster.
- [x] **Status state machine enforcement**:
  Validated progression: `pending` → `confirmed` → `preparing` → `ready` → `completed`. Invalid transitions are rejected.
