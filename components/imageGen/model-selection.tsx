"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import PromptBuilder from "./prompt-builder"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Footer } from "../footer"

type Model = "midjourney" | "dalle" | null

export default function ModelSelection() {
  const [selectedModel, setSelectedModel] = useState<Model>(null)
  const [showPromptBuilder, setShowPromptBuilder] = useState(false)
  const [resetAnimation, setResetAnimation] = useState(false)

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model)
    // Delay showing the prompt builder until after the animation
    setTimeout(() => setShowPromptBuilder(true), 1500)
  }
  
  const handleReset = () => {
    // Set reset flag to true to trigger proper animation reset
    setResetAnimation(true)
    setSelectedModel(null)
    setShowPromptBuilder(false)
    
    // Reset animation flag after a short delay
    setTimeout(() => {
      setResetAnimation(false)
    }, 100)
  }

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-4rem)]">
      <div className="container flex items-center justify-center flex-1">
        <AnimatePresence mode="wait">
          {!selectedModel ? (
            <motion.div
              key="model-selection"
              initial={resetAnimation ? false : { opacity: 0, y: 20 }}
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
                    className="absolute inset-0 bg-gradient-to-b from-primary/30 to-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h2 className="text-3xl font-bold text-white capitalize drop-shadow-lg">{model}</h2>
                    </div>
                  </motion.div>
                  <div className="relative w-full h-full transition-all duration-500 group-hover:opacity-0">
                    <img
                      src={`/images/${model}.png`}
                      alt={model}
                      className="object-cover w-full h-full transition-all duration-500"
                    />
                  </div>
                </Card>
              ))}
            </motion.div>
          ) : (
            <>
              <motion.div
                key="model-background"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: [1, 1.2, 30], opacity: [1, 0.8, 0] }}
                transition={{ duration: 1.5 }}
                className="fixed inset-0 pointer-events-none"
              >
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
              </motion.div>
              {showPromptBuilder && (
                <motion.div 
                  key="prompt-builder"
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="relative z-10 w-full max-w-4xl"
                >
                  <PromptBuilder
                    model={selectedModel}
                    onReset={handleReset}
                  />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

