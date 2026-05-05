import React, { useState } from 'react'
import { Heart, ChevronRight, Sparkles } from 'lucide-react'

const moods = [
  { emoji: '😔', label: 'Low', value: 1 },
  { emoji: '😕', label: 'Meh', value: 2 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😊', label: 'Great', value: 5 },
  { emoji: '🤩', label: 'Amazing', value: 6 },
]

export default function MoodCheckin({ onNavigate }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (selected) setSubmitted(true)
  }

  return (
    <div className="card p-5 bg-gradient-to-br from-violet-50 to-indigo-50 border-violet-100">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display font-semibold text-slate-800 flex items-center gap-2">
          <Heart size={16} className="text-rose-500" />
          Mood Check-in
        </h3>
        <button onClick={() => onNavigate('wellness')}
          className="text-xs text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-1">
          Wellness <ChevronRight size={14} />
        </button>
      </div>

      {!submitted ? (
        <>
          <p className="text-xs text-slate-500 mb-4">How are you feeling right now?</p>
          <div className="grid grid-cols-6 gap-1.5 mb-4">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelected(mood.value)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-150 border-2 ${
                  selected === mood.value
                    ? 'border-indigo-400 bg-white shadow-sm scale-105'
                    : 'border-transparent hover:border-indigo-200 hover:bg-white/70'
                }`}
              >
                <span className="text-xl">{mood.emoji}</span>
                <span className="text-xs text-slate-500 hidden sm:block">{mood.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!selected}
            className="w-full py-2.5 bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold rounded-xl transition-all duration-200 hover:bg-indigo-700 disabled:cursor-not-allowed"
          >
            Log Mood
          </button>
        </>
      ) : (
        <div className="text-center py-3">
          <div className="text-4xl mb-2">{moods[selected - 1]?.emoji}</div>
          <p className="font-semibold text-slate-800 text-sm">
            Feeling {moods[selected - 1]?.label} today
          </p>
          <div className="flex items-center gap-1.5 justify-center mt-2 text-indigo-600">
            <Sparkles size={14} />
            <p className="text-xs">Mood logged! View trends in Wellness →</p>
          </div>
        </div>
      )}
    </div>
  )
}
