import type { Handler } from "@netlify/functions";

type Visibility =
  | "public"
  | "friends"
  | "private";

interface Publication {
  id: string;
  userId: string;
  videoUrl: string;
  caption: string;
  visibility: Visibility;
  country: string;
  createdAt: string;
}

const publications =
  new Map<string, Publication>();

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
    const body = JSON.parse(
      event.body ?? "{}"
    );

    const {
      userId,
      videoUrl,
      caption = "",
      visibility = "public",
      country = "WORLD"
    } = body;

    if (!userId || !videoUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error:
            "userId et videoUrl sont obligatoires."
        })
      };
    }

    if (
      !["public", "friends", "private"]
        .includes(visibility)
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Confidentialité invalide."
        })
      };
    }

    const publication: Publication = {
      id: crypto.randomUUID(),
      userId,
      videoUrl,
      caption: String(caption).slice(0, 2200),
      visibility,
      country,
      createdAt:
        new Date().toISOString()
    };

    publications.set(
      publication.id,
      publication
    );

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(publication)
    };
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error:
          "Données de publication invalides."
      })
    };
  }
};
