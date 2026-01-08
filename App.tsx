import React, { useState } from 'react';
import { TIMELINE_DATA } from './constants';
import PhotoFrame from './components/PhotoFrame';
import Timeline from './components/Timeline';
import TopCarousel from './components/TopCarousel';
import { Clock, Sparkles } from 'lucide-react';

function App() {
  const [activeId, setActiveId] = useState<string>(TIMELINE_DATA[0].id);

  // Find the currently active event object
  const activeEvent = TIMELINE_DATA.find((e) => e.id === activeId) || TIMELINE_DATA[0];

  return (
    <div className="min-h-screen bg-sepia-50 selection:bg-sepia-200 text-sepia-900 overflow-hidden">
      
      {/* Header / Intro */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-sepia-50/90 backdrop-blur-sm border-b border-sepia-900/5">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-sepia-800" />
          <h1 className="font-serif font-bold text-xl tracking-tight text-sepia-900">
            Lifecycle
          </h1>
        </div>
        <div className="text-xs font-sans tracking-widest uppercase text-sepia-800/60">
          4 to 80 Years
        </div>
      </header>

      <main className="flex flex-col lg:flex-row h-screen pt-16">
        
        {/* Left Panel: Sticky Photo Frame (Hidden on small mobile, visible on desktop) */}
        {/* We use order-2 for mobile flow, but lg:order-1 for desktop split */}
        <section className="hidden lg:block lg:w-1/2 h-full sticky top-16 bg-sepia-100/50 border-r border-sepia-900/5">
           <PhotoFrame event={activeEvent} />
        </section>

        {/* Right Panel: Scrollable Timeline */}
        <section className="w-full lg:w-1/2 h-full overflow-y-auto no-scrollbar relative flex flex-col">
          <div className="absolute top-4 left-6 lg:hidden z-10 opacity-50 pointer-events-none">
             {/* Mobile indicator that there is more content */}
          </div>
          
          {/* Time Lapse Carousel at the top of the content stream */}
          <TopCarousel events={TIMELINE_DATA} />

          {/* AI Prompt Display */}
          <div className="px-8 py-12 flex justify-center bg-sepia-50/30">
            <div className="max-w-md w-full border border-sepia-200 bg-white/60 p-8 rounded shadow-sm relative text-center">
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sepia-50 px-3 text-sepia-400 flex items-center gap-1 border border-sepia-100 rounded-full py-0.5 shadow-sm">
                 <Sparkles className="w-3 h-3" />
                 <span className="text-[10px] uppercase tracking-widest font-medium">Generation Prompt</span>
               </div>
               <p className="font-serif text-sepia-800 text-lg leading-relaxed">
                 "{activeEvent.age}歲 台灣女生，及肩棕色頭髮，自然淡妝，<br />
                 溫柔暖色的眼神，苗條身形，乾淨真實的肌膚質感，柔和微笑"
               </p>
            </div>
          </div>

          <Timeline 
            events={TIMELINE_DATA} 
            activeId={activeId} 
            onEventVisible={setActiveId} 
          />
          
          {/* Footer in scroll area */}
          <div className="pb-24 text-center opacity-40 text-sm font-serif italic">
            ~ Fin ~
          </div>
        </section>
      </main>

    </div>
  );
}

export default App;