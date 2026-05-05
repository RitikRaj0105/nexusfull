// prisma/seed.js — Seeds the database with sample data
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo user
  const passwordHash = await bcrypt.hash('demo1234', 10)

  const user = await prisma.user.upsert({
    where: { email: 'alex@nexus.app' },
    update: {},
    create: {
      email: 'alex@nexus.app',
      name: 'Alex Johnson',
      passwordHash,
      grade: '11th Grade',
      targetExam: 'SAT',
      examDate: new Date('2025-08-15'),
      points: 2840,
      streak: 14,
    },
  })

  console.log('✅ Created user:', user.email)

  // Create subjects
  const subjects = await Promise.all([
    prisma.subject.upsert({
      where: { userId_name: { userId: user.id, name: 'Mathematics' } },
      update: {},
      create: {
        userId: user.id,
        name: 'Mathematics',
        weakTopics: 'Integration,Probability',
        hoursPerDay: 2,
        targetScore: 90,
        currentScore: 72,
        color: '#6366f1',
      },
    }),
    prisma.subject.upsert({
      where: { userId_name: { userId: user.id, name: 'Physics' } },
      update: {},
      create: {
        userId: user.id,
        name: 'Physics',
        weakTopics: 'Wave Optics,Thermodynamics',
        hoursPerDay: 1.5,
        targetScore: 85,
        currentScore: 55,
        color: '#8b5cf6',
      },
    }),
    prisma.subject.upsert({
      where: { userId_name: { userId: user.id, name: 'Chemistry' } },
      update: {},
      create: {
        userId: user.id,
        name: 'Chemistry',
        weakTopics: 'Organic Reactions,Isomers',
        hoursPerDay: 1.5,
        targetScore: 85,
        currentScore: 42,
        color: '#10b981',
      },
    }),
  ])

  console.log('✅ Created', subjects.length, 'subjects')

  // Create tasks
  await prisma.task.createMany({
    skipDuplicates: true,
    data: [
      { userId: user.id, subjectId: subjects[0].id, title: 'Integration by Parts', topic: 'Calculus', duration: 45, priority: 'HIGH', status: 'DONE' },
      { userId: user.id, subjectId: subjects[1].id, title: 'Wave Optics — Interference Patterns', topic: 'Optics', duration: 60, priority: 'HIGH', status: 'PENDING' },
      { userId: user.id, subjectId: subjects[2].id, title: 'Organic Chemistry Reactions', topic: 'Organic', duration: 30, priority: 'MEDIUM', status: 'PENDING' },
    ],
  })

  console.log('✅ Created tasks')

  // Create exams
  await prisma.exam.createMany({
    skipDuplicates: true,
    data: [
      { userId: user.id, subjectId: subjects[0].id, title: 'Mathematics Unit Test', examType: 'Unit Test', examDate: new Date('2025-05-18'), readiness: 72, targetScore: 90 },
      { userId: user.id, subjectId: subjects[1].id, title: 'Physics Mid-Term', examType: 'Mid-Term', examDate: new Date('2025-05-22'), readiness: 55, targetScore: 85 },
      { userId: user.id, title: 'SAT', examType: 'National Exam', examDate: new Date('2025-08-15'), readiness: 40, targetScore: 1450 },
    ],
  })

  console.log('✅ Created exams')

  // Create mood logs
  const days = 7
  for (let i = days; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    await prisma.moodLog.create({
      data: {
        userId: user.id,
        mood: Math.floor(Math.random() * 4) + 3,
        stressLevel: Math.floor(Math.random() * 5) + 3,
        energyLevel: Math.floor(Math.random() * 5) + 4,
        loggedAt: d,
      },
    })
  }

  console.log('✅ Created mood logs')

  // Create study room
  await prisma.studyRoom.create({
    data: {
      name: 'SAT Verbal Warriors',
      topic: 'Reading Comprehension',
      maxMembers: 8,
      isActive: true,
      createdById: user.id,
      members: { create: { userId: user.id } },
    },
  })

  console.log('✅ Created study room')
  console.log('\n🎉 Seed complete! Login with: alex@nexus.app / demo1234')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
