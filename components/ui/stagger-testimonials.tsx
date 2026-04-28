"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects = [
  {
    id: 0,
    title: "Sva-Bharat Movement",
    description: "Change in Bharat begins with a movement, not just a policy. Sva-Bharat Movement by SvaNiti channels the aspirations of the people, uniting ideas and voices through regional and campus ambassadors to shape a transformative future.",
    by: "Initiative"
  },
  {
    id: 1,
    title: "Viksit Bharat Darshan Yatra",
    description: "Viksit Bharat Darshan Yatra honors the Prime Minister's mission for a Developed India by 2047, emphasizing self-discovery through solo, purposeful, and philosophical journeys, shaping individuals with purpose for Viksit Yuva for Viksit Bharat.",
    by: "National Program"
  },
  {
    id: 2,
    title: "LifeSite (जीवन-स्थल) Conceptualization",
    description: "LifeSite originated from a seven-year pilot research project initiated by our founder, aimed at exploring an education system that transcends traditional schools, colleges, and universities, addressing the needs of the current era.",
    by: "Education Reform"
  },
  {
    id: 3,
    title: "Notion of Ministry of Creative Economy Affairs",
    description: "The creative economy holds the potential to be a powerful multiplier for our economy, unlocking new opportunities in employment, tourism, exports, innovation, and social inclusion. Our proposal to establish a dedicated ministry aims to strengthen initiatives and streamline regulations within this dynamic sector.",
    by: "Policy Proposal"
  }
];

interface ProjectCardProps {
  position: number;
  project: any;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  position, 
  project, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;
  const isVisible = Math.abs(position) <= 1;

  return (
    <motion.div
      onClick={() => handleMove(position)}
      initial={false}
      animate={{
        x: (cardSize / 1.05) * position,
        y: isCenter ? -15 : 0,
        scale: isCenter ? 1 : 0.85,
        rotate: isCenter ? 0 : position > 0 ? 2 : -2,
        opacity: isVisible ? (isCenter ? 1 : 0.8) : 0,
        backgroundColor: isCenter ? '#0B2228' : '#ffffff',
        color: isCenter ? '#ffffff' : '#0B2228',
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 25
      }}
      className={`stagger-card ${isCenter ? 'is-center' : ''}`}
      style={{
        width: cardSize,
        height: cardSize + 180,
        borderRadius: '32px',
        border: '1px solid rgba(15, 42, 51, 0.1)', 
        zIndex: isCenter ? 10 : 5 - Math.abs(position),
        pointerEvents: isVisible ? 'auto' : 'none',
        padding: '50px 45px',
        boxShadow: isCenter ? '0 40px 80px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.02)',
        position: 'absolute',
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
      <h3 className="card-title" style={{ 
        fontFamily: 'var(--font-lexend)',
        fontSize: '1.85rem', 
        lineHeight: 1.2,
        fontWeight: 300,
        marginBottom: '28px',
        letterSpacing: '-0.02em'
      }}>
        {project.title}
      </h3>
      
      <p className="card-desc" style={{ 
        fontFamily: 'var(--font-inter)',
        fontSize: '1.05rem',
        opacity: isCenter ? 0.85 : 0.5,
        lineHeight: 1.7,
        fontWeight: 400,
        color: isCenter ? '#ffffff' : '#475569', // Using a softer gray for non-center cards
      }}>
        {project.description}
      </p>

      <div className="card-footer-info" style={{ 
        position: 'absolute',
        bottom: '40px', 
        left: '45px', 
        right: '45px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: isCenter ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(15,42,51,0.05)',
        paddingTop: '25px'
      }}>
        <span className="card-by" style={{ 
          fontFamily: 'var(--font-inter)',
          fontSize: '0.75rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          opacity: 0.6,
          color: isCenter ? '#e0fcf8' : '#0B2228'
        }}>
          Learn More
        </span>
        <div className="card-arrow-icon" style={{ 
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isCenter ? '#e0fcf8' : 'rgba(15,42,51,0.05)',
            color: '#0B2228',
            transition: 'all 0.3s ease'
        }}>
            <ChevronRight size={20} />
        </div>
      </div>
    </motion.div>
  );
};

export const StaggerProjects: React.FC<{ onMove?: () => void }> = ({ onMove }) => {
  const [cardSize, setCardSize] = useState(400);
  const [projectsList, setProjectsList] = useState(projects.map(p => ({ ...p, tempId: p.id })));

  const handleMove = (steps: number) => {
    const newList = [...projectsList];
    if (steps > 0) {
      for (let i = 0; i < steps; i++) {
        const item = newList.shift();
        if (item) newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = 0; i < Math.abs(steps); i++) {
        const item = newList.pop();
        if (item) newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setProjectsList(newList);
    onMove?.();
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 400 : 280);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="stagger-container" style={{ height: '700px', position: 'relative', width: '100%', overflow: 'visible' }}>
      {projectsList.map((project: any, index) => {
        const position = projectsList.length % 2
          ? index - (projectsList.length - 1) / 2
          : index - projectsList.length / 2;
          
        return (
          <ProjectCard
            key={project.tempId}
            project={project}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      
      <div className="stagger-controls" style={{ bottom: '20px', zIndex: 1000 }}>
        <button
          onClick={(e) => { e.stopPropagation(); handleMove(-1); }}
          className="stagger-control-btn"
          style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'white', 
            border: '1px solid rgba(15, 42, 51, 0.1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
        >
          <ChevronLeft size={24} color="#0B2228" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); handleMove(1); }}
          className="stagger-control-btn"
          style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '50%', 
            background: 'white', 
            border: '1px solid rgba(15, 42, 51, 0.1)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
        >
          <ChevronRight size={24} color="#0B2228" />
        </button>
      </div>
    </div>
  );
};
