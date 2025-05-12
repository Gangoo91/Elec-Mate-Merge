import { useState, useEffect } from "react";
import { TimeEntry } from "@/types/time-tracking";
import { useAuthState } from "./useAuthState";
import { useEntriesLoader } from "./useEntriesLoader";
import { useTimeEntryAdder } from "./useTimeEntryAdder";

export const useTimeEntries = () => {
  const { userId, isLoading: authLoading } = useAuthState();
  const [manualEntries, setManualEntries] = useState<TimeEntry[]>([]);
  
  const { 
    manualEntries: loadedManualEntries, 
    courseEntries, 
    quizEntries, 
    isLoading: entriesLoading 
  } = useEntriesLoader(userId);
  
  const { addTimeEntry } = useTimeEntryAdder(userId, setManualEntries);

  // Update manual entries when loaded from Supabase/localStorage
  useEffect(() => {
    if (loadedManualEntries.length > 0) {
      setManualEntries(loadedManualEntries);
    }
  }, [loadedManualEntries]);
  
  // Function to delete all entries
  const deleteAllEntries = (filterMonth: string = "all") => {
    if (filterMonth === "all") {
      // Clear all manual entries if filter is "all"
      setManualEntries([]);
      
      // Store the deletion state in localStorage to ensure it persists
      localStorage.setItem('entries_cleared', 'true');
      localStorage.setItem('entries_cleared_timestamp', Date.now().toString());
      
      // In a real implementation with Supabase, would delete from the database
      if (userId) {
        try {
          // This is where we would delete from Supabase
          // supabase.from('time_entries').delete().eq('user_id', userId);
          
          // For now, just store in localStorage that we've cleared entries
          localStorage.removeItem('manualEntries');
        } catch (error) {
          console.error('Error deleting entries:', error);
        }
      }
    } else {
      // Filter out entries from the specified month
      setManualEntries(prev => {
        const filteredEntries = prev.filter(entry => {
          const date = new Date(entry.date);
          const entryMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          return entryMonth !== filterMonth;
        });
        
        // Store updated entries in localStorage
        localStorage.setItem('manualEntries', JSON.stringify(filteredEntries));
        
        return filteredEntries;
      });
    }
  };
  
  // Combine entries but respect the deleted state
  const wasEntriesCleared = localStorage.getItem('entries_cleared') === 'true';
  const clearTimestamp = parseInt(localStorage.getItem('entries_cleared_timestamp') || '0');
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  
  // If entries were cleared less than an hour ago, only use manual entries
  // Otherwise, use all entries (manual, course, quiz)
  let allEntries: TimeEntry[] = [];
  
  if (wasEntriesCleared && clearTimestamp > oneHourAgo) {
    // Only use manual entries if entries were cleared recently
    allEntries = [...manualEntries];
  } else {
    // Clear the flag if it's been more than an hour
    if (wasEntriesCleared) {
      localStorage.removeItem('entries_cleared');
      localStorage.removeItem('entries_cleared_timestamp');
    }
    // Use all entries
    allEntries = [...manualEntries, ...courseEntries, ...quizEntries];
  }
  
  // Calculate total minutes
  const totalMinutes = allEntries.reduce((total, entry) => total + entry.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    entries: allEntries,
    totalTime: { hours, minutes },
    addTimeEntry,
    deleteAllEntries,
    isLoading: authLoading || entriesLoading
  };
};
