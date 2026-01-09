
import React, { useState } from 'react';
import { generateArticleFromTopic } from '../services/gemini';
import { HealthArticle } from '../types';

interface WritersStudioProps {
  onPublish: (article: HealthArticle) => void;
}

const WritersStudio: React.FC<WritersStudioProps> = ({ onPublish }) => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<HealthArticle | null>(null);
  const [showCode, setShowCode] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const data = await generateArticleFromTopic(topic);
      setPreview({
        ...data,
        imageUrl: `https://picsum.photos/seed/${Math.random()}/1200/800`,
        date: new Date().toISOString().split('T')[0]
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!preview) return;
    const code = JSON.stringify(preview, null, 2);
    navigator.clipboard.writeText(code);
    alert('代码已复制！您可以将其粘贴到 data/content.ts 的数组中。');
  };

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 md:p-12 space-y-10">
      <div className="text-center space-y-3">
        <h3 className="serif text-3xl text-stone-800">创作实验室 / Studio</h3>
        <p className="text-stone-400 text-xs tracking-[0.2em] uppercase font-medium">Generate static content with AI</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <input 
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="输入灵感主题（例如：初夏的绿茶养生）..."
          className="flex-1 bg-white border border-stone-200 rounded-xl px-6 py-4 text-sm focus:ring-1 focus:ring-stone-400 outline-none transition-all shadow-sm"
        />
        <button 
          onClick={handleGenerate}
          disabled={loading || !topic}
          className="bg-stone-800 text-white px-10 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-700 disabled:opacity-50 transition-all shadow-md"
        >
          {loading ? '构思中...' : '构思文章'}
        </button>
      </div>

      {preview && (
        <div className="pt-10 border-t border-stone-200 animate-in fade-in slide-in-from-top-4 duration-500 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <img src={preview.imageUrl} alt="preview" className="w-full h-full object-cover grayscale-[0.1]" />
            </div>
            <div className="space-y-6">
              <div className="flex justify-between items-center text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                <span>{preview.category}</span>
                <span>{preview.readTime} MIN READ</span>
              </div>
              <h4 className="serif text-3xl text-stone-800 leading-tight">{preview.title}</h4>
              <p className="text-stone-500 text-sm leading-relaxed font-light italic">{preview.excerpt}</p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => onPublish(preview)}
                  className="flex-1 bg-stone-800 text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-900 transition-all"
                >
                  本地预览
                </button>
                <button 
                  onClick={() => setShowCode(!showCode)}
                  className="px-6 border border-stone-300 text-stone-600 rounded-xl hover:bg-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>
          </div>

          {showCode && (
            <div className="bg-white p-6 rounded-xl border border-stone-200 relative group animate-in zoom-in-95">
              <div className="text-[10px] font-mono text-stone-400 mb-4 uppercase">静态文件 JSON 格式：</div>
              <pre className="text-xs text-stone-600 overflow-x-auto p-4 bg-stone-50 rounded-lg font-mono leading-relaxed">
                {JSON.stringify(preview, null, 2)}
              </pre>
              <button 
                onClick={copyToClipboard}
                className="absolute top-14 right-10 bg-stone-800 text-white px-4 py-2 rounded-lg text-[9px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-all shadow-lg"
              >
                复制代码
              </button>
              <p className="mt-4 text-[10px] text-stone-400 italic">
                提示：复制以上代码，手动添加到 data/content.ts 的 STATIC_ARTICLES 数组中即可完成静态发布。
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WritersStudio;
