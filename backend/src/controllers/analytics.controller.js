// src/controllers/analytics.controller.js
import prisma from '../utils/prisma.js'
import { ok } from '../utils/response.js'

// GET /api/analytics/summary
export const getSummary = async (req, res, next) => {
  try {
    const userId = req.user.id
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)

    const [
      totalTasks,
      doneTasks,
      todayDone,
      weekMoodLogs,
      subjects,
      entries,
      user,
    ] = await Promise.all([
      prisma.task.count({ where: { userId } }),
      prisma.task.count({ where: { userId, status: 'DONE' } }),
      prisma.task.count({ where: { userId, status: 'DONE', completedAt: { gte: today } } }),
      prisma.moodLog.findMany({ where: { userId, loggedAt: { gte: weekAgo } } }),
      prisma.subject.findMany({ where: { userId }, select: { name: true, currentScore: true, targetScore: true, color: true } }),
      prisma.analyticsEntry.findMany({
        where: { userId, date: { gte: weekAgo } },
        orderBy: { date: 'asc' },
      }),
      prisma.user.findUnique({ where: { id: userId }, select: { points: true, streak: true } }),
    ])

    const avgMood = weekMoodLogs.length
      ? +(weekMoodLogs.reduce((a, b) => a + b.mood, 0) / weekMoodLogs.length).toFixed(1)
      : null

    const avgStress = weekMoodLogs.length
      ? +(weekMoodLogs.reduce((a, b) => a + b.stressLevel, 0) / weekMoodLogs.length).toFixed(1)
      : null

    const taskCompletionRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

    return ok(res, {
      user,
      taskCompletionRate,
      totalTasksDone: doneTasks,
      todayTasksDone: todayDone,
      avgMoodThisWeek: avgMood,
      avgStressThisWeek: avgStress,
      subjects,
      weeklyEntries: entries,
    })
  } catch (err) {
    next(err)
  }
}

// POST /api/analytics/log — log daily study session
export const logStudySession = async (req, res, next) => {
  try {
    const { studyHours, tasksCompleted, xpEarned } = req.body
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const entry = await prisma.analyticsEntry.upsert({
      where: { userId_date: { userId: req.user.id, date: today } },
      update: {
        studyHours: { increment: studyHours || 0 },
        tasksCompleted: { increment: tasksCompleted || 0 },
        xpEarned: { increment: xpEarned || 0 },
      },
      create: {
        userId: req.user.id,
        date: today,
        studyHours: studyHours || 0,
        tasksCompleted: tasksCompleted || 0,
        xpEarned: xpEarned || 0,
      },
    })

    return ok(res, entry, 'Session logged')
  } catch (err) {
    next(err)
  }
}

// GET /api/analytics/leaderboard
export const getLeaderboard = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, points: true, streak: true, grade: true },
      orderBy: { points: 'desc' },
      take: 20,
    })

    const ranked = users.map((u, i) => ({
      ...u,
      rank: i + 1,
      isMe: u.id === req.user.id,
      avatar: u.name.split(' ').map(n => n[0]).join(''),
    }))

    return ok(res, ranked)
  } catch (err) {
    next(err)
  }
}
