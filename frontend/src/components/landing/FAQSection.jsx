import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { faqs } from '../../data/mockData'

export default function FAQSection() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Frequently <span className="gradient-text">asked questions</span>
          </h2>
          <p className="text-lg text-slate-500">Everything you need to know about Nexus.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                open === i ? 'border-indigo-200 bg-indigo-50/40' : 'border-slate-100 bg-slate-50 hover:border-indigo-100'
              }`}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full flex items-center justify-between p-5 text-left">
                <span className={`font-semibold text-sm md:text-base ${open === i ? 'text-indigo-700' : 'text-slate-800'}`}>
                  {faq.q}
                </span>
                {open === i
                  ? <ChevronUp size={18} className="text-indigo-500 flex-shrink-0" />
                  : <ChevronDown size={18} className="text-slate-400 flex-shrink-0" />}
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
