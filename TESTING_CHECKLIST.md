# Testing Checklist

Complete testing guide for Indian Soft Colours – Digital Printing application.

## Pre-Deployment Testing

### ✅ Environment Setup
- [ ] Node.js 18+ installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file created with correct values
- [ ] Supabase database table created
- [ ] Development server runs (`npm run dev`)

### ✅ Database Connection
- [ ] App connects to Supabase
- [ ] No console errors about database
- [ ] API routes respond correctly
- [ ] Data persists after refresh

## Feature Testing

### 1. Dashboard Page (/)

**Visual Elements**
- [ ] Logo displays correctly
- [ ] Page title shows "Dashboard"
- [ ] All 5 stat cards visible
- [ ] Recent entries table shows

**Functionality**
- [ ] Total records count is accurate
- [ ] Today's records count updates
- [ ] Sums calculate correctly
- [ ] Last 5 entries display
- [ ] "View All Records" link works

### 2. Add Record Page (/add)

**Form Fields**
- [ ] All 11 fields present
- [ ] Date field defaults to today
- [ ] Number fields accept decimals
- [ ] Required validation works
- [ ] Labels are clear

**Functionality**
- [ ] Form submits successfully
- [ ] Success message appears
- [ ] Redirects to records page
- [ ] New record appears in table
- [ ] Cancel button works

**Validation**
- [ ] Empty fields show error
- [ ] Invalid numbers rejected
- [ ] Date format validated

### 3. Records Page (/records)

**Table Display**
- [ ] All 11 columns visible
- [ ] Data loads correctly
- [ ] Horizontal scroll on mobile
- [ ] Checkbox column works
- [ ] Actions column shows Edit/Delete

**Search**
- [ ] Search box present
- [ ] Searches across all fields
- [ ] Results update in real-time
- [ ] Case-insensitive search

**Filters**
- [ ] Party name filter works
- [ ] Fabric quality filter works
- [ ] Start date filter works
- [ ] End date filter works
- [ ] Multiple filters combine correctly

**Selection**
- [ ] Individual checkboxes work
- [ ] Select all checkbox works
- [ ] Selection count displays
- [ ] Deselect all works

**Export**
- [ ] Export PDF button visible
- [ ] Export Excel button visible
- [ ] PDF exports selected records
- [ ] Excel exports selected records
- [ ] PDF exports all if none selected
- [ ] Excel exports all if none selected
- [ ] Filenames correct (selected.pdf, selected.xlsx)

**Actions**
- [ ] Edit button navigates to edit page
- [ ] Delete button opens modal
- [ ] Delete modal shows record info
- [ ] Delete confirms and removes record
- [ ] Delete cancel closes modal

### 4. Edit Record Page (/edit/[id])

**Form**
- [ ] Form pre-fills with existing data
- [ ] All 11 fields editable
- [ ] Date field works
- [ ] Number fields accept decimals

**Functionality**
- [ ] Save updates the record
- [ ] Success message appears
- [ ] Redirects to records page
- [ ] Changes reflect in table
- [ ] Cancel returns to records

### 5. Reports Page (/reports)

**Date Filters**
- [ ] All 6 filter buttons present
- [ ] Today filter works
- [ ] Yesterday filter works
- [ ] Week filter works
- [ ] Month filter works
- [ ] Year filter works
- [ ] Custom filter shows date inputs

**Custom Date Range**
- [ ] Start date input appears
- [ ] End date input appears
- [ ] Date range filters correctly
- [ ] Invalid ranges handled

**Statistics**
- [ ] 5 stat cards display
- [ ] Totals calculate correctly
- [ ] Numbers format with decimals
- [ ] Updates when filter changes

**Export**
- [ ] Export PDF button works
- [ ] Export Excel button works
- [ ] Exports filtered data only
- [ ] Filenames correct (report.pdf, report.xlsx)

**Table**
- [ ] Shows filtered records
- [ ] Record count accurate
- [ ] All columns visible
- [ ] Data matches filters

## PDF Export Testing

**Content**
- [ ] Logo appears in PDF
- [ ] App name in header
- [ ] Generation date shown
- [ ] All 11 columns included
- [ ] Data matches selection

**Formatting**
- [ ] Table fits on page
- [ ] Text is readable
- [ ] Columns aligned
- [ ] Page numbers present
- [ ] Multi-page works

**Download**
- [ ] File downloads automatically
- [ ] Filename correct
- [ ] Opens in PDF viewer
- [ ] No corruption

## Excel Export Testing

**Content**
- [ ] Header row present
- [ ] All 11 columns included
- [ ] Data matches selection
- [ ] Numbers formatted correctly

**Formatting**
- [ ] Columns auto-sized
- [ ] Headers bold
- [ ] Numbers show decimals
- [ ] Dates formatted

**Download**
- [ ] File downloads automatically
- [ ] Filename correct
- [ ] Opens in Excel/Sheets
- [ ] No corruption

## PWA Testing

### Installation

**Desktop (Chrome)**
- [ ] Install icon in address bar
- [ ] Click installs app
- [ ] App opens in window
- [ ] Icon in app drawer
- [ ] Uninstall works

**Android (Chrome)**
- [ ] Install prompt appears
- [ ] "Add to Home Screen" works
- [ ] Icon on home screen
- [ ] Opens in standalone mode
- [ ] Splash screen shows

**iOS (Safari)**
- [ ] Share button works
- [ ] "Add to Home Screen" option
- [ ] Icon on home screen
- [ ] Opens in standalone mode
- [ ] Logo as icon

### Offline Mode
- [ ] Service worker registers
- [ ] Static assets cached
- [ ] Logo cached
- [ ] Works offline (basic navigation)
- [ ] Online detection

### Manifest
- [ ] manifest.json accessible
- [ ] Icons load (192x192, 512x512)
- [ ] Theme color applies
- [ ] App name correct
- [ ] Start URL works

## Mobile Responsiveness

**Small Screens (320px - 480px)**
- [ ] Navbar collapses/adapts
- [ ] Forms stack vertically
- [ ] Inputs full width
- [ ] Buttons accessible
- [ ] Tables scroll horizontally
- [ ] Text readable
- [ ] No horizontal overflow

**Medium Screens (481px - 768px)**
- [ ] 2-column layouts work
- [ ] Sidebar hidden/toggleable
- [ ] Cards responsive
- [ ] Tables fit better

**Large Screens (769px+)**
- [ ] Sidebar visible
- [ ] Multi-column layouts
- [ ] Full table visible
- [ ] Optimal spacing

## Browser Testing

**Chrome**
- [ ] All features work
- [ ] PWA installs
- [ ] No console errors

**Firefox**
- [ ] All features work
- [ ] No console errors

**Safari**
- [ ] All features work
- [ ] iOS PWA works
- [ ] No console errors

**Edge**
- [ ] All features work
- [ ] PWA installs
- [ ] No console errors

## Performance Testing

**Load Times**
- [ ] Initial load < 3 seconds
- [ ] Page transitions smooth
- [ ] API responses < 1 second
- [ ] Images load quickly

**Optimization**
- [ ] No memory leaks
- [ ] Smooth scrolling
- [ ] No layout shifts
- [ ] Efficient re-renders

## Security Testing

**Environment Variables**
- [ ] No keys in client code
- [ ] Service key server-only
- [ ] .env.local in .gitignore

**API Routes**
- [ ] Validate inputs
- [ ] Handle errors gracefully
- [ ] No SQL injection possible
- [ ] CORS configured

**Database**
- [ ] RLS policies active
- [ ] Proper permissions
- [ ] No exposed data

## Error Handling

**Network Errors**
- [ ] Offline message shows
- [ ] Retry mechanism works
- [ ] User-friendly errors

**Form Errors**
- [ ] Validation messages clear
- [ ] Required fields marked
- [ ] Invalid data rejected

**API Errors**
- [ ] Error messages display
- [ ] No app crashes
- [ ] Logs errors properly

## Accessibility

**Keyboard Navigation**
- [ ] Tab order logical
- [ ] All buttons accessible
- [ ] Forms navigable
- [ ] Modals escapable

**Screen Readers**
- [ ] Labels present
- [ ] Alt text on images
- [ ] ARIA labels where needed
- [ ] Semantic HTML

**Visual**
- [ ] Sufficient contrast
- [ ] Text readable
- [ ] Focus indicators visible
- [ ] No color-only information

## Post-Deployment Testing

**Vercel Deployment**
- [ ] Build succeeds
- [ ] Environment variables set
- [ ] App loads on Vercel URL
- [ ] All features work in production
- [ ] HTTPS enabled
- [ ] Custom domain works (if set)

**Production Database**
- [ ] Connects to Supabase
- [ ] CRUD operations work
- [ ] Data persists
- [ ] No connection errors

**PWA in Production**
- [ ] Installs on all platforms
- [ ] Service worker active
- [ ] Offline mode works
- [ ] Updates properly

## Final Checklist

- [ ] All pages load correctly
- [ ] All features functional
- [ ] No console errors
- [ ] Mobile responsive
- [ ] PWA installs
- [ ] Exports work
- [ ] Database connected
- [ ] Performance acceptable
- [ ] Security measures in place
- [ ] Documentation complete

## Bug Reporting Template

When you find a bug, document:

```
**Bug Description:**
[What went wrong]

**Steps to Reproduce:**
1. Go to...
2. Click on...
3. See error...

**Expected Behavior:**
[What should happen]

**Actual Behavior:**
[What actually happened]

**Environment:**
- Browser: [Chrome/Firefox/Safari]
- Device: [Desktop/Mobile]
- OS: [Windows/Mac/iOS/Android]

**Screenshots:**
[If applicable]

**Console Errors:**
[Any error messages]
```

## Testing Tools

**Recommended Tools:**
- Chrome DevTools (Network, Console, Application)
- Lighthouse (Performance, PWA audit)
- React DevTools
- Supabase Dashboard (Database queries)
- Vercel Analytics (Production monitoring)

## Automated Testing (Future)

Consider adding:
- Jest for unit tests
- Cypress for E2E tests
- React Testing Library
- API route tests
- Database migration tests
