"use client"

import { useState } from "react"
import { CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, X } from "lucide-react"
import { toast } from "sonner"
import ResolutionSelector from "./PromptComponents/resolution-selector"
import AspectRatioSelector from "../imageGen/PromptComponents/aspect-ratio-selector"

interface VideoPromptProps {
  prompt: string
  setPrompt: (value: string) => void
  aspectRatio: string
  setAspectRatio: (value: string) => void
  resolution: string
  setResolution: (value: string) => void
}

export default function VideoPrompt({ 
  prompt, 
  setPrompt, 
  aspectRatio, 
  setAspectRatio,
  resolution,
  setResolution
}: VideoPromptProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("sora");
  const [showGeneratedPrompt, setShowGeneratedPrompt] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [originalPrompt, setOriginalPrompt] = useState("");

  const handleGeneratePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a video description first");
      return;
    }

    setIsGenerating(true);
    setShowGeneratedPrompt(false);
    setOriginalPrompt(prompt);

    try {
      // API 라우트를 통해 프롬프트 생성 요청
      const response = await fetch('/api/video/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptIdea: prompt,
          model: selectedModel,
          resolution: resolution,
          aspectRatio: aspectRatio
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate video prompt');
      }

      if (data.error) {
        toast.error(data.error);
      } else {
        setGeneratedPrompt(data.generatedPrompt);
        setShowGeneratedPrompt(true);
        toast.success("Video prompt enhanced successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
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

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Copied to clipboard!");
  };

  return (
    <CardContent className="space-y-8 pr-6 mt-10">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="prompt">Video Description</Label>
          <div className="relative">
            <Textarea
              id="prompt"
              placeholder="Describe the video scene you want to create in detail..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-48 resize-none pr-8"
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="model">AI Video Model</Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Select video AI model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sora">OpenAI Sora</SelectItem>
                <SelectItem value="runway">Runway Gen-2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resolution">Resolution</Label>
            <ResolutionSelector value={resolution} onChange={setResolution} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="aspectRatio">Aspect Ratio</Label>
            <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
          </div>
        </div>

        <Button 
          onClick={handleGeneratePrompt} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enhancing video prompt...
            </>
          ) : (
            "Generate Optimized Video Prompt"
          )}
        </Button>
      </div>
      
      {showGeneratedPrompt && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium">Enhanced Video Prompt</h3>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={cancelGeneratedPrompt}>
                Close
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
            <p>Original description: "{originalPrompt}"</p>
          </div>
        </div>
      )}
    </CardContent>
  )
} 