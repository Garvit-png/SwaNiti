"use client"

import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import '../about.css'

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!cardRefs.current) return
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    cardRefs.current.forEach((el) => {
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  return (
    <main className="sr-app">
      {/* SECTION 1: HERO */}
      <section id="top" className="sr-page">
        <div className="sr-hero">
          <div className="sr-hero-card sr-about-hero-card">
            <Navbar activePath="/about" onMenuClick={() => setMenuOpen(true)} />

            <div className="sr-about-hero-center">
              <h1>
                SvaNiti, the coolest<br />
                Think-Tank, re-thinking Policy!
              </h1>
            </div>

            <div className="sr-about-hero-bottom">
              <div className="sr-about-label">About</div>
              <div className="sr-about-desc">
                In this rapidly evolving world, we need policies and strategies that align with humanity's progress. Shifting from complex research to people-centric policy—that's what we do at SvaNiti.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STORY */}
      <section className="sr-page">
        <div className="sr-story-wrapper">
          <div className="sr-story-container">
            <div className="sr-story-notch-outer">
              <div className="sr-story-notch-inner">
                How we got Started?
              </div>
            </div>
            <div className="sr-story-left">
              <h2>Our Story through lens of our Founder</h2>
            </div>
            <div className="sr-story-right">
              <p>
                It all began as a passion project initiated by our founder, driven by the vision to bridge the opportunity gap between Tier 1 schools and those in Tier 2 and 3. At its core was a simple yet profound purpose: <strong>"Evolution in Education to Explore One's New World."</strong>
              </p>
              <p>
                Determined to bring this vision to life, he left university and established the <strong>Sva-Bharat Foundation</strong>, setting out to explore rural and semi-rural schools to uncover gaps in the education system. Alongside this, he sought to create an educational framework that could address these disparities. In 2018, this vision took shape as <strong>Insight Academy</strong>, which later evolved into the <strong>IDUME Education System</strong> in 2020. Rooted in Bhartiya values, IDUME provided a space where learners could engage with new ideas, discover their own paths in <strong>education</strong>, and experience a nurturing environment akin to <strong>home</strong>. This initiative became a living laboratory, experimenting with education models that meet the needs of our time.
              </p>
              <p>
                For seven years, he dedicated himself to this cause. However, he soon realized that true, large-scale impact required taking these ideas beyond grassroots implementation—it needed to be embedded in policy. This understanding led to the incorporation of <strong>SvaNiti Policy Research Center</strong> in 2021. At SvaNiti, we firmly believe that the best ideas emerge from the diverse and dynamic regions of our nation. This belief drove our founder to travel over 100,000 km across Bharat, engaging with communities, thought leaders, and changemakers—an experience that inspired the concept of <strong>Viksit Bharat Darshan Yatra</strong>.
              </p>
              <p>
                While we may not be able to pinpoint a single moment of our inception, what we do know is this: we have continuously evolved with our vision, and as a think tank, we will keep aligning with national priorities to shape a brighter future for Bharat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: TEAM PHOTO */}
      <section className="sr-about-photo-section">
        <div className="sr-about-photo-wrapper">
          <Image
            src="/about.png"
            alt="SvaNiti Team"
            width={1920}
            height={1080}
            className="sr-about-photo"
          />
        </div>
      </section>

      {/* SECTION 4: CORE TEAM */}
      <section className="sr-team-section">
        <div className="sr-team-outer">
          <div className="sr-team-container">
            <div className="sr-team-badge">Our Core Team</div>
            <div className="sr-team-grid">
            {[
              { name: 'Aadil Belim', role: 'Founder &\nChief Vision Officer', photo: '/adil.png' },
              { name: 'Uzma A', role: 'Director &\nChief Culture Officer', photo: '/uzma.jpg' },
              { name: 'Eshaak J', role: 'Research Associate Creative\nEconomy', photo: '/eshaak.jpg' },
              { name: 'Akshit Gadhia', role: 'Compliance Officer', photo: '/akshit.jpg' },
              { name: 'Amin Belim', role: 'Non-Executive Director', photo: '/amin.jpg' },
              { name: 'Sagar Narayan', role: 'Research Associate', photo: '/sagar.jpg' }
            ].map((member, i) => (
              <div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                className="sr-team-card"
                style={{ ['--delay' as any]: `${i * 120}ms` }}
              >
                <div className="sr-team-photo-col">
                  {/* Use member.photo when available; otherwise use the placeholder avatar. */}
                  <Image src={member.photo || '/avatar-placeholder.svg'} alt={member.name} width={400} height={400} />
                </div>
                <div className="sr-team-info-col">
                  <div className="sr-team-info-top">
                    <h4>{member.name}</h4>
                    <p>{member.role}</p>
                  </div>
                  <div className="sr-team-email-row">
                    Email
                    <div className="sr-email-btn">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
