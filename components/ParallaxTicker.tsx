'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'

const row1 = [
  { text: "Inspiration", type: "yellow" },
  { img: "/gallery/img1.jpg" },
  { text: "Notions", type: "cyan" },
  { img: "/gallery/img2.jpg" },
]

const row2 = [
  { text: "People's Aspiration", type: "cyan" },
  { img: "/gallery/img4.jpg" },
  { text: "Unconventional", type: "yellow" },
  { img: "/gallery/img5.jpg" },
]

const row3 = [
  { text: "Non-Partisan", type: "yellow" },
  { img: "/gallery/img2.jpg" },
  { text: "Policy", type: "cyan" },
  { img: "/gallery/img3.jpg" },
]

export default function ParallaxTicker() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const baseLeft = useTransform(scrollYProgress, [0, 1], ["-25%", "25%"])
  const baseRight = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"])

  const xLeft = useSpring(baseLeft, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const xRight = useSpring(baseRight, { stiffness: 100, damping: 30, restDelta: 0.001 })


  const renderRow = (data: any[], x: any) => (
    <div className="parallax-row-wrapper" style={{ overflow: 'hidden' }}>
      <motion.div 
        style={{ x, willChange: 'transform', display: 'flex', width: 'fit-content', gap: '20px' }} 
        className="parallax-row"
      >
        {[...data, ...data].map((item, idx) => (
          <div key={idx} className="parallax-item" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {item.text ? (
              <div className={`parallax-tag tag-${item.type}`}>
                {item.text}
              </div>
            ) : (
              <div className="parallax-img-wrapper">
                <img src={item.img} alt="Moment" className="parallax-img" />
              </div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  )

  return (
    <div ref={containerRef} className="parallax-ticker-container" style={{ 
      background: 'linear-gradient(to bottom, #f8fafc, #f0f9ff)', 
      width: '100vw',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '0',
      margin: 0
    }}>
      {renderRow(row1, xLeft)}
      {renderRow(row2, xRight)}
      {renderRow(row3, xLeft)}
    </div>
  )
}
