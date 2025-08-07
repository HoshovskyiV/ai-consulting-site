import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 'exists' : 'missing',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'exists' : 'missing',
    expected_redirect_uri: `${process.env.NEXTAUTH_URL}/api/oauth/callback`,
    deployment_url: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'not available',
    environment: process.env.NODE_ENV
  })
}