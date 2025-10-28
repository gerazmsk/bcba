# Correct Environment Variables for Railway

## Variable 1:
**Name:** `NEXT_PUBLIC_SUPABASE_URL`
**Value:** `https://utbnvtrquhdurakxrvql.supabase.co`

(Note: Must start with `https://`)

## Variable 2:
**Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
**Value:** (The anon public key from Supabase)

---

## How to Fix in Railway:

1. Go to Railway dashboard
2. Click your project
3. Click on the service
4. Go to Variables tab
5. Find `NEXT_PUBLIC_SUPABASE_URL`
6. Click to edit
7. Make sure the value starts with `https://`
8. Should be: `https://utbnvtrquhdurakxrvql.supabase.co`
9. Click Save
10. Railway will redeploy automatically

---

## Also Check:

Make sure `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set with your actual key from:
https://supabase.com/dashboard/project/utbnvtrquhdurakxrvql/settings/api

