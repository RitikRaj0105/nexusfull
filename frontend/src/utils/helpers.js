export const getReadinessColor = (score) => {
  if (score >= 75) return 'from-emerald-400 to-teal-500'
  if (score >= 50) return 'from-amber-400 to-orange-400'
  return 'from-rose-400 to-red-500'
}

export const getReadinessText = (score) => {
  if (score >= 75) return 'On Track'
  if (score >= 50) return 'Needs Focus'
  return 'At Risk'
}

export const getDaysUntil = (dateStr) => {
  const today = new Date()
  const target = new Date(dateStr)
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
  return diff
}

export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high': return 'bg-rose-100 text-rose-700'
    case 'medium': return 'bg-amber-100 text-amber-700'
    case 'low': return 'bg-slate-100 text-slate-600'
    default: return 'bg-slate-100 text-slate-600'
  }
}

export const getSubjectColor = (subject) => {
  const colors = {
    'Mathematics': 'from-indigo-400 to-blue-500',
    'Physics': 'from-violet-400 to-purple-500',
    'Chemistry': 'from-emerald-400 to-teal-500',
    'English': 'from-rose-400 to-pink-500',
    'History': 'from-amber-400 to-orange-500',
    'Biology': 'from-lime-400 to-green-500',
    'SAT': 'from-cyan-400 to-blue-500',
  }
  return colors[subject] || 'from-indigo-400 to-violet-500'
}

export const getMoodEmoji = (score) => {
  const moods = ['😔', '😕', '😐', '🙂', '😊', '😄', '🤩']
  return moods[Math.min(Math.floor(score) - 1, 6)]
}
