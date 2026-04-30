'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container, Section, ResponsiveGrid, Card } from './LayoutComponents'
import Logo from './Logo'

/**
 * HomePageLayout - Full homepage layout structure
 * You customize: Add your content, images, colors, and links
 */
export default function HomePage() {
  return (
    <main style={{ width: '100%', overflow: 'hidden' }}>
      {/* ===== HERO SECTION ===== */}
      <section style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #fff1cc 0%, #d1f2eb 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px'
      }}>
        {/* White rounded card container - matching live site */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: '#fff',
            borderRadius: '60px',
            padding: '60px',
            maxWidth: '1100px',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)'
          }}
        >
          {/* LEFT SIDE - Logo, Title, Subtitle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Logo */}
            <div>
              <Logo size="sm" />
            </div>

            {/* Hero Title - CUSTOMIZE */}
            <h1 style={{
              fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
              fontWeight: '900',
              lineHeight: '1.15',
              color: '#0B2228',
              marginTop: '20px'
            }}>
              We are Building Bharat's Largest Idea Repository
            </h1>

            {/* Hero Subtitle - CUSTOMIZE */}
            <p style={{
              fontSize: '1rem',
              color: '#0B2228',
              lineHeight: '1.7',
              fontWeight: '400'
            }}>
              Education & Public Policy Think-Tank in being to Sync Nation's Aspirations into Policy.
            </p>
          </div>

          {/* RIGHT SIDE - Navigation Header + Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {/* Header with SvaNiti title + Nav - CUSTOMIZE */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              marginBottom: '60px'
            }}>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                color: '#0B2228',
                margin: 0
              }}>
                SvaNiti Policy Research Center
              </h3>

              {/* Navigation Links */}
              <nav style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}>
                <Link href="/" style={{ textDecoration: 'none', color: '#0B2228' }}>About</Link>
                <Link href="/" style={{ textDecoration: 'none', color: '#0B2228' }}>Projects</Link>
                <Link href="/" style={{ textDecoration: 'none', color: '#0B2228' }}>Insights</Link>
                <Link href="/" style={{ textDecoration: 'none', color: '#0B2228' }}>Governance</Link>
              </nav>
            </div>

            {/* CTA Buttons - positioned at bottom right */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              alignItems: 'flex-start'
            }}>
              <Link href="/contact" style={{ textDecoration: 'none', width: '100%' }}>
                <button style={{
                  width: '100%',
                  padding: '12px 24px',
                  background: '#aed6f1',
                  color: '#0B2228',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease'
                }}>
                  Contact Us →
                </button>
              </Link>

              <Link href="/" style={{ textDecoration: 'none', width: '100%' }}>
                <button style={{
                  width: '100%',
                  padding: '12px 24px',
                  background: '#0B2228',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.3s ease'
                }}>
                  Join Our Movement →
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== TICKER/CAROUSEL SECTION ===== */}
      <Section background="#fff">
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', color: '#0B2228' }}>Featured Items</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            '@media (max-width: 1024px)': {
              gridTemplateColumns: 'repeat(3, 1fr)'
            },
            '@media (max-width: 768px)': {
              gridTemplateColumns: 'repeat(2, 1fr)'
            }
          }}>
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}
              >
                Item {item}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== WHAT WE DO SECTION ===== */}
      <Section background="#f8fafc">
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#0B2228', marginBottom: '15px' }}>What We Do</h2>
          <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Our core offerings and services
          </p>
        </div>

        <ResponsiveGrid cols={{ desktop: 2, tablet: 2, mobile: 1 }} gap="40px">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item}>
              <h3 style={{ fontSize: '1.3rem', color: '#0B2228', marginBottom: '15px' }}>
                Item Title {item}
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                Add your service/project description here. Make it concise and compelling.
              </p>
              <Link href="#" style={{ color: '#0B2228', fontWeight: '600', textDecoration: 'none' }}>
                Learn More →
              </Link>
            </Card>
          ))}
        </ResponsiveGrid>
      </Section>

      {/* ===== TWO COLUMN CONTENT SECTION ===== */}
      <Section background="#fff" minHeight="auto">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gap: '30px'
          }
        }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '2rem', color: '#0B2228', marginBottom: '20px' }}>Our Vision</h2>
            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.8', marginBottom: '20px' }}>
              Describe your vision, mission, or key differentiator here. Use this space to tell your story.
            </p>
            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.8' }}>
              Add more details, achievements, or values that matter to your organization.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: '#f8fafc',
              borderRadius: '12px',
              padding: '40px',
              textAlign: 'center',
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}
          >
            Add Image or Content
          </motion.div>
        </div>
      </Section>

      {/* ===== TESTIMONIALS/SOCIAL PROOF ===== */}
      <Section background="#f8fafc" minHeight="auto">
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#0B2228', marginBottom: '15px' }}>What People Say</h2>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>Testimonials and social proof</p>
        </div>

        <ResponsiveGrid cols={{ desktop: 3, tablet: 2, mobile: 1 }} gap="30px">
          {[1, 2, 3].map((item) => (
            <Card key={item} padding="40px">
              <p style={{ fontSize: '1rem', color: '#333', marginBottom: '20px', fontStyle: 'italic' }}>
                "Add testimonial or quote here. Keep it authentic and relevant to your audience."
              </p>
              <p style={{ fontWeight: '600', color: '#0B2228', marginBottom: '5px' }}>
                Person Name
              </p>
              <p style={{ color: '#999', fontSize: '0.9rem' }}>Title / Organization</p>
            </Card>
          ))}
        </ResponsiveGrid>
      </Section>

      {/* ===== CONTACT/CTA SECTION ===== */}
      <Section background="#0B2228" minHeight="auto">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
          '@media (max-width: 768px)': {
            gridTemplateColumns: '1fr',
            gap: '30px'
          }
        }}>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '20px' }}>Get In Touch</h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', marginBottom: '30px' }}>
              Add your contact information, call-to-action, or any closing message.
            </p>
            <ul style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '2' }}>
              <li>📍 Your Address</li>
              <li>📧 your-email@example.com</li>
              <li>📞 +1 (555) 000-0000</li>
            </ul>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              background: '#fff',
              padding: '40px',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <input type="text" placeholder="Your Name" style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }} />
            <input type="email" placeholder="Your Email" style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem'
            }} />
            <textarea placeholder="Your Message" rows={5} style={{
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical'
            }} />
            <button style={{
              padding: '14px',
              background: '#0B2228',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              Send Message
            </button>
          </motion.form>
        </div>
      </Section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        background: '#0B2228',
        color: 'rgba(255,255,255,0.8)',
        padding: '40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Container>
          <p style={{ marginBottom: '15px' }}>© 2024-2026 Your Organization Name. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link href="/privacy-policy" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/contact" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>Contact</Link>
          </div>
        </Container>
      </footer>
    </main>
  )
}
