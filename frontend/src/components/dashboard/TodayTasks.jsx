import React, { useState, useEffect } from 'react'
import { CheckCircle2, Circle, Clock, ChevronRight, Plus } from 'lucide-react'
import { tasksApi } from '../../services/api'
import { studyTasks } from '../../data/mockData'
import { getPriorityColor, getSubjectColor } from '../../utils/helpers'

export default function TodayTasks({ onNavigate }) {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    tasksApi.getToday()
      .then(data => setTasks(data.length ? data : studyTasks))
      .catch(() => setTasks(studyTasks))
      .finally(() => setLoading(false))
  }, [])

  const toggleTask = async (id) => {
    // Optimistic update
    setTasks(ts => ts.map(t => t.id === id ? { ...t, status: t.status === 'DONE' ? 'PENDING' : 'DONE' } : t))
    try {
      await tasksApi.toggle(id)
    } catch (e) {
      // Revert on failure
      setTasks(ts => ts.map(t => t.id === id ? { ...t, status: t.status === 'DONE' ? 'PENDING' : 'DONE' } : t))
    }
  }

  const done  = tasks.filter(t => t.status === 'DONE' || t.done).length
  const total = tasks.length

  if (loading) return <div className="card p-5 h-32 animate-pulse bg-slate-100 rounded-2xl" />

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-semibold text-slate-800">Today's Tasks</h3>
          <p className="text-xs text-slate-400 mt-0.5">{done}/{total} completed</p>
        </div>
        <button onClick={() => onNavigate('planner')}
          className="text-xs text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
          View all <ChevronRight size={14} />
        </button>
      </div>

      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mb-4">
        <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
          style={{ width: total ? `${(done / total) * 100}%` : '0%' }} />
      </div>

      <div className="space-y-2.5">
        {tasks.map((task) => {
          const isDone = task.status === 'DONE' || task.done
          return (
            <div key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${isDone ? 'bg-slate-50 opacity-60' : 'hover:bg-indigo-50/50'}`}>
              <div className="mt-0.5 flex-shrink-0">
                {isDone ? <CheckCircle2 size={18} className="text-emerald-500" /> : <Circle size={18} className="text-slate-300" />}
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                  {task.title || task.topic}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  {task.subject && (
                    <>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getSubjectColor(task.subject?.name || task.subject)}`} />
                      <span className="text-xs text-slate-400">{task.subject?.name || task.subject}</span>
                      <span className="text-slate-200">·</span>
                    </>
                  )}
                  <Clock size={11} className="text-slate-400" />
                  <span className="text-xs text-slate-400">{task.duration}min</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${getPriorityColor((task.priority || 'MEDIUM').toLowerCase())}`}>
                    {(task.priority || 'medium').toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <button onClick={() => onNavigate('planner')}
        className="w-full mt-3 flex items-center justify-center gap-2 py-2 text-sm text-indigo-600 font-medium hover:bg-indigo-50 rounded-xl transition-colors">
        <Plus size={16} /> Add Task
      </button>
    </div>
  )
}
