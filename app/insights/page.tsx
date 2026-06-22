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
  coverUrl?: string
  mediumUrl?: string
}

import allBlogsData from '../data/blogs.json'

const allBlogs = (allBlogsData as any[]).map((blog: any) => ({
  ...blog,
  patternType: blog.patternType as 'orange' | 'cyan' | 'yellow',
  gridClass: styles[blog.gridClass] || ''
})) as Blog[]

import Footer from '../components/Footer'
export default function InsightsPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Most Recent')
  const heroCardRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([])

  // Category list
  const categories = ['Most Recent', 'All', 'Policy', 'Youth', 'Education', 'Movement']

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
  let filteredBlogs = [...allBlogs].reverse().filter((blog) => {
    const matchesCategory = selectedCategory === 'All' || selectedCategory === 'Most Recent' || blog.category === selectedCategory
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  
  if (selectedCategory === 'Most Recent' && !searchQuery) {
    filteredBlogs = filteredBlogs.slice(0, 4)
  }

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
                  <a
                    key={blog.id}
                    href={blog.mediumUrl || `/insights/${blog.id}`}
                    target={blog.mediumUrl ? '_blank' : undefined}
                    rel={blog.mediumUrl ? 'noopener noreferrer' : undefined}
                    ref={(el) => { cardRefs.current[index] = el }}
                    className={`${styles.blogCard} ${blog.gridClass}`}
                    style={{ transitionDelay: `${index * 0.05}s` }}
                  >
                    <div className={styles.imageWrapper}>
                      {blog.coverUrl ? (
                        <img 
                          src={blog.coverUrl} 
                          alt={blog.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <div className={`${styles.patternBackdrop} ${patternClass}`}>
                          <div className={styles.patternTitle}>
                            {blog.title.split(':')[0]}
                          </div>
                          <span className={styles.patternSub}>SvaNiti Policy Research</span>
                        </div>
                      )}
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
                  </a>
                )
              })
            ) : (
              <div className={styles.emptyState}>
                <h3>No insights found</h3>
                <p>We couldn't find any articles matching your search criteria. Try a different category or search term.</p>
                <button
                  className={styles.clearSearchBtn}
                  onClick={() => { setSearchQuery(''); setSelectedCategory('Most Recent') }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>

      {/* FOOTER */}
      <Footer />


    </main>
  )
}
