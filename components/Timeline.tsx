import React, { useEffect, useRef } from 'react';
import { TimelineEvent } from '../types';
import BlobImage from './BlobImage';

interface TimelineProps {
  events: TimelineEvent[];
  activeId: string;
  onEventVisible: (id: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, activeId, onEventVisible }) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              onEventVisible(id);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-45% 0px -45% 0px', // Trigger when element is in the middle 10% of screen
        threshold: 0,
      }
    );

    const currentObserver = observer.current;

    itemRefs.current.forEach((node) => {
      if (node) currentObserver.observe(node);
    });

    return () => {
      if (currentObserver) currentObserver.disconnect();
    };
  }, [events, onEventVisible]); 

  const scrollToEvent = (id: string) => {
    const element = itemRefs.current.get(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex flex-col gap-24 py-[50vh] px-6 lg:px-12 max-w-xl mx-auto">
      {events.map((event) => {
        const isActive = activeId === event.id;
        
        return (
          <div
            key={event.id}
            data-id={event.id}
            ref={(el) => {
              if (el) itemRefs.current.set(event.id, el);
              else itemRefs.current.delete(event.id);
            }}
            onClick={() => scrollToEvent(event.id)}
            className={`cursor-pointer transition-all duration-500 ease-out group ${
              isActive ? 'opacity-100 scale-100' : 'opacity-40 scale-95 hover:opacity-60'
            }`}
          >
            <div className="flex flex-col gap-4">
              {/* Mobile Only Image Preview (Hidden on desktop/large screens) */}
              <div className="lg:hidden w-full aspect-[4/5] rounded-sm overflow-hidden border-4 border-white shadow-lg mb-4">
                 <BlobImage src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
              </div>

              <div className="flex items-baseline gap-4">
                 <span className={`font-serif text-5xl md:text-6xl font-bold transition-colors ${
                   isActive ? 'text-sepia-900' : 'text-sepia-300'
                 }`}>
                   {event.age}
                 </span>
                 <span className="text-sm uppercase tracking-[0.2em] text-sepia-800/60 font-medium">
                   Years Old
                 </span>
              </div>
              
              <div className={`h-px w-12 bg-sepia-900/20 transition-all duration-500 ${isActive ? 'w-24 bg-sepia-900' : ''}`} />
              
              <h2 className={`font-serif text-2xl md:text-3xl leading-tight transition-colors ${
                 isActive ? 'text-sepia-900' : 'text-sepia-800/50'
              }`}>
                {event.title}
              </h2>
              
              <p className={`font-sans text-sepia-800/80 leading-relaxed max-w-prose transition-opacity ${
                 isActive ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
              }`}>
                {event.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;