"use client"

import { useState, useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import '../about.css'

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [tappedCard, setTappedCard] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const craftItems = [
    {
      num: "01",
      title: "Vague Thinking to Ideas",
      desc: "We transform emerging thoughts, aspirations, and observations into clear, actionable ideas that can shape the future.",
    },
    {
      num: "02",
      title: "Building Frameworks",
      desc: "We develop intellectual, educational, social, and policy frameworks that bring structure and direction to systems challenges.",
    },
    {
      num: "03",
      title: "Pilot Initiatives",
      desc: "We test promising ideas through real-world experimentation, learning from practice before advocating for scale.",
    },
    {
      num: "04",
      title: "Youth Transformation",
      desc: "We nurture curious individuals into thoughtful leaders, innovators, explorers, and contributors to society.",
    },
    {
      num: "05",
      title: "Movement Building",
      desc: "We cultivate communities around shared purpose, enabling ideas to grow beyond individuals and create collective impact.",
    },
  ]

  useEffect(() => {
    if (!cardRefs.current) return
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cardRefs.current.indexOf(entry.target as HTMLDivElement)
            if (idx !== -1) {
              setVisibleCards(prev => new Set(prev).add(idx))
            }
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
      {/* 1. HERO SECTION */}
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

      {/* 2. APPROACH SECTION */}
      <section className="sr-page">
        <div className="sr-approach-wrapper">
          <div className="sr-approach-container">
            <div className="sr-notch-tab-wrapper">
              <div className="sr-notch-tab">Our Methodology</div>
            </div>
            <div className="sr-approach-intro">
              <p>We do not begin with solutions. We begin with curiosity, zest, and a willingness to see differently. Our methodology reflects the mindset through which we explore ideas, understand systems, and imagine the future beyond quick fixes.</p>
            </div>
            <div className="sr-approach-grid">
              <div className="sr-approach-card">
                <h3>01 / First-Principles Thinking</h3>
                <p>We begin with questions, not assumptions. By examining challenges at their roots, we uncover insights that often remain hidden beneath conventional thinking.</p>
              </div>
              <div className="sr-approach-card">
                <h3>02 / Unconventional Approaches</h3>
                <p>We look beyond policy cycles and conventional wisdom. By exploring emerging opportunities, overlooked perspectives, and unconventional pathways, we seek to imagine futures that do not yet exist.</p>
              </div>
              <div className="sr-approach-card">
                <h3>03 / Systems Thinking</h3>
                <p>We see society as an interconnected ecosystem where education, policy, culture, economy, and leadership continuously influence one another. Understanding these connections enables us to create more effective pathways for change.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY SECTION */}
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
                For seven years, he dedicated himself to this cause. However, he soon realized that true, large-scale impact required taking these ideas beyond grassroots implementation—it needed to be embedded in policy. This understanding led to the incorporation of <strong>SvaNiti Policy Research Center</strong> in 2021. At SvaNiti, we firmly believe that the best ideas emerge from the diverse and dynamic regions of our nation. This belief drove our founder to travel over 100,000 km across Bharat, engaging with communities, thought leaders, and changemakers—an experience that inspired the concept of <strong>Viksit Bharat Yatra</strong>.
              </p>
              <p>
                While we may not be able to pinpoint a single moment of our inception, what we do know is this: we have continuously evolved with our vision, and as a think tank, we will keep aligning with national priorities to shape a brighter future for Bharat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CREATIVE SECTION OF IMAGES */}
      <section className="sr-about-photo-section">
        <div className="sr-about-photo-wrapper">
          <Image
            src="/about.png"
            alt="SvaNiti Team"
            width={1920}
            height={1080}
            className="sr-about-photo"
            priority
          />
        </div>
      </section>

      {/* 4.5. OUR CRAFT SECTION (Copied from home page) */}
      <section className="sr-page relative overflow-x-hidden">
        <div className="sr-projects-container" style={{ perspective: '1000px', margin: '40px auto', maxWidth: '1500px' }}>
          {/* Section Heading */}
          <div className="sr-section-notch-outer">
            <div className="sr-section-notch-inner">Our <strong>Craft</strong></div>
          </div>

          <div className="sr-craft-grid relative z-10">
            {craftItems.map((item, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.08
                    }
                  }
                }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px rgba(11,34,40,0.06)",
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
                className="sr-craft-card"
              >
                <h3>{item.num} / {item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}

            <Link href="/projects" style={{ display: 'contents' }}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                      delay: 5 * 0.08
                    }
                  }
                }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 30px rgba(11,34,40,0.06)",
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
                className="sr-craft-card sr-craft-explore-card"
              >
                <div className="sr-craft-explore-card-content">
                  <div className="sr-craft-explore-title">Explore More</div>
                  <div className="sr-craft-explore-arrow-circle">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TEAM SECTION */}
      <section className="sr-team-section">
        <div className="sr-team-outer">
          <div className="sr-team-container">
            <div className="sr-notch-tab-wrapper">
              <div className="sr-notch-tab">Our Team</div>
            </div>
            <div className="sr-team-grid">
              {[
                { name: 'Aadil Belim', role: 'Founder &\nChief Vision Officer', photo: '/aadil-bw.jpg', hoverPhoto: '/aadil.jpg', link: 'https://www.linkedin.com/in/aadilniti/' },
                { name: 'Uzma A', role: 'Director &\nChief Culture Officer', photo: '/uzma-bw.jpg', hoverPhoto: '/uzma.jpg', link: 'https://www.linkedin.com/in/uzma-belim-45577a229/' },
                { name: 'Akshit Gadhia', role: 'Compliance Officer', photo: '/akshit-bw.jpg', hoverPhoto: '/akshit.jpg', link: 'https://www.linkedin.com/in/akshit-gadhia-b380a2180/' },
                { name: 'Sagar Narayan', role: 'Research Associate', photo: '/sagar-bw.jpg', hoverPhoto: '/sagar.jpg', link: 'https://www.linkedin.com/in/sagarnaarayan/' },
                { name: 'Pallavi Kaushik', role: 'Project Manager, Sva-Bharat Movement', photo: '/pallavi-bw.jpg', hoverPhoto: '/pallavi.jpg', link: 'https://www.linkedin.com/in/pallavi-kaushik-pmp-4420471b7/' }
              ].map((member, i) => (
                <div
                  key={i}
                  ref={(el) => { cardRefs.current[i] = el }}
                  className={`sr-team-card${visibleCards.has(i) ? ' is-visible' : ''}${tappedCard === i ? ' tapped' : ''}`}
                  style={{ ['--delay' as any]: `${i * 120}ms` }}
                  onClick={() => setTappedCard(tappedCard === i ? null : i)}
                >
                  <div className="sr-team-photo-col">
                    <Image src={member.photo || '/avatar-placeholder.svg'} alt={member.name} fill className="sr-team-photo-base" unoptimized />
                    {member.hoverPhoto && (
                      <Image 
                        src={member.hoverPhoto} 
                        alt={member.name} 
                        fill 
                        className="sr-team-photo-hover" 
                        unoptimized 
                      />
                    )}
                  </div>
                  <div className="sr-team-info-col">
                    <div className="sr-team-info-top">
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                    </div>
                    <div className="sr-team-email-row">
                      {member.link ? (
                        <a href={member.link} target="_blank" rel="noopener noreferrer">
                          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#0077b5">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="#0077b5">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARTNERS SECTION */}
      <section className="sr-page">
        <div className="sr-partners-wrapper">
          <div className="sr-partners-container">
            <div className="sr-notch-tab-wrapper">
              <div className="sr-notch-tab">Collaborations &amp; Engagements</div>
            </div>
            <div className="sr-partners-coming-soon">
              UPDATING SOON
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
