import React from 'react'
import WelcomeHeader from '../components/dashboard/WelcomeHeader'
import TodayTasks from '../components/dashboard/TodayTasks'
import UpcomingExams from '../components/dashboard/UpcomingExams'
import MoodCheckin from '../components/dashboard/MoodCheckin'
import { AIFocusSession, CareerInsightCard } from '../components/dashboard/FocusCards'
import { WeakSubjectsTracker, LifeSkillOfDay } from '../components/dashboard/SubjectWidgets'

export default function DashboardPage({ onNavigate }) {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto animate-fade-in">
      <WelcomeHeader />

      {/* 2-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-4">
          <TodayTasks onNavigate={onNavigate} />
          <WeakSubjectsTracker onNavigate={onNavigate} />
          <MoodCheckin onNavigate={onNavigate} />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <UpcomingExams onNavigate={onNavigate} />
          <AIFocusSession onNavigate={onNavigate} />
          <CareerInsightCard onNavigate={onNavigate} />
          <LifeSkillOfDay onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  )
}
