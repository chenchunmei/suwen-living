
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import AIConsultant from './components/AIConsultant';
import HealthNews from './components/HealthNews';
import WritersStudio from './components/WritersStudio';
import { STATIC_ARTICLES } from './data/content';
import { HealthArticle } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [articles, setArticles] = useState<HealthArticle[]>(STATIC_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);

  const handlePublish = (newArticle: HealthArticle) => {
    setArticles(prev => [newArticle, ...prev]);
    setActiveTab('home');
    setTimeout(() => {
      document.getElementById('collective')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-32 animate-in fade-in duration-1000">
            {/* Featured Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div 
                className="lg:col-span-7 relative overflow-hidden rounded-2xl group shadow-2xl cursor-pointer"
                onClick={() => setSelectedArticle(articles[0])}
              >
                <img 
                  src={articles[0]?.imageUrl || "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80"} 
                  alt="Minimal Wellness" 
                  className="w-full aspect-[16/10] object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-all"></div>
              </div>
              <div className="lg:col-span-5 space-y-8">
                <span className="text-[10px] font-black text-stone-400 uppercase tracking-[0.5em] block">本周焦点 / FEATURED</span>
                <h1 className="serif text-5xl md:text-7xl text-stone-800 leading-[1.1] tracking-tight">
                  {articles[0]?.title}
                </h1>
                <p className="text-stone-500 font-light leading-relaxed text-lg italic">
                  "{articles[0]?.excerpt.substring(0, 80)}..."
                </p>
                <button 
                  onClick={() => setSelectedArticle(articles[0])}
                  className="text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-stone-800 pb-2 hover:text-stone-500 hover:border-stone-200 transition-all"
                >
                  详细阅读 / READ MORE
                </button>
              </div>
            </section>

            {/* Article Grid */}
            <section id="collective" className="space-y-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-100 pb-10 gap-6">
                <div className="space-y-2">
                  <h2 className="serif text-4xl text-stone-800">素问文库 / The Collective</h2>
                  <p className="text-stone-400 text-[10px] tracking-[0.3em] font-medium uppercase">Archive of seasonal wisdom</p>
                </div>
                <div className="flex space-x-8 text-[11px] font-bold uppercase tracking-widest text-stone-400">
                  <span className="text-stone-900 border-b border-stone-900 cursor-pointer">全部</span>
                  <span className="hover:text-stone-600 cursor-pointer">饮食</span>
                  <span className="hover:text-stone-600 cursor-pointer">心智</span>
                  <span className="hover:text-stone-600 cursor-pointer">动态</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
                {articles.map((art, idx) => (
                  <article 
                    key={idx} 
                    onClick={() => setSelectedArticle(art)}
                    className="space-y-8 group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700" 
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="aspect-[3/4] bg-stone-100 overflow-hidden rounded-lg shadow-sm group-hover:shadow-xl transition-all duration-500">
                       <img 
                        src={art.imageUrl} 
                        alt={art.title} 
                        className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                       />
                    </div>
                    <div className="space-y-4 px-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">
                        <span>{art.category}</span>
                        <span>{art.readTime} MIN</span>
                      </div>
                      <h3 className="serif text-2xl text-stone-800 group-hover:text-stone-600 transition-colors leading-tight">{art.title}</h3>
                      <p className="text-sm text-stone-500 font-light leading-relaxed line-clamp-3 italic">
                        {art.excerpt}
                      </p>
                      <div className="pt-4 flex items-center text-[9px] font-black uppercase tracking-widest text-stone-800 group-hover:translate-x-2 transition-transform">
                        详细阅读 <span className="ml-2">→</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Quote */}
            <section className="py-40 text-center max-w-2xl mx-auto space-y-12">
              <div className="w-16 h-px bg-stone-300 mx-auto"></div>
              <blockquote className="serif text-4xl italic text-stone-800 leading-snug tracking-tight">
                "万物有时，呼吸之间。真正的养生，是找回生命的律动。"
              </blockquote>
              <div className="space-y-1">
                <cite className="text-[11px] font-black uppercase tracking-[0.4em] text-stone-800">— 素问编辑部</cite>
                <p className="text-stone-300 text-[9px] uppercase tracking-widest italic">ESTABLISHED 2024</p>
              </div>
            </section>
          </div>
        );
      case 'advisor':
        return <AIConsultant />;
      case 'news':
        return <HealthNews />;
      case 'about':
        return (
          <div className="max-w-4xl mx-auto space-y-32 py-20 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <h2 className="serif text-5xl text-stone-800 leading-tight">关于素问 / <br/><span className="italic">Suwen Living</span></h2>
                <div className="space-y-6 text-stone-500 font-light leading-loose text-base">
                  <p>《素问》源于中医经典，意为“平素之问”，旨在探讨生命的本质与健康的规律。</p>
                  <p>我们相信，在这个信息过载的时代，最深刻的治疗往往源于最简单的生活改变：一次深呼吸、一杯清茶、一个遵循节律的午后。</p>
                  <p>这里没有焦虑，只有对生命最本真的敬畏。</p>
                </div>
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl rotate-2">
                <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover" alt="Zen" />
              </div>
            </div>
            
            <div className="w-full h-px bg-stone-200"></div>
            
            <WritersStudio onPublish={handlePublish} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-stone-200 selection:text-stone-900">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 md:py-24 w-full">
        {renderContent()}
      </main>

      {/* Full Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-md" 
            onClick={() => setSelectedArticle(null)}
          ></div>
          <div className="relative bg-white w-full h-full md:max-w-5xl md:h-[90vh] md:rounded-3xl overflow-y-auto shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 custom-scrollbar">
            <button 
              onClick={() => setSelectedArticle(null)}
              className="sticky top-6 right-6 float-right z-10 p-4 bg-white/50 backdrop-blur rounded-full hover:bg-stone-100 transition-all text-stone-400 hover:text-stone-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>

            <div className="max-w-3xl mx-auto px-6 py-20 md:py-32 space-y-16">
              <div className="space-y-8 text-center">
                <div className="flex justify-center items-center space-x-4 text-[11px] font-black uppercase tracking-[0.4em] text-stone-400">
                  <span>{selectedArticle.category}</span>
                  <span className="w-1 h-1 bg-stone-200 rounded-full"></span>
                  <span>{selectedArticle.readTime} MIN READ</span>
                </div>
                <h2 className="serif text-5xl md:text-7xl text-stone-900 leading-tight tracking-tight">
                  {selectedArticle.title}
                </h2>
                <div className="w-16 h-px bg-stone-200 mx-auto"></div>
              </div>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
                <img src={selectedArticle.imageUrl} className="w-full h-full object-cover grayscale-[0.1]" alt="hero" />
              </div>

              <div className="prose prose-stone prose-lg max-w-none">
                <div className="text-xl text-stone-400 font-light italic leading-relaxed mb-12 border-l-2 border-stone-100 pl-8">
                  {selectedArticle.excerpt}
                </div>
                <div className="text-stone-700 leading-loose space-y-8 text-lg font-light whitespace-pre-wrap">
                  {selectedArticle.fullContent || "内容整理中，请稍后访问。"}
                </div>
              </div>

              <div className="pt-20 border-t border-stone-100 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-300 mb-8">FIN.</p>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="bg-stone-900 text-white px-12 py-5 rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-stone-700 transition-all shadow-xl"
                >
                  返回文集
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-stone-200 py-32 mt-32 bg-stone-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-24">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex flex-col">
              <span className="serif text-3xl font-bold text-stone-900 tracking-tighter">素问生活</span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-stone-400 font-bold mt-1">SUWEN LIVING JOURNAL</span>
            </div>
            <p className="text-sm text-stone-500 leading-loose font-light max-w-sm italic">
              “夫养生者，先须绝虑。”回归素朴，在快节奏的时代里，我们邀您一起慢下来，重新认识身体的智慧。
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-900 mb-8">分卷 / INDEX</h4>
            <ul className="space-y-4 text-xs text-stone-500 font-light uppercase tracking-widest">
              <li className="hover:text-stone-900 cursor-pointer transition-colors">节律生活 / Seasonal</li>
              <li className="hover:text-stone-900 cursor-pointer transition-colors">饮食美学 / Gastronomy</li>
              <li className="hover:text-stone-900 cursor-pointer transition-colors">心智调护 / Mindful</li>
              <li className="hover:text-stone-900 cursor-pointer transition-colors">自然疗愈 / Nature</li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-900 mb-8">联络 / CONTACT</h4>
            <div className="space-y-6">
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                订阅我们的电子札记，每周获取精选深度内容。
              </p>
              <div className="flex border-b border-stone-300 pb-3">
                <input 
                  type="email" 
                  placeholder="邮箱地址" 
                  className="bg-transparent text-[11px] font-medium tracking-widest outline-none flex-1 placeholder:text-stone-300"
                />
                <button className="text-[11px] font-black uppercase tracking-widest text-stone-900">发送</button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-32 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-stone-300 text-[10px] font-bold uppercase tracking-[0.3em] gap-8">
          <div>© {new Date().getFullYear()} SUWEN LIVING. DESIGNED FOR TRANQUILITY.</div>
          <div className="flex space-x-12">
             <span className="cursor-pointer hover:text-stone-600 transition-colors">隐私协议</span>
             <span className="cursor-pointer hover:text-stone-600 transition-colors">版权声明</span>
             <span className="cursor-pointer hover:text-stone-600 transition-colors">INSTAGRAM</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
