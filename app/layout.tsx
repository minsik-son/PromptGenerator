import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NextAuthProvider } from "@/components/providers/next-auth-provider"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/auth-options"
import { redirect } from "next/navigation"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: "Suno AI Prompt Generator | Create Music, Lyrics & More",
    template: "%s | Suno AI Generator"
  },
  description: "Create professional AI music prompts and lyrics with Suno AI Generator. Easy-to-use tools for generating high-quality music prompts, lyrics, and more.",
  keywords: ["AI prompt generator", "Suno AI", "music generation", "AI lyrics", "AI music prompts", "music creation tools, Suno prompt generator, Suno prompt, Suno AI prompt generator, Suno AI prompt, Suno AI lyrics, Suno AI music prompts, Suno AI music generation, Suno AI music creation tools"],
  creator: "Prompt AI",
  publisher: "Vercel",
  generator: 'Next.js',
  applicationName: 'Suno AI Generator',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'ai.prompt.gene' }],
  colorScheme: 'light',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.promptaipro.com/',
    siteName: 'Suno AI Generator',
    title: 'Suno AI Prompt Generator | Create Music, Lyrics & More',
    description: 'Create professional AI music prompts and lyrics with Suno AI Generator. Easy-to-use tools for generating high-quality music prompts, lyrics, and more.',
    images: [{
      url: '/images/PromptAI-logo.png',
      width: 1200,
      height: 630,
      alt: 'Suno AI Generator Preview'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Suno AI Prompt Generator | Create Music, Lyrics & More',
    description: 'Create professional AI music prompts and lyrics with Suno AI Generator',
    images: ['/twitter-image.jpg'],
    creator: '@yourhandle'
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: 'https://www.promptaipro.com/',
    languages: {
      'en-US': 'https://www.promptaipro.com/en-US',
      'ko-KR': 'https://www.promptaipro.com/ko-KR',
    },
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
        <meta name="google-adsense-account" content="ca-pub-9921649727270589" />
      </head>
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
          <Analytics />
        </NextAuthProvider>
      </body>
    </html>
  )
}
