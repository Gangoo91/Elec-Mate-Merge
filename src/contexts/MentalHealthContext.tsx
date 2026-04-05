import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMoodData } from '@/hooks/useMentalHealthSync';
import { storageGetJSONSync, storageSetJSONSync, storageGetSync, storageSetSync } from '@/utils/storage';

interface MoodEntry {
  date: string;
  mood: number;
  notes?: string;
  factors?: string[];
}

interface SelfCareReminder {
  id: string;
  title: string;
  time: string;
  frequency: 'daily' | 'weekly' | 'custom';
  isActive: boolean;
  lastCompleted?: string;
}

interface MentalHealthContextType {
  moodHistory: MoodEntry[];
  addMoodEntry: (entry: MoodEntry) => void;
  isLoading: boolean;
  reminders: SelfCareReminder[];
  setReminders: React.Dispatch<React.SetStateAction<SelfCareReminder[]>>;
  dailyCheckIn: boolean;
  setDailyCheckIn: (checked: boolean) => void;
  weeklyReflection: string;
  setWeeklyReflection: (reflection: string) => void;
  favoriteResources: string[];
  toggleFavoriteResource: (resourceId: string) => void;
}

const MentalHealthContext = createContext<MentalHealthContextType | undefined>(undefined);

export const useMentalHealth = () => {
  const context = useContext(MentalHealthContext);
  if (context === undefined) {
    throw new Error('useMentalHealth must be used within a MentalHealthProvider');
  }
  return context;
};

interface MentalHealthProviderProps {
  children: ReactNode;
}

export const MentalHealthProvider: React.FC<MentalHealthProviderProps> = ({ children }) => {
  // Use cloud-synced mood data hook
  const { moodHistory, addMoodEntry, isLoading } = useMoodData();

  const [reminders, setReminders] = useState<SelfCareReminder[]>([]);
  const [dailyCheckIn, setDailyCheckIn] = useState(false);
  const [weeklyReflection, setWeeklyReflection] = useState('');
  const [favoriteResources, setFavoriteResources] = useState<string[]>([]);

  // Load other data from storage on mount
  useEffect(() => {
    const storedReminders = storageGetJSONSync<SelfCareReminder[]>('elec-mate-selfcare-reminders', []);
    if (storedReminders.length > 0) {
      setReminders(storedReminders);
    }

    const storedCheckIn = storageGetJSONSync<{ date: string; checked: boolean } | null>('elec-mate-daily-checkin', null);
    if (storedCheckIn) {
      const today = new Date().toISOString().split('T')[0];
      if (storedCheckIn.date === today) {
        setDailyCheckIn(storedCheckIn.checked);
      }
    }

    const storedReflection = storageGetSync('elec-mate-weekly-reflection');
    if (storedReflection) {
      setWeeklyReflection(storedReflection);
    }

    const storedFavorites = storageGetJSONSync<string[]>('elec-mate-favorite-resources', []);
    if (storedFavorites.length > 0) {
      setFavoriteResources(storedFavorites);
    }
  }, []);

  // Save reminders to storage
  useEffect(() => {
    if (reminders.length > 0) {
      storageSetJSONSync('elec-mate-selfcare-reminders', reminders);
    }
  }, [reminders]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    storageSetJSONSync('elec-mate-daily-checkin', { date: today, checked: dailyCheckIn });
  }, [dailyCheckIn]);

  useEffect(() => {
    storageSetSync('elec-mate-weekly-reflection', weeklyReflection);
  }, [weeklyReflection]);

  useEffect(() => {
    storageSetJSONSync('elec-mate-favorite-resources', favoriteResources);
  }, [favoriteResources]);

  const toggleFavoriteResource = (resourceId: string) => {
    setFavoriteResources((prev) =>
      prev.includes(resourceId) ? prev.filter((id) => id !== resourceId) : [...prev, resourceId]
    );
  };

  const value: MentalHealthContextType = {
    moodHistory,
    addMoodEntry,
    isLoading,
    reminders,
    setReminders,
    dailyCheckIn,
    setDailyCheckIn,
    weeklyReflection,
    setWeeklyReflection,
    favoriteResources,
    toggleFavoriteResource,
  };

  return <MentalHealthContext.Provider value={value}>{children}</MentalHealthContext.Provider>;
};
