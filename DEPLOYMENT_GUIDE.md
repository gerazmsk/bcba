# BCBA Profiles - Deployment Guide

## Supabase Setup (Required First)

### Step 1: Create Supabase Account & Project

1. Go to https://supabase.com
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with:
   - **Email** (you'll get a confirmation email), OR
   - **GitHub** (fastest option - one click)

4. Once logged in, click **"New Project"**
5. Fill in:
   - **Name**: `bcba-profiles`
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you (e.g., US East, EU West)
   - **Pricing Plan**: Free tier is fine

6. Click **"Create new project"**
7. Wait 2-3 minutes for project to initialize

### Step 2: Set Up Database Schema

Once your project is ready:

1. In your Supabase dashboard, click **"SQL Editor"** in the left sidebar
2. Click **"New query"**
3. Open the file `sql/schema.sql` from this project
4. **Copy ALL the contents** of `sql/schema.sql`
5. **Paste it** into the Supabase SQL Editor
6. Click **"Run"** button (or press Cmd+Enter / Ctrl+Enter)
7. You should see: ✓ Success. No rows returned

### Step 3: Get Your Credentials

1. Still in Supabase dashboard, click **"Settings"** (gear icon)
2. Click **"API"** in the left sidebar
3. You'll see two things you need:
   - **Project URL**: Copy this value
   - **anon public** key: Copy this value

4. **Save both values** - you'll need them for Railway

---

## Railway Deployment

### Step 1: Connect Repository to Railway

1. Go to https://railway.app
2. Sign up/sign in with your **GitHub** account
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Find and select your repository: `gerazmsk/bcba`
6. Railway will automatically start building

### Step 2: Add Environment Variables

1. In Railway, click on your project
2. Click on the service (your app)
3. Click **"Variables"** tab
4. Click **"+ New Variable"**
5. Add these TWO variables:

```
NEXT_PUBLIC_SUPABASE_URL
```
Value: Paste your Project URL from Supabase

```
NEXT_PUBLIC_SUPABASE_ANON_KEY  
```
Value: Paste your anon public key from Supabase

6. Click **"Add"** for each variable
7. Railway will automatically redeploy after adding variables

### Step 3: Get Your Live URL

1. Wait for deployment to complete (build takes 1-2 minutes)
2. Railway will show you a URL like: `https://your-app-name.up.railway.app`
3. Click **"Settings"** → **"Domains"** to add a custom domain (optional)

---

## Test Your Deployment

1. Visit your Railway URL
2. Click **"Sign up"** and create a test account
3. Fill out your profile and save
4. Go to **"Search"** and verify you can see your profile

---

## Troubleshooting

### Build fails on Railway
- Make sure both environment variables are set correctly
- Check that variables have no extra spaces or quotes
- Redeploy after adding variables

### Can't sign up
- Go to Supabase dashboard → **Authentication** → **Policies**
- Make sure email signup is enabled (it should be by default)

### Database error
- Verify you ran the SQL schema in Supabase SQL Editor
- Check Supabase dashboard → **Table Editor** → you should see a `profiles` table

### Variables not working
- In Railway, make sure variable names match EXACTLY:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- No spaces, case-sensitive

---

## Quick Checklist

- [ ] Created Supabase account
- [ ] Created Supabase project
- [ ] Ran SQL schema in SQL Editor
- [ ] Copied Project URL from Supabase
- [ ] Copied anon public key from Supabase
- [ ] Connected repo to Railway
- [ ] Added environment variables to Railway
- [ ] Deployment succeeded
- [ ] Tested sign up and login
- [ ] Tested creating profile
- [ ] Tested search functionality

---

## Need Help?

If you run into issues, check:
1. Supabase dashboard logs (SQL Editor → View logs)
2. Railway deployment logs (click on your service → "Deployments" → click latest)
3. Browser console for errors (F12)

