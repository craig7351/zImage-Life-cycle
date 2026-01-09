import React, { useState, useEffect } from 'react';
import { Loader2, ImageOff } from 'lucide-react';

interface BlobImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const BlobImage: React.FC<BlobImageProps> = ({ src, className, alt, ...props }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(false);
    setLoading(true);
  }, [src]);

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-sepia-100 text-sepia-800/40 ${className}`}>
        <ImageOff className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs uppercase tracking-widest">Image Missing</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-sepia-100/50">
          <Loader2 className="w-6 h-6 animate-spin text-sepia-800/20" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default BlobImage;