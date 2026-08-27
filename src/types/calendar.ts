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
  /** Employer Hub job (`employer_jobs`). Unused in practice — see project_id. */
  job_id?: string;
  /**
   * Electrician Hub project (`spark_projects`). The bridge that lets a diary
   * block be logged as billable time against a project (ELE-1472). Deliberately
   * separate from job_id, which points at a different hub's table.
   */
  project_id?: string;
  event_type: CalendarEventType;
  /**
   * Who is on it. Free text, deliberately.
   *
   * The Electrician Hub has no people model — every worker table belongs to the
   * Employer Hub, which is kept separate — so someone running three jobs at
   * once types the names. No vocabulary to maintain, nothing to keep in step.
   */
  crew?: string;
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
  /**
   * When the app last emailed this booking to the customer, and where to.
   *
   * Only email can be recorded: WhatsApp and SMS hand off to the phone and the
   * app never learns whether send was pressed. Null means "never emailed",
   * which is not the same as "the customer does not know" — it is simply all
   * that can honestly be claimed.
   */
  confirmation_sent_at?: string;
  confirmation_sent_to?: string;
  reminder_minutes: number;
  created_at: string;
  updated_at: string;
  // Joined data
  customer?: { id: string; name: string };
  job?: { id: string; title: string };
  project?: { id: string; title: string };
}

export type CreateCalendarEventInput = Omit<
  CalendarEvent,
  | 'id'
  | 'user_id'
  | 'created_at'
  | 'updated_at'
  | 'customer'
  | 'job'
  // Joined for display only — never part of an insert payload, same as
  // `customer` and `job` above.
  | 'project'
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
