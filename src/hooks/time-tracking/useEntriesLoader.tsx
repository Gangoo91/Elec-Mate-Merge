
import { useState, useEffect } from "react";
import { TimeEntry } from "@/types/time-tracking";
import { useMockEntries } from "./useMockEntries";
import { useLocalStorageEntries } from "./useLocalStorageEntries";
import { useSupabaseEntries } from "./useSupabaseEntries";

export const useEntriesLoader = (userId: string | null) => {
  const [manualEntries, setManualEntries] = useState<TimeEntry[]>([]);
  const [courseEntries, setCourseEntries] = useState<TimeEntry[]>([]);
  const [quizEntries, setQuizEntries] = useState<TimeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { loadMockEntries } = useMockEntries();
  const { loadCourseEntriesFromLocalStorage, loadQuizEntriesFromLocalStorage } = useLocalStorageEntries();
  const { fetchManualEntries, fetchStudyEntries, fetchQuizEntries } = useSupabaseEntries(userId);
  
  // Load entries from various sources when component mounts or userId changes
  useEffect(() => {
    const loadTimeEntries = async () => {
      setIsLoading(true);
      
      try {
        // If user is authenticated, try to fetch from Supabase
        if (userId) {
          // Fetch manual entries
          const fetchedManualEntries = await fetchManualEntries();
          if (fetchedManualEntries.length > 0) {
            setManualEntries(fetchedManualEntries);
          } else {
            // Fallback to mock data
            setManualEntries(loadMockEntries());
          }
          
          // Fetch study session entries
          const fetchedStudyEntries = await fetchStudyEntries();
          if (fetchedStudyEntries.length > 0) {
            setCourseEntries(fetchedStudyEntries);
          } else {
            // Fallback to localStorage
            setCourseEntries(loadCourseEntriesFromLocalStorage());
          }
          
          // Fetch quiz entries
          const fetchedQuizEntries = await fetchQuizEntries();
          if (fetchedQuizEntries.length > 0) {
            setQuizEntries(fetchedQuizEntries);
          } else {
            // Fallback to localStorage
            setQuizEntries(loadQuizEntriesFromLocalStorage());
          }
        } else {
          // No userId, load from localStorage and mock data
          setManualEntries(loadMockEntries());
          setCourseEntries(loadCourseEntriesFromLocalStorage());
          setQuizEntries(loadQuizEntriesFromLocalStorage());
        }
      } catch (error) {
        console.error("Error loading time entries:", error);
        // Fallback to localStorage and mock data
        setManualEntries(loadMockEntries());
        setCourseEntries(loadCourseEntriesFromLocalStorage());
        setQuizEntries(loadQuizEntriesFromLocalStorage());
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTimeEntries();
  }, [userId]);
  
  return { 
    manualEntries, 
    courseEntries, 
    quizEntries,
    isLoading 
  };
};
