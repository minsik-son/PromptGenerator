"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import LlmPrompt from "@/components/llm/LlmPrompt"
import { Navigation } from "@/components/navigation"

export default function LlmPromptPage() {
  const [prompt, setPrompt] = useState("")
  const [selectedModel, setSelectedModel] = useState("chatgpt")
  const [objective, setObjective] = useState("")
  const [context, setContext] = useState("")
  const [audience, setAudience] = useState("")

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation sticky={true} />
      
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">LLM Prompt Generator</CardTitle>
            <CardDescription>
              Create effective prompts for ChatGPT and Claude to get better responses
            </CardDescription>
          </CardHeader>
          
          <LlmPrompt
            prompt={prompt}
            setPrompt={setPrompt}
            selectedModel={selectedModel}
            setSelectedModel={setSelectedModel}
            objective={objective}
            setObjective={setObjective}
            context={context}
            setContext={setContext}
            audience={audience}
            setAudience={setAudience}
          />
        </Card>
      </div>
    </div>
  )
} 