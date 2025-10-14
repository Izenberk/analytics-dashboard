# 📊 Analytics Dashboard

![Next.js](https://img.shields.io/badge/Next.js-15.5.5-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-93%25-blue?logo=typescript)
![MUI](https://img.shields.io/badge/MUI-5.x-007FFF?logo=mui)
![License](https://img.shields.io/badge/license-MIT-green)

> A modern, professional analytics dashboard built with Next.js 15, TypeScript, and Material-UI. Features real-time data visualization, responsive design, and a comprehensive component library.


## ✨ Features

### 🎨 **Professional Design System**
- Custom Material-UI theme optimized for analytics
- Consistent color palette for positive/negative metrics
- Typography scale designed for data readability
- Dark mode support for extended usage

### 📱 **Responsive Analytics Components**
- Interactive metric cards with trend indicators
- Professional data visualization with MUI X Charts
- Responsive data tables with sorting and filtering
- Mobile-first design for analytics on-the-go

### 🔧 **Developer Experience**
- Full TypeScript support with strict type checking
- Clean architecture with separation of concerns
- Reusable component library with consistent APIs
- Professional Git workflow and commit conventions

### ⚡ **Performance Optimized**
- Next.js 15 App Router for optimal performance
- Server-side rendering for faster initial loads
- Optimized bundle splitting and lazy loading
- Professional caching strategies

## 🛠️ Tech Stack

### **Frontend Framework**
- **Next.js 15.5.5** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5.x** - Type safety and developer experience

### **UI & Design**
- **Material-UI (MUI) 5.x** - Professional component library
- **MUI X Charts** - Advanced data visualization
- **MUI Icons** - Comprehensive icon library
- **Emotion** - CSS-in-JS styling solution

### **Development Tools**
- **ESLint** - Code quality and consistency
- **Tailwind CSS** - Utility-first CSS framework
- **Date-fns** - Modern date manipulation library

### **Analytics & Data**
- **Recharts** - Composable charting library
- **Tremor React** - Analytics-focused components
- **Custom data formatting utilities**

## 🚀 Getting Started

### **Prerequisites**

Ensure you have the following installed:
- **Node.js 18+** (LTS recommended)
- **npm 9+** or **pnpm 8+**
- **Git** for version control

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Izenberk/analytics-dashboard.git
   cd analytics-dashboard
   ```

2. **Navigate to the web application**
   ```bash
   cd apps/web
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

### **Environment Setup**

Create a `.env.local` file in the `apps/web` directory:
```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_APP_NAME="Analytics Dashboard"
```

## 📁 Project Structure

```
analytics-dashboard/
├── apps/web/                          # Main Next.js application
│   ├── src/
│   │   ├── app/                       # Next.js App Router pages
│   │   │   ├── layout.tsx             # Root layout with theme setup
│   │   │   └── page.tsx               # Homepage component
│   │   ├── components/                # Reusable UI components
│   │   │   └── ui/                    # Base UI components
│   │   │       └── AnalyticsButton.tsx
│   │   ├── providers/                 # React context providers
│   │   │   └── ThemeRegistry.tsx      # MUI theme provider
│   │   ├── theme/                     # Design system configuration
│   │   │   └── theme.ts               # Custom MUI theme
│   │   └── lib/                       # Utility functions and types
│   │       ├── utils.ts               # Helper functions
│   │       └── types.ts               # TypeScript type definitions
│   ├── public/                        # Static assets
│   └── package.json                   # Dependencies and scripts
├── package.json                       # Workspace configuration
└── README.md                          # Project documentation
```

### **Architecture Principles**

- **Component-Driven Development**: Reusable, testable UI components
- **Type Safety**: Comprehensive TypeScript coverage
- **Separation of Concerns**: Clear boundaries between UI, logic, and data
- **Professional Patterns**: Industry-standard React and Next.js practices

## 🔨 Development

### **Available Scripts**

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # Run TypeScript compiler
```

### **Component Development**

Our component library follows these conventions:

```typescript
// Example: Creating a new analytics component
import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';

interface MetricCardProps {
  title: string;
  value: number;
  trend?: 'up' | 'down' | 'neutral';
  sx?: SxProps<Theme>;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend = 'neutral',
  sx
}) => {
  // Component implementation
};
```

### **Theme Customization**

Modify `src/theme/theme.ts` to customize the design system:

```typescript
// Add custom colors for your analytics needs
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Your brand color
    },
    // Add custom analytics colors
    success: {
      main: '#2e7d32', // Positive metrics
    },
    error: {
      main: '#d32f2f', // Negative metrics
    },
  },
});
```

## 🚀 Deployment

### **Vercel (Recommended)**

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Configure build settings**
   - Build Command: `cd apps/web && npm run build`
   - Output Directory: `apps/web/.next`

### **Docker Deployment**

```dockerfile
# Example Dockerfile (add to project root)
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=build /app/apps/web/.next ./apps/web/.next
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following our coding standards
4. **Write/update tests** for your changes
5. **Commit your changes**: `git commit -m 'feat: add amazing feature'`
6. **Push to your branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### **Commit Convention**

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance tasks

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Izenberk**
- GitHub: [@Izenberk](https://github.com/Izenberk)
- Project: [Analytics Dashboard](https://github.com/Izenberk/analytics-dashboard)

## 🙏 Acknowledgments

- [Material-UI](https://mui.com/) for the excellent component library
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Vercel](https://vercel.com/) for seamless deployment platform

---

**Built with ❤️ using modern web technologies**

