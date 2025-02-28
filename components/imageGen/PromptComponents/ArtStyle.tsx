"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ArtStyleProps {
  value: string
  onChange: (value: string) => void
}

// TXT 파일에서 추출한 아트 스타일 목록
const originalArtStyles = [
  { value: "Oil painting", label: "Oil Painting", img: "/images/Art/oil_painting.png" },
  { value: "Watercolor painting", label: "Watercolor", img: "/images/Art/watercolor.png" },
  { value: "Ink sketch", label: "Ink Sketch", img: "/images/Art/ink_sketch.png" },
  { value: "Charcoal drawing", label: "Charcoal Drawing", img: "/images/Art/charcoal.png" },
  { value: "Acrylic painting", label: "Acrylic Painting", img: "/images/Art/acrylic.png" },
  { value: "Pastel painting", label: "Pastel Painting", img: "/images/Art/pastel.png" },
  { value: "Impressionist painting", label: "Impressionist", img: "/images/Art/impressionist.png" },
  { value: "Cubism", label: "Cubism", img: "/images/Art/cubism.png" },
  { value: "Surrealism", label: "Surrealism", img: "/images/Art/surrealism.png" },
  { value: "Pixel art", label: "Pixel Art", img: "/images/Art/pixel_art.png" },
  { value: "Vector illustration", label: "Vector Illustration", img: "/images/Art/vector.png" },
  { value: "Cyberpunk", label: "Cyberpunk", img: "/images/Art/cyberpunk.png" },
  { value: "Anime style", label: "Anime Style", img: "/images/Art/anime.png" },
  { value: "3D render", label: "3D Render", img: "/images/Art/3d_render.png" },
  { value: "Studio Ghibli style", label: "Studio Ghibli", img: "/images/Art/ghibli.png" },
  { value: "Disney-style animation", label: "Disney Style", img: "/images/Art/disney.png" }
];

export default function ArtStyle({ value, onChange }: ArtStyleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [artStyles, setArtStyles] = useState(originalArtStyles);

  // 선택된 스타일을 최상단으로 이동
  useEffect(() => {
    if (value) {
      const selectedStyle = originalArtStyles.find(style => style.value === value);
      if (selectedStyle) {
        const remainingStyles = originalArtStyles.filter(style => style.value !== value);
        setArtStyles([selectedStyle, ...remainingStyles]);
      }
    } else {
      setArtStyles(originalArtStyles);
    }
  }, [value]);

  const handleClearStyle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
    setArtStyles(originalArtStyles);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>Art Style</Label>
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
            {(isExpanded ? artStyles : artStyles.slice(0, 4)).map((style) => (
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
