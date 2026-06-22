import { useState, useCallback, useEffect } from 'react';
import type { CalendarView } from '@/types/calendar';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

const STORAGE_KEY = 'elec-mate-calendar-settings';

interface CalendarSettings {
  defaultView: CalendarView;
  workingHoursStart: number;
  workingHoursEnd: number;
  defaultReminderMinutes: number;
}

const DEFAULT_SETTINGS: CalendarSettings = {
  // Planner-first: a new user with no saved preference lands on Week view.
  // A user's explicitly chosen view is persisted and merged over this default.
  defaultView: 'week',
  workingHoursStart: 8,
  workingHoursEnd: 18,
  defaultReminderMinutes: 30,
};

function loadSettings(): CalendarSettings {
  return { ...DEFAULT_SETTINGS, ...storageGetJSONSync<Partial<CalendarSettings>>(STORAGE_KEY, {}) };
}

export function useCalendarSettings() {
  const [settings, setSettings] = useState<CalendarSettings>(loadSettings);

  // Persist to localStorage on change
  useEffect(() => {
    storageSetJSONSync(STORAGE_KEY, settings);
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
