import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface AssessmentScore {
  id: string;
  assessment_type: string;
  assessment_id: string | null;
  score: number;
  max_score: number;
  percentage: number;
  time_taken_seconds: number | null;
  details: Record<string, unknown>;
  completed_at: string;
}

interface AssessmentStats {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
  recentScores: AssessmentScore[];
}

export function useAssessmentScores() {
  const { user } = useAuth();
  const [scores, setScores] = useState<AssessmentScore[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all scores for the user
  const fetchScores = useCallback(async () => {
    if (!user) {
      setScores([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_assessment_scores')
        .select('*')
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setScores(data || []);
    } catch (error) {
      console.error('Error fetching assessment scores:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  // Save a new score
  const saveScore = useCallback(async (
    assessmentType: string,
    score: number,
    maxScore: number,
    options?: {
      assessmentId?: string;
      timeTakenSeconds?: number;
      details?: Record<string, unknown>;
    }
  ) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('user_assessment_scores')
        .insert({
          user_id: user.id,
          assessment_type: assessmentType,
          assessment_id: options?.assessmentId || null,
          score,
          max_score: maxScore,
          time_taken_seconds: options?.timeTakenSeconds || null,
          details: options?.details || {}
        })
        .select()
        .single();

      if (error) throw error;

      // Refresh scores
      fetchScores();
      return data;
    } catch (error) {
      console.error('Error saving assessment score:', error);
      return null;
    }
  }, [user, fetchScores]);

  // Get stats for a specific assessment type
  const getAssessmentStats = useCallback((
    assessmentType: string,
    assessmentId?: string
  ): AssessmentStats => {
    const filtered = scores.filter(s =>
      s.assessment_type === assessmentType &&
      (!assessmentId || s.assessment_id === assessmentId)
    );

    if (filtered.length === 0) {
      return {
        totalAttempts: 0,
        averageScore: 0,
        bestScore: 0,
        recentScores: []
      };
    }

    const totalAttempts = filtered.length;
    const averageScore = Math.round(
      filtered.reduce((sum, s) => sum + s.percentage, 0) / totalAttempts
    );
    const bestScore = Math.max(...filtered.map(s => s.percentage));
    const recentScores = filtered.slice(0, 5);

    return {
      totalAttempts,
      averageScore,
      bestScore,
      recentScores
    };
  }, [scores]);

  // Get best score for display
  const getBestScore = useCallback((
    assessmentType: string,
    assessmentId?: string
  ): number | null => {
    const stats = getAssessmentStats(assessmentType, assessmentId);
    return stats.totalAttempts > 0 ? stats.bestScore : null;
  }, [getAssessmentStats]);

  // Check if user has completed an assessment
  const hasCompleted = useCallback((
    assessmentType: string,
    assessmentId?: string,
    minPercentage = 70
  ): boolean => {
    return scores.some(s =>
      s.assessment_type === assessmentType &&
      (!assessmentId || s.assessment_id === assessmentId) &&
      s.percentage >= minPercentage
    );
  }, [scores]);

  return {
    scores,
    loading,
    saveScore,
    getAssessmentStats,
    getBestScore,
    hasCompleted,
    refetch: fetchScores
  };
}
