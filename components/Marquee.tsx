import React from 'react'
import { motion } from 'framer-motion'

const tags = [
  "Inspiration",
  "Notions",
  "People's Aspiration",
  "Unconventional",
  "Non-Partisan",
  "Policy",
  "Inspiration",
  "Notions",
  "People's Aspiration",
  "Unconventional",
  "Non-Partisan",
  "Policy",
]

const Marquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {tags.map((tag, idx) => (
          <div key={idx} className="marquee-item">
            {tag}
            <span className="marquee-dot">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marquee
