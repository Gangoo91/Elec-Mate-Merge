/**
 * Course kit — the parts every course, module and section page is built from
 * (10 Oct 2026). Andrew: "these pages need to be designed better on desktop and
 * mobiles … all the ones with cards … across all courses we have."
 *
 * 516 pages render one of three shells (CourseShell / ModuleShell /
 * SectionShell in ./shells) with SectionCard / ModuleCard children. Nothing on
 * those pages changes: the cards report their own progress up to the shell
 * through ListProvider, and the shell turns that into the header's progress
 * bar and its one "Start / Continue / Review" button.
 *
 * Rules carried over from earlier passes (see SectionCard): volt only where it
 * says something (the next item, a finished one), never a translucent volt
 * fill, all text white, 44px+ targets, cards edge to edge on a phone.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { tokens } from '@/lib/courseProgressMatch';

/* ── Progress: "started" ──────────────────────────────────────────── */

/**
 * Has the learner been in here at all? True for a progress row AT or BELOW the
 * page the link points to: a visit to the section (or a lesson in it), or a
 * check/quiz inside it. A visit to the course page itself doesn't count — the
 * loose two-way matcher would otherwise mark every module "started" after one
 * look at the course.
 */
export function startedUnder(
  rows: { course_key: string; section_key?: string | null }[],
  path: string
): boolean {
  const t = tokens(path);
  if (!t.length) return false;
  const needle = `/${t.join('/')}/`;
  return rows.some((r) =>
    `/${tokens(`${r.course_key}/${r.section_key ?? ''}`).join('/')}/`.includes(needle)
  );
}

/* ── Progress registry ────────────────────────────────────────────── */

export interface ListItem {
  /** Unique within the page (the card's `to`). */
  key: string;
  to: string;
  /** Sort order: the item's number ("6.1" → 6.1). Final assessments sort last. */
  order: number;
  /** "Section 3", "Module 2", "6.1". */
  label: string;
  title: string;
  /** Explicitly marked finished. */
  done: boolean;
  /**
   * Something in it has been done. Progress is recorded per quick-check and
   * quiz, so this is what the data can honestly say: one check done is
   * "started", not "finished" (the old cards called it "Completed").
   */
  started?: boolean;
  /** Sections finished inside it (modules on a course page). */
  doneCount?: number;
  /** False when there's no reliable progress for it (subsections). */
  tracked: boolean;
}

interface Registry {
  register: (item: ListItem) => void;
  unregister: (key: string) => void;
}

const RegistryCtx = createContext<Registry | null>(null);
const ItemsCtx = createContext<ListItem[]>([]);
/** The key of the item the header's button points at ("Next up"). */
const NextCtx = createContext<string | null>(null);

export function ListProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Record<string, ListItem>>({});
  const register = useCallback(
    (item: ListItem) =>
      setMap((m) => {
        const prev = m[item.key];
        if (
          prev &&
          prev.done === item.done &&
          prev.started === item.started &&
          prev.doneCount === item.doneCount &&
          prev.title === item.title &&
          prev.order === item.order
        )
          return m;
        return { ...m, [item.key]: item };
      }),
    []
  );
  const unregister = useCallback(
    (key: string) =>
      setMap((m) => {
        if (!(key in m)) return m;
        const next = { ...m };
        delete next[key];
        return next;
      }),
    []
  );
  const items = useMemo(() => Object.values(map).sort((a, b) => a.order - b.order), [map]);
  const next = useMemo(() => nextItem(items)?.key ?? null, [items]);
  const registry = useMemo(() => ({ register, unregister }), [register, unregister]);
  return (
    <RegistryCtx.Provider value={registry}>
      <ItemsCtx.Provider value={items}>
        <NextCtx.Provider value={next}>{children}</NextCtx.Provider>
      </ItemsCtx.Provider>
    </RegistryCtx.Provider>
  );
}

/** Cards call this; outside a provider it does nothing. */
export function useListItem(item: ListItem | null) {
  const reg = useContext(RegistryCtx);
  const sig = item
    ? `${item.key}|${item.done}|${item.started ?? ''}|${item.doneCount ?? ''}|${item.title}|${item.order}`
    : '';
  useEffect(() => {
    if (!reg || !item) return;
    reg.register(item);
    return () => reg.unregister(item.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reg, sig]);
}

export const useListItems = () => useContext(ItemsCtx);
export const useIsNext = (key: string) => useContext(NextCtx) === key;

/** Where the header's button goes: the first unfinished item, or the furthest-on started module. */
function nextItem(items: ListItem[]): ListItem | undefined {
  if (!items.length) return undefined;
  const isModules = items.some((i) => i.doneCount !== undefined);
  if (isModules) {
    const started = items.filter((i) => (i.doneCount ?? 0) > 0 || i.started);
    return started.length ? started[started.length - 1] : items[0];
  }
  // Back to where they were: the furthest one started and not finished.
  // Nothing started yet: the first not finished. All done: the first.
  const inProgress = items.filter((i) => i.tracked && i.started && !i.done);
  if (inProgress.length) return inProgress[inProgress.length - 1];
  return items.find((i) => i.tracked && !i.done) ?? items[0];
}

/** "6.1" → 6.1, "3" → 3; anything else after the numbered ones. */
export function orderOf(n: number | string | undefined, fallback = 999): number {
  const v = typeof n === 'number' ? n : parseFloat(String(n ?? '').replace(/[^\d.]/g, ''));
  return Number.isFinite(v) ? v : fallback;
}

/* ── Header ───────────────────────────────────────────────────────── */

interface HeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Short facts under the description: "6 sections", "About 45 min". */
  facts?: (string | null | undefined | false)[];
  /** 'section' | 'subsection' | 'module' — the noun in "2 of 6 sections done". */
  noun: string;
  /** What "Review …" says when everything is done: "module", "section", "course". */
  scope: string;
  notice?: ReactNode;
}

export function CourseHero({ eyebrow, title, description, facts, noun, scope, notice }: HeroProps) {
  const navigate = useNavigate();
  const items = useListItems();
  const tracked = items.filter((i) => i.tracked);
  const isModules = items.some((i) => i.doneCount !== undefined);
  const finished = isModules ? 0 : tracked.filter((i) => i.done).length;
  const touched = isModules
    ? tracked.filter((i) => (i.doneCount ?? 0) > 0 || i.started).length
    : tracked.filter((i) => i.done || i.started).length;
  const total = tracked.length;
  const next = nextItem(items);
  const allDone = !isModules && total > 0 && finished === total;
  const allTouched = !isModules && total > 0 && touched === total;
  const done = touched;
  const plural = (n: number) => `${noun}${n === 1 ? '' : 's'}`;

  const cta = !next
    ? null
    : allDone
      ? { label: `Review the ${scope}`, to: items[0].to }
      : allTouched
        ? { label: `Carry on: ${next.label}`, to: next.to, sub: next.title }
        : done === 0
          ? { label: `Start ${next.label}`, to: next.to, sub: next.title }
          : { label: `Continue: ${next.label}`, to: next.to, sub: next.title };

  return (
    <section className="relative -mx-4 overflow-hidden card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-5 sm:mx-0 sm:rounded-3xl sm:px-8 sm:py-8">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0"
      />
      <div className="flex flex-col gap-5 sm:gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-end lg:gap-x-10">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            {eyebrow}
          </p>
          <h1 className="mt-1.5 text-[26px] font-bold leading-[1.1] tracking-tight text-white sm:text-[38px]">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-white sm:mt-2.5 sm:text-[15px]">
              {description}
            </p>
          )}
          {facts && facts.filter(Boolean).length > 0 && (
            <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[13px] font-medium text-white">
              {facts.filter(Boolean).map((f, i) => (
                <span key={i} className="inline-flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />}
                  {f}
                </span>
              ))}
            </p>
          )}
          {notice && <div className="mt-4">{notice}</div>}
        </div>

        {/* Progress and the one thing to do next. */}
        {(total > 0 || cta) && (
          <div className="min-w-0 space-y-3">
            {total > 0 && (
              <div>
                <p className="flex items-baseline justify-between gap-3 text-[13.5px] font-semibold text-white">
                  <span>
                    {done === 0
                      ? 'Not started yet'
                      : finished === total
                        ? `All ${total} ${plural(total)} done`
                        : finished > 0
                          ? `${finished} of ${total} ${plural(total)} done`
                          : `${done} of ${total} ${plural(total)} started`}
                  </span>
                  {!isModules && (
                    <span className="tabular-nums">{Math.round((done / total) * 100)}%</span>
                  )}
                </p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.12]">
                  <div
                    className={cn(
                      'h-full rounded-full transition-[width] duration-500',
                      allDone ? 'bg-emerald-400' : 'bg-elec-yellow'
                    )}
                    style={{
                      width: `${total ? Math.max((done / total) * 100, done ? 4 : 0) : 0}%`,
                    }}
                  />
                </div>
              </div>
            )}
            {cta && (
              <button
                type="button"
                onClick={() => navigate(cta.to)}
                className="flex min-h-[52px] w-full items-center justify-between gap-3 rounded-xl bg-elec-yellow px-4 py-2.5 text-left text-black transition-transform touch-manipulation active:scale-[0.99]"
              >
                <span className="min-w-0">
                  <span className="block text-[15px] font-bold leading-tight">{cta.label}</span>
                  {'sub' in cta && cta.sub && cta.sub !== cta.label && (
                    <span className="mt-0.5 block truncate text-[12.5px] font-medium">
                      {cta.sub}
                    </span>
                  )}
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" aria-hidden />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── A row in the list ───────────────────────────────────────────── */

interface RowProps {
  to?: string;
  /** Kept for callers; the number now lives in the eyebrow ("Section 3"). */
  number?: string;
  /** The item's own icon, shown in the tile. */
  icon?: LucideIcon;
  /** Small line above the title: "Section 3 · 20 min". */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Extra status text (e.g. "3 sections done"); shown in the chip. */
  status?: string;
  done?: boolean;
  started?: boolean;
  next?: boolean;
  exam?: boolean;
  disabled?: boolean;
  disabledLabel?: string;
}

/**
 * A section / module / subsection card (10 Oct 2026, second pass after
 * Andrew: "don't like the yellow around the numbers").
 *
 * The item's own icon in a quiet tile (a green tick once done), the number in
 * the small line above the title, and progress as one chip along the bottom:
 * a dot + "In progress", a tick + "Done", nothing when untouched. Volt only
 * for the "Next up" pill and the next item's edge.
 */
export function CourseRow({
  to,
  number,
  icon: Icon,
  eyebrow,
  title,
  description,
  status,
  done,
  started,
  next,
  exam,
  disabled,
  disabledLabel = 'Coming soon',
}: RowProps) {
  const TileIcon = exam ? GraduationCap : Icon;
  const chip = disabled
    ? { tone: 'muted' as const, text: disabledLabel }
    : done
      ? { tone: 'done' as const, text: status ?? 'Done' }
      : started
        ? { tone: 'progress' as const, text: status ?? 'In progress' }
        : null;
  const body = (
    <>
      <span
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
          done ? 'bg-emerald-400 text-black' : 'bg-white/[0.08] text-white'
        )}
        aria-hidden
      >
        {done ? (
          <Check className="h-5 w-5" strokeWidth={3} />
        ) : TileIcon ? (
          <TileIcon className={cn('h-5 w-5', exam && 'text-elec-yellow')} strokeWidth={1.9} />
        ) : (
          <span className="text-[15px] font-bold tabular-nums">{number}</span>
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {eyebrow && <span className="text-[12.5px] font-medium text-white">{eyebrow}</span>}
          {next && !done && (
            <span className="rounded-full bg-elec-yellow px-2 py-0.5 text-[11.5px] font-bold text-black">
              Next up
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[16px] font-semibold leading-snug tracking-tight text-white sm:text-[16.5px]">
          {title}
        </span>
        {description && (
          <span className="mt-1 line-clamp-2 text-[13.5px] leading-snug text-white">
            {description}
          </span>
        )}
        {chip && (
          <span
            className={cn(
              'mt-2.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold',
              chip.tone === 'done'
                ? 'bg-emerald-400/15 text-emerald-300'
                : 'bg-white/[0.08] text-white'
            )}
          >
            {chip.tone === 'done' ? (
              <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
            ) : chip.tone === 'progress' ? (
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-elec-yellow" />
            ) : null}
            {chip.text}
          </span>
        )}
      </span>
      {!disabled && (
        <ChevronRight
          className="mt-3 h-5 w-5 shrink-0 text-white transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </>
  );
  // Its own card at every size, a little apart from the next (Andrew: "space
  // between the cards"), so each one reads as one thing to tap. The next one
  // has a thin volt edge; nothing else does.
  const cls = cn(
    'group relative flex w-full items-start gap-4 rounded-2xl border bg-white/[0.04] p-4 text-left transition-colors touch-manipulation sm:p-5',
    next && !done ? 'border-elec-yellow' : 'border-white/[0.12]',
    disabled
      ? 'cursor-not-allowed'
      : 'active:scale-[0.99] active:bg-white/[0.08] sm:hover:border-white/[0.3] sm:hover:bg-white/[0.06]'
  );
  if (disabled || !to)
    return (
      <div className={cls} aria-disabled={disabled || undefined}>
        {body}
      </div>
    );
  return (
    <Link to={to} className={cls}>
      {body}
    </Link>
  );
}

/* ── About panel: the long module intros ───────────────────────────── */

export function AboutPanel({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="-mx-4 card-landing max-sm:!rounded-none max-sm:!border-x-0 px-5 py-5 sm:mx-0 sm:rounded-2xl sm:px-6">
      <h2 className="text-[15px] font-semibold text-white">{title}</h2>
      {/* The intros were written with text-white/80, which reads grey: all white here. */}
      <div
        className={cn(
          'mt-2 space-y-3 text-[14px] leading-relaxed text-white [&_p]:!text-[14px] [&_p]:!text-white [&_p]:leading-relaxed [&>div]:!max-w-none [&>div]:!pt-0',
          // Collapsed on a phone: a fixed height that fades out (line-clamp
          // doesn't clamp across several paragraphs). Always open on desktop.
          !open &&
            'max-h-[7rem] overflow-hidden [mask-image:linear-gradient(to_bottom,black_45%,transparent)]'
        )}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-1 inline-flex h-11 items-center gap-1 text-[13.5px] font-semibold text-elec-yellow touch-manipulation"
        aria-expanded={open}
      >
        {open ? 'Show less' : 'Read more'}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>
    </section>
  );
}

/* ── Previous / next ─────────────────────────────────────────────── */

export function PrevNext({
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
  noun,
}: {
  prevHref?: string;
  prevLabel?: string;
  nextHref?: string;
  nextLabel?: string;
  noun: string;
}) {
  if (!prevHref && !nextHref) return null;
  const cell =
    'flex min-h-[64px] min-w-0 flex-col justify-center rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-3 transition-colors touch-manipulation hover:border-white/[0.3] active:bg-white/[0.09]';
  return (
    <nav aria-label={`Other ${noun}s`} className="grid gap-3 sm:grid-cols-2">
      {prevHref ? (
        <Link to={prevHref} className={cell}>
          <span className="text-[12.5px] font-medium text-white">
            {/^Module\b/.test(prevLabel ?? '') ? '← Back to the module' : `← Previous ${noun}`}
          </span>
          <span className="mt-0.5 line-clamp-2 text-[14.5px] font-semibold leading-snug text-white">
            {prevLabel ?? 'Previous'}
          </span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {nextHref && (
        <Link to={nextHref} className={cn(cell, 'sm:items-end sm:text-right')}>
          <span className="text-[12.5px] font-medium text-white">
            {/^Module\b/.test(nextLabel ?? '')
              ? 'Next module →'
              : /^Mock exam/.test(nextLabel ?? '')
                ? 'Finish the course →'
                : `Next ${noun} →`}
          </span>
          <span className="mt-0.5 line-clamp-2 text-[14.5px] font-semibold leading-snug text-white">
            {nextLabel ?? 'Next'}
          </span>
        </Link>
      )}
    </nav>
  );
}

/** The list heading: "Sections" + "6 sections". */
export function ListHeading({ title, count }: { title: string; count?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="text-[18px] font-bold tracking-tight text-white sm:text-[20px]">{title}</h2>
      {count && <span className="text-[13px] font-medium text-white">{count}</span>}
    </div>
  );
}
