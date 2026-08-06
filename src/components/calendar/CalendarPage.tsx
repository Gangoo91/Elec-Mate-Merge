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
import CalendarEventSheet from './CalendarEventSheet';
import CalendarEventDetail from './CalendarEventDetail';
import CalendarSettingsSheet from './CalendarSettingsSheet';
import CalendarAgendaStrip from './CalendarAgendaStrip';
import CalendarSummaryStrip from './CalendarSummaryStrip';
import { containerVariants, itemVariants } from './calendarStyles';
import {
  useCalendarEvents,
  useCalendarRealtimeInvalidation,
  useCreateCalendarEvent,
  useUpdateCalendarEvent,
  useDeleteCalendarEvent,
} from '@/hooks/useCalendarEvents';
import { useCalendarPulse } from '@/hooks/useCalendarPulse';
import { useGoogleCalendarSync } from '@/hooks/useGoogleCalendarSync';
import { toast } from '@/hooks/use-toast';
import { useHaptic } from '@/hooks/useHaptic';
import { useCalendarSettings } from '@/hooks/useCalendarSettings';
import { useTasksForCalendar } from '@/hooks/useTasksForCalendar';
import { useProjectsForCalendar } from '@/hooks/useProjectsForCalendar';
import { useSiteVisitsForCalendar } from '@/hooks/useSiteVisitsForCalendar';
import type {
  CalendarEvent,
  CalendarView,
  CreateCalendarEventInput,
  UpdateCalendarEventInput,
} from '@/types/calendar';

const CalendarPageContent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { settings, setDefaultView, setWorkingHours, setDefaultReminder } = useCalendarSettings();
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

  const { data: events = [] } = useCalendarEvents(dateFrom, dateTo);
  const { data: taskEvents = [] } = useTasksForCalendar(dateFrom, dateTo);
  const { data: projectEvents = [] } = useProjectsForCalendar(dateFrom, dateTo);
  const { data: siteVisitEvents = [] } = useSiteVisitsForCalendar(dateFrom, dateTo);
  const allEvents = useMemo(
    () => [...events, ...taskEvents, ...projectEvents, ...siteVisitEvents],
    [events, taskEvents, projectEvents, siteVisitEvents]
  );

  const pulse = useCalendarPulse();

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

  // Date selection — tapping a day in month view does NOT jump to Day view.
  // The agenda underneath the grid retargets instead, so a glance at another
  // day costs one tap and no loss of place.
  const handleDateSelect = useCallback(
    (date: Date) => {
      haptic.selection();
      setSelectedDate(date);
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

  // Event tap — synthetic events navigate to the record they stand for.
  const handleEventTap = useCallback(
    (event: CalendarEvent) => {
      if (event.id.startsWith('task-')) {
        navigate('/electrician/tasks');
        return;
      }
      if (event.id.startsWith('project-')) {
        // event.job_id holds the project id (see useProjectsForCalendar).
        if (event.job_id) navigate(`/electrician/projects/${event.job_id}`);
        return;
      }
      if (event.id.startsWith('visit-')) {
        // event.job_id holds the visit id (see useSiteVisitsForCalendar).
        if (event.job_id) navigate(`/electrician/site-visit/${event.job_id}`);
        return;
      }
      setViewingEvent(event);
      setDetailSheetOpen(true);
    },
    [navigate]
  );

  // Time slot tap (week/day view)
  const handleTimeSlotTap = useCallback((date: Date, hour: number) => {
    setNewEventDate(date);
    setNewEventHour(hour);
    setEditingEvent(null);
    setEventSheetOpen(true);
  }, []);

  const openNewEvent = useCallback(
    (date?: Date) => {
      haptic.light();
      setNewEventDate(date ?? selectedDate ?? currentDate);
      setNewEventHour(undefined);
      setEditingEvent(null);
      setEventSheetOpen(true);
    },
    [selectedDate, currentDate, haptic]
  );

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
    (data: CreateCalendarEventInput | UpdateCalendarEventInput) => {
      if (editingEvent) {
        updateMutation.mutate(
          { id: editingEvent.id, updates: data as UpdateCalendarEventInput },
          { onSuccess: () => setEventSheetOpen(false) }
        );
      } else {
        createMutation.mutate(data as CreateCalendarEventInput, {
          onSuccess: () => setEventSheetOpen(false),
        });
      }
    },
    [editingEvent, createMutation, updateMutation]
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
      <CalendarEventSheet
        open={eventSheetOpen}
        onOpenChange={setEventSheetOpen}
        event={editingEvent}
        defaultDate={newEventDate}
        defaultHour={newEventHour}
        onSave={handleSave}
        saving={createMutation.isPending || updateMutation.isPending}
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
