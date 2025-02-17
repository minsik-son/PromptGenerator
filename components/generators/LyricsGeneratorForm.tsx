'use client';

import { useState } from 'react';
import type { LyricsOptions } from '@/app/utils/types';
import { LYRICS_SECTIONS, LYRICS_STYLES, VOCAL_ARRANGEMENTS, LYRICS_STRUCTURES, REPETITION_STYLES, RHYME_PATTERNS, METAPHOR_LEVELS, THEMES, SONG_LENGTHS } from '@/app/utils/promptUtils';

const lyricsSelectClass = `mt-1 block rounded-lg border-2 border-gray-200 bg-white shadow-sm 
  focus:border-black focus:ring-1 focus:ring-black transition-colors cursor-pointer
  [&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50/50 lyrics-select md:w-[250px]`;

interface LyricsGeneratorFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  lyricsOptions: LyricsOptions;
  setLyricsOptions: (options: LyricsOptions) => void;
  customThemePrompt: string;
  setCustomThemePrompt: (prompt: string) => void;
}

export function LyricsGeneratorForm({ 
  prompt, 
  setPrompt, 
  lyricsOptions, 
  setLyricsOptions,
  customThemePrompt,
  setCustomThemePrompt 
}: LyricsGeneratorFormProps) {
  const handleLyricsOptionChange = (key: keyof LyricsOptions, value: string | string[]) => {
    setLyricsOptions(prev => ({
        ...prev,
        [key]: value
    }));
  };
  return (
    <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8">
        <div className="select-container">
            <span className="text-sm font-light text-gray-700 mb-2 block">
                Theme <span className="text-red-500">*</span>
            </span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('theme', e.target.value)}
                value={lyricsOptions.theme || ''}
            >
                <option value="">Select Theme</option>
                {THEMES.map(theme => (
                    <option key={theme} value={theme === 'Custom' ? 'Custom' : theme}>
                        {theme}
                    </option>
                ))}
            </select>
            {lyricsOptions.theme === 'Custom' && (
                <div className="mt-2">
                    <textarea
                        className="w-full h-32 rounded-lg border-2 border-gray-200 hover:border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-4 shadow-sm transition-colors placeholder-gray-400 resize-none"
                        placeholder="Describe the theme or story of your lyrics..."
                        value={customThemePrompt}
                        onChange={(e) => setCustomThemePrompt(e.target.value)}
                    />
                </div>
            )}
        </div>
        <div className="select-container">
            <span className="text-sm font-light text-gray-700 mb-2 block">
                Language <span className="text-red-500">*</span>
            </span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('language', e.target.value)}
                value={lyricsOptions.language || ''}
            >
                <option value="">Select Language</option>
                <option value="English">English (English)</option>
                <option value="Korean">Korean (한국어)</option>
                <option value="Japanese">Japanese (日本語)</option>
                <option value="Chinese">Chinese (中文)</option>
                <option value="German">German (Deutsch)</option>
                <option value="Russian">Russian (Русский)</option>
                <option value="French">French (Français)</option>
                <option value="Portuguese">Portuguese (Português)</option>
                <option value="Italian">Italian (Italiano)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="Arabic">Arabic (العربية)</option>
                <option value="Polish">Polish (Polski)</option>
                <option value="Turkish">Turkish (Türkçe)</option>
            </select>
        </div>
        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Vocal Style</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('vocalStyle', e.target.value)}
                value={lyricsOptions.vocalStyle || ''}
            >
                <option value="">Select Vocal Style</option>
                {VOCAL_ARRANGEMENTS.map(style => (
                    <option key={style} value={style}>{style}</option>
                ))}
            </select>
        </div>
        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Lyrics Style</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('style', e.target.value)}
                value={lyricsOptions.style || ''}
            >
                <option value="">Select Style</option>
                {LYRICS_STYLES.map(style => (
                    <option key={style} value={style}>{style}</option>
                ))}
            </select>
        </div>
        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Song Structure</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('structure', e.target.value)}
                value={lyricsOptions.structure || ''}
            >
                <option value="">Select Structure</option>
                {LYRICS_STRUCTURES.map(structure => (
                    <option key={structure} value={structure}>{structure}</option>
                ))}
            </select>
        </div>
        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Repetition Style</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('repetition', e.target.value)}
                value={lyricsOptions.repetition || ''}
            >
                <option value="">Select Repetition Style</option>
                {REPETITION_STYLES.map(style => (
                    <option key={style} value={style}>{style}</option>
                ))}
            </select>
        </div>
        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Rhyme Pattern</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('rhymePattern', e.target.value)}
                value={lyricsOptions.rhymePattern || ''}
            >
                <option value="">Select Rhyme Pattern</option>
                {RHYME_PATTERNS.map(pattern => (
                    <option key={pattern} value={pattern}>{pattern}</option>
                ))}
            </select>
        </div>
        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Metaphor Level</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('metaphorLevel', e.target.value)}
                value={lyricsOptions.metaphorLevel || ''}
            >
                <option value="">Select Metaphor Level</option>
                {METAPHOR_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                ))}
            </select>
        </div>
        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Song Length</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('songLength', e.target.value)}
                value={lyricsOptions.songLength || ''}
            >
                <option value="">Select Length</option>
                {SONG_LENGTHS.map(length => (
                    <option key={length} value={length}>{length}</option>
                ))}
            </select>
        </div>
    </div>

    <div className="flex justify-center mb-1 w-full">
        <div className="w-full md:w-[825px]">
            <span className="text-sm font-light text-gray-700 mt-10 mb-2 block">Additional Details</span>
            <textarea
                className="w-full h-32 rounded-lg border-2 border-gray-200 hover:border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-4 shadow-sm transition-colors placeholder-gray-400 resize-none"
                placeholder="Please describe any additional details you'd like to include..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
        </div>
    </div>
</div>
  );
} 