'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StaggerProjects } from '@/components/ui/stagger-testimonials'

export default function WhatWeDo() {
  const title = "What We Do"
  const words = title.split(" ")

  return (
    <section className="what-we-do-container" style={{ background: 'linear-gradient(to bottom, #fff9e6 0%, #fff9e6 50%, #e0fcf8 100%)' }}>
      <div 
        className="what-we-do-inner" 
        style={{ 
          minHeight: '100vh', 
          width: '100%',
          position: 'relative', /* Fix: Contain the absolute tag */
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px',
          background: 'transparent'
        }}
      >
        <div style={{ position: 'absolute', top: '60px', left: '60px' }}>
          <span className="heading-tag" style={{ 
            letterSpacing: '0.15em', 
            background: '#0B2228', 
            color: 'white', 
            padding: '12px 20px',
            fontSize: '0.8rem',
            fontWeight: 700,
            borderRadius: '6px'
          }}>
            OUR IMPACT
          </span>
        </div>
        <div className="centered-heading-wrapper" style={{ marginBottom: '60px', marginTop: '20px' }}>
          <h2 className="what-we-do-heading-short" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            fontWeight: 500,
            fontSize: '3.8rem', 
            letterSpacing: '-0.01em',
            color: '#0B2228'
          }}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block', marginRight: '15px' }}>
                    {word.split("").map((letter, letterIndex) => (
                        <motion.span
                            key={`${wordIndex}-${letterIndex}`}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: wordIndex * 0.1 + letterIndex * 0.03,
                                duration: 0.8,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            style={{ display: 'inline-block' }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </span>
            ))}
          </h2>
        </div>
        
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
          <StaggerProjects />
        </div>
      </div>

      <div className="vision-section" style={{ 
        background: 'transparent', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '100px'
      }}>
         <div className="centered-heading-wrapper">
          <span className="heading-tag" style={{ background: '#0B2228', color: 'white', padding: '10px 24px', borderRadius: '8px', fontWeight: 700 }}>THE FUTURE</span>
          <h2 className="what-we-do-heading-short" style={{ fontWeight: 500, fontSize: '3.4rem', marginTop: '30px', color: '#0B2228' }}>Our Vision</h2>
        </div>
         <div style={{ maxWidth: '800px', textAlign: 'center' }}>
            <p style={{ 
              fontSize: '1.4rem', 
              lineHeight: 1.8, 
              color: '#0B2228', 
              fontWeight: 400,
              opacity: 0.8 
            }}>
              To redefine the policy landscape of Bharat by bridging the gap between grassroots aspirations and national governance through evidence-based research and creative economic affairs.
            </p>
         </div>
      </div>
    </section>
  )
}
