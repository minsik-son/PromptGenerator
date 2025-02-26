import { Footer } from "@/components/footer"
import ModelSelection from "@/components/imageGen/model-selection"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-100">
        <ModelSelection />
      </main>
      <Footer />
    </div>
  )
}

