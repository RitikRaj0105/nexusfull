import React from 'react'
import { LayoutDashboard, BookOpen, Brain, Compass, Users } from 'lucide-react'

const mobileNav = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'planner', label: 'Study', icon: BookOpen },
  { id: 'wellness', label: 'Wellness', icon: Brain },
  { id: 'career', label: 'Career', icon: Compass },
  { id: 'social', label: 'Social', icon: Users },
]

export default function MobileNav({ activePage, onNavigate }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNav.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-150 ${
              activePage === id
                ? 'text-indigo-600'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Icon size={20} strokeWidth={activePage === id ? 2.5 : 1.8} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
