# Vercel + Neon Deployment Guide

## Step 1: Create Neon Project

1. Go to https://neon.tech
2. Sign up or log in
3. Click "Create project"
4. Fill in:
   - Project name: e.g., `tala-baptismal-rsvp`
   - Region: choose the closest region
   - Plan: Free tier is fine for RSVP data
5. Wait for the project to finish creating
6. Open the Neon dashboard and navigate to your new database
7. Find the connection information section and copy the PostgreSQL connection string
   - Example format: `postgresql://username:PASSWORD@branch.region.neon.tech:5432/neondb?sslmode=require`
   - Replace `username`, `PASSWORD`, `branch`, `region`, and `neondb` with your actual values

## Step 2: Update Local .env

1. Create or update `.env` in the project root:
   ```
   DATABASE_URL="postgresql://username:PASSWORD@branch.region.neon.tech:5432/neondb?sslmode=require"
   ```
2. Replace the placeholders with your actual Neon connection string

## Step 3: Create & Run Migration

```bash
npx prisma migrate dev --name init
```

This will:
- Create the database schema in Neon
- Create Rsvp, User, and Post tables

## Step 4: Push to GitHub

```bash
git add .
git commit -m "Setup Neon PostgreSQL and create migration"
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
   - **Value:** (paste the Neon connection string from Step 1)
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
- Ensure the Neon database is active
- Check Prisma migration status: `npx prisma migrate status`

## Notes

- Neon free tier includes managed PostgreSQL hosting and works well for RSVP data
- Keep your Neon password and connection string safe; never commit them to GitHub
- The migration file will be created in `prisma/migrations/` and checked into Git
