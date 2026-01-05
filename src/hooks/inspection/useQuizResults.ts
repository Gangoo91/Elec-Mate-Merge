import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { QuizResult } from '@/types/quiz';
import { Json } from '@/integrations/supabase/types';

export interface QuizResultData {
  id: string;
  assessment_id: string;
  session_id: string;
  score: number;
  total_questions: number;
  percentage: number;
  time_spent: number;
  correct_answers: number;
  incorrect_answers: number;
  category_breakdown: Json;
  question_results: Json;
  completed_at: string;
}

export interface PerformanceByCategory {
  subject: string;
  score: number;
  color: string;
}

export const useQuizResults = () => {
  const [results, setResults] = useState<QuizResultData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuizResults = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setResults(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quiz results');
    } finally {
      setIsLoading(false);
    }
  };

  const saveQuizResult = async (result: QuizResult & { assessmentId: string; sessionId: string }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('quiz_results')
        .insert({
          user_id: user.id,
          assessment_id: result.assessmentId,
          session_id: result.sessionId,
          score: result.score,
          total_questions: result.totalQuestions,
          percentage: result.percentage,
          time_spent: result.timeSpent,
          correct_answers: result.correctAnswers,
          incorrect_answers: result.incorrectAnswers,
          category_breakdown: result.categoryBreakdown as Json,
          question_results: [] as Json,
        });

      if (error) throw error;
      
      // Refresh results after saving
      await fetchQuizResults();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save quiz result');
      throw err;
    }
  };

  const getPerformanceByCategory = (): PerformanceByCategory[] => {
    if (results.length === 0) {
      return [
        { subject: 'Regulations', score: 0, color: 'bg-gray-500' },
        { subject: 'Safety', score: 0, color: 'bg-gray-500' },
        { subject: 'Testing', score: 0, color: 'bg-gray-500' },
        { subject: 'Design', score: 0, color: 'bg-gray-500' }
      ];
    }

    // Aggregate performance by category
    const categoryTotals: Record<string, { totalScore: number; count: number }> = {};
    
    results.forEach(result => {
      if (result.category_breakdown && typeof result.category_breakdown === 'object') {
        Object.entries(result.category_breakdown as Record<string, any>).forEach(([category, data]) => {
          if (!categoryTotals[category]) {
            categoryTotals[category] = { totalScore: 0, count: 0 };
          }
          if (data && typeof data === 'object' && 'correct' in data && 'total' in data) {
            const categoryPercentage = (data.correct / data.total) * 100;
            categoryTotals[category].totalScore += categoryPercentage;
            categoryTotals[category].count += 1;
          }
        });
      }
    });

    // Calculate average scores and assign colors
    const categories = ['Regulations', 'Safety', 'Testing', 'Design'];
    const colors = ['bg-green-500', 'bg-blue-500', 'bg-orange-500', 'bg-purple-500'];

    return categories.map((category, index) => {
      const total = categoryTotals[category];
      const averageScore = total ? Math.round(total.totalScore / total.count) : 0;
      
      return {
        subject: category,
        score: averageScore,
        color: colors[index]
      };
    });
  };

  const getOverallStats = () => {
    if (results.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        totalTimeSpent: 0,
        bestScore: 0
      };
    }

    const totalQuizzes = results.length;
    const averageScore = Math.round(results.reduce((sum, result) => sum + result.percentage, 0) / totalQuizzes);
    const totalTimeSpent = results.reduce((sum, result) => sum + result.time_spent, 0);
    const bestScore = Math.max(...results.map(result => result.percentage));

    return {
      totalQuizzes,
      averageScore,
      totalTimeSpent,
      bestScore
    };
  };

  useEffect(() => {
    fetchQuizResults();
  }, []);

  return {
    results,
    isLoading,
    error,
    saveQuizResult,
    getPerformanceByCategory,
    getOverallStats,
    refreshResults: fetchQuizResults
  };
};