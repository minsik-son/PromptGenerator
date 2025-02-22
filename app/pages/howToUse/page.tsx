import {
  Music2,
  Mic2,
  Radio,
  Clock,
  Users,
  Wand2,
  FileText,
  Languages,
  PenTool,
  Layout,
  ListMusic,
  Settings2,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

export default function UserGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navigation />

      {/* Header */}
      <header className="py-12 text-center px-4">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Suno AI Prompt Generator User Guide</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A powerful tool that utilizes AI to automatically generate songs and lyrics. Customize your music and lyrics
          by selecting your preferred style, mood, instruments, and more.
        </p>
      </header>

      <main className="container mx-auto px-4 pb-16 space-y-12">
        {/* Song Generator Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <Music2 className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">1. How to Use the Song Generator</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Key Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">1.1. Key Features</h3>
              <div className="grid gap-4">
                {[
                  {
                    icon: Radio,
                    title: "Genre Selection",
                    desc: "Choose from various music genres such as Pop, Rock, EDM, Jazz, etc.",
                  },
                  {
                    icon: Wand2,
                    title: "Mood Settings",
                    desc: "Define the song's mood, such as emotional, energetic, dreamy, etc.",
                  },
                  {
                    icon: Music2,
                    title: "Instruments",
                    desc: "Highlight specific instruments (e.g., piano, guitar, synthesizer, etc.)",
                  },
                  {
                    icon: Clock,
                    title: "Tempo Settings",
                    desc: "Select the desired tempo—Slow (60-90 BPM), Medium (90-120 BPM), or Fast (120-160 BPM)",
                  },
                  {
                    icon: Mic2,
                    title: "Vocal Type",
                    desc: "Choose the vocal style, such as male vocals, female vocals, or choir",
                  },
                  {
                    icon: Settings2,
                    title: "Vocal Effects",
                    desc: "Apply effects like robotic voice, deep reverb, distortion, etc.",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <feature.icon className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <h4 className="font-medium">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Use */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">1.2. How to Use</h3>
              <div className="space-y-4">
                {[
                  "Select Song Generator on the main page",
                  "Set the desired genre, mood, instruments, tempo, vocal type, etc.",
                  'Click the "Generate" button to create a song based on the selected settings',
                  "Review the generated song prompt and use Suno AI to produce the music",
                  "Modify the prompt if needed to refine the output further",
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium shrink-0">
                      {i + 1}
                    </span>
                    <p className="pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lyrics Generator Section */}
        <section className="space-y-8">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">2. How to Use the Lyrics Generator</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Key Features */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">2.1. Key Features</h3>
              <div className="grid gap-4">
                {[
                  {
                    icon: PenTool,
                    title: "Title Input",
                    desc: "If you have a title in mind, AI can generate lyrics based on it",
                  },
                  {
                    icon: Layout,
                    title: "Lyrics Style",
                    desc: "Choose a preferred writing style, such as emotional, narrative, or poetic",
                  },
                  {
                    icon: ListMusic,
                    title: "Lyrics Structure",
                    desc: "Define the composition of the lyrics (e.g., [Verse - Chorus - Verse - Bridge - Chorus])",
                  },
                  {
                    icon: Wand2,
                    title: "Theme Selection",
                    desc: "Set the song's theme (e.g., love, hope, growth, breakup, etc.)",
                  },
                  {
                    icon: Languages,
                    title: "Language Choice",
                    desc: "Generate lyrics in different languages, such as English, Spanish, Japanese, etc.",
                  },
                  {
                    icon: Users,
                    title: "Mood Settings",
                    desc: "Adjust the emotions conveyed in the lyrics (e.g., sad, hopeful, passionate, etc.)",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <feature.icon className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <h4 className="font-medium">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Use */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">2.2. How to Use</h3>
              <div className="space-y-4">
                {[
                  "Select Lyrics Generator on the main page",
                  "Set preferences such as lyrics style, structure, theme, mood, and genre",
                  'Click the "Generate" button to create lyrics based on the selected settings',
                  "Review the generated lyrics and adjust settings if necessary to achieve the best result",
                  "Copy the lyrics for use in your music production",
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium shrink-0">
                      {i + 1}
                    </span>
                    <p className="pt-1">{step}</p>
                  </div>
                ))}
              </div>
              
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

