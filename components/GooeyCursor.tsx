"use client"

import React, { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

const GooeyFilter = ({
  id = "goo-filter",
  strength = 10,
}: {
  id?: string
  strength?: number
}) => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>

      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={strength}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo"
          />
        </filter>
      </defs>
    </svg>
  )
}

const GooeyCursor = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Use springs for smooth movement
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 })

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ 
        filter: 'url(#goo-filter)',
        zIndex: 1
      }}
    >

      {/* Main Cursor Blob */}
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#4ade80', // bright green
          opacity: 0.8,
        }}
      />

      {/* Persistent Decorative Blobs for "Melting" Effect */}
      <div className="absolute top-[15%] left-[25%] w-64 h-64 rounded-full" style={{ backgroundColor: '#fde047', opacity: 0.6 }} />
      <div className="absolute bottom-[20%] right-[20%] w-80 h-80 rounded-full" style={{ backgroundColor: '#2dd4bf', opacity: 0.6 }} />
      <div className="absolute top-[45%] left-[55%] w-56 h-56 rounded-full" style={{ backgroundColor: '#22d3ee', opacity: 0.6 }} />
      <div className="absolute top-[70%] left-[15%] w-48 h-48 rounded-full" style={{ backgroundColor: '#4ade80', opacity: 0.6 }} />
    </div>
  )
}





export { GooeyFilter, GooeyCursor }
