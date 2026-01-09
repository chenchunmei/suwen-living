
import React from 'react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: '文集' },
    { id: 'advisor', label: '问诊AI' },
    { id: 'news', label: '动态' },
    { id: 'about', label: '关于' }
  ];

  return (
    <header className="sticky top-0 bg-white/70 backdrop-blur-lg border-b border-stone-100 z-50">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-20">
        <div 
          className="cursor-pointer flex flex-col"
          onClick={() => setActiveTab('home')}
        >
          <span className="serif text-2xl font-bold tracking-tight text-stone-800">素问生活</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-medium">SUWEN LIVING</span>
        </div>
        
        <nav className="flex space-x-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-sm font-medium tracking-wide transition-all relative py-1
                ${activeTab === item.id 
                  ? 'text-stone-900 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-stone-900' 
                  : 'text-stone-400 hover:text-stone-700'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <button className="text-stone-400 hover:text-stone-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <div className="w-px h-4 bg-stone-200"></div>
          <button className="text-xs font-bold uppercase tracking-widest text-stone-800">订阅</button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
