"use client"

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen, Landmark, Menu, MoveRight, Search, Users, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Method', href: '#method' },
  { label: 'Connect', href: '#connect' },
]

const themes = ['People\'s Aspiration', 'Education', 'Public Policy', 'Research', 'Non-Partisan', 'Viksit Bharat']

const projects = [
  {
    title: 'Sva-Bharat Movement',
    text: 'A civic network that turns local aspirations into research questions, campus conversations, and public action.',
    accent: 'mint',
  },
  {
    title: 'Viksit Bharat Darshan Yatra',
    text: 'Purposeful journeys for young leaders to understand Bharat through community, self-discovery, and development.',
    accent: 'sky',
  },
  {
    title: 'LifeSite Conceptualization',
    text: 'A long-form inquiry into learning spaces beyond conventional schools, colleges, and universities.',
    accent: 'sun',
  },
  {
    title: 'Creative Economy Affairs',
    text: 'A policy proposal to unlock employment, tourism, exports, innovation, and social inclusion through creative work.',
    accent: 'rose',
  },
]

const method = [
  {
    icon: Users,
    title: 'Listen',
    text: 'Collect lived aspirations from students, communities, practitioners, and civic leaders.',
  },
  {
    icon: Search,
    title: 'Research',
    text: 'Shape raw ideas into evidence-led notes, briefs, and policy-ready frameworks.',
  },
  {
    icon: Landmark,
    title: 'Mobilise',
    text: 'Move ideas through ambassadors, discussions, yatras, and public-facing campaigns.',
  },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)

  return (
    <main className="sr-page">
      <header className="sr-nav">
        <a className="sr-brand" href="#top" aria-label="SvaNiti home">
          <span className="sr-brand-mark">
            <Image src="/logo.png" alt="" width={42} height={42} priority />
          </span>
          <span>
            <strong>SvaNiti</strong>
            <small>Policy Research Center</small>
          </span>
        </a>

        <nav className="sr-nav-links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <a className="sr-nav-cta" href="#connect">
          Start a conversation
          <ArrowUpRight size={16} />
        </a>

        <button className="sr-menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sr-mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="sr-mobile-menu-panel"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="top" className="sr-hero">
        <div className="sr-hero-copy sr-animate-in">
          <h1 aria-label="Building Bharat's idea repository for policy action.">
            <span className="sr-title-desktop" aria-hidden="true">Building Bharat&apos;s idea repository for policy action.</span>
            <span className="sr-title-mobile" aria-hidden="true">
              Building Bharat&apos;s
              <br />
              idea repository for
              <br />
              policy action.
            </span>
          </h1>
          <p>
            SvaNiti translates people&apos;s aspirations into simple research, civic movements, and policy ideas that are ready to travel.
          </p>
          <div className="sr-hero-actions">
            <a className="sr-primary-button" href="#work">
              Explore the work
              <ArrowRight size={18} />
            </a>
            <a className="sr-secondary-button" href="#connect">
              Join the movement
              <MoveRight size={18} />
            </a>
          </div>
        </div>

        <div className="sr-hero-board sr-animate-in sr-animate-delay-1">
          <div className="sr-board-logo">
            <Image src="/logo-alpha.png" alt="" width={68} height={68} priority />
          </div>
          <div className="sr-board-line" />
          <div className="sr-board-card sr-board-card-main">
            <BookOpen size={22} />
            <span>Idea brief</span>
            <strong>Education rooted in Bharat, designed for 2047.</strong>
          </div>
          <div className="sr-board-card sr-board-card-small">
            <span>Policy lens</span>
            <strong>Non-partisan</strong>
          </div>
          <div className="sr-board-photo sr-board-photo-one">
            <Image src="/gallery/img1.jpg" alt="SvaNiti community discussion" fill sizes="160px" />
          </div>
          <div className="sr-board-photo sr-board-photo-two">
            <Image src="/gallery/img3.jpg" alt="SvaNiti participants" fill sizes="140px" />
          </div>
          <div className="sr-board-pill">Research</div>
          <div className="sr-board-pill sr-board-pill-alt">Public action</div>
        </div>
      </section>

      <section className="sr-theme-strip" aria-label="SvaNiti themes">
        <div>
          {[...themes, ...themes].map((theme, index) => (
            <span key={`${theme}-${index}`}>{theme}</span>
          ))}
        </div>
      </section>

      <section id="about" className="sr-section sr-about">
        <div className="sr-section-heading sr-animate-in">
          <span>Our intent</span>
          <h2>From public aspiration to public policy.</h2>
        </div>
        <div className="sr-about-grid">
          <p>
            SvaNiti is an education and public policy think tank built around a simple belief: policy should begin with the voice of people, not with jargon.
          </p>
          <p>
            The new experience keeps that simplicity. It gives NGO teams, students, volunteers, and researchers a clear path to understand the mission and participate.
          </p>
        </div>
      </section>

      <section id="work" className="sr-section sr-work">
        <div className="sr-section-heading">
          <span>What we build</span>
          <h2>Movements, journeys, research, and policy notions.</h2>
        </div>

        <div className="sr-project-shell">
          <div className="sr-project-list">
            {projects.map((project, index) => (
              <button
                key={project.title}
                type="button"
                className={activeProject === index ? 'is-active' : ''}
                onClick={() => setActiveProject(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {project.title}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.article
              key={projects[activeProject].title}
              className={`sr-project-detail sr-accent-${projects[activeProject].accent}`}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.3 }}
            >
              <span>Selected initiative</span>
              <h3>{projects[activeProject].title}</h3>
              <p>{projects[activeProject].text}</p>
              <a href="#connect">
                Collaborate on this
                <ArrowUpRight size={18} />
              </a>
            </motion.article>
          </AnimatePresence>
        </div>
      </section>

      <section id="method" className="sr-section sr-method">
        <div className="sr-section-heading">
          <span>How it works</span>
          <h2>A calm process for complex public questions.</h2>
        </div>
        <div className="sr-method-grid">
          {method.map((step, index) => {
            const Icon = step.icon
            return (
              <article
                key={step.title}
                className="sr-animate-in"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Icon size={24} />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="sr-image-band" aria-label="SvaNiti team">
        <Image src="/gallery/SvanitiPhoto.png" alt="SvaNiti team gathering" fill sizes="100vw" />
      </section>

      <section id="connect" className="sr-section sr-connect">
        <div>
          <span>Let&apos;s talk</span>
          <h2>Bring a notion for nation.</h2>
          <p>
            Share a research idea, join a campus chapter, or invite SvaNiti to a discussion. Keep it simple; the first conversation matters most.
          </p>
        </div>
        <a className="sr-primary-button" href="/contact">
          Contact SvaNiti
          <ArrowUpRight size={18} />
        </a>
      </section>
    </main>
  )
}
