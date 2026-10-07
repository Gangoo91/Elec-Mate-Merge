import { Check, ChevronDown, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SCOPE_HINT,
  SCOPE_LABEL,
  useCollegeScope,
  type CollegeScopeLevel,
} from '@/components/college/scope/useCollegeScope';

/* ==========================================================================
   The College Hub scope switch (ELE-1886). Sits in the masthead beside Act,
   on every College Hub page, and drives the one shared setting. Hidden for
   staff with no learners or cohorts of their own: for them only "Whole
   college" means anything.
   ========================================================================== */

const LEVELS: CollegeScopeLevel[] = ['mine', 'cohorts', 'college'];
export function CollegeScopeSwitch() {
  const { level, setLevel, membership, ready } = useCollegeScope();
  if (!ready || !membership.hasAny) return null;
  const count = (v: CollegeScopeLevel) =>
    v === 'mine'
      ? membership.mine.studentIds.size
      : v === 'cohorts'
        ? membership.cohorts.studentIds.size
        : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Showing: ${SCOPE_LABEL[level]}. Change whose work you see`}
          className="group flex h-11 shrink-0 items-center px-1 outline-none touch-manipulation focus-visible:outline-none"
        >
          <span className="inline-flex h-9 items-center gap-1 rounded-full border border-white/[0.18] px-2.5 text-[13px] sm:gap-1.5 sm:px-3 font-semibold text-white transition-colors group-hover:border-elec-yellow/60 group-focus-visible:border-elec-yellow">
            <Users className="h-4 w-4 shrink-0" aria-hidden />
            {/* Phone: the icon alone, so the masthead's Act button always fits. */}
            <span className="hidden sm:inline">{SCOPE_LABEL[level]}</span>
            <ChevronDown className="hidden h-3.5 w-3.5 shrink-0 sm:block" aria-hidden />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="w-72 border-white/[0.12] bg-[hsl(0_0%_10%)] p-1.5 text-white"
      >
        <DropdownMenuLabel className="px-2.5 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
          Whose work to show
        </DropdownMenuLabel>
        {LEVELS.map((v) => {
          const n = count(v);
          return (
            <DropdownMenuItem
              key={v}
              onSelect={() => setLevel(v)}
              className={cn(
                'flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-white focus:bg-white/[0.08] focus:text-white',
                level === v && 'bg-white/[0.06]'
              )}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-semibold">
                  {SCOPE_LABEL[v]}
                  {n !== null && <span className="ml-1.5 tabular-nums font-medium">{n}</span>}
                </span>
                <span className="block text-[12px] text-white">{SCOPE_HINT[v]}</span>
              </span>
              {level === v && <Check className="h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />}
            </DropdownMenuItem>
          );
        })}
        <p className="px-2.5 pb-1 pt-2 text-[11.5px] leading-snug text-white">
          One setting for the whole College Hub: inbox, home, marking and hours. Saved to your
          account.
        </p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/**
 * The same setting as three tabs, for a page's own header (People, assessment,
 * OTJ). Counts are optional: pass what the page is counting at each level.
 */
export function CollegeScopeTabs({
  counts,
  className,
  onChange,
  value,
}: {
  counts?: Partial<Record<CollegeScopeLevel, number>>;
  /** Show this level as picked instead of the shared one (a page's own one-off widening). */
  value?: CollegeScopeLevel;
  className?: string;
  /** Called after the shared setting changes (e.g. to clear a page filter). */
  onChange?: (v: CollegeScopeLevel) => void;
}) {
  const { level: shared, setLevel, membership, ready } = useCollegeScope();
  if (!ready || !membership.hasAny) return null;
  const level = value ?? shared;
  return (
    <div
      role="tablist"
      aria-label="Whose work to show"
      // On a phone the masthead switch is the control; three tabs do not fit beside a page's own buttons.
      className={cn(
        'hidden max-w-full overflow-x-auto rounded-xl border border-white/[0.12] p-1 sm:inline-flex',
        className
      )}
    >
      {LEVELS.map((v) => (
        <button
          key={v}
          type="button"
          role="tab"
          aria-selected={level === v}
          onClick={() => {
            setLevel(v);
            onChange?.(v);
          }}
          className={cn(
            'inline-flex h-11 shrink-0 items-center gap-1.5 rounded-lg px-3 text-[13px] font-semibold touch-manipulation sm:px-3.5',
            level === v ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06]'
          )}
        >
          {SCOPE_LABEL[v]}
          {typeof counts?.[v] === 'number' && <span className="tabular-nums">{counts[v]}</span>}
        </button>
      ))}
    </div>
  );
}
