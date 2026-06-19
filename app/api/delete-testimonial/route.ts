import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const token = process.env.GITHUB_TOKEN
    const isDev = process.env.NODE_ENV === 'development'

    if (!token && !isDev) {
      return NextResponse.json({ error: 'GITHUB_TOKEN is not configured.' }, { status: 500 })
    }

    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

    const jsonPath = 'app/data/testimonials.json'
    const owner = 'Garvit-png'
    const repo = 'SwaNiti'
    const branch = 'main'
    let currentData: any[] = []
    let fileSha = ''

    if (token) {
      const getFileRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${jsonPath}?ref=${branch}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      if (getFileRes.ok) {
        const fileData = await getFileRes.json()
        fileSha = fileData.sha
        const decodedContent = Buffer.from(fileData.content, 'base64').toString('utf8')
        try { currentData = JSON.parse(decodedContent) } catch (e) {}
      }
    } else if (isDev) {
      const fullJsonPath = path.join(process.cwd(), jsonPath)
      if (fs.existsSync(fullJsonPath)) {
        try { currentData = JSON.parse(fs.readFileSync(fullJsonPath, 'utf8')) } catch (e) {}
      }
    }

    const newData = currentData.filter((b: any) => b.id !== id)
    const updatedJsonStr = JSON.stringify(newData, null, 2)

    if (token) {
      const base64Json = Buffer.from(updatedJsonStr).toString('base64')
      const updateJsonRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${jsonPath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete testimonial ${id}`,
          content: base64Json,
          sha: fileSha,
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

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
