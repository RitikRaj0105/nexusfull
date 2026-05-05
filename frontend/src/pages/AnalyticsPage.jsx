import React from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { progressData, weeklyMoodData } from '../data/mockData'
import { TrendingUp, Clock, Target, BookOpen } from 'lucide-react'

export default function AnalyticsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-900">Progress Analytics</h1>
        <p className="text-slate-500 mt-1">Track your growth, spot patterns, keep improving</p>
      </div>

      {/* Stat Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Avg Daily Hours', value: '3.7h', icon: <Clock size={18} />, trend: '+0.5h', color: 'indigo' },
          { label: 'Sessions Done', value: '86', icon: <BookOpen size={18} />, trend: '+12', color: 'violet' },
          { label: 'Target Progress', value: '78%', icon: <Target size={18} />, trend: '+8%', color: 'cyan' },
          { label: 'XP Earned', value: '2,840', icon: <TrendingUp size={18} />, trend: '+340', color: 'amber' },
        ].map(s => (
          <div key={s.label} className="card p-4">
            <div className={`text-${s.color}-600 mb-2`}>{s.icon}</div>
            <div className="font-bold text-xl text-slate-900">{s.value}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">{s.trend} this week</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Weekly Study Hours */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-slate-800 mb-4">Study Hours by Week</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Bar dataKey="hours" name="Hours" fill="url(#barGrad)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Trend */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-slate-800 mb-4">Performance Score Trend</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Line type="monotone" dataKey="score" name="Score" stroke="#06b6d4" strokeWidth={3} dot={{ fill: '#06b6d4', r: 5, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Breakdown */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-slate-800 mb-4">Subject Readiness</h3>
          <div className="space-y-3">
            {[
              { subject: 'Mathematics', score: 72, color: 'from-indigo-500 to-blue-500' },
              { subject: 'Physics', score: 55, color: 'from-violet-500 to-purple-500' },
              { subject: 'Chemistry', score: 42, color: 'from-emerald-500 to-teal-500' },
              { subject: 'English', score: 85, color: 'from-rose-500 to-pink-500' },
            ].map(s => (
              <div key={s.subject}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-700 font-medium">{s.subject}</span>
                  <span className="font-semibold text-slate-800">{s.score}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${s.color} transition-all duration-700`}
                    style={{ width: `${s.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mood vs Performance */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-slate-800 mb-4">Mood vs Energy This Week</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyMoodData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }} />
                <Bar dataKey="mood" name="Mood" fill="#8b5cf6" radius={[4, 4, 0, 0]} opacity={0.8} />
                <Bar dataKey="energy" name="Energy" fill="#06b6d4" radius={[4, 4, 0, 0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
