"use client"

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import testimonialsData from './data/testimonials.json'
export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const photoSectionRef = useRef<HTMLDivElement>(null)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  // Admin passcode state
  const adminRouter = useRouter()
  const [showPasscode, setShowPasscode] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [passcodeError, setPasscodeError] = useState(false)
  const [shakeKey, setShakeKey] = useState(0)

  const handleAdminClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (typeof window !== 'undefined' && sessionStorage.getItem('svaniti_admin') === 'true') {
      adminRouter.push('/admin/portal')
      return
    }
    setShowPasscode(true)
    setPasscode('')
    setPasscodeError(false)
  }

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      })
      
      if (res.ok) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('svaniti_admin', 'true')
        }
        setShowPasscode(false)
        setPasscodeError(false)
        adminRouter.push('/admin/portal')
      } else {
        setPasscodeError(true)
        setPasscode('')
        setShakeKey(prev => prev + 1)
      }
    } catch (error) {
      setPasscodeError(true)
      setPasscode('')
      setShakeKey(prev => prev + 1)
    }
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setShowPasscode(false)
      setPasscodeError(false)
      setPasscode('')
    }
  }

  // Contact form state
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    // For phone: allow only digits and max 10 characters
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10)
      setFormData(prev => ({ ...prev, phone: digitsOnly }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    // Clear error for this field as user types
    if (formErrors[name]) {
      setFormErrors(prev => { const n = { ...prev }; delete n[name]; return n })
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) errors.name = 'Please enter your name'
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your contact number'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.phone = 'Mobile number must be exactly 10 digits'
    }
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email'
    } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!formData.message.trim()) errors.message = 'Please write your notion note'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setFormStatus('error')
      setFormMessage('Please fill in all the required fields')
      // Auto-dismiss the banner after 4 seconds
      setTimeout(() => { setFormStatus('idle'); setFormMessage('') }, 4000)
      return
    }

    setFormErrors({})
    setFormStatus('loading')
    setFormMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (res.ok) {
        setFormStatus('success')
        setFormMessage('Your message has been sent successfully! We will get back to you soon.')
        setFormData({ name: '', phone: '', email: '', message: '' })
      } else {
        setFormStatus('error')
        setFormMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setFormStatus('error')
      setFormMessage('Network error. Please check your connection and try again.')
    }
  }

  const testimonials = testimonialsData

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [testimonials.length])

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


  const row1 = [
    { text: 'First Principles Thinking', color: 'cream' },
    { img: '/marquee/photo1.jpg' },
    { text: 'Experiential Learning', color: 'cyan' },
    { img: '/marquee/photo2.jpg' },
    { text: 'Youth Leadership', color: 'cream' },
  ]

  const row2 = [
    { text: 'Unconventional Approaches', color: 'cyan' },
    { img: '/marquee/photo3.jpg' },
    { text: 'System Thinking', color: 'cream' },
    { text: 'Policy Innovation', color: 'cyan' },
  ]

  const row3 = [
    { text: 'Creative Economy', color: 'cream' },
    { img: '/marquee/photo4.jpg' },
    { text: 'Collaborative Dialogue', color: 'cyan' },
    { text: 'Future Readiness', color: 'cream' },
    { text: 'Nation Building', color: 'cyan' },
  ]

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
            <Navbar activePath="/" onMenuClick={() => setMenuOpen(true)} />

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



      {/* SECTION 3: OUR CRAFT */}
      <section id="projects" className="sr-page relative overflow-x-hidden">
        <div className="sr-projects-container" style={{ perspective: '1000px' }}>
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

      {/* SECTION 4: OUR VISION (Preview) */}
      <section className="sr-page">
        <div className="sr-vision-container sr-animate-in">
          <div className="sr-vision-notch-outer">
            <div className="sr-vision-notch-inner">Our Vision</div>
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
          {/* Text Side: Quote card + nav (Now on the left) */}
          <div className="sr-test-right" style={{ position: 'relative' }}>
            <div className="sr-section-notch-outer" style={{ position: 'absolute', top: '-1px', left: '-1px', zIndex: 10 }}>
              <div className="sr-section-notch-inner">What People <strong>Think About Us</strong></div>
            </div>
            
            <div className="sr-test-card-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="sr-testimonial-main-card"
                >
                  <p className="sr-main-quote">&ldquo;{testimonials[testimonialIndex].quote}&rdquo;</p>
                  <div className="sr-test-author-row">
                    <div className="sr-test-accent-bar"></div>
                    <div className="sr-main-author">
                      <strong>{testimonials[testimonialIndex].author}</strong>
                      <span>{testimonials[testimonialIndex].org}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="sr-testimonial-nav">
              <button
                onClick={() => setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="sr-nav-btn"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={20} />
              </button>
              <button
                onClick={() => setTestimonialIndex((prev) => (prev + 1) % testimonials.length)}
                className="sr-nav-btn"
                aria-label="Next testimonial"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Photo Side (Now on the right) */}
          <div className="sr-test-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
              >
                <Image
                  src={testimonials[testimonialIndex].photo || '/logo.png'}
                  alt={testimonials[testimonialIndex].author}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="sr-test-photo"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 6: LET'S TALK */}
      <section id="contact" className="sr-page sr-footer-section">
        <div className="sr-footer-container">
          <div className="sr-section-notch-outer sr-footer-notch-outer">
            <div className="sr-section-notch-inner">Let's Talk, What you got!</div>
          </div>
          <div className="sr-footer-content">
            <h3>Contact us for any notion for nation</h3>

            {/* Status Banner */}
            <AnimatePresence>
              {formMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`sr-form-banner ${formStatus}`}
                >
                  {formStatus === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <span>{formMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form className="sr-contact-form" onSubmit={handleFormSubmit} noValidate>
              <div className="sr-form-row">
                <div className={`sr-form-group ${formErrors.name ? 'has-error' : ''}`}>
                  <label htmlFor="contact-name">Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Your full name"
                  />
                  {formErrors.name && (
                    <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="sr-field-error">
                      {formErrors.name}
                    </motion.span>
                  )}
                </div>
                <div className={`sr-form-group ${formErrors.phone ? 'has-error' : ''}`}>
                  <label htmlFor="contact-phone">Contact No. *</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="10 digit mobile number"
                    maxLength={10}
                    inputMode="numeric"
                  />
                  {formErrors.phone && (
                    <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="sr-field-error">
                      {formErrors.phone}
                    </motion.span>
                  )}
                </div>
              </div>

              <div className={`sr-form-group full-width ${formErrors.email ? 'has-error' : ''}`}>
                <label htmlFor="contact-email">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="you@example.com"
                />
                {formErrors.email && (
                  <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="sr-field-error">
                    {formErrors.email}
                  </motion.span>
                )}
              </div>

              <div className={`sr-form-group full-width ${formErrors.message ? 'has-error' : ''}`}>
                <label htmlFor="contact-message">Notion Note *</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Share your notion for the nation..."
                ></textarea>
                {formErrors.message && (
                  <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="sr-field-error">
                    {formErrors.message}
                  </motion.span>
                )}
              </div>

              <button
                type="submit"
                className={`sr-contact-submit ${formStatus === 'loading' ? 'loading' : ''}`}
                disabled={formStatus === 'loading'}
              >
                {formStatus === 'loading' ? (
                  <>
                    <Loader2 size={18} className="sr-spinner" />
                    Sending...
                  </>
                ) : (
                  'Contact Now'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FINAL FOOTER */}
      {/* FINAL FOOTER */}
      <Footer />

      {/* ADMIN PASSCODE MODAL */}
      {showPasscode && (
        <div className="sr-passcode-overlay" onClick={handleOverlayClick}>
          <form 
            key={shakeKey}
            className={`sr-passcode-modal ${passcodeError ? 'sr-passcode-shake' : ''}`} 
            onSubmit={handlePasscodeSubmit}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              type="button" 
              className="sr-passcode-close" 
              onClick={() => { setShowPasscode(false); setPasscodeError(false); setPasscode('') }}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="sr-passcode-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                <circle cx="12" cy="16" r="1"/>
              </svg>
            </div>
            <h3>Admin Access</h3>
            <p>Enter the passcode to continue</p>
            <input 
              type="password" 
              value={passcode} 
              onChange={(e) => { setPasscode(e.target.value); setPasscodeError(false) }} 
              placeholder="• • • •"
              autoFocus
              maxLength={10}
            />
            {passcodeError && <span className="sr-passcode-error">Incorrect passcode</span>}
            <button type="submit" className="sr-passcode-submit">Unlock</button>
          </form>
        </div>
      )}


    </main>
  )
}
