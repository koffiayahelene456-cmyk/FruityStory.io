import type { VideoRequest, VideoJob } from "../providers/types.js";
import { createOpenAIVideo } from "../providers/openai.js";

export async function createVideo(
  request: VideoRequest
): Promise<VideoJob> {
  switch (request.provider ?? "openai") {
    case "openai":
      return createOpenAIVideo(request);

    case "veo3":
      throw new Error("Le fournisseur Veo 3 n'est pas encore configuré.");

    case "seedance":
      throw new Error("Le fournisseur Seedance n'est pas encore configuré.");

    case "pixverse":
      throw new Error("Le fournisseur PixVerse n'est pas encore configuré.");

    default:
      throw new Error("Fournisseur vidéo inconnu.");
  }
}
