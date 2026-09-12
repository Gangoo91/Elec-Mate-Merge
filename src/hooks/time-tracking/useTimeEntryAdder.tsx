import { supabase } from '@/integrations/supabase/client';
import { TimeEntry } from '@/types/time-tracking';

interface AddTimeEntryParams {
  date?: string;
  duration: number;
  activity: string;
  notes?: string;
  location?: string;
  supervisor?: string;
  /**
   * True when the app logged this without the learner asking.
   *
   * This used to be hardcoded `false`, so automatic rows were stored as
   * manual ones. That disguised 5,753 auto-written rows as learner-entered
   * time and let them past the duplicate guard in `useApprenticeOtj`
   * (ELE-1724). Callers must say which kind of entry they are making;
   * a hand-typed logbook entry is the only thing that is manual.
   */
  isAutomatic?: boolean;
}

export const useTimeEntryAdder = (
  userId: string | null,
  setManualEntries: React.Dispatch<React.SetStateAction<TimeEntry[]>>
) => {
  // Function to add a new time entry
  const addTimeEntry = async (params: AddTimeEntryParams) => {
    const { date, duration, activity, notes = '', isAutomatic = false } = params;
    try {
      const newEntry: TimeEntry = {
        id: `entry-${Date.now()}`,
        date: date || new Date().toISOString().split('T')[0],
        duration,
        activity,
        notes,
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
              is_automatic: isAutomatic,
            })
            .select('*')
            .single();

          if (!error && data) {
            const saved = data as {
              id: string;
              date: string;
              duration: number;
              activity: string;
              notes: string | null;
              is_automatic: boolean | null;
            };
            setManualEntries((prev) => [
              {
                id: saved.id,
                date: saved.date,
                duration: saved.duration,
                activity: saved.activity,
                notes: saved.notes ?? '',
                isAutomatic: saved.is_automatic ?? false,
              },
              ...prev,
            ]);
          } else {
            console.error('Error saving time entry to Supabase:', error);
            setManualEntries((prev) => [newEntry, ...prev]);
          }
        } catch (e) {
          console.error('Error inserting to Supabase:', e);
          setManualEntries((prev) => [newEntry, ...prev]);
        }
      } else {
        // Not authenticated, just update state
        setManualEntries((prev) => [newEntry, ...prev]);
      }
    } catch (error) {
      console.error('Error adding time entry:', error);
      // Fallback to local state only
      setManualEntries((prev) => [
        {
          id: `entry-${Date.now()}`,
          date: date || new Date().toISOString().split('T')[0],
          duration,
          activity,
          notes: notes || '',
        },
        ...prev,
      ]);
    }
  };

  return { addTimeEntry };
};
