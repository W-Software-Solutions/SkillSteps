import { NextRequest, NextResponse } from 'next/server';
import { generateLearningPlan } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { topic, timeToInvest, skillLevel } = await request.json();

    if (!topic || !timeToInvest || !skillLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    const plan = await generateLearningPlan(topic, timeToInvest, skillLevel);

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error in /api/plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate learning plan' },
      { status: 500 }
    );
  }
}
