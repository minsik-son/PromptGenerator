"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import PromptBuilder from "./prompt-builder"
import { cn } from "@/lib/utils"

type Model = "midjourney" | "dalle" | null

export default function ModelSelection() {
  const [selectedModel, setSelectedModel] = useState<Model>(null)
  const [showPromptBuilder, setShowPromptBuilder] = useState(false)

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model)
    // Delay showing the prompt builder until after the animation
    setTimeout(() => setShowPromptBuilder(true), 1500)
  }

  return (
    <div className="container relative min-h-screen flex items-center justify-center">
      <AnimatePresence>
        {!selectedModel ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex gap-6"
          >
            {["midjourney", "dalle"].map((model) => (
              <Card
                key={model}
                className={cn(
                  "relative overflow-hidden cursor-pointer group",
                  "w-[300px] h-[400px] flex items-center justify-center",
                )}
                onClick={() => handleModelSelect(model as Model)}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-primary-foreground capitalize">{model}</h2>
                  </div>
                </motion.div>
                <div className="relative w-full h-full">
                  <img
                    src={`/placeholder.svg?height=400&width=300`}
                    alt={model}
                    className="object-cover w-full h-full"
                  />
                </div>
              </Card>
            ))}
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: [1, 1.2, 30], opacity: [1, 0.8, 0] }}
              transition={{ duration: 1.5 }}
              className="fixed inset-0 pointer-events-none"
            >
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            </motion.div>
            {showPromptBuilder && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-4xl">
                <PromptBuilder
                  model={selectedModel}
                  onReset={() => {
                    setSelectedModel(null)
                    setShowPromptBuilder(false)
                  }}
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

