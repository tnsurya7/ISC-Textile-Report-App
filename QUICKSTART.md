# Quick Start Guide

Get your Indian Soft Colours app running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free)
- A Vercel account (free)

## Local Development Setup

### 1. Install Dependencies (1 minute)

```bash
npm install
```

### 2. Setup Supabase (2 minutes)

1. Go to https://supabase.com
2. Create new project
3. Go to SQL Editor
4. Copy and paste this:

```sql
CREATE TABLE records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date TEXT NOT NULL,
  dcNo TEXT NOT NULL,
  partyName TEXT NOT NULL,
  fabricQuality TEXT NOT NULL,
  partyMtr NUMERIC NOT NULL,
  paddingMtr NUMERIC NOT NULL,
  shortOrExcess NUMERIC NOT NULL,
  printMtr NUMERIC NOT NULL,
  fabricMtr NUMERIC NOT NULL,
  outwardMtr NUMERIC NOT NULL,
  balance NUMERIC NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations" ON records
  FOR ALL USING (true) WITH CHECK (true);
```

5. Click "Run"

### 3. Get API Keys (1 minute)

1. In Supabase, go to Settings > API
2. Copy these 3 values:
   - Project URL
   - anon public key
   - service_role key

### 4. Configure Environment (30 seconds)

Create `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=paste_your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste_your_anon_key_here
SUPABASE_SERVICE_KEY=paste_your_service_key_here
```

### 5. Run the App (30 seconds)

```bash
npm run dev
```

Open http://localhost:3000

Done! 🎉

## Deploy to Production

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Add the same 3 environment variables
6. Click "Deploy"

Your app will be live in 2 minutes!

### Option 2: Other Platforms

The app works on any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Test the PWA

### On Mobile (Android/iOS)

1. Open your deployed URL in Chrome/Safari
2. Look for "Install App" prompt
3. Click Install
4. App icon appears on home screen

### On Desktop (Windows/Mac)

1. Open your deployed URL in Chrome
2. Look for install icon in address bar
3. Click to install
4. App opens in standalone window

## Features to Test

1. **Dashboard** - View statistics
2. **Add Record** - Create new entry
3. **Records** - View, search, filter
4. **Edit** - Modify existing record
5. **Delete** - Remove record
6. **Export PDF** - Download PDF report
7. **Export Excel** - Download Excel file
8. **Reports** - Filter by date ranges

## Common Issues

### "Cannot connect to database"
- Check your .env.local file
- Verify Supabase keys are correct
- Ensure table is created

### "Module not found"
- Run `npm install` again
- Delete node_modules and reinstall

### PWA not installing
- Must use HTTPS (Vercel provides this)
- Check manifest.json is accessible
- Clear browser cache

## Next Steps

1. Customize the logo (replace files in /public)
2. Adjust colors in Tailwind config
3. Add more fields if needed
4. Configure custom domain in Vercel

## Support

Need help? Check:
- README.md - Full documentation
- DEPLOYMENT.md - Deployment guide
- SUPABASE_SETUP.sql - Database schema

Happy coding! 🚀
