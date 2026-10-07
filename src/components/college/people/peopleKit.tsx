import type { ReactNode } from 'react';
import { useCollegeScope, type CollegeScopeLevel } from '@/components/college/scope/useCollegeScope';
import { CollegeScopeTabs } from '@/components/college/scope/CollegeScopeSwitch';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { chipCn } from '@/components/college/ui/CollegeUi';

/* ==========================================================================
   People kit (7 Oct 2026). Small pieces shared by the People, cohort, staff
   and settings screens so every roster reads the same way:

     rule · name · one line of context · figures · chevron · ⋯

   Built on the College Hub design kit (CollegeUi.tsx). All text is white;
   orange means behind, red only for a critical learner, green means done.
   ========================================================================== */

export const norm = (s: string | null | undefined) => (s ?? '').trim().toLowerCase();

/**
 * Who counts as teaching staff and who as support staff. ONE definition for
 * the People hub figures and the Tutors / Support staff pages, so the number
 * on the card matches the list it opens: tutors and heads of department who
 * are not archived, matched without caring about case.
 */
type StaffLike = { role?: string | null; status?: string | null };
const TEACHING_ROLES = new Set(['tutor', 'head_of_department']);
export const isTeachingStaff = (s: StaffLike) => TEACHING_ROLES.has(norm(s.role)) && norm(s.status) !== 'archived';
export const isSupportStaff = (s: StaffLike) => !TEACHING_ROLES.has(norm(s.role)) && norm(s.status) !== 'archived';

export const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** Underline search, the same field every College Hub list uses. */
export const SEARCH_CN =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors placeholder:text-white placeholder:opacity-60 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';

/** Chips that wrap on a phone and sit on one line on desktop. */
export function FilterChips<T extends string>({
  items,
  value,
  onChange,
  label,
}: {
  items: Array<{ value: T; label: string; count?: number }>;
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {items.map((c) => (
        <button
          key={c.value}
          type="button"
          aria-pressed={value === c.value}
          onClick={() => onChange(c.value)}
          className={cn(chipCn(value === c.value), 'inline-flex h-11 items-center gap-1.5')}
        >
          {c.label}
          {typeof c.count === 'number' && <span className="tabular-nums">{c.count}</span>}
        </button>
      ))}
    </div>
  );
}

export type RuleTone = 'critical' | 'warn' | 'good' | 'quiet';

const RULE: Record<RuleTone, string> = {
  critical: 'bg-red-400',
  warn: 'bg-orange-400',
  good: 'bg-emerald-400',
  quiet: 'bg-white/[0.25]',
};

export interface RowFigure {
  label: string;
  value: string;
  warn?: boolean;
  good?: boolean;
  critical?: boolean;
}

export interface RowMenuItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
  /** Draw a separator above this item. */
  separated?: boolean;
}

/**
 * One person (or cohort) in a roster. The figures sit in fixed-width columns
 * on desktop so a long list scans down; on a phone they wrap under the name.
 */
export function PeopleRow({
  title,
  badge,
  sub,
  tone = 'quiet',
  figures = [],
  onOpen,
  openLabel,
  menu,
  leading,
  selected,
  headed,
}: {
  title: string;
  badge?: ReactNode;
  sub?: ReactNode;
  tone?: RuleTone;
  figures?: RowFigure[];
  onOpen: () => void;
  openLabel?: string;
  menu?: RowMenuItem[];
  leading?: ReactNode;
  selected?: boolean;
  /** A PeopleListHead names the columns, so hide the per-figure label on desktop. */
  headed?: boolean;
}) {
  return (
    <li className={cn('flex items-stretch', selected && 'bg-white/[0.06]')}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={openLabel ?? `Open ${title}`}
        className="flex min-h-[64px] min-w-0 flex-1 flex-col gap-2 py-3 pl-5 pr-2 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:pl-6 md:flex-row md:items-center md:gap-4"
      >
        <span className="flex min-w-0 flex-1 items-center gap-3">
          {leading ?? <span aria-hidden className={cn('h-9 w-[3px] shrink-0 rounded-full', RULE[tone])} />}
          <span className="min-w-0 flex-1">
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate text-[14.5px] font-semibold leading-tight text-white">{title}</span>
              {badge}
            </span>
            {sub && <span className="mt-1 block truncate text-[12.5px] leading-tight text-white">{sub}</span>}
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-white md:hidden" aria-hidden />
        </span>
        {figures.length > 0 && (
          <span className="flex flex-wrap gap-x-4 gap-y-1 pl-[15px] md:shrink-0 md:flex-nowrap md:gap-0 md:pl-0">
            {figures.map((f) => (
              <span key={f.label} className="flex items-baseline gap-1.5 md:w-[92px] md:flex-col md:items-end md:gap-0.5">
                <span
                  className={cn(
                    'text-[14px] font-semibold tabular-nums leading-none',
                    f.critical ? 'text-red-300' : f.warn ? 'text-orange-400' : f.good ? 'text-emerald-400' : 'text-white'
                  )}
                >
                  {f.value}
                </span>
                <span className={cn('text-[11.5px] leading-none text-white', headed && 'md:hidden')}>{f.label}</span>
              </span>
            ))}
          </span>
        )}
        <ChevronRight className="hidden h-4 w-4 shrink-0 text-white md:block" aria-hidden />
      </button>
      {menu && menu.length > 0 && (
        <div className="flex items-center pr-2 sm:pr-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label={`More actions for ${title}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
              >
                <span className="text-[15px] font-semibold tracking-[0.12em]">⋯</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
              {menu.map((m) => (
                <div key={m.label}>
                  {m.separated && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    className={cn('h-11 touch-manipulation', m.danger && 'text-red-300 focus:text-red-200')}
                    disabled={m.disabled}
                    onClick={m.onClick}
                  >
                    {m.label}
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </li>
  );
}

/** Column headings over a PeopleRow list, desktop only. */
export function PeopleListHead({ title, figures, menu = true }: { title: string; figures: string[]; menu?: boolean }) {
  return (
    <div className="hidden items-center gap-4 border-b border-white/[0.06] py-2.5 pl-6 pr-2 md:flex">
      <span className="flex-1 pl-[15px] text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white">{title}</span>
      {figures.map((f) => (
        <span key={f} className="w-[92px] text-right text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white">
          {f}
        </span>
      ))}
      <span className="w-4" aria-hidden />
      {menu && <span className="w-[52px]" aria-hidden />}
    </div>
  );
}

/** A small yellow "Yours" / grey status badge beside a name. */
export function NameBadge({ children, tone = 'quiet' }: { children: ReactNode; tone?: 'mine' | 'quiet' | 'warn' }) {
  return (
    <span
      className={cn(
        'shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-bold',
        tone === 'mine'
          ? 'bg-elec-yellow text-black'
          : tone === 'warn'
            ? 'border border-orange-400/50 text-orange-300'
            : 'border border-white/[0.18] text-white'
      )}
    >
      {children}
    </span>
  );
}

/** Spinner block for a list that is still loading. */
export function ListLoading({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-6 sm:px-6">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-elec-yellow border-t-transparent" />
      <span className="text-[13px] text-white">{label}</span>
    </div>
  );
}

/**
 * The one scope switch (ELE-1886): mine first, the whole college second.
 * Renders nothing when the viewer has nobody assigned, because "Mine" would
 * be an empty list.
 */
export function ScopeSwitch({
  scope,
  onChange,
  hasMine,
  mineCount,
  collegeCount,
}: {
  scope: 'mine' | 'college';
  onChange: (s: 'mine' | 'college') => void;
  hasMine: boolean;
  /** Kept for call sites; the shared tabs name the levels. */
  mineLabel?: string;
  mineCount: number;
  collegeCount: number;
}) {
  // The one College Hub setting (ELE-1886): Mine / My cohorts / Whole college.
  const { level } = useCollegeScope();
  if (!hasMine) return null;
  const narrowed: CollegeScopeLevel = level === 'cohorts' ? 'cohorts' : 'mine';
  return (
    <CollegeScopeTabs
      value={scope === 'college' ? 'college' : narrowed}
      counts={{ [narrowed]: mineCount, college: collegeCount }}
      onChange={(v) => onChange(v === 'college' ? 'college' : 'mine')}
    />
  );
}
