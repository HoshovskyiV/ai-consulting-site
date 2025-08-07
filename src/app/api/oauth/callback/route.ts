import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 })
  }

  try {
    console.log('Environment variables check:')
    console.log('GOOGLE_CLIENT_ID exists:', !!process.env.GOOGLE_CLIENT_ID)
    console.log('GOOGLE_CLIENT_SECRET exists:', !!process.env.GOOGLE_CLIENT_SECRET)
    console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXTAUTH_URL}/api/oauth/callback`,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData)
      return NextResponse.json({ 
        error: 'Token exchange failed', 
        details: tokenData 
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      refresh_token: tokenData.refresh_token,
      access_token: tokenData.access_token?.substring(0, 20) + '...',
      message: 'Copy the refresh_token value and add it to Vercel environment variables as GOOGLE_REFRESH_TOKEN'
    })
  } catch (error) {
    console.error('OAuth error details:', error)
    return NextResponse.json({ 
      error: 'OAuth processing failed', 
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
