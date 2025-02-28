import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GenerateLlmPromptParams {
  promptIdea: string;
  model: string;
  objective?: string;
  context?: string;
  audience?: string;
}

interface GenerateLlmPromptResult {
  generatedPrompt: string;
  error?: string;
}

export async function generateLlmPrompt({
  promptIdea,
  model,
  objective,
  context,
  audience,
}: GenerateLlmPromptParams): Promise<GenerateLlmPromptResult> {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return {
        generatedPrompt: "",
        error: "OpenAI API key is not configured",
      };
    }

    // 시스템 프롬프트 수정 - 명확한 형식 지정
    const systemPrompt = `You are an expert prompt engineer who specializes in creating effective prompts for ${
      model === "chatgpt" ? "ChatGPT" : "Claude"
    }.

Your task is to transform basic prompt ideas into well-structured, comprehensive prompts that follow this EXACT format:

Role: [Assign a specific role to the AI]
Objective: [Clear statement of what the user wants the AI to do]
Context: [Relevant background information]
Tone: [Desired tone of the response - formal, friendly, technical, etc.]
Target Audience: [Who the content is for]

Do not deviate from this format. Do not add explanations or notes outside this format. The prompt you create should be ready to copy and paste directly into ${
      model === "chatgpt" ? "ChatGPT" : "Claude"
    }.

Example of a good prompt:
Role: You are a professional business email writer.
Objective: Write an apology email to customers regarding a delayed product launch.
Context: The product release is delayed by one week due to quality testing, and customers need to be informed of the new release date (March 15).
Tone: Professional and reassuring.
Target Audience: Customers who pre-ordered the product.`;

    // 사용자 프롬프트 수정
    const userPrompt = `Transform this basic prompt idea into a comprehensive prompt for ${
      model === "chatgpt" ? "ChatGPT" : "Claude"
    } using EXACTLY the format shown in my instructions (Role, Objective, Context, Tone, Target Audience):

Basic prompt idea: "${promptIdea}"
${objective ? `Objective hint: ${objective}` : ""}
${context ? `Context hint: ${context}` : ""}
${audience ? `Target audience hint: ${audience}` : ""}

Remember to follow the exact format I specified, with no additional text or explanations.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const generatedPrompt = response.choices[0]?.message?.content?.trim() || "";

    if (!generatedPrompt) {
      return {
        generatedPrompt: "",
        error: "Failed to generate prompt. Please try again.",
      };
    }

    return { generatedPrompt };
  } catch (error: any) {
    console.error("Error generating LLM prompt:", error);
    return {
      generatedPrompt: "",
      error: error.message || "An unexpected error occurred",
    };
  }
} 