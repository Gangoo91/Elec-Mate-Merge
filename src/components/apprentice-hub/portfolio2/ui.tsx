/**
 * Shared look for the Portfolio 2.0 learner screens (ELE-1892 / ELE-1893).
 * Same surface language as the College Hub kit: one card, hairline lists,
 * one solid volt action per screen, white text only.
 */
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { AcState } from '@/hooks/portfolio/usePortfolioAcState';
import {
  COUNTERSIGN_PENDING_CHIP,
  COUNTERSIGN_PENDING_LABEL,
  LEARNER_STATE_LABEL,
  STATE_CHIP,
  STATE_SWATCH,
} from '@/hooks/portfolio/usePortfolioAcState';
import type { ItemState } from '@/hooks/portfolio/usePortfolio';

export const P_CARD =
  '-mx-4 border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-5 sm:mx-0 sm:rounded-3xl sm:border-x sm:p-6';
export const P_LIST =
  '-mx-4 overflow-hidden border-y border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] divide-y divide-white/[0.06] sm:mx-0 sm:rounded-3xl sm:border-x';
export const P_ROW =
  'flex min-h-[64px] w-full items-center gap-3 px-5 py-3 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.07] sm:px-6';
export const P_BTN_PRIMARY =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black transition-opacity touch-manipulation hover:opacity-90 disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white';
export const P_BTN =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.14] px-4 text-[14px] font-semibold text-white transition-colors touch-manipulation hover:border-elec-yellow disabled:opacity-40';
export const P_LINK =
  'inline-flex h-11 items-center px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation';
export const P_INPUT =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation';

export const pChip = (on: boolean) =>
  cn(
    'h-10 shrink-0 rounded-full border px-4 text-[13px] transition-colors touch-manipulation',
    on
      ? 'border-elec-yellow bg-elec-yellow font-semibold text-black'
      : 'border-white/[0.12] bg-white/[0.06] font-medium text-white hover:border-white/[0.3]'
  );

/**
 * A choice of 2 to 4: one joined toggle, the chosen option white
 * (College Hub design language, 10 Oct). Full width on a phone.
 */
export const P_SEG_GROUP =
  'flex w-full rounded-xl border border-white/[0.12] bg-white/[0.03] p-0.5 sm:inline-flex sm:w-auto';
export const pSeg = (on: boolean) =>
  cn(
    'inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-[10px] px-3 text-[13.5px] font-semibold transition-colors touch-manipulation sm:flex-none sm:px-5',
    on ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06] active:bg-white/[0.08]'
  );

/** Filters over a list: quiet text tabs with counts and a yellow underline. */
export const P_TAB_RAIL =
  '-mx-4 flex overflow-x-auto border-b border-white/[0.08] px-2 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden';
export const pTab = (on: boolean) =>
  cn(
    'relative inline-flex h-11 shrink-0 items-center gap-1.5 whitespace-nowrap px-3 text-[13.5px] text-white transition-colors touch-manipulation hover:bg-white/[0.04]',
    on ? 'font-semibold' : 'font-medium'
  );
/** Put inside a pTab when it is chosen. */
export const P_TAB_LINE = 'absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-elec-yellow';

/** The six-state legend, in reading order (ELE-1862). */
export const LEGEND_ORDER: AcState[] = [
  'not_started',
  'suggested',
  'claimed',
  'submitted',
  'referred',
  'passed',
  'iqa_confirmed',
];

export const LEGEND_HELP: Record<string, string> = {
  not_started: 'Nothing in your portfolio covers it yet.',
  suggested: 'The AI thinks a piece of evidence covers it. It does not count until you claim it.',
  claimed: 'You have said a piece of evidence covers it. Your assessor has not seen it yet.',
  submitted: 'You have sent it, signed, and it is waiting for your assessor.',
  referred: 'Your assessor needs more. Read their feedback, add to the evidence and send it again.',
  passed: 'Your assessor has passed it. This is what counts towards your qualification.',
  iqa_confirmed: 'A second assessor (the IQA) has checked the decision and confirmed it.',
};

export function StateChip({
  state,
  className,
  pending = false,
}: {
  state: AcState;
  className?: string;
  /** A trainee's pass waiting for a qualified assessor's countersignature (batch 2). */
  pending?: boolean;
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[12px] font-semibold',
        pending ? COUNTERSIGN_PENDING_CHIP : STATE_CHIP[state],
        className
      )}
    >
      {pending ? COUNTERSIGN_PENDING_LABEL : LEARNER_STATE_LABEL[state]}
    </span>
  );
}

export function LegendRow({ counts }: { counts?: Partial<Record<AcState, number>> }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label="What the colours mean">
      {LEGEND_ORDER.map((s) => (
        <li key={s} className="flex items-center gap-1.5 text-[12px] text-white">
          <span className={cn('h-2.5 w-2.5 rounded-full', STATE_SWATCH[s])} aria-hidden />
          {LEARNER_STATE_LABEL[s]}
          {counts && counts[s] !== undefined && (
            <span className="font-mono tabular-nums text-white">{counts[s]}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export const ITEM_STATE_LABEL: Record<ItemState, string> = {
  draft: 'Draft',
  suggested: 'Suggestions to check',
  claimed: 'Claimed by you',
  submitted: 'With your assessor',
  needs_more: 'Needs more',
  passed: 'Passed',
};

/**
 * The badge for one piece of evidence. An observation is the assessor's own
 * record, so its criteria were not "claimed by you": it reads Observed (or
 * Discussed) until a decision moves it on.
 */
export function itemStateLabel(item: {
  state: ItemState;
  observation?: { kind: string } | null;
}): string {
  if (item.observation && item.state === 'claimed') {
    return item.observation.kind === 'professional_discussion'
      ? 'Discussed'
      : item.observation.kind === 'questioning'
        ? 'Questioned'
        : 'Observed';
  }
  return ITEM_STATE_LABEL[item.state];
}

export const ITEM_STATE_CHIP: Record<ItemState, string> = {
  draft: 'border-white/[0.14] bg-white/[0.04] text-white',
  suggested: 'border-dashed border-white/[0.3] text-white',
  claimed: 'border-white/[0.3] bg-white/[0.08] text-white',
  submitted: 'border-sky-400/40 bg-sky-500/[0.12] text-sky-200',
  needs_more: 'border-orange-500/40 bg-orange-500/10 text-orange-300',
  passed: 'border-emerald-400/40 bg-emerald-500/[0.12] text-emerald-300',
};

export function SectionTitle({
  title,
  sub,
  action,
}: {
  title: string;
  sub?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
        {sub && <p className="mt-0.5 text-[12.5px] leading-snug text-white">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export const fmtDate = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
export const fmtDateTime = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';
