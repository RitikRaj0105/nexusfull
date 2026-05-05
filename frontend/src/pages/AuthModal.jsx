// frontend/src/pages/AuthModal.jsx — wired to real backend
import React, { useState } from 'react'
import { Zap, X, Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react'
import { authApi } from '../services/api'
import { useApp } from '../context/AppContext'

export default function AuthModal({ onClose, onSuccess }) {
  const { setApiError } = useApp()
  const [mode, setMode]       = useState('login')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      let result
      if (mode === 'login') {
        result = await authApi.login({ email, password })
      } else {
        result = await authApi.register({ email, password, name })
      }
      onSuccess(result.user)
    } catch (err) {
      setError(err.message || 'Something went wrong. Check your details.')
    } finally {
      setLoading(false)
    }
  }

  // Demo quick-login (uses seed data)
  const demoLogin = async () => {
    setEmail('alex@nexus.app')
    setPassword('demo1234')
    setError('')
    setLoading(true)
    try {
      const result = await authApi.login({ email: 'alex@nexus.app', password: 'demo1234' })
      onSuccess(result.user)
    } catch (err) {
      // Backend offline — use mock login
      onSuccess({ name: 'Alex Johnson', grade: '11th Grade', points: 2840, streak: 14 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 animate-slide-up">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
          <X size={18} />
        </button>

        <div className="flex items-center gap-2.5 mb-7">
          <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-slate-900">Nexus</span>
        </div>

        <h2 className="font-heading text-2xl font-bold text-slate-900 mb-1">
          {mode === 'login' ? 'Welcome back 👋' : 'Create your account 🚀'}
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          {mode === 'login' ? "Good to see you again! Let's get back to it." : 'Join 10,000+ students leveling up with Nexus.'}
        </p>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-700 text-sm px-4 py-3 rounded-xl mb-4">
            <AlertCircle size={15} className="flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder="Alex Johnson" required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all" />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="alex@email.com" required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1.5">Password</label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all pr-12" />
              <button type="button" onClick={() => setShowPass(s => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading
              ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <>{mode === 'login' ? 'Log In' : 'Create Account'} <ArrowRight size={16} /></>}
          </button>
        </form>

        <div className="flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-slate-100" />
          <span className="text-xs text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-100" />
        </div>

        {/* Demo login */}
        <button onClick={demoLogin} disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-indigo-200 rounded-xl text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-all disabled:opacity-50">
          ⚡ Try Demo Account
        </button>

        <p className="text-center text-sm text-slate-400 mt-5">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setError('') }}
            className="text-indigo-600 font-semibold hover:text-indigo-700">
            {mode === 'login' ? 'Sign up free' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  )
}
