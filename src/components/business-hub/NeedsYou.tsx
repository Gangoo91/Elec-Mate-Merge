/**
 * Needs you — the work, not the doors to the work.
 *
 * The hub opened with a KPI strip and twenty-three launcher tiles. It TOLD you
 * there were four overdue invoices, oldest 153 days, twenty-five open tasks and
 * a site visit still running — and then made you go and find every one of them.
 * "Owed to you £6,027" was the most important thing on the screen and it was a
 * dead end: the card that raised the alarm offered no way to act on it.
 *
 * This is the list that closes that gap. One ranked column, most urgent first,
 * every row a single thing you can go and do. Deliberately NOT tabbed — tabs
 * hide the second-most-urgent item behind a click, and the whole point is that
 * you shouldn't have to hunt for what's next.
 *
 * Ranking is by cost of leaving it: money already late outranks money that
 * might not arrive, which outranks work with a date on it, which outranks work
 * without one. Within a kind, oldest first — a 153-day debt is a different
 * problem from a 3-day one.
 */
import React, { useMemo } from 'react';
import { HubWorkList, type HubWorkItem } from '@/components/hub/HubPrimitives';
import type { Quote } from '@/types/quote';
import type { SparkTask } from '@/hooks/useSparkTasks';
import type { Snag } from '@/hooks/useSnags';
import { isQuoteLive } from '@/utils/quote-status';

/** How many rows before we stop and offer a count instead. */
const VISIBLE = 5;

/** A quote with no reply for this long is worth a nudge. */
const QUIET_DAYS = 7;

type Kind = 'money' | 'quote' | 'task' | 'snag' | 'visit';

interface Item extends HubWorkItem {
  kind: Kind;
  /**
   * Which group of work this is. Bands never interleave — money already late
   * always outranks a quiet quote, however old the quote.
   */
  band: number;
  /**
   * Order WITHIN the band, higher first.
   *
   * For money this is exposure — amount × days late — not age alone. Ranking
   * overdue invoices by age put a £20 debt at 153 days above £5,610 at 127,
   * so the list's first instruction was to go and chase twenty quid. Age is
   * the right tie-breaker between comparable debts and the wrong sort key
   * across debts of different size: what it actually costs to leave a thing
   * alone is how much, multiplied by how long.
   */
  weight: number;
}

const DAY = 86_400_000;
const daysSince = (d: Date | string) =>
  Math.floor((Date.now() - new Date(d).getTime()) / DAY);

const money = (v: number) => `£${Math.round(v).toLocaleString('en-GB')}`;

const plural = (n: number, one: string, many = `${one}s`) =>
  `${n} ${n === 1 ? one : many}`;

interface Props {
  invoices: Quote[];
  quotes: Quote[];
  tasks: SparkTask[];
  snags: Snag[];
  draftVisitCount: number;
}

export const NeedsYou: React.FC<Props> = ({
  invoices,
  quotes,
  tasks,
  snags,
  draftVisitCount,
}) => {
  const items = useMemo<Item[]>(() => {
    const out: Item[] = [];

    // ── 1. Money already late ────────────────────────────────────────────
    // Same filter the KPI strip uses, so the two can never disagree: a draft
    // has not been sent to anyone and cannot be overdue.
    invoices
      .filter(
        (i) =>
          i.invoice_status &&
          i.invoice_status !== 'paid' &&
          i.invoice_status !== 'draft' &&
          i.invoice_due_date &&
          new Date(i.invoice_due_date).getTime() < Date.now()
      )
      .forEach((i) => {
        const late = daysSince(i.invoice_due_date!);
        out.push({
          id: `inv-${i.id}`,
          kind: 'money',
          band: 5,
          weight: (i.total || 0) * late,
          title: i.client?.name || i.invoice_number || 'Invoice',
          reason: `${plural(late, 'day')} past due`,
          trailing: money(i.total || 0),
          urgent: true,
          to: '/electrician/invoices?filter=outstanding',
        });
      });

    // ── 2. Quotes gone quiet ─────────────────────────────────────────────
    // isQuoteLive is "sent, undecided, not past expiry" — the genuinely
    // winnable pile. An expired quote needs re-issuing, not chasing, so it
    // is a different job and doesn't belong on this list.
    quotes
      .filter(isQuoteLive)
      .filter((q) => q.first_sent_at && daysSince(q.first_sent_at) >= QUIET_DAYS)
      .forEach((q) => {
        const quiet = daysSince(q.first_sent_at!);
        const opened = (q.email_open_count ?? 0) > 0;
        out.push({
          id: `q-${q.id}`,
          kind: 'quote',
          band: 4,
          // Same logic as an overdue invoice: the biggest job going cold is
          // the one worth a phone call this morning.
          weight: (q.total || 0) * quiet,
          title: q.client?.name || q.quoteNumber || 'Quote',
          // Whether they opened it changes what you say when you ring, so
          // it earns the line over a second copy of "no reply".
          reason: opened
            ? `Opened it, no reply in ${plural(quiet, 'day')}`
            : `Sent ${plural(quiet, 'day')} ago, never opened`,
          trailing: money(q.total || 0),
          to: '/electrician/quotes',
        });
      });

    // ── 3. Tasks with a date that has passed ─────────────────────────────
    tasks
      .filter((t) => t.status === 'open' && t.dueAt)
      .filter((t) => new Date(t.dueAt!).getTime() < Date.now())
      .forEach((t) => {
        const late = daysSince(t.dueAt!);
        out.push({
          id: `t-${t.id}`,
          kind: 'task',
          band: 3,
          // No money on a task, so age is all there is — but an urgent one
          // jumps a fortnight's worth of ordinary ones.
          weight: late + (t.priority === 'urgent' ? 14 : t.priority === 'high' ? 7 : 0),
          title: t.title,
          reason:
            late === 0
              ? 'Due today'
              : `${plural(late, 'day')} overdue${t.customerName ? ` · ${t.customerName}` : ''}`,
          to: '/electrician/tasks',
        });
      });

    // ── 4. Paperwork left open ───────────────────────────────────────────
    // An in-progress site visit is a form someone walked away from. It costs
    // nothing to finish and everything to lose.
    if (draftVisitCount > 0) {
      out.push({
        id: 'visits',
        kind: 'visit',
        band: 2,
        weight: draftVisitCount,
        title: `${plural(draftVisitCount, 'site visit')} unfinished`,
        reason: 'Started on site, never completed',
        to: '/electrician/site-visits',
      });
    }

    // ── 5. Snags that were flagged as serious ────────────────────────────
    // Only urgent/high. Every open snag would flood the list with work that
    // is already written down and scheduled — the point of this column is
    // what is going wrong, not what is outstanding.
    //
    // Tested POSITIVELY against the real status vocabulary. Snags are
    // spark_tasks rows and the statuses are 'open' | 'done' | 'snoozed' |
    // 'cancelled'; this was written as `!== 'resolved' && !== 'completed'`,
    // neither of which exists, so the test was always true and the list
    // showed snags that had been finished months ago. Exactly the bug the
    // task count carried until recently — an exclusion list can only be
    // wrong silently, so match the value you actually want.
    snags
      .filter((s) => s.status === 'open')
      .filter((s) => s.priority === 'urgent' || s.priority === 'high')
      .forEach((s) => {
        out.push({
          id: `s-${s.id}`,
          kind: 'snag',
          band: 1,
          weight: (s.priority === 'urgent' ? 1000 : 0) + daysSince(s.createdAt),
          title: s.title,
          reason: [
            s.priority === 'urgent' ? 'Urgent' : 'High priority',
            s.projectTitle || s.location,
          ]
            .filter(Boolean)
            .join(' · '),
          to: '/electrician/snagging',
        });
      });

    return out.sort((a, b) => b.band - a.band || b.weight - a.weight);
  }, [invoices, quotes, tasks, snags, draftVisitCount]);

  // Ranking is this page's business; the list chrome is shared, so the two
  // hubs cannot drift into two different-looking work lists.
  return <HubWorkList items={items} visible={VISIBLE} />;
};
