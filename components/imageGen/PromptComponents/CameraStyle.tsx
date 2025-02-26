"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronUp, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CameraStyleProps {
  value: string
  onChange: (value: string) => void
}

const originalCameraStyles = [
  { value: "DSLR", label: "DSLR", img: "/images/Camera/DSLR.jpg" },
  { value: "Panorama", label: "Panorama", img: "/images/Camera/DSLR.jpg" },
  { value: "Macro Lens", label: "Macro Lens", img: "/images/Camera/DSLR.jpg" },
  { value: "Pinhole Lens", label: "Pinhole Lens", img: "/images/Camera/DSLR.jpg" },
  { value: "Telephoto", label: "Telephoto", img: "/images/Camera/DSLR.png" },
  { value: "Ultra Wide", label: "Ultra Wide", img: "/images/Camera/DSLR.png" },
  { value: "Polaroid", label: "Polaroid", img: "/images/Camera/DSLR.png" },
  { value: "Fisheye", label: "Fisheye", img: "/images/Camera/DSLR.png" },
  { value: "Drone", label: "Drone", img: "/images/Camera/DSLR.png" },
  { value: "Satellite", label: "Satellite", img: "/images/Camera/DSLR.png" },
  { value: "GoPro", label: "GoPro", img: "/images/Camera/DSLR.png" }
];

export default function CameraStyle({ value, onChange }: CameraStyleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [cameraStyles, setCameraStyles] = useState(originalCameraStyles);

  // 선택된 스타일을 최상단으로 이동
  useEffect(() => {
    if (value) {
      const selectedStyle = originalCameraStyles.find(style => style.value === value);
      if (selectedStyle) {
        const remainingStyles = originalCameraStyles.filter(style => style.value !== value);
        setCameraStyles([selectedStyle, ...remainingStyles]);
      }
    } else {
      setCameraStyles(originalCameraStyles);
    }
  }, [value]);

  const handleClearStyle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
    setCameraStyles(originalCameraStyles);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Label>Camera Style</Label>
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
            {(isExpanded ? cameraStyles : cameraStyles.slice(0, 4)).map((style) => (
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
                      
                      {/* iOS 스타일 알림 배지 같은 삭제 버튼 */}
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

