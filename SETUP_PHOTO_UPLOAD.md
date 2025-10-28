# Setup Photo Upload

## ✅ What I Just Added:
- File upload button in your profile
- Support for direct photo uploads from your computer

## 🔧 One Last Step in Supabase:

**You need to run ONE SQL command to enable storage:**

1. Go to: https://supabase.com/dashboard/project/utbnvtrquhdurakxrvql/sql/new
2. Copy the entire content from `sql/storage-setup.sql`
3. Paste it in Supabase SQL Editor
4. Click "Run"

## 📝 Quick Copy for Supabase:

Open this file: `sql/storage-setup.sql` and copy everything, then paste in Supabase.

## ✨ Then You Can:

1. Go to your app (wait for Railway to deploy)
2. Go to Dashboard
3. Click "Upload Photo" button
4. Select a photo from your computer
5. Fill out your info
6. Click "Save Profile"
7. Your photo will be uploaded!

---

## How It Works:

- Photos are stored in Supabase Storage
- Only you can upload your own photos
- Photos are public (visible to everyone in search)
- Maximum file size: typically 5MB (check Supabase limits)

