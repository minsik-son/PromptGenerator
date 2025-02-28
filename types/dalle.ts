export interface DallePromptRequest {
  prompt: string;
  style?: string;
  aspectRatio?: string;
}

export interface DallePromptResponse {
  generatedPrompt: string;
  originalPrompt: string;
}

export interface DalleErrorResponse {
  error: string;
}

export type DalleApiResponse = DallePromptResponse | DalleErrorResponse; 