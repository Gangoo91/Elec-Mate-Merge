/**
 * Mock exam insights shared by the Study Centre front page and the mock exam
 * history page (ELE-2024): which paper the learner is really working on, whether
 * they are on course to pass it, and what to say about it.
 *
 * Pure functions over rows the hooks already load, so both screens tell the
 * learner the same thing.
 */
import type { MockAttemptRow } from '@/hooks/study-centre/useMockHistory';

export interface PaperSummary {
  slug: string;
  name: string;
  retakePath: string | null;
  attempts: number;
  best: number;
  last: MockAttemptRow;
  previous: MockAttemptRow | null;
  /** Oldest → newest, up to 10. */
  trend: number[];
}

export type ForecastTone = 'done' | 'close' | 'short' | 'unknown';

export interface Forecast {
  tone: ForecastTone;
  /** Average of the last three sittings, rounded (null with one sitting). */
  avg: number | null;
  passMark: number;
  /** More right answers a sitting needs to reach the pass mark ('short' only). */
  more: number;
  /** One sentence a learner reads at a glance. */
  sentence: string;
  /** Short label for a chip. */
  label: string;
}

/**
 * Pass forecast from the last three attempts on a paper against its own pass
 * mark. Worked from the unrounded average so "1 more answer" is honest.
 */
export function forecastFor(trend: number[], passMark: number, total: number): Forecast {
  const recent = trend.slice(-3);
  if (recent.length < 2) {
    return {
      tone: 'unknown',
      avg: null,
      passMark,
      more: 0,
      label: 'One sitting so far',
      sentence: 'Sit it again for a pass forecast. One attempt isn’t a trend yet.',
    };
  }
  const avgRaw = recent.reduce((n, v) => n + v, 0) / recent.length;
  const avg = Math.round(avgRaw);
  const more = Math.max(1, Math.ceil((passMark / 100) * total - (avgRaw / 100) * total - 1e-9));
  if (avgRaw >= passMark + 5) {
    return {
      tone: 'done',
      avg,
      passMark,
      more: 0,
      label: 'On track to pass',
      sentence: `On track. Averaging ${avg}% over your last ${recent.length}, pass mark ${passMark}%.`,
    };
  }
  if (avgRaw >= passMark) {
    return {
      tone: 'close',
      avg,
      passMark,
      more: 0,
      label: 'Only just passing',
      sentence: `Just over the line at ${avg}% against ${passMark}%. One bad sitting and it’s a fail.`,
    };
  }
  return {
    tone: 'short',
    avg,
    passMark,
    more,
    label: `${more} more right to pass`,
    sentence: `Averaging ${avg}% against ${passMark}%. About ${more} more right ${
      more === 1 ? 'answer' : 'answers'
    } a sitting gets you there.`,
  };
}

export const forecastDot: Record<ForecastTone, string> = {
  done: 'bg-emerald-400',
  close: 'bg-sky-400',
  short: 'bg-orange-400',
  unknown: 'bg-white/40',
};

export const forecastText: Record<ForecastTone, string> = {
  done: 'text-emerald-400',
  close: 'text-sky-300',
  short: 'text-orange-400',
  unknown: 'text-white',
};

/**
 * The paper the learner is working on: most sittings in the last 30 days,
 * then the most recent. That is the one a forecast should be about, not
 * whichever paper happened to be sat last.
 */
export function mainPaper(papers: PaperSummary[], rows: MockAttemptRow[]): PaperSummary | null {
  if (!papers.length) return null;
  const since = Date.now() - 30 * 86400000;
  const recent = new Map<string, number>();
  for (const r of rows) {
    if (new Date(r.created_at).getTime() >= since) {
      recent.set(r.exam_slug, (recent.get(r.exam_slug) ?? 0) + 1);
    }
  }
  return [...papers].sort(
    (a, b) =>
      (recent.get(b.slug) ?? 0) - (recent.get(a.slug) ?? 0) ||
      b.last.created_at.localeCompare(a.last.created_at)
  )[0];
}

/** Average of the last N attempts across every paper (null when none). */
export function recentAverage(rows: MockAttemptRow[], n = 10): number | null {
  const last = rows.slice(0, n);
  if (!last.length) return null;
  return Math.round(last.reduce((s, r) => s + r.percentage, 0) / last.length);
}

/**
 * The pass mark to judge recentAverage against: the average pass mark of the
 * same sittings. Papers differ (mocks 60%, topic tests 70%), so taking one
 * paper's mark judged every other paper by the wrong line.
 */
export function recentPassMark(rows: MockAttemptRow[], n = 10): number {
  const last = rows.slice(0, n);
  if (!last.length) return 60;
  return Math.round(last.reduce((s, r) => s + (r.pass_mark ?? 60), 0) / last.length);
}

/** Bar colour for a topic accuracy: green ≥75, sky 60–74, orange below. */
export function topicBar(pct: number): string {
  return pct >= 75 ? 'bg-emerald-400' : pct >= 60 ? 'bg-sky-400' : 'bg-orange-400';
}
