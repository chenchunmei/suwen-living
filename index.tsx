
// Add missing imports for React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- 静态数据 ---
const STATIC_ARTICLES = [
  {
    id: 1,
    title: "呼吸：被忽视的长寿药",
    category: "节律生活",
    readTime: "5",
    excerpt: "在快节奏的现代生活中，深度呼吸不仅是氧气的交换，更是神经系统的一次重置。",
    content: "中医认为：‘呼出心与肺，吸入肾与肝。’一次完整的深呼吸，其实是对内脏的一次深度按摩。当我们采用腹式呼吸时，横膈膜的上下运动能够有效刺激迷走神经，向大脑传递‘安全’与‘放松’的信号。\n\n建议每天清晨或入睡前，尝试‘4-7-8’呼吸法：吸气4秒，屏息7秒，呼气8秒。在这个过程中，你会感受到紧绷的肩膀逐渐松弛，纷乱的思绪回归原位。",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "谷雨节气：春季最后的湿气调理",
    category: "中医养生",
    readTime: "4",
    excerpt: "谷雨，雨生百谷。此时雨水增多，湿气加重。中医认为，脾主运化，最怕湿困。",
    content: "清明断雪，谷雨断霜。作为春季的最后一个节气，谷雨象征着温暖湿润季节的全面到来。此时万物生长，但与此同时，空气中的湿度也达到了峰值。\n\n养生之道在于‘内清外调’。内清，即多吃茯苓、薏米、芡实等健脾祛湿之物；外调，则是在阳光充足时多进行户外散步。",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb75bb53?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "极简心智：清理空间来治愈焦虑",
    category: "心智调护",
    readTime: "6",
    excerpt: "居住空间是内心世界的投射。当环境充斥着杂物，大脑的带宽也会被无形占用。",
    content: "‘断舍离’不仅仅是一种家务技巧，更是一种心智的洗礼。当我们丢弃 those 无用、不爱、不再适合的物品时，本质上是在整理我们的内心边界。清理空间的过程，其实是一个不断问询自我、确认需求的过程。\n\n尝试从一个小抽屉开始。清空它，擦拭它，只放回那些真正令你心动的物品。",
    imageUrl: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80"
  }
];

// --- 组件部分 ---

const App = () => {
  // Use React hooks explicitly from imported React
  const [activeTab, setActiveTab] = React.useState('home');
  const [selectedArticle, setSelectedArticle] = React.useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-stone-100 z-50">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="cursor-pointer" onClick={() => {setActiveTab('home'); setSelectedArticle(null);}}>
            <span className="serif text-2xl font-bold tracking-tight text-stone-800">素问生活</span>
            <span className="block text-[8px] uppercase tracking-[0.4em] text-stone-400 font-medium">Suwen Living</span>
          </div>
          <nav className="flex space-x-10">
            {['home', 'advisor', 'about'].map(tab => (
              <button 
                key={tab}
                onClick={() => {setActiveTab(tab); setSelectedArticle(null);}}
                className={`text-[11px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-stone-400'}`}
              >
                {tab === 'home' ? '文集' : tab === 'advisor' ? '咨询' : '关于'}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-16 w-full">
        {activeTab === 'home' && (
          <div className="space-y-24">
            <section className="text-center space-y-4">
              <h1 className="serif text-5xl md:text-7xl text-stone-800">呼吸间的健康智慧</h1>
              <p className="text-stone-400 italic text-sm">“平素之问，探讨生命的本质与节律”</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {STATIC_ARTICLES.map(art => (
                <div key={art.id} className="group cursor-pointer space-y-6" onClick={() => setSelectedArticle(art)}>
                  <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                    <img src={art.imageUrl} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" alt={art.title} />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-stone-400">
                      <span>{art.category}</span>
                      <span>{art.readTime} MIN</span>
                    </div>
                    <h3 className="serif text-2xl text-stone-800 group-hover:text-stone-600 transition-colors">{art.title}</h3>
                    <p className="text-xs text-stone-500 font-light leading-relaxed line-clamp-2">{art.excerpt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'advisor' && <Consultant />}
        {activeTab === 'about' && <About />}
      </main>

      {/* 文章详情弹窗 */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setSelectedArticle(null)}></div>
          <div className="relative bg-[#fbfaf8] w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 md:p-16 custom-scrollbar animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedArticle(null)} className="absolute top-8 right-8 text-stone-400 hover:text-stone-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <article className="space-y-12">
              <div className="space-y-6 text-center">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em]">{selectedArticle.category}</span>
                <h2 className="serif text-4xl md:text-6xl text-stone-900 leading-tight">{selectedArticle.title}</h2>
                <div className="w-12 h-px bg-stone-200 mx-auto"></div>
              </div>
              <img src={selectedArticle.imageUrl} className="w-full h-72 object-cover rounded-2xl shadow-inner" />
              <div className="max-w-2xl mx-auto prose prose-stone prose-lg">
                <p className="text-xl text-stone-500 italic font-light mb-10">{selectedArticle.excerpt}</p>
                <div className="text-stone-700 leading-loose whitespace-pre-wrap">{selectedArticle.content}</div>
              </div>
            </article>
          </div>
        </div>
      )}

      <footer className="border-t border-stone-200 py-20 bg-stone-50/50 text-center">
        <p className="text-stone-300 text-[9px] font-bold uppercase tracking-[0.4em]">© 2024 SUWEN LIVING. 平素之问，养生之道。</p>
      </footer>
    </div>
  );
};

const Consultant = () => {
  // Use React hooks explicitly from imported React
  const [messages, setMessages] = React.useState([{ role: 'model', content: '您好。我是素问生活的AI健康顾问。无论是时令饮食还是身心调理，您都可以随心提问。' }]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Initialize GoogleGenAI with process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: { systemInstruction: "你是'素问生活'健康顾问。用温和、专业、文学化的中文回答。避开极端医疗建议，强调平衡。" }
      });
      // Use response.text directly (property, not a method)
      setMessages(prev => [...prev, { role: 'model', content: response.text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', content: '抱歉，目前的咨询服务暂不可用，请稍后再试。' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[600px] flex flex-col bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
      <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-stone-800 text-white rounded-br-none' : 'bg-stone-50 text-stone-800 rounded-tl-none border border-stone-100'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-stone-300 text-[10px] italic">AI顾问正在构思回复...</div>}
      </div>
      <div className="p-6 border-t border-stone-50 bg-stone-50/20">
        <div className="flex gap-4">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="关于健康的疑问..."
            className="flex-1 bg-white border border-stone-200 rounded-xl px-5 py-3 text-sm focus:ring-1 focus:ring-stone-300 outline-none"
          />
          <button onClick={sendMessage} className="bg-stone-800 text-white px-6 rounded-xl text-xs font-bold tracking-widest uppercase">发送</button>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <div className="max-w-3xl mx-auto space-y-16 animate-in fade-in duration-1000">
    <div className="aspect-[21/9] rounded-3xl overflow-hidden grayscale shadow-2xl">
      <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80" className="w-full h-full object-cover" />
    </div>
    <div className="space-y-8 text-center">
      <h2 className="serif text-4xl text-stone-800">关于素问 / <span className="italic">The Philosophy</span></h2>
      <div className="space-y-6 text-stone-500 font-light leading-loose text-lg">
        <p>“素问”二字，取自中医圣典《黄帝内经·素问》。</p>
        <p>素者，本原也；问者，探讨也。我们相信，健康并非某种遥不可及的奢侈品，而是源于对生命节律的深刻理解与平素生活的点滴积累。</p>
        <p>在这个信息冗余的时代，我们提倡一种“减法养生”：减去不必要的焦虑，减去复杂的化工添加，回归呼吸，回归节气，回归身心的本然状态。</p>
      </div>
    </div>
  </div>
);

// 启动渲染 - ReactDOM is now imported from 'react-dom/client'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

export default App;
