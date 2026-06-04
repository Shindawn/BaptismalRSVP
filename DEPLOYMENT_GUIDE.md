# Vercel + Supabase Deployment Guide

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - Project name: e.g., `tala-baptismal-rsvp`
   - Database password: create a strong password
   - Region: choose closest to you
5. Wait for the project to be created (5-10 min)
6. Go to "Settings" → "Database"
7. Copy the **Connection String** (under PostgreSQL)
   - Format: `postgresql://postgres.[project-id]:PASSWORD@aws-0-region.pooler.supabase.com:6543/postgres?schema=public`
   - Replace `PASSWORD` with the actual password you created

## Step 2: Update Local .env

1. Create or update `.env` in the project root:
   ```
   DATABASE_URL="postgresql://postgres.[project-id]:PASSWORD@aws-0-region.pooler.supabase.com:6543/postgres?schema=public"
   ```
2. Replace the placeholders with your actual connection string

## Step 3: Create & Run Migration

```bash
npx prisma migrate dev --name init
```

This will:
- Create the database schema in Supabase
- Create Rsvp, User, and Post tables

## Step 4: Push to GitHub

```bash
git add .
git commit -m "Setup PostgreSQL and create migration"
git push origin main
```

## Step 5: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up or log in
3. Click "New Project"
4. Connect your GitHub account
5. Select the `BaptismalRSVP` repository
6. Under "Environment Variables", add:
   - **Key:** `DATABASE_URL`
   - **Value:** (paste the Supabase connection string from Step 1)
7. Click "Deploy"

Vercel will automatically:
- Install dependencies
- Run `npm run build`
- Deploy the Next.js app

## Step 6: Verify Deployment

1. Go to your Vercel project dashboard
2. Click the deployment URL
3. Test the RSVP form
4. Submit a test RSVP to confirm the database connection works

## Troubleshooting

If the deployment fails:
- Check the Vercel deployment log for errors
- Verify the `DATABASE_URL` is correct in Vercel settings
- Ensure Supabase project is active (not paused)
- Check Prisma migration status: `npx prisma migrate status`

## Notes

- Supabase free tier includes 500MB storage (more than enough for guest RSVPs)
- Keep your Supabase password safe; never commit it to GitHub
- The migration file will be created in `prisma/migrations/` and checked into Git
