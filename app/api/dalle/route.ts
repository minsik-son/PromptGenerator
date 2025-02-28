import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// GPT 프롬프트 시스템 메시지
const systemMessage = `As a DALL-E prompt expert, your task is to enhance and optimize user prompts for DALL-E image generation.
Follow these guidelines:
1. Create detailed, vivid descriptions that DALL-E can interpret effectively
2. Include specific art styles, lighting, perspective, colors, and mood where appropriate
3. Remove any prohibited content or elements that may be rejected
4. Structure prompts clearly with commas separating descriptive elements
5. Keep prompts concise but descriptive, generally under 100 words
6. Incorporate user's specific requirements and preferences`;

export async function POST(request: Request) {
  try {
    const { prompt, style, aspectRatio } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    // GPT에 맞게 사용자 요청 포맷팅
    const userMessage = `Generate an optimized DALL-E prompt based on this idea: "${prompt}"
${style ? `Style preference: ${style}` : ''}
${aspectRatio ? `Aspect ratio: ${aspectRatio}` : ''}`;

    // GPT API 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userMessage }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    // 응답 추출
    const generatedPrompt = completion.choices[0].message.content?.trim();

    // 응답 반환
    return NextResponse.json({
      generatedPrompt,
      originalPrompt: prompt
    });

  } catch (error: any) {
    console.error('Error in DALL-E prompt generation:', error);
    
    return NextResponse.json(
      { error: error.message || 'An error occurred during prompt generation' },
      { status: 500 }
    );
  }
} 