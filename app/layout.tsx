import type { Metadata } from 'next'
import { Inter, Lexend } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' })

export const metadata: Metadata = {
  title: 'SvaNiti Policy Research Center',
  description: "Building Bharat's Largest Idea Repository",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lexend.variable}`}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
