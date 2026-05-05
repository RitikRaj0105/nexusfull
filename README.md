# 🚀 Nexus — AI Student Success Platform

> Full-stack monorepo: React + Vite frontend · Express + Prisma + PostgreSQL backend

---

## 📁 Project Structure

```
nexus-platform/
├── package.json              ← Root scripts (run both apps together)
├── .gitignore
│
├── frontend/                 ← React + Vite + Tailwind CSS
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env.example          ← Copy to .env → set VITE_API_URL
│   └── src/
│       ├── App.jsx                        ← Root router
│       ├── main.jsx                       ← React entry
│       ├── services/
│       │   └── api.js                     ← All backend API calls
│       ├── context/
│       │   └── AppContext.jsx             ← Global state + auth
│       ├── data/
│       │   └── mockData.js                ← Fallback data (offline mode)
│       ├── utils/
│       │   └── helpers.js                 ← Utility functions
│       ├── styles/
│       │   └── globals.css                ← Global styles + Tailwind
│       ├── components/
│       │   ├── ui/index.jsx               ← Card, Badge, Avatar, ProgressBar…
│       │   ├── layout/                    ← Navbar, Sidebar, MobileNav, Layout
│       │   ├── landing/                   ← Hero, Features, Testimonials, Pricing, FAQ, CTA, Footer
│       │   └── dashboard/                 ← Welcome, Tasks, Exams, Mood, Focus, Career, Skills
│       └── pages/
│           ├── LandingPage.jsx            ← Full public landing page
│           ├── AuthModal.jsx              ← Login / Signup (hits real API)
│           ├── DashboardPage.jsx          ← Main dashboard
│           ├── PlannerPage.jsx            ← AI study planner
│           ├── WellnessPage.jsx           ← Mood, journal, breathing
│           ├── CareerPage.jsx             ← Career compass
│           ├── LifeSkillsPage.jsx         ← 5-min lessons
│           ├── SocialPage.jsx             ← Rooms, leaderboard, challenges
│           └── AnalyticsPage.jsx          ← Charts + progress
│
└── backend/                  ← Express + Prisma ORM + PostgreSQL
    ├── package.json
    ├── .env.example           ← Copy to .env → set DATABASE_URL + JWT_SECRET
    ├── prisma/
    │   ├── schema.prisma      ← Full DB schema (10 models)
    │   └── seed.js            ← Demo data seeder
    └── src/
        ├── index.js                       ← Express server entry
        ├── controllers/                   ← Business logic (8 files)
        │   ├── auth.controller.js
        │   ├── subjects.controller.js
        │   ├── tasks.controller.js
        │   ├── exams.controller.js
        │   ├── wellness.controller.js
        │   ├── analytics.controller.js
        │   ├── social.controller.js
        │   └── lifeskills.controller.js
        ├── routes/                        ← Express routers (8 files)
        │   ├── auth.routes.js
        │   ├── subjects.routes.js
        │   ├── tasks.routes.js
        │   ├── exams.routes.js
        │   ├── wellness.routes.js
        │   ├── analytics.routes.js
        │   ├── social.routes.js
        │   └── lifeskills.routes.js
        ├── middleware/
        │   ├── auth.js                    ← JWT authentication
        │   ├── validate.js                ← express-validator runner
        │   └── errorHandler.js            ← Global error handler
        └── utils/
            ├── prisma.js                  ← Prisma client singleton
            ├── jwt.js                     ← Sign/verify JWT tokens
            └── response.js                ← Consistent API response helpers
```

---

## ⚡ Quick Start (5 steps)

### Step 1 — Install all dependencies
```bash
npm install           # installs concurrently at root
npm run install:all   # installs frontend + backend packages
```

### Step 2 — Configure environment variables

**Backend:**
```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env`:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/nexus_db"
JWT_SECRET="any_long_random_string_here"
CLIENT_URL="http://localhost:5173"
```

**Frontend:**
```bash
cp frontend/.env.example frontend/.env
```
Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3 — Set up the database

**Option A: Neon (free cloud PostgreSQL — recommended)**
1. Go to https://neon.tech → Create free account → New project
2. Copy the **Connection string** → paste as `DATABASE_URL` in `backend/.env`

**Option B: Local SQLite (zero setup — dev only)**
```bash
# In backend/.env:
DATABASE_URL="file:./dev.db"

# In backend/prisma/schema.prisma, change line 9 to:
provider = "sqlite"
```

### Step 4 — Run database migrations + seed
```bash
npm run db:setup
# This runs: prisma generate → prisma db push → seed demo data
# Demo login: alex@nexus.app / demo1234
```

### Step 5 — Start both apps
```bash
npm run dev
# Frontend → http://localhost:5173
# Backend  → http://localhost:5000
# API docs → http://localhost:5000/health
```

---

## 🗄️ Database Models (Prisma)

| Model | Description |
|-------|-------------|
| `User` | Auth, profile, XP points, streak |
| `Subject` | Student's subjects with weak topics |
| `Task` | Study tasks with priority + status |
| `Exam` | Upcoming exams with readiness tracking |
| `MoodLog` | Daily mood/stress/energy check-ins |
| `JournalEntry` | Private encrypted journal entries |
| `LifeSkillProgress` | Lesson completion tracking |
| `StudyRoom` | Live collaborative study rooms |
| `StudyRoomMember` | Room membership |
| `Challenge` | Friend challenges |
| `AnalyticsEntry` | Daily study hours + XP tracking |

---

## 🔌 API Endpoints

All protected routes require header: `Authorization: Bearer <token>`

| Module | Endpoints |
|--------|-----------|
| **Auth** | POST `/register` `/login` · GET/PATCH `/me` |
| **Subjects** | GET/POST `/subjects` · PATCH/DELETE `/subjects/:id` |
| **Tasks** | GET/POST `/tasks` · PATCH `/tasks/:id/toggle` |
| **Exams** | GET/POST `/exams` · PATCH/DELETE `/exams/:id` |
| **Wellness** | GET/POST `/wellness/mood` · CRUD `/wellness/journal` |
| **Analytics** | GET `/analytics/summary` `/analytics/leaderboard` |
| **Social** | CRUD `/social/rooms` · `/social/challenges` |
| **Life Skills** | GET/POST `/lifeskills/progress` |

---

## 🚀 Deploy (Free Stack)

### Frontend → Vercel (Free)
```bash
cd frontend
npm run build
# Push to GitHub → connect repo on vercel.com → auto deploy
# Set env var: VITE_API_URL = https://your-backend.railway.app/api
```

### Backend → Railway (~$5/mo)
```bash
# 1. Push backend/ folder to GitHub
# 2. railway.app → New Project → Deploy from GitHub → select /backend
# 3. Add env vars in Railway dashboard:
#    DATABASE_URL  (from Neon)
#    JWT_SECRET    (random string)
#    CLIENT_URL    (your Vercel URL)
#    NODE_ENV      production
# 4. Change start script in backend/package.json:
#    "start": "prisma migrate deploy && node src/index.js"
```

### Database → Neon (Free tier)
- Free: 0.5 GB storage, enough for 1,000+ students
- Go to https://neon.tech → free account → copy connection string

---

## 💰 Hosting Cost Summary

| Stage | Users | Cost/month |
|-------|-------|-----------|
| Development | Just you | **$0** (SQLite local) |
| Launch | 0–500 | **~$0–5** (Neon free + Railway) |
| Growth | 500–5K | **~$25–30** (Neon $19 + Railway $10) |
| Scale | 5K+ | **~$90** (upgrade both) |

---

## 🛡️ Security Features

- **Helmet.js** — HTTP security headers
- **CORS** — Restricted to your frontend URL only
- **Rate limiting** — 300 req/15min global, 20/15min on auth routes
- **bcrypt** — Password hashing (12 rounds)
- **JWT** — Signed tokens with expiry (7 days default)
- **express-validator** — Input validation on all write routes
- **Prisma** — Parameterized queries (SQL injection proof)

---

## 🧪 Test the API

```bash
# Health check
curl http://localhost:5000/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@test.com","name":"Your Name","password":"secret123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alex@nexus.app","password":"demo1234"}'

# Get today's tasks (use token from login response)
curl http://localhost:5000/api/tasks?date=2025-05-05 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
#   n e x u s f u l l  
 