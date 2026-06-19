import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const token = process.env.GITHUB_TOKEN
    const isDev = process.env.NODE_ENV === 'development'

    if (!token && !isDev) {
      return NextResponse.json(
        { error: 'GITHUB_TOKEN is not configured.' },
        { status: 500 }
      )
    }

    const formData = await req.formData()
    const quote = formData.get('quote') as string
    const author = formData.get('author') as string
    const org = formData.get('org') as string
    const file = formData.get('file') as File | null
    const existingId = formData.get('existingId') as string | null
    const existingPhotoUrl = formData.get('existingPhotoUrl') as string | null

    if (!quote || !author) {
      return NextResponse.json({ error: 'Quote and author are required.' }, { status: 400 })
    }

    if (!file && !existingId && !existingPhotoUrl) {
      return NextResponse.json({ error: 'Photo is required for new testimonials.' }, { status: 400 })
    }

    const id = existingId || Date.now().toString()
    const owner = 'Garvit-png'
    const repo = 'SwaNiti'
    const branch = 'main'

    let photoUrl = existingPhotoUrl || ''

    if (file) {
      const fileBuffer = Buffer.from(await file.arrayBuffer())
      const imageName = `testimonial-${id}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const imagePath = `public/images/testimonials/${imageName}`
      photoUrl = `/images/testimonials/${imageName}`

      if (token) {
        const base64File = fileBuffer.toString('base64')
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
            message: `${existingId ? 'Update' : 'Add'} photo for testimonial: ${author}`,
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

    const jsonPath = 'app/data/testimonials.json'
    let items: any[] = []
    let fileSha = ''

    if (token) {
      const getFileRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${jsonPath}?ref=${branch}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (getFileRes.ok) {
        const fileData = await getFileRes.json()
        fileSha = fileData.sha
        const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf8')
        try { items = JSON.parse(decodedContent) } catch (e) {}
      }
    } else if (isDev) {
      const fullJsonPath = path.join(process.cwd(), jsonPath)
      if (fs.existsSync(fullJsonPath)) {
        try { items = JSON.parse(fs.readFileSync(fullJsonPath, 'utf8')) } catch (e) {}
      }
    }

    const newItem = { id, quote, author, org, photo: photoUrl }

    if (existingId) {
      const idx = items.findIndex((b: any) => b.id === existingId)
      if (idx !== -1) {
        items[idx] = newItem
      } else {
        items.unshift(newItem)
      }
    } else {
      items.unshift(newItem)
    }

    const updatedJsonStr = JSON.stringify(items, null, 2)

    if (token) {
      const base64Json = Buffer.from(updatedJsonStr).toString('base64')
      const updateJsonRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${jsonPath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `${existingId ? 'Update' : 'Add new'} testimonial: ${author}`,
          content: base64Json,
          sha: fileSha || undefined,
          branch
        })
      })

      if (!updateJsonRes.ok) {
        const err = await updateJsonRes.json()
        return NextResponse.json({ error: 'Failed to update json: ' + err.message }, { status: 500 })
      }
    } else if (isDev) {
      const fullJsonPath = path.join(process.cwd(), jsonPath)
      fs.writeFileSync(fullJsonPath, updatedJsonStr)
    }

    return NextResponse.json({ success: true, message: 'Testimonial saved successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error: ' + error.message }, { status: 500 })
  }
}
