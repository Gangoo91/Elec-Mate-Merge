import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { format, isToday, isTomorrow } from 'date-fns';
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
import { ChevronDown, Loader2, Search, UserPlus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCustomers } from '@/hooks/useCustomers';
import { useLinkableProjects } from '@/hooks/useLinkableProjects';
import { useDayClashes } from '@/hooks/useDayClashes';
import { useCalendarSettings } from '@/hooks/useCalendarSettings';
import { useBookingHistory } from '@/hooks/useBookingHistory';
import { useSlotSuggestions } from '@/hooks/useSlotSuggestions';
import { textareaCn } from '@/components/forms/fieldStyles';
import { chipBase, chipOff, chipOn, eyebrowCn, fieldCn, labelCn } from './calendarStyles';
import SplitDaysPicker from './SplitDaysPicker';
import { addWorkingDays, humanMinutes } from './eventUtils';
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
  /**
   * Minutes past `defaultHour`. Slots are picked on the half hour in the day
   * sheet, and rounding a chosen 14:30 down to 14:00 in the form would quietly
   * undo the choice that was just made.
   */
  defaultMinute?: number;
  /**
   * Working days to block out, from a "Book out" chip in the day sheet. Opens
   * the form all-day and pre-stretched rather than writing the event blind.
   */
  defaultDays?: number;
  /**
   * ELE-1649 — the days the job being edited already runs on, when it is a
   * split job. Passed in rather than fetched: the page already holds every
   * event in view, and a child event knows its parent but not its siblings.
   */
  existingSplitDays?: Date[];
  onSave: (data: CreateCalendarEventInput | UpdateCalendarEventInput, extras: SaveExtras) => void;
  saving?: boolean;
}

/** What to do with the event once it exists, decided in this sheet. */
export interface SaveExtras {
  /** Start a job in the Electrical Hub from this booking. */
  createProject: boolean;
  /** Start a site visit from this booking. */
  createSiteVisit: boolean;
  /** Who it is for, resolved to a real customer row — for the "tell them" step. */
  customer?: { id: string; name: string; phone?: string; email?: string };
  /**
   * ELE-1649 — the specific days this job is on site, when they are not one
   * solid block. Empty for an ordinary booking.
   *
   * The sheet decides the DAYS; the page decides how to write them (anchor
   * plus `parent_event_id` children — see splitJob.ts). `start_at`/`end_at` on
   * the payload still describe the FIRST day, so a caller that ignores this
   * field writes a valid single booking rather than nothing.
   */
  splitDays?: Date[];
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

/*
 * Starter titles per type — the work the trade actually books, with the
 * length each usually takes (minutes; null = all day). The learned-habit
 * suggestions replace these as a diary builds up, but a new account should
 * never face a blank "What is it?" with nothing to tap.
 */
const STARTER_TITLES: Record<CalendarEventType, Array<{ title: string; minutes: number | null }>> = {
  job: [
    { title: 'Consumer unit change', minutes: null },
    { title: 'Fault find', minutes: 120 },
    { title: 'Extra sockets', minutes: 240 },
    { title: 'EV charger install', minutes: null },
    { title: 'Lighting install', minutes: 240 },
    { title: 'First fix', minutes: null },
    { title: 'Second fix', minutes: null },
  ],
  site_visit: [
    { title: 'Quote visit', minutes: 60 },
    { title: 'Survey', minutes: 60 },
    { title: 'Measure up', minutes: 60 },
  ],
  inspection: [
    { title: 'EICR', minutes: 240 },
    { title: 'PAT testing', minutes: 240 },
    { title: 'Fire alarm service', minutes: 120 },
    { title: 'Emergency lighting test', minutes: 120 },
  ],
  meeting: [
    { title: 'Client meeting', minutes: 60 },
    { title: 'Supplier meeting', minutes: 60 },
    { title: 'Wholesaler run', minutes: 60 },
  ],
  personal: [
    { title: 'Appointment', minutes: 60 },
    { title: 'Day off', minutes: null },
  ],
  general: [
    { title: 'Pick up materials', minutes: 60 },
    { title: 'Paperwork', minutes: 120 },
  ],
};
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

/**
 * How long it is on for.
 *
 * A rewire is not an appointment. Before this, the only way to book a fortnight
 * was to open the end-date calendar and page forward to it — which is why long
 * jobs were being entered as a single day and the diary was lying about the
 * next three weeks. `days` sets an all-day event over that many working days.
 */
const DURATIONS: Array<{ label: string; minutes?: number; days?: number }> = [
  { label: '30m', minutes: 30 },
  { label: '1h', minutes: 60 },
  { label: '2h', minutes: 120 },
  { label: '4h', minutes: 240 },
  { label: 'All day', days: 1 },
  { label: '2 days', days: 2 },
  { label: '3 days', days: 3 },
  { label: '1 week', days: 5 },
  { label: '2 weeks', days: 10 },
];

const pad = (n: number) => String(n).padStart(2, '0');

type PickerKey =
  | 'startDate'
  | 'endDate'
  | 'startTime'
  | 'endTime'
  | 'customer'
  | 'project'
  | null;

/** A customer being typed in rather than picked. */
interface NewCustomerDraft {
  name: string;
  phone: string;
  email: string;
  address: string;
}

const EMPTY_DRAFT: NewCustomerDraft = { name: '', phone: '', email: '', address: '' };

const CalendarEventSheet = ({
  open,
  onOpenChange,
  event,
  defaultDate,
  defaultHour,
  defaultMinute,
  defaultDays,
  existingSplitDays,
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
  const [crew, setCrew] = useState('');

  /** Typing a customer in instead of picking one off the list. */
  const [addingCustomer, setAddingCustomer] = useState(false);
  const [draft, setDraft] = useState<NewCustomerDraft>(EMPTY_DRAFT);
  const [savingCustomer, setSavingCustomer] = useState(false);
  const [customerError, setCustomerError] = useState<string | null>(null);

  /** What the booking should start, decided here and carried out by the page. */
  const [createProject, setCreateProject] = useState(false);
  const [createSiteVisit, setCreateSiteVisit] = useState(false);

  /**
   * ELE-1649 — the days a split job is on site. Empty means one solid block,
   * which is still the right answer for most bookings and stays the default.
   */
  const [splitDays, setSplitDays] = useState<Date[]>([]);
  const [pickingDays, setPickingDays] = useState(false);
  const isSplit = splitDays.length > 0;

  /*
   * Held in a ref, not read as a dependency.
   *
   * The page rebuilds this array on every render, so depending on it would
   * re-run the reset effect mid-edit and throw away days the user had just
   * tapped. Hydration is an open-time concern; `open`/`event` already say when
   * that is.
   */
  const existingSplitDaysRef = useRef<Date[] | undefined>(existingSplitDays);
  existingSplitDaysRef.current = existingSplitDays;

  const [openPicker, setOpenPicker] = useState<PickerKey>(null);
  const togglePicker = useCallback((picker: PickerKey) => {
    setOpenPicker((prev) => (prev === picker ? null : picker));
  }, []);

  // Only fetched once the sheet is open — a picker nobody has opened should not
  // cost a round trip on every calendar render.
  const { customers, createOrFindCustomer } = useCustomers();
  const { settings } = useCalendarSettings();
  const { data: projects = [] } = useLinkableProjects(open);
  // Only while the sheet is up, and only for a NEW booking — an edit already
  // has its title and length, and suggesting others would just be noise.
  const { data: history = [] } = useBookingHistory(open && !event);
  /*
   * Everything already booked across the WHOLE span, all-day included.
   *
   * Was `(startDate, open && !allDay)` — one day, and switched off entirely for
   * all-day events. That meant "Book out 2 weeks" could bury a fortnight of
   * existing jobs without a word, which is the most damaging thing this sheet
   * could possibly do quietly.
   */
  const { data: rangeEvents = [] } = useDayClashes(
    open ? startDate : null,
    open ? endDate : null,
    open
  );

  useEffect(() => {
    // A job already spread across days opens showing those days, so the picker
    // is an edit of what exists rather than a blank slate that would silently
    // collapse the job back to one block on save.
    const already = existingSplitDaysRef.current;
    setSplitDays(already && already.length > 1 ? already : []);
    setPickingDays(false);
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
      setCrew(event.crew ?? '');
    } else {
      const d = defaultDate ?? new Date();
      const hour = defaultHour ?? 9;
      const minute = defaultMinute ?? 0;
      // A "Book out 1 week" chip arrives as days; anything else is a slot.
      const blockDays = defaultDays && defaultDays > 0 ? defaultDays : null;
      setTitle('');
      setDescription('');
      setStartDate(d);
      setStartHour(hour);
      setStartMinute(minute);
      setEndDate(blockDays ? addWorkingDays(d, blockDays) : d);
      setEndHour(Math.min(hour + 1, 23));
      setEndMinute(minute);
      setAllDay(!!blockDays);
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
      setCrew('');
    }
    setCustomerSearch('');
    setOpenPicker(null);
    setAddingCustomer(false);
    setDraft(EMPTY_DRAFT);
    setCustomerError(null);
    setCreateProject(false);
    setCreateSiteVisit(false);
    // settings is read only to seed a NEW event; adding it to the deps would
    // reset a form the user is halfway through the moment settings reload.
    // (`existingSplitDays` is kept out of the deps the same way, via a ref —
    // see existingSplitDaysRef.)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, defaultDate, defaultHour, defaultMinute, defaultDays, open]);

  // Colour follows the type on a new event; an edited one keeps what it has.
  useEffect(() => {
    if (!event) setColour(EVENT_COLOURS[eventType]);
  }, [eventType, event]);

  /*
   * Picking a type is picking what this is, so it sets the sensible default for
   * what gets created alongside — tapping "Site Visit" and then having to find
   * a second switch further down to actually get a site visit is the app making
   * you say the same thing twice.
   *
   * Both stay switchable afterwards: a "Job" chip on a two-hour callout does not
   * always deserve a project.
   */
  useEffect(() => {
    if (event) return;
    setCreateProject(eventType === 'job');
    setCreateSiteVisit(eventType === 'site_visit');
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
   * What else is running over the same stretch of time.
   *
   * Never a block, and — since jobsAtOnce arrived — usually not even a warning.
   * Someone with three pairs of hands has three jobs running most Tuesdays, and
   * calling that a "clash" trained them to ignore the one message that matters:
   * the booking that takes them past what they can actually cover.
   */
  const overlapping = useMemo(() => {
    if (endsBeforeItStarts) return [];
    return rangeEvents.filter((e) => {
      if (event && e.id === event.id) return false;
      // Plain interval intersection, which is correct for a half-hour callout
      // and a three-week rewire alike. All-day rows are no longer skipped: a
      // day already blocked out is the most important thing to be told about
      // when you are about to block it out again.
      return new Date(e.start_at) < endAt && new Date(e.end_at) > startAt;
    });
  }, [rangeEvents, startAt, endAt, endsBeforeItStarts, event]);

  /** A booking spanning more than one day is judged on the span, not the hour. */
  const spansDays = allDay || startDate.toDateString() !== endDate.toDateString();

  const capacity = settings.jobsAtOnce;
  /** True once this booking would be the one too many. */
  const overCapacity = overlapping.length + 1 > capacity;

  /** How long it runs, said in words, so a mis-set end date is obvious. */
  const durationLabel = useMemo(() => {
    if (endsBeforeItStarts) return null;
    if (allDay) {
      const days =
        Math.round(
          (new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime() -
            new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime()) /
            86_400_000
        ) + 1;
      return days === 1 ? 'All day' : `${days} days`;
    }
    return humanMinutes((endAt.getTime() - startAt.getTime()) / 60_000);
  }, [allDay, startDate, endDate, startAt, endAt, endsBeforeItStarts]);

  /**
   * Keep the schedule rows honest about a split job.
   *
   * The clash list, the capacity warning and `spansDays` all read
   * `startDate`/`endDate`, so a split job pins them to its first and last day.
   * Without this they would describe whatever solid block was set before the
   * days were picked, and the over-capacity warning — the one thing in this
   * sheet that stops a double-booking — would be answering the wrong question.
   */
  useEffect(() => {
    if (splitDays.length === 0) return;
    const sorted = [...splitDays].sort((a, b) => a.getTime() - b.getTime());
    setAllDay(true);
    setStartDate(sorted[0]);
    setEndDate(sorted[sorted.length - 1]);
  }, [splitDays]);

  /** Said in words, because "5 days" and "Mon/Wed/Fri" are different promises. */
  const splitSummary = useMemo(() => {
    if (splitDays.length === 0) return null;
    const sorted = [...splitDays].sort((a, b) => a.getTime() - b.getTime());
    const shown = sorted.slice(0, 4).map((d) => format(d, 'EEE d MMM'));
    const rest = sorted.length - shown.length;
    return `One job across ${sorted.length} days — ${shown.join(', ')}${
      rest > 0 ? ` and ${rest} more` : ''
    }. The customer gets one message.`;
  }, [splitDays]);

  /** Which chip, if any, describes the length currently set. */
  const activeDuration = useMemo(() => {
    if (endsBeforeItStarts) return null;
    if (allDay) {
      const days =
        Math.round(
          (new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime() -
            new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime()) /
            86_400_000
        ) + 1;
      // Matched on the working days a chip WOULD produce, so "1 week" stays lit
      // across a Saturday and a Sunday it deliberately skipped.
      return (
        DURATIONS.find(
          (d) =>
            d.days &&
            addWorkingDays(startDate, d.days).toDateString() === endDate.toDateString()
        )?.label ??
        (days === 1 ? 'All day' : null)
      );
    }
    const minutes = Math.round((endAt.getTime() - startAt.getTime()) / 60_000);
    return DURATIONS.find((d) => d.minutes === minutes)?.label ?? null;
  }, [allDay, startDate, endDate, startAt, endAt, endsBeforeItStarts]);

  /**
   * Set the length without touching the start.
   *
   * Measured from the start DATE AND CLOCK rather than from `startAt`, which
   * collapses to midnight whenever `allDay` is on. Going "All day" and then
   * changing your mind to "1h" therefore produced an event from 00:00 to 01:00
   * instead of an hour at the time you had picked.
   */
  const applyDuration = useCallback(
    (option: (typeof DURATIONS)[number]) => {
      if (option.days) {
        setAllDay(true);
        setEndDate(addWorkingDays(startDate, option.days));
        return;
      }
      const from = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startHour,
        startMinute,
        0
      );
      const end = new Date(from.getTime() + (option.minutes ?? 60) * 60_000);
      setAllDay(false);
      setEndDate(end);
      setEndHour(end.getHours());
      setEndMinute(end.getMinutes());
    },
    [startDate, startHour, startMinute]
  );

  /**
   * One tap for a job you book all the time.
   *
   * Sets the title, the type it is usually filed under, and how long it usually
   * takes — the three things that were being retyped every time for work that
   * has not changed since the last forty.
   */
  /*
   * What the title chips show: the user's own learned habits first, topped up
   * with trade-standard starters for the selected type. A new account taps
   * "Consumer unit change" instead of facing a blank box; a veteran's own
   * regulars take the front slots.
   */
  const quickTitles = useMemo(() => {
    const seen = new Set(history.map((h) => h.title.toLowerCase()));
    const starters = (STARTER_TITLES[eventType] || [])
      .filter((st) => !seen.has(st.title.toLowerCase()))
      .map((st) => ({ title: st.title, minutes: st.minutes, eventType: null as CalendarEventType | null }));
    return [...history, ...starters].slice(0, 8);
  }, [history, eventType]);

  const applySuggestion = useCallback(
    (suggestion: { title: string; minutes: number | null; eventType: CalendarEventType | null }) => {
      setTitle(suggestion.title);
      if (suggestion.eventType) setEventType(suggestion.eventType);
      if (suggestion.minutes === null) {
        setAllDay(true);
        // Collapse the span too. Picking "2 weeks" and then a job that is
        // usually a single all-day would otherwise keep the fortnight.
        setEndDate(startDate);
        return;
      }
      const from = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startHour,
        startMinute,
        0
      );
      const end = new Date(from.getTime() + suggestion.minutes * 60_000);
      setAllDay(false);
      setEndDate(end);
      setEndHour(end.getHours());
      setEndMinute(end.getMinutes());
    },
    [startDate, startHour, startMinute]
  );

  /*
   * Times that would actually work, offered rather than hunted for.
   *
   * Only for a new booking that has NOT come from a picked slot — arriving from
   * the day sheet means the time is already the answer, and re-offering others
   * would undermine the choice just made.
   */
  const wantsSuggestions = open && !event && defaultHour == null && !allDay;
  const suggestionMinutes = Math.max(
    30,
    Math.round((endAt.getTime() - startAt.getTime()) / 60_000) || 60
  );
  const { suggestions } = useSlotSuggestions(suggestionMinutes, wantsSuggestions);

  /** Move the booking to a suggested time, keeping everything else. */
  const applySlot = useCallback((slot: { start: Date; end: Date }) => {
    setAllDay(false);
    setStartDate(slot.start);
    setStartHour(slot.start.getHours());
    setStartMinute(slot.start.getMinutes());
    setEndDate(slot.end);
    setEndHour(slot.end.getHours());
    setEndMinute(slot.end.getMinutes());
  }, []);

  const handleSubmit = () => {
    if (endsBeforeItStarts) return;
    const chosen = customers.find((c) => c.id === clientId);
    /*
     * The title writes itself when a customer is picked — "EICR — Mrs Smith"
     * beats forcing a phone keyboard open for the one field that can be
     * derived. Free typing still wins when they do type.
     */
    const finalTitle =
      title.trim() || (chosen ? `${EVENT_TYPE_LABELS[eventType]} — ${chosen.name}` : '');
    if (!finalTitle) return;
    onSave(
      {
        title: finalTitle,
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
        crew: crew.trim() || undefined,
      },
      {
        createProject,
        createSiteVisit,
        customer: chosen
          ? { id: chosen.id, name: chosen.name, phone: chosen.phone, email: chosen.email }
          : undefined,
        // Sorted here so the page can treat the first entry as the anchor
        // without re-deriving what "first" means.
        splitDays: isSplit
          ? [...splitDays].sort((a, b) => a.getTime() - b.getTime())
          : undefined,
      }
    );
  };

  /**
   * Put a customer on the books mid-booking.
   *
   * Someone on the phone right now is not going to wait while their electrician
   * leaves the diary, opens Customers, adds them, comes back and starts the
   * booking again — so before this, they were entered as a title and lost.
   * `createOrFindCustomer` attaches an existing record rather than refusing a
   * duplicate, which is the right answer when the person on the phone rang
   * once before.
   */
  const saveDraftCustomer = async () => {
    if (!draft.name.trim() || savingCustomer) return;
    setSavingCustomer(true);
    setCustomerError(null);
    try {
      const saved = await createOrFindCustomer(draft);
      setClientId(saved.id);
      if (!location.trim() && saved.address) setLocation(saved.address);
      setAddingCustomer(false);
      setDraft(EMPTY_DRAFT);
      setOpenPicker(null);
    } catch (err) {
      setCustomerError(err instanceof Error ? err.message : 'Could not save the customer.');
    } finally {
      setSavingCustomer(false);
    }
  };

  /** Everything that will happen besides the booking itself. */
  const sideEffects = useMemo(() => {
    const out: string[] = [];
    if (createProject) out.push('starts a job');
    if (createSiteVisit) out.push('starts a site visit');
    if (selectedCustomer) out.push(`offers to let ${selectedCustomer.name.split(/\s+/)[0]} know`);
    return out;
  }, [createProject, createSiteVisit, selectedCustomer]);

  const rowButtonCn =
    'flex h-12 w-full items-center gap-3 px-4 text-left touch-manipulation active:bg-white/[0.04]';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          <div className="h-1 shrink-0 transition-colors" style={{ backgroundColor: colour }} />

          <SheetHeader className="shrink-0 px-4 py-3">
            {/* Contained on desktop — a phone-first sheet stretched edge to
                edge across a big screen reads as broken, not as spacious. */}
            <div className="mx-auto w-full max-w-3xl 2xl:max-w-4xl">
              <SheetTitle className="text-left text-[17px] font-semibold tracking-tight text-white">
                {isEditing ? 'Edit event' : 'New event'}
              </SheetTitle>
              <SheetDescription className="sr-only">
                {isEditing ? 'Edit event details' : 'Create a new calendar event'}
              </SheetDescription>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="mx-auto w-full max-w-3xl space-y-5 2xl:max-w-4xl">
            {/* WHO, first.
                
                The form used to open on "What is it?". That is not how the call
                goes — the phone rings, you know who it is, and only then what
                they want. Asking in the wrong order meant picking the customer
                was a scroll away from where you started, so it was skipped, and
                `client_id` went unset on bookings that plainly had a customer.
                
                It also earns its place at the top: choosing someone fills the
                location from their address. */}
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

                {openPicker === 'customer' && addingCustomer && (
                  <div className="space-y-3 border-t border-white/[0.10] px-4 py-3">
                    <div>
                      <label className={labelCn} htmlFor="new-customer-name">
                        Name
                      </label>
                      <input
                        id="new-customer-name"
                        value={draft.name}
                        onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                        placeholder="Who is it for?"
                        autoFocus
                        className={fieldCn}
                      />
                    </div>
                    <div>
                      <label className={labelCn} htmlFor="new-customer-phone">
                        Phone
                      </label>
                      <input
                        id="new-customer-phone"
                        value={draft.phone}
                        onChange={(e) => setDraft((d) => ({ ...d, phone: e.target.value }))}
                        placeholder="07700 900123"
                        inputMode="tel"
                        autoComplete="tel"
                        className={fieldCn}
                      />
                    </div>
                    <div>
                      <label className={labelCn} htmlFor="new-customer-email">
                        Email
                      </label>
                      <input
                        id="new-customer-email"
                        value={draft.email}
                        onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                        placeholder="Optional"
                        inputMode="email"
                        autoComplete="email"
                        className={fieldCn}
                      />
                    </div>
                    <div>
                      <label className={labelCn} htmlFor="new-customer-address">
                        Address
                      </label>
                      <input
                        id="new-customer-address"
                        value={draft.address}
                        onChange={(e) => setDraft((d) => ({ ...d, address: e.target.value }))}
                        placeholder="Optional — fills the location too"
                        className={fieldCn}
                      />
                    </div>

                    {customerError && (
                      <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[13px] text-orange-300">
                        {customerError}
                      </p>
                    )}

                    {/* A number, an email or neither — the phone is what a
                        confirmation actually goes out on, so it is asked for
                        first, but a doorstep booking with no details is still a
                        booking and must not be refused. */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={saveDraftCustomer}
                        disabled={!draft.name.trim() || savingCustomer}
                        className="flex h-11 flex-1 items-center justify-center rounded-xl bg-elec-yellow text-[14px] font-semibold text-black touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white/70"
                      >
                        {savingCustomer && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add customer
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAddingCustomer(false);
                          setCustomerError(null);
                        }}
                        className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-medium text-white touch-manipulation active:scale-[0.98]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {openPicker === 'customer' && !addingCustomer && (
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

                    {/* New customer sits ABOVE the list, not under it. Someone
                        booking in a stranger has just searched, found nothing,
                        and would otherwise scroll a list of everyone they have
                        ever worked for to find the way out of it. */}
                    <button
                      type="button"
                      onClick={() => {
                        setDraft({ ...EMPTY_DRAFT, name: customerSearch.trim() });
                        setAddingCustomer(true);
                      }}
                      className="flex h-12 w-full items-center gap-2 border-t border-white/[0.10] px-4 text-left text-[14px] font-semibold text-elec-yellow touch-manipulation active:bg-white/[0.06]"
                    >
                      <UserPlus className="h-4 w-4 shrink-0" />
                      {customerSearch.trim()
                        ? `New customer “${customerSearch.trim()}”`
                        : 'New customer'}
                    </button>

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

            {/* WHERE, straight after WHO.
                
                Choosing a customer fills this from their address — and while it
                sat five hundred lines further down, it filled silently where
                nobody could see it happen. Next to the customer, picking someone
                visibly answers two questions at once. */}
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

            {/* Title */}
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

            <div>
              <label className={labelCn} htmlFor="event-title">
                Event title
              </label>
              <input
                id="event-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  selectedCustomer
                    ? `${EVENT_TYPE_LABELS[eventType]} — ${selectedCustomer.name}`
                    : 'What is it?'
                }
                className={fieldCn}
              />

              {/* The work you actually book, learned from your own diary. One
                  tap sets the title, its usual type and its usual length —
                  three things that were being retyped for jobs that have not
                  changed in a year. Renders nothing until there is a habit to
                  spot, so a new account never sees an empty row. */}
              {quickTitles.length > 0 && (
                <div className="scrollbar-hide -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1">
                  {quickTitles.map((h) => (
                    <button
                      key={h.title}
                      type="button"
                      onClick={() => applySuggestion(h)}
                      className={cn(
                        chipBase,
                        title.trim().toLowerCase() === h.title.toLowerCase() ? chipOn : chipOff
                      )}
                    >
                      {h.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* When they could actually come.
                
                The question every booking starts with, previously answered by
                opening days one at a time until a big enough gap turned up.
                These are real gaps that fit this job, honouring how many jobs
                can run at once and skipping anything already gone. */}
            {suggestions.length > 0 && (
              <div>
                <span className={cn(eyebrowCn, 'mb-2 block')}>Next times that fit</span>
                <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
                  {suggestions.map((slot) => {
                    const chosen = slot.start.getTime() === startAt.getTime();
                    return (
                      <button
                        key={slot.start.toISOString()}
                        type="button"
                        onClick={() => applySlot(slot)}
                        className={cn(
                          chipBase,
                          // chipBase has no display class — without `flex` the
                          // date and time render inline as "Tomorrow08:00".
                          'flex flex-col items-start justify-center gap-0 px-3 py-1 leading-tight',
                          chosen ? chipOn : chipOff
                        )}
                      >
                        <span className="text-[11px] font-semibold">
                          {isToday(slot.start)
                            ? 'Today'
                            : isTomorrow(slot.start)
                              ? 'Tomorrow'
                              : format(slot.start, 'EEE d MMM')}
                        </span>
                        <span className="text-[13px] font-bold tabular-nums">
                          {format(slot.start, 'HH:mm')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* How long. Sits above the schedule card because it is how the
                length actually gets set nine times out of ten — the date and
                time rows are for the tenth. */}
            <div>
              <div className="mb-2 flex items-baseline gap-2">
                <span className={cn(eyebrowCn, 'block')}>How long</span>
                {durationLabel && (
                  <span className="text-[12px] font-semibold tabular-nums text-elec-yellow">
                    {durationLabel}
                  </span>
                )}
              </div>
              <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
                {DURATIONS.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => applyDuration(option)}
                    // Lit when it matches what is actually set, so the row reads
                    // as the current length rather than nine identical buttons.
                    className={cn(
                      chipBase,
                      !isSplit && activeDuration === option.label ? chipOn : chipOff
                    )}
                  >
                    {option.label}
                  </button>
                ))}
                {/* ELE-1649 — the power option, last so the simple path reads
                    first. A spark is rarely on one job till it's done. */}
                <button
                  type="button"
                  onClick={() => setPickingDays((p) => !p)}
                  className={cn(chipBase, isSplit || pickingDays ? chipOn : chipOff, 'shrink-0')}
                >
                  Pick days
                </button>
              </div>

              {(pickingDays || isSplit) && (
                <div className="mt-3">
                  <SplitDaysPicker value={splitDays} onChange={setSplitDays} />
                  <p className="mt-2 text-[12px] text-white opacity-70">
                    {isSplit
                      ? splitSummary
                      : 'Tap the days you’re on site — they don’t have to run together.'}
                  </p>
                </div>
              )}
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

            {/* Running alongside. Orange only when this booking is the one too
                many — everything below capacity is stated in white, because it
                is a normal Tuesday and not a problem to be solved. */}
            {overlapping.length > 0 && (
              <div
                className={cn(
                  'rounded-xl border px-3 py-2.5',
                  overCapacity || spansDays
                    ? 'border-orange-500/30 bg-orange-500/10'
                    : 'border-white/[0.12] bg-white/[0.04]'
                )}
              >
                <p
                  className={cn(
                    'text-[13px] font-semibold',
                    overCapacity || spansDays ? 'text-orange-300' : 'text-white'
                  )}
                >
                  {/* A span and a slot are different warnings. "That is 7 jobs
                      at once" is nonsense about a fortnight — those jobs are
                      spread across it, and what matters is that blocking the
                      fortnight out buries them. */}
                  {spansDays
                    ? `${overlapping.length === 1 ? 'One job is' : `${overlapping.length} jobs are`} already booked in that stretch.`
                    : overCapacity
                      ? `That is ${overlapping.length + 1} jobs at once — you have said you can run ${capacity}.`
                      : `Runs alongside ${overlapping.length === 1 ? 'one other job' : `${overlapping.length} other jobs`}${
                          capacity - overlapping.length - 1 === 0
                            ? ' — that fills the day.'
                            : ` — room for ${capacity - overlapping.length - 1} more after this.`
                        }`}
                </p>
                <ul className="mt-1 space-y-0.5">
                  {overlapping.slice(0, spansDays ? 5 : 3).map((c) => (
                    <li
                      key={c.id}
                      className={cn(
                        'text-[12px] tabular-nums',
                        overCapacity || spansDays ? 'text-orange-300' : 'text-white'
                      )}
                    >
                      {/* Over a span, the DAY is what identifies a job; within
                          one day it is the time. */}
                      {spansDays
                        ? format(new Date(c.start_at), 'EEE d MMM')
                        : `${format(new Date(c.start_at), 'HH:mm')}–${format(new Date(c.end_at), 'HH:mm')}`}{' '}
                      · {c.title}
                      {c.crew ? ` · ${c.crew}` : ''}
                    </li>
                  ))}
                  {overlapping.length > (spansDays ? 5 : 3) && (
                    <li className="text-[12px] text-white">
                      and {overlapping.length - (spansDays ? 5 : 3)} more
                    </li>
                  )}
                </ul>
              </div>
            )}

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

            {/* Who is on it. Free text on purpose — the Electrician Hub has no
                people model, and inventing one to hold two names would be a
                second staff list for anyone who also uses the Employer Hub. */}
            <div>
              <label className={labelCn} htmlFor="event-crew">
                Who&rsquo;s on it
              </label>
              <input
                id="event-crew"
                value={crew}
                onChange={(e) => setCrew(e.target.value)}
                placeholder="Names — yours, a mate's, whoever is going"
                className={fieldCn}
              />
            </div>

            {/* What the booking starts. Only on a new event: an edit would
                spawn a second project every time the time was nudged. */}
            {!isEditing && (
              <div>
                <span className={cn(eyebrowCn, 'mb-2 block')}>Also create</span>
                <div className="divide-y divide-white/[0.10] overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04]">
                  <label className="flex h-12 cursor-pointer items-center justify-between gap-3 px-4">
                    <span className="min-w-0">
                      <span className="block text-[14px] font-medium text-white">A job</span>
                      <span className="block truncate text-[12px] text-white">
                        Opens in the Electrical Hub with this date on it
                      </span>
                    </span>
                    <Switch checked={createProject} onCheckedChange={setCreateProject} />
                  </label>
                  <label className="flex h-12 cursor-pointer items-center justify-between gap-3 px-4">
                    <span className="min-w-0">
                      <span className="block text-[14px] font-medium text-white">A site visit</span>
                      <span className="block truncate text-[12px] text-white">
                        Ready to fill in when you get there
                      </span>
                    </span>
                    <Switch checked={createSiteVisit} onCheckedChange={setCreateSiteVisit} />
                  </label>
                </div>
              </div>
            )}

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
          </div>

          {/* Footer */}
          <div
            className="shrink-0 border-t border-white/[0.10] px-4 pt-3"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <div className="mx-auto w-full max-w-3xl 2xl:max-w-4xl">
              {/* What pressing the button will actually do.

                  It said "Create event" while also starting a job, opening a site
                  visit and putting a confirmation in front of you. Side effects
                  you did not ask about are how an app loses trust; side effects
                  you switched on yourself and were reminded of are just useful. */}
              {!isEditing && sideEffects.length > 0 && (
                <p className="mb-2 text-[12px] leading-snug text-white">
                  Also: {sideEffects.join(' · ')}
                </p>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={(!title.trim() && !selectedCustomer) || endsBeforeItStarts || saving}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white/70"
              >
                {saving && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isEditing ? 'Save changes' : selectedCustomer ? 'Book it in' : 'Create event'}
              </button>
            </div>
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
