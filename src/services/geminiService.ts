import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const getAiClient = () => {
  // Use import.meta.env for Vite (primary)
  // Fallback to process.env if polyfilled, but strictly prefer Vite's method
  const apiKey = import.meta.env.VITE_API_KEY || (typeof process !== 'undefined' ? process.env?.API_KEY : undefined);
  
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will be disabled. Check your .env file.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initChat = () => {
  const ai = getAiClient();
  if (!ai) return null;
  
  try {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to create chat session:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initChat();
  }

  if (!chatSession) {
    return "I'm currently offline (API Key missing or invalid). Please check your configuration.";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I'm speechless! That's a great coffee thought.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I spilled the coffee. Can you say that again?";
  }
};