import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // baseURL은 기본값으로 'https://api.openai.com/v1'을 사용합니다
});

export async function POST(req: Request) {
    try {
        const { keywords } = await req.json();
        
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: keywords }],
        });

        return NextResponse.json({ content: response.choices[0].message.content });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate response' },
            { status: 500 }
        );
    }
} 