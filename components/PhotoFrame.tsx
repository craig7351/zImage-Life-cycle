import React, { useState, useEffect } from 'react';
import { TimelineEvent } from '../types';
import { Calendar, User } from 'lucide-react';
import BlobImage from './BlobImage';

interface PhotoFrameProps {
  event: TimelineEvent;
}

const PhotoFrame: React.FC<PhotoFrameProps> = ({ event }) => {
  // Reset state when event changes
  useEffect(() => {
  }, [event.id]);

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

        {/* AI Context Section Removed */}
      </div>
    </div>
  );
};

export default PhotoFrame;