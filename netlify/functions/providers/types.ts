export type VideoProvider =
  | "openai"
  | "veo3"
  | "seedance"
  | "pixverse";

export interface VideoRequest {
  prompt: string;
  duration?: number;
  provider?: VideoProvider;
  aspectRatio?: "9:16" | "16:9" | "1:1";
}

export interface VideoJob {
  id: string;
  provider: VideoProvider;
  status: "queued" | "processing" | "completed" | "failed";
  prompt: string;
  videoUrl?: string;
  error?: string;
  createdAt: string;
}
