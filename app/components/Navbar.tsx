'use client'

import Image from 'next/image'
import Link from 'next/link'

interface NavbarProps {
  activePath?: string;
  onMenuClick?: () => void;
}

export default function Navbar({ activePath = '/', onMenuClick }: NavbarProps) {
  const navLinks = [
    { label: 'About', href: '/about' },
    { label: 'Projects', href: '/projects' },
    { label: 'Insights', href: '/insights' },
    { label: 'Governance', href: '/#' },
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
    </>
  )
}
