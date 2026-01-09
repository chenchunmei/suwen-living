
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
          {/* Display grounding sources if available */}
          {data?.sources && data.sources.length > 0 && (
            <div className="mt-12 pt-8 border-t border-stone-100 space-y-6">
              <h4 className="serif text-xl text-stone-800">参考文献 / Citations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.sources.map((src, i) => (
                  <a 
                    key={i} 
                    href={src.uri} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-4 bg-stone-50 rounded-lg text-xs text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition-all flex items-center justify-between"
                  >
                    <span className="line-clamp-1">{src.title}</span>
                    <svg className="w-3 h-3 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </article>
      )}
    </div>
  );
};

export default HealthNews;
