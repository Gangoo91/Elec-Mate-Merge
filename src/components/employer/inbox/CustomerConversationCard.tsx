/**
 * One conversation with a customer (ELE-2070): portal messages, texts,
 * WhatsApp and email in one thread.
 *
 *  - CustomerConversationCard: a panel on the client record (all their jobs)
 *    or a job sheet (that job only).
 *  - CustomerThreadPane: the Customer inbox's reading pane. It fills its
 *    container, the messages scroll and the composer stays pinned at the
 *    bottom (safe-area aware on a phone).
 *
 * Office, admins and the owner read and reply. Crew on the job see the job's
 * messages, read-only, when the firm allows it in Settings. The database
 * decides all of that; these components only draw what they are given.
 */
import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { format, isSameDay, isToday, isYesterday, parseISO } from 'date-fns';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Initials,
  PanelHead,
  StatusPill,
  panelShellClass,
} from '@/components/employer/pageParts/PageParts';
import {
  PrimaryButton,
  SecondaryButton,
  LoadingBlocks,
  textareaClass,
} from '@/components/employer/editorial';
import {
  CHANNEL_LABEL,
  TEMPLATE_LABEL,
  smsSegments,
  useCustomerConversation,
  useMarkConversationRead,
  usePreviewMessage,
  useSendCustomerMessage,
  useSetMessageOptOut,
  useSimulateCustomerReply,
  type Conversation,
  type ConversationMessage,
  type InboxChannel,
  type SendChannel,
  type TemplateKey,
  useFirmMessaging,
} from '@/hooks/useCustomerInbox';

const STATUS_WORD: Record<string, string> = {
  sandbox: 'Not sent, test mode',
  queued: 'Waiting to send',
  sending: 'Sending',
  sent: 'Sent',
  delivered: 'Delivered',
  failed: 'Did not send',
};

const TEMPLATES: TemplateKey[] = [
  'booking_confirmation',
  'on_my_way',
  'running_late',
  'invoice',
  'review_request',
];

const dayLabel = (d: Date) =>
  isToday(d)
    ? 'Today'
    : isYesterday(d)
      ? 'Yesterday'
      : format(d, d.getFullYear() === new Date().getFullYear() ? 'EEEE d MMMM' : 'd MMMM yyyy');

/* ── State shared by the card and the pane ──────────────────────────── */

function useConversationController(
  customerId: string | null | undefined,
  customerName: string | null | undefined,
  jobId: string | null | undefined
) {
  const query = useCustomerConversation(customerId, jobId);
  const conv = query.data;
  const { data: settings } = useFirmMessaging();
  const markRead = useMarkConversationRead();
  const send = useSendCustomerMessage();
  const preview = usePreviewMessage();
  const optOut = useSetMessageOptOut();
  const simulate = useSimulateCustomerReply();

  const [channel, setChannel] = useState<InboxChannel | null>(null);
  const [body, setBody] = useState('');
  const [template, setTemplate] = useState<TemplateKey | null>(null);
  const [testReply, setTestReply] = useState<string | null>(null);

  const messages = useMemo(() => conv?.messages ?? [], [conv?.messages]);
  const unread = messages.filter((m) => m.direction === 'in' && !m.read_at).length;
  const who = conv?.customer_name || customerName || 'the customer';
  const cid = conv?.customer_id ?? customerId ?? null;

  // A different client: start the composer afresh.
  useEffect(() => {
    setChannel(null);
    setBody('');
    setTemplate(null);
    setTestReply(null);
  }, [customerId, jobId]);

  // Channels this client can be reached on, in the order people reach for them.
  const options = useMemo(() => {
    if (!conv?.customer_id) return [] as { value: InboxChannel; label: string }[];
    const order: InboxChannel[] = ['sms', 'whatsapp', 'email', 'portal'];
    return order
      .filter((c) => conv.channels[c])
      .map((c) => ({ value: c, label: CHANNEL_LABEL[c] }));
  }, [conv]);

  useEffect(() => {
    if (!channel && options.length) {
      // Reply on the channel they last wrote on, else the first available.
      const lastIn = [...messages].reverse().find((m) => m.direction === 'in');
      const pick = options.find((o) => o.value === lastIn?.source)?.value ?? options[0].value;
      setChannel(pick);
    }
  }, [options, channel, messages]);

  // Seeing the thread counts as reading it (office only).
  useEffect(() => {
    if (cid && conv?.can_send && unread > 0 && !markRead.isPending) markRead.mutate(cid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid, unread, conv?.can_send]);

  const optedOut =
    !!channel && channel !== 'portal' && !!conv?.opted_out.includes(channel as SendChannel);
  const sandbox = conv ? !conv.live : true;
  const segments = channel === 'sms' ? smsSegments(body.trim()) : 0;
  const whatsappNeedsTemplate = channel === 'whatsapp' && !conv?.whatsapp_window_open && !template;
  const allowanceLeft = settings ? settings.monthly_allowance - settings.used_this_month : null;

  const fail = (title: string) => (e: unknown) =>
    toast({
      title,
      description: e instanceof Error ? e.message : 'Please try again.',
      variant: 'destructive',
    });

  const pickTemplate = async (key: TemplateKey) => {
    if (!cid) return;
    setTemplate(key);
    try {
      setBody(await preview.mutateAsync({ customerId: cid, key, jobId }));
    } catch (e) {
      fail("Couldn't fill in the template")(e);
    }
  };

  const doSend = async () => {
    const text = body.trim();
    if (!text || !channel || !cid) return;
    try {
      const r = await send.mutateAsync({
        customerId: cid,
        channel,
        body: text,
        jobId,
        templateKey: template,
      });
      setBody('');
      setTemplate(null);
      toast({
        title: r.sandbox
          ? 'Saved in test mode'
          : channel === 'portal'
            ? 'Sent to their portal'
            : 'Sent',
        description: r.sandbox
          ? 'Texting is not switched on yet, so nothing went to the customer.'
          : undefined,
      });
    } catch (e) {
      fail("Message didn't send")(e);
    }
  };

  const setOptOut = (out: boolean) => {
    if (!cid || !channel || channel === 'portal') return;
    optOut.mutate(
      { customerId: cid, channel: channel as SendChannel, optedOut: out },
      { onError: fail("Couldn't change that") }
    );
  };

  const doTestReply = async () => {
    if (!cid || !channel || channel === 'portal' || !testReply?.trim()) return;
    try {
      await simulate.mutateAsync({
        customerId: cid,
        channel: channel as SendChannel,
        body: testReply.trim(),
      });
      setTestReply(null);
    } catch (e) {
      fail("Couldn't add the test reply")(e);
    }
  };

  return {
    query,
    conv,
    settings,
    messages,
    unread,
    who,
    cid,
    options,
    channel,
    setChannel,
    body,
    setBody,
    template,
    setTemplate,
    testReply,
    setTestReply,
    optedOut,
    sandbox,
    segments,
    whatsappNeedsTemplate,
    allowanceLeft,
    pickTemplate,
    doSend,
    setOptOut,
    doTestReply,
    sending: send.isPending,
    previewing: preview.isPending,
    optOutPending: optOut.isPending,
    simulating: simulate.isPending,
  };
}

type Controller = ReturnType<typeof useConversationController>;

/* ── The thread ─────────────────────────────────────────────────────── */

function Thread({ c, showJob }: { c: Controller; showJob: boolean }) {
  const groups = useMemo(() => {
    const out: { day: Date; items: ConversationMessage[] }[] = [];
    for (const m of c.messages) {
      const d = parseISO(m.at);
      const last = out[out.length - 1];
      if (last && isSameDay(last.day, d)) last.items.push(m);
      else out.push({ day: d, items: [m] });
    }
    return out;
  }, [c.messages]);

  return (
    <div className="space-y-5">
      {groups.map((g) => (
        <div key={g.day.toISOString()} className="space-y-2">
          <div className="flex justify-center py-1">
            <span className="text-[12px] font-medium text-white">{dayLabel(g.day)}</span>
          </div>
          {g.items.map((m, i) => (
            <Bubble
              key={`${m.source}-${m.id}`}
              m={m}
              who={c.who}
              showJob={showJob}
              grouped={
                i > 0 &&
                g.items[i - 1].direction === m.direction &&
                g.items[i - 1].source === m.source
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function Bubble({
  m,
  who,
  showJob,
  grouped,
}: {
  m: ConversationMessage;
  who: string;
  showJob: boolean;
  grouped: boolean;
}) {
  const mine = m.direction === 'out';
  const failed = m.status === 'failed';
  const meta = [
    CHANNEL_LABEL[m.source],
    mine ? m.sender_name || 'Office' : null,
    format(parseISO(m.at), 'HH:mm'),
    mine && m.source !== 'portal' ? STATUS_WORD[m.status] : null,
  ]
    .filter(Boolean)
    .join(' · ');
  return (
    <div className={cn('flex', mine ? 'justify-end' : 'justify-start', grouped && '-mt-1')}>
      <div className={cn('flex max-w-[82%] flex-col', mine ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-3.5 py-2.5 text-[14.5px] leading-relaxed text-white',
            mine
              ? 'rounded-br-md bg-[hsl(0_0%_23%)]'
              : 'rounded-bl-md border border-white/[0.1] bg-[hsl(0_0%_13%)]'
          )}
          aria-label={mine ? 'You' : who}
        >
          {showJob && m.job_title && (
            <p className="mb-1 text-[12px] font-semibold text-white">{m.job_title}</p>
          )}
          <p className="whitespace-pre-wrap break-words">{m.body}</p>
        </div>
        <p
          className={cn(
            'mt-1 px-1 text-[11.5px]',
            failed ? 'font-semibold text-red-400' : 'text-white'
          )}
        >
          {meta}
        </p>
      </div>
    </div>
  );
}

/* ── The composer ───────────────────────────────────────────────────── */

function Composer({ c, autoFocus }: { c: Controller; autoFocus?: boolean }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const canManage = !!c.settings?.can_manage;
  const ch = c.channel;
  const smsLike = !!ch && ch !== 'portal';

  // Grow with the text, up to about six lines.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 168)}px`;
  }, [c.body]);

  useEffect(() => {
    if (autoFocus) ref.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const hints: ReactNode[] = [];
  if (c.whatsappNeedsTemplate)
    hints.push('WhatsApp needs a template until they reply. Pick one above.');
  if (c.template === 'invoice' && /:\s*$/.test(c.body.trim()))
    hints.push(
      <span key="inv" className="text-red-400">
        No unpaid invoice for this client, so there is no link to add.
      </span>
    );
  if (ch === 'sms' && c.body.trim())
    hints.push(
      `${c.segments} text${c.segments === 1 ? '' : 's'} of credit${
        c.allowanceLeft !== null ? `, ${Math.max(0, c.allowanceLeft)} left this month` : ''
      }`
    );
  if (ch === 'portal') hints.push('Shows on their portal page.');
  else if (c.sandbox) hints.push('Test mode: saved here, not sent.');

  const showMenu = smsLike && (!c.optedOut || (c.sandbox && canManage));

  return (
    <div className="space-y-2.5">
      {/* Channel and the quieter actions */}
      <div className="flex items-center gap-2">
        <div
          role="tablist"
          aria-label="Send as"
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {c.options.map((o) => {
            const on = o.value === ch;
            const out = o.value !== 'portal' && c.conv?.opted_out.includes(o.value as SendChannel);
            return (
              <button
                key={o.value}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => c.setChannel(o.value)}
                className={cn(
                  'h-11 shrink-0 whitespace-nowrap rounded-full px-4 text-[13px] font-semibold touch-manipulation transition-colors',
                  on ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06]',
                  out && !on && 'text-red-400'
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>
        {showMenu && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="More"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white touch-manipulation hover:bg-white/[0.06]"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[15rem]">
              {!c.optedOut && (
                <DropdownMenuItem
                  className="min-h-11 text-[14px]"
                  disabled={c.optOutPending}
                  onSelect={() => c.setOptOut(true)}
                >
                  They asked us to stop {CHANNEL_LABEL[ch!].toLowerCase()}s
                </DropdownMenuItem>
              )}
              {c.sandbox && canManage && (
                <DropdownMenuItem
                  className="min-h-11 text-[14px]"
                  onSelect={() => c.setTestReply('')}
                >
                  Test a reply from {c.who.split(' ')[0]}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {c.optedOut ? (
        <div className="flex flex-col gap-2 rounded-xl border border-red-500/40 px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13.5px] leading-snug text-white">
            {c.who} has opted out of {CHANNEL_LABEL[ch!].toLowerCase()} messages.
          </p>
          <SecondaryButton onClick={() => c.setOptOut(false)} disabled={c.optOutPending}>
            They asked to opt back in
          </SecondaryButton>
        </div>
      ) : (
        <>
          {smsLike && (
            <div
              aria-label="Templates"
              className="-mx-1 flex gap-2 overflow-x-auto px-1 [scrollbar-width:none] sm:flex-wrap [&::-webkit-scrollbar]:hidden"
            >
              {TEMPLATES.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => c.pickTemplate(k)}
                  aria-pressed={c.template === k}
                  disabled={c.previewing}
                  className={cn(
                    'h-11 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-[13px] font-medium touch-manipulation transition-colors',
                    c.template === k
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-white/[0.14] text-white hover:bg-white/[0.06]'
                  )}
                >
                  {TEMPLATE_LABEL[k]}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2">
            <textarea
              ref={ref}
              value={c.body}
              onChange={(e) => {
                c.setBody(e.target.value);
                if (!e.target.value) c.setTemplate(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  void c.doSend();
                }
              }}
              placeholder={`Message ${c.who}`}
              aria-label={`Message ${c.who}`}
              rows={1}
              maxLength={ch === 'email' || ch === 'portal' ? 4000 : 1000}
              className={cn(
                textareaClass,
                'min-h-[44px] flex-1 resize-none rounded-2xl py-2.5 leading-snug'
              )}
            />
            <PrimaryButton
              onClick={c.doSend}
              disabled={!c.body.trim() || c.sending || c.whatsappNeedsTemplate}
              className="h-11 shrink-0 px-5"
            >
              {c.sending ? 'Sending' : 'Send'}
            </PrimaryButton>
          </div>
        </>
      )}

      {hints.length > 0 && !c.optedOut && (
        <p className="px-1 text-[12px] leading-snug text-white">
          {hints.map((h, i) => (
            <span key={i}>
              {i > 0 && ' · '}
              {h}
            </span>
          ))}
        </p>
      )}

      {c.testReply !== null && (
        <div className="space-y-2 rounded-xl border border-white/[0.14] p-3">
          <p className="text-[12.5px] leading-snug text-white">
            Test mode only. Type what {c.who} might reply; it lands in this thread as if they wrote
            back, and rings the office bell.
          </p>
          <textarea
            value={c.testReply}
            onChange={(e) => c.setTestReply(e.target.value)}
            rows={2}
            placeholder="Yes, that's fine, thanks"
            className={textareaClass}
          />
          <div className="flex gap-2">
            <PrimaryButton
              onClick={c.doTestReply}
              disabled={!c.testReply.trim() || c.simulating}
              className="flex-1 sm:flex-none"
            >
              Add test reply
            </PrimaryButton>
            <SecondaryButton onClick={() => c.setTestReply(null)}>Cancel</SecondaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

/** What sits where the composer would, when there is nothing to send with. */
function ComposerNote({ c, jobId }: { c: Controller; jobId?: string | null }) {
  const conv = c.conv as Conversation | undefined;
  if (!conv) return null;
  if (!conv.can_send)
    return <p className="text-[13px] text-white">The office replies to the customer.</p>;
  if (c.options.length === 0)
    return (
      <p className="text-[13px] leading-snug text-white">
        {conv.customer_id
          ? `Add a mobile number or email for ${c.who} to message them from here.`
          : jobId
            ? 'Link this job to a client to message them from here.'
            : 'This number is not on a client yet.'}
      </p>
    );
  return null;
}

/* ── On a client record or a job sheet ─────────────────────────────── */

export function CustomerConversationCard({
  customerId,
  customerName,
  jobId,
  autoFocus,
  title = 'Messages',
}: {
  customerId?: string | null;
  customerName?: string | null;
  /** On a job sheet: only this job's messages, and replies are filed on it. */
  jobId?: string | null;
  autoFocus?: boolean;
  title?: string;
}) {
  const c = useConversationController(customerId, customerName, jobId);
  const threadRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight });
  }, [c.messages.length]);

  useEffect(() => {
    if (autoFocus) cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [autoFocus]);

  // Crew without access, or a job with no client: nothing to show.
  if (c.query.error && !c.conv) return null;

  return (
    <div ref={cardRef} className="scroll-mt-4" data-help="clients.messages">
      <section className={panelShellClass}>
        <PanelHead
          title={title}
          meta={
            c.unread > 0 ? (
              <StatusPill tone="volt">{c.unread} new</StatusPill>
            ) : c.sandbox && c.conv?.can_send ? (
              <StatusPill>Test mode</StatusPill>
            ) : undefined
          }
        />
        <div className="px-4 py-4 sm:px-5">
          {c.query.isLoading ? (
            <LoadingBlocks />
          ) : c.messages.length === 0 ? (
            <p className="text-[14px] leading-relaxed text-white">
              {jobId
                ? 'No messages about this job yet.'
                : `No messages with ${c.who} yet. Texts, WhatsApp, email and portal messages all land here.`}
            </p>
          ) : (
            <div
              ref={threadRef}
              className="max-h-[26rem] overflow-y-auto overscroll-contain pr-1"
              aria-live="polite"
            >
              <Thread c={c} showJob={!jobId} />
            </div>
          )}
        </div>
        {c.conv?.can_send && c.options.length > 0 ? (
          <div className="border-t border-white/[0.07] px-4 py-3.5 sm:px-5">
            <Composer c={c} />
          </div>
        ) : (
          c.conv && (
            <div className="border-t border-white/[0.07] px-4 py-3.5 sm:px-5">
              <ComposerNote c={c} jobId={jobId} />
            </div>
          )
        )}
      </section>
    </div>
  );
}

/* ── The Customer inbox's reading pane ─────────────────────────────── */

export function CustomerThreadPane({
  customerId,
  customerName,
  onBack,
  onOpenClient,
  className,
}: {
  customerId: string;
  customerName?: string | null;
  /** Phone: back to the list. */
  onBack?: () => void;
  onOpenClient?: () => void;
  className?: string;
}) {
  const c = useConversationController(customerId, customerName, null);
  const threadRef = useRef<HTMLDivElement>(null);

  // Open at the newest message, and stay there while the thread or the
  // composer changes size (a template filling in, the keyboard opening),
  // unless the reader has scrolled up to read back.
  const pinned = useRef(true);
  const lastIsMine = c.messages[c.messages.length - 1]?.direction === 'out';
  useLayoutEffect(() => {
    pinned.current = true;
  }, [customerId]);
  useEffect(() => {
    const el = threadRef.current;
    if (!el) return;
    // Something just sent: show it.
    if (lastIsMine) pinned.current = true;
    const toEnd = () => {
      if (pinned.current) el.scrollTop = el.scrollHeight;
    };
    toEnd();
    const raf = requestAnimationFrame(toEnd);
    const ro = new ResizeObserver(toEnd);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    // Only the reader's own scrolling unpins (layout shifts fire scroll too).
    let user = false;
    const touched = () => {
      user = true;
    };
    const onScroll = () => {
      if (!user) return;
      pinned.current = el.scrollHeight - el.scrollTop - el.clientHeight < 48;
    };
    const opts = { passive: true } as const;
    el.addEventListener('wheel', touched, opts);
    el.addEventListener('touchstart', touched, opts);
    el.addEventListener('keydown', touched);
    el.addEventListener('scroll', onScroll, opts);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener('wheel', touched);
      el.removeEventListener('touchstart', touched);
      el.removeEventListener('keydown', touched);
      el.removeEventListener('scroll', onScroll);
    };
  }, [c.messages.length, c.query.isLoading, customerId, lastIsMine]);

  const phone = c.conv?.phone ?? null;
  const email = c.conv?.email ?? null;

  return (
    <div className={cn('flex h-full min-h-0 flex-col', className)}>
      <header className="flex min-h-[64px] shrink-0 items-center gap-3 border-b border-white/[0.07] px-2 pt-[env(safe-area-inset-top)] sm:px-4 lg:px-5">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to conversations"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white touch-manipulation hover:bg-white/[0.06]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <Initials name={c.who} />
        <div className="min-w-0 flex-1 py-2">
          <p className="text-[15.5px] font-semibold leading-snug text-white">{c.who}</p>
          {c.conv && (
            <p className="truncate text-[12.5px] leading-snug text-white">
              {phone || email || 'No mobile or email yet'}
              {phone && email && <span className="hidden sm:inline"> · {email}</span>}
            </p>
          )}
        </div>
        {c.sandbox && c.conv?.can_send && (
          <span className="hidden sm:inline-flex">
            <StatusPill>Test mode</StatusPill>
          </span>
        )}
        {onOpenClient && (
          <button
            type="button"
            onClick={onOpenClient}
            className="h-11 shrink-0 rounded-full px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.06]"
          >
            Client record
          </button>
        )}
      </header>

      <div
        ref={threadRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-4 sm:px-5"
        aria-live="polite"
      >
        {c.query.isLoading ? (
          <LoadingBlocks />
        ) : c.query.error && !c.conv ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-[14px] text-white">Couldn't open this conversation.</p>
            <SecondaryButton onClick={() => c.query.refetch()}>Try again</SecondaryButton>
          </div>
        ) : c.messages.length === 0 ? (
          <div className="flex h-full items-center justify-center px-6 text-center">
            <p className="max-w-sm text-[14px] leading-relaxed text-white">
              No messages with {c.who} yet. Pick a template below or write your own.
            </p>
          </div>
        ) : (
          <Thread c={c} showJob />
        )}
      </div>

      <div className="shrink-0 border-t border-white/[0.07] bg-background px-3 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] sm:px-5">
        {c.conv?.can_send && c.options.length > 0 ? (
          <Composer c={c} />
        ) : (
          <div className="py-1">
            <ComposerNote c={c} />
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomerConversationCard;
