import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RunConfig } from "../types";

// Initialize the client with safe environment variable access
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || '';
const ai = new GoogleGenAI({ apiKey });

export const generateContentStream = async (
  prompt: string,
  history: { role: string; parts: { text: string }[] }[],
  config: RunConfig,
  onChunk: (text: string) => void
): Promise<void> => {
  try {
    // Determine strict model name mapping based on user selection or defaults
    const modelId = config.model;

    // Build the chat request
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: config.systemInstruction,
        temperature: config.temperature,
        topK: config.topK,
        topP: config.topP,
        maxOutputTokens: config.maxOutputTokens,
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const resultStream = await chat.sendMessageStream({ message: prompt });

    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        onChunk(c.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};