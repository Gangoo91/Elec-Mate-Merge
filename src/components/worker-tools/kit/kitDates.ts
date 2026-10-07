import { differenceInCalendarDays, format, parseISO } from 'date-fns';

/** PAT / calibration due label for a worker: overdue red, within 30 days orange. */
export function dueInfo(iso: string | null): { label: string; tone: 'red' | 'orange' | 'white'; days: number | null } {
  if (!iso) return { label: 'Not set', tone: 'white', days: null };
  const days = differenceInCalendarDays(parseISO(iso), new Date());
  if (days < 0) return { label: `Overdue since ${format(parseISO(iso), 'd MMM')}`, tone: 'red', days };
  if (days === 0) return { label: 'Due today', tone: 'orange', days };
  if (days <= 30) return { label: `Due ${format(parseISO(iso), 'd MMM')} (${days} ${days === 1 ? 'day' : 'days'})`, tone: 'orange', days };
  return { label: format(parseISO(iso), 'd MMM yyyy'), tone: 'white', days };
}
