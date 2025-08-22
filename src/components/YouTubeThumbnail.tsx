'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getYouTubeThumbnail, getYouTubeThumbnailHQ } from '@/lib/utils';

interface YouTubeThumbnailProps {
  videoUrl: string;
  title: string;
  className?: string;
}

export default function YouTubeThumbnail({ videoUrl, title, className }: YouTubeThumbnailProps) {
  const [imageError, setImageError] = useState(false);
  const [useHighQuality, setUseHighQuality] = useState(true);
  
  const hqThumbnail = getYouTubeThumbnailHQ(videoUrl);
  const standardThumbnail = getYouTubeThumbnail(videoUrl);
  
  // Determine which thumbnail to use
  const thumbnailUrl = useHighQuality && !imageError ? hqThumbnail : standardThumbnail;
  
  if (!thumbnailUrl) {
    return (
      <div className={`bg-gray-800 flex items-center justify-center ${className}`}>
        <span className="text-gray-400 text-sm">No thumbnail</span>
      </div>
    );
  }

  return (
    <Image
      src={thumbnailUrl}
      alt={title}
      fill
      className={`object-cover ${className}`}
      onError={() => {
        if (useHighQuality) {
          // Try standard quality
          setUseHighQuality(false);
        } else {
          // Both failed
          setImageError(true);
        }
      }}
      onLoad={() => {
        // Reset error state on successful load
        setImageError(false);
      }}
    />
  );
}
