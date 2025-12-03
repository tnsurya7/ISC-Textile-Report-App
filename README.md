# Indian Soft Colours – Digital Printing

A complete Textile Stock Management Web Application with PWA support.

## Features

- ✅ Add, Edit, Delete Records
- ✅ Dashboard with Statistics
- ✅ Advanced Filtering & Search
- ✅ PDF & Excel Export
- ✅ PWA - Installable on Android, iOS, Windows, Mac
- ✅ Mobile Responsive
- ✅ Offline Support

## Tech Stack

- **Frontend**: Next.js 14 + Tailwind CSS
- **Backend**: Vercel API Routes (Serverless)
- **Database**: Supabase PostgreSQL
- **Exports**: jsPDF + SheetJS (xlsx)
- **PWA**: Service Worker + Manifest

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase Database

1. Create a Supabase account at https://supabase.com
2. Create a new project
3. Run this SQL in the SQL Editor:

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

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

Get these values from your Supabase project settings:
- Go to Project Settings > API
- Copy the Project URL
- Copy the anon/public key
- Copy the service_role key

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 5. Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel project settings
5. Deploy

## Project Structure

```
├── components/
│   ├── DeleteModal.js
│   ├── InstallPrompt.js
│   ├── Layout.js
│   ├── Navbar.js
│   └── Sidebar.js
├── pages/
│   ├── api/
│   │   ├── addRecord.js
│   │   ├── deleteRecord.js
│   │   ├── editRecord.js
│   │   ├── filter.js
│   │   └── getRecords.js
│   ├── edit/
│   │   └── [id].js
│   ├── _app.js
│   ├── _document.js
│   ├── add.js
│   ├── index.js
│   ├── records.js
│   └── reports.js
├── public/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── logo.png
│   ├── manifest.json
│   └── sw.js
├── styles/
│   └── globals.css
├── utils/
│   ├── excelExport.js
│   ├── pdfExport.js
│   └── supabase.js
└── package.json
```

## API Endpoints

- `POST /api/addRecord` - Add new record
- `GET /api/getRecords` - Get all records
- `PUT /api/editRecord?id=XYZ` - Update record
- `DELETE /api/deleteRecord?id=XYZ` - Delete record
- `GET /api/filter?start=DATE&end=DATE` - Filter records by date

## PWA Installation

The app can be installed on:
- **Android**: Chrome browser > Menu > Install App
- **iOS**: Safari > Share > Add to Home Screen
- **Windows/Mac**: Chrome > Address bar > Install icon

## Features Guide

### Dashboard
- View total records and statistics
- See today's records count
- View recent 5 entries

### Add Record
- Form with 11 fields
- Auto-saves to Supabase

### Records Table
- Search across all fields
- Filter by party name, fabric quality, date range
- Select multiple records
- Export selected or all records to PDF/Excel
- Edit or delete individual records

### Reports
- Filter by: Today, Yesterday, Week, Month, Year, Custom Range
- View statistics for filtered data
- Export filtered data to PDF/Excel

## License

MIT
