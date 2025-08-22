'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecommendedVideo } from '@/lib/types';
import { ExternalLink, Play } from 'lucide-react';

interface VideoCardProps {
  video: RecommendedVideo;
  index: number;
}

export default function VideoCard({ video, index }: VideoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Card className="glass-card border-white/20 h-full hover:border-indigo-400/50 transition-colors group overflow-hidden">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Thumbnail Section */}
          {video.thumbnailLink && (
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={video.thumbnailLink}
                alt={video.title}
                fill
                className={`object-cover group-hover:scale-105 transition-transform duration-300`}
                onError={() => {
                  // Fallback handling if needed
                }}
              />
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-red-600 rounded-full p-3">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="p-4 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <Play className="w-4 h-4" />
                <span className="text-sm font-medium">Video</span>
              </div>
              <a
                href={video.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <h4 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-indigo-300 transition-colors">
              {video.title}
            </h4>

            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="text-xs bg-white/10 text-gray-300">
                {video.channel}
              </Badge>
            </div>

            <motion.a
              href={video.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm font-medium"
              whileHover={{ x: 5 }}
            >
              Watch Video
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
