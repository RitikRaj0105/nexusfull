// src/middleware/auth.js — JWT authentication middleware
import { verifyToken } from '../utils/jwt.js'
import { unauthorized } from '../utils/response.js'
import prisma from '../utils/prisma.js'

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
      return unauthorized(res, 'No token provided')
    }

    const token = authHeader.split(' ')[1]
    const decoded = verifyToken(token)

    // Attach user to request
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        grade: true,
        points: true,
        streak: true,
        targetExam: true,
        examDate: true,
        avatarUrl: true,
      },
    })

    if (!user) return unauthorized(res, 'User not found')

    req.user = user
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return unauthorized(res, 'Token expired. Please log in again.')
    }
    return unauthorized(res, 'Invalid token')
  }
}

// Optional auth — attaches user if token present, but doesn't block
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1]
      const decoded = verifyToken(token)
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
      req.user = user
    }
  } catch (_) {
    // Silently ignore
  }
  next()
}
