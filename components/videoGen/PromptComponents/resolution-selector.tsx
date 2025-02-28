"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ResolutionSelectorProps {
  value: string
  onChange: (value: string) => void
}

const resolutionOptions = [
  { value: "1920x1080", label: "1080p - Full HD (1920×1080)" },
  { value: "2560x1440", label: "1440p - QHD (2560×1440)" },
  { value: "3840x2160", label: "2160p - 4K UHD (3840×2160)" },
  { value: "7680x4320", label: "4320p - 8K UHD (7680×4320)" },
  { value: "720x480", label: "SD (720×480) - Standard" },
  { value: "1280x720", label: "720p - HD (1280×720)" },
]

export default function ResolutionSelector({ value, onChange }: ResolutionSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select resolution" />
      </SelectTrigger>
      <SelectContent>
        {resolutionOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
} 