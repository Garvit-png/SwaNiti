'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        alert('Message sent successfully!')
        setFormData({ name: '', contact: '', email: '', message: '' })
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error sending message')
    }
  }

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
              Let's Talk, What You Got!
            </motion.h1>

            <div className="footer">
              <div className="footer-left">
                <p className="mission-text">
                  Contact us for any notion for nation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section style={{ minHeight: '100vh', padding: '60px 40px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#0B2228' }}>Get In Touch</h2>
              
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#0B2228', marginBottom: '10px' }}>Address</h3>
                <p style={{ color: '#666' }}>
                  Office Aadil Belim, Upleta,<br/>
                  Rajkot - 360-490, Gujarat, Bharat.
                </p>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#0B2228', marginBottom: '10px' }}>Email</h3>
                <a href="mailto:office@svaniti.in" style={{ color: '#0B2228', textDecoration: 'none' }}>office@svaniti.in</a>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ color: '#0B2228', marginBottom: '10px' }}>Phone</h3>
                <a href="tel:+912826358065" style={{ color: '#0B2228', textDecoration: 'none' }}>+91 2826 358065</a>
              </div>

              <div style={{ marginTop: '40px' }}>
                <a href="https://www.linkedin.com/company/svaniti-policy-research-center" target="_blank" rel="noopener noreferrer" style={{ color: '#0B2228', fontWeight: '600' }}>
                  Follow on LinkedIn →
                </a>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              style={{
                padding: '40px',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#0B2228', fontWeight: '600' }}>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#0B2228', fontWeight: '600' }}>Contact No. *</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#0B2228', fontWeight: '600' }}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#0B2228', fontWeight: '600' }}>Notion Note *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#0B2228',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Contact Now
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  )
}
