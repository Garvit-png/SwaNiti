'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const images = [
  { src: '/gallery/img1.jpg', alt: 'Award Ceremony at Rishihood University' },
  { src: '/gallery/img2.jpg', alt: 'Engagement and Discussion with Students' },
  { src: '/gallery/img3.jpg', alt: 'Community Outreach & Rural Education' },
  { src: '/gallery/img4.jpg', alt: 'SvaNiti Team at Rashtrapati Bhavan' },
  { src: '/gallery/img5.jpg', alt: 'Building Bharat with the SvaNiti Team' },
]

export default function ImageGallery() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const smooth = useRef({ x: 0.5, y: 0.5 })
  const rafId = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    const animate = () => {
      const lerp = 0.05
      smooth.current.x += (mouse.current.x - smooth.current.x) * lerp
      smooth.current.y += (mouse.current.y - smooth.current.y) * lerp

      const x = (smooth.current.x * 100).toFixed(2)
      const y = (smooth.current.y * 100).toFixed(2)

      container.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(180, 255, 230, 0.45) 0%, transparent 50%),
        #ffffff
      `
      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  const getFlexValue = (index: number) => {
    if (hoveredIndex === null) return 1
    return hoveredIndex === index ? 2.5 : 0.5
  }

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) setSelectedIndex((selectedIndex + 1) % images.length)
  }

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="gallery-container">
      <section ref={containerRef} className="gallery-section framed-card">
        {/* Header */}
        <div className="gallery-header">
          <span className="section-label">OUR JOURNEY</span>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Moments That Matter</h2>
          <p className="gallery-subtitle">
            Real people, real impact — building Bharat one conversation at a time.
          </p>
        </div>

        {/* Expandable Strip */}
        <div className="gallery-strip">
          {images.map((img, index) => (
            <motion.div
              key={index}
              style={{ flex: 1, position: 'relative', cursor: 'pointer', overflow: 'hidden', borderRadius: '16px' }}
              animate={{ flex: getFlexValue(index) }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <motion.div
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', pointerEvents: 'none' }}
                animate={{ opacity: hoveredIndex === index ? 0 : 0.4 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '20px', background: 'linear-gradient(to top, rgba(11,34,40,0.85) 0%, transparent 100%)',
                  pointerEvents: 'none',
                }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span style={{ color: 'white', fontFamily: 'var(--font-lexend)', fontSize: '0.95rem', fontWeight: 500 }}>
                  {img.alt}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
              style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(11, 34, 40, 0.95)', padding: '24px',
              }}
            >
              <button
                onClick={() => setSelectedIndex(null)}
                style={{
                  position: 'absolute', top: 20, right: 20, background: 'transparent',
                  border: 'none', cursor: 'pointer', color: 'white', zIndex: 10,
                }}
              >
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={goPrev}
                style={{
                  position: 'absolute', left: 20, background: 'transparent',
                  border: 'none', cursor: 'pointer', color: 'white', zIndex: 10,
                }}
              >
                <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <motion.div
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: '80vw', maxHeight: '85vh', width: '100%' }}
              >
                <motion.img
                  key={selectedIndex}
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].alt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '100%', height: '100%', objectFit: 'contain',
                    borderRadius: '12px', display: 'block',
                  }}
                />
                <p style={{
                  color: 'rgba(255,255,255,0.7)', textAlign: 'center',
                  marginTop: '12px', fontSize: '0.9rem', fontFamily: 'var(--font-lexend)',
                }}>
                  {images[selectedIndex].alt}
                </p>
              </motion.div>

              <button
                onClick={goNext}
                style={{
                  position: 'absolute', right: 20, background: 'transparent',
                  border: 'none', cursor: 'pointer', color: 'white', zIndex: 10,
                }}
              >
                <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div style={{
                position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
                background: 'rgba(255,255,255,0.1)', color: 'white',
                padding: '6px 18px', borderRadius: '100px', fontSize: '0.85rem',
                fontFamily: 'var(--font-lexend)', backdropFilter: 'blur(8px)',
              }}>
                {selectedIndex + 1} / {images.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
