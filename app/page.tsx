import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { FeaturedPrompts } from "@/components/featured-prompts"
import { Footer } from "@/components/footer"
import { SelectMode } from "@/components/selectMode"
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <SelectMode />
        <FeaturedPrompts />
      </main>
      <Footer />
    </div>
  )
}

