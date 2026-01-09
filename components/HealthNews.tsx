
import React, { useState, useEffect } from 'react';
import { searchHealthNews } from '../services/gemini.ts';

const HealthNews: React.FC = () => {
  const [query, setQuery] = useState('压力管理与端粒长度');
  const [data, setData] = useState<{ text: string, sources: any[] } | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (q: string) => {
    setLoading(true);
    try {
      const result = await searchHealthNews(q);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(query);
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <h2 className="serif text-4xl text-stone-800">科学札记 / Dispatch</h2>
      {loading ? (
        <div className="text-stone-400 italic">正在查阅文献...</div>
      ) : (
        <article className="bg-white p-12 rounded-lg border border-stone-100">
          <div className="whitespace-pre-wrap text-stone-700 leading-relaxed font-light">
            {data?.text}
          </div>
        </article>
      )}
    </div>
  );
};

export default HealthNews;
