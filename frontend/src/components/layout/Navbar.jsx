import React, { useState, useEffect } from 'react'
import { Zap, Menu, X } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function Navbar({ onLogin }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { darkMode, toggleDark } = useApp()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-heading font-bold text-xl text-slate-900">Nexus</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Testimonials', 'Pricing', 'FAQ'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-150">
                {item}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button onClick={onLogin}
              className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors px-4 py-2">
              Log in
            </button>
            <button onClick={onLogin}
              className="btn-primary text-sm py-2 px-5">
              Start Free →
            </button>
          </div>

          {/* Mobile menu */}
          <button onClick={() => setMenuOpen(o => !o)} className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass border-t border-slate-100 px-4 py-4 space-y-3">
          {['Features', 'Testimonials', 'Pricing', 'FAQ'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-medium text-slate-600 py-2">
              {item}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button onClick={onLogin} className="btn-secondary text-sm w-full">Log in</button>
            <button onClick={onLogin} className="btn-primary text-sm w-full">Start Free →</button>
          </div>
        </div>
      )}
    </nav>
  )
}
