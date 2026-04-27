import React from 'react'
import { StaggerProjects } from '@/components/ui/stagger-testimonials'

export default function WhatWeDo() {
  return (
    <div 
      className="what-we-do-inner"
      style={{ 
        height: '100vh', 
        width: '100vw',
        background: 'white',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
      }}
    >
      {/* Wrapper to allow the white cutout to sit perfectly on top of the bordered yellow card */}
      <div style={{ position: 'relative', flex: 1, display: 'flex' }}>
        
        {/* YELLOW CARD */}
        <div style={{
          flex: 1,
          background: '#fff3c4',
          border: '2px solid #0B2228',
          borderRadius: '32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '60px',
          overflow: 'hidden', // Keeps carousel cards inside the yellow card
        }}>
          {/* Curved "What We Do" heading — SVG textPath arc */}
          <svg
            viewBox="0 0 800 120"
            style={{ width: '80%', maxWidth: '700px', marginBottom: '30px', overflow: 'visible', zIndex: 6, position: 'relative' }}
          >
            <defs>
              <path
                id="textCurve"
                d="M 50,90 Q 400,10 750,90"
              />
            </defs>
            <text
              fill="#0B2228"
              fontSize="62"
              fontWeight="500"
              fontFamily="var(--font-inter), sans-serif"
              letterSpacing="-1"
            >
              <textPath href="#textCurve" startOffset="50%" textAnchor="middle">
                What We Do
              </textPath>
            </text>
          </svg>

          <div style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center', 
            position: 'relative',
            zIndex: 6,
          }}>
            <StaggerProjects />
          </div>
        </div>

        {/* WHITE CUTOUT BOX WITH BORDERS */}
        <div style={{
          position: 'absolute',
          top: '-2px', // Pulls up to perfectly cover the yellow card's top border
          left: '-2px', // Pulls left to perfectly cover the yellow card's left border
          padding: '0 32px 32px 0', // Creates the white gap around the dark pill
          background: 'white',
          borderRight: '2px solid #0B2228', // Draws the notch's right border
          borderBottom: '2px solid #0B2228', // Draws the notch's bottom border
          borderBottomRightRadius: '40px', // The smooth curve of the notch
          zIndex: 10,
        }}>
          {/* Dark Pill "Our Impact" */}
          <div style={{
            background: '#0B2228',
            padding: '16px 32px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 600,
            }}>
              Our Impact
            </span>
          </div>
        </div>

      </div>
    </div>
  )
}
