import { GoogleGenerativeAI } from '@google/generative-ai';
import { LearningPlan } from './types';
import { enrichLearningPlanWithVideos } from './youtube';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateLearningPlan(
  topic: string,
  timeToInvest: number,
  skillLevel: string
): Promise<LearningPlan> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an expert learning designer. Based on the user's topic "${topic}", ${timeToInvest} hours of time to invest, and ${skillLevel} skill level, generate a realistic learning plan in **strict JSON** format.

The plan should have 4–8 modules whose hours add up to ${timeToInvest} hours total. Each module should include a YouTube search query that will help find the best educational video for that specific topic.

Return ONLY valid JSON in this exact schema:
{
  "topic": "${topic}",
  "level": "${skillLevel}",
  "totalHours": ${timeToInvest},
  "summary": "A brief overview of what the learner will achieve",
  "strategy": ["Key learning strategy 1", "Key learning strategy 2", "Key learning strategy 3"],
  "modules": [
    {
      "title": "Module title",
      "hours": 10,
      "outcome": "What the learner will achieve after this module",
      "checkpoints": ["Checkpoint 1", "Checkpoint 2", "Checkpoint 3"],
      "query": "Specific YouTube search query to find the best video for this module topic"
    }
  ]
}
}

Make sure each module has a well-crafted search query that will help find educational videos on that specific topic. Search queries should be specific and educational in nature.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const parsedPlan = JSON.parse(jsonMatch[0]) as LearningPlan;
    
    // Enrich with real YouTube videos using search queries
    const enrichedPlan = await enrichLearningPlanWithVideos(parsedPlan);
    
    return enrichedPlan;
  } catch (error) {
    console.error('Error generating learning plan:', error);
    throw new Error('Failed to generate learning plan');
  }
}
