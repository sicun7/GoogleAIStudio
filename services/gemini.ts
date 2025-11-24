import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { RunConfig } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateContentStream = async (
  prompt: string,
  history: { role: string; parts: { text: string }[] }[],
  config: RunConfig,
  onChunk: (text: string) => void
): Promise<void> => {
  try {
    // Determine strict model name mapping based on user selection or defaults
    // Mapping internal UI IDs to API specific strings if needed, but we used correct ones in constants.
    const modelId = config.model;

    // Build the chat request
    // Note: ai.chats.create is great for stateful chats, but for a "Run" button in a studio 
    // that might reset or re-run, we can often just use generateContent with full history 
    // OR create a ephemeral chat. Let's use the Chat API for correct history handling.

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