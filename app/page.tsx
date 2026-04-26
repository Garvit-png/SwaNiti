"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { GooeyCursor, GooeyFilter } from '@/components/GooeyCursor'


import Marquee from '@/components/Marquee'

export default function Home() {
  const projects = [
    {
      title: 'Sva-Bharat Movement',
      desc: "Change in Bharat begins with a movement, not just a policy. Sva-Bharat Movement by SvaNiti channels the aspirations of the people, uniting ideas and voices through regional and campus ambassadors to shape a transformative future.",
      color: "#e0fcf8"
    },
    {
      title: 'Viksit Bharat Darshan Yatra',
      desc: "Viksit Bharat Darshan Yatra honors the Prime Minister’s mission for a Developed India by 2047, emphasizing self-discovery through solo, purposeful, and philosophical journeys, shaping individuals with purpose for Vikshit Yuva for Viksit Bharat.",
      color: "#fff9e6"
    },
    {
      title: 'LifeSite (जीवन-स्थल) Conceptualization',
      desc: "LifeSite originated from a seven-year pilot research project initiated by our founder, aimed at exploring an education system that transcends traditional schools, colleges, and universities, addressing the needs of the current era.",
      color: "#f0fdfc"
    },
    {
      title: 'Notion of Ministry of Creative Economy Affairs',
      desc: "The creative economy holds the potential to be a powerful multiplier for our economy, unlocking new opportunities in employment, tourism, exports, innovation, and social inclusion. Our proposal to establish a dedicated ministry aims to strengthen initiatives and streamline regulations within this dynamic sector.",
      color: "#e0fcf8"
    }
  ];

  return (
    <main className="main-viewport">
      {/* HERO SECTION */}
      <section className="hero-container">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="main-card"
        >
          <GooeyFilter id="goo-filter" strength={15} />
          <GooeyCursor />

          <header className="header">
            <div className="logo-container">
              <div className="logo-tab">
                <Image src="/logo.png" alt="Logo" width={60} height={60} priority />
              </div>
              <span className="brand-name">SvaNiti Policy Research Center</span>
            </div>
            <nav className="nav">
              <a href="#" className="nav-link">About</a>
              <a href="#projects" className="nav-link">Projects</a>
              <a href="#insights" className="nav-link">Insights</a>
              <a href="#contact" className="nav-link">Governance</a>
            </nav>
          </header>

          <div className="hero-content">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="main-title"
            >
              We are Building Bharat's<br />
              Largest Idea Repository
            </motion.h1>
          </div>

          <footer className="footer">
            <div className="footer-left">
              <p className="mission-text">
                Education & Public Policy Think-Tank in being to Sync<br />
                Nation's Aspirations into Policy.
              </p>
            </div>
            <div className="footer-right">
              <a href="#contact" className="contact-link">Contact Us <span className="arrow-thin">→</span></a>
              <a href="#contact" className="join-btn">
                Join Our Movement
                <div className="arrow-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
              </a>
            </div>
          </footer>
        </motion.div>
      </section>

      {/* MARQUEE SECTION */}
      <Marquee />

      {/* WHAT WE DO SECTION */}

      <section id="projects" className="content-section services-section">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="section-header"
        >
          <span className="section-label">OUR PROJECTS</span>
          <h2 className="section-title">What We Do</h2>
        </motion.div>
        
        <div className="services-grid">
          {projects.map((project, i) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="project-card"
              style={{ background: project.color }}
            >
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <a href="#" className="card-link">Learn More <span>→</span></a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="vision-full">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="vision-content"
        >
          <p className="vision-tagline">Inspiring Aspirations • Designing Policy • Building Nation</p>
          <h2 className="vision-text">
            We exist to spark a movement that rethinks the policy-making process, 
            rejuvenates education with Indic ideas, and be a vital cog in the 
            mission towards Viksit Bharat.
          </h2>
        </motion.div>
      </section>

      {/* CONTACT & FOOTER */}
      <section id="contact" className="content-section contact-footer">
        <div className="contact-card">
          <div className="contact-info-panel">
            <h2>Let’s Talk,<br />What you got!</h2>
            <div className="info-item">
              <label>OFFICE ADDRESS</label>
              <p>I/Office Aadil Belim, Upleta, Rajkot - 360-490, Gujarat, Bharat.</p>
            </div>
            <div className="info-item">
              <label>CONTACT</label>
              <p>office@svaniti.in</p>
              <p>+91 2826 358065</p>
            </div>
          </div>
          <form className="contact-form-panel">
            <div className="form-row">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Contact No." />
            </div>
            <input type="email" placeholder="Email" />
            <textarea placeholder="Notion Note"></textarea>
            <button className="submit-btn-premium">Contact Now <span>→</span></button>
          </form>
        </div>

        <div className="footer-bottom-links">
          <div className="footer-brand">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span>SvaNiti Policy Research Center</span>
          </div>
          <div className="footer-nav">
            <a href="#">About</a>
            <a href="#">Projects</a>
            <a href="#">Insights</a>
            <a href="#">Privacy Policy</a>
          </div>
          <p className="copyright">© 2024 Think-Tank for Education & Public Policy</p>
        </div>
      </section>
    </main>
  )
}
