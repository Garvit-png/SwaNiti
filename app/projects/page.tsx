"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './projects.module.css'

type Initiative = {
  id: string
  title: string
  tag: string
  tagColor: string
  desc: string
  fullDesc: string
  exploreCta: string
  exploreLink: string
  websiteCta: string
  websiteLink: string
  cursorImg?: string
  image: string
  imagePos?: string
}

const initiatives: Initiative[] = [
  {
    id: 'sva-bharat',
    title: 'Sva-Bharat Movement',
    tag: 'A Movement',
    tagColor: '#1a3a2a',
    desc: 'Sva-Bharat Movement is a growing community of contributors united by a shared belief that the future of Bharat begins with rethinking education from first principles. Together, we explore ideas, inspire action, and contribute to a stronger, more future-ready Bharat through policy and practice.',
    fullDesc: 'Sva-Bharat Movement is a growing community of contributors united by a shared belief that the future of Bharat begins with rethinking education from first principles. Together, we explore ideas, inspire action, and contribute to a stronger, more future-ready Bharat through policy and practice.\n\nThe movement brings together educators, policymakers, students, and changemakers who believe that systemic transformation begins with reimagining the very foundations of how we learn and grow. Through dialogues, campaigns, and collaborative action, Sva-Bharat is building a groundswell of purpose-driven change.',
    exploreCta: 'Explore the Movement →',
    exploreLink: '/projects/sva-bharat',
    websiteCta: 'Visit Sva-Bharat Website →',
    websiteLink: 'https://www.svabharat.in/',
    cursorImg: '/images/svabharat-cursor.png',
    image: '/projects/svabharat.jpg',
    imagePos: 'center 40%',
  },
  {
    id: 'viksit-bharat',
    title: 'Viksit Bharat Yatra',
    tag: 'Youth Initiative',
    tagColor: '#1a2a3a',
    desc: 'Viksit Bharat Yatra is a growing movement of explorers reimagining travel as a journey of learning, reflection, and purpose. By experiencing Bharat firsthand, participants cultivate new perspectives, transform themselves, and contribute to the vision of a Viksit Bharat.',
    fullDesc: 'Viksit Bharat Yatra is a growing movement of explorers reimagining travel as a journey of learning, reflection, and purpose. By experiencing Bharat firsthand, participants cultivate new perspectives, transform themselves, and contribute to the vision of a Viksit Bharat.\n\nHonoring the PM\'s mission for a Developed India by 2047, the Yatra fosters self-discovery through solo, purposeful philosophical journeys for Viksit Yuva. Each journey is a transformative encounter with the land, its people, and its stories — turning travel into a rite of purpose.',
    exploreCta: 'Explore the Journey →',
    exploreLink: '/projects/viksit-bharat',
    websiteCta: 'Visit Yatra Website →',
    websiteLink: 'https://www.viksitbharatyatra.com/',
    cursorImg: '/images/viksit-bharat-cursor.png',
    image: '/projects/viksit.png',
    imagePos: 'center 47%',
  },
  {
    id: 'lifesite',
    title: 'LifeSite (जीवन-स्थल) Conceptualization',
    tag: 'Pilot Project',
    tagColor: '#2a1a3a',
    desc: 'LifeSite (जीवन-स्थल) is a conceptualization of the new space of learning—beyond schools, colleges, and universities. Emerging from seven years of first-principles experimentation through IDUME, it reimagines education as a lifelong journey of curiosity, purpose, relationships, and becoming.',
    fullDesc: 'LifeSite (जीवन-स्थल) is a conceptualization of the new space of learning—beyond schools, colleges, and universities. Emerging from seven years of first-principles experimentation through IDUME, it reimagines education as a lifelong journey of curiosity, purpose, relationships, and becoming.\n\nRooted in Bharatiya values and shaped by deep experimentation, LifeSite envisions learning environments that are adaptive, community-driven, and oriented toward holistic human development. It stands as a bold reimagination of what educational spaces can be.',
    exploreCta: 'Learn More →',
    exploreLink: '/projects/lifesite',
    websiteCta: 'Experience LifeSite →',
    websiteLink: 'https://www.lifesite.in/',
    image: '/projects/lifesite.png',
    imagePos: 'center 40%',
  },
  {
    id: 'creative-economy',
    title: 'Creative Economy Policy Lab',
    tag: 'Policy Lab',
    tagColor: '#3a1a1a',
    desc: 'Creative Economy Policy Lab is a policy research initiative driven by the aspiration of establishing a Ministry of Creative Economy Affairs in Bharat. Through national research frameworks, state-level studies, and evidence-based policy innovation, we seek to build the intellectual foundation for a thriving creative economy.',
    fullDesc: 'Creative Economy Policy Lab is a policy research initiative driven by the aspiration of establishing a Ministry of Creative Economy Affairs in Bharat. Through national research frameworks, state-level studies, and evidence-based policy innovation, we seek to build the intellectual foundation for a thriving creative economy.\n\nThe Lab conducts original research, engages with policymakers and creative professionals, and publishes findings that shape the discourse around India\'s creative industries — from arts and culture to design, media, and beyond.',
    exploreCta: 'Explore the Initiative →',
    exploreLink: '/projects/creative-economy',
    websiteCta: 'Visit the Policy Lab →',
    websiteLink: 'https://www.cepl.in/',
    cursorImg: '/images/cepl-cursor.png',
    image: '/projects/economy.jpg',
    imagePos: 'center 35%',
  },
]

export default function InitiativesPage() {
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [hoveredCursor, setHoveredCursor] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<Initiative | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[]
    if (!cards.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [activeModal])

  return (
    <main className={styles.page}>
      {hoveredCursor && (
        <div
          className={styles.customCursor}
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            backgroundImage: `url(${hoveredCursor})`
          }}
        />
      )}

      <section className={styles.heroSection}>
        <div className="sr-hero">
          <div className={`sr-hero-card sr-animate-in ${styles.heroCard}`}>
            <Navbar activePath="/projects" />
            <div className={styles.heroInner}>
              <h1>Initiatives</h1>
              <p>Ideas that move from thought to transformation.</p>
              <div className={styles.heroLine} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projectList}>
        {initiatives.map((initiative, index) => {
          const isEven = index % 2 === 1
          return (
            <article
              key={initiative.id}
              ref={(el) => { cardRefs.current[index] = el }}
              className={`${styles.card} ${isEven ? styles.cardReverse : ''}`}
              style={{ '--card-delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              {/* Top-left notch tag — same cut style as rest of site */}
              <div className={styles.cardNotch}>
                <span
                  className={styles.cardNotchLabel}
                  style={{ background: initiative.tagColor }}
                >
                  {initiative.tag}
                </span>
              </div>

              {/* Content panel */}
              <div className={`${styles.content} ${isEven ? styles.contentReverse : ''}`}>
                <h2 className={styles.initiativeTitle}>{initiative.title}</h2>
                <p>{initiative.desc}</p>
                <div className={styles.buttonRow}>
                  <button
                    className={styles.detailsBtn}
                    onClick={() => setActiveModal(initiative)}
                    aria-label={`More details about ${initiative.title}`}
                  >
                    {initiative.exploreCta}
                  </button>
                  <a
                    href={initiative.websiteLink}
                    className={`${styles.outlineBtn} ${initiative.cursorImg ? styles.outlineBtnNoCursor : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={initiative.websiteCta}
                    onMouseEnter={() => initiative.cursorImg && setHoveredCursor(initiative.cursorImg)}
                    onMouseLeave={() => setHoveredCursor(null)}
                  >
                    {initiative.websiteCta}
                  </a>
                </div>
              </div>

              {/* Image panel */}
              <div className={styles.imagePanel}>
                <img 
                  src={initiative.image} 
                  alt={initiative.title} 
                  style={{ objectPosition: initiative.imagePos || 'center center' }} 
                />
              </div>
            </article>
          )
        })}
      </section>

      <Footer />

      {/* MODAL POPUP */}
      {activeModal && (
        <div
          className={styles.modalOverlay}
          onClick={(e) => { if (e.target === e.currentTarget) setActiveModal(null) }}
          role="dialog"
          aria-modal="true"
          aria-label={activeModal.title}
        >
          <div className={styles.modal}>
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', paddingRight: '20px' }}>
                <div>
                  <span
                    className={styles.modalTag}
                    style={{ background: activeModal.tagColor }}
                  >
                    {activeModal.tag}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px' }}>
                    <h2 className={styles.modalTitle} style={{ margin: 0 }}>{activeModal.title}</h2>
                    {(activeModal.cursorImg || activeModal.image) && (
                      <img 
                        src={activeModal.cursorImg || activeModal.image} 
                        alt={`${activeModal.title} logo`}
                        style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '50%' }}
                      />
                    )}
                  </div>
                </div>
              </div>
              <button
                className={styles.modalClose}
                onClick={() => setActiveModal(null)}
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              {activeModal.fullDesc.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Modal Footer CTAs */}
            <div className={styles.modalFooter}>
              <a
                href={activeModal.websiteLink}
                className={styles.modalSecondaryBtn}
                target="_blank"
                rel="noopener noreferrer"
              >
                {activeModal.websiteCta}
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}