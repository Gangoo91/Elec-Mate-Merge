/**
 * One line at the top of the diary: what still needs doing to the fortnight
 * ahead. Tap it for the list; tap a booking to open it on the event sheet.
 *
 * This is the difference between a feature he has to remember and one the
 * app does with him. Sean had 12 upcoming Google bookings that were not jobs
 * when the event sheet shipped; nothing told him.
 */
import { useState } from 'react';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { Briefcase, ChevronRight, Send } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { CalendarEvent } from '@/types/calendar';
import { eyebrowCn } from './calendarStyles';
import { useDiaryTidy } from './useDiaryTidy';

interface CalendarTidyStripProps {
  onOpenEvent: (event: CalendarEvent) => void;
}

function dayLabel(iso: string): string {
  const d = parseISO(iso);
  if (isToday(d)) return 'Today';
  if (isTomorrow(d)) return 'Tomorrow';
  return format(d, 'EEE d MMM');
}

const Row = ({
  event,
  icon: Icon,
  onClick,
}: {
  event: CalendarEvent;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex min-h-14 w-full items-center gap-3 border-b border-white/[0.10] px-4 py-2.5 text-left last:border-b-0 touch-manipulation active:bg-white/[0.06]"
  >
    <Icon className="h-4 w-4 shrink-0 text-elec-yellow" />
    <span className="min-w-0 flex-1">
      <span className="block truncate text-[14px] font-medium text-white">
        {event.title || 'Untitled'}
      </span>
      <span className="block truncate text-[12px] text-white">
        {dayLabel(event.start_at)}
        {event.all_day ? '' : ` · ${format(parseISO(event.start_at), 'HH:mm')}`}
        {/* Who before where: on a "customer not told" row the name is the point,
            and the address was pushing it off the end of the line. */}
        {event.customer?.name ? ` · ${event.customer.name}` : ''}
        {event.location ? ` · ${event.location}` : ''}
      </span>
    </span>
    <ChevronRight className="h-4 w-4 shrink-0 text-white" />
  </button>
);

const CalendarTidyStrip = ({ onOpenEvent }: CalendarTidyStripProps) => {
  const { data } = useDiaryTidy();
  const [open, setOpen] = useState(false);
  const notJobs = data?.notJobs ?? [];
  const untold = data?.untold ?? [];
  if (notJobs.length === 0 && untold.length === 0) return null;

  const parts: string[] = [];
  if (notJobs.length > 0) {
    parts.push(
      `${notJobs.length} booking${notJobs.length === 1 ? '' : 's'} look${notJobs.length === 1 ? 's' : ''} like a job but ${notJobs.length === 1 ? "isn't" : "aren't"} one yet`
    );
  }
  if (untold.length > 0) {
    parts.push(`${untold.length} customer${untold.length === 1 ? '' : 's'} not told`);
  }

  const pick = (e: CalendarEvent) => {
    setOpen(false);
    onOpenEvent(e);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'flex min-h-12 w-full items-center gap-3 rounded-2xl border border-elec-yellow/40 bg-elec-yellow/10 px-4 py-2.5 text-left touch-manipulation active:scale-[0.99]'
        )}
      >
        <span className="min-w-0 flex-1">
          <span className={cn(eyebrowCn, 'block')}>Next two weeks</span>
          <span className="block text-[14px] font-medium leading-snug text-white">
            {parts.join(' · ')}
          </span>
        </span>
        <ChevronRight className="h-4 w-4 shrink-0 text-elec-yellow" />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
          <div className="flex h-full flex-col bg-background">
            <SheetHeader className="shrink-0 px-4 py-3 sm:px-5">
              <p className={eyebrowCn}>Next two weeks</p>
              <SheetTitle className="text-left text-[19px] font-semibold leading-tight tracking-tight text-white">
                Needs sorting
              </SheetTitle>
              <SheetDescription className="sr-only">Bookings that need attention</SheetDescription>
            </SheetHeader>

            <div className="flex-1 space-y-5 overflow-y-auto px-4 pb-6 sm:px-5">
              {notJobs.length > 0 && (
                <div>
                  <span className={cn(eyebrowCn, 'mb-2 block')}>Not a job yet</span>
                  <p className="mb-2 text-[12px] leading-snug text-white">
                    Open one and tap Start job, or link it to a job you already have.
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04]">
                    {notJobs.map((e) => (
                      <Row key={e.id} event={e} icon={Briefcase} onClick={() => pick(e)} />
                    ))}
                  </div>
                </div>
              )}
              {untold.length > 0 && (
                <div>
                  <span className={cn(eyebrowCn, 'mb-2 block')}>Customer not told</span>
                  <p className="mb-2 text-[12px] leading-snug text-white">
                    Nothing has been emailed about these. Open one and tap Tell them.
                  </p>
                  <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04]">
                    {untold.map((e) => (
                      <Row key={e.id} event={e} icon={Send} onClick={() => pick(e)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CalendarTidyStrip;
