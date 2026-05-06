/**
 * TopicMasteryList
 *
 * Per-topic deep-dive: quiz score, flashcard mastery, last studied,
 * single-tap "Practise" CTA. Sorted strongest → weakest by default
 * with a switch to flip to weakest first (for targeted study).
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Eyebrow, SectionHeader } from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

export interface TopicRow {
  /** Display label */
  label: string;
  /** Average quiz score 0-100 (or null if no attempts yet) */
  quizScore: number | null;
  /** Flashcard mastery 0-100 (or null if no related set) */
  masteryPct: number | null;
  /** Optional flashcard set id for the Practise CTA. */
  flashcardSetId?: string | null;
  /** ISO date of last study activity, used for the "last studied" hint. */
  lastStudiedAt?: string | null;
}

interface TopicMasteryListProps {
  topics: TopicRow[];
}

const fmtRelative = (iso?: string | null) => {
  if (!iso) return null;
  const t = new Date(iso).getTime();
  if (isNaN(t)) return null;
  const days = Math.floor((Date.now() - t) / (1000 * 60 * 60 * 24));
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
};

function blended(row: TopicRow): number {
  const q = row.quizScore ?? 0;
  const m = row.masteryPct ?? 0;
  if (row.quizScore == null && row.masteryPct == null) return -1;
  if (row.quizScore == null) return m;
  if (row.masteryPct == null) return q;
  return q * 0.65 + m * 0.35;
}

export function TopicMasteryList({ topics }: TopicMasteryListProps) {
  const navigate = useNavigate();
  const [order, setOrder] = useState<'strongest' | 'weakest'>('weakest');

  if (!topics.length) {
    return (
      <div className="space-y-3">
        <SectionHeader eyebrow="Topic mastery" title="No data yet" />
        <p className="text-[13px] text-white/55">
          Take a quiz or run a flashcard session — your topic mastery will populate here.
        </p>
      </div>
    );
  }

  const sorted = [...topics].sort((a, b) => {
    const ba = blended(a);
    const bb = blended(b);
    return order === 'weakest' ? ba - bb : bb - ba;
  });

  const goPractise = (row: TopicRow) => {
    if (row.flashcardSetId) {
      navigate(`/apprentice/on-job-tools/flashcards?set=${row.flashcardSetId}`);
    } else {
      navigate('/study-centre/apprentice');
    }
  };

  return (
    <div className="space-y-3">
      <SectionHeader
        eyebrow="Topic mastery"
        title={order === 'weakest' ? 'Weakest topics first' : 'Strongest topics first'}
        meta={`${topics.length} topics · quiz × flashcard mastery blended`}
        action={
          <button
            type="button"
            onClick={() =>
              setOrder((o) => (o === 'weakest' ? 'strongest' : 'weakest'))
            }
            className="text-[12px] text-elec-yellow font-medium touch-manipulation"
          >
            Sort: {order === 'weakest' ? 'weakest →' : 'strongest →'}
          </button>
        }
      />
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {sorted.map((row) => {
          const score = blended(row);
          const tone =
            score < 0
              ? 'border-white/[0.06]'
              : score >= 70
                ? 'border-elec-yellow/25'
                : score >= 50
                  ? 'border-white/[0.08]'
                  : 'border-red-500/25';
          const valueTone =
            score < 0
              ? 'text-white/40'
              : score >= 70
                ? 'text-elec-yellow'
                : score >= 50
                  ? 'text-white'
                  : 'text-red-300';
          return (
            <li
              key={row.label}
              className={cn(
                'rounded-xl border bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3',
                tone
              )}
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="min-w-0 space-y-0.5">
                  <Eyebrow>{row.label}</Eyebrow>
                  {row.lastStudiedAt && (
                    <span className="text-[11px] text-white/40 font-mono block">
                      Last studied {fmtRelative(row.lastStudiedAt)}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    'text-[24px] sm:text-[28px] font-mono font-semibold tabular-nums leading-none',
                    valueTone
                  )}
                >
                  {score < 0 ? '—' : Math.round(score)}
                </span>
              </div>

              {/* Sub-bars: quiz vs flashcards */}
              <div className="space-y-1.5">
                <SubBar label="Quiz" value={row.quizScore} />
                <SubBar label="Cards" value={row.masteryPct} />
              </div>

              <button
                type="button"
                onClick={() => goPractise(row)}
                className="inline-flex items-center h-8 px-3 rounded-md bg-elec-yellow text-black text-[11.5px] font-semibold hover:bg-elec-yellow/90 transition-colors touch-manipulation"
              >
                {(score < 0 || score < 50) ? 'Start practising →' : 'Sharpen further →'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SubBar({ label, value }: { label: string; value: number | null }) {
  const pct = value ?? 0;
  const fill =
    value == null
      ? 'bg-white/[0.06]'
      : pct >= 70
        ? 'bg-elec-yellow'
        : pct >= 40
          ? 'bg-white/55'
          : 'bg-white/30';
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.14em] text-white/55 w-14 flex-shrink-0">
        {label}
      </span>
      <div className="flex-1 h-1 bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', fill)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] text-white/85 font-mono tabular-nums w-10 text-right flex-shrink-0">
        {value == null ? '—' : `${Math.round(pct)}%`}
      </span>
    </div>
  );
}

export default TopicMasteryList;
