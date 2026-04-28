import React from 'react';
import TestimonialSlider from '@/components/ui/TestimonialSlider';

export default function TestimonialCarousel() {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(to bottom, #f0f9ff, #fdfcf0)',
      padding: '40px', // Perfectly symmetrical gap
      boxSizing: 'border-box',
      display: 'flex',
    }}>
      <div className="framed-card" style={{
        flex: 1,
        height: '100%',
        background: '#0B2228',
        borderRadius: '32px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px',
        overflow: 'hidden'
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '12px 24px',
          borderRadius: '8px',
          marginBottom: '60px',
          zIndex: 20
        }}>
          <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>What people tell about us?</span>
        </div>

        <TestimonialSlider />
      </div>
    </div>
  );
}
