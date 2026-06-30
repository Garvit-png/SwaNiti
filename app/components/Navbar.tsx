'use client'

import Image from 'next/image'
import Link from 'next/link'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface NavbarProps {
  activePath?: string;
  onMenuClick?: () => void; // Keeping it optional in case some parent still passes it
}

export default function Navbar({ activePath = '/', onMenuClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 300) {
        if (currentScrollY < lastScrollY.current) {
          // Scrolling up
          setScrolled(true)
        } else if (currentScrollY > lastScrollY.current + 5) {
          // Scrolling down (with a tiny threshold)
          setScrolled(false)
        }
      } else {
        setScrolled(false)
      }

      lastScrollY.current = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Initiatives', href: '/projects' },
    { label: 'Insights', href: '/insights' },
    { label: 'Governance', href: '/governance' },
  ]


  return (
    <>
      {/* Logo Notch */}
      <div className="sr-card-logo-notch">
        <Link href="/" className="sr-logo-link">
          <div className="sr-logo-wrapper">
            <Image src="/logo.png" alt="SvaNiti Logo" width={80} height={80} priority />
          </div>
        </Link>
      </div>

      <header className="sr-card-nav">
        <Link className="sr-card-brand" href="/" aria-label="SvaNiti home">
          <strong>SvaNiti Policy Research Center</strong>
        </Link>
        
        <nav className="sr-card-links">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className={activePath === link.href ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}

        </nav>
        
        <button 
          className="sr-hamburger-btn" 
          aria-label="Menu"
          onClick={() => {
            if (onMenuClick) onMenuClick();
            setMenuOpen(true);
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      {/* FLOATING NAVBAR (appears on scroll) */}
      {mounted && createPortal(
        <AnimatePresence>
          {scrolled && (
            <div className="sr-floating-nav-wrapper">
              <motion.div
                initial={{ y: '-150%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '-150%', opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="sr-floating-nav"
              >
                <Link href="/" className="sr-floating-logo">
                  <Image src="/logo.png" alt="Logo" width={38} height={38} />
                </Link>
                <nav className="sr-floating-links">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.label} 
                      href={link.href}
                      className={activePath === link.href ? 'active' : ''}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <button 
                  className="sr-floating-menu-btn" 
                  aria-label="Menu"
                  onClick={() => setMenuOpen(true)}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {mounted && createPortal(
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className="sr-mobile-menu-overlay"
            >
              {/* Top Bar */}
              <div className="sr-menu-overlay-header">
                <div className="sr-menu-logo-notch">
                  <Image src="/logo.png" alt="SvaNiti Logo" width={44} height={44} />
                </div>
                <div className="sr-menu-brand">
                  <strong>SvaNiti Policy Research Center</strong>
                </div>
                <button
                  className="sr-menu-close-btn"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  X
                </button>
              </div>

              {/* Nav Links */}
              <nav className="sr-menu-nav-links">
                {[
                  { num: '01', label: 'About', href: '/about' },
                  { num: '02', label: 'Initiatives', href: '/projects' },
                  { num: '03', label: 'Insights', href: '/insights' },
                  { num: '04', label: 'Governance', href: '/governance' },
                ].map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="sr-menu-nav-item"
                  >
                    <span className="sr-nav-num">{item.num}</span>
                    <span className="sr-nav-text">{item.label}</span>
                    <span className="sr-nav-arrow"><ArrowRight size={28} /></span>
                  </Link>
                ))}
              </nav>

              {/* Bottom Actions */}
              <div className="sr-menu-footer">
                <a className="sr-menu-join-btn" href="#" onClick={() => setMenuOpen(false)}>
                  Join Our Movement
                  <span className="sr-menu-arrow-box">
                    <ArrowRight size={20} />
                  </span>
                </a>
                <div className="sr-menu-contact-info">
                  <span>office@svaniti.in</span>
                  <span className="sr-divider-pipe">|</span>
                  <span>+91 2826 358065</span>
                </div>
                <a
                  href="https://www.linkedin.com/company/svaniti-policy-research-center/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sr-menu-social-link"
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
