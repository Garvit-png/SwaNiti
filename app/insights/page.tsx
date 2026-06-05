"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Search, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import styles from './insights.module.css'

type Blog = {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  patternType: 'orange' | 'cyan' | 'yellow'
  gridClass: string
}

const allBlogs: Blog[] = [
  {
    id: 'creative-future-ministry',
    title: "Institutionalizing India's Creative Future: The Case for a Dedicated Ministry",
    excerpt: "The inaugural World Audio Visual & Entertainment Summit (WAVES) 2025, held in Mumbai, represents a landmark shift towards regulating and supporting India's booming creative economy affairs.",
    category: "Policy",
    readTime: "5 min read",
    patternType: 'orange',
    gridClass: styles.blogCardLarge
  },
  {
    id: 'darshan-yatra-discovery',
    title: "Viksit Bharat Darshan Yatra: Transforming Youth through Self-Discovery",
    excerpt: "Fostering leadership and philosophical reflection through solo travel and deep civic engagements across the historic landscapes of Bharat.",
    category: "Youth",
    readTime: "6 min read",
    patternType: 'cyan',
    gridClass: styles.blogCardSmall
  },
  {
    id: 'lifesite-classroom-paradigm',
    title: "The LifeSite Paradigm: Evolving Beyond the Traditional Classroom",
    excerpt: "Exploring an educational framework rooted in Bharatiya values that transcends standard schools and universities, empowering holistic development.",
    category: "Education",
    readTime: "8 min read",
    patternType: 'yellow',
    gridClass: styles.blogCardMedium
  },
  {
    id: 'sva-bharat-movement-aspirations',
    title: "Sva-Bharat Movement: Channelling the Collective Aspirations of a Nation",
    excerpt: "How campus and regional ambassadors are coming together to shape public policy, youth leadership, and direct civic dialogues.",
    category: "Movement",
    readTime: "4 min read",
    patternType: 'orange',
    gridClass: styles.blogCardMedium
  },
  {
    id: 'creative-economy-multiplier',
    title: "Creative Economy: The Multiplier Effect for Bharat's Economic Growth",
    excerpt: "Unlocking new opportunities in employment, tourism, exports, and social inclusion by integrating technology and indigenous arts into global pipelines.",
    category: "Policy",
    readTime: "7 min read",
    patternType: 'cyan',
    gridClass: styles.blogCardFull
  }
]

function InsightsFooter() {
  return (
    <footer className="sr-site-footer">
      <div className="sr-footer-main">
        <div className="sr-footer-branding">
          <Link href="/" className="sr-footer-logo-link">
            <div className="sr-footer-logo-box">SvaNiti Policy Research Center</div>
          </Link>
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
          <strong>Think-Tank for Education<br />& Public Policy</strong>
        </div>

        <div className="sr-footer-links">
          <h4>What We Do</h4>
          <ul>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/#contact">Contact us</Link></li>
          </ul>
        </div>

        <div className="sr-footer-contact">
          <h4>Get In Touch</h4>
          <address>
            I/Office Aadil Belim, Upleta,<br />
            Rajkot - 360-490, Gujarat, Bharat.<br />
            <a href="mailto:office@svaniti.in">office@svaniti.in</a><br />
            +91 2826 358065
          </address>
        </div>
      </div>

      <div className="sr-footer-bottom">
        <p>© 2024-2028 by Creative Studio SvaNiti Policy Research Center</p>
      </div>
    </footer>
  )
}

export default function InsightsPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const heroCardRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([])

  // Category list
  const categories = ['All', 'Policy', 'Youth', 'Education', 'Movement']

  // Handle hero mouse move pattern
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroCardRef.current) return
    const { left, top, width, height } = heroCardRef.current.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    heroCardRef.current.style.setProperty('--m-x', `${x}%`)
    heroCardRef.current.style.setProperty('--m-y', `${y}%`)
  }

  // Filtered blogs
  const filteredBlogs = allBlogs.filter((blog) => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Animation intersection observer for blog cards
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLAnchorElement[]
    if (!cards.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.blogCardVisible)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [filteredBlogs])

  return (
    <main className={styles.page}>
      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className="sr-hero">
          <div
            ref={heroCardRef}
            onMouseMove={handleMouseMove}
            className={`sr-hero-card ${styles.heroCard} sr-animate-in`}
          >
            <Navbar activePath="/insights" onMenuClick={() => setMenuOpen(true)} />

            <div className={styles.heroInner}>
              <h1>Insights &amp; Ideas</h1>
              <p>Explore articles, policy analyses, and reflections on the creative future, education and national progress of Bharat.</p>
              <div className={styles.heroLine} />
            </div>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className={styles.controlsSection}>
        <div className={styles.searchAndFilterBar}>
          {/* Custom Filter Tabs */}
          <div className={styles.filterTabs}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.filterTab} ${selectedCategory === cat ? styles.filterTabActive : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Container */}
          <div className={styles.searchContainer}>
            <Search className={styles.searchIcon} size={20} />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      </section>

      {/* BLOG ASYMMETRICAL GRID */}
      <div className={styles.gridWrapper}>
        <section className={styles.blogGrid}>
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog, index) => {
                // Get the background pattern class based on patternType
                let patternClass = styles.orangeGridPattern
                if (blog.patternType === 'cyan') patternClass = styles.cyanGridPattern
                if (blog.patternType === 'yellow') patternClass = styles.yellowGridPattern

                return (
                  <Link
                    key={blog.id}
                    href={`/insights/${blog.id}`}
                    ref={(el) => { cardRefs.current[index] = el }}
                    className={`${styles.blogCard} ${blog.gridClass}`}
                    style={{ transitionDelay: `${index * 0.05}s` }}
                  >
                    <div className={styles.imageWrapper}>
                      <div className={`${styles.patternBackdrop} ${patternClass}`}>
                        <div className={styles.patternTitle}>
                          {blog.title.split(':')[0]}
                        </div>
                        <span className={styles.patternSub}>SvaNiti Policy Research</span>
                      </div>
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.cardHeader}>
                        <span className={styles.tag}>{blog.category}</span>
                        <span className={styles.readTime}>{blog.readTime}</span>
                      </div>
                      
                      <h3 className={styles.cardTitle}>{blog.title}</h3>
                      <p className={styles.cardDesc}>{blog.excerpt}</p>
                      
                      <div className={styles.cardFooter}>
                        <span>Read Full Insight</span>
                        <ArrowRight className={styles.arrowIcon} size={18} />
                      </div>
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className={styles.emptyState}>
                <h3>No insights found</h3>
                <p>We couldn't find any articles matching your search criteria. Try a different category or search term.</p>
                <button 
                  className={styles.clearSearchBtn}
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* FOOTER */}
      <InsightsFooter />

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            className="sr-mobile-menu-overlay"
          >
            <div className="sr-menu-overlay-header">
              <div className="sr-menu-logo-notch">
                <img src="/logo.png" alt="SvaNiti Logo" width={44} height={44} />
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

            <nav className="sr-menu-nav-links">
              {[
                { num: '01', label: 'About', href: '/about' },
                { num: '02', label: 'Projects', href: '/projects' },
                { num: '03', label: 'Insights', href: '/insights' },
                { num: '04', label: 'Governance', href: '#' },
              ].map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="sr-menu-nav-item"
                >
                  <span className="sr-nav-num">{item.num}</span>
                  <span className="sr-nav-text">{item.label}</span>
                  <span className="sr-nav-arrow"><ArrowRight size={28} /></span>
                </Link>
              ))}
            </nav>

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
