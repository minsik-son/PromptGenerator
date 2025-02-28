import { NextResponse } from "next/server";
import { generateLlmPrompt } from "@/lib/llm/prompt-generator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { promptIdea, model, objective, context, audience } = body;

    if (!promptIdea) {
      return NextResponse.json(
        { error: "Prompt idea is required" },
        { status: 400 }
      );
    }

    const result = await generateLlmPrompt({
      promptIdea,
      model: model || "chatgpt",
      objective,
      context,
      audience,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ generatedPrompt: result.generatedPrompt });
  } catch (error: any) {
    console.error("Error in generate-prompt API:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
} 