import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NextAuthProvider } from "@/components/providers/next-auth-provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/auth-options"
import { redirect } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Suno AI Generator",
  description: "Generate AI prompts and Lyrics for your projects",
  generator: 'v0.dev',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
