import { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { PlacesAutocomplete } from '@/components/ui/PlacesAutocomplete';
import { GoogleMapsProvider } from '@/contexts/GoogleMapsContext';
import { ChevronDown, Loader2, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCustomers } from '@/hooks/useCustomers';
import { useLinkableProjects } from '@/hooks/useLinkableProjects';
import { useDayClashes } from '@/hooks/useDayClashes';
import { useCalendarSettings } from '@/hooks/useCalendarSettings';
import { textareaCn } from '@/components/forms/fieldStyles';
import { chipBase, chipOff, chipOn, eyebrowCn, fieldCn, labelCn } from './calendarStyles';
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
  { value: '15', label: '15 min' },
  { value: '30', label: '30 min' },
  { value: '60', label: '1 hr' },
  { value: '120', label: '2 hr' },
  { value: '1440', label: '1 day' },
];

const EVENT_TYPES = Object.keys(EVENT_TYPE_LABELS) as CalendarEventType[];
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

const pad = (n: number) => String(n).padStart(2, '0');

type PickerKey =
  | 'startDate'
  | 'endDate'
  | 'startTime'
  | 'endTime'
  | 'customer'
  | 'project'
  | null;

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
  const [clientId, setClientId] = useState<string | undefined>(undefined);
  const [projectId, setProjectId] = useState<string | undefined>(undefined);
  const [customerSearch, setCustomerSearch] = useState('');

  const [openPicker, setOpenPicker] = useState<PickerKey>(null);
  const togglePicker = useCallback((picker: PickerKey) => {
    setOpenPicker((prev) => (prev === picker ? null : picker));
  }, []);

  // Only fetched once the sheet is open — a picker nobody has opened should not
  // cost a round trip on every calendar render.
  const { customers } = useCustomers();
  const { settings } = useCalendarSettings();
  const { data: projects = [] } = useLinkableProjects(open);
  const { data: dayEvents = [] } = useDayClashes(open ? startDate : null, open && !allDay);

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
      setClientId(event.client_id);
      setProjectId(event.project_id);
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
      // The default reminder is a setting the user can change in the settings
      // sheet — which, until now, nothing consulted: this was hardcoded to 30
      // whatever they chose.
      setReminderMinutes(String(settings.defaultReminderMinutes));
      setColour(EVENT_COLOURS.general);
      setClientId(undefined);
      setProjectId(undefined);
    }
    setCustomerSearch('');
    setOpenPicker(null);
    // settings is read only to seed a NEW event; adding it to the deps would
    // reset a form the user is halfway through the moment settings reload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, defaultDate, defaultHour, open]);

  // Colour follows the type on a new event; an edited one keeps what it has.
  useEffect(() => {
    if (!event) setColour(EVENT_COLOURS[eventType]);
  }, [eventType, event]);

  const selectedCustomer = customers.find((c) => c.id === clientId);
  const selectedProject = projects.find((p) => p.id === projectId);

  const filteredCustomers = useMemo(() => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return customers.slice(0, 50);
    return customers.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 50);
  }, [customers, customerSearch]);

  /** Projects for the chosen customer first — usually the one being booked. */
  const orderedProjects = useMemo(() => {
    if (!clientId) return projects;
    return [...projects].sort((a, b) => {
      const aMatch = a.customerId === clientId ? 0 : 1;
      const bMatch = b.customerId === clientId ? 0 : 1;
      return aMatch - bMatch;
    });
  }, [projects, clientId]);

  const startAt = useMemo(
    () =>
      allDay
        ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0)
        : new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
            startHour,
            startMinute,
            0
          ),
    [allDay, startDate, startHour, startMinute]
  );

  const endAt = useMemo(
    () =>
      allDay
        ? new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59)
        : new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate(),
            endHour,
            endMinute,
            0
          ),
    [allDay, endDate, endHour, endMinute]
  );

  const endsBeforeItStarts = endAt <= startAt;

  /**
   * Anything already booked over the same stretch of time.
   *
   * A warning rather than a block — an electrician may well want a site visit
   * inside a day booked to a job, and the app has no business refusing that.
   * It only has a duty to say so.
   */
  const clashes = useMemo(() => {
    if (allDay || endsBeforeItStarts) return [];
    return dayEvents.filter((e) => {
      if (event && e.id === event.id) return false;
      if (e.all_day) return false;
      return new Date(e.start_at) < endAt && new Date(e.end_at) > startAt;
    });
  }, [dayEvents, startAt, endAt, allDay, endsBeforeItStarts, event]);

  const handleSubmit = () => {
    if (!title.trim() || endsBeforeItStarts) return;
    onSave({
      title: title.trim(),
      description: description.trim() || undefined,
      start_at: startAt.toISOString(),
      end_at: endAt.toISOString(),
      all_day: allDay,
      event_type: eventType,
      location: location.trim() || undefined,
      notes: notes.trim() || undefined,
      reminder_minutes: parseInt(reminderMinutes, 10),
      colour,
      recurring: false,
      client_id: clientId,
      project_id: projectId,
    });
  };

  const rowButtonCn =
    'flex h-12 w-full items-center gap-3 px-4 text-left touch-manipulation active:bg-white/[0.04]';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          <div className="h-1 shrink-0 transition-colors" style={{ backgroundColor: colour }} />

          <SheetHeader className="shrink-0 px-4 py-3">
            <SheetTitle className="text-left text-[17px] font-semibold tracking-tight text-white">
              {isEditing ? 'Edit event' : 'New event'}
            </SheetTitle>
            <SheetDescription className="sr-only">
              {isEditing ? 'Edit event details' : 'Create a new calendar event'}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
            {/* Title */}
            <div>
              <label className={labelCn} htmlFor="event-title">
                Event title
              </label>
              <input
                id="event-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is it?"
                autoFocus
                className={fieldCn}
              />
            </div>

            {/* Type */}
            <div>
              <span className={labelCn}>Type</span>
              <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEventType(type)}
                    className={cn(
                      chipBase,
                      'flex items-center gap-1.5',
                      eventType === type ? chipOn : chipOff
                    )}
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: EVENT_COLOURS[type] }}
                    />
                    {EVENT_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="divide-y divide-white/[0.10] overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04]">
              <div className="flex h-12 items-center justify-between px-4">
                <span className="text-[14px] font-medium text-white">All day</span>
                <Switch checked={allDay} onCheckedChange={setAllDay} />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => togglePicker('startDate')}
                  className={rowButtonCn}
                >
                  <span className="w-12 shrink-0 text-[13px] text-white">Starts</span>
                  <span className="flex-1 text-[14px] font-semibold text-white">
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
                  <div className="flex justify-center px-2 pb-3">
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

              {!allDay && (
                <div>
                  <button
                    type="button"
                    onClick={() => togglePicker('startTime')}
                    className={rowButtonCn}
                  >
                    <span className="w-12 shrink-0 text-[13px] text-white">Time</span>
                    <span className="flex-1 text-[14px] font-semibold tabular-nums text-elec-yellow">
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
                      onHourChange={(h) => {
                        setStartHour(h);
                        // Keep the gap the user already had rather than
                        // silently inverting the event.
                        if (
                          endDate.toDateString() === startDate.toDateString() &&
                          h >= endHour
                        ) {
                          setEndHour(Math.min(h + 1, 23));
                        }
                      }}
                      onMinuteChange={setStartMinute}
                    />
                  )}
                </div>
              )}

              <div>
                <button type="button" onClick={() => togglePicker('endDate')} className={rowButtonCn}>
                  <span className="w-12 shrink-0 text-[13px] text-white">Ends</span>
                  <span className="flex-1 text-[14px] font-semibold text-white">
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
                  <div className="flex justify-center px-2 pb-3">
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

              {!allDay && (
                <div>
                  <button
                    type="button"
                    onClick={() => togglePicker('endTime')}
                    className={rowButtonCn}
                  >
                    <span className="w-12 shrink-0 text-[13px] text-white">Time</span>
                    <span className="flex-1 text-[14px] font-semibold tabular-nums text-elec-yellow">
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

            {endsBeforeItStarts && (
              <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[13px] text-orange-300">
                The end is before the start. Adjust the times to save.
              </p>
            )}

            {clashes.length > 0 && (
              <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5">
                <p className="text-[13px] font-semibold text-orange-300">
                  {clashes.length === 1 ? 'Clashes with' : `Clashes with ${clashes.length} events`}
                </p>
                <ul className="mt-1 space-y-0.5">
                  {clashes.slice(0, 3).map((c) => (
                    <li key={c.id} className="text-[12px] tabular-nums text-orange-300">
                      {format(new Date(c.start_at), 'HH:mm')}–
                      {format(new Date(c.end_at), 'HH:mm')} · {c.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Location */}
            <div>
              <label className={labelCn}>Location</label>
              <GoogleMapsProvider>
                <PlacesAutocomplete
                  value={location}
                  onChange={setLocation}
                  placeholder="Add an address"
                  className={fieldCn}
                />
              </GoogleMapsProvider>
            </div>

            {/* Customer — client_id has existed on the table all along and no
                screen ever set it. Without this, an event could never be tied
                to the person it was for. */}
            <div>
              <span className={labelCn}>Customer</span>
              <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04]">
                {/* Clear sits BESIDE the disclosure, not inside it — a button
                    within a button is invalid and swallows its own taps. */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => togglePicker('customer')}
                    className={cn(rowButtonCn, 'flex-1')}
                  >
                    <span className="flex-1 truncate text-[14px] font-medium text-white">
                      {selectedCustomer?.name ?? 'None'}
                    </span>
                    {!clientId && (
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-white transition-transform',
                          openPicker === 'customer' && 'rotate-180'
                        )}
                      />
                    )}
                  </button>
                  {clientId && (
                    <button
                      type="button"
                      aria-label="Clear customer"
                      onClick={() => setClientId(undefined)}
                      className="flex h-12 w-11 shrink-0 items-center justify-center text-white touch-manipulation active:bg-white/[0.06]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {openPicker === 'customer' && (
                  <div className="border-t border-white/[0.10]">
                    <div className="relative px-4 py-2">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                      <input
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        placeholder="Search customers"
                        className={cn(fieldCn, 'pl-6')}
                      />
                    </div>
                    <div className="max-h-56 overflow-y-auto">
                      {filteredCustomers.length === 0 ? (
                        <p className="px-4 py-3 text-[13px] text-white">No customers found.</p>
                      ) : (
                        filteredCustomers.map((c) => (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => {
                              setClientId(c.id);
                              // A customer with an address fills a location the
                              // user would otherwise retype from memory.
                              if (!location.trim() && c.address) setLocation(c.address);
                              setOpenPicker(null);
                            }}
                            className="flex h-12 w-full items-center px-4 text-left text-[14px] text-white touch-manipulation active:bg-white/[0.06]"
                          >
                            <span className="truncate">{c.name}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Project — the bridge that lets this block be logged as billable
                time against a job (ELE-1472). Nothing in the UI could set it. */}
            <div>
              <span className={labelCn}>Job</span>
              <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04]">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => togglePicker('project')}
                    className={cn(rowButtonCn, 'flex-1')}
                  >
                    <span className="flex-1 truncate text-[14px] font-medium text-white">
                      {selectedProject?.title ?? 'None'}
                    </span>
                    {!projectId && (
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-white transition-transform',
                          openPicker === 'project' && 'rotate-180'
                        )}
                      />
                    )}
                  </button>
                  {projectId && (
                    <button
                      type="button"
                      aria-label="Clear job"
                      onClick={() => setProjectId(undefined)}
                      className="flex h-12 w-11 shrink-0 items-center justify-center text-white touch-manipulation active:bg-white/[0.06]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {openPicker === 'project' && (
                  <div className="max-h-56 overflow-y-auto border-t border-white/[0.10]">
                    {orderedProjects.length === 0 ? (
                      <p className="px-4 py-3 text-[13px] text-white">No open jobs.</p>
                    ) : (
                      orderedProjects.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setProjectId(p.id);
                            if (p.customerId && !clientId) setClientId(p.customerId);
                            if (!location.trim() && p.location) setLocation(p.location);
                            setOpenPicker(null);
                          }}
                          className="flex h-12 w-full items-center px-4 text-left text-[14px] text-white touch-manipulation active:bg-white/[0.06]"
                        >
                          <span className="truncate">{p.title}</span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Reminder */}
            <div>
              <span className={cn(eyebrowCn, 'mb-2 block')}>Reminder</span>
              <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
                {REMINDER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setReminderMinutes(opt.value)}
                    className={cn(chipBase, reminderMinutes === opt.value ? chipOn : chipOff)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className={labelCn} htmlFor="event-description">
                Description
              </label>
              <textarea
                id="event-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What needs doing"
                rows={2}
                className={cn(textareaCn, 'min-h-[72px]')}
              />
            </div>

            {/* Notes */}
            <div>
              <label className={labelCn} htmlFor="event-notes">
                Private notes
              </label>
              <textarea
                id="event-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Only you see these"
                rows={2}
                className={cn(textareaCn, 'min-h-[72px]')}
              />
            </div>
          </div>

          {/* Footer */}
          <div
            className="shrink-0 border-t border-white/[0.10] px-4 pt-3"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!title.trim() || endsBeforeItStarts || saving}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {saving && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isEditing ? 'Save changes' : 'Create event'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

/** Inline time picker — hour grid and minute column, both 44px targets. */
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
  return (
    <div className="flex justify-center gap-4 px-4 py-3">
      <div className="flex flex-col items-center gap-1">
        <span className={eyebrowCn}>Hour</span>
        <div className="flex max-w-[184px] flex-wrap justify-center gap-1">
          {HOURS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => onHourChange(h)}
              className={cn(
                'h-11 w-11 rounded-lg text-sm font-semibold tabular-nums transition-colors touch-manipulation',
                hour === h ? 'bg-elec-yellow text-black' : 'text-white active:bg-white/[0.08]'
              )}
            >
              {pad(h)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className={eyebrowCn}>Min</span>
        <div className="flex flex-col gap-1">
          {MINUTES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onMinuteChange(m)}
              className={cn(
                'h-11 w-12 rounded-lg text-sm font-semibold tabular-nums transition-colors touch-manipulation',
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
