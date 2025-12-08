# 🚀 Roberto Rivera - Portfolio Website

A modern, scalable personal portfolio built with **Angular 15**, featuring a modular architecture, lazy-loaded modules, and an integrated chatbot demo.

🌐 **Live Site:** [rrtportfolio.com](https://www.rrtportfolio.com)

---

## ✨ Features

### 📋 **My Work Section**
- **Dynamic Filtering System**
  - Filter by category: Projects, QA, Fullstack, GameDev, Education
  - Filter by year via dropdown (adapts to selected category)
  - Combined filters with URL persistence (shareable links)
  - Results counter with active filter indicators

- **Modern Card Design**
  - Large thumbnail headers with zoom effect
  - Category tags with distinct colors
  - Expandable "Read More" sections
  - **Share button** with Web Share API / clipboard fallback

- **Responsive Layouts**
  - Grid view (multi-column) when viewing all items
  - List view (single column) when filtering by category
  - Mobile-optimized with full-width cards

### 💬 **Chatbot Demo**
- Complete authentication flow (JWT-based)
- Real-time chat with AI assistant
- Chat history persistence (PostgreSQL backend)
- Account management (update email/password, delete account)

### 🏗️ **Architecture Highlights**
- **Lazy Loading**: Chatbot and Games modules loaded on demand
- **Design Tokens**: CSS variables for consistent theming
- **HTTP Interceptor**: Automatic JWT injection
- **Route Guards**: Protected routes for authenticated users
- **Standalone AuthService**: Centralized authentication state

---

## 📦 Project Structure

```
frontend-webpage/
├── src/
│   ├── app/
│   │   ├── articles/           # Work items data (by year)
│   │   ├── components/         # Shared components
│   │   │   ├── header/         # Navigation sidebar
│   │   │   └── work-card/      # Project card component
│   │   ├── guards/             # Route guards (AuthGuard)
│   │   ├── interceptors/       # HTTP interceptors
│   │   ├── pages/
│   │   │   ├── home/           # Landing page
│   │   │   ├── aboutme/        # About section
│   │   │   ├── mywork/         # Portfolio with filters
│   │   │   ├── contact/        # Contact info
│   │   │   ├── chatbot/        # 🔄 Lazy loaded module
│   │   │   └── games/          # 🔄 Lazy loaded module
│   │   └── services/           # API & Auth services
│   ├── assets/                 # Images, icons, CV
│   └── environments/           # Environment configs
├── scripts/                    # Build utilities
└── angular.json                # Angular configuration
```

---

## 🎨 Design System

### CSS Variables (Design Tokens)

```css
/* Primary Colors */
--color-primary: #1ad8fa;
--color-primary-dark: #007acc;

/* Secondary (Green) */
--color-secondary: #41e392;

/* Accent */
--color-accent: #ffcc00;
--color-accent-orange: #ffb347;

/* Spacing Scale */
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;
```

### Category Colors
| Category | Color |
|----------|-------|
| Projects | Cyan `#1ad8fa` |
| QA | Orange `#ffb347` |
| Fullstack | Purple `#7c3aed` |
| GameDev | Red `#dc2626` |
| Education | Green `#41e392` |

---

## 🌐 Deployment

| Environment | URL | Branch |
|-------------|-----|--------|
| Production | [rrtportfolio.com](https://www.rrtportfolio.com) | `main` |
| QA-Staging | [rrt-frontend-qa.vercel.app](https://rrt-frontend-qa.vercel.app) | `qa-staging` |

### Build Commands

```bash
# Development
npm start

# QA-Staging build
npm run build:qa-staging

# Production build
npm run build:production
```

---

## ⚙️ Technical Stack

| Technology | Purpose |
|------------|---------|
| Angular 15 | Frontend framework |
| TypeScript | Type-safe development |
| Angular Material | UI components |
| RxJS | Reactive state management |
| Vercel | Hosting & CI/CD |

### Backend Integration
- FastAPI (Python)
- PostgreSQL database
- OpenAI API for chatbot
- JWT authentication

🔗 [Backend Repository](https://github.com/RobertoRiveraT/backend-rrt-portfolio-webpage)

---

## 🔧 Environment Setup

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `BASE_URL` | Backend API URL |

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm start

# Run with QA environment
npm run serve:qa
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| > 900px | Multi-column grid |
| 768-900px | Single column |
| < 768px | Mobile optimized |

---

## 🚀 Performance Optimizations

- **Lazy Loading**: ~140KB saved on initial load
  - Chatbot module: 136KB (loaded on demand)
  - Games module: 5KB (loaded on demand)
- **TrackBy**: Optimized ngFor rendering
- **CSS Variables**: Reduced style duplication
- **Image optimization**: Lazy loading thumbnails

---

## 📂 Adding New Projects

1. Create a new folder in `src/app/articles/items/[YEAR]/`
2. Add a `.project.ts` file following the `WorkItem` interface:

```typescript
import { WorkItem } from '../../../work-item.interface';

export const MyProject: WorkItem = {
    title: 'Project Name',
    category: ['Projects', 'Fullstack'],
    cardColor: 'blue',
    startDate: '2025-01',
    endDate: '2025-02',
    description: 'Project description...',
    bullets: ['Feature 1', 'Feature 2'],
    link: 'https://project-url.com',
    thumbnail: 'assets/img/work/2025/project_thumb.jpg'
};
```

3. Import and add to `work-items.ts`

---

## 👨‍💻 Author

**Roberto Rivera Terán**
- GitHub: [@RobertoRiveraT](https://github.com/RobertoRiveraT)
- LinkedIn: [robertoriverateran](https://linkedin.com/in/robertoriverateran/)
- Website: [rrtportfolio.com](https://www.rrtportfolio.com)

---

## 📄 License

This project is for portfolio demonstration purposes.
