import React from 'react'
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white">Nexus</span>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              The AI Operating System for Student Success. Study smarter, reduce stress, discover your future.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Product',
              links: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Mobile App'],
            },
            {
              title: 'Students',
              links: ['Study Planner', 'Career Compass', 'Wellness Hub', 'Life Skills', 'Social Rooms'],
            },
            {
              title: 'Company',
              links: ['About Us', 'Blog', 'Careers', 'Press', 'Contact'],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-indigo-400 transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2025 Nexus. Built with ❤️ for students everywhere.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-xs hover:text-indigo-400 transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
