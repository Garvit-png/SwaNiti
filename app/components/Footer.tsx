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
            >
              in
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
