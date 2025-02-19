'use client';

import { useState } from 'react';
import type { LyricsOptionsAdvanced } from '@/app/utils/types';
import { LYRICS_STRUCTURES, THEMES, INSTRUMENTS, Vocal_Types, Vocal_Effects, Genres, Keys, Tempos, Mood } from '@/app/utils/promptUtils';

const lyricsSelectClass = `mt-1 block rounded-lg border-2 border-gray-200 bg-white shadow-sm 
  focus:border-black focus:ring-1 focus:ring-black transition-colors cursor-pointer
  [&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50/50 lyrics-select md:w-[250px]`;


interface LyricsGeneratorFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  lyricsOptions: LyricsOptionsAdvanced;
  setLyricsOptions: (options: LyricsOptionsAdvanced) => void;
  customThemePrompt: string;
  setCustomThemePrompt: (prompt: string) => void;
  customTitle: string;
  setCustomTitlePrompt: (title: string) => void;
}

export function LyricsGeneratorFormAdvanced({ 
  prompt, 
  setPrompt, 
  lyricsOptions, 
  setLyricsOptions,
  customThemePrompt,
  setCustomThemePrompt,
  customTitle,
  setCustomTitlePrompt
}: LyricsGeneratorFormProps) {
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [showInstruments, setShowInstruments] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [titleText, setTitleText] = useState('');

  const handleLyricsOptionChange = (key: keyof LyricsOptionsAdvanced, value: string | string[]) => {
    setLyricsOptions((prev: LyricsOptionsAdvanced) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleInstrumentChange = (instrument: string) => {
    setSelectedInstruments(prev => {
      const newInstruments = prev.includes(instrument)
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument];
      
      // 선택된 악기들을 lyricsOptions에 업데이트
      handleLyricsOptionChange('instruments', newInstruments);
      return newInstruments;
    });
  };

  // 선택된 악기들을 표시하는 함수
  const getSelectedInstrumentsText = (instruments: string[]) => {
    if (instruments.length === 0) return 'Select Instruments';
    if (instruments.length <= 2) return instruments.join(', ');
    return `${instruments[0]}, ${instruments[1]} +${instruments.length - 2}`;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8">

        <div className="select-container">
            <span className="text-sm font-light text-gray-700 mb-2 block">
                Do you have a title? 
            </span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('hasTitle', e.target.value)}
                value={lyricsOptions.hasTitle || 'No'}>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
            </select>
            {lyricsOptions.hasTitle === 'Yes' && (
                <div className="mt-2">
                    <input
                        type="text"
                        className="w-full h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 focus:border-black focus:ring-1 focus:ring-black p-4 shadow-sm transition-colors placeholder-gray-400"
                        placeholder="Enter the title of your song"
                        value={customTitle}
                        onChange={(e) => setCustomTitlePrompt(e.target.value)}
                    />
                </div>
            )}
        </div>

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
            <span className="text-sm font-light text-gray-700 mb-2 block">Vocal Type</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('vocalType', e.target.value)}
                value={lyricsOptions.vocalType || ''}
            >
                <option value="">Select Vocal Type</option>
                {Object.entries(Vocal_Types).map(([type, styles]) => (
                    <optgroup key={type} label={type}>
                        {styles.map(style => (
                            <option key={style} value={style}>{style}</option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>

        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Vocal Effect</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('vocalEffect', e.target.value)}
                value={lyricsOptions.vocalEffect || ''}
            >
                <option value="">Select Style</option>
                {Vocal_Effects.map(style => (
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
            <span className="text-sm font-light text-gray-700 mb-2 block">Genre</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('genres', e.target.value)}
                value={lyricsOptions.genres || ''}
            >
                <option value="">Select Repetition Style</option>
                {Genres.map(style => (
                    <option key={style} value={style}>{style}</option>
                ))}
            </select>
        </div>
        
        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Keys</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('keys', e.target.value)}
                value={lyricsOptions.keys || ''}
            >
                <option value="">Select Vocal Type</option>
                {Object.entries(Keys).map(([type, styles]) => (
                    <optgroup key={type} label={type}>
                        {styles.map(style => (
                            <option key={style} value={style}>{style}</option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>

        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Tempos</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('tempos', e.target.value)}
                value={lyricsOptions.tempos || ''}
            >
                <option value="">Select Tempos</option>
                {Tempos.map(level => (
                    <option key={level} value={level}>{level}</option>
                ))}
            </select>
        </div>

        <div className="mb-1">
            <span className="text-sm font-light text-gray-700 mb-2 block">Moods</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('moods', e.target.value)}
                value={lyricsOptions.moods || ''}
            >
                <option value="">Select Length</option>
                {Mood.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                ))}
            </select>
        </div>
        {/**악기 추가 */}
        <div className="mb-1">
          <span className="text-sm font-light text-gray-700 mb-2 block">Instruments</span>
          <div 
            className={lyricsSelectClass + " cursor-pointer"}
            onClick={() => setShowInstruments(!showInstruments)}
          >
            <div className="flex justify-between items-center py-2 px-4">
              <span className="truncate">
                {getSelectedInstrumentsText(selectedInstruments)}
              </span>
              <span>{showInstruments ? '▲' : '▼'}</span>
            </div>
          </div>
          
          {/* 악기 체크박스 목록 */}
          {showInstruments && (
            <div className="mt-2 p-4 border-2 border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INSTRUMENTS.map((instrument) => (
                  <label 
                    key={instrument} 
                    className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded cursor-pointer transition-colors"
                  >
                    <input 
                      type="checkbox" 
                      checked={selectedInstruments.includes(instrument)}
                      onChange={() => handleInstrumentChange(instrument)}
                      className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                    />
                    <span className="text-sm text-gray-800">{instrument}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
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

