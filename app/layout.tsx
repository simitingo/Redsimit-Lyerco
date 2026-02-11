import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Redsimit & Lyerco',
  description: 'Buy Steam accounts & more',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
