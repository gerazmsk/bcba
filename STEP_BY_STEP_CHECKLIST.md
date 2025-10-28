# Step-by-Step Checklist for Deploying BCBA Profiles

## ✅ What You've Already Done
- [x] Code is on GitHub
- [x] Railway project is connected
- [x] Build is working

## ⏳ What You Need to Do Now

### STEP 1: Get Supabase Credentials (2 minutes)

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Click on your project

2. **Go to API Settings**
   - Click the gear icon (⚙️) at bottom left
   - Click "API"

3. **Copy These TWO Values:**

   **a) Project URL** - You'll see:
   ```
   Project URL: https://utbnvtrquhdurakxrvql.supabase.co
   ```
   Copy the ENTIRE URL.

   **b) anon public key** - Look for this section:
   ```
   Project API keys
   anon public    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
   Copy the ENTIRE key (it's very long).

4. **Save both values somewhere you can easily access them**

---

### STEP 2: Run Database Schema (1 minute)

1. **Still in Supabase**, click "SQL Editor" in left sidebar
2. Click "New query"
3. **Copy everything from this file:** `sql/schema.sql`
   - The file is already in your project folder
4. **Paste it** into the Supabase SQL Editor
5. Click "Run" (or press Ctrl+Enter / Cmd+Enter)
6. You should see: "Success. No rows returned."

---

### STEP 3: Add Variables to Railway (3 minutes)

1. **Open Railway** https://railway.app
2. Click on your project
3. Click the "Variables" tab
4. Click "+ New Variable"

**Add First Variable:**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: (paste the Project URL you copied)
- Click "Add"

**Add Second Variable:**
- Click "+ New Variable" again
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: (paste the anon public key you copied)
- Click "Add"

**Railway will automatically redeploy** after you add variables.

---

### STEP 4: Wait for Deployment (1-2 minutes)

1. Watch the deployment logs in Railway
2. When it says "✓ Deployment successful"
3. Click "Settings" → "Domains" to get your app URL

---

### STEP 5: Test Your App (2 minutes)

1. **Visit your Railway URL** (something like `https://bcba-xxx.up.railway.app`)
2. Click "Sign up"
3. Create a test account with your email
4. You'll be redirected to profile editor
5. Fill in your details and save
6. Go to "Search" tab
7. You should see your profile!

---

## 🎉 That's It!

Your app is now live and working!

---

## Troubleshooting

### Build failed in Railway?
- Make sure BOTH environment variables are added
- Check for typos in variable names (case-sensitive!)
- Variables should have NO quotes around them

### Can't sign up?
- Go to Supabase → Authentication → Providers
- Make sure "Email" is enabled (it should be by default)

### Database error when saving profile?
- Go to Supabase → SQL Editor
- Make sure you ran the schema successfully
- Check Table Editor → you should see a `profiles` table

---

## Quick Reference

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Railway Dashboard:** https://railway.app
- **Your GitHub Repo:** https://github.com/gerazmsk/bcba
- **Where to find API credentials:** Supabase Settings → API
- **Database schema file:** `sql/schema.sql` in your project

