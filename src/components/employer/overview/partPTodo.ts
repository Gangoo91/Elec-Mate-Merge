import { format, parseISO } from 'date-fns';
import type { HomeTodo } from '@/components/employer/overview/HomeSections';
import type { FirmPartPRow } from '@/hooks/useFirmPartP';

/* Overview "To do" row for Part P (ELE-2084): certificates on the firm's jobs
   whose notifiable work has not been notified to the scheme, inside the
   30-day window or already past it. One opens that certificate in Testing;
   several open Testing. */

const shortDate = (iso: string) => format(parseISO(iso), 'EEE d MMM');

export function buildPartPTodo(
  rows: FirmPartPRow[] | null | undefined,
  today: string
): (HomeTodo & { hero: string })[] {
  const open = (rows ?? [])
    .filter((r) => (r.state === 'needed' || r.state === 'overdue') && r.deadline)
    .sort((a, b) => (a.deadline ?? '').localeCompare(b.deadline ?? ''));
  if (!open.length) return [];
  const first = open[0];
  const due = first.deadline!.slice(0, 10);
  const late = open.filter((r) => r.deadline!.slice(0, 10) < today).length;
  const who = first.client_name || first.job_title || 'a certificate';
  return [
    {
      key: 'part-p',
      kind: 'Paperwork',
      badge: 'PP',
      urgent: late > 0,
      rank: late > 0 ? 12 : 33,
      title:
        open.length === 1
          ? `Part P ${late ? 'overdue' : 'to notify'} for ${who}`
          : late > 0
            ? `${open.length} Part P notifications due, ${late} overdue`
            : `${open.length} Part P notifications to make`,
      detail:
        open.length === 1 ? `${first.job_title ?? 'Job'} · ${first.owner_name}` : `First: ${who}`,
      meta: `${due < today ? 'Was due' : 'Due'} ${shortDate(due)}`,
      action: 'Notify',
      hero: 'Notify Part P',
      section: 'testing',
      params: open.length === 1 ? { job: first.job_id, cert: first.report_uuid } : undefined,
    },
  ];
}
