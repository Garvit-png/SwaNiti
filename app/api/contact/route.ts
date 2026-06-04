import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, message } = body

    // Validate all fields
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    // Compose the email
    const mailOptions = {
      from: `"SvaNiti Website" <${process.env.GMAIL_USER}>`,
      to: 'office@svaniti.in',
      replyTo: email,
      subject: `New Contact from SvaNiti Website — ${name}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fffe; border-radius: 16px; overflow: hidden; border: 1px solid #e0f7f7;">
          <div style="background: linear-gradient(135deg, #c8fbfb 0%, #fef5ce 100%); padding: 32px 28px 20px;">
            <h1 style="margin: 0; font-size: 22px; color: #0B2228; font-weight: 600;">New Notion for Nation 🇮🇳</h1>
            <p style="margin: 8px 0 0; font-size: 14px; color: #0B2228; opacity: 0.7;">Someone reached out via svanitipolicy.vercel.app</p>
          </div>
          <div style="padding: 28px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f5f5; font-size: 13px; color: #888; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f5f5; font-size: 15px; color: #0B2228; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f5f5; font-size: 13px; color: #888; vertical-align: top;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f5f5; font-size: 15px; color: #0B2228; font-weight: 500;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f5f5; font-size: 13px; color: #888; vertical-align: top;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #e8f5f5; font-size: 15px; color: #0B2228; font-weight: 500;"><a href="mailto:${email}" style="color: #0B2228;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-size: 13px; color: #888; vertical-align: top;">Message</td>
                <td style="padding: 12px 0; font-size: 15px; color: #0B2228; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
          </div>
          <div style="padding: 16px 28px; background: #f0fafa; text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #888;">SvaNiti Policy Research Center • svanitipolicy.vercel.app</p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
