'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    id: 1,
    title: 'Sva-Bharat Movement',
    description: 'Change in Bharat begins with a movement, not just a policy. Sva-Bharat Movement by SvaNiti channels the aspirations of the people, uniting ideas and voices through regional and campus ambassadors to shape a transformative future.',
    slug: 'sva-bharat-movement'
  },
  {
    id: 2,
    title: 'Viksit Bharat Darshan Yatra',
    description: 'Viksit Bharat Darshan Yatra honors the Prime Minister\'s mission for a Developed India by 2047, emphasizing self-discovery through solo, purposeful, and philosophical journeys, shaping individuals with purpose for Vikshit Yuva for Viksit Bharat.',
    slug: 'viksit-bharat-darshan-yatra'
  },
  {
    id: 3,
    title: 'LifeSite (जीवन-स्थल) Conceptualization',
    description: 'LifeSite originated from a seven-year pilot research project initiated by our founder, aimed at exploring an education system that transcends traditional schools, colleges, and universities, addressing the needs of the current era.',
    slug: 'lifesite-conceptualization'
  },
  {
    id: 4,
    title: 'Notion of Ministry of Creative Economy Affairs',
    description: 'The creative economy holds the potential to be a powerful multiplier for our economy, unlocking new opportunities in employment, tourism, exports, innovation, and social inclusion. Our proposal to establish a dedicated ministry aims to strengthen initiatives and streamline regulations within this dynamic sector.',
    slug: 'ministry-creative-economy'
  }
]

export default function Services() {
  return (
    <main className="main-viewport">
      <section className="hero-container" style={{ minHeight: '100vh' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="main-card framed-card"
        >
          <div className="hero-logo-tab" aria-hidden="true">
            <Image src="/logo.png" alt="Logo" width={55} height={55} priority />
          </div>

          <header className="header">
            <div className="logo-container">
              <span className="brand-name">SvaNiti Policy Research Center</span>
            </div>
            <nav className="nav">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/services" className="nav-link">Projects</Link>
              <Link href="/blog" className="nav-link">Insights</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </nav>
          </header>

          <div className="hero-content">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="main-title"
            >
              Our Projects & Initiatives
            </motion.h1>

            <div className="footer">
              <div className="footer-left">
                <p className="mission-text">
                  Transformative initiatives shaping India's future through research, education, and policy innovation.
                </p>
              </div>
              <div className="footer-right">
                <Link href="#contact" className="contact-btn">Get Involved</Link>
                <Link href="/contact" className="join-btn">
                  Start a Conversation
                  <span className="arrow-box">→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section style={{ minHeight: '100vh', padding: '60px 40px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', color: '#0B2228', textAlign: 'center' }}>What We Do</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  padding: '40px',
                  background: '#fff',
                  borderRadius: '16px',
                  border: '1px solid rgba(11, 34, 40, 0.08)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}
              >
                <h3 style={{ fontSize: '1.5rem', color: '#0B2228', marginBottom: '15px' }}>{service.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>{service.description}</p>
                <Link href={`/services/${service.slug}`} style={{ color: '#0B2228', fontWeight: '600', textDecoration: 'none' }}>
                  Learn More →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
