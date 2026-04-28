'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ImpactSection() {
  return (
    <section className="impact-section" style={{
      padding: '20px',
      background: '#f8fafc',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div className="framed-card" style={{
        flex: 1,
        background: '#0B2228',
        borderRadius: '32px',
        padding: '80px 60px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <h2 style={{ 
            fontSize: '1.2rem', 
            opacity: 0.6, 
            fontWeight: 400, 
            marginBottom: '60px',
            fontFamily: 'var(--font-inter)'
          }}>
            What people tell<br />about us?
          </h2>

          <div className="testimonial-content">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: '2.8rem',
                lineHeight: 1.2,
                fontFamily: 'var(--font-lexend)',
                fontWeight: 300,
                marginBottom: '80px'
              }}
            >
              "The idea of SvaNiti is much needed and Aadil has much more clarity on this idea at this initial stage."
            </motion.p>

            <div className="testimonial-author">
              <h4 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '8px' }}>
                Jigar Inamdar (Youth<br />Leader & Politician)
              </h4>
              <p style={{ opacity: 0.6, fontSize: '1rem', lineHeight: 1.5 }}>
                PBC 2024, Rishihood<br />University.
              </p>
            </div>
          </div>
        </div>

        <div className="impact-controls" style={{
          position: 'absolute',
          top: '80px',
          right: '60px',
          display: 'flex',
          gap: '12px'
        }}>
          <button className="control-btn" style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <ChevronLeft size={24} />
          </button>
          <button className="control-btn" style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: '#e0fcf8',
            border: 'none',
            color: '#0B2228',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}>
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="impact-footer" style={{
          marginTop: '100px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between'
        }}>
           <div className="cta-box" style={{
             background: '#e0fcf8',
             padding: '40px',
             borderRadius: '24px',
             color: '#0B2228',
             maxWidth: '400px'
           }}>
             <h3 style={{ fontSize: '1.8rem', fontWeight: 500, marginBottom: '24px', lineHeight: 1.2 }}>
                Contact us for any notion for nation
             </h3>
             <button style={{
               background: '#0B2228',
               color: 'white',
               padding: '14px 28px',
               borderRadius: '12px',
               border: 'none',
               fontWeight: 600,
               cursor: 'pointer'
             }}>
               Let's Talk, What you got!
             </button>
           </div>
        </div>
      </div>
    </section>
  )
}
