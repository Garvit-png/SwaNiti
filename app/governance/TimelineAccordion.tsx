'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Download, FileText, Eye } from 'lucide-react'
import styles from './governance.module.css'

const TIMELINE_DATA = [
  {
    id: '01',
    year: '2024-2025',
    documents: [
      { title: 'Annual Impact Report 2024-25', size: '22 MB', type: 'PDF', pdfUrl: '/documents/annual-report-2024-2025.pdf' }
    ]
  },
  {
    id: '02',
    year: '2023-2024',
    documents: [
      { title: 'Annual Impact Report 2023-24', size: '3.1 MB', type: 'PDF', pdfUrl: '/documents/annual-report-2023-2024.pdf' }
    ]
  },
  {
    id: '03',
    year: '2022-2023',
    documents: [
      { title: 'Annual Impact Report 2022-23', size: '2.8 MB', type: 'PDF', pdfUrl: '/documents/annual-report-2022-2023.pdf' }
    ]
  }
]

export default function TimelineAccordion() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])
  const [activeRow, setActiveRow] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const toggleSection = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
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
  }, [openIndexes])

  return (
    <div className={styles.accordionContainer}>
      {TIMELINE_DATA.map((section, index) => {
        const isOpen = openIndexes.includes(index)

        return (
          <div key={section.id} className={`${styles.accordionItem} ${isOpen ? styles.isOpen : ''}`}>
            <button 
              className={`${styles.timelinePill} ${isOpen ? styles.pillActive : ''}`} 
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
                        <div className={styles.docActions}>
                          {doc.pdfUrl && (
                            <a
                              href={doc.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.viewBtn}
                              aria-label={`View ${doc.title}`}
                            >
                              <Eye size={18} strokeWidth={1.5} />
                              <span>View</span>
                            </a>
                          )}
                          {doc.pdfUrl && (
                            <a 
                              href={doc.pdfUrl}
                              download
                              className={styles.downloadBtn} 
                              aria-label={`Download ${doc.title}`}
                            >
                              <Download size={18} strokeWidth={1.5} />
                              <span>Download</span>
                            </a>
                          )}
                        </div>
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
