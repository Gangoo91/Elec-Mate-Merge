/**
 * The building blocks every AI Tools screen is made from (28 Sep 2026).
 *
 * Each screen used to invent its own look: a centred icon in a coloured box, a
 * button in that screen's colour (orange, green, purple, cyan, emerald) and
 * results in tinted boxes of the same hue. Seven screens, seven palettes, none
 * of them the app's. These pieces put every screen on the house language — type
 * for hierarchy, hairlines for structure, one solid volt button, and colour
 * only where it carries meaning (a failed check, an action needed).
 */
import type { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * The lead of a screen. On an opening screen the sheet header already names the
 * tool, so pass only the explanation; on a result screen the title is the
 * finding ("2 things to look at"), not the tool's name again.
 */
export function ToolIntro({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <div>
      {title && (
        <h3 className="text-[20px] font-bold leading-tight tracking-tight text-white">{title}</h3>
      )}
      {children && (
        <p className={cn('text-[14px] leading-relaxed text-white', title && 'mt-1.5 text-[13px]')}>
          {children}
        </p>
      )}
    </div>
  );
}

/** The one volt action on a screen. */
export function PrimaryAction({
  children,
  onClick,
  disabled,
  loading,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      // md: pinned — the default Button size drops to h-10 / text-sm from md up.
      className={cn(
        'h-12 w-full touch-manipulation rounded-xl bg-elec-yellow text-[15px] font-bold text-black hover:bg-elec-yellow/90 md:h-12 md:text-[15px]',
        className
      )}
    >
      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
    </Button>
  );
}

export function SecondaryAction({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className={cn(
        'h-12 w-full touch-manipulation rounded-xl border-white/[0.14] bg-transparent text-sm font-semibold text-white hover:bg-white/10 md:h-12',
        className
      )}
    >
      {children}
    </Button>
  );
}

/** "Run again" beside "Done" under a result. */
export function ResultActions({
  againLabel = 'Run again',
  onAgain,
  onDone,
}: {
  againLabel?: string;
  onAgain: () => void;
  onDone: () => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 pt-1">
      <SecondaryAction onClick={onAgain}>{againLabel}</SecondaryAction>
      <PrimaryAction onClick={onDone}>Done</PrimaryAction>
    </div>
  );
}

export function ToolLoading({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center">
      <Loader2 className="mb-3 h-6 w-6 animate-spin text-elec-yellow" />
      <p className="text-sm font-semibold text-white">{label}</p>
      {hint && <p className="mt-1 text-xs text-white">{hint}</p>}
    </div>
  );
}

/** A volt section heading over hairline rows, as on the hubs. */
export function ResultSection({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <section>
      <h4 className="mb-1 flex items-baseline gap-2 text-[15px] font-semibold tracking-tight text-elec-yellow">
        {title}
        {count != null && <span className="text-[12px] font-medium text-white">{count}</span>}
      </h4>
      <div className="border-t border-white/[0.12]">{children}</div>
    </section>
  );
}

export type RowTone = 'fail' | 'action' | 'advice' | 'pass' | 'none';

const TONE: Record<RowTone, { edge: string; label?: string; text: string }> = {
  fail: { edge: 'bg-red-500', label: 'Fails', text: 'text-red-300' },
  action: { edge: 'bg-orange-500', label: 'Action', text: 'text-orange-300' },
  advice: { edge: 'bg-white/40', label: 'Advice', text: 'text-white' },
  pass: { edge: 'bg-elec-yellow', label: 'OK', text: 'text-elec-yellow' },
  none: { edge: '', text: 'text-white' },
};

/**
 * One finding or line item. Severity is a thin edge and a word — enough to
 * scan a list by, without tinting the whole row.
 */
export function ResultRow({
  title,
  detail,
  tone = 'none',
  value,
  index,
}: {
  title: ReactNode;
  detail?: ReactNode;
  tone?: RowTone;
  /** Right-aligned figure — a price, a quantity. */
  value?: ReactNode;
  /** Leading number for ordered lists (a specification). */
  index?: number;
}) {
  const t = TONE[tone];
  return (
    <div className="relative flex gap-3 border-b border-white/[0.12] py-3 pl-3">
      {tone !== 'none' && (
        <span
          aria-hidden
          className={cn('absolute bottom-3 left-0 top-3 w-[3px] rounded-full', t.edge)}
        />
      )}
      {index != null && (
        <span className="w-6 flex-shrink-0 pt-[2px] text-[12px] font-semibold tabular-nums text-elec-yellow">
          {String(index).padStart(2, '0')}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="text-[14px] font-semibold leading-snug text-white">{title}</p>
          {t.label && <span className={cn('text-[11px] font-semibold', t.text)}>{t.label}</span>}
        </div>
        {detail && <div className="mt-0.5 text-[12.5px] leading-relaxed text-white">{detail}</div>}
      </div>
      {value != null && (
        <div className="flex-shrink-0 pl-2 text-right text-[14px] font-semibold tabular-nums text-white">
          {value}
        </div>
      )}
    </div>
  );
}

/** Key–value line for totals. `strong` is the one line that matters most. */
export function TotalLine({
  label,
  value,
  strong,
}: {
  label: ReactNode;
  value: ReactNode;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-baseline justify-between gap-3 py-2',
        strong && 'mt-1 border-t border-white/[0.2] pt-3'
      )}
    >
      <span className={cn('text-white', strong ? 'text-[16px] font-bold' : 'text-[13px]')}>
        {label}
      </span>
      <span
        className={cn(
          'tabular-nums',
          strong
            ? 'text-[20px] font-bold tracking-tight text-elec-yellow'
            : 'text-[14px] font-semibold text-white'
        )}
      >
        {value}
      </span>
    </div>
  );
}
