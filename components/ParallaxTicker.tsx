'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type TickerItem =
  | { text: string; type: 'yellow' | 'cyan' }
  | { img: string }

const row1: TickerItem[] = [
  { text: 'Inspiration', type: 'yellow' },
  { img: '/gallery/img1.jpg' },
  { text: 'Notions', type: 'cyan' },
  { img: '/gallery/img2.jpg' },
]

const row2: TickerItem[] = [
  { text: "People's Aspiration", type: 'cyan' },
  { img: '/gallery/img4.jpg' },
  { text: 'Unconventional', type: 'yellow' },
  { img: '/gallery/img5.jpg' },
]

const row3: TickerItem[] = [
  { text: 'Non-Partisan', type: 'yellow' },
  { img: '/gallery/img2.jpg' },
  { text: 'Policy', type: 'cyan' },
  { img: '/gallery/img3.jpg' },
]

export default function ParallaxTicker() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const measure = () => setWidth(el.getBoundingClientRect().width)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const range = Math.max(200, width * 0.25)
  const baseLeft = useTransform(scrollYProgress, [0, 1], [-range, range])
  const baseRight = useTransform(scrollYProgress, [0, 1], [range, -range])

  const xLeft = useSpring(baseLeft, { stiffness: 100, damping: 30, restDelta: 0.5 })
  const xRight = useSpring(baseRight, { stiffness: 100, damping: 30, restDelta: 0.5 })

  const renderRow = (data: TickerItem[], x: any) => (
    <div className="parallax-row-wrapper" style={{ overflow: 'hidden' }}>
      <motion.div
        style={{ x, willChange: 'transform', display: 'flex', width: 'fit-content', gap: '20px' }}
        className="parallax-row"
      >
        {[...data, ...data].map((item, idx) => (
          <div key={idx} className="parallax-item" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {'text' in item ? (
              <div className={`parallax-tag tag-${item.type}`}>
                {item.text}
              </div>
            ) : (
              <div className="parallax-img-wrapper">
                <Image
                  src={item.img}
                  alt="Moment"
                  fill
                  sizes="(max-width: 768px) 80px, 150px"
                  className="parallax-img"
                  loading="lazy"
                  quality={60}
                />
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  )

  return (
    <div
      ref={containerRef}
      className="parallax-ticker-container"
      style={{
        background: 'linear-gradient(to bottom, #f8fafc, #f0f9ff)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '0',
        margin: 0,
        gap: '40px',
      }}
    >
      {renderRow(row1, xLeft)}
      {renderRow(row2, xRight)}
      {renderRow(row3, xLeft)}
    </div>
  )
}
