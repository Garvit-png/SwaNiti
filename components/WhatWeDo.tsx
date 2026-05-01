import React from 'react'
import { motion } from 'framer-motion'
import { useIsMobile } from './hooks/useIsMobile'

export default function WhatWeDo() {
  const isMobile = useIsMobile()

  const cards = [
    {
      title: 'Sva-Bharat Movement',
      text: 'Change in Bharat begins with a movement, not just a policy.\n\nSva-Bharat Movement by SvaNiti channels the aspirations of the people, uniting ideas and voices through regional and campus ambassadors to shape a transformative future.',
      accent: '#d1f2eb',
      offset: '0px',
    },
    {
      title: 'Viksit Bharat Darshan Yatra',
      text: 'Viksit Bharat Darshan Yatra honors the Prime Minister’s mission for a Developed India by 2047, emphasizing self-discovery through solo, purposeful, and philosophical journeys, shaping individuals with purpose for Vikshit Yuva for Viksit Bharat.',
      accent: '#fff1cc',
      offset: '0px',
    },
    {
      title: 'LifeSite (जीवन-स्थल) Conceptualization',
      text: 'LifeSite originated from a seven-year pilot research project initiated by our founder, aimed at exploring an education system that transcends traditional schools, colleges, and universities, addressing the needs of the current era.',
      accent: '#e7f3ff',
      offset: '0px',
    },
    {
      title: 'Creative Economy Affairs',
      text: 'The creative economy holds the potential to be a powerful multiplier for our economy, unlocking new opportunities in employment, tourism, exports, innovation, and social inclusion. Our proposal to establish a dedicated ministry aims to strengthen initiatives and streamline regulations within this dynamic sector.',
      accent: '#f7efe1',
      offset: '0px',
    },
  ]

  return (
    <section 
      id="projects"
      className="what-we-do-inner section-padding"
      style={{ 
        minHeight: isMobile ? 'auto' : '100vh', 
        width: '100%',
        background: '#fff',
        padding: isMobile ? '18px 12px 34px' : '54px 48px 70px',
        boxSizing: 'border-box',
        display: 'flex',
        paddingTop: isMobile ? '24px' : '48px',
        paddingBottom: isMobile ? '24px' : '48px',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <span id="governance" className="anchor-offset" aria-hidden="true" />
      <div className="what-we-do-soft-shape" aria-hidden="true" />
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '18px' : '28px',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'flex-start' : 'flex-end',
          gap: '20px',
          flexDirection: isMobile ? 'column' : 'row',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
              What We Do
            </div>
            <h2 className="section-heading">Ideas, research, and public action.</h2>
          </div>

          <p style={{ 
            maxWidth: isMobile ? '100%' : '420px',
            margin: 0,
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: 1.7,
            color: 'rgba(11, 34, 40, 0.72)',
          }}>
            SvaNiti turns community aspirations into simple research, journeys, and policy ideas that people can understand and act on.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
          gap: isMobile ? '14px' : '22px',
          alignItems: 'start',
        }}>
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              style={{
                gridColumn: 'auto',
                marginTop: card.offset,
                borderRadius: '30px',
                padding: isMobile ? '22px' : '34px',
                background: card.accent,
                border: '1px solid rgba(11, 34, 40, 0.08)',
                boxShadow: '0 18px 48px rgba(11,34,40,0.06)',
                minHeight: isMobile ? 'auto' : '430px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{
                  margin: 0,
                  marginBottom: '14px',
                  fontSize: isMobile ? '1.2rem' : '1.38rem',
                  fontWeight: 700,
                  color: '#0B2228',
                  fontFamily: 'var(--font-lexend)',
                  lineHeight: 1.18,
                }}>
                  {card.title}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: isMobile ? '0.95rem' : '0.98rem',
                  lineHeight: 1.72,
                  color: 'rgba(11, 34, 40, 0.78)',
                  maxWidth: '34ch',
                  whiteSpace: 'pre-line',
                }}>
                  {card.text}
                </p>
              </div>

              <div style={{
                marginTop: '28px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#0B2228',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                }}>
                  Learn More
                  <span style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '11px',
                    background: '#c1f1f1',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
