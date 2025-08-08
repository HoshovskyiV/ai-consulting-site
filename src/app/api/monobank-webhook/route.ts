import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '../../../../payload.config'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('x-sign')

    if (!process.env.MONOBANK_WEBHOOK_SECRET || !signature) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const hash = crypto
      .createHmac('sha1', process.env.MONOBANK_WEBHOOK_SECRET)
      .update(body)
      .digest('base64')

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }

    const webhookData = JSON.parse(body)
    const { invoiceId, status, reference } = webhookData

    if (status === 'success' && reference) {
      const payload = await getPayload({ config })
      
      await payload.update({
        collection: 'bookings',
        where: {
          id: {
            equals: reference,
          },
        },
        data: {
          status: 'paid',
          monoInvoiceId: invoiceId,
        },
      })

      console.log(`Booking ${reference} marked as paid`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
