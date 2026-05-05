import React from 'react'
import Navbar from '../components/layout/Navbar'
import HeroSection from '../components/landing/HeroSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import PricingSection from '../components/landing/PricingSection'
import FAQSection from '../components/landing/FAQSection'
import CTASection from '../components/landing/CTASection'
import Footer from '../components/landing/Footer'

export default function LandingPage({ onLogin }) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar onLogin={onLogin} />
      <HeroSection onLogin={onLogin} />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection onLogin={onLogin} />
      <FAQSection />
      <CTASection onLogin={onLogin} />
      <Footer />
    </div>
  )
}
