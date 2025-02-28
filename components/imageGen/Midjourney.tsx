"use client"

import { useState, useEffect, useRef } from "react"
import { CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, X, ChevronLeft, ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import FileUpload from "./file-upload"
import AspectRatioSelector from "./PromptComponents/aspect-ratio-selector"
import CameraStyle from "./PromptComponents/CameraStyle"
import ArtStyle from "./PromptComponents/ArtStyle"
import Lighting from "./PromptComponents/Lighting"
import Filter from "./PromptComponents/Filter"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const versionOptions = [
  { value: "v6", label: "Version 6" },
  { value: "v5.2", label: "Version 5.2" },
  { value: "v5.1", label: "Version 5.1" },
  { value: "niji", label: "Niji" },
  { value: "hd", label: "HD" },
]

const qualityOptions = [
  { value: "1", label: "High Quality (1.0)" },
  { value: "0.5", label: "Medium Quality (0.5)" },
  { value: "0.25", label: "Low Quality (0.25)" },
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
  cameraStyle: string
  setCameraStyle: (value: string) => void
  artStyle: string
  setArtStyle: (value: string) => void
  lighting: string
  setLighting: (value: string) => void
  filter: string
  setFilter: (value: string) => void
  chaos: number
  setChaos: (value: number) => void
  repeat: number
  setRepeat: (value: number) => void
  tile: boolean
  setTile: (value: boolean) => void
  video: boolean
  setVideo: (value: boolean) => void
  weird: number
  setWeird: (value: number) => void
  quality: string
  setQuality: (value: string) => void
  stop: number
  setStop: (value: number) => void
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
  cameraStyle,
  setCameraStyle,
  artStyle,
  setArtStyle,
  lighting,
  setLighting,
  filter,
  setFilter,
  chaos = 0,
  setChaos,
  repeat = 1,
  setRepeat,
  tile = false,
  setTile,
  video = false,
  setVideo,
  weird = 0,
  setWeird,
  quality = "1",
  setQuality,
  stop = 100,
  setStop
}: MidjourneyProps) {
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isHeaderVisible && (
        <div className="fixed top-0 left-0 w-full bg-white border-b z-50 shadow-sm">
          <div className="container mx-auto flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" className="p-2 mr-2" onClick={() => window.history.back()}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-medium">Midjourney Prompt Builder</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <div className="relative h-16 flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Prompt Generator
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem asChild>
                      <Link href="/music-prompt" className="w-full">
                        Music Prompt
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/image-prompt" className="w-full">
                        Image Prompt
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Link href="/pages/howToUse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                How to Use
              </Link>
              <Link href="/pages/aboutUs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
            </nav>
          </div>
        </div>
      )}

      <CardContent className={`space-y-6 ${isHeaderVisible ? 'pt-20' : ''}`}>
        {/* Primary Settings Section */}
        <div className="space-y-6">        
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
            <div className="space-y-2">
              <Label htmlFor="seed">Seed</Label>
              <Input
                className="mt-0"
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
            <div className="relative">
              <Textarea
                id="prompt"
                placeholder="Enter your prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-32 resize-none pr-8"
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
                placeholder="Enter what you want to avoid..."
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="min-h-32 resize-none pr-8"
              />
              {negativePrompt && (
                <button 
                  onClick={() => setNegativePrompt("")}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-colors bg-white/80 rounded-full p-1"
                  title="Clear negative prompt"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
        </div>
        
        <Separator />
        
        {/* Reference Image & Style Settings */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Reference & Style</h3>
          
          <div className="space-y-2">
            <Label>Reference Image</Label>
            <FileUpload onFileSelect={setReferenceImage} />
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <Label>Image Weight ({imageWeight.toFixed(1)})</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px]">Controls how much influence the reference image has on the result</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider 
              value={[imageWeight]} 
              onValueChange={([value]) => setImageWeight(value)} 
              min={0} 
              max={2} 
              step={0.1}
              className="my-2" 
            />
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <Label>Style Strength ({styleStrength})</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px]">Controls how strongly the selected style is applied</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Slider 
              value={[styleStrength]} 
              onValueChange={([value]) => setStyleStrength(value)} 
              max={1000} 
              step={10}
              className="my-2" 
            />
          </div>
        </div>
        
        <Separator />
        
        {/* Advanced Settings */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Advanced Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="chaos" className="flex items-center">
                  Chaos ({chaos})
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">Higher values lead to more unpredictable results (0-100)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <Slider 
                id="chaos"
                value={[chaos]} 
                onValueChange={([value]) => setChaos(value)} 
                min={0} 
                max={100} 
                step={1}
                className="my-2" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="weird" className="flex items-center">
                  Weird ({weird})
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">Creates more experimental and unusual images (0-3000)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <Slider 
                id="weird"
                value={[weird]} 
                onValueChange={([value]) => setWeird(value)} 
                min={0} 
                max={3000} 
                step={100}
                className="my-2" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="stop" className="flex items-center">
                  Stop ({stop})
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">Lower values reduce details or create hazier images (10-100)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <Slider 
                id="stop"
                value={[stop]} 
                onValueChange={([value]) => setStop(value)} 
                min={10} 
                max={100} 
                step={1}
                className="my-2" 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="quality" className="flex items-center">
                  Quality
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">Controls rendering quality. Higher values use more GPU minutes</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <Select value={quality} onValueChange={setQuality}>
                <SelectTrigger>
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  {qualityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="repeat" className="flex items-center">
                  Repeat
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">Number of images to generate (1-40, subscription limits apply)</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              <Input
                id="repeat"
                type="number"
                min="1"
                max="40"
                placeholder="Repeat count"
                value={repeat}
                onChange={(e) => setRepeat(Number(e.target.value))}
              />
            </div>
            
            <div className="flex flex-col space-y-4 justify-center">
              <div className="flex items-center space-x-2">
                <Switch
                  id="tile"
                  checked={tile}
                  onCheckedChange={setTile}
                />
                <Label htmlFor="tile" className="flex items-center cursor-pointer">
                  Tile
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">Creates seamless repeating patterns</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="video"
                  checked={video}
                  onCheckedChange={setVideo}
                />
                <Label htmlFor="video" className="flex items-center cursor-pointer">
                  Video
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="w-[200px]">On Discord, react with an envelope emoji to receive a video DM</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Style Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Visual Style</h3>
          <CameraStyle value={cameraStyle} onChange={setCameraStyle} />
          <ArtStyle value={artStyle} onChange={setArtStyle} />
          <Lighting value={lighting} onChange={setLighting} />
          <Filter value={filter} onChange={setFilter} />
        </div>
      </CardContent>
    </>
  )
}