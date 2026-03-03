/**
 * Study tools — quiz, flashcard, and revision tools
 * Extracted from apprentice.ts so both apprentice AND business_ai users can access them.
 *
 * Tools:
 *   - search_study_content
 *   - generate_practice_questions
 *   - get_flashcards
 *   - get_exam_results
 *   - get_toolbox_guides
 *   - run_am2_simulator
 *   - save_quiz_result
 *   - get_quiz_history
 */

import type { UserContext } from '../auth.js';
import { callEdgeFunction } from '../lib/edge-function.js';

export async function searchStudyContent(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.query !== 'string' || args.query.trim().length === 0) {
    throw new Error('Search query is required');
  }

  const supabase = user.supabase;
  const { data, error } = await supabase.rpc('search_study_content', {
    search_query: args.query.trim(),
    filter_course: typeof args.course === 'string' ? args.course : null,
    filter_level: typeof args.level === 'string' ? args.level : null,
  });

  if (error) {
    const result = await callEdgeFunction('multi-source-rag-search', user.jwt, {
      query: args.query.trim(),
      sources: ['training_content'],
      level: typeof args.level === 'string' ? args.level : undefined,
    });
    if (result.error) throw new Error(result.error);
    return result.data;
  }

  return { results: data || [] };
}

export async function generatePracticeQuestions(args: Record<string, unknown>, user: UserContext) {
  const result = await callEdgeFunction('generate-practice-questions', user.jwt, {
    topic: typeof args.topic === 'string' ? args.topic : undefined,
    count: typeof args.count === 'number' && args.count > 0 ? Math.min(args.count, 50) : 10,
    difficulty: typeof args.difficulty === 'string' ? args.difficulty : undefined,
  });

  if (result.error) throw new Error(result.error);
  return result.data;
}

export async function getFlashcards(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('flashcards')
    .select('id, front, back, topic, next_review, ease_factor');

  if (typeof args.topic === 'string') {
    query = query.eq('topic', args.topic);
  }
  if (args.due_only === true) {
    query = query.lte('next_review', new Date().toISOString());
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 20;
  query = query.order('next_review', { ascending: true }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get flashcards: ${error.message}`);

  return { flashcards: data || [] };
}

export async function getExamResults(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  let query = supabase
    .from('exam_results')
    .select('id, exam_type, score, total_questions, passed, completed_at');

  if (typeof args.exam_type === 'string') {
    query = query.eq('exam_type', args.exam_type);
  }

  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 10;
  query = query.order('completed_at', { ascending: false }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get exam results: ${error.message}`);

  return { results: data || [] };
}

export async function getToolboxGuides(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;

  let query = supabase.from('toolbox_guides').select('id, title, topic, content, difficulty');

  if (typeof args.guide_name === 'string' && args.guide_name.length > 0) {
    query = query.ilike('title', `%${args.guide_name}%`);
  }
  if (typeof args.topic === 'string' && args.topic.length > 0) {
    query = query.ilike('topic', `%${args.topic}%`);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get toolbox guides: ${error.message}`);

  return { guides: data || [] };
}

export async function runAm2Simulator(args: Record<string, unknown>, user: UserContext) {
  const result = await callEdgeFunction('am2-simulator', user.jwt, {
    section: typeof args.section === 'string' ? args.section : undefined,
  });

  if (result.error) throw new Error(result.error);

  return {
    ...((result.data as Record<string, unknown>) || {}),
    disclaimer: 'This is a PRACTICE session — not a real assessment.',
  };
}

// ─── New: Quiz Result Tracking ──────────────────────────────────────────

export async function saveQuizResult(args: Record<string, unknown>, user: UserContext) {
  if (typeof args.topic !== 'string' || args.topic.trim().length === 0) {
    throw new Error('topic is required');
  }
  if (typeof args.score !== 'number' || args.score < 0 || args.score > 100) {
    throw new Error('score must be a number between 0 and 100');
  }
  if (typeof args.total_questions !== 'number' || args.total_questions < 1) {
    throw new Error('total_questions must be a positive number');
  }
  if (typeof args.correct_answers !== 'number' || args.correct_answers < 0) {
    throw new Error('correct_answers must be a non-negative number');
  }

  const supabase = user.supabase;

  const { data, error } = await supabase
    .from('quiz_results')
    .insert({
      user_id: user.userId,
      topic: args.topic.trim(),
      score: Math.round(args.score),
      total_questions: args.total_questions,
      correct_answers: args.correct_answers,
      category_breakdown:
        typeof args.category_breakdown === 'object' && args.category_breakdown !== null
          ? args.category_breakdown
          : null,
      difficulty: typeof args.difficulty === 'string' ? args.difficulty : null,
      source: typeof args.source === 'string' ? args.source : 'whatsapp_quiz',
    })
    .select('id')
    .single();

  if (error) throw new Error(`Failed to save quiz result: ${error.message}`);

  return { quiz_result_id: data.id, saved: true };
}

export async function getQuizHistory(args: Record<string, unknown>, user: UserContext) {
  const supabase = user.supabase;
  const limit = typeof args.limit === 'number' && args.limit > 0 ? Math.min(args.limit, 50) : 20;

  let query = supabase
    .from('quiz_results')
    .select(
      'id, topic, score, total_questions, correct_answers, category_breakdown, difficulty, source, created_at'
    );

  if (typeof args.topic === 'string' && args.topic.length > 0) {
    query = query.ilike('topic', `%${args.topic}%`);
  }

  query = query.order('created_at', { ascending: false }).limit(limit);

  const { data, error } = await query;
  if (error) throw new Error(`Failed to get quiz history: ${error.message}`);

  const results = data || [];

  // Calculate trend summary
  const topicScores: Record<string, number[]> = {};
  for (const r of results) {
    const t = r.topic as string;
    if (!topicScores[t]) topicScores[t] = [];
    topicScores[t].push(r.score as number);
  }

  const trends = Object.entries(topicScores).map(([topic, scores]) => {
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    const latest = scores[0];
    const improving = scores.length >= 2 && scores[0] > scores[scores.length - 1];
    return { topic, average_score: avg, latest_score: latest, attempts: scores.length, improving };
  });

  // Identify weak areas (avg below 70%)
  const weakAreas = trends
    .filter((t) => t.average_score < 70)
    .sort((a, b) => a.average_score - b.average_score)
    .map((t) => t.topic);

  return {
    results,
    trends,
    weak_areas: weakAreas,
    total_quizzes: results.length,
  };
}
