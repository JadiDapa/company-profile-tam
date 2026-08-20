# Company Profile TAM

A Next.js company profile website with a built-in content management dashboard. The public site presents the company (home, about, services, activities, gallery); the dashboard lets authenticated staff manage that content (activities and gallery items, with image uploads).

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack), React 19
- **Language:** TypeScript
- **Database:** PostgreSQL via Prisma 7 (`@prisma/adapter-pg`)
- **Auth:** Clerk (`@clerk/nextjs`)
- **Styling/UI:** Tailwind CSS v4, shadcn/ui (New York style) on top of Radix UI, `lucide-react` icons
- **Forms/validation:** `react-hook-form` + Zod
- **Rich text:** Tiptap
- **Tables:** TanStack Table
- **Drag & drop:** `@dnd-kit/*`
- **Image processing:** `sharp`
- **State:** Zustand (sidebar UI state), TanStack Query

## Getting started

### Prerequisites

- Node.js
- A PostgreSQL database

### Environment variables

Create a `.env` file with:

```
DATABASE_URL=                        # PostgreSQL connection string
NEXT_PUBLIC_BASE_API_URL=
NEXT_PUBLIC_BASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
PORT=
```

### Install & run

```bash
npm install
npx prisma generate       # generate the Prisma client into generated/prisma
npx prisma migrate dev    # apply database migrations
npx prisma db seed        # seed an initial admin user (see prisma/seed.ts)
npm run dev                # start the dev server (http://localhost:3000)
```

### Other scripts

```bash
npm run build   # production build
npm run start   # start production server
npm run lint    # eslint .
```

There is no automated test suite in this repo.

## Authentication & authorization

Auth is handled entirely by **Clerk**. `proxy.ts` (Next.js middleware, note the non-standard filename) wraps every request in `clerkMiddleware()`.

The app also keeps its own `User` table (id, `username`, `fullName`, `role`) in Postgres. On each request, `getUser()` (`app/actions/user.actions.ts`) reads the current Clerk session via `currentUser()`, then looks up a local `User` row by matching Clerk's `username`. There is no locally stored password — the `password` field that appears in `CreateUserSchema` (`lib/validators/user.validator.ts`) is validated but never persisted, since Clerk owns credentials.

Roles (`UserRole` enum: `ADMIN`, `TECHNICIAN`, `USER`) exist in the schema and service layer (`UserService.getManyByRole`), but role-based access control is not yet enforced anywhere in the route/action layer — the only gate currently in place is "is there a matching local user" (see below).

`app/(dashboard)/layout.tsx` calls `getUser()` and redirects to `/sign-in` if no matching local user is found, gating the entire dashboard route group.

`prisma/seed.ts` seeds a single `ADMIN` user with username `administrator` — a corresponding Clerk account with that same username must exist for that seed user to be able to log in.

## Data model

Defined in `prisma/schema.prisma`, Postgres, Prisma client generated into `generated/prisma` (gitignored).

- **User** — `id`, `role` (`UserRole`), `username` (unique), `fullName`, timestamps.
- **Activity** — `id`, `title`, `category`, `content`, `slug` (unique), timestamps. Rendered on the public `/activities` list and `/activities/[slug]` detail page.
- **Gallery** — `id`, `title`, `slug` (unique), timestamps. Rendered on the public `/gallery` page.
- **Media** — polymorphic attachment: `entityId` + `mediaTable` (`ACTIVITY` | `GALLERY` | `TICKET`) point at the owning row instead of a foreign key relation, plus `mediaType` (`IMAGE` | `SUBMISSION` | `EVIDENCE` | `OTHER`), `url`, `filename`, `mimeType`, `size`, `description`. Indexed on `[mediaTable, entityId]` and `[mediaType]`.

`TICKET` and `SUBMISSION`/`EVIDENCE` media types exist in the schema but have no corresponding model or feature built yet — likely scaffolding for a future ticketing/submission feature.

## Application structure

### Route groups (`app/`)

- **`(root)`** — public site: `/` (home), `/about`, `/services`, `/activities`, `/activities/[slug]`, `/gallery`.
- **`(auth)/login`** — sign-in page.
- **`(dashboard)/dashboard`** — authenticated CMS: dashboard home (`/dashboard`), `/dashboard/activities` (list, create, update by slug), `/dashboard/galleries` (list). Gated by `getUser()` as described above.
- **`api/media/[...path]`** — serves uploaded files straight off disk from the `media/` directory (see below); not a Next.js `public/` asset.

### Layered data flow

Each domain (Activity, Gallery, Media, User) follows the same three-layer pattern:

1. **`lib/validators/*.validator.ts`** — Zod schemas and derived TypeScript types (`CreateXDTO`, `UpdateXDTO`, `XType`). Types that include joined data (e.g. an activity with its attached image) live here rather than in the Prisma schema.
2. **`lib/services/*.service.ts`** — the only layer that talks to Prisma directly; exposes an object of methods (`XService.getAll`, `.getById`, `.create`, `.update`, `.delete`, and a paginated `.list`).
3. **`app/actions/*.action.ts`** — `"use server"` Server Actions consumed by the UI. They validate input against the Zod schema, call the service layer, trigger related side effects (e.g. uploading an image via `createMedia` after creating an Activity/Gallery), and call `revalidatePath` for affected routes.

When adding a new entity, follow this order: Prisma model → migration → validator → service → server action → UI.

### Media / file uploads

- `lib/upload.ts` (`saveFile`) writes uploaded files under `media/` on disk. Images are auto-rotated, resized to a max width of 1920px, and re-encoded to JPEG (quality 80) via `sharp`; non-images keep their original extension.
- `lib/attachMedia.ts` (`attachMedia`) batch-fetches `Media` rows for a list of entities by `entityId`/`mediaTable` and attaches them as a `media` array — used by the service layer's `getAll`/`getById`/`getBySlug` methods to build the `image` field on `ActivityType`/`GalleryType`.
- `app/api/media/[...path]/route.ts` serves files back by reading directly from `media/<path>` on disk (not through Next's static file serving), with a 1-day cache header.
- `lib/getMediaUrl.ts` builds the public URL for a stored `Media` record.

### UI layer

- `components/ui/*` — shadcn/ui primitives (Tailwind v4, "New York" style; aliases configured in `components.json`).
- `components/root/*` — public site sections, organized by page (`Home/`, `About/`, `Gallery/`, `Activities/`) plus shared `Navbar`, `MobileNav`, `Footer`, `PageHeader`.
- `components/dashboard/*` — CMS UI: `Sidebar` (driven by `lib/sidebar-menu.ts`), `Navbar`, `DataTable` + `TablePagination`/`TableSorter`/`SearchDataTable`/`SearchDialog` (built on TanStack Table, paired with each service's paginated `.list()` method), `TipTapEditor` for activity content, `StatisticCard`, `Notifications`, delete-confirmation buttons per entity.
- `components/auth/*` — sign-in page UI (`AuthCarousel`, `AuthHeader`, `login/`).

### State

- `stores/SidebarStore.ts` — Zustand store for dashboard sidebar UI state (collapsed/expanded).
- `providers/Providers.tsx` — top-level client providers (e.g. TanStack Query) wrapped around the app in `app/layout.tsx`.

## Known inconsistencies / things to be aware of

- `next.config.ts` sets `typescript.ignoreBuildErrors: true` — `next build` will succeed even with type errors. Don't rely on the build to catch them; run the TypeScript checker directly if needed.
- `next-auth.d.ts` is a leftover type augmentation from a prior NextAuth-based auth setup (see git history: "upgrading next js and auth to clerk"); the project now uses Clerk exclusively, so this file is dead weight.
- The Next.js middleware file is named `proxy.ts` rather than the conventional `middleware.ts`.
- Role-based authorization (`UserRole`) is modeled in the database but not yet enforced in code — any local user that matches a Clerk session can access the full dashboard.
