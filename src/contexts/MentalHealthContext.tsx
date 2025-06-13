
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MoodEntry {
  date: string;
  mood: number;
  notes?: string;
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
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [reminders, setReminders] = useState<SelfCareReminder[]>([]);
  const [dailyCheckIn, setDailyCheckIn] = useState(false);
  const [weeklyReflection, setWeeklyReflection] = useState('');
  const [favoriteResources, setFavoriteResources] = useState<string[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedMoodHistory = localStorage.getItem('elec-mate-mood-history');
    if (storedMoodHistory) {
      setMoodHistory(JSON.parse(storedMoodHistory));
    }

    const storedReminders = localStorage.getItem('elec-mate-selfcare-reminders');
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }

    const storedCheckIn = localStorage.getItem('elec-mate-daily-checkin');
    if (storedCheckIn) {
      const { date, checked } = JSON.parse(storedCheckIn);
      const today = new Date().toISOString().split('T')[0];
      if (date === today) {
        setDailyCheckIn(checked);
      }
    }

    const storedReflection = localStorage.getItem('elec-mate-weekly-reflection');
    if (storedReflection) {
      setWeeklyReflection(storedReflection);
    }

    const storedFavorites = localStorage.getItem('elec-mate-favorite-resources');
    if (storedFavorites) {
      setFavoriteResources(JSON.parse(storedFavorites));
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    if (moodHistory.length > 0) {
      localStorage.setItem('elec-mate-mood-history', JSON.stringify(moodHistory));
    }
  }, [moodHistory]);

  useEffect(() => {
    if (reminders.length > 0) {
      localStorage.setItem('elec-mate-selfcare-reminders', JSON.stringify(reminders));
    }
  }, [reminders]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('elec-mate-daily-checkin', JSON.stringify({ date: today, checked: dailyCheckIn }));
  }, [dailyCheckIn]);

  useEffect(() => {
    localStorage.setItem('elec-mate-weekly-reflection', weeklyReflection);
  }, [weeklyReflection]);

  useEffect(() => {
    localStorage.setItem('elec-mate-favorite-resources', JSON.stringify(favoriteResources));
  }, [favoriteResources]);

  const addMoodEntry = (entry: MoodEntry) => {
    setMoodHistory(prev => {
      const updated = [...prev.filter(h => h.date !== entry.date), entry]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 30); // Keep last 30 days
      return updated;
    });
  };

  const toggleFavoriteResource = (resourceId: string) => {
    setFavoriteResources(prev => 
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const value: MentalHealthContextType = {
    moodHistory,
    addMoodEntry,
    reminders,
    setReminders,
    dailyCheckIn,
    setDailyCheckIn,
    weeklyReflection,
    setWeeklyReflection,
    favoriteResources,
    toggleFavoriteResource,
  };

  return (
    <MentalHealthContext.Provider value={value}>
      {children}
    </MentalHealthContext.Provider>
  );
};
