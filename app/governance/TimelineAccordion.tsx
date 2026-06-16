'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Download, FileText } from 'lucide-react'
import styles from './governance.module.css'

const TIMELINE_DATA = [
  {
    id: '01',
    year: '2023-2024',
    documents: [
      { title: 'Annual Impact Report 2023-24', size: '2.4 MB', type: 'PDF' },
      { title: 'Audited Financial Statements', size: '1.1 MB', type: 'PDF' },
      { title: 'Board Resolution Highlights', size: '450 KB', type: 'PDF' }
    ]
  },
  {
    id: '02',
    year: '2022-2023',
    documents: [
      { title: 'Annual Impact Report 2022-23', size: '3.1 MB', type: 'PDF' },
      { title: 'Audited Financial Statements', size: '1.4 MB', type: 'PDF' },
    ]
  },
  {
    id: '03',
    year: '2021-2022',
    documents: [
      { title: 'Annual Impact Report 2021-22', size: '1.8 MB', type: 'PDF' },
      { title: 'Audited Financial Statements', size: '890 KB', type: 'PDF' },
      { title: 'Foundational Charter', size: '1.2 MB', type: 'PDF' }
    ]
  }
]

export default function TimelineAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [activeRow, setActiveRow] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveRow(entry.target.getAttribute('data-row-id'))
          }
        })
      },
      {
        root: null,
        rootMargin: '-30% 0px -50% 0px', // Glows when row is near middle
        threshold: 0
      }
    )

    // Delay observing slightly to allow DOM expansion
    setTimeout(() => {
      const elements = document.querySelectorAll('[data-row-id]')
      elements.forEach((el) => observerRef.current?.observe(el))
    }, 300)

    return () => {
      observerRef.current?.disconnect()
    }
  }, [openIndex])

  return (
    <div className={styles.accordionContainer}>
      {TIMELINE_DATA.map((section, index) => {
        const isOpen = openIndex === index

        return (
          <div key={section.id} className={`${styles.accordionItem} ${isOpen ? styles.isOpen : ''}`}>
            <button 
              className={styles.timelinePill} 
              onClick={() => toggleSection(index)}
              aria-expanded={isOpen}
            >
              <div className={styles.pillLeft}>
                <span className={styles.pillNum}>{section.id}</span>
                <span className={styles.pillTitle}>{section.year}</span>
              </div>
              <div className={`${styles.pillArrow} ${isOpen ? styles.arrowOpen : ''}`}>
                <ArrowRight strokeWidth={1.5} size={24} />
              </div>
            </button>

            <div className={`${styles.accordionContent} ${isOpen ? styles.contentOpen : ''}`}>
              <div className={styles.documentListOuter}>
                {/* The continuous curved thread starting from top */}
                <div className={styles.threadCurveOrigin}></div>
                
                <div className={styles.documentList}>
                  {section.documents.map((doc, docIdx) => {
                    const rowId = `${index}-${docIdx}`
                    
                    const activeSectionStr = activeRow ? activeRow.split('-')[0] : null
                    const activeDocStr = activeRow ? activeRow.split('-')[1] : null
                    
                    const isSectionActive = activeSectionStr === index.toString()
                    const activeDocIdx = activeDocStr ? parseInt(activeDocStr) : -1

                    const isActive = isSectionActive && docIdx === activeDocIdx
                    const isPast = isSectionActive && docIdx < activeDocIdx

                    const dotClass = (isActive || isPast) ? styles.docDotActive : ''
                    const lineClass = isPast ? styles.docLineSolid : (isActive ? styles.docLineActive : '')

                    return (
                      <div key={docIdx} className={styles.documentRow} data-row-id={rowId}>
                        <div className={styles.docPathConnector}>
                          <div className={`${styles.docDot} ${dotClass}`}></div>
                          {docIdx !== section.documents.length - 1 && (
                            <div className={`${styles.docLine} ${lineClass}`}></div>
                          )}
                        </div>
                      <div className={styles.docInfoBox}>
                        <div className={styles.docIcon}>
                          <FileText size={20} strokeWidth={1.5} />
                        </div>
                        <div className={styles.docDetails}>
                          <h4>{doc.title}</h4>
                          <p>{doc.type} • {doc.size}</p>
                        </div>
                        <button className={styles.downloadBtn} aria-label={`Download ${doc.title}`}>
                          <Download size={18} strokeWidth={1.5} />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  )
                })}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
