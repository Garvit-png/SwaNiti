'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Indian Education Policy',
    excerpt: 'Exploring how we can design education systems that align with India\'s aspirations and Indic values.',
    slug: 'future-indian-education-policy',
    date: '2024-12-15'
  },
  {
    id: 2,
    title: 'Understanding Viksit Bharat 2047',
    excerpt: 'A deep dive into the vision and policy frameworks for a developed India by 2047.',
    slug: 'viksit-bharat-2047',
    date: '2024-12-10'
  },
  {
    id: 3,
    title: 'Creative Economy: A New Frontier',
    excerpt: 'How the creative sector can drive economic growth and innovation in India.',
    slug: 'creative-economy-frontier',
    date: '2024-12-05'
  }
]

export default function Blog() {
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
              Insights & Articles
            </motion.h1>

            <div className="footer">
              <div className="footer-left">
                <p className="mission-text">
                  Thoughts, research, and perspectives on policy, education, and nation building.
                </p>
              </div>
              <div className="footer-right">
                <Link href="/contact" className="join-btn">
                  Get Updated
                  <span className="arrow-box">→</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section style={{ minHeight: '100vh', padding: '60px 40px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' }}>
            {blogPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{
                  padding: '30px',
                  background: '#fff',
                  borderRadius: '12px',
                  border: '1px solid rgba(11, 34, 40, 0.08)',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <p style={{ color: '#999', fontSize: '0.9rem', marginBottom: '10px' }}>{post.date}</p>
                <h3 style={{ fontSize: '1.3rem', color: '#0B2228', marginBottom: '15px' }}>{post.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px', flexGrow: 1 }}>{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} style={{ color: '#0B2228', fontWeight: '600', textDecoration: 'none' }}>
                  Read Article →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
