
import React, { useState, useEffect } from 'react';
import { searchHealthNews } from '../services/gemini';

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

  const topics = ['肠道菌群', '冥想神经科学', '昼夜节律', '抗炎饮食'];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="serif text-4xl text-stone-800">科学札记 / Dispatch</h2>
          <p className="text-stone-400 text-sm tracking-widest font-light">LATEST EVIDENCE-BASED DISPATCHES</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {topics.map(t => (
            <button 
              key={t}
              onClick={() => { setQuery(t); fetchNews(t); }}
              className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${query === t ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200 text-stone-400 hover:border-stone-400'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="h-6 w-1/3 bg-stone-200 rounded animate-pulse"></div>
          <div className="h-40 bg-stone-200 rounded-xl animate-pulse"></div>
        </div>
      ) : (
        <article className="bg-white p-12 rounded-lg border border-stone-100 shadow-sm transition-all hover:shadow-md">
          <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed font-light">
            <div className="whitespace-pre-wrap first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-stone-800">
              {data?.text}
            </div>
          </div>
          
          {data?.sources && data.sources.length > 0 && (
            <div className="mt-16 pt-8 border-t border-stone-100">
              <h3 className="text-[10px] font-bold text-stone-300 mb-6 uppercase tracking-[0.4em]">验证路径 / Verification Path</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.sources.map((source, idx) => (
                  <a 
                    key={idx}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col p-4 bg-stone-50 rounded-md border border-transparent hover:border-stone-200 transition-all group"
                  >
                    <span className="text-[10px] text-stone-400 font-medium mb-1 uppercase tracking-tighter">SOURCE {idx + 1}</span>
                    <span className="text-xs text-stone-600 font-semibold group-hover:text-stone-900 truncate italic">{source.title}</span>
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
