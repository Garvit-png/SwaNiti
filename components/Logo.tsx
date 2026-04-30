/**
 * Logo Component - SvaNiti Replica
 * Geometric teal logo with white angular cut on top-right
 */

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: { width: 70, height: 70, cutSize: 22 },
    md: { width: 120, height: 120, cutSize: 38 },
    lg: { width: 180, height: 180, cutSize: 58 }
  }

  const { width, height, cutSize } = sizes[size]

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Main geometric teal logo - trapezoid shape */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 180 180"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Teal gradient background */}
        <defs>
          <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1B8A94" />
            <stop offset="100%" stopColor="#0D5A61" />
          </linearGradient>
        </defs>

        {/* Trapezoid shape - main logo body */}
        <polygon
          points="30,20 150,20 170,170 10,170"
          fill="url(#tealGradient)"
        />

        {/* Geometric center pattern - circular with rays */}
        <circle cx="90" cy="95" r="35" fill="none" stroke="#4DA6B0" strokeWidth="2" opacity="0.6" />
        <circle cx="90" cy="95" r="28" fill="none" stroke="#4DA6B0" strokeWidth="1.5" opacity="0.4" />
        <circle cx="90" cy="95" r="18" fill="none" stroke="#4DA6B0" strokeWidth="2" opacity="0.7" />

        {/* Radiating lines from center */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 90 + Math.cos(rad) * 18
          const y1 = 95 + Math.sin(rad) * 18
          const x2 = 90 + Math.cos(rad) * 38
          const y2 = 95 + Math.sin(rad) * 38
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#4DA6B0"
              strokeWidth="1.5"
              opacity="0.6"
            />
          )
        })}
      </svg>

      {/* White angular cut overlay - top right corner */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderLeft: `${cutSize}px solid transparent`,
          borderTop: `${cutSize}px solid #fff1cc`,
          pointerEvents: 'none',
          zIndex: 3
        }}
      />
    </div>
  )
}
