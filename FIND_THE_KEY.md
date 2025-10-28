# Where to Find Your Supabase anon Key

## Visual Guide

```
STEP 1: Go to this URL in your browser:
https://supabase.com/dashboard/project/utbnvtrquhdurakxrvql/settings/api

STEP 2: You'll see a page that looks like this:
┌─────────────────────────────────────────────────────┐
│  API Settings                                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Project URL                                        │
│  https://utbnvtrquhdurakxrvql.supabase.co         │
│  ✓ You already have this                            │
│                                                     │
│  Project API keys                                   │
│  ┌────────────────────────────────────────────────┐ │
│  │ [anon] [public]                                 │ │ ← This button/icon
│  │ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJp...   │ │ ← This is the KEY!
│  │                      ↑                          │ │
│  │                Click copy icon                  │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Step-by-Step

1. **Open:** https://supabase.com/dashboard
2. **Click:** on your project (or use this direct link: https://supabase.com/dashboard/project/utbnvtrquhdurakxrvql/settings/api)
3. **Scroll down** to "Project API keys" section
4. **Find:** The key labeled "anon" and "public"
5. **Look for:** A very long string that starts with `eyJ...`
6. **Click** the copy icon (usually on the right side)

## What It Looks Like

The anon key is a long string like this:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1Ym52dHJx...very long...abc123
```

It usually:
- Starts with `eyJ`
- Is about 200-300 characters long
- Is all on one line
- Might have a copy button next to it (📋 icon)

## If You Still Can't Find It

The key might be hidden behind a toggle:
- Look for a button that says "Reveal" or "Show"
- Click it to reveal the full key

Or try this alternative location:
1. Go to: Settings (gear icon) → API
2. Look in the "Project API keys" section

