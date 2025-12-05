# Electronics E-Commerce Store

## Overview

This is a modern, Arabic-first electronics e-commerce web application built as a single-page application (SPA). The platform focuses on selling electronics including smartphones, laptops, tablets, headphones, cameras, TVs, and gaming equipment. The application features a clean, product-focused design inspired by Apple Store, Amazon, and Best Buy, with full RTL (right-to-left) support for Arabic content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type safety
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight React Router alternative)
- SPA architecture with client-side navigation

**UI Component System**
- Shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- "New York" style variant for components
- RTL-first design with Arabic language support (Cairo and Inter fonts)
- Custom CSS variables for theming (light/dark mode support)

**State Management**
- React Context API for cart management (`CartProvider`)
- TanStack Query (React Query) for server state management
- Local storage for cart persistence
- Theme context for dark/light mode

**Design System**
- Mobile-first responsive design
- Custom color system with HSL values for consistent theming
- Elevation system using shadows and opacity
- Interactive states (hover-elevate, active-elevate-2 classes)
- Component library includes 30+ pre-built UI components

### Backend Architecture

**Server Framework**
- Express.js for HTTP server
- TypeScript for type safety across frontend and backend
- HTTP server created with Node.js `http` module for flexibility

**Data Storage Strategy**
- In-memory storage implementation (no database currently connected)
- Product catalog stored as static data in `server/storage.ts`
- Drizzle ORM configured for PostgreSQL (ready for database integration)
- Schema definitions in `shared/schema.ts` for type sharing

**API Design**
- RESTful API endpoints under `/api` prefix
- Product endpoints: `/api/products`, `/api/products/featured`, `/api/products/new`, `/api/products/search`
- Centralized error handling
- Request logging middleware with timing information

**Session Management**
- User schema defined with username/password authentication
- Express session configuration prepared (connect-pg-simple for PostgreSQL sessions)
- Authentication infrastructure in place but not yet implemented

### Code Organization

**Monorepo Structure**
- `client/` - Frontend React application
- `server/` - Backend Express application
- `shared/` - Shared TypeScript types and schemas
- Shared schema definitions using Drizzle ORM and Zod for validation

**Build Process**
- Custom build script using esbuild for server bundling
- Vite for client bundling
- Server dependencies bundled for improved cold start performance
- Production build outputs to `dist/` directory

**Development Workflow**
- Vite dev server with HMR (Hot Module Replacement)
- Custom middleware mode for Vite integration with Express
- TypeScript path aliases for clean imports (`@/`, `@shared/`)

## External Dependencies

### UI & Component Libraries
- **Radix UI**: Headless UI components (accordion, dialog, dropdown, etc.)
- **Shadcn/ui**: Pre-built component system based on Radix UI
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel/slider functionality for product images

### State & Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management with `@hookform/resolvers`
- **Zod**: Runtime type validation and schema definition
- **Drizzle Zod**: Integration between Drizzle ORM and Zod schemas

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx & tailwind-merge**: Conditional class name utilities

### Database & ORM
- **Drizzle ORM**: Type-safe SQL query builder for PostgreSQL
- **pg**: PostgreSQL client (configured but not currently connected)
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Build Tools & Development
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast JavaScript/TypeScript bundler for server code
- **tsx**: TypeScript execution for development
- **PostCSS & Autoprefixer**: CSS processing

### Replit-Specific Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Code mapping for Replit IDE
- **@replit/vite-plugin-dev-banner**: Development environment banner

### Fonts & Typography
- **Google Fonts**: Cairo (Arabic) and Inter (Latin) font families loaded via CDN

### Planned Integrations (Infrastructure Present)
- PostgreSQL database (schema defined, not connected)
- User authentication system (schema defined, routes not implemented)
- Session management (configuration prepared)