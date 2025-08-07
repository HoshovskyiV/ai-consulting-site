import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../payload.config'

export async function POST(req: NextRequest) {
  try {
    const { bookingId } = await req.json()

    if (!bookingId) {
      return NextResponse.json({ error: 'Booking ID required' }, { status: 400 })
    }

    const payload = await getPayload({ config })
    const booking = await payload.findByID({
      collection: 'bookings',
      id: bookingId,
    })

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const response = await fetch('https://api.monobank.ua/api/merchant/invoice/create', {
      method: 'POST',
      headers: {
        'X-Token': process.env.MONOBANK_TOKEN!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: booking.amount * 100,
        ccy: 980,
        merchantPaymInfo: {
          reference: bookingId,
          destination: `Оплата за ${booking.service}`,
        },
        redirectUrl: `${process.env.NEXTAUTH_URL}/payment-success?booking=${bookingId}`,
        webHookUrl: `${process.env.NEXTAUTH_URL}/api/monobank-webhook`,
      }),
    })

    const invoiceData = await response.json()

    if (response.ok && invoiceData.pageUrl) {
      return NextResponse.json({ 
        paymentUrl: invoiceData.pageUrl,
        invoiceId: invoiceData.invoiceId 
      })
    }

    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 })
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
