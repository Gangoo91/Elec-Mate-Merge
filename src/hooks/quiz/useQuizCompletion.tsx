
import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UseQuizCompletionProps {
  courseSlug?: string;
  unitCode: string;
}

export const useQuizCompletion = ({
  courseSlug,
  unitCode
}: UseQuizCompletionProps) => {
  const { toast } = useToast();

  const handleQuizComplete = useCallback(async (score: number, totalQuestions: number, timeSpent: number) => {
    try {
      // Mark quiz as completed in localStorage
      localStorage.setItem(`unit_${unitCode}_quiz_completed`, 'true');
      
      // Calculate time taken and minutes for display
      const minutesTaken = Math.ceil(timeSpent / 60);
      const percentage = Math.round((score / totalQuestions) * 100);
      
      // Add to off-the-job training record
      if (courseSlug) {
        // Update the localStorage for today's time
        const existingTime = parseInt(localStorage.getItem(`course_${courseSlug}_todayTime`) || '0');
        const newTime = existingTime + timeSpent;
        localStorage.setItem(`course_${courseSlug}_todayTime`, newTime.toString());
      }
      
      // Record quiz attempt in localStorage
      const attempts = JSON.parse(localStorage.getItem(`unit_${unitCode}_quiz_attempts`) || '[]');
      attempts.push({
        date: new Date().toISOString(),
        score,
        totalQuestions,
        timeTaken: timeSpent,
        percentage
      });
      localStorage.setItem(`unit_${unitCode}_quiz_attempts`, JSON.stringify(attempts));
      
      // Try to save to Supabase if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { error } = await supabase
          .from('quiz_attempts')
          .insert({
            user_id: user.id,
            unit_code: unitCode,
            score: score,
            total_questions: totalQuestions,
            percentage: percentage,
            time_taken: timeSpent
          });
          
        if (error) {
          console.error('Error saving quiz attempt to Supabase:', error);
          // Still show success toast as we've saved to localStorage
          toast({
            title: "Quiz Results Saved Locally",
            description: `You scored ${score} out of ${totalQuestions}. ${minutesTaken} minutes has been added to your off-the-job training.`,
          });
        } else {
          toast({
            title: "Quiz Completed",
            description: `You scored ${score} out of ${totalQuestions}. ${minutesTaken} minutes has been added to your off-the-job training.`,
          });
        }
      } else {
        // User not logged in, show local save toast
        toast({
          title: "Quiz Results Saved Locally",
          description: `You scored ${score} out of ${totalQuestions}. ${minutesTaken} minutes has been added to your off-the-job training.`,
        });
      }
      
      return true;
    } catch (error) {
      console.error("Error in handleQuizComplete:", error);
      toast({
        title: "Failed to save results",
        description: "There was a problem saving your quiz results. Please try again.",
        variant: "destructive"
      });
      return false;
    }
  }, [courseSlug, unitCode, toast]);
  
  const checkQuizCompletion = useCallback(() => {
    if (unitCode) {
      return localStorage.getItem(`unit_${unitCode}_quiz_completed`) === 'true';
    }
    return false;
  }, [unitCode]);

  return {
    handleQuizComplete,
    checkQuizCompletion
  };
};
