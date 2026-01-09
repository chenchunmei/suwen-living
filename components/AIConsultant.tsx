
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/gemini';
import { ChatMessage } from '../types';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: '午后好。我是您的健康专栏主编。这里是您的私人健康信箱，无论您对生活节律有什么困惑，或是想深入了解某项养生知识，都请在此留言，我将为您悉心解答。',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));
      
      const response = await chatWithAI(input, history);
      
      const modelMsg: ChatMessage = {
        role: 'model',
        content: response.text || '抱歉，暂时无法回应您的来信。',
        timestamp: new Date(),
        groundingSources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((c: any) => ({
          title: c.web?.title || '参考文献',
          uri: c.web?.uri || '#'
        }))
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'model',
        content: '通信不畅，请稍后再投递。',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h2 className="serif text-3xl text-stone-800 italic">读者信箱 / Editor's Desk</h2>
        <p className="text-stone-400 text-sm tracking-widest font-light">CONSULT OUR EXPERT EDITOR</p>
      </div>

      <div className="bg-white border border-stone-100 shadow-sm rounded-lg overflow-hidden flex flex-col h-[600px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-2">
                  {msg.role === 'user' ? 'READERS' : 'EDITOR'} · {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <div className={`inline-block text-sm leading-relaxed p-5 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-stone-800 text-white rounded-tr-none' 
                    : 'bg-stone-50 text-stone-800 rounded-tl-none border border-stone-100'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                  
                  {msg.groundingSources && msg.groundingSources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-stone-200/50">
                      <div className="flex flex-wrap gap-2">
                        {msg.groundingSources.map((source, sIdx) => (
                          <a 
                            key={sIdx} 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[9px] px-2 py-1 bg-white border border-stone-200 text-stone-500 hover:text-stone-800 rounded-md transition-all"
                          >
                            #{source.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <span className="text-xs text-stone-400 italic">主编正在撰写中...</span>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-stone-100 bg-stone-50/50">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder="您的疑问..."
              rows={1}
              className="w-full bg-white border border-stone-200 rounded-lg px-5 py-4 text-sm focus:ring-0 focus:border-stone-400 transition-all outline-none resize-none pr-24"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-stone-800 text-white px-5 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-stone-700 transition-all disabled:opacity-50"
            >
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
