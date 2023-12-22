import type {Metadata} from "next"
import {Noto_Sans_JP} from "next/font/google"
import {KumaRegistry} from "@kuma-ui/next-plugin/registry"
import "./global.css"

const inter = Noto_Sans_JP({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "SNS-APP",
  description: "A simple social media app built with Next.js",
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
    <body className={inter.className}>
    <link rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,-25"/>
    <KumaRegistry>
      {children}
    </KumaRegistry>
    </body>
    </html>
  )
}
