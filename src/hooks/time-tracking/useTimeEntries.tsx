
import { useState } from "react";
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
  useState(() => {
    if (loadedManualEntries.length > 0) {
      setManualEntries(loadedManualEntries);
    }
  });
  
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
    isLoading: authLoading || entriesLoading
  };
};
