'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface NavbarProps {
  activePath?: string;
  onMenuClick?: () => void;
}

export default function Navbar({ activePath = '/', onMenuClick }: NavbarProps) {
  const router = useRouter()
  const [showPasscode, setShowPasscode] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [passcodeError, setPasscodeError] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Insights', href: '/insights' },
    { label: 'Governance', href: '/#' },
  ]

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // If already authenticated this session, go directly
    if (typeof window !== 'undefined' && sessionStorage.getItem('svaniti_admin') === 'true') {
      router.push('/admin/portal')
      return
    }
    setShowPasscode(true)
    setPasscode('')
    setPasscodeError(false)
  }

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === '0313') {
      // Store auth in sessionStorage (clears when browser tab closes)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('svaniti_admin', 'true')
      }
      setShowPasscode(false)
      setPasscodeError(false)
      router.push('/admin/portal')
    } else {
      setPasscodeError(true)
      setPasscode('')
      setShakeKey(prev => prev + 1)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowPasscode(false)
      setPasscodeError(false)
      setPasscode('')
    }
  }

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
          <button 
            className="sr-admin-nav-btn"
            onClick={handleAdminClick}
            aria-label="Administration"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            Admin
          </button>
        </nav>
        
        {onMenuClick && (
          <button 
            className="sr-hamburger-btn" 
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
      </header>

      {/* Passcode Modal Overlay */}
      {showPasscode && (
        <div className="sr-passcode-overlay" onClick={handleOverlayClick}>
          <form 
            key={shakeKey}
            className={`sr-passcode-modal ${passcodeError ? 'sr-passcode-shake' : ''}`} 
            onSubmit={handlePasscodeSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button" 
              className="sr-passcode-close" 
              onClick={() => { setShowPasscode(false); setPasscodeError(false); setPasscode('') }}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="sr-passcode-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                <circle cx="12" cy="16" r="1"/>
              </svg>
            </div>
            <h3>Admin Access</h3>
            <p>Enter the passcode to continue</p>
            <input 
              type="password" 
              value={passcode} 
              onChange={(e) => { setPasscode(e.target.value); setPasscodeError(false) }} 
              placeholder="• • • •"
              autoFocus
              maxLength={10}
            />
            {passcodeError && <span className="sr-passcode-error">Incorrect passcode</span>}
            <button type="submit" className="sr-passcode-submit">Unlock</button>
          </form>
        </div>
      )}
    </>
  )
}
