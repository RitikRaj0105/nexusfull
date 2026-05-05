# Nexus — AI Student Success Platform

A modern, full-featured student success web app built with React + Vite + Tailwind CSS.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## 📁 Project Structure

```
nexus/
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite config
├── tailwind.config.js              # Tailwind config
├── postcss.config.js               # PostCSS config
├── package.json
└── src/
    ├── main.jsx                    # React entry point
    ├── App.jsx                     # Root router & state
    ├── styles/
    │   └── globals.css             # Global styles + Tailwind
    ├── context/
    │   └── AppContext.jsx          # Global app state (auth, user, dark mode)
    ├── data/
    │   └── mockData.js             # All mock data (tasks, exams, career, etc.)
    ├── utils/
    │   └── helpers.js              # Utility/helper functions
    ├── components/
    │   ├── ui/
    │   │   └── index.jsx           # Reusable UI components (Card, Badge, Avatar, etc.)
    │   ├── layout/
    │   │   ├── Navbar.jsx          # Landing page top navigation
    │   │   ├── Sidebar.jsx         # Dashboard sidebar (desktop)
    │   │   ├── MobileNav.jsx       # Dashboard bottom nav (mobile)
    │   │   └── DashboardLayout.jsx # Dashboard layout wrapper
    │   ├── landing/
    │   │   ├── HeroSection.jsx     # Hero with headline + CTA
    │   │   ├── FeaturesSection.jsx # 6 features + AI chatbot callout
    │   │   ├── TestimonialsSection.jsx # Student testimonials + stats
    │   │   ├── PricingSection.jsx  # 3-tier pricing
    │   │   ├── FAQSection.jsx      # Accordion FAQ
    │   │   ├── CTASection.jsx      # Final CTA banner
    │   │   └── Footer.jsx          # Footer with links
    │   └── dashboard/
    │       ├── WelcomeHeader.jsx   # Greeting, progress, streak, quote
    │       ├── TodayTasks.jsx      # Study tasks with check-off
    │       ├── UpcomingExams.jsx   # Exam countdown + readiness
    │       ├── MoodCheckin.jsx     # Quick mood logger
    │       ├── FocusCards.jsx      # AI focus session + career insight
    │       └── SubjectWidgets.jsx  # Weak subjects + life skill of day
    └── pages/
        ├── LandingPage.jsx         # Full landing page assembly
        ├── AuthModal.jsx           # Login / Signup modal
        ├── DashboardPage.jsx       # Main dashboard grid
        ├── PlannerPage.jsx         # AI study planner + weekly schedule
        ├── WellnessPage.jsx        # Mood, journal, breathing, charts
        ├── CareerPage.jsx          # Career compass + strengths quiz
        ├── LifeSkillsPage.jsx      # 5-min lessons library
        ├── SocialPage.jsx          # Study rooms, leaderboard, challenges
        └── AnalyticsPage.jsx       # Progress charts + analytics
```

## 🎨 Design System

- **Fonts**: Syne (display), Clash Display (headings), DM Sans (body)
- **Primary**: Indigo/Violet gradient
- **Secondary**: Cyan/Blue
- **Backgrounds**: White / Slate-50
- **Dark mode**: Supported via `dark` class on `<html>`

## 🛠 Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Styling
- **Recharts** — Charts & data visualization
- **Lucide React** — Icons

## 📱 Pages & Features

| Page | Features |
|------|----------|
| Landing | Hero, Features, Testimonials, Pricing, FAQ, Footer |
| Dashboard | Welcome, Tasks, Exams, Mood, Focus, Career, Life Skill |
| Study Planner | Subject input, AI schedule, weekly roadmap |
| Wellness | Mood tracker, stress slider, journal, breathing, mood chart |
| Career Compass | Strengths quiz, career matches, skill roadmap |
| Life Skills | Lesson library, progress tracking, categories |
| Social Hub | Study rooms, leaderboard, challenges |
| Analytics | Study hours, score trend, subject readiness, mood chart |

## 🔌 Backend Integration Points

All data is currently mocked in `src/data/mockData.js`. To connect a real backend:

1. Replace data imports with API calls in each page component
2. Update `AppContext.jsx` login/logout to call your auth API
3. Connect Recharts data to real analytics endpoints
4. Add WebSocket for real-time study rooms

## 📦 Build for Production

```bash
npm run build
# Output in /dist folder — ready to deploy to Vercel, Netlify, etc.
```
