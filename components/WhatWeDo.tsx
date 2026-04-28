import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StaggerProjects } from '@/components/ui/stagger-testimonials'
import { AnimatedText } from '@/components/ui/animated-underline-text'

export default function WhatWeDo() {
  const [gradientIndex, setGradientIndex] = useState(0)

  const gradients = [
    'radial-gradient(at 0% 0%, #fff1cc 0, transparent 60%), radial-gradient(at 100% 100%, #aed6f1 0, transparent 60%), #d1f2eb',
    'radial-gradient(at 100% 0%, #d1f2eb 0, transparent 60%), radial-gradient(at 0% 100%, #fff1cc 0, transparent 60%), #aed6f1',
    'radial-gradient(at 50% 0%, #aed6f1 0, transparent 70%), radial-gradient(at 50% 100%, #d1f2eb 0, transparent 70%), #fff1cc',
    'radial-gradient(at 0% 50%, #fff1cc 0, transparent 60%), radial-gradient(at 100% 50%, #d1f2eb 0, transparent 60%), #aed6f1',
  ]

  return (
    <div 
      className="what-we-do-inner"
      style={{ 
        height: '100vh', 
        width: '100vw',
        background: 'linear-gradient(to bottom, #f0f9ff, #fdfcf0)',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
      }}
    >
      {/* Wrapper to allow the white cutout to sit perfectly on top of the bordered yellow card */}
      <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
        
        {/* YELLOW CARD WITH MOVING GRADIENT */}
        <motion.div 
          initial={{ background: gradients[0] }}
          animate={{ 
            background: gradients[gradientIndex % gradients.length]
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            flex: 1,
            borderRadius: '32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '100px 60px 60px 60px',
            overflow: 'hidden', // Keeps carousel cards inside the yellow card
          }}
        >
          <AnimatedText 
            text="What We Do"
            textClassName="text-6xl font-normal tracking-tight text-[#0B2228]"
            underlineClassName="text-[#0B2228] opacity-30"
            className="mb-12"
            style={{ fontFamily: 'var(--font-lexend)' }}
          />

          <div style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            position: 'relative',
            zIndex: 6,
          }}>
            <StaggerProjects onMove={() => setGradientIndex(prev => prev + 1)} />
          </div>
        </motion.div>

        {/* WHITE CUTOUT BOX WITH BORDERS */}
        <div style={{
          position: 'absolute',
          top: '-2px', // Pulls up to perfectly cover the yellow card's top border
          left: '-2px', // Pulls left to perfectly cover the yellow card's left border
          padding: '0 32px 32px 0', // Creates the white gap around the dark pill
          background: '#f8fafc',
          borderBottomRightRadius: '40px', // The smooth curve of the notch
          zIndex: 10,
        }}>
          {/* Dark Pill "Our Impact" */}
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
              fontSize: '1.1rem',
              fontWeight: 600,
            }}>
              Our Impact
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
