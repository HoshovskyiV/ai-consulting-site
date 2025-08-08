import React from 'react'

import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'AI Консалтинг - Василь Гошовський',
  description: 'Професійний AI консалтинг та відеопродакшн з 17-річним досвідом',
}
