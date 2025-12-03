# Deployment Guide - Indian Soft Colours

## 🔒 Security Checklist (IMPORTANT!)

Before pushing to Git, verify:
- ✅ `.env.local` is in `.gitignore` (already done)
- ✅ `.env.local.example` has placeholder values (already done)
- ✅ No sensitive keys in code files (verified)

## 📦 Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Indian Soft Colours Textile Management"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## 🚀 Deploy to Vercel

### Option 1: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your_supabase_url
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your_anon_key
   - `SUPABASE_SERVICE_KEY` = your_service_key
5. Click "Deploy"

### Option 2: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables when prompted
```

## 🔑 Environment Variables for Vercel

Copy these from your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=https://srwqgaijqmwgmsjkhvko.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_key_here
```

⚠️ **NEVER commit `.env.local` to Git!**

## 📱 PWA Installation

Once deployed on HTTPS:
- **Android/Desktop Chrome**: Click "Install App" button or browser menu → "Install app"
- **iOS Safari**: Share button → "Add to Home Screen"

## ✅ Post-Deployment Checklist

- [ ] App loads correctly
- [ ] Can add records
- [ ] Can view/search records
- [ ] Can edit/delete records
- [ ] PDF export works
- [ ] Excel export works
- [ ] PWA install button appears
- [ ] App works offline (after installation)

## 🔧 Troubleshooting

### Hydration Warnings
- These are suppressed in production
- Users won't see them
- App functionality is not affected

### Database Connection Issues
- Verify Supabase URL is correct
- Check RLS policies are enabled
- Ensure anon key has proper permissions

### PWA Not Installing
- Ensure site is on HTTPS
- Check manifest.json is accessible
- Verify service worker is registered

## 📞 Support

For issues, check:
- Browser console for errors
- Vercel deployment logs
- Supabase dashboard for database issues
