"use client"

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const navLinks = [
    { label: 'About', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Insights', href: '#' },
    { label: 'Governance', href: '#' },
  ]

  return (
    <main className="sr-page">
      <section id="top" className="sr-hero">
        <div className="sr-hero-card sr-animate-in">
          {/* Logo Notch */}
          <div className="sr-card-logo-notch">
            <div className="sr-logo-wrapper">
              <Image src="/logo.png" alt="SvaNiti Logo" width={80} height={80} priority />
            </div>
          </div>

          <header className="sr-card-nav">
            <a className="sr-card-brand" href="#top" aria-label="SvaNiti home">
              <strong>SvaNiti Policy Research Center</strong>
            </a>

            <nav className="sr-card-links" aria-label="Primary navigation">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href}>{link.label}</a>
              ))}
            </nav>
          </header>

          <div className="sr-hero-center">
            <h1>
              We are Building Bharat&apos;s <br />
              Largest Idea Repository
            </h1>
          </div>

          <div className="sr-hero-footer">
            <div className="sr-footer-left">
              <p>
                Education &amp; Public Policy Think-Tank in being to <br /> 
                Sync Nation&apos;s Aspirations into Policy.
              </p>
            </div>
            
            <div className="sr-hero-actions">
              <a className="sr-contact-link" href="mailto:office@svaniti.in">
                Contact Us
                <span className="sr-contact-arrow">
                  <ArrowRight size={20} />
                </span>
              </a>
              <a className="sr-join-button" href="#">
                Join Our Movement
                <span className="sr-arrow-box">
                  <ArrowRight size={20} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
