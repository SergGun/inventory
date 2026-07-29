# Inventory Management (Inventory11)

![Next.js](https://img.shields.io/badge/Next.js-16.2.10-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-7.8.0-2b7eea)
![PostgreSQL](https://img.shields.io/badge/Postgres-PostgreSQL-blue)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-skyblue)
![Recharts](https://img.shields.io/badge/Recharts-3.10.0-orange)

A simple inventory management web application built with Next.js (App Router), Prisma and PostgreSQL. It provides product listing, search, pagination, basic add/delete product actions, a dashboard with summary metrics and a weekly products chart, and account management powered by Stack (stackframe).

---

# Features 🚀

- User authentication and account management via @stackframe/stack (SignIn, UserButton, AccountSettings).
- Product listing with search and pagination.
- Add product form (server action) with validation and revalidation.
- Delete product (server action) from the inventory list.
- Dashboard with key metrics: total products, total value, low stock count.
- Weekly new-products chart powered by Recharts.
- Seed script to populate demo products.

# Technologies 🧰

| Category     | Tools                                               |
| ------------ | --------------------------------------------------- |
| Framework    | Next.js (App Router)                                |
| Language     | TypeScript, React 19                                |
| ORM          | Prisma (generated client)                           |
| Database     | PostgreSQL                                          |
| Auth         | @stackframe/stack (Stack client/server integration) |
| UI / Styling | Tailwind CSS                                        |
| Charts       | Recharts                                            |
| Icons        | lucide-react                                        |
| DB Adapter   | @prisma/adapter-pg, pg Pool                         |
| Tooling      | ESLint, Prettier, ts-node, dotenv                   |

# Architecture 🏗️

This is a Next.js App Router application with server and client components:

- `app/` — top-level routes and UI pages (server components by default; some client components like charts).
- `app/components/` — reusable UI components (Sidebar, ProductChart, Pagination).
- `lib/` — helper modules: `prisma.ts` (Prisma client), `auth.ts` (wrapper around Stack server app), `actions/` (server actions like `createProduct`).
- `stack/` — Stack client and server configuration for authentication.
- `prisma/` — Prisma schema, migrations and seed script. Prisma client is generated to `app/generated/prisma`.

# Screenshots 📸

Add screenshots here (replace placeholders with real images):

![Dashboard](/docs/screenshots/dashboard.png)
![Inventory](/docs/screenshots/inventory.png)

# Installation ⚙️

1. Clone the repo:

```bash
git clone <repo-url>
cd Inventory11
```

2. Install dependencies:

```bash
npm install
```

3. Create a PostgreSQL database and set `DATABASE_URL` (see below).

4. Apply migrations (development):

```bash
npx prisma migrate dev
```

Or deploy migrations in production:

```bash
npx prisma migrate deploy
```

5. Seed demo data (optional):

```bash
npm run seed
```

6. Run the development server:

```bash
npm run dev
```

# Environment Variables 🔐

The application requires the following environment variables:

- `DATABASE_URL` — PostgreSQL connection string used by Prisma and the app. Example: `postgresql://user:pass@host:5432/dbname`.

Optional (standard):

- `NODE_ENV` — `development` | `production` (used by Next/Node).

# Database 🗄️

- Prisma is used as the ORM. The schema is at `prisma/schema.prisma` and the generated client is located at `app/generated/prisma`.
- Migrations are stored in `prisma/migrations/` — run `npx prisma migrate dev` or `npx prisma migrate deploy` to apply.
- Seed data is provided by `prisma/seed.ts` and can be run with `npm run seed` (the project config maps Prisma seed to this script).

# Authentication 🔑

- Authentication and account UI are provided by `@stackframe/stack`.
- `stack/client.ts` configures client behavior (cookie token store and redirects). `stack/server.ts` exports `stackServerApp` used by `lib/auth.ts`.
- `lib/auth.ts` exposes `getCurrentUser()` and `requireUser()` which pages use to protect routes server-side (redirects to `/sign-in`).
- The sign-in UI is rendered by the `SignIn` component at `/sign-in`; account settings are exposed via `AccountSettings` at `/settings`.

# Running the Project ▶️

Development

```bash
npm run dev
```

Production (build + start)

```bash
npm run build
npm run start
```

# Project Structure 📁

Important folders (top-level):

```
app/
  ├─ components/
  │   ├─ products-chart.tsx
  │   ├─ pagination/
  │   │   └─ pagination.tsx
  │   └─ sidebar/
  │       └─ sidebar.tsx
  ├─ add-product/page.tsx
  ├─ dashboard/page.tsx
  ├─ inventory/page.tsx
  ├─ sign-in/page.tsx
  └─ settings/page.tsx
lib/
  ├─ auth.ts
  ├─ prisma.ts
  └─ actions/
      └─ products.ts
prisma/
  ├─ schema.prisma
  ├─ seed.ts
  └─ migrations/
stack/
  ├─ client.ts
  └─ server.ts
app/generated/prisma/ (generated Prisma client)
```

# API / Server Actions 🔄

- `createProduct(formData: FormData)` — defined in `lib/actions/products.ts`; server action used by the Add Product form. Creates a product for the current authenticated user, revalidates the `/inventory` path and redirects to `/inventory`.
- `deleteProduct(formData: FormData)` — inline server action implemented in `app/inventory/page.tsx`; deletes a product by id.
- Several server-side data queries are implemented directly in pages using the Prisma client: counts, findMany queries for dashboard metrics and inventory listing.

# Main Pages 📄

- `/` — Landing page with app description and links to sign in.
- `/sign-in` — Sign in UI provided by `@stackframe/stack`. Redirects to `/dashboard` if already signed in.
- `/dashboard` — Protected page showing key metrics, a weekly products chart and stock summaries.
- `/inventory` — Protected product list with search, pagination and delete actions.
- `/add-product` — Protected page with a form to create new products (server action `createProduct`).
- `/settings` — Account settings page using `AccountSettings` from Stack.

# Components 🧩

- `Sidebar` — persistent navigation and `UserButton` area.
- `ProductChart` — client component that renders an area chart (Recharts) for weekly product data.
- `Pagination` — reusable pagination component used by `/inventory`.

# Future Improvements ✨

- Add edit/update product flow and a dedicated product detail page.
- Add CSV import/export for bulk product operations.
- Add role-based access or multi-tenant support for multiple organizations.
- Improve tests and CI (unit/integration tests, linting hooks).
- Add deployment instructions & Dockerfile for containerized deployment.

# License 📜

This project does not include a license file. Add a license (for example MIT) if you intend to publish or share it publicly.

---

If you want, I can also generate sample screenshots, add a Dockerfile, or create deployment instructions for Vercel/Heroku. Which would you like next?
