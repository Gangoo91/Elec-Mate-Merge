/**
 * Overview To do row (ELE-2065): an accepted quote with no firm job yet.
 * Opens the quote, where "Create job from this quote" makes the job with the
 * client, site and scope filled in.
 */
import type { HomeTodo } from '@/components/employer/overview/HomeSections';
import type { WonQuoteWithoutJob } from '@/services/quoteChainService';

type Todo = HomeTodo & { hero: string };

const shortDay = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

export function buildWonQuoteTodo(rows: WonQuoteWithoutJob[] | undefined): Todo[] {
  if (!rows || rows.length === 0) return [];
  const first = rows[0];
  const what = first.job_title ? `${first.client}: ${first.job_title}` : first.client;
  return [
    {
      key: 'won-quote-no-job',
      kind: 'Jobs',
      badge: 'QJ',
      rank: 13,
      title:
        rows.length === 1
          ? 'Quote accepted, no job yet'
          : `${rows.length} quotes accepted, no job yet`,
      detail:
        rows.length === 1
          ? `${what}${first.quote_number ? ` (${first.quote_number})` : ''}`
          : `Newest: ${what}`,
      meta: `Accepted ${shortDay(first.accepted_at)}`,
      action: 'Create job',
      hero: 'Turn the accepted quote into a job',
      section: 'quotes',
      params: { quote: first.id },
    },
  ];
}
