import React from 'react'
import { Zap, ArrowRight, Star, Users } from 'lucide-react'

export default function HeroSection({ onLogin }) {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-white">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-indigo-100/60 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-semibold mb-8 animate-slide-up">
          <Zap size={14} fill="currentColor" />
          AI-Powered Student Platform · Built for Gen Z
        </div>

        {/* Headline */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 mb-6 animate-slide-up animate-delay-100">
          Your AI Operating System<br />
          <span className="gradient-text">for Student Success</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 animate-slide-up animate-delay-200">
          Study smarter, reduce stress, discover your future. Nexus is your all-in-one AI companion for school, wellness, and career.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up animate-delay-300">
          <button onClick={onLogin}
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-xl shadow-indigo-200 hover:shadow-indigo-300 text-base active:scale-95">
            Start Free — No Credit Card <ArrowRight size={18} />
          </button>
          <button onClick={onLogin}
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-bold py-4 px-8 rounded-2xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-200 text-base">
            Join Waitlist
          </button>
        </div>

        {/* Social proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-slide-up animate-delay-400">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['from-indigo-400 to-violet-500', 'from-cyan-400 to-blue-500', 'from-rose-400 to-pink-500', 'from-amber-400 to-orange-500'].map((g, i) => (
                <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 border-white`} />
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
              </div>
              <span className="text-xs text-slate-500 font-medium">10,000+ students</span>
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-200" />
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users size={16} className="text-indigo-400" />
            <span>Join students from 40+ countries</span>
          </div>
        </div>

        {/* Hero Preview */}
        <div className="mt-16 max-w-4xl mx-auto animate-slide-up animate-delay-500">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-indigo-100 border border-slate-100">
            {/* Mock dashboard preview */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="flex-1 bg-slate-700 rounded-lg h-6 mx-4" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl p-3">
                  <div className="w-8 h-1.5 bg-white/50 rounded mb-2" />
                  <div className="w-12 h-3 bg-white rounded mb-1.5" />
                  <div className="w-full h-1 bg-white/30 rounded mb-1" />
                  <div className="w-3/4 h-1 bg-white/50 rounded-full" />
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-3">
                  {['from-slate-700 to-slate-800', 'from-slate-700 to-slate-800', 'from-slate-700 to-slate-800', 'from-slate-700 to-slate-800'].map((g, i) => (
                    <div key={i} className={`bg-gradient-to-br ${g} rounded-xl p-3`}>
                      <div className="w-6 h-1 bg-white/30 rounded mb-2" />
                      <div className="w-10 h-2.5 bg-white/60 rounded mb-1" />
                      <div className="w-full h-0.5 bg-white/20 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
