import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 })
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXTAUTH_URL}/api/oauth/callback`
    )

    const { tokens } = await oauth2Client.getToken(code)
    
    // In production, you would save the refresh_token securely
    // For now, we'll display it to copy manually to environment variables
    return NextResponse.json({
      success: true,
      refresh_token: tokens.refresh_token,
      message: 'Save this refresh_token to GOOGLE_REFRESH_TOKEN environment variable'
    })
  } catch (error) {
    console.error('OAuth error:', error)
    return NextResponse.json({ error: 'OAuth failed' }, { status: 500 })
  }
}
