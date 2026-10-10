/**
 * Overview To do row (ELE-2094): enquiries nobody has replied to yet, from
 * every way in (email, website, quote page, calls, texts, online bookings and
 * older leads). Opens Enquiries, on the first one when there is just one.
 */
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import type { HomeTodo } from '@/components/employer/overview/HomeSections';
import type { DoorCounts } from '@/hooks/useFrontDoor';

type Todo = HomeTodo & { hero: string };

export function buildEnquiryTodo(c: DoorCounts | undefined): Todo[] {
  if (!c || !c.to_reply) return [];
  const one = c.to_reply === 1;
  const first = c.first;
  const params: Record<string, string> | undefined =
    one && first
      ? first.kind === 'lead'
        ? { lead: first.id }
        : first.kind === 'enquiry'
          ? { enquiry: first.id }
          : undefined
      : undefined;
  return [
    {
      key: 'enquiries-to-reply',
      kind: 'Clients',
      badge: 'EQ',
      urgent: c.urgent > 0,
      // Ahead of paperwork: the first firm to reply usually wins the job.
      rank: c.urgent > 0 ? 3 : 9,
      title: one
        ? 'Enquiry to reply to'
        : c.urgent > 0
          ? `${c.to_reply} enquiries to reply to, ${c.urgent} urgent`
          : `${c.to_reply} enquiries to reply to`,
      detail:
        one && first?.name ? first.name : 'Email, website, quote page, calls, texts and bookings',
      meta: c.oldest_at
        ? `Oldest ${formatDistanceToNowStrict(parseISO(c.oldest_at))} ago`
        : undefined,
      action: 'Reply',
      hero: one ? 'Reply to the new enquiry' : 'Reply to your enquiries',
      section: 'leads',
      params,
    },
  ];
}
