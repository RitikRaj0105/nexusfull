import React from 'react'
import { Flame, Star, TrendingUp, Quote } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { todayQuote } from '../../data/mockData'
import { ProgressBar } from '../ui'

export default function WelcomeHeader() {
  const { user } = useApp()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="relative overflow-hidden rounded-2xl gradient-bg p-6 text-white mb-6">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 right-16 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-indigo-200 text-sm font-medium mb-1">{greeting},</p>
            <h1 className="font-heading text-2xl md:text-3xl font-bold mb-1">{user.name.split(' ')[0]} 👋</h1>
            <p className="text-indigo-200 text-sm">{user.grade} · {user.targetExam} Preparation</p>
          </div>

          {/* Streak */}
          <div className="flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-3 flex-shrink-0 streak-glow border border-orange-300/30">
            <Flame size={22} className="text-orange-300 mb-1" />
            <span className="font-heading font-bold text-xl leading-none">{user.streak}</span>
            <span className="text-xs text-indigo-200 mt-0.5">day streak</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-indigo-200 font-medium">Today's Progress</span>
            <span className="text-sm font-bold">{user.dailyProgress}%</span>
          </div>
          <div className="h-2.5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-white/70 transition-all duration-700"
              style={{ width: `${user.dailyProgress}%` }}
            />
          </div>
        </div>

        {/* Quote */}
        <div className="mt-4 flex items-start gap-2 bg-white/10 rounded-xl p-3">
          <Quote size={14} className="text-indigo-200 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-white/90 leading-relaxed italic">"{todayQuote.text}"</p>
            <p className="text-xs text-indigo-300 mt-1">— {todayQuote.author}</p>
          </div>
        </div>

        {/* Points */}
        <div className="mt-3 flex items-center gap-1.5">
          <Star size={14} className="text-amber-300 fill-amber-300" />
          <span className="text-sm font-semibold">{user.points.toLocaleString()} XP</span>
          <span className="text-indigo-300 text-xs ml-1">· Rank #4 in your school</span>
        </div>
      </div>
    </div>
  )
}
