"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 0,
    quote: "The idea of SvaNiti is much needed and Aadil has much more clarity on this idea at this initial stage.",
    author: "Jigar Inamdar",
    role: "Youth Leader & Politician",
    event: "PBC 2024, Rishihood University",
    image: "/gallery/Jigar Inamdar.png"
  },
  {
    id: 1,
    quote: "It's need of time that our country needs Creative Economy Ministry. SvaNiti is Bang on promoting idea and research on the same.",
    author: "Sheron",
    role: "Creative Artist",
    event: "Nudge Charcha 2024",
    image: "/testimonials/sheron.png"
  }
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div style={{
      height: '75vh',
      width: '100vw',
      padding: '40px',
      boxSizing: 'border-box',
      background: '#f8fafc',
    }}>
      {/* Framed card with skyblue gradient */}
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '32px',
        border: '2px solid #0B2228',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #bfecff 0%, #dff6ff 50%, #f0fbff 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 60px 60px 140px',
        boxSizing: 'border-box',
      }}>

        {/* Top-left label */}
        <div style={{
          position: 'absolute',
          top: '50px',
          left: '60px',
          zIndex: 10,
        }}>
          <span style={{
            color: '#0B2228',
            fontSize: '0.95rem',
            fontWeight: 600,
            opacity: 0.55,
            letterSpacing: '0.02em',
          }}>
            What people tell about us?
          </span>
        </div>

        {/* Dot indicator - bottom left */}
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '60px',
          display: 'flex',
          gap: '8px',
          zIndex: 10,
        }}>
          {testimonials.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              style={{
                width: i === index ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === index ? '#0B2228' : 'rgba(11,34,40,0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Testimonial Card */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1000px',
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{
                display: 'flex',
                alignItems: 'stretch',
                gap: '24px',
                width: '100%',
              }}
            >
              {/* Text Card */}
              <div style={{ 
                flex: 1,
                background: 'white',
                padding: '60px',
                borderRadius: '24px',
                boxShadow: '0 24px 60px rgba(11, 34, 40, 0.08)',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <p style={{
                  fontSize: '1.6rem',
                  lineHeight: 1.45,
                  color: '#0B2228',
                  fontFamily: 'var(--font-inter)',
                  fontWeight: 500,
                  marginBottom: '40px',
                }}>
                  "{testimonials[index % testimonials.length]?.quote || ''}"
                </p>
                <div style={{ marginTop: 'auto' }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0B2228', marginBottom: '4px' }}>
                    {testimonials[index % testimonials.length]?.author}
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                    {testimonials[index % testimonials.length]?.role} · {testimonials[index % testimonials.length]?.event}
                  </p>
                </div>
              </div>
              
              {/* Photo Card */}
              <div style={{
                width: '380px',
                background: 'white',
                padding: '20px',
                borderRadius: '24px',
                boxShadow: '0 24px 60px rgba(11, 34, 40, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#f8fafc',
                }}>
                  <img 
                    src={testimonials[index % testimonials.length]?.image} 
                    alt={testimonials[index % testimonials.length]?.author}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      const author = testimonials[index % testimonials.length]?.author || 'User';
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}&background=0B2228&color=fff&size=400`;
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons — vertical stack on the right */}
        <div style={{
          position: 'absolute',
          right: '60px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          zIndex: 10,
        }}>
          <button
            onClick={next}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: '#0B2228',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronRight color="white" size={22} />
          </button>
          <button
            onClick={prev}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: 'rgba(11,34,40,0.1)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ChevronLeft color="#0B2228" size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
