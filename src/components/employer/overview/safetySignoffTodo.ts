/**
 * Overview To do rows for sign-offs (ELE-1944, ELE-1946):
 *  - a toolbox talk from the last fortnight that people have not signed,
 *    with who is missing ("Monday talk: 6 of 8 signed");
 *  - a published policy people have not acknowledged yet;
 *  - a policy due for review in the next 30 days, or overdue.
 */
import type { HomeTodo } from '@/components/employer/overview/HomeSections';
import type { FirmSignoffAttention } from '@/hooks/useFirmSignoffAttention';

type Todo = HomeTodo & { hero: string };

const firstName = (n: string) => n.split(' ')[0] || n;
const shortDay = (iso: string) =>
  new Date(`${iso.slice(0, 10)}T12:00:00`).toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
const names = (list: string[]) => {
  const shown = list.slice(0, 3).map(firstName);
  return list.length > 3 ? `${shown.join(', ')} and ${list.length - 3} more` : shown.join(', ');
};

export function buildSignoffTodo(a: FirmSignoffAttention | undefined, today: string): Todo[] {
  if (!a) return [];
  const t: Todo[] = [];

  if (a.talks.length) {
    const first = a.talks[0];
    t.push({
      key: 'talks-unsigned',
      kind: 'Safety',
      badge: 'TT',
      rank: 20,
      title:
        a.talks.length === 1
          ? `${first.name}: ${first.signed} of ${first.total} signed`
          : `${a.talks.length} toolbox talks not fully signed`,
      detail:
        a.talks.length === 1
          ? `Not yet: ${names(first.missing)}`
          : `${first.name}: ${first.signed} of ${first.total}. Not yet: ${names(first.missing)}`,
      meta: shortDay(first.date),
      action: 'Chase',
      hero: 'Chase toolbox talk signatures',
      section: 'site-safety',
      params: { tool: 'team-briefing', id: first.id },
    });
  }

  const unread = a.policies.filter(
    (p) => p.published_version != null && p.team > 0 && p.acknowledged < p.team
  );
  if (unread.length) {
    const p = unread[0];
    t.push({
      key: 'policies-unread',
      kind: 'Paperwork',
      badge: 'PO',
      rank: 42,
      title:
        unread.length === 1
          ? `${p.name} v${p.published_version}: ${p.acknowledged} of ${p.team} signed`
          : `${unread.length} policies not signed by everyone`,
      detail:
        unread.length === 1
          ? 'The SSIP evidence that your team has read it'
          : `${p.name}: ${p.acknowledged} of ${p.team} signed`,
      action: 'Open',
      hero: 'Get policies signed',
      section: 'policies',
      params: { policy: p.id },
    });
  }

  const soon = new Date(`${today}T12:00:00`);
  soon.setDate(soon.getDate() + 30);
  const soonIso = soon.toISOString().slice(0, 10);
  const review = a.policies.filter((p) => p.review_date && p.review_date <= soonIso);
  if (review.length) {
    const p = review[0];
    const overdue = !!p.review_date && p.review_date < today;
    t.push({
      key: 'policies-review',
      kind: 'Paperwork',
      badge: 'RV',
      urgent: overdue,
      rank: overdue ? 34 : 46,
      title:
        review.length === 1
          ? `${p.name} ${overdue ? 'review overdue' : 'due for review'}`
          : `${review.length} policies due for review`,
      detail:
        review.length === 1
          ? 'Read it through, update it and publish the new version'
          : review
              .map((x) => x.name)
              .slice(0, 3)
              .join(', '),
      meta: p.review_date ? `${overdue ? 'Was due' : 'Due'} ${shortDay(p.review_date)}` : undefined,
      action: 'Review',
      hero: 'Review policies',
      section: 'policies',
      params: { policy: p.id },
    });
  }
  return t;
}
