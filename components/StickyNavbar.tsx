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
    const isPastHero = latest > 150

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
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
          className="sticky-navbar"
        >
          <div className="sticky-navbar-content">
            <div className="logo-container">
              <div className="logo-tab" style={{ padding: '8px' }}>
                <Image src="/logo.png" alt="Logo" width={50} height={50} priority />
              </div>
              <span className="brand-name" style={{ fontSize: '1.15rem' }}>SvaNiti Policy Research Center</span>
            </div>
            <nav className="nav">
              <a href="#" className="nav-link">About</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#insights" className="nav-link">Insights</a>
              <a href="#contact" className="nav-link">Governance</a>
            </nav>
            <div className="footer-right">
              <a href="#contact" className="contact-btn"  >
                Contact Us
              </a>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
