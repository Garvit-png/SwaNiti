"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './portal.module.css'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function AdminPortal() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', message: '' }>({ type: '', message: '' })

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Policy',
    readTime: '5 min read',
    content: ''
  })
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setStatus({ type: 'error', message: 'Please select a cover photo' })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value)
    })
    data.append('file', file)

    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        body: data
      })
      const result = await res.json()

      if (res.ok) {
        setStatus({ type: 'success', message: 'Blog pushed to Vercel successfully!' })
        setTimeout(() => {
          router.push('/insights')
        }, 2000)
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to push' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.portalContainer}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1>Admin Portal</h1>
        <p>Add a new blog post and push it directly to Vercel.</p>
      </div>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        {status.message && (
          <div className={`${styles.alert} ${styles[status.type]}`}>
            {status.message}
          </div>
        )}

        <div className={styles.inputGroup}>
          <label>Blog Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required placeholder="Enter the main title" />
        </div>

        <div className={styles.inputGroup}>
          <label>Excerpt (Short Description)</label>
          <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required rows={3} placeholder="Brief description of the blog" />
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="Policy">Policy</option>
              <option value="Youth">Youth</option>
              <option value="Education">Education</option>
              <option value="Movement">Movement</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label>Read Time</label>
            <input name="readTime" value={formData.readTime} onChange={handleChange} required placeholder="e.g. 5 min read" />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Cover Photo</label>
          <input type="file" accept="image/*" onChange={handleFileChange} required className={styles.fileInput} />
        </div>

        <div className={styles.inputGroup}>
          <label>Content (Markdown or HTML)</label>
          <textarea name="content" value={formData.content} onChange={handleChange} required rows={10} placeholder="Write your blog content here..." />
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? <><Loader2 size={18} className={styles.spinner} /> Pushing to Vercel...</> : 'Publish to Vercel'}
        </button>
      </form>
    </div>
  )
}
