import axios from 'axios';

export class SunoAPI {
    static async generatePromptWithGPT(prompt: string, type: 'lyrics' | 'song') {
        try {
            console.log('Sending request with:', { keywords: prompt, type });
            
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ keywords: prompt, type }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate prompt');
            }

            const data = await response.json();
            console.log('API Response Data:', data);
            
            // 응답 데이터 유효성 검사
            if (!data.variations || !Array.isArray(data.variations) || data.variations.length === 0) {
                throw new Error('Invalid response format: missing variations');
            }

            return data;
        } catch (error) {
            console.error('API call failed:', error);
            throw error;
        }
    }
} 