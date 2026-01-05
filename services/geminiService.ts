
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `Eres "Nova IA", el asistente experto de "Nova Systems". 

DATOS OFICIALES:
- Email: sistemsnova@gmail.com
- Ubicación: Córdoba, Argentina.
- Propuesta: COMERCIO UNIFICADO (Stock único para local físico y web).

PLANES (+IVA/mes):
1. BÁSICO ($57.000)
2. INICIAL ($78.000)
3. INTERMEDIO ($107.000 - El más popular)
4. AVANZADO ($140.000)

Tu personalidad es técnica, eficiente y visionaria. Siempre prioriza dar soluciones sobre los módulos de Nova.`;

export const getGeminiResponse = async (history: ChatMessage[], message: string) => {
  try {
    // Inicialización dinámica para capturar la API KEY actualizada del entorno
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_INSTRUCTION }] },
        ...history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ],
    });

    return response.text;
  } catch (error: any) {
    console.error("Nova AI Error:", error);
    
    if (error.message?.includes("Requested entity was not found") || error.message?.includes("API key")) {
      return "AUTH_REQUIRED";
    }
    
    return "Lo sentimos, la red neuronal de Nova en Córdoba está experimentando una alta latencia. Por favor, reintenta en instantes.";
  }
};

export const checkAistudioKey = async (): Promise<boolean> => {
  if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
    return await (window as any).aistudio.hasSelectedApiKey();
  }
  return true;
};

export const openAistudioSelector = async () => {
  if (typeof (window as any).aistudio?.openSelectKey === 'function') {
    await (window as any).aistudio.openSelectKey();
  }
};
