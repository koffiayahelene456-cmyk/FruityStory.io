import type { Handler } from "@netlify/functions";

const countries = [
  { code: "WORLD", name: "🌍 Monde entier" },
  { code: "CI", name: "Côte d’Ivoire" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Allemagne" },
  { code: "GB", name: "Royaume-Uni" },
  { code: "US", name: "États-Unis" },
  { code: "CA", name: "Canada" },
  { code: "BR", name: "Brésil" },
  { code: "JP", name: "Japon" },
  { code: "CN", name: "Chine" },
  { code: "IN", name: "Inde" },
  { code: "NG", name: "Nigeria" },
  { code: "GH", name: "Ghana" },
  { code: "SN", name: "Sénégal" },
  { code: "ZA", name: "Afrique du Sud" },
  { code: "KE", name: "Kenya" },
  { code: "MA", name: "Maroc" },
  { code: "DZ", name: "Algérie" },
  { code: "EG", name: "Égypte" },
  { code: "IT", name: "Italie" },
  { code: "ES", name: "Espagne" },
  { code: "PT", name: "Portugal" },
  { code: "BE", name: "Belgique" },
  { code: "CH", name: "Suisse" },
  { code: "NL", name: "Pays-Bas" },
  { code: "AU", name: "Australie" },
  { code: "KR", name: "Corée du Sud" }
];

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      countries
    })
  };
};
