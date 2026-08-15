import type { Handler } from "@netlify/functions";

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
      country,
      latitude,
      longitude
    } = body;

    if (!country) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Pays obligatoire."
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        country,
        latitude:
          typeof latitude === "number"
            ? latitude
            : null,
        longitude:
          typeof longitude === "number"
            ? longitude
            : null
      })
    };
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Données de localisation invalides."
      })
    };
  }
};
