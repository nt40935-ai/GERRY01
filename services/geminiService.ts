import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const getAiClient = () => {
  // Support both process.env (Standard/Cloud) and import.meta.env (Vite Local)
  const apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY;
  
  if (!apiKey) {
    console.error("API_KEY is missing. Please check your .env file.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initChat = () => {
  const ai = getAiClient();
  if (!ai) return null;

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    initChat();
  }

  if (!chatSession) {
    return "I'm having trouble connecting to the coffee beans right now. Please check your API key.";
  }

  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "I'm speechless! That's a great coffee thought.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I spilled the coffee. Can you say that again?";
  }
};