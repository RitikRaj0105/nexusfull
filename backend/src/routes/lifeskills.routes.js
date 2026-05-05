// src/routes/lifeskills.routes.js
import { Router } from 'express'
import { body } from 'express-validator'
import { getProgress, upsertProgress } from '../controllers/lifeskills.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
router.use(authenticate)

router.get('/progress', getProgress)
router.post('/progress',
  [
    body('lessonId').notEmpty(),
    body('lessonTitle').notEmpty(),
    body('category').notEmpty(),
    body('progress').isInt({ min: 0, max: 100 }),
  ],
  validate,
  upsertProgress
)

export default router
