import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getLocationInsight = async (locationTitle: string, category: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key not configured. Please set process.env.API_KEY to use AI features.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a short, helpful, and slightly fun 1-sentence fact or tip about a location named "${locationTitle}" which is a "${category}" at a university campus. Keep it under 30 words.`,
    });

    return response.text || "No insight available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Could not fetch AI insight at this time.";
  }
};