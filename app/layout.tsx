import type { Metadata } from 'next'
import { Inter, Lexend, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const lexend = Lexend({ subsets: ['latin'], variable: '--font-lexend' })
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins' 
})

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
      <body className={`${inter.variable} ${lexend.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  )
}
