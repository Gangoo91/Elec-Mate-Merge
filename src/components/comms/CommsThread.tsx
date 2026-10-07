/**
 * CommsThread — one Team comms message as a chat thread (ELE-1959).
 *
 * Shared by the office (Employer Hub → Comms) and the worker (Worker Tools →
 * Team comms). It fills whatever box it is given as a flex column:
 *
 *   header (back on phones, title, actions)
 *   scrolling timeline — the original message card, then reply bubbles
 *   composer pinned to the bottom, safe-area aware
 *
 * Phones get it as a full-screen layer; desktop puts it beside the list.
 */
import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import {
  Check,
  CheckCheck,
  ChevronLeft,
  Clock,
  Loader2,
  Lock,
  MessageSquare,
  Paperclip,
  Pin,
  SendHorizontal,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  signAttachments,
  type CommsAttachment,
  type CommsPriority,
  type CommsRecipient,
  type CommsReply,
  type CommsType,
} from '@/services/teamCommsService';
import { useAcknowledge, useMarkSeen, useSendReply, useThread } from '@/hooks/useTeamComms';
import { AttachmentGrid, PendingAttachments } from './CommsAttachments';
import { typeMeta } from './commsUi';
import { useAttachmentPicker } from './useAttachmentPicker';

export interface ThreadMessage {
  id: string;
  type: CommsType;
  title: string;
  content: string;
  priority: CommsPriority;
  is_pinned: boolean;
  requires_acknowledgement: boolean;
  attachments: CommsAttachment[] | null;
  created_at: string;
  sent_by_name: string | null;
  job_title: string | null;
  /** Office: "Everyone", "Job crew: …", "3 people". */
  audienceLabel?: string;
}

interface CommsThreadProps {
  mode: 'office' | 'worker';
  message: ThreadMessage;
  firmId: string | null | undefined;
  /** Worker: their roster id and acknowledgement. */
  myEmployeeId?: string;
  myAcknowledgedAt?: string | null;
  onBack: () => void;
  headerActions?: ReactNode;
  /** A strip under the header (office: acknowledgement progress + chase). */
  subheader?: ReactNode;
}



const dayLabel = (iso: string) => {
  const d = parseISO(iso);
  if (isToday(d)) return 'Today';
  if (isYesterday(d)) return 'Yesterday';
  return format(d, 'EEE d MMM');
};

const timeLabel = (iso: string) => format(parseISO(iso), 'HH:mm');

const isPending = (r: CommsReply) => r.id.startsWith('pending-');

const canHoverPointer = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches;

export function CommsThread({
  mode,
  message,
  firmId,
  myEmployeeId,
  myAcknowledgedAt,
  onBack,
  headerActions,
  subheader,
}: CommsThreadProps) {
  const { user } = useAuth();
  const { replies, meta, recipients } = useThread(message.id, mode);
  const sendReply = useSendReply(message.id);
  const markSeen = useMarkSeen();
  const ack = useAcknowledge();
  const picker = useAttachmentPicker(firmId);

  const [draft, setDraft] = useState('');
  const [toEmployee, setToEmployee] = useState<string | null>(null);
  const [showTo, setShowTo] = useState(false);
  const [ackedAt, setAckedAt] = useState<string | null>(myAcknowledgedAt ?? null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const list = useMemo(() => replies.data ?? [], [replies.data]);
  const people = useMemo(() => recipients.data ?? [], [recipients.data]);
  const nameOf = useMemo(() => {
    const m = new Map<string, CommsRecipient>();
    people.forEach((p) => m.set(p.employee_id, p));
    return m;
  }, [people]);

  // Reset per thread.
  useEffect(() => {
    setDraft('');
    setToEmployee(null);
    setAckedAt(myAcknowledgedAt ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.id]);

  useEffect(() => {
    setAckedAt(myAcknowledgedAt ?? null);
  }, [myAcknowledgedAt]);

  // Opening the thread — and every new reply while it is open — counts as seen.
  const seenCount = list.filter((r) => !isPending(r)).length;
  const markSeenMutate = markSeen.mutate;
  useEffect(() => {
    markSeenMutate({ id: message.id, as: mode });
  }, [message.id, seenCount, markSeenMutate, mode]);

  // Keep the newest message in view — including when photos finish loading and
  // grow the thread — unless the reader has scrolled up to look at something.
  const contentRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  useEffect(() => {
    stickRef.current = true;
  }, [message.id]);
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      stickRef.current = true;
      el.scrollTo({ top: el.scrollHeight, behavior: list.length > 0 ? 'smooth' : 'auto' });
    }
  }, [list.length, message.id]);
  useEffect(() => {
    const el = scrollRef.current;
    const inner = contentRef.current;
    if (!el || !inner || typeof ResizeObserver === 'undefined') return;
    const onScroll = () => {
      stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    };
    const ro = new ResizeObserver(() => {
      if (stickRef.current) el.scrollTop = el.scrollHeight;
    });
    el.addEventListener('scroll', onScroll, { passive: true });
    ro.observe(inner);
    return () => {
      el.removeEventListener('scroll', onScroll);
      ro.disconnect();
    };
  }, [message.id]);

  // Signed URLs for every attachment in the thread (30 min).
  const paths = useMemo(() => {
    const all = [
      ...(message.attachments ?? []),
      ...list.flatMap((r) => (Array.isArray(r.attachments) ? r.attachments : [])),
    ].map((a) => a.path);
    return Array.from(new Set(all)).sort();
  }, [message.attachments, list]);
  const signed = useQuery({
    queryKey: ['team-comms', 'signed', paths.join('|')],
    queryFn: () => signAttachments(paths),
    enabled: paths.length > 0,
    staleTime: 20 * 60 * 1000,
  });
  const urls = signed.data ?? {};

  // Auto-grow the composer (1–6 lines).
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, [draft]);

  const canSend =
    (draft.trim().length > 0 || picker.ready.length > 0) && !picker.busy && !sendReply.isPending;

  const handleSend = () => {
    if (!canSend) return;
    const body = draft.trim();
    const attachments = picker.ready;
    setDraft('');
    picker.clear();
    sendReply.mutate(
      {
        body,
        attachments,
        toEmployeeId: mode === 'office' ? toEmployee : null,
        authorKind: mode,
        authorEmployeeId: myEmployeeId ?? null,
      },
      {
        onError: (e) => {
          setDraft(body);
          toast.error(e instanceof Error ? e.message : 'Reply not sent');
        },
      }
    );
  };

  const handleAck = () => {
    ack.mutate(message.id, {
      onSuccess: (at) => {
        setAckedAt(at || new Date().toISOString());
        toast.success('Acknowledged. The office can see it');
      },
      onError: (e) => toast.error(e instanceof Error ? e.message : 'Could not acknowledge'),
    });
  };

  const officeSeenAt = meta.data?.office_seen_at ?? null;
  const activePeople = people.filter((p) => (p.status ?? '').toLowerCase() === 'active');

  const TypeIcon = typeMeta[message.type]?.Icon ?? MessageSquare;
  const ackPending = mode === 'worker' && message.requires_acknowledgement && !ackedAt;

  // Day separators across the original + replies.
  let lastDay = dayLabel(message.created_at);

  return (
    <div className="flex h-full min-h-0 flex-col bg-elec-dark">
      {/* Header */}
      <div
        className="shrink-0 border-b border-white/[0.08] bg-[hsl(0_0%_8%)]"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <div className="flex min-h-[56px] items-center gap-1 px-1.5 lg:px-4">
          <button
            type="button"
            onClick={onBack}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full touch-manipulation hover:bg-white/[0.06] lg:hidden"
            aria-label="Back to messages"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <span
            className={cn(
              'hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border sm:flex',
              typeMeta[message.type]?.chip
            )}
          >
            <TypeIcon className="h-4 w-4 text-white" />
          </span>
          <div className="min-w-0 flex-1 px-1.5">
            <p className="truncate text-[15.5px] font-semibold leading-tight text-white">
              {message.title}
            </p>
            <p className="truncate text-[12px] leading-tight text-white">
              {mode === 'office'
                ? `${typeMeta[message.type]?.label ?? 'Message'} · ${message.audienceLabel ?? ''}`
                : `From ${message.sent_by_name || 'the office'}${
                    message.job_title ? ` · ${message.job_title}` : ''
                  }`}
            </p>
          </div>
          {headerActions && <div className="flex shrink-0 items-center gap-1">{headerActions}</div>}
        </div>
        {subheader}
      </div>

      {/* Timeline */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-5"
      >
        <div ref={contentRef} className="mx-auto max-w-3xl space-y-2.5">
          <DaySeparator label={lastDay} />

          {/* The message itself */}
          <article className="rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4">
            <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  'inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11.5px] font-medium',
                  typeMeta[message.type]?.chip
                )}
              >
                <TypeIcon className="h-3.5 w-3.5" />
                {typeMeta[message.type]?.label}
              </span>
              {(message.priority === 'high' || message.priority === 'urgent') && (
                <span className="inline-flex h-7 items-center rounded-full border border-orange-400/40 bg-orange-500/15 px-2.5 text-[11.5px] font-medium text-white">
                  Urgent
                </span>
              )}
              {message.requires_acknowledgement && (
                <span className="inline-flex h-7 items-center rounded-full border border-amber-400/70 bg-[hsl(0_0%_14%)] px-2.5 text-[11.5px] font-medium text-white">
                  Must acknowledge
                </span>
              )}
              {message.is_pinned && (
                <span className="inline-flex h-7 items-center gap-1 rounded-full border border-white/[0.14] bg-white/[0.06] px-2.5 text-[11.5px] font-medium text-white">
                  <Pin className="h-3 w-3" /> Pinned
                </span>
              )}
            </div>
            <h2 className="text-[17px] font-semibold leading-snug text-white">{message.title}</h2>
            <p className="mt-2 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-white">
              {message.content}
            </p>
            {(message.attachments?.length ?? 0) > 0 && (
              <div className="mt-3">
                <AttachmentGrid attachments={message.attachments ?? []} urls={urls} />
              </div>
            )}
            <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-white/[0.08] pt-2.5 text-[12px] text-white">
              <span>
                {message.sent_by_name || 'Office'} · {timeLabel(message.created_at)}
              </span>
              {mode === 'worker' && message.requires_acknowledgement && ackedAt && (
                <span className="inline-flex items-center gap-1 font-medium text-emerald-300">
                  <CheckCheck className="h-3.5 w-3.5" />
                  You acknowledged at {timeLabel(ackedAt)}
                </span>
              )}
            </div>
          </article>

          {replies.isLoading && (
            <div className="flex justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          )}

          {!replies.isLoading && list.length === 0 && (
            <p className="px-6 py-4 text-center text-[13px] leading-relaxed text-white">
              {mode === 'worker'
                ? 'Questions about this? Reply below. It goes to the office.'
                : 'Replies from the team will appear here. Reply to everyone, or tap someone’s message to answer just them.'}
            </p>
          )}

          {list.map((r) => {
            const d = dayLabel(r.created_at);
            const sep = d !== lastDay;
            lastDay = d;
            const mine = mode === 'office' ? r.author_kind === 'office' : r.author_kind === 'worker';
            const atts = Array.isArray(r.attachments) ? r.attachments : [];
            const privateTo =
              r.author_kind === 'office' && r.thread_employee_id
                ? mode === 'office'
                  ? nameOf.get(r.thread_employee_id)?.name || 'one person'
                  : 'you'
                : null;

            // Ticks for my own bubbles.
            let tick: ReactNode = null;
            if (mine) {
              if (isPending(r)) {
                tick = <Clock className="h-3.5 w-3.5" aria-label="Sending" />;
              } else if (mode === 'worker') {
                const seen = !!officeSeenAt && officeSeenAt >= r.created_at;
                tick = seen ? (
                  <span className="inline-flex items-center gap-0.5">
                    <CheckCheck className="h-3.5 w-3.5" /> Seen
                  </span>
                ) : (
                  <Check className="h-3.5 w-3.5" aria-label="Sent" />
                );
              } else if (r.thread_employee_id) {
                const p = nameOf.get(r.thread_employee_id);
                const seen = !!p?.last_seen_at && p.last_seen_at >= r.created_at;
                tick = seen ? (
                  <span className="inline-flex items-center gap-0.5">
                    <CheckCheck className="h-3.5 w-3.5" /> Seen
                  </span>
                ) : (
                  <Check className="h-3.5 w-3.5" aria-label="Sent" />
                );
              } else if (activePeople.length > 0) {
                const n = activePeople.filter(
                  (p) => !!p.last_seen_at && p.last_seen_at >= r.created_at
                ).length;
                tick = (
                  <span className="inline-flex items-center gap-0.5">
                    {n === activePeople.length ? (
                      <CheckCheck className="h-3.5 w-3.5" />
                    ) : (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    Seen by {n} of {activePeople.length}
                  </span>
                );
              }
            }

            const showName =
              !mine || (mode === 'office' && r.author_user_id && r.author_user_id !== user?.id);
            const authorName =
              r.author_name ||
              (r.author_kind === 'worker' && r.author_employee_id
                ? nameOf.get(r.author_employee_id)?.name
                : null) ||
              (r.author_kind === 'office' ? 'Office' : 'Team member');

            const bubble = (
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl px-3.5 py-2.5 sm:max-w-[75%]',
                  mine
                    ? 'rounded-br-md bg-elec-yellow text-black'
                    : 'rounded-bl-md border border-white/[0.08] bg-[hsl(0_0%_15%)] text-white'
                )}
              >
                {showName && (
                  <p
                    className={cn(
                      'mb-0.5 text-[12px] font-semibold',
                      mine ? 'text-black' : 'text-elec-yellow'
                    )}
                  >
                    {authorName}
                  </p>
                )}
                {privateTo && (
                  <p
                    className={cn(
                      'mb-1 inline-flex items-center gap-1 text-[11.5px] font-medium',
                      mine ? 'text-black' : 'text-white'
                    )}
                  >
                    <Lock className="h-3 w-3" />
                    {mode === 'office' ? `Only ${privateTo}` : 'Just to you'}
                  </p>
                )}
                {r.body && (
                  <p className="whitespace-pre-wrap break-words text-[15px] leading-snug">{r.body}</p>
                )}
                {atts.length > 0 && (
                  <div className={cn(r.body && 'mt-2')}>
                    <AttachmentGrid attachments={atts} urls={urls} tone={mine ? 'light' : 'dark'} />
                  </div>
                )}
                <div
                  className={cn(
                    'mt-1 flex items-center justify-end gap-1.5 text-[11px] tabular-nums',
                    mine ? 'text-black' : 'text-white'
                  )}
                >
                  <span>{timeLabel(r.created_at)}</span>
                  {tick}
                </div>
              </div>
            );

            return (
              <Fragment key={r.id}>
                {sep && <DaySeparator label={d} />}
                <div className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
                  {mode === 'office' && r.author_kind === 'worker' && r.author_employee_id ? (
                    <button
                      type="button"
                      onClick={() => {
                        setToEmployee(r.author_employee_id);
                        textRef.current?.focus();
                      }}
                      className="max-w-full text-left touch-manipulation"
                      aria-label={`Reply to ${authorName} only`}
                    >
                      {bubble}
                    </button>
                  ) : (
                    bubble
                  )}
                </div>
              </Fragment>
            );
          })}
        </div>
      </div>

      {/* Composer */}
      <div
        className="shrink-0 border-t border-white/[0.08] bg-[hsl(0_0%_8%)] px-3 pt-2 sm:px-5"
        style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
      >
        <div className="mx-auto max-w-3xl">
          {ackPending && (
            <div className="mb-2 flex items-center gap-3 rounded-2xl border border-amber-400/40 bg-[hsl(0_0%_13%)] p-2.5 pl-3.5">
              <p className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-white">
                The office needs you to read and acknowledge this.
              </p>
              <button
                type="button"
                onClick={handleAck}
                disabled={ack.isPending}
                className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation disabled:bg-white/[0.12] disabled:text-white"
              >
                {ack.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCheck className="h-4 w-4" />
                )}
                Acknowledge
              </button>
            </div>
          )}

          {mode === 'office' && (
            <div className="mb-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowTo(true)}
                className={cn(
                  'inline-flex h-11 min-w-0 items-center gap-1.5 rounded-full border px-3 text-[12.5px] font-medium text-white touch-manipulation',
                  toEmployee
                    ? 'border-amber-400/70 bg-[hsl(0_0%_14%)]'
                    : 'border-white/[0.12] bg-white/[0.06]'
                )}
              >
                {toEmployee ? <Lock className="h-3.5 w-3.5 shrink-0" /> : null}
                <span className="truncate">
                  {toEmployee
                    ? `Only ${nameOf.get(toEmployee)?.name ?? 'one person'} will see this`
                    : `To everyone on this message (${activePeople.length || people.length})`}
                </span>
              </button>
              {toEmployee && (
                <button
                  type="button"
                  onClick={() => setToEmployee(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.06] touch-manipulation"
                  aria-label="Reply to everyone instead"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              )}
            </div>
          )}

          <PendingAttachments items={picker.items} onRemove={picker.remove} />

          <div className="flex items-end gap-2">
            <input
              ref={picker.inputRef}
              type="file"
              accept="image/*,application/pdf"
              multiple
              className="hidden"
              onChange={(e) => {
                void picker.addFiles(e.target.files);
                e.target.value = '';
              }}
            />
            <button
              type="button"
              onClick={picker.open}
              disabled={picker.full || !firmId}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/[0.08] touch-manipulation hover:bg-white/[0.12] disabled:opacity-40"
              aria-label="Attach a photo or PDF"
            >
              <Paperclip className="h-5 w-5 text-white" />
            </button>
            <textarea
              ref={textRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && canHoverPointer()) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              rows={1}
              maxLength={4000}
              placeholder={
                mode === 'worker'
                  ? 'Reply to the office…'
                  : toEmployee
                    ? 'Private reply…'
                    : 'Reply to everyone…'
              }
              className="min-h-[44px] flex-1 resize-none rounded-[22px] border border-white/[0.12] bg-white/[0.06] px-4 py-[10px] text-[16px] leading-[22px] text-white placeholder:text-white/50 caret-elec-yellow focus:border-elec-yellow/70 focus:outline-none touch-manipulation"
              aria-label="Reply"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-elec-yellow text-black touch-manipulation disabled:bg-white/[0.1] disabled:text-white"
              aria-label="Send"
            >
              {sendReply.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <SendHorizontal className="h-5 w-5" />
              )}
            </button>
          </div>
          {mode === 'worker' && (
            <p className="mt-1.5 px-1 text-[11.5px] text-white">
              Your replies go to the office only, not the rest of the team.
            </p>
          )}
        </div>
      </div>

      {mode === 'office' && (
        <FormSheet
          open={showTo}
          onOpenChange={setShowTo}
          eyebrow="Reply to"
          title="Who should see this reply?"
          description="A private reply is seen by that person and the office only."
        >
          <div className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.1]">
            <ToRow
              label="Everyone on this message"
              sub={`${activePeople.length} ${activePeople.length === 1 ? 'person' : 'people'}`}
              on={!toEmployee}
              onClick={() => {
                setToEmployee(null);
                setShowTo(false);
              }}
            />
            {activePeople.map((p) => (
              <ToRow
                key={p.employee_id}
                label={p.name}
                sub="Only them"
                on={toEmployee === p.employee_id}
                onClick={() => {
                  setToEmployee(p.employee_id);
                  setShowTo(false);
                }}
              />
            ))}
          </div>
        </FormSheet>
      )}
    </div>
  );
}

function DaySeparator({ label }: { label: string }) {
  return (
    <div className="flex justify-center py-1">
      <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[11.5px] font-medium text-white">
        {label}
      </span>
    </div>
  );
}

function ToRow({
  label,
  sub,
  on,
  onClick,
}: {
  label: string;
  sub: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[52px] w-full items-center gap-3 bg-white/[0.03] px-4 text-left touch-manipulation hover:bg-white/[0.06]"
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14.5px] font-medium text-white">{label}</span>
        <span className="block text-[12px] text-white">{sub}</span>
      </span>
      <span
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full border',
          on ? 'border-elec-yellow bg-elec-yellow' : 'border-white/30'
        )}
      >
        {on && <Check className="h-4 w-4 text-black" />}
      </span>
    </button>
  );
}
