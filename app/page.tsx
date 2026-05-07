"use client"

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const getRotation = (index: number) => {
    if (hoveredIndex === null || hoveredIndex === index) {
      return { rotateX: 0, rotateY: 0, scale: hoveredIndex === index ? 1.02 : 1, opacity: 1 }
    }
    
    const cols = 3
    const row = Math.floor(index / cols)
    const col = index % cols
    const hRow = Math.floor(hoveredIndex / cols)
    const hCol = hoveredIndex % cols

    const dx = hCol - col
    const dy = hRow - row

    return {
      rotateY: dx * 8,
      rotateX: -dy * 8,
      scale: 0.98,
      opacity: 0.6
    }
  }

  // Scroll tracking for the horizontal section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Horizontal transforms: alternating directions for parallax depth
  const xLeft = useTransform(scrollYProgress, [0, 1], [200, -200])
  const xRight = useTransform(scrollYProgress, [0, 1], [-200, 200])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    cardRef.current.style.setProperty('--m-x', `${x}%`)
    cardRef.current.style.setProperty('--m-y', `${y}%`)
  }

  const navLinks = [
    { label: 'About', href: '#' },
    { label: 'Projects', href: '#' },
    { label: 'Insights', href: '#' },
    { label: 'Governance', href: '#' },
  ]

  const row1 = [
    { text: 'Inspiration', color: 'cream' },
    { img: '/marquee/photo1.jpg' },
    { text: 'Notions', color: 'cyan' },
    { img: '/marquee/photo2.jpg' },
    { text: 'Inspiration', color: 'cream' },
    { img: '/marquee/photo1.jpg' },
  ]

  const row2 = [
    { text: "People's Aspiration", color: 'cyan' },
    { img: '/marquee/photo3.jpg' },
    { text: 'Unconventional', color: 'cream' },
    { text: "People's Aspiration", color: 'cyan' },
    { img: '/marquee/photo3.jpg' },
  ]

  const row3 = [
    { text: 'Non-Partisan', color: 'cream' },
    { img: '/marquee/photo4.jpg' },
    { text: 'Policy', color: 'cyan' },
    { text: 'Non-Partisan', color: 'cream' },
    { img: '/marquee/photo4.jpg' },
  ]

  const projects = [
    {
      title: "Sva-Bharat Movement",
      desc: "Change in Bharat begins with a movement, not just a policy. Sva-Bharat Movement by SvaNiti channels the aspirations of the people, uniting ideas and voices through regional and campus ambassadors to shape a transformative future."
    },
    {
      title: "Viksit Bharat Darshan Yatra",
      desc: "Viksit Bharat Darshan Yatra honors the Prime Minister's mission for a Developed India by 2047, emphasizing self-discovery through solo, purposeful, and philosophical journeys, shaping individuals with purpose for Viksit Yuva for Viksit Bharat."
    },
    {
      title: "LifeSite (जीवन-स्थल) Conceptualization",
      desc: "LifeSite originated from a seven-year pilot research project initiated by our founder, aimed at exploring an education system that transcends traditional schools, colleges, and universities, addressing the needs of the current era.",
      organic: true
    },
    {
      title: "Notion of Ministry of Creative Economy Affairs",
      desc: "The creative economy holds the potential to be a powerful multiplier for our economy, unlocking new opportunities in employment, tourism, exports, innovation, and social inclusion. Our proposal to establish a dedicated ministry aims to strengthen initiatives and streamline regulations within this dynamic sector."
    }
  ]

  return (
    <main className="sr-page-wrapper">
      {/* SECTION 1: HERO */}
      <section id="top" className="sr-page full-screen">
        <div className="sr-hero">
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="sr-hero-card sr-animate-in"
          >
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
              <nav className="sr-card-links">
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
                <a className="sr-contact-link" href="#">
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
        </div>
      </section>

      {/* SECTION 2: SCROLL REACTIVE SECTION */}
      <section ref={containerRef} className="sr-scroll-section sr-full-height">
        <div className="sr-scroll-container">
          {/* Row 1 */}
          <motion.div style={{ x: xLeft }} className="sr-marquee-row">
            {row1.map((item, i) => (
              item.text ? (
                <div key={i} className={`sr-tag ${item.color}`}>{item.text}</div>
              ) : (
                <div key={i} className="sr-marquee-img">
                  <Image src={item.img!} alt="Project" width={100} height={100} />
                </div>
              )
            ))}
          </motion.div>

          {/* Row 2 */}
          <motion.div style={{ x: xRight }} className="sr-marquee-row">
            {row2.map((item, i) => (
              item.text ? (
                <div key={i} className={`sr-tag ${item.color}`}>{item.text}</div>
              ) : (
                <div key={i} className="sr-marquee-img">
                  <Image src={item.img!} alt="Project" width={100} height={100} />
                </div>
              )
            ))}
          </motion.div>

          {/* Row 3 */}
          <motion.div style={{ x: xLeft }} className="sr-marquee-row">
            {row3.map((item, i) => (
              item.text ? (
                <div key={i} className={`sr-tag ${item.color}`}>{item.text}</div>
              ) : (
                <div key={i} className="sr-marquee-img">
                  <Image src={item.img!} alt="Project" width={100} height={100} />
                </div>
              )
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE DO */}
      <section id="projects" className="sr-page">
        <div className="sr-projects-container sr-animate-in" style={{ perspective: '1000px' }}>
          {/* Section Notch */}
          <div className="sr-card-logo-notch dark">
            <span className="sr-notch-label">What We Do</span>
          </div>

          <motion.div 
            className="sr-projects-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
                animate={getRotation(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`sr-project-card ${project.organic ? 'organic' : ''}`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="sr-card-learn-more">
                  <span>Learn More</span>
                  <div className="sr-arrow-box small">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: OUR VISION (Preview) */}
      <section className="sr-page">
        <div className="sr-vision-container sr-animate-in">
           <div className="sr-card-logo-notch dark">
            <span className="sr-notch-label">Our Vision</span>
          </div>
          <div className="sr-vision-content">
            <div className="sr-vision-main">
              <h2>Inspiring Aspirations,<br />Designing Policy,<br />Building Nation.</h2>
            </div>
            <div className="sr-vision-sub">
              <p>We exist to spark a movement that rethinks the policy-making process, rejuvenates education with Indic ideas, and be a vital cog in the mission towards Viksit Bharat.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
