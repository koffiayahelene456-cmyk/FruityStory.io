import type { Handler } from "@netlify/functions";

type Visibility =
  | "public"
  | "friends"
  | "private";

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
      visibility
    } = body;

    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "userId obligatoire."
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
          error: "Option de confidentialité invalide."
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId,
        visibility,
        updatedAt:
          new Date().toISOString()
      })
    };
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Requête invalide."
      })
    };
  }
};
