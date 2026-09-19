/**
 * ELE-1755 — what the event sheet can do to a job, without leaving the diary.
 *
 * Sean Mulcahy: "Can I open a job on the calendar like this and start/end the
 * job? Upload site photos/docs and create an invoice? Maybe I'm missing
 * something and it's already possible?" The job page could do all of it; the
 * calendar could not reach it. His office books in Google Calendar, every
 * booking syncs in with no job on it, and every action on the event sheet was
 * gated on the job. These are the writes behind the sheet's new actions.
 *
 * Every write here goes straight to the table rather than through
 * `useUpdateCalendarEvent`: that hook marks the row `pending_push` and nudges
 * the Google sync on any change, and a job link is the app's own metadata —
 * nothing the office should see move in Google.
 */
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEvent } from '@/types/calendar';
import { jobLookFor, spawnFromBooking } from '@/lib/bookingSpawn';
import type { ProjectStatus } from '@/hooks/useSparkProjects';

/** The one vocabulary, from the hook that owns the table. */
export type JobStatus = ProjectStatus;

export interface EventJob {
  id: string;
  title: string;
  status: JobStatus;
  customerId: string | null;
  customerName: string | null;
  location: string | null;
  jobNumber: string | null;
}

export interface ActiveSession {
  id: string;
  project_id: string | null;
  calendar_event_id: string | null;
  label: string | null;
  started_at: string;
}

async function currentUserId(): Promise<string> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Not signed in');
  return user.id;
}

/** Point an existing booking at an existing job. */
export async function linkEventToJob(
  event: CalendarEvent,
  job: { id: string; customerId: string | null }
): Promise<void> {
  const userId = await currentUserId();
  const customerForEvent = job.customerId && !event.client_id ? { client_id: job.customerId } : {};
  const { error } = await supabase
    .from('calendar_events')
    .update({ project_id: job.id, ...customerForEvent, ...jobLookFor(event) } as never)
    .eq('id', event.id)
    .eq('user_id', userId);
  if (error) throw error;
}

/** Put a customer on a booking that came in without one. */
export async function setEventCustomer(event: CalendarEvent, customerId: string): Promise<void> {
  const userId = await currentUserId();
  const { error } = await supabase
    .from('calendar_events')
    .update({ client_id: customerId } as never)
    .eq('id', event.id)
    .eq('user_id', userId);
  if (error) throw error;
  // The job it is linked to, if any, gets the customer too — unless it already
  // has one, which is not ours to overwrite.
  if (event.project_id) {
    await supabase
      .from('spark_projects')
      .update({ customer_id: customerId } as never)
      .eq('id', event.project_id)
      .eq('user_id', userId)
      .is('customer_id', null);
  }
}

export interface StartJobDraft {
  title: string;
  customerId: string | null;
  location: string | null;
}

/**
 * Make a job out of a booking. Returns the new job's id.
 *
 * Built on `spawnFromBooking`, which is the same path the "Also create → a
 * job" switch on a new booking takes, so a job started from the sheet and a
 * job started at booking time are the same shape of row.
 */
export async function createJobFromEvent(
  event: CalendarEvent,
  draft: StartJobDraft
): Promise<{ id: string; jobNumber: string | null }> {
  const spawned = await spawnFromBooking(event, {
    createProject: true,
    createSiteVisit: false,
    title: draft.title,
    customerId: draft.customerId,
    location: draft.location,
  });
  if (!spawned.projectId) {
    throw new Error(spawned.failures[0] ?? 'Could not create the job');
  }
  return { id: spawned.projectId, jobNumber: spawned.jobNumber ?? null };
}

/** How the sheet asked for the start — see `startTimerForJob.stopOther`. */
export interface StartOptions {
  stopOther?: boolean;
}

export interface StartTimerResult {
  /** True when a new session was started; false when one was already running. */
  started: boolean;
  /** What to tell the user about the timer. */
  note: string;
}

/**
 * Start the clock against a job — the rules ELE-1680 set, in one place.
 *
 * A timer already running is left alone: silently stopping it would lose
 * whatever it was timing. The session records the booking it was started
 * from (`calendar_event_id`) so the "unlogged diary blocks" nudge on the job
 * page never offers this day a second time.
 */
export async function startTimerForJob(args: {
  jobId: string;
  eventId: string;
  label: string;
  hourlyRate: number;
  /**
   * The one-man-band case: he forgot to End yesterday's job and is now
   * stood at today's. With this set the old clock is stopped and its hours
   * kept, and this one starts — one tap, nothing lost.
   */
  stopOther?: boolean;
}): Promise<StartTimerResult> {
  const userId = await currentUserId();
  // Fresh from the table, not the sheet's 15-second cache: a job completed
  // on the other phone a moment ago must not start clocking hours here.
  const { data: jobRow, error: jobError } = await supabase
    .from('spark_projects')
    .select('status')
    .eq('id', args.jobId)
    .eq('user_id', userId)
    .maybeSingle();
  if (jobError) throw jobError;
  const jobStatus = (jobRow as { status?: string } | null)?.status;
  if (!jobStatus) throw new Error('That job no longer exists');
  if (jobStatus === 'completed' || jobStatus === 'cancelled') {
    throw new Error(`That job is ${jobStatus} — reopen it if the work is starting again`);
  }
  const { data: running, error: runningError } = await supabase
    .from('time_sessions')
    .select('id, label, project_id, started_at')
    .eq('user_id', userId)
    .is('ended_at', null)
    .maybeSingle();
  if (runningError) throw runningError;
  const active = running as {
    id: string;
    label: string | null;
    project_id: string | null;
    started_at: string;
  } | null;

  if (active && active.project_id === args.jobId) {
    return { started: false, note: 'The timer for this job is already running.' };
  }
  let switchedNote = '';
  if (active && args.stopOther) {
    const seconds = await stopSession(active);
    switchedNote = `${formatElapsed(seconds)} logged against ${active.label ?? 'the last job'}. `;
  } else if (active) {
    return {
      started: false,
      note: `A timer is already running${active.label ? ` for ${active.label}` : ''} — end that one first to time this job.`,
    };
  }
  /*
   * `unique_time_session_per_calendar_event` allows ONE session per booking.
   * It exists so a diary block cannot be logged as time twice. A second
   * start on the same booking — Finished for today at lunch, Start job again
   * at one — is a legitimate second session, so it goes in without the
   * booking id rather than failing on the index. The first session keeps
   * the link, which is all the "already logged" check needs.
   */
  const { count: alreadyOnEvent, error: countError } = await supabase
    .from('time_sessions')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('calendar_event_id', args.eventId);
  if (countError) throw countError;
  const { error } = await supabase.from('time_sessions').insert({
    user_id: userId,
    label: args.label,
    project_id: args.jobId,
    calendar_event_id: alreadyOnEvent ? null : args.eventId,
    started_at: new Date().toISOString(),
    hourly_rate: args.hourlyRate,
  } as never);
  if (error) throw error;
  return { started: true, note: `${switchedNote}Timer running for ${args.label}.` };
}

/** Mark a job in progress if it is open or on hold. Finished jobs are left alone. */
export async function markJobActive(jobId: string): Promise<void> {
  const userId = await currentUserId();
  const { error } = await supabase
    .from('spark_projects')
    .update({ status: 'active' } as never)
    .eq('id', jobId)
    .eq('user_id', userId)
    .in('status', ['open', 'on_hold']);
  if (error) throw error;
}

/**
 * Stop a running session. Same arithmetic as `useTimeTracker`'s stop, so the
 * hours on the invoice do not depend on which button ended the day.
 */
export async function stopSession(session: { id: string; started_at: string }): Promise<number> {
  const userId = await currentUserId();
  const endedAt = new Date();
  const durationSeconds = Math.max(
    0,
    Math.floor((endedAt.getTime() - new Date(session.started_at).getTime()) / 1000)
  );
  const { error } = await supabase
    .from('time_sessions')
    .update({
      ended_at: endedAt.toISOString(),
      duration_seconds: durationSeconds,
      updated_at: endedAt.toISOString(),
    } as never)
    .eq('id', session.id)
    .eq('user_id', userId);
  if (error) throw error;
  return durationSeconds;
}

/**
 * Stop whatever is running against this job, if anything. Returns seconds
 * timed, or null when nothing was running.
 */
export async function stopRunningSessionForJob(jobId: string): Promise<number | null> {
  const userId = await currentUserId();
  const { data, error } = await supabase
    .from('time_sessions')
    .select('id, started_at')
    .eq('user_id', userId)
    .eq('project_id', jobId)
    .is('ended_at', null)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return stopSession(data as { id: string; started_at: string });
}

/**
 * The job is finished. Stops the clock first — completing a job used to leave
 * the timer running, so a job ended from the diary would have gone on
 * clocking hours nobody worked.
 */
export async function completeJob(jobId: string): Promise<number | null> {
  const userId = await currentUserId();
  const seconds = await stopRunningSessionForJob(jobId);
  const { error } = await supabase
    .from('spark_projects')
    .update({ status: 'completed', completed_at: new Date().toISOString() } as never)
    .eq('id', jobId)
    .eq('user_id', userId);
  if (error) throw error;
  return seconds;
}

/** Back to open after a mistaken complete. Start job takes it to active again. */
export async function reopenJob(jobId: string): Promise<void> {
  const userId = await currentUserId();
  const { error } = await supabase
    .from('spark_projects')
    .update({ status: 'open', completed_at: null } as never)
    .eq('id', jobId)
    .eq('user_id', userId);
  if (error) throw error;
}

export function formatElapsed(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h === 0) return `${m} min`;
  return `${h}h ${String(m).padStart(2, '0')}m`;
}
