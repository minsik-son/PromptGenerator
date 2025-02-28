import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateVideoPromptParams {
  promptIdea: string;
  model: string;
  resolution: string;
  aspectRatio: string;
}

interface GenerateVideoPromptResult {
  generatedPrompt: string;
  error?: string;
}

export async function generateVideoPrompt({
  promptIdea,
  model,
  resolution,
  aspectRatio,
}: GenerateVideoPromptParams): Promise<GenerateVideoPromptResult> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        generatedPrompt: "",
        error: "OpenAI API key is not configured",
      };
    }

    // 시스템 프롬프트 설정
    const systemPrompt = `You are an expert prompt engineer for AI video generation models, specializing in ${
      model === "sora" ? "OpenAI's Sora" : "Runway's Gen-2"
    }. 
    
Your task is to transform basic video descriptions into detailed, effective prompts that will produce high-quality video output from these models.

For ${
      model === "sora" ? "Sora" : "Runway"
    } prompts, consider these important aspects:
1. Visual details (lighting, colors, camera angles, movement)
2. Scene composition and elements
3. Action and motion descriptions
4. Atmosphere and mood
5. Timing and pacing
6. Technical specifications (resolution: ${resolution}, aspect ratio: ${aspectRatio})

Provide a prompt that would generate the most visually impressive and accurate video based on the user's description.`;

    // 사용자 프롬프트 구성
    const userPrompt = `Transform this basic video description into a detailed, effective prompt for ${
      model === "sora" ? "OpenAI's Sora" : "Runway's Gen-2"
    } video generation:

Video description: "${promptIdea}"

Technical requirements:
- Resolution: ${resolution}
- Aspect ratio: ${aspectRatio}

Create a comprehensive video prompt that includes visual details, motion elements, atmosphere, and any other key aspects that would help the AI generate an impressive video. Format it so it's ready to be copied and pasted into the ${
      model === "sora" ? "Sora" : "Runway"
    } interface.`;

    // OpenAI API 호출 (GPT-4 Mini 사용)
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const generatedPrompt = response.choices[0]?.message?.content?.trim() || "";

    if (!generatedPrompt) {
      return {
        generatedPrompt: "",
        error: "Failed to generate video prompt. Please try again.",
      };
    }

    return { generatedPrompt };
  } catch (error: any) {
    console.error("Error generating video prompt:", error);
    return {
      generatedPrompt: "",
      error: error.message || "An unexpected error occurred",
    };
  }
} 