/**
 * Worker Tools outbox UI (ELE-1828).
 *
 * WorkerOutboxPill — a quiet pill: "3 waiting to send", "Sending 3…",
 * "1 needs a look", "No signal". Hidden when there is nothing to say. Tap it
 * for the sheet listing each item, when it was done, and anything the server
 * would not take (with Try again).
 *
 * OutboxWaitingList — the same items inline on the page they belong to
 * (snags on Reports, notes on Progress notes, days on Timesheets).
 *
 * queuedToast (outboxToast.ts) — the one wording for "it's on the phone, it will go".
 */
import { useEffect, useMemo, useState } from 'react';
import { format, isToday } from 'date-fns';
import {
  AlertTriangle,
  CalendarPlus,
  Check,
  CheckSquare,
  Clock,
  CloudOff,
  Image as ImageIcon,
  Loader2,
  MessageSquareText,
  PenLine,
  Receipt,
  ShieldAlert,
  CheckCircle2,
  ClipboardCheck,
  Route,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { PrimaryButton, SecondaryButton } from '@/components/employer/editorial';
import { WorkerPanel, GroupLabel } from '@/components/worker-tools/WorkerUi';
import { useWorkerOutbox } from '@/hooks/useWorkerOutbox';
import {
  dismissNote,
  flushOutbox,
  retryNote,
  type OutboxKind,
  type OutboxNote,
  type OutboxOp,
} from '@/lib/workerOutbox';


const KIND: Record<OutboxKind, { icon: LucideIcon; noun: string }> = {
  clock_in: { icon: Clock, noun: 'Clock in' },
  clock_out: { icon: Clock, noun: 'Clock out' },
  timesheet: { icon: CalendarPlus, noun: 'Past day' },
  snag: { icon: AlertTriangle, noun: 'Snag' },
  incident: { icon: ShieldAlert, noun: 'Safety report' },
  progress_note: { icon: MessageSquareText, noun: 'Progress note' },
  task_status: { icon: CheckSquare, noun: 'Task' },
  pack_signoff: { icon: PenLine, noun: 'Sign-off' },
  checklist_item: { icon: CheckSquare, noun: 'Check' },
  job_done: { icon: CheckCircle2, noun: 'Job done' },
  receipt: { icon: Receipt, noun: 'Receipt' },
  cert_start: { icon: ClipboardCheck, noun: 'Certificate started' },
  expense: { icon: Receipt, noun: 'Expense' },
  mileage: { icon: Route, noun: 'Mileage' },
};

function when(iso: string) {
  const d = new Date(iso);
  return isToday(d) ? `Today ${format(d, 'HH:mm')}` : format(d, 'EEE d MMM, HH:mm');
}

function OpRow({ op, sending }: { op: OutboxOp; sending: boolean }) {
  const meta = KIND[op.kind];
  const Icon = meta.icon;
  const photos = op.photos?.length ?? 0;
  return (
    <li className="flex items-start gap-3 px-4 py-3 sm:px-5">
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.05]">
        <Icon className="h-4 w-4 text-white" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[14.5px] font-semibold leading-snug text-white break-words">{op.label}</p>
        {op.detail && (
          <p className="mt-0.5 text-[13px] leading-snug text-white break-words">{op.detail}</p>
        )}
        <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12.5px] text-white">
          <span>{when(op.queued_at)}</span>
          {photos > 0 && (
            <span className="inline-flex items-center gap-1">
              <ImageIcon className="h-3.5 w-3.5" aria-hidden />
              {photos} {photos === 1 ? 'photo' : 'photos'}
            </span>
          )}
          {op.attempts > 0 && !sending && <span>Tried {op.attempts}× so far</span>}
        </p>
      </div>
      <span className="mt-1 shrink-0 text-[12px] font-semibold text-white">
        {sending ? (
          <span className="inline-flex items-center gap-1.5">
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
            Sending
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-orange-400" aria-hidden />
            Waiting
          </span>
        )}
      </span>
    </li>
  );
}

function NoteCard({ note }: { note: OutboxNote }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-300" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="text-[14.5px] font-semibold leading-snug text-white break-words">
            {note.label}
          </p>
          {note.detail && <p className="mt-0.5 text-[13px] text-white break-words">{note.detail}</p>}
          <p className="mt-0.5 text-[12.5px] text-white">You did this {when(note.queued_at).replace(/^Today/, 'today')}</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-white">{note.reason}</p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:justify-end">
        <SecondaryButton
          className="h-11"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            await dismissNote(note.id);
          }}
        >
          OK, remove it
        </SecondaryButton>
        {!note.conflict && (
          <PrimaryButton
            className="h-11"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              await retryNote(note.id);
            }}
          >
            Try again
          </PrimaryButton>
        )}
      </div>
    </div>
  );
}

export function WorkerOutboxSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { pending, notes, syncing, online, memoryOnly } = useWorkerOutbox();
  const count = pending.length;
  const description = !online
    ? count > 0
      ? 'No signal right now. Everything below is saved on this phone and sends by itself, in order, when you have signal. It is fine to close the app.'
      : 'No signal right now. Anything you do in Worker Tools is saved on this phone and sends when you have signal.'
    : syncing
      ? 'Sending now, oldest first.'
      : count > 0
        ? 'You have signal. These will send in a moment, or tap Send now.'
        : notes.length > 0
          ? 'Nothing is waiting to send. The server would not take the items below, so they are kept here with what you did. Nothing has been lost.'
          : 'Everything you did on this phone has reached the office.';

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow={count > 0 ? 'Saved on this phone' : 'Worker Tools'}
      title={count > 0 ? `${count} waiting to send` : notes.length > 0 ? 'Needs a look' : 'All sent'}
      description={description}
      width="wide"
      footer={
        <div className={cn('grid gap-2 lg:flex lg:justify-end', count > 0 ? 'grid-cols-2' : 'grid-cols-1')}>
          <SecondaryButton size="lg" onClick={() => onOpenChange(false)} className="lg:min-w-[10rem]">
            Close
          </SecondaryButton>
          {count > 0 && (
          <PrimaryButton
            className="lg:min-w-[12rem]"
            size="lg"
            disabled={!online || syncing || count === 0}
            onClick={() => void flushOutbox()}
          >
            {syncing ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : !online ? (
              'Waiting for signal'
            ) : (
              'Send now'
            )}
          </PrimaryButton>
          )}
        </div>
      }
    >
      {memoryOnly && (
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 text-[13.5px] leading-relaxed text-white">
          This browser won’t let the app save to the phone’s storage, so keep this screen open
          until these have sent.
        </div>
      )}
      <div className="grid gap-5 lg:grid-cols-2 lg:items-start">
        {notes.length > 0 && (
          <section className={cn('space-y-3 lg:order-2', count === 0 && 'lg:col-span-2')}>
            <h3 className="text-[15px] font-semibold tracking-tight text-white">
              {notes.length === 1 ? '1 thing needs a look' : `${notes.length} things need a look`}
            </h3>
            <div className={cn('grid gap-3', count === 0 && 'lg:grid-cols-2 lg:items-start')}>
              {notes.map((n) => (
                <NoteCard key={n.id} note={n} />
              ))}
            </div>
          </section>
        )}
        {(count > 0 || notes.length === 0) && (
        <section className={cn('space-y-3', notes.length === 0 && 'lg:col-span-2')}>
          <h3 className="text-[15px] font-semibold tracking-tight text-white">Waiting to send</h3>
          {count === 0 ? (
            <WorkerPanel className="flex items-center gap-3 px-4 py-4 sm:px-5">
              <Check className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden />
              <p className="text-[14px] text-white">Nothing waiting. The office has everything.</p>
            </WorkerPanel>
          ) : (
            <WorkerPanel className="overflow-hidden">
              <ul
                className={cn(
                  'divide-y divide-white/[0.08]',
                  notes.length === 0 && 'lg:grid lg:grid-cols-2 lg:gap-x-2 lg:divide-y-0 lg:py-1'
                )}
              >
                {pending.map((op, i) => (
                  <OpRow key={op.id} op={op} sending={syncing && online && i === 0} />
                ))}
              </ul>
            </WorkerPanel>
          )}
        </section>
        )}
      </div>
    </FormSheet>
  );
}

/**
 * The calm status pill. Renders nothing when online with nothing waiting
 * (except a brief "All sent" after a queue empties).
 */
export function WorkerOutboxPill({ className }: { className?: string }) {
  const { pending, notes, syncing, online, lastSentAt } = useWorkerOutbox();
  const [open, setOpen] = useState(false);
  const count = pending.length;

  // "All sent" for a few seconds after the last item lands.
  const [justSent, setJustSent] = useState(false);
  useEffect(() => {
    if (!lastSentAt || count > 0) return;
    setJustSent(true);
    const t = window.setTimeout(() => setJustSent(false), 4000);
    return () => window.clearTimeout(t);
  }, [lastSentAt, count]);

  const view = useMemo(() => {
    if (notes.length > 0)
      return {
        icon: <AlertTriangle className="h-4 w-4 text-orange-300" aria-hidden />,
        text: notes.length === 1 ? '1 needs a look' : `${notes.length} need a look`,
        extra: count > 0 ? `\u00a0· ${count} waiting` : '',
      };
    if (count > 0 && syncing && online)
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin text-white" aria-hidden />,
        text: `Sending ${count}…`,
        extra: '',
      };
    if (count > 0)
      return {
        icon: online ? (
          <span className="h-2 w-2 rounded-full bg-orange-400" aria-hidden />
        ) : (
          <CloudOff className="h-4 w-4 text-white" aria-hidden />
        ),
        text: `${count} waiting`,
        extra: '\u00a0to send',
      };
    if (!online)
      return {
        icon: <CloudOff className="h-4 w-4 text-white" aria-hidden />,
        text: 'No signal',
        extra: '',
      };
    if (justSent)
      return {
        icon: <Check className="h-4 w-4 text-emerald-400" aria-hidden />,
        text: 'All sent',
        extra: '',
      };
    return null;
  }, [notes.length, count, syncing, online, justSent]);

  // Keep the sheet mounted while it is open, even once there is nothing to say.
  if (!view && !open) return null;

  return (
    <>
      {view && (
      <button
        type="button"
        onClick={() => setOpen(true)}
        data-testid="worker-outbox-pill"
        aria-label={`${view.text}${view.extra}. Tap for details.`}
        className={cn(
          'inline-flex h-11 shrink-0 items-center touch-manipulation',
          className
        )}
      >
        <span className="inline-flex h-8 items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.07] px-3 text-[12.5px] font-semibold text-white whitespace-nowrap">
          {view.icon}
          {view.text}
          {view.extra && <span className="-ml-2 hidden sm:inline">{view.extra}</span>}
        </span>
      </button>
      )}
      <WorkerOutboxSheet open={open} onOpenChange={setOpen} />
    </>
  );
}

/** Items of these kinds still on the phone, shown where the worker made them. */
export function OutboxWaitingList({
  kinds,
  jobId,
  className,
}: {
  kinds: OutboxKind[];
  jobId?: string | null;
  className?: string;
}) {
  const { pending, syncing, online } = useWorkerOutbox();
  const items = pending.filter(
    (o) => kinds.includes(o.kind) && (!jobId || !o.jobId || o.jobId === jobId)
  );
  if (items.length === 0) return null;
  const first = pending[0]?.id;
  return (
    <WorkerPanel className={cn('overflow-hidden', className)}>
      <GroupLabel>Saved on this phone · waiting to send</GroupLabel>
      <p className="px-4 pb-2 text-[13px] leading-relaxed text-white sm:px-5">
        {online
          ? 'Sending as soon as the connection settles. No need to do it again.'
          : 'No signal. These send by themselves when you have signal. No need to do them again.'}
      </p>
      <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
        {items.map((op) => (
          <OpRow key={op.id} op={op} sending={syncing && online && op.id === first} />
        ))}
      </ul>
    </WorkerPanel>
  );
}
