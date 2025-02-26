"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Midjourney from "./Midjourney"
import Dalle from "./Dalle"
import { Label } from "@/components/ui/label"
import { Wand2 } from "lucide-react"

interface PromptBuilderProps {
  model: "midjourney" | "dalle"
  onReset: () => void
}

export default function PromptBuilder({ model, onReset }: PromptBuilderProps) {
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [styleStrength, setStyleStrength] = useState(100)
  const [imageWeight, setImageWeight] = useState(1)
  const [version, setVersion] = useState("v6")
  const [seed, setSeed] = useState("")
  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [cameraStyle, setCameraStyle] = useState("")
  const [artStyle, setArtStyle] = useState("")
  const [lighting, setLighting] = useState("")
  const [filter, setFilter] = useState("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      let finalPrompt = prompt
      if (model === "midjourney") {
        // 카메라 스타일, 아트 스타일, 조명, 필터 추가
        const styleElements = [
          cameraStyle && `${cameraStyle} style`,
          artStyle && `${artStyle} art style`,
          lighting && `${lighting} lighting`,
          filter && `${filter} filter`
        ].filter(Boolean).join(", ");
        
        // 스타일 요소가 있으면 프롬프트에 추가
        if (styleElements) {
          finalPrompt = `${finalPrompt}, ${styleElements}`;
        }

        finalPrompt = `/imagine prompt: ${referenceImage ? `${referenceImage}.png\n\n ` : ""}${finalPrompt}:: --ar ${aspectRatio} --s ${styleStrength} --iw ${imageWeight} --seed ${seed} --no ${negativePrompt}`
      } else {
        finalPrompt = `${finalPrompt} ${negativePrompt ? `. Avoid: ${negativePrompt}` : ""}`
      }
      toast.success("Prompt generated successfully!")
      setGeneratedPrompt(finalPrompt)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto mb-12 mt-10">  
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{model} Prompt Builder</CardTitle>
        </CardHeader>

        {model === "midjourney" ? (
          <Midjourney 
            {...{ 
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
              cameraStyle, 
              setCameraStyle,
              artStyle,
              setArtStyle,
              lighting,
              setLighting,
              filter,
              setFilter
            }} 
          />
        ) : (
          <Dalle {...{ prompt, setPrompt, negativePrompt, setNegativePrompt }} />
        )}

        <Button className="w-full" size="lg" onClick={handleGenerate} disabled={!prompt || isGenerating}>
          <Wand2 className="mr-2 h-5 w-5" />
          {isGenerating ? "Generating..." : "Generate"}
        </Button>
      </Card>
    </motion.div>
    {generatedPrompt && (
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-50 to-purple-100 rounded-2xl p-8 shadow-sm mb-12 mt-10 border border-gray-100">
        <Label>Generated Prompt</Label>
        <p className="text-gray-700 break-words">{generatedPrompt}</p>
      </div>
    )}
    </div>
  )
}