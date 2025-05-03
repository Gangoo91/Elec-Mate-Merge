
import { useState, useEffect } from "react";
import { TimeEntry } from "@/types/time-tracking";
import { supabase } from "@/integrations/supabase/client";

export const useTimeEntries = () => {
  const [manualEntries, setManualEntries] = useState<TimeEntry[]>([]);
  const [courseEntries, setCourseEntries] = useState<TimeEntry[]>([]);
  const [quizEntries, setQuizEntries] = useState<TimeEntry[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null);
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  // Load entries from various sources when component mounts or userId changes
  useEffect(() => {
    const loadTimeEntries = async () => {
      setIsLoading(true);
      
      try {
        // If user is authenticated, try to fetch from Supabase
        if (userId) {
          // Fetch manual entries
          const { data: manualData, error: manualError } = await supabase
            .from('time_entries')
            .select('*')
            .eq('user_id', userId)
            .eq('is_automatic', false)
            .order('date', { ascending: false });
            
          if (!manualError && manualData) {
            setManualEntries(manualData.map(entry => ({
              id: entry.id,
              date: entry.date,
              duration: entry.duration,
              activity: entry.activity,
              notes: entry.notes,
              isAutomatic: entry.is_automatic
            })));
          } else {
            // Fallback to mock data
            loadMockEntries();
          }
          
          // Fetch study session entries
          const { data: studyData, error: studyError } = await supabase
            .from('study_sessions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
            
          if (!studyError && studyData) {
            setCourseEntries(studyData.map(entry => ({
              id: entry.id,
              date: new Date(entry.created_at).toISOString().split('T')[0],
              duration: Math.ceil(entry.duration / 60), // convert seconds to minutes
              activity: entry.activity,
              notes: entry.notes || "Automatically tracked from the learning portal",
              isAutomatic: true
            })));
          } else {
            // Fallback to localStorage
            loadCourseEntriesFromLocalStorage();
          }
          
          // Fetch quiz entries
          const { data: quizData, error: quizError } = await supabase
            .from('quiz_attempts')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });
            
          if (!quizError && quizData) {
            setQuizEntries(quizData.map(entry => ({
              id: entry.id,
              date: new Date(entry.created_at).toISOString().split('T')[0],
              duration: Math.ceil(entry.time_taken / 60), // convert seconds to minutes
              activity: `Quiz: Unit ${entry.unit_code}`,
              notes: `Assessment Score: ${entry.score}/${entry.total_questions} (${entry.percentage}%)`,
              isAutomatic: true,
              isQuiz: true,
              score: entry.score,
              totalQuestions: entry.total_questions
            })));
          } else {
            // Fallback to localStorage
            loadQuizEntriesFromLocalStorage();
          }
        } else {
          // No userId, load from localStorage and mock data
          loadMockEntries();
          loadCourseEntriesFromLocalStorage();
          loadQuizEntriesFromLocalStorage();
        }
      } catch (error) {
        console.error("Error loading time entries:", error);
        // Fallback to localStorage and mock data
        loadMockEntries();
        loadCourseEntriesFromLocalStorage();
        loadQuizEntriesFromLocalStorage();
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTimeEntries();
  }, [userId]);

  // Mock entries for development
  const loadMockEntries = () => {
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
    
    setManualEntries(mockEntries);
  };
  
  // Load course time entries from localStorage
  const loadCourseEntriesFromLocalStorage = () => {
    const loadedCourseEntries: TimeEntry[] = [];
    
    Object.keys(localStorage).forEach(key => {
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
    });
    
    setCourseEntries(loadedCourseEntries);
  };
  
  // Load quiz attempts from localStorage
  const loadQuizEntriesFromLocalStorage = () => {
    const loadedQuizEntries: TimeEntry[] = [];
    
    Object.keys(localStorage).forEach(key => {
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
    
    setQuizEntries(loadedQuizEntries);
  };

  // Function to add a new time entry
  const addTimeEntry = async (duration: number, activity: string, notes: string) => {
    try {
      const newEntry: TimeEntry = {
        id: `entry-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        duration,
        activity,
        notes
      };

      // If user is authenticated, save to Supabase
      if (userId) {
        const { data, error } = await supabase
          .from('time_entries')
          .insert({
            user_id: userId,
            date: newEntry.date,
            duration: newEntry.duration,
            activity: newEntry.activity,
            notes: newEntry.notes,
            is_automatic: false
          })
          .select('*')
          .single();
          
        if (!error && data) {
          setManualEntries(prev => [{
            id: data.id,
            date: data.date,
            duration: data.duration,
            activity: data.activity,
            notes: data.notes,
            isAutomatic: data.is_automatic
          }, ...prev]);
        } else {
          console.error('Error saving time entry to Supabase:', error);
          setManualEntries(prev => [newEntry, ...prev]);
        }
      } else {
        // Not authenticated, just update state
        setManualEntries(prev => [newEntry, ...prev]);
      }
    } catch (error) {
      console.error('Error adding time entry:', error);
      // Fallback to local state only
      setManualEntries(prev => [{
        id: `entry-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        duration,
        activity,
        notes
      }, ...prev]);
    }
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
    addTimeEntry,
    isLoading
  };
};
