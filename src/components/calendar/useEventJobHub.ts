/**
 * ELE-1755 — everything the event sheet needs to know to act as the job's
 * working surface for the day.
 *
 * Kept out of `CalendarPage` on purpose: the live clock ticks once a second
 * while a timer runs, and a tick in the page would re-render every cell of
 * the calendar behind the sheet for as long as the electrician is on site.
 * Here it re-renders the sheet, which is the only thing showing it.
 */
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CalendarEvent } from '@/types/calendar';
import { useLinkableProjects, type LinkableProject } from '@/hooks/useLinkableProjects';
import type { ActiveSession, EventJob, JobStatus } from '@/lib/eventJobActions';

/** Same key `useTimeTracker` uses, so the two never disagree about the clock. */
export const ACTIVE_SESSION_KEY = ['time-session-active'] as const;

export interface CustomerSuggestion {
  id: string;
  name: string;
  address: string | null;
  /** Why it was offered — shown so a wrong guess is obviously wrong. */
  reason: 'postcode' | 'name';
}

export interface JobRecords {
  photos: number;
  documents: number;
  invoices: Array<{ id: string; invoice_number: string | null; status: string; total: number }>;
  /** Seconds timed against the job that no invoice has picked up yet. */
  unbilledSeconds: number;
}

const POSTCODE_RE = /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s?(\d[A-Z]{2})\b/i;

/** "BB1 2DU" out of "BB1 2DU Tony Wilkinson Zappi Glo", or null. */
export function postcodeIn(text: string | undefined | null): string | null {
  if (!text) return null;
  const m = text.match(POSTCODE_RE);
  return m ? `${m[1]} ${m[2]}`.toUpperCase() : null;
}

function normalisePostcode(pc: string): string {
  return pc.replace(/\s+/g, '').toUpperCase();
}

/** Capitalised word pairs — the likeliest place a customer's name sits in a title. */
function namePairsIn(title: string): string[] {
  const pairs = new Set<string>();
  const re = /\b([A-Z][a-z]{1,})\s+([A-Z][a-z]{1,})\b/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(title)) !== null) {
    pairs.add(`${m[1]} ${m[2]}`);
    if (pairs.size >= 3) break;
  }
  return [...pairs];
}

const TITLE_STOP = new Set([
  'the',
  'and',
  'for',
  'with',
  'all',
  'day',
  'install',
  'installation',
  'job',
  'visit',
  'site',
]);

function titleWords(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !TITLE_STOP.has(w))
  );
}

/**
 * Rank the open jobs by how much they look like this booking. Day two of a
 * two-day install should find day one's job at the top of the list, not
 * buried under everything else that is open.
 */
export interface ScoredProject {
  project: LinkableProject;
  score: number;
}

/** A postcode or customer match — strong enough to say "this looks like a day of…". */
export const STRONG_MATCH = 3;

export function rankLinkable(event: CalendarEvent, projects: LinkableProject[]): ScoredProject[] {
  const pc = postcodeIn(event.title) ?? postcodeIn(event.location);
  const pcNorm = pc ? normalisePostcode(pc) : null;
  const words = titleWords(event.title);
  const scored = projects.map((p, index) => {
    let score = 0;
    if (pcNorm && p.location && normalisePostcode(p.location).includes(pcNorm)) score += 4;
    if (event.client_id && p.customerId === event.client_id) score += 3;
    for (const w of titleWords(p.title)) if (words.has(w)) score += 1;
    return { project: p, score, index };
  });
  scored.sort((a, b) => b.score - a.score || a.index - b.index);
  return scored.map(({ project, score }) => ({ project, score }));
}

export function useEventJobHub(event: CalendarEvent | null, open: boolean) {
  const eventId = event?.id ?? null;
  const projectId = event?.project_id ?? null;
  const enabled = open && !!event;

  const jobQuery = useQuery({
    queryKey: ['event-job', projectId],
    enabled: enabled && !!projectId,
    staleTime: 15_000,
    queryFn: async (): Promise<EventJob | null> => {
      if (!projectId) return null;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from('spark_projects')
        .select('id, title, status, customer_id, location, job_number, customers(name)')
        .eq('id', projectId)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      const row = data as Record<string, unknown>;
      const customer = row.customers as { name?: string } | null;
      return {
        id: row.id as string,
        title: (row.title as string) ?? 'Untitled job',
        status: (row.status as JobStatus) ?? 'open',
        customerId: (row.customer_id as string | null) ?? null,
        customerName: customer?.name ?? null,
        location: (row.location as string | null) ?? null,
        jobNumber: (row.job_number as string | null) ?? null,
      };
    },
  });

  const sessionQuery = useQuery({
    queryKey: ACTIVE_SESSION_KEY,
    enabled,
    queryFn: async (): Promise<ActiveSession | null> => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      // `*`, not a column list: this shares a cache key with useTimeTracker,
      // and a narrower row landing in that cache would hand the tracker page
      // a session with no hourly_rate or notes on it.
      const { data, error } = await supabase
        .from('time_sessions')
        .select('*')
        .eq('user_id', user.id)
        .is('ended_at', null)
        .maybeSingle();
      if (error) throw error;
      return (data as ActiveSession | null) ?? null;
    },
  });

  const session = sessionQuery.data ?? null;
  /** The running session, only if it is THIS job's. */
  const running = session && projectId && session.project_id === projectId ? session : null;
  /** A timer running against something else — Start must not silently kill it. */
  const otherRunning = session && !running ? session : null;

  // The clock. Ticks only while the sheet is open on a running job.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!open || !running) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [open, running]);
  const elapsedSeconds = running
    ? Math.max(0, Math.floor((now - new Date(running.started_at).getTime()) / 1000))
    : 0;

  const recordsQuery = useQuery({
    queryKey: ['event-job-records', projectId],
    enabled: enabled && !!projectId,
    staleTime: 15_000,
    queryFn: async (): Promise<JobRecords> => {
      const empty: JobRecords = { photos: 0, documents: 0, invoices: [], unbilledSeconds: 0 };
      if (!projectId) return empty;
      const [docs, inv, time] = await Promise.all([
        supabase.from('project_documents').select('doc_type').eq('project_id', projectId),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (supabase as any)
          .from('invoices')
          .select('id, invoice_number, status, total')
          .eq('project_id', projectId)
          .is('deleted_at', null)
          .order('created_at', { ascending: false }),
        supabase
          .from('time_sessions')
          .select('duration_seconds, invoice_id')
          .eq('project_id', projectId)
          .not('ended_at', 'is', null),
      ]);
      if (docs.error) throw docs.error;
      if (inv.error) throw inv.error;
      if (time.error) throw time.error;
      const docRows = (docs.data ?? []) as Array<{ doc_type: string }>;
      const timeRows = (time.data ?? []) as Array<{
        duration_seconds: number | null;
        invoice_id: string | null;
      }>;
      return {
        photos: docRows.filter((d) => d.doc_type === 'photo').length,
        documents: docRows.filter((d) => d.doc_type !== 'photo').length,
        invoices: ((inv.data ?? []) as JobRecords['invoices']).map((i) => ({
          ...i,
          total: Number(i.total) || 0,
        })),
        unbilledSeconds: timeRows
          .filter((t) => !t.invoice_id)
          .reduce((sum, t) => sum + (t.duration_seconds ?? 0), 0),
      };
    },
  });

  /**
   * Who this booking is probably for. Only asked when the booking has no
   * customer — which is every booking that arrives from Google. The office
   * types the postcode into the title; the customer book has 845 of Sean's
   * 943 customers by postcode, so that alone finds most of them.
   */
  const suggestionsQuery = useQuery({
    queryKey: ['event-customer-suggestions', eventId, event?.title, event?.location],
    enabled: enabled && !event?.client_id,
    staleTime: 60_000,
    queryFn: async (): Promise<CustomerSuggestion[]> => {
      if (!event) return [];
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return [];
      const out: CustomerSuggestion[] = [];
      const seen = new Set<string>();

      const pc = postcodeIn(event.title) ?? postcodeIn(event.location);
      if (pc) {
        const tight = normalisePostcode(pc);
        const { data } = await supabase
          .from('customers')
          .select('id, name, address, postcode')
          .eq('user_id', user.id)
          // Double-quoted: the spaced form carries a space, and PostgREST's
          // or() grammar wants values with anything but plain characters
          // quoted. The tight form catches "BB12DU" typed without one.
          .or(
            `postcode.ilike."%${pc}%",postcode.ilike."%${tight}%",address.ilike."%${pc}%",address.ilike."%${tight}%"`
          )
          .limit(3);
        for (const c of (data ?? []) as Array<{
          id: string;
          name: string;
          address: string | null;
        }>) {
          if (seen.has(c.id)) continue;
          seen.add(c.id);
          out.push({ id: c.id, name: c.name, address: c.address, reason: 'postcode' });
        }
      }

      if (out.length < 3) {
        for (const pair of namePairsIn(event.title)) {
          const { data } = await supabase
            .from('customers')
            .select('id, name, address')
            .eq('user_id', user.id)
            .ilike('name', `%${pair}%`)
            .limit(2);
          for (const c of (data ?? []) as Array<{
            id: string;
            name: string;
            address: string | null;
          }>) {
            if (seen.has(c.id)) continue;
            seen.add(c.id);
            out.push({ id: c.id, name: c.name, address: c.address, reason: 'name' });
          }
          if (out.length >= 3) break;
        }
      }
      return out.slice(0, 3);
    },
  });

  const linkableQuery = useLinkableProjects(enabled && !projectId);
  const ranked = useMemo(
    () => (event ? rankLinkable(event, linkableQuery.data ?? []) : []),
    [event, linkableQuery.data]
  );
  const linkable = useMemo(() => ranked.map((r) => r.project), [ranked]);
  /**
   * Day two of a two-day install: the office books each day as its own
   * Google event, so "Start job" on the second would make a second job. A
   * strong match is offered on the Start form as "link it instead".
   */
  const bestMatch = ranked.length > 0 && ranked[0].score >= STRONG_MATCH ? ranked[0].project : null;

  return {
    job: jobQuery.data ?? null,
    jobLoading: jobQuery.isLoading,
    running,
    otherRunning,
    elapsedSeconds,
    records: recordsQuery.data ?? null,
    suggestions: suggestionsQuery.data ?? [],
    linkable,
    bestMatch,
  };
}
