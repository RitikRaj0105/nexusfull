// src/routes/social.routes.js
import { Router } from 'express'
import { body } from 'express-validator'
import {
  getRooms, createRoom, joinRoom, leaveRoom,
  getChallenges, createChallenge, updateChallenge
} from '../controllers/social.controller.js'
import { authenticate } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'

const router = Router()
router.use(authenticate)

// Rooms
router.get('/rooms', getRooms)
router.post('/rooms', [body('name').trim().notEmpty()], validate, createRoom)
router.post('/rooms/:id/join', joinRoom)
router.post('/rooms/:id/leave', leaveRoom)

// Challenges
router.get('/challenges', getChallenges)
router.post('/challenges', [body('toUserId').notEmpty(), body('title').notEmpty(), body('goal').isInt({ min: 1 })], validate, createChallenge)
router.patch('/challenges/:id', updateChallenge)

export default router
