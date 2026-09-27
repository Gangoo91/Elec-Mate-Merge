import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X, ReceiptText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PANEL } from '@/components/electrician/shared/surfaces';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import {
  useUninvoicedAcceptedQuotes,
  type UninvoicedQuote,
} from '@/hooks/useUninvoicedAcceptedQuotes';

/**
 * "Accepted, not invoiced" — work the client agreed to that was never billed
 * through the app.
 *
 * Tapping a line opens the invoice builder pre-filled FROM THAT QUOTE. That
 * route only started pre-filling correctly with ELE-1769; before it, the same
 * tap landed you in a blank form, which is a fair part of why these rows exist
 * at all. Sending people back down a path that used to waste their time is
 * only worth doing now it works.
 *
 * Shows nothing when there is nothing to show — no empty state, no zero count.
 * A card that is present every day saying "0" is a card people stop reading.
 */

const SNOOZE_KEY = 'uninvoiced_quotes_snooze_until';
const SNOOZE_DAYS = 7;

const money = (n: number) =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n);

/** "6 weeks ago" reads as a nudge; "43 days ago" reads as an audit. */
const ageLabel = (days: number): string => {
  if (days < 14) return `${days} days ago`;
  if (days < 63) return `${Math.round(days / 7)} weeks ago`;
  return `${Math.round(days / 30)} months ago`;
};

const describe = (q: UninvoicedQuote): string =>
  q.jobTitle || q.clientName || q.quoteNumber || 'Accepted quote';

interface Props {
  className?: string;
  /** How many lines before it collapses to a count. */
  preview?: number;
}

export const UninvoicedQuotesCard: React.FC<Props> = ({ className, preview = 3 }) => {
  const navigate = useNavigate();
  const { quotes, count, totalValue, isLoading } = useUninvoicedAcceptedQuotes();
  const [expanded, setExpanded] = useState(false);

  // Lazy initialiser: `storageGetSync` touches storage, and without the
  // function form it runs on every render rather than once.
  const [dismissed, setDismissed] = useState(() => {
    const until = storageGetSync(SNOOZE_KEY);
    return Boolean(until && new Date(until) > new Date());
  });

  if (isLoading || dismissed || count === 0) return null;

  const snooze = () => {
    const until = new Date();
    until.setDate(until.getDate() + SNOOZE_DAYS);
    storageSetSync(SNOOZE_KEY, until.toISOString());
    setDismissed(true);
  };

  const shown = expanded ? quotes : quotes.slice(0, preview);
  // Sorted oldest-first by the hook, so the first row is the oldest.
  const oldestDays = quotes[0]?.ageDays ?? 0;

  return (
    <div className={cn(PANEL, 'relative overflow-hidden', className)}>
      <button
        type="button"
        onClick={snooze}
        aria-label="Hide for a week"
        className="absolute top-0.5 right-0.5 z-10 h-11 w-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors touch-manipulation"
      >
        <X className="h-3.5 w-3.5 text-white/60" />
      </button>

      <div className="flex items-center gap-3 p-3.5 pr-12">
        <div className="h-11 w-11 shrink-0 rounded-xl border border-elec-yellow/[0.2] bg-elec-yellow/[0.12] flex items-center justify-center">
          <ReceiptText className="h-5 w-5 text-elec-yellow" />
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-white leading-snug">
            {money(totalValue)} accepted, not invoiced
          </p>
          {/* Says something the headline does not. "N quotes the client agreed
              to" just restated the title, and read oddly across several
              different clients. The age of the oldest is the part that makes
              it worth acting on. */}
          <p className="text-[12px] text-white mt-0.5">
            {count === 1 ? '1 quote' : `${count} quotes`} · oldest {ageLabel(oldestDays)}
          </p>
        </div>
      </div>

      <div className="border-t border-white/[0.08]">
        {shown.map((q) => (
          <button
            key={q.id}
            type="button"
            onClick={() => navigate(`/electrician/invoice-quote-builder/${q.id}`)}
            className="flex min-h-[56px] w-full items-center gap-3 px-3.5 py-2 text-left border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.04] active:bg-white/[0.06] transition-colors touch-manipulation"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-medium text-white">{describe(q)}</p>
              {/* AGE FIRST, client second — the order is the point.
                  With the client first, a long name truncated the line and
                  took "accepted 13 months ago" with it, deleting the most
                  decision-relevant fact from the row that most needed it
                  (seen on the `case=long` fixture: "Kensington & Chelsea
                  Property Mana…"). The age is short and bounded, a client
                  name is neither, so the age goes where truncation cannot
                  reach it. Client named only when the title above is the job,
                  or it reads "Tom Jenkins · Tom Jenkins". */}
              <p className="truncate text-[12px] text-white">
                accepted {ageLabel(q.ageDays)}
                {q.clientName && q.jobTitle ? ` · ${q.clientName}` : ''}
              </p>
            </div>
            <span className="shrink-0 text-[14px] font-semibold text-white tabular-nums">
              {money(q.total)}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-elec-yellow" />
          </button>
        ))}
      </div>

      {count > preview && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex min-h-[44px] w-full items-center justify-center px-3.5 text-[13px] font-semibold text-elec-yellow hover:bg-white/[0.04] transition-colors touch-manipulation"
        >
          {expanded ? 'Show fewer' : `Show all ${count}`}
        </button>
      )}
    </div>
  );
};

export default UninvoicedQuotesCard;
