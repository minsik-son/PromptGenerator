"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

interface AspectRatioSelectorProps {
  value: string
  onChange: (value: string) => void
}

const aspectRatios = [
  { value: "1:1", label: "Square", className: "w-16 h-16" },
  { value: "4:3", label: "Standard", className: "w-[85px] h-16" },
  { value: "16:9", label: "Widescreen", className: "w-[113px] h-16" },
  { value: "9:16", label: "Portrait", className: "w-[36px] h-16" },
]

export default function AspectRatioSelector({ value, onChange }: AspectRatioSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Aspect Ratio</Label>
      <RadioGroup value={value} onValueChange={onChange} className="flex gap-6 items-center justify-center py-4">
        {aspectRatios.map((ratio) => (
          <Label key={ratio.value} className="relative cursor-pointer">
            <RadioGroupItem value={ratio.value} className="sr-only" />
            <div className="space-y-2 text-center">
              <div
                className={cn(
                  "border-2 rounded-lg transition-colors mx-auto",
                  ratio.className,
                  value === ratio.value
                    ? "border-primary bg-primary/5"
                    : "border-muted hover:border-muted-foreground/50",
                )}
              />
              <div className="space-y-1">
                <p className="text-xs font-medium">{ratio.label}</p>
                <p className="text-[10px] text-muted-foreground">{ratio.value}</p>
              </div>
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  )
}

