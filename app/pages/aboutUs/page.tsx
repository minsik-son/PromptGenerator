import { ArrowRight, Music, Image, Video, MessageSquare } from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
        <Navigation sticky={true} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Opening New Possibilities in the AI Era
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Together, we're shaping the future of AI interaction and creativity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Mission</h2>
              <p className="text-lg text-muted-foreground">
                As AI technology becomes deeply embedded in our daily lives, effective communication with AI has become
                an essential skill. However, many people struggle to fully utilize AI tools.
              </p>
              <p className="text-lg text-muted-foreground">
                We are here to solve that challenge. Our mission is to empower everyone to harness the power of AI
                effortlessly, even without complex knowledge of prompt engineering.
              </p>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-xl bg-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">
            Our AI Services Platform
          </h2>

          {/* Current Service */}
          <div className="mb-12">
            <h3 className="mb-8 text-center text-xl font-semibold text-primary">Currently Available</h3>
            <div className="mx-auto max-w-md">
              <div className="rounded-lg bg-background p-6 shadow-lg">
                <Music className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Music Creation</h3>
                <p className="mt-2 text-muted-foreground">Create music effortlessly with Suno AI integration</p>
              </div>
            </div>
          </div>

          {/* Coming Soon Services */}
          <div className="space-y-8">
            <h3 className="text-center text-xl font-semibold text-primary">Coming Soon</h3>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 opacity-75">
              <div className="rounded-lg bg-background p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-primary/10 text-primary text-sm py-1 px-2 rounded-full">
                  Coming Soon
                </div>
                <Image className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Image Generation</h3>
                <p className="mt-2 text-muted-foreground">Generate images using Midjourney and DALL·E</p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-primary/10 text-primary text-sm py-1 px-2 rounded-full">
                  Coming Soon
                </div>
                <Video className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-bold">Video Production</h3>
                <p className="mt-2 text-muted-foreground">Create videos with AI-powered tools</p>
              </div>
              <div className="rounded-lg bg-background p-6 shadow-lg relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-primary/10 text-primary text-sm py-1 px-2 rounded-full">
                  Coming Soon
                </div>
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

      {/* Closing Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Promise</h2>
            <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
              Supporting everyone's creative journey is our promise.
            </p>
            {/** 
            <button  className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Join Us Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            */}
          </div>
        </div>
      </section>
    </main>
  )
}

