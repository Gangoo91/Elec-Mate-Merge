import { useCallback, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

/* ==========================================================================
   useAuthorQuiz — calls ai-author-quiz to generate a citation-grade quiz.
   Non-streaming JSON response. Persists everything via the edge function;
   the frontend just shows the result.
   ========================================================================== */

export interface AuthorQuizQuestion {
  question_text: string;
  options: string[];
  correct_answer_index: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category?: string;
  ac_ref?: string;
  points?: number;
  bs7671_citations?: Array<{ ref: string; regulation_id?: string; snippet?: string }>;
}

export interface AuthorQuizResult {
  quiz_id: string;
  questions_count: number;
  citations_count: number;
  quiz: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    time_limit_minutes: number;
    pass_mark: number;
    is_published: boolean;
  };
  questions: AuthorQuizQuestion[];
  meta: {
    facets_pulled: number;
    ac_targets_count: number;
    weak_ac_hint_count: number;
  };
}

export interface UseAuthorQuiz {
  status: 'idle' | 'loading' | 'done' | 'error';
  result: AuthorQuizResult | null;
  error: string | null;
  author: (input: AuthorQuizInput) => Promise<void>;
  reset: () => void;
}

export interface AuthorQuizInput {
  college_student_id?: string;
  cohort_id?: string;
  ac_codes?: string[];
  topic?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  count?: number;
  title?: string;
  time_limit_minutes?: number;
  pass_mark?: number;
  is_homework?: boolean;
  due_date?: string;
  lesson_plan_id?: string;
  publish?: boolean;
}

export function useAuthorQuiz(): UseAuthorQuiz {
  const [status, setStatus] = useState<UseAuthorQuiz['status']>('idle');
  const [result, setResult] = useState<AuthorQuizResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setResult(null);
    setError(null);
  }, []);

  const author = useCallback<UseAuthorQuiz['author']>(async (input) => {
    reset();
    setStatus('loading');
    try {
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      if (!token) throw new Error('Not signed in');
      const res = await fetch(
        'https://jtwygbeceundfgnkirof.supabase.co/functions/v1/ai-author-quiz',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 240)}`);
      }
      const json = (await res.json()) as AuthorQuizResult;
      setResult(json);
      setStatus('done');
    } catch (e) {
      setError((e as Error).message ?? 'Could not author quiz');
      setStatus('error');
    }
  }, [reset]);

  return { status, result, error, author, reset };
}
