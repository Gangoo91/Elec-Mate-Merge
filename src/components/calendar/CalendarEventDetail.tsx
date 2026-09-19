import { useEffect, useMemo, useState } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Briefcase,
  Camera,
  ChevronLeft,
  ClipboardCheck,
  FileText,
  Link2,
  Navigation,
  Pencil,
  Play,
  Receipt,
  RotateCcw,
  Send,
  Square,
  Trash2,
  UserRound,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigateToAddress } from '@/utils/navigate-to-address';
import type { Customer } from '@/hooks/useCustomers';
import type { LinkableProject } from '@/hooks/useLinkableProjects';
import { formatElapsed, type EventJob, type StartOptions } from '@/lib/eventJobActions';
import { trackCalendarJobAction } from '@/lib/analytics-events';
import { eyebrowCn, fieldCn, ghostButtonCn } from './calendarStyles';
import { effectiveEnd } from './eventUtils';
import { useEventJobHub, postcodeIn, type CustomerSuggestion } from './useEventJobHub';
import type { CalendarEvent } from '@/types/calendar';
import { EVENT_TYPE_LABELS } from '@/types/calendar';

/**
 * ELE-1755 — the event sheet is where the job gets worked.
 *
 * Sean Mulcahy's office books in Google Calendar. Every booking syncs in with
 * no customer and no job on it, and every action here was gated on the job,
 * so what he saw was Delete and Edit. Meanwhile the job page could start the
 * clock, take photos, complete the job and draft the invoice — three pages
 * away from the diary he actually lives in.
 *
 * Now the sheet has four states and moves between them without closing:
 *
 *   not a job yet  → Start job (title / customer / address, then the clock
 *                    starts) or "It's an existing job" (link it).
 *   linked, idle   → Start job, photos, docs, draft invoice, put on hold.
 *   running        → the clock, photos, docs, End — which asks "finished for
 *                    today, or is the job complete?" because two-day installs
 *                    are the norm in his diary, not the exception.
 *   complete       → draft the invoice, or see the one that exists.
 *
 * The job record is still the record. Nothing here is a second job model;
 * "Open the full job" is always one tap away for anyone who wants the page.
 */

export interface StartJobDraft {
  title: string;
  customerId: string | null;
  location: string | null;
}

export type EndJobMode = 'day' | 'complete';

interface CalendarEventDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: CalendarEvent | null;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (eventId: string) => void;
  /** Send this booking to the customer (ELE-1685). */
  onTellCustomer?: (event: CalendarEvent) => void;
  /** Open the Electrician Hub job this booking is linked to (ELE-1679). */
  onOpenJob?: (event: CalendarEvent) => void;
  /** ELE-1680 — start the linked job: in progress + clock running. */
  onStartJob?: (event: CalendarEvent, job: EventJob, opts?: StartOptions) => Promise<void>;
  /** ELE-1681 — the customer wants a different date. Job on hold, slot cleared. */
  onHoldJob?: (event: CalendarEvent) => void;
  /** Customer book, for picking one on the Start job form. */
  customers: Customer[];
  /** Make a job out of this booking and start it. */
  onStartAsJob: (event: CalendarEvent, draft: StartJobDraft, opts?: StartOptions) => Promise<void>;
  /** This booking is a day of a job that already exists. */
  onLinkJob: (
    event: CalendarEvent,
    job: LinkableProject,
    via: 'suggested' | 'list'
  ) => Promise<void>;
  /** Stop the clock; complete the job too when asked. */
  onEndJob: (event: CalendarEvent, job: EventJob, mode: EndJobMode) => Promise<void>;
  onReopenJob: (event: CalendarEvent, job: EventJob) => Promise<void>;
  /** Put a suggested customer on the booking (and its job). */
  onUseCustomer: (
    event: CalendarEvent,
    customerId: string,
    reason: 'postcode' | 'name' | 'picked'
  ) => Promise<void>;
  onAddPhotos: (job: EventJob) => void;
  onAddDocs: (job: EventJob) => void;
  onDraftInvoice: (job: EventJob) => void;
  onViewInvoice: (invoiceId: string) => void;
  /**
   * Start a certificate for this job, customer and address prefilled. For
   * Sean the job ends with a cert, not an invoice — 26 certificates issued,
   * 0 invoices raised in the app.
   */
  onStartCertificate: (job: EventJob) => void;
}

type Mode = 'view' | 'start' | 'link' | 'end';

const STATUS_LABEL: Record<EventJob['status'], string> = {
  open: 'Not started',
  active: 'In progress',
  on_hold: 'On hold',
  completed: 'Complete',
  cancelled: 'Cancelled',
};

const INVOICE_LABEL: Record<string, string> = {
  draft: 'Draft invoice',
  sent: 'Invoice sent',
  overdue: 'Invoice overdue',
  paid: 'Invoice paid',
};

/** Under a receipt icon in the footer strip, one word is enough. */
const INVOICE_SHORT: Record<string, string> = {
  draft: 'Draft',
  sent: 'Sent',
  overdue: 'Overdue',
  paid: 'Paid',
};

const primaryCn =
  'h-12 flex-1 rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors touch-manipulation active:scale-[0.98] disabled:opacity-50';

/**
 * A small icon action in the footer strip. 56px tall with the label under the
 * icon — four of them fit a 375px phone with room to spare, where four
 * labelled buttons in a row would have wrapped or shrunk below 44px.
 */
const GridAction = ({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl border px-1 text-center text-[11px] font-medium leading-tight transition-colors touch-manipulation active:scale-[0.97]',
      danger
        ? 'border-red-500/25 bg-red-500/10 text-red-300 hover:bg-red-500/15'
        : 'border-white/[0.12] bg-white/[0.04] text-white hover:bg-white/[0.08]'
    )}
  >
    <Icon className="h-5 w-5 shrink-0" />
    <span className="line-clamp-1">{label}</span>
  </button>
);

/** Row of a detail list — label above, value below, separated by a rule. */
const DetailRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="border-t border-white/[0.10] px-4 py-3 sm:px-5">
    <p className={eyebrowCn}>{label}</p>
    <div className="mt-1 text-[14px] leading-snug text-white">{children}</div>
  </div>
);

function whenLabel(event: CalendarEvent): string {
  const start = parseISO(event.start_at);
  const end = effectiveEnd(event);

  if (event.all_day) {
    return isSameDay(start, end)
      ? format(start, 'EEEE d MMMM yyyy')
      : `${format(start, 'EEE d MMM')} – ${format(end, 'EEE d MMM yyyy')}`;
  }
  if (isSameDay(start, end)) {
    return `${format(start, 'EEEE d MMMM')} · ${format(start, 'HH:mm')}–${format(end, 'HH:mm')}`;
  }
  return `${format(start, 'EEE d MMM, HH:mm')} – ${format(end, 'EEE d MMM, HH:mm')}`;
}

/**
 * Google event descriptions arrive as HTML — a warranty booking's notes
 * came through as `Email: <a href="mailto:…">`. Shown as text, not tags.
 */
function plainText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function gbp(n: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(n);
}

const CalendarEventDetail = ({
  open,
  onOpenChange,
  event,
  onEdit,
  onDelete,
  onTellCustomer,
  onOpenJob,
  onStartJob,
  onHoldJob,
  customers,
  onStartAsJob,
  onLinkJob,
  onEndJob,
  onReopenJob,
  onUseCustomer,
  onAddPhotos,
  onAddDocs,
  onDraftInvoice,
  onViewInvoice,
  onStartCertificate,
}: CalendarEventDetailProps) => {
  const hub = useEventJobHub(event, open);
  const [mode, setMode] = useState<Mode>('view');
  const [busy, setBusy] = useState(false);

  // Start-job form
  const [draftTitle, setDraftTitle] = useState('');
  const [draftCustomerId, setDraftCustomerId] = useState<string | null>(null);
  const [draftLocation, setDraftLocation] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  // A fresh open is always the plain view — never a half-filled form from
  // the last booking.
  useEffect(() => {
    if (open) {
      setMode('view');
      setBusy(false);
      setCustomerSearch('');
    }
  }, [open, event?.id]);

  const suggestedIds = useMemo(() => new Set(hub.suggestions.map((s) => s.id)), [hub.suggestions]);
  const searchedCustomers = useMemo(() => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return [];
    return customers
      .filter((c) => c.name.toLowerCase().includes(q) && !suggestedIds.has(c.id))
      .slice(0, 6);
  }, [customerSearch, customers, suggestedIds]);

  if (!event) return null;

  const linked = !!event.project_id;
  const job = hub.job;
  const running = hub.running;
  const status = job?.status;
  const isDone = status === 'completed';
  const isCancelled = status === 'cancelled';
  const canTell = !!onTellCustomer && !!event.client_id;
  const canHold = !!onHoldJob && linked && !isDone && !isCancelled && !running;
  const sentAt = event.confirmation_sent_at ? new Date(event.confirmation_sent_at) : null;
  const latestInvoice = hub.records?.invoices[0] ?? null;
  const eventPostcode = postcodeIn(event.title) ?? postcodeIn(event.location);

  const openInMaps = () => navigateToAddress({ address: event.location });

  /**
   * One action at a time. The handlers toast their own failures and rethrow
   * so the sheet knows not to change mode; the rethrow stops here.
   */
  const run = async (fn: () => Promise<void>) => {
    if (busy) return;
    setBusy(true);
    try {
      await fn();
    } catch {
      // already reported by the handler
    } finally {
      setBusy(false);
    }
  };

  const openStartForm = () => {
    setDraftTitle(event.title ?? '');
    const firstSuggestion = hub.suggestions[0] ?? null;
    setDraftCustomerId(event.client_id ?? firstSuggestion?.id ?? null);
    setDraftLocation(event.location ?? firstSuggestion?.address ?? '');
    setCustomerSearch('');
    setMode('start');
  };

  const chooseCustomer = (c: { id: string; address?: string | null }) => {
    setDraftCustomerId(c.id);
    if (!draftLocation.trim() && c.address) setDraftLocation(c.address);
    setCustomerSearch('');
  };

  const chosenCustomerName =
    hub.suggestions.find((s) => s.id === draftCustomerId)?.name ??
    customers.find((c) => c.id === draftCustomerId)?.name ??
    null;

  const submitStart = () =>
    run(async () => {
      const title = draftTitle.trim();
      if (!title) return;
      await onStartAsJob(
        event,
        {
          title,
          customerId: draftCustomerId,
          location: draftLocation.trim() || null,
        },
        { stopOther: !!hub.otherRunning }
      );
      setMode('view');
    });

  const submitLink = (p: LinkableProject, via: 'suggested' | 'list') =>
    run(async () => {
      await onLinkJob(event, p, via);
      setMode('view');
    });

  const submitEnd = (endMode: EndJobMode) =>
    run(async () => {
      if (!job) return;
      await onEndJob(event, job, endMode);
      setMode('view');
    });

  /** The line under the job title: what exists against it so far. */
  const recordsLine = (() => {
    const r = hub.records;
    if (!r) return null;
    const parts: string[] = [];
    if (r.photos > 0) parts.push(`${r.photos} photo${r.photos === 1 ? '' : 's'}`);
    if (r.documents > 0) parts.push(`${r.documents} doc${r.documents === 1 ? '' : 's'}`);
    if (r.unbilledSeconds >= 60) parts.push(`${formatElapsed(r.unbilledSeconds)} unbilled`);
    if (latestInvoice) {
      parts.push(
        `${INVOICE_LABEL[latestInvoice.status] ?? 'Invoice'} · ${gbp(latestInvoice.total)}`
      );
    }
    return parts.length ? parts.join(' · ') : 'Nothing on it yet';
  })();

  /**
   * He forgot to End the last job. Said plainly, with the fix built into
   * the Start button rather than sending him off to find the other timer.
   */
  const otherRunningBand = hub.otherRunning ? (
    <div className="border-t border-white/[0.10] bg-white/[0.06] px-4 py-3 sm:px-5">
      <p className={eyebrowCn}>Still timing</p>
      <p className="mt-0.5 text-[14px] leading-snug text-white">
        {hub.otherRunning.label ?? 'The last job'} since{' '}
        {format(new Date(hub.otherRunning.started_at), 'HH:mm')}. Starting this one stops that clock
        and keeps its hours.
      </p>
    </div>
  ) : null;

  // ─── Footer by state ────────────────────────────────────────────────
  const renderFooter = () => {
    if (mode === 'start') {
      return (
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode('view')}
              className={cn(ghostButtonCn, 'h-12 px-4 text-[14px]')}
              disabled={busy}
            >
              <ChevronLeft className="inline h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={submitStart}
              disabled={busy || !draftTitle.trim()}
              className={primaryCn}
            >
              <Play className="mr-2 inline h-4 w-4" />
              {busy ? 'Starting…' : hub.otherRunning ? 'Switch and start' : 'Start now'}
            </button>
          </div>
        </div>
      );
    }

    if (mode === 'link') {
      return (
        <button
          type="button"
          onClick={() => setMode('view')}
          className={cn(ghostButtonCn, 'h-12 w-full text-[14px]')}
          disabled={busy}
        >
          <ChevronLeft className="mr-1 inline h-4 w-4" />
          Back
        </button>
      );
    }

    if (mode === 'end') {
      return (
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => submitEnd('day')}
              disabled={busy}
              className={cn(ghostButtonCn, 'h-12 flex-1 text-[14px]')}
            >
              Finished for today
            </button>
            <button
              type="button"
              onClick={() => submitEnd('complete')}
              disabled={busy}
              className={primaryCn}
            >
              Job complete
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMode('view')}
            disabled={busy}
            className="h-11 w-full text-[12px] font-medium text-white underline decoration-white/40 underline-offset-4 touch-manipulation"
          >
            Keep the clock running
          </button>
        </div>
      );
    }

    /*
     * ── view ──
     *
     * Two rows, always. The first is the job's next action with Photos
     * beside it; the second is a strip of small icon actions. On an iPhone
     * SE the first cut of this footer stood 289px tall and left 94px of
     * booking to read — five rows of full-width buttons, two of them
     * wrapping. Tell the customer and Put on hold now live in the body on
     * the rows they belong to (Customer, Job), which is where the eye looks
     * for them anyway.
     */
    const edit = <GridAction icon={Pencil} label="Edit" onClick={() => onEdit(event)} />;
    const del = (
      <GridAction icon={Trash2} label="Delete" danger onClick={() => onDelete(event.id)} />
    );

    if (!linked) {
      return (
        <div className="space-y-2">
          <div className="flex gap-2">
            <button type="button" onClick={openStartForm} className={primaryCn} disabled={busy}>
              <Play className="mr-2 inline h-4 w-4" />
              Start job
            </button>
            <button
              type="button"
              onClick={() => setMode('link')}
              className={cn(ghostButtonCn, 'h-12 flex-1 whitespace-nowrap text-[14px]')}
              disabled={busy}
            >
              <Link2 className="mr-2 inline h-4 w-4" />
              Existing job
            </button>
          </div>
          <div className="flex gap-2">
            {edit}
            {del}
          </div>
        </div>
      );
    }

    // Linked but the job row has not arrived (or is gone).
    if (!job) {
      return (
        <div className="space-y-2">
          <p className="py-1 text-center text-[12px] text-white">
            {hub.jobLoading
              ? 'Loading the job…'
              : 'The job this was linked to no longer exists. Edit to link another.'}
          </p>
          <div className="flex gap-2">
            {edit}
            {del}
          </div>
        </div>
      );
    }

    const photos = (
      <button
        type="button"
        onClick={() => {
          trackCalendarJobAction({ action: 'photos', job_status: job.status });
          onAddPhotos(job);
        }}
        className={cn(ghostButtonCn, 'h-12 flex-1 whitespace-nowrap text-[14px]')}
        disabled={busy}
      >
        <Camera className="mr-2 inline h-4 w-4" />
        Photos
      </button>
    );
    const docs = (
      <GridAction
        icon={FileText}
        label="Docs"
        onClick={() => {
          trackCalendarJobAction({ action: 'docs', job_status: job.status });
          onAddDocs(job);
        }}
      />
    );
    // One word under the icon: "Draft invoice" truncated to "Draft…" in an
    // 80px cell on an iPhone SE. The receipt icon carries "invoice".
    const invoiceGrid = latestInvoice ? (
      <GridAction
        icon={Receipt}
        label={INVOICE_SHORT[latestInvoice.status] ?? 'Invoice'}
        onClick={() => onViewInvoice(latestInvoice.id)}
      />
    ) : (
      <GridAction icon={Receipt} label="Invoice" onClick={() => {
                trackCalendarJobAction({ action: 'invoice', job_status: job.status });
                onDraftInvoice(job);
              }} />
    );

    if (running) {
      return (
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode('end')}
              className={primaryCn}
              disabled={busy}
            >
              <Square className="mr-2 inline h-4 w-4" />
              End job
            </button>
            {photos}
          </div>
          <div className="flex gap-2">
            {docs}
            {invoiceGrid}
            {edit}
            {del}
          </div>
        </div>
      );
    }

    if (isDone) {
      return (
        <div className="space-y-2">
          <div className="flex gap-2">
            {latestInvoice ? (
              <button
                type="button"
                onClick={() => onViewInvoice(latestInvoice.id)}
                className={primaryCn}
                disabled={busy}
              >
                <Receipt className="mr-2 inline h-4 w-4" />
                {INVOICE_LABEL[latestInvoice.status] ?? 'Invoice'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                trackCalendarJobAction({ action: 'invoice', job_status: job.status });
                onDraftInvoice(job);
              }}
                className={primaryCn}
                disabled={busy}
              >
                <Receipt className="mr-2 inline h-4 w-4" />
                Draft invoice
              </button>
            )}
            {photos}
          </div>
          <div className="flex gap-2">
            {docs}
            <GridAction
              icon={ClipboardCheck}
              label="Certificate"
              onClick={() => onStartCertificate(job)}
            />
            {edit}
            {del}
          </div>
        </div>
      );
    }

    // Linked, idle (open / active / on hold / cancelled).
    return (
      <div className="space-y-2">
        <div className="flex gap-2">
          {!isCancelled && onStartJob && (
            <button
              type="button"
              onClick={() => run(() => onStartJob(event, job, { stopOther: !!hub.otherRunning }))}
              className={primaryCn}
              disabled={busy}
            >
              <Play className="mr-2 inline h-4 w-4" />
              {busy ? 'Starting…' : hub.otherRunning ? 'Switch job' : 'Start job'}
            </button>
          )}
          {photos}
        </div>
        <div className="flex gap-2">
          {docs}
          {invoiceGrid}
          {edit}
          {del}
        </div>
      </div>
    );
  };

  // ─── Body by mode ───────────────────────────────────────────────────
  const renderStartForm = () => (
    <div className="space-y-4 px-4 py-4 sm:px-5">
      {/* Said here too — "Switch and start" on the button needs its reason. */}
      {otherRunningBand && <div className="-mx-4 -mt-4 sm:-mx-5">{otherRunningBand}</div>}

      {/* Day two of a job booked as a second Google event: offer the job
          that already exists before he makes another one. */}
      {hub.bestMatch && (
        <button
          type="button"
          disabled={busy}
          onClick={() => submitLink(hub.bestMatch!, 'suggested')}
          className="flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl border border-elec-yellow/40 bg-elec-yellow/10 px-4 py-3 text-left touch-manipulation active:scale-[0.99] disabled:opacity-50"
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] text-white">Looks like a day of an open job</span>
            <span className="block truncate text-[14px] font-medium text-white">
              {hub.bestMatch.jobNumber ? `${hub.bestMatch.jobNumber} · ` : ''}
              {hub.bestMatch.title}
            </span>
          </span>
          <span className="shrink-0 text-[12px] font-medium text-elec-yellow">Link instead</span>
        </button>
      )}

      <div>
        <span className={cn(eyebrowCn, 'mb-2 block')}>Job title</span>
        <input
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          className={fieldCn}
          placeholder="What the job is"
        />
      </div>

      <div>
        <span className={cn(eyebrowCn, 'mb-2 block')}>Customer</span>
        {chosenCustomerName ? (
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-elec-yellow/40 bg-elec-yellow/10 px-4 py-3">
            <span className="flex min-w-0 items-center gap-2 text-[14px] font-medium text-white">
              <UserRound className="h-4 w-4 shrink-0 text-elec-yellow" />
              <span className="truncate">{chosenCustomerName}</span>
            </span>
            <button
              type="button"
              onClick={() => setDraftCustomerId(null)}
              className="shrink-0 text-[12px] font-medium text-white underline underline-offset-4"
            >
              Change
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {hub.suggestions.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04]">
                {hub.suggestions.map((s: CustomerSuggestion) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => chooseCustomer(s)}
                    className="flex w-full items-start gap-3 border-b border-white/[0.10] px-4 py-3 text-left last:border-b-0 touch-manipulation active:bg-white/[0.06]"
                  >
                    <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium text-white">
                        {s.name}
                      </span>
                      <span className="block truncate text-[12px] text-white">
                        {s.address ??
                          (s.reason === 'postcode'
                            ? `Matches ${eventPostcode}`
                            : 'Name matches the title')}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            )}
            <input
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className={fieldCn}
              placeholder={
                hub.suggestions.length ? 'Someone else? Search by name' : 'Search by name'
              }
            />
            {searchedCustomers.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04]">
                {searchedCustomers.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => chooseCustomer(c)}
                    className="flex w-full items-center gap-3 border-b border-white/[0.10] px-4 py-3 text-left last:border-b-0 touch-manipulation active:bg-white/[0.06]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium text-white">
                        {c.name}
                      </span>
                      {c.address && (
                        <span className="block truncate text-[12px] text-white">{c.address}</span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <p className="text-[12px] text-white">
              No customer is fine — the invoice will ask for one later.
            </p>
          </div>
        )}
      </div>

      <div>
        <span className={cn(eyebrowCn, 'mb-2 block')}>Address</span>
        <input
          value={draftLocation}
          onChange={(e) => setDraftLocation(e.target.value)}
          className={fieldCn}
          placeholder="Where the job is"
        />
      </div>

      <p className="text-[12px] leading-snug text-white">
        Starts the clock now. The job is created in the Electrical Hub with this date on it, and you
        stay here.
      </p>
    </div>
  );

  const renderLinkList = () => (
    <div className="px-4 py-4 sm:px-5">
      <span className={cn(eyebrowCn, 'mb-2 block')}>Which job is this a day of?</span>
      {hub.linkable.length === 0 ? (
        <p className="text-[13px] text-white">No open jobs. Start one instead.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04]">
          {hub.linkable.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => submitLink(p, 'list')}
              disabled={busy}
              className="flex w-full items-start gap-3 border-b border-white/[0.10] px-4 py-3 text-left last:border-b-0 touch-manipulation active:bg-white/[0.06] disabled:opacity-50"
            >
              <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-medium text-white">
                  {p.jobNumber ? `${p.jobNumber} · ` : ''}
                  {p.title}
                </span>
                {p.location && (
                  <span className="block truncate text-[12px] text-white">{p.location}</span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const renderEndQuestion = () => (
    <div className="px-4 py-5 sm:px-5">
      <span className={cn(eyebrowCn, 'mb-2 block')}>On site</span>
      <p className="text-[32px] font-bold tabular-nums leading-none tracking-tight text-white">
        {formatElapsed(hub.elapsedSeconds)}
      </p>
      <p className="mt-3 text-[14px] leading-snug text-white">
        Finished for today keeps the job open for another day. Job complete closes it and the
        invoice is next.
      </p>
    </div>
  );

  const renderView = () => (
    <>
      {otherRunningBand}
      {running && (
        <div className="flex items-center justify-between gap-3 border-t border-white/[0.10] bg-elec-yellow/10 px-4 py-3 sm:px-5">
          <div>
            <p className={eyebrowCn}>On site</p>
            <p className="mt-0.5 text-[24px] font-bold tabular-nums leading-none tracking-tight text-white">
              {formatElapsed(hub.elapsedSeconds)}
            </p>
          </div>
          <span
            className="flex h-2.5 w-2.5 animate-pulse rounded-full bg-elec-yellow"
            aria-hidden
          />
        </div>
      )}

      <DetailRow label="When">{whenLabel(event)}</DetailRow>

      {event.location && (
        <DetailRow label="Where">
          <button
            type="button"
            onClick={openInMaps}
            className="flex w-full items-center gap-2 text-left touch-manipulation"
          >
            <span className="min-w-0 flex-1">{event.location}</span>
            <Navigation className="h-4 w-4 shrink-0 text-elec-yellow" />
          </button>
        </DetailRow>
      )}

      {event.customer?.name ? (
        <DetailRow label="Customer">
          {/* Tell the customer sits on the customer, not in the footer —
              it was the fourth full-width button on a phone. */}
          {canTell ? (
            <button
              type="button"
              onClick={() => onTellCustomer?.(event)}
              className="-my-3 flex min-h-11 w-full items-center justify-between gap-2 text-left touch-manipulation"
            >
              <span className="min-w-0 flex-1 truncate">{event.customer.name}</span>
              <span className="flex shrink-0 items-center gap-1 text-[12px] font-medium text-elec-yellow">
                <Send className="h-3.5 w-3.5" />
                {sentAt ? 'Send again' : 'Tell them'}
              </span>
            </button>
          ) : (
            event.customer.name
          )}
        </DetailRow>
      ) : hub.suggestions.length > 0 ? (
        <DetailRow label="Customer">
          <div className="space-y-1.5">
            {hub.suggestions.slice(0, 2).map((s) => (
              <button
                key={s.id}
                type="button"
                disabled={busy}
                onClick={() => run(() => onUseCustomer(event, s.id, s.reason))}
                className="flex min-h-11 w-full items-center justify-between gap-2 text-left touch-manipulation disabled:opacity-50"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate">Looks like {s.name}</span>
                  {s.address && (
                    <span className="block truncate text-[12px] text-white">{s.address}</span>
                  )}
                </span>
                <span className="shrink-0 text-[12px] font-medium text-elec-yellow">Use them</span>
              </button>
            ))}
          </div>
        </DetailRow>
      ) : null}

      {event.crew && <DetailRow label="Who&rsquo;s on it">{event.crew}</DetailRow>}

      {linked && (
        <DetailRow label="Job">
          <button
            type="button"
            onClick={() => onOpenJob?.(event)}
            className="flex min-h-11 w-full items-start justify-between gap-2 text-left touch-manipulation"
          >
            <span className="min-w-0 flex-1">
              <span className="block truncate">
                {job?.jobNumber ? `${job.jobNumber} · ` : ''}
                {job?.title ?? event.project?.title ?? 'Linked job'}
              </span>
              <span className="block text-[12px] text-white">
                {job ? STATUS_LABEL[job.status] : ''}
                {job && recordsLine ? ` · ${recordsLine}` : ''}
              </span>
            </span>
            <span className="shrink-0 text-[12px] font-medium text-elec-yellow">Open</span>
          </button>
          {/* ELE-1681, on the job it applies to rather than in the footer. */}
          {canHold && (
            <button
              type="button"
              onClick={() => onHoldJob?.(event)}
              className="-mb-3 flex min-h-11 w-full items-center text-left text-[12px] font-medium text-white underline decoration-white/40 underline-offset-4 touch-manipulation"
            >
              Customer needs a different date? Put the job on hold
            </button>
          )}
          {isDone && job && (
            <button
              type="button"
              disabled={busy}
              onClick={() => run(() => onReopenJob(event, job))}
              className="-mb-3 flex min-h-11 w-full items-center gap-1.5 text-left text-[12px] font-medium text-white underline decoration-white/40 underline-offset-4 touch-manipulation disabled:opacity-50"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Marked complete by mistake? Reopen the job
            </button>
          )}
        </DetailRow>
      )}

      {event.job?.title && !linked && <DetailRow label="Job">{event.job.title}</DetailRow>}

      {event.reminder_minutes > 0 && (
        <DetailRow label="Reminder">
          {event.reminder_minutes >= 1440
            ? `${event.reminder_minutes / 1440} day before`
            : event.reminder_minutes >= 60
              ? `${event.reminder_minutes / 60} hr before`
              : `${event.reminder_minutes} min before`}
        </DetailRow>
      )}

      {event.description && (
        <DetailRow label="Description">
          <span className="whitespace-pre-wrap">{plainText(event.description)}</span>
        </DetailRow>
      )}

      {event.notes && (
        <DetailRow label="Private notes">
          <span className="whitespace-pre-wrap">{event.notes}</span>
        </DetailRow>
      )}

      {event.client_id && (
        <DetailRow label="Customer told">
          {sentAt ? (
            <span>
              Emailed {format(sentAt, 'd MMM')} at {format(sentAt, 'HH:mm')}
              {event.confirmation_sent_to ? ` · ${event.confirmation_sent_to}` : ''}
              {event.customer_reminder_sent_at
                ? ` · Reminded ${format(new Date(event.customer_reminder_sent_at), 'd MMM')}`
                : event.customer_reminder_opt_in && new Date(event.start_at) > new Date()
                  ? ' · Reminder goes the evening before'
                  : ''}
            </span>
          ) : (
            <span>Not emailed yet</span>
          )}
        </DetailRow>
      )}

      {event.sync_status === 'synced' && (
        <DetailRow label="Sync">Synced with Google Calendar</DetailRow>
      )}
    </>
  );

  const headerEyebrow =
    mode === 'start'
      ? 'Start this as a job'
      : mode === 'link'
        ? 'Link to a job'
        : mode === 'end'
          ? 'End job'
          : EVENT_TYPE_LABELS[event.event_type];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl p-0"
        /*
         * The photo / document drawer opens on top of this sheet. To Radix,
         * a tap inside that drawer is a tap OUTSIDE this dialog, which would
         * dismiss the sheet under it — so the first tap on "Take photo"
         * would have closed the booking behind it.
         */
        onPointerDownOutside={(e) => {
          if (
            (e.target as HTMLElement | null)?.closest?.('[data-vaul-drawer], [data-vaul-overlay]')
          ) {
            e.preventDefault();
          }
        }}
        onInteractOutside={(e) => {
          if (
            (e.target as HTMLElement | null)?.closest?.('[data-vaul-drawer], [data-vaul-overlay]')
          ) {
            e.preventDefault();
          }
        }}
      >
        <div className="flex h-full flex-col bg-background">
          <div className="h-1 shrink-0" style={{ backgroundColor: event.colour }} />

          <SheetHeader className="shrink-0 px-4 py-3 sm:px-5">
            <p className={eyebrowCn}>{headerEyebrow}</p>
            <SheetTitle className="text-left text-[19px] font-semibold leading-tight tracking-tight text-white">
              {mode === 'start' ? draftTitle || event.title : event.title || 'Untitled event'}
            </SheetTitle>
            <SheetDescription className="sr-only">Event details</SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto pb-4">
            {mode === 'start'
              ? renderStartForm()
              : mode === 'link'
                ? renderLinkList()
                : mode === 'end'
                  ? renderEndQuestion()
                  : renderView()}
          </div>

          <div
            className="shrink-0 border-t border-white/[0.10] px-4 pt-3 sm:px-5"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            {renderFooter()}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CalendarEventDetail;
