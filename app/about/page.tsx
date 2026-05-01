'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
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
              About SvaNiti Policy Research Center
            </motion.h1>

            <div className="footer">
              <div className="footer-left">
                <p className="mission-text">
                  An Education & Public Policy Think-Tank dedicated to syncing the Nation's Aspirations into Policy.
                </p>
              </div>
              <div className="footer-right">
                <Link href="#contact" className="contact-btn">Learn More</Link>
                <Link href="/services" className="join-btn">
                  Explore Projects
                  <span className="arrow-box">→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section style={{ minHeight: '100vh', padding: '60px 40px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#0B2228' }}>Our Mission</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333', marginBottom: '20px' }}>
              SvaNiti Policy Research Center is a think-tank for Education & Public Policy. We exist to spark a movement that rethinks the policy-making process, rejuvenates education with Indic ideas, and be a vital cog in the mission towards Viksit Bharat.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
              Our work focuses on creating actionable research and innovative policy frameworks that align with India's developmental aspirations for 2047.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ minHeight: '100vh', padding: '60px 40px', background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#0B2228' }}>Our Vision</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginTop: '40px' }}>
              <div style={{ padding: '30px', background: '#f8fafc', borderRadius: '12px' }}>
                <h3 style={{ color: '#0B2228', marginBottom: '15px' }}>Inspiring Aspirations</h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>We inspire individuals and communities to envision a better future for Bharat.</p>
              </div>
              <div style={{ padding: '30px', background: '#f8fafc', borderRadius: '12px' }}>
                <h3 style={{ color: '#0B2228', marginBottom: '15px' }}>Designing Policy</h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>We craft evidence-based policy recommendations grounded in Indian context and values.</p>
              </div>
              <div style={{ padding: '30px', background: '#f8fafc', borderRadius: '12px' }}>
                <h3 style={{ color: '#0B2228', marginBottom: '15px' }}>Building Nation</h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>We contribute to nation-building through education and policy innovation.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
