'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const blogPosts: Record<string, any> = {
  'future-indian-education-policy': {
    title: 'The Future of Indian Education Policy',
    date: '2024-12-15',
    content: 'Exploring how we can design education systems that align with India\'s aspirations and Indic values. Education is the cornerstone of development, yet our current systems often fail to prepare students for real-world challenges and miss opportunities to integrate our rich cultural heritage.\n\nAt SvaNiti, we believe that education reform must go beyond administrative changes. It requires a fundamental rethinking of what we teach, how we teach, and why we teach. Our research suggests that incorporating Indic knowledge systems, emphasizing critical thinking, and fostering entrepreneurial spirit can create more engaged and effective learners.\n\nThis article explores the key policy recommendations we believe can transform Indian education for the better.'
  },
  'viksit-bharat-2047': {
    title: 'Understanding Viksit Bharat 2047',
    date: '2024-12-10',
    content: 'A deep dive into the vision and policy frameworks for a developed India by 2047. The vision of Viksit Bharat represents an ambitious roadmap for India\'s transformation over the next two decades. It encompasses economic development, social progress, environmental sustainability, and cultural preservation.\n\nAs a think-tank, SvaNiti is committed to researching and proposing actionable policy frameworks that can help India achieve this vision. Our work focuses on identifying the critical gaps in current policies and proposing innovative solutions grounded in evidence and Indic principles.\n\nThis article outlines the key pillars of Viksit Bharat and the policy interventions we believe are necessary to achieve this vision.'
  },
  'creative-economy-frontier': {
    title: 'Creative Economy: A New Frontier',
    date: '2024-12-05',
    content: 'How the creative sector can drive economic growth and innovation in India. The creative economy encompasses industries like film, music, gaming, design, and digital content creation. These sectors have tremendous potential to generate employment, drive innovation, and contribute significantly to GDP.\n\nYet, India\'s creative sector faces numerous challenges including inadequate infrastructure, lack of targeted policy support, and insufficient access to financing. By establishing a dedicated Ministry of Creative Economy Affairs, India can address these challenges and unlock the full potential of this dynamic sector.\n\nThis article makes the case for prioritizing creative economy development as part of India\'s broader development agenda.'
  }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug]

  if (!post) {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center' }}>
        <h1>Post not found</h1>
        <Link href="/blog">Back to Blog</Link>
      </div>
    )
  }

  return (
    <main className="main-viewport">
      <section style={{ minHeight: '100vh', padding: '60px 40px', background: '#f8fafc' }}>
        <article className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/blog" style={{ color: '#0B2228', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
            ← Back to Insights
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 style={{ fontSize: '2.5rem', color: '#0B2228', marginBottom: '10px' }}>{post.title}</h1>
            <p style={{ color: '#999', fontSize: '0.95rem', marginBottom: '40px' }}>{post.date}</p>

            <div style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#333',
              whiteSpace: 'pre-wrap'
            }}>
              {post.content}
            </div>

            <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #ddd' }}>
              <h3 style={{ color: '#0B2228', marginBottom: '15px' }}>Want to share your thoughts?</h3>
              <Link href="/contact" style={{ display: 'inline-block', padding: '12px 24px', background: '#0B2228', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: '600' }}>
                Get in Touch →
              </Link>
            </div>
          </motion.div>
        </article>
      </section>
    </main>
  )
}
