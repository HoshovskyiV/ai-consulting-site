import { NextRequest, NextResponse } from 'next/server'

const MONOBANK_TOKEN = 'mono_test_8f2b1c9d4e0a7f3b'
const WEBINAR_PRICE_UAH = 1500

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    const response = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
      method: 'POST',
      headers: {
        'X-Token': MONOBANK_TOKEN,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: WEBINAR_PRICE_UAH * 100,
        ccy: 980,
        merchantPaymInfo: {
          reference: `webinar-${Date.now()}`,
          destination: 'Вебінар: AI для бізнесу',
          comment: `Учасник: ${name}, ${email}`,
        },
        redirectUrl: `${req.nextUrl.origin}/webinar-success`,
      }),
    })

    const invoiceData = await response.json()

    if (!response.ok || !invoiceData.pageUrl) {
      return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 })
    }

    return NextResponse.json({ paymentUrl: invoiceData.pageUrl })
  } catch (error) {
    console.error('Webinar payment error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
