import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Penelope", a knowledgeable and friendly stationery expert assistant for the e-commerce store "Ink & Paper".
Your goal is to help customers find the perfect stationery products based on their needs, hobbies, or gift recipients.

Here is the current product catalog (JSON format):
${JSON.stringify(PRODUCTS.map(p => ({ id: p.id, name: p.name, category: p.category, price: p.price, description: p.description })))}

Rules:
1. When recommending products, you MUST strictly use the products from the catalog provided.
2. The currency is INR (Indian Rupee), represented by '₹'. Always quote prices in INR.
3. Keep your tone warm, creative, and professional.
4. You can provide general stationery advice (e.g., how to clean a fountain pen) even if it doesn't lead to a sale.
5. If the user asks for something we don't have, politely suggest the closest alternative from our catalog.
`;

export const getStationeryAdvice = async (history: { role: 'user' | 'model', text: string }[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm having a little trouble flipping through my catalog right now. Could you ask me again in a moment?";
  }
};
