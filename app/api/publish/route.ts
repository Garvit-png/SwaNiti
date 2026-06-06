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
    const content = formData.get('content') as string
    const file = formData.get('file') as File

    if (!title || !file) {
      return NextResponse.json({ error: 'Title and cover photo are required.' }, { status: 400 })
    }

    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const owner = 'Garvit-png'
    const repo = 'SwaNiti'
    const branch = 'main' 

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const imageName = `${id}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const imagePath = `public/images/blogs/${imageName}`
    const imageUrl = `/images/blogs/${imageName}`

    // 1. Upload Cover Photo
    if (token) {
      const base64File = fileBuffer.toString('base64')
      const imageRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${imagePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add cover photo for blog: ${title}`,
          content: base64File,
          branch
        })
      })

      if (!imageRes.ok) {
        const err = await imageRes.json()
        return NextResponse.json({ error: 'Failed to upload image to GitHub: ' + err.message }, { status: 500 })
      }
    } else if (isDev) {
      // Local fallback
      const fullImagePath = path.join(process.cwd(), imagePath)
      const dir = path.dirname(fullImagePath)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(fullImagePath, fileBuffer)
    }

    // 2. Update blogs.json
    const blogsJsonPath = 'app/data/blogs.json'
    let currentBlogs = []
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

    const newBlog = {
      id,
      title,
      excerpt,
      category,
      readTime,
      patternType: 'orange', 
      gridClass: 'blogCardMedium', 
      coverUrl: imageUrl,
      contentHtml: (() => {
        let html = content;
        // Convert Markdown images to HTML
        html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 12px; margin: 20px 0; display: block;" />');
        // Convert newlines to <br />
        return `<p>${html.replace(/\n/g, '<br />')}</p>`;
      })(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: {
        name: "Admin Contributor",
        role: "Guest",
        photo: "/logo.png"
      }
    }

    currentBlogs.unshift(newBlog) 

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
          message: `Add new blog: ${title}`,
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

    return NextResponse.json({ success: true, message: 'Blog published successfully' })
  } catch (error: any) {
    console.error('Error publishing blog:', error)
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 })
  }
}
