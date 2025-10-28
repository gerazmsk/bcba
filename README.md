# BCBA Profiles – Stage 1

A modern web application for creating, managing, and discovering BCBA (Board Certified Behavior Analyst) profiles.

## Features

### Public Features (Guests)
- 🔍 **Public Search**: Search through public BCBA profiles by name, city, interests, and more
- 👤 **Public Profile View**: View detailed public profiles

### Authenticated Features
- ✏️ **Profile Management**: Create and edit your personal profile
- 🔒 **Privacy Control**: Toggle profile visibility (public/private)
- 📝 **Rich Profile Fields**: Share your story with multiple customizable fields

## Tech Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Database & Auth**: Supabase (PostgreSQL + Row-Level Security)
- **Deployment**: 
  - Frontend → Vercel
  - Backend/DB → Supabase

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works great)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd BCBA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to **SQL Editor** in your Supabase dashboard
   - Copy the contents of `sql/schema.sql` and execute it

4. **Configure environment variables**
   - Create a `.env.local` file in the root directory:
   ```bash
   cp .env.local.example .env.local
   ```
   - Fill in your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

The application uses a single `profiles` table with the following structure:

- **id** (uuid): References auth.users
- **logo_url** (text): Profile logo URL
- **first_name** (text): Required
- **last_name** (text): Required
- **bcba** (text): Fixed value "BCBA"
- **about** (text): Optional, max 2000 chars
- **home_town, current_city, happy_place** (text): Optional, max 100 chars each
- **favorite_color, favorite_hobby, favorite_food** (text): Optional, max 100 chars each
- **is_public** (boolean): Visibility toggle (default: true)

### Row-Level Security (RLS)

The application enforces security through RLS policies:
- **Public Read**: Anyone can read profiles where `is_public = true`
- **Own Read**: Authenticated users can read their own profile
- **Own Write**: Users can only insert/update their own profile

## Project Structure

```
/app
  /(public)/         - Public routes (no auth required)
    page.tsx         - Landing page
    search/page.tsx  - Search interface
    p/[id]/page.tsx  - Public profile view
  /(auth)/           - Authentication routes
    login/page.tsx   - Sign in
    signup/page.tsx - Sign up
  /(private)/        - Protected routes
    dashboard/profile/page.tsx - Profile editor
/components          - Reusable UI components
/lib                 - Utilities and clients
  supabaseClient.ts  - Supabase configuration
  types.ts           - TypeScript definitions
  validators.ts      - Form validation
/sql                 - Database schema
  schema.sql         - Complete database setup
```

## Pages & Routes

| Route | Purpose | Auth Required |
|-------|---------|---------------|
| `/` | Landing page | ❌ |
| `/search` | Search public profiles | ❌ |
| `/p/[id]` | View public profile | ❌ |
| `/login` | Sign in | ❌ |
| `/signup` | Sign up | ❌ |
| `/dashboard/profile` | Edit own profile | ✅ |

## Validation Rules

- **First Name**: Required, max 100 characters
- **Last Name**: Required, max 100 characters
- **About**: Optional, max 2000 characters
- **Other fields**: Optional, max 100 characters each

## Security Features

- ✅ Row-Level Security (RLS) on all database tables
- ✅ Client-side input sanitization to prevent XSS
- ✅ Server-side authentication checks
- ✅ Protected routes with automatic redirects
- ✅ Secure session management via Supabase

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Supabase Setup

- Database is automatically hosted on Supabase
- No additional deployment needed for backend

## Testing Scenarios

| # | Scenario | Expected Result |
|---|----------|----------------|
| 1 | Sign up new user | Redirects to profile dashboard |
| 2 | Submit empty first/last name | Validation error shown |
| 3 | Edit profile and save | Data persists after reload |
| 4 | Toggle is_public off | Profile disappears from /search |
| 5 | Search by "Anna" | Profiles containing "Anna" appear |
| 6 | Access /p/[id] of private profile | 404 message shown |
| 7 | Logout and reopen /dashboard/profile | Redirects to /login |
| 8 | Mobile viewport | Responsive layout, readable text |

## Future Enhancements (Stage 2)

- PDF generation feature
- Admin dashboard
- Custom avatar uploads
- Advanced search with pagination
- Light/dark theme toggle

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
