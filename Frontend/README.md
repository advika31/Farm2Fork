# TraceRoots Frontend - Next.js

A modern, glassmorphism-based frontend prototype for TraceRoots - an AI + blockchain-powered food traceability and zero-waste network.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
cd Frontend
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Frontend/
├── components/          # Shared React components
│   ├── Navbar.js       # Navigation bar with theme toggle
│   ├── Footer.js       # Footer component
│   └── Modal.js        # Reusable modal component
├── pages/              # Next.js pages (routes)
│   ├── index.js        # Homepage
│   ├── farmer.js       # Farmer Dashboard
│   ├── processor.js    # Processor Dashboard
│   ├── consumer.js     # Consumer Trace Tree
│   ├── ngo.js          # NGO Dashboard
│   ├── admin.js        # Admin Dashboard
│   ├── impact.js       # Public Impact Page
│   └── join.js         # Join Network Page
├── styles/             # CSS Modules
│   ├── globals.css     # Global styles and CSS variables
│   ├── Home.module.css
│   ├── Dashboard.module.css
│   ├── Consumer.module.css
│   ├── Admin.module.css
│   ├── Impact.module.css
│   ├── Join.module.css
│   ├── Navbar.module.css
│   ├── Footer.module.css
│   └── Modal.module.css
├── lib/                # Utilities and mock data
│   └── mockData.js     # Static mock data for all dashboards
└── public/             # Static assets
    └── images/         # Images and logos
```

## 🎨 Design System

### Color Palette

- **Green Primary**: `#34C759` - Main brand color
- **Blue Primary**: `#007AFF` - Secondary accent
- **Yellow Primary**: `#FFD60A` - Highlight color
- **Glass Background**: `rgba(255, 255, 255, 0.7)` (light) / `rgba(28, 28, 30, 0.8)` (dark)

### Typography

- **Headings**: Poppins (400-700)
- **Body**: Inter (300-700)

### Features

- ✅ Glassmorphism UI design
- ✅ Dark mode support
- ✅ Fully responsive
- ✅ Smooth animations
- ✅ Mock data only (no backend)

## 📄 Pages Overview

### Homepage (`/`)

- Hero section with animated info cards
- "How It Works" workflow section
- Impact statistics with animated counters

### Farmer Dashboard (`/farmer`)

- Stats: Total Tokens, Batches Verified, Surplus Donated
- Batch list table
- Register New Batch modal with fake AI upload progress

### Processor Dashboard (`/processor`)

- Stats: Products Created, Tokens Earned
- Product list
- Create Product modal with QR scan simulation

### Consumer Page (`/consumer`)

- Trace Tree visualization (requires trace-tree.png image)
- Clickable nodes showing journey details
- Impact message card

### NGO Dashboard (`/ngo`)

- Live Surplus Map placeholder
- Inventory list
- Scan to Confirm donation modal

### Admin Dashboard (`/admin`)

- Tabs: Users, Blockchain Logs, AI Model Health
- User statistics cards
- Blockchain transaction log table
- AI health metrics

### Impact Page (`/impact`)

- Public statistics with animated counters
- Global impact map placeholder
- Growth metrics bar chart

### Join Page (`/join`)

- Three cards for Farmer, Processor, and NGO registration

## 🔧 Customization

### Adding Images

Place images in `public/images/`:

- `traceroots-logo.svg` - Already included
- `trace-tree.png` - For consumer trace tree visualization

### Modifying Mock Data

Edit `lib/mockData.js` to update dashboard statistics and lists.

### Theme Customization

Modify CSS variables in `styles/globals.css`:

```css
:root {
  --green-primary: #34c759;
  --blue-primary: #007aff;
  /* ... */
}
```

## 🚫 Limitations

- **No Backend**: All data is static/mock
- **No API Calls**: Everything uses local data
- **No Real Blockchain**: All blockchain hashes are placeholders
- **No Real AI**: Upload progress is simulated
- **No Real QR Scanning**: QR scan actions are simulated

## 📝 Notes

- The trace tree image (`trace-tree.png`) should be placed in `public/images/` for the consumer page
- All forms are non-functional (UI only)
- Modals use glassmorphism design with backdrop blur
- All animations are CSS-based

## 🎯 Next Steps

To connect to a real backend:

1. Replace mock data in `lib/mockData.js` with API calls
2. Add API routes in `pages/api/`
3. Implement real authentication
4. Connect to blockchain services
5. Integrate AI services for image processing

## 📄 License

Part of the TraceRoots project.
