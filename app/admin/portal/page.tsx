"use client"

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './portal.module.css'
import { Loader2, ArrowLeft, Trash2, Pencil, Plus, FileText, X, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import allBlogsData from '../../data/blogs.json'

type BlogData = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date?: string;
  author?: {
    name: string;
    role: string;
    photo: string;
  };
  coverUrl?: string;
  contentHtml?: string;
  blogType?: 'editor' | 'medium' | 'pdf';
  mediumUrl?: string;
  pdfUrl?: string;
};



export default function AdminPortal() {
  const router = useRouter()

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [passcodeError, setPasscodeError] = useState(false)

  // UI state
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create')
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' })
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)

  // Form state
  const [blogType, setBlogType] = useState<'medium' | 'pdf'>('pdf')
  const [mediumUrl, setMediumUrl] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfPreviewName, setPdfPreviewName] = useState('')
  const [existingPdfUrl, setExistingPdfUrl] = useState('')

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Policy',
    readTime: '5 min read',
    authorName: '',
    authorRole: '',
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const [blogs, setBlogs] = useState<BlogData[]>(allBlogsData as BlogData[])

  // ===== CHECK SESSION AUTH ON MOUNT =====
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('svaniti_admin') === 'true'
      setIsAuthenticated(isAuth)
    }
    setAuthChecked(true)
  }, [])

  // ===== AUTH =====
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === '0313') {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('svaniti_admin', 'true')
      }
      setIsAuthenticated(true)
      setPasscodeError(false)
    } else {
      setPasscodeError(true)
      setPasscode('')
    }
  }

  // ===== COVER PHOTO =====
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setCoverFile(file)
      setCoverPreview(URL.createObjectURL(file))
    }
  }

  // ===== FORM HANDLERS =====
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      category: 'Policy',
      readTime: '5 min read',
      authorName: '',
      authorRole: '',
    })
    setCoverFile(null)
    setCoverPreview(null)
    setEditingBlogId(null)
    setBlogType('pdf')
    setMediumUrl('')
    setPdfFile(null)
    setPdfPreviewName('')
    setExistingPdfUrl('')
  }

  // ===== EDIT EXISTING BLOG =====
  const handleEdit = (blog: BlogData) => {
    setEditingBlogId(blog.id)
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      readTime: blog.readTime,
      authorName: blog.author?.name || 'Admin Contributor',
      authorRole: blog.author?.role || 'Guest',
    })
    setBlogType(blog.blogType === 'medium' ? 'medium' : 'pdf')
    setMediumUrl(blog.mediumUrl || '')
    setExistingPdfUrl(blog.pdfUrl || '')
    setPdfFile(null)
    setPdfPreviewName('')
    if (blog.coverUrl) {
      setCoverPreview(blog.coverUrl)
      setCoverFile(null)
    }
    setActiveTab('create')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ===== SUBMIT / PUBLISH =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!coverFile && !editingBlogId) {
      setStatus({ type: 'error', message: 'Please select a cover photo' })
      return
    }

    if (!formData.title.trim()) {
      setStatus({ type: 'error', message: 'Please enter a blog title' })
      return
    }

    if (blogType === 'medium' && !mediumUrl.trim()) {
      setStatus({ type: 'error', message: 'Please enter a Medium article URL' })
      return
    }

    if (blogType === 'pdf' && !pdfFile && !existingPdfUrl) {
      setStatus({ type: 'error', message: 'Please upload a PDF document' })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    const data = new FormData()
    data.append('title', formData.title)
    data.append('excerpt', formData.excerpt)
    data.append('category', formData.category)
    data.append('readTime', formData.readTime)
    data.append('authorName', formData.authorName)
    data.append('authorRole', formData.authorRole)
    data.append('blogType', blogType)

    if (blogType === 'medium') {
      data.append('mediumUrl', mediumUrl)
    } else if (blogType === 'pdf') {
      if (pdfFile) {
        data.append('pdfFile', pdfFile)
      }
      if (existingPdfUrl) {
        data.append('existingPdfUrl', existingPdfUrl)
      }
    }

    if (coverFile) {
      data.append('file', coverFile)
    }

    if (editingBlogId) {
      data.append('existingId', editingBlogId)
      if (!coverFile && coverPreview) {
        data.append('existingCoverUrl', coverPreview)
      }
    }

    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        body: data
      })
      const result = await res.json()

      if (res.ok) {
        setStatus({ type: 'success', message: editingBlogId ? 'Blog updated and pushed to Vercel!' : 'Blog published and pushed to Vercel!' })
        resetForm()
        try {
          const blogsRes = await fetch('/api/blogs')
          if (blogsRes.ok) {
            const freshBlogs = await blogsRes.json()
            setBlogs(freshBlogs)
          }
        } catch { }
        setTimeout(() => {
          setActiveTab('manage')
        }, 1500)
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to publish' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' })
    } finally {
      setLoading(false)
    }
  }

  // ===== DELETE =====
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    setDeletingId(id)
    setStatus({ type: '', message: '' })

    try {
      const res = await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      const result = await res.json()

      if (res.ok) {
        setStatus({ type: 'success', message: 'Blog deleted successfully!' })
        setBlogs(prev => prev.filter(b => b.id !== id))
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to delete blog' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' })
    } finally {
      setDeletingId(null)
    }
  }

  // ===== LOADING / AUTH CHECK =====
  if (!authChecked) {
    return (
      <div className={styles.passcodeContainer}>
        <Loader2 size={32} className={styles.spinner} style={{ color: '#64748b' }} />
      </div>
    )
  }

  // ===== PASSCODE SCREEN =====
  if (!isAuthenticated) {
    return (
      <div className={styles.passcodeContainer}>
        <form onSubmit={handlePasscodeSubmit} className={styles.passcodeCard}>
          <h2>Admin Access</h2>
          <p>Please enter the passcode to continue</p>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter passcode"
            autoFocus
          />
          {passcodeError && <span className={styles.passcodeError}>Incorrect passcode</span>}
          <button type="submit">Unlock</button>
          <a href="/" className={styles.passcodeBack}>Return to site</a>
        </form>
      </div>
    )
  }

  // ===== MAIN PORTAL =====
  return (
    <div className={styles.portalLayout}>
      {/* ===== MAIN CONTENT ===== */}
      <div className={styles.portalContainer}>
        {/* Header */}
        <div className={styles.header}>
          <a href="/" className={styles.backButton}>
            <ArrowLeft size={18} /> Back to Home
          </a>
          <h1>Admin Portal</h1>
          <p>Create, edit, and manage your blog posts. Changes auto-deploy to Vercel.</p>
        </div>

        {/* Tab Bar */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tab} ${activeTab === 'create' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <Plus size={16} />
            {editingBlogId ? 'Edit Blog' : 'Create New'}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'manage' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <FileText size={16} />
            Manage Blogs ({blogs.length})
          </button>
        </div>

        {/* Status Alert */}
        {status.message && (
          <div className={`${styles.alert} ${styles[status.type]}`}>
            {status.message}
          </div>
        )}

        {/* ===== CREATE / EDIT TAB ===== */}
        {activeTab === 'create' && (
          <form onSubmit={handleSubmit}>
            <div className={styles.editorCard}>
              <div className={styles.editorCardHeader}>
                <h2>{editingBlogId ? `Editing: ${formData.title || 'Untitled'}` : 'New Blog Post'}</h2>
                {editingBlogId && (
                  <button type="button" className={styles.cancelBtn} onClick={resetForm}>
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className={styles.editorCardBody}>
                {/* Meta Fields */}
                <div className={styles.metaGrid}>
                  <div className={`${styles.inputGroup} ${styles.metaGridFull}`}>
                    <label>Blog Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} required placeholder="Enter the main title" />
                  </div>

                  <div className={`${styles.inputGroup} ${styles.metaGridFull}`}>
                    <label>Excerpt (Short Description)</label>
                    <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} required rows={2} placeholder="Brief description shown on the insights page" />
                  </div>

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

                  <div className={styles.inputGroup}>
                    <label>Author Name</label>
                    <input name="authorName" value={formData.authorName} onChange={handleChange} placeholder="Enter author's name" />
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Author Designation</label>
                    <input name="authorRole" value={formData.authorRole} onChange={handleChange} placeholder="e.g. Research Associate / Director" />
                  </div>

                  <div className={`${styles.inputGroup} ${styles.metaGridFull}`}>
                    <label>Import Method / Blog Format</label>
                    <select name="blogType" value={blogType} onChange={(e) => setBlogType(e.target.value as 'medium' | 'pdf')}>
                      <option value="pdf">Import from PDF (Upload document and embed PDF viewer)</option>
                      <option value="medium">Import from Medium (Link to Medium blog post)</option>
                    </select>
                  </div>
                </div>

                {/* Cover Photo */}
                <div className={styles.inputGroup} style={{ marginBottom: 24 }}>
                  <label>Cover Photo</label>
                  <div
                    className={`${styles.coverDropZone} ${coverPreview ? styles.coverDropZoneHasFile : ''}`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleCoverDrop}
                    onClick={() => document.getElementById('coverFileInput')?.click()}
                  >
                    <input type="file" id="coverFileInput" accept="image/*" className={styles.fileInput} onChange={handleCoverFileChange} />
                    {coverPreview ? (
                      <>
                        <img src={coverPreview} alt="Cover preview" className={styles.coverPreview} />
                        <p className={styles.coverDropHint} style={{ marginTop: 8 }}>Click or drop to change</p>
                      </>
                    ) : (
                      <>
                        <div className={styles.coverDropIcon}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg>
                        </div>
                        <p className={styles.coverDropText}><strong>Click to upload</strong> or drag and drop</p>
                        <p className={styles.coverDropHint}>PNG, JPG, WebP up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Medium Link Input */}
                {blogType === 'medium' && (
                  <div className={styles.inputGroup} style={{ marginBottom: 24 }}>
                    <label>Medium Article URL</label>
                    <input
                      type="url"
                      placeholder="https://medium.com/@username/your-blog-post-title"
                      value={mediumUrl}
                      onChange={(e) => setMediumUrl(e.target.value)}
                      required
                      className={styles.inputGroupInput}
                    />
                  </div>
                )}

                {/* PDF Document Upload Input */}
                {blogType === 'pdf' && (
                  <div className={styles.inputGroup} style={{ marginBottom: 24 }}>
                    <label>PDF Document</label>
                    <div
                      className={`${styles.coverDropZone} ${pdfPreviewName || existingPdfUrl ? styles.coverDropZoneHasFile : ''}`}
                      onClick={() => document.getElementById('pdfFileInput')?.click()}
                    >
                      <input
                        type="file"
                        id="pdfFileInput"
                        accept="application/pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setPdfFile(e.target.files[0])
                            setPdfPreviewName(e.target.files[0].name)
                          }
                        }}
                      />
                      <div className={styles.coverDropIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                      </div>
                      {pdfPreviewName || existingPdfUrl ? (
                        <>
                          <p className={styles.coverDropText}>Selected PDF: <strong>{pdfPreviewName || existingPdfUrl.split('/').pop()}</strong></p>
                          <p className={styles.coverDropHint}>Click to change</p>
                        </>
                      ) : (
                        <>
                          <p className={styles.coverDropText}><strong>Click to upload PDF</strong> or drag & drop</p>
                          <p className={styles.coverDropHint}>PDF document up to 25MB</p>
                        </>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* Submit Area */}
              <div className={styles.submitArea}>
                <button type="submit" disabled={loading} className={styles.submitButton}>
                  {loading ? (
                    <><Loader2 size={18} className={styles.spinner} /> {editingBlogId ? 'Updating...' : 'Publishing...'}</>
                  ) : (
                    editingBlogId ? '✓ Update & Deploy' : '🚀 Publish to Vercel'
                  )}
                </button>
                {editingBlogId && (
                  <button type="button" className={styles.cancelBtn} onClick={resetForm}>Cancel</button>
                )}
              </div>
            </div>
          </form>
        )}

        {/* ===== MANAGE TAB ===== */}
        {activeTab === 'manage' && (
          <div className={styles.manageSection}>
            <div className={styles.blogList}>
              {blogs.map((blog) => (
                <div key={blog.id} className={styles.blogItem}>
                  <div className={styles.blogItemInfo}>
                    <h3>{blog.title}</h3>
                    <p>{blog.date || 'No date'} • {blog.category} • {blog.readTime}</p>
                  </div>
                  <div className={styles.blogItemActions}>
                    <button className={styles.editBtn} onClick={() => handleEdit(blog)}>
                      <Pencil size={14} /> Edit
                    </button>
                    <button className={styles.deleteBtn} onClick={() => handleDelete(blog.id, blog.title)} disabled={deletingId === blog.id}>
                      {deletingId === blog.id ? <Loader2 size={14} className={styles.spinner} /> : <><Trash2 size={14} /> Delete</>}
                    </button>
                  </div>
                </div>
              ))}
              {blogs.length === 0 && <p className={styles.noBlogs}>No published blogs found.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
