import { GoogleGenAI, Type } from "@google/genai";
import { EraContext } from "../types";

// Initialize Gemini
// Note: In a production app, handle the missing key gracefully.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getEraContext = async (year: number, age: number): Promise<EraContext | null> => {
  if (!apiKey) {
    console.warn("No API Key provided for Gemini.");
    return {
      summary: "API Key missing. Cannot fetch history.",
      highlight: "Please configure process.env.API_KEY"
    };
  }

  try {
    const prompt = `
      Describe the general atmosphere and major historical context of the year ${year}.
      The subject was ${age} years old at this time.
      Provide a nostalgic, short summary suitable for a photo album caption.
      Also provide one specific "Did you know?" style fun fact or highlight from that year.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A poetic, nostalgic summary of the year and age." },
            highlight: { type: Type.STRING, description: "A specific historical event or pop culture fact from that year." },
          },
          required: ["summary", "highlight"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    
    return JSON.parse(text) as EraContext;

  } catch (error) {
    console.error("Error fetching era context:", error);
    return null;
  }
};
