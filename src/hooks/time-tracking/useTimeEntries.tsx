import { useState, useEffect } from "react";
import { TimeEntry } from "@/types/time-tracking";
import { useAuthState } from "./useAuthState";
import { useEntriesLoader } from "./useEntriesLoader";
import { useTimeEntryAdder } from "./useTimeEntryAdder";
import { supabase } from "@/integrations/supabase/client";

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
  const deleteAllEntries = async (filterMonth: string = "all") => {
    if (filterMonth === "all") {
      // Clear all manual entries if filter is "all"
      setManualEntries([]);

      // Delete from Supabase if user is authenticated
      if (userId) {
        try {
          const { error } = await supabase
            .from('time_entries')
            .delete()
            .eq('user_id', userId)
            .eq('is_automatic', false);

          if (error) {
            console.error('Error deleting entries from Supabase:', error);
          }
        } catch (error) {
          console.error('Error deleting entries:', error);
        }
      }

      // Also clear localStorage fallback
      localStorage.removeItem('manualEntries');
    } else {
      // Filter out entries from the specified month
      const entriesToDelete = manualEntries.filter(entry => {
        const date = new Date(entry.date);
        const entryMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return entryMonth === filterMonth;
      });

      setManualEntries(prev => prev.filter(entry => {
        const date = new Date(entry.date);
        const entryMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        return entryMonth !== filterMonth;
      }));

      // Delete from Supabase if user is authenticated
      if (userId && entriesToDelete.length > 0) {
        try {
          const entryIds = entriesToDelete.map(e => e.id);
          const { error } = await supabase
            .from('time_entries')
            .delete()
            .eq('user_id', userId)
            .in('id', entryIds);

          if (error) {
            console.error('Error deleting monthly entries from Supabase:', error);
          }
        } catch (error) {
          console.error('Error deleting entries:', error);
        }
      }
    }
  };
  
  // Combine all entries (manual, course, quiz)
  const allEntries: TimeEntry[] = [...manualEntries, ...courseEntries, ...quizEntries];
  
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
