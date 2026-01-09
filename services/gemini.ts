
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

const getAIClient = () => {
  const apiKey = process.env.API_KEY || '';
  if (!apiKey) {
    console.warn("未检测到 API_KEY。AI 功能（问诊、构思）将无法正常工作。请在环境变量或代码中配置。");
  }
  return new GoogleGenAI({ apiKey });
};

export const chatWithAI = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAIClient();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `你是"素问生活"博客的首席健康编辑。
      你的风格是：优雅、平和、极简且极其专业。
      你的职责是：
      1. 回答读者的健康疑问，提供深度、科学的背景解释。
      2. 将复杂的养生知识转化为日常可操作的优雅生活方案。
      3. 撰写简短的健康随笔或科普短文。
      4. 严格遵循循证医学，同时尊重传统智慧中的合理部分。
      5. 始终提醒：博客内容旨在分享知识，非医疗诊断建议。`,
      temperature: 0.5,
      topP: 0.9,
      tools: [{ googleSearch: {} }]
    },
  });

  const response = await chat.sendMessage({ message: prompt });
  return response;
};

export const generateArticleFromTopic = async (topic: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `请根据主题"${topic}"，为"素问生活"博客撰写一篇富有美感的静态博文数据。要求包含：
    1. 标题（简练有力）
    2. 分类（饮食美学/心智调护/节律生活/自然疗愈）
    3. 摘要（150字左右的优雅导语）
    4. 正文（500-800字左右的完整内容，排版优雅，包含一些养生建议）
    5. 预计阅读分钟。
    请以JSON格式返回。`,
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
  return JSON.parse(response.text);
};

export const getFeaturedArticleIdeas = async () => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `请生成3篇当前最受关注的健康养生博客文章摘要。包含标题、分类、简短导语、以及一段不少于300字的正文。请以JSON格式返回。`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
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
    }
  });
  return JSON.parse(response.text);
};

export const searchHealthNews = async (query: string) => {
  const ai = getAIClient();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `作为健康博主，请搜索关于"${query}"的最新科学研究动态，并撰写一段通俗易懂的解读。`,
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.web?.title || '科学引文',
      uri: chunk.web?.uri || '#'
    })) || []
  };
};
