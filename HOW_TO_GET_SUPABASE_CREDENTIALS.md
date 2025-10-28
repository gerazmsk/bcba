# How to Get Your Supabase Credentials

You have a PostgreSQL connection string, but you need **different credentials** for your Next.js app.

## What You Need (NOT the PostgreSQL connection string)

You need these TWO values from Supabase Settings:

1. **Project URL**
2. **anon public key**

## Step-by-Step Instructions

### 1. Go to Your Supabase Project

1. Open https://supabase.com
2. Sign in with your account
3. Click on your project (or create one if you haven't)

### 2. Open Settings

In the left sidebar, click on the **gear icon** (Settings) at the bottom.

### 3. Click on "API"

You'll see several options:
- API
- Database
- Auth
- etc.

Click on **"API"**.

### 4. Find Your Project URL

Scroll down to the section labeled **"Project URL"**.

You'll see something like:
```
https://xxxxxxxxxxxxx.supabase.co
```

**Copy this entire URL** - this is your `NEXT_PUBLIC_SUPABASE_URL`

### 5. Find Your anon public Key

In the same API page, scroll down to **"Project API keys"**.

Look for the key labeled **"anon"** **"public"**:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Ym52dHJx...
```

**Copy this entire key** - this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## Visual Guide

```
┌─────────────────────────────────────┐
│  Supabase Dashboard                  │
│                                      │
│  [Left Sidebar]                     │
│  ├─ Database                        │
│  ├─ Auth                           │
│  ├─ Storage                        │
│  ├─ ...                            │
│  └─ ⚙️ Settings  ← CLICK HERE     │
│     └─ API  ← THEN CLICK THIS      │
└─────────────────────────────────────┘
```

On the API page, you'll see:

```
Project URL:
https://xxxxxxxxxxxxx.supabase.co
         ↑ Copy this

Project API keys:
┌────────────────────────────────────┐
│ anon public                       │
│ eyJhbGciOiJIUzI1NiIsInR5cCI...    │ ← Copy this
└────────────────────────────────────┘
```

---

## What to Do With These Values

Once you have both values, go to Railway and add them as environment variables:

1. In Railway dashboard → Click your project → Variables tab
2. Add:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
     Value: Your Project URL
   
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     Value: Your anon public key

3. Railway will redeploy automatically

---

## Important Notes

- You DON'T need the PostgreSQL connection string for the Next.js app
- The PostgreSQL connection string is for direct database access (advanced use)
- The API keys are what your web app uses to communicate with Supabase
- The "anon" key is public and safe to use in client-side code

---

## Still Can't Find It?

If you can't find these values:
1. Make sure you're in the correct Supabase project
2. Try this direct link: `https://supabase.com/dashboard/project/_/settings/api` (replace `_` with your project ID if known)
3. Look for any green badges or "public" labels next to keys

