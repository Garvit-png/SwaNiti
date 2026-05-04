"use client"

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Compass, FileText, GraduationCap, Landmark, Menu, Network, Quote, Search, Sparkles, Users, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#work' },
  { label: 'Insights', href: '#method' },
  { label: 'Governance', href: '#connect' },
] as const

const themes = ['People\'s Aspiration', 'Education', 'Public Policy', 'Research', 'Non-Partisan', 'Viksit Bharat']

const rollingRows = [
  {
    direction: 'left',
    items: [
      { kind: 'photo', src: '/gallery/img5.jpg', alt: 'SvaNiti youth participants' },
      { kind: 'word', text: 'Inspiration', tone: 'sun' },
      { kind: 'photo', src: '/gallery/img4.jpg', alt: 'SvaNiti group discussion' },
      { kind: 'word', text: 'Notions', tone: 'cyan' },
      { kind: 'photo', src: '/gallery/img1.jpg', alt: 'SvaNiti campus moment' },
    ],
  },
  {
    direction: 'right',
    items: [
      { kind: 'word', text: 'People\'s Aspiration', tone: 'cyan' },
      { kind: 'photo', src: '/gallery/img2.jpg', alt: 'SvaNiti classroom session' },
      { kind: 'word', text: 'Unconventional', tone: 'sun' },
      { kind: 'photo', src: '/gallery/img3.jpg', alt: 'SvaNiti participants at event' },
      { kind: 'word', text: 'Policy', tone: 'cyan' },
    ],
  },
  {
    direction: 'left',
    items: [
      { kind: 'photo', src: '/gallery/SvanitiPhoto.png', alt: 'SvaNiti full team' },
      { kind: 'word', text: 'Non-Partisan', tone: 'sun' },
      { kind: 'photo', src: '/gallery/img4.jpg', alt: 'SvaNiti policy cohort' },
      { kind: 'word', text: 'Viksit Bharat', tone: 'cyan' },
      { kind: 'photo', src: '/gallery/img5.jpg', alt: 'SvaNiti youth workshop' },
    ],
  },
] as const

const impactStats = [
  { value: '2047', label: 'Viksit Bharat horizon', text: 'Every brief and journey is shaped around a long-term national imagination.' },
  { value: '4', label: 'Active idea tracks', text: 'Movements, yatras, education concepts, and creative economy policy.' },
  { value: '1', label: 'Simple civic loop', text: 'Listen deeply, research clearly, and move ideas into public action.' },
]

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

const ideaFlow = [
  {
    icon: Compass,
    title: 'Aspirations',
    text: 'Start with what people, students, volunteers, and civic leaders are already sensing on the ground.',
  },
  {
    icon: FileText,
    title: 'Notions',
    text: 'Turn raw concerns into readable research notes, issue maps, and policy possibilities.',
  },
  {
    icon: Network,
    title: 'Action',
    text: 'Carry ideas through discussions, chapters, yatras, and public-facing campaigns.',
  },
]

const voices = [
  'Readable for first-time volunteers.',
  'Useful for researchers and NGO teams.',
  'Grounded in Bharat, not boardroom jargon.',
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)

  return (
    <main className="sr-page">
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
        <div className="sr-hero-card sr-animate-in">
          <header className="sr-card-nav">
            <a className="sr-card-brand" href="#top" aria-label="SvaNiti home">
              <span className="sr-card-logo">
                <Image src="/logo.png" alt="" width={92} height={92} priority />
              </span>
              <strong>SvaNiti Policy Research Center</strong>
            </a>

            <nav className="sr-card-links" aria-label="Primary navigation">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </nav>

            <button className="sr-menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={26} />
            </button>
          </header>

          <div className="sr-hero-center">
            <h1>
              <span>We are Building</span>
              <span>Bharat&apos;s Largest</span>
              <span>Idea Repository</span>
            </h1>
          </div>

          <div className="sr-hero-footer">
            <p>Education &amp; Public Policy Think-Tank in being to Sync Nation&apos;s Aspirations into Policy.</p>
            <div className="sr-hero-actions">
              <a className="sr-contact-link" href="/contact">
                Contact Us
                <ArrowRight size={24} />
              </a>
              <a className="sr-join-button" href="#connect">
                Join Our Movement
                <span><ArrowRight size={24} /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="sr-rolling-gallery" aria-label="Rolling SvaNiti ideas">
        {rollingRows.map((row, rowIndex) => (
          <div className={`sr-roll-row sr-roll-${row.direction}`} key={`${row.direction}-${rowIndex}`}>
            <div className="sr-roll-track">
              {[...row.items, ...row.items].map((item, index) => (
                item.kind === 'word' ? (
                  <span className={`sr-roll-word sr-roll-${item.tone}`} key={`${item.text}-${index}`}>
                    {item.text}
                  </span>
                ) : (
                  <span className="sr-roll-photo" key={`${item.src}-${index}`}>
                    <Image src={item.src} alt={item.alt} fill sizes="180px" />
                  </span>
                )
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="sr-theme-strip" aria-label="SvaNiti themes">
        <div>
          {[...themes, ...themes].map((theme, index) => (
            <span key={`${theme}-${index}`}>{theme}</span>
          ))}
        </div>
      </section>

      <section className="sr-section sr-impact">
        <div className="sr-impact-heading">
          <div className="sr-section-heading">
            <span>Why it matters</span>
            <h2>More signal, less noise, for teams working in public life.</h2>
          </div>
          <p>
            The site now gives visitors a quicker sense of what SvaNiti does, how ideas move, and where they can join without making the experience feel heavy.
          </p>
        </div>
        <div className="sr-stat-grid">
          {impactStats.map((stat, index) => (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
              <p>{stat.text}</p>
            </motion.article>
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

      <section className="sr-section sr-flow">
        <div className="sr-section-heading">
          <span>Idea journey</span>
          <h2>A simple path from lived experience to policy-ready work.</h2>
        </div>
        <div className="sr-flow-grid">
          {ideaFlow.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.1 }}
              >
                <div>
                  <Icon size={24} />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section className="sr-section sr-voices">
        <div className="sr-voice-card">
          <Quote size={34} />
          <h2>Designed for NGO teams, students, researchers, and volunteers.</h2>
          <div>
            {voices.map((voice) => (
              <span key={voice}>{voice}</span>
            ))}
          </div>
        </div>
        <div className="sr-voice-side">
          <Sparkles size={26} />
          <p>
            Clear language, strong visual rhythm, and lightweight motion make the experience feel alive without slowing people down.
          </p>
          <GraduationCap size={40} />
        </div>
      </section>

      <section className="sr-image-band sr-final-image" aria-label="SvaNiti team">
        <Image src="/gallery/SvanitiPhoto.png" alt="SvaNiti full group gathering" fill sizes="100vw" />
        <div className="sr-image-caption">
          <span>People behind the movement</span>
          <p>Research feels stronger when it stays close to the people who will carry it.</p>
        </div>
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
