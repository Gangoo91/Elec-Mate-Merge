import { format, parseISO } from 'date-fns';
import type { HomeTodo } from '@/components/employer/overview/HomeSections';
import type { ComplianceDocument } from '@/hooks/useComplianceDocuments';

/* Overview "To do" row for the compliance register (ELE-1985): documents
   overdue or renewing within 30 days ("Public liability insurance due Tue
   3 Nov"). One document opens that document; several open the register on
   its Due filter. The same dates drive the bell and email reminders
   (notify_employer_expiries). */

const shortDate = (iso: string) => format(parseISO(iso), 'EEE d MMM');

export function buildComplianceTodo(
  docs: ComplianceDocument[] | null | undefined,
  today: string
): (HomeTodo & { hero: string })[] {
  if (!docs?.length) return [];
  const in30 = format(new Date(parseISO(today).getTime() + 30 * 86400000), 'yyyy-MM-dd');
  const due = docs
    .filter((d) => d.expiry_date && d.status !== 'Draft' && d.expiry_date.slice(0, 10) <= in30)
    .sort((a, b) => (a.expiry_date ?? '').localeCompare(b.expiry_date ?? ''));
  if (!due.length) return [];
  const first = due[0];
  const firstDue = first.expiry_date!.slice(0, 10);
  const overdue = due.filter((d) => d.expiry_date!.slice(0, 10) < today).length;
  const firstOverdue = firstDue < today;
  return [
    {
      key: 'compliance-docs',
      kind: 'Expiring',
      badge: 'CD',
      urgent: overdue > 0,
      rank: 31,
      title:
        due.length === 1
          ? `${first.title} ${firstOverdue ? 'has lapsed' : `due ${shortDate(firstDue)}`}`
          : overdue > 0
            ? `${due.length} compliance documents lapsed or due`
            : `${due.length} compliance documents due in 30 days`,
      detail:
        due.length === 1
          ? (first.category ?? first.document_type ?? 'Compliance document')
          : `First: ${first.title}`,
      meta: `${firstOverdue ? 'Was due' : 'Due'} ${shortDate(firstDue)}`,
      action: 'Renew',
      hero: 'Renew compliance documents',
      section: 'compliance',
      params: due.length === 1 ? { doc: first.id } : undefined,
    },
  ];
}
