import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DestinationSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDestinationSuggestions = async (
  clima: string,
  vibe: string,
  companhia: string
): Promise<DestinationSuggestion[]> => {
  try {
    const schema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Cidade e País do destino" },
          desc: { type: Type.STRING, description: "Breve descrição do porquê combina" },
          match: { type: Type.NUMBER, description: "Porcentagem de compatibilidade de 0 a 100" }
        },
        required: ["name", "desc", "match"]
      }
    };

    const prompt = `Sugira 2 destinos turísticos compatíveis com o seguinte perfil: Clima ${clima}, Vibe ${vibe}, Companhia ${companhia}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as DestinationSuggestion[];
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    // Fallback in case of error
    return [
      { name: 'Paris, França', desc: 'Clássico e romântico.', match: 95 },
      { name: 'Cancún, México', desc: 'Praias e diversão.', match: 92 }
    ];
  }
};

export const getTravelTips = async (destination: string): Promise<string[]> => {
  try {
    const schema: Schema = {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    };

    const prompt = `Dê 3 dicas curtas, práticas e imperdíveis para uma viagem a ${destination || 'um destino surpresa'}.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) return [];
    return JSON.parse(text) as string[];
  } catch (error) {
    console.error("Error fetching tips:", error);
    return ['Leve sapatos confortáveis', 'Prove a comida local', 'Chegue cedo aos pontos turísticos'];
  }
};