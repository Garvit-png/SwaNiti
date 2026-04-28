"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: "Sva-Bharat Movement",
    description: "Change in Bharat begins with a movement, not just a policy. Sva-Bharat Movement by SvaNiti channels the aspirations of the people, uniting ideas and voices through regional and campus ambassadors to shape a transformative future.",
    url: "#sva-bharat"
  },
  {
    id: 2,
    title: "Viksit Bharat Darshan Yatra",
    description: "Viksit Bharat Darshan Yatra honors the Prime Minister's mission for a Developed India by 2047, emphasizing self-discovery through solo, purposeful, and philosophical journeys, shaping individuals with purpose for Viksit Yuva for Viksit Bharat.",
    url: "#viksit-bharat"
  },
  {
    id: 3,
    title: "LifeSite (जीवन-स्थल) Conceptualization",
    description: "LifeSite originated from a seven-year pilot research project initiated by our founder, aimed at exploring an education system that transcends traditional schools, colleges, and universities, addressing the needs of the current era.",
    url: "#lifesite"
  },
  {
    id: 4,
    title: "Notion of Ministry of Creative Economy Affairs",
    description: "The creative economy holds the potential to be a powerful multiplier for our economy, unlocking new opportunities in employment, tourism, exports, innovation, and social inclusion. Our proposal to establish a dedicated ministry aims to strengthen initiatives and streamline regulations within this dynamic sector.",
    url: "#notion"
  }
];

type Props = {
  onMove?: () => void;
};

export function StaggerProjects({ onMove }: Props) {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);

  useEffect(() => {
    const update = () => {
      setCardWidth(window.innerWidth < 640 ? 320 : 420);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const next = () => {
    setIndex((i) => (i + 1) % projectsData.length);
    onMove?.();
  };

  const prev = () => {
    setIndex((i) => (i - 1 + projectsData.length) % projectsData.length);
    onMove?.();
  };

  const getOffset = (i: number) => {
    let diff = i - index;
    if (diff > projectsData.length / 2) diff -= projectsData.length;
    if (diff < -projectsData.length / 2) diff += projectsData.length;
    return diff;
  };

  // Visible positions: -1, 0, +1 (only 3 cards)
  const visibleCards = projectsData
    .map((project, i) => ({ project, offset: getOffset(i) }))
    .filter(({ offset }) => Math.abs(offset) <= 1);

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: 600,
    }}>
      {visibleCards.map(({ project, offset }) => {
        const isCenter = offset === 0;

        const translateX = offset * (cardWidth * 0.7);
        const translateY = isCenter ? 0 : 15;
        const rotate = isCenter ? 0 : (offset > 0 ? 3 : -3);
        const scale = isCenter ? 1 : 0.92;
        const zIndex = isCenter ? 10 : 5;

        // Center = soft green, sides = soft yellow
        const bgColor = isCenter ? '#d1f2eb' : '#fff8e1';

        return (
          <div
            key={project.id}
            onClick={() => {
              if (offset > 0) next();
              else if (offset < 0) prev();
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: cardWidth,
              height: 520,
              borderRadius: 28,
              border: '2px solid #0B2228',
              padding: 36,
              background: bgColor,
              color: '#0B2228',
              cursor: isCenter ? 'default' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: isCenter
                ? '0 20px 50px rgba(11,34,40,0.10)'
                : '0 8px 24px rgba(0,0,0,0.05)',
              transform: `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`,
              zIndex,
              transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 600,
                lineHeight: 1.3,
                fontFamily: 'var(--font-lexend)',
                color: '#0B2228',
                marginBottom: 32,
              }}>
                {project.title}
              </h3>
              <p style={{
                margin: 0,
                fontSize: '1.1rem',
                lineHeight: '1.75',
                color: 'rgba(11, 34, 40, 0.65)',
                marginTop: 10,
              }}>
                {project.description}
              </p>
            </div>

            <div style={{
              marginTop: 'auto',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingTop: 16,
            }}>
              <a 
                href={project.url}
                onClick={(e) => e.stopPropagation()}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 8, 
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer'
                }}
                className="group"
              >
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Learn More</span>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: '#C1F1F1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.2s ease',
                }}>
                  <ArrowRight size={15} color="#0B2228" />
                </div>
              </a>
            </div>
          </div>
        );
      })}

      {/* Navigation controls */}
      <div style={{
        position: 'absolute',
        bottom: -40,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 12,
        zIndex: 20,
      }}>
        <button
          onClick={prev}
          aria-label="Previous project"
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            border: '1px solid rgba(11,34,40,0.12)',
            background: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            transition: 'all 0.3s ease',
          }}
        >
          <ChevronLeft size={20} color="#0B2228" />
        </button>
        <button
          onClick={next}
          aria-label="Next project"
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            border: '1px solid rgba(11,34,40,0.12)',
            background: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
            transition: 'all 0.3s ease',
          }}
        >
          <ChevronRight size={20} color="#0B2228" />
        </button>
      </div>
    </div>
  );
}

export default StaggerProjects;
