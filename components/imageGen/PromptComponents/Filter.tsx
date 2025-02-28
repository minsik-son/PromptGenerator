"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FilterProps {
  value: string
  onChange: (value: string) => void
}

// TXT 파일에서 추출한 필터 스타일 목록
const originalFilterStyles = [
  { value: "Vintage film", label: "Vintage Film", img: "/images/Filter/vintage.png" },
  { value: "Kodak Portra 400", label: "Kodak Portra", img: "/images/Filter/kodak.png" },
  { value: "Fuji Velvia 50", label: "Fuji Velvia", img: "/images/Filter/fuji.png" },
  { value: "Sepia tone", label: "Sepia Tone", img: "/images/Filter/sepia.png" },
  { value: "Black and white", label: "Black & White", img: "/images/Filter/bw.png" },
  { value: "Lomo effect", label: "Lomo Effect", img: "/images/Filter/lomo.png" },
  { value: "Neon glow", label: "Neon Glow", img: "/images/Filter/neon.png" },
  { value: "Pastel color palette", label: "Pastel Colors", img: "/images/Filter/pastel.png" },
  { value: "High contrast", label: "High Contrast", img: "/images/Filter/high_contrast.png" },
  { value: "Duotone", label: "Duotone", img: "/images/Filter/duotone.png" },
  { value: "Soft focus", label: "Soft Focus", img: "/images/Filter/soft_focus.png" },
  { value: "Glitch art", label: "Glitch Art", img: "/images/Filter/glitch.png" },
  { value: "Vaporwave aesthetic", label: "Vaporwave", img: "/images/Filter/vaporwave.png" }
];

export default function Filter({ value, onChange }: FilterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterStyles, setFilterStyles] = useState(originalFilterStyles);

  // 선택된 스타일을 최상단으로 이동
  useEffect(() => {
    if (value) {
      const selectedStyle = originalFilterStyles.find(style => style.value === value);
      if (selectedStyle) {
        const remainingStyles = originalFilterStyles.filter(style => style.value !== value);
        setFilterStyles([selectedStyle, ...remainingStyles]);
      }
    } else {
      setFilterStyles(originalFilterStyles);
    }
  }, [value]);

  const handleClearStyle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
    setFilterStyles(originalFilterStyles);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>Filter</Label>
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
            {(isExpanded ? filterStyles : filterStyles.slice(0, 4)).map((style) => (
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
