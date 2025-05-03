
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { formatTime } from "@/lib/utils";

interface UseStudySessionProps {
  courseSlug?: string;
}

export const useStudySession = ({ courseSlug }: UseStudySessionProps) => {
  const { toast } = useToast();
  const [isStudying, setIsStudying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [todayTotal, setTodayTotal] = useState(0);
  const [currentResourceType, setCurrentResourceType] = useState<string | null>(null);
  const [completedResources, setCompletedResources] = useState<Record<string, boolean>>({});

  // Load timer state and completed resources from localStorage
  useEffect(() => {
    if (!courseSlug) return;

    // Load today's total from localStorage
    const storedTime = localStorage.getItem(`course_${courseSlug}_todayTime`);
    if (storedTime) {
      setTodayTotal(parseInt(storedTime));
    }
    
    // Load completed resources from localStorage
    const storedCompletedResources = localStorage.getItem(`course_${courseSlug}_completedResources`);
    if (storedCompletedResources) {
      try {
        setCompletedResources(JSON.parse(storedCompletedResources));
      } catch (e) {
        console.error("Error parsing completed resources from localStorage:", e);
      }
    }
    
    // Load timer state from localStorage
    const storedIsStudying = localStorage.getItem(`course_${courseSlug}_isStudying`);
    if (storedIsStudying) {
      setIsStudying(storedIsStudying === 'true');
    }
    
    const storedElapsedTime = localStorage.getItem(`course_${courseSlug}_elapsedTime`);
    if (storedElapsedTime) {
      setElapsedTime(parseInt(storedElapsedTime));
    }
    
    const storedSessionStartTime = localStorage.getItem(`course_${courseSlug}_sessionStartTime`);
    if (storedSessionStartTime) {
      setSessionStartTime(parseInt(storedSessionStartTime));
    }
  }, [courseSlug]);

  // Save timer state to localStorage whenever it changes
  useEffect(() => {
    if (!courseSlug) return;
    
    localStorage.setItem(`course_${courseSlug}_isStudying`, isStudying ? 'true' : 'false');
    localStorage.setItem(`course_${courseSlug}_elapsedTime`, elapsedTime.toString());
    if (sessionStartTime) {
      localStorage.setItem(`course_${courseSlug}_sessionStartTime`, sessionStartTime.toString());
    }
  }, [isStudying, elapsedTime, sessionStartTime, courseSlug]);

  const handleStartStudy = () => {
    setIsStudying(true);
    setSessionStartTime(Date.now());
    toast({
      title: "Study session started",
      description: "Your off-the-job training time is now being recorded."
    });
  };

  const handleStopStudy = async () => {
    if (!sessionStartTime || !courseSlug) return;
    
    const sessionTime = Math.floor((Date.now() - sessionStartTime) / 1000);
    setElapsedTime(prev => prev + sessionTime);
    setIsStudying(false);
    setSessionStartTime(null);
    
    // Update today's total
    const newTodayTotal = todayTotal + sessionTime;
    setTodayTotal(newTodayTotal);
    
    // Save to localStorage
    localStorage.setItem(`course_${courseSlug}_todayTime`, newTodayTotal.toString());
    
    // Clean up session start time from localStorage
    localStorage.removeItem(`course_${courseSlug}_sessionStartTime`);
    
    // Log time entry
    try {
      // In a real implementation, we would save to Supabase here
      toast({
        title: "Study time logged",
        description: `${formatTime(sessionTime)} has been added to your off-the-job training record.`,
      });
    } catch (error) {
      toast({
        title: "Error saving time record",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleResourceClick = (type: string) => {
    setCurrentResourceType(type);
    if (!isStudying) {
      toast({
        title: "Start study timer",
        description: "Click 'Start Learning' to record your training time for this activity.",
      });
    }
  };

  const handleToggleResourceComplete = (resourceId: string) => {
    setCompletedResources(prev => {
      const updated = {
        ...prev,
        [resourceId]: !prev[resourceId]
      };
      
      // Save to localStorage
      if (courseSlug) {
        localStorage.setItem(`course_${courseSlug}_completedResources`, JSON.stringify(updated));
      }
      
      // Show toast notification
      toast({
        title: updated[resourceId] ? "Resource marked as completed" : "Resource marked as incomplete",
        description: "Your progress has been updated.",
      });
      
      return updated;
    });
  };

  return {
    isStudying,
    elapsedTime,
    sessionStartTime,
    todayTotal,
    currentResourceType,
    completedResources,
    handleStartStudy,
    handleStopStudy,
    handleResourceClick,
    handleToggleResourceComplete,
    setCurrentResourceType
  };
};
