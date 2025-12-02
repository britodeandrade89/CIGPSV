import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DestinationSuggestion } from "../types";

export const getDestinationSuggestions = async (
  answers: Record<string, string>
): Promise<DestinationSuggestion[]> => {
  try {
    const apiKey = process.env.API_KEY || 'dummy';
    const ai = new GoogleGenAI({ apiKey });
    
    const schema: Schema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Cidade e País do destino" },
          desc: { type: Type.STRING, description: "Breve descrição do porquê combina com o perfil" },
          match: { type: Type.NUMBER, description: "Porcentagem de compatibilidade de 0 a 100" }
        },
        required: ["name", "desc", "match"]
      }
    };

    const prompt = `Sugira 2 destinos turísticos realistas e compatíveis com o seguinte perfil detalhado:
- Clima: ${answers.clima}
- Vibe: ${answers.vibe}
- Companhia: ${answers.companhia}
- Orçamento (por pessoa, incluindo transporte e estadia): ${answers.orcamento}
- Preferência de Local: ${answers.local}
- Ambiente: ${answers.ambiente}

**Regra Crítica**: O orçamento é o fator mais importante. As sugestões devem ser absolutamente realistas dentro da faixa de gasto informada. Não sugira destinos caros para orçamentos baixos.`;

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
    console.error("Error fetching suggestions or initializing AI:", error);
    // Fallback in case of error
    return [
      { name: 'Ushuaia, Argentina', desc: 'Aventura na Patagônia com bom custo-benefício.', match: 90 },
      { name: 'Chapada Diamantina, Brasil', desc: 'Natureza exuberante e trekking no coração da Bahia.', match: 88 }
    ];
  }
};

export const getTravelTips = async (destination: string): Promise<string[]> => {
  try {
    const apiKey = process.env.API_KEY || 'dummy';
    const ai = new GoogleGenAI({ apiKey });

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
    console.error("Error fetching tips or initializing AI:", error);
    return ['Leve sapatos confortáveis', 'Prove a comida local', 'Chegue cedo aos pontos turísticos'];
  }
};