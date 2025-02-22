import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/auth-options";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// result 타입 명시
interface ResultItem {
  title: string;
  prompt: string;
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        const { keywords, type } = await req.json();
        
        let systemPrompt = '';
        let userPrompt = '';

        if (type === 'lyrics') {
            // Lyrics Generator (GPT-4)
            systemPrompt = `You are a professional AI songwriter specializing in structured and engaging lyrics.  
                            Your task is to generate a **well-formatted**, **naturally flowing** song, integrating **dynamic musical transitions and instrumental arrangements**.  

                            ### **Guidelines:**

                            1. **Title Placement**  
                            - Place the **title at the very top without brackets**.
                            - Ensure there is a **blank line below the title**.

                            2. **Metadata Formatting**  
                            - Immediately below the title, insert metadata as follows:  
                                [Genre] [Key] [BPM] [Vocal Effect] 
                            - **Ensure a blank line follows this metadata block**.

                            3. **Language & Theme**  
                            - Ensure the lyrics are in the **specified language** and **aligned with the theme**.

                            4. **Song Structure & Readability**  
                            - Follow the given **song structure** (e.g., Verse - Chorus - Verse - Bridge - Chorus).  
                            - **Each section (Verse, Chorus, Bridge, Outro, etc.) must start with a label like [Verse 1] followed by vocal type and instruments, immediately followed by lyrics.**
                            - **Ensure there is a blank line after the entire section before the next section begins.**

                            5. **Dynamic Instrumental & Mood Integration**  
                            - **Do NOT just list instruments or mood as a tag**—instead, incorporate them dynamically:  
                                - Specify when **instruments enter** or **fade out**.  
                                - Describe how the **mood shifts** within the lyrics (e.g., "soft piano intro," "drums build up intensity").  

                            6. **Vocal & Performance Tags**  
                            - Format vocal type as **[Male Tenor]**, **[Female Soprano]**, **[Choir (Mixed)]**, etc.  
                            - Adjust **vocal styles dynamically** based on the mood.

                            7. **Coherent & Engaging Lyrics**  
                            - Ensure the lyrics flow **naturally and tell a compelling story**.  
                            - Transitions between **verses, chorus, and bridge should feel seamless**.


                            ### **Examples Output Format**
                            - This is an example output format. If structure is provided, ignore [Intro] and [Outro].


                            \`\`\`
                            Title of the Song

                            [Hip Hop] [F Major] [112 BPM] [Powerful Belting]

                            [Verse 1] [Rap / Spoken Word] [Synth Bass & Light Percussion]
                            Lyrics... 

                            [Chorus] [Rap / Spoken Word, Full Band]
                            Lyrics... 

                            [Verse 2] [Rap / Spoken Word] [Driving Bass & Drums]
                            Lyrics... 

                            [Bridge] [Rap / Spoken Word, Slower Tempo] [Acoustic Guitar & Soft Strings]
                            Lyrics... 

                            [Chorus] [Rap / Spoken Word, Full Band]
                            Lyrics... 
                            \`\`\`


                            Ensure **blank lines are maintained between sections** and that **lyrics directly follow their respective section labels without gaps**.
                            `;

            const params = typeof keywords === 'string' ? JSON.parse(keywords) : keywords;
            
            userPrompt = `Generate a structured song based on the following parameters:  

                        - **Title**: ${params.title ? params.title : "Generate based on lyrics"}  
                        - **Theme**: ${params.theme}  
                        - **Language**: ${params.language}  
                        - **Genre**: ${params.genres ? params.genres : "Automatically select"}  
                        - **Key**: ${params.keys ? params.keys : "Automatically select"}  
                        - **Tempo**: ${params.tempos ? params.tempos : "Automatically select"}  
                        - **Mood**: ${params.moods ? params.moods : "Automatically adjust"}  
                        - **Vocal Type**: ${params.vocalType ? params.vocalType : "Automatically select"}  
                        - **Vocal Effect**: ${params.vocalEffect ? params.vocalEffect : "Automatically select"}  
                        - **Instruments**: ${params.instruments ? params.instruments.join(", ") : "None"}  
                        - **Structure**: ${params.structure ? params.structure : "Automatically select"}  
                        - **Additional Meta**: ${params.additionalMeta ? params.additionalMeta : "None"}  

                        ### **Instructions for GPT:**
                        - Ensure the **title appears at the top** (without brackets).  
                        - Format metadata in [Genre] [Key] [BPM] [Vocal Effect] format below the title.  
                        - Follow the **specified song structure**.  
                        - **Dynamically integrate instruments** (e.g., "Drums enter in pre-chorus").  
                        - Instead of listing moods as [Mood - Hopeful], **show how the mood shifts within the lyrics**.  
                        - Use **[Vocal Type]** format instead of "Vocal Type - Tenor" (e.g., [Male Tenor]).  
                        - Add **line breaks** between sections for better readability.  
                        - Ensure the song **feels immersive** with **smooth transitions and natural storytelling**.  

                        **Generate a complete song following these rules.**  
                        `;

        } else {
            // Song Generator (GPT-3.5-turbo)
            systemPrompt = `You are a Suno prompt engineer. Create 5 different song prompts, each between 150 and 200 characters, including spaces and punctuation.
            Return the result in JSON format, mapping 5 titles with 5 prompts.
            Make your own creative titles.
            Do not include any other parameters as result.
            ### **Example Output Format**
            {
                "results": [
                    {
                    "title": "Espresso",
                    "prompt": "Generate an ambient lo-fi track with a relaxing night sky atmosphere."
                    },
                    {
                    "title": "Poker Face",
                    "prompt": "Create an intense orchestral piece suitable for a heroic battle scene."
                    },
                    {
                    "title": "Padam Padam",
                    "prompt": "Produce a smooth jazz track with tropical instruments for a summer evening."
                    },
                    {
                    "title": "Call Me Maybe",
                    "prompt": "Compose an energetic synthwave track inspired by a futuristic cyberpunk city."
                    },
                    {
                    "title": "Wildflower",
                    "prompt": "Create a heartfelt piano composition with a melancholic yet uplifting progression."
                    }
                ]
            }
            Do not include any other text or comments
            `;
            
            userPrompt = `Create 5 unique song prompts based on these elements: ${keywords}
            Rules:
            1. Each prompt must be under 200 characters total
            2. Include genre, mood, and style elements
            3. Make each prompt distinct and creative`;
        }

        const response = await openai.chat.completions.create({
            model: type === 'lyrics' ? "gpt-4o-mini" : "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
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

            // lyrics 배열의 첫 번째 줄을 title로 사용
            if (!title && lyrics.length > 0) {
                title = lyrics[0].trim();
                // 첫 번째 줄(제목)을 lyrics 배열에서 제거
                lyrics = lyrics.slice(1);
            }

            // 메타태그 앞에 개행문자 추가
            const processedLyrics = lyrics.map((line, index) => {
                // 첫 줄이 아니고 메타태그로 시작하는 경우 앞에 개행 추가
                if (index > 0 && line.trim().startsWith('[')) {
                    return `\n${line}`;
                }
                return line;
            });

            if (session?.user?.id) {
                await prisma.lyric.create({
                    data: {
                        content: processedLyrics.join('\n'),
                        userId: session.user.id,
                    },
                });
            }

            return NextResponse.json({
                variations: [{
                    title: title,
                    prompt: processedLyrics.join('\n')
                }]
            });
        } else {
            try {
                const jsonContent = JSON.parse(content);
                
                if (jsonContent.results && Array.isArray(jsonContent.results)) {
                    const variations = jsonContent.results.map((result: ResultItem) => ({
                        title: result.title.trim(),
                        prompt: result.prompt.trim()
                    }));
            
                    if (session?.user?.id) {
                        await prisma.prompt.create({
                            data: {
                                content: variations[0].prompt,
                                userId: session.user.id,
                            },
                        });
                    }
            
                    return NextResponse.json({ variations });
                }
            } catch (error) {
                // GPT가 JSON 형식이 아닌 응답을 반환한 경우를 위한 fallback 처리
                const variations = content.split(/\d+\.\s+/)
                    .filter(Boolean)
                    .map(variation => {
                        const [title, ...promptParts] = variation.split('\n');
                        return {
                            title: title.replace('TITLE:', '').trim(),
                            prompt: promptParts.join('\n').replace('PROMPT:', '').trim()
                        };
                    });
            
                if (session?.user?.id) {
                    await prisma.prompt.create({
                        data: {
                            content: variations[0].prompt,
                            userId: session.user.id,
                        },
                    });
                }
            
                return NextResponse.json({ variations });
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error details:', {
                message: error.message,
                stack: error.stack
            });
        }
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        );
    }
}

