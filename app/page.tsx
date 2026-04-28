"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import ShaderBackground from '@/components/ShaderBackground'
import StickyNavbar from '@/components/StickyNavbar'
import ParallaxTicker from '@/components/ParallaxTicker'
import WhatWeDo from '@/components/WhatWeDo'
import ImpactSection from '@/components/ImpactSection'
import TestimonialCarousel from '@/components/TestimonialCarousel'
import { useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Footer from '@/components/Footer'

export default function Home() {
  const footerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const smooth = useRef({ x: 0.5, y: 0.5 })
  const rafId = useRef<number>(0)

  const teamRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: teamRef,
    offset: ["start start", "end start"]
  })

  // Clean Transition: Just the contact rise

  const contactRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: contactProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end end"]
  })
  const contactRise = useTransform(contactProgress, [0, 1], [100, 0])

  return (
    <main className="main-viewport" style={{ 
      position: 'relative',
      scrollBehavior: 'smooth'
    }}>

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
      <div id="about" style={{
        height: '65vh', /* Reduced from 100vh to make it smaller and tighter */
        width: '100vw',
        background: 'linear-gradient(to bottom, #fdfcf0, #f8fafc)',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
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
            background: '#f8fafc',
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
      <div ref={teamRef} style={{
        height: '150vh', 
        width: '100vw',
        background: '#f8fafc', 
        position: 'relative',
      }}>
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          zIndex: 5,
          padding: '40px',
          boxSizing: 'border-box'
        }}>
          <div style={{ 
            width: '100%', 
            height: '100%', 
            position: 'relative', 
            borderRadius: '32px', 
            overflow: 'hidden',
            background: '#fff'
          }}>
            <Image 
              src="/gallery/SvanitiPhoto.png" 
              alt="SvaNiti Team" 
              fill 
              style={{ objectFit: 'cover', objectPosition: '49% 47%' }}
              unoptimized
              priority
            />
          </div>
        </div>
      </div>

      <TestimonialCarousel />

      {/* CONTACT SECTION WITH RISE EFFECT */}
      <motion.div 
        id="contact"
        ref={contactRef}
        style={{
          padding: '20px',
          background: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '-100px', // Overlap effect
          position: 'relative',
          zIndex: 20,
          y: contactRise
        }}
      >
        <div className="framed-card" style={{
          padding: '60px',
          background: '#e0fcf8',
          borderRadius: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px'
        }}>
          <div style={{ background: '#0B2228', padding: '12px 24px', borderRadius: '8px', width: 'fit-content' }}>
            <span style={{ color: 'white', fontWeight: 600 }}>Let's Talk, What you got!</span>
          </div>
          <h3 style={{ fontSize: '2.5rem', fontWeight: 300, color: '#0B2228', maxWidth: '600px', lineHeight: 1.2, marginBottom: '60px' }}>
            Contact us for any notion for nation
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', maxWidth: '900px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ color: '#0B2228', fontWeight: 600, fontSize: '0.9rem' }}>Name *</label>
              <motion.input 
                whileHover={{ borderColor: 'rgba(11, 34, 40, 0.4)' }}
                whileFocus={{ borderColor: '#0B2228', boxShadow: '0 0 0 2px rgba(11, 34, 40, 0.05)' }}
                transition={{ duration: 0.1 }}
                type="text" 
                style={{ padding: '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', fontSize: '1rem', outline: 'none' }} 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ color: '#0B2228', fontWeight: 600, fontSize: '0.9rem' }}>Contact No. *</label>
              <motion.input 
                whileHover={{ borderColor: 'rgba(11, 34, 40, 0.4)' }}
                whileFocus={{ borderColor: '#0B2228', boxShadow: '0 0 0 2px rgba(11, 34, 40, 0.05)' }}
                transition={{ duration: 0.1 }}
                type="text" 
                style={{ padding: '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', fontSize: '1rem', outline: 'none' }} 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', gridColumn: 'span 2' }}>
              <label style={{ color: '#0B2228', fontWeight: 600, fontSize: '0.9rem' }}>Email *</label>
              <motion.input 
                whileHover={{ borderColor: 'rgba(11, 34, 40, 0.4)' }}
                whileFocus={{ borderColor: '#0B2228', boxShadow: '0 0 0 2px rgba(11, 34, 40, 0.05)' }}
                transition={{ duration: 0.1 }}
                type="email" 
                style={{ padding: '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', fontSize: '1rem', outline: 'none' }} 
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', gridColumn: 'span 2' }}>
              <label style={{ color: '#0B2228', fontWeight: 600, fontSize: '0.9rem' }}>Notion Note *</label>
              <motion.textarea 
                whileHover={{ borderColor: 'rgba(11, 34, 40, 0.4)' }}
                whileFocus={{ borderColor: '#0B2228', boxShadow: '0 0 0 2px rgba(11, 34, 40, 0.05)' }}
                transition={{ duration: 0.1 }}
                style={{ padding: '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', minHeight: '120px', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} 
              />
            </div>

            <motion.button 
              whileHover={{ 
                background: '#fff1cc', 
                color: '#0B2228',
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
              style={{
                gridColumn: 'span 2',
                background: '#0B2228',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '10px',
                width: 'fit-content'
              }}
            >
              Contact Now
            </motion.button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </main>
  )
}
