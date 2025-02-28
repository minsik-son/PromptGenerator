"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import VideoPrompt from "@/components/videoGen/VideoPrompt"
import { Navigation } from "@/components/navigation"

export default function VideoPromptPage() {
  const [prompt, setPrompt] = useState("")
  const [aspectRatio, setAspectRatio] = useState("16:9")
  const [resolution, setResolution] = useState("1920x1080")

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation sticky={true} />
      
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Video Prompt Generator</CardTitle>
            <CardDescription>
              Create detailed prompts for AI video generation models like Sora and Runway
            </CardDescription>
          </CardHeader>
          
          <VideoPrompt
            prompt={prompt}
            setPrompt={setPrompt}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            resolution={resolution}
            setResolution={setResolution}
          />
        </Card>
      </div>
    </div>
  )
} 