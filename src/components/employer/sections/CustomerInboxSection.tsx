/**
 * Customer inbox (ELE-2070): every conversation with the firm's customers in
 * one list, newest first, across texts, WhatsApp, email and the client
 * portal.
 *
 * Desktop: two panes, the conversations on the left and the open thread on
 * the right with its composer pinned. Phone: the list, and a tap opens the
 * thread full screen (back returns to the list, the browser back too).
 */
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { format, isThisWeek, isToday, isYesterday, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  HeroActions,
  HeroPrimary,
  Initials,
  PlainEmpty,
  Row,
  SearchField,
  Segments,
  StatusPill,
  frameClass,
  panel,
} from '@/components/employer/pageParts/PageParts';
import { FormSheet } from '@/components/forms/FormSheet';
import { PageHelpButton, HowItWorks, type PageHelpContent } from '@/components/hub/PageHelp';
import { CustomerThreadPane } from '@/components/employer/inbox/CustomerConversationCard';
import { useClients } from '@/hooks/useEmployerClients';
import {
  CHANNEL_LABEL,
  useFirmCustomerInbox,
  useFirmMessaging,
  type InboxThread,
} from '@/hooks/useCustomerInbox';

const HELP: PageHelpContent = {
  id: 'employer-customer-inbox',
  title: 'Customer inbox',
  what: 'Every message with your customers in one place: texts, WhatsApp, email replies and messages from their portal page.',
  steps: [
    {
      title: 'Read and reply',
      body: 'Open a conversation and reply on Text, WhatsApp, Email or Portal. Templates fill in their name, the job and the date for you.',
    },
    {
      title: 'Replies ring the bell',
      body: 'When a customer writes back, the office bell rings and the conversation moves to the top here.',
    },
    {
      title: 'Opt-outs are kept',
      body: 'If a customer replies STOP, nothing more goes to them on that channel until they reply START. You can also mark it yourself.',
    },
    {
      title: 'Test mode',
      body: 'Until texting is switched on for your firm, messages are saved but not sent, so you can try everything safely.',
    },
  ],
};

type Filter = 'all' | 'waiting';

/** "14:05", "Yesterday", "Tue", "3 Oct". */
const when = (iso: string) => {
  const d = parseISO(iso);
  if (isToday(d)) return format(d, 'HH:mm');
  if (isYesterday(d)) return 'Yesterday';
  if (isThisWeek(d, { weekStartsOn: 1 })) return format(d, 'EEE');
  return format(d, 'd MMM');
};

export function CustomerInboxSection() {
  const inbox = useFirmCustomerInbox();
  const threads = useMemo(() => inbox.data ?? [], [inbox.data]);
  const { data: settings } = useFirmMessaging();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [picking, setPicking] = useState(false);
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const desktop = useMediaQuery('(min-width: 1024px)');

  const waiting = threads.filter((t) => t.unread > 0);
  const q = search.trim().toLowerCase();
  const shown = (filter === 'waiting' ? waiting : threads).filter(
    (t) =>
      !q ||
      t.customer_name.toLowerCase().includes(q) ||
      t.last_message.toLowerCase().includes(q) ||
      (t.address ?? '').toLowerCase().includes(q)
  );

  // The open conversation lives in the address (?thread=), so the phone's
  // back gesture closes it. A client with no messages yet (New message) is
  // carried by name in ?name= until the first message lands.
  const threadParam = params.get('thread');
  const firstId = threads.find((t) => t.customer_id)?.customer_id ?? null;
  const activeId = threadParam ?? (desktop ? firstId : null);
  const activeName =
    threads.find((t) => t.customer_id === activeId)?.customer_name ?? params.get('name');

  const open = (id: string, name?: string) => {
    const next = new URLSearchParams(params);
    next.set('thread', id);
    if (name && !threads.some((t) => t.customer_id === id)) next.set('name', name);
    else next.delete('name');
    // On a phone the thread is a screen of its own: push, so back closes it.
    setParams(next, { replace: desktop || !!threadParam, state: { inboxThread: true } });
  };

  const close = () => {
    if ((location.state as { inboxThread?: boolean } | null)?.inboxThread) {
      navigate(-1);
      return;
    }
    const next = new URLSearchParams(params);
    next.delete('thread');
    next.delete('name');
    setParams(next, { replace: true });
  };

  const openClient = (id: string) => setParams({ section: 'clients', client: id, tab: 'messages' });

  // Phone thread: full screen, so the page behind must not scroll.
  const phoneThread = !desktop && !!activeId;
  useEffect(() => {
    if (!phoneThread) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [phoneThread]);

  const headline = inbox.isLoading
    ? 'Loading your messages.'
    : inbox.isError
      ? "Your messages didn't load."
      : waiting.length > 0
        ? `${waiting.length} client${waiting.length === 1 ? '' : 's'} waiting on a reply.`
        : threads.length > 0
          ? 'Nobody waiting on a reply.'
          : 'No customer messages yet.';

  const usageLine = settings
    ? `${settings.live ? 'Live' : 'Test mode'} · ${settings.used_this_month} of ${settings.monthly_allowance} credits used this month`
    : null;
  const usageTone =
    settings && settings.monthly_allowance > 0
      ? settings.used_this_month >= settings.monthly_allowance
        ? 'text-red-400'
        : settings.used_this_month >= settings.monthly_allowance * 0.8
          ? 'text-elec-yellow'
          : 'text-white'
      : 'text-white';

  const list = (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 space-y-3 border-b border-white/[0.07] px-4 py-3 sm:px-5">
        <Segments
          items={[
            { value: 'all', label: 'All', count: threads.length },
            { value: 'waiting', label: 'Waiting on you', count: waiting.length },
          ]}
          value={filter}
          onChange={setFilter}
          className="sm:w-full [&>button]:sm:flex-1"
        />
        {threads.length > 6 && (
          <SearchField value={search} onChange={setSearch} placeholder="Search conversations" />
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        {inbox.isLoading ? (
          <div className="p-4 sm:p-5">
            <LoadingBlocks />
          </div>
        ) : inbox.isError ? (
          <PlainEmpty
            bare
            stacked
            text="Your conversations didn't load."
            action="Try again"
            onAction={() => inbox.refetch()}
          />
        ) : shown.length === 0 ? (
          <PlainEmpty
            bare
            stacked
            text={
              q
                ? 'No conversation matches that.'
                : filter === 'waiting'
                  ? 'Nobody is waiting on a reply.'
                  : 'When you message a customer, or one writes to you, the conversation shows here.'
            }
          />
        ) : (
          <div className="divide-y divide-white/[0.07]">
            {shown.map((t) => (
              <ThreadRow
                key={t.customer_id ?? t.address ?? t.last_at}
                t={t}
                active={desktop && !!t.customer_id && t.customer_id === activeId}
                onOpen={t.customer_id ? () => open(t.customer_id!, t.customer_name) : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {usageLine && (
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/[0.07] px-4 sm:px-5">
          <p className={cn('min-w-0 py-2 text-[12.5px] leading-snug', usageTone)}>{usageLine}</p>
          <button
            type="button"
            onClick={() => setParams({ section: 'settings', open: 'messaging' })}
            className="h-11 shrink-0 text-[13px] font-semibold text-elec-yellow touch-manipulation"
          >
            Settings
          </button>
        </div>
      )}
    </div>
  );

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Customer inbox"
        description={headline}
        actions={
          <HeroActions>
            <HeroPrimary onClick={() => setPicking(true)}>New message</HeroPrimary>
            <PageHelpButton help={HELP} askContext={{ page: 'customer-inbox' }} />
          </HeroActions>
        }
      />
      <HowItWorks help={HELP} askContext={{ page: 'customer-inbox' }} />

      {desktop ? (
        <section
          className={cn(
            panel,
            'grid h-[calc(100dvh-20rem)] min-h-[540px] max-h-[860px] grid-cols-[minmax(320px,400px)_minmax(0,1fr)] overflow-hidden'
          )}
        >
          <div className="flex min-h-0 flex-col border-r border-white/[0.07]">{list}</div>
          <div className="min-h-0">
            {activeId ? (
              <CustomerThreadPane
                key={activeId}
                customerId={activeId}
                customerName={activeName}
                onOpenClient={() => openClient(activeId)}
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
                <p className="max-w-sm text-[15px] leading-relaxed text-white">
                  {inbox.isLoading
                    ? 'Loading your conversations.'
                    : threads.length === 0
                      ? 'No conversations yet. Use New message to write to a client.'
                      : 'Pick a conversation on the left.'}
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className={cn(panel, 'flex flex-col overflow-hidden')}>{list}</section>
      )}

      {phoneThread &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeName ?? 'Conversation'}
            className="fixed inset-0 z-[60] flex h-[100dvh] flex-col bg-background"
          >
            <CustomerThreadPane
              key={activeId!}
              customerId={activeId!}
              customerName={activeName}
              onBack={close}
              onOpenClient={() => openClient(activeId!)}
            />
          </div>,
          document.body
        )}

      <NewMessageSheet
        open={picking}
        onOpenChange={setPicking}
        onPick={(id, name) => {
          setPicking(false);
          setFilter('all');
          open(id, name);
        }}
      />
    </PageFrame>
  );
}

function ThreadRow({
  t,
  active,
  onOpen,
}: {
  t: InboxThread;
  active: boolean;
  onOpen?: () => void;
}) {
  const unread = t.unread > 0;
  const body = (
    <>
      <Initials name={t.customer_name} text={t.customer_id ? undefined : '#'} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="min-w-0 flex-1 truncate text-[15px] font-semibold leading-snug text-white">
            {t.customer_name}
          </p>
          <span
            className={cn(
              'shrink-0 text-[12px] tabular-nums',
              unread ? 'font-semibold text-elec-yellow' : 'text-white'
            )}
          >
            {when(t.last_at)}
          </span>
        </div>
        <div className="mt-0.5 flex items-center gap-2">
          <p
            className={cn(
              'min-w-0 flex-1 truncate text-[13px] leading-snug text-white',
              unread && 'font-semibold'
            )}
          >
            {t.last_direction === 'out' ? 'You: ' : ''}
            {t.last_message}
          </p>
          {unread ? (
            <span className="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-elec-yellow px-1.5 text-[11px] font-bold tabular-nums text-black">
              {t.unread}
            </span>
          ) : null}
        </div>
        <p className="mt-0.5 text-[12px] leading-snug text-white">
          {CHANNEL_LABEL[t.last_channel]}
          {!t.customer_id && ' · Not a client yet'}
        </p>
      </div>
    </>
  );
  const cls = cn(
    'flex w-full min-h-[76px] items-center gap-3 px-4 py-3 text-left sm:px-5',
    active && 'bg-white/[0.07]'
  );
  if (!onOpen) return <div className={cls}>{body}</div>;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-current={active ? 'true' : undefined}
      className={cn(
        cls,
        'touch-manipulation transition-colors hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-elec-yellow/60',
        active && 'hover:bg-white/[0.07]'
      )}
    >
      {body}
    </button>
  );
}

/** Pick a client to start a conversation with. */
function NewMessageSheet({
  open,
  onOpenChange,
  onPick,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onPick: (id: string, name: string) => void;
}) {
  const { data: clients = [], isLoading, isError, refetch } = useClients();
  const [q, setQ] = useState('');
  useEffect(() => {
    if (!open) setQ('');
  }, [open]);
  const s = q.trim().toLowerCase();
  const digits = s.replace(/\D/g, '');
  const shown = clients.filter(
    (c) =>
      !s ||
      c.name.toLowerCase().includes(s) ||
      (c.company_name ?? '').toLowerCase().includes(s) ||
      (c.email ?? '').toLowerCase().includes(s) ||
      (digits.length >= 3 && (c.phone ?? '').replace(/\D/g, '').includes(digits))
  );

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      title="New message"
      description="Pick the client. You choose text, WhatsApp, email or portal in the conversation."
      width="wide"
    >
      <div className="space-y-4">
        <SearchField
          value={q}
          onChange={setQ}
          placeholder="Search clients"
          className="lg:max-w-xl"
        />
        {isLoading ? (
          <LoadingBlocks />
        ) : isError ? (
          <PlainEmpty
            text="Your clients didn't load."
            action="Try again"
            onAction={() => refetch()}
          />
        ) : shown.length === 0 ? (
          <PlainEmpty
            text={
              clients.length === 0
                ? 'No clients yet. Add one in Clients first.'
                : 'No client matches that.'
            }
          />
        ) : (
          <div className={cn(panel, 'overflow-hidden')}>
            <div className="grid divide-y divide-white/[0.07] lg:grid-cols-2 lg:divide-y-0 xl:grid-cols-3">
              {shown.slice(0, 150).map((c) => {
                const reach = [c.phone, c.email].filter(Boolean).join(' · ');
                return (
                  <Row
                    key={c.id}
                    lead={<Initials name={c.name} />}
                    title={c.name}
                    detail={reach || 'No mobile or email yet'}
                    trailing={!reach ? <StatusPill>Portal only</StatusPill> : undefined}
                    chevron={false}
                    onClick={() => onPick(c.id, c.name)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </FormSheet>
  );
}

export default CustomerInboxSection;
