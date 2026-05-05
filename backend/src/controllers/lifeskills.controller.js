// src/controllers/lifeskills.controller.js
import prisma from '../utils/prisma.js'
import { ok, created, notFound } from '../utils/response.js'

// GET /api/lifeskills/progress
export const getProgress = async (req, res, next) => {
  try {
    const progress = await prisma.lifeSkillProgress.findMany({
      where: { userId: req.user.id },
      orderBy: { updatedAt: 'desc' },
    })
    return ok(res, progress)
  } catch (err) {
    next(err)
  }
}

// POST /api/lifeskills/progress — start or update a lesson
export const upsertProgress = async (req, res, next) => {
  try {
    const { lessonId, lessonTitle, category, progress } = req.body

    const record = await prisma.lifeSkillProgress.upsert({
      where: { userId_lessonId: { userId: req.user.id, lessonId } },
      update: {
        progress,
        ...(progress === 100 && { completedAt: new Date() }),
      },
      create: {
        userId: req.user.id,
        lessonId,
        lessonTitle,
        category,
        progress,
        ...(progress === 100 && { completedAt: new Date() }),
      },
    })

    // XP for completing
    if (progress === 100) {
      await prisma.user.update({
        where: { id: req.user.id },
        data: { points: { increment: 50 } },
      })
    }

    return ok(res, record, progress === 100 ? 'Lesson completed! +50 XP' : 'Progress saved')
  } catch (err) {
    next(err)
  }
}
