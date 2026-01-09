
export interface HealthArticle {
  title: string;
  excerpt: string;
  fullContent?: string; // 增加正文内容
  category: string;
  readTime: string;
  imageUrl?: string;
  date?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  groundingSources?: { title: string; uri: string }[];
}

export enum WellnessCategory {
  TCM = '中医养生',
  NUTRITION = '饮食美学',
  EXERCISE = '运动健身',
  MENTAL = '心智调护',
  SEASONAL = '节律生活'
}
