import React from 'react'
import {
  LayoutDashboard, BookOpen, Brain, Compass, Lightbulb, Users,
  BarChart2, Zap, LogOut, Moon, Sun, Bell, ChevronRight
} from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { Avatar } from '../ui'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'planner', label: 'Study Planner', icon: BookOpen },
  { id: 'wellness', label: 'Wellness', icon: Brain },
  { id: 'career', label: 'Career Compass', icon: Compass },
  { id: 'lifeskills', label: 'Life Skills', icon: Lightbulb },
  { id: 'social', label: 'Social Hub', icon: Users },
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
]

export default function Sidebar({ activePage, onNavigate }) {
  const { user, logout, darkMode, toggleDark } = useApp()

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen border-r border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 fixed left-0 top-0 bottom-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-6 h-16 border-b border-slate-100 dark:border-slate-800">
        <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-heading font-bold text-xl">Nexus</span>
        <span className="ml-auto">
          <Bell size={18} className="text-slate-400 cursor-pointer hover:text-indigo-500 transition-colors" />
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`sidebar-item w-full text-left ${activePage === id ? 'active' : ''}`}
          >
            <Icon size={18} />
            {label}
            {activePage === id && <ChevronRight size={14} className="ml-auto opacity-60" />}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <button onClick={toggleDark} className="sidebar-item w-full text-left">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={logout} className="sidebar-item w-full text-left text-rose-500 hover:text-rose-600 hover:bg-rose-50">
          <LogOut size={18} />
          Log Out
        </button>

        {/* User */}
        <div className="flex items-center gap-3 mt-3 px-2 py-2">
          <Avatar initials={user.name.split(' ').map(n => n[0]).join('')} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-slate-800 truncate">{user.name}</div>
            <div className="text-xs text-slate-400">{user.grade}</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
