
import { useState, useEffect } from "react";
import { TimeEntry } from "@/types/time-tracking";
import { supabase } from "@/integrations/supabase/client";

export const useTimeEntries = () => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Check if user is authenticated and load entries
  useEffect(() => {
    const checkAuthAndLoadEntries = async () => {
      setIsLoading(true);
      
      try {
        // Check auth state
        const { data: { user } } = await supabase.auth.getUser();
        setUserId(user?.id || null);
        
        // Load entries based on auth state
        if (user?.id) {
          // Try to fetch from Supabase if authenticated
          const { data: manualEntries, error: manualError } = await supabase
            .from('time_entries')
            .select('*')
            .eq('user_id', user.id)
            .order('date', { ascending: false });
            
          if (!manualError && manualEntries) {
            setEntries((manualEntries as any[]).map((entry: any) => ({
              id: entry.id,
              date: entry.date,
              duration: entry.duration,
              activity: entry.activity,
              notes: entry.notes || '',
              isAutomatic: entry.is_automatic
            })));
          } else {
            // Fallback to mock/localStorage data
            loadMockAndLocalData();
          }
        } else {
          // Not authenticated, load mock/localStorage data
          loadMockAndLocalData();
        }
      } catch (error) {
        console.error("Error loading time entries:", error);
        loadMockAndLocalData();
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuthAndLoadEntries();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUserId(session?.user?.id || null);
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  // Add a new time entry
  const addTimeEntry = async (duration: number, activity: string, notes: string) => {
    try {
      const newEntry: TimeEntry = {
        id: `entry-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        duration,
        activity,
        notes,
        isAutomatic: false
      };
      
      // If authenticated, save to Supabase
      if (userId) {
        try {
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
            .select()
            .single();
            
          if (!error && data) {
            setEntries(prev => [{
              id: data.id,
              date: data.date,
              duration: data.duration,
              activity: data.activity,
              notes: data.notes || '',
              isAutomatic: data.is_automatic
            }, ...prev]);
          } else {
            // Fallback to local state
            setEntries(prev => [newEntry, ...prev]);
          }
        } catch (e) {
          console.error('Error inserting to Supabase:', e);
          setEntries(prev => [newEntry, ...prev]);
        }
      } else {
        // Not authenticated, just update state
        setEntries(prev => [newEntry, ...prev]);
      }
      
      return true;
    } catch (error) {
      console.error('Error adding time entry:', error);
      return false;
    }
  };
  
  // Mock and localStorage data fallback
  const loadMockAndLocalData = () => {
    // Load course time entries from localStorage
    const localStorageEntries: TimeEntry[] = [];
    
    // Look for course time entries
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('course_') && key.endsWith('_todayTime')) {
        const courseName = key.replace('course_', '').replace('_todayTime', '');
        const formattedCourseName = courseName.split('-').map(
          word => word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        const timeValue = parseInt(localStorage.getItem(key) || '0');
        if (timeValue > 0) {
          localStorageEntries.push({
            id: `course-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
            date: new Date().toISOString().split('T')[0],
            duration: Math.round(timeValue / 60), // Convert seconds to minutes
            activity: `Online Learning: ${formattedCourseName}`,
            notes: "Automatically tracked from the learning portal",
            isAutomatic: true
          });
        }
      }
    });
    
    // Look for quiz attempts
    Object.keys(localStorage).forEach(key => {
      if (key.includes('_quiz_attempts')) {
        try {
          const unitCode = key.split('_quiz_attempts')[0].replace('unit_', '');
          const attempts = JSON.parse(localStorage.getItem(key) || '[]');
          
          attempts.forEach((attempt: any, index: number) => {
            localStorageEntries.push({
              id: `quiz-${unitCode}-${index}`,
              date: new Date(attempt.date).toISOString().split('T')[0],
              duration: Math.ceil(attempt.timeTaken / 60), // Convert seconds to minutes
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
    
    // Add some mock entries if we don't have enough data
    const mockEntries: TimeEntry[] = [
      {
        id: "entry-1",
        date: new Date().toISOString().split('T')[0],
        duration: 120, // minutes
        activity: "Wiring Regulations Study",
        notes: "Completed chapters 1-3 of the BS 7671 textbook",
        isAutomatic: false
      },
      {
        id: "entry-2",
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
        duration: 90, // minutes
        activity: "Practical Workshop",
        notes: "Practiced ring final circuit installation techniques",
        isAutomatic: false
      },
      {
        id: "entry-3",
        date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
        duration: 60, // minutes
        activity: "Mentor Meeting",
        notes: "Discussed career progression and next steps",
        isAutomatic: false
      }
    ];
    
    // Combine local storage entries and mock entries
    setEntries([...localStorageEntries, ...mockEntries]);
  };
  
  // Calculate total minutes
  const totalMinutes = entries.reduce((total, entry) => total + entry.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    entries,
    totalTime: { hours, minutes },
    addTimeEntry,
    isLoading,
    userId
  };
};

export default useTimeEntries;
