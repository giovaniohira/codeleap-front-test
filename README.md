# CodeLeap Network (Frontend Test)

A simple CRUD application for the CodeLeap Network: sign up with a username, create posts, and manage your own posts (edit/delete). Built with React, TypeScript, Vite, and TanStack Query.

## Features

- **Signup** — Enter username (stored in `localStorage`); ENTER button disabled when empty.
- **Main screen** — Create posts (title + content); Create button disabled when any field is empty.
- **Post list** — Fetched from the test API, sorted by most recent first. List refreshes after create.
- **Edit / Delete** — Shown only for posts whose `username` matches the current user (case-insensitive string check). Delete opens a confirmation modal; Edit opens a modal to change title and content.

## Tech stack

- **React 18** + **TypeScript**
- **Vite** — build and dev server
- **TanStack Query (React Query)** — server state and cache
- **CSS Modules** — component-scoped styles

## Prerequisites

- Node.js 18+ (or 20+ recommended)
- npm (or pnpm / yarn)

## Setup and run

```bash
cp .env.example .env   # configure API base URL
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests once           |
| `npm run test:watch` | Run tests in watch mode |

## Tests

Frontend tests use **Vitest** and **React Testing Library**:

- `src/lib/relativeTime.test.ts` — relative time formatting
- `src/api/client.test.ts` — API client (mocked `fetch`)
- `src/components/auth/SignupModal.test.tsx` — signup form and ENTER button state

Run: `npm run test`

## API

The app uses the CodeLeap test backend:

- **Base URL:** `https://dev.codeleap.co.uk/careers/`
- **Trailing slash:** Required for all endpoints (Django).

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | List posts (`{ results: Post[] }`) |
| POST   | `/`      | Create post (`username`, `title`, `content`) |
| PATCH  | `/{id}/` | Update post (`title`, `content`) |
| DELETE | `/{id}/` | Delete post |

Post shape: `id`, `username`, `created_datetime`, `title`, `content`.

## Project structure

```
src/
  api/              # API client, types, and barrel export
    types.ts        # Post, CreatePostPayload, UpdatePostPayload
    client.ts       # HTTP request layer (fetch wrapper)
    index.ts        # public API re-exports
  components/
    auth/           # SignupModal + barrel
    layout/         # Layout, Logo, ThemeToggle, LoadingScreen + barrel
    posts/          # CreatePostCard, PostCard, PostList, Edit/Delete modals + barrel
  contexts/         # ThemeContext + barrel
  hooks/            # usePosts (React Query) + barrel
  lib/              # username, theme, relativeTime, queryClient + barrel
  test/             # Vitest setup
  App.tsx
  main.tsx
  index.css
.env.example        # Required environment variables
```

## Deployment

Build:

```bash
npm run build
```

Output is in `dist/`. Deploy that folder to any static host (e.g. Vercel, Netlify). A `vercel.json` is included for Vercel (SPA fallback).

## License

Private — CodeLeap coding test.
