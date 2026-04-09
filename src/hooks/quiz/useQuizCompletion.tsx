import { useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { userKey } from '@/lib/userStorage';
import { storageGetSync, storageSetSync, storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { useCourseProgress } from '@/hooks/useCourseProgress';

interface UseQuizCompletionProps {
  courseSlug?: string;
  unitCode: string;
}

export const useQuizCompletion = ({ courseSlug, unitCode }: UseQuizCompletionProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const uid = user?.id;
  const { recordProgress } = useCourseProgress();

  const handleQuizComplete = useCallback(
    async (score: number, totalQuestions: number, timeSpent: number) => {
      try {
        // Mark quiz as completed (user-scoped)
        storageSetSync(userKey(uid, `unit_${unitCode}_quiz_completed`), 'true');

        // Calculate time taken and minutes for display
        const minutesTaken = Math.ceil(timeSpent / 60);
        const percentage = Math.round((score / totalQuestions) * 100);

        // Add to off-the-job training record
        if (courseSlug) {
          // Update today's time (user-scoped)
          const existingTime = parseInt(
            storageGetSync(userKey(uid, `course_${courseSlug}_todayTime`)) || '0'
          );
          const newTime = existingTime + timeSpent;
          storageSetSync(userKey(uid, `course_${courseSlug}_todayTime`), newTime.toString());
        }

        // Record quiz attempt (user-scoped)
        const attempts = storageGetJSONSync<any[]>(userKey(uid, `unit_${unitCode}_quiz_attempts`), []);
        attempts.push({
          date: new Date().toISOString(),
          score,
          totalQuestions,
          timeTaken: timeSpent,
          percentage,
        });
        storageSetJSONSync(userKey(uid, `unit_${unitCode}_quiz_attempts`), attempts);

        if (user) {
          const { error } = await supabase.from('quiz_attempts').insert({
            user_id: user.id,
            unit_code: unitCode,
            score: score,
            total_questions: totalQuestions,
            percentage: percentage,
            time_taken: timeSpent,
          });

          if (error) {
            // Still show success toast as we've saved locally
            toast({
              title: 'Quiz Results Saved Locally',
              description: `You scored ${score} out of ${totalQuestions}. ${minutesTaken} minutes has been added to your off-the-job training.`,
            });
          } else {
            // Also record to unified course_progress table
            recordProgress(unitCode, 'quiz', 100, true);

            toast({
              title: 'Quiz Completed',
              description: `You scored ${score} out of ${totalQuestions}. ${minutesTaken} minutes has been added to your off-the-job training.`,
            });
          }
        } else {
          // User not logged in, show local save toast
          toast({
            title: 'Quiz Results Saved Locally',
            description: `You scored ${score} out of ${totalQuestions}. ${minutesTaken} minutes has been added to your off-the-job training.`,
          });
        }

        return true;
      } catch (error) {
        console.error('Error in handleQuizComplete:', error);
        toast({
          title: 'Failed to save results',
          description: 'There was a problem saving your quiz results. Please try again.',
          variant: 'destructive',
        });
        return false;
      }
    },
    [courseSlug, unitCode, uid, user, toast, recordProgress]
  );

  const checkQuizCompletion = useCallback(() => {
    if (unitCode) {
      return storageGetSync(userKey(uid, `unit_${unitCode}_quiz_completed`)) === 'true';
    }
    return false;
  }, [unitCode, uid]);

  return {
    handleQuizComplete,
    checkQuizCompletion,
  };
};
