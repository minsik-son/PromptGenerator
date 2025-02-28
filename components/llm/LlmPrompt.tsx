"use client"

import { useState } from "react"
import { CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, X } from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

interface LlmPromptProps {
  prompt: string
  setPrompt: (value: string) => void
  selectedModel: string
  setSelectedModel: (value: string) => void
  objective: string
  setObjective: (value: string) => void
  context: string
  setContext: (value: string) => void
  audience: string
  setAudience: (value: string) => void
}

export default function LlmPrompt({ 
  prompt, 
  setPrompt, 
  selectedModel,
  setSelectedModel,
  objective,
  setObjective,
  context,
  setContext,
  audience,
  setAudience
}: LlmPromptProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showGeneratedPrompt, setShowGeneratedPrompt] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [originalPrompt, setOriginalPrompt] = useState("");

  const handleGeneratePrompt = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt idea first");
      return;
    }

    setIsGenerating(true);
    setShowGeneratedPrompt(false);
    setOriginalPrompt(prompt);

    try {
      const response = await fetch('/api/llm/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          promptIdea: prompt,
          model: selectedModel,
          objective: objective,
          context: context,
          audience: audience
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate prompt');
      }

      if (data.error) {
        toast.error(data.error);
      } else {
        setGeneratedPrompt(data.generatedPrompt);
        setShowGeneratedPrompt(true);
        toast.success("Prompt enhanced successfully!");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyGeneratedPrompt = () => {
    setPrompt(generatedPrompt);
    setShowGeneratedPrompt(false);
    setGeneratedPrompt("");
  };

  const cancelGeneratedPrompt = () => {
    setShowGeneratedPrompt(false);
    setGeneratedPrompt("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Copied to clipboard!");
  };

  return (
    <CardContent className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="model">LLM Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger id="model">
              <SelectValue placeholder="Select LLM model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="chatgpt">ChatGPT (GPT-4)</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="prompt-idea">What do you want to ask?</Label>
          <div className="relative">
            <Textarea
              id="prompt-idea"
              placeholder="Enter your basic prompt idea here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-48 resize-none pr-8"
            />
            {prompt && (
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPrompt("");
                }}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 transition-colors bg-white/80 rounded-full p-1"
                title="Clear prompt"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="objective">Objective (Optional)</Label>
            <Input 
              id="objective" 
              placeholder="What's your goal? (e.g., Explain, Summarize)" 
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience (Optional)</Label>
            <Input 
              id="audience" 
              placeholder="Who is this for? (e.g., Beginners, Experts)" 
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="context">Additional Context (Optional)</Label>
          <Textarea 
            id="context" 
            placeholder="Any additional information to include..."
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="h-20 resize-none"
          />
        </div>

        <Button 
          onClick={handleGeneratePrompt} 
          disabled={isGenerating || !prompt.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enhancing prompt...
            </>
          ) : (
            "Generate Enhanced Prompt"
          )}
        </Button>
      </div>
      
      {showGeneratedPrompt && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-medium">Enhanced LLM Prompt</h3>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopy}>
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={cancelGeneratedPrompt}>
                Close
              </Button>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded border border-gray-200 whitespace-pre-wrap">
            <p className="text-sm">{generatedPrompt}</p>
          </div>
          
          <div className="text-xs text-gray-500">
            <p>Original idea: "{originalPrompt}"</p>
          </div>
        </div>
      )}
    </CardContent>
  )
} 