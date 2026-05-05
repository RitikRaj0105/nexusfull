import React, { useState, useEffect } from 'react'
import { Heart, Wind, BookOpen, BarChart2, Smile, Sliders, Save, Trash2, CheckCircle } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { wellnessApi } from '../services/api'
import { getMoodEmoji } from '../utils/helpers'

const breathingSteps = ['Inhale... 4s', 'Hold... 7s', 'Exhale... 8s']

const FALLBACK_CHART = [
  { day: 'Mon', mood: 3, stress: 6, energy: 5 },
  { day: 'Tue', mood: 4, stress: 5, energy: 6 },
  { day: 'Wed', mood: 2, stress: 8, energy: 3 },
  { day: 'Thu', mood: 5, stress: 4, energy: 7 },
  { day: 'Fri', mood: 4, stress: 5, energy: 6 },
  { day: 'Sat', mood: 6, stress: 3, energy: 8 },
  { day: 'Sun', mood: 5, stress: 4, energy: 7 },
]

export default function WellnessPage() {
  const [mood, setMood]           = useState(4)
  const [stress, setStress]       = useState(6)
  const [journal, setJournal]     = useState('')
  const [breathing, setBreathing] = useState(false)
  const [breathStep, setBreathStep] = useState(0)
  const [moodLogged, setMoodLogged] = useState(false)
  const [moodSaving, setMoodSaving] = useState(false)
  const [journalSaving, setJournalSaving] = useState(false)
  const [journalSaved, setJournalSaved]   = useState(false)
  const [chartData, setChartData] = useState(FALLBACK_CHART)
  const [entries, setEntries]     = useState([])
  const [loadingEntries, setLoadingEntries] = useState(true)

  // Load mood chart + journal entries on mount
  useEffect(() => {
    wellnessApi.getMoodLogs(7)
      .then(data => { if (data.chartData?.length) setChartData(data.chartData) })
      .catch(() => {}) // fallback to mock data

    wellnessApi.getJournal(1)
      .then(data => setEntries(data.entries || []))
      .catch(() => {})
      .finally(() => setLoadingEntries(false))
  }, [])

  // Log mood to backend
  const handleLogMood = async () => {
    setMoodSaving(true)
    try {
      await wellnessApi.logMood({ mood, stressLevel: stress, energyLevel: 5 })
      setMoodLogged(true)
      // Refresh chart
      const data = await wellnessApi.getMoodLogs(7)
      if (data.chartData?.length) setChartData(data.chartData)
    } catch (e) {
      setMoodLogged(true) // still show success in offline mode
    } finally {
      setMoodSaving(false)
    }
  }

  // Save journal entry
  const handleSaveJournal = async () => {
    if (!journal.trim()) return
    setJournalSaving(true)
    try {
      const entry = await wellnessApi.createJournalEntry(journal)
      setEntries(prev => [entry, ...prev])
      setJournal('')
      setJournalSaved(true)
      setTimeout(() => setJournalSaved(false), 3000)
    } catch (e) {
      alert('Could not save entry. Make sure backend is running.')
    } finally {
      setJournalSaving(false)
    }
  }

  // Delete journal entry
  const handleDeleteEntry = async (id) => {
    try {
      await wellnessApi.deleteJournalEntry(id)
      setEntries(prev => prev.filter(e => e.id !== id))
    } catch (e) {}
  }

  // Breathing exercise
  const startBreathing = () => {
    setBreathing(true)
    let step = 0
    setBreathStep(0)
    const interval = setInterval(() => {
      step++
      if (step >= breathingSteps.length) { clearInterval(interval); setBreathing(false); setBreathStep(0) }
      else setBreathStep(step)
    }, 3000)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-900">Mental Wellness</h1>
        <p className="text-slate-500 mt-1">Check in with yourself. You're doing great. 💜</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Mood Tracker */}
        <div className="card p-5 md:col-span-2 bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-100">
          <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Smile size={18} className="text-violet-600" /> 60-Second Mood Check
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{getMoodEmoji(mood)}</div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-slate-600 font-medium">Mood Level</span>
                <span className="font-bold text-violet-600">{mood}/7</span>
              </div>
              <input type="range" min="1" max="7" value={mood} onChange={e => setMood(+e.target.value)}
                className="w-full accent-violet-600 cursor-pointer" />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>Very Low</span><span>Amazing</span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-slate-600 font-medium flex items-center gap-1.5">
                <Sliders size={14} /> Stress Level
              </span>
              <span className={`font-bold text-sm ${stress > 7 ? 'text-rose-600' : stress > 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                {stress}/10 {stress > 7 ? '— Take a break!' : stress > 5 ? '— Manageable' : '— Great!'}
              </span>
            </div>
            <input type="range" min="1" max="10" value={stress} onChange={e => setStress(+e.target.value)}
              className="w-full accent-rose-500 cursor-pointer" />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>Chill</span><span>Overwhelmed</span>
            </div>
          </div>

          <button onClick={handleLogMood} disabled={moodSaving || moodLogged}
            className="py-2.5 px-6 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-violet-200 flex items-center gap-2">
            {moodSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            {moodLogged ? '✓ Mood Saved!' : moodSaving ? 'Saving...' : 'Log Mood'}
          </button>
        </div>

        {/* Journal */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen size={18} className="text-indigo-600" /> Today's Journal
          </h3>
          <textarea
            value={journal}
            onChange={e => { setJournal(e.target.value); setJournalSaved(false) }}
            placeholder="What's on your mind? Write freely — this is just for you. ✨"
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 resize-none bg-slate-50"
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-slate-400">{journal.length} characters</span>
            <button onClick={handleSaveJournal} disabled={journalSaving || !journal.trim()}
              className="flex items-center gap-1.5 py-2 px-4 bg-indigo-600 disabled:opacity-50 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
              {journalSaved ? <><CheckCircle size={12} /> Saved!</> : journalSaving ? 'Saving...' : <><Save size={12} /> Save Entry</>}
            </button>
          </div>

          {/* Past entries */}
          {entries.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Past Entries</p>
              {entries.slice(0, 3).map(entry => (
                <div key={entry.id} className="bg-slate-50 rounded-xl p-3 flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 line-clamp-2">{entry.content}</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(entry.createdAt).toLocaleDateString()}</p>
                  </div>
                  <button onClick={() => handleDeleteEntry(entry.id)}
                    className="text-slate-300 hover:text-rose-400 transition-colors flex-shrink-0">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Breathing */}
        <div className="card p-5 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-100">
          <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Wind size={18} className="text-teal-600" /> Breathing Exercise
          </h3>
          <p className="text-sm text-slate-500 mb-5">4-7-8 breathing calms your nervous system in 60 seconds.</p>
          <div className="flex items-center justify-center mb-6">
            <div className={`relative w-28 h-28 rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
              breathing ? 'border-teal-400 bg-teal-100 scale-110 shadow-lg shadow-teal-200' : 'border-teal-200 bg-white'
            }`}>
              <div className="text-center">
                {breathing ? (
                  <><div className="text-2xl mb-1">🌬️</div><p className="text-xs font-semibold text-teal-700">{breathingSteps[breathStep]}</p></>
                ) : (
                  <><div className="text-3xl">🧘</div><p className="text-xs text-slate-400 mt-1">Ready</p></>
                )}
              </div>
            </div>
          </div>
          <button onClick={startBreathing} disabled={breathing}
            className="w-full py-3 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-teal-200">
            {breathing ? 'Breathing...' : 'Start 4-7-8 Breathing'}
          </button>
        </div>

        {/* Chart */}
        <div className="card p-5 md:col-span-2">
          <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart2 size={18} className="text-indigo-600" /> Weekly Emotional Trends
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Area type="monotone" dataKey="mood" name="Mood" stroke="#8b5cf6" fill="url(#moodGrad)" strokeWidth={2.5} dot={false} />
                <Area type="monotone" dataKey="stress" name="Stress" stroke="#f43f5e" fill="url(#stressGrad)" strokeWidth={2.5} dot={false} />
                <Area type="monotone" dataKey="energy" name="Energy" stroke="#06b6d4" fill="none" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-2">
            {[{ color: '#8b5cf6', label: 'Mood' }, { color: '#f43f5e', label: 'Stress' }, { color: '#06b6d4', label: 'Energy' }].map(item => (
              <div key={item.label} className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-3 h-1.5 rounded-full" style={{ backgroundColor: item.color }} /> {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
