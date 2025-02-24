import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { FeaturedPrompts } from "@/components/featured-prompts"
import { Footer } from "@/components/footer"
import { SelectMode } from "@/components/selectMode"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { signOut } from "next-auth/react"
import { Metadata } from 'next'
import Promptmode from "@/components/Promptmode"

//Main Page

export const metadata: Metadata = {
  title: 'Create AI Music Prompts | Suno AI Generator',
  description: 'Generate professional music prompts and lyrics using Suno AI. Our advanced AI tools help you create unique and engaging musical content.',
  openGraph: {
    title: 'Create AI Music Prompts | Suno AI Generator',
    description: 'Generate professional music prompts and lyrics using Suno AI',
  }
}

export default async function SelectPrompt() {
    console.log("Promptmode:" + Promptmode);
    /*
  const session = await getServerSession(authOptions)

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!session) {
    redirect("/login")
  }
  */
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Suno AI Generator",
              "applicationCategory": "MusicApplication",
              "description": "AI-powered tool for generating music prompts and lyrics",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Music Prompt Generation",
                "Lyrics Generation",
                "AI-powered Creativity Tools"
              ]
            })
          }}
        />
        <Hero />
        <Promptmode />
      </main>
      <Footer />
    </div>
  )
}

