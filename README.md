# StreamPlan

A session-planning tool for hobby streamers to schedule streams, manage a game library, and log post-session notes.

## Team
- Tanner
- Sergio
- Kelsey

## Development Principles
StreamPlan development follows the project constitution: strict TypeScript, Tailwind-first UI design, Next.js App Router discipline, real testing, and collaborative review.

## Tech Stack
- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **Auth:** Auth.js v5 (credentials provider)
- **Database:** PostgreSQL (Neon)
- **Deployment:** Vercel

## Getting Started

### Prerequisites
- Node.js 18+
- A PostgreSQL connection string (Neon recommended)

### Setup

1. Clone the repo:
```bash
   git clone https://github.com/TannerMc23/WDD430-StreamPlan.git
   cd WDD430-StreamPlan
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env.local` file in the project root with:
DATABASE_URL=your-postgres-connection-string
AUTH_SECRET=your-auth-secret

Generate an `AUTH_SECRET` with:
```bash
   npx auth secret
```

4. Run the development server:
```bash
   npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

The database schema (users, types, genres, type_genres, sessions) is created automatically on first API call via `ensureSchema()` in `lib/db.ts`.

## Deployment

StreamPlan is deployed on Vercel. To deploy your own instance:

1. Import the repo into Vercel.
2. Connect a Neon Postgres database via the Vercel Storage tab (this auto-populates `DATABASE_URL`).
3. Add `AUTH_SECRET` as an environment variable in the Vercel project settings.
4. Deploy.

## Project Structure
app/
login/ — Login page
types/ — Type (content) library, list + detail views
sessions/ — Session planner, list + detail views
dashboard/ — Upcoming sessions overview
api/
auth/ — Auth.js route handler
type/ — Type CRUD + genre filtering
sessions/ — Session CRUD + notes
dashboard/ — Upcoming sessions endpoint
components/ — Shared UI (TypeCard, SessionCard, Navbar, StatusBadge, Modal, GenreFilter)
lib/ — Auth config, database connection/schema, shared TypeScript types
middleware.ts — Route protection for authenticated pages
specs/ — Feature specification (Spec-Kit generated)

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Create a new user account |
| POST | `/api/auth/login` | Authenticate and create a session |
| POST | `/api/auth/logout` | End the current session |
| GET | `/api/type` | List all Types for the authenticated user |
| POST | `/api/type` | Create a new Type |
| GET | `/api/type/:id` | Retrieve a specific Type |
| PUT | `/api/type/:id` | Update a specific Type |
| DELETE | `/api/type/:id` | Delete a specific Type |
| GET | `/api/type/genre/:genre` | Filter Types by genre |
| GET | `/api/sessions` | List all Sessions for the authenticated user |
| POST | `/api/sessions` | Create a new Session |
| GET | `/api/sessions/:id` | Retrieve a specific Session |
| PUT | `/api/sessions/:id` | Update a specific Session |
| DELETE | `/api/sessions/:id` | Delete a specific Session |
| POST | `/api/sessions/:id/notes` | Add or update post-session notes |
| GET | `/api/dashboard/upcoming` | Retrieve upcoming sessions |

## Known Issues / Future Work
- Genre filtering currently matches on Type name rather than a real `genres`/`type_genres` join, pending seeded genre data
- "Live now" status/display was discussed by the team but not yet implemented
- Account management and Sign In/Sign Out links on the Navbar depending on auth status are planned but not yet built