"use client"

import Image from 'next/image'
import { motion, Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import VisionSection from '@/components/VisionSection'
            gap: isMobile ? '14px' : '32px',
            maxWidth: '900px'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useIsMobile()
  const mainCardRef = useRef<HTMLDivElement | null>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
                type="text"
                style={{ padding: isMobile ? '12px 14px' : '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', fontSize: isMobile ? '0.95rem' : '1rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}

  const heroWords = "We are Building Bharat's Largest Idea Repository".split(' ')

  const heroTitleVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.055,
                type="text"
                style={{ padding: isMobile ? '12px 14px' : '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', fontSize: isMobile ? '0.95rem' : '1rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.56, ease: [0.22, 1, 0.36, 1] },
    },
  }

                type="email"
                style={{ padding: isMobile ? '12px 14px' : '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', fontSize: isMobile ? '0.95rem' : '1rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
    const yPct = (y / rect.height) * 100
    el.style.setProperty('--cursor-x', `${xPct}%`)
    el.style.setProperty('--cursor-y', `${yPct}%`)

    // overlay intensity increases as cursor moves to the right side of viewport
    const norm = Math.max(0, (e.clientX / window.innerWidth - 0.5) * 2) // 0..1 when on right half
    const alpha1 = (norm * 0.7).toFixed(3)
    const alpha2 = (Math.min(0.6, norm * 0.5)).toFixed(3)
                style={{ padding: isMobile ? '12px 14px' : '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', minHeight: isMobile ? '96px' : '120px', fontSize: isMobile ? '0.95rem' : '1rem', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
    const el = mainCardRef.current
    if (!el) return
    el.style.setProperty('--overlay-alpha1', `0`)
    el.style.setProperty('--overlay-alpha2', `0`)
  }

  return (
    <main className="main-viewport" style={{
      position: 'relative',
      scrollBehavior: 'smooth'
    }}>

      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(11, 34, 40, 0.4)',
              backdropFilter: 'blur(10px)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{
                width: '100%',
                maxWidth: '400px',
                background: '#c1f1f1',
                borderRadius: '32px',
                padding: '40px 20px',
                position: 'relative',
                boxShadow: '0 40px 100px rgba(11, 34, 40, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: '#0B2228',
                  border: 'none',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X color="white" size={20} />
              </button>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 400,
                    color: '#0B2228',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-lexend)',
                    textAlign: 'center'
                  }}
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <StickyNavbar />
      {/* HERO SECTION */}
      <section className="hero-container">
        <motion.div
          ref={mainCardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="main-card framed-card"
        >

          <div className="hero-logo-tab" aria-hidden="true">
            <Image src="/logo.png" alt="Logo" width={55} height={55} priority />
          </div>



          <header className="header">
            <div className="logo-container">
              <span className="brand-name">SvaNiti Policy Research Center</span>
            </div>

            {isMobile ? (
              <button
                onClick={() => setIsMenuOpen(true)}
                className="nav-toggle-btn"
                aria-label="Open navigation menu"
              >
                <span className="menu-slashes" aria-hidden="true">//</span>
              </button>
            ) : (
              <nav className="nav">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="nav-link">{link.name}</a>
                ))}
              </nav>
            )}
          </header>

          <div className="hero-content">
            <motion.h1
              variants={heroTitleVariants}
              initial="hidden"
              animate="visible"
              className="main-title"
              aria-label="We are Building Bharat's Largest Idea Repository"
            >
              {heroWords.map((word, index) => (
                <motion.span
                  aria-hidden="true"
                  className="hero-word"
                  key={`${word}-${index}`}
                  variants={heroWordVariants}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          <motion.footer
            className="footer"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.48, ease: 'easeOut' }}
          >
            <div className="footer-left">
              <p className="mission-text">
                Education & Public Policy Think-Tank in being to Sync Nation's Aspirations into Policy.
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
          </motion.footer>
        </motion.div>
      </section>

      {/* TICKER SECTION */}
      <ParallaxTicker />

      {/* WHAT WE DO SECTION */}
      <WhatWeDo />

      {/* VISION SECTION (animated) */}
      <React.Suspense>
        {/* Lazy load the animated section; it uses the same mobile flag */}
        <div style={{ width: '100%' }}>
          <VisionSection isMobile={isMobile} />
        </div>
      </React.Suspense>
      <motion.div
        ref={teamRef}
        className="team-photo-section"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
        height: isMobile ? '100vh' : '150vh',
        width: '100%',
        background: '#f8fafc',
        position: 'relative',
        paddingTop: isMobile ? '0' : '120px',
      }}>
        <div className="team-photo-sticky" style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
            zIndex: 0,
          padding: isMobile ? '10px' : '40px',
          boxSizing: 'border-box'
        }}>
          <div className="team-photo-frame" style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            borderRadius: isMobile ? '24px' : '32px',
            overflow: 'hidden',
            background: '#fff'
          }}>
            <Image
              src="/gallery/SvanitiPhoto.png"
              alt="SvaNiti Team"
              fill
              sizes="(max-width: 768px) 100vw, 94vw"
              style={{
                objectFit: isMobile ? 'contain' : 'cover',
                objectPosition: '49% 47%',
                background: isMobile ? '#fff' : 'transparent'
              }}
              quality={85}
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      <TestimonialCarousel />

      {/* CONTACT SECTION WITH RISE EFFECT */}
      <motion.div
        id="contact"
        ref={contactRef}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          padding: '20px',
          background: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '0',
          position: 'relative',
          zIndex: 20,
        }}
      >
        <div className="contact-card framed-card" style={{
          padding: isMobile ? '30px 20px' : '60px',
          background: '#e0fcf8',
          borderRadius: isMobile ? '24px' : '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '20px' : '40px'
        }}>
          <div style={{ background: '#0B2228', padding: '12px 24px', borderRadius: '8px', width: 'fit-content' }}>
            <span style={{ color: 'white', fontWeight: 600 }}>Let's Talk, What you got!</span>
          </div>
          <h3 className="contact-title" style={{ fontSize: '2.5rem', fontWeight: 300, color: '#0B2228', maxWidth: '600px', lineHeight: 1.2, marginBottom: '60px' }}>
            Contact us for any notion for nation
          </h3>

          <div className="contact-form-grid" style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '14px' : '32px',
            maxWidth: '900px',
            width: '100%',
              }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', minWidth: 0 }}>
              <label style={{ color: '#0B2228', fontWeight: 600, fontSize: '0.9rem' }}>Name *</label>
              <motion.input
                whileHover={{ borderColor: 'rgba(11, 34, 40, 0.4)' }}
                whileFocus={{ borderColor: '#0B2228', boxShadow: '0 0 0 2px rgba(11, 34, 40, 0.05)' }}
                transition={{ duration: 0.1 }}
                type="text"
                style={{ padding: isMobile ? '12px 14px' : '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', fontSize: isMobile ? '0.95rem' : '1rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', minWidth: 0 }}>
              <label style={{ color: '#0B2228', fontWeight: 600, fontSize: '0.9rem' }}>Contact No. *</label>
              <motion.input
                whileHover={{ borderColor: 'rgba(11, 34, 40, 0.4)' }}
                whileFocus={{ borderColor: '#0B2228', boxShadow: '0 0 0 2px rgba(11, 34, 40, 0.05)' }}
                transition={{ duration: 0.1 }}
                type="text"
                style={{ padding: isMobile ? '12px 14px' : '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', fontSize: isMobile ? '0.95rem' : '1rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', gridColumn: isMobile ? 'span 1' : 'span 2', width: '100%', minWidth: 0 }}>
              <label style={{ color: '#0B2228', fontWeight: 600, fontSize: '0.9rem' }}>Email *</label>
              <motion.input
                whileHover={{ borderColor: 'rgba(11, 34, 40, 0.4)' }}
                whileFocus={{ borderColor: '#0B2228', boxShadow: '0 0 0 2px rgba(11, 34, 40, 0.05)' }}
                transition={{ duration: 0.1 }}
                type="email"
                style={{ padding: isMobile ? '12px 14px' : '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', fontSize: isMobile ? '0.95rem' : '1rem', outline: 'none', width: '100%', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', gridColumn: isMobile ? 'span 1' : 'span 2', width: '100%', minWidth: 0 }}>
              <label style={{ color: '#0B2228', fontWeight: 600, fontSize: '0.9rem' }}>Notion Note *</label>
              <motion.textarea
                whileHover={{ borderColor: 'rgba(11, 34, 40, 0.4)' }}
                whileFocus={{ borderColor: '#0B2228', boxShadow: '0 0 0 2px rgba(11, 34, 40, 0.05)' }}
                transition={{ duration: 0.1 }}
                style={{ padding: isMobile ? '12px 14px' : '16px 24px', borderRadius: '12px', border: '1px solid rgba(11,34,40,0.1)', background: 'white', minHeight: isMobile ? '96px' : '120px', fontSize: isMobile ? '0.95rem' : '1rem', fontFamily: 'inherit', outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
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
                gridColumn: isMobile ? 'span 1' : 'span 2',
                background: '#0B2228',
                color: 'white',
                padding: '16px 32px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                marginTop: '10px',
                width: isMobile ? '100%' : 'fit-content'
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
