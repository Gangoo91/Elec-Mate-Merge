
import { useState, useEffect } from "react";

interface SessionData {
  isStudying: boolean;
  elapsedTime: number;
  sessionStartTime: number | null;
  todayTotal: number;
  completedResources: Record<string, boolean>;
}

export const useSessionStorage = (courseSlug?: string) => {
  const [isStudying, setIsStudying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const [todayTotal, setTodayTotal] = useState(0);
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

  const saveCompletedResources = (resources: Record<string, boolean>) => {
    if (courseSlug) {
      localStorage.setItem(`course_${courseSlug}_completedResources`, JSON.stringify(resources));
    }
  };

  const updateTodayTotal = (newTotal: number) => {
    if (courseSlug) {
      localStorage.setItem(`course_${courseSlug}_todayTime`, newTotal.toString());
      setTodayTotal(newTotal);
    }
  };

  return {
    isStudying,
    setIsStudying,
    elapsedTime,
    setElapsedTime,
    sessionStartTime,
    setSessionStartTime,
    todayTotal,
    updateTodayTotal,
    completedResources,
    setCompletedResources,
    saveCompletedResources,
  };
};
