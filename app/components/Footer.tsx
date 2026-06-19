'use client'

import Link from 'next/link'

export default function Footer() {
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
              aria-label="LinkedIn"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0a66c2" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/svaniti.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="sr-social-icon"
              aria-label="Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="ig-grad" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="25%" stopColor="#e6683c" />
                    <stop offset="50%" stopColor="#dc2743" />
                    <stop offset="75%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-grad)" strokeWidth="2" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#ig-grad)" strokeWidth="2" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#ig-grad)" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </a>
            <a
              href="https://x.com/SvaNiti"
              target="_blank"
              rel="noopener noreferrer"
              className="sr-social-icon"
              aria-label="X (Twitter)"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="sr-footer-mission">
          <strong>Think-Tank for Education<br />&amp; Public Policy</strong>
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
        <Link
          href="/admin/portal"
          className="sr-footer-admin-btn"
          aria-label="Admin Portal"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          Admin Portal
        </Link>
      </div>
    </footer>
  )
}
