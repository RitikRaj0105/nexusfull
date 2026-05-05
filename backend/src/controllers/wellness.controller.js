// src/controllers/wellness.controller.js
import prisma from '../utils/prisma.js'
import { ok, created, notFound } from '../utils/response.js'

// ── MOOD LOGS ──────────────────────────────────────────

// GET /api/wellness/mood?days=7
export const getMoodLogs = async (req, res, next) => {
  try {
    const days = parseInt(req.query.days) || 7
    const since = new Date()
    since.setDate(since.getDate() - days)

    const logs = await prisma.moodLog.findMany({
      where: { userId: req.user.id, loggedAt: { gte: since } },
      orderBy: { loggedAt: 'asc' },
    })

    // Group by day for chart data
    const grouped = logs.reduce((acc, log) => {
      const day = log.loggedAt.toISOString().split('T')[0]
      if (!acc[day]) acc[day] = { day, mood: [], stress: [], energy: [] }
      acc[day].mood.push(log.mood)
      acc[day].stress.push(log.stressLevel)
      if (log.energyLevel) acc[day].energy.push(log.energyLevel)
      return acc
    }, {})

    const avg = arr => arr.length ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : null

    const chartData = Object.values(grouped).map(d => ({
      day: new Date(d.day).toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.day,
      mood: avg(d.mood),
      stress: avg(d.stress),
      energy: avg(d.energy),
    }))

    return ok(res, { logs, chartData })
  } catch (err) {
    next(err)
  }
}

// POST /api/wellness/mood
export const logMood = async (req, res, next) => {
  try {
    const { mood, stressLevel, energyLevel, note } = req.body

    const log = await prisma.moodLog.create({
      data: {
        userId: req.user.id,
        mood,
        stressLevel,
        energyLevel: energyLevel || null,
        note,
      },
    })

    // Award XP for check-in
    await prisma.user.update({
      where: { id: req.user.id },
      data: { points: { increment: 10 } },
    })

    return created(res, log, 'Mood logged +10 XP')
  } catch (err) {
    next(err)
  }
}

// ── JOURNAL ────────────────────────────────────────────

// GET /api/wellness/journal
export const getJournalEntries = async (req, res, next) => {
  try {
    const { limit = 10, page = 1 } = req.query
    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [entries, total] = await Promise.all([
      prisma.journalEntry.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        skip,
      }),
      prisma.journalEntry.count({ where: { userId: req.user.id } }),
    ])

    return ok(res, { entries, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) })
  } catch (err) {
    next(err)
  }
}

// POST /api/wellness/journal
export const createJournalEntry = async (req, res, next) => {
  try {
    const { content } = req.body
    const wordCount = content.trim().split(/\s+/).length

    const entry = await prisma.journalEntry.create({
      data: { userId: req.user.id, content, wordCount },
    })

    await prisma.user.update({
      where: { id: req.user.id },
      data: { points: { increment: 15 } },
    })

    return created(res, entry, 'Journal entry saved +15 XP')
  } catch (err) {
    next(err)
  }
}

// PATCH /api/wellness/journal/:id
export const updateJournalEntry = async (req, res, next) => {
  try {
    const { id } = req.params
    const existing = await prisma.journalEntry.findFirst({ where: { id, userId: req.user.id } })
    if (!existing) return notFound(res, 'Entry not found')

    const { content } = req.body
    const entry = await prisma.journalEntry.update({
      where: { id },
      data: { content, wordCount: content.trim().split(/\s+/).length },
    })
    return ok(res, entry, 'Entry updated')
  } catch (err) {
    next(err)
  }
}

// DELETE /api/wellness/journal/:id
export const deleteJournalEntry = async (req, res, next) => {
  try {
    const { id } = req.params
    const existing = await prisma.journalEntry.findFirst({ where: { id, userId: req.user.id } })
    if (!existing) return notFound(res, 'Entry not found')

    await prisma.journalEntry.delete({ where: { id } })
    return ok(res, null, 'Entry deleted')
  } catch (err) {
    next(err)
  }
}
