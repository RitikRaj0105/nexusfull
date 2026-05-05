// src/index.js — Nexus Backend Server
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'

// Routes
import authRoutes from './routes/auth.routes.js'
import subjectRoutes from './routes/subjects.routes.js'
import taskRoutes from './routes/tasks.routes.js'
import examRoutes from './routes/exams.routes.js'
import wellnessRoutes from './routes/wellness.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'
import socialRoutes from './routes/social.routes.js'
import lifeskillsRoutes from './routes/lifeskills.routes.js'

// Middleware
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 5000

// ── Security & Parsing ───────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: true, // allow all origins in dev
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// ── Rate Limiting ────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 300,
  message: { success: false, message: 'Too many requests. Try again in 15 minutes.' },
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many auth attempts. Try again later.' },
})

app.use(globalLimiter)

// ── Health Check ─────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Nexus API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
  })
})

// ── API Routes ───────────────────────────────────────────
app.use('/api/auth', authLimiter, authRoutes)
app.use('/api/subjects', subjectRoutes)
app.use('/api/tasks', taskRoutes)
app.use('/api/exams', examRoutes)
app.use('/api/wellness', wellnessRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/social', socialRoutes)
app.use('/api/lifeskills', lifeskillsRoutes)

// ── 404 & Error Handling ─────────────────────────────────
app.use(notFoundHandler)
app.use(errorHandler)

// ── Start Server ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════╗
  ║      🚀 NEXUS API RUNNING         ║
  ║  Port    : ${PORT}                   ║
  ║  Env     : ${(process.env.NODE_ENV || 'development').padEnd(12)} ║
  ║  Health  : /health                ║
  ╚═══════════════════════════════════╝
  `)
})

export default app
