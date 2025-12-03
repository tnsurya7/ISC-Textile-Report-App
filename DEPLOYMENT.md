# Deployment Guide

## Deploy to Vercel

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Push to GitHub:
```bash
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

### Step 2: Setup Supabase

1. Go to https://supabase.com and create an account
2. Create a new project
3. Wait for the database to be provisioned
4. Go to SQL Editor and run:

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
```

5. Go to Project Settings > API and copy:
   - Project URL
   - anon/public key
   - service_role key

### Step 3: Deploy to Vercel

1. Go to https://vercel.com
2. Sign up or log in
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

6. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your_supabase_url
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your_anon_key
   - `SUPABASE_SERVICE_KEY` = your_service_key

7. Click "Deploy"

### Step 4: Verify Deployment

1. Wait for deployment to complete
2. Visit your deployed URL
3. Test all features:
   - Add a record
   - View records
   - Edit a record
   - Delete a record
   - Export PDF/Excel
   - Install PWA

### Step 5: Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Errors

If you get build errors:
1. Check that all dependencies are in package.json
2. Verify environment variables are set correctly
3. Check Vercel build logs for specific errors

### Database Connection Issues

If database connection fails:
1. Verify Supabase URL and keys are correct
2. Check that the records table exists
3. Ensure service_role key has proper permissions

### PWA Not Installing

If PWA doesn't install:
1. Ensure you're using HTTPS (Vercel provides this automatically)
2. Check that manifest.json is accessible
3. Verify service worker is registered
4. Check browser console for errors

## Environment Variables Reference

```env
# Public (exposed to browser)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Private (server-side only)
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Post-Deployment Checklist

- [ ] App loads correctly
- [ ] Can add records
- [ ] Can view records
- [ ] Can edit records
- [ ] Can delete records
- [ ] Search works
- [ ] Filters work
- [ ] PDF export works
- [ ] Excel export works
- [ ] PWA installs on mobile
- [ ] PWA installs on desktop
- [ ] Offline mode works
- [ ] Logo displays correctly

## Support

For issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify Supabase connection
4. Check API route responses
