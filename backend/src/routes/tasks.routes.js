// src/routes/tasks.routes.js
import { Router } from 'express'
import { body } from 'express-validator'
import { getTasks, createTask, updateTask, toggleTask, deleteTask } from '../controllers/tasks.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
router.use(authenticate)

router.get('/', getTasks)
router.post('/', [body('title').trim().notEmpty()], validate, createTask)
router.patch('/:id', updateTask)
router.patch('/:id/toggle', toggleTask)
router.delete('/:id', deleteTask)

export default router
