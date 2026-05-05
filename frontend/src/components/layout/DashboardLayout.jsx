import React from 'react'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function DashboardLayout({ activePage, onNavigate, children }) {
  return (
    <div className="min-h-screen nexus-gradient">
      <Sidebar activePage={activePage} onNavigate={onNavigate} />
      <div className="md:ml-64">
        <main className="min-h-screen pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <MobileNav activePage={activePage} onNavigate={onNavigate} />
    </div>
  )
}
