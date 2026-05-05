import React from 'react'
import { Star } from 'lucide-react'
import { testimonials } from '../../data/mockData'
import { Avatar } from '../ui'

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Students <span className="gradient-text">love Nexus</span>
          </h2>
          <p className="text-lg text-slate-500">Real results from real students around the world.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 leading-relaxed mb-6 text-sm">"{t.text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Avatar initials={t.avatar} gradient={t.color} size="md" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.grade}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '10,000+', label: 'Active Students' },
            { value: '40+', label: 'Countries' },
            { value: '92%', label: 'Report Better Grades' },
            { value: '4.9★', label: 'Average Rating' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-heading text-3xl font-bold gradient-text mb-1">{s.value}</div>
              <div className="text-sm text-slate-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
