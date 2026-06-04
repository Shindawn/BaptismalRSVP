# Tala Baptismal Invitation

## Local Development

1. Install dependencies:
   - `npm install`
2. Start dev server:
   - `npm run dev`
3. Open:
   - `http://localhost:3000`

## Deployment Overview

This app currently uses Prisma for RSVP storage.
For local testing, it uses SQLite. For online production, use a hosted database.

### Recommended deployment stack

- App host: Vercel, Railway, Render, or Netlify (Next.js compatible)
- Database: Supabase / Neon / Railway Postgres / PlanetScale

### Production setup steps

1. Create a hosted Postgres database.
2. Set the deployment platform environment variable:
   - `DATABASE_URL=postgresql://user:password@host:5432/dbname?schema=public`
3. Change `prisma/schema.prisma` provider from `sqlite` to `postgresql`.
4. Run locally:
   - `npx prisma generate`
   - `npx prisma migrate dev --name init`
5. Push the repo to your chosen host and deploy.

### Vercel-specific notes

- Connect the repository to Vercel.
- Set `DATABASE_URL` in Vercel Environment Variables.
- Build command: `npm run build`
- Output directory: leave empty (Next.js default)

## Files to know

- `src/app/api/rsvp/route.ts` — RSVP API route now uses Prisma.
- `prisma/schema.prisma` — database schema.
- `.env.example` — example database environment config.

## Notes

- Do not use the old file-based `db/rsvp-data.json` in production.
- If you deploy with a hosted DB, make sure the `Rsvp` model is migrated first.
