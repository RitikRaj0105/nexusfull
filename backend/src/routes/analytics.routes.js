// src/routes/analytics.routes.js
import { Router } from 'express'
import { getSummary, logStudySession, getLeaderboard } from '../controllers/analytics.controller.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()
router.use(authenticate)

router.get('/summary', getSummary)
router.get('/leaderboard', getLeaderboard)
router.post('/log', logStudySession)

export default router
