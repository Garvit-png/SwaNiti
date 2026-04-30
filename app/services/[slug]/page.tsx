'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const serviceDetails: Record<string, any> = {
  'sva-bharat-movement': {
    title: 'Sva-Bharat Movement',
    description: 'Change in Bharat begins with a movement, not just a policy.',
    fullContent: 'Sva-Bharat Movement by SvaNiti channels the aspirations of the people, uniting ideas and voices through regional and campus ambassadors to shape a transformative future. This movement aims to create a groundswell of support for policy changes that align with the needs and dreams of ordinary Indians.'
  },
  'viksit-bharat-darshan-yatra': {
    title: 'Viksit Bharat Darshan Yatra',
    description: 'Honoring the mission for a Developed India by 2047.',
    fullContent: 'Viksit Bharat Darshan Yatra honors the Prime Minister\'s mission for a Developed India by 2047, emphasizing self-discovery through solo, purposeful, and philosophical journeys, shaping individuals with purpose for Vikshit Yuva for Viksit Bharat. This initiative aims to inspire young Indians to become leaders and change-makers.'
  },
  'lifesite-conceptualization': {
    title: 'LifeSite (जीवन-स्थल) Conceptualization',
    description: 'Exploring education systems for the current era.',
    fullContent: 'LifeSite originated from a seven-year pilot research project initiated by our founder, aimed at exploring an education system that transcends traditional schools, colleges, and universities, addressing the needs of the current era. This innovative model combines formal education with experiential learning and community engagement.'
  },
  'ministry-creative-economy': {
    title: 'Notion of Ministry of Creative Economy Affairs',
    description: 'Establishing a dedicated ministry for creative economy.',
    fullContent: 'The creative economy holds the potential to be a powerful multiplier for our economy, unlocking new opportunities in employment, tourism, exports, innovation, and social inclusion. Our proposal to establish a dedicated ministry aims to strengthen initiatives and streamline regulations within this dynamic sector.'
  }
}

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = serviceDetails[params.slug]

  if (!service) {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center' }}>
        <h1>Service not found</h1>
        <Link href="/services">Back to Services</Link>
      </div>
    )
  }

  return (
    <main className="main-viewport">
      <section style={{ minHeight: '100vh', padding: '60px 40px', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/services" style={{ color: '#0B2228', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
            ← Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ fontSize: '2.5rem', color: '#0B2228', marginBottom: '20px' }}>{service.title}</h1>
            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.8', marginBottom: '40px' }}>
              {service.fullContent}
            </p>

            <div style={{ marginTop: '40px', padding: '30px', background: '#fff', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#0B2228', marginBottom: '20px' }}>Get Involved</h2>
              <p style={{ color: '#666', marginBottom: '20px' }}>
                Are you interested in learning more about this initiative or contributing to our work? We'd love to hear from you.
              </p>
              <Link href="/contact" className="join-btn" style={{ display: 'inline-block', padding: '12px 24px', background: '#0B2228', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}>
                Contact Us →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
