# How to Upload Logo to Supabase Storage

## Option 1: Via Supabase Dashboard (Easiest)

1. **Go to Supabase Storage:**
   - https://supabase.com/dashboard/project/utbnvtrquhdurakxrvql/storage/buckets/profiles

2. **Upload your logo file:**
   - Click "Upload file"
   - Select your logo file (png, jpg, etc.)
   - Name it `default-logo.png` or `brand-logo.png`
   - Click "Upload"

3. **Get the public URL:**
   - After upload, click on the file
   - Copy the public URL (it will be something like: `https://utbnvtrquhdurakxrvql.supabase.co/storage/v1/object/public/profiles/default-logo.png`)

4. **Update the code:**
   - Update `DEFAULT_LOGO` in `lib/pdf-generator.ts` to use this URL

---

## Option 2: Use Any Image Hosting Service

You can also upload to:
- **Imgur.com** (easiest)
- **Google Drive** (make public)
- **Dropbox** (create shareable link)
- Any image hosting service

Then just copy the direct image URL and use it in your code.

---

## Option 3: Store in Your Next.js Public Folder

1. Put your logo file in: `public/brand-logo.png`
2. Access it as: `https://your-railway-url.com/brand-logo.png`
3. Update `DEFAULT_LOGO` to use this URL

---

## Quick Steps:

1. Upload logo to Imgur or Supabase Storage
2. Get the public URL
3. Update `lib/pdf-generator.ts` line 1:
   ```typescript
   const DEFAULT_LOGO = 'YOUR_URL_HERE';
   ```
4. Commit and push

