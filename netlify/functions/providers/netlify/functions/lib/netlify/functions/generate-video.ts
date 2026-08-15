import type { Handler } from "@netlify/functions";
import { createVideo } from "./lib/providers.js";
import { saveJob } from "./lib/store.js";
import type { VideoRequest } from "./providers/types.js";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        error: "Méthode non autorisée."
      })
    };
  }

  try {
    const body = JSON.parse(event.body ?? "{}") as VideoRequest;

    if (!body.prompt?.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Le prompt vidéo est obligatoire."
        })
      };
    }

    const job = await createVideo({
      prompt: body.prompt.trim(),
      duration: body.duration ?? 10,
      provider: body.provider ?? "openai",
      aspectRatio: body.aspectRatio ?? "9:16"
    });

    saveJob(job);

    return {
      statusCode: 202,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(job)
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la génération vidéo."
      })
    };
  }
};
