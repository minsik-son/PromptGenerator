'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StarIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

/*
const featuredPrompts = [
  {
    id: 1,
    title: "Creative Story Generator",
    description: "Generate engaging short stories with complex characters and plot twists.",
    price: "0.1 ETH",
    category: "Creative Writing",
    rating: 4.8,
  },
  {
    id: 2,
    title: "SEO Content Optimizer",
    description: "Create SEO-optimized content that ranks well on search engines.",
    price: "0.08 ETH",
    category: "Marketing",
    rating: 4.9,
  },
  {
    id: 3,
    title: "Code Refactoring Assistant",
    description: "Improve your code quality with smart refactoring suggestions.",
    price: "0.15 ETH",
    category: "Programming",
    rating: 4.7,
  },
]
*/

interface FeaturedLyricsProps {
    copyToClipboard: (text: string, index: number) => void;
    copiedIndex: number | null;
}

const featuredPrompts = [
  {
    id: 1,
    title: "Melodic Keys",
    description: "Compose a vibrant J-pop track that prominently features the piano as the main instrument. The piano should provide a catchy and upbeat melody that drives the song forward. Incorporate elements of electronic pop production to enhance the energetic feel of the track. Experiment with various piano techniques, such as arpeggios, trills, and syncopated rhythms to add depth and interest to the music. Infuse the composition with a sense of joy and positivity that is characteristic of J-pop music.",
    category: "J-pop",
  },
  {
    id: 2,
    title: "Electric Keys Fusion",
    description: "Create an EDM track that seamlessly blends electronic beats and synths with the rich, emotive sounds of a cello. Use the cello to introduce a melodic motif that carries throughout the song, adding depth and emotion to the energetic electronic production. Experiment with different effects and techniques to showcase the versatility of the cello in an EDM setting. Consider incorporating both pizzicato and bowing techniques to create dynamic contrast and texture in the track. The goal is to create a captivating and innovative fusion of classical and electronic music that showcases the beauty and versatility of the cello in a modern context.",
    category: "EDM",
  },
  {
    id: 3,
    title: "Rhythm pop",
    description: "Create an upbeat Pop song that prominently features dynamic drum beats. The drums should drive the rhythm of the song and add energy and excitement to the overall sound. Experiment with different drum patterns and techniques to create a catchy and danceable track. Incorporate other elements of Pop music such as catchy melodies, colorful synths, and infectious hooks to make the song memorable and engaging.",
    category: "Pop",
  },
]

export function FeaturedLyrics() {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("텍스트가 클립보드에 복사되었습니다!");
      
      // 1초 후에 복사 상태 초기화
      setTimeout(() => {
        setCopiedId(null);
      }, 1000);
    } catch (err) {
      toast.error("복사하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Featured Lyrics</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPrompts.map((prompt) => (
            <Card key={prompt.id} className="group relative overflow-hidden transition-all hover:shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{prompt.title}</CardTitle>
                  </div>
                  <Badge variant="secondary">{prompt.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1 text-yellow-500">
                  <CardDescription className="mt-2">{prompt.description}</CardDescription>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button
                  onClick={() => handleCopy(prompt.description, prompt.id)}
                >
                  {copiedId === prompt.id ? "Copied!" : "Copy"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

