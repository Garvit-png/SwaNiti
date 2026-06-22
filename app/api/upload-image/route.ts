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
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No image file provided.' }, { status: 400 })
    }

    const owner = 'Garvit-png'
    const repo = 'SwaNiti'
    const branch = 'main'

    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const imageName = `inline-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const imagePath = `public/images/blogs/inline/${imageName}`
    const imageUrl = `/images/blogs/inline/${imageName}`

    if (token) {
      const base64File = fileBuffer.toString('base64')
      const imageRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${imagePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add inline blog image: ${file.name}`,
          content: base64File,
          branch
        })
      })

      if (!imageRes.ok) {
        const err = await imageRes.json()
        return NextResponse.json({ error: 'Failed to upload image to GitHub: ' + err.message }, { status: 500 })
      }
      
      // Return the raw GitHub URL so it's instantly accessible in production
      return NextResponse.json({ 
        success: true, 
        url: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${imagePath}` 
      })
    } else if (isDev) {
      // Local fallback
      const fullImagePath = path.join(process.cwd(), imagePath)
      const dir = path.dirname(fullImagePath)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(fullImagePath, fileBuffer)
    }

    return NextResponse.json({ success: true, url: imageUrl })
  } catch (error: any) {
    console.error('Error uploading inline image:', error)
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 })
  }
}
