// src/controllers/social.controller.js
import prisma from '../utils/prisma.js'
import { ok, created, notFound, badRequest } from '../utils/response.js'

// ── STUDY ROOMS ────────────────────────────────────────

// GET /api/social/rooms
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await prisma.studyRoom.findMany({
      where: { isActive: true },
      include: {
        members: {
          where: { leftAt: null },
          include: { user: { select: { id: true, name: true } } },
        },
        _count: { select: { members: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return ok(res, rooms)
  } catch (err) {
    next(err)
  }
}

// POST /api/social/rooms
export const createRoom = async (req, res, next) => {
  try {
    const { name, topic, maxMembers } = req.body

    const room = await prisma.studyRoom.create({
      data: {
        name,
        topic,
        maxMembers: maxMembers || 10,
        createdById: req.user.id,
        members: { create: { userId: req.user.id } },
      },
      include: { _count: { select: { members: true } } },
    })
    return created(res, room, 'Study room created')
  } catch (err) {
    next(err)
  }
}

// POST /api/social/rooms/:id/join
export const joinRoom = async (req, res, next) => {
  try {
    const { id } = req.params
    const room = await prisma.studyRoom.findUnique({
      where: { id },
      include: { members: { where: { leftAt: null } } },
    })
    if (!room) return notFound(res, 'Room not found')
    if (room.members.length >= room.maxMembers) return badRequest(res, 'Room is full')

    const existing = await prisma.studyRoomMember.findUnique({
      where: { userId_roomId: { userId: req.user.id, roomId: id } },
    })

    if (existing) {
      await prisma.studyRoomMember.update({ where: { id: existing.id }, data: { leftAt: null } })
    } else {
      await prisma.studyRoomMember.create({ data: { userId: req.user.id, roomId: id } })
    }

    return ok(res, null, 'Joined room')
  } catch (err) {
    next(err)
  }
}

// POST /api/social/rooms/:id/leave
export const leaveRoom = async (req, res, next) => {
  try {
    const { id } = req.params
    await prisma.studyRoomMember.updateMany({
      where: { userId: req.user.id, roomId: id, leftAt: null },
      data: { leftAt: new Date() },
    })
    return ok(res, null, 'Left room')
  } catch (err) {
    next(err)
  }
}

// ── CHALLENGES ─────────────────────────────────────────

// GET /api/social/challenges
export const getChallenges = async (req, res, next) => {
  try {
    const challenges = await prisma.challenge.findMany({
      where: {
        OR: [{ fromUserId: req.user.id }, { toUserId: req.user.id }],
      },
      include: {
        fromUser: { select: { id: true, name: true } },
        toUser: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    })
    return ok(res, challenges)
  } catch (err) {
    next(err)
  }
}

// POST /api/social/challenges
export const createChallenge = async (req, res, next) => {
  try {
    const { toUserId, title, description, goal, expiresAt } = req.body

    if (toUserId === req.user.id) return badRequest(res, 'Cannot challenge yourself')

    const toUser = await prisma.user.findUnique({ where: { id: toUserId } })
    if (!toUser) return notFound(res, 'User not found')

    const challenge = await prisma.challenge.create({
      data: {
        fromUserId: req.user.id,
        toUserId,
        title,
        description,
        goal,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      include: {
        fromUser: { select: { id: true, name: true } },
        toUser: { select: { id: true, name: true } },
      },
    })
    return created(res, challenge, 'Challenge sent!')
  } catch (err) {
    next(err)
  }
}

// PATCH /api/social/challenges/:id — accept/decline/complete
export const updateChallenge = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const existing = await prisma.challenge.findFirst({
      where: { id, OR: [{ fromUserId: req.user.id }, { toUserId: req.user.id }] },
    })
    if (!existing) return notFound(res, 'Challenge not found')

    const challenge = await prisma.challenge.update({
      where: { id },
      data: { status },
    })
    return ok(res, challenge, `Challenge ${status.toLowerCase()}`)
  } catch (err) {
    next(err)
  }
}
