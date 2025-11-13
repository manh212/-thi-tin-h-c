import React, { useEffect, useRef, useState, useMemo } from 'react';
import type { SyllabusContent } from '../types';
import Button from './Button';

interface DeCuongScreenProps {
  syllabus: SyllabusContent[];
  scrollToId?: string | null;
}

const SyllabusItem: React.FC<{ item: SyllabusContent }> = ({ item }) => (
  <div id={`syllabus-${item.id}`} className="mb-6 scroll-mt-20">
    <h3 className={`font-bold text-blue-700 ${
        item.level === 1 ? 'text-2xl border-b-2 border-blue-200 pb-2' :
        item.level === 2 ? 'text-xl' : 'text-lg'
    }`}>
      {item.title}
    </h3>
    {item.content && <div className="mt-2 text-slate-700 whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: item.content }} />}
    {item.children && (
      <div className="mt-4 pl-4 border-l-2 border-slate-300">
        {item.children.map(child => <SyllabusItem key={child.id} item={child} />)}
      </div>
    )}
  </div>
);

const TocItem: React.FC<{ item: SyllabusContent, onNavigate: (id: string) => void }> = ({ item, onNavigate }) => (
    <li>
        <a href={`#syllabus-${item.id}`} onClick={(e) => { e.preventDefault(); onNavigate(item.id); }} className="hover:underline text-blue-600">
            {item.title}
        </a>
        {item.children && (
             <ul className="pl-4 mt-1 space-y-1">
                {item.children.map(child => <TocItem key={child.id} item={child} onNavigate={onNavigate} />)}
             </ul>
        )}
    </li>
);

const DeCuongScreen: React.FC<DeCuongScreenProps> = ({ syllabus, scrollToId }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (scrollToId) {
      const element = document.getElementById(`syllabus-${scrollToId}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [scrollToId]);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(`syllabus-${id}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  const filteredSyllabus = useMemo(() => {
    if (!searchTerm) return syllabus;
    
    const filter = (items: SyllabusContent[]): SyllabusContent[] => {
        return items.reduce((acc, item) => {
            const children = item.children ? filter(item.children) : [];
            const isMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            (item.content && item.content.toLowerCase().includes(searchTerm.toLowerCase()));

            if(isMatch || children.length > 0) {
                acc.push({ ...item, children });
            }
            return acc;
        }, [] as SyllabusContent[]);
    };

    return filter(syllabus);
  }, [syllabus, searchTerm]);

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 focus:outline-none">Đề Cương Ôn Tập</h2>
        <p className="text-slate-600 mt-2">Toàn bộ kiến thức lý thuyết và thực hành cho kỳ thi.</p>
        <div className="mt-4 max-w-md mx-auto">
            <input 
                type="search"
                placeholder="Tìm kiếm trong đề cương..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
        </div>
      </header>
      
      <div className="lg:flex lg:gap-8">
        <aside className="lg:w-1/3 mb-8 lg:mb-0">
            <nav className="sticky top-4 p-4 border rounded-lg bg-slate-50 max-h-[70vh] overflow-y-auto">
                <h3 className="font-bold text-lg mb-2">Mục lục</h3>
                <ul className="space-y-2 text-sm">
                    {filteredSyllabus.map(item => <TocItem key={item.id} item={item} onNavigate={handleNavigate} />)}
                </ul>
            </nav>
        </aside>

        <div ref={contentRef} className="lg:w-2/3">
          {filteredSyllabus.map(item => <SyllabusItem key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default DeCuongScreen;
