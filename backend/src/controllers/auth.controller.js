// src/controllers/auth.controller.js
import bcrypt from 'bcryptjs'
import prisma from '../utils/prisma.js'
import { signToken } from '../utils/jwt.js'
import { ok, created, badRequest, unauthorized, error } from '../utils/response.js'

// POST /api/auth/register
export const register = async (req, res, next) => {
  try {
    const { email, name, password, grade, targetExam } = req.body

    // Check existing user
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return badRequest(res, 'Email already registered')

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { email, name, passwordHash, grade, targetExam },
      select: { id: true, email: true, name: true, grade: true, points: true, streak: true },
    })

    const token = signToken({ userId: user.id })
    return created(res, { user, token }, 'Account created successfully')
  } catch (err) {
    next(err)
  }
}

// POST /api/auth/login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return unauthorized(res, 'Invalid email or password')

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) return unauthorized(res, 'Invalid email or password')

    // Update last active
    await prisma.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() },
    })

    const token = signToken({ userId: user.id })
    const { passwordHash, ...safeUser } = user

    return ok(res, { user: safeUser, token }, 'Login successful')
  } catch (err) {
    next(err)
  }
}

// GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true, email: true, name: true, grade: true,
        targetExam: true, examDate: true, avatarUrl: true,
        points: true, streak: true, lastActiveAt: true, createdAt: true,
        _count: {
          select: {
            subjects: true,
            tasks: true,
            exams: true,
            moodLogs: true,
          },
        },
      },
    })
    return ok(res, user)
  } catch (err) {
    next(err)
  }
}

// PATCH /api/auth/me
export const updateMe = async (req, res, next) => {
  try {
    const { name, grade, targetExam, examDate, avatarUrl } = req.body

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name && { name }),
        ...(grade && { grade }),
        ...(targetExam && { targetExam }),
        ...(examDate && { examDate: new Date(examDate) }),
        ...(avatarUrl && { avatarUrl }),
      },
      select: { id: true, email: true, name: true, grade: true, targetExam: true, examDate: true, points: true, streak: true },
    })
    return ok(res, user, 'Profile updated')
  } catch (err) {
    next(err)
  }
}

// PATCH /api/auth/change-password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await prisma.user.findUnique({ where: { id: req.user.id } })
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash)
    if (!isMatch) return badRequest(res, 'Current password is incorrect')

    const passwordHash = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({ where: { id: req.user.id }, data: { passwordHash } })

    return ok(res, null, 'Password changed successfully')
  } catch (err) {
    next(err)
  }
}
