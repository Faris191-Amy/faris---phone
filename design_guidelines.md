# Design Guidelines: Electronics E-Commerce Website

## Design Approach: Reference-Based

**Primary References**: Apple Store (product presentation), Amazon (category navigation), Best Buy (electronics focus)

**Core Principles**: 
- Clean, product-focused layouts that let electronics shine
- Trust-building through professional presentation
- Efficient browsing with clear categorization
- Mobile-first responsive design for shopping on-the-go

---

## Typography System

**Primary Font**: Inter or SF Pro Display (Google Fonts CDN)
**Secondary Font**: System UI stack for performance

**Hierarchy**:
- **Hero Headlines**: text-5xl md:text-6xl, font-bold, tracking-tight
- **Section Titles**: text-3xl md:text-4xl, font-bold
- **Product Names**: text-xl md:text-2xl, font-semibold
- **Category Labels**: text-lg, font-medium, uppercase tracking-wide
- **Prices**: text-2xl md:text-3xl, font-bold
- **Specifications**: text-sm md:text-base, font-normal
- **Body Text**: text-base, leading-relaxed
- **Buttons**: text-sm md:text-base, font-semibold, uppercase tracking-wide

---

## Layout & Spacing System

**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24

**Container Strategy**:
- Max-width: max-w-7xl for main content
- Horizontal padding: px-4 md:px-8 lg:px-12
- Section spacing: py-12 md:py-16 lg:py-24

**Grid Systems**:
- Product grids: grid-cols-2 md:grid-cols-3 lg:grid-cols-4 with gap-4 md:gap-6
- Category cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-6 md:gap-8
- Feature sections: grid-cols-1 md:grid-cols-2 with gap-8 md:gap-12

---

## Component Library

### Header/Navigation
- Sticky header with backdrop-blur effect
- Logo on left, main navigation center, cart/search/account icons right
- Search bar with autocomplete suggestions
- Category mega-menu on hover
- Shopping cart counter badge
- Mobile: Hamburger menu with slide-out drawer

### Hero Section
- Full-width hero: min-h-screen md:min-h-[80vh]
- Large product imagery showcasing featured electronics
- Headline + subheadline + dual CTA buttons (Shop Now + Learn More)
- Trust indicators: "Free Shipping", "2-Year Warranty", "30-Day Returns"
- Buttons on hero: backdrop-blur-md with semi-transparent background

### Category Navigation
- Horizontal scrollable category pills below hero
- Icon + label for each category (Phones, Laptops, TVs, Audio, Smart Home, etc.)
- 8-10 categories visible, scroll for more on mobile

### Product Cards
- High-quality product image (4:3 aspect ratio)
- Product name (2 lines max with ellipsis)
- Star rating + review count
- Price (bold) with original price struck through if on sale
- Quick "Add to Cart" button on hover (desktop)
- Wishlist heart icon (top-right corner)
- "New" or "Sale" badge overlays
- Subtle shadow on hover with scale transform (scale-105)

### Product Grid Sections
- **Featured Products**: 4-column grid, py-16
- **Best Sellers**: 4-column grid with "Trending" badges
- **Deals & Offers**: 3-column grid with countdown timers
- Each section: Title + "View All" link in header

### Product Detail Page
- **Layout**: 2-column (image gallery left, details right)
- **Image Gallery**: Main large image + 4-5 thumbnail carousel below
- **Product Info Panel**: 
  - Product name (text-3xl)
  - Star rating + review count link
  - Price display with savings calculation
  - Key specifications grid (2-column, compact)
  - Quantity selector + Add to Cart (large, prominent)
  - Wishlist + Share buttons
  - Delivery info (shipping estimate, return policy)
- **Tabs Section**: Full-width below, tabs for Specifications, Reviews, Q&A
- **Related Products**: 4-column grid at bottom

### Shopping Cart
- Slide-out drawer from right side
- Product list with thumbnail, name, price, quantity controls
- Subtotal calculation
- Continue Shopping + Checkout buttons
- Free shipping progress bar if applicable
- Empty cart state with suggested products

### Footer
- **Structure**: 4-column layout
  - Column 1: Categories (Quick links)
  - Column 2: Customer Service (Contact, Shipping, Returns)
  - Column 3: About (Company info, Careers)
  - Column 4: Newsletter signup + Social icons
- Payment method icons
- Copyright + legal links at bottom

### Supporting Components
- **Search Results**: Grid view with filters sidebar
- **Filter Panel**: Checkboxes for brand, price range, ratings, features
- **Breadcrumbs**: For category navigation
- **Toast Notifications**: "Added to cart" confirmations
- **Loading States**: Skeleton screens for product grids
- **Trust Badges**: Secure checkout, warranty, support icons

---

## Images

**Hero Section**: 
- Large, high-quality image showcasing premium electronics (laptop, smartphone, headphones arranged artistically)
- Option: Rotating carousel of 3-4 featured products
- Image treatment: Subtle gradient overlay for text readability

**Product Images**:
- Clean white/neutral backgrounds (Amazon-style)
- Multiple angles available in detail view
- Lifestyle shots showing products in use (secondary images)
- Minimum 800x800px for detail views

**Category Banners**:
- Each category section can have lifestyle banner image
- Example: Laptops section shows workspace setup

**Placement Strategy**:
- Hero: Full-width featured product showcase
- Category sections: Optional banner images for major categories
- Product cards: Clean product photography
- About/Trust section: Warehouse/team photos if applicable

---

## Interactions & Behaviors

- **Minimal animations**: Subtle hover states, smooth transitions (200-300ms)
- **Quick view modal**: Product preview without leaving browse page
- **Sticky cart summary**: On product detail page during scroll
- **Infinite scroll** or **Load More** button for product grids
- **No distracting animations**: Focus on content, not effects

---

## Accessibility

- ARIA labels for all interactive elements
- Keyboard navigation for all components
- Focus indicators with visible outlines
- Alt text for all product images
- Color contrast meeting WCAG AA standards
- Form validation with clear error messages