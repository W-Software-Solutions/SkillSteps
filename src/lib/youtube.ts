import { google } from 'googleapis';
import { getYouTubeVideoId } from './utils';
import { RecommendedVideo, LearningPlan } from './types';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

export interface VideoVerificationResult {
  isValid: boolean;
  isPublic: boolean;
  title?: string;
  channelTitle?: string;
  duration?: string;
  publishedAt?: string;
  viewCount?: string;
  error?: string;
}

/**
 * Verifies if a YouTube video exists, is public, and accessible
 */
export async function verifyYouTubeVideo(url: string): Promise<VideoVerificationResult> {
  try {
    const videoId = getYouTubeVideoId(url);
    
    if (!videoId) {
      return {
        isValid: false,
        isPublic: false,
        error: 'Invalid YouTube URL or video ID'
      };
    }

    const response = await youtube.videos.list({
      part: ['snippet', 'status', 'contentDetails', 'statistics'],
      id: [videoId]
    });

    if (!response.data.items || response.data.items.length === 0) {
      return {
        isValid: false,
        isPublic: false,
        error: 'Video not found'
      };
    }

    const video = response.data.items[0];
    const isPublic = video.status?.privacyStatus === 'public';
    const isEmbeddable = video.status?.embeddable !== false;
    
    // Convert ISO 8601 duration to readable format
    const duration = convertISO8601Duration(video.contentDetails?.duration || '');

    return {
      isValid: true,
      isPublic: isPublic && isEmbeddable,
      title: video.snippet?.title || undefined,
      channelTitle: video.snippet?.channelTitle || undefined,
      duration: duration,
      publishedAt: video.snippet?.publishedAt || undefined,
      viewCount: video.statistics?.viewCount || undefined,
      error: !isPublic ? 'Video is not public' : !isEmbeddable ? 'Video is not embeddable' : undefined
    };

  } catch (error) {
    console.error('Error verifying YouTube video:', error);
    return {
      isValid: false,
      isPublic: false,
      error: `API Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

/**
 * Verifies multiple YouTube videos in batch (max 50 per request due to API limits)
 */
export async function verifyYouTubeVideos(urls: string[]): Promise<(VideoVerificationResult & { url: string })[]> {
  const results: (VideoVerificationResult & { url: string })[] = [];
  
  // YouTube API allows max 50 video IDs per request
  const batchSize = 50;
  
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await verifyVideoBatch(batch);
    results.push(...batchResults);
  }

  return results;
}

/**
 * Verifies a batch of YouTube videos (up to 50)
 */
async function verifyVideoBatch(urls: string[]): Promise<(VideoVerificationResult & { url: string })[]> {
  try {
    const videoIds: string[] = [];
    const urlToIdMap = new Map<string, string>();
    
    // Extract video IDs and create mapping
    urls.forEach(url => {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        videoIds.push(videoId);
        urlToIdMap.set(videoId, url);
      }
    });
    
    if (videoIds.length === 0) {
      return urls.map(url => ({
        url,
        isValid: false,
        isPublic: false,
        error: 'Invalid YouTube URL'
      }));
    }

    const response = await youtube.videos.list({
      part: ['snippet', 'status', 'contentDetails', 'statistics'],
      id: videoIds
    });

    const results: (VideoVerificationResult & { url: string })[] = [];
    
    // Process each requested video
    videoIds.forEach(videoId => {
      const url = urlToIdMap.get(videoId)!;
      const video = response.data.items?.find(item => item.id === videoId);
      
      if (!video) {
        results.push({
          url,
          isValid: false,
          isPublic: false,
          error: 'Video not found or unavailable'
        });
        return;
      }
      
      const isPublic = video.status?.privacyStatus === 'public';
      const isEmbeddable = video.status?.embeddable !== false;
      const duration = convertISO8601Duration(video.contentDetails?.duration || '');
      
      results.push({
        url,
        isValid: true,
        isPublic: isPublic && isEmbeddable,
        title: video.snippet?.title || undefined,
        channelTitle: video.snippet?.channelTitle || undefined,
        duration: duration,
        publishedAt: video.snippet?.publishedAt || undefined,
        viewCount: video.statistics?.viewCount || undefined,
        error: !isPublic ? 'Video is private or unlisted' : !isEmbeddable ? 'Video embedding disabled' : undefined
      });
    });
    
    return results;
    
  } catch (error) {
    console.error('Error verifying video batch:', error);
    return urls.map(url => ({
      url,
      isValid: false,
      isPublic: false,
      error: `API Error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }));
  }
}

/**
 * Converts ISO 8601 duration (PT4M13S) to readable format (4:13)
 */
function convertISO8601Duration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

/**
 * Searches YouTube for a video based on query and returns the first result
 */
export async function searchYouTubeVideo(query: string): Promise<RecommendedVideo | null> {
  try {
    const response = await youtube.search.list({
      part: ['snippet'],
      q: query,
      type: ['video'],
      maxResults: 1,
      order: 'relevance'
    });

    if (!response.data.items || response.data.items.length === 0) {
      console.log(`No YouTube results found for query: "${query}"`);
      return null;
    }

    const video = response.data.items[0];
    const videoId = video.id?.videoId;
    
    if (!videoId) {
      console.log(`No video ID found for query: "${query}"`);
      return null;
    }

    return {
      title: video.snippet?.title || 'Unknown Title',
      videoLink: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnailLink: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      channel: video.snippet?.channelTitle || 'Unknown Channel'
    };

  } catch (error) {
    console.error(`Error searching YouTube for query "${query}":`, error);
    return null;
  }
}

/**
 * Enriches a learning plan by fetching real YouTube videos for each module query
 */
export async function enrichLearningPlanWithVideos(plan: LearningPlan): Promise<LearningPlan> {
  try {
    console.log(`Enriching learning plan with YouTube videos for ${plan.modules.length} modules...`);
    
    const enrichedModules = await Promise.all(
      plan.modules.map(async (module) => {
        const video = await searchYouTubeVideo(module.query);
        return {
          ...module,
          recommendedVideo: video || undefined
        };
      })
    );

    const successfulVideos = enrichedModules.filter(m => m.recommendedVideo).length;
    console.log(`Successfully found ${successfulVideos}/${plan.modules.length} videos`);

    return {
      ...plan,
      modules: enrichedModules
    };

  } catch (error) {
    console.error('Error enriching learning plan with videos:', error);
    // Return original plan if enrichment fails
    return plan;
  }
}
