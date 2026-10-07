import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SwipeableCard } from '@/components/ui/SwipeableCard';
import type { MyLearners } from '@/components/college/assessment/useMyLearners';
import { narrowIfCollege, useCollegeScope, type CollegeScopeLevel } from '@/components/college/scope/useCollegeScope';
import { CollegeScopeTabs } from '@/components/college/scope/CollegeScopeSwitch';

/* ==========================================================================
   Assessment kit (7 Oct 2026). Shared pieces for the assessment, progress
   and hours screens, built on the College Hub kit (CollegeUi.tsx) so every
   one of them reads like the approved inbox and Assessment Hub:

   - ScopeToggle + useScope   the shared College Hub scope (Mine / My
                              cohorts / Whole college, ELE-1886).
   - QueueRow                 the College inbox row: initials, name, kind,
                              "Yours", how long it waited, one verb button.
                              Optional tick box for bulk work (ELE-1889).
   - BulkBar                  sticky bar for the ticked rows.
   - useQueueKeys             j/k or arrows to move, Enter to open, x to tick,
                              on a desktop keyboard (ELE-1889).
   - Bars / Pipeline          the two charts most of these screens need.
   ========================================================================== */

/* ── Scope: mine first ──────────────────────────────────────────────── */

export type Scope = 'mine' | 'all';

/**
 * Mine-first scope, now a view over the ONE College Hub setting
 * (useCollegeScope, ELE-1886): the masthead switch picks Mine, My cohorts or
 * Whole college for every screen. "mine" here means either narrowed level;
 * the MyLearners sets follow the level, so filtering by `my.isMine` shows the
 * right learners. `_key` is kept for call sites.
 */
export function useScope(_key: string, _my: MyLearners): [Scope, (s: Scope) => void] {
  const { level, setLevel } = useCollegeScope();
  const set = (s: Scope) => {
    if (s === 'all') setLevel('college');
    else narrowIfCollege(setLevel, level);
  };
  return [level === 'college' ? 'all' : 'mine', set];
}

export function ScopeToggle({
  scope,
  mineCount,
  allCount,
}: {
  scope: Scope;
  onChange?: (s: Scope) => void;
  my?: MyLearners;
  mineCount?: number;
  allCount?: number;
}) {
  const { level } = useCollegeScope();
  const counts: Partial<Record<CollegeScopeLevel, number>> = {};
  if (typeof mineCount === 'number') counts[scope === 'mine' && level === 'cohorts' ? 'cohorts' : 'mine'] = mineCount;
  if (typeof allCount === 'number') counts.college = allCount;
  return <CollegeScopeTabs counts={counts} />;
}

/* ── Inbox-style row ────────────────────────────────────────────────── */

export const initialsOf = (name: string | null | undefined) =>
  (name ?? '')
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('') || '?';

export const waitingLabel = (days: number | null | undefined) =>
  days === null || days === undefined
    ? ''
    : days <= 0
      ? 'Today'
      : days === 1
        ? 'Waiting since yesterday'
        : `Waiting ${days} days`;

export function daysSince(iso: string | null | undefined) {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.max(0, Math.floor((Date.now() - t) / 86_400_000));
}

export function QueueRow({
  name,
  kind,
  mine,
  title,
  body,
  meta,
  urgent,
  action,
  onOpen,
  selectable,
  selected,
  onToggle,
  focused,
  avatar,
  trailing,
  stackTrailing,
}: {
  name: string;
  kind?: string;
  mine?: boolean;
  title?: ReactNode;
  body?: ReactNode;
  meta?: ReactNode;
  urgent?: boolean;
  action?: string;
  onOpen: () => void;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: () => void;
  focused?: boolean;
  avatar?: string;
  /** Replaces the verb button (e.g. inline approve / reject buttons). */
  trailing?: ReactNode;
  /** Below sm, put `trailing` on its own row under the name (wide buttons). */
  stackTrailing?: boolean;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      data-focused={focused || undefined}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      className={cn(
        'flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left',
        stackTrailing && 'flex-wrap sm:flex-nowrap',
        'outline-none transition-colors touch-manipulation hover:bg-white/[0.04] focus-visible:bg-white/[0.06] sm:gap-4 sm:px-5',
        focused && 'bg-white/[0.06] shadow-[inset_3px_0_0_0_hsl(47_100%_50%)]',
        selected && 'bg-white/[0.05]'
      )}
    >
      {selectable && (
        <button
          type="button"
          role="checkbox"
          aria-checked={!!selected}
          aria-label={selected ? `Untick ${name}` : `Tick ${name}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle?.();
          }}
          className="-my-2 -ml-2 flex h-11 w-11 shrink-0 items-center justify-center touch-manipulation"
        >
          <span
            className={cn(
              'flex h-5 w-5 items-center justify-center rounded-md border text-[12px] font-bold',
              selected ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/[0.35]'
            )}
          >
            {selected ? '✓' : ''}
          </span>
        </button>
      )}
      <span
        aria-hidden="true"
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[13.5px] font-bold',
          urgent ? 'bg-orange-500 text-black' : 'bg-white/[0.1] text-white'
        )}
      >
        {avatar ?? initialsOf(name)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="truncate text-[15px] font-semibold text-white">{name}</span>
          {kind && (
            <span className="shrink-0 rounded-full border border-white/[0.16] px-2 py-0.5 text-[10.5px] font-semibold text-white">
              {kind}
            </span>
          )}
          {mine && <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10.5px] font-bold text-black">Yours</span>}
        </span>
        {(title || body) && (
          <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-white">
            {title && <span className="font-semibold">{title}</span>}
            {title && body ? ' · ' : null}
            {body}
          </span>
        )}
        {meta && <span className={cn('mt-1 block text-[12px] text-white', urgent && '[&>b]:text-orange-300')}>{meta}</span>}
      </span>
      {trailing && stackTrailing ? (
        <div className="order-last flex w-full justify-end sm:order-none sm:w-auto">{trailing}</div>
      ) : (
        trailing ??
        (action ? (
          <span
            className={cn(
              'hidden h-11 min-w-[104px] shrink-0 items-center justify-center rounded-xl px-3 text-[13px] font-bold sm:inline-flex',
              urgent ? 'bg-elec-yellow text-black' : 'border border-white/[0.18] text-white'
            )}
          >
            {action}
          </span>
        ) : null)
      )}
      <ChevronRight className="h-4 w-4 shrink-0 text-white sm:hidden" aria-hidden="true" />
    </div>
  );
}

/** A titled group of QueueRows on the one list surface, like the inbox. */
export function QueueGroup({
  title,
  count,
  urgent,
  children,
  action,
}: {
  title: string;
  count?: number;
  urgent?: boolean;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3 px-1">
        <h2 className={cn('text-[13px] font-semibold', urgent ? 'text-orange-300' : 'text-white')}>{title}</h2>
        <span className="flex items-center gap-2">
          {action}
          {typeof count === 'number' && <span className="text-[12px] tabular-nums text-white">{count}</span>}
        </span>
      </div>
      <ul className="-mx-4 divide-y divide-white/[0.06] overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] sm:mx-0 sm:rounded-3xl sm:border-x">
        {children}
      </ul>
    </div>
  );
}

/* ── Swipe on a phone (ELE-1889) ───────────────────────────────────── */

export interface SwipeAct {
  label: string;
  icon: ReactNode;
  onAction: () => void;
  /** 'go' is the yellow do-it action; anything else is neutral. */
  tone?: 'go' | 'neutral';
}

const coarsePointer = () => {
  try {
    return window.matchMedia('(pointer: coarse)').matches;
  } catch {
    return false;
  }
};

/**
 * A queue row that swipes on a touch screen: right for the row's main verb,
 * left for the second one (tick, seen, return). The same verbs are on the
 * row and in the bulk bar, so swiping is a shortcut, never the only way.
 */
export function SwipeRow({ children, right, left }: { children: ReactNode; right?: SwipeAct; left?: SwipeAct }) {
  const [touch] = useState(coarsePointer);
  if (!touch || (!right && !left)) return <>{children}</>;
  const toAction = (a: SwipeAct | undefined) =>
    a && {
      label: a.label,
      icon: a.icon,
      onAction: a.onAction,
      bgColor: a.tone === 'go' ? 'bg-elec-yellow' : 'bg-white/[0.16]',
      textColor: a.tone === 'go' ? 'text-black' : 'text-white',
    };
  return (
    <SwipeableCard className="rounded-none" rightAction={toAction(right)} leftAction={toAction(left)} threshold={90}>
      {children}
    </SwipeableCard>
  );
}

/* ── Bulk bar ───────────────────────────────────────────────────────── */

export function BulkBar({
  count,
  onClear,
  children,
}: {
  count: number;
  onClear: () => void;
  children: ReactNode;
}) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed inset-x-0 z-40 px-4"
          style={{ bottom: 'calc(5.5rem + env(safe-area-inset-bottom, 0px))' }}
        >
          <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 rounded-2xl border border-white/[0.14] bg-[hsl(0_0%_9%)] p-2 pl-4 shadow-2xl">
            <span className="mr-auto text-[13.5px] font-semibold text-white">{count} ticked</span>
            {children}
            <button
              type="button"
              onClick={onClear}
              className="h-11 rounded-xl px-3 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.06]"
            >
              Clear
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Selection + keyboard ───────────────────────────────────────────── */

export function useSelection<T extends string>(visibleKeys: T[]) {
  const [sel, setSel] = useState<Set<T>>(new Set());
  // Drop ticks for rows that left the view (done, filtered out).
  const keyStr = visibleKeys.join('|');
  useEffect(() => {
    setSel((prev) => {
      const vis = new Set(visibleKeys);
      const next = new Set(Array.from(prev).filter((k) => vis.has(k)));
      return next.size === prev.size ? prev : next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyStr]);
  return useMemo(
    () => ({
      selected: sel,
      has: (k: T) => sel.has(k),
      toggle: (k: T) =>
        setSel((p) => {
          const n = new Set(p);
          if (n.has(k)) n.delete(k);
          else n.add(k);
          return n;
        }),
      setAll: (ks: T[]) => setSel(new Set(ks)),
      clear: () => setSel(new Set()),
      count: sel.size,
    }),
    [sel]
  );
}

/**
 * Desktop keyboard for a queue: j / ArrowDown next, k / ArrowUp previous,
 * Enter or o opens, x ticks, Escape clears. Ignored while typing in a field
 * or when a sheet/dialog is open.
 */
export function useQueueKeys<T extends string>({
  keys,
  onOpen,
  onToggle,
  onClear,
  extra,
}: {
  keys: T[];
  onOpen: (k: T) => void;
  onToggle?: (k: T) => void;
  onClear?: () => void;
  /** More single-key shortcuts on the focused row, e.g. { a: approve }. */
  extra?: Record<string, (k: T) => void>;
}) {
  const [focus, setFocus] = useState<T | null>(null);
  useEffect(() => {
    if (focus && !keys.includes(focus)) setFocus(null);
  }, [keys, focus]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.querySelector('[role="dialog"]')) return;
      if (keys.length === 0) return;
      const idx = focus ? keys.indexOf(focus) : -1;
      const move = (d: number) => {
        e.preventDefault();
        const next = keys[Math.max(0, Math.min(keys.length - 1, idx + d))] ?? keys[0];
        setFocus(next);
        document.querySelector(`[data-qkey="${CSS.escape(next)}"]`)?.scrollIntoView({ block: 'nearest' });
      };
      // j/k always work; the arrow keys only move between rows once a row is
      // focused, so they still scroll the page the rest of the time.
      if (e.key === 'j') return move(idx < 0 ? 0 : 1);
      if (e.key === 'k') return move(idx < 0 ? 0 : -1);
      if (idx >= 0 && e.key === 'ArrowDown') return move(1);
      if (idx >= 0 && e.key === 'ArrowUp') return move(-1);
      if (e.key === 'Escape') {
        setFocus(null);
        onClear?.();
        return;
      }
      if (!focus) return;
      if (e.key === 'Enter' || e.key === 'o') {
        e.preventDefault();
        onOpen(focus);
      } else if (e.key === 'x' && onToggle) {
        e.preventDefault();
        onToggle(focus);
      } else if (extra && extra[e.key]) {
        e.preventDefault();
        extra[e.key](focus);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [keys, focus, onOpen, onToggle, onClear, extra]);
  return { focus, setFocus };
}

/** A one-line legend of the keyboard shortcuts, desktop only. */
export function KeyHint({ items }: { items: Array<[string, string]> }) {
  return (
    <p className="hidden flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-white lg:flex">
      {items.map(([k, label]) => (
        <span key={k} className="inline-flex items-center gap-1.5">
          <kbd className="rounded-md border border-white/[0.2] px-1.5 py-0.5 font-mono text-[11px] text-white">{k}</kbd>
          {label}
        </span>
      ))}
    </p>
  );
}

/* ── Charts ─────────────────────────────────────────────────────────── */

/** Horizontal bars: a distribution (grades, RAG, hours bands). */
export function Bars({
  rows,
  onPick,
  labelWidth = '8.5rem',
}: {
  rows: Array<{ label: string; n: number; cls: string; key?: string }>;
  onPick?: (key: string) => void;
  labelWidth?: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.n));
  return (
    <ul className="space-y-1">
      {rows.map((r) => {
        const inner = (
          <>
            <span className="truncate text-[12.5px] text-white">{r.label}</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-white/[0.08]">
              <motion.span
                className={cn('block h-full rounded-full', r.cls)}
                initial={{ width: 0 }}
                animate={{ width: `${(r.n / max) * 100}%` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </span>
            <span className="text-right text-[13px] font-semibold tabular-nums text-white">{r.n}</span>
          </>
        );
        const grid = { gridTemplateColumns: `minmax(0,${labelWidth}) 1fr 2.5rem` };
        return (
          <li key={r.key ?? r.label}>
            {onPick ? (
              <button
                type="button"
                onClick={() => onPick(r.key ?? r.label)}
                style={grid}
                className="grid min-h-11 w-full items-center gap-3 rounded-lg px-1 text-left touch-manipulation hover:bg-white/[0.04]"
              >
                {inner}
              </button>
            ) : (
              <div style={grid} className="grid min-h-11 items-center gap-3 px-1">
                {inner}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Left-to-right stages, as on the Assessment Hub's gateway pipeline. */
export function Pipeline({
  stages,
  onPick,
}: {
  stages: Array<{ key: string; label: string; n: number; cls: string }>;
  onPick?: (key: string) => void;
}) {
  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))` }}>
      {stages.map((st) => {
        const body = (
          <>
            <div className={cn('h-2 rounded-full', st.n > 0 ? st.cls : 'bg-white/[0.08]')} />
            <p className="mt-2 text-[22px] font-bold leading-none tabular-nums text-white">{st.n}</p>
            <p className="mt-1 text-[11.5px] leading-tight text-white">{st.label}</p>
          </>
        );
        return onPick ? (
          <button
            key={st.key}
            type="button"
            onClick={() => onPick(st.key)}
            className="flex min-w-0 flex-col justify-start rounded-xl p-1.5 text-left touch-manipulation hover:bg-white/[0.04]"
          >
            {body}
          </button>
        ) : (
          <div key={st.key} className="min-w-0 p-1.5">
            {body}
          </div>
        );
      })}
    </div>
  );
}
