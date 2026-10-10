import { useState, useEffect, useCallback, useRef } from 'react';
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

/** One card the schedule wants back, and the deck it belongs to. */
export interface DueCard {
  setId: string;
  cardId: string;
  dueAt: string;
  masteryLevel: number;
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
  /**
   * The latest rows, updated the moment an answer is given (10 Oct 2026).
   * Answers used to be worked out from `progress` as it stood at the last
   * render, refreshed only by a refetch after the write: a card answered twice
   * in quick succession (missed, then right when it came back) was computed
   * from stale numbers, and a brand-new card's second answer tried a second
   * INSERT and hit the unique key.
   */
  const latest = useRef<FlashcardProgress[]>([]);
  latest.current = progress;

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
  const getSetProgress = useCallback(
    (setId: string, totalCards: number): SetProgress => {
      const setCards = progress.filter((p) => p.flashcard_set_id === setId);
      const masteredCards = setCards.filter((p) => p.mastery_level >= 3).length;
      const lastStudied = setCards.reduce(
        (latest, p) => {
          if (!p.last_reviewed_at) return latest;
          if (!latest) return p.last_reviewed_at;
          return new Date(p.last_reviewed_at) > new Date(latest) ? p.last_reviewed_at : latest;
        },
        null as string | null
      );

      return {
        setId,
        totalCards,
        masteredCards,
        progressPercentage: totalCards > 0 ? Math.round((masteredCards / totalCards) * 100) : 0,
        lastStudied,
      };
    },
    [progress]
  );

  // Update progress after answering a card
  const updateCardProgress = useCallback(
    async (setId: string, cardId: string, correct: boolean) => {
      if (!user) return;

      const existing = latest.current.find(
        (p) => p.flashcard_set_id === setId && p.card_id === cardId
      );

      // Calculate spaced repetition interval
      const calculateNextReview = (masteryLevel: number): Date => {
        const intervals = [1, 3, 7, 14, 30, 60]; // days
        const days = intervals[Math.min(masteryLevel, intervals.length - 1)];
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + days);
        return nextDate;
      };

      const mastery = existing
        ? correct
          ? Math.min(existing.mastery_level + 1, 5)
          : Math.max(existing.mastery_level - 1, 0)
        : correct
          ? 1
          : 0;
      const fields = {
        mastery_level: mastery,
        correct_count: (existing?.correct_count ?? 0) + (correct ? 1 : 0),
        incorrect_count: (existing?.incorrect_count ?? 0) + (correct ? 0 : 1),
        last_reviewed_at: new Date().toISOString(),
        next_review_at: calculateNextReview(mastery).toISOString(),
      };

      // Apply it locally at once, so the next answer builds on this one.
      const row = {
        ...(existing ?? {
          id: `local-${setId}-${cardId}`,
          user_id: user.id,
          flashcard_set_id: setId,
          card_id: cardId,
        }),
        ...fields,
      } as FlashcardProgress;
      latest.current = existing
        ? latest.current.map((p) => (p === existing ? row : p))
        : [...latest.current, row];
      setProgress(latest.current);

      // One upsert on the unique (user, deck, card) key: no insert-vs-update guess.
      const { error } = await supabase
        .from('user_flashcard_progress')
        .upsert(
          { user_id: user.id, flashcard_set_id: setId, card_id: cardId, ...fields },
          { onConflict: 'user_id,flashcard_set_id,card_id' }
        );
      if (error) {
        console.error('Error saving flashcard progress:', error);
        void fetchProgress();
      }
    },
    [user, fetchProgress]
  );

  /**
   * Every card due for review, across every deck, most overdue first.
   *
   * `getDueCards` below answers "what is due in THIS deck", which is what a
   * deck tile needs. It is the wrong question for the learner arriving with
   * nothing particular in mind: spaced repetition only works if the whole
   * queue comes back, and theirs is spread over however many decks they have
   * touched. Due Today used to start the first deck that had anything in it
   * and stop there, so a queue spread over eight decks took eight visits to
   * clear and the count never reached zero.
   */
  const getAllDueCards = useCallback((): DueCard[] => {
    const now = Date.now();
    return (
      progress
        .filter((p) => p.next_review_at && new Date(p.next_review_at).getTime() <= now)
        .map((p) => ({
          setId: p.flashcard_set_id,
          cardId: p.card_id,
          dueAt: p.next_review_at as string,
          masteryLevel: p.mastery_level,
        }))
        // Most overdue first: the ones slipping furthest are the ones the
        // schedule most wants back.
        .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())
    );
  }, [progress]);

  // Get cards due for review (spaced repetition)
  const getDueCards = useCallback(
    (setId: string): string[] => {
      const now = new Date();
      return progress
        .filter(
          (p) =>
            p.flashcard_set_id === setId && p.next_review_at && new Date(p.next_review_at) <= now
        )
        .map((p) => p.card_id);
    },
    [progress]
  );

  return {
    progress,
    loading,
    getSetProgress,
    updateCardProgress,
    getDueCards,
    getAllDueCards,
    refetch: fetchProgress,
  };
}
