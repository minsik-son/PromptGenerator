"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface GenerateImagePromptProps {
  prompt: string
  onClose: () => void
}

export default function GenerateImagePrompt({ prompt, onClose }: GenerateImagePromptProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 20 }} 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <Card className="w-[500px] p-6 bg-white rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle>Generated Prompt</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{prompt}</p>
          <div className="flex justify-end mt-4">
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
