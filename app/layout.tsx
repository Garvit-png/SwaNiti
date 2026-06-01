import type { Metadata, Viewport } from 'next'
import { Inter, Lexend } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' })

export const metadata: Metadata = {
  title: 'SvaNiti Policy Research Center',
  description: "Building Bharat's Largest Idea Repository",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&amp;display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${lexend.variable}`}>
        {children}
      </body>
    </html>
  )
}
