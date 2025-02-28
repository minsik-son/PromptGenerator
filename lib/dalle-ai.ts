/**
 * Dalle AI 유틸리티 함수
 * Dalle 프롬프트 생성과 관련된 API 호출 함수들을 정의합니다.
 */

/**
 * Dalle 프롬프트 생성 함수
 * 사용자 입력을 기반으로 최적화된 Dalle 프롬프트를 생성합니다.
 */
export async function generateDallePrompt(promptData: {
  prompt: string;
  style?: string;
  aspectRatio?: string;
}): Promise<{ generatedPrompt: string; originalPrompt: string } | { error: string }> {
  try {
    const response = await fetch('/api/dalle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(promptData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate DALL-E prompt');
    }

    return await response.json();
  } catch (error: any) {
    console.error('Error in DALL-E prompt generation client:', error);
    return { error: error.message || 'An error occurred during prompt generation' };
  }
}

/**
 * Dalle 스타일 가이드라인
 * Dalle 이미지 생성에 유용한 스타일 제안 목록
 */
export const dalleStyleSuggestions = [
  { value: 'photorealistic', label: 'Photorealistic' },
  { value: 'digital-art', label: 'Digital Art' },
  { value: 'oil-painting', label: 'Oil Painting' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: 'pencil-sketch', label: 'Pencil Sketch' },
  { value: 'anime', label: 'Anime Style' },
  { value: 'cartoon', label: 'Cartoon' },
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'isometric', label: 'Isometric' },
  { value: 'vector-art', label: 'Vector Art' },
  { value: '3d-render', label: '3D Render' },
]; 