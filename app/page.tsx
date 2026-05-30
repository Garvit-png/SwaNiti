"use client"

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const photoSectionRef = useRef<HTMLDivElement>(null)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const testimonials = [
    {
      quote: "The idea of SvaNiti is much needed and Aadil has much more clarity on this idea at this initial stage.",
      author: "Jigar Inamdar (Youth Leader & Politician)",
      org: "PBC 2024, Rishihood University."
    },
    {
      quote: "It's need of time that our country needs Creative Economy Ministry. We need initiative and regulations from governement to grow more as industry. SvaNiti is Bang on promoting idea and research on the same.",
      author: "Sheron (Creative Artist)",
      org: "Nudge Charcha 2024"
    }
  ]

  // Scroll tracking for the horizontal section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Horizontal transforms: alternating directions for parallax depth
  const xLeft = useTransform(scrollYProgress, [0, 1], [200, -200])
  const xRight = useTransform(scrollYProgress, [0, 1], [-200, 200])

  // Photo section scroll reveal
  const { scrollYProgress: photoScrollY } = useScroll({
    target: photoSectionRef,
    offset: ["start end", "end start"]
  })

  const photoScale = 1 
  const photoOpacity = 1 
  const photoY = 0 
  const testimonialOpacity = useTransform(photoScrollY, [0.5, 0.7], [0, 1])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    cardRef.current.style.setProperty('--m-x', `${x}%`)
    cardRef.current.style.setProperty('--m-y', `${y}%`)
  }

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#about' },
    { label: 'Insights', href: '#' },
    { label: 'Governance', href: '#' },
  ]

  const row1 = [
    { text: 'Inspiration', color: 'cream' },
    { img: '/marquee/photo1.jpg' },
    { text: 'Notions', color: 'cyan' },
    { img: '/marquee/photo2.jpg' },
    { text: 'Research', color: 'cream' },
  ]

  const row2 = [
    { text: "People's Aspiration", color: 'cyan' },
    { img: '/marquee/photo3.jpg' },
    { text: 'Unconventional', color: 'cream' },
    { text: 'Sync', color: 'cyan' },
  ]

  const row3 = [
    { text: 'Non-Partisan', color: 'cream' },
    { img: '/marquee/photo4.jpg' },
    { text: 'Policy', color: 'cyan' },
    { text: 'Governance', color: 'cream' },
  ]

  const projects = [
    {
      title: "Sva-Bharat Movement",
      desc: "Change in Bharat begins with a movement, not just a policy. Sva-Bharat Movement by SvaNiti channels the aspirations of the people, uniting ideas and voices through regional and campus ambassadors to shape a transformative future.",
    },
    {
      title: "Viksit Bharat Darshan Yatra",
      desc: "Viksit Bharat Darshan Yatra honors the Prime Minister's mission for a Developed India by 2047, emphasizing self-discovery through solo, purposeful, and philosophical journeys, shaping individuals with purpose for Viksit Yuva for Viksit Bharat.",
    },
    {
      title: "LifeSite (जीवन-स्थल) Conceptualization",
      desc: "LifeSite originated from a seven-year pilot research project initiated by our founder, aimed at exploring an education system that transcends traditional schools, colleges, and universities, addressing the needs of the current era.",
      organic: true,
    },
    {
      title: "Notion of Ministry of Creative Economy Affairs",
      desc: "The creative economy holds the potential to be a powerful multiplier for our economy, unlocking new opportunities in employment, tourism, exports, innovation, and social inclusion. Our proposal to establish a dedicated ministry aims to strengthen initiatives and streamline regulations within this dynamic sector.",
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
              <a href="#" className="sr-logo-link">
                <div className="sr-logo-wrapper">
                  <Image src="/logo.png" alt="SvaNiti Logo" width={80} height={80} priority />
                </div>
              </a>
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
              <button 
                className="sr-hamburger-btn" 
                aria-label="Menu"
                onClick={() => setMenuOpen(true)}
              >
                //
              </button>
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
                <a className="sr-contact-link" href="#contact">
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
      <section id="projects" className="sr-page relative overflow-x-hidden">
        <div className="sr-projects-container" style={{ perspective: '1000px' }}>
          {/* Section Heading */}
          <div className="relative w-full mb-8 z-10">
            {/* Heading Content */}
            <div className="relative z-10 flex flex-col items-start">
              {/* Teal Accent Bar */}
              <div className="w-[40px] h-[3px] bg-[#2D6A6A] rounded-sm mb-3"></div>
              
              {/* Text */}
              <h2 className="flex flex-col text-[2.5rem] md:text-[3.5rem] leading-none tracking-tight m-0">
                <span style={{ fontWeight: 300, color: '#1a1a1a' }}>What</span>
                <span style={{ fontWeight: 700, color: '#0D2B2B' }}>We Do</span>
              </h2>
            </div>
          </div>

          <div className="sr-projects-grid relative z-10">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  hidden: { opacity: 0, y: 80, x: -20, rotate: -2 },
                  show: {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    rotate: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: i * 0.1
                    }
                  }
                }}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
                }}
                className={`sr-project-card ${project.organic ? 'organic' : ''} transition-colors duration-300 relative overflow-hidden`}
              >
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="sr-card-learn-more">
                  <span className="font-semibold">Learn More</span>
                  <div className="sr-arrow-box small">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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

      {/* SECTION 5: TEAM PHOTO */}
      <section ref={photoSectionRef} className="sr-photo-section">
        <div className="sr-photo-wrapper">
          <Image
            src="/team-final.png"
            alt="SvaNiti Team"
            width={1920}
            height={1080}
            className="sr-team-photo"
          />
        </div>
      </section>

      {/* SECTION 5.5: TESTIMONIALS */}
      <section className="sr-testimonial-section">
        <div className="sr-testimonial-container">
          <div className="sr-testimonial-header">
            <span>What people tell about us?</span>
          </div>
          
          <div className="sr-testimonial-slider-container">
            <AnimatePresence mode="wait">
              <motion.div 
                key={testimonialIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="sr-testimonial-main-card"
              >
                <p className="sr-main-quote">"{testimonials[testimonialIndex].quote}"</p>
                <div className="sr-main-author">
                  <strong>{testimonials[testimonialIndex].author}</strong>
                  <span>{testimonials[testimonialIndex].org}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="sr-testimonial-nav">
              <button 
                onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="sr-nav-btn"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                className="sr-nav-btn"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: LET'S TALK */}
      <section id="contact" className="sr-page sr-footer-section">
        <div className="sr-footer-container">
          <div className="sr-card-logo-notch dark footer-notch">
            <span className="sr-notch-label">Let's Talk, What you got!</span>
          </div>
          <div className="sr-footer-content">
            <h3>Contact us for any notion for nation</h3>
            
            <form className="sr-contact-form">
              <div className="sr-form-row">
                <div className="sr-form-group">
                  <label>Name *</label>
                  <input type="text" placeholder="" required />
                </div>
                <div className="sr-form-group">
                  <label>Contact No. *</label>
                  <input type="text" placeholder="" required />
                </div>
              </div>

              <div className="sr-form-group full-width">
                <label>Email *</label>
                <input type="email" placeholder="" required />
              </div>

              <div className="sr-form-group full-width">
                <label>Notion Note *</label>
                <textarea rows={4} placeholder="" required></textarea>
              </div>

              <button type="submit" className="sr-contact-submit">
                Contact Now
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FINAL FOOTER */}
      <footer className="sr-site-footer">
        <div className="sr-footer-main">
          <div className="sr-footer-branding">
            <a href="#" className="sr-footer-logo-link">
              <div className="sr-footer-logo-box">
                SvaNiti Policy Research Center
              </div>
            </a>
            <div className="sr-footer-social">
              <a 
                href="https://www.linkedin.com/company/svaniti-policy-research-center/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="sr-social-icon"
              >
                in
              </a>
            </div>
          </div>

          <div className="sr-footer-mission">
            <strong>Think-Tank for Education<br/>& Public Policy</strong>
          </div>

          <div className="sr-footer-links">
            <h4>What We Do</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#about">Governance</a></li>
              <li><a href="#contact">Contact us</a></li>
            </ul>
          </div>

          <div className="sr-footer-contact">
            <h4>Get In Touch</h4>
            <address>
              I/Office Aadil Belim, Upleta,<br/>
              Rajkot - 360-490, Gujarat, Bharat.<br/>
              <a href="mailto:office@svaniti.in">office@svaniti.in</a><br/>
              +91 2826 358065
            </address>
          </div>
        </div>

        <div className="sr-footer-bottom">
          <p>© 2024-2028 by Creative Studio SvaNiti Policy Research Center</p>
        </div>
      </footer>

      {/* CREATIVE MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="sr-mobile-menu-overlay"
          >
            {/* Top Bar */}
            <div className="sr-menu-overlay-header">
              <div className="sr-menu-logo-notch">
                <Image src="/logo.png" alt="SvaNiti Logo" width={44} height={44} />
              </div>
              <div className="sr-menu-brand">
                <strong>SvaNiti Policy Research Center</strong>
              </div>
              <button 
                className="sr-menu-close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                X
              </button>
            </div>

            {/* Nav Links */}
            <nav className="sr-menu-nav-links">
              {[
                { num: '01', label: 'About', href: '#about' },
                { num: '02', label: 'Projects', href: '#projects' },
                { num: '03', label: 'Insights', href: '#' },
                { num: '04', label: 'Governance', href: '#' },
              ].map((item, index) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="sr-menu-nav-item"
                >
                  <span className="sr-nav-num">{item.num}</span>
                  <span className="sr-nav-text">{item.label}</span>
                  <span className="sr-nav-arrow"><ArrowRight size={28} /></span>
                </motion.a>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="sr-menu-footer">
              <a className="sr-menu-join-btn" href="#" onClick={() => setMenuOpen(false)}>
                Join Our Movement
                <span className="sr-menu-arrow-box">
                  <ArrowRight size={20} />
                </span>
              </a>
              <div className="sr-menu-contact-info">
                <span>office@svaniti.in</span>
                <span className="sr-divider-pipe">|</span>
                <span>+91 90675 47325</span>
              </div>
              <a 
                href="https://www.linkedin.com/company/svaniti-policy-research-center/"
                target="_blank"
                rel="noopener noreferrer"
                className="sr-menu-social-link"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
