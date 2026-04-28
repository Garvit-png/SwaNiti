"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 0,
    quote: "The idea of SvaNiti is much needed and Aadil has much more clarity on this idea at this initial stage.",
    author: "Jigar Inamdar (Youth Leader & Politician)",
    subtitle: "PBC 2024, Rishihood University.",
    color: '#FDFBF0'
  },
  {
    id: 1,
    quote: "It's need of time that our country needs Creative Economy Ministry. SvaNiti is Bang on promoting idea and research on the same.",
    author: "Sheron (Creative Artist)",
    subtitle: "Nudge Charcha 2024",
    color: '#E0FCF8'
  },
  {
    id: 2,
    quote: "SvaNiti's approach to local governance and policy research is exactly what we need for a Viksit Bharat.",
    author: "Rohan Gupta (Policy Analyst)",
    subtitle: "NITI Aayog Workshop 2024",
    color: '#FDFBF0'
  }
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);

  const handleMove = (steps: number) => {
    setIndex((prev) => (prev + steps + testimonials.length) % testimonials.length);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {testimonials.map((t, i) => {
          const position = i - index;
          const isCenter = position === 0;
          const isVisible = Math.abs(position) <= 1;

          return (
            <motion.div
              key={t.id}
              initial={false}
              animate={{
                x: 400 * position,
                scale: isCenter ? 1 : 0.85,
                opacity: isVisible ? (isCenter ? 1 : 0.5) : 0,
                zIndex: isCenter ? 10 : 5,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
              style={{
                position: 'absolute',
                width: '600px',
                background: t.color,
                borderRadius: '32px',
                padding: '60px',
                boxShadow: isCenter ? '0 30px 60px rgba(0,0,0,0.1)' : '0 10px 30px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: '#0B2228'
              }}
            >
              <p style={{
                fontSize: '1.4rem',
                lineHeight: 1.5,
                fontFamily: 'var(--font-inter)',
                fontWeight: 500,
                marginBottom: '40px'
              }}>
                "{t.quote}"
              </p>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{t.author}</h4>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{t.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '20px',
        zIndex: 20
      }}>
        <button 
          onClick={() => handleMove(-1)}
          style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <ChevronLeft color="#0B2228" />
        </button>
        <button 
          onClick={() => handleMove(1)}
          style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fff', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        >
          <ChevronRight color="#0B2228" />
        </button>
      </div>
    </div>
  );
}
