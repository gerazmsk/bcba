# Debug Profile Link

## What's Happening:

You're clicking a profile in Search → Getting 404 error

## Possible Issues:

1. **Wrong URL format** - The ID might not be a valid UUID
2. **RLS policy blocking** - Server can't read the profile
3. **Profile not public** - But you said you checked "Make my profile public"

## Quick Test:

1. Click on a profile in Search
2. Look at the browser URL bar
3. What does the URL look like?

Should be like: `/p/12345678-abcd-1234-abcd-123456789abc`

## Tell Me:

What's the EXACT URL that appears when you click a profile?

For example:
- `/p/something-long`
- `/p/abc123`  
- Something else

Also check in Supabase Table Editor:
- Is `is_public` column set to `true` for your profile?

