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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
        await navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        
        // 1초 후에 복사 상태 초기화
        setTimeout(() => {
            setCopiedIndex(null);
        }, 1000);
    } catch (err) {
        console.error('Failed to copy:', err);
    }
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




