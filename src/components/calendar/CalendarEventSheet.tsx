import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import {
  Loader2,
  MapPin,
  Bell,
  FileText,
  StickyNote,
  Clock,
  CalendarDays,
  ChevronDown,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  CalendarEvent,
  CalendarEventType,
  CreateCalendarEventInput,
  UpdateCalendarEventInput,
} from '@/types/calendar';
import { EVENT_COLOURS, EVENT_TYPE_LABELS } from '@/types/calendar';

interface CalendarEventSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: CalendarEvent | null;
  defaultDate?: Date;
  defaultHour?: number;
  onSave: (data: CreateCalendarEventInput | UpdateCalendarEventInput) => void;
  saving?: boolean;
}

const REMINDER_OPTIONS = [
  { value: '0', label: 'None' },
  { value: '5', label: '5 min' },
  { value: '15', label: '15 min' },
  { value: '30', label: '30 min' },
  { value: '60', label: '1 hr' },
  { value: '1440', label: '1 day' },
];

const EVENT_TYPES = Object.keys(EVENT_TYPE_LABELS) as CalendarEventType[];

// Generate hour options (00–23) and minute options (00, 15, 30, 45)
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 15, 30, 45];

const CalendarEventSheet = ({
  open,
  onOpenChange,
  event,
  defaultDate,
  defaultHour,
  onSave,
  saving,
}: CalendarEventSheetProps) => {
  const isEditing = !!event;

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startHour, setStartHour] = useState(9);
  const [startMinute, setStartMinute] = useState(0);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [endHour, setEndHour] = useState(10);
  const [endMinute, setEndMinute] = useState(0);
  const [allDay, setAllDay] = useState(false);
  const [eventType, setEventType] = useState<CalendarEventType>('general');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [reminderMinutes, setReminderMinutes] = useState('30');
  const [colour, setColour] = useState(EVENT_COLOURS.general);

  // Which picker is open
  const [openPicker, setOpenPicker] = useState<
    'startDate' | 'endDate' | 'startTime' | 'endTime' | null
  >(null);

  const togglePicker = useCallback((picker: typeof openPicker) => {
    setOpenPicker((prev) => (prev === picker ? null : picker));
  }, []);

  // Populate form
  useEffect(() => {
    if (event) {
      const s = new Date(event.start_at);
      const e = new Date(event.end_at);
      setTitle(event.title);
      setDescription(event.description ?? '');
      setStartDate(s);
      setStartHour(s.getHours());
      setStartMinute(s.getMinutes());
      setEndDate(e);
      setEndHour(e.getHours());
      setEndMinute(e.getMinutes());
      setAllDay(event.all_day);
      setEventType(event.event_type);
      setLocation(event.location ?? '');
      setNotes(event.notes ?? '');
      setReminderMinutes(String(event.reminder_minutes));
      setColour(event.colour);
    } else {
      const d = defaultDate ?? new Date();
      const hour = defaultHour ?? 9;
      setTitle('');
      setDescription('');
      setStartDate(d);
      setStartHour(hour);
      setStartMinute(0);
      setEndDate(d);
      setEndHour(Math.min(hour + 1, 23));
      setEndMinute(0);
      setAllDay(false);
      setEventType('general');
      setLocation('');
      setNotes('');
      setReminderMinutes('30');
      setColour(EVENT_COLOURS.general);
    }
    setOpenPicker(null);
  }, [event, defaultDate, defaultHour, open]);

  // Sync colour with event type
  useEffect(() => {
    if (!event) setColour(EVENT_COLOURS[eventType]);
  }, [eventType, event]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    const sYear = startDate.getFullYear();
    const sMonth = startDate.getMonth();
    const sDay = startDate.getDate();
    const eYear = endDate.getFullYear();
    const eMonth = endDate.getMonth();
    const eDay = endDate.getDate();

    const startAt = allDay
      ? new Date(sYear, sMonth, sDay, 0, 0, 0).toISOString()
      : new Date(sYear, sMonth, sDay, startHour, startMinute, 0).toISOString();
    const endAt = allDay
      ? new Date(eYear, eMonth, eDay, 23, 59, 59).toISOString()
      : new Date(eYear, eMonth, eDay, endHour, endMinute, 0).toISOString();

    const data: CreateCalendarEventInput = {
      title: title.trim(),
      description: description.trim() || undefined,
      start_at: startAt,
      end_at: endAt,
      all_day: allDay,
      event_type: eventType,
      location: location.trim() || undefined,
      notes: notes.trim() || undefined,
      reminder_minutes: parseInt(reminderMinutes, 10),
      colour,
      recurring: false,
    };

    onSave(data);
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Colour bar */}
          <div
            className="h-1 flex-shrink-0 transition-colors"
            style={{ backgroundColor: colour }}
          />

          {/* Header */}
          <SheetHeader className="px-5 py-3 flex-shrink-0">
            <SheetTitle className="text-white text-lg font-bold">
              {isEditing ? 'Edit Event' : 'New Event'}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {isEditing ? 'Edit event details' : 'Create a new calendar event'}
            </SheetDescription>
          </SheetHeader>

          {/* Scrollable form */}
          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
            {/* Title */}
            <input
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="w-full h-14 text-lg font-semibold text-white touch-manipulation border-0 border-b border-white/10 bg-transparent px-0 focus:border-white/30 focus:ring-0 focus:outline-none placeholder:text-white/50"
            />

            {/* Type — horizontal pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
              {EVENT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setEventType(type)}
                  className={cn(
                    'flex items-center gap-1.5 h-11 px-3 rounded-full text-xs font-bold whitespace-nowrap touch-manipulation transition-all flex-shrink-0',
                    eventType === type
                      ? 'text-white ring-1'
                      : 'text-white bg-white/[0.04] active:bg-white/[0.08]'
                  )}
                  style={
                    eventType === type
                      ? {
                          backgroundColor: EVENT_COLOURS[type] + '30',
                          ringColor: EVENT_COLOURS[type],
                        }
                      : undefined
                  }
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: EVENT_COLOURS[type] }}
                  />
                  {EVENT_TYPE_LABELS[type]}
                </button>
              ))}
            </div>

            {/* Schedule section */}
            <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden divide-y divide-white/[0.06]">
              {/* All day */}
              <div className="flex items-center justify-between h-12 px-4 touch-manipulation">
                <span className="text-sm font-semibold text-white">All day</span>
                <Switch checked={allDay} onCheckedChange={setAllDay} />
              </div>

              {/* Start date */}
              <div>
                <button
                  type="button"
                  onClick={() => togglePicker('startDate')}
                  className="flex items-center w-full h-12 px-4 gap-3 touch-manipulation active:bg-white/[0.04]"
                >
                  <CalendarDays className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <span className="text-sm text-white w-12 flex-shrink-0">Starts</span>
                  <span className="flex-1 text-sm font-semibold text-white">
                    {format(startDate, 'EEE d MMM yyyy')}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white transition-transform',
                      openPicker === 'startDate' && 'rotate-180'
                    )}
                  />
                </button>
                {openPicker === 'startDate' && (
                  <div className="px-2 pb-3 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(d) => {
                        if (d) {
                          setStartDate(d);
                          if (d > endDate) setEndDate(d);
                        }
                        setOpenPicker(null);
                      }}
                      className="rounded-xl"
                    />
                  </div>
                )}
              </div>

              {/* Start time */}
              {!allDay && (
                <div>
                  <button
                    type="button"
                    onClick={() => togglePicker('startTime')}
                    className="flex items-center w-full h-12 px-4 gap-3 touch-manipulation active:bg-white/[0.04]"
                  >
                    <Clock className="h-4 w-4 text-blue-400 flex-shrink-0" />
                    <span className="text-sm text-white w-12 flex-shrink-0">Time</span>
                    <span className="flex-1 text-sm font-semibold text-elec-yellow tabular-nums">
                      {pad(startHour)}:{pad(startMinute)}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-white transition-transform',
                        openPicker === 'startTime' && 'rotate-180'
                      )}
                    />
                  </button>
                  {openPicker === 'startTime' && (
                    <TimePicker
                      hour={startHour}
                      minute={startMinute}
                      onHourChange={setStartHour}
                      onMinuteChange={setStartMinute}
                    />
                  )}
                </div>
              )}

              {/* End date */}
              <div>
                <button
                  type="button"
                  onClick={() => togglePicker('endDate')}
                  className="flex items-center w-full h-12 px-4 gap-3 touch-manipulation active:bg-white/[0.04]"
                >
                  <CalendarDays className="h-4 w-4 text-blue-400/50 flex-shrink-0" />
                  <span className="text-sm text-white w-12 flex-shrink-0">Ends</span>
                  <span className="flex-1 text-sm font-semibold text-white">
                    {format(endDate, 'EEE d MMM yyyy')}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-white transition-transform',
                      openPicker === 'endDate' && 'rotate-180'
                    )}
                  />
                </button>
                {openPicker === 'endDate' && (
                  <div className="px-2 pb-3 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(d) => {
                        if (d) setEndDate(d);
                        setOpenPicker(null);
                      }}
                      disabled={(d) => d < startDate}
                      className="rounded-xl"
                    />
                  </div>
                )}
              </div>

              {/* End time */}
              {!allDay && (
                <div>
                  <button
                    type="button"
                    onClick={() => togglePicker('endTime')}
                    className="flex items-center w-full h-12 px-4 gap-3 touch-manipulation active:bg-white/[0.04]"
                  >
                    <Clock className="h-4 w-4 text-blue-400/50 flex-shrink-0" />
                    <span className="text-sm text-white w-12 flex-shrink-0">Time</span>
                    <span className="flex-1 text-sm font-semibold text-elec-yellow tabular-nums">
                      {pad(endHour)}:{pad(endMinute)}
                    </span>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 text-white transition-transform',
                        openPicker === 'endTime' && 'rotate-180'
                      )}
                    />
                  </button>
                  {openPicker === 'endTime' && (
                    <TimePicker
                      hour={endHour}
                      minute={endMinute}
                      onHourChange={setEndHour}
                      onMinuteChange={setEndMinute}
                    />
                  )}
                </div>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 h-12 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
              <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <input
                placeholder="Add location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 h-full bg-transparent text-sm text-white touch-manipulation outline-none placeholder:text-white/50"
              />
            </div>

            {/* Reminder */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Bell className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Reminder
                </span>
              </div>
              <div className="flex gap-1.5">
                {REMINDER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setReminderMinutes(opt.value)}
                    className={cn(
                      'flex-1 h-11 text-xs font-bold rounded-lg touch-manipulation transition-all',
                      reminderMinutes === opt.value
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.04] text-white active:bg-white/[0.08]'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Description
                </span>
              </div>
              <Textarea
                placeholder="Add details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="touch-manipulation text-sm min-h-[72px] bg-white/[0.03] border-white/[0.06] focus:ring-1 focus:ring-elec-yellow/30 focus:border-elec-yellow/30 rounded-xl placeholder:text-white/50"
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <StickyNote className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Private notes
                </span>
              </div>
              <Textarea
                placeholder="Notes for yourself..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="touch-manipulation text-sm min-h-[72px] bg-white/[0.03] border-white/[0.06] focus:ring-1 focus:ring-elec-yellow/30 focus:border-elec-yellow/30 rounded-xl placeholder:text-white/50"
              />
            </div>
          </div>

          {/* Sticky footer */}
          <div
            className="flex-shrink-0 px-5 pt-3 border-t border-white/[0.06]"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <Button
              onClick={handleSubmit}
              disabled={!title.trim() || saving}
              className="w-full h-12 bg-elec-yellow text-black text-base font-bold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {saving && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
              {isEditing ? 'Save Changes' : 'Create Event'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

/** Inline time picker with hour and minute scroll columns */
function TimePicker({
  hour,
  minute,
  onHourChange,
  onMinuteChange,
}: {
  hour: number;
  minute: number;
  onHourChange: (h: number) => void;
  onMinuteChange: (m: number) => void;
}) {
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex justify-center gap-4 px-4 py-3">
      {/* Hours */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-bold text-white uppercase">Hour</span>
        <div className="flex flex-wrap gap-1 max-w-[180px] justify-center">
          {HOURS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => onHourChange(h)}
              className={cn(
                'w-11 h-11 rounded-lg text-sm font-bold touch-manipulation transition-all',
                hour === h ? 'bg-elec-yellow text-black' : 'text-white active:bg-white/[0.08]'
              )}
            >
              {pad(h)}
            </button>
          ))}
        </div>
      </div>

      {/* Minutes */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[10px] font-bold text-white uppercase">Min</span>
        <div className="flex flex-col gap-1">
          {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onMinuteChange(m)}
              className={cn(
                'w-12 h-11 rounded-lg text-sm font-bold touch-manipulation transition-all',
                minute === m ? 'bg-elec-yellow text-black' : 'text-white active:bg-white/[0.08]'
              )}
            >
              :{pad(m)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CalendarEventSheet;
