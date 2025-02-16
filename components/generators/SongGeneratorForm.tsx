'use client';
import { useState } from 'react';
import type { PromptOptions } from '@/app/utils/types';

const songSelectClass = `mt-1 block rounded-lg border-2 border-gray-200 bg-white shadow-sm 
focus:border-black focus:ring-1 focus:ring-black transition-colors cursor-pointer
[&>*]:py-2 [&>*]:px-4 [&>*]:bg-white hover:[&>*]:bg-gray-50/50 song-select md:w-[250px]`;

export function SongGeneratorForm() {
  const [prompt, setPrompt] = useState<string>('');
  const [promptLength, setPromptLength] = useState<number>(0);
  const [options, setOptions] = useState<PromptOptions>({});
  const [isGenerating, setIsGenerating] = useState(false);



  const handleOptionChange = (key: keyof PromptOptions, value: string | string[]) => {
    setOptions((prev: PromptOptions) => ({
        ...prev,
        [key]: value
    }));
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 200) {
      setPrompt(text);
      setPromptLength(text.length);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="mb-12">
        <textarea
          className="w-full h-32 rounded-xl border-2 border-gray-200 hover:border-gray-300 focus:border-black focus:ring-1 focus:ring-black text-lg p-4 shadow-sm transition-all duration-200 placeholder-gray-400 resize-none"
          placeholder="✨ Describe the song you want to create..."
          value={prompt}
          onChange={handlePromptChange}
          maxLength={200}
        />
        <div className="text-sm text-gray-500 mt-2 text-right">
          {promptLength}/200 characters
        </div>
        <p className="text-sm text-gray-500 mt-4 text-center">
          Please describe your desired song or make a simple selection from the dropdown below.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8">
            <div className="select-container">
              <span className="text-sm font-light text-gray-700">Genre</span>
              <select
                  className={songSelectClass}
                  onChange={(e) => handleOptionChange('genre', e.target.value)}
                  value={options.genre || ''}
              >
                  <option value="">Select Genre</option>
                  {/* Electronic */}
                  <option value="Ambient">Ambient</option>
                  <option value="Dance & Electronic">Dance & Electronic</option>
                  <option value="EDM">EDM</option>
                  <option value="House">House</option>
                  <option value="Techno">Techno</option>
                  <option value="Synth Pop">Synth Pop</option>
                  
                  {/* Pop & Rock */}
                  <option value="Pop">Pop</option>
                  <option value="Alternative Pop">Alternative Pop</option>
                  <option value="K-pop">K-pop</option>
                  <option value="J-pop">J-pop</option>
                  <option value="Rock">Rock</option>
                  <option value="Alternative Rock">Alternative Rock</option>
                  <option value="Indie Rock">Indie Rock</option>
                  <option value="Pop Rock">Pop Rock</option>
                  <option value="Punk Rock">Punk Rock</option>
                  
                  {/* Hip Hop & R&B */}
                  <option value="Hip Hop">Hip Hop</option>
                  <option value="R&B">R&B</option>
                  <option value="R&B & Soul">R&B & Soul</option>
                  <option value="Rap">Rap</option>
                  <option value="Soul">Soul</option>
                  
                  {/* Jazz & Blues */}
                  <option value="Jazz">Jazz</option>
                  <option value="Blues">Blues</option>
                  <option value="Gospel">Gospel</option>
                  
                  {/* Other Genres */}
                  <option value="Country & Americana">Country & Americana</option>
                  <option value="Lo-fi">Lo-fi</option>
                  <option value="Orchestra">Orchestra</option>
                  <option value="Reggae">Reggae</option>
                  <option value="Christmas">Christmas</option>
              </select>
            </div>
            <div className="select-container">
                <span className="text-sm font-light text-gray-700">Instruments</span>
                <select
                    className={songSelectClass}
                    onChange={(e) => handleOptionChange('instruments', e.target.value)}
                    value={options.instruments || ''}
                >
                    <option value="">Select Instrument</option>
                    <option value="Piano">Piano</option>
                    <option value="Guitar">Guitar</option>
                    <option value="Synthesizer">Synthesizer</option>
                    <option value="Orchestra">Orchestra</option>
                    <option value="Drums">Drums</option>
                    <option value="Cello">Cello</option>
                    <option value="Synth">Synth</option>
                    <option value="Bass">Bass</option>
                    <option value="Strings">Strings</option>
                    <option value="Brass">Brass</option>
                    <option value="Woodwinds">Woodwinds</option>
                    <option value="Percussion">Percussion</option>
                </select>
            </div>
            <div className="select-container">
                <span className="text-sm font-light text-gray-700">Mood</span>
                <select
                    className={songSelectClass}
                    onChange={(e) => handleOptionChange('mood', e.target.value)}
                    value={options.mood || ''}
                >
                    <option value="">Select Mood</option>
                    <option value="Upbeat">Upbeat</option>
                    <option value="Melancholic">Melancholic</option>
                    <option value="Energetic">Energetic</option>
                    <option value="Calm">Calm</option>
                    <option value="Dark">Dark</option>
                    <option value="Romantic">Romantic</option>
                    <option value="Ethereal">Ethereal</option>
                    <option value="Emotional">Emotional</option>
                    <option value="Chill">Chill</option>
                    <option value="Party">Party</option>
                    <option value="Vibrant">Vibrant</option>
                </select>
            </div>
            <div className="select-container">
                <span className="text-sm font-light text-gray-700">Tempo</span>
                <select
                    className={songSelectClass}
                    onChange={(e) => handleOptionChange('tempo', e.target.value)}
                    value={options.tempo || ''}
                >
                    <option value="">Select Tempo</option>
                    {/* 느린 템포 */}
                    <option value="Largo (40-60 BPM)">Largo (40-60 BPM)</option>
                    <option value="Adagio (66-76 BPM)">Adagio (66-76 BPM)</option>
                    <option value="Andante (76-108 BPM)">Andante (76-108 BPM)</option>
                    {/* 중간 템포 */}
                    <option value="Moderato (108-120 BPM)">Moderato (108-120 BPM)</option>
                    <option value="Allegretto (112-120 BPM)">Allegretto (112-120 BPM)</option>
                    {/* 빠른 템포 */}
                    <option value="Allegro (120-156 BPM)">Allegro (120-156 BPM)</option>
                    <option value="Vivace (156-176 BPM)">Vivace (156-176 BPM)</option>
                    <option value="Presto (168-200 BPM)">Presto (168-200 BPM)</option>
                </select>
            </div>
            <div className="select-container">
                <span className="text-sm font-light text-gray-700">Vocal Type</span>
                <select
                    className={songSelectClass}
                    onChange={(e) => handleOptionChange('vocalType', e.target.value)}
                    value={options.vocalType || ''}
                >
                    <option value="">Select Vocal Type</option>
                    <option value="Instrumental">Instrumental (No Vocals)</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Boy">Boy</option>
                    <option value="Girl">Girl</option>
                    <option value="Announcer">Announcer</option>
                    <option value="Reporter">Reporter</option>
                    <option value="Female narrator">Female narrator</option>
                    <option value="Whispering">Whispering</option>
                    <option value="Giggling">Giggling</option>
                </select>
            </div>
            <div className="select-container">
                <span className="text-sm font-light text-gray-700">Sound Effects</span>
                <select
                    className={songSelectClass}
                    onChange={(e) => handleOptionChange('soundEffects', e.target.value)}
                    value={options.soundEffects || ''}
                >
                    <option value="">Select Sound Effect</option>
                    <option value="Barking">Barking</option>
                    <option value="Beeping">Beeping</option>
                    <option value="Bell dings">Bell dings</option>
                    <option value="Birds chirping">Birds chirping</option>
                    <option value="Cheering">Cheering</option>
                    <option value="Clapping">Clapping</option>
                    <option value="Whistling">Whistling</option>
                    <option value="Whispers">Whispers</option>
                    <option value="Silence">Silence</option>
                </select>
            </div>
        </div>
      </div>
    </div>
  );
} 