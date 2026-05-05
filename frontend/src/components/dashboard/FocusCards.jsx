import React from 'react'
import { Brain, Play, ChevronRight, Compass, TrendingUp, Zap } from 'lucide-react'
import { careerSuggestions } from '../../data/mockData'

export function AIFocusSession({ onNavigate }) {
  return (
    <div className="card p-5 bg-gradient-to-br from-indigo-50 to-cyan-50 border-indigo-100">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <Brain size={16} className="text-white" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-slate-800 text-sm">AI Focus Session</h3>
          <p className="text-xs text-slate-400">Recommended for you</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-3 mb-3 border border-indigo-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full bg-rose-400" />
          <span className="text-xs font-semibold text-slate-600">Needs Attention</span>
        </div>
        <p className="text-sm font-semibold text-slate-800">Wave Optics — Interference</p>
        <p className="text-xs text-slate-400 mt-0.5">45 min deep session · Physics</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
        <Zap size={13} className="text-amber-500" />
        <span>Your performance drops 23% in this topic. Let's fix it.</span>
      </div>

      <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200">
        <Play size={15} fill="white" />
        Start Focus Session
      </button>
    </div>
  )
}

export function CareerInsightCard({ onNavigate }) {
  const top = careerSuggestions[0]

  return (
    <div className="card p-5 bg-gradient-to-br from-cyan-50 to-teal-50 border-cyan-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-semibold text-slate-800 flex items-center gap-2">
          <Compass size={16} className="text-cyan-600" />
          Career Insight
        </h3>
        <button onClick={() => onNavigate('career')}
          className="text-xs text-cyan-600 font-semibold flex items-center gap-1">
          Explore <ChevronRight size={14} />
        </button>
      </div>

      <div className="bg-white rounded-xl p-3 border border-cyan-100">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl mb-1">{top.icon}</div>
            <p className="font-semibold text-slate-800 text-sm">{top.title}</p>
            <p className="text-xs text-slate-400 mt-0.5">{top.salary}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold font-heading text-cyan-600">{top.match}%</div>
            <div className="text-xs text-slate-400">match</div>
            <div className="flex items-center gap-1 mt-1 justify-end">
              <TrendingUp size={12} className="text-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">{top.growth}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {top.skills.map(skill => (
            <span key={skill} className="text-xs bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-full font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-2">Based on your strengths in Math & Physics</p>
    </div>
  )
}
