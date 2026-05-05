export const motivationQuotes = [
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Education is the most powerful weapon you can use to change the world.", author: "Nelson Mandela" },
]

export const todayQuote = motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)]

export const studyTasks = [
  { id: 1, subject: 'Mathematics', topic: 'Calculus — Integration by Parts', duration: 45, done: true, priority: 'high' },
  { id: 2, subject: 'Physics', topic: 'Wave Optics — Interference Patterns', duration: 60, done: false, priority: 'high' },
  { id: 3, subject: 'Chemistry', topic: 'Organic Chemistry — Reaction Mechanisms', duration: 30, done: false, priority: 'medium' },
  { id: 4, subject: 'English', topic: 'Essay Writing Practice', duration: 45, done: false, priority: 'low' },
]

export const upcomingExams = [
  { id: 1, subject: 'Mathematics', date: '2025-05-18', daysLeft: 17, readiness: 72, type: 'Unit Test' },
  { id: 2, subject: 'Physics', date: '2025-05-22', daysLeft: 21, readiness: 55, type: 'Mid-Term' },
  { id: 3, subject: 'SAT', date: '2025-08-15', daysLeft: 106, readiness: 40, type: 'National Exam' },
]

export const weakSubjects = [
  { subject: 'Organic Chemistry', score: 42, trend: 'improving', topics: ['Reaction Mech.', 'Isomers', 'Polymers'] },
  { subject: 'Wave Optics', score: 55, trend: 'stable', topics: ['Interference', 'Diffraction'] },
  { subject: 'Probability', score: 61, trend: 'improving', topics: ['Bayes Theorem', 'Distributions'] },
]

export const weeklyMoodData = [
  { day: 'Mon', mood: 3, stress: 6, energy: 5 },
  { day: 'Tue', mood: 4, stress: 5, energy: 6 },
  { day: 'Wed', mood: 2, stress: 8, energy: 3 },
  { day: 'Thu', mood: 5, stress: 4, energy: 7 },
  { day: 'Fri', mood: 4, stress: 5, energy: 6 },
  { day: 'Sat', mood: 6, stress: 3, energy: 8 },
  { day: 'Sun', mood: 5, stress: 4, energy: 7 },
]

export const leaderboard = [
  { rank: 1, name: 'Priya Sharma', points: 4210, streak: 28, avatar: 'PS', color: 'from-amber-400 to-orange-500' },
  { rank: 2, name: 'Marcus Lee', points: 3890, streak: 21, avatar: 'ML', color: 'from-violet-400 to-purple-600' },
  { rank: 3, name: 'Sofia Chen', points: 3540, streak: 19, avatar: 'SC', color: 'from-cyan-400 to-blue-500' },
  { rank: 4, name: 'Alex Johnson', points: 2840, streak: 14, avatar: 'AJ', color: 'from-indigo-400 to-violet-500', isMe: true },
  { rank: 5, name: 'Jordan Kim', points: 2650, streak: 11, avatar: 'JK', color: 'from-rose-400 to-pink-600' },
  { rank: 6, name: 'Aisha Patel', points: 2300, streak: 8, avatar: 'AP', color: 'from-emerald-400 to-teal-500' },
]

export const careerSuggestions = [
  { title: 'Software Engineer', match: 94, salary: '$105K–$180K', growth: 'Very High', icon: '💻', skills: ['Coding', 'Problem Solving', 'Math'] },
  { title: 'Data Scientist', match: 89, salary: '$95K–$165K', growth: 'High', icon: '📊', skills: ['Statistics', 'ML', 'Python'] },
  { title: 'Biomedical Engineer', match: 82, salary: '$80K–$140K', growth: 'High', icon: '🔬', skills: ['Biology', 'Engineering', 'Research'] },
  { title: 'Product Manager', match: 76, salary: '$90K–$160K', growth: 'High', icon: '🚀', skills: ['Communication', 'Strategy', 'Tech'] },
]

export const lifeSkillsLessons = [
  { id: 1, title: 'Budgeting 101', category: 'Finance', duration: '5 min', icon: '💰', progress: 100, description: 'Learn to track income, expenses and save smarter.' },
  { id: 2, title: 'Active Listening', category: 'Communication', duration: '5 min', icon: '👂', progress: 60, description: 'Master the art of truly hearing what others say.' },
  { id: 3, title: 'First Principles Thinking', category: 'Critical Thinking', duration: '5 min', icon: '🧠', progress: 0, description: 'Break complex problems into fundamental truths.' },
  { id: 4, title: 'Deep Work Mastery', category: 'Productivity', duration: '5 min', icon: '⚡', progress: 0, description: 'Build the ability to focus without distraction.' },
  { id: 5, title: 'Building Confidence Daily', category: 'Mindset', duration: '5 min', icon: '✨', progress: 0, description: 'Small daily habits that build unshakeable confidence.' },
]

export const studyRooms = [
  { id: 1, name: 'JEE Advanced Grind', members: 8, topic: 'Physics Problem Solving', active: true, maxMembers: 10 },
  { id: 2, name: 'SAT Verbal Warriors', members: 5, topic: 'Reading Comprehension', active: true, maxMembers: 8 },
  { id: 3, name: 'Chemistry Cram Session', members: 12, topic: 'Organic Reactions', active: true, maxMembers: 15 },
  { id: 4, name: 'Math Marathon', members: 3, topic: 'Calculus Deep Dive', active: false, maxMembers: 6 },
]

export const progressData = [
  { week: 'W1', hours: 12, score: 65 },
  { week: 'W2', hours: 18, score: 70 },
  { week: 'W3', hours: 15, score: 68 },
  { week: 'W4', hours: 22, score: 78 },
  { week: 'W5', hours: 20, score: 82 },
  { week: 'W6', hours: 25, score: 88 },
]

export const faqs = [
  { q: 'Is Nexus free to use?', a: 'Yes! Nexus offers a generous free tier with core features. Upgrade to Pro for unlimited AI sessions, advanced analytics, and premium career tools.' },
  { q: 'How does the AI study planner work?', a: 'You input your subjects, exam dates, weak areas, and daily availability. Our AI generates a personalized daily schedule, weekly roadmap, and adaptive revision strategy.' },
  { q: 'Can I use Nexus on my phone?', a: 'Absolutely. Nexus is fully responsive and works beautifully on all devices — phone, tablet, or desktop.' },
  { q: 'Is my data private and secure?', a: 'Yes. We take privacy seriously. Your study data, mood logs, and journal entries are encrypted and never shared with third parties.' },
  { q: 'How are career suggestions generated?', a: 'Our AI analyzes your strengths quiz, interests test, and academic performance to match you with careers where you\'re most likely to thrive and find fulfillment.' },
]

export const pricingPlans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect to get started',
    features: ['Study planner (3 subjects)', 'Mood check-in', 'Daily life skill', 'Basic leaderboard', '5 AI sessions/month'],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: 9,
    period: 'month',
    description: 'For serious students',
    features: ['Unlimited subjects', 'Full AI study planner', 'Career compass', 'Unlimited AI sessions', 'Weekly analytics', 'Private study rooms', 'Priority support'],
    cta: 'Start 7-Day Trial',
    popular: true,
  },
  {
    name: 'Team',
    price: 6,
    period: 'student/month',
    description: 'For schools & groups',
    features: ['Everything in Pro', 'Admin dashboard', 'Class analytics', 'Bulk onboarding', 'Custom branding', 'Dedicated support'],
    cta: 'Contact Sales',
    popular: false,
  },
]

export const testimonials = [
  { name: 'Priya Sharma', grade: '12th Grade, Delhi', text: 'Nexus changed how I study. I went from 68% to 91% in Physics in just 6 weeks. The AI planner is insane.', avatar: 'PS', rating: 5, color: 'from-amber-400 to-orange-500' },
  { name: 'Rahul Verma', grade: '11th Grade, Mumbai', text: 'The mood check-in actually helped me realize I was burning out before exams. It\'s like having a therapist + tutor in one.', avatar: 'RV', rating: 5, color: 'from-violet-400 to-purple-600' },
  { name: 'Emma Thompson', grade: 'Grade 10, London', text: 'My streak is at 23 days. I genuinely look forward to opening Nexus every morning. Never felt that about studying before!', avatar: 'ET', rating: 5, color: 'from-rose-400 to-pink-500' },
]
