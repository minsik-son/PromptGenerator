import { NextResponse } from "next/server";
import { generateVideoPrompt } from "@/lib/video/prompt-generator";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { promptIdea, model, resolution, aspectRatio } = body;

    if (!promptIdea) {
      return NextResponse.json(
        { error: "Video description is required" },
        { status: 400 }
      );
    }

    const result = await generateVideoPrompt({
      promptIdea,
      model: model || "sora",
      resolution: resolution || "1920x1080",
      aspectRatio: aspectRatio || "16:9",
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ generatedPrompt: result.generatedPrompt });
  } catch (error: any) {
    console.error("Error in generate-video-prompt API:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  }
} 