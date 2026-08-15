import type { Handler } from "@netlify/functions";
import OpenAI from "openai";
import { updateJob } from "./lib/store.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const handler: Handler = async (event) => {
  const id = event.queryStringParameters?.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "ID vidéo manquant."
      })
    };
  }

  try {
    const video = await client.videos.retrieve(id);

    const status =
      video.status === "completed"
        ? "completed"
        : video.status === "failed"
          ? "failed"
          : "processing";

    const job = updateJob(id, {
      status,
      error: video.error?.message
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(job ?? {
        id,
        status
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Impossible de vérifier la vidéo."
      })
    };
  }
};
