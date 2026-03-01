import { format, parseISO } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Clock,
  MapPin,
  Pencil,
  Trash2,
  Calendar as CalendarIcon,
  User,
  Briefcase,
  FileText,
} from 'lucide-react';
import CalendarEventDot from './CalendarEventDot';
import type { CalendarEvent } from '@/types/calendar';
import { EVENT_TYPE_LABELS } from '@/types/calendar';

interface CalendarEventDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CalendarEvent | null;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
}

const CalendarEventDetail = ({
  open,
  onOpenChange,
  event,
  onEdit,
  onDelete,
}: CalendarEventDetailProps) => {
  if (!event) return null;

  const startDate = parseISO(event.start_at);
  const endDate = parseISO(event.end_at);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Header with colour bar */}
          <div className="h-2 flex-shrink-0" style={{ backgroundColor: event.colour }} />
          <SheetHeader className="px-4 py-3 border-b border-white/10 flex-shrink-0">
            <SheetTitle className="text-white text-lg font-bold text-left flex items-center gap-2">
              <CalendarEventDot colour={event.colour} className="w-2.5 h-2.5" />
              {event.title}
            </SheetTitle>
            <SheetDescription className="sr-only">Event details</SheetDescription>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Type badge */}
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 text-xs font-bold rounded-full text-white"
                style={{ backgroundColor: event.colour + '44' }}
              >
                {EVENT_TYPE_LABELS[event.event_type]}
              </span>
              {event.sync_status === 'synced' && (
                <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-green-500/20 rounded-full">
                  Synced
                </span>
              )}
            </div>

            {/* Date & Time */}
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <CalendarIcon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-white">
                  {event.all_day
                    ? format(startDate, 'EEEE d MMMM yyyy')
                    : format(startDate, 'EEEE d MMMM yyyy')}
                </p>
                {!event.all_day && (
                  <p className="text-sm text-white mt-0.5">
                    <Clock className="h-3.5 w-3.5 inline mr-1" />
                    {format(startDate, 'HH:mm')} – {format(endDate, 'HH:mm')}
                  </p>
                )}
                {event.all_day && <p className="text-sm text-white mt-0.5">All day</p>}
              </div>
            </div>

            {/* Location */}
            {event.location && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <MapPin className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white">{event.location}</p>
              </div>
            )}

            {/* Customer */}
            {event.customer && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <User className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white">{event.customer.name}</p>
              </div>
            )}

            {/* Job */}
            {event.job && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <Briefcase className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white">{event.job.title}</p>
              </div>
            )}

            {/* Description */}
            {event.description && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <FileText className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white whitespace-pre-wrap">{event.description}</p>
              </div>
            )}

            {/* Notes */}
            {event.notes && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <p className="text-xs font-semibold text-white mb-1">Notes</p>
                <p className="text-sm text-white whitespace-pre-wrap">{event.notes}</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div
            className="flex-shrink-0 px-4 pt-3 border-t border-white/10 flex gap-3"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <Button
              variant="outline"
              onClick={() => onDelete(event.id)}
              className="h-12 flex-1 rounded-xl border-red-500/30 text-red-400 hover:bg-red-500/10 touch-manipulation active:scale-[0.98]"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Delete
            </Button>
            <Button
              onClick={() => onEdit(event)}
              className="h-12 flex-1 bg-elec-yellow text-black font-bold rounded-xl touch-manipulation active:scale-[0.98]"
            >
              <Pencil className="h-5 w-5 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CalendarEventDetail;
