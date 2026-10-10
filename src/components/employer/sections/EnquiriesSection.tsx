/**
 * Enquiries, the firm's one front door (ELE-2094). Section key stays `leads`
 * so every existing link, bell and push still opens it.
 *
 * The same `enquiries` table and AI reader as the Electrical Hub, firm-scoped:
 * email to the in.elec-mate.com address, the website form, the quote page,
 * missed calls and texts, Checkatrade / MyBuilder forwards, plus online
 * bookings and the firm's older Leads rows, in one list. Opening one shows the
 * whole customer: their other enquiries, bookings, quotes, jobs and messages.
 */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { formatDistanceToNowStrict, isToday, isYesterday, format, parseISO } from 'date-fns';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { PageFrame, PageHero, LoadingBlocks } from '@/components/employer/editorial';
import {
  FigureStrip,
  HeroActions,
  HeroPrimary,
  Initials,
  PanelTitle,
  PlainEmpty,
  Row,
  RowList,
  SearchField,
  Segments,
  StatusPill,
  colClass,
  frameClass,
  panel,
  twoColClass,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { PageHelpButton, HowItWorks, type PageHelpContent } from '@/components/hub/PageHelp';
import { CreateQuoteDialog } from '@/components/employer/dialogs/CreateQuoteDialog';
import { EnquirySheet } from '@/components/employer/enquiries/EnquirySheet';
import { AddEnquirySheet } from '@/components/employer/enquiries/AddEnquirySheet';
import {
  STAGE_LABEL,
  itemTitle,
  sourceLabel,
  useFrontDoor,
  type DoorItem,
  type DoorStage,
} from '@/hooks/useFrontDoor';
import { enquiryPageUrl, inboxAddress, useEnquiryInbox } from '@/hooks/useEnquiries';
import { copyToClipboard } from '@/utils/clipboard';
import { decidedCount, winRate as winRateOf } from '@/utils/winRate';
import type { Quote } from '@/services/financeService';

const HELP: PageHelpContent = {
  id: 'employer-enquiries',
  title: 'Enquiries',
  what: 'Every way a customer gets in touch, in one list: your enquiry email address, website form, quote page, missed calls and texts, Checkatrade and MyBuilder forwards, and online bookings. The same enquiries you see in the Electrical Hub.',
  steps: [
    {
      title: 'Read it at a glance',
      body: 'Each enquiry is read for you: the job, how urgent it is, the address and any photos. The original message is kept underneath.',
    },
    {
      title: 'Reply first',
      body: 'Call, text or email from the enquiry. A reply is written for you to check. The first firm to answer usually wins the job.',
    },
    {
      title: 'One tap to a quote or a job',
      body: 'Make a quote or a job and the name, contact, address, job, details and photos go with it. Nothing to retype.',
    },
    {
      title: 'Won when they accept',
      body: 'An enquiry shows as Won only when the customer accepts the quote, so the win rate is real.',
    },
  ],
  notes: [
    {
      title: 'The whole customer',
      body: 'Open an enquiry to see everything else with that person: other enquiries, bookings, quotes, jobs and messages.',
    },
    {
      title: 'Who sees it',
      body: 'The owner, admins and office managers. Quote values show only to the owner and admins.',
    },
  ],
};

type Filter = 'reply' | 'progress' | 'won' | 'all';
const IN_FILTER: Record<Filter, DoorStage[] | null> = {
  reply: ['new'],
  progress: ['open', 'quoted', 'job'],
  won: ['won'],
  all: null,
};

const stageTone = (s: DoorStage): PillTone =>
  s === 'new' ? 'volt' : s === 'won' ? 'green' : s === 'lost' ? 'red' : 'neutral';

const gbp = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;

/** "14:05", "Yesterday", "3 Oct". */
const whenShort = (iso: string) => {
  const d = parseISO(iso);
  if (isToday(d)) return format(d, 'HH:mm');
  if (isYesterday(d)) return 'Yesterday';
  return format(d, 'd MMM');
};

export function EnquiriesSection() {
  const door = useFrontDoor();
  const items = useMemo(
    () => (door.data?.items ?? []).filter((i) => !i.is_test),
    [door.data?.items]
  );
  const money = !!door.data?.money;
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>('reply');
  const [filterTouched, setFilterTouched] = useState(false);
  const [search, setSearch] = useState('');
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Quote | null>(null);

  const keyOf = (i: DoorItem) => `${i.kind}:${i.id}`;
  const selected = useMemo(() => items.find((i) => keyOf(i) === openKey) ?? null, [items, openKey]);

  const waiting = useMemo(
    () =>
      items
        .filter((i) => i.stage === 'new')
        .sort((a, b) => {
          const ua = a.urgency === 'emergency' ? 0 : 1;
          const ub = b.urgency === 'emergency' ? 0 : 1;
          return ua - ub || a.received_at.localeCompare(b.received_at);
        }),
    [items]
  );

  // Start on "To reply" when something is waiting, otherwise on everything.
  useEffect(() => {
    if (filterTouched || door.isLoading) return;
    setFilter(waiting.length > 0 ? 'reply' : 'all');
  }, [waiting.length, door.isLoading, filterTouched]);

  // Deep links: ?lead=<employer_leads id> (bell, push, office email) and
  // ?enquiry=<id>. A quote-page lead may now live in Enquiries.
  const leadParam = searchParams.get('lead');
  const enquiryParam = searchParams.get('enquiry');
  useEffect(() => {
    if ((!leadParam && !enquiryParam) || door.isLoading) return;
    const hit = items.find((i) =>
      leadParam
        ? i.lead_id === leadParam || (i.kind === 'lead' && i.id === leadParam)
        : i.id === enquiryParam || i.enquiry_id === enquiryParam
    );
    if (hit) setOpenKey(keyOf(hit));
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('lead');
        next.delete('enquiry');
        return next;
      },
      { replace: true }
    );
  }, [leadParam, enquiryParam, door.isLoading, items, setSearchParams]);

  const counts = useMemo(() => {
    const c: Record<Filter, number> = {
      reply: 0,
      progress: 0,
      won: 0,
      all: items.length,
    };
    for (const i of items) {
      (Object.keys(IN_FILTER) as Filter[]).forEach((f) => {
        const s = IN_FILTER[f];
        if (s && s.includes(i.stage)) c[f]++;
      });
    }
    return c;
  }, [items]);

  const q = search.trim().toLowerCase();
  const shown = useMemo(() => {
    const allowed = IN_FILTER[filter];
    const list = filter === 'reply' ? waiting : items;
    return list.filter(
      (i) =>
        (!allowed || allowed.includes(i.stage)) &&
        (!q ||
          [i.name, i.email, i.phone, i.postcode, i.address, itemTitle(i), i.customer_name]
            .filter(Boolean)
            .some((v) => String(v).toLowerCase().includes(q)))
    );
  }, [items, waiting, filter, q]);

  // Figures (the one strip).
  const quoted = items.filter((i) => i.stage === 'quoted');
  const quotedDrafts = quoted.filter((i) => i.quote?.status === 'draft').length;
  const quotedValue = quoted.reduce((s, i) => s + (Number(i.quote?.total) || 0), 0);
  const won = items.filter((i) => i.stage === 'won').length;
  const lost = items.filter((i) => i.stage === 'lost').length;
  const decided = decidedCount({ won, lost });
  const rate = winRateOf({ won, lost });
  const week = items.filter(
    (i) => Date.now() - new Date(i.received_at).getTime() < 7 * 86_400_000
  ).length;

  const oldest = waiting.filter((i) => i.urgency !== 'emergency')[0] ?? waiting[0];
  const urgent = waiting.filter((i) => i.urgency === 'emergency').length;
  const headline = door.isLoading
    ? 'Loading your enquiries.'
    : door.isError
      ? "Your enquiries didn't load."
      : items.length === 0
        ? 'No enquiries yet. Share your enquiry address or quote page and they land here.'
        : waiting.length > 0
          ? urgent > 0
            ? `${urgent} urgent ${urgent === 1 ? 'enquiry' : 'enquiries'} and ${waiting.length} in all to reply to.`
            : `${waiting.length} ${waiting.length === 1 ? 'enquiry' : 'enquiries'} to reply to. The oldest came in ${formatDistanceToNowStrict(parseISO(oldest.received_at))} ago.`
          : `Nothing waiting for a reply. ${week} ${week === 1 ? 'enquiry' : 'enquiries'} this week.`;

  const openItem = (i: DoorItem) => setOpenKey(keyOf(i));
  const go = (params: Record<string, string>) => {
    setOpenKey(null);
    setSearchParams(params);
  };

  const tabs = [
    { value: 'reply' as const, label: 'To reply', count: counts.reply },
    { value: 'progress' as const, label: 'Open', count: counts.progress },
    { value: 'won' as const, label: 'Won', count: counts.won },
    { value: 'all' as const, label: 'All', count: counts.all },
  ];

  return (
    <>
      <PageFrame className={frameClass}>
        <PageHero
          title="Enquiries"
          description={headline}
          actions={
            <HeroActions>
              <HeroPrimary data-help="enquiries.add" onClick={() => setAdding(true)}>
                Add enquiry
              </HeroPrimary>
              <PageHelpButton help={HELP} askContext={{ page: 'enquiries', tab: filter }} />
            </HeroActions>
          }
        />
        <HowItWorks help={HELP} askContext={{ page: 'enquiries', tab: filter }} />

        {items.length > 0 && (
          <FigureStrip
            figures={[
              {
                label: 'To reply',
                value: waiting.length,
                sub:
                  urgent > 0
                    ? `${urgent} urgent`
                    : waiting.length > 0
                      ? 'Oldest first'
                      : 'All answered',
                tone: urgent > 0 ? 'red' : waiting.length > 0 ? 'volt' : undefined,
                onOpen: () => {
                  setFilterTouched(true);
                  setFilter('reply');
                },
              },
              {
                label: 'Quoted',
                value: quoted.length,
                sub:
                  quotedDrafts > 0
                    ? `${quotedDrafts} not sent yet`
                    : money && quotedValue > 0
                      ? `${gbp(quotedValue)} waiting`
                      : quoted.length > 0
                        ? 'Waiting on the customer'
                        : 'None out',
                onOpen: () => {
                  setFilterTouched(true);
                  setFilter('progress');
                },
              },
              {
                label: 'Won',
                value: won,
                sub: 'Quote accepted',
                tone: won > 0 ? 'green' : undefined,
                onOpen: () => {
                  setFilterTouched(true);
                  setFilter('won');
                },
              },
              {
                label: 'Win rate',
                value: rate == null ? 'None yet' : `${rate}%`,
                sub: decided > 0 ? `Of ${decided} decided` : 'Shows once a quote is decided',
              },
            ]}
          />
        )}

        <div className={twoColClass}>
          <section className={colClass}>
            <div>
              <PanelTitle
                title="Enquiries"
                meta={items.length > 0 ? `${shown.length}` : undefined}
              />
              {items.length > 0 && (
                <div className="mb-3 space-y-3" data-help="enquiries.tabs">
                  <Segments
                    items={tabs}
                    value={filter}
                    onChange={(v) => {
                      setFilterTouched(true);
                      setFilter(v);
                    }}
                  />
                  {items.length > 8 && (
                    <SearchField
                      value={search}
                      onChange={setSearch}
                      placeholder="Search by name, phone, postcode or job"
                    />
                  )}
                </div>
              )}

              {door.isLoading ? (
                <LoadingBlocks />
              ) : door.isError ? (
                <PlainEmpty
                  text="Your enquiries didn't load."
                  action="Try again"
                  onAction={() => door.refetch()}
                />
              ) : items.length === 0 ? (
                <div className={cn(panel, 'px-4 py-4 sm:px-5')}>
                  <p className="text-[15px] font-semibold text-white">No enquiries yet</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-white">
                    Everything a customer sends lands here: emails to your enquiry address, your
                    website form, the quote page, missed calls and texts, and online bookings. Add a
                    phone call by hand with Add enquiry.
                  </p>
                </div>
              ) : shown.length === 0 ? (
                <PlainEmpty
                  stacked
                  text={
                    q
                      ? 'Nothing matches that search.'
                      : filter === 'reply'
                        ? 'Nobody is waiting for a reply.'
                        : 'Nothing here yet.'
                  }
                  action={filter !== 'all' ? 'Show all' : undefined}
                  onAction={() => {
                    setFilterTouched(true);
                    setFilter('all');
                    setSearch('');
                  }}
                />
              ) : (
                <div data-help="enquiries.list">
                  <RowList>
                    {shown.map((i) => (
                      <EnquiryRow key={keyOf(i)} item={i} onOpen={() => openItem(i)} />
                    ))}
                  </RowList>
                </div>
              )}
            </div>
          </section>

          <aside className={colClass}>
            {waiting.length > 0 && filter !== 'reply' && (
              <div className="hidden lg:block">
                <PanelTitle title="Reply first" meta={`${waiting.length}`} />
                <RowList>
                  {waiting.slice(0, 4).map((i) => (
                    <Row
                      key={keyOf(i)}
                      title={i.name || i.phone || 'Unknown'}
                      detail={`${itemTitle(i)} · ${whenShort(i.received_at)}`}
                      onClick={() => openItem(i)}
                      trailing={
                        i.urgency === 'emergency' ? (
                          <StatusPill tone="red">Urgent</StatusPill>
                        ) : undefined
                      }
                    />
                  ))}
                </RowList>
              </div>
            )}
            <WaysIn
              items={items}
              onQuotePage={() => go({ section: 'quotepage' })}
              onBookings={() => go({ section: 'diary' })}
              onSetup={() => navigate('/electrician/enquiries/setup')}
            />
          </aside>
        </div>
      </PageFrame>

      <EnquirySheet
        item={selected}
        money={money}
        onOpenChange={(o) => !o && setOpenKey(null)}
        onOpenQuote={(id) => go({ section: 'quotes', quote: id })}
        onEditDraft={(quote) => {
          setOpenKey(null);
          setEditing(quote);
        }}
        onOpenJob={(id) => go({ section: 'jobs', job: id })}
        onOpenClient={(id) => go({ section: 'clients', client: id })}
        onOpenItem={(kind, id) => {
          const hit = items.find((x) => (x.kind === kind && x.id === id) || x.enquiry_id === id);
          if (hit) setOpenKey(keyOf(hit));
        }}
        onOpenDiary={() => go({ section: 'diary' })}
      />

      <AddEnquirySheet
        open={adding}
        onOpenChange={setAdding}
        onAdded={(id) => {
          setFilterTouched(true);
          setFilter('reply');
          setOpenKey(`enquiry:${id}`);
        }}
      />

      <CreateQuoteDialog
        open={!!editing}
        onOpenChange={(o) => {
          if (!o) setEditing(null);
        }}
        editQuote={editing}
        jobId={editing?.job_id ?? undefined}
        editStartStep={2}
      />
    </>
  );
}

function EnquiryRow({ item: i, onOpen }: { item: DoorItem; onOpen: () => void }) {
  const who = i.name || i.contact_name || i.phone || i.email || 'Unknown';
  const place = i.postcode || null;
  const detail = [itemTitle(i), sourceLabel(i), place].filter(Boolean).join(' · ');
  const pill =
    i.stage === 'new' && i.urgency === 'emergency' ? (
      <StatusPill tone="red">Urgent</StatusPill>
    ) : i.kind === 'booking' && i.stage === 'new' ? (
      <StatusPill tone="volt">To confirm</StatusPill>
    ) : (
      <StatusPill tone={stageTone(i.stage)}>
        {i.stage === 'quoted' && i.quote?.status === 'draft' ? 'Quote draft' : STAGE_LABEL[i.stage]}
      </StatusPill>
    );
  return (
    <Row
      onClick={onOpen}
      lead={<Initials name={who} fallback="?" />}
      title={
        <span className="flex min-w-0 items-baseline gap-2">
          <span className="min-w-0 truncate">{who}</span>
          <span className="shrink-0 text-[12.5px] font-medium text-white tabular-nums">
            {whenShort(i.received_at)}
          </span>
        </span>
      }
      detail={detail}
      trailing={pill}
      chevron={false}
    />
  );
}

/* ── Where enquiries come from ─────────────────────────────────────────── */

function WaysIn({
  items,
  onQuotePage,
  onBookings,
  onSetup,
}: {
  items: DoorItem[];
  onQuotePage: () => void;
  onBookings: () => void;
  onSetup: () => void;
}) {
  const { data: inbox } = useEnquiryInbox();
  const [copied, setCopied] = useState<string | null>(null);
  const since = Date.now() - 90 * 86_400_000;
  const recent = items.filter((i) => new Date(i.received_at).getTime() > since);
  const n = (pred: (i: DoorItem) => boolean) => recent.filter(pred).length;
  const countLine = (k: number) =>
    k > 0 ? `${k} in the last 90 days` : 'None in the last 90 days';

  const address = inbox ? inboxAddress(inbox) : null;
  const page = inbox ? enquiryPageUrl(inbox) : null;

  const copy = async (what: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(what);
      setTimeout(() => setCopied(null), 1800);
      toast.success('Copied');
    } else toast.error('Copy failed');
  };

  const copyBtn = (what: string, text: string | null) =>
    text ? (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          void copy(what, text);
        }}
        className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.06] px-3.5 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.1]"
      >
        {copied === what ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        {copied === what ? 'Copied' : 'Copy'}
      </button>
    ) : undefined;

  return (
    <div data-help="enquiries.ways">
      <PanelTitle title="Where they come from" />
      <RowList>
        <Row
          title="Your enquiry email"
          detail={
            address ? (
              <span className="break-all">{address}</span>
            ) : (
              'Forward Gmail, Checkatrade and MyBuilder emails here'
            )
          }
          wrapDetail
          trailing={copyBtn('email', address)}
          meta={countLine(
            n((i) =>
              [
                'email',
                'checkatrade',
                'mybuilder',
                'bark',
                'ratedpeople',
                'trustatrader',
                'yell',
              ].includes(i.source)
            )
          )}
        />
        <Row
          title="Website form"
          detail={
            page ? (
              <span className="break-all">{page.replace(/^https?:\/\//, '')}</span>
            ) : (
              'Your own enquiry page and form'
            )
          }
          wrapDetail
          trailing={copyBtn('page', page)}
          meta={countLine(n((i) => i.source === 'website' || i.source === 'form_post'))}
        />
        <Row
          title="Quote page"
          detail="Customers ask for a quote with photos"
          meta={countLine(n((i) => i.source === 'quote_page'))}
          onClick={onQuotePage}
        />
        <Row
          title="Online bookings"
          detail="Visits booked from your booking link"
          meta={countLine(n((i) => i.source === 'booking' || !!i.booking_id))}
          onClick={onBookings}
        />
        <Row
          title="Missed calls and texts"
          detail="Read and added here when your number is set up"
          meta={countLine(n((i) => i.source === 'phone' || i.source === 'sms'))}
          onClick={onSetup}
        />
      </RowList>
      <button
        type="button"
        onClick={onSetup}
        className="mt-2 h-11 px-1 text-[13px] font-semibold text-elec-yellow touch-manipulation"
      >
        Enquiry settings
      </button>
    </div>
  );
}

export default EnquiriesSection;
