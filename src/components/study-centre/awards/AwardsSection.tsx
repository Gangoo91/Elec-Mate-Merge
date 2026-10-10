/**
 * Awards — every award, what you have, and how close you are (10 Oct 2026).
 *
 * Andrew: "any more awards we can give people?" … "make sure they're all
 * excellent and add more that's really good".
 *
 * Everything here comes from my_awards(): the catalogue (study_awards), whether
 * you have each one and when, your progress towards the countable ones, and
 * what share of learners hold it. Icons come from achievementDefinitions.
 *
 * Phone: one column of rows, a chip rail to filter, tap for a detail sheet.
 * Larger screens: two or three columns of the same rows.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { SupabaseClient } from '@supabase/supabase-js';
import {
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  CalendarCheck,
  CalendarDays,
  CalendarHeart,
  CalendarRange,
  CheckCheck,
  ClipboardCheck,
  Clock,
  Crown,
  DoorOpen,
  Dumbbell,
  Eraser,
  FileCheck2,
  FileText,
  Flame,
  FolderOpen,
  Footprints,
  Gem,
  GraduationCap,
  Hash,
  Layers,
  Library,
  Medal,
  Mountain,
  Notebook,
  PenLine,
  PieChart,
  Rocket,
  RotateCcw,
  ScrollText,
  Snowflake,
  Sparkles,
  Star,
  Sunrise,
  Target,
  TrendingUp,
  Trophy,
  Undo2,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { supabase as typedSupabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { COLLEGE_BTN, CollegeSectionTitle, chipCn } from '@/components/college/ui/CollegeUi';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { ACHIEVEMENT_DEFINITIONS } from '@/data/achievementDefinitions';

const supabase = typedSupabase as unknown as SupabaseClient;

type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

interface Award {
  id: string;
  title: string;
  description: string;
  category: string;
  rarity: Rarity;
  xp: number;
  how: 'app' | 'server';
  unlocked_at: string | null;
  current: number | null;
  target: number | null;
  share: number;
}

const FILTERS: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unlocked', label: 'Unlocked' },
  { key: 'mocks', label: 'Mock exams' },
  { key: 'revision', label: 'Revision' },
  { key: 'habits', label: 'Study habits' },
  { key: 'board', label: 'Leaderboard' },
  { key: 'quizzes', label: 'Quizzes' },
  { key: 'flashcards', label: 'Flashcards' },
  { key: 'courses', label: 'Courses' },
  { key: 'work', label: 'Work and portfolio' },
  { key: 'xp', label: 'XP and levels' },
];

const RARITY_LABEL: Record<Rarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

// Only the icons the awards use, so the page doesn't carry the whole set.
const ICONS: Record<string, LucideIcon> = {
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  CalendarCheck,
  CalendarDays,
  CalendarHeart,
  CalendarRange,
  CheckCheck,
  ClipboardCheck,
  Clock,
  Crown,
  DoorOpen,
  Dumbbell,
  Eraser,
  FileCheck2,
  FileText,
  Flame,
  FolderOpen,
  Footprints,
  Gem,
  GraduationCap,
  Hash,
  Layers,
  Library,
  Medal,
  Mountain,
  Notebook,
  PenLine,
  PieChart,
  Rocket,
  RotateCcw,
  ScrollText,
  Snowflake,
  Sparkles,
  Star,
  Sunrise,
  Target,
  TrendingUp,
  Trophy,
  Undo2,
  Zap,
};
const ICON_NAME = new Map(ACHIEVEMENT_DEFINITIONS.map((d) => [d.id, d.icon]));

function AwardIcon({ id, className }: { id: string; className?: string }) {
  const Icon = ICONS[ICON_NAME.get(id) ?? ''] ?? Award;
  return <Icon className={className} aria-hidden />;
}

/** Unlocked epic and legendary awards earn the volt; the rest go green. */
function iconBox(a: Award) {
  if (!a.unlocked_at) return 'bg-white/[0.08] text-white';
  return a.rarity === 'epic' || a.rarity === 'legendary'
    ? 'bg-elec-yellow text-black'
    : 'bg-emerald-400 text-black';
}

/**
 * "New" = unlocked since you last looked at your awards on this device; the
 * first time, anything from the last 7 days. (A backfill can land a dozen
 * awards at once; a week of "New" on all of them would mean nothing.)
 */
const SEEN_KEY = (uid: string) => `awards-seen-at:${uid}`;
const isNewSince = (a: Award, since: number) =>
  !!a.unlocked_at && new Date(a.unlocked_at).getTime() > since;

const pctOf = (a: Award) =>
  a.target && a.current !== null ? Math.min(100, Math.round((a.current / a.target) * 100)) : 0;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

function shareText(share: number) {
  if (share <= 0) return 'Nobody has this yet';
  if (share < 1) return 'Fewer than 1 in 100 learners have this';
  return `${Math.round(share)}% of learners have this`;
}

function howText(a: Award) {
  if (a.category === 'board')
    return 'Awarded on the 1st of each month for the month just gone, from the leaderboard’s own figures.';
  if (a.how === 'server') return 'Checked automatically. It unlocks the moment you do it.';
  return 'Checked whenever you study. It unlocks the next time the app checks.';
}

function Bar({ pct, className }: { pct: number; className?: string }) {
  return (
    <span className={cn('block h-1.5 overflow-hidden rounded-full bg-white/[0.12]', className)}>
      <span
        className="block h-full rounded-full bg-elec-yellow"
        style={{ width: `${Math.max(pct, 3)}%` }}
      />
    </span>
  );
}

function AwardRow({ a, isNew, onOpen }: { a: Award; isNew: boolean; onOpen: () => void }) {
  const got = !!a.unlocked_at;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-start gap-3 rounded-2xl card-landing p-4 text-left transition-colors touch-manipulation hover:border-white/[0.3] active:bg-white/[0.08]"
    >
      <span
        className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', iconBox(a))}
      >
        <AwardIcon id={a.id} className="h-5 w-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-[15px] font-semibold leading-snug text-white">{a.title}</span>
          {isNew && (
            <span className="rounded-full bg-elec-yellow px-2 py-0.5 text-[11.5px] font-bold text-black">
              New
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-white">{a.description}</span>
        {!got && a.target && a.current !== null && a.current > 0 ? (
          <span className="mt-2 flex items-center gap-2">
            <Bar pct={pctOf(a)} className="flex-1" />
            <span className="shrink-0 text-[12.5px] font-semibold tabular-nums text-white">
              {a.current.toLocaleString()} of {a.target.toLocaleString()}
            </span>
          </span>
        ) : (
          <span className="mt-1.5 block text-[12.5px] text-white">
            {got
              ? `Unlocked ${fmtDate(a.unlocked_at!)} · ${RARITY_LABEL[a.rarity]}`
              : `${RARITY_LABEL[a.rarity]} · ${shareText(a.share)}`}
          </span>
        )}
      </span>
      <span
        className={cn(
          'shrink-0 pt-0.5 text-[13px] font-bold tabular-nums',
          got ? 'text-emerald-400' : 'text-white'
        )}
      >
        +{a.xp}
      </span>
    </button>
  );
}

export function AwardsSection() {
  const { user } = useAuth();
  const [awards, setAwards] = useState<Award[] | null>(null);
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<Award | null>(null);
  // When this learner last looked, read once; then marked as now.
  const [seen, setSeen] = useState<{ uid: string; since: number } | null>(null);
  const seenSince = seen && seen.uid === user?.id ? seen.since : null;
  useEffect(() => {
    if (!user || seen?.uid === user.id) return;
    let prev = Date.now() - 7 * 86400000;
    try {
      const v = Number(localStorage.getItem(SEEN_KEY(user.id)));
      if (v > 0) prev = v;
      localStorage.setItem(SEEN_KEY(user.id), String(Date.now()));
    } catch {
      /* private mode: fall back to the last 7 days */
    }
    setSeen({ uid: user.id, since: prev });
  }, [user, seen]);

  // Opened from "Your awards" (/study-centre/leaderboard#awards): come to the section.
  const location = useLocation();
  const jumped = useRef(false);
  useEffect(() => {
    if (jumped.current || awards === null || location.hash !== '#awards') return;
    jumped.current = true;
    requestAnimationFrame(() =>
      document.getElementById('lb-awards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  }, [awards, location.hash]);

  const load = useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase.rpc('my_awards');
    if (!error) setAwards((data ?? []) as Award[]);
  }, [user]);

  useEffect(() => {
    void load();
    // New awards land with XP: refresh when XP does.
    let t: ReturnType<typeof setTimeout> | undefined;
    const soon = () => {
      clearTimeout(t);
      t = setTimeout(() => void load(), 1500);
    };
    window.addEventListener('elecmate:activity-logged', soon);
    window.addEventListener('elecmate:xp-check', soon);
    return () => {
      clearTimeout(t);
      window.removeEventListener('elecmate:activity-logged', soon);
      window.removeEventListener('elecmate:xp-check', soon);
    };
  }, [load]);

  const all = useMemo(() => awards ?? [], [awards]);
  const got = useMemo(() => all.filter((a) => a.unlocked_at), [all]);
  const xpFromAwards = got.reduce((s, a) => s + a.xp, 0);

  // Closest to unlocking: started, not finished, furthest along first.
  const closest = useMemo(
    () =>
      all
        .filter((a) => !a.unlocked_at && a.target && (a.current ?? 0) > 0)
        .sort((x, y) => pctOf(y) - pctOf(x))
        .slice(0, 3),
    [all]
  );

  const list = useMemo(() => {
    const picked =
      filter === 'all'
        ? all
        : filter === 'unlocked'
          ? got
          : all.filter((a) => a.category === filter);
    // Newest unlocks first, then the ones you're furthest along, then the rest.
    return [...picked].sort((x, y) => {
      if (!!x.unlocked_at !== !!y.unlocked_at) return x.unlocked_at ? -1 : 1;
      if (x.unlocked_at && y.unlocked_at) return y.unlocked_at.localeCompare(x.unlocked_at);
      return pctOf(y) - pctOf(x);
    });
  }, [all, got, filter]);

  const LIMIT = 12;
  const shown = showAll || filter !== 'all' ? list : list.slice(0, LIMIT);

  if (!user) return null;

  return (
    <section aria-labelledby="lb-awards" className="space-y-4">
      <CollegeSectionTitle
        id="lb-awards"
        title="Awards"
        sub={
          awards
            ? `${got.length} of ${all.length} unlocked · ${xpFromAwards.toLocaleString()} XP from awards. Each pays once.`
            : 'Loading your awards…'
        }
      />

      {awards && (
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.1]" aria-hidden>
          <div
            className="h-full rounded-full bg-emerald-400"
            style={{ width: `${all.length ? (got.length / all.length) * 100 : 0}%` }}
          />
        </div>
      )}

      {seenSince !== null && got.some((a) => isNewSince(a, seenSince)) && (
        <button
          type="button"
          onClick={() => {
            setFilter('unlocked');
            setShowAll(false);
          }}
          className="flex min-h-[48px] w-full items-center gap-3 rounded-2xl border border-elec-yellow px-4 py-2.5 text-left touch-manipulation active:bg-white/[0.06]"
        >
          <Award className="h-5 w-5 shrink-0 text-elec-yellow" aria-hidden />
          <span className="text-[14px] font-semibold text-white">
            {(() => {
              const fresh = got.filter((a) => isNewSince(a, seenSince));
              const xp = fresh.reduce((t, a) => t + a.xp, 0);
              return `${fresh.length} new ${fresh.length === 1 ? 'award' : 'awards'} since you last looked · +${xp.toLocaleString()} XP`;
            })()}
          </span>
        </button>
      )}

      {/* Closest to unlocking */}
      {closest.length > 0 && (
        <div className="-mx-4 card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-4 sm:mx-0 sm:rounded-2xl sm:px-6">
          <p className="text-[13px] font-semibold text-white">Closest to unlocking</p>
          <ul className="mt-2 divide-y divide-white/[0.08]">
            {closest.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => setOpen(a)}
                  className="flex min-h-[56px] w-full items-center gap-3 py-2.5 text-left touch-manipulation active:opacity-80"
                >
                  <span
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                      iconBox(a)
                    )}
                  >
                    <AwardIcon id={a.id} className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="text-[14px] font-semibold leading-snug text-white">
                        {a.title}
                      </span>
                      <span className="shrink-0 text-[12.5px] font-semibold tabular-nums text-white">
                        {a.current!.toLocaleString()} of {a.target!.toLocaleString()}
                      </span>
                    </span>
                    <Bar pct={pctOf(a)} className="mt-1.5" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filter: a chip rail on a phone, wrapping from sm. */}
      <div
        role="group"
        aria-label="Show awards"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {FILTERS.filter(
          (f) => f.key === 'all' || f.key === 'unlocked' || all.some((a) => a.category === f.key)
        ).map((f) => {
          const n =
            f.key === 'all'
              ? null
              : f.key === 'unlocked'
                ? got.length
                : all.filter((a) => a.category === f.key).length;
          return (
            <button
              key={f.key}
              type="button"
              aria-pressed={filter === f.key}
              onClick={() => {
                setFilter(f.key);
                setShowAll(false);
              }}
              className={cn(chipCn(filter === f.key), 'shrink-0 whitespace-nowrap')}
            >
              {f.label}
              {n !== null && <span className="ml-1.5 tabular-nums">{n}</span>}
            </button>
          );
        })}
      </div>

      {awards === null ? (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3" aria-busy>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[92px] animate-pulse rounded-2xl bg-white/[0.06]" />
          ))}
        </div>
      ) : shown.length === 0 ? (
        <p className="rounded-2xl card-landing p-5 text-[14px] text-white">
          {filter === 'unlocked'
            ? 'None unlocked yet. Your first mock exam, quiz or flashcard earns one.'
            : 'No awards here yet.'}
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((a) => (
            <AwardRow
              key={a.id}
              a={a}
              isNew={seenSince !== null && isNewSince(a, seenSince)}
              onOpen={() => setOpen(a)}
            />
          ))}
        </div>
      )}

      {filter === 'all' && list.length > LIMIT && (
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className={cn(COLLEGE_BTN, 'w-full sm:w-auto')}
        >
          {showAll ? 'Show fewer' : `Show all ${list.length} awards`}
        </button>
      )}

      {/* Detail */}
      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[88dvh] overflow-y-auto overscroll-contain rounded-t-2xl border-white/[0.1] bg-background p-0"
        >
          <div aria-hidden className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/[0.25]" />
          {open && (
            <div className="px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    'flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl',
                    iconBox(open)
                  )}
                >
                  <AwardIcon id={open.id} className="h-8 w-8" />
                </span>
                <div className="min-w-0">
                  <SheetTitle className="break-words text-[22px] font-bold leading-tight text-white">
                    {open.title}
                  </SheetTitle>
                  <p className="mt-0.5 text-[13px] font-medium text-white">
                    {RARITY_LABEL[open.rarity]} · +{open.xp} XP
                  </p>
                </div>
              </div>
              <SheetDescription className="mt-4 text-[15px] leading-relaxed text-white">
                {open.description}.
              </SheetDescription>

              <div className="mt-4 rounded-xl border border-white/[0.12] px-4 py-3">
                {open.unlocked_at ? (
                  <p className="text-[14px] font-semibold text-emerald-400">
                    Unlocked {fmtDate(open.unlocked_at)}
                  </p>
                ) : open.target && open.current !== null ? (
                  <>
                    <p className="flex justify-between text-[14px] font-semibold text-white">
                      <span>{open.id === 'days-20m' ? 'This month' : 'Your progress'}</span>
                      <span className="tabular-nums">
                        {open.current.toLocaleString()} of {open.target.toLocaleString()}
                      </span>
                    </p>
                    <Bar pct={pctOf(open)} className="mt-2" />
                    <p className="mt-2 text-[13px] text-white">
                      {(open.target - open.current).toLocaleString()} to go.
                    </p>
                  </>
                ) : (
                  <p className="text-[14px] font-semibold text-white">Not unlocked yet</p>
                )}
                <p className="mt-2 text-[13px] text-white">{shareText(open.share)}.</p>
              </div>

              <p className="mt-3 text-[13px] leading-relaxed text-white">{howText(open)}</p>

              <button
                type="button"
                onClick={() => setOpen(null)}
                className={cn(COLLEGE_BTN, 'mt-5 w-full')}
              >
                Close
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
