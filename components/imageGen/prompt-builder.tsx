"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Wand2 } from "lucide-react"
import AspectRatioSelector from "./aspect-ratio-selector"
import FileUpload from "./file-upload"
import { toast } from "sonner"
import { colors } from "@/lib/colors"

interface PromptBuilderProps {
  model: "midjourney" | "dalle"
  onReset: () => void
}

const versionOptions = [
  { value: "v6", label: "Version 6" },
  { value: "v5.2", label: "Version 5.2" },
  { value: "v5.1", label: "Version 5.1" },
  { value: "niji", label: "Niji" },
  { value: "hd", label: "HD" },
]

export default function PromptBuilder({ model, onReset }: PromptBuilderProps) {
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [styleStrength, setStyleStrength] = useState(100)
  const [imageWeight, setImageWeight] = useState(1)
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [version, setVersion] = useState("v6")
  const [seed, setSeed] = useState("")
  const [referenceImage, setReferenceImage] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      // Here you would integrate with the actual AI service
      // For now, we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      let finalPrompt = prompt
      if (model === "midjourney") {
        if (referenceImage) {
          finalPrompt = `[reference image] ${finalPrompt}`
        }
        const params = [
          `--ar ${aspectRatio}`,
          `--s ${styleStrength}`,
          version !== "v6" && `--${version}`,
          imageWeight !== 1 && `--iw ${imageWeight}`,
          seed && `--seed ${seed}`,
          negativePrompt && `--no ${negativePrompt}`,
        ].filter(Boolean)
        finalPrompt = `${finalPrompt} ${params.join(" ")}`
      } else {
        finalPrompt = `${finalPrompt}${negativePrompt ? `. Avoid: ${negativePrompt}` : ""}`
      }

      toast.success("Prompt generated successfully!")
      // Here you would handle the generated image
    } catch (error) {
      toast.error("Failed to generate image. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onReset}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="capitalize">{model} Prompt Builder</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {model === "midjourney" && (
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                  <Label>Version & Mode</Label>
                  <Select value={version} onValueChange={setVersion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      {versionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              
              <div className="space-y-6">
                
                <div className="space-y-2">
                  <Label htmlFor="seed">Seed</Label>
                  <Input
                    id="seed"
                    type="number"
                    placeholder="Random seed"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
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

          <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
          <div className="space-y-2">
                <Label>Reference Image</Label>
                <div>
                  <FileUpload onFileSelect={setReferenceImage} className="col-span-1" />
                  <div className="space-y-2">
                    <Label>Image Weight</Label>
                    <Slider
                      value={[imageWeight]}
                      onValueChange={([value]) => setImageWeight(value)}
                      min={0}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="text-sm text-muted-foreground text-right">{imageWeight}</div>
                  </div>
                </div>
              </div>

          {model === "midjourney" && (
            <div className="space-y-2">
              <Label>Style Strength</Label>
              <Slider
                value={[styleStrength]}
                onValueChange={([value]) => setStyleStrength(value)}
                max={1000}
                step={10}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-right">{styleStrength}</div>
            </div>
          )}

          <Button className="w-full" size="lg" onClick={handleGenerate} disabled={!prompt || isGenerating}>
            <Wand2 className="mr-2 h-5 w-5" />
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
/*
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onReset}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="capitalize">{model} Prompt Builder</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {model === "midjourney" && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Reference Image</Label>
                <FileUpload onFileSelect={setReferenceImage} className="col-span-1" />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Version & Mode</Label>
                  <Select value={version} onValueChange={setVersion}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      {versionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Image Weight</Label>
                  <Slider
                    value={[imageWeight]}
                    onValueChange={([value]) => setImageWeight(value)}
                    min={0}
                    max={2}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="text-sm text-muted-foreground text-right">{imageWeight}</div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seed">Seed</Label>
                  <Input
                    id="seed"
                    type="number"
                    placeholder="Random seed"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              placeholder="Enter your prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
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

          <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />

          {model === "midjourney" && (
            <div className="space-y-2">
              <Label>Style Strength</Label>
              <Slider
                value={[styleStrength]}
                onValueChange={([value]) => setStyleStrength(value)}
                max={1000}
                step={10}
                className="w-full"
              />
              <div className="text-sm text-muted-foreground text-right">{styleStrength}</div>
            </div>
          )}

          <Button className="w-full" size="lg" onClick={handleGenerate} disabled={!prompt || isGenerating}>
            <Wand2 className="mr-2 h-5 w-5" />
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

*/