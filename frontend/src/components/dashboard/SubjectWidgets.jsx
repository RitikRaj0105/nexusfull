import React from 'react'
import { TrendingUp, TrendingDown, Minus, ChevronRight, Lightbulb, Play, Check } from 'lucide-react'
import { weakSubjects, lifeSkillsLessons } from '../../data/mockData'
import { ProgressBar } from '../ui'

export function WeakSubjectsTracker({ onNavigate }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-slate-800">Weak Areas</h3>
        <button onClick={() => onNavigate('planner')} className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
          View all <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {weakSubjects.map((sub) => (
          <div key={sub.subject} className="p-3 rounded-xl bg-slate-50 hover:bg-red-50/30 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">{sub.subject}</span>
              <div className="flex items-center gap-1.5">
                {sub.trend === 'improving'
                  ? <TrendingUp size={13} className="text-emerald-500" />
                  : sub.trend === 'declining'
                  ? <TrendingDown size={13} className="text-rose-500" />
                  : <Minus size={13} className="text-slate-400" />}
                <span className={`text-xs font-bold ${
                  sub.score >= 70 ? 'text-emerald-600' : sub.score >= 50 ? 'text-amber-600' : 'text-rose-600'
                }`}>{sub.score}%</span>
              </div>
            </div>
            <ProgressBar value={sub.score}
              gradient={sub.score >= 70 ? 'from-emerald-400 to-teal-500' : sub.score >= 50 ? 'from-amber-400 to-orange-400' : 'from-rose-400 to-red-500'}
              height="h-1.5"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {sub.topics.map(t => (
                <span key={t} className="text-xs bg-white text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function LifeSkillOfDay({ onNavigate }) {
  const lesson = lifeSkillsLessons.find(l => l.progress < 100) || lifeSkillsLessons[0]

  return (
    <div className="card p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-slate-800 flex items-center gap-2">
          <Lightbulb size={16} className="text-amber-500" />
          Life Skill of the Day
        </h3>
        <button onClick={() => onNavigate('lifeskills')}
          className="text-xs text-amber-600 font-semibold flex items-center gap-1">
          All lessons <ChevronRight size={14} />
        </button>
      </div>

      <div className="bg-white rounded-xl p-3 border border-amber-100 mb-3">
        <div className="flex items-start gap-3">
          <div className="text-2xl">{lesson.icon}</div>
          <div className="flex-1">
            <p className="font-semibold text-slate-800 text-sm">{lesson.title}</p>
            <p className="text-xs text-slate-400">{lesson.category} · {lesson.duration}</p>
            <p className="text-xs text-slate-500 mt-1">{lesson.description}</p>
          </div>
        </div>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors shadow-lg shadow-amber-200">
        <Play size={14} fill="white" />
        Start 5-Min Lesson
      </button>
    </div>
  )
}
