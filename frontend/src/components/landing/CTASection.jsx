import React from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTASection({ onLogin }) {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative overflow-hidden rounded-3xl gradient-bg p-12 text-white">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Sparkles size={18} className="text-amber-300" />
              <span className="text-sm font-semibold text-indigo-200">Join 10,000+ students today</span>
              <Sparkles size={18} className="text-amber-300" />
            </div>

            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Your future starts today.
            </h2>
            <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto">
              Stop studying harder. Start studying smarter. Nexus gives you everything you need to succeed — for free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onLogin}
                className="inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-bold py-4 px-8 rounded-2xl hover:bg-indigo-50 transition-all duration-200 shadow-xl active:scale-95">
                Start Free — No Credit Card <ArrowRight size={18} />
              </button>
              <button
                onClick={onLogin}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl border border-white/20 transition-all duration-200">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
