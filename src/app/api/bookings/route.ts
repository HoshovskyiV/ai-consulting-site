import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../../payload.config'

export async function POST(req: NextRequest) {
  try {
    const {
      customerName,
      customerEmail,
      service,
      scheduledDate,
      amount
    } = await req.json()

    if (!customerName || !customerEmail || !service || !scheduledDate || !amount) {
      return NextResponse.json(
        { error: 'Всі поля обов\'язкові' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })
    
    const booking = await payload.create({
      collection: 'bookings',
      data: {
        customerName,
        customerEmail,
        service,
        scheduledDate: new Date(scheduledDate).toISOString(),
        amount,
        status: 'pending',
      },
    })

    return NextResponse.json({
      success: true,
      id: booking.id,
      booking
    })
  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { error: 'Помилка створення бронювання' },
      { status: 500 }
    )
  }
}
