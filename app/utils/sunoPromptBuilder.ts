import { PromptOptions, LyricsOptionsAdvanced } from './types';
import axios from 'axios';

export class SunoPromptBuilder {
    static buildStylePrompt(description: string, params: PromptOptions): string {
        const promptParts = [];
        
        // 핵심 요소 먼저 추가
        if (params.genre) promptParts.push(params.genre);
        if (params.mood) promptParts.push(`${params.mood} mood`);
        if (params.instruments) promptParts.push(`featuring ${params.instruments}`);
        
        // 기본 프롬프트 구성
        let basePrompt = `Create ${promptParts.join(', ')}`;
        
        // 남은 공간 계산 (200자 제한)
        const remainingLength = 200 - basePrompt.length;
        
        // 추가 세부사항을 중요도 순으로 추가
        if (remainingLength > 0 && params.tempo) {
            const tempoText = ` at ${params.tempo}`;
            if (basePrompt.length + tempoText.length <= 200) {
                basePrompt += tempoText;
            }
        }
        
        if (remainingLength > 0 && params.vocalType) {
            const vocalText = `. Include ${params.vocalType} vocals`;
            if (basePrompt.length + vocalText.length <= 200) {
                basePrompt += vocalText;
            }
        }
        
        // 사용자 설명을 마지막에 추가
        if (description && basePrompt.length < 190) {
            const maxDescLength = 200 - basePrompt.length - 2;
            if (maxDescLength > 0) {
                basePrompt += `. ${description.slice(0, maxDescLength)}`;
            }
        }
        
        return basePrompt;
    }

    static buildLyricsPrompt(params: LyricsOptionsAdvanced): string {
        const promptTemplate = {
            "language": params.language,
            "structure": params.structure || [],
            "theme": params.theme,
            "title": params.title,
            "vocalType": params.vocalType || "",
            "vocalEffect": params.vocalEffect || "",
            "genres": params.genres || "",
            "keys": params.keys || "",
            "tempos": params.tempos || "",
            "moods": params.moods || "",
            "instruments": params.instruments || [],
            "additionalMeta": params.additionalMeta || ""
        };
        
        return JSON.stringify(promptTemplate);
    }

    static parseDescription(description: string): Partial<PromptOptions> {
        const params: Partial<PromptOptions> = {};
        const keywords = description.toLowerCase();
        
        // 장르 감지
        if (keywords.includes('japanese') || keywords.includes('anime')) {
            params.genre = 'J-pop';
        } else if (keywords.includes('k-pop') || keywords.includes('korean')) {
            params.genre = 'K-pop';
        }
        
        
        // ... 기존 감지 로직 유지 ...

        return params;
    }

    static parseLyricsDescription(description: string): Partial<LyricsOptionsAdvanced> {
        const params: Partial<LyricsOptionsAdvanced> = {
            structure: []
        };
        
        const keywords = description.toLowerCase();
        

        // ... 기존 감지 로직 유지 ...

        return params;
    }
}

 // Start of Selection
export async function generatePromptWithGPT(keywords: string): Promise<string | undefined> {
    const response = await axios.post('/api/openai', { keywords });
    return (response.data as { content?: string }).content;
} 


/** 원래 코드
import { PromptOptions, LyricsOptions } from './types';
import axios from 'axios';

export class SunoPromptBuilder {
    static buildStylePrompt(description: string, params: PromptOptions): string {
        const promptParts = [];
        
        // 핵심 요소 먼저 추가
        if (params.genre) promptParts.push(params.genre);
        if (params.mood) promptParts.push(`${params.mood} mood`);
        if (params.instruments) promptParts.push(`featuring ${params.instruments}`);
        
        // 기본 프롬프트 구성
        let basePrompt = `Create ${promptParts.join(', ')}`;
        
        // 남은 공간 계산 (200자 제한)
        const remainingLength = 200 - basePrompt.length;
        
        // 추가 세부사항을 중요도 순으로 추가
        if (remainingLength > 0 && params.tempo) {
            const tempoText = ` at ${params.tempo}`;
            if (basePrompt.length + tempoText.length <= 200) {
                basePrompt += tempoText;
            }
        }
        
        if (remainingLength > 0 && params.vocalType) {
            const vocalText = `. Include ${params.vocalType} vocals`;
            if (basePrompt.length + vocalText.length <= 200) {
                basePrompt += vocalText;
            }
        }
        
        // 사용자 설명을 마지막에 추가
        if (description && basePrompt.length < 190) {
            const maxDescLength = 200 - basePrompt.length - 2;
            if (maxDescLength > 0) {
                basePrompt += `. ${description.slice(0, maxDescLength)}`;
            }
        }
        
        return basePrompt;
    }

    static buildLyricsPrompt(params: LyricsOptions): string {
        // params를 JSON 문자열로 변환하여 전달
        return JSON.stringify({
            language: params.language,
            structure: params.structure,
            theme: params.theme,
            vocalStyle: params.vocalStyle,
            style: params.style,
            rhymePattern: params.rhymePattern,
            songLength: params.songLength
        });
    }

    static parseDescription(description: string): Partial<PromptOptions> {
        const params: Partial<PromptOptions> = {};
        const keywords = description.toLowerCase();
        
        // 장르 감지
        if (keywords.includes('japanese') || keywords.includes('anime')) {
            params.genre = 'J-pop';
        } else if (keywords.includes('k-pop') || keywords.includes('korean')) {
            params.genre = 'K-pop';
        }
        
        
        // ... 기존 감지 로직 유지 ...

        return params;
    }

    static parseLyricsDescription(description: string): Partial<LyricsOptions> {
        const params: Partial<LyricsOptions> = {
            structure: []
        };
        
        const keywords = description.toLowerCase();
        

        // ... 기존 감지 로직 유지 ...

        return params;
    }
}

 // Start of Selection
export async function generatePromptWithGPT(keywords: string): Promise<string | undefined> {
    const response = await axios.post('/api/openai', { keywords });
    return (response.data as { content?: string }).content;
} 
 */