"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import ShaderBackground from '@/components/ShaderBackground'
import StickyNavbar from '@/components/StickyNavbar'
import ParallaxTicker from '@/components/ParallaxTicker'
import WhatWeDo from '@/components/WhatWeDo'

export default function Home() {
  const footerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const smooth = useRef({ x: 0.5, y: 0.5 })
  const rafId = useRef<number>(0)

  return (
    <main className="main-viewport">

      <StickyNavbar />
      {/* HERO SECTION */}
      <section className="hero-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="main-card framed-card"
        >
          <ShaderBackground />

          <header className="header">
            <div className="logo-container">
              <div className="logo-tab">
                <Image src="/logo.png" alt="Logo" width={55} height={55} priority />
              </div>
              <span className="brand-name">SvaNiti Policy Research Center</span>
            </div>
            <nav className="nav">
              <a href="#" className="nav-link">About</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#insights" className="nav-link">Insights</a>
              <a href="#contact" className="nav-link">Governance</a>
            </nav>
          </header>

          <div className="hero-content">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="main-title"
            >
              We are Building Bharat's<br />
              Largest Idea Repository
            </motion.h1>
          </div>

          <footer className="footer">
            <div className="footer-left">
              <p className="mission-text">
                Education & Public Policy Think-Tank in being to Sync<br />
                Nation's Aspirations into Policy.
              </p>
            </div>
            <div className="footer-right">
              <a href="#contact" className="contact-btn">
                Contact Us
                <div className="arrow-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </a>
              <a href="#contact" className="join-btn">
                Join Our Movement
                <div className="arrow-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </a>
            </div>
          </footer>
        </motion.div>
      </section>

      {/* TICKER SECTION */}
      <ParallaxTicker />

      {/* WHAT WE DO SECTION */}
      <WhatWeDo />

      {/* VISION SECTION */}
      <div style={{
        height: '65vh', /* Reduced from 100vh to make it smaller and tighter */
        width: '100vw',
        background: 'white',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        scrollSnapAlign: 'center',
        position: 'relative',
      }}>
        {/* Wrapper for cutout logic */}
        <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
          
          {/* CYAN CARD */}
          <div style={{
            flex: 1,
            background: '#d4fdf8', /* Light cyan/blue matching the photo */
            borderRadius: '32px',
            display: 'flex',
            flexDirection: 'column',
            padding: '80px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            
            {/* Typography Container — pushed to the bottom */}
            <div style={{ 
              marginTop: 'auto', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end',
              gap: '40px'
            }}>
              {/* Massive heading */}
              <h2 style={{
                fontSize: '5rem',
                fontWeight: 400,
                color: '#0B2228',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                Inspiring Aspirations,<br/>
                Designing Policy,<br/>
                Building Nation.
              </h2>
              
              {/* Small paragraph */}
              <p style={{
                fontSize: '1.05rem',
                color: '#0B2228',
                maxWidth: '450px',
                lineHeight: 1.6,
                margin: 0,
                paddingBottom: '16px', /* optical alignment with the baseline of the large text */
                opacity: 0.9,
                fontWeight: 500
              }}>
                We exist to spark a movement that rethinks the policy-making
                process, rejuvenates education with Indic ideas, and be a vital cog
                in the mission towards Viksit Bharat.
              </p>
            </div>
          </div>

          {/* EXACT Logo Cutout Logic — White Corner Box */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '0 32px 32px 0', 
            background: 'white',
            borderBottomRightRadius: '40px',
            zIndex: 10,
          }}>
            {/* Dark Pill "Our Vision" */}
            <div style={{
              background: '#0B2228',
              padding: '16px 32px',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                color: 'white',
                fontSize: '1rem',
                fontWeight: 600,
              }}>
                Our Vision
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* FOOTER SECTION */}
      <div className="footer-container">
        <footer ref={footerRef} className="footer-minimal framed-card">
          <div className="footer-bottom-links">
            <div className="footer-brand">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <span>SvaNiti Policy Research Center</span>
            </div>
            <div className="footer-nav">
              <a href="#">About</a>
              <a href="#">Projects</a>
              <a href="#">Insights</a>
              <a href="#">Privacy Policy</a>
            </div>
            <p className="copyright">© 2024 Think-Tank for Education & Public Policy</p>
          </div>
        </footer>
      </div>
    </main>
  )
}
