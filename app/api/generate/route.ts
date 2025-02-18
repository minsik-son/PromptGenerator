import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { keywords, type } = await req.json();
        
        let systemPrompt = '';
        let userPrompt = '';

        if (type === 'lyrics') {
            
            systemPrompt = `You are a professional lyrics generator. Generate lyrics in the exact format below:

                            TITLE: [Creative song title]

                            [Required sections based on user input]

                            Important Rules:
                            1. Do NOT include any analysis, process, or explanation
                            2. Start directly with "TITLE:" followed by the song sections
                            3. If user specifies a structure, strictly follow it
                            4. If user specifies a language, write lyrics in that language
                            5. Match the specified vocal style and other parameters exactly
                            6. Use appropriate rhyme patterns if specified
                            7. Adjust length according to user's song length preference`;

            const params = typeof keywords === 'string' ? JSON.parse(keywords) : keywords;
            
            const structure = typeof params.structure === 'string' 
                ? params.structure 
                : Array.isArray(params.structure) 
                    ? params.structure.join(' - ') 
                    : "Intro - Verse - Chorus - Verse - Chorus - Outro";

            userPrompt = `Generate lyrics with these exact parameters:
                        Language: ${params.language || 'English'}
                        Structure: ${structure}
                        Theme: ${params.theme || 'General'}
                        ${params.vocalStyle ? `Vocal Style: ${params.vocalStyle}` : ''}
                        ${params.style ? `Style: ${params.style}` : ''}
                        ${params.rhymePattern ? `Rhyme Pattern: ${params.rhymePattern}` : ''}
                        ${params.songLength ? `Song Length: ${params.songLength}` : ''}

                        Additional Instructions:
                        - Write the lyrics EXACTLY in ${params.language || 'English'}
                        - Follow this EXACT structure:
                        ${structure.split(' - ').map(section => `[${section}]`).join('\n')}
                        - Theme: ${params.theme}
                        - Maintain consistent style and tone throughout`;

        } else {
            systemPrompt = `You are a music prompt generator. Create a detailed music prompt based on the given description.
            Format your response as:
            TITLE: [creative title]
            PROMPT: [detailed music prompt]`;
            
            userPrompt = `Create a music prompt using these elements: ${keywords}`;
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt
                }
            ],
            temperature: 0.8,
            max_tokens: type === 'lyrics' ? 2000 : 1000
        });

        const content = response.choices[0].message.content || '';
        
        if (type === 'lyrics') {
            const lines = content.split('\n');
            let title = '';
            let lyrics = [];
            
            for (let line of lines) {
                if (line.startsWith('TITLE:')) {
                    title = line.replace('TITLE:', '').trim();
                } else if (line.trim() !== '') {
                    lyrics.push(line);
                }
            }
            
            console.log('Generated Content:', {
                title,
                lyrics: lyrics.join('\n')
            });

            // 로그인된 사용자인 경우 가사 저장
            if (session?.user?.id) {
                await prisma.lyric.create({
                    data: {
                        content: lyrics.join('\n'),
                        userId: session.user.id,
                    },
                });
            }

            return NextResponse.json({
                variations: [{
                    title: title || 'Untitled',
                    prompt: lyrics.join('\n')
                }]
            });
        } else {
            const variations = content.split(/\d+\s+/)
                .filter(Boolean)
                .map(variation => {
                    const [title, ...promptParts] = variation.split('\n');
                    return {
                        title: title.replace('TITLE:', '').trim(),
                        prompt: promptParts.join('\n').replace('PROMPT:', '').trim()
                    };
                });

            // 로그인된 사용자인 경우 프롬프트 저장
            if (session?.user?.id) {
                await prisma.prompt.create({
                    data: {
                        content: variations[0].prompt, // 첫 번째 변형만 저장
                        userId: session.user.id,
                    },
                });
            }

            return NextResponse.json({ variations });
        }
    } catch (error) {
        console.error('Error generating content:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack
        });
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        );
    }
} 