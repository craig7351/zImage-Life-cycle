import React, { useState, useEffect } from 'react';
import { Loader2, ImageOff } from 'lucide-react';

interface BlobImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const BlobImage: React.FC<BlobImageProps> = ({ src, className, alt, ...props }) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    let currentUrl: string | null = null;

    const loadImage = async () => {
      try {
        setError(false);
        // Fetch the local file
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`Failed to load image: ${response.statusText}`);
        }
        
        // Convert response to Blob
        const blob = await response.blob();
        
        if (active) {
          // Create an Object URL for the blob
          currentUrl = URL.createObjectURL(blob);
          setBlobUrl(currentUrl);
        }
      } catch (err) {
        console.error(`Error loading image ${src}:`, err);
        if (active) setError(true);
      }
    };

    loadImage();

    // Cleanup: Revoke the Object URL to free memory when component unmounts or src changes
    return () => {
      active = false;
      if (currentUrl) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [src]);

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-sepia-100 text-sepia-800/40 ${className}`}>
        <ImageOff className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs uppercase tracking-widest">Image Missing</span>
      </div>
    );
  }

  if (!blobUrl) {
    return (
      <div className={`flex items-center justify-center bg-sepia-100 text-sepia-800/20 ${className}`}>
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return <img src={blobUrl} alt={alt} className={className} {...props} />;
};

export default BlobImage;