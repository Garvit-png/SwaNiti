"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useIsMobile } from './hooks/useIsMobile'

export default function Footer() {
  const isMobile = useIsMobile();
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#f8fafc',
      padding: isMobile ? '40px 20px 20px 20px' : '40px 60px 20px 60px',
      fontFamily: 'var(--font-lexend)',
      color: '#0B2228'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: isMobile ? '40px' : '60px',
        marginBottom: '60px'
      }}>
        {/* Left Column: Brand & Socials */}
        <div style={{ flex: '1 1 300px' }}>
          <div style={{
            background: '#0B2228',
            padding: '16px 32px',
            borderRadius: '16px',
            width: 'fit-content',
            marginBottom: '24px',
            boxShadow: '0 10px 30px rgba(11, 34, 40, 0.15)'
          }}>
            <h2 style={{ color: 'white', fontSize: '1.4rem', fontWeight: 600, margin: 0 }}>
              SvaNiti Policy Research Center
            </h2>
          </div>
          
          <p style={{ 
            fontSize: '1rem', 
            fontWeight: 500, 
            opacity: 0.8, 
            maxWidth: '280px',
            lineHeight: 1.5,
            marginBottom: '32px'
          }}>
            Think-Tank for Education & Public Policy
          </p>

          <div style={{ display: 'flex', gap: '20px' }}>
            <motion.a
              href="https://www.linkedin.com/company/svaniti-policy-research-center/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, filter: 'brightness(1.2)' }}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(11, 34, 40, 0.08)',
                transition: 'all 0.2s'
              }}
            >
              <img
                src="https://images.shadcnspace.com/assets/svgs/icon-linkedin.svg"
                alt="linkedin icon"
                style={{ width: '20px', height: '20px' }}
              />
            </motion.a>
          </div>
        </div>

        {/* Center Column: Quick Links */}
        <div style={{ flex: '1 1 200px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '24px' }}>What We Do</h3>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'About', id: 'about' },
              { name: 'Governance', id: 'governance' },
              { name: 'Contact us', id: 'contact' }
            ].map((link) => (
              <motion.a
                key={link.name}
                href={`#${link.id}`}
                whileHover={{ x: 5, color: '#0B2228', opacity: 1 }}
                style={{ 
                  textDecoration: 'none', 
                  color: '#0B2228', 
                  opacity: 0.7,
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  transition: 'all 0.2s'
                }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>
        </div>

        {/* Right Column: Contact Info */}
        <div style={{ flex: '1 1 300px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '24px' }}>Get In Touch</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <MapPin size={20} style={{ marginTop: '2px', opacity: 0.6 }} />
              <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.5 }}>
                Office Aadil Belim, Upleta,<br />
                Rajkot - 360-490, Gujarat, Bharat.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Mail size={20} style={{ opacity: 0.6 }} />
              <a href="mailto:office@svaniti.in" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.95rem', opacity: 0.8 }}>
                office@svaniti.in
              </a>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Phone size={20} style={{ opacity: 0.6 }} />
              <a href="tel:+912826358065" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.95rem', opacity: 0.8 }}>
                +91 2826 358065
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        background: '#0B2228',
        borderRadius: '16px',
        padding: '16px 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'center' : 'center',
        flexWrap: 'wrap',
        gap: '16px',
        textAlign: isMobile ? 'center' : 'left'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0, fontSize: '0.85rem' }}>
          © 2024-{currentYear+4} by Creative Studio SvaNiti Policy Research Center
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.85rem' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
