'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormData, SkillLevel } from '@/lib/types';
import { BookOpen, Clock, TrendingUp } from 'lucide-react';

interface TopicFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
}

export default function TopicForm({ onSubmit, isLoading }: TopicFormProps) {
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    timeToInvest: 10,
    skillLevel: 'Beginner'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.topic.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card border-white/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl neon-text flex items-center justify-center gap-2">
            <BookOpen className="w-6 h-6" />
            Create Your Learning Path
          </CardTitle>
          <CardDescription className="text-gray-400">
            Tell us what you want to learn and we&apos;ll create a personalized roadmap for you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                What do you want to learn?
              </label>
              <Input
                placeholder="e.g., React, Machine Learning, Photography..."
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="glass border-white/20 focus:border-indigo-400 transition-colors"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time to Invest (hours)
                </label>
                <Input
                  type="number"
                  min="1"
                  max="500"
                  value={formData.timeToInvest}
                  onChange={(e) => setFormData({ ...formData, timeToInvest: parseInt(e.target.value) || 10 })}
                  className="glass border-white/20 focus:border-indigo-400 transition-colors"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Your Skill Level
                </label>
                <Select
                  value={formData.skillLevel}
                  onValueChange={(value: SkillLevel) => setFormData({ ...formData, skillLevel: value })}
                  disabled={isLoading}
                >
                  <SelectTrigger className="glass border-white/20 focus:border-indigo-400 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass border-white/20 bg-gray-900/90">
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={!formData.topic.trim() || isLoading}
                className="w-full neon-gradient hover:opacity-90 transition-opacity text-white font-semibold py-3 rounded-xl"
              >
                {isLoading ? 'Generating Your Path...' : 'Generate Learning Path'}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
