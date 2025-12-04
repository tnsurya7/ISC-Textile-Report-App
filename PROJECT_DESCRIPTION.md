# ISC Textile Report App - Complete Project Description

## 🎯 Project Overview

**Indian Soft Colours – Digital Printing** is a comprehensive web-based textile management system designed for tracking and managing fabric printing operations. The application provides real-time record management, reporting capabilities, and data export functionality optimized for both mobile and desktop use.

## 🚀 Key Features

### 1. **Record Management**
- Add new textile printing records with comprehensive details
- Edit existing records with real-time updates
- Delete records with confirmation modal
- Search and filter records by date ranges (today, week, month, custom)
- Bulk selection for export operations

### 2. **Data Fields**
- **Date**: Record creation date
- **Party DC No**: Party delivery challan number
- **Padding DC No**: Padding delivery challan number
- **Party Name**: Customer/party name
- **Fabric Quality**: Type and quality of fabric
- **Party Mtr**: Meters received from party
- **Padding Mtr**: Meters used for padding
- **Short/Excess**: Shortage or excess in meters
- **Print Mtr**: Meters printed
- **Outward Mtr**: Meters sent out
- **Balance**: Remaining balance in meters

### 3. **Reporting & Analytics**
- Real-time statistics dashboard
- Total records count
- Sum of Party Mtr, Print Mtr, Outward Mtr, and Balance
- Date-based filtering (All, Today, Week, Month, Custom Range)
- Visual cards with color-coded metrics

### 4. **Export Capabilities**
- **PDF Export**: 
  - Landscape orientation for desktop/macOS
  - Portrait orientation for mobile devices
  - Auto-width columns for optimal viewing
  - Company logo and branding
  - Page numbering
  - Export selected records or all records
  
- **Excel Export**:
  - Full data export with all columns
  - Compatible with Microsoft Excel and Google Sheets
  - Export selected records or all records

### 5. **Progressive Web App (PWA)**
- Installable on mobile devices (iOS/Android)
- Installable on desktop (Windows/macOS/Linux)
- Offline capability
- App-like experience
- Custom app icons and splash screens

### 6. **Responsive Design**
- Mobile-first approach
- Tablet optimization
- Desktop full-screen layout
- Touch-friendly interface
- Adaptive navigation

## 🛠️ Technology Stack

### Frontend
- **Next.js 13+**: React framework with server-side rendering
- **React 18**: UI component library
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript (ES6+)**: Modern JavaScript features

### Backend & Database
- **Supabase**: PostgreSQL database with real-time capabilities
- **Supabase Auth**: Authentication system (ready for future implementation)
- **RESTful API**: Custom API routes in Next.js

### Libraries & Tools
- **jsPDF**: PDF generation library
- **jsPDF-AutoTable**: Table formatting for PDFs
- **XLSX (SheetJS)**: Excel file generation
- **Next PWA**: Progressive Web App functionality

## 📁 Project Structure

```
ISC-Textile-Report-App/
├── components/
│   ├── ClientOnly.js          # Client-side only rendering wrapper
│   ├── DeleteModal.js         # Confirmation modal for deletions
│   ├── InstallPrompt.js       # PWA installation prompt
│   ├── Layout.js              # Main layout wrapper
│   ├── Navbar.js              # Navigation bar
│   ├── Sidebar.js             # Side navigation
│   └── Toast.js               # Toast notifications
├── pages/
│   ├── api/
│   │   ├── addRecord.js       # Add new record endpoint
│   │   ├── deleteRecord.js    # Delete record endpoint
│   │   ├── editRecord.js      # Update record endpoint
│   │   ├── getRecords.js      # Fetch all records endpoint
│   │   └── filter.js          # Filter records endpoint
│   ├── edit/
│   │   └── [id].js            # Dynamic edit page
│   ├── _app.js                # Next.js app wrapper
│   ├── _document.js           # Custom document
│   ├── add.js                 # Add record redirect page
│   ├── index.js               # Main dashboard (Add/Records/Reports tabs)
│   ├── records.js             # Records page redirect
│   └── reports.js             # Reports page redirect
├── utils/
│   ├── dbMapper.js            # Database field mapping (snake_case ↔ camelCase)
│   ├── excelExport.js         # Excel export functionality
│   ├── pdfExport.js           # PDF export functionality
│   └── supabase.js            # Supabase client configuration
├── public/
│   ├── logo.png               # Company logo
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── icons/                 # App icons
├── styles/
│   └── globals.css            # Global styles
├── .env.local                 # Environment variables (Supabase credentials)
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── package.json               # Dependencies and scripts
```

## 🗄️ Database Schema

### Table: `records`

```sql
CREATE TABLE records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  party_dc VARCHAR(255),
  padding_dc VARCHAR(255),
  party_name VARCHAR(255),
  fabric_quality VARCHAR(255),
  party_mtr DECIMAL(10,2),
  padding_mtr DECIMAL(10,2),
  short_or_excess VARCHAR(255),
  print_mtr DECIMAL(10,2),
  fabric_mtr DECIMAL(10,2),
  outward_mtr DECIMAL(10,2),
  balance DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 16+ and npm
- Supabase account
- Git

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/tnsurya7/ISC-Textile-Report-App.git
cd ISC-Textile-Report-App
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
Create `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Setup database**
Run the SQL scripts in Supabase SQL Editor:
- `SUPABASE_SETUP.sql` - Initial table creation
- `FIX_DATABASE_SNAKE_CASE.sql` - Field naming fixes

5. **Run development server**
```bash
npm run dev
```

6. **Build for production**
```bash
npm run build
npm start
```

## 🌐 Deployment

### Vercel Deployment (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically

### Manual Deployment
- Configure `vercel.json` for routing
- Set up environment variables
- Deploy using `vercel --prod`

## 📱 PWA Installation

### Mobile (iOS)
1. Open app in Safari
2. Tap Share button
3. Select "Add to Home Screen"

### Mobile (Android)
1. Open app in Chrome
2. Tap menu (⋮)
3. Select "Install app"

### Desktop
1. Open app in Chrome/Edge
2. Click install icon in address bar
3. Or use "Install Indian Soft Colours" from menu

## 🎨 UI/UX Features

- **Tab Navigation**: Add, Records, Reports
- **Color-Coded Stats**: Visual metrics with distinct colors
- **Search Functionality**: Real-time search across all fields
- **Date Filters**: Quick filters and custom date ranges
- **Bulk Actions**: Select multiple records for export
- **Responsive Tables**: Horizontal scroll on mobile
- **Toast Notifications**: Success/error feedback
- **Loading States**: Visual feedback during operations
- **Confirmation Modals**: Prevent accidental deletions

## 🔐 Security Features

- Environment variable protection
- Supabase Row Level Security (RLS) ready
- API route protection
- Input validation
- SQL injection prevention

## 📊 Performance Optimizations

- Server-side rendering (SSR)
- Image optimization with Next.js Image
- Code splitting
- Lazy loading components
- Efficient database queries
- Caching strategies

## 🐛 Known Issues & Solutions

All major issues have been resolved:
- ✅ DC No field replaced with Party DC and Padding DC
- ✅ Database field mapping (snake_case ↔ camelCase)
- ✅ PDF column width optimization
- ✅ Landscape/Portrait orientation based on device
- ✅ Balance column display in exports

## 🔄 Recent Updates

1. **Field Restructuring**: Replaced single DC No with Party DC No and Padding DC No
2. **Database Mapper**: Updated to handle new field structure
3. **PDF Export**: Optimized for landscape (desktop) and portrait (mobile)
4. **Excel Export**: Updated with new columns
5. **Edit Page**: Synchronized with new field structure

## 📈 Future Enhancements

- User authentication and authorization
- Multi-user support with role-based access
- Advanced analytics and charts
- Automated backup system
- Email/SMS notifications
- Barcode/QR code integration
- Inventory management
- Invoice generation
- Multi-language support
- Dark mode

## 👥 User Roles (Future)

- **Admin**: Full access to all features
- **Manager**: View and edit records
- **Operator**: Add and view records only
- **Viewer**: Read-only access

## 📞 Support & Maintenance

- Regular database backups
- Performance monitoring
- Security updates
- Bug fixes and improvements
- Feature requests handling

## 📄 License

This project is proprietary software for Indian Soft Colours – Digital Printing.

## 🙏 Acknowledgments

Built with modern web technologies to streamline textile printing operations and improve business efficiency.

---

**Version**: 1.0.0  
**Last Updated**: December 2025  
**Repository**: https://github.com/tnsurya7/ISC-Textile-Report-App  
**Status**: Production Ready ✅
