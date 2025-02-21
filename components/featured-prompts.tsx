'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { toast } from "sonner"

const featuredPrompts = [
  {
    id: 1,
    title: "Electric Ecstasy",
    description: "Craft an electrifying pop masterpiece with female vocals, pulsating energy, and an allegretto tempo that sparks a euphoric and lively atmosphere.",
    category: "Pop",
  },
  {
    id: 2,
    title: "Electric Echoes",
    description: "Develop a lively dance & electronic piece with male vocals, characterized by dynamic synths and a vibrant mood at an allegretto pace of 112-120 BPM.",
    category: "Dance & Electronic",
  },
  {
    id: 3,
    title: "Rebel Roar",
    description: "Produce a fusion of funk and hard rock elements, creating a groovy and rebellious track that makes listeners move and headbang in unison.",
    category: "Rock",
  },
  {
    id: 4,
    title: "Street Symphony",
    description: "Create a nostalgic boom-bap hip hop track inspired by the classic 90s sound, featuring vinyl scratches and soulful samples.",
    category: "Hip Hop",
  },
  {
    id: 5,
    title: "Cherry Blossom Harmony",
    description: "Design a colorful J-pop song enriched with dynamic piano notes, accompanied by the sweet serenade of a female singer, radiating positivity and cheerfulness.",
    category: "J-pop",
  },
  {
    id: 6,
    title: "Midnight Whispers",
    description: "Produce an atmospheric R&B piece with male vocals, ethereal synths, and intimate lyrics evoking a sense of mystery and longing.",
    category: "R&B",
  }
]

export function FeaturedPrompts() {
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
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Featured Prompts</h2>
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