'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function PlanSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Summary Card Skeleton */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 bg-white/10" />
              <Skeleton className="h-4 w-32 bg-white/10" />
            </div>
            <Skeleton className="h-12 w-20 bg-white/10" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-16 w-full bg-white/10 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 bg-white/10" />
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-6 w-24 bg-white/10" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Skeleton */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <Skeleton className="h-6 w-40 bg-white/10" />
          <Skeleton className="h-4 w-64 bg-white/10" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48 bg-white/10" />
                    <Skeleton className="h-4 w-72 bg-white/10" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-12 bg-white/10" />
                    <Skeleton className="h-6 w-20 bg-white/10" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Loading Animation */}
      <div className="text-center py-8">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-indigo-400 font-medium"
        >
          AI is crafting your personalized learning path...
        </motion.div>
      </div>
    </motion.div>
  );
}
