import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, contact, email, message } = await request.json()

    if (!name || !contact || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Log the message (in production, send to email service or database)
    console.log('Contact form submission:', { name, contact, email, message, timestamp: new Date() })

    // For now, just return success
    // In production, integrate with:
    // - SendGrid / Mailgun for email
    // - Supabase / Firebase for database
    // - Formspree API

    return NextResponse.json(
      { success: true, message: 'Message received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
