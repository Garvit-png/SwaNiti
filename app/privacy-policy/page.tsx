'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <main className="main-viewport">
      <section style={{ minHeight: '100vh', padding: '60px 40px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/" style={{ color: '#0B2228', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
            ← Back to Home
          </Link>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ fontSize: '2.5rem', color: '#0B2228', marginBottom: '30px' }}>Privacy Policy</h1>

            <div style={{ fontSize: '1rem', lineHeight: '1.8', color: '#333' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#0B2228', marginTop: '30px', marginBottom: '15px' }}>Introduction</h2>
              <p>
                SvaNiti Policy Research Center ("we", "our", or "us") operates the www.svaniti.in website (the "Service").
              </p>
              <p>
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>

              <h2 style={{ fontSize: '1.5rem', color: '#0B2228', marginTop: '30px', marginBottom: '15px' }}>Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
                <li>Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
                  <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Address, State, Province, ZIP/Postal code, City</li>
                    <li>Cookies and Usage Data</li>
                  </ul>
                </li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', color: '#0B2228', marginTop: '30px', marginBottom: '15px' }}>Use of Data</h2>
              <p>
                SvaNiti Policy Research Center uses the collected data for various purposes:
              </p>
              <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', color: '#0B2228', marginTop: '30px', marginBottom: '15px' }}>Security of Data</h2>
              <p>
                The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
              </p>

              <h2 style={{ fontSize: '1.5rem', color: '#0B2228', marginTop: '30px', marginBottom: '15px' }}>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the bottom of this Privacy Policy.
              </p>

              <h2 style={{ fontSize: '1.5rem', color: '#0B2228', marginTop: '30px', marginBottom: '15px' }}>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul style={{ marginLeft: '20px' }}>
                <li>Email: office@svaniti.in</li>
                <li>Phone: +91 2826 358065</li>
              </ul>

              <p style={{ marginTop: '40px', color: '#999', fontSize: '0.9rem' }}>
                Last updated: April 2024
              </p>
            </div>
          </motion.article>
        </div>
      </section>
    </main>
  )
}
