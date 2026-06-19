import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { passcode } = await req.json()
    const correctPasscode = process.env.ADMIN_PASSCODE || '0313'

    if (passcode === correctPasscode) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Invalid passcode' }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
