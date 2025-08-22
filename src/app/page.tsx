'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import TopicForm from '@/components/TopicForm';
import PlanResults from '@/components/PlanResults';
import EmptyState from '@/components/EmptyState';
import PlanSkeleton from '@/components/PlanSkeleton';
import { FormData, LearningPlan } from '@/lib/types';

export default function Home() {
  const [plan, setPlan] = useState<LearningPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [lastFormData, setLastFormData] = useState<FormData | null>(null);

  const generatePlan = async (formData: FormData, isRegeneration = false) => {
    if (isRegeneration) {
      setIsRegenerating(true);
    } else {
      setIsLoading(true);
    }

    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate plan');
      }

      const newPlan = await response.json();
      setPlan(newPlan);
      setLastFormData(formData);
      
      toast.success(
        isRegeneration 
          ? 'Learning plan regenerated successfully!' 
          : 'Learning plan generated successfully!'
      );
    } catch (error) {
      console.error('Error generating plan:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to generate learning plan. Please try again.'
      );
    } finally {
      setIsLoading(false);
      setIsRegenerating(false);
    }
  };

  const handleReset = () => {
    setPlan(null);
    setLastFormData(null);
  };

  const handleRegenerate = () => {
    if (lastFormData) {
      generatePlan(lastFormData, true);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-4">
            <TopicForm 
              onSubmit={(data) => generatePlan(data)} 
              isLoading={isLoading || isRegenerating} 
            />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8">
            {isLoading ? (
              <PlanSkeleton />
            ) : plan ? (
              <PlanResults 
                plan={plan} 
                onReset={handleReset}
                onRegenerate={handleRegenerate}
                isRegenerating={isRegenerating}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
