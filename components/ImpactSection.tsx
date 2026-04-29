'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImpactSection() {
  return (
    <section
      className="impact-section"
      style={{
        padding: '20px',
        background: '#f8fafc',
        minHeight: '100vh',
        display: 'flex',
      }}
    >
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{
            width: 'fit-content',
            background: '#0B2228',
            color: 'white',
            borderRadius: '999px',
            padding: '10px 16px',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}>
            What people tell about us?
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="control-btn" style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: 'white',
              border: '1px solid rgba(11,34,40,0.08)',
              color: '#0B2228',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(11,34,40,0.06)',
            }}>
              <ChevronLeft size={22} />
            </button>
            <button className="control-btn" style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: '#0B2228',
              border: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(11,34,40,0.12)',
            }}>
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '16px',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              gridColumn: 'span 12',
              background: '#0B2228',
              color: 'white',
              borderRadius: '28px',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <p style={{
              margin: 0,
              fontSize: 'clamp(1.8rem, 5vw, 3rem)',
              lineHeight: 1.2,
              fontFamily: 'var(--font-lexend)',
              fontWeight: 300,
              maxWidth: '900px',
            }}>
              "The idea of SvaNiti is much needed and Aadil has much more clarity on this idea at this initial stage."
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
                  Jigar Inamdar (Youth Leader & Politician)
                </h4>
                <p style={{ opacity: 0.6, fontSize: '0.95rem', lineHeight: 1.5, margin: 0 }}>
                  PBC 2024, Rishihood University.
                </p>
              </div>

              <div style={{
                background: '#e0fcf8',
                color: '#0B2228',
                padding: '10px 14px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 700,
              }}>
                Community voices
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            style={{
              gridColumn: 'span 12',
              background: '#e0fcf8',
              borderRadius: '24px',
              padding: '24px',
              color: '#0B2228',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ maxWidth: '520px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '10px', lineHeight: 1.2 }}>
                Contact us for any notion for nation
              </h3>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, opacity: 0.78 }}>
                If you want to collaborate, share an idea, or bring a community question forward, we are listening.
              </p>
            </div>

            <button style={{
              background: '#0B2228',
              color: 'white',
              padding: '14px 22px',
              borderRadius: '14px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>
              Let's Talk, What you got!
            </button>
          </motion.div>

          <div style={{
            gridColumn: 'span 12',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
          }}>
            {['Research-backed', 'Movement-led', 'Policy-ready', 'Community-first'].map((item) => (
              <div key={item} style={{
                background: 'white',
                borderRadius: '18px',
                border: '1px solid rgba(11,34,40,0.08)',
                padding: '16px 18px',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#0B2228',
                boxShadow: '0 8px 24px rgba(11,34,40,0.04)',
              }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
