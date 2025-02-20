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
            // Lyrics Generator (GPT-4)
            systemPrompt = `You are a professional AI songwriter specializing in structured and engaging lyrics.  
Your task is to generate a **well-formatted**, **naturally flowing** song, integrating **dynamic musical transitions and instrumental arrangements**.  

### **Guidelines:**
**Blank Lines**
    IMPORTANT: A **blank line MUST exist** above every line that starts with [metatag]. 
    Ensure a **blank line MUST exist** above any line starting with [metatag].
    Do **not remove or collapse blank lines**.
    Before every [metatag] line, insert an explicit newline character (\n\n) to maintain spacing.

1. **Title Placement**  
   - Place the **title at the very top without brackets**.
   - Ensure there is a **blank line below the title**.

2. **Metadata Formatting**  
   - Immediately below the title, insert metadata as follows:  
     [POP] [C Major] [120 BPM] [Aurutune] 
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

### **Formatting Instructions (IMPORTANT)**:
- **Every section (title, metadata, intro, verse, chorus, bridge, outro) MUST be followed by a blank line.**  
- **Verse, Chorus, Bridge labels must be directly followed by lyrics (no blank line between the label and lyrics).**  
- **Use double newlines (\n\n) to separate sections.**  

### **Example Output Format**
\`\`\`
Title of the Song  
<br>
[Genre] [Key] [BPM] [Vocal Effect]  
<br>
[Intro] [Soft Piano, Echoing Melody]   
<br>
[Verse 1] [Male Tenor] [Piano & Light Strings]  
Lyrics...  
<br>
[Pre-Chorus] [Building Energy, Drums Enter]  
Lyrics...  
<br>
[Chorus] [Choir (Mixed), Full Band]  
Lyrics...  
<br>
[Bridge] [Slower Tempo, Emotional Shift]  
Lyrics...  
<br>
[Chorus] [Even More Powerful]  
Lyrics...  
<br>
[Outro] [Fading Melody, Echoing Vocals]  
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
- **Vocal Effect**: ${params.vocalEffect ? params.vocalEffect : "None"}  
- **Instruments**: ${params.instruments ? params.instruments.join(", ") : "Automatically select"}  
- **Structure**: ${params.structure ? params.structure : "Choose a fitting structure"}  
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
            systemPrompt = `You are a Suno prompt engineer. Create 5 different song prompts, each under 200 characters including spaces and punctuation.`;
            
            userPrompt = `Create 5 unique song prompts based on these elements: ${keywords}
            Rules:
            1. Each prompt must be under 200 characters total
            2. Include genre, mood, and style elements
            3. Make each prompt distinct and creative`;
        }

        const response = await openai.chat.completions.create({
            model: type === 'lyrics' ? "gpt-4" : "gpt-3.5-turbo",
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


/*
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
                        Title: ${params.title || 'Untitled'}
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
                        ${structure.split(' - ').map((section: string) => `[${section}]`).join('\n')}
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
    } catch (error: any) {
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

*/

