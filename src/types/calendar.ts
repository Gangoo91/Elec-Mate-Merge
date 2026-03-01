export type CalendarEventType =
  | 'job'
  | 'site_visit'
  | 'inspection'
  | 'meeting'
  | 'personal'
  | 'general';

export type SyncStatus = 'local_only' | 'synced' | 'pending_push' | 'pending_pull' | 'conflict';

export type CalendarView = 'day' | 'week' | 'month';

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  start_at: string;
  end_at: string;
  all_day: boolean;
  location?: string;
  client_id?: string;
  job_id?: string;
  event_type: CalendarEventType;
  colour: string;
  recurring: boolean;
  recurrence_rule?: string;
  parent_event_id?: string;
  google_event_id?: string;
  google_calendar_id?: string;
  google_etag?: string;
  sync_status: SyncStatus;
  last_synced_at?: string;
  notes?: string;
  reminder_minutes: number;
  created_at: string;
  updated_at: string;
  // Joined data
  customer?: { id: string; name: string };
  job?: { id: string; title: string };
}

export type CreateCalendarEventInput = Omit<
  CalendarEvent,
  | 'id'
  | 'user_id'
  | 'created_at'
  | 'updated_at'
  | 'customer'
  | 'job'
  | 'sync_status'
  | 'last_synced_at'
  | 'google_event_id'
  | 'google_calendar_id'
  | 'google_etag'
>;

export type UpdateCalendarEventInput = Partial<CreateCalendarEventInput>;

export interface GoogleCalendarStatus {
  connected: boolean;
  email?: string;
  lastSyncAt?: string;
  syncEnabled: boolean;
}

export const EVENT_COLOURS: Record<CalendarEventType, string> = {
  job: '#F59E0B',
  site_visit: '#10B981',
  inspection: '#8B5CF6',
  meeting: '#3B82F6',
  personal: '#EC4899',
  general: '#6B7280',
};

export const EVENT_TYPE_LABELS: Record<CalendarEventType, string> = {
  job: 'Job',
  site_visit: 'Site Visit',
  inspection: 'Inspection',
  meeting: 'Meeting',
  personal: 'Personal',
  general: 'General',
};
