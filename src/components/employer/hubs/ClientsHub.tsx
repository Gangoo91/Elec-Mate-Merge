import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { useClientSummaries } from '@/hooks/useEmployerClients';
import { useFinanceSummary } from '@/hooks/useFinanceModel';
import {
  STAGE_LABEL,
  itemTitle,
  sourceLabel,
  useFrontDoor,
  type DoorItem,
} from '@/hooks/useFrontDoor';
import { useClientMessageInbox } from '@/hooks/useCustomerPortal';
import { useFirmCustomerInbox } from '@/hooks/useCustomerInbox';
import { useInvoices, useQuotes } from '@/hooks/useFinance';
import { useJobs } from '@/hooks/useJobs';
import { useTenders } from '@/hooks/useTenders';
import { useQuoteWinRate } from '@/hooks/useQuotesThatWin';
import { decidedCount, winRate } from '@/utils/winRate';
import { formatGBPCompact } from '@/lib/financeDefinitions';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { CLIENTS_HUB_HELP } from '@/components/employer/help/clients';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useReviewRequests } from '@/hooks/useReviewRequests';
import { ReviewRequestsSheet } from '@/components/employer/reviews/ReviewRequestsSheet';
import { AddEnquirySheet } from '@/components/employer/enquiries/AddEnquirySheet';
import {
  StatCards,
  SectionHead,
  ListPanel,
  PipelineBar,
  PageTiles,
  type IndexLink,
  type ListItem,
} from '@/components/employer/hubs/AreaPage';
import {
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  frameClass,
  plural,
} from '@/components/employer/pageParts/PageParts';
import { matePad, daysFromToday } from '@/components/employer/hubs/HubPanels';

interface ClientsHubProps {
  onNavigate: (section: Section) => void;
}

const ago = (iso: string) =>
  formatDistanceToNow(parseISO(iso), { addSuffix: true }).replace('about ', '');

/** How soon the customer wants it, in words, and whether that is a problem. */
const urgencyWords = (u: DoorItem['urgency']): { text: string; tone?: 'red' | 'yellow' } =>
  u === 'emergency'
    ? { text: 'Emergency', tone: 'red' }
    : u === 'soon'
      ? { text: 'Wants it soon', tone: 'yellow' }
      : u === 'flexible'
        ? { text: 'No rush' }
        : { text: 'To reply', tone: 'yellow' };

const footLink = 'h-11 -my-3 text-[13.5px] font-semibold text-elec-yellow touch-manipulation';

/**
 * Clients landing, on the area page template (10 Oct): key figures as cards,
 * the enquiries pipeline with the newest to reply to, the quotes waiting on
 * the customer, the top clients this year, then every page as a tile.
 */
export function ClientsHub({ onNavigate }: ClientsHubProps) {
  const navigate = useNavigate();
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = !!roleInfo?.canSeeMoney;
  const { data: clients = [], isLoading } = useClientSummaries();
  // Money figures come from the shared finance model so they match Finance,
  // Quotes & Invoices, Reports and Accounts exactly.
  const { data: money } = useFinanceSummary(null, null);
  // ELE-2094: Enquiries is the one front door (enquiries + older leads +
  // online bookings), cached by the Enquiries page.
  const { data: door } = useFrontDoor();
  const doorItems = useMemo(() => (door?.items ?? []).filter((i) => !i.is_test), [door]);
  const { data: inbox = [] } = useClientMessageInbox();
  // ELE-2070: texts, WhatsApp, email and portal in one list.
  const { data: customerInbox = [] } = useFirmCustomerInbox();
  const inboxWaiting = (customerInbox ?? []).filter((t) => t.unread > 0).length;
  const { data: reviews } = useReviewRequests();
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const { data: quotes = [] } = useQuotes();
  const { data: invoices = [] } = useInvoices();
  const { data: jobs = [] } = useJobs();
  const { data: tenders = [] } = useTenders();
  // The one win rate (src/utils/winRate.ts). The quotes figure is owner and
  // admins only (the RPC refuses anyone else), so office sees it on enquiries.
  const { data: quoteWin } = useQuoteWinRate(12, canSeeMoney);

  const actions = (
    <HeroActions>
      <HeroPrimary onClick={() => setAdding(true)}>New enquiry</HeroPrimary>
      <HeroSecondary onClick={() => onNavigate('leads')}>Enquiries</HeroSecondary>
      <PageHelpButton help={CLIENTS_HUB_HELP} askContext={{ page: 'clientshub' }} />
    </HeroActions>
  );

  // Open quote = sent, no answer yet, not invoiced (as get_finance_summary).
  const waitingQuotes = useMemo(
    () =>
      quotes
        .filter(
          (q) =>
            (q.status ?? '').toLowerCase() === 'sent' &&
            !q.converted_invoice_id &&
            !['accepted', 'accepted_pending_deposit', 'rejected', 'declined'].includes(
              (q.acceptance_status ?? 'pending').toLowerCase()
            )
        )
        .map((q) => ({ q, sent: (q.sent_date ?? q.created_at).slice(0, 10) }))
        .sort((a, b) => (a.sent < b.sent ? -1 : 1)),
    [quotes]
  );

  // To reply to: emergencies first, then newest.
  const toReply = useMemo(
    () =>
      doorItems
        .filter((i) => i.stage === 'new')
        .sort((a, b) => {
          const ua = a.urgency === 'emergency' ? 0 : 1;
          const ub = b.urgency === 'emergency' ? 0 : 1;
          return ua - ub || b.received_at.localeCompare(a.received_at);
        }),
    [doorItems]
  );

  // Top clients since 1 January: by value invoiced (owner and admins) or by
  // jobs (office), matched back to the client record by name to open it.
  const yearStart = `${new Date().getFullYear()}-01-01`;
  const topClients = useMemo(() => {
    const byName = new Map<string, (typeof clients)[number]>();
    for (const c of clients) {
      byName.set(c.name.trim().toLowerCase(), c);
      if (c.company_name) byName.set(c.company_name.trim().toLowerCase(), c);
    }
    const tally = new Map<string, { name: string; value: number; count: number }>();
    const add = (name: string, value: number) => {
      const key = name.trim().toLowerCase();
      if (!key || key === 'client') return;
      const t = tally.get(key) ?? { name: name.trim(), value: 0, count: 0 };
      t.value += value;
      t.count += 1;
      tally.set(key, t);
    };
    if (canSeeMoney) {
      for (const inv of invoices) {
        const st = (inv.status ?? '').toLowerCase();
        if (['draft', 'cancelled', 'void'].includes(st)) continue;
        if (String(inv.created_at).slice(0, 10) < yearStart) continue;
        add(inv.client ?? '', Number(inv.amount) || 0);
      }
    } else {
      for (const j of jobs) {
        if (j.is_template || j.status === 'Cancelled' || !j.client) continue;
        const d = String(j.start_date ?? j.created_at ?? '').slice(0, 10);
        if (!d || d < yearStart) continue;
        add(j.client, 0);
      }
    }
    return [...tally.entries()]
      .map(([key, t]) => ({ ...t, key, record: byName.get(key) }))
      .sort(
        (a, b) =>
          (canSeeMoney ? b.value - a.value : b.count - a.count) || a.name.localeCompare(b.name)
      )
      .slice(0, 5);
  }, [clients, invoices, jobs, canSeeMoney, yearStart]);

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Clients" description="Loading your clients." actions={actions} />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const urgent = toReply.filter((i) => i.urgency === 'emergency').length;
  const unreadThreads = (inbox ?? []).filter((t) => t.unread > 0).length;
  const unpaid = money?.outstandingCount ?? 0;
  const openLeads = doorItems.filter((i) =>
    ['new', 'open', 'quoted', 'job'].includes(i.stage)
  ).length;
  const fromQuotePage = doorItems.filter((i) => i.source === 'quote_page').length;
  const openTenders = tenders.filter((t) => t.status === 'Open' || t.status === 'Submitted').length;
  const reviewsOn = !!reviews?.settings?.enabled;

  /* ── The live line ─────────────────────────────────────────────── */

  const todo: string[] = [];
  if (toReply.length > 0)
    todo.push(
      `${plural(toReply.length, 'enquiry', 'enquiries')} to reply to${urgent > 0 ? ` (${urgent} urgent)` : ''}`
    );
  if (unreadThreads > 0) todo.push(`${plural(unreadThreads, 'client')} waiting on a reply`);
  if (inboxWaiting > 0) todo.push(`${plural(inboxWaiting, 'new conversation')} in the inbox`);
  if (unpaid > 0) todo.push(`${plural(unpaid, 'invoice')} unpaid`);
  const standing = `${plural(clients.length, 'client')} on record, ${
    waitingQuotes.length > 0 ? `${plural(waitingQuotes.length, 'quote')} out` : 'no quotes out'
  }`;
  const liveLine =
    clients.length === 0 && doorItems.length === 0
      ? 'No clients yet. Share your quote page or add your first enquiry.'
      : todo.length > 0
        ? `${todo.join(', ')}. ${standing}.`
        : `${standing}. Nothing waiting on you.`;

  /* ── Figures ───────────────────────────────────────────────────── */

  const oldestReply = toReply.length
    ? toReply.reduce((o, i) => (i.received_at < o.received_at ? i : o), toReply[0])
    : null;
  const waitingValue = waitingQuotes.reduce((n, { q }) => n + (Number(q.value) || 0), 0);
  const oldestQuoteDays = waitingQuotes.length ? -daysFromToday(waitingQuotes[0].sent) : 0;

  const doorWon = doorItems.filter((i) => i.stage === 'won').length;
  const doorLost = doorItems.filter((i) => i.stage === 'lost').length;
  const winCounts = canSeeMoney ? (quoteWin?.all ?? null) : { won: doorWon, lost: doorLost };
  const rate = winRate(winCounts);
  const decided = decidedCount(winCounts);

  /* ── Enquiries ─────────────────────────────────────────────────── */

  const stage = (keys: DoorItem['stage'][]) =>
    doorItems.filter((i) => keys.includes(i.stage)).length;
  const stages = (['new', 'open', 'quoted', 'job', 'won', 'lost'] as const).map((k) => ({
    key: k,
    label: STAGE_LABEL[k],
    count: stage([k]),
    onOpen: () => onNavigate('leads'),
  }));

  const openDoorItem = (i: DoorItem) =>
    navigate(
      i.kind === 'lead' && i.lead_id
        ? `/employer?section=leads&lead=${i.lead_id}`
        : `/employer?section=leads&enquiry=${i.enquiry_id ?? i.id}`
    );

  const replyRows: ListItem[] = toReply.slice(0, 4).map((i) => {
    const who = i.name || i.contact_name || i.customer_name || 'New enquiry';
    const u = urgencyWords(i.urgency);
    return {
      key: `door-${i.kind}-${i.id}`,
      title: itemTitle(i) === 'Enquiry' ? who : `${who} · ${itemTitle(i)}`,
      detail: [sourceLabel(i), `Came in ${ago(i.received_at)}`].join(' · '),
      status: u.text,
      tone: u.tone,
      onOpen: () => openDoorItem(i),
    };
  });

  /* ── Quotes waiting ────────────────────────────────────────────── */

  const quoteRows: ListItem[] = waitingQuotes.slice(0, 5).map(({ q, sent }) => {
    const days = -daysFromToday(sent);
    return {
      key: q.id,
      title: q.client || 'Customer',
      detail:
        [
          q.job_title || q.quote_number,
          canSeeMoney && q.value ? formatGBPCompact(Number(q.value)) : null,
        ]
          .filter(Boolean)
          .join(' · ') || undefined,
      status:
        days <= 0
          ? 'Sent today'
          : days >= 14
            ? `${days} days, chase`
            : `${plural(days, 'day')} waiting`,
      tone: days >= 14 ? ('yellow' as const) : undefined,
      onOpen: () => navigate(`/employer?section=quotes&quote=${q.id}`),
    };
  });

  /* ── Top clients ───────────────────────────────────────────────── */

  const clientRows: ListItem[] = topClients.map((c, n) => ({
    key: c.key,
    title: `${n + 1}. ${c.record ? c.record.company_name || c.record.name : c.name}`,
    detail: canSeeMoney
      ? [
          plural(c.count, 'invoice'),
          c.record && c.record.outstanding > 0
            ? `${formatGBPCompact(c.record.outstanding)} owed`
            : null,
        ]
          .filter(Boolean)
          .join(' · ')
      : c.record?.active_job_count
        ? `${plural(c.record.active_job_count, 'job')} on now`
        : undefined,
    status: canSeeMoney ? formatGBPCompact(c.value) : plural(c.count, 'job'),
    onOpen: () =>
      c.record
        ? navigate(`/employer?section=clients&client=${c.record.id}`)
        : onNavigate('clients'),
  }));

  /* ── Everything in Clients ─────────────────────────────────────── */

  const winLinks: IndexLink[] = [
    {
      title: 'Enquiries',
      detail:
        toReply.length > 0
          ? `${toReply.length} to reply to`
          : openLeads > 0
            ? 'All replied to'
            : 'Every way a customer gets in touch',
      problem: urgent > 0,
      value: openLeads > 0 ? `${openLeads} open` : undefined,
      onClick: () => onNavigate('leads'),
    },
    {
      title: 'Quote page',
      detail: 'Your own page and QR code',
      value: fromQuotePage > 0 ? plural(fromQuotePage, 'enquiry', 'enquiries') : undefined,
      onClick: () => onNavigate('quotepage'),
    },
    {
      title: 'Clients',
      detail: 'Jobs, quotes, invoices and balance per customer',
      value: clients.length > 0 ? `${clients.length.toLocaleString('en-GB')} on record` : undefined,
      onClick: () => onNavigate('clients'),
    },
    {
      title: 'Customer inbox',
      detail: inboxWaiting > 0 ? 'New messages waiting' : 'Texts, WhatsApp, email and portal',
      value: inboxWaiting > 0 ? `${inboxWaiting} new` : undefined,
      onClick: () => onNavigate('inbox'),
    },
    {
      title: 'Review requests',
      detail: !reviews
        ? 'One honest review after they pay'
        : reviewsOn
          ? `${reviews.stats.clicked_30} clicked in 30 days`
          : 'Off. Tap to turn on',
      value: reviewsOn ? `${reviews!.stats.asked_30} asked` : undefined,
      onClick: () => setReviewsOpen(true),
    },
  ];

  const moneyLinks: IndexLink[] = [
    {
      title: 'Quotes and invoices',
      detail: money
        ? unpaid > 0
          ? `${plural(unpaid, 'invoice')} unpaid`
          : 'Nothing outstanding'
        : 'Raise, send and chase',
      value:
        canSeeMoney && money && money.outstanding > 0
          ? `${formatGBPCompact(money.outstanding)} owed`
          : waitingQuotes.length > 0
            ? `${waitingQuotes.length} out`
            : undefined,
      onClick: () => onNavigate('quotes'),
    },
    {
      title: 'Tenders',
      detail: openTenders > 0 ? 'Open or submitted' : 'Estimating and bids for bigger work',
      value: openTenders > 0 ? `${openTenders} live` : undefined,
      onClick: () => onNavigate('tenders'),
    },
    {
      title: 'Client portal',
      detail:
        unreadThreads > 0
          ? 'Clients waiting on a reply'
          : 'A private page per client, with Pay now',
      value: unreadThreads > 0 ? `${unreadThreads} unread` : undefined,
      onClick: () => onNavigate('clientportal'),
    },
  ];

  return (
    <PageFrame className={cn(frameClass, matePad)}>
      <PageHero title="Clients" description={liveLine} actions={actions} />

      <HowItWorks help={CLIENTS_HUB_HELP} askContext={{ page: 'clientshub' }} />

      <StatCards
        stats={[
          {
            label: 'To reply to',
            value: toReply.length,
            tone: urgent > 0 ? 'red' : undefined,
            sub:
              urgent > 0
                ? `${urgent} urgent ${urgent === 1 ? 'enquiry' : 'enquiries'} waiting`
                : oldestReply
                  ? `Oldest came in ${ago(oldestReply.received_at)}`
                  : 'Every enquiry answered',
            onOpen: () => onNavigate('leads'),
          },
          {
            label: 'Quotes waiting',
            value: canSeeMoney ? formatGBPCompact(waitingValue) : waitingQuotes.length,
            sub:
              waitingQuotes.length === 0
                ? 'No quotes out'
                : canSeeMoney
                  ? `${plural(waitingQuotes.length, 'quote')} on the customer`
                  : oldestQuoteDays > 0
                    ? `Oldest sent ${plural(oldestQuoteDays, 'day')} ago`
                    : 'Sent, no answer yet',
            onOpen: () => navigate('/employer?section=quotes&tab=quotes'),
          },
          {
            label: 'Win rate',
            value: rate === null ? 'None yet' : `${rate}%`,
            progress: rate === null ? 0 : rate / 100,
            sub:
              rate === null
                ? `Shows once ${canSeeMoney ? 'a quote' : 'an enquiry'} is won or lost`
                : `${winCounts?.won ?? 0} of ${decided} decided ${canSeeMoney ? 'quotes, 12 months' : 'enquiries'}`,
            onOpen: () =>
              canSeeMoney ? navigate('/employer?section=quotes&tab=quotes') : onNavigate('leads'),
          },
          {
            label: 'Reviews',
            value: !reviews ? '0' : reviewsOn ? reviews.stats.asked_30 : 'Off',
            sub: !reviews
              ? 'Asked in the last 30 days'
              : reviewsOn
                ? `Asked, ${reviews.stats.clicked_30} clicked in 30 days`
                : 'Turn on to ask after they pay',
            onOpen: () => setReviewsOpen(true),
          },
        ]}
      />

      <section>
        <SectionHead
          title="Enquiries"
          meta={
            doorItems.length > 0
              ? `${plural(openLeads, 'open enquiry', 'open enquiries')}`
              : 'None yet'
          }
          action="Open enquiries"
          onAction={() => onNavigate('leads')}
        />
        <PipelineBar stages={stages} />
        <div className="mt-6">
          <SectionHead
            title="To reply to"
            meta={toReply.length > 0 ? `${toReply.length}` : undefined}
          />
          <ListPanel
            items={replyRows}
            empty="Nobody waiting on a reply. New enquiries from your email address, website, quote page, calls, texts and bookings show here, emergencies first."
            footer={
              toReply.length > 4 ? (
                <button type="button" onClick={() => onNavigate('leads')} className={footLink}>
                  {plural(toReply.length - 4, 'more enquiry', 'more enquiries')} to reply to
                </button>
              ) : undefined
            }
          />
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <section className="flex flex-col">
          <SectionHead
            title="Quotes waiting"
            meta={waitingQuotes.length > 0 ? 'Oldest first' : undefined}
            action="Quotes"
            onAction={() => navigate('/employer?section=quotes&tab=quotes')}
          />
          <ListPanel
            className="flex-1"
            items={quoteRows}
            empty="No quotes out. Quotes you have sent and not heard back on show here, oldest first, with how long they have waited."
            footer={
              waitingQuotes.length > 5 ? (
                <button
                  type="button"
                  onClick={() => navigate('/employer?section=quotes&tab=quotes')}
                  className={footLink}
                >
                  {plural(waitingQuotes.length - 5, 'more quote')} waiting
                </button>
              ) : undefined
            }
          />
        </section>
        <section className="flex flex-col">
          <SectionHead
            title="Top clients this year"
            meta={canSeeMoney ? 'By value invoiced' : 'By jobs'}
            action="All clients"
            onAction={() => onNavigate('clients')}
          />
          <ListPanel
            className="flex-1"
            items={clientRows}
            empty={
              canSeeMoney
                ? 'No invoices raised since 1 January. Your biggest customers this year show here once the first invoices go out.'
                : 'No jobs since 1 January. The customers you do most work for this year show here.'
            }
          />
        </section>
      </div>

      <section>
        <SectionHead title="Everything in Clients" />
        <PageTiles
          groups={[
            { title: 'Win and keep customers', links: winLinks },
            { title: 'Quotes, money and the portal', links: moneyLinks },
          ]}
        />
      </section>

      <ReviewRequestsSheet open={reviewsOpen} onOpenChange={setReviewsOpen} />
      <AddEnquirySheet
        open={adding}
        onOpenChange={setAdding}
        onAdded={(id) => navigate(`/employer?section=leads&enquiry=${id}`)}
      />
    </PageFrame>
  );
}
