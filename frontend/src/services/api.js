// frontend/src/services/api.js
// ─────────────────────────────────────────────────────────
//  All API calls to the Nexus backend
//  Base URL read from VITE_API_URL env var (falls back to localhost)
// ─────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// ── Token helpers ─────────────────────────────────────────
export const getToken  = () => localStorage.getItem('nexus_token')
export const setToken  = (t) => localStorage.setItem('nexus_token', t)
export const clearToken = () => localStorage.removeItem('nexus_token')

// ── Core fetch wrapper ────────────────────────────────────
async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || `API error ${res.status}`)
  return data
}

const get  = (path)        => apiFetch(path)
const post = (path, body)  => apiFetch(path, { method: 'POST',   body: JSON.stringify(body) })
const patch= (path, body)  => apiFetch(path, { method: 'PATCH',  body: JSON.stringify(body) })
const del  = (path)        => apiFetch(path, { method: 'DELETE' })

// ── Auth ──────────────────────────────────────────────────
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
  getMe:    ()     => get('/auth/me').then(r => r.data),
  updateMe: (data) => patch('/auth/me', data).then(r => r.data),
  changePassword: (data) => patch('/auth/change-password', data),
}

// ── Subjects ──────────────────────────────────────────────
export const subjectsApi = {
  getAll:  ()        => get('/subjects').then(r => r.data),
  create:  (data)    => post('/subjects', data).then(r => r.data),
  update:  (id, data)=> patch(`/subjects/${id}`, data).then(r => r.data),
  delete:  (id)      => del(`/subjects/${id}`),
}

// ── Tasks ─────────────────────────────────────────────────
export const tasksApi = {
  getAll: (params = {}) => {
    const q = new URLSearchParams(params).toString()
    return get(`/tasks${q ? `?${q}` : ''}`).then(r => r.data)
  },
  getToday: () => {
    const today = new Date().toISOString().split('T')[0]
    return get(`/tasks?date=${today}`).then(r => r.data)
  },
  create: (data)    => post('/tasks', data).then(r => r.data),
  update: (id, data)=> patch(`/tasks/${id}`, data).then(r => r.data),
  toggle: (id)      => patch(`/tasks/${id}/toggle`).then(r => r.data),
  delete: (id)      => del(`/tasks/${id}`),
}

// ── Exams ─────────────────────────────────────────────────
export const examsApi = {
  getAll:  ()        => get('/exams').then(r => r.data),
  create:  (data)    => post('/exams', data).then(r => r.data),
  update:  (id, data)=> patch(`/exams/${id}`, data).then(r => r.data),
  delete:  (id)      => del(`/exams/${id}`),
}

// ── Wellness ──────────────────────────────────────────────
export const wellnessApi = {
  getMoodLogs:         (days = 7) => get(`/wellness/mood?days=${days}`).then(r => r.data),
  logMood:             (data)     => post('/wellness/mood', data).then(r => r.data),
  getJournal:          (page = 1) => get(`/wellness/journal?page=${page}`).then(r => r.data),
  createJournalEntry:  (content)  => post('/wellness/journal', { content }).then(r => r.data),
  updateJournalEntry:  (id, content) => patch(`/wellness/journal/${id}`, { content }).then(r => r.data),
  deleteJournalEntry:  (id)       => del(`/wellness/journal/${id}`),
}

// ── Analytics ─────────────────────────────────────────────
export const analyticsApi = {
  getSummary:    () => get('/analytics/summary').then(r => r.data),
  getLeaderboard:() => get('/analytics/leaderboard').then(r => r.data),
  logSession: (data) => post('/analytics/log', data).then(r => r.data),
}

// ── Social ────────────────────────────────────────────────
export const socialApi = {
  getRooms:        ()        => get('/social/rooms').then(r => r.data),
  createRoom:      (data)    => post('/social/rooms', data).then(r => r.data),
  joinRoom:        (id)      => post(`/social/rooms/${id}/join`).then(r => r.data),
  leaveRoom:       (id)      => post(`/social/rooms/${id}/leave`).then(r => r.data),
  getChallenges:   ()        => get('/social/challenges').then(r => r.data),
  createChallenge: (data)    => post('/social/challenges', data).then(r => r.data),
  updateChallenge: (id, status) => patch(`/social/challenges/${id}`, { status }).then(r => r.data),
}

// ── Life Skills ───────────────────────────────────────────
export const lifeskillsApi = {
  getProgress:    () => get('/lifeskills/progress').then(r => r.data),
  updateProgress: (data) => post('/lifeskills/progress', data).then(r => r.data),
}
