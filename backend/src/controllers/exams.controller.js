// src/controllers/exams.controller.js
import prisma from '../utils/prisma.js'
import { ok, created, notFound } from '../utils/response.js'

// GET /api/exams
export const getExams = async (req, res, next) => {
  try {
    const exams = await prisma.exam.findMany({
      where: { userId: req.user.id },
      include: { subject: { select: { name: true, color: true } } },
      orderBy: { examDate: 'asc' },
    })

    // Add daysLeft to each exam
    const today = new Date()
    const enriched = exams.map(exam => ({
      ...exam,
      daysLeft: Math.ceil((new Date(exam.examDate) - today) / (1000 * 60 * 60 * 24)),
    }))

    return ok(res, enriched)
  } catch (err) {
    next(err)
  }
}

// POST /api/exams
export const createExam = async (req, res, next) => {
  try {
    const { title, subjectId, examType, examDate, readiness, targetScore, notes } = req.body

    const exam = await prisma.exam.create({
      data: {
        userId: req.user.id,
        subjectId: subjectId || null,
        title,
        examType,
        examDate: new Date(examDate),
        readiness: readiness ?? 0,
        targetScore: targetScore ?? 80,
        notes,
      },
      include: { subject: { select: { name: true, color: true } } },
    })
    return created(res, exam, 'Exam added')
  } catch (err) {
    next(err)
  }
}

// PATCH /api/exams/:id
export const updateExam = async (req, res, next) => {
  try {
    const { id } = req.params
    const existing = await prisma.exam.findFirst({ where: { id, userId: req.user.id } })
    if (!existing) return notFound(res, 'Exam not found')

    const { title, examType, examDate, readiness, targetScore, notes } = req.body

    const exam = await prisma.exam.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(examType !== undefined && { examType }),
        ...(examDate !== undefined && { examDate: new Date(examDate) }),
        ...(readiness !== undefined && { readiness }),
        ...(targetScore !== undefined && { targetScore }),
        ...(notes !== undefined && { notes }),
      },
      include: { subject: { select: { name: true, color: true } } },
    })
    return ok(res, exam, 'Exam updated')
  } catch (err) {
    next(err)
  }
}

// DELETE /api/exams/:id
export const deleteExam = async (req, res, next) => {
  try {
    const { id } = req.params
    const existing = await prisma.exam.findFirst({ where: { id, userId: req.user.id } })
    if (!existing) return notFound(res, 'Exam not found')

    await prisma.exam.delete({ where: { id } })
    return ok(res, null, 'Exam deleted')
  } catch (err) {
    next(err)
  }
}
