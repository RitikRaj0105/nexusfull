// src/controllers/tasks.controller.js
import prisma from '../utils/prisma.js'
import { ok, created, notFound } from '../utils/response.js'

// GET /api/tasks?date=YYYY-MM-DD&status=PENDING&subjectId=xxx
export const getTasks = async (req, res, next) => {
  try {
    const { date, status, subjectId } = req.query

    const where = { userId: req.user.id }

    if (status) where.status = status
    if (subjectId) where.subjectId = subjectId
    if (date) {
      const start = new Date(date)
      start.setHours(0, 0, 0, 0)
      const end = new Date(date)
      end.setHours(23, 59, 59, 999)
      where.scheduledFor = { gte: start, lte: end }
    }

    const tasks = await prisma.task.findMany({
      where,
      include: { subject: { select: { name: true, color: true } } },
      orderBy: [{ priority: 'desc' }, { createdAt: 'asc' }],
    })

    return ok(res, tasks)
  } catch (err) {
    next(err)
  }
}

// POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const { title, topic, subjectId, duration, priority, scheduledFor } = req.body

    const task = await prisma.task.create({
      data: {
        userId: req.user.id,
        title,
        topic,
        subjectId: subjectId || null,
        duration: duration ?? 30,
        priority: priority ?? 'MEDIUM',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
      },
      include: { subject: { select: { name: true, color: true } } },
    })
    return created(res, task, 'Task created')
  } catch (err) {
    next(err)
  }
}

// PATCH /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const existing = await prisma.task.findFirst({ where: { id, userId: req.user.id } })
    if (!existing) return notFound(res, 'Task not found')

    const { title, topic, duration, priority, status, scheduledFor } = req.body
    const completedAt = status === 'DONE' ? new Date() : null

    const task = await prisma.task.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(topic !== undefined && { topic }),
        ...(duration !== undefined && { duration }),
        ...(priority !== undefined && { priority }),
        ...(status !== undefined && { status, completedAt }),
        ...(scheduledFor !== undefined && { scheduledFor: new Date(scheduledFor) }),
      },
      include: { subject: { select: { name: true, color: true } } },
    })

    // Award XP when task is done
    if (status === 'DONE' && existing.status !== 'DONE') {
      await prisma.user.update({
        where: { id: req.user.id },
        data: { points: { increment: 25 } },
      })
    }

    return ok(res, task, 'Task updated')
  } catch (err) {
    next(err)
  }
}

// PATCH /api/tasks/:id/toggle — quick done/undo
export const toggleTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const existing = await prisma.task.findFirst({ where: { id, userId: req.user.id } })
    if (!existing) return notFound(res, 'Task not found')

    const newStatus = existing.status === 'DONE' ? 'PENDING' : 'DONE'
    const task = await prisma.task.update({
      where: { id },
      data: { status: newStatus, completedAt: newStatus === 'DONE' ? new Date() : null },
    })

    // XP
    if (newStatus === 'DONE') {
      await prisma.user.update({ where: { id: req.user.id }, data: { points: { increment: 25 } } })
    } else {
      await prisma.user.update({ where: { id: req.user.id }, data: { points: { decrement: 25 } } })
    }

    return ok(res, task, `Task marked as ${newStatus}`)
  } catch (err) {
    next(err)
  }
}

// DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params
    const existing = await prisma.task.findFirst({ where: { id, userId: req.user.id } })
    if (!existing) return notFound(res, 'Task not found')

    await prisma.task.delete({ where: { id } })
    return ok(res, null, 'Task deleted')
  } catch (err) {
    next(err)
  }
}
