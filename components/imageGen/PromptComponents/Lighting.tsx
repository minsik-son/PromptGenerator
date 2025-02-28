"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LightingProps {
  value: string
  onChange: (value: string) => void
}

const originalLightingStyles = [
  { value: "Golden hour lighting", label: "Golden Hour", img: "/images/Lighting/golden_hour.png" },
  { value: "Soft morning light", label: "Morning Light", img: "/images/Lighting/morning.png" },
  { value: "Moonlight glow", label: "Moonlight", img: "/images/Lighting/moonlight.png" },
  { value: "Sunset lighting", label: "Sunset", img: "/images/Lighting/sunset.png" },
  { value: "Backlit", label: "Backlit", img: "/images/Lighting/backlit.png" },
  { value: "Cinematic lighting", label: "Cinematic", img: "/images/Lighting/cinematic.png" },
  { value: "Studio lighting", label: "Studio Lighting", img: "/images/Lighting/studio.png" },
  { value: "Noir lighting", label: "Film Noir", img: "/images/Lighting/noir.png" },
  { value: "Chiaroscuro", label: "Chiaroscuro", img: "/images/Lighting/chiaroscuro.png" },
  { value: "God rays", label: "God Rays", img: "/images/Lighting/god_rays.png" },
  { value: "Neon lighting", label: "Neon Lighting", img: "/images/Lighting/neon.png" },
  { value: "Bioluminescent glow", label: "Bioluminescent", img: "/images/Lighting/bioluminescent.png" },
  { value: "LED lighting", label: "LED Lighting", img: "/images/Lighting/led.png" },
  { value: "Soft diffused light", label: "Diffused Light", img: "/images/Lighting/diffused.png" }
];

export default function Lighting({ value, onChange }: LightingProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [lightingStyles, setLightingStyles] = useState(originalLightingStyles);

  // 선택된 스타일을 최상단으로 이동
  useEffect(() => {
    if (value) {
      const selectedStyle = originalLightingStyles.find(style => style.value === value);
      if (selectedStyle) {
        const remainingStyles = originalLightingStyles.filter(style => style.value !== value);
        setLightingStyles([selectedStyle, ...remainingStyles]);
      }
    } else {
      setLightingStyles(originalLightingStyles);
    }
  }, [value]);

  const handleClearStyle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
    setLightingStyles(originalLightingStyles);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>Lighting</Label>
        <button 
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm flex items-center text-gray-500 hover:text-gray-900 transition-colors"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
          ) : (
            <>Show More <ChevronDown className="ml-1 h-4 w-4" /></>
          )}
        </button>
      </div>
      
      <motion.div 
        className="bg-white rounded-lg p-4 border"
        animate={{ height: "auto" }}
      >
        <RadioGroup 
          value={value} 
          onValueChange={(val) => {
            onChange(val);
            setIsExpanded(false);
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <AnimatePresence>
            {(isExpanded ? lightingStyles : lightingStyles.slice(0, 4)).map((style) => (
              <motion.div
                key={style.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <Label className="relative cursor-pointer block">
                  <RadioGroupItem value={style.value} className="sr-only" />
                  <div className="space-y-2 text-center">
                    <div
                      className={cn(
                        "w-30 h-30 mx-auto relative rounded-lg transition-all border-2",
                        value === style.value
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-gray-200 hover:border-gray-400",
                      )}
                    >
                      <img 
                        src={style.img} 
                        alt={style.label} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                      
                      {value === style.value && (
                        <button
                          onClick={handleClearStyle}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full flex items-center justify-center
                            hover:bg-red-600 transition-colors z-50 shadow-md border-2 border-white"
                          style={{ width: '22px', height: '22px', minWidth: '22px' }}
                        >
                          <X className="h-3.5 w-3.5 text-white" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium">{style.label}</p>
                    </div>
                  </div>
                </Label>
              </motion.div>
            ))}
          </AnimatePresence>
        </RadioGroup>
      </motion.div>
    </div>
  )
}