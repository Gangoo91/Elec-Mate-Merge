import { cn } from '@/lib/utils';
import type { LineSource } from '@/services/aiQuoteService';

/* Where a quote line's price came from (ELE-1990). Text stays white; the
   colour lives in the dot and the border only. */

const LABEL: Record<LineSource, string> = {
  price_book: 'Price book',
  ai_estimate: 'AI estimate, check',
  firm_rate: 'Your rate',
  default_rate: 'Standard rate, check',
  edited: 'Checked',
};

const TONE: Record<LineSource, { dot: string; border: string }> = {
  price_book: { dot: 'bg-emerald-400', border: 'border-emerald-500/40' },
  ai_estimate: { dot: 'bg-orange-400', border: 'border-orange-500/50' },
  firm_rate: { dot: 'bg-blue-400', border: 'border-blue-500/40' },
  default_rate: { dot: 'bg-orange-400', border: 'border-orange-500/50' },
  edited: { dot: 'bg-white', border: 'border-white/25' },
};

export function LineSourceTag({
  source,
  className,
}: {
  source: LineSource | undefined | null;
  className?: string;
}) {
  if (!source) return null;
  const tone = TONE[source];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-white',
        tone.border,
        className
      )}
    >
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
      {LABEL[source]}
    </span>
  );
}
