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

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const onMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect()
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    const animate = () => {
      const lerp = 0.05
      smooth.current.x += (mouse.current.x - smooth.current.x) * lerp
      smooth.current.y += (mouse.current.y - smooth.current.y) * lerp

      const x = (smooth.current.x * 100).toFixed(2)
      const y = (smooth.current.y * 100).toFixed(2)

      footer.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(180, 255, 230, 0.45) 0%, transparent 50%),
        #ffffff
      `
      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

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
