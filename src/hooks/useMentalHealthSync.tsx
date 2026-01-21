import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  moodService,
  journalService,
  sleepService,
  safetyPlanService,
  groundingService,
  syncFromLocalStorage,
  MoodEntry,
  JournalEntry,
  SleepEntry,
  SafetyPlan
} from '@/services/mentalHealthService';
import { toast } from 'sonner';

interface UseMentalHealthSyncOptions {
  autoSync?: boolean;
}

export const useMentalHealthSync = (options: UseMentalHealthSyncOptions = { autoSync: true }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync local data to cloud when user logs in
  const syncToCloud = useCallback(async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      await syncFromLocalStorage();
      setIsSynced(true);
      toast.success('Mental health data synced to cloud');
    } catch (err: any) {
      setError(err.message);
      console.error('Sync error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Auto-sync on login if enabled
  useEffect(() => {
    if (user && options.autoSync && !isSynced) {
      // Check if we have local data that needs syncing
      const hasLocalData =
        localStorage.getItem('elec-mate-mood-history') ||
        localStorage.getItem('wellbeing-journal') ||
        localStorage.getItem('sleep-tracker') ||
        localStorage.getItem('personal-safety-plan');

      if (hasLocalData) {
        // Delay sync to avoid blocking UI
        const timer = setTimeout(syncToCloud, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [user, options.autoSync, isSynced, syncToCloud]);

  return {
    isLoading,
    isSynced,
    error,
    syncToCloud
  };
};

// Hook specifically for mood data
export const useMoodData = () => {
  const { user } = useAuth();
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load mood data - merge cloud and local for reliability
  const loadMoodData = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      try {
        const cloudData = await moodService.getAll();
        const local = localStorage.getItem('elec-mate-mood-history');
        const localData = local ? JSON.parse(local) : [];

        // If cloud is empty but we have local data, sync it to cloud
        if (cloudData.length === 0 && localData.length > 0) {
          console.log('Cloud empty, syncing local mood data...');
          for (const entry of localData) {
            try {
              await moodService.upsert(entry);
            } catch (e) {
              console.error('Failed to sync mood entry:', e);
            }
          }
          setMoodHistory(localData);
        } else if (cloudData.length > 0) {
          // Use cloud data and update localStorage as backup
          setMoodHistory(cloudData);
          localStorage.setItem('elec-mate-mood-history', JSON.stringify(cloudData));
        } else {
          setMoodHistory([]);
        }
      } catch (err) {
        console.error('Error loading mood data:', err);
        // Fall back to localStorage
        const local = localStorage.getItem('elec-mate-mood-history');
        if (local) setMoodHistory(JSON.parse(local));
      } finally {
        setIsLoading(false);
      }
    } else {
      // Not logged in, use localStorage
      const local = localStorage.getItem('elec-mate-mood-history');
      if (local) setMoodHistory(JSON.parse(local));
    }
  }, [user]);

  useEffect(() => {
    loadMoodData();
  }, [loadMoodData]);

  // Add mood entry
  const addMoodEntry = useCallback(async (entry: MoodEntry) => {
    // Update local state immediately
    setMoodHistory(prev => {
      const updated = [...prev.filter(h => h.date !== entry.date), entry]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 90);
      // Save to localStorage as backup
      localStorage.setItem('elec-mate-mood-history', JSON.stringify(updated));
      return updated;
    });

    // Sync to cloud if logged in
    if (user) {
      try {
        await moodService.upsert(entry);
      } catch (err) {
        console.error('Error syncing mood entry:', err);
        // Notify user that sync failed but data is saved locally
        toast.error('Check-in saved locally. Cloud sync will retry when online.');
      }
    }
  }, [user]);

  return { moodHistory, addMoodEntry, isLoading, refreshMoodData: loadMoodData };
};

// Hook for journal data
export const useJournalData = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadJournalData = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      try {
        const cloudData = await journalService.getAll();
        const local = localStorage.getItem('wellbeing-journal');
        const localData = local ? JSON.parse(local) : [];

        // If cloud is empty but we have local data, sync it to cloud
        if (cloudData.length === 0 && localData.length > 0) {
          console.log('Cloud empty, syncing local journal data...');
          for (const entry of localData) {
            try {
              await journalService.create(entry);
            } catch (e) {
              console.error('Failed to sync journal entry:', e);
            }
          }
          setEntries(localData);
        } else if (cloudData.length > 0) {
          // Use cloud data and update localStorage as backup
          setEntries(cloudData);
          localStorage.setItem('wellbeing-journal', JSON.stringify(cloudData));
        } else {
          setEntries([]);
        }
      } catch (err) {
        console.error('Error loading journal data:', err);
        const local = localStorage.getItem('wellbeing-journal');
        if (local) setEntries(JSON.parse(local));
      } finally {
        setIsLoading(false);
      }
    } else {
      const local = localStorage.getItem('wellbeing-journal');
      if (local) setEntries(JSON.parse(local));
    }
  }, [user]);

  useEffect(() => {
    loadJournalData();
  }, [loadJournalData]);

  const addEntry = useCallback(async (entry: JournalEntry) => {
    const newEntry = { ...entry, id: entry.id || Date.now().toString() };

    setEntries(prev => {
      const updated = [newEntry, ...prev];
      localStorage.setItem('wellbeing-journal', JSON.stringify(updated));
      return updated;
    });

    if (user) {
      try {
        console.log('[Journal] Saving entry to cloud for user:', user.id);
        const savedEntry = await journalService.create(entry);
        console.log('[Journal] Entry saved successfully:', savedEntry?.id);
        toast.success('Journal entry saved');
      } catch (err: any) {
        console.error('[Journal] Error syncing journal entry:', err);
        console.error('[Journal] Error details:', err?.message, err?.code, err?.details);
        toast.error(`Entry saved locally. Cloud sync failed: ${err?.message || 'Unknown error'}`);
      }
    } else {
      console.log('[Journal] No user logged in, entry saved to localStorage only');
    }
  }, [user]);

  const deleteEntry = useCallback(async (id: string) => {
    setEntries(prev => {
      const updated = prev.filter(e => e.id !== id);
      localStorage.setItem('wellbeing-journal', JSON.stringify(updated));
      return updated;
    });

    if (user) {
      try {
        await journalService.delete(id);
      } catch (err) {
        console.error('Error deleting journal entry:', err);
      }
    }
  }, [user]);

  return { entries, addEntry, deleteEntry, isLoading, refreshJournalData: loadJournalData };
};

// Hook for sleep data
export const useSleepData = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<SleepEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSleepData = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      try {
        const cloudData = await sleepService.getAll();
        const local = localStorage.getItem('sleep-tracker');
        const localData = local ? JSON.parse(local) : [];

        // If cloud is empty but we have local data, sync it to cloud
        if (cloudData.length === 0 && localData.length > 0) {
          console.log('Cloud empty, syncing local sleep data...');
          for (const entry of localData) {
            try {
              await sleepService.upsert(entry);
            } catch (e) {
              console.error('Failed to sync sleep entry:', e);
            }
          }
          setEntries(localData);
        } else if (cloudData.length > 0) {
          // Use cloud data and update localStorage as backup
          setEntries(cloudData);
          localStorage.setItem('sleep-tracker', JSON.stringify(cloudData));
        } else {
          setEntries([]);
        }
      } catch (err) {
        console.error('Error loading sleep data:', err);
        const local = localStorage.getItem('sleep-tracker');
        if (local) setEntries(JSON.parse(local));
      } finally {
        setIsLoading(false);
      }
    } else {
      const local = localStorage.getItem('sleep-tracker');
      if (local) setEntries(JSON.parse(local));
    }
  }, [user]);

  useEffect(() => {
    loadSleepData();
  }, [loadSleepData]);

  const saveSleepEntry = useCallback(async (entry: SleepEntry) => {
    setEntries(prev => {
      const existingIndex = prev.findIndex(e => e.date === entry.date);
      let updated;
      if (existingIndex >= 0) {
        updated = [...prev];
        updated[existingIndex] = entry;
      } else {
        updated = [entry, ...prev];
      }
      localStorage.setItem('sleep-tracker', JSON.stringify(updated));
      return updated;
    });

    if (user) {
      try {
        await sleepService.upsert(entry);
      } catch (err) {
        console.error('Error syncing sleep entry:', err);
        toast.error('Entry saved locally. Cloud sync will retry when online.');
      }
    }
  }, [user]);

  return { entries, saveSleepEntry, isLoading, refreshSleepData: loadSleepData };
};

// Hook for safety plan
export const useSafetyPlan = () => {
  const { user } = useAuth();
  const [plan, setPlan] = useState<SafetyPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadSafetyPlan = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      try {
        const data = await safetyPlanService.get();
        if (data) {
          setPlan(data);
        } else {
          const local = localStorage.getItem('personal-safety-plan');
          if (local) setPlan(JSON.parse(local));
        }
      } catch (err) {
        console.error('Error loading safety plan:', err);
        const local = localStorage.getItem('personal-safety-plan');
        if (local) setPlan(JSON.parse(local));
      } finally {
        setIsLoading(false);
      }
    } else {
      const local = localStorage.getItem('personal-safety-plan');
      if (local) setPlan(JSON.parse(local));
    }
  }, [user]);

  useEffect(() => {
    loadSafetyPlan();
  }, [loadSafetyPlan]);

  const savePlan = useCallback(async (updatedPlan: SafetyPlan) => {
    setPlan(updatedPlan);
    localStorage.setItem('personal-safety-plan', JSON.stringify(updatedPlan));

    if (user) {
      try {
        console.log('[SafetyPlan] Saving plan to cloud for user:', user.id);
        const savedPlan = await safetyPlanService.upsert(updatedPlan);
        console.log('[SafetyPlan] Plan saved successfully:', savedPlan?.id);
        toast.success('Safety plan saved');
      } catch (err: any) {
        console.error('[SafetyPlan] Error syncing safety plan:', err);
        console.error('[SafetyPlan] Error details:', err?.message, err?.code, err?.details);
        toast.error(`Safety plan saved locally. Cloud sync failed: ${err?.message || 'Unknown error'}`);
      }
    } else {
      console.log('[SafetyPlan] No user logged in, plan saved to localStorage only');
    }
  }, [user]);

  return { plan, savePlan, isLoading, refreshSafetyPlan: loadSafetyPlan };
};

// Hook for grounding exercises progress
export const useGroundingProgress = () => {
  const { user } = useAuth();
  const [completed, setCompleted] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const loadProgress = useCallback(async () => {
    if (user) {
      setIsLoading(true);
      try {
        const data = await groundingService.getTodayProgress();
        if (data) {
          setCompleted(data.exercises_completed || []);
        } else {
          // Fall back to localStorage
          const local = localStorage.getItem('grounding-completed-today');
          if (local) {
            const parsed = JSON.parse(local);
            if (parsed.date === today) {
              setCompleted(parsed.exercises || []);
            }
          }
        }
      } catch (err) {
        console.error('Error loading grounding progress:', err);
        const local = localStorage.getItem('grounding-completed-today');
        if (local) {
          const parsed = JSON.parse(local);
          if (parsed.date === today) {
            setCompleted(parsed.exercises || []);
          }
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      const local = localStorage.getItem('grounding-completed-today');
      if (local) {
        const parsed = JSON.parse(local);
        if (parsed.date === today) {
          setCompleted(parsed.exercises || []);
        }
      }
    }
  }, [user, today]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const markCompleted = useCallback(async (exerciseId: string) => {
    const newCompleted = [...completed, exerciseId];
    setCompleted(newCompleted);
    localStorage.setItem('grounding-completed-today', JSON.stringify({
      date: today,
      exercises: newCompleted
    }));

    if (user) {
      try {
        await groundingService.markComplete(exerciseId);
      } catch (err) {
        console.error('Error syncing grounding progress:', err);
      }
    }
  }, [user, completed, today]);

  return { completed, markCompleted, isLoading, refreshProgress: loadProgress };
};
