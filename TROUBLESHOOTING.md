# Troubleshooting Guide

Common issues and solutions for Indian Soft Colours – Digital Printing application.

## Installation Issues

### ❌ "npm install" fails

**Problem:** Dependencies won't install

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install

# If still fails, try with legacy peer deps
npm install --legacy-peer-deps
```

### ❌ Node version error

**Problem:** "Unsupported Node.js version"

**Solution:**
```bash
# Check your Node version
node --version

# Should be 18.0.0 or higher
# Install/update Node.js from nodejs.org
```

## Development Server Issues

### ❌ "npm run dev" fails

**Problem:** Development server won't start

**Solutions:**

1. **Port already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

2. **Missing dependencies:**
```bash
npm install
```

3. **Corrupted .next folder:**
```bash
rm -rf .next
npm run dev
```

### ❌ Page shows "Module not found"

**Problem:** Import errors

**Solutions:**

1. Check file paths are correct
2. Ensure file extensions included (.js)
3. Verify component names match exports
4. Restart dev server

```bash
# Stop server (Ctrl+C)
# Restart
npm run dev
```

## Database Connection Issues

### ❌ "Failed to connect to Supabase"

**Problem:** Can't connect to database

**Solutions:**

1. **Check environment variables:**
```bash
# Verify .env.local exists
cat .env.local

# Should contain:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# SUPABASE_SERVICE_KEY=...
```

2. **Verify Supabase credentials:**
- Go to Supabase Dashboard
- Settings > API
- Copy fresh keys
- Update .env.local
- Restart dev server

3. **Check table exists:**
```sql
-- Run in Supabase SQL Editor
SELECT * FROM records LIMIT 1;
```

### ❌ "relation 'records' does not exist"

**Problem:** Database table not created

**Solution:**
```sql
-- Run this in Supabase SQL Editor
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

### ❌ "Row Level Security policy violation"

**Problem:** RLS blocking operations

**Solution:**
```sql
-- Disable RLS (for testing only)
ALTER TABLE records DISABLE ROW LEVEL SECURITY;

-- Or create proper policy
CREATE POLICY "Allow all operations" ON records
  FOR ALL USING (true) WITH CHECK (true);
```

## API Route Issues

### ❌ API returns 500 error

**Problem:** Server error in API route

**Solutions:**

1. **Check Vercel/browser console:**
- Look for specific error message
- Check stack trace

2. **Verify request format:**
```javascript
// Correct format for POST
fetch('/api/addRecord', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

3. **Test API directly:**
```bash
# Test GET endpoint
curl http://localhost:3000/api/getRecords

# Test POST endpoint
curl -X POST http://localhost:3000/api/addRecord \
  -H "Content-Type: application/json" \
  -d '{"date":"2024-01-01","dcNo":"DC001",...}'
```

### ❌ API returns 405 "Method not allowed"

**Problem:** Wrong HTTP method

**Solution:**
- Check you're using correct method (GET, POST, PUT, DELETE)
- Verify API route handler checks `req.method`

## Build Issues

### ❌ "npm run build" fails

**Problem:** Production build errors

**Solutions:**

1. **Type errors:**
```bash
# Check for TypeScript errors (if using TS)
npm run lint
```

2. **Missing environment variables:**
```bash
# Ensure .env.local exists
# Or set in Vercel dashboard
```

3. **Import errors:**
- Check all imports have correct paths
- Verify all files exist
- Check for circular dependencies

4. **Clear cache and rebuild:**
```bash
rm -rf .next
npm run build
```

## PWA Issues

### ❌ PWA won't install

**Problem:** Install prompt doesn't appear

**Solutions:**

1. **Check HTTPS:**
- PWA requires HTTPS
- Use Vercel deployment (auto HTTPS)
- Or use localhost (allowed for testing)

2. **Verify manifest.json:**
```bash
# Check manifest is accessible
curl http://localhost:3000/manifest.json
```

3. **Check service worker:**
```javascript
// Open browser console
navigator.serviceWorker.getRegistrations()
  .then(registrations => console.log(registrations))
```

4. **Clear browser data:**
- Chrome: Settings > Privacy > Clear browsing data
- Check "Cached images and files"
- Check "Site settings"

### ❌ Service worker not registering

**Problem:** SW registration fails

**Solutions:**

1. **Check console for errors:**
```javascript
// Look for SW errors in console
// Common: "Service worker registration failed"
```

2. **Verify sw.js exists:**
```bash
ls public/sw.js
```

3. **Check sw.js syntax:**
- No syntax errors
- Valid JavaScript
- Proper event listeners

4. **Force update:**
```javascript
// In browser console
navigator.serviceWorker.getRegistrations()
  .then(regs => regs.forEach(reg => reg.unregister()))
  .then(() => location.reload())
```

## Export Issues

### ❌ PDF export fails

**Problem:** PDF doesn't generate

**Solutions:**

1. **Check jsPDF installed:**
```bash
npm list jspdf jspdf-autotable
```

2. **Verify logo loads:**
```javascript
// Check if logo element exists
document.getElementById('logo-img')
```

3. **Browser console errors:**
- Look for specific jsPDF errors
- Check data format

4. **Test with small dataset:**
- Try exporting 1-2 records
- If works, issue is data size

### ❌ Excel export fails

**Problem:** Excel file doesn't download

**Solutions:**

1. **Check xlsx installed:**
```bash
npm list xlsx
```

2. **Verify data format:**
```javascript
// Data should be array of objects
console.log(records)
```

3. **Browser blocks download:**
- Check browser download settings
- Allow downloads from site

## Mobile Issues

### ❌ Layout broken on mobile

**Problem:** UI doesn't fit screen

**Solutions:**

1. **Check viewport meta tag:**
```html
<!-- Should be in _document.js -->
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

2. **Test responsive classes:**
- Use Chrome DevTools mobile view
- Check Tailwind breakpoints
- Verify responsive utilities

3. **Horizontal scroll:**
```css
/* Add to problematic elements */
overflow-x: auto;
```

### ❌ Inputs too small on mobile

**Problem:** Hard to tap inputs

**Solution:**
```javascript
// Increase input size
className="px-4 py-3"  // Already implemented
```

## Deployment Issues (Vercel)

### ❌ Build fails on Vercel

**Problem:** Deployment build error

**Solutions:**

1. **Check build logs:**
- Go to Vercel dashboard
- Click deployment
- View build logs
- Look for specific error

2. **Environment variables:**
- Verify all 3 variables set
- No typos in variable names
- Values are correct

3. **Build locally first:**
```bash
npm run build
npm start
# If works locally, issue is Vercel config
```

4. **Check Node version:**
```json
// Add to package.json
"engines": {
  "node": ">=18.0.0"
}
```

### ❌ App works locally but not on Vercel

**Problem:** Production deployment broken

**Solutions:**

1. **Environment variables:**
- Double-check all variables in Vercel
- Redeploy after adding variables

2. **API routes:**
- Check API routes work in production
- Test with curl or Postman
```bash
curl https://your-app.vercel.app/api/getRecords
```

3. **Database connection:**
- Verify Supabase allows connections from Vercel
- Check Supabase project is active

### ❌ "This Serverless Function has crashed"

**Problem:** API route timeout or crash

**Solutions:**

1. **Check function logs:**
- Vercel dashboard > Functions
- View runtime logs

2. **Increase timeout:**
```json
// vercel.json
{
  "functions": {
    "pages/api/**/*.js": {
      "maxDuration": 10
    }
  }
}
```

3. **Optimize queries:**
- Add database indexes
- Limit result size
- Use pagination

## Performance Issues

### ❌ App is slow

**Problem:** Poor performance

**Solutions:**

1. **Check bundle size:**
```bash
npm run build
# Look for large bundles
```

2. **Optimize images:**
- Use Next.js Image component
- Compress images
- Use appropriate formats

3. **Database queries:**
- Add indexes
- Limit results
- Use pagination

4. **Enable caching:**
```javascript
// API routes
res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate')
```

## Data Issues

### ❌ Data not saving

**Problem:** Records don't persist

**Solutions:**

1. **Check API response:**
```javascript
// In browser console
fetch('/api/addRecord', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
})
.then(r => r.json())
.then(console.log)
```

2. **Verify database:**
- Check Supabase dashboard
- View table data
- Check for errors

3. **Check form data:**
```javascript
// Add console.log in form submit
console.log('Submitting:', formData)
```

### ❌ Data shows wrong values

**Problem:** Numbers or dates incorrect

**Solutions:**

1. **Check data types:**
```javascript
// Ensure numbers are parsed
partyMtr: parseFloat(partyMtr)
```

2. **Date format:**
```javascript
// Use ISO format
date: new Date().toISOString().split('T')[0]
```

3. **Database schema:**
```sql
-- Verify column types
\d records
```

## Getting Help

If you're still stuck:

1. **Check documentation:**
   - README.md
   - QUICKSTART.md
   - PROJECT_STRUCTURE.md

2. **Check logs:**
   - Browser console (F12)
   - Vercel deployment logs
   - Supabase logs

3. **Search for errors:**
   - Copy exact error message
   - Search on Google/Stack Overflow
   - Check Next.js/Supabase docs

4. **Debug systematically:**
   - Isolate the problem
   - Test one thing at a time
   - Use console.log liberally
   - Check network tab

5. **Start fresh:**
   ```bash
   # Nuclear option
   rm -rf node_modules .next
   npm install
   npm run dev
   ```

## Prevention Tips

**Best Practices:**
- Always test locally before deploying
- Keep dependencies updated
- Use version control (git)
- Back up database regularly
- Monitor error logs
- Test on multiple browsers
- Test on real mobile devices
- Keep documentation updated

**Development Workflow:**
1. Make changes
2. Test locally
3. Check console for errors
4. Test all affected features
5. Commit to git
6. Deploy to Vercel
7. Test production
8. Monitor for errors
