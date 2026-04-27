import React from 'react'

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
        {/* Duplicate for seamless loop if needed, but the CSS translateX(-50%) handles it if content is wide enough */}
        {tags.map((tag, idx) => (
          <div key={`dup-${idx}`} className="marquee-item">
            {tag}
            <span className="marquee-dot">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Marquee
