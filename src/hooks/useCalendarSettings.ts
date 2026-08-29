import { useState, useCallback, useEffect } from 'react';
import type { CalendarView } from '@/types/calendar';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { supabase } from '@/integrations/supabase/client';

const STORAGE_KEY = 'elec-mate-calendar-settings';

interface CalendarSettings {
  defaultView: CalendarView;
  workingHoursStart: number;
  workingHoursEnd: number;
  defaultReminderMinutes: number;
  /**
   * How many jobs can run at the same time.
   *
   * The calendar used to assume one: anything overlapping was a "clash" to be
   * warned about. That is wrong for anyone with people working for them — three
   * or four jobs running at once is the normal state of a small firm, not an
   * error. This is what turns an overlap from a mistake into a day at capacity,
   * and it is what the day sheet counts against when it decides whether a slot
   * is still bookable.
   */
  jobsAtOnce: number;
}

const DEFAULT_SETTINGS: CalendarSettings = {
  // Planner-first: a new user with no saved preference lands on Week view.
  // A user's explicitly chosen view is persisted and merged over this default.
  defaultView: 'week',
  workingHoursStart: 8,
  workingHoursEnd: 18,
  defaultReminderMinutes: 30,
  // One, because a sole trader is the common case and it reproduces the old
  // behaviour exactly. Anyone with a second pair of hands raises it once.
  jobsAtOnce: 1,
};

/** Guards a persisted value that could be anything after a hand-edit. */
const sane = (n: unknown): number =>
  Number.isFinite(Number(n)) && Number(n) >= 1 ? Math.floor(Number(n)) : 1;

function loadSettings(): CalendarSettings {
  const stored = storageGetJSONSync<Partial<CalendarSettings>>(STORAGE_KEY, {});
  const merged = { ...DEFAULT_SETTINGS, ...stored };
  // Everyone who used the calendar before this setting existed has no value
  // saved, and a zero or a NaN here would make every slot read as full.
  return { ...merged, jobsAtOnce: sane(merged.jobsAtOnce) };
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

  const setJobsAtOnce = useCallback(
    (jobs: number) => {
      const value = sane(jobs);
      updateSettings({ jobsAtOnce: value });
      /*
       * Write-through to the profile, fire-and-forget.
       *
       * The internal calendar reads localStorage (sync, instant); the PUBLIC
       * booking engine runs server-side and can only see the profile row. If
       * these drift, the customer-facing page and the diary disagree about
       * whether a slot is free — the one thing a booking system must never do.
       * Known limit: a second device keeps its own localStorage value; the
       * profile carries whichever device wrote last, which is also the value
       * the public page uses. Good enough until settings move server-side.
       */
      void (async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        await supabase
          .from('profiles')
          .update({ scheduling_jobs_at_once: value })
          .eq('id', user.id);
      })();
    },
    [updateSettings]
  );

  return {
    settings,
    updateSettings,
    setDefaultView,
    setWorkingHours,
    setDefaultReminder,
    setJobsAtOnce,
  };
}
