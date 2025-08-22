'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LearningPlan } from '@/lib/types';
import VideoCard from './VideoCard';
import { Clock, BookOpen, Target, RotateCcw, RefreshCw, CheckCircle } from 'lucide-react';

interface PlanResultsProps {
  plan: LearningPlan;
  onReset: () => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export default function PlanResults({ plan, onReset, onRegenerate, isRegenerating }: PlanResultsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onReset}
            variant="outline"
            className="glass border-white/20 hover:border-red-400/50 transition-colors"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={onRegenerate}
            disabled={isRegenerating}
            className="neon-gradient hover:opacity-90 transition-opacity"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
            {isRegenerating ? 'Regenerating...' : 'Regenerate'}
          </Button>
        </motion.div>
      </div>

      {/* Summary Card */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl neon-text flex items-center gap-2">
                <Target className="w-6 h-6" />
                {plan.topic}
              </CardTitle>
              <CardDescription className="text-gray-400 mt-2">
                {plan.level} Level • {plan.totalHours} Hours Total
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-indigo-400">
                <Clock className="w-5 h-5" />
                <span className="text-2xl font-bold">{plan.totalHours}h</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 mb-4">{plan.summary}</p>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learning Strategy
            </h4>
            <div className="flex flex-wrap gap-2">
              {plan.strategy.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                    {item}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Learning Modules
          </CardTitle>
          <CardDescription className="text-gray-400">
            {plan.modules.length} modules designed to take you from start to finish
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="space-y-4">
            {plan.modules.map((module, index) => (
              <AccordionItem
                key={index}
                value={`module-${index}`}
                className="glass border border-white/10 rounded-xl px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center justify-between w-full mr-4">
                    <div className="text-left">
                      <h4 className="font-semibold text-white">{module.title}</h4>
                      <p className="text-sm text-gray-400 mt-1">{module.outcome}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {module.hours}h
                      </div>
                      <Badge variant="outline" className="border-indigo-500/30 text-indigo-300">
                        Module {index + 1}
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-6">
                    {/* Checkpoints */}
                    <div>
                      <h5 className="font-medium text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Learning Checkpoints
                      </h5>
                      <div className="grid gap-2">
                        {module.checkpoints.map((checkpoint, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-3 p-3 glass rounded-lg"
                          >
                            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                            <span className="text-gray-300">{checkpoint}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Module Video */}
                    {module.recommendedVideo && (
                      <div>
                        <h5 className="font-medium text-white mb-3">Recommended Video</h5>
                        <VideoCard
                          video={module.recommendedVideo}
                          index={0}
                        />
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

    </motion.div>
  );
}
