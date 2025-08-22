export interface LearningPlan {
  topic: string;
  level: string;
  totalHours: number;
  summary: string;
  strategy: string[];
  modules: Module[];
}

export interface Module {
  title: string;
  hours: number;
  outcome: string;
  checkpoints: string[];
  query: string;
  recommendedVideo?: RecommendedVideo;
}

export interface RecommendedVideo {
  title: string;
  videoLink: string;
  thumbnailLink: string;
  channel: string;
}

export interface FormData {
  topic: string;
  timeToInvest: number;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';
