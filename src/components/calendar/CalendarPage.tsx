import { useState, useCallback, useMemo, useEffect } from 'react';
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
} from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarViewSwitcher from './CalendarViewSwitcher';
import CalendarMonthView from './CalendarMonthView';
import CalendarWeekView from './CalendarWeekView';
import CalendarDayView from './CalendarDayView';
import CalendarEventSheet from './CalendarEventSheet';
import CalendarEventDetail from './CalendarEventDetail';
import CalendarSettingsSheet from './CalendarSettingsSheet';
import CalendarEmptyState from './CalendarEmptyState';
import CalendarAgendaStrip from './CalendarAgendaStrip';
import { Plus } from 'lucide-react';
import {
  useCalendarEvents,
  useCalendarRealtimeInvalidation,
  useCreateCalendarEvent,
  useUpdateCalendarEvent,
  useDeleteCalendarEvent,
} from '@/hooks/useCalendarEvents';
import { useGoogleCalendarSync } from '@/hooks/useGoogleCalendarSync';
import { toast } from '@/hooks/use-toast';
import { useCalendarSettings } from '@/hooks/useCalendarSettings';
import { useTasksForCalendar } from '@/hooks/useTasksForCalendar';
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
      googleSync.refetch?.();
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
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
        const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
        return { dateFrom: gridStart.toISOString(), dateTo: gridEnd.toISOString() };
      }
      case 'week': {
        const ws = startOfWeek(currentDate, { weekStartsOn: 1 });
        const we = endOfWeek(currentDate, { weekStartsOn: 1 });
        return { dateFrom: ws.toISOString(), dateTo: we.toISOString() };
      }
      case 'day': {
        const ds = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        );
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

  const { data: events = [], isLoading } = useCalendarEvents(dateFrom, dateTo);
  const { data: taskEvents = [] } = useTasksForCalendar(dateFrom, dateTo);
  const allEvents = useMemo(() => [...events, ...taskEvents], [events, taskEvents]);
  const createMutation = useCreateCalendarEvent();
  const updateMutation = useUpdateCalendarEvent();
  const deleteMutation = useDeleteCalendarEvent();

  // Navigation
  const goNext = useCallback(() => {
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
  }, [view]);

  const goPrevious = useCallback(() => {
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
  }, [view]);

  const goToday = useCallback(() => setCurrentDate(new Date()), []);

  // Date selection — tap a day in month view. We DON'T auto-switch to day
  // view; instead we just set selectedDate, and the agenda strip below the
  // grid updates to show that day's events. User can tap the strip heading
  // to open Day view if they want detail.
  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleOpenSelectedAsDay = useCallback(() => {
    setCurrentDate(selectedDate ?? new Date());
    setView('day');
  }, [selectedDate]);

  // Event tap — task events navigate to tasks page
  const handleEventTap = useCallback(
    (event: CalendarEvent) => {
      if (event.id.startsWith('task-')) {
        navigate('/electrician/tasks');
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

  // Create new event — inline button
  const handleCreateNew = useCallback(() => {
    setNewEventDate(selectedDate ?? currentDate);
    setNewEventHour(undefined);
    setEditingEvent(null);
    setEventSheetOpen(true);
  }, [selectedDate, currentDate]);

  // Edit from detail
  const handleEdit = useCallback((event: CalendarEvent) => {
    setDetailSheetOpen(false);
    setEditingEvent(event);
    setEventSheetOpen(true);
  }, []);

  // Delete
  const handleDelete = useCallback(
    (eventId: string) => {
      deleteMutation.mutate(eventId);
      setDetailSheetOpen(false);
    },
    [deleteMutation]
  );

  // Save (create or update)
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

  const handleViewChange = useCallback(
    (v: CalendarView) => {
      setView(v);
      setDefaultView(v);
    },
    [setDefaultView]
  );

  // Agenda strip date — selected day in month view, today otherwise.
  const agendaDate = view === 'month' ? selectedDate ?? new Date() : currentDate;

  return (
    <div className="space-y-3 pb-24">
      {/* Navigation & View Switcher */}
      <div className="space-y-2">
        <CalendarHeader
          currentDate={currentDate}
          view={view}
          onPrevious={goPrevious}
          onNext={goNext}
          onToday={goToday}
          onOpenSettings={() => setSettingsSheetOpen(true)}
          onCreateEvent={handleCreateNew}
        />
        <CalendarViewSwitcher view={view} onViewChange={handleViewChange} />
      </div>

      {/* View content */}
      <div className="min-h-[300px]">
        {!isLoading && allEvents.length === 0 ? (
          <CalendarEmptyState onCreateEvent={handleCreateNew} />
        ) : (
          <>
            {view === 'month' && (
              <>
                <CalendarMonthView
                  currentDate={currentDate}
                  events={allEvents}
                  onDateSelect={handleDateSelect}
                  onSwipeLeft={goNext}
                  onSwipeRight={goPrevious}
                  selectedDate={selectedDate}
                />
                {/* Agenda strip — events for selected day (or today) */}
                <div className="mt-4">
                  <CalendarAgendaStrip
                    date={agendaDate}
                    events={allEvents}
                    onEventTap={handleEventTap}
                    onAdd={() => {
                      setNewEventDate(agendaDate);
                      setNewEventHour(undefined);
                      setEditingEvent(null);
                      setEventSheetOpen(true);
                    }}
                    onOpenDayView={handleOpenSelectedAsDay}
                  />
                </div>
              </>
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
          </>
        )}
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

      {/* Floating add-event button — replaces the toolbar + that was eating
          the month label space on mobile. */}
      <button
        type="button"
        onClick={handleCreateNew}
        aria-label="New event"
        className="fixed right-4 bottom-[max(env(safe-area-inset-bottom),16px)] sm:bottom-6 z-40 h-14 w-14 rounded-full bg-elec-yellow text-black shadow-xl shadow-elec-yellow/30 flex items-center justify-center active:scale-[0.96] touch-manipulation"
      >
        <Plus className="h-6 w-6" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default CalendarPageContent;
