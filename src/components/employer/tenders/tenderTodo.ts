/**
 * ELE-1994: the Overview "To do" row for new public tenders that match what
 * the firm bids for. Only new ones this week, so it never nags about the same
 * list; nothing at all until the firm has said what it bids for.
 */
import type { HomeTodo } from '@/components/employer/overview/HomeSections';
import type { TenderMatches } from '@/hooks/useTenderMatches';

export function buildTenderTodo(m?: TenderMatches | null): (HomeTodo & { hero: string })[] {
  if (!m?.has_criteria) return [];
  const fresh = (m.items ?? []).filter((x) => !x.tracked && x.is_new);
  const n = m.new_this_week;
  if (!n) return [];
  const first = fresh[0];
  return [
    {
      key: 'tender-matches',
      kind: 'Jobs',
      badge: 'TN',
      urgent: false,
      rank: 60,
      title:
        n === 1 ? '1 new tender fits what you bid for' : `${n} new tenders fit what you bid for`,
      detail: first
        ? [first.title, first.client_name].filter(Boolean).join(', ')
        : 'Public tenders this week',
      meta: first?.deadline
        ? `Closes ${new Date(first.deadline).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
        : undefined,
      action: 'View',
      hero: 'Look at new tenders',
      section: 'tenders',
      params: { matches: '1' },
    },
  ];
}
