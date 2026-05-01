'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import Image from 'next/image'

export default function StickyNavbar() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const isScrollingUp = latest < lastScrollY
    const isPastHero = latest > 400 // Increased threshold

    if (isPastHero && isScrollingUp) {
      setVisible(true)
    } else {
      setVisible(false)
    }
    
    setLastScrollY(latest)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="sticky-navbar"
        >
          <div className="sticky-navbar-content">
            <div className="logo-container">
              <div className="logo-tab" style={{ padding: '6px' }}>
                <Image src="/logo-alpha.png" alt="Logo" width={40} height={40} priority />
              </div>
              <span className="brand-name" style={{ fontSize: '1rem' }}>SvaNiti</span>
            </div>
            <nav className="nav sticky-nav-links" style={{ gap: '5px' }}>
              <a href="#about" className="nav-link" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>About</a>
              <a href="#projects" className="nav-link" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>Projects</a>
              <a href="#insights" className="nav-link" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>Insights</a>
              <a href="#governance" className="nav-link" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>Governance</a>
            </nav>
            <div className="sticky-contact-btn">
              <a href="#contact" className="contact-btn" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Contact
              </a>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
