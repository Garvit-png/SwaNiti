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

    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required.' }, { status: 400 })
    }

    const owner = 'Garvit-png'
    const repo = 'SwaNiti'
    const branch = 'main'
    const blogsJsonPath = 'app/data/blogs.json'
    
    let currentBlogs = []
    let fileSha = ''

    // Read existing blogs.json
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

    // Filter out the blog to delete
    const newBlogs = currentBlogs.filter((b: any) => b.id !== id)
    const updatedJsonStr = JSON.stringify(newBlogs, null, 2)

    // Save updated blogs.json
    if (token) {
      const base64Json = Buffer.from(updatedJsonStr).toString('base64')
      const updateJsonRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${blogsJsonPath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete blog: ${id}`,
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

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' })
  } catch (error: any) {
    console.error('Error deleting blog:', error)
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 })
  }
}
