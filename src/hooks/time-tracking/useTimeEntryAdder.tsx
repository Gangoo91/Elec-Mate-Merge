
import { supabase } from "@/integrations/supabase/client";
import { TimeEntry } from "@/types/time-tracking";
import { Database } from "@/integrations/supabase/types";

export const useTimeEntryAdder = (userId: string | null, setManualEntries: React.Dispatch<React.SetStateAction<TimeEntry[]>>) => {
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
            .select('*')
            .single();
            
          if (!error && data) {
            const typedData = data as any;
            setManualEntries(prev => [{
              id: typedData.id,
              date: typedData.date,
              duration: typedData.duration,
              activity: typedData.activity,
              notes: typedData.notes,
              isAutomatic: typedData.is_automatic
            }, ...prev]);
          } else {
            console.error('Error saving time entry to Supabase:', error);
            setManualEntries(prev => [newEntry, ...prev]);
          }
        } catch (e) {
          console.error('Error inserting to Supabase:', e);
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

  return { addTimeEntry };
};
