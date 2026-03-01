import { useState, useCallback, useEffect } from 'react';
import type { CalendarView } from '@/types/calendar';

const STORAGE_KEY = 'elec-mate-calendar-settings';

interface CalendarSettings {
  defaultView: CalendarView;
  workingHoursStart: number;
  workingHoursEnd: number;
  defaultReminderMinutes: number;
}

const DEFAULT_SETTINGS: CalendarSettings = {
  defaultView: 'month',
  workingHoursStart: 8,
  workingHoursEnd: 18,
  defaultReminderMinutes: 30,
};

function loadSettings(): CalendarSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch {
    // Ignore parse errors
  }
  return DEFAULT_SETTINGS;
}

export function useCalendarSettings() {
  const [settings, setSettings] = useState<CalendarSettings>(loadSettings);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((updates: Partial<CalendarSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  }, []);

  const setDefaultView = useCallback(
    (view: CalendarView) => updateSettings({ defaultView: view }),
    [updateSettings]
  );

  const setWorkingHours = useCallback(
    (start: number, end: number) =>
      updateSettings({ workingHoursStart: start, workingHoursEnd: end }),
    [updateSettings]
  );

  const setDefaultReminder = useCallback(
    (minutes: number) => updateSettings({ defaultReminderMinutes: minutes }),
    [updateSettings]
  );

  return {
    settings,
    updateSettings,
    setDefaultView,
    setWorkingHours,
    setDefaultReminder,
  };
}
