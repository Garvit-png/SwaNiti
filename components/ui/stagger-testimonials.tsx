"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe, Compass, GraduationCap, Briefcase } from 'lucide-react';

const projects = [
  {
    tempId: 0,
    title: "Sva-Bharat Movement",
    description: "Change in Bharat begins with a movement, not just a policy. Sva-Bharat Movement by SvaNiti channels the aspirations of the people, uniting ideas and voices through regional and campus ambassadors to shape a transformative future.",
    by: "Initiative",
    icon: <Globe size={28} />
  },
  {
    tempId: 1,
    title: "Viksit Bharat Darshan Yatra",
    description: "Viksit Bharat Darshan Yatra honors the Prime Minister's mission for a Developed India by 2047, emphasizing self-discovery through solo, purposeful, and philosophical journeys, shaping individuals with purpose for Viksit Yuva for Viksit Bharat.",
    by: "National Program",
    icon: <Compass size={28} />
  },
  {
    tempId: 2,
    title: "LifeSite (जीवन-स्थल) Conceptualization",
    description: "LifeSite originated from a seven-year pilot research project initiated by our founder, aimed at exploring an education system that transcends traditional schools, colleges, and universities, addressing the needs of the current era.",
    by: "Education Reform",
    icon: <GraduationCap size={28} />
  },
  {
    tempId: 3,
    title: "Notion of Ministry of Creative Economy Affairs",
    description: "The creative economy holds the potential to be a powerful multiplier for our economy, unlocking new opportunities in employment, tourism, exports, innovation, and social inclusion. Our proposal to establish a dedicated ministry aims to strengthen initiatives and streamline regulations within this dynamic sector.",
    by: "Policy Proposal",
    icon: <Briefcase size={28} />
  }
];

interface ProjectCardProps {
  position: number;
  project: typeof projects[0];
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

  return (
    <div
      onClick={() => handleMove(position)}
      className={`stagger-card ${isCenter ? 'is-center' : ''}`}
      style={{
        width: cardSize,
        height: cardSize + 180,
        borderRadius: '32px',
        /* Proper border added as requested, matching the main frame */
        border: '5px solid rgba(15, 42, 51, 0.25)', 
        background: isCenter ? '#0B2228' : '#ffffff',
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.05) * position}px)
          translateY(${isCenter ? -10 : 0}px)
          scale(${isCenter ? 1 : 0.88})
        `,
        zIndex: isCenter ? 10 : 5 - Math.abs(position),
        opacity: Math.abs(position) > 1 ? 0 : isCenter ? 1 : 0.85, 
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        rotate: '0deg',
        padding: '50px 45px',
        boxShadow: isCenter ? '0 30px 60px rgba(0,0,0,0.12)' : '0 10px 30px rgba(0,0,0,0.03)'
      }}
    >
      <div className="card-icon-wrapper" style={{ 
        marginBottom: '32px',
        color: isCenter ? '#e0fcf8' : '#0B2228',
        opacity: 0.8
      }}>
        {project.icon}
      </div>

      <h3 className="card-title" style={{ 
        fontSize: '1.6rem', 
        lineHeight: 1.2,
        color: isCenter ? 'white' : '#0B2228',
        fontWeight: 400, // Slightly bolder as well
        marginBottom: '24px'
      }}>
        {project.title}
      </h3>
      
      <p className="card-desc" style={{ 
        fontSize: '0.9rem',
        opacity: isCenter ? 0.6 : 0.5,
        color: isCenter ? 'white' : '#0B2228',
        lineHeight: 1.8,
        fontWeight: 300
      }}>
        {project.description}
      </p>

      <div className="card-footer-info" style={{ 
        position: 'absolute',
        bottom: '50px', 
        left: '45px', 
        right: '45px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span className="card-by" style={{ 
          fontSize: '0.7rem',
          fontWeight: 400,
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: isCenter ? 'white' : '#0B2228',
          opacity: 0.5
        }}>
          {project.by}
        </span>
        <div className="card-arrow-icon" style={{ 
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isCenter ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.03)',
            color: isCenter ? 'white' : '#0B2228'
        }}>
            <ChevronRight size={18} />
        </div>
      </div>
    </div>
  );
};

export const StaggerProjects: React.FC = () => {
  const [cardSize, setCardSize] = useState(400);
  const [projectsList, setProjectsList] = useState(projects);

  const handleMove = (steps: number) => {
    const newList = [...projectsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push(item);
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift(item);
      }
    }
    setProjectsList(newList);
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
      {projectsList.map((project, index) => {
        const position = index - 1; 
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
      
      <div className="stagger-controls" style={{ bottom: '-40px' }}>
        <button
          onClick={() => handleMove(-1)}
          className="stagger-control-btn"
          style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)' }}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="stagger-control-btn"
          style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(0,0,0,0.1)' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
