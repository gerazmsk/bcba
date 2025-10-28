# Quick Setup Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for your project to be ready
3. Copy your project's URL and anon key from Settings → API

## Step 3: Configure Environment

Update `.env.local` with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Step 4: Set Up Database

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Copy the contents of `sql/schema.sql`
4. Paste and run it in the SQL Editor
5. Click "Run" to execute

## Step 5: Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What to Test

1. ✅ Visit the landing page
2. ✅ Click "Sign up" and create an account
3. ✅ You'll be redirected to the profile editor
4. ✅ Fill out your profile and save
5. ✅ Go to the search page and search for profiles
6. ✅ Click on a profile to view it
7. ✅ Toggle "Make my profile public" to control visibility

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

Your Supabase database is already hosted and will work with your deployed app.

## Troubleshooting

**Build fails with env variable errors:**
- Make sure `.env.local` exists with valid Supabase credentials

**Cannot sign up:**
- Verify database schema was executed correctly in Supabase SQL Editor

**Profile not saving:**
- Check browser console for errors
- Verify RLS policies are set up correctly in Supabase

**Search not working:**
- Make sure profiles have `is_public = true`
- Check that you're searching with matching text

