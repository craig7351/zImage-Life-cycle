import React, { useState, useEffect } from 'react';
import { TimelineEvent } from '../types';
import BlobImage from './BlobImage';

interface TopCarouselProps {
  events: TimelineEvent[];
  onEventChange?: (event: TimelineEvent) => void;
}

const TopCarousel: React.FC<TopCarouselProps> = ({ events, onEventChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Cycle through images every 2000ms (2 seconds)
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [events.length]);

  // Notify parent when current event changes
  useEffect(() => {
    if (onEventChange) {
      onEventChange(events[currentIndex]);
    }
  }, [currentIndex, events, onEventChange]);

  return (
    <div className="relative w-full h-[32rem] md:h-[40rem] overflow-hidden bg-sepia-900 border-b-4 border-white shadow-sm shrink-0 select-none">
      {/* Render all images stacked to allow smooth crossfade without reloading */}
      {events.map((event, index) => (
        <div
          key={event.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          {/* Background Layer: Blurred and zoomed to fill space with matching colors */}
          <div className="absolute inset-0 overflow-hidden">
            <BlobImage
              src={event.imageUrl}
              className="w-full h-full object-cover blur-2xl opacity-60 scale-110"
              alt=""
            />
          </div>

          {/* Foreground Layer: Contained image to show full content without cropping */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <BlobImage
              src={event.imageUrl}
              className="max-w-full max-h-full w-auto h-auto object-contain drop-shadow-2xl"
              alt={event.title}
            />
          </div>
        </div>
      ))}

      {/* Overlay Gradient & Info */}
      <div className="absolute inset-0 bg-gradient-to-t from-sepia-900/90 via-transparent to-transparent z-20 pointer-events-none" />

      <div className="absolute bottom-0 left-0 w-full p-6 z-30 flex justify-between items-end text-sepia-50">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] opacity-80 mb-1">Time Lapse</div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-bold">
              {events[currentIndex].age}
            </span>
            <span className="font-sans text-sm font-medium opacity-80">Years Old</span>
          </div>
        </div>
        <div className="font-mono text-xs opacity-60">
          {currentIndex + 1} / {events.length}
        </div>
      </div>
    </div>
  );
};

export default TopCarousel;