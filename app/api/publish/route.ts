import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const token = process.env.GITHUB_TOKEN
    const isDev = process.env.NODE_ENV === 'development'

    if (!token && !isDev) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN is not configured in Vercel environment variables.' },
        { status: 500 }
      )
    }

    const formData = await req.formData()
    const title = formData.get('title') as string
    const excerpt = formData.get('excerpt') as string
    const category = formData.get('category') as string
    const readTime = formData.get('readTime') as string
    const contentHtml = formData.get('contentHtml') as string
    const content = formData.get('content') as string // legacy fallback
    const authorName = (formData.get('authorName') as string) || 'Admin Contributor'
    const authorRole = (formData.get('authorRole') as string) || 'Guest'
    const file = formData.get('file') as File | null
    const existingId = formData.get('existingId') as string | null
    const existingCoverUrl = formData.get('existingCoverUrl') as string | null

    const blogType = (formData.get('blogType') as string) || 'editor'
    const mediumUrl = formData.get('mediumUrl') as string | null
    const pdfFile = formData.get('pdfFile') as File | null
    const existingPdfUrl = formData.get('existingPdfUrl') as string | null

    if (!title) {
      return NextResponse.json({ error: 'Title is required.' }, { status: 400 })
    }

    // If no file and not editing (no existing cover), error
    if (!file && !existingId && !existingCoverUrl) {
      return NextResponse.json({ error: 'Cover photo is required for new blogs.' }, { status: 400 })
    }

    const id = existingId || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const owner = 'Garvit-png'
    const repo = 'SwaNiti'
    const branch = 'main' 

    let imageUrl = existingCoverUrl || ''

    // 1. Upload Cover Photo if new file provided
    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer())
      const imageName = `${id}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const imagePath = `public/images/blogs/${imageName}`
      imageUrl = `/images/blogs/${imageName}`

      if (token) {
        const base64File = fileBuffer.toString('base64')
        
        // Check if file already exists (for updates) to get SHA
        let existingSha = ''
        try {
          const checkRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${imagePath}?ref=${branch}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          if (checkRes.ok) {
            const checkData = await checkRes.json()
            existingSha = checkData.sha
          }
        } catch {}

        const imageRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${imagePath}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `${existingId ? 'Update' : 'Add'} cover photo for blog: ${title}`,
            content: base64File,
            ...(existingSha ? { sha: existingSha } : {}),
            branch
          })
        })

        if (!imageRes.ok) {
          const err = await imageRes.json()
          return NextResponse.json({ error: 'Failed to upload image to GitHub: ' + err.message }, { status: 500 })
        }
      } else if (isDev) {
        const fullImagePath = path.join(process.cwd(), imagePath)
        const dir = path.dirname(fullImagePath)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(fullImagePath, fileBuffer)
      }
    }

    // 1.5. Upload PDF Document if blogType is pdf and new pdfFile is provided
    let pdfUrl = existingPdfUrl || ''
    if (blogType === 'pdf' && pdfFile) {
      const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer())
      const pdfName = `${id}-${pdfFile.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const pdfPath = `public/documents/${pdfName}`
      pdfUrl = `/documents/${pdfName}`

      if (token) {
        const base64Pdf = pdfBuffer.toString('base64')
        let existingPdfSha = ''
        try {
          const checkRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${pdfPath}?ref=${branch}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
          if (checkRes.ok) {
            const checkData = await checkRes.json()
            existingPdfSha = checkData.sha
          }
        } catch {}

        const pdfRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${pdfPath}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Upload PDF for blog: ${title}`,
            content: base64Pdf,
            ...(existingPdfSha ? { sha: existingPdfSha } : {}),
            branch
          })
        })

        if (!pdfRes.ok) {
          const err = await pdfRes.json()
          return NextResponse.json({ error: 'Failed to upload PDF to GitHub: ' + err.message }, { status: 500 })
        }
      } else if (isDev) {
        const fullPdfPath = path.join(process.cwd(), pdfPath)
        const dir = path.dirname(fullPdfPath)
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
        fs.writeFileSync(fullPdfPath, pdfBuffer)
      }
    }

    // 2. Update blogs.json
    const blogsJsonPath = 'app/data/blogs.json'
    let currentBlogs: any[] = []
    let fileSha = ''

    if (token) {
      const getFileRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${blogsJsonPath}?ref=${branch}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (getFileRes.ok) {
        const fileData = await getFileRes.json()
        fileSha = fileData.sha
        const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf8')
        try { currentBlogs = JSON.parse(decodedContent) } catch (e) {}
      }
    } else if (isDev) {
      const fullJsonPath = path.join(process.cwd(), blogsJsonPath)
      if (fs.existsSync(fullJsonPath)) {
        try { currentBlogs = JSON.parse(fs.readFileSync(fullJsonPath, 'utf8')) } catch (e) {}
      }
    }

    // Build the final contentHtml
    let finalHtml = ''
    if (blogType === 'editor' && contentHtml) {
      finalHtml = contentHtml
    } else if (blogType === 'editor' && content) {
      let html = content
      html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 12px; margin: 20px 0; display: block;" />')
      finalHtml = `<p>${html.replace(/\n/g, '<br />')}</p>`
    }

    const newBlog = {
      id,
      title,
      excerpt,
      category,
      readTime,
      patternType: 'orange', 
      gridClass: 'blogCardMedium', 
      coverUrl: imageUrl,
      contentHtml: finalHtml,
      blogType,
      mediumUrl: blogType === 'medium' ? mediumUrl : undefined,
      pdfUrl: blogType === 'pdf' ? pdfUrl : undefined,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: {
        name: authorName,
        role: authorRole,
        photo: "/logo.png"
      }
    }

    if (existingId) {
      // Update existing blog
      const idx = currentBlogs.findIndex((b: any) => b.id === existingId)
      if (idx !== -1) {
        // Preserve existing date if not changed
        newBlog.date = currentBlogs[idx].date || newBlog.date
        currentBlogs[idx] = newBlog
      } else {
        // If not found, add as new
        currentBlogs.unshift(newBlog)
      }
    } else {
      // Add new blog at the top
      currentBlogs.unshift(newBlog)
    }

    const updatedJsonStr = JSON.stringify(currentBlogs, null, 2)

    if (token) {
      const base64Json = Buffer.from(updatedJsonStr).toString('base64')
      const updateJsonRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${blogsJsonPath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `${existingId ? 'Update' : 'Add new'} blog: ${title}`,
          content: base64Json,
          sha: fileSha || undefined,
          branch
        })
      })

      if (!updateJsonRes.ok) {
        const err = await updateJsonRes.json()
        return NextResponse.json({ error: 'Failed to update blogs.json: ' + err.message }, { status: 500 })
      }
    } else if (isDev) {
      const fullJsonPath = path.join(process.cwd(), blogsJsonPath)
      fs.writeFileSync(fullJsonPath, updatedJsonStr)
    }

    return NextResponse.json({ success: true, message: existingId ? 'Blog updated successfully' : 'Blog published successfully' })
  } catch (error: any) {
    console.error('Error publishing blog:', error)
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 })
  }
}
