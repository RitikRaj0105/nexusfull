import React, { useState } from 'react'
import { Lightbulb, Play, CheckCircle, Lock, Clock, ChevronRight } from 'lucide-react'
import { lifeSkillsLessons } from '../data/mockData'
import { ProgressBar } from '../components/ui'

const categories = ['All', 'Finance', 'Communication', 'Critical Thinking', 'Productivity', 'Mindset']

const allLessons = [
  ...lifeSkillsLessons,
  { id: 6, title: 'Networking for Students', category: 'Communication', duration: '5 min', icon: '🤝', progress: 0, description: 'Build genuine connections that open doors.' },
  { id: 7, title: 'Managing Money as a Teen', category: 'Finance', duration: '5 min', icon: '💳', progress: 0, description: 'Credit cards, saving, and compound interest basics.' },
  { id: 8, title: 'The Pomodoro Method', category: 'Productivity', duration: '5 min', icon: '🍅', progress: 0, description: 'Work in focused bursts, rest strategically.' },
]

export default function LifeSkillsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeLesson, setActiveLesson] = useState(null)
  const [lessonProgress, setLessonProgress] = useState(0)

  const filtered = activeCategory === 'All' ? allLessons : allLessons.filter(l => l.category === activeCategory)

  const startLesson = (lesson) => {
    setActiveLesson(lesson)
    setLessonProgress(0)
    const interval = setInterval(() => {
      setLessonProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100 }
        return p + 5
      })
    }, 150)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-900">Life Skills</h1>
        <p className="text-slate-500 mt-1">5-minute lessons that prepare you for the real world</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Completed', value: '1', icon: '✅' },
          { label: 'In Progress', value: '1', icon: '⚡' },
          { label: 'Streak', value: '14d', icon: '🔥' },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-bold text-lg text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active Lesson */}
      {activeLesson && (
        <div className="card p-5 mb-5 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-slate-800">📖 Now Learning</h3>
            <button onClick={() => setActiveLesson(null)} className="text-xs text-slate-400 hover:text-slate-600">✕ Close</button>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="text-3xl">{activeLesson.icon}</div>
            <div>
              <p className="font-semibold text-slate-800">{activeLesson.title}</p>
              <p className="text-sm text-slate-500">{activeLesson.category} · {activeLesson.duration}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 mb-4 border border-amber-100">
            <p className="text-sm text-slate-700 leading-relaxed">
              {activeLesson.description} Learning this skill will help you navigate real-world challenges
              with confidence. Practice the core principles daily and build lasting habits that compound over time.
            </p>
          </div>

          <div className="mb-2">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>Lesson Progress</span>
              <span>{lessonProgress}%</span>
            </div>
            <ProgressBar value={lessonProgress} gradient="from-amber-400 to-orange-500" />
          </div>

          {lessonProgress === 100 && (
            <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mt-2">
              <CheckCircle size={16} /> Lesson Complete! +50 XP earned 🎉
            </div>
          )}
        </div>
      )}

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-5">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
              activeCategory === cat
                ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                : 'bg-white text-slate-500 border border-slate-200 hover:border-amber-300'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.map((lesson) => (
          <div key={lesson.id}
            className={`card p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${
              lesson.progress === 100 ? 'opacity-75' : ''
            }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{lesson.icon}</div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{lesson.title}</p>
                  <p className="text-xs text-slate-400">{lesson.category}</p>
                </div>
              </div>
              {lesson.progress === 100 && <CheckCircle size={18} className="text-emerald-500 flex-shrink-0" />}
            </div>

            <p className="text-xs text-slate-500 mb-3 leading-relaxed">{lesson.description}</p>

            <div className="mb-3">
              <ProgressBar value={lesson.progress} gradient="from-amber-400 to-orange-500" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock size={12} /> {lesson.duration}
              </div>
              <button onClick={() => startLesson(lesson)}
                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                  lesson.progress === 100
                    ? 'bg-slate-100 text-slate-500'
                    : lesson.progress > 0
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    : 'bg-amber-500 text-white hover:bg-amber-600'
                }`}>
                {lesson.progress === 100 ? (
                  <><CheckCircle size={12} /> Done</>
                ) : lesson.progress > 0 ? (
                  <><Play size={12} /> Continue</>
                ) : (
                  <><Play size={12} fill="white" /> Start</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
