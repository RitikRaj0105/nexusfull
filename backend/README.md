# Nexus Backend — REST API with Prisma ORM

Express.js + Prisma + PostgreSQL backend for the Nexus student platform.

---

## 🏆 Best Free/Low-Cost Backend Hosting Options

| Platform | Free Tier | Best For | DB Included |
|----------|-----------|----------|-------------|
| **Railway** ⭐ | $5 credit/month (covers small apps) | Easiest deploy, Prisma-friendly | PostgreSQL free |
| **Render** | 750 hrs/month free | Simple Node.js apps | PostgreSQL 1GB free |
| **Fly.io** | 3 VMs free | Production-grade, fast | Postgres via Neon |
| **Vercel** | Free for serverless | If you convert to serverless | Neon DB free |
| **Supabase** | 500MB DB, 2 projects free | DB + Auth + Storage combo | PostgreSQL ✅ |

### 🥇 Our Recommendation for Nexus

**Railway (Backend) + Neon (Database)**

- Railway: Deploy your Express app in 2 minutes from GitHub
- Neon: Free PostgreSQL with 0.5GB storage — perfect for starting
- Both free tiers are enough for 100–500 students
- Cost to scale: ~$5–10/month total

**Alternative: Render + Supabase**
- Render free tier sleeps after 15min inactivity (cold start delay)
- Supabase gives you DB + auto-generated REST API + Auth out of the box

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
```bash
cp .env.example .env
# Fill in DATABASE_URL and JWT_SECRET
```

### 3. Set up database

**Option A — Neon (Free PostgreSQL cloud):**
1. Go to https://neon.tech → Create project
2. Copy the connection string into `.env` as `DATABASE_URL`

**Option B — Local SQLite (fastest for dev):**
```bash
# In .env, set:
DATABASE_URL="file:./dev.db"
# In prisma/schema.prisma, change:
# provider = "sqlite"
```

**Option C — Supabase:**
1. Go to https://supabase.com → New project
2. Settings → Database → Connection string → copy URI

### 4. Run migrations
```bash
npm run db:generate   # Generate Prisma client
npm run db:push       # Push schema to database (dev)
# OR for production:
npm run db:migrate    # Create migration files
```

### 5. Seed sample data
```bash
npm run db:seed
# Creates user: alex@nexus.app / demo1234
```

### 6. Start server
```bash
npm run dev     # Development with hot reload
npm start       # Production
```

---

## 📁 Project Structure

```
nexus-backend/
├── src/
│   ├── index.js                    # Express server entry point
│   ├── controllers/
│   │   ├── auth.controller.js      # Register, login, profile
│   │   ├── subjects.controller.js  # Subject CRUD
│   │   ├── tasks.controller.js     # Task CRUD + toggle
│   │   ├── exams.controller.js     # Exam CRUD
│   │   ├── wellness.controller.js  # Mood logs + journal
│   │   ├── analytics.controller.js # Stats + leaderboard
│   │   ├── social.controller.js    # Study rooms + challenges
│   │   └── lifeskills.controller.js # Lesson progress
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── subjects.routes.js
│   │   ├── tasks.routes.js
│   │   ├── exams.routes.js
│   │   ├── wellness.routes.js
│   │   ├── analytics.routes.js
│   │   ├── social.routes.js
│   │   └── lifeskills.routes.js
│   ├── middleware/
│   │   ├── auth.js                 # JWT authentication
│   │   ├── validate.js             # express-validator runner
│   │   └── errorHandler.js        # Global error handling
│   └── utils/
│       ├── prisma.js               # Prisma client singleton
│       ├── jwt.js                  # JWT sign/verify
│       └── response.js             # Consistent API responses
├── prisma/
│   ├── schema.prisma               # Full data model
│   └── seed.js                     # Sample data
├── frontend-integration/
│   └── api.js                      # Drop into frontend src/services/
├── .env.example
└── package.json
```

---

## 🔌 API Reference

All protected routes require: `Authorization: Bearer <token>`

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login → returns JWT |
| GET | `/api/auth/me` | Get current user |
| PATCH | `/api/auth/me` | Update profile |
| PATCH | `/api/auth/change-password` | Change password |

### Subjects
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/subjects` | List all subjects |
| POST | `/api/subjects` | Add subject |
| PATCH | `/api/subjects/:id` | Update subject |
| DELETE | `/api/subjects/:id` | Delete subject |

### Tasks
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/tasks` | List tasks (filter by date/status) |
| POST | `/api/tasks` | Create task |
| PATCH | `/api/tasks/:id` | Update task |
| PATCH | `/api/tasks/:id/toggle` | Toggle done/pending |
| DELETE | `/api/tasks/:id` | Delete task |

### Exams
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/exams` | List exams with daysLeft |
| POST | `/api/exams` | Add exam |
| PATCH | `/api/exams/:id` | Update exam |
| DELETE | `/api/exams/:id` | Delete exam |

### Wellness
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/wellness/mood?days=7` | Mood logs + chart data |
| POST | `/api/wellness/mood` | Log mood |
| GET | `/api/wellness/journal` | Journal entries (paginated) |
| POST | `/api/wellness/journal` | Create entry |
| PATCH | `/api/wellness/journal/:id` | Edit entry |
| DELETE | `/api/wellness/journal/:id` | Delete entry |

### Analytics
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/analytics/summary` | Full stats overview |
| GET | `/api/analytics/leaderboard` | Top 20 users by XP |
| POST | `/api/analytics/log` | Log study session |

### Social
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/social/rooms` | Active study rooms |
| POST | `/api/social/rooms` | Create room |
| POST | `/api/social/rooms/:id/join` | Join room |
| POST | `/api/social/rooms/:id/leave` | Leave room |
| GET | `/api/social/challenges` | My challenges |
| POST | `/api/social/challenges` | Send challenge |
| PATCH | `/api/social/challenges/:id` | Accept/decline/complete |

### Life Skills
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/lifeskills/progress` | My lesson progress |
| POST | `/api/lifeskills/progress` | Update lesson progress |

---

## 🚢 Deploy to Railway (Recommended)

```bash
# 1. Push code to GitHub

# 2. Go to railway.app → New Project → Deploy from GitHub

# 3. Add environment variables in Railway dashboard:
#    DATABASE_URL  (from Neon)
#    JWT_SECRET    (any long random string)
#    CLIENT_URL    (your Vercel frontend URL)
#    NODE_ENV      production

# 4. Railway auto-detects Node.js and runs npm start

# 5. Run migrations on deploy:
#    Add to package.json "start": "prisma migrate deploy && node src/index.js"
```

## 🔐 Security Features Built-in

- Helmet.js (security headers)
- CORS restricted to your frontend URL
- Rate limiting (300 req/15min global, 20 req/15min auth)
- JWT with expiry
- bcrypt password hashing (12 rounds)
- Input validation on all routes
- Prisma prevents SQL injection by default

---

## 💰 Cost Summary

| Stage | Backend | Database | Total/month |
|-------|---------|----------|-------------|
| Dev | Free (local) | SQLite local | **$0** |
| Launch (0–500 users) | Railway ~$5 | Neon free | **~$5** |
| Growth (500–5K users) | Railway ~$10 | Neon $19 | **~$29** |
| Scale (5K+ users) | Railway $20 | Neon $69 | **~$89** |
