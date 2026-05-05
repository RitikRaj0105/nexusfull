// src/routes/auth.routes.js
import { Router } from 'express'
import { body } from 'express-validator'
import { register, login, getMe, updateMe, changePassword } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()

// POST /api/auth/register
router.post('/register',
  [
    body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  register
)

// POST /api/auth/login
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  validate,
  login
)

// GET /api/auth/me
router.get('/me', authenticate, getMe)

// PATCH /api/auth/me
router.patch('/me', authenticate, updateMe)

// PATCH /api/auth/change-password
router.patch('/change-password',
  authenticate,
  [
    body('currentPassword').notEmpty(),
    body('newPassword').isLength({ min: 6 }),
  ],
  validate,
  changePassword
)

export default router
