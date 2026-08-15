import type { Handler } from "@netlify/functions";

const balances = new Map<string, number>();

const DEFAULT_CREDITS = 0;
const VIDEO_COST = 100;

export const handler: Handler = async (event) => {
  const userId =
    event.queryStringParameters?.userId;

  if (event.httpMethod === "GET") {
    if (!userId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "userId obligatoire."
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
        credits:
          balances.get(userId) ??
          DEFAULT_CREDITS
      })
    };
  }

  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(
        event.body ?? "{}"
      );

      const {
        userId,
        action,
        amount
      } = body;

      if (!userId || !action) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            error:
              "userId et action sont obligatoires."
          })
        };
      }

      const current =
        balances.get(userId) ??
        DEFAULT_CREDITS;

      if (action === "consume-video") {
        if (current < VIDEO_COST) {
          return {
            statusCode: 402,
            body: JSON.stringify({
              error: "Crédits insuffisants.",
              required: VIDEO_COST,
              available: current
            })
          };
        }

        const remaining =
          current - VIDEO_COST;

        balances.set(userId, remaining);

        return {
          statusCode: 200,
          body: JSON.stringify({
            userId,
            consumed: VIDEO_COST,
            credits: remaining
          })
        };
      }

      if (action === "add") {
        const value =
          Number(amount);

        if (
          !Number.isFinite(value) ||
          value <= 0
        ) {
          return {
            statusCode: 400,
            body: JSON.stringify({
              error:
                "Montant de crédits invalide."
            })
          };
        }

        const updated =
          current + value;

        balances.set(
          userId,
          updated
        );

        return {
          statusCode: 200,
          body: JSON.stringify({
            userId,
            added: value,
            credits: updated
          })
        };
      }

      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Action inconnue."
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
  }

  return {
    statusCode: 405,
    body: JSON.stringify({
      error: "Méthode non autorisée."
    })
  };
};
