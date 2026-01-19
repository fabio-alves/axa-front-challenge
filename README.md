This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Architecture

### API Routes
This project uses Next.js API Routes for server-side requests. API endpoints are located in the `app/api/` directory and follow the Next.js App Router pattern. All external API calls are made through these Next.js API routes, which then forward requests to external services.

### State Management
State management is handled using **Zustand**, a lightweight state management library that follows a **store-based pattern**. Zustand uses a simple, hook-based API that doesn't require providers or complex setup. The stores are located in `app/stores/` and can be accessed throughout the application using hooks.

### Routing
The project follows Next.js App Router conventions with pages located in the `app/pages/` directory. Each page component is registered in the `PageService` and can be accessed through the main navigation tabs.

### Project Structure
The project follows a modular, object-oriented architecture:

- **`app/components/`** - Reusable UI components (e.g., `Header`, `Badge`, `Dropdown`, `SearchInput`)
- **`app/pages/`** - Page components that represent different views/screens
- **`app/stores/`** - Zustand stores for global state management
- **`app/hooks/`** - Custom React hooks (e.g., `useAlert`)
- **`app/models/`** - Domain model classes (e.g., `Tab`, `TabManager`)
- **`app/services/`** - Service classes for business logic
- **`app/api/`** - Next.js API routes
- **`app/types/`** - TypeScript type definitions
- **`app/__tests__/`** - Test files organized by type (components, stores, api)

When creating new reusable components, add them to `app/components/`. Similarly, new stores go in `app/stores/`, tests in `app/__tests__/`, and so on, maintaining this organizational pattern.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


