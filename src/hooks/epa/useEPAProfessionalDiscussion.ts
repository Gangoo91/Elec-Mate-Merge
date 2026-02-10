/**
 * useEPAProfessionalDiscussion
 *
 * Hook for AI-powered mock EPA professional discussion sessions.
 * Generates portfolio-based questions and scores apprentice responses.
 */

import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { PortfolioEntry } from '@/types/portfolio';

export interface DiscussionQuestion {
  id: string;
  question: string;
  targetLO: string;
  targetAC?: string;
  portfolioContext: string;
  questionType?: 'technical' | 'reflective' | 'behavioural' | 'synoptic';
  gradeDescriptors: {
    pass: string;
    distinction: string;
  };
}

export interface ResponseScore {
  score: number;
  grade: 'fail' | 'pass' | 'distinction';
  feedback: string;
  strengthsShown: string[];
  areasToImprove: string[];
  acsCovered?: string[];
  subscores: {
    technicalKnowledge: number;
    practicalApplication: number;
    communication: number;
    reflection: number;
    problemSolving: number;
  };
}

export interface DiscussionResponse {
  questionId: string;
  responseText: string;
  score: ResponseScore | null;
  submittedAt: Date;
}

export interface SessionResult {
  sessionId: string;
  questions: DiscussionQuestion[];
  responses: DiscussionResponse[];
  overallScore: number;
  predictedGrade: 'fail' | 'pass' | 'distinction';
  componentScores: {
    technicalKnowledge: number;
    practicalApplication: number;
    communication: number;
    reflection: number;
    problemSolving: number;
  };
  aiFeedback: string;
  improvementSuggestions: string[];
  timeSpentSeconds: number;
}

export function useEPAProfessionalDiscussion() {
  const [questions, setQuestions] = useState<DiscussionQuestion[]>([]);
  const [responses, setResponses] = useState<DiscussionResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const sessionStartRef = useRef<Date | null>(null);
  const qualificationCodeRef = useRef<string>('');

  const generateQuestions = useCallback(
    async (
      portfolioEntries: PortfolioEntry[],
      qualificationCode: string
    ): Promise<DiscussionQuestion[] | null> => {
      setIsGenerating(true);
      setError(null);
      setQuestions([]);
      setResponses([]);
      setCurrentQuestionIndex(0);
      setSessionResult(null);

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error('Not authenticated');
        }

        const portfolio_entries = portfolioEntries.slice(0, 15).map((e) => ({
          title: e.title,
          description: e.description,
          skills: e.skills,
          assessment_criteria: e.assessmentCriteria,
        }));

        qualificationCodeRef.current = qualificationCode;

        const response = await supabase.functions.invoke(
          'epa-professional-discussion',
          {
            body: {
              action: 'generate',
              portfolio_entries,
              qualification_code: qualificationCode,
            },
          }
        );

        if (response.error) throw response.error;

        const data = response.data;
        if (!data?.success || !data?.questions?.length) {
          throw new Error(data?.error || 'Failed to generate questions');
        }

        setQuestions(data.questions);
        sessionStartRef.current = new Date();
        toast.success('Discussion questions ready');
        return data.questions;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to generate questions';
        console.error('EPA discussion generate error:', err);
        setError(message);
        toast.error(message);
        return null;
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  const submitResponse = useCallback(
    async (
      questionId: string,
      responseText: string,
      qualificationCode?: string
    ): Promise<ResponseScore | null> => {
      setIsScoring(true);
      setError(null);

      try {
        const question = questions.find((q) => q.id === questionId);
        if (!question) throw new Error('Question not found');

        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session?.access_token) {
          throw new Error('Not authenticated');
        }

        const response = await supabase.functions.invoke(
          'epa-professional-discussion',
          {
            body: {
              action: 'score',
              question,
              response: responseText,
              qualification_code: qualificationCode,
            },
          }
        );

        if (response.error) throw response.error;

        const data = response.data;
        if (!data?.success) {
          throw new Error(data?.error || 'Failed to score response');
        }

        const score: ResponseScore = {
          score: data.score,
          grade: data.grade,
          feedback: data.feedback,
          strengthsShown: data.strengthsShown || [],
          areasToImprove: data.areasToImprove || [],
          acsCovered: data.acsCovered || [],
          subscores: data.subscores || {
            technicalKnowledge: 0,
            practicalApplication: 0,
            communication: 0,
            reflection: 0,
            problemSolving: 0,
          },
        };

        const newResponse: DiscussionResponse = {
          questionId,
          responseText,
          score,
          submittedAt: new Date(),
        };

        setResponses((prev) => {
          const existing = prev.findIndex((r) => r.questionId === questionId);
          if (existing >= 0) {
            const updated = [...prev];
            updated[existing] = newResponse;
            return updated;
          }
          return [...prev, newResponse];
        });

        return score;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to score response';
        console.error('EPA discussion score error:', err);
        setError(message);
        toast.error(message);
        return null;
      } finally {
        setIsScoring(false);
      }
    },
    [questions]
  );

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return true;
    }
    return false;
  }, [currentQuestionIndex, questions.length]);

  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      return true;
    }
    return false;
  }, [currentQuestionIndex]);

  const finishSession = useCallback(async (): Promise<SessionResult | null> => {
    if (questions.length === 0 || responses.length === 0) return null;

    const scoredResponses = responses.filter((r) => r.score);
    if (scoredResponses.length === 0) return null;

    const scores = scoredResponses.map((r) => r.score!);
    const avgScore = Math.round(
      scores.reduce((sum, s) => sum + s.score, 0) / scores.length
    );

    const avg = (field: keyof ResponseScore['subscores']) =>
      Math.round(
        scores.reduce((sum, s) => sum + s.subscores[field], 0) / scores.length
      );

    const avgTechnicalKnowledge = avg('technicalKnowledge');
    const avgPracticalApplication = avg('practicalApplication');
    const avgCommunication = avg('communication');
    const avgReflection = avg('reflection');
    const avgProblemSolving = avg('problemSolving');

    const predictedGrade: SessionResult['predictedGrade'] =
      avgScore >= 70
        ? 'distinction'
        : avgScore >= 40
          ? 'pass'
          : 'fail';

    const timeSpentSeconds = sessionStartRef.current
      ? Math.round(
          (new Date().getTime() - sessionStartRef.current.getTime()) / 1000
        )
      : 0;

    // Gather improvement suggestions from all responses
    const allImprovements = scores.flatMap((s) => s.areasToImprove);
    const uniqueImprovements = [...new Set(allImprovements)];

    const result: SessionResult = {
      sessionId: `epa-pd-${Date.now()}`,
      questions,
      responses,
      overallScore: avgScore,
      predictedGrade,
      componentScores: {
        technicalKnowledge: avgTechnicalKnowledge,
        practicalApplication: avgPracticalApplication,
        communication: avgCommunication,
        reflection: avgReflection,
        problemSolving: avgProblemSolving,
      },
      aiFeedback: `Overall performance: ${predictedGrade} level. Average score ${avgScore}/100 across ${scoredResponses.length} questions.`,
      improvementSuggestions: uniqueImprovements.slice(0, 6),
      timeSpentSeconds,
    };

    setSessionResult(result);

    // Save to database
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from('epa_mock_sessions').insert({
          user_id: user.id,
          qualification_code: qualificationCodeRef.current || 'unknown',
          session_type: 'professional_discussion',
          status: 'completed',
          questions: questions as unknown as Record<string, unknown>,
          responses: responses.map((r) => ({
            questionId: r.questionId,
            responseText: r.responseText,
            score: r.score,
          })) as unknown as Record<string, unknown>,
          overall_score: avgScore,
          predicted_grade: predictedGrade,
          component_scores: result.componentScores as unknown as Record<
            string,
            unknown
          >,
          ai_feedback: result.aiFeedback,
          improvement_suggestions:
            uniqueImprovements as unknown as Record<string, unknown>,
          started_at: sessionStartRef.current?.toISOString(),
          completed_at: new Date().toISOString(),
          time_spent_seconds: timeSpentSeconds,
        });
      }
    } catch {
      /* non-critical — table may not exist yet */
    }

    toast.success('Discussion session complete');
    return result;
  }, [questions, responses]);

  const reset = useCallback(() => {
    setQuestions([]);
    setResponses([]);
    setCurrentQuestionIndex(0);
    setSessionResult(null);
    setError(null);
    sessionStartRef.current = null;
  }, []);

  return {
    questions,
    responses,
    currentQuestionIndex,
    isGenerating,
    isScoring,
    sessionResult,
    error,
    generateQuestions,
    submitResponse,
    nextQuestion,
    previousQuestion,
    finishSession,
    reset,
    currentQuestion: questions[currentQuestionIndex] || null,
    isSessionActive: questions.length > 0 && !sessionResult,
    answeredCount: responses.filter((r) => r.score).length,
    totalCount: questions.length,
  };
}

export default useEPAProfessionalDiscussion;
