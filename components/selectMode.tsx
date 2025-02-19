'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SongGeneratorForm } from "./generators/SongGeneratorForm"
import { LyricsGeneratorFormAdvanced } from "./generators/LyricsGeneratorFormAdvanced"
import GeneratedResult from '@/components/GeneratedResult';
import type { PromptOptions, LyricsOptionsAdvanced } from '@/app/utils/types';
import { SunoPromptBuilder } from '@/app/utils/sunoPromptBuilder';
import { SunoAPI } from '@/app/utils/api';
import { FeaturedPrompts } from '@/components/featured-prompts';
import { FeaturedLyrics } from '@/components/featured-lyrics';

interface GeneratedItem {
    title: string;
    prompt: string;
}

export function SelectMode() {
  const [prompt, setPrompt] = useState('');
  const [options, setOptions] = useState<PromptOptions>({});
  const [activeTab, setActiveTab] = useState('song');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedItem[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [customThemePrompt, setCustomThemePrompt] = useState(''); // Custom theme 상태 추가
  const [lyricsOptions, setLyricsOptions] = useState<LyricsOptionsAdvanced>({
    theme: '',         // 필수
    language: '',      // 필수
    title: '',
    vocalType: '',
    vocalEffect: '',
    genres: '',
    keys: '',
    tempos: '',
    moods: '',
    structure: [],
    instruments: [],
    additionalMeta: ''
  });

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

  const generateResponse = async () => {
    setIsGenerating(true);
    
    try {
        if (activeTab === 'lyrics') {
            const finalParams = {
                ...lyricsOptions,
                theme: lyricsOptions.theme === 'Custom' ? customThemePrompt : lyricsOptions.theme || prompt,
                title: lyricsOptions.title
            };
            
            console.log('Lyrics Params:', finalParams);
            const promptTemplate = SunoPromptBuilder.buildLyricsPrompt(finalParams);
            console.log('Generated Prompt Template:', promptTemplate);
            
            const response = await SunoAPI.generatePromptWithGPT(promptTemplate, 'lyrics');
            console.log('Final Response:', response);
            
            if (response.variations && response.variations.length > 0) {
                setGeneratedPrompts(response.variations);
            } else {
                console.error('No variations in response');
                setGeneratedPrompts([]);
            }
        } else {
            const inferredParams = SunoPromptBuilder.parseDescription(prompt);
            console.log('Inferred Params:', inferredParams);
            
            const finalParams = {
                genre: options.genre || inferredParams.genre,
                mood: options.mood || inferredParams.mood,
                instruments: options.instruments || inferredParams.instruments,
                tempo: options.tempo || inferredParams.tempo,
                vocalType: options.vocalType || inferredParams.vocalType,
                songStructure: options.songStructure || [],
                additionalMeta: options.additionalMeta || [],
                soundEffects: options.soundEffects || '',
            };
            
            console.log('Final Params:', finalParams);
            const keywords = SunoPromptBuilder.buildStylePrompt(prompt, finalParams);
            console.log('Generated Keywords:', keywords);
            
            const response = await SunoAPI.generatePromptWithGPT(keywords, 'song');
            console.log('API Response:', response);
            
            if (response && response.variations) {
                setGeneratedPrompts(response.variations);
            } else {
                console.error('Invalid response format:', response);
            }
        }
    } catch (error) {
        console.error('Generation failed:', error);
        setGeneratedPrompts([]);
    } finally {
        setIsGenerating(false);
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
          <SongGeneratorForm 
            prompt={prompt}
            setPrompt={setPrompt}
            options={options}
            setOptions={setOptions}
          />
        ) : (
          <LyricsGeneratorFormAdvanced 
            prompt={prompt}
            setPrompt={setPrompt}
            lyricsOptions={lyricsOptions}
            setLyricsOptions={setLyricsOptions}
            customThemePrompt={customThemePrompt}
            setCustomThemePrompt={setCustomThemePrompt}
            customTitle={lyricsOptions.title || ''}
            setCustomTitlePrompt={(newTitle) => setLyricsOptions(prev => ({ ...prev, title: newTitle }))}
          />
        )}
      </div>

      <div className="mt-10 mb-10 flex items-center justify-center">

        <Button
          size="lg"
          className={`rounded-full mt-4`}
          onClick={generateResponse}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            </div>
          ) : (
            'Generate'
          )}
        </Button>
      </div>
      <GeneratedResult 
        isGenerating={isGenerating} 
        generatedPrompts={generatedPrompts} 
        copyToClipboard={copyToClipboard} 
        copiedIndex={copiedIndex} 
      />
      <div className="mt-10">
        {activeTab === 'song' ? (
          <FeaturedPrompts />
        ) : (
          <FeaturedLyrics />
        )}
      </div>
      

    </div>
  )
}




