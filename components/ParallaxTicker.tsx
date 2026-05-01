'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type StoryItem =
  | { kind: 'image'; src: string; alt: string; className: string }
  | { kind: 'tag'; text: string; tone: 'cyan' | 'yellow'; className: string }

const storyItems: StoryItem[] = [
  { kind: 'image', src: '/gallery/img1.jpg', alt: 'SvaNiti community group', className: 'story-img story-img-primary' },
  { kind: 'tag', text: "People's Aspiration", tone: 'cyan', className: 'story-tag story-tag-aspiration' },
  { kind: 'tag', text: 'Inspiration', tone: 'yellow', className: 'story-tag story-tag-inspiration' },
  { kind: 'image', src: '/gallery/img3.jpg', alt: 'Policy discussion moment', className: 'story-img story-img-side' },
  { kind: 'tag', text: 'Unconventional', tone: 'yellow', className: 'story-tag story-tag-unconventional' },
  { kind: 'image', src: '/gallery/img2.jpg', alt: 'SvaNiti campus participants', className: 'story-img story-img-edge' },
  { kind: 'tag', text: 'Notions', tone: 'cyan', className: 'story-tag story-tag-notions' },
  { kind: 'tag', text: 'Non-Partisan', tone: 'yellow', className: 'story-tag story-tag-nonpartisan' },
  { kind: 'image', src: '/gallery/img4.jpg', alt: 'SvaNiti team gathering', className: 'story-img story-img-small' },
  { kind: 'tag', text: 'Policy', tone: 'cyan', className: 'story-tag story-tag-policy' },
]

export default function ParallaxTicker() {
  return (
    <section className="story-constellation" aria-label="SvaNiti idea themes">
      {storyItems.map((item, index) => (
        <motion.div
          key={`${item.kind}-${index}`}
          className={item.className}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: index * 0.04 }}
        >
          {item.kind === 'image' ? (
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 34vw, 180px"
              className="story-photo"
              loading="lazy"
              quality={75}
            />
          ) : (
            <span className={`story-pill story-pill-${item.tone}`}>{item.text}</span>
          )}
        </motion.div>
      ))}
    </section>
  )
}
