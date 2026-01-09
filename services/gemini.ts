
import { GoogleGenAI, Type } from "@google/genai";

export const chatWithAI = async (prompt: string, history: any[]) => {
  // Create a new instance right before the call to ensure latest config
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: '你是"素问生活"的健康顾问。',
      temperature: 0.5,
      tools: [{ googleSearch: {} }]
    },
  });

  const response = await chat.sendMessage({ message: prompt });
  return response;
};

export const generateArticleFromTopic = async (topic: string) => {
  // Create a new instance right before the call to ensure latest config
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `请根据主题"${topic}"撰写文章。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          excerpt: { type: Type.STRING },
          fullContent: { type: Type.STRING },
          category: { type: Type.STRING },
          readTime: { type: Type.STRING }
        },
        required: ["title", "excerpt", "fullContent", "category", "readTime"]
      }
    }
  });
  // Use response.text directly (property access)
  return JSON.parse(response.text);
};

export const searchHealthNews = async (query: string) => {
  // Create a new instance right before the call to ensure latest config
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `关于"${query}"的研究动态。`,
    config: { tools: [{ googleSearch: {} }] }
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || '科学引文',
      uri: chunk.web?.uri || '#'
    })) || []
  };
};
