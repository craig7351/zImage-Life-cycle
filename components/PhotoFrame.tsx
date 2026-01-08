import React, { useState, useEffect } from 'react';
import { TimelineEvent, EraContext } from '../types';
import { getEraContext } from '../services/gemini';
import { Sparkles, Loader2, Calendar, User } from 'lucide-react';
import BlobImage from './BlobImage';

interface PhotoFrameProps {
  event: TimelineEvent;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ event }) => {
  const [eraContext, setEraContext] = useState<EraContext | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false);

  // Reset state when event changes
  useEffect(() => {
    setEraContext(null);
    setHasFetched(false);
  }, [event.id]);

  const handleMagicContext = async () => {
    setLoading(true);
    const context = await getEraContext(event.year, event.age);
    setEraContext(context);
    setLoading(false);
    setHasFetched(true);
  };

  return (
    <div className="h-full flex flex-col justify-center p-6 lg:p-12 transition-all duration-700 ease-in-out">
      <div className="relative w-full max-w-md mx-auto aspect-[4/5] shadow-2xl rounded-sm overflow-hidden border-[12px] border-white bg-white group transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer">
        <BlobImage 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover filter sepia-[0.1] contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Overlay info on hover (desktop) or always (mobile) if needed */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <p className="font-serif italic text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{event.title}</p>
        </div>
      </div>

      <div className="mt-8 max-w-md mx-auto w-full space-y-4">
        <div className="flex items-center justify-between text-sepia-800 border-b border-sepia-200 pb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 opacity-70" />
            <span className="font-serif text-2xl font-bold">{event.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 opacity-70" />
            <span className="font-sans text-lg font-medium">{event.age} Years Old</span>
          </div>
        </div>

        {/* AI Context Section */}
        <div className="min-h-[120px]">
           {!hasFetched ? (
             <div className="flex flex-col items-center justify-center h-full py-4 text-center">
               <p className="text-sepia-800/60 text-sm mb-3">
                 Curious about the world in {event.year}?
               </p>
               <button
                onClick={handleMagicContext}
                disabled={loading}
                className="flex items-center gap-2 px-5 py-2.5 bg-sepia-800 text-sepia-50 rounded-full hover:bg-sepia-900 transition-colors shadow-md disabled:opacity-50"
               >
                 {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                 <span>Recall the Era</span>
               </button>
             </div>
           ) : (
             <div className="bg-white/50 p-4 rounded-lg border border-sepia-100 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {eraContext ? (
                  <>
                    <p className="font-serif text-sepia-900 leading-relaxed text-sm mb-2">
                      "{eraContext.summary}"
                    </p>
                    <div className="flex gap-2 items-start mt-3">
                      <span className="bg-sepia-200 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-bold text-sepia-800 mt-1">Fact</span>
                      <p className="text-xs text-sepia-800/80 italic">{eraContext.highlight}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-red-400 text-sm">Could not retrieve memories. Check API configuration.</p>
                )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default PhotoFrame;