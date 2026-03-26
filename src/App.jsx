import React from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import AboutUs from './components/AboutUs'
import HowItWorks from "./components/HowItWorks"
import CTASection from "./components/CTASection"
import Testimonials from "./components/Testimonials"
import Footer from "./components/Footer"

function App() {
  return (
    <div>
      <Hero/>
      <Features/>
      <AboutUs/>
      <HowItWorks/>
      <CTASection/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default App
