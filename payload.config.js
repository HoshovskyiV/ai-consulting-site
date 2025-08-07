import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
