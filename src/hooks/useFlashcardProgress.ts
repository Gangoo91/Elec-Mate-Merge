import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface FlashcardProgress {
  id: string;
  flashcard_set_id: string;
  card_id: string;
  mastery_level: number;
  correct_count: number;
  incorrect_count: number;
  last_reviewed_at: string | null;
  next_review_at: string | null;
}

interface SetProgress {
  setId: string;
  totalCards: number;
  masteredCards: number;
  progressPercentage: number;
  lastStudied: string | null;
}

export function useFlashcardProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<FlashcardProgress[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all progress for the user
  const fetchProgress = useCallback(async () => {
    if (!user) {
      setProgress([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_flashcard_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setProgress(data || []);
    } catch (error) {
      console.error('Error fetching flashcard progress:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Get progress for a specific set
  const getSetProgress = useCallback((setId: string, totalCards: number): SetProgress => {
    const setCards = progress.filter(p => p.flashcard_set_id === setId);
    const masteredCards = setCards.filter(p => p.mastery_level >= 3).length;
    const lastStudied = setCards.reduce((latest, p) => {
      if (!p.last_reviewed_at) return latest;
      if (!latest) return p.last_reviewed_at;
      return new Date(p.last_reviewed_at) > new Date(latest) ? p.last_reviewed_at : latest;
    }, null as string | null);

    return {
      setId,
      totalCards,
      masteredCards,
      progressPercentage: totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0,
      lastStudied
    };
  }, [progress]);

  // Update progress after answering a card
  const updateCardProgress = useCallback(async (
    setId: string,
    cardId: string,
    correct: boolean
  ) => {
    if (!user) return;

    const existing = progress.find(
      p => p.flashcard_set_id === setId && p.card_id === cardId
    );

    // Calculate spaced repetition interval
    const calculateNextReview = (masteryLevel: number): Date => {
      const intervals = [1, 3, 7, 14, 30, 60]; // days
      const days = intervals[Math.min(masteryLevel, intervals.length - 1)];
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + days);
      return nextDate;
    };

    if (existing) {
      // Update existing progress
      const newMastery = correct
        ? Math.min(existing.mastery_level + 1, 5)
        : Math.max(existing.mastery_level - 1, 0);

      const { error } = await supabase
        .from('user_flashcard_progress')
        .update({
          mastery_level: newMastery,
          correct_count: existing.correct_count + (correct ? 1 : 0),
          incorrect_count: existing.incorrect_count + (correct ? 0 : 1),
          last_reviewed_at: new Date().toISOString(),
          next_review_at: calculateNextReview(newMastery).toISOString()
        })
        .eq('id', existing.id);

      if (error) console.error('Error updating progress:', error);
    } else {
      // Create new progress entry
      const { error } = await supabase
        .from('user_flashcard_progress')
        .insert({
          user_id: user.id,
          flashcard_set_id: setId,
          card_id: cardId,
          mastery_level: correct ? 1 : 0,
          correct_count: correct ? 1 : 0,
          incorrect_count: correct ? 0 : 1,
          last_reviewed_at: new Date().toISOString(),
          next_review_at: calculateNextReview(correct ? 1 : 0).toISOString()
        });

      if (error) console.error('Error creating progress:', error);
    }

    // Refresh progress
    fetchProgress();
  }, [user, progress, fetchProgress]);

  // Get cards due for review (spaced repetition)
  const getDueCards = useCallback((setId: string): string[] => {
    const now = new Date();
    return progress
      .filter(p =>
        p.flashcard_set_id === setId &&
        p.next_review_at &&
        new Date(p.next_review_at) <= now
      )
      .map(p => p.card_id);
  }, [progress]);

  return {
    progress,
    loading,
    getSetProgress,
    updateCardProgress,
    getDueCards,
    refetch: fetchProgress
  };
}
