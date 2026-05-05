import React from 'react'
import { BookOpen, Brain, Compass, Lightbulb, Users, BarChart2, Sparkles } from 'lucide-react'

const features = [
  {
    icon: <BookOpen size={24} />,
    title: 'AI Study Planner',
    description: 'Input your subjects, exam dates, and weak areas. Get a personalized daily schedule, weekly roadmap, and adaptive revision strategy.',
    color: 'indigo',
    gradient: 'from-indigo-500 to-violet-500',
  },
  {
    icon: <Brain size={24} />,
    title: 'Mental Wellness',
    description: 'Daily mood check-ins, stress tracking, guided breathing, and journaling. Your emotional health is as important as your grades.',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: <Compass size={24} />,
    title: 'Career Compass',
    description: 'Discover careers that match your strengths and passions. Get salary data, skill roadmaps, and college major suggestions.',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'Life Skills',
    description: '5-minute daily lessons on budgeting, communication, critical thinking, and confidence. School doesn\'t teach you this.',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: <Users size={24} />,
    title: 'Social Hub',
    description: 'Live study rooms, accountability streaks, friend challenges, and leaderboards. Better together.',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <BarChart2 size={24} />,
    title: 'Progress Analytics',
    description: 'See exactly how you\'re improving week over week. Smart insights surface your blind spots before they become problems.',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-500',
  },
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 text-sm font-semibold mb-5">
            <Sparkles size={14} className="text-indigo-500" />
            Everything you need to succeed
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            6 superpowers. <span className="gradient-text">One platform.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Nexus combines everything students need into one beautiful, AI-powered system — so you can focus on what matters.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title}
              className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform duration-200`}>
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* AI Chatbot callout */}
        <div className="mt-12 relative overflow-hidden rounded-3xl gradient-bg p-8 md:p-12 text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="font-heading text-2xl md:text-3xl font-bold mb-3">Meet Nova, Your AI Study Mentor</h3>
              <p className="text-indigo-200 max-w-md">
                Nova is always available — explain concepts, generate practice questions, review your essays, or just help you figure out where to start when you're overwhelmed.
              </p>
            </div>
            <div className="flex-shrink-0 bg-white/10 backdrop-blur rounded-2xl p-5 w-full md:w-64">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-sm font-bold flex-shrink-0">N</div>
                <div className="bg-white/10 rounded-xl rounded-tl-sm px-3 py-2 text-sm">
                  Hey Alex! You have Physics in 17 days. Want to start with Wave Optics? Your score is 55% — we can fix that 💪
                </div>
              </div>
              <div className="flex items-start gap-3 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">A</div>
                <div className="bg-white/20 rounded-xl rounded-tr-sm px-3 py-2 text-sm">
                  Yes! Start with the hardest topic first.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
