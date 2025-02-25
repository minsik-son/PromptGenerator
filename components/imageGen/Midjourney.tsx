"use client"

import { useState } from "react"
import { CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import FileUpload from "./file-upload"
import AspectRatioSelector from "./aspect-ratio-selector"

const versionOptions = [
  { value: "v6", label: "Version 6" },
  { value: "v5.2", label: "Version 5.2" },
  { value: "v5.1", label: "Version 5.1" },
  { value: "niji", label: "Niji" },
  { value: "hd", label: "HD" },
]

interface MidjourneyProps {
  prompt: string
  setPrompt: (value: string) => void
  negativePrompt: string
  setNegativePrompt: (value: string) => void
  aspectRatio: string
  setAspectRatio: (value: string) => void
  styleStrength: number
  setStyleStrength: (value: number) => void
  imageWeight: number
  setImageWeight: (value: number) => void
  version: string
  setVersion: (value: string) => void
  seed: string
  setSeed: (value: string) => void
  referenceImage: string | null
  setReferenceImage: (value: string | null) => void
}

export default function Midjourney({
  prompt,
  setPrompt,
  negativePrompt,
  setNegativePrompt,
  aspectRatio,
  setAspectRatio,
  styleStrength,
  setStyleStrength,
  imageWeight,
  setImageWeight,
  version,
  setVersion,
  seed,
  setSeed,
  referenceImage,
  setReferenceImage,
}: MidjourneyProps) {
  return (
    <CardContent className="space-y-6">
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

      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
      <Label>Reference Image</Label>
      <FileUpload onFileSelect={setReferenceImage} />
      <Label>Image Weight</Label>
      <Slider value={[imageWeight]} onValueChange={([value]) => setImageWeight(value)} min={0} max={2} step={0.1} />

      <Label>Style Strength</Label>
      <Slider value={[styleStrength]} onValueChange={([value]) => setStyleStrength(value)} max={1000} step={10} />
    </CardContent>
  )
}
