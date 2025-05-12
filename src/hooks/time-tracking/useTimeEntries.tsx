
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
      
      // In a real implementation with Supabase, would delete from the database
      // if (userId) {
      //   supabase.from('time_entries').delete().eq('user_id', userId);
      // }
    } else {
      // Filter out entries from the specified month
      setManualEntries(prev => prev.filter(entry => {
        const date = new Date(entry.date);
        const entryMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return entryMonth !== filterMonth;
      }));
      
      // In a real implementation with Supabase, would delete filtered entries
      // if (userId) {
      //   const startDate = new Date(`${filterMonth}-01`);
      //   const endDateMonth = new Date(startDate);
      //   endDateMonth.setMonth(endDateMonth.getMonth() + 1);
      //   
      //   supabase.from('time_entries')
      //     .delete()
      //     .eq('user_id', userId)
      //     .gte('date', startDate.toISOString().split('T')[0])
      //     .lt('date', endDateMonth.toISOString().split('T')[0]);
      // }
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
    deleteAllEntries,
    isLoading: authLoading || entriesLoading
  };
};
