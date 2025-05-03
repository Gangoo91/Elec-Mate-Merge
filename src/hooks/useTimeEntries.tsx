
import { useState, useEffect } from "react";
import { TimeEntry } from "@/types/time-tracking";

export const useTimeEntries = () => {
  const [manualEntries, setManualEntries] = useState<TimeEntry[]>([]);
  const [courseEntries, setCourseEntries] = useState<TimeEntry[]>([]);
  const [quizEntries, setQuizEntries] = useState<TimeEntry[]>([]);
  
  // Load entries from various sources on component mount
  useEffect(() => {
    // In a real implementation, this would come from Supabase
    const mockEntries: TimeEntry[] = [
      {
        id: "entry-1",
        date: new Date().toISOString().split('T')[0],
        duration: 120, // minutes
        activity: "Wiring Regulations Study",
        notes: "Completed chapters 1-3 of the BS 7671 textbook"
      },
      {
        id: "entry-2",
        date: new Date().toISOString().split('T')[0],
        duration: 90, // minutes
        activity: "Practical Workshop",
        notes: "Practiced ring final circuit installation techniques"
      }
    ];
    
    // Look for course time entries in localStorage
    const loadedCourseEntries: TimeEntry[] = [];
    const loadedQuizEntries: TimeEntry[] = [];
    
    Object.keys(localStorage).forEach(key => {
      // Process course time entries
      if (key.startsWith('course_') && key.endsWith('_todayTime')) {
        const courseName = key.replace('course_', '').replace('_todayTime', '');
        const formattedCourseName = courseName.split('-').map(
          word => word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        const timeValue = parseInt(localStorage.getItem(key) || '0');
        if (timeValue > 0) {
          loadedCourseEntries.push({
            id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            date: new Date().toISOString().split('T')[0],
            duration: Math.round(timeValue / 60), // convert seconds to minutes
            activity: `Online Learning: ${formattedCourseName}`,
            notes: "Automatically tracked from the learning portal",
            isAutomatic: true
          });
        }
      }
      
      // Process quiz attempts
      if (key.includes('_quiz_attempts')) {
        try {
          const unitCode = key.split('_quiz_attempts')[0].replace('unit_', '');
          const attempts = JSON.parse(localStorage.getItem(key) || '[]');
          
          attempts.forEach((attempt: any, index: number) => {
            loadedQuizEntries.push({
              id: `quiz-${unitCode}-${index}`,
              date: new Date(attempt.date).toISOString().split('T')[0],
              duration: Math.ceil(attempt.timeTaken / 60), // convert seconds to minutes
              activity: `Quiz: Unit ${unitCode}`,
              notes: `Assessment Score: ${attempt.score}/${attempt.totalQuestions} (${attempt.percentage}%)`,
              isAutomatic: true,
              isQuiz: true,
              score: attempt.score,
              totalQuestions: attempt.totalQuestions
            });
          });
        } catch (e) {
          console.error("Error parsing quiz attempts:", e);
        }
      }
    });
    
    setManualEntries(mockEntries);
    setCourseEntries(loadedCourseEntries);
    setQuizEntries(loadedQuizEntries);
  }, []);

  const addTimeEntry = (duration: number, activity: string, notes: string) => {
    const newEntry: TimeEntry = {
      id: `entry-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      duration,
      activity,
      notes
    };

    setManualEntries([...manualEntries, newEntry]);
  };

  // Combine all entries
  const allEntries = [...manualEntries, ...courseEntries, ...quizEntries];
  
  // Calculate total minutes
  const totalMinutes = allEntries.reduce((total, entry) => total + entry.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    entries: allEntries,
    totalTime: { hours, minutes },
    addTimeEntry
  };
};
