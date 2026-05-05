// frontend-integration/api.js
// ─────────────────────────────────────────────────────────
//  Drop this file into nexus/src/services/api.js
//  Replace mockData imports in pages with these API calls
// ─────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── Token Management ──────────────────────────────────────
const getToken = () => localStorage.getItem('nexus_token')
const setToken = (t) => localStorage.setItem('nexus_token', t)
const clearToken = () => localStorage.removeItem('nexus_token')

// ── Base Fetch ────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'API error')
  }

  return data
}

const get = (path) => apiFetch(path)
const post = (path, body) => apiFetch(path, { method: 'POST', body: JSON.stringify(body) })
const patch = (path, body) => apiFetch(path, { method: 'PATCH', body: JSON.stringify(body) })
const del = (path) => apiFetch(path, { method: 'DELETE' })

// ── Auth API ──────────────────────────────────────────────
export const authApi = {
  register: async (data) => {
    const res = await post('/auth/register', data)
    setToken(res.data.token)
    return res.data
  },
  login: async (data) => {
    const res = await post('/auth/login', data)
    setToken(res.data.token)
    return res.data
  },
  logout: () => clearToken(),
  getMe: () => get('/auth/me').then(r => r.data),
  updateMe: (data) => patch('/auth/me', data).then(r => r.data),
  changePassword: (data) => patch('/auth/change-password', data),
}

// ── Subjects API ──────────────────────────────────────────
export const subjectsApi = {
  getAll: () => get('/subjects').then(r => r.data),
  create: (data) => post('/subjects', data).then(r => r.data),
  update: (id, data) => patch(`/subjects/${id}`, data).then(r => r.data),
  delete: (id) => del(`/subjects/${id}`),
}

// ── Tasks API ─────────────────────────────────────────────
export const tasksApi = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return get(`/tasks${q ? `?${q}` : ''}`).then(r => r.data)
  },
  getToday: () => {
    const today = new Date().toISOString().split('T')[0]
    return get(`/tasks?date=${today}`).then(r => r.data)
  },
  create: (data) => post('/tasks', data).then(r => r.data),
  update: (id, data) => patch(`/tasks/${id}`, data).then(r => r.data),
  toggle: (id) => patch(`/tasks/${id}/toggle`).then(r => r.data),
  delete: (id) => del(`/tasks/${id}`),
}

// ── Exams API ─────────────────────────────────────────────
export const examsApi = {
  getAll: () => get('/exams').then(r => r.data),
  create: (data) => post('/exams', data).then(r => r.data),
  update: (id, data) => patch(`/exams/${id}`, data).then(r => r.data),
  delete: (id) => del(`/exams/${id}`),
}

// ── Wellness API ──────────────────────────────────────────
export const wellnessApi = {
  getMoodLogs: (days = 7) => get(`/wellness/mood?days=${days}`).then(r => r.data),
  logMood: (data) => post('/wellness/mood', data).then(r => r.data),
  getJournal: (page = 1) => get(`/wellness/journal?page=${page}`).then(r => r.data),
  createJournalEntry: (content) => post('/wellness/journal', { content }).then(r => r.data),
  updateJournalEntry: (id, content) => patch(`/wellness/journal/${id}`, { content }).then(r => r.data),
  deleteJournalEntry: (id) => del(`/wellness/journal/${id}`),
}

// ── Analytics API ─────────────────────────────────────────
export const analyticsApi = {
  getSummary: () => get('/analytics/summary').then(r => r.data),
  getLeaderboard: () => get('/analytics/leaderboard').then(r => r.data),
  logSession: (data) => post('/analytics/log', data).then(r => r.data),
}

// ── Social API ────────────────────────────────────────────
export const socialApi = {
  getRooms: () => get('/social/rooms').then(r => r.data),
  createRoom: (data) => post('/social/rooms', data).then(r => r.data),
  joinRoom: (id) => post(`/social/rooms/${id}/join`).then(r => r.data),
  leaveRoom: (id) => post(`/social/rooms/${id}/leave`).then(r => r.data),
  getChallenges: () => get('/social/challenges').then(r => r.data),
  createChallenge: (data) => post('/social/challenges', data).then(r => r.data),
  updateChallenge: (id, status) => patch(`/social/challenges/${id}`, { status }).then(r => r.data),
}

// ── Life Skills API ───────────────────────────────────────
export const lifeskillsApi = {
  getProgress: () => get('/lifeskills/progress').then(r => r.data),
  updateProgress: (data) => post('/lifeskills/progress', data).then(r => r.data),
}
