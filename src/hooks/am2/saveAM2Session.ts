/**
 * saveAM2Session
 *
 * Shared helper to insert a completed simulation session into am2_mock_sessions.
 * Used by all 4 simulators: safe isolation, testing, fault finding, knowledge.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

// The app's own signed-in client. A second client built here had no auth
// storage, so on the native app (session in Capacitor Preferences) every
// request went out signed-out and RLS silently returned nothing / refused saves.
const db = supabase as unknown as SupabaseClient;

export interface AM2SessionRecord {
  sessionType:
    'safe_working' | 'safe_isolation' | 'testing_sequence' | 'fault_diagnosis' | 'knowledge_test';
  overallScore: number;
  componentScores?: Record<string, unknown>;
  quizQuestions?: unknown[];
  quizAnswers?: unknown[];
  sessionData?: Record<string, unknown>;
  timeSpentSeconds?: number;
  startedAt?: string;
}

export async function saveAM2Session(userId: string, session: AM2SessionRecord): Promise<boolean> {
  try {
    const { error } = await db.from('am2_mock_sessions').insert({
      user_id: userId,
      session_type: session.sessionType,
      status: 'completed',
      overall_score: session.overallScore,
      component_scores: session.componentScores ?? null,
      quiz_questions: session.quizQuestions ?? null,
      quiz_answers: session.quizAnswers ?? null,
      session_data: session.sessionData ?? null,
      time_spent_seconds: session.timeSpentSeconds ?? null,
      started_at: session.startedAt ?? null,
      completed_at: new Date().toISOString(),
    });

    if (error) {
      console.error('[saveAM2Session] Insert failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[saveAM2Session] Unexpected error:', err);
    return false;
  }
}
