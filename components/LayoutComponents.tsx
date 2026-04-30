'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

// ===== REUSABLE LAYOUT COMPONENTS =====

/**
 * HeroSection - Full viewport hero with logo, title, and CTAs
 * Responsive: 100vh desktop, auto height mobile
 * You customize: logo, title, subtitle, CTAs
 */
export function HeroSection({ children }: { children: ReactNode }) {
  return (
    <section className="hero-section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      '@media (max-width: 768px)': {
        minHeight: 'auto',
        paddingTop: '40px'
      }
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </motion.div>
    </section>
  )
}

/**
 * ResponsiveGrid - Auto-responsive grid that adapts to screen size
 * Desktop: 3-4 columns | Tablet: 2 columns | Mobile: 1 column
 */
export function ResponsiveGrid({
  children,
  cols = { desktop: 3, tablet: 2, mobile: 1 },
  gap = '30px'
}: {
  children: ReactNode
  cols?: { desktop: number; tablet: number; mobile: number }
  gap?: string
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols.desktop}, 1fr)`,
      gap,
      '@media (max-width: 1024px)': {
        gridTemplateColumns: `repeat(${cols.tablet}, 1fr)`
      },
      '@media (max-width: 768px)': {
        gridTemplateColumns: `repeat(${cols.mobile}, 1fr)`
      }
    }}>
      {children}
    </div>
  )
}

/**
 * TwoColumnLayout - Left text, right image/content
 * Responsive: flex row desktop, flex column mobile
 */
export function TwoColumnLayout({
  left,
  right,
  gap = '60px'
}: {
  left: ReactNode
  right: ReactNode
  gap?: string
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap,
      alignItems: 'center',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '30px'
      }
    }}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}

/**
 * Card - Reusable card component with optional hover effect
 * Use for: project cards, testimonials, insights, etc.
 */
export function Card({
  children,
  hover = true,
  padding = '30px',
  rounded = '12px'
}: {
  children: ReactNode
  hover?: boolean
  padding?: string
  rounded?: string
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' } : {}}
      transition={{ duration: 0.3 }}
      style={{
        padding,
        background: '#ffffff',
        borderRadius: rounded,
        border: '1px solid rgba(11, 34, 40, 0.08)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        cursor: hover ? 'pointer' : 'default'
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Container - Centered max-width wrapper
 * Default max-width: 1200px
 */
export function Container({
  children,
  maxWidth = '1200px',
  padding = '80px 60px'
}: {
  children: ReactNode
  maxWidth?: string
  padding?: string
}) {
  return (
    <div style={{
      maxWidth,
      margin: '0 auto',
      padding,
      '@media (max-width: 768px)': {
        padding: '60px 30px'
      }
    }}>
      {children}
    </div>
  )
}

/**
 * Section - Full-width section with background color
 * Use to separate content blocks
 */
export function Section({
  children,
  background = '#f8fafc',
  minHeight = '100vh'
}: {
  children: ReactNode
  background?: string
  minHeight?: string
}) {
  return (
    <section style={{
      minHeight,
      background,
      padding: '60px 40px',
      '@media (max-width: 768px)': {
        minHeight: 'auto',
        padding: '40px 20px'
      }
    }}>
      <Container>{children}</Container>
    </section>
  )
}

/**
 * HeaderNav - Sticky navigation header
 * Placeholder for logo, brand name, nav links, CTAs
 */
export function HeaderNav({
  logo,
  brand,
  navItems,
  actions
}: {
  logo?: ReactNode
  brand?: ReactNode
  navItems?: { label: string; href: string }[]
  actions?: ReactNode
}) {
  return (
    <header style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '40px 60px',
      zIndex: 100,
      '@media (max-width: 768px)': {
        padding: '20px 20px'
      }
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {logo && <div>{logo}</div>}
        {brand && <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{brand}</div>}
      </div>
      <nav style={{
        display: 'flex',
        gap: '20px',
        '@media (max-width: 768px)': {
          display: 'none'
        }
      }}>
        {navItems?.map((item) => (
          <a key={item.href} href={item.href} style={{ textDecoration: 'none', fontSize: '0.95rem' }}>
            {item.label}
          </a>
        ))}
      </nav>
      {actions && <div>{actions}</div>}
    </header>
  )
}

/**
 * Ticker/Carousel - Horizontal scrolling row
 * Responsive: shows more items on desktop, fewer on mobile
 */
export function TickerRow({ children }: { children: ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      overflowX: 'auto',
      paddingBottom: '10px',
      scrollBehavior: 'smooth',
      '@media (max-width: 768px)': {
        gap: '15px'
      }
    }}>
      {children}
    </div>
  )
}

/**
 * FeatureTile - Small feature/stat block
 * Use in grids for quick visual information
 */
export function FeatureTile({
  icon,
  title,
  description
}: {
  icon?: ReactNode
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        textAlign: 'center',
        padding: '30px 20px'
      }}
    >
      {icon && <div style={{ marginBottom: '15px', fontSize: '2rem' }}>{icon}</div>}
      <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>{title}</h3>
      <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#666' }}>{description}</p>
    </motion.div>
  )
}

/**
 * ButtonGroup - Group of action buttons
 * Use for: CTAs, form buttons, etc.
 */
export function ButtonGroup({
  buttons,
  direction = 'row'
}: {
  buttons: Array<{ label: string; onClick?: () => void; href?: string; variant?: 'primary' | 'secondary' }>
  direction?: 'row' | 'column'
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: direction as any,
      gap: '15px',
      '@media (max-width: 768px)': {
        flexDirection: 'column'
      }
    }}>
      {buttons.map((btn, i) => (
        <a
          key={i}
          href={btn.href || '#'}
          onClick={btn.onClick}
          style={{
            padding: '12px 24px',
            background: btn.variant === 'secondary' ? '#f0f0f0' : '#0B2228',
            color: btn.variant === 'secondary' ? '#0B2228' : '#fff',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {btn.label}
        </a>
      ))}
    </div>
  )
}
