import { format, isSameDay, parseISO } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Navigation, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigateToAddress } from '@/utils/navigate-to-address';
import { eyebrowCn, ghostButtonCn } from './calendarStyles';
import { effectiveEnd } from './eventUtils';
import type { CalendarEvent } from '@/types/calendar';
import { EVENT_TYPE_LABELS } from '@/types/calendar';

interface CalendarEventDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CalendarEvent | null;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
}

/** Row of a detail list — label above, value below, separated by a rule. */
const DetailRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border-t border-white/[0.10] px-4 py-3 sm:px-5">
    <p className={eyebrowCn}>{label}</p>
    <div className="mt-1 text-[14px] leading-snug text-white">{children}</div>
  </div>
);

function whenLabel(event: CalendarEvent): string {
  const start = parseISO(event.start_at);
  const end = effectiveEnd(event);

  if (event.all_day) {
    return isSameDay(start, end)
      ? format(start, 'EEEE d MMMM yyyy')
      : `${format(start, 'EEE d MMM')} – ${format(end, 'EEE d MMM yyyy')}`;
  }
  if (isSameDay(start, end)) {
    return `${format(start, 'EEEE d MMMM')} · ${format(start, 'HH:mm')}–${format(end, 'HH:mm')}`;
  }
  return `${format(start, 'EEE d MMM, HH:mm')} – ${format(end, 'EEE d MMM, HH:mm')}`;
}

const CalendarEventDetail = ({
  open,
  onOpenChange,
  event,
  onEdit,
  onDelete,
}: CalendarEventDetailProps) => {
  if (!event) return null;

  /**
   * Open the address in whatever maps app the device has.
   *
   * The address used to be plain text, so getting to a job meant reading it off
   * the screen and typing it into another app while sat in the van.
   */
  /*
   * ELE-1520 — this used to sniff the user agent and hand `maps://` to
   * `window.open(..., '_blank')`. Two problems: Capacitor only routes
   * `window.open` through the OS for the `_system` target, so `_blank` left it
   * to the WebView, which cannot open a custom scheme at all; and the Google
   * branch had the same in-app-browser problem as everywhere else. The shared
   * helper handles both.
   */
  const openInMaps = () => navigateToAddress({ address: event.location });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          <div className="h-1 shrink-0" style={{ backgroundColor: event.colour }} />

          <SheetHeader className="shrink-0 px-4 py-3 sm:px-5">
            <p className={eyebrowCn}>{EVENT_TYPE_LABELS[event.event_type]}</p>
            <SheetTitle className="text-left text-[19px] font-semibold leading-tight tracking-tight text-white">
              {event.title || 'Untitled event'}
            </SheetTitle>
            <SheetDescription className="sr-only">Event details</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto pb-4">
            <DetailRow label="When">{whenLabel(event)}</DetailRow>

            {event.location && (
              <DetailRow label="Where">
                <button
                  type="button"
                  onClick={openInMaps}
                  className="flex w-full items-center gap-2 text-left touch-manipulation"
                >
                  <span className="min-w-0 flex-1">{event.location}</span>
                  <Navigation className="h-4 w-4 shrink-0 text-elec-yellow" />
                </button>
              </DetailRow>
            )}

            {event.customer?.name && <DetailRow label="Customer">{event.customer.name}</DetailRow>}

            {event.project?.title && <DetailRow label="Job">{event.project.title}</DetailRow>}

            {event.job?.title && !event.project?.title && (
              <DetailRow label="Job">{event.job.title}</DetailRow>
            )}

            {event.reminder_minutes > 0 && (
              <DetailRow label="Reminder">
                {event.reminder_minutes >= 1440
                  ? `${event.reminder_minutes / 1440} day before`
                  : event.reminder_minutes >= 60
                    ? `${event.reminder_minutes / 60} hr before`
                    : `${event.reminder_minutes} min before`}
              </DetailRow>
            )}

            {event.description && (
              <DetailRow label="Description">
                <span className="whitespace-pre-wrap">{event.description}</span>
              </DetailRow>
            )}

            {event.notes && (
              <DetailRow label="Private notes">
                <span className="whitespace-pre-wrap">{event.notes}</span>
              </DetailRow>
            )}

            {event.sync_status === 'synced' && (
              <DetailRow label="Sync">Synced with Google Calendar</DetailRow>
            )}
          </div>

          <div
            className="flex shrink-0 gap-2 border-t border-white/[0.10] px-4 pt-3 sm:px-5"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={() => onDelete(event.id)}
              className={cn(
                ghostButtonCn,
                'h-12 flex-1 border-red-500/25 bg-red-500/10 text-[14px] text-red-300 hover:bg-red-500/15'
              )}
            >
              <Trash2 className="mr-2 inline h-4 w-4" />
              Delete
            </button>
            <button
              type="button"
              onClick={() => onEdit(event)}
              className="h-12 flex-1 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors touch-manipulation active:scale-[0.98]"
            >
              <Pencil className="mr-2 inline h-4 w-4" />
              Edit
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CalendarEventDetail;
