// src/routes/exams.routes.js
import { Router } from 'express'
import { body } from 'express-validator'
import { getExams, createExam, updateExam, deleteExam } from '../controllers/exams.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
router.use(authenticate)

router.get('/', getExams)
router.post('/', [body('title').notEmpty(), body('examDate').isISO8601()], validate, createExam)
router.patch('/:id', updateExam)
router.delete('/:id', deleteExam)

export default router
