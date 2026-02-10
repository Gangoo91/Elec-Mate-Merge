/**
 * useEPAKnowledgeQuiz
 *
 * Hook for generating AI-powered EPA mock knowledge test questions.
 * Produces QuizQuestion[] compatible with useQuizSession.startQuiz().
 */

import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { QuizQuestion } from '@/types/quiz';

interface GenerateOptions {
  qualificationCode: string;
  targetUnitCodes?: string[];
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
  questionCount?: number;
}

// Map edge function difficulty to QuizQuestion difficulty
const DIFFICULTY_MAP: Record<string, QuizQuestion['difficulty']> = {
  easy: 'Beginner',
  medium: 'Intermediate',
  hard: 'Advanced',
};

export function useEPAKnowledgeQuiz() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateQuiz = useCallback(
    async (options: GenerateOptions): Promise<QuizQuestion[] | null> => {
      setIsGenerating(true);
      setError(null);
      setQuestions([]);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error('Not authenticated');
        }

        const response = await supabase.functions.invoke(
          'epa-knowledge-quiz',
          {
            body: {
              qualification_code: options.qualificationCode,
              target_unit_codes: options.targetUnitCodes,
              difficulty: options.difficulty || 'mixed',
              question_count: options.questionCount || 20,
            },
          }
        );

        if (response.error) throw response.error;

        const data = response.data;
        if (!data?.success || !data?.questions?.length) {
          throw new Error(data?.error || 'Failed to generate quiz');
        }

        // Map to QuizQuestion type for compatibility with useQuizSession
        const mapped: QuizQuestion[] = data.questions.map(
          (q: {
            question: string;
            options: string[];
            correctAnswer: number;
            explanation: string;
            category: string;
            difficulty: string;
            acRef?: string;
          }, i: number) => ({
            id: `epa-kq-${Date.now()}-${i}`,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            category: q.category,
            difficulty: DIFFICULTY_MAP[q.difficulty] || 'Intermediate',
            regulation: q.acRef,
          })
        );

        setQuestions(mapped);
        toast.success(`${mapped.length} questions generated`);
        return mapped;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to generate quiz';
        console.error('EPA knowledge quiz error:', err);
        setError(message);
        toast.error(message);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  const clearQuestions = useCallback(() => {
    setQuestions([]);
    setError(null);
  }, []);

  return {
    generateQuiz,
    isGenerating,
    questions,
    error,
    clearQuestions,
  };
}

export default useEPAKnowledgeQuiz;
