// src/routes/subjects.routes.js
import { Router } from 'express'
import { body } from 'express-validator'
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../controllers/subjects.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
router.use(authenticate)

router.get('/', getSubjects)
router.post('/', [body('name').trim().notEmpty()], validate, createSubject)
router.patch('/:id', updateSubject)
router.delete('/:id', deleteSubject)

export default router
