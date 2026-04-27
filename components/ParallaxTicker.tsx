'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
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

  // Using useTransform but with more optimized values
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-150px", "150px"])
  const xRight = useTransform(scrollYProgress, [0, 1], ["150px", "-150px"])

  const renderRow = (data: any[], x: any) => (
    <div className="parallax-row-wrapper" style={{ overflow: 'hidden' }}>
      <motion.div 
        style={{ x, willChange: 'transform' }} 
        className="parallax-row"
      >
        {[...data, ...data].map((item, idx) => (
          <div key={idx} className="parallax-item" style={{ gap: '50px' }}>
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
    <div ref={containerRef} className="parallax-ticker-container framed-card">
      {renderRow(row1, xLeft)}
      {renderRow(row2, xRight)}
      {renderRow(row3, xLeft)}
    </div>
  )
}
