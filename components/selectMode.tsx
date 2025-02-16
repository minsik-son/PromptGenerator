'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SongGeneratorForm } from "./generators/SongGeneratorForm"
import { LyricsGeneratorForm } from "./generators/LyricsGeneratorForm"
import GeneratedResult from '@/components/GeneratedResult';

interface GeneratedItem {
    title: string;
    prompt: string;
}

export function SelectMode() {
  const [activeTab, setActiveTab] = useState('song');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedItem[]>([]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button 
          size="lg" 
          className={`rounded-full transition-all ${
            activeTab === 'song' ? 'text-white' : 'bg-white text-black hover:bg-gray-100'
          }`}
          onClick={() => handleTabChange('song')}
        >
          Song Generator
        </Button>
            
        <Button 
          size="lg" 
          className={`rounded-full transition-all ${
            activeTab === 'lyrics' ? 'text-white' : 'bg-white text-black hover:bg-gray-100'
          }`}
          onClick={() => handleTabChange('lyrics')}
        >
          Lyrics Generator
        </Button>
      </div>

      <div className="mt-10">
        {activeTab === 'song' ? (
          <SongGeneratorForm />
        ) : (
          <LyricsGeneratorForm />
        )}
      </div>

      <div className="mt-10 flex items-center justify-center">
        <Link href={activeTab === 'song' ? "/browse" : "/sell"}>
          <Button size="lg" className={`rounded-full mt-4`}>
            Get Started with {activeTab === 'song' ? 'Song' : 'Lyrics'} Generator
          </Button>
        </Link>
      </div>
      <GeneratedResult 
        isGenerating={isGenerating} 
        generatedPrompts={generatedPrompts} 
        copyToClipboard={copyToClipboard} 
        copiedIndex={copiedIndex} 
    />
    </div>
  )
}




