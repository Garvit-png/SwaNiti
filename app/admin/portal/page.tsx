"use client"

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './portal.module.css'
import { Loader2, ArrowLeft, Trash2, Pencil, Plus, FileText, X, Image as ImageIcon, MessageSquare, FileType, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Quote, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import allBlogsData from '../../data/blogs.json'
import allTestimonialsData from '../../data/testimonials.json'

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

type TestimonialData = {
  id: string;
  quote: string;
  author: string;
  org: string;
  photo: string;
};

export default function AdminPortal() {
  const router = useRouter()

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [passcodeError, setPasscodeError] = useState(false)


  // UI state
  const [activeSection, setActiveSection] = useState<'blogs' | 'testimonials'>('blogs')
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create')
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' })
  
  // Blog form state
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)
  const [blogType, setBlogType] = useState<'medium' | 'pdf' | 'editor'>('editor')
  const [mediumUrl, setMediumUrl] = useState('')
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfPreviewName, setPdfPreviewName] = useState('')
  const [existingPdfUrl, setExistingPdfUrl] = useState('')

  const [blogContentHtml, setBlogContentHtml] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [isDraggingImage, setIsDraggingImage] = useState(false)
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)

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

  // Testimonial form state
  const [editingTestId, setEditingTestId] = useState<string | null>(null)
  const [testQuote, setTestQuote] = useState('')
  const [testAuthor, setTestAuthor] = useState('')
  const [testOrg, setTestOrg] = useState('')
  const [testCoverFile, setTestCoverFile] = useState<File | null>(null)
  const [testCoverPreview, setTestCoverPreview] = useState<string | null>(null)

  const [testimonials, setTestimonials] = useState<TestimonialData[]>(allTestimonialsData as TestimonialData[])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = sessionStorage.getItem('svaniti_admin') === 'true'
      if (isAuth) {
        setIsAuthenticated(true)
      }
    }
    setAuthChecked(true)
  }, [])

  // ===== AUTH =====
  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      })

      if (res.ok) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('svaniti_admin', 'true')
        }
        setIsAuthenticated(true)
        setPasscodeError(false)
      } else {
        setPasscodeError(true)
        setPasscode('')
      }
    } catch (error) {
      setPasscodeError(true)
      setPasscode('')
    }
  }

  // ===== COVER PHOTO (Blogs) =====
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

  // ===== COVER PHOTO (Testimonials) =====
  const handleTestCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setTestCoverFile(file)
      setTestCoverPreview(URL.createObjectURL(file))
    }
  }

  const handleTestCoverDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setTestCoverFile(file)
      setTestCoverPreview(URL.createObjectURL(file))
    }
  }

  // ===== FORM HANDLERS =====
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const resetBlogForm = () => {
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
    setBlogType('editor')
    setMediumUrl('')
    setPdfFile(null)
    setPdfPreviewName('')
    setExistingPdfUrl('')
    setBlogContentHtml('')
    if (editorRef.current) {
      editorRef.current.innerHTML = ''
    }
  }

  const resetTestForm = () => {
    setTestQuote('')
    setTestAuthor('')
    setTestOrg('')
    setTestCoverFile(null)
    setTestCoverPreview(null)
    setEditingTestId(null)
  }

  // ===== EDIT EXISTING =====
  const handleEditBlog = (blog: BlogData) => {
    setEditingBlogId(blog.id)
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      category: blog.category,
      readTime: blog.readTime,
      authorName: blog.author?.name || 'Admin Contributor',
      authorRole: blog.author?.role || 'Guest',
    })
    setBlogType(blog.blogType === 'medium' ? 'medium' : blog.blogType === 'pdf' ? 'pdf' : 'editor')
    setMediumUrl(blog.mediumUrl || '')
    setExistingPdfUrl(blog.pdfUrl || '')
    setPdfFile(null)
    setPdfPreviewName('')
    setBlogContentHtml(blog.contentHtml || '')
    // Editor innerHTML is updated via useEffect
    if (blog.coverUrl) {
      setCoverPreview(blog.coverUrl)
      setCoverFile(null)
    }
    setActiveTab('create')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleEditTest = (test: TestimonialData) => {
    setEditingTestId(test.id)
    setTestQuote(test.quote)
    setTestAuthor(test.author)
    setTestOrg(test.org)
    if (test.photo) {
      setTestCoverPreview(test.photo)
      setTestCoverFile(null)
    }
    setActiveTab('create')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ===== EDITOR FUNCTIONS =====
  const execCommand = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    updateHtml()
  }

  const handleLink = () => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) {
      const text = prompt('Enter the text to display for the link:')
      if (!text) return
      const url = prompt('Enter link URL (e.g. https://example.com):')
      if (url) {
        execCommand('insertHTML', `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${text}</a>&nbsp;`)
      }
    } else {
      const url = prompt('Enter link URL (e.g. https://example.com):')
      if (url) {
        const text = selection.toString()
        execCommand('insertHTML', `<a href="${url}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${text}</a>`)
      }
    }
  }

  const updateHtml = () => {
    if (editorRef.current) {
      setBlogContentHtml(editorRef.current.innerHTML)
    }
  }

  const handleEditorPaste = (e: React.ClipboardEvent) => {
    const clipboardData = e.clipboardData
    if (!clipboardData) return
    const pastedText = clipboardData.getData('text/plain')
    const isUrl = /^(https?:\/\/[^\s]+)/i.test(pastedText.trim())
    const selection = window.getSelection()

    // If text is selected and a URL is pasted, turn it into a link
    if (isUrl && selection && !selection.isCollapsed && editorRef.current?.contains(selection.anchorNode)) {
      e.preventDefault()
      const text = selection.toString()
      execCommand('insertHTML', `<a href="${pastedText.trim()}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${text}</a>`)
    }
  }

  const handleEditorImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setUploadingImage(true)
    
    const data = new FormData()
    data.append('file', file)
    
    try {
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: data
      })
      const result = await res.json()
      
      if (res.ok && result.url) {
        editorRef.current?.focus()
        document.execCommand('insertHTML', false, `<img src="${result.url}">&nbsp;`)
        updateHtml()
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to upload inline image' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error during image upload' })
    } finally {
      setUploadingImage(false)
    }
  }

  const onEditorDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingImage(false)
    const file = e.dataTransfer.files[0]
    if (file) handleEditorImageUpload(file)
  }

  useEffect(() => {
    if (activeTab === 'create' && activeSection === 'blogs' && blogType === 'editor' && editorRef.current) {
      if (editorRef.current.innerHTML !== blogContentHtml) {
        editorRef.current.innerHTML = blogContentHtml;
      }
    }
  }, [activeTab, activeSection, blogType, editingBlogId])

  // ===== SUBMIT BLOG =====
  const handleBlogSubmit = async (e: React.FormEvent) => {
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

    if (blogType === 'editor' && (!blogContentHtml.trim() || blogContentHtml === '<br>')) {
      setStatus({ type: 'error', message: 'Please write some content for the blog' })
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
    } else if (blogType === 'editor') {
      data.append('contentHtml', blogContentHtml)
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
        setStatus({ type: 'success', message: editingBlogId ? 'Blog updated successfully!' : 'Blog published successfully!' })
        resetBlogForm()
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
        setStatus({ type: 'error', message: result.error || 'Failed to publish blog' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' })
    } finally {
      setLoading(false)
    }
  }

  // ===== SUBMIT TESTIMONIAL =====
  const handleTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!testCoverFile && !editingTestId && !testCoverPreview) {
      setStatus({ type: 'error', message: 'Please select a photo for the testimonial' })
      return
    }

    if (!testQuote.trim() || !testAuthor.trim()) {
      setStatus({ type: 'error', message: 'Quote and Author Name are required' })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    const data = new FormData()
    data.append('quote', testQuote)
    data.append('author', testAuthor)
    data.append('org', testOrg)

    if (testCoverFile) {
      data.append('file', testCoverFile)
    }

    if (editingTestId) {
      data.append('existingId', editingTestId)
      if (!testCoverFile && testCoverPreview) {
        data.append('existingPhotoUrl', testCoverPreview)
      }
    }

    try {
      const res = await fetch('/api/publish-testimonial', {
        method: 'POST',
        body: data
      })
      const result = await res.json()

      if (res.ok) {
        setStatus({ type: 'success', message: editingTestId ? 'Testimonial updated successfully!' : 'Testimonial published successfully!' })
        resetTestForm()
        try {
          // Add revalidation or refetch logic if needed.
          // For now we will just use page refresh or local state updates.
        } catch { }
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to publish testimonial' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error occurred' })
    } finally {
      setLoading(false)
    }
  }

  // ===== DELETE BLOG =====
  const handleDeleteBlog = async (id: string, title: string) => {
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

  // ===== DELETE TESTIMONIAL =====
  const handleDeleteTest = async (id: string, author: string) => {
    if (!confirm(`Are you sure you want to delete testimonial by "${author}"?`)) return

    setDeletingId(id)
    setStatus({ type: '', message: '' })

    try {
      const res = await fetch('/api/delete-testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      const result = await res.json()

      if (res.ok) {
        setStatus({ type: 'success', message: 'Testimonial deleted successfully!' })
        setTestimonials(prev => prev.filter(b => b.id !== id))
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to delete testimonial' })
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
      {/* Intro Animation */}


      {/* ===== MAIN CONTENT ===== */}
      <div className={styles.portalContainer}>
        {/* Header */}
        <div className={styles.header}>
          <a href="/" className={styles.backButton}>
            <ArrowLeft size={18} /> Back to Home
          </a>
          <h1>Admin Portal</h1>
          <p>Manage your Blogs and Testimonials. Changes auto-deploy.</p>
        </div>

        {/* TOP TAB BAR for Section Selection */}
        <div className={styles.tabBar} style={{ marginBottom: '1rem', maxWidth: '1100px', margin: '0 auto 1.5rem', background: '#e2e8f0' }}>
          <button
            className={`${styles.tab} ${activeSection === 'blogs' ? styles.tabActive : ''}`}
            onClick={() => { setActiveSection('blogs'); setActiveTab('create'); }}
          >
            <FileType size={16} /> Blogs
          </button>
          <button
            className={`${styles.tab} ${activeSection === 'testimonials' ? styles.tabActive : ''}`}
            onClick={() => { setActiveSection('testimonials'); setActiveTab('create'); }}
          >
            <MessageSquare size={16} /> Testimonials
          </button>
        </div>

        {/* Sub Tab Bar for Action (Create/Manage) */}
        <div className={styles.tabBar}>
          <button
            className={`${styles.tab} ${activeTab === 'create' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <Plus size={16} />
            {activeSection === 'blogs' ? (editingBlogId ? 'Edit Blog' : 'Create Blog') : (editingTestId ? 'Edit Testimonial' : 'Create Testimonial')}
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'manage' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            <FileText size={16} />
            Manage {activeSection === 'blogs' ? 'Blogs' : 'Testimonials'} ({activeSection === 'blogs' ? blogs.length : testimonials.length})
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
          <form onSubmit={activeSection === 'blogs' ? handleBlogSubmit : handleTestSubmit}>
            <div className={styles.editorCard}>
              <div className={styles.editorCardHeader}>
                <h2>
                  {activeSection === 'blogs' 
                    ? (editingBlogId ? `Editing: ${formData.title || 'Untitled'}` : 'New Blog Post')
                    : (editingTestId ? `Editing Testimonial: ${testAuthor || 'Unknown'}` : 'New Testimonial')}
                </h2>
                {(editingBlogId || editingTestId) && (
                  <button type="button" className={styles.cancelBtn} onClick={activeSection === 'blogs' ? resetBlogForm : resetTestForm}>
                    Cancel Edit
                  </button>
                )}
              </div>

              <div className={styles.editorCardBody}>
                {/* === BLOG FORM === */}
                {activeSection === 'blogs' && (
                  <>
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
                        <select name="blogType" value={blogType} onChange={(e) => setBlogType(e.target.value as 'medium' | 'pdf' | 'editor')}>
                          <option value="editor">Write Blog (Rich Text Editor)</option>
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

                    {/* Rich Text Editor */}
                    {blogType === 'editor' && (
                      <div className={styles.inputGroup} style={{ marginBottom: 24, gridColumn: '1 / -1' }}>
                        <label>Blog Content</label>
                        <div className={styles.toolbarWrapper}>
                          <div className={styles.toolbar}>
                            <div className={styles.toolbarGroup}>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('formatBlock', 'H1')} title="Heading 1">H1</button>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('formatBlock', 'H2')} title="Heading 2">H2</button>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('formatBlock', 'H3')} title="Heading 3">H3</button>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('formatBlock', 'P')} title="Paragraph">P</button>
                            </div>
                            <div className={styles.toolbarDivider} />
                            <div className={styles.toolbarGroup}>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('bold')} title="Bold"><Bold size={16} /></button>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('italic')} title="Italic"><Italic size={16} /></button>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('underline')} title="Underline"><Underline size={16} /></button>
                            </div>
                            <div className={styles.toolbarDivider} />
                            <div className={styles.toolbarGroup}>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('justifyLeft')} title="Align Left"><AlignLeft size={16} /></button>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('justifyCenter')} title="Align Center"><AlignCenter size={16} /></button>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('justifyRight')} title="Align Right"><AlignRight size={16} /></button>
                            </div>
                            <div className={styles.toolbarDivider} />
                            <div className={styles.toolbarGroup}>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('insertUnorderedList')} title="Bullet List"><List size={16} /></button>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('insertOrderedList')} title="Numbered List"><ListOrdered size={16} /></button>
                              <button type="button" className={styles.toolBtn} onClick={() => execCommand('formatBlock', 'BLOCKQUOTE')} title="Quote"><Quote size={16} /></button>
                            </div>
                            <div className={styles.toolbarDivider} />
                            <div className={styles.toolbarGroup}>
                              <button type="button" className={styles.toolBtn} onClick={handleLink} title="Insert Link"><LinkIcon size={16} /></button>
                              <button type="button" className={styles.toolBtn} onClick={() => document.getElementById('editorImageUpload')?.click()} title="Insert Image"><ImageIcon size={16} /></button>
                            </div>
                            {selectedImage && (
                              <>
                                <div className={styles.toolbarDivider} />
                                <div className={styles.toolbarGroup}>
                                  <span style={{fontSize: '0.8rem', color: '#64748b', marginLeft: '4px', marginRight: '4px'}}>Image Size:</span>
                                  <button type="button" className={styles.toolBtn} onClick={() => { selectedImage.style.width = '25%'; updateHtml(); }} title="25% width" style={{width: 'auto', padding: '0 8px'}}>25%</button>
                                  <button type="button" className={styles.toolBtn} onClick={() => { selectedImage.style.width = '50%'; updateHtml(); }} title="50% width" style={{width: 'auto', padding: '0 8px'}}>50%</button>
                                  <button type="button" className={styles.toolBtn} onClick={() => { selectedImage.style.width = '100%'; updateHtml(); }} title="100% width" style={{width: 'auto', padding: '0 8px'}}>100%</button>
                                </div>
                                <div className={styles.toolbarDivider} />
                                <div className={styles.toolbarGroup}>
                                  <span style={{fontSize: '0.8rem', color: '#64748b', marginLeft: '4px', marginRight: '4px'}}>Wrap Text:</span>
                                  <button type="button" className={styles.toolBtn} onClick={() => { selectedImage.style.float = 'left'; selectedImage.style.margin = '0 16px 16px 0'; updateHtml(); }} title="Float Left" style={{width: 'auto', padding: '0 8px'}}>Left</button>
                                  <button type="button" className={styles.toolBtn} onClick={() => { selectedImage.style.float = 'none'; selectedImage.style.margin = '16px 0'; updateHtml(); }} title="Inline" style={{width: 'auto', padding: '0 8px'}}>Inline</button>
                                  <button type="button" className={styles.toolBtn} onClick={() => { selectedImage.style.float = 'right'; selectedImage.style.margin = '0 0 16px 16px'; updateHtml(); }} title="Float Right" style={{width: 'auto', padding: '0 8px'}}>Right</button>
                                </div>
                              </>
                            )}
                          </div>
                          
                          {uploadingImage && (
                            <div className={styles.imageUploading}>
                              <Loader2 size={16} className={styles.spinner} /> Uploading image...
                            </div>
                          )}

                          <input 
                            type="file" 
                            id="editorImageUpload" 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) handleEditorImageUpload(e.target.files[0]);
                              e.target.value = '';
                            }} 
                          />

                          <div 
                            className={styles.editorWrapper}
                            onDragOver={(e) => { e.preventDefault(); setIsDraggingImage(true); }}
                            onDragLeave={() => setIsDraggingImage(false)}
                            onDrop={onEditorDrop}
                          >
                            <div
                              ref={editorRef}
                              className={styles.editorCanvas}
                              contentEditable
                              onInput={updateHtml}
                              onBlur={updateHtml}
                              onPaste={handleEditorPaste}
                              suppressContentEditableWarning
                              onClick={(e) => {
                                if (!(e.target instanceof HTMLImageElement)) {
                                  if (selectedImage) {
                                    selectedImage.classList.remove(styles.selected)
                                    setSelectedImage(null)
                                  }
                                }
                              }}
                              onMouseUp={(e) => {
                                if (e.target instanceof HTMLImageElement) {
                                  if (selectedImage && selectedImage !== e.target) selectedImage.classList.remove(styles.selected)
                                  e.target.classList.add(styles.selected)
                                  setSelectedImage(e.target)
                                }
                              }}
                            />
                            {isDraggingImage && (
                              <div className={styles.editorDragOverlay}>
                                <div className={styles.editorDragOverlayText}>Drop image to upload inline</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* === TESTIMONIAL FORM === */}
                {activeSection === 'testimonials' && (
                  <>
                    <div className={styles.metaGrid}>
                      <div className={`${styles.inputGroup} ${styles.metaGridFull}`}>
                        <label>Testimonial Quote</label>
                        <textarea value={testQuote} onChange={(e) => setTestQuote(e.target.value)} required rows={4} placeholder="Enter the testimonial quote..." />
                      </div>

                      <div className={styles.inputGroup}>
                        <label>Author Name</label>
                        <input value={testAuthor} onChange={(e) => setTestAuthor(e.target.value)} required placeholder="Enter author's name" />
                      </div>

                      <div className={styles.inputGroup}>
                        <label>Organization / Role</label>
                        <input value={testOrg} onChange={(e) => setTestOrg(e.target.value)} placeholder="e.g. Finance Minister, Govt of Chhattisgarh" />
                      </div>
                    </div>

                    <div className={styles.inputGroup} style={{ marginBottom: 24 }}>
                      <label>Author Photo</label>
                      <div
                        className={`${styles.coverDropZone} ${testCoverPreview ? styles.coverDropZoneHasFile : ''}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleTestCoverDrop}
                        onClick={() => document.getElementById('testCoverFileInput')?.click()}
                      >
                        <input type="file" id="testCoverFileInput" accept="image/*" className={styles.fileInput} onChange={handleTestCoverFileChange} />
                        {testCoverPreview ? (
                          <>
                            <img src={testCoverPreview} alt="Author preview" className={styles.coverPreview} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%' }} />
                            <p className={styles.coverDropHint} style={{ marginTop: 8 }}>Click or drop to change</p>
                          </>
                        ) : (
                          <>
                            <div className={styles.coverDropIcon}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg>
                            </div>
                            <p className={styles.coverDropText}><strong>Click to upload</strong> or drag and drop</p>
                            <p className={styles.coverDropHint}>Upload an image for the author (Required)</p>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Submit Area */}
              <div className={styles.submitArea}>
                <button type="submit" disabled={loading} className={styles.submitButton}>
                  {loading ? (
                    <><Loader2 size={18} className={styles.spinner} /> {editingBlogId || editingTestId ? 'Updating...' : 'Publishing...'}</>
                  ) : (
                    (editingBlogId || editingTestId) ? '✓ Update' : '🚀 Publish'
                  )}
                </button>
                {(editingBlogId || editingTestId) && (
                  <button type="button" className={styles.cancelBtn} onClick={activeSection === 'blogs' ? resetBlogForm : resetTestForm}>Cancel</button>
                )}
              </div>
            </div>
          </form>
        )}

        {/* ===== MANAGE TAB ===== */}
        {activeTab === 'manage' && (
          <div className={styles.manageSection}>
            <div className={styles.blogList}>
              {activeSection === 'blogs' ? (
                <>
                  {blogs.map((blog) => (
                    <div key={blog.id} className={styles.blogItem}>
                      <div className={styles.blogItemInfo}>
                        <h3>{blog.title}</h3>
                        <p>{blog.date || 'No date'} • {blog.category} • {blog.readTime}</p>
                      </div>
                      <div className={styles.blogItemActions}>
                        <button className={styles.editBtn} onClick={() => handleEditBlog(blog)}>
                          <Pencil size={14} /> Edit
                        </button>
                        <button className={styles.deleteBtn} onClick={() => handleDeleteBlog(blog.id, blog.title)} disabled={deletingId === blog.id}>
                          {deletingId === blog.id ? <Loader2 size={14} className={styles.spinner} /> : <><Trash2 size={14} /> Delete</>}
                        </button>
                      </div>
                    </div>
                  ))}
                  {blogs.length === 0 && <p className={styles.noBlogs}>No published blogs found.</p>}
                </>
              ) : (
                <>
                  {testimonials.map((test) => (
                    <div key={test.id} className={styles.blogItem}>
                      <div className={styles.blogItemInfo} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        {test.photo && <img src={test.photo} alt={test.author} style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} />}
                        <div>
                          <h3>{test.author}</h3>
                          <p>{test.org || 'No Organization'}</p>
                        </div>
                      </div>
                      <div className={styles.blogItemActions}>
                        <button className={styles.editBtn} onClick={() => handleEditTest(test)}>
                          <Pencil size={14} /> Edit
                        </button>
                        <button className={styles.deleteBtn} onClick={() => handleDeleteTest(test.id, test.author)} disabled={deletingId === test.id}>
                          {deletingId === test.id ? <Loader2 size={14} className={styles.spinner} /> : <><Trash2 size={14} /> Delete</>}
                        </button>
                      </div>
                    </div>
                  ))}
                  {testimonials.length === 0 && <p className={styles.noBlogs}>No published testimonials found.</p>}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
