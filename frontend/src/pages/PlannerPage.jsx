import React, { useState } from 'react'
import { BookOpen, Plus, Trash2, Calendar, Clock, Target, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, ProgressBar, Badge } from '../components/ui'
import { getSubjectColor, getReadinessColor } from '../utils/helpers'

const defaultSubjects = [
  { id: 1, name: 'Mathematics', weak: 'Integration, Probability', hours: 2, exam: '2025-05-18', target: 90 },
  { id: 2, name: 'Physics', weak: 'Wave Optics, Thermodynamics', hours: 1.5, exam: '2025-05-22', target: 85 },
  { id: 3, name: 'Chemistry', weak: 'Organic Reactions', hours: 1.5, exam: '2025-06-05', target: 85 },
]

const weekSchedule = {
  Mon: [
    { subject: 'Mathematics', topic: 'Integration by Parts', duration: 60, type: 'Learn' },
    { subject: 'Physics', topic: 'Wave Optics Review', duration: 45, type: 'Revise' },
  ],
  Tue: [
    { subject: 'Chemistry', topic: 'Organic Mechanisms', duration: 60, type: 'Learn' },
    { subject: 'Mathematics', topic: 'Practice Problems', duration: 45, type: 'Practice' },
  ],
  Wed: [
    { subject: 'Physics', topic: 'Numerical Problems', duration: 60, type: 'Practice' },
    { subject: 'Chemistry', topic: 'Quick Review', duration: 30, type: 'Revise' },
  ],
  Thu: [
    { subject: 'Mathematics', topic: 'Mock Test', duration: 90, type: 'Test' },
  ],
  Fri: [
    { subject: 'Physics', topic: 'Conceptual Revision', duration: 60, type: 'Revise' },
    { subject: 'Chemistry', topic: 'Full Chapter Test', duration: 60, type: 'Test' },
  ],
  Sat: [
    { subject: 'All Subjects', topic: 'Weekly Mock Test', duration: 180, type: 'Test' },
  ],
  Sun: [
    { subject: 'All Subjects', topic: 'Rest & Light Review', duration: 60, type: 'Revise' },
  ],
}

const typeColors = {
  Learn: 'bg-indigo-100 text-indigo-700',
  Revise: 'bg-amber-100 text-amber-700',
  Practice: 'bg-violet-100 text-violet-700',
  Test: 'bg-rose-100 text-rose-700',
}

export default function PlannerPage() {
  const [subjects, setSubjects] = useState(defaultSubjects)
  const [generated, setGenerated] = useState(true)
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState('Mon')
  const [showForm, setShowForm] = useState(false)
  const [newSubject, setNewSubject] = useState({ name: '', weak: '', hours: 2, target: 80 })

  const generatePlan = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setGenerated(true) }, 1800)
  }

  const addSubject = () => {
    if (!newSubject.name) return
    setSubjects(s => [...s, { ...newSubject, id: Date.now() }])
    setNewSubject({ name: '', weak: '', hours: 2, target: 80 })
    setShowForm(false)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-900">Study Planner</h1>
        <p className="text-slate-500 mt-1">AI-powered personalized schedule based on your goals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Subjects Config */}
        <div className="lg:col-span-1 space-y-4">
          <div className="card p-5">
            <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen size={16} className="text-indigo-600" /> My Subjects
            </h3>

            <div className="space-y-3 mb-4">
              {subjects.map((sub) => (
                <div key={sub.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${getSubjectColor(sub.name)}`} />
                      <span className="text-sm font-semibold text-slate-800">{sub.name}</span>
                    </div>
                    <button onClick={() => setSubjects(s => s.filter(x => x.id !== sub.id))} className="text-slate-300 hover:text-rose-400 transition-colors">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="text-xs text-slate-400 ml-4">Target: {sub.target}% · {sub.hours}h/day</div>
                  {sub.weak && <div className="text-xs text-rose-500 ml-4 mt-0.5">Weak: {sub.weak}</div>}
                </div>
              ))}
            </div>

            {showForm ? (
              <div className="space-y-2 mb-3">
                <input value={newSubject.name} onChange={e => setNewSubject(s => ({ ...s, name: e.target.value }))}
                  placeholder="Subject name" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                <input value={newSubject.weak} onChange={e => setNewSubject(s => ({ ...s, weak: e.target.value }))}
                  placeholder="Weak topics (optional)" className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-xs text-slate-500">Hours/day</label>
                    <input type="number" min="0.5" max="8" step="0.5" value={newSubject.hours}
                      onChange={e => setNewSubject(s => ({ ...s, hours: parseFloat(e.target.value) }))}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-slate-500">Target %</label>
                    <input type="number" min="50" max="100" value={newSubject.target}
                      onChange={e => setNewSubject(s => ({ ...s, target: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={addSubject} className="flex-1 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">Add</button>
                  <button onClick={() => setShowForm(false)} className="flex-1 py-2 bg-slate-100 text-slate-600 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setShowForm(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 rounded-xl text-sm font-medium transition-all mb-3">
                <Plus size={16} /> Add Subject
              </button>
            )}

            <button onClick={generatePlan} disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70">
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
              ) : (
                <><Sparkles size={16} /> Generate My Plan</>
              )}
            </button>
          </div>

          {/* Stats */}
          <div className="card p-5 space-y-3">
            <h3 className="font-display font-semibold text-slate-800 text-sm">This Week</h3>
            {[
              { label: 'Study Hours', value: '22h', icon: <Clock size={14} /> },
              { label: 'Sessions', value: '18', icon: <Target size={14} /> },
              { label: 'Mock Tests', value: '3', icon: <BookOpen size={14} /> },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500 text-sm">{s.icon}{s.label}</div>
                <span className="font-bold text-slate-800 text-sm">{s.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="lg:col-span-2">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-semibold text-slate-800 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-600" /> Weekly Roadmap
              </h3>
              {generated && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">
                  <Sparkles size={12} /> AI Generated
                </span>
              )}
            </div>

            {generated ? (
              <div className="space-y-2">
                {Object.entries(weekSchedule).map(([day, sessions]) => (
                  <div key={day} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpanded(e => e === day ? null : day)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100/70 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-slate-700 text-sm w-8">{day}</span>
                        <span className="text-xs text-slate-400">{sessions.reduce((a, s) => a + s.duration, 0)} min total</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {sessions.map((s, i) => (
                            <span key={i} className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[s.type]}`}>{s.type}</span>
                          ))}
                        </div>
                        {expanded === day ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                      </div>
                    </button>

                    {expanded === day && (
                      <div className="p-3 space-y-2">
                        {sessions.map((s, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white border border-slate-100">
                            <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${getSubjectColor(s.subject)}`} />
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-slate-800">{s.topic}</p>
                              <p className="text-xs text-slate-400">{s.subject} · {s.duration} min</p>
                            </div>
                            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${typeColors[s.type]}`}>{s.type}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-5xl mb-4">📅</div>
                <p className="font-display font-semibold text-slate-700 mb-2">No plan yet</p>
                <p className="text-sm text-slate-400">Add your subjects and click Generate to create your personalized weekly roadmap</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
