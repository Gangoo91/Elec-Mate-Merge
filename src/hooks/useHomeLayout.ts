/**
 * useHomeLayout — what the home screen shows, in what order, per user (ELE-1804).
 *
 * Until this, the only thing anyone could change was which hub CARDS appear at
 * the very bottom of the page. Everything above them — the study shortcuts, the
 * streak/sessions figures — was fixed by role, so an apprentice-tier electrician
 * who switched Study Centre off still opened the app onto "Study now /
 * Flashcards / Mock exam / Streak". Three people said so in one week; none of
 * them had ever found the customise link.
 *
 * Stored as ONE jsonb row in `user_settings` (key `home_layout`) — owner-only
 * RLS already exists, so it is per user, survives sign-out and follows them to
 * another device. No row = today's layout for their role, exactly, so nobody
 * sees a change they did not ask for.
 */

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { CALENDAR_PATH } from '@/components/calendar/diaryLinks';

export type HomeBlockId = 'mate' | 'shortcuts' | 'diary' | 'numbers' | 'resume' | 'hubs';
export type HomeNumbers = 'business' | 'study';
export type HomePresetId = 'work' | 'study' | 'both';

export interface HomeLayout {
  order: HomeBlockId[];
  hidden: HomeBlockId[];
  shortcuts: string[];
  numbers: HomeNumbers;
  /** Set by the first save or by dismissing the hint — the hint never returns. */
  hintDismissed?: boolean;
}

export const HOME_BLOCKS: Record<
  HomeBlockId,
  { label: string; description: string; /** Shown in edit mode when the block has nothing to show yet. */ emptyNote: string }
> = {
  mate: { label: 'Ask Mate', description: 'Ask about regs, snags or tasks', emptyNote: 'The Ask Mate bar.' },
  shortcuts: { label: 'Shortcuts', description: 'Your four one-tap buttons', emptyNote: 'No shortcuts picked — tap Change shortcuts.' },
  diary: { label: 'Diary', description: "What's booked next", emptyNote: "Your next bookings show here." },
  numbers: { label: 'Numbers', description: 'Business figures or study progress', emptyNote: 'Your figures show here.' },
  resume: {
    label: 'Pick up where you left off',
    description: 'Unfinished certs and quotes',
    emptyNote: 'Nothing unfinished right now. A part-done cert or quote shows here.',
  },
  hubs: { label: 'Hubs', description: 'Cards for each part of the app', emptyNote: 'All hub cards are switched off — tap Choose hub cards.' },
};

export interface HomeShortcut {
  id: string;
  title: string;
  description: string;
  path: string;
  group: 'work' | 'study';
}

// Every path verified against the route tables (AppRouter, ElectricianHubRoutes,
// ApprenticeRoutes, StudyCentreRoutes) on 4 Oct 2026.
export const HOME_SHORTCUTS: HomeShortcut[] = [
  { id: 'new-cert', title: 'New certificate', description: 'EICR, EIC or Minor Works', path: '/electrician/inspection-testing', group: 'work' },
  { id: 'new-quote', title: 'New quote', description: 'Price up a job', path: '/electrician/quotes', group: 'work' },
  { id: 'new-invoice', title: 'New invoice', description: 'Bill completed work', path: '/electrician/invoices', group: 'work' },
  { id: 'calendar', title: 'Calendar', description: 'Your diary and bookings', path: CALENDAR_PATH, group: 'work' },
  { id: 'jobs', title: 'Jobs', description: "What's on the go", path: '/electrician/projects', group: 'work' },
  { id: 'site-safety', title: 'Site safety', description: 'RAMS and permits', path: '/electrician/site-safety', group: 'work' },
  { id: 'calculators', title: 'Calculators', description: 'Cable size, Zs, volt drop', path: '/electrician/calculations', group: 'work' },
  { id: 'elec-ai', title: 'Elec-AI', description: 'Regs and fault finding help', path: '/electrician-tools/ai-tooling', group: 'work' },
  { id: 'study-now', title: 'Study now', description: 'Pick up your course', path: '/study-centre/apprentice', group: 'study' },
  { id: 'flashcards', title: 'Flashcards', description: 'Ten minutes of revision', path: '/apprentice/on-job-tools/flashcards', group: 'study' },
  { id: 'mock-exams', title: 'Mock exam', description: 'Test yourself', path: '/study-centre/mock-exams', group: 'study' },
  { id: 'on-job-tools', title: 'On-job tools', description: 'What you need on site', path: '/apprentice/on-job-tools', group: 'study' },
  { id: 'log-hours', title: 'Log hours', description: 'Off-the-job training', path: '/apprentice/ojt-hub', group: 'study' },
];

export const MAX_SHORTCUTS = 4;

const WORK_SHORTCUTS = ['new-cert', 'new-quote', 'new-invoice', 'site-safety'];
const STUDY_SHORTCUTS = ['study-now', 'flashcards', 'mock-exams', 'on-job-tools'];

export const HOME_PRESETS: Record<HomePresetId, { label: string; description: string; layout: Omit<HomeLayout, 'hintDismissed'> }> = {
  work: {
    label: 'Jobs & certs',
    description: 'Diary first, work shortcuts, business figures',
    layout: {
      order: ['diary', 'shortcuts', 'mate', 'numbers', 'resume', 'hubs'],
      hidden: [],
      shortcuts: ['new-cert', 'new-quote', 'new-invoice', 'calendar'],
      numbers: 'business',
    },
  },
  study: {
    label: 'Studying',
    description: 'Course, flashcards and mocks up front',
    layout: {
      order: ['shortcuts', 'mate', 'numbers', 'resume', 'hubs', 'diary'],
      hidden: ['diary'],
      shortcuts: STUDY_SHORTCUTS,
      numbers: 'study',
    },
  },
  both: {
    label: 'A bit of both',
    description: 'Diary, then work and study side by side',
    layout: {
      order: ['diary', 'shortcuts', 'mate', 'numbers', 'resume', 'hubs'],
      hidden: [],
      shortcuts: ['new-cert', 'calendar', 'study-now', 'mock-exams'],
      numbers: 'study',
    },
  },
};

/** Today's layout, unchanged, for anyone who has never customised. */
export function defaultHomeLayout(role: string | null | undefined): HomeLayout {
  if (role === 'apprentice') {
    // Apprentices never had the diary on home — it stays off by default, but it
    // is now one switch away rather than unavailable.
    return {
      order: ['mate', 'shortcuts', 'numbers', 'resume', 'hubs', 'diary'],
      hidden: ['diary'],
      shortcuts: STUDY_SHORTCUTS,
      numbers: 'study',
    };
  }
  return {
    order: ['mate', 'shortcuts', 'diary', 'numbers', 'resume', 'hubs'],
    hidden: [],
    shortcuts: WORK_SHORTCUTS,
    numbers: 'business',
  };
}

const ALL_BLOCKS = Object.keys(HOME_BLOCKS) as HomeBlockId[];
const SHORTCUT_IDS = new Set(HOME_SHORTCUTS.map((s) => s.id));

/**
 * Make a stored value safe to render: drop unknown ids, append any block added
 * after the row was written (so a new block shows up rather than vanishing),
 * cap the shortcuts.
 */
function sanitise(raw: unknown, fallback: HomeLayout): HomeLayout {
  if (!raw || typeof raw !== 'object') return fallback;
  const r = raw as Partial<HomeLayout>;
  const order = (Array.isArray(r.order) ? r.order : []).filter(
    (b, i, a): b is HomeBlockId => ALL_BLOCKS.includes(b as HomeBlockId) && a.indexOf(b) === i
  );
  for (const b of fallback.order) if (!order.includes(b)) order.push(b);
  const hidden = (Array.isArray(r.hidden) ? r.hidden : []).filter((b): b is HomeBlockId =>
    ALL_BLOCKS.includes(b as HomeBlockId)
  );
  const shortcuts = (Array.isArray(r.shortcuts) ? r.shortcuts : fallback.shortcuts)
    .filter((s, i, a) => typeof s === 'string' && SHORTCUT_IDS.has(s) && a.indexOf(s) === i)
    .slice(0, MAX_SHORTCUTS);
  return {
    order,
    hidden,
    shortcuts,
    numbers: r.numbers === 'study' || r.numbers === 'business' ? r.numbers : fallback.numbers,
    hintDismissed: r.hintDismissed === true,
  };
}

/** Which preset (if any) the layout currently matches — for the "Start from" chips. */
export function matchingPreset(layout: HomeLayout): HomePresetId | null {
  for (const [id, p] of Object.entries(HOME_PRESETS) as [HomePresetId, (typeof HOME_PRESETS)[HomePresetId]][]) {
    const visible = (l: Omit<HomeLayout, 'hintDismissed'>) => l.order.filter((b) => !l.hidden.includes(b)).join();
    if (
      visible(p.layout) === visible(layout) &&
      p.layout.shortcuts.join() === layout.shortcuts.join() &&
      p.layout.numbers === layout.numbers
    ) {
      return id;
    }
  }
  return null;
}

const KEY = 'home_layout';
const SAVE_DELAY_MS = 500;

export function useHomeLayout() {
  const { user, profile } = useAuth();
  const queryClient = useQueryClient();
  const role = profile?.role;
  const fallback = useMemo(() => defaultHomeLayout(role), [role]);
  const queryKey = useMemo(() => ['home-layout', user?.id], [user?.id]);

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async (): Promise<{ stored: boolean; value: unknown }> => {
      if (!user?.id) return { stored: false, value: null };
      const { data: row, error } = await supabase
        .from('user_settings')
        .select('value')
        .eq('user_id', user.id)
        .eq('key', KEY)
        .maybeSingle();
      // A read failure renders the default layout — never a blank home screen.
      if (error || !row) return { stored: false, value: null };
      return { stored: true, value: row.value };
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  const layout = useMemo(
    () => (data?.stored ? sanitise(data.value, fallback) : fallback),
    [data, fallback]
  );

  // Debounced write: tapping ▲ four times must not race four upserts where an
  // older one could land last. The cache updates instantly; the row follows.
  const pending = useRef<HomeLayout | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flush = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    const value = pending.current;
    pending.current = null;
    if (!value || !user?.id) return;
    const { error } = await supabase.from('user_settings').upsert(
      // jsonb column; the generated type is a recursive Json union.
      { user_id: user.id, key: KEY, value: value as never, updated_at: new Date().toISOString() },
      { onConflict: 'user_id,key' }
    );
    if (error) {
      console.error('[home-layout] save failed', error);
      queryClient.invalidateQueries({ queryKey });
    }
  }, [user?.id, queryClient, queryKey]);

  // Never drop an edit made just before navigating away.
  useEffect(
    () => () => {
      if (pending.current) void flush();
    },
    [flush]
  );

  const save = useCallback(
    (next: HomeLayout) => {
      const value: HomeLayout = { ...next, hintDismissed: true };
      queryClient.setQueryData(queryKey, { stored: true, value });
      pending.current = value;
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => void flush(), SAVE_DELAY_MS);
    },
    [queryClient, queryKey, flush]
  );

  const update = useCallback(
    (patch: Partial<HomeLayout>) => save({ ...layout, ...patch }),
    [layout, save]
  );

  const applyPreset = useCallback(
    (id: HomePresetId) => save({ ...HOME_PRESETS[id].layout }),
    [save]
  );

  const reset = useCallback(() => save({ ...fallback }), [fallback, save]);

  const isVisible = useCallback((b: HomeBlockId) => !layout.hidden.includes(b), [layout]);

  return {
    layout,
    isLoading,
    /** True once they have saved anything — used to decide on the hint. */
    hasSaved: !!data?.stored,
    isVisible,
    update,
    applyPreset,
    reset,
    dismissHint: () => save(layout),
    flush,
  };
}
