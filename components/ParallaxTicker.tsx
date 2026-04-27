'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect } from 'react'

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
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const smooth = useRef({ x: 0.5, y: 0.5 })
  const rafId = useRef<number>(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const xLeft = useTransform(scrollYProgress, [0, 1], [-200, 200])
  const xRight = useTransform(scrollYProgress, [0, 1], [200, -200])

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

  const renderRow = (data: any[], x: any) => (
    <div className="parallax-row-wrapper">
      <motion.div style={{ x }} className="parallax-row">
        {[...data, ...data, ...data].map((item, idx) => (
          <div key={idx} className="parallax-item">
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
