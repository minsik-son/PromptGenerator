"use client"

import { useState } from "react"
import { CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AspectRatioSelector from "./PromptComponents/aspect-ratio-selector"
import { Loader2, X } from "lucide-react"
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
  const [showGeneratedPrompt, setShowGeneratedPrompt] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [originalPrompt, setOriginalPrompt] = useState("");

  const handleGeneratePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt idea first");
      return;
    }

    setIsGenerating(true);
    setShowGeneratedPrompt(false);
    setOriginalPrompt(prompt);

    try {
      const result = await generateDallePrompt({
        prompt: prompt,
        style: selectedStyle === "none" ? "" : selectedStyle,
        aspectRatio: aspectRatio,
      });

      if ('error' in result) {
        toast.error(result.error || "Failed to generate prompt");
      } else {
        setGeneratedPrompt(result.generatedPrompt);
        setShowGeneratedPrompt(true);
        toast.success("Prompt enhanced successfully!");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyGeneratedPrompt = () => {
    setPrompt(generatedPrompt);
    setShowGeneratedPrompt(false);
    setGeneratedPrompt("");
  };

  const cancelGeneratedPrompt = () => {
    setShowGeneratedPrompt(false);
    setGeneratedPrompt("");
  };

  return (
    <CardContent className="space-y-8 max-h-[80vh] overflow-y-auto pr-6 mt-10">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <div className="relative">
              <Textarea
                id="prompt"
                placeholder="Describe what you want to create..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="h-32 resize-none pr-8"
              />
              {prompt && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setPrompt("");
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-colors bg-white/80 rounded-full p-1"
                  title="Clear prompt"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="negative">Negative Prompt</Label>
            <div className="relative">
              <Textarea
                id="negative"
                placeholder="Describe what you want to avoid..."
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="h-32 resize-none pr-8"
              />
              {negativePrompt && (
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setNegativePrompt("");
                  }}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-colors bg-white/80 rounded-full p-1"
                  title="Clear negative prompt"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
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
      
      {showGeneratedPrompt && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium">Enhanced Prompt</h3>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={cancelGeneratedPrompt}>
                Cancel
              </Button>
              <Button size="sm" onClick={applyGeneratedPrompt}>
                Use This Prompt
              </Button>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded border border-gray-200">
            <p className="text-sm">{generatedPrompt}</p>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>Original: "{originalPrompt}"</p>
          </div>
        </div>
      )}
    </CardContent>
  )
}
