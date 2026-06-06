"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './portal.module.css'
import { Loader2, ArrowLeft, Trash2 } from 'lucide-react'
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [passcodeError, setPasscodeError] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [uploadingInline, setUploadingInline] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [status, setStatus] = useState<{ type: 'success' | 'error' | '', message: string }>({ type: '', message: '' })

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Policy',
    readTime: '5 min read',
    content: ''
  })
  const [file, setFile] = useState<File | null>(null)

  const [blogs, setBlogs] = useState<BlogData[]>(allBlogsData as BlogData[])

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

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
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
        // Update UI without reloading
        setBlogs(prev => prev.filter(b => b.id !== id))
      } else {
        setStatus({ type: 'error', message: result.error || 'Failed to delete blog' })
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Network error occurred' })
    } finally {
      setDeletingId(null)
    }
  }

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

  return (
    <div className={styles.portalContainer}>
      <div className={styles.header}>
        <Link href="/" className={styles.backButton}>
          <ArrowLeft size={20} /> Back to Home
        </Link>
        <h1>Admin Portal</h1>
        <p>Manage your blog posts here.</p>
      </div>

      {status.message && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className={`${styles.alert} ${styles[status.type]}`}>
            {status.message}
          </div>
        </div>
      )}

      <form className={styles.formCard} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Create New Blog</h2>

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
          <div className={styles.contentHeader}>
            <label>Content (Markdown or HTML)</label>
            <div className={styles.inlineImageUploader}>
              <input 
                type="file" 
                accept="image/*" 
                id="inlineImageInput"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  if (!e.target.files || !e.target.files[0]) return;
                  const imgFile = e.target.files[0];
                  setUploadingInline(true);
                  const uploadData = new FormData();
                  uploadData.append('file', imgFile);
                  
                  try {
                    const res = await fetch('/api/upload-image', {
                      method: 'POST',
                      body: uploadData
                    });
                    const result = await res.json();
                    if (res.ok && result.url) {
                      const imageMarkdown = `\n![${imgFile.name}](${result.url})\n`;
                      const textarea = document.getElementById('contentTextArea') as HTMLTextAreaElement;
                      
                      if (textarea) {
                        const start = textarea.selectionStart;
                        const end = textarea.selectionEnd;
                        const text = formData.content;
                        const before = text.substring(0, start);
                        const after = text.substring(end, text.length);
                        
                        setFormData(prev => ({ ...prev, content: before + imageMarkdown + after }));
                        
                        setTimeout(() => {
                          textarea.focus();
                          textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
                        }, 0);
                      } else {
                        setFormData(prev => ({ ...prev, content: prev.content + imageMarkdown }));
                      }
                      
                      setStatus({ type: 'success', message: 'Image uploaded and inserted into content!' });
                    } else {
                      setStatus({ type: 'error', message: result.error || 'Failed to upload inline image' });
                    }
                  } catch (err) {
                    setStatus({ type: 'error', message: 'Network error uploading inline image' });
                  } finally {
                    setUploadingInline(false);
                    e.target.value = '';
                  }
                }}
              />
              <button 
                type="button" 
                className={styles.uploadInlineBtn}
                disabled={uploadingInline}
                onClick={() => document.getElementById('inlineImageInput')?.click()}
              >
                {uploadingInline ? <><Loader2 size={14} className={styles.spinner} /> Uploading...</> : '🖼️ Insert Image'}
              </button>
            </div>
          </div>
          <textarea id="contentTextArea" name="content" value={formData.content} onChange={handleChange} required rows={15} placeholder="Write your blog content here... Use markdown or HTML." />
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? <><Loader2 size={18} className={styles.spinner} /> Pushing to Vercel...</> : 'Publish to Vercel'}
        </button>
      </form>

      <div className={styles.manageSection}>
        <h2>Manage Blogs</h2>
        <div className={styles.blogList}>
          {blogs.map((blog) => (
            <div key={blog.id} className={styles.blogItem}>
              <div>
                <h3>{blog.title}</h3>
                <p>{blog.date} • {blog.category}</p>
              </div>
              <button 
                className={styles.deleteBtn} 
                onClick={() => handleDelete(blog.id, blog.title)}
                disabled={deletingId === blog.id}
              >
                {deletingId === blog.id ? <Loader2 size={18} className={styles.spinner} /> : <><Trash2 size={18} /> Delete</>}
              </button>
            </div>
          ))}
          {blogs.length === 0 && <p className={styles.noBlogs}>No published blogs found.</p>}
        </div>
      </div>
    </div>
  )
}
