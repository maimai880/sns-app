import type { Metadata } from 'next'
import {Noto_Sans_JP} from "next/font/google"

const inter = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SNS-APP',
  description: 'A simple social media app built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
