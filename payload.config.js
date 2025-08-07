import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { createCalendarEvent } from './src/lib/google-calendar.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const getServiceName = (service) => {
  const serviceNames = {
    audit: 'AI Discovery Audit',
    training: 'AI Training Session',
    mentorship: 'Monthly Mentorship'
  }
  return serviceNames[service] || service
}

const calculateEventDuration = (service) => {
  const durations = {
    audit: 90,      // 1.5 hours
    training: 120,  // 2 hours  
    mentorship: 60  // 1 hour
  }
  return durations[service] || 60
}

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      access: {
        delete: () => false,
        update: ({ req: { user } }) => Boolean(user),
      },
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'pages',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: lexicalEditor({}),
        },
        {
          name: 'slug',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      slug: 'bookings',
      admin: {
        group: 'Business',
        useAsTitle: 'id',
      },
      fields: [
        {
          name: 'customerName',
          type: 'text',
          required: true,
        },
        {
          name: 'customerEmail',
          type: 'email',
          required: true,
        },
        {
          name: 'service',
          type: 'select',
          required: true,
          options: [
            { label: 'AI Discovery Audit', value: 'audit' },
            { label: 'AI Training Session', value: 'training' },
            { label: 'Monthly Mentorship', value: 'mentorship' },
          ],
        },
        {
          name: 'amount',
          type: 'number',
          required: true,
        },
        {
          name: 'scheduledDate',
          type: 'date',
          required: true,
        },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'pending',
          options: [
            { label: 'Pending Payment', value: 'pending' },
            { label: 'Paid', value: 'paid' },
            { label: 'Completed', value: 'completed' },
            { label: 'Cancelled', value: 'cancelled' },
          ],
        },
        {
          name: 'monoInvoiceId',
          type: 'text',
        },
        {
          name: 'googleEventId',
          type: 'text',
        },
      ],
      hooks: {
        afterChange: [
          async ({ doc, previousDoc, operation }) => {
            // Only create calendar event when status changes to 'paid'
            if (
              operation === 'update' && 
              doc.status === 'paid' && 
              previousDoc?.status !== 'paid' &&
              !doc.googleEventId
            ) {
              try {
                const serviceName = getServiceName(doc.service)
                const duration = calculateEventDuration(doc.service)
                
                const startDateTime = new Date(doc.scheduledDate)
                const endDateTime = new Date(startDateTime.getTime() + duration * 60 * 1000)
                
                const calendarEvent = await createCalendarEvent({
                  summary: `${serviceName} - ${doc.customerName}`,
                  description: `
AI Consulting Session Details:
• Service: ${serviceName}
• Client: ${doc.customerName}
• Email: ${doc.customerEmail}
• Amount: ${doc.amount} UAH
• Booking ID: ${doc.id}

Meeting Link: https://meet.google.com/new (to be updated)
                  `.trim(),
                  startDateTime: startDateTime.toISOString(),
                  endDateTime: endDateTime.toISOString(),
                  attendees: [doc.customerEmail]
                })

                // Update booking with Google Calendar event ID
                if (calendarEvent?.id) {
                  // Use Payload API to update the document
                  const payload = await import('payload').then(m => m.getPayload({ config: this }))
                  await payload.update({
                    collection: 'bookings',
                    id: doc.id,
                    data: {
                      googleEventId: calendarEvent.id
                    }
                  })
                }

                console.log(`Calendar event created for booking ${doc.id}: ${calendarEvent?.id}`)
              } catch (error) {
                console.error('Failed to create calendar event:', error)
                // Don't throw error - payment is more important than calendar
              }
            }
          }
        ]
      }
    },
  ],
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
