import { useCallback } from 'react';
import { useStudyStreak } from './useStudyStreak';
import { useQuizResults } from './useQuizResults';
import { useAchievements } from './useAchievements';
import { useUserActivity } from './useUserActivity';
import { QuizResult } from '@/types/quiz';

interface QuizCompletionData {
  result: QuizResult;
  assessmentId: string;
  sessionId: string;
}

/**
 * Hook to orchestrate all post-quiz tracking actions:
 * - Save quiz result to database
 * - Update study streak
 * - Award XP points
 * - Check achievement unlocks
 */
export function useQuizCompletion() {
  const { recordSession } = useStudyStreak();
  const { saveQuizResult } = useQuizResults();
  const { checkAchievements } = useAchievements();
  const { recordLessonCompletion } = useUserActivity();

  const completeQuiz = useCallback(async (data: QuizCompletionData) => {
    const { result, assessmentId, sessionId } = data;

    try {
      // 1. Save quiz result to quiz_results table
      await saveQuizResult({
        ...result,
        assessmentId,
        sessionId,
      });

      // 2. Update study streak (counts as a study session)
      // Pass totalQuestions as the "cards reviewed" count
      await recordSession(result.totalQuestions);

      // 3. Award XP points (+25 points via recordLessonCompletion)
      await recordLessonCompletion(`quiz-${assessmentId}`);

      // 4. Check for newly unlocked achievements
      checkAchievements();

    } catch (error) {
      console.error('Error completing quiz tracking:', error);
      // Don't throw - we don't want to block the user from seeing results
      // even if tracking fails
    }
  }, [saveQuizResult, recordSession, recordLessonCompletion, checkAchievements]);

  return { completeQuiz };
}
