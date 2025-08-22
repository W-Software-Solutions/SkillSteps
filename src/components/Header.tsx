'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 mb-8 rounded-2xl"
    >
      <div className="flex items-center justify-center space-x-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="p-2 rounded-xl neon-gradient"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <div className="text-center">
          <h1 className="text-4xl font-bold neon-text mb-2">
            SkillSteps
          </h1>
          <p className="text-gray-400 text-lg">
            AI-Powered Learning Roadmaps for Your Success
          </p>
        </div>
      </div>
    </motion.header>
  );
}

