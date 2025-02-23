'use client';
import { ArrowRight, Music, Image, Video, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function Promptmode() {

  return (
    <section className="bg-muted/50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
            Our AI Services Platform
          </h2>
          <div className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 opacity-75">
            <div className="rounded-lg bg-background p-6 shadow-lg relative overflow-hidden">
            <Link href="/promptgen/music">
                <Music className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Music Creation</h3>
                <p className="mt-2 text-muted-foreground">Create music effortlessly with Suno AI integration</p>
            </Link>
            </div>

            <div className="rounded-lg bg-background p-6 shadow-lg relative overflow-hidden">
            <Link href="/promptgen/music">

              <Image className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Image Generation</h3>
              <p className="mt-2 text-muted-foreground">Generate images using Midjourney and DALL·E</p>
              </Link>

            </div>
            <div className="rounded-lg bg-background p-6 shadow-lg relative overflow-hidden">
              <Video className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Video Production</h3>
              <p className="mt-2 text-muted-foreground">Create videos with AI-powered tools</p>
            </div>
            <div className="rounded-lg bg-background p-6 shadow-lg relative overflow-hidden">
              <MessageSquare className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-xl font-bold">Language Models</h3>
              <p className="mt-2 text-muted-foreground">Utilize GPT and Claude for various applications</p>
            </div>
            </div>
              <p className="text-center text-muted-foreground mt-8">
              Services for image generation, video production, and language models will be announced at a later date.
            </p>
          </div>
        </div>
      </section>
  )
}

