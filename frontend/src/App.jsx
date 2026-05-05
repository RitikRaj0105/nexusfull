import React, { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'

// Pages
import LandingPage from './pages/LandingPage'
import AuthModal from './pages/AuthModal'
import DashboardPage from './pages/DashboardPage'
import PlannerPage from './pages/PlannerPage'
import WellnessPage from './pages/WellnessPage'
import CareerPage from './pages/CareerPage'
import LifeSkillsPage from './pages/LifeSkillsPage'
import SocialPage from './pages/SocialPage'
import AnalyticsPage from './pages/AnalyticsPage'

// Layout
import DashboardLayout from './components/layout/DashboardLayout'

function AppInner() {
  const { isLoggedIn, login } = useApp()
  const [showAuth, setShowAuth] = useState(false)
  const [activePage, setActivePage] = useState('dashboard')

  const handleLogin = (name) => {
    login(name)
    setShowAuth(false)
  }

  const pageComponents = {
    dashboard: <DashboardPage onNavigate={setActivePage} />,
    planner: <PlannerPage />,
    wellness: <WellnessPage />,
    career: <CareerPage />,
    lifeskills: <LifeSkillsPage />,
    social: <SocialPage />,
    analytics: <AnalyticsPage />,
  }

  if (!isLoggedIn) {
    return (
      <>
        <LandingPage onLogin={() => setShowAuth(true)} />
        {showAuth && (
          <AuthModal
            onClose={() => setShowAuth(false)}
            onSuccess={handleLogin}
          />
        )}
      </>
    )
  }

  return (
    <DashboardLayout activePage={activePage} onNavigate={setActivePage}>
      {pageComponents[activePage] || pageComponents.dashboard}
    </DashboardLayout>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
