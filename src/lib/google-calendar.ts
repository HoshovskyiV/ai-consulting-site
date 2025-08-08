import { google } from 'googleapis'

export async function createGoogleCalendarClient() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error('Google Calendar credentials not configured')
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  })

  return google.calendar({ version: 'v3', auth: oauth2Client })
}

export async function createCalendarEvent({
  summary,
  description,
  startDateTime,
  endDateTime,
  attendees = []
}: {
  summary: string
  description?: string
  startDateTime: string
  endDateTime: string
  attendees?: string[]
}) {
  try {
    const calendar = await createGoogleCalendarClient()

    const event = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone: 'Europe/Kiev'
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Europe/Kiev'
      },
      attendees: attendees.map(email => ({ email })),
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 30 }       // 30 minutes before
        ]
      }
    }

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event
    })

    return response.data
  } catch (error) {
    console.error('Calendar event creation error:', error)
    throw error
  }
}

export async function updateCalendarEvent(eventId: string, updates: any) {
  try {
    const calendar = await createGoogleCalendarClient()
    
    const response = await calendar.events.patch({
      calendarId: 'primary',
      eventId,
      requestBody: updates
    })

    return response.data
  } catch (error) {
    console.error('Calendar event update error:', error)
    throw error
  }
}

export async function deleteCalendarEvent(eventId: string) {
  try {
    const calendar = await createGoogleCalendarClient()
    
    await calendar.events.delete({
      calendarId: 'primary',
      eventId
    })

    return true
  } catch (error) {
    console.error('Calendar event deletion error:', error)
    throw error
  }
}
