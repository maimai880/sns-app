import type {Metadata} from "next"

export const metadata: Metadata = {
  title: "Welcome! | SNS-APP",
  description: "A simple social media app built with Next.js",
}

export default function Layout({children}: {
  children: React.ReactNode
}) {
  return (children)
}
