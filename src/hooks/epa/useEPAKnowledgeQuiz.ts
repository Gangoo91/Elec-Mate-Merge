/**
 * useEPAKnowledgeQuiz
 *
 * Hook for generating AI-powered EPA mock knowledge test questions. Two
 * generation modes:
 *
 *   • generateQuiz()       — one-shot (legacy): waits for ALL N questions
 *                            then returns. Safe fallback.
 *   • generateQuizStream() — parallel + SSE: questions stream back as
 *                            each one resolves. First question lands in
 *                            ~1.5 s instead of ~7-10 s. Each question is
 *                            grounded in BS 7671 facets via the RAG.
 *
 * Produces QuizQuestion[] compatible with useQuizSession.startQuiz().
 */

import { useState, useCallback } from 'react';
import {
  supabase,
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
} from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { QuizQuestion } from '@/types/quiz';

interface GenerateOptions {
  qualificationCode: string;
  targetUnitCodes?: string[];
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
  questionCount?: number;
  /** Optional single-AC drill — passes through to the streaming endpoint. */
  targetAcRef?: string;
  targetAcText?: string;
}

interface StreamMeta {
  total: number;
  ragSnippets: number;
  regNumbers: string[];
  targeted: boolean;
}

interface StreamHandlers {
  onMeta?: (meta: StreamMeta) => void;
  onQuestion?: (question: QuizQuestion, index: number, totalReady: number) => void;
  onError?: (error: string, index?: number) => void;
  onDone?: (questions: QuizQuestion[]) => void;
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

        const response = await supabase.functions.invoke('epa-knowledge-quiz', {
          body: {
            qualification_code: options.qualificationCode,
            target_unit_codes: options.targetUnitCodes,
            difficulty: options.difficulty || 'mixed',
            question_count: options.questionCount || 20,
          },
        });

        if (response.error) throw response.error;

        const data = response.data;
        if (!data?.success || !data?.questions?.length) {
          throw new Error(data?.error || 'Failed to generate quiz');
        }

        // Map to QuizQuestion type for compatibility with useQuizSession
        const mapped: QuizQuestion[] = data.questions.map(
          (
            q: {
              question: string;
              options: string[];
              correctAnswer: number;
              explanation: string;
              category: string;
              difficulty: string;
              acRef?: string;
            },
            i: number
          ) => ({
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
        const message = err instanceof Error ? err.message : 'Failed to generate quiz';
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

  /* ─── Streaming generation ────────────────────────────────────────── */

  const generateQuizStream = useCallback(
    async (
      options: GenerateOptions,
      handlers: StreamHandlers = {}
    ): Promise<QuizQuestion[] | null> => {
      setIsGenerating(true);
      setError(null);
      setQuestions([]);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session?.access_token) throw new Error('Not authenticated');

        const url = `${SUPABASE_URL}/functions/v1/epa-knowledge-quiz-stream`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
            apikey: SUPABASE_PUBLISHABLE_KEY,
            Accept: 'text/event-stream',
          },
          body: JSON.stringify({
            qualification_code: options.qualificationCode,
            target_unit_codes: options.targetUnitCodes,
            target_ac_ref: options.targetAcRef,
            target_ac_text: options.targetAcText,
            difficulty: options.difficulty || 'mixed',
            question_count: options.questionCount || 5,
          }),
        });

        if (!response.ok || !response.body) {
          const errText = await response.text().catch(() => '');
          throw new Error(`Stream failed: ${response.status} ${errText.slice(0, 200)}`);
        }

        const collected: (QuizQuestion | null)[] = [];
        const totalRef = { value: options.questionCount || 5 };

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        const handleEvent = (event: string, dataStr: string) => {
          let payload: unknown;
          try {
            payload = JSON.parse(dataStr);
          } catch {
            return;
          }

          if (event === 'meta') {
            const meta = payload as StreamMeta;
            totalRef.value = meta.total;
            collected.length = meta.total;
            handlers.onMeta?.(meta);
          } else if (event === 'question') {
            const { index, question: q } = payload as {
              index: number;
              question: {
                question: string;
                options: string[];
                correctAnswer: number;
                explanation: string;
                category: string;
                difficulty: string;
                acRef?: string;
                regulationRef?: string;
              };
            };
            const mapped: QuizQuestion = {
              id: `epa-kq-${Date.now()}-${index}`,
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              category: q.category,
              difficulty:
                q.difficulty === 'easy'
                  ? 'Beginner'
                  : q.difficulty === 'hard'
                    ? 'Advanced'
                    : 'Intermediate',
              regulation: q.regulationRef || q.acRef,
            };
            collected[index] = mapped;
            const ready = collected.filter((c): c is QuizQuestion => !!c).length;
            handlers.onQuestion?.(mapped, index, ready);
          } else if (event === 'error') {
            const { error: errMsg, index } = payload as { error: string; index?: number };
            handlers.onError?.(errMsg, index);
          } else if (event === 'done') {
            // Finalised below outside the loop
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          let sep: number;
          while ((sep = buffer.indexOf('\n\n')) !== -1) {
            const block = buffer.slice(0, sep);
            buffer = buffer.slice(sep + 2);
            if (!block.trim()) continue;

            let event = 'message';
            const dataLines: string[] = [];
            for (const line of block.split('\n')) {
              if (line.startsWith('event:')) {
                event = line.slice(6).trim();
              } else if (line.startsWith('data:')) {
                dataLines.push(line.slice(5).trimStart());
              }
            }
            if (dataLines.length) handleEvent(event, dataLines.join('\n'));
          }
        }

        // Filter out any holes from failed parallel calls
        const final = collected.filter((c): c is QuizQuestion => !!c);
        setQuestions(final);
        handlers.onDone?.(final);
        if (final.length === 0) {
          throw new Error('No questions generated');
        }
        toast.success(`${final.length} questions ready`);
        return final;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to stream quiz';
        console.error('EPA knowledge quiz stream error:', err);
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
    generateQuizStream,
    isGenerating,
    questions,
    error,
    clearQuestions,
  };
}

export default useEPAKnowledgeQuiz;
