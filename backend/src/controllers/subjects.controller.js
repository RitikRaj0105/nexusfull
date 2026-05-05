// src/controllers/subjects.controller.js
import prisma from '../utils/prisma.js'
import { ok, created, notFound, badRequest } from '../utils/response.js'

// GET /api/subjects
export const getSubjects = async (req, res, next) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: { userId: req.user.id },
      include: {
        _count: { select: { tasks: true, exams: true } },
      },
      orderBy: { createdAt: 'asc' },
    })
    return ok(res, subjects)
  } catch (err) {
    next(err)
  }
}

// POST /api/subjects
export const createSubject = async (req, res, next) => {
  try {
    const { name, weakTopics, hoursPerDay, targetScore, color } = req.body

    const subject = await prisma.subject.create({
      data: {
        userId: req.user.id,
        name,
        weakTopics,
        hoursPerDay: hoursPerDay ?? 1.5,
        targetScore: targetScore ?? 80,
        color,
      },
    })
    return created(res, subject, 'Subject added')
  } catch (err) {
    next(err)
  }
}

// PATCH /api/subjects/:id
export const updateSubject = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, weakTopics, hoursPerDay, targetScore, currentScore, color } = req.body

    const existing = await prisma.subject.findFirst({ where: { id, userId: req.user.id } })
    if (!existing) return notFound(res, 'Subject not found')

    const subject = await prisma.subject.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(weakTopics !== undefined && { weakTopics }),
        ...(hoursPerDay !== undefined && { hoursPerDay }),
        ...(targetScore !== undefined && { targetScore }),
        ...(currentScore !== undefined && { currentScore }),
        ...(color !== undefined && { color }),
      },
    })
    return ok(res, subject, 'Subject updated')
  } catch (err) {
    next(err)
  }
}

// DELETE /api/subjects/:id
export const deleteSubject = async (req, res, next) => {
  try {
    const { id } = req.params
    const existing = await prisma.subject.findFirst({ where: { id, userId: req.user.id } })
    if (!existing) return notFound(res, 'Subject not found')

    await prisma.subject.delete({ where: { id } })
    return ok(res, null, 'Subject deleted')
  } catch (err) {
    next(err)
  }
}
