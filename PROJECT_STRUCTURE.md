# Project Structure

Complete overview of the Indian Soft Colours – Digital Printing application.

## Directory Tree

```
indian-soft-colours/
├── components/              # React components
│   ├── DeleteModal.js      # Confirmation modal for deletions
│   ├── InstallPrompt.js    # PWA install prompt
│   ├── Layout.js           # Main layout wrapper
│   ├── Navbar.js           # Top navigation bar
│   └── Sidebar.js          # Side navigation menu
│
├── pages/                  # Next.js pages (routes)
│   ├── api/               # API routes (serverless functions)
│   │   ├── addRecord.js   # POST - Add new record
│   │   ├── deleteRecord.js # DELETE - Remove record
│   │   ├── editRecord.js  # PUT - Update record
│   │   ├── filter.js      # GET - Filter by date range
│   │   └── getRecords.js  # GET - Fetch all records
│   │
│   ├── edit/
│   │   └── [id].js        # Dynamic route for editing
│   │
│   ├── _app.js            # App wrapper (global state)
│   ├── _document.js       # HTML document structure
│   ├── add.js             # Add new record page
│   ├── index.js           # Dashboard (home page)
│   ├── records.js         # Records table page
│   └── reports.js         # Reports & analytics page
│
├── public/                # Static assets
│   ├── icon-192.png       # PWA icon (192x192)
│   ├── icon-512.png       # PWA icon (512x512)
│   ├── logo.png           # Company logo
│   ├── manifest.json      # PWA manifest
│   └── sw.js              # Service worker
│
├── styles/
│   └── globals.css        # Global styles
│
├── utils/                 # Utility functions
│   ├── excelExport.js     # Excel export logic
│   ├── pdfExport.js       # PDF export logic
│   └── supabase.js        # Supabase client setup
│
├── .env.local.example     # Environment variables template
├── .gitignore             # Git ignore rules
├── DEPLOYMENT.md          # Deployment instructions
├── next.config.js         # Next.js configuration
├── package.json           # Dependencies & scripts
├── postcss.config.js      # PostCSS configuration
├── QUICKSTART.md          # Quick setup guide
├── README.md              # Main documentation
├── SUPABASE_SETUP.sql     # Database schema
├── tailwind.config.js     # Tailwind CSS config
└── vercel.json            # Vercel deployment config
```

## Component Details

### Layout Components

**Navbar.js**
- Displays logo and app name
- Navigation links (Dashboard, Add, Records, Reports)
- Responsive design

**Sidebar.js**
- Side navigation menu
- Active route highlighting
- Icon-based navigation

**Layout.js**
- Wraps all pages
- Includes Navbar and Sidebar
- Adds InstallPrompt component

**DeleteModal.js**
- Confirmation dialog
- Shows record details
- Confirm/Cancel actions

**InstallPrompt.js**
- PWA installation prompt
- Auto-detects install capability
- Dismissible notification

## Page Details

### Dashboard (index.js)
- Total records count
- Today's records count
- Sum of partyMtr, printMtr, outwardMtr
- Last 5 entries table
- Logo display

### Add Record (add.js)
- 11-field form
- Date picker
- Number inputs with decimals
- Form validation
- Submit to API

### Records Table (records.js)
- Full data table (11 columns)
- Search functionality
- Multiple filters:
  - Party name
  - Fabric quality
  - Date range
- Multi-select rows
- Export selected/all to PDF/Excel
- Edit/Delete actions

### Edit Record (edit/[id].js)
- Pre-filled form
- Same fields as Add
- Update existing record
- Cancel option

### Reports (reports.js)
- Date filters:
  - Today
  - Yesterday
  - Week
  - Month
  - Year
  - Custom range
- Statistics cards
- Filtered data table
- Export options

## API Routes

All routes use Supabase for database operations.

### GET /api/getRecords
- Fetches all records
- Ordered by created_at DESC
- Returns JSON array

### POST /api/addRecord
- Accepts 11 fields
- Validates data
- Inserts into database
- Returns created record

### PUT /api/editRecord?id=UUID
- Updates specific record
- Requires all 11 fields
- Returns updated record

### DELETE /api/deleteRecord?id=UUID
- Deletes specific record
- Returns deleted record

### GET /api/filter?start=DATE&end=DATE
- Filters by date range
- Optional start/end parameters
- Returns filtered records

## Utility Functions

### supabase.js
- Creates Supabase client
- Exports admin client for API routes
- Handles authentication

### pdfExport.js
- Uses jsPDF library
- Adds logo to PDF
- Creates table with all columns
- Page numbering
- Auto-sizing

### excelExport.js
- Uses SheetJS (xlsx)
- Creates formatted spreadsheet
- Header row
- Auto-column sizing
- Downloads file

## PWA Configuration

### manifest.json
- App name and short name
- Start URL
- Display mode (standalone)
- Icons (192x192, 512x512)
- Theme colors

### sw.js (Service Worker)
- Caches static assets
- Offline support
- Cache-first strategy
- Auto-updates

## Database Schema

### Table: records

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| date | TEXT | Record date |
| dcNo | TEXT | DC number |
| partyName | TEXT | Party name |
| fabricQuality | TEXT | Fabric quality |
| partyMtr | NUMERIC | Party meters |
| paddingMtr | NUMERIC | Padding meters |
| shortOrExcess | NUMERIC | Short or excess |
| printMtr | NUMERIC | Print meters |
| fabricMtr | NUMERIC | Fabric meters |
| outwardMtr | NUMERIC | Outward meters |
| balance | NUMERIC | Balance |
| created_at | TIMESTAMP | Creation time |

## Environment Variables

### Required Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Variable Usage

- `NEXT_PUBLIC_*` - Exposed to browser
- `SUPABASE_SERVICE_KEY` - Server-side only (API routes)

## Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
vercel
```

## Mobile Responsiveness

- Tailwind responsive classes
- Mobile-first design
- Touch-friendly inputs
- Responsive tables (horizontal scroll)
- Optimized for small screens

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Optimizations

- Server-side rendering (SSR)
- Static asset caching
- Image optimization
- Code splitting
- Lazy loading
- Service worker caching

## Security Features

- Environment variable protection
- API route validation
- Supabase Row Level Security
- HTTPS enforcement (Vercel)
- No exposed credentials

## Future Enhancements

Potential features to add:
- User authentication
- Role-based access
- Data backup/restore
- Advanced analytics
- Email notifications
- Barcode scanning
- Multi-language support
- Dark mode
