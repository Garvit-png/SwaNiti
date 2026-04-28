import React from 'react';
import TestimonialSlider from '@/components/ui/TestimonialSlider';

export default function TestimonialCarousel() {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(to bottom, #f0f9ff, #fdfcf0)',
      padding: '40px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: '#0B2228',
        padding: '12px 24px',
        borderRadius: '8px',
        marginBottom: '60px'
      }}>
        <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 600 }}>What people tell about us?</span>
      </div>

      <TestimonialSlider />
    </div>
  );
}
