import React from 'react'
import { Calendar, ChevronRight, AlertTriangle } from 'lucide-react'
import { upcomingExams } from '../../data/mockData'
import { getReadinessColor, getReadinessText, getSubjectColor } from '../../utils/helpers'
import { ProgressBar } from '../ui'

export default function UpcomingExams({ onNavigate }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-slate-800">Upcoming Exams</h3>
          <p className="text-xs text-slate-400 mt-0.5">{upcomingExams.length} scheduled</p>
        </div>
        <button onClick={() => onNavigate('planner')} className="text-xs text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
          Planner <ChevronRight size={14} />
        </button>
      </div>

      <div className="space-y-3">
        {upcomingExams.map((exam) => (
          <div key={exam.id} className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/60 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${getSubjectColor(exam.subject)}`} />
                <span className="text-sm font-semibold text-slate-800">{exam.subject}</span>
                <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded-full">{exam.type}</span>
              </div>
              <div className={`flex items-center gap-1 ${exam.daysLeft <= 20 ? 'text-rose-500' : 'text-slate-500'}`}>
                {exam.daysLeft <= 20 && <AlertTriangle size={12} />}
                <span className="text-xs font-bold">{exam.daysLeft}d</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-slate-500">Readiness</span>
              <span className={`text-xs font-semibold ${
                exam.readiness >= 75 ? 'text-emerald-600' :
                exam.readiness >= 50 ? 'text-amber-600' : 'text-rose-600'
              }`}>
                {exam.readiness}% · {getReadinessText(exam.readiness)}
              </span>
            </div>

            <ProgressBar
              value={exam.readiness}
              gradient={getReadinessColor(exam.readiness)}
              height="h-1.5"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
