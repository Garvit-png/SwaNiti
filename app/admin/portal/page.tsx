"use client"

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './portal.module.css'
import { Loader2, ArrowLeft, Trash2, Pencil, Plus, FileText } from 'lucide-react'
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
};

export default function AdminPortal() {
  const router = useRouter()
  const editorRef = useRef<HTMLDivElement>(null)

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [passcodeError, setPasscodeError] = useState(false)

  // UI state
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create')
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' })
  const [dragOver, setDragOver] = useState(false)
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Policy',
    readTime: '5 min read',
    authorName: 'Admin Contributor',
    authorRole: 'Guest',
  })
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)

  const [blogs, setBlogs] = useState<BlogData[]>(allBlogsData as BlogData[])

  // ===== AUTH =====
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === '0313') {
      setIsAuthenticated(true)
      setPasscodeError(false)
    } else {
      setPasscodeError(true)
      setPasscode('')
    }
  }

  // ===== TOOLBAR COMMANDS =====
  const execCmd = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }, [])

  const handleFontFamily = (e: React.ChangeEvent<HTMLSelectElement>) => {
    execCmd('fontName', e.target.value)
  }

  const handleFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // document.execCommand fontSize expects 1-7
    execCmd('fontSize', e.target.value)
  }

  const handleHeading = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    if (val === 'p') {
      execCmd('formatBlock', '<p>')
    } else {
      execCmd('formatBlock', `<${val}>`)
    }
  }

  const handleTextColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    execCmd('foreColor', e.target.value)
  }

  const handleLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      execCmd('createLink', url)
    }
  }

  const handleUnlink = () => {
    execCmd('unlink')
  }

  // ===== IMAGE UPLOAD =====
  const uploadImage = useCallback(async (file: File) => {
    setImageUploading(true)
    const uploadData = new FormData()
    uploadData.append('file', file)

    try {
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: uploadData
      })
      const result = await res.json()
      if (res.ok && result.url) {
        return result.url
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to upload image' })
        return null
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error uploading image' })
      return null
    } finally {
      setImageUploading(false)
    }
  }, [])

  const handleInsertImage = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const url = await uploadImage(file)
      if (url) {
        execCmd('insertHTML', `<img src="${url}" alt="${file.name}" style="max-width: 100%; height: auto; border-radius: 12px; margin: 16px 0; display: block;" />`)
      }
    }
    input.click()
  }

  // ===== DRAG AND DROP =====
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }, [])

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)

    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    if (files.length === 0) return

    for (const file of files) {
      const url = await uploadImage(file)
      if (url) {
        execCmd('insertHTML', `<img src="${url}" alt="${file.name}" style="max-width: 100%; height: auto; border-radius: 12px; margin: 16px 0; display: block;" />`)
      }
    }
  }, [uploadImage, execCmd])

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
      authorName: 'Admin Contributor',
      authorRole: 'Guest',
    })
    setCoverFile(null)
    setCoverPreview(null)
    setEditingBlogId(null)
    if (editorRef.current) editorRef.current.innerHTML = ''
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
    if (blog.coverUrl) {
      setCoverPreview(blog.coverUrl)
      setCoverFile(null) // existing cover, no new file
    }
    if (editorRef.current && blog.contentHtml) {
      editorRef.current.innerHTML = blog.contentHtml
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

    const contentHtml = editorRef.current?.innerHTML || ''
    if (!contentHtml.trim() || contentHtml === '<br>') {
      setStatus({ type: 'error', message: 'Please write some content in the editor' })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    const data = new FormData()
    data.append('title', formData.title)
    data.append('excerpt', formData.excerpt)
    data.append('category', formData.category)
    data.append('readTime', formData.readTime)
    data.append('contentHtml', contentHtml)
    data.append('authorName', formData.authorName)
    data.append('authorRole', formData.authorRole)

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
        // Refresh blog list
        try {
          const blogsRes = await fetch('/api/blogs')
          if (blogsRes.ok) {
            const freshBlogs = await blogsRes.json()
            setBlogs(freshBlogs)
          }
        } catch {}
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
          <Link href="/" className={styles.passcodeBack}>Return to site</Link>
        </form>
      </div>
    )
  }

  // ===== MAIN PORTAL =====
  return (
    <div className={styles.portalContainer}>
      {/* Header */}
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
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
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="Enter the main title"
                  />
                </div>

                <div className={`${styles.inputGroup} ${styles.metaGridFull}`}>
                  <label>Excerpt (Short Description)</label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    required
                    rows={2}
                    placeholder="Brief description shown on the insights page"
                  />
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
                  <input
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 5 min read"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Author Name</label>
                  <input
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    placeholder="Author name"
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Author Role</label>
                  <input
                    name="authorRole"
                    value={formData.authorRole}
                    onChange={handleChange}
                    placeholder="e.g. Research Associate"
                  />
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
                  <input
                    type="file"
                    id="coverFileInput"
                    accept="image/*"
                    className={styles.fileInput}
                    onChange={handleCoverFileChange}
                  />
                  {coverPreview ? (
                    <>
                      <img src={coverPreview} alt="Cover preview" className={styles.coverPreview} />
                      <p className={styles.coverDropHint} style={{ marginTop: 8 }}>Click or drop to change</p>
                    </>
                  ) : (
                    <>
                      <div className={styles.coverDropIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21,15 16,10 5,21"/>
                        </svg>
                      </div>
                      <p className={styles.coverDropText}><strong>Click to upload</strong> or drag and drop</p>
                      <p className={styles.coverDropHint}>PNG, JPG, WebP up to 10MB</p>
                    </>
                  )}
                </div>
              </div>

              {/* Rich Text Editor */}
              <div className={styles.inputGroup}>
                <label>Content</label>
                <div className={styles.toolbarWrapper}>
                  {/* Toolbar */}
                  <div className={styles.toolbar}>
                    {/* Heading */}
                    <div className={styles.toolbarGroup}>
                      <select className={styles.toolSelect} onChange={handleHeading} defaultValue="p" title="Heading level">
                        <option value="p">Paragraph</option>
                        <option value="h1">Heading 1</option>
                        <option value="h2">Heading 2</option>
                        <option value="h3">Heading 3</option>
                      </select>
                    </div>

                    <div className={styles.toolbarDivider} />

                    {/* Font Family */}
                    <div className={styles.toolbarGroup}>
                      <select className={styles.toolSelect} onChange={handleFontFamily} defaultValue="Inter" title="Font family">
                        <option value="Inter">Inter</option>
                        <option value="Poppins">Poppins</option>
                        <option value="Lexend">Lexend</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Courier New">Courier New</option>
                      </select>
                    </div>

                    {/* Font Size */}
                    <div className={styles.toolbarGroup}>
                      <select className={styles.toolSelect} onChange={handleFontSize} defaultValue="3" title="Font size" style={{ minWidth: 65 }}>
                        <option value="1">Small</option>
                        <option value="2">Normal-</option>
                        <option value="3">Normal</option>
                        <option value="4">Medium</option>
                        <option value="5">Large</option>
                        <option value="6">X-Large</option>
                        <option value="7">Huge</option>
                      </select>
                    </div>

                    <div className={styles.toolbarDivider} />

                    {/* Text Format */}
                    <div className={styles.toolbarGroup}>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('bold')} title="Bold">
                        <strong>B</strong>
                      </button>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('italic')} title="Italic">
                        <em>I</em>
                      </button>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('underline')} title="Underline">
                        <span style={{ textDecoration: 'underline' }}>U</span>
                      </button>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('strikeThrough')} title="Strikethrough">
                        <span style={{ textDecoration: 'line-through' }}>S</span>
                      </button>
                    </div>

                    <div className={styles.toolbarDivider} />

                    {/* Text Color */}
                    <div className={styles.toolbarGroup}>
                      <input
                        type="color"
                        className={styles.colorInput}
                        defaultValue="#1e293b"
                        onChange={handleTextColor}
                        title="Text color"
                      />
                    </div>

                    <div className={styles.toolbarDivider} />

                    {/* Alignment */}
                    <div className={styles.toolbarGroup}>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('justifyLeft')} title="Align left">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="17" y1="10" x2="3" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="17" y1="18" x2="3" y2="18"/></svg>
                      </button>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('justifyCenter')} title="Center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="10" x2="6" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="18" y1="18" x2="6" y2="18"/></svg>
                      </button>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('justifyRight')} title="Align right">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="21" y1="10" x2="7" y2="10"/><line x1="21" y1="6" x2="3" y2="6"/><line x1="21" y1="14" x2="3" y2="14"/><line x1="21" y1="18" x2="7" y2="18"/></svg>
                      </button>
                    </div>

                    <div className={styles.toolbarDivider} />

                    {/* Lists */}
                    <div className={styles.toolbarGroup}>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('insertUnorderedList')} title="Bullet list">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
                      </button>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('insertOrderedList')} title="Numbered list">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><text x="2" y="8" fontSize="7" fill="currentColor" fontFamily="sans-serif">1</text><text x="2" y="14" fontSize="7" fill="currentColor" fontFamily="sans-serif">2</text><text x="2" y="20" fontSize="7" fill="currentColor" fontFamily="sans-serif">3</text></svg>
                      </button>
                    </div>

                    <div className={styles.toolbarDivider} />

                    {/* Block quote */}
                    <div className={styles.toolbarGroup}>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('formatBlock', '<blockquote>')} title="Block quote">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 17h3l2-4V7H5v6h3"/><path d="M15 17h3l2-4V7h-6v6h3"/></svg>
                      </button>
                    </div>

                    <div className={styles.toolbarDivider} />

                    {/* Link */}
                    <div className={styles.toolbarGroup}>
                      <button type="button" className={styles.toolBtn} onClick={handleLink} title="Insert link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                      </button>
                      <button type="button" className={styles.toolBtn} onClick={handleUnlink} title="Remove link">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/><line x1="4" y1="20" x2="20" y2="4" strokeWidth="1.5"/></svg>
                      </button>
                    </div>

                    <div className={styles.toolbarDivider} />

                    {/* Image */}
                    <div className={styles.toolbarGroup}>
                      <button type="button" className={styles.toolBtn} onClick={handleInsertImage} title="Insert image" disabled={imageUploading}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
                      </button>
                    </div>

                    <div className={styles.toolbarDivider} />

                    {/* Undo/Redo */}
                    <div className={styles.toolbarGroup}>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('undo')} title="Undo">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
                      </button>
                      <button type="button" className={styles.toolBtn} onClick={() => execCmd('redo')} title="Redo">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10"/></svg>
                      </button>
                    </div>
                  </div>

                  {/* Editor Canvas */}
                  <div className={styles.editorWrapper}>
                    {dragOver && (
                      <div className={styles.editorDragOverlay}>
                        <div className={styles.editorDragOverlayText}>Drop images here</div>
                      </div>
                    )}
                    <div
                      ref={editorRef}
                      className={styles.editorCanvas}
                      contentEditable
                      suppressContentEditableWarning
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    />
                  </div>
                </div>

                {imageUploading && (
                  <div className={styles.imageUploading}>
                    <Loader2 size={16} className={styles.spinner} />
                    Uploading image...
                  </div>
                )}
              </div>
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
                <button type="button" className={styles.cancelBtn} onClick={resetForm}>
                  Cancel
                </button>
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
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(blog)}
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(blog.id, blog.title)}
                    disabled={deletingId === blog.id}
                  >
                    {deletingId === blog.id ? (
                      <Loader2 size={14} className={styles.spinner} />
                    ) : (
                      <><Trash2 size={14} /> Delete</>
                    )}
                  </button>
                </div>
              </div>
            ))}
            {blogs.length === 0 && <p className={styles.noBlogs}>No published blogs found.</p>}
          </div>
        </div>
      )}
    </div>
  )
}
