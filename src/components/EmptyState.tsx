'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <Card className="glass-card border-white/20">
        <CardContent className="p-12">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="mb-6"
          >
            <div className="w-24 h-24 mx-auto rounded-full neon-gradient flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h3 className="text-2xl font-bold neon-text mb-4">
            Ready to Start Learning?
          </h3>
          
          <p className="text-gray-400 text-lg mb-6 max-w-md mx-auto">
            Fill out the form above to generate your personalized learning roadmap powered by AI
          </p>

          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex items-center justify-center gap-2 text-indigo-400"
          >
            <span className="text-sm">Get started</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
