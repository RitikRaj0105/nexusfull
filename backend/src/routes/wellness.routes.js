// src/routes/wellness.routes.js
import { Router } from 'express'
import { body } from 'express-validator'
import {
  getMoodLogs, logMood,
  getJournalEntries, createJournalEntry, updateJournalEntry, deleteJournalEntry
} from '../controllers/wellness.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
router.use(authenticate)

// Mood
router.get('/mood', getMoodLogs)
router.post('/mood',
  [
    body('mood').isInt({ min: 1, max: 7 }),
    body('stressLevel').isInt({ min: 1, max: 10 }),
  ],
  validate,
  logMood
)

// Journal
router.get('/journal', getJournalEntries)
router.post('/journal', [body('content').trim().notEmpty()], validate, createJournalEntry)
router.patch('/journal/:id', updateJournalEntry)
router.delete('/journal/:id', deleteJournalEntry)

export default router
