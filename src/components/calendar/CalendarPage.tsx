import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays,
  subDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
} from 'date-fns';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import CalendarHeader from './CalendarHeader';
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import CalendarDayView from './CalendarDayView';
import CalendarDaySheet from './CalendarDaySheet';
import CalendarEventSheet, { type SaveExtras } from './CalendarEventSheet';
import TellCustomerSheet, { type TellCustomerTarget } from './TellCustomerSheet';
import CalendarEventDetail from './CalendarEventDetail';
import CalendarSettingsSheet from './CalendarSettingsSheet';
import CalendarAgendaStrip from './CalendarAgendaStrip';
import CalendarSummaryStrip from './CalendarSummaryStrip';
import StartDateRequestsCard from '@/components/electrician/booking/StartDateRequestsCard';
import { useStartDateRequests } from '@/hooks/useStartDateRequests';
import { containerVariants, itemVariants } from './calendarStyles';
import { eventRecordHref } from './diaryLinks';
import {
  useCalendarRealtimeInvalidation,
  useCreateCalendarEvent,
  useUpdateCalendarEvent,
  useDeleteCalendarEvent,
} from '@/hooks/useCalendarEvents';
import { useDiaryEvents } from '@/hooks/useDiaryEvents';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { spawnFromBooking } from '@/lib/bookingSpawn';
import { useCalendarPulse } from '@/hooks/useCalendarPulse';
import { useGoogleCalendarSync } from '@/hooks/useGoogleCalendarSync';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useQueryClient } from '@tanstack/react-query';
import { useCalendarSettings } from '@/hooks/useCalendarSettings';
import type {
  CalendarEvent,
  CalendarView,
  CreateCalendarEventInput,
  UpdateCalendarEventInput,
} from '@/types/calendar';

const CalendarPageContent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { settings, setDefaultView, setWorkingHours, setDefaultReminder, setJobsAtOnce } =
    useCalendarSettings();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>(settings.defaultView);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const haptic = useHaptic();

  /** Which way the last move went, so the incoming period slides in from the
   *  side it came from rather than appearing out of nowhere. */
  const [direction, setDirection] = useState(1);

  // Sheet states
  const [eventSheetOpen, setEventSheetOpen] = useState(false);
  const [detailSheetOpen, setDetailSheetOpen] = useState(false);
  const [settingsSheetOpen, setSettingsSheetOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [viewingEvent, setViewingEvent] = useState<CalendarEvent | null>(null);
  const [newEventDate, setNewEventDate] = useState<Date | undefined>(undefined);
  const [newEventHour, setNewEventHour] = useState<number | undefined>(undefined);
  const [newEventMinute, setNewEventMinute] = useState<number | undefined>(undefined);
  /** Working days to block out, when the event came from a "Book out" chip. */
  const [newEventDays, setNewEventDays] = useState<number | undefined>(undefined);
  const [daySheetOpen, setDaySheetOpen] = useState(false);
  const [daySheetDate, setDaySheetDate] = useState<Date>(() => new Date());

  /** The "now tell them" step, offered after a booking with a customer on it. */
  const [tellSheetOpen, setTellSheetOpen] = useState(false);
  const [tellTarget, setTellTarget] = useState<TellCustomerTarget | null>(null);
  const [tellBooking, setTellBooking] = useState<{
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
    location?: string | null;
    movedFrom?: { start: Date; end: Date; allDay: boolean } | null;
  } | null>(null);

  // Realtime — invalidate queries on INSERT/UPDATE/DELETE
  useCalendarRealtimeInvalidation();

  // Google sync
  const googleSync = useGoogleCalendarSync();
  const googleSyncRef = useRef(googleSync);
  googleSyncRef.current = googleSync;

  // Handle OAuth callback redirect
  useEffect(() => {
    const connected = searchParams.get('google_connected');
    const email = searchParams.get('email');
    const error = searchParams.get('google_error');

    if (connected === 'true') {
      toast({
        title: `Google Calendar connected${email ? ` (${email})` : ''}`,
        variant: 'success',
      });
      searchParams.delete('google_connected');
      searchParams.delete('email');
      setSearchParams(searchParams, { replace: true });
      // `refreshStatus`, not `refetch` — the hook has never exposed a `refetch`,
      // so the optional call after a successful OAuth return did nothing and the
      // header kept showing "not connected" until the page was reloaded.
      googleSyncRef.current.refreshStatus();
    } else if (error) {
      toast({ title: `Calendar connection failed: ${error}`, variant: 'destructive' });
      searchParams.delete('google_error');
      setSearchParams(searchParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Compute query date range based on view
  const { dateFrom, dateTo } = useMemo(() => {
    switch (view) {
      case 'month': {
        const gridStart = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
        const gridEnd = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
        return { dateFrom: gridStart.toISOString(), dateTo: gridEnd.toISOString() };
      }
      case 'week': {
        const ws = startOfWeek(currentDate, { weekStartsOn: 1 });
        const we = endOfWeek(currentDate, { weekStartsOn: 1 });
        return { dateFrom: ws.toISOString(), dateTo: we.toISOString() };
      }
      case 'day': {
        const ds = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        const de = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          23,
          59,
          59
        );
        return { dateFrom: ds.toISOString(), dateTo: de.toISOString() };
      }
    }
  }, [view, currentDate]);

  // Real events plus the three synthetic sources — tasks, project dates and
  // booked site visits. Composed in one hook so the diary panels on the hub and
  // the dashboard cannot answer "what is on today" differently from this page.
  const { events: allEvents } = useDiaryEvents(dateFrom, dateTo);

  const pulse = useCalendarPulse();
  const { data: startRequests = [], isLoading: requestsLoading } = useStartDateRequests();

  const queryClient = useQueryClient();
  const { companyProfile } = useCompanyProfile();
  const createMutation = useCreateCalendarEvent();
  const updateMutation = useUpdateCalendarEvent();
  const deleteMutation = useDeleteCalendarEvent();

  // Navigation
  const goNext = useCallback(() => {
    haptic.selection();
    setDirection(1);
    setCurrentDate((d) => {
      switch (view) {
        case 'month':
          return addMonths(d, 1);
        case 'week':
          return addWeeks(d, 1);
        case 'day':
          return addDays(d, 1);
      }
    });
  }, [view, haptic]);

  const goPrevious = useCallback(() => {
    haptic.selection();
    setDirection(-1);
    setCurrentDate((d) => {
      switch (view) {
        case 'month':
          return subMonths(d, 1);
        case 'week':
          return subWeeks(d, 1);
        case 'day':
          return subDays(d, 1);
      }
    });
  }, [view, haptic]);

  const goToday = useCallback(() => {
    haptic.light();
    const now = new Date();
    setDirection(now >= currentDate ? 1 : -1);
    setCurrentDate(now);
    setSelectedDate(now);
  }, [currentDate, haptic]);

  /*
   * Tapping a day opens it.
   *
   * It used to only retarget the agenda strip below the grid, which answered
   * "what is on Thursday" and never the question actually being asked — "can I
   * do half four on Thursday". The day sheet answers that and leaves the month
   * behind it, so you keep your place; switching the whole calendar to Day view
   * (which is what the agenda heading still does) loses it.
   */
  const handleDateSelect = useCallback(
    (date: Date) => {
      haptic.selection();
      setSelectedDate(date);
      setDaySheetDate(date);
      setDaySheetOpen(true);
    },
    [haptic]
  );

  /**
   * Stepping the day sheet a day at a time.
   *
   * `currentDate` moves with it on purpose: the sheet draws from the events the
   * page has already loaded for the visible range, so walking off the end of
   * the month has to bring the range along or the sheet would show an empty day
   * that is not empty.
   */
  const handleDaySheetDateChange = useCallback(
    (date: Date) => {
      haptic.selection();
      setDaySheetDate(date);
      setSelectedDate(date);
      setCurrentDate(date);
    },
    [haptic]
  );

  /** A slot picked in the day sheet — straight into the event form, pre-filled. */
  const handlePickSlot = useCallback(
    (start: Date) => {
      haptic.light();
      setDaySheetOpen(false);
      setNewEventDate(start);
      setNewEventHour(start.getHours());
      setNewEventMinute(start.getMinutes());
      setNewEventDays(undefined);
      setEditingEvent(null);
      setEventSheetOpen(true);
    },
    [haptic]
  );

  /**
   * Booking a run of days out.
   *
   * Opens the same form as a slot does, all-day and pre-stretched, rather than
   * writing the event straight off — a fortnight blocked out with no title and
   * nobody attached is a fortnight you cannot identify a week later.
   */
  const handleBookOut = useCallback(
    (start: Date, days: number) => {
      haptic.light();
      setDaySheetOpen(false);
      setNewEventDate(start);
      setNewEventHour(undefined);
      setNewEventMinute(undefined);
      setNewEventDays(days);
      setEditingEvent(null);
      setEventSheetOpen(true);
    },
    [haptic]
  );

  const handleViewChange = useCallback(
    (v: CalendarView) => {
      haptic.selection();
      setView(v);
      setDefaultView(v);
    },
    [setDefaultView, haptic]
  );

  /** Jump the whole calendar to a date in Day view — used by the summary strip. */
  const handleGoToDay = useCallback(
    (date: Date) => {
      haptic.light();
      setDirection(date >= currentDate ? 1 : -1);
      setCurrentDate(date);
      setSelectedDate(date);
      setView('day');
    },
    [currentDate, haptic]
  );

  const handleGoToWeek = useCallback(() => {
    haptic.light();
    setCurrentDate(new Date());
    setView('week');
  }, [haptic]);

  const handleOpenSelectedAsDay = useCallback(() => {
    setCurrentDate(selectedDate ?? new Date());
    setView('day');
  }, [selectedDate]);

  // Event tap — synthetic events navigate to the record they stand for. The
  // mapping lives in diaryLinks so the hub panels resolve a tap identically.
  const handleEventTap = useCallback(
    (event: CalendarEvent) => {
      const record = eventRecordHref(event);
      if (record) {
        navigate(record);
        return;
      }
      setViewingEvent(event);
      setDetailSheetOpen(true);
    },
    [navigate]
  );

  /**
   * The same tap, made from inside the day sheet.
   *
   * The day sheet has to close first. Two Radix sheets open at once means two
   * overlays and two focus traps competing, which on a phone is how you end up
   * with a screen that scrolls but will not accept a tap. Editing from the
   * detail sheet then returns you to the month with the day still selected,
   * which is where you would want to be anyway.
   */
  const handleDaySheetEventTap = useCallback(
    (event: CalendarEvent) => {
      setDaySheetOpen(false);
      handleEventTap(event);
    },
    [handleEventTap]
  );

  // Time slot tap (week/day view)
  const handleTimeSlotTap = useCallback((date: Date, hour: number) => {
    setNewEventDate(date);
    setNewEventHour(hour);
    setNewEventMinute(0);
    setNewEventDays(undefined);
    setEditingEvent(null);
    setEventSheetOpen(true);
  }, []);

  const openNewEvent = useCallback(
    (date?: Date) => {
      haptic.light();
      setNewEventDate(date ?? selectedDate ?? currentDate);
      setNewEventHour(undefined);
      setNewEventMinute(undefined);
      setNewEventDays(undefined);
      setEditingEvent(null);
      setEventSheetOpen(true);
    },
    [selectedDate, currentDate, haptic]
  );

  /*
   * Arriving from the diary panel.
   *
   * The Business Hub and the dashboard now link straight at a day — and, from
   * the "Book" affordances, straight at a new event on that day. Carried in the
   * query string rather than router state so the link survives a refresh, a
   * push notification and being opened in a new tab, the same reasoning as
   * `bookingProjectUrl`.
   *
   * Runs once. The params are stripped afterwards so a back-navigation to the
   * calendar does not re-open the sheet.
   */
  useEffect(() => {
    const dateStr = searchParams.get('date');
    const wantsNew = searchParams.get('new') === '1';
    const wantsDay = searchParams.get('open') === 'day';
    const hourStr = searchParams.get('hour');
    if (!dateStr && !wantsNew) return;

    // Parsed as local midnight — `new Date('2026-08-27')` is parsed as UTC and
    // lands on the previous evening anywhere west of Greenwich.
    let target = new Date();
    if (dateStr && /^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [y, m, d] = dateStr.split('-').map(Number);
      target = new Date(y, m - 1, d);
      setCurrentDate(target);
      setSelectedDate(target);
    }
    // `open=day` opens the day SHEET over the month, not Day view. The whole
    // point of arriving from the hub is to look at one day and get back out.
    if (wantsDay) {
      setDaySheetDate(target);
      setDaySheetOpen(true);
    }
    if (wantsNew) {
      const hour = hourStr != null ? Number(hourStr) : NaN;
      setNewEventDate(target);
      setNewEventHour(Number.isInteger(hour) && hour >= 0 && hour <= 23 ? hour : undefined);
      setNewEventMinute(undefined);
      setNewEventDays(undefined);
      setEditingEvent(null);
      setEventSheetOpen(true);
    }

    ['date', 'new', 'open', 'hour'].forEach((k) => searchParams.delete(k));
    setSearchParams(searchParams, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = useCallback((event: CalendarEvent) => {
    setDetailSheetOpen(false);
    setEditingEvent(event);
    setEventSheetOpen(true);
  }, []);

  const handleDelete = useCallback(
    (eventId: string) => {
      deleteMutation.mutate(eventId);
      setDetailSheetOpen(false);
    },
    [deleteMutation]
  );

  const handleSave = useCallback(
    (data: CreateCalendarEventInput | UpdateCalendarEventInput, extras: SaveExtras) => {
      if (editingEvent) {
        /*
         * Moving a booking is when the customer MOST needs telling.
         *
         * A job that quietly shifts from Tuesday to Thursday and never reaches
         * the customer means someone waits in for a van that is not coming —
         * far more expensive than a booking nobody confirmed. So the same "tell
         * them" step fires on an edit, but only when the time actually changed;
         * fixing a typo in a title should not fire off a reschedule text.
         */
        const before = editingEvent;
        updateMutation.mutate(
          { id: editingEvent.id, updates: data as UpdateCalendarEventInput },
          {
            onSuccess: (updated) => {
              setEventSheetOpen(false);
              const moved =
                new Date(before.start_at).getTime() !== new Date(updated.start_at).getTime() ||
                new Date(before.end_at).getTime() !== new Date(updated.end_at).getTime();
              if (!moved || !extras.customer) return;
              setTellTarget(extras.customer);
              setTellBooking({
                title: updated.title,
                start: new Date(updated.start_at),
                end: new Date(updated.end_at),
                allDay: updated.all_day,
                location: updated.location,
                movedFrom: {
                  start: new Date(before.start_at),
                  end: new Date(before.end_at),
                  allDay: before.all_day,
                },
              });
              setTellSheetOpen(true);
            },
          }
        );
        return;
      }

      createMutation.mutate(data as CreateCalendarEventInput, {
        onSuccess: async (created) => {
          setEventSheetOpen(false);

          /*
           * Spawns first, then the "tell them" prompt.
           *
           * Deliberately after the event is saved and the sheet is closed: the
           * booking is the thing that had to land, and a job or a site visit
           * failing to create must not take it down with it. Failures are said
           * out loud rather than swallowed — a switch that silently did nothing
           * is worse than no switch.
           */
          if (extras.createProject || extras.createSiteVisit) {
            const spawned = await spawnFromBooking(created, {
              createProject: extras.createProject,
              createSiteVisit: extras.createSiteVisit,
              customerName: extras.customer?.name,
              customerPhone: extras.customer?.phone,
              customerEmail: extras.customer?.email,
            });

            const made = [
              spawned.projectId ? 'job' : null,
              spawned.siteVisitId ? 'site visit' : null,
            ].filter(Boolean);

            if (made.length > 0) {
              toast({ title: `Booked in — ${made.join(' and ')} started too` });
              queryClient.invalidateQueries({ queryKey: ['spark-projects'] });
              queryClient.invalidateQueries({ queryKey: ['projects-for-calendar'] });
              queryClient.invalidateQueries({ queryKey: ['site-visits-for-calendar'] });
            }
            if (spawned.failures.length > 0) {
              toast({
                title: `Booking saved, but could not start the ${spawned.failures.join(' or ')}`,
                variant: 'destructive',
              });
            }
          }

          // Only worth offering when there is somebody to tell.
          if (extras.customer) {
            setTellTarget(extras.customer);
            setTellBooking({
              title: created.title,
              start: new Date(created.start_at),
              end: new Date(created.end_at),
              allDay: created.all_day,
              location: created.location,
            });
            setTellSheetOpen(true);
          }
        },
      });
    },
    [editingEvent, createMutation, updateMutation, queryClient]
  );

  // Agenda target — the selected day in month view, the shown day otherwise.
  const agendaDate = view === 'month' ? selectedDate ?? new Date() : currentDate;

  /** Remounts the view on every period change, which replays the slide-in. */
  const periodKey = `${view}-${format(currentDate, 'yyyy-MM-dd')}`;

  return (
    <div className="-mt-3 min-h-screen bg-background pb-24 sm:-mt-4 md:-mt-6">
      {/* A calendar earns its width: the month grid, the week columns and the
          agenda all get more readable the more of the screen they have, and
          `max-w-6xl` left a third of a desktop window empty beside the grid. */}
      <div className="mx-auto max-w-[1600px] lg:px-8">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onPrevious={goPrevious}
          onNext={goNext}
          onToday={goToday}
          onOpenSettings={() => setSettingsSheetOpen(true)}
          onViewChange={handleViewChange}
        />

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 px-4 py-4"
        >
          <motion.div variants={itemVariants}>
            <CalendarSummaryStrip
              pulse={pulse}
              onGoToDay={handleGoToDay}
              onGoToWeek={handleGoToWeek}
            />
          </motion.div>

          {/* ELE-1513 — clients asking to start on a given day. They are not
              events yet, by design: nothing is agreed until it is confirmed.
              But the diary is where you would think to answer, so the ask
              belongs here rather than only on the quote. Renders nothing when
              nobody is waiting. */}
          <motion.div variants={itemVariants}>
            <StartDateRequestsCard requests={startRequests} isLoading={requestsLoading} />
          </motion.div>

          {/* The grid is ALWAYS rendered. It used to be swapped out for an
              empty state whenever the range held no events, so an empty month
              lost its dates, its today marker and its navigation — the calendar
              disappeared exactly when there was nothing to distract from it.
              An empty day is now said in the agenda, where it belongs. */}
          <motion.div
            key={periodKey}
            initial={{ opacity: 0, x: direction * 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="space-y-4"
          >
            {view === 'month' && (
              <CalendarMonthView
                currentDate={currentDate}
                events={allEvents}
                onDateSelect={handleDateSelect}
                onSwipeLeft={goNext}
                onSwipeRight={goPrevious}
                selectedDate={selectedDate}
              />
            )}

            {view === 'week' && (
              <CalendarWeekView
                currentDate={currentDate}
                events={allEvents}
                workingHoursStart={settings.workingHoursStart}
                workingHoursEnd={settings.workingHoursEnd}
                onEventTap={handleEventTap}
                onTimeSlotTap={handleTimeSlotTap}
                onSwipeLeft={goNext}
                onSwipeRight={goPrevious}
              />
            )}

            {view === 'day' && (
              <CalendarDayView
                currentDate={currentDate}
                events={allEvents}
                workingHoursStart={settings.workingHoursStart}
                workingHoursEnd={settings.workingHoursEnd}
                onEventTap={handleEventTap}
                onTimeSlotTap={handleTimeSlotTap}
                onSwipeLeft={goNext}
                onSwipeRight={goPrevious}
              />
            )}

            {/* Day view is already a list of the day — a second one below it
                would only repeat itself. */}
            {view !== 'day' && (
              <CalendarAgendaStrip
                date={agendaDate}
                events={allEvents}
                onEventTap={handleEventTap}
                onAdd={() => openNewEvent(agendaDate)}
                onOpenDayView={handleOpenSelectedAsDay}
              />
            )}
          </motion.div>
        </motion.main>
      </div>

      {/* Sheets */}
      <CalendarDaySheet
        open={daySheetOpen}
        onOpenChange={setDaySheetOpen}
        date={daySheetDate}
        events={allEvents}
        workingHoursStart={settings.workingHoursStart}
        workingHoursEnd={settings.workingHoursEnd}
        capacity={settings.jobsAtOnce}
        onPickSlot={handlePickSlot}
        onBookOut={handleBookOut}
        onEventTap={handleDaySheetEventTap}
        onChangeDate={handleDaySheetDateChange}
      />

      <CalendarEventSheet
        open={eventSheetOpen}
        onOpenChange={setEventSheetOpen}
        event={editingEvent}
        defaultDate={newEventDate}
        defaultHour={newEventHour}
        defaultMinute={newEventMinute}
        defaultDays={newEventDays}
        onSave={handleSave}
        saving={createMutation.isPending || updateMutation.isPending}
      />

      <TellCustomerSheet
        open={tellSheetOpen}
        onOpenChange={setTellSheetOpen}
        customer={tellTarget}
        booking={tellBooking}
        businessName={companyProfile?.company_name}
      />

      <CalendarEventDetail
        open={detailSheetOpen}
        onOpenChange={setDetailSheetOpen}
        event={viewingEvent}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CalendarSettingsSheet
        open={settingsSheetOpen}
        onOpenChange={setSettingsSheetOpen}
        googleStatus={googleSync.status}
        syncLoading={googleSync.loading}
        syncing={googleSync.syncing}
        connecting={googleSync.connecting}
        onConnect={googleSync.connect}
        onDisconnect={googleSync.disconnect}
        onSyncNow={googleSync.syncNow}
        defaultView={view}
        onDefaultViewChange={handleViewChange}
        workingHoursStart={settings.workingHoursStart}
        workingHoursEnd={settings.workingHoursEnd}
        onWorkingHoursChange={setWorkingHours}
        defaultReminderMinutes={settings.defaultReminderMinutes}
        onDefaultReminderChange={setDefaultReminder}
        jobsAtOnce={settings.jobsAtOnce}
        onJobsAtOnceChange={setJobsAtOnce}
      />

      <button
        type="button"
        onClick={() => openNewEvent()}
        aria-label="New event"
        className="fixed bottom-[max(env(safe-area-inset-bottom),16px)] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-elec-yellow text-black shadow-xl shadow-elec-yellow/30 touch-manipulation active:scale-[0.96] sm:bottom-6"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default CalendarPageContent;
