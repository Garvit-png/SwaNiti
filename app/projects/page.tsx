"use client"

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styles from './projects.module.css'

type Project = {
  tag: string
  title: string
  accent: string
  image?: string
  imagePosition?: string
  desc: string
  link: string
}

const projects: Project[] = [
  {
    tag: 'Movement',
    title: 'Sva-Bharat Movement',
    accent: '',
    image: '/projects/svabharat.jpg',
    desc:
      'Change in Bharat begins with a movement, not just a policy. Channelling youth aspirations through regional and campus ambassadors to shape a transformative future.',
    link: '/projects/sva-bharat',
  },
  {
    tag: 'Heritage',
    title: 'Viksit Bharat Darshan Yatra',
    accent: '',
    image: '/projects/viksit.png',
    desc:
      'Honoring the PM\'s mission for a Developed India by 2047. Fostering self-discovery through solo, purposeful philosophical journeys for Viksit Yuva.',
    link: '/projects/darshan-yatra',
  },
  {
    tag: 'Education',
    title: 'LifeSite (जीवन-स्थल) Conceptualization',
    accent: '',
    image: '/projects/lifesite.png',
    imagePosition: 'center 20%',
    desc:
      'Reimagining education beyond conventional schools and colleges. Adaptive, rooted in Bharatiya values, empowering holistic development and self-discovery.',
    link: '/projects/lifesite',
  },
  {
    tag: 'Economy',
    title: 'Notion of Ministry of Creative Economy Affairs',
    accent: '',
    image: '/projects/economy.jpg',
    desc:
      'Establishing a dedicated institutional framework to strengthen the creative economy — empowering artists, innovators, and cultural entrepreneurs across Bharat.',
    link: '/projects/creative-economy',
  },
]

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
                <p>{project.desc}</p>
                <Link href={project.link} className={styles.learnMore}>
                  Learn More →
                </Link>
              </div>

              <div className={styles.accentBox} aria-hidden="true">
                {project.image ? (
                  <>
                    <Image src={project.image} alt={project.title} fill style={{ objectFit: 'cover', objectPosition: project.imagePosition || 'center' }} />
                    <div className={styles.imageOverlay}></div>
                  </>
                ) : (
                  <span>{project.accent}</span>
                )}
                <h2 className={styles.imageTitle}>{project.title}</h2>
              </div>
            </article>
          )
        })}
      </section>

      <Footer />
    </main>
  )
}