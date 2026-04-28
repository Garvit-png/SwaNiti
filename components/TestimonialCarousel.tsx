"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 0,
    quote: "The idea of SvaNiti is much needed and Aadil has much more clarity on this idea at this initial stage.",
    author: "Jigar Inamdar (Youth Leader & Politician)",
    subtitle: "PBC 2024, Rishihood University."
  },
  {
    id: 1,
    quote: "It's need of time that our country needs Creative Economy Ministry. SvaNiti is Bang on promoting idea and research on the same.",
    author: "Sheron (Creative Artist)",
    subtitle: "Nudge Charcha 2024"
  },
  {
    id: 2,
    quote: "SvaNiti's approach to local governance and policy research is exactly what we need for a Viksit Bharat.",
    author: "Rohan Gupta (Policy Analyst)",
    subtitle: "NITI Aayog Workshop 2024"
  }
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div style={{
      height: '60vh', // Even shorter height
      width: '100vw',
      padding: '40px',
      boxSizing: 'border-box',
      background: '#f8fafc',
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '32px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          padding: '30px' // Tighter padding
        }}
      >
        {/* Skyblue Gradient Background */}
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          zIndex: 0,
          background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)'
        }} />

        {/* Label */}
        <div style={{
          position: 'absolute',
          top: '30px',
          left: '30px',
          zIndex: 10
        }}>
          <span style={{ color: '#0B2228', fontSize: '0.85rem', fontWeight: 600, opacity: 0.6 }}>
            What people tell about us?
          </span>
        </div>

        {/* Testimonial Card */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '600px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'white',
                padding: '30px 50px',
                borderRadius: '20px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.08)'
              }}
            >
              <p style={{
                fontSize: '1.4rem',
                lineHeight: 1.4,
                color: '#0B2228',
                fontFamily: 'var(--font-inter)',
                fontWeight: 500,
                marginBottom: '24px'
              }}>
                "{testimonials[index].quote}"
              </p>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0B2228' }}>{testimonials[index].author}</h4>
                <p style={{ color: '#64748b', fontSize: '0.85rem' }}>{testimonials[index].subtitle}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons (Vertical on Right) */}
        <div style={{
          position: 'absolute',
          right: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 10
        }}>
          <button 
            onClick={next}
            style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '10px', 
              background: '#E0FCF8', 
              border: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer' 
            }}
          >
            <ChevronRight color="#0B2228" size={20} />
          </button>
          <button 
            onClick={prev}
            style={{ 
              width: '48px', 
              height: '48px', 
              borderRadius: '10px', 
              background: 'rgba(255,255,255,0.4)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.05)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              cursor: 'pointer' 
            }}
          >
            <ChevronLeft color="#0B2228" size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
