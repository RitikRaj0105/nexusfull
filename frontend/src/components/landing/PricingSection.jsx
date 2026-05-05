import React from 'react'
import { Check, Zap } from 'lucide-react'
import { pricingPlans } from '../../data/mockData'

export default function PricingSection({ onLogin }) {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Simple, <span className="gradient-text">transparent pricing</span>
          </h2>
          <p className="text-lg text-slate-500">Start free. Upgrade when you're ready. No surprises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <div key={plan.name}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                plan.popular
                  ? 'gradient-bg text-white shadow-2xl shadow-indigo-200 scale-105'
                  : 'bg-white border border-slate-100 hover:shadow-lg hover:-translate-y-1'
              }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Zap size={12} fill="currentColor" /> Most Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className={`font-heading text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-indigo-200' : 'text-slate-400'}`}>{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className={`font-heading text-4xl font-bold ${plan.popular ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </span>
                {plan.price > 0 && (
                  <span className={`text-sm ml-1 ${plan.popular ? 'text-indigo-200' : 'text-slate-400'}`}>
                    /{plan.period}
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={16} className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-indigo-200' : 'text-emerald-500'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-indigo-100' : 'text-slate-600'}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onLogin}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 ${
                  plan.popular
                    ? 'bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
                }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          All plans include a 7-day free trial. Cancel anytime. Student discounts available.
        </p>
      </div>
    </section>
  )
}
