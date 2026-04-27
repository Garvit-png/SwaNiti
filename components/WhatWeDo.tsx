'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { StaggerProjects } from '@/components/ui/stagger-testimonials'
import FloatingPaths from '@/components/FloatingPaths'

export default function WhatWeDo() {
  const title = "What We Do"
  const words = title.split(" ")

  return (
    <section className="what-we-do-container">
      <div 
        className="what-we-do-inner framed-card" 
        style={{ 
          minHeight: '100vh', 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          padding: '50px 60px',
          background: '#fff9e6',
          position: 'relative'
        }}
      >
        {/* BACKGROUND ANIMATION */}
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />

        <div className="centered-heading-wrapper" style={{ marginBottom: '50px', position: 'relative', zIndex: 10 }}>
          <span className="heading-tag" style={{ 
            letterSpacing: '0.2em', 
            background: 'transparent', 
            color: '#0B2228', 
            border: '2px solid rgba(11, 34, 40, 0.4)',
            padding: '10px 24px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            OUR IMPACT
          </span>
          <h2 className="what-we-do-heading-short" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            fontWeight: 500,
            fontSize: '3.4rem', 
            letterSpacing: '0.01em',
            marginTop: '25px',
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
        
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <StaggerProjects />
        </div>
      </div>

      <div className="vision-section framed-card" style={{ 
        background: '#e0fcf8', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '100px',
        position: 'relative',
        overflow: 'hidden'
      }}>
         <FloatingPaths position={1} />
         
         <div className="centered-heading-wrapper" style={{ position: 'relative', zIndex: 10 }}>
          <span className="heading-tag" style={{ fontWeight: 700 }}>THE FUTURE</span>
          <h2 className="what-we-do-heading-short" style={{ fontWeight: 500, fontSize: '3.4rem', marginTop: '30px', color: '#0B2228' }}>Our Vision</h2>
        </div>
         <div style={{ maxWidth: '800px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
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
