"use client"

import { CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface DalleProps {
  prompt: string
  setPrompt: (value: string) => void
  negativePrompt: string
  setNegativePrompt: (value: string) => void
}

export default function Dalle({ prompt, setPrompt, negativePrompt, setNegativePrompt }: DalleProps) {
  return (
    <CardContent className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="prompt">Prompt</Label>
        <Textarea
          id="prompt"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="negative">Negative Prompt</Label>
        <Textarea
          id="negative"
          placeholder="Enter elements to avoid..."
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
        />
      </div>
    </CardContent>
  )
}
