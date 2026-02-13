# ProductHub - E-commerce Dashboard

A modern, feature-rich product management dashboard built with Next.js 15, React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Functionality
- ✅ **Product List Page** with pagination (10 items per page)
- ✅ **Advanced Search** - Filter products by name with debouncing
- ✅ **Category Filter** - Dropdown to filter by product category
- ✅ **Date Range Filter** - Interactive calendar with custom styling
- ✅ **Product Detail Page** - Comprehensive product information
- ✅ **Favorites System** - Persistent favorites using localStorage
- ✅ **Theme Toggle** - Light/Dark mode with persistence
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized

### Advanced Features
- 🎨 **Custom Calendar Component** with:
  - Indigo-themed selected dates
  - Interactive hover preview showing formatted dates
  - Smooth animations and transitions
  - Full dark mode support
- ⚡ **Performance Optimizations**:
  - Debounced search input (300ms)
  - Next.js Image optimization
  - Client-side filtering for date ranges
  - Efficient state management with Zustand
- 🎯 **Professional UI/UX**:
  - Loading skeletons
  - Error handling
  - Empty states
  - Smooth transitions
  - Favorites counter in header

## 🛠 Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **API**: DummyJSON

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Implementation Details

### Date Filtering Feature

Since the DummyJSON API doesn't provide date fields or support date filtering, I implemented a client-side solution:

#### How it Works:
1. **Date Generation**: Each product is assigned a consistent date based on its ID using a seeded random function
2. **Date Range**: Products are distributed across the last 6 months
3. **Consistency**: Dates remain the same across page refreshes using the product ID as a seed
4. **Client-side Filtering**: After fetching products, they're filtered client-side based on the selected date range

#### Implementation Files:
- `lib/date-utils.ts` - Contains date generation and filtering logic
- `components/date-range-picker.tsx` - Custom date range picker component
- `components/ui/calendar.tsx` - Enhanced calendar with hover preview

### Calendar Customization

The calendar component includes several custom features:

1. **Indigo Theme**: Selected dates use indigo background (#6366f1)
2. **Hover Preview**: Shows formatted date on hover in a popover
3. **Dark Mode**: Fully supports theme switching
4. **Smooth Animations**: Fade-in effects for hover previews

### State Management

Using Zustand for:
- **Favorites**: Persisted in localStorage
- **Theme**: Persisted in localStorage
- Reactive updates across components

### Pagination Strategy

Since date filtering is client-side:
1. Fetch all products (up to 200 from API)
2. Apply all filters (search, category, date range)
3. Paginate the filtered results
4. Reset to page 1 when filters change

## 📁 Project Structure

```
ecommerce-dashboard/
├── app/
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx          # Product detail page
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main products page
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── calendar.tsx         # Custom calendar
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── popover.tsx
│   │   └── select.tsx
│   ├── date-range-picker.tsx    # Date range picker
│   ├── header.tsx               # App header
│   ├── loading-skeleton.tsx     # Loading states
│   ├── product-card.tsx         # Product card component
│   └── theme-toggle.tsx         # Theme switcher
├── lib/
│   ├── date-utils.ts            # Date generation & filtering
│   ├── store.ts                 # Zustand stores
│   ├── types.ts                 # TypeScript types
│   └── utils.ts                 # Utility functions
└── package.json
```

## 🎨 Design Decisions

### UI/UX Choices:
- **Indigo Color Scheme**: Professional and modern primary color
- **Card-based Layout**: Clean, scannable product grid
- **Sticky Header**: Always accessible navigation and theme toggle
- **Favorites Counter**: Visual feedback in header
- **Loading Skeletons**: Better perceived performance
- **Hover Effects**: Smooth transitions and scale effects

### Technical Choices:
- **App Router**: Modern Next.js routing with server components
- **Zustand**: Lightweight state management with persistence
- **Client Components**: For interactive features requiring state
- **TypeScript**: Type safety throughout the application
- **Tailwind CSS**: Utility-first styling for rapid development

## 🚀 Performance Optimizations

1. **Image Optimization**: Using Next.js Image component
2. **Debounced Search**: Reduces API calls/filtering operations
3. **Memoization**: useMemo for expensive filtering operations
4. **Code Splitting**: Automatic with Next.js App Router
5. **Lazy Loading**: Images load as needed

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

This application is ready to deploy on Vercel:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📝 Notes & Assumptions

1. **API Limitations**: DummyJSON doesn't support date filtering, so all filtering is client-side
2. **Data Fetching**: Fetching up to 200 products for filtering purposes
3. **Date Consistency**: Using product ID as seed ensures dates don't change between renders
4. **Browser Support**: Modern browsers with ES6+ support

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is created for evaluation purposes.

---

**Built with ❤️ using Next.js, React, and TypeScript**
