/**
 * Small building blocks shared by the Worker Tools sub-pages (My Jobs,
 * Timesheets, My Tasks, Progress notes) so they read like the Worker Tools
 * home: a verdict line, grouped list cards that run edge to edge on a phone,
 * rows with their own action button, and 2×2 tiles.
 */
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { selectTriggerCn } from '@/components/forms/fieldStyles';

/** Grouped list card — edge to edge on phones, rounded from sm: up. */
/** Multi-line field, underline style (CLAUDE.md form controls): transparent,
 *  bottom border only, yellow caret + border on focus, no ring, no filled box.
 *  `textarea-soft` is kept only for the dimmed placeholder rule in index.css. */
export const workerTextareaCn =
  'textarea-soft w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2.5 text-base md:text-base font-medium leading-relaxed text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

export const workerPanelCn =
  '-mx-4 sm:mx-0 border-y sm:border sm:rounded-2xl border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03]';

export function WorkerPanel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(workerPanelCn, className)}>{children}</div>;
}

/** Yellow micro-heading at the top of a grouped card. */
export function GroupLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-2 sm:px-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
        {children}
      </p>
      {right}
    </div>
  );
}

/** Section heading outside a card (matches the home's PanelTitle). */
export function SectionTitle({ title, right }: { title: string; right?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="text-[16px] font-semibold tracking-tight text-white">{title}</h2>
      {right}
    </div>
  );
}

/** Headline verdict under the page title — one sentence, no chrome. */
export function Verdict({ headline, detail }: { headline: string; detail?: string }) {
  return (
    <div>
      <p className="text-[22px] sm:text-[26px] font-semibold leading-tight tracking-tight text-white">
        {headline}
      </p>
      {detail && <p className="mt-1.5 text-[14px] leading-relaxed text-white">{detail}</p>}
    </div>
  );
}

/** Solid badge — yellow for new, red for urgent, green for done. Never tinted. */
export function SolidBadge({
  tone = 'yellow',
  children,
}: {
  tone?: 'yellow' | 'red' | 'green' | 'neutral';
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 shrink-0 items-center rounded-full px-2.5 text-[11.5px] font-bold',
        tone === 'yellow' && 'bg-elec-yellow text-black',
        tone === 'red' && 'bg-red-500 text-white',
        tone === 'green' && 'bg-emerald-500 text-black',
        tone === 'neutral' && 'border border-white/[0.2] text-white'
      )}
    >
      {children}
    </span>
  );
}

/** A 2×2 tile on phones (icon, label, one line). */
export function ActionTile({
  icon: Icon,
  label,
  hint,
  onClick,
  badge,
}: {
  icon: typeof ChevronRight;
  label: string;
  hint?: string;
  onClick: () => void;
  badge?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex min-h-[88px] flex-col items-start justify-between gap-2 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-3.5 text-left touch-manipulation active:scale-[0.99]"
    >
      <span className="flex w-full items-start justify-between gap-2">
        <Icon className="h-5 w-5 text-elec-yellow" />
        {badge}
      </span>
      <span>
        <span className="block text-[14.5px] font-semibold leading-tight text-white">{label}</span>
        {hint && <span className="mt-0.5 block text-[12px] leading-snug text-white">{hint}</span>}
      </span>
    </button>
  );
}

/** Row action button (the home's yellow "Do it" button). */
export function RowAction({
  children,
  onClick,
  quiet,
  disabled,
}: {
  children: ReactNode;
  onClick: () => void;
  quiet?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      disabled={disabled}
      className={cn(
        'h-11 shrink-0 rounded-xl px-4 text-[14px] font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-50',
        quiet
          ? 'border border-white/[0.18] bg-white/[0.06] text-white'
          : 'bg-elec-yellow text-black'
      )}
    >
      {children}
    </button>
  );
}

/** Segmented control: full width, h-11, solid yellow active pill with black
 *  text, matching the employer FilterBar so selection reads the same app-wide. */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string; count?: number }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/[0.12] bg-white/[0.04] p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={active}
            className={cn(
              'h-11 flex-1 rounded-full px-2 text-[13.5px] font-semibold touch-manipulation transition-colors',
              active ? 'bg-elec-yellow text-black' : 'text-white'
            )}
          >
            {o.label}
            {o.count != null && (
              <span className={cn('ml-1 tabular-nums', active ? 'text-black' : 'text-white')}>
                {o.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Pick one of the worker's jobs. Up to four: big tappable rows (one thumb, no
 * dropdown). More than that: the app's mobile picker sheet.
 */
export function JobChoice({
  jobs,
  value,
  onChange,
  loading,
}: {
  jobs: { id: string; title: string; client_name?: string | null; address?: string | null }[];
  value: string;
  onChange: (id: string) => void;
  loading?: boolean;
}) {
  if (loading) {
    return <div className="h-14 animate-pulse rounded-xl bg-white/[0.06]" />;
  }
  if (jobs.length > 4) {
    return (
      <MobileSelectPicker
        value={value}
        onValueChange={onChange}
        title="Which job?"
        placeholder="Choose a job…"
        triggerClassName={selectTriggerCn}
        options={jobs.map((j) => ({
          value: j.id,
          label: j.title,
          description: [j.client_name, j.address].filter(Boolean).join(' · ') || undefined,
        }))}
      />
    );
  }
  return (
    <div className="space-y-2" role="radiogroup" aria-label="Which job?">
      {jobs.map((j) => {
        const on = j.id === value;
        return (
          <button
            key={j.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(j.id)}
            className={cn(
              'flex min-h-[56px] w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left touch-manipulation',
              on ? 'border-elec-yellow bg-white/[0.08]' : 'border-white/[0.12] bg-white/[0.04]'
            )}
          >
            <span
              aria-hidden
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                on ? 'border-elec-yellow' : 'border-white/40'
              )}
            >
              {on && <span className="h-2.5 w-2.5 rounded-full bg-elec-yellow" />}
            </span>
            <span className="min-w-0">
              <span className="block text-[15px] font-semibold leading-snug text-white">
                {j.title}
              </span>
              {(j.client_name || j.address) && (
                <span className="block text-[12.5px] text-white line-clamp-1">
                  {[j.client_name, j.address].filter(Boolean).join(' · ')}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
