"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import styles from './projects.module.css'

type Project = {
  tag: string
  title: string
  accent: string
  desc: string
  link: string
}

const projects: Project[] = [
  {
    tag: 'Movement',
    title: 'Sva-Bharat Movement',
    accent: 'स्व',
    desc:
      'Change in Bharat begins with a movement, not just a policy. Channelling youth aspirations through regional and campus ambassadors to shape a transformative future.',
    link: '/projects/sva-bharat',
  },
  {
    tag: 'Heritage',
    title: 'Viksit Bharat Darshan Yatra',
    accent: 'यात्रा',
    desc:
      'Honoring the PM\'s mission for a Developed India by 2047. Fostering self-discovery through solo, purposeful philosophical journeys for Viksit Yuva.',
    link: '/projects/darshan-yatra',
  },
  {
    tag: 'Education',
    title: 'LifeSita (जीवन-स्थल) Conceptualization',
    accent: 'ज्ञान',
    desc:
      'Reimagining education beyond conventional schools and colleges. Adaptive, rooted in Bharatiya values, empowering holistic development and self-discovery.',
    link: '/projects/lifesite',
  },
  {
    tag: 'Economy',
    title: 'Notion of Ministry of Creative Economy',
    accent: 'सृजन',
    desc:
      'Establishing a dedicated institutional framework to strengthen the creative economy — empowering artists, innovators, and cultural entrepreneurs across Bharat.',
    link: '/projects/creative-economy',
  },
]

function ProjectsFooter() {
  return (
    <footer className="sr-site-footer">
      <div className="sr-footer-main">
        <div className="sr-footer-branding">
          <Link href="/" className="sr-footer-logo-link">
            <div className="sr-footer-logo-box">SvaNiti Policy Research Center</div>
          </Link>
          <div className="sr-footer-social">
            <a
              href="https://www.linkedin.com/company/svaniti-policy-research-center/"
              target="_blank"
              rel="noopener noreferrer"
              className="sr-social-icon"
            >
              in
            </a>
          </div>
        </div>

        <div className="sr-footer-mission">
          <strong>Think-Tank for Education<br />& Public Policy</strong>
        </div>

        <div className="sr-footer-links">
          <h4>What We Do</h4>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/#contact">Contact us</Link></li>
          </ul>
        </div>

        <div className="sr-footer-contact">
          <h4>Get In Touch</h4>
          <address>
            I/Office Aadil Belim, Upleta,<br />
            Rajkot - 360-490, Gujarat, Bharat.<br />
            <a href="mailto:office@svaniti.in">office@svaniti.in</a><br />
            +91 2826 358065
          </address>
        </div>
      </div>

      <div className="sr-footer-bottom">
        <p>© 2024-2028 by Creative Studio SvaNiti Policy Research Center <Link href="/admin/portal" style={{ opacity: 0.8, color: '#ff4444', padding: '10px', display: 'inline-block', position: 'relative', zIndex: 9999, pointerEvents: 'auto' }}>.</Link></p>
      </div>
    </footer>
  )
}

export default function ProjectsPage() {
  const cardRefs = useRef<Array<HTMLElement | null>>([])

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
      { threshold: 0.15 }
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <main className={styles.page}>
      <section className={styles.heroSection}>
        <div className="sr-hero">
          <div className={`sr-hero-card sr-animate-in ${styles.heroCard}`}>
            <Navbar activePath="/projects" />

            <div className={styles.heroInner}>
              <h1>Our Projects</h1>
              <p>Ideas that move from thought to transformation.</p>
              <div className={styles.heroLine} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projectList}>
        {projects.map((project, index) => {
          const isEven = index % 2 === 1

          return (
            <article
              key={project.title}
              ref={(element) => {
                cardRefs.current[index] = element
              }}
              className={`${styles.card} ${isEven ? styles.cardReverse : ''}`}
              style={{ '--card-delay': `${index * 0.1}s` } as React.CSSProperties}
            >
              <div className={`${styles.content} ${isEven ? styles.contentReverse : ''}`}>
                <div className={`${styles.number} ${isEven ? styles.numberRight : ''}`} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <span className={styles.tag}>{project.tag}</span>
                <h2>{project.title}</h2>
                <p>{project.desc}</p>
                <Link href={project.link} className={styles.learnMore}>
                  Learn More →
                </Link>
              </div>

              <div className={styles.accentBox} aria-hidden="true">
                <span>{project.accent}</span>
              </div>
            </article>
          )
        })}
      </section>

      <ProjectsFooter />
    </main>
  )
}