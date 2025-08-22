import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

/**
 * Gets YouTube thumbnail URL for a video
 * Uses hqdefault for reliable availability (480x360)
 */
export function getYouTubeThumbnail(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  // Use hqdefault for better reliability (480x360)
  // This resolution is available for almost all YouTube videos
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Gets high quality YouTube thumbnail URL for a video
 * Uses maxresdefault for best quality (1280x720) - may not always be available
 */
export function getYouTubeThumbnailHQ(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}
