'use client';

import { useState, useEffect } from 'react';
import type { LyricsOptionsAdvanced } from '@/app/utils/types';
import { LYRICS_STRUCTURES, THEMES, INSTRUMENTS, Vocal_Types, Vocal_Effects, Genres, Keys, Tempos, Mood } from '@/app/utils/promptUtils';

const lyricsSelectClass = `appearance-none mt-1 block rounded-lg border-2 border-gray-200 bg-white shadow-sm 
  focus:border-black focus:ring-1 focus:ring-black transition-colors cursor-pointer
  [&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50/50 lyrics-select w-[350px] h-[40px] md:w-[250px] md:h-[34px] pl-3`;


const checkBoxClass = `appearance-none mt-1 block rounded-lg border-2 border-gray-200 bg-white shadow-sm 
  focus:border-black focus:ring-1 focus:ring-black transition-colors cursor-pointer
  [&>*]:bg-white hover:[&>*]:bg-gray-50/50 lyrics-select w-[350px] h-[40px] md:w-[250px] md:h-[34px] pl-3`;

interface LyricsGeneratorFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  lyricsOptions: LyricsOptionsAdvanced;
  setLyricsOptions: (options: LyricsOptionsAdvanced) => void;
  customThemePrompt: string;
  setCustomThemePrompt: (prompt: string) => void;
  customTitle: string;
  setCustomTitlePrompt: (title: string) => void;
  isGenerating: boolean; // 추가: 생성 중인지 상태 추가
}

// 초기 상태 정의
const initialLyricsOptions: LyricsOptionsAdvanced = {
  title: '',
  theme: '',
  language: 'English',  // 기본값 설정
  genres: '',
  keys: '',
  tempos: '',
  moods: '',
  vocalType: '',
  vocalEffect: '',
  instruments: [],
  structure: '',
  additionalMeta: '',
  hasTitle: 'No'
};

export function LyricsGeneratorFormAdvanced({ 
  prompt, 
  setPrompt, 
  lyricsOptions,
  setLyricsOptions,
  customThemePrompt,
  setCustomThemePrompt,
  customTitle,
  setCustomTitlePrompt,
  isGenerating
}: LyricsGeneratorFormProps) {
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  const [showInstruments, setShowInstruments] = useState(false);
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [titleText, setTitleText] = useState('');
  const [displayOptions, setDisplayOptions] = useState<Partial<LyricsOptionsAdvanced>>({});
  
  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    setLyricsOptions(initialLyricsOptions);
  }, []);

  const getRandomOption = (options: string[]) => {
    return options[Math.floor(Math.random() * options.length)];
  };

  const handleLyricsOptionChange = (key: keyof LyricsOptionsAdvanced, value: string | string[]) => {
    if (key === 'hasTitle' && value === 'No') {
      setCustomTitlePrompt('');
    }

    setLyricsOptions((prev: LyricsOptionsAdvanced) => ({
      ...prev,
      [key]: value
    }));

    setDisplayOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  useEffect(() => {
    if (isGenerating) {
      const newRandomOptions: Partial<LyricsOptionsAdvanced> = {};
      
      Object.entries(displayOptions).forEach(([key, value]) => {
        if (value === 'Random') {
          switch(key) {
            case 'theme':
              newRandomOptions.theme = getRandomOption(THEMES.filter(t => t !== 'Custom'));
              break;
            case 'structure':
              newRandomOptions.structure = getRandomOption(Array.from(LYRICS_STRUCTURES));
              break;
            case 'vocalType':
              newRandomOptions.vocalType = getRandomOption(Object.values(Vocal_Types).flat());
              break;
            case 'vocalEffect':
              newRandomOptions.vocalEffect = getRandomOption(Vocal_Effects);
              break;
            case 'genres':
              newRandomOptions.genres = getRandomOption(Genres);
              break;
            case 'keys':
              newRandomOptions.keys = getRandomOption(Object.values(Keys).flat());
              break;
            case 'tempos':
              newRandomOptions.tempos = getRandomOption(Tempos);
              break;
            case 'moods':
              newRandomOptions.moods = getRandomOption(Mood);
              break;
          }
        }
      });

      if (Object.keys(newRandomOptions).length > 0) {
        setLyricsOptions((prev: LyricsOptionsAdvanced) => ({
          ...prev,
          ...newRandomOptions
        }));
      }
    }
  }, [isGenerating, displayOptions]);

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
      <div className="grid grid-cols-1 place-items-center md:grid-cols-2 gap-4 md:gap-x-8">

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
                value={displayOptions.theme || 'Random'}
            >
                <option value="Random">Random</option>
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
                value={lyricsOptions.language || 'English'}
            >
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

        <div className="select-container">
            <span className="text-sm font-light text-gray-700 mb-2 block">Vocal Type</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('vocalType', e.target.value)}
                value={displayOptions.vocalType || 'Random'}
            >
                <option value="Random">Random</option>
                {Object.entries(Vocal_Types).map(([type, styles]) => (
                    <optgroup key={type} label={type}>
                        {styles.map(style => (
                            <option key={style} value={style}>{style}</option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>

        <div className="select-container">
            <span className="text-sm font-light text-gray-700 mb-2 block">Vocal Effect</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('vocalEffect', e.target.value)}
                value={displayOptions.vocalEffect || 'Random'}
            >
                <option value="Random">Random</option>
                {Vocal_Effects.map(style => (
                    <option key={style} value={style}>{style}</option>
                ))}
            </select>
        </div>

        <div className="select-container">
            <span className="text-sm font-light text-gray-700 mb-2 block">Song Structure</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('structure', e.target.value)}
                value={displayOptions.structure || 'Random'}
            >
                <option value="Random">Random</option>
                {LYRICS_STRUCTURES.map(structure => (
                    <option key={structure} value={structure}>{structure}</option>
                ))}
            </select>
        </div>

        <div className="select-container">
            <span className="text-sm font-light text-gray-700 mb-2 block">Genre</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('genres', e.target.value)}
                value={displayOptions.genres || 'Random'}
            >
                <option value="Random">Random</option>
                {Genres.map(style => (
                    <option key={style} value={style}>{style}</option>
                ))}
            </select>
        </div>
        
        <div className="select-container">
            <span className="text-sm font-light text-gray-700 mb-2 block">Keys</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('keys', e.target.value)}
                value={displayOptions.keys || 'Random'}
            >
                <option value="Random">Random</option>
                {Object.entries(Keys).map(([type, styles]) => (
                    <optgroup key={type} label={type}>
                        {styles.map(style => (
                            <option key={style} value={style}>{style}</option>
                        ))}
                    </optgroup>
                ))}
            </select>
        </div>

        <div className="select-container">
            <span className="text-sm font-light text-gray-700 mb-2 block">Tempos</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('tempos', e.target.value)}
                value={displayOptions.tempos || 'Random'}
            >
                <option value="Random">Random</option>
                {Tempos.map(level => (
                    <option key={level} value={level}>{level}</option>
                ))}
            </select>
        </div>

        <div className="select-container">
            <span className="text-sm font-light text-gray-700 mb-2 block">Moods</span>
            <select
                className={lyricsSelectClass}
                onChange={(e) => handleLyricsOptionChange('moods', e.target.value)}
                value={displayOptions.moods || 'Random'}
            >
                <option value="Random">Random</option>
                {Mood.map(mood => (
                    <option key={mood} value={mood}>{mood}</option>
                ))}
            </select>
        </div>

        <div className="select-container flex flex-col items-center">
          {/* Instruments 제목 - 왼쪽 정렬 */}
          <span className="text-sm font-light text-gray-700 block w-[350px] md:w-[250px] h-[20px] mb-2 text-left">
            Instruments
          </span>

          {/* Instruments 선택 버튼 - 중앙 정렬 유지 */}
          <div 
            className={checkBoxClass + " cursor-pointer"}
            onClick={() => setShowInstruments(!showInstruments)}
          >
            <div className="flex justify-between items-center w-full">
              <span className="truncate">{getSelectedInstrumentsText(selectedInstruments)}</span>
              <span className="mr-2 my-auto">{showInstruments ? '▲' : '▼'}</span>
            </div>
          </div>

          {/* 악기 체크박스 목록 (부모를 기준으로 정렬 유지) */}
          {showInstruments && (            
            <div className="relative flex flex-col items-center w-full min-w-[200px] md:w-[350px] mt-2 p-4 border-2 border-gray-200 rounded-lg bg-white shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
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
        {/* 부모 컨테이너: 중앙 정렬을 위해 mx-auto 추가 */}
        <div className="w-full md:w-[825px] mx-auto flex flex-col items-center">
          <span className="text-sm font-light text-gray-700 mt-10 mb-2 block">
            Additional Details
          </span>
          
          {/* textarea: block과 mx-auto 추가하여 완전 중앙 정렬 */}
          <textarea
            className="block mx-auto w-[300px] md:w-full h-32 rounded-lg border-2 border-gray-200 hover:border-gray-300 
            focus:border-black focus:ring-1 focus:ring-black p-4 shadow-sm transition-colors placeholder-gray-400 resize-none"
            placeholder="Please describe any additional details you'd like to include..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div>

    </div>
  );
}
