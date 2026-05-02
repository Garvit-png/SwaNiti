"use client"

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { useIsMobile } from './hooks/useIsMobile'

export default function VisionSection({ isMobile }: { isMobile?: boolean }) {
  const mobile = useIsMobile()
  const isPhone = typeof isMobile === 'boolean' ? isMobile : mobile

  const headingVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const lineVariants: Variants = {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <motion.div
      id="about"
      className="vision-section-wrapper"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.18 }}
      style={{
        minHeight: isPhone ? 'auto' : '65vh',
        width: '100%',
        background: 'linear-gradient(to bottom, #fdfcf0, #f8fafc)',
        padding: isPhone ? '10px' : '20px',
        boxSizing: 'border-box',
        display: 'flex',
        position: 'relative',
      }}
    >
      <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
        <div
          className="vision-card"
          style={{
            flex: 1,
            background: '#d4fdf8',
            borderRadius: isPhone ? '24px' : '32px',
            display: 'flex',
            flexDirection: 'column',
            padding: isPhone ? '30px' : '80px',
            /* keep room on desktop for the cutout; on phone the badge sits in normal flow */
            paddingTop: isPhone ? '28px' : '120px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* positioned badge at top-left (no cutout) */}
          <div
            style={{
              position: isPhone ? 'relative' : 'absolute',
              top: isPhone ? '0' : '18px',
              left: isPhone ? '0' : '18px',
              zIndex: 6,
              marginBottom: isPhone ? '18px' : 0,
              alignSelf: isPhone ? 'flex-start' : 'auto',
            }}
          >
            <div style={{
              background: '#0B2228',
              color: 'white',
              borderRadius: '999px',
              padding: isPhone ? '8px 12px' : '10px 16px',
              fontSize: isPhone ? '0.75rem' : '0.9rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              boxShadow: '0 6px 18px rgba(11,34,40,0.12)'
            }}>
              Our Vision
            </div>
          </div>
          <div
            className="vision-content-container"
            style={{
              marginTop: isPhone ? '8px' : 'auto',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: isPhone ? 'flex-start' : 'flex-end',
              flexDirection: isPhone ? 'column' : 'row',
              gap: isPhone ? '20px' : '40px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
                <motion.div
                variants={headingVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <motion.div variants={lineVariants} style={{ fontSize: isPhone ? '2.2rem' : '5rem', fontWeight: 400, color: '#0B2228', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, fontFamily: 'var(--font-lexend)' }}>
                  Inspiring Aspirations,
                </motion.div>
                <motion.div variants={lineVariants} style={{ fontSize: isPhone ? '2.2rem' : '5rem', fontWeight: 400, color: '#0B2228', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, fontFamily: 'var(--font-lexend)' }}>
                  Designing Policy,
                </motion.div>
                <motion.div variants={lineVariants} style={{ fontSize: isPhone ? '2.2rem' : '5rem', fontWeight: 400, color: '#0B2228', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, fontFamily: 'var(--font-lexend)' }}>
                  Building Nation.
                </motion.div>
              </motion.div>
            </div>

            <motion.p
              className="vision-description"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
              style={{
                fontSize: isPhone ? '0.95rem' : '1.05rem',
                color: '#0B2228',
                maxWidth: '450px',
                lineHeight: 1.6,
                margin: 0,
                paddingBottom: isPhone ? '0' : '16px',
                opacity: 0.95,
                fontWeight: 500,
              }}
            >
              We exist to spark a movement that rethinks the policy-making
              process, rejuvenates education with Indic ideas, and be a vital cog
              in the mission towards Viksit Bharat.
            </motion.p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
