import React from 'react'

export function Card({ children, className = '', hover = false }) {
  return (
    <div className={`card p-5 ${hover ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer' : ''} ${className}`}>
      {children}
    </div>
  )
}

export function Badge({ children, color = 'indigo', size = 'sm' }) {
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-700',
    violet: 'bg-violet-100 text-violet-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    rose: 'bg-rose-100 text-rose-700',
    cyan: 'bg-cyan-100 text-cyan-700',
    slate: 'bg-slate-100 text-slate-600',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold ${size === 'sm' ? 'text-xs' : 'text-sm'} ${colors[color]}`}>
      {children}
    </span>
  )
}

export function ProgressBar({ value, gradient = 'from-indigo-500 to-violet-500', height = 'h-2' }) {
  return (
    <div className={`${height} rounded-full bg-slate-100 overflow-hidden`}>
      <div
        className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700 ease-out`}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  )
}

export function Avatar({ initials, gradient = 'from-indigo-400 to-violet-500', size = 'md' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-12 h-12 text-base', xl: 'w-16 h-16 text-xl' }
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white flex-shrink-0`}>
      {initials}
    </div>
  )
}

export function SectionHeader({ title, subtitle, centered = false }) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-3">{title}</h2>
      {subtitle && <p className="text-slate-500 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

export function GlowButton({ children, onClick, variant = 'primary', className = '' }) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-200 active:scale-95 cursor-pointer'
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 shadow-lg shadow-indigo-200 hover:shadow-indigo-300',
    ghost: 'bg-white/10 hover:bg-white/20 text-white py-3 px-6 border border-white/20',
    outline: 'border-2 border-indigo-200 hover:border-indigo-400 text-indigo-600 hover:bg-indigo-50 py-3 px-6',
  }
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  )
}

export function Spinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )
}

export function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="font-display font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-slate-400 text-sm mb-6">{description}</p>
      {action}
    </div>
  )
}

export function StatCard({ label, value, sub, icon, color = 'indigo' }) {
  const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    violet: 'bg-violet-50 text-violet-600',
    cyan: 'bg-cyan-50 text-cyan-600',
  }
  return (
    <div className="card p-4 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl ${colors[color]} flex items-center justify-center text-xl flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="text-xl font-bold font-display text-slate-900">{value}</div>
        <div className="text-xs text-slate-500">{label}</div>
        {sub && <div className="text-xs text-slate-400">{sub}</div>}
      </div>
    </div>
  )
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        <div className={`w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-indigo-600' : 'bg-slate-200'}`} />
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
      {label && <span className="text-sm font-medium text-slate-600">{label}</span>}
    </label>
  )
}
