"use client"

import { useState } from "react"
import { CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AspectRatioSelector from "./PromptComponents/aspect-ratio-selector"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { generateDallePrompt, dalleStyleSuggestions } from "@/lib/dalle-ai"

interface DalleProps {
  prompt: string
  setPrompt: (value: string) => void
  negativePrompt: string
  setNegativePrompt: (value: string) => void
  aspectRatio: string
  setAspectRatio: (value: string) => void
}

export default function Dalle({ 
  prompt, 
  setPrompt, 
  negativePrompt, 
  setNegativePrompt, 
  aspectRatio, 
  setAspectRatio 
}: DalleProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("none");

  const handleGeneratePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt idea first");
      return;
    }

    setIsGenerating(true);

    try {
      const result = await generateDallePrompt({
        prompt: prompt,
        style: selectedStyle === "none" ? "" : selectedStyle,
        aspectRatio: aspectRatio,
      });

      if ('error' in result) {
        toast.error(result.error || "Failed to generate prompt");
      } else {
        setPrompt(result.generatedPrompt);
        toast.success("Prompt enhanced successfully!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <CardContent className="space-y-8 max-h-[80vh] overflow-y-auto pr-6 mt-10">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Describe what you want to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="h-32 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="negative">Negative Prompt</Label>
            <Textarea
              id="negative"
              placeholder="Describe what you want to avoid..."
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="h-32 resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger id="style">
                <SelectValue placeholder="Select a style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No specific style</SelectItem>
                {dalleStyleSuggestions.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
        </div>

        <Button 
          onClick={handleGeneratePrompt} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enhancing prompt...
            </>
          ) : (
            "Enhance prompt with AI"
          )}
        </Button>
      </div>
    </CardContent>
  )
}
