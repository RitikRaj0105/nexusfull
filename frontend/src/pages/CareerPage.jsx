import React, { useState } from 'react'
import { Compass, TrendingUp, GraduationCap, Star, ChevronRight, Sparkles } from 'lucide-react'
import { careerSuggestions } from '../data/mockData'
import { ProgressBar } from '../components/ui'

const strengthsQuiz = [
  { q: 'I enjoy solving complex problems', area: 'Analytical' },
  { q: 'I like working with people and communicating ideas', area: 'Social' },
  { q: 'I\'m good at creating things — art, writing, or design', area: 'Creative' },
  { q: 'I prefer hands-on tasks and practical work', area: 'Technical' },
  { q: 'I love organizing, leading, and planning', area: 'Leadership' },
]

const majorSuggestions = {
  'Software Engineer': ['Computer Science', 'Software Engineering', 'Data Science'],
  'Data Scientist': ['Statistics', 'Data Science', 'Mathematics', 'CS'],
  'Biomedical Engineer': ['Biomedical Engineering', 'Biotechnology', 'Pre-Med'],
  'Product Manager': ['Business', 'Computer Science', 'Engineering Management'],
}

export default function CareerPage() {
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizDone, setQuizDone] = useState(false)
  const [selected, setSelected] = useState(null)

  const allAnswered = strengthsQuiz.every((_, i) => quizAnswers[i] !== undefined)

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-slate-900">Career Compass</h1>
        <p className="text-slate-500 mt-1">Discover careers where you'll thrive and find fulfillment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Strengths Quiz */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Star size={16} className="text-amber-500" /> Strengths Quiz
          </h3>

          {!quizDone ? (
            <>
              <div className="space-y-4 mb-5">
                {strengthsQuiz.map((item, i) => (
                  <div key={i}>
                    <p className="text-sm text-slate-700 font-medium mb-2">{item.q}</p>
                    <div className="flex gap-2">
                      {['Disagree', 'Neutral', 'Agree'].map((opt) => (
                        <button key={opt}
                          onClick={() => setQuizAnswers(a => ({ ...a, [i]: opt }))}
                          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg border-2 transition-all ${
                            quizAnswers[i] === opt
                              ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                              : 'border-slate-200 text-slate-500 hover:border-indigo-200'
                          }`}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setQuizDone(true)} disabled={!allAnswered}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
                <Sparkles size={16} /> Analyze My Strengths
              </button>
            </>
          ) : (
            <div className="space-y-3">
              {[
                { area: 'Analytical', score: 92 },
                { area: 'Technical', score: 85 },
                { area: 'Leadership', score: 70 },
                { area: 'Creative', score: 55 },
                { area: 'Social', score: 48 },
              ].map(s => (
                <div key={s.area}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{s.area}</span>
                    <span className="font-semibold text-indigo-600">{s.score}%</span>
                  </div>
                  <ProgressBar value={s.score} gradient="from-indigo-500 to-violet-500" />
                </div>
              ))}
              <button onClick={() => setQuizDone(false)} className="text-xs text-indigo-600 font-medium mt-2">
                Retake Quiz
              </button>
            </div>
          )}
        </div>

        {/* Career Matches */}
        <div className="card p-5">
          <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Compass size={16} className="text-cyan-600" /> Top Career Matches
          </h3>

          <div className="space-y-3">
            {careerSuggestions.map((career) => (
              <div key={career.title}
                onClick={() => setSelected(selected === career.title ? null : career.title)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selected === career.title
                    ? 'border-indigo-400 bg-indigo-50'
                    : 'border-slate-100 hover:border-indigo-200 bg-slate-50'
                }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{career.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{career.title}</p>
                      <p className="text-xs text-slate-400">{career.salary}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg text-indigo-600 leading-none">{career.match}%</div>
                    <div className="text-xs text-slate-400">match</div>
                  </div>
                </div>

                {selected === career.title && (
                  <div className="mt-3 pt-3 border-t border-indigo-100">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={13} className="text-emerald-500" />
                      <span className="text-xs font-semibold text-emerald-700">{career.growth} Growth</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {career.skills.map(s => (
                        <span key={s} className="text-xs bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full font-medium">{s}</span>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-600 mb-1.5">Recommended Majors:</p>
                      {majorSuggestions[career.title]?.map(m => (
                        <div key={m} className="flex items-center gap-1.5 text-xs text-slate-600 mb-1">
                          <GraduationCap size={12} className="text-indigo-400" /> {m}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skill Roadmap */}
        <div className="card p-5 lg:col-span-2">
          <h3 className="font-display font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-indigo-600" /> Skill Roadmap — Software Engineer
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { phase: 'Now', skills: ['Math Fundamentals', 'Logical Thinking', 'Basic Python'], done: true },
              { phase: 'Year 1', skills: ['Data Structures', 'Algorithms', 'Web Basics'], done: false },
              { phase: 'Year 2', skills: ['Full-Stack Dev', 'Databases', 'APIs'], done: false },
              { phase: 'Year 3', skills: ['System Design', 'Cloud', 'Open Source'], done: false },
              { phase: 'Career', skills: ['Internships', 'Portfolio', 'Job Ready 🚀'], done: false },
            ].map((phase, i, arr) => (
              <div key={phase.phase} className="flex-shrink-0 flex items-start gap-3">
                <div className={`flex flex-col items-center w-36 p-3.5 rounded-xl border-2 ${
                  phase.done ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-slate-50'
                }`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                    phase.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>{i + 1}</div>
                  <p className="font-semibold text-slate-700 text-xs mb-2">{phase.phase}</p>
                  {phase.skills.map(s => (
                    <p key={s} className="text-xs text-slate-500 mb-1 text-center">{s}</p>
                  ))}
                </div>
                {i < arr.length - 1 && (
                  <ChevronRight size={16} className="text-slate-300 mt-8 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
