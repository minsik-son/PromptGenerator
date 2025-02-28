"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, DownloadIcon, Share2 } from "lucide-react"
import { toast } from "sonner"
import Midjourney from "./Midjourney"
import DALLE from "./Dalle"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

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
  const [version, setVersion] = useState(model === "midjourney" ? "v6" : "3")
  const [seed, setSeed] = useState("")
  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  
  // Style selections
  const [cameraStyle, setCameraStyle] = useState("")
  const [artStyle, setArtStyle] = useState("")
  const [lighting, setLighting] = useState("")
  const [filter, setFilter] = useState("")
  
  // Additional parameters
  const [chaos, setChaos] = useState(0)
  const [repeat, setRepeat] = useState(1)
  const [tile, setTile] = useState(false)
  const [video, setVideo] = useState(false)
  const [weird, setWeird] = useState(0)
  const [quality, setQuality] = useState("1")
  const [stop, setStop] = useState(100)

  // DALLE-specific parameters
  const [dalleStyle, setDalleStyle] = useState("vivid")
  const [hd, setHd] = useState(false)
  
  // Show/hide generated prompt section
  const [showPromptSection, setShowPromptSection] = useState(false)
  const [generatedPromptText, setGeneratedPromptText] = useState("")

  // Update generated prompt whenever relevant state changes
  useEffect(() => {
    const generatedText = generatePrompt()
    setGeneratedPromptText(generatedText)
    setShowPromptSection(!!generatedText)
  }, [prompt, negativePrompt, aspectRatio, styleStrength, imageWeight, version, seed, 
      referenceImage, cameraStyle, artStyle, lighting, filter, chaos, repeat, tile, 
      video, weird, quality, stop, dalleStyle, hd])

  const generatePrompt = () => {
    if (!prompt && !referenceImage) {
      return ""
    }

    if (model === "midjourney") {
      // Start with image reference if uploaded
      let basePrompt = `/imagine prompt: `
      
      // Add reference image at the beginning if available
      if (referenceImage) {
        basePrompt += `${referenceImage} `
      }
      
      // Add main prompt
      basePrompt += prompt
      
      // Add styles with commas if selected
      const styles = []
      if (artStyle) styles.push(artStyle)
      if (cameraStyle) styles.push(cameraStyle)
      if (filter) styles.push(filter)
      if (lighting) styles.push(lighting)
      
      // Add styles to prompt with commas
      if (styles.length > 0) {
        basePrompt += `, ${styles.join(', ')}`
      }
      
      // Add parameters in specific order
      let paramsPrompt = ''
      if (aspectRatio) paramsPrompt += ` --aspect ${aspectRatio.replace(":", ":")}`
      if (version) paramsPrompt += ` --version ${version.replace("v", "")}`
      if (quality !== "1") paramsPrompt += ` --quality ${quality}`
      if (styleStrength !== 100) paramsPrompt += ` --stylize ${styleStrength}`
      if (chaos > 0) paramsPrompt += ` --chaos ${chaos}`
      if (stop < 100) paramsPrompt += ` --stop ${stop}`
      if (repeat > 1) paramsPrompt += ` --repeat ${repeat}`
      if (weird > 0) paramsPrompt += ` --weird ${weird}`
      if (tile) paramsPrompt += ` --tile`
      if (seed) paramsPrompt += ` --seed ${seed}`
      
      // Image weight (only if reference image is provided)
      if (referenceImage && imageWeight !== 1) paramsPrompt += ` --iw ${imageWeight}`
      
      // Video
      if (video) paramsPrompt += ` --video`
      
      // Negative prompt must be last
      if (negativePrompt) paramsPrompt += ` --no ${negativePrompt}`
      
      return basePrompt + paramsPrompt
    } else if (model === "dalle") {
      // DALLE prompt logic...
      return prompt ? prompt : ""
    }

    return ""
  }

  const copyToClipboard = () => {
    if (!generatedPromptText) {
      toast.error("Please enter a prompt first")
      return
    }
    
    navigator.clipboard.writeText(generatedPromptText)
      .then(() => {
        toast.success("Prompt copied to clipboard")
      })
      .catch(err => {
        toast.error("Failed to copy: " + err)
      })
  }
  
  const handleSave = () => {
    if (!generatedPromptText) {
      toast.error("Please enter a prompt first")
      return
    }
    
    // Create a blob with the prompt text
    const blob = new Blob([generatedPromptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${model}-prompt.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Prompt saved to file");
  }

  return (
    <Card className="w-full relative pb-16">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <Button variant="ghost" size="icon" onClick={onReset}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl capitalize ml-2 inline-block">{model} Prompt Builder</CardTitle>
        </div>
      </CardHeader>

      {model === "midjourney" ? (
        <Midjourney
          prompt={prompt}
          setPrompt={setPrompt}
          negativePrompt={negativePrompt}
          setNegativePrompt={setNegativePrompt}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          styleStrength={styleStrength}
          setStyleStrength={setStyleStrength}
          imageWeight={imageWeight}
          setImageWeight={setImageWeight}
          version={version}
          setVersion={setVersion}
          seed={seed}
          setSeed={setSeed}
          referenceImage={referenceImage}
          setReferenceImage={setReferenceImage}
          cameraStyle={cameraStyle}
          setCameraStyle={setCameraStyle}
          artStyle={artStyle}
          setArtStyle={setArtStyle}
          lighting={lighting}
          setLighting={setLighting}
          filter={filter}
          setFilter={setFilter}
          chaos={chaos}
          setChaos={setChaos}
          repeat={repeat}
          setRepeat={setRepeat}
          tile={tile}
          setTile={setTile}
          video={video}
          setVideo={setVideo}
          weird={weird}
          setWeird={setWeird}
          quality={quality}
          setQuality={setQuality}
          stop={stop}
          setStop={setStop}
        />
      ) : (
        <DALLE
          prompt={prompt}
          setPrompt={setPrompt}
          negativePrompt={negativePrompt}
          setNegativePrompt={setNegativePrompt}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
        />
      )}
      
      {/* Fixed prompt display at the bottom */}
      <div 
        className={cn(
          "fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10 transition-all duration-300 ease-in-out",
          showPromptSection ? "translate-y-0" : "translate-y-full"
        )}
        style={{ maxWidth: "calc(100% - 2rem)", margin: "0 auto", width: "100%" }}
      >
        <div className="px-6 py-4 max-w-4xl mx-auto">
          <div className="flex flex-row items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Generated Prompt:</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave}>
                <DownloadIcon className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
          <div className="bg-muted p-4 rounded-md w-full overflow-x-auto">
            <pre className="text-sm whitespace-pre-wrap">{generatedPromptText || "Start by entering a prompt above."}</pre>
          </div>
        </div>
      </div>
    </Card>
  )
}