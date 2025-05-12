
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface UseQuizTimerProps {
  totalTimeInSeconds: number;
  isActive: boolean;
  isPaused: boolean;
  onTimeUp?: () => void;
}

export const useQuizTimer = ({
  totalTimeInSeconds,
  isActive,
  isPaused,
  onTimeUp
}: UseQuizTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(totalTimeInSeconds);
  const { toast } = useToast();

  useEffect(() => {
    if (!isActive || isPaused) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Time's up!",
            description: "Your quiz has been automatically submitted.",
            variant: "destructive"
          });
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isActive, isPaused, toast, onTimeUp]);

  const resetTimer = () => {
    setTimeRemaining(totalTimeInSeconds);
  };

  return {
    timeRemaining,
    setTimeRemaining,
    resetTimer
  };
};
