import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { JobContextBar } from '@/components/employer/JobContextBar';
import { useJobContext } from '@/hooks/useJobContext';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useQuotes, useInvoices } from '@/hooks/useFinance';
import { CreateQuoteDialog } from '@/components/employer/dialogs/CreateQuoteDialog';
import { CreateInvoiceDialog } from '@/components/employer/dialogs/CreateInvoiceDialog';
import { ViewQuoteSheet } from '@/components/employer/sheets/ViewQuoteSheet';
import { ViewInvoiceSheet } from '@/components/employer/sheets/ViewInvoiceSheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useQueryClient } from '@tanstack/react-query';
import { sortQuotes, sortInvoices } from '@/utils/financeSorting';
import { computeAging, type AgingInvoice } from '@/utils/invoiceAging';
import { useFinanceSummary } from '@/hooks/useFinanceModel';
import type { Quote, Invoice } from '@/services/financeService';
import { sendInvoice as sendInvoiceService, isBridgedRecord } from '@/services/financeService';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
import {
  PageHero,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  Field,
  inputClass,
} from '@/components/employer/editorial';
import {
  PageColumn,
  TwoColumn,
  FigureStrip,
  FilterRow,
  Segments,
  SearchField,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  RefreshIcon,
  Rows,
  Row,
  StatusPill,
  PlainEmpty,
  panel,
  PanelTitle,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { autoCompleteOff } from '@/lib/textEntry';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { QUOTES_HELP } from '@/components/employer/help/finance';
import { useActingFirmId, useFirmCardPayments } from '@/hooks/useJobProfit';
import { useFirmPriceBook } from '@/hooks/useFirmPriceBook';
import { WhoOwesMe } from '@/components/employer/getpaid/WhoOwesMe';
import { ChaseScheduleSheet } from '@/components/employer/getpaid/ChaseScheduleSheet';
import { WinRatePanel } from '@/components/employer/quotes/WinRatePanel';
import { useQuoteAttribution, attributionLine } from '@/hooks/useQuoteAttribution';

type RowKind = 'quote' | 'invoice';

interface CombinedRow {
  id: string;
  kind: RowKind;
  number: string;
  client: string;
  jobTitle: string | null;
  total: number;
  status: string;
  statusTone: PillTone;
  timestamp: number;
  timeAgo: string;
  /** Bridged in from the Electrical Hub — read-only here, edited in that hub. */
  isBridged: boolean;
  raw: Quote | Invoice;
}

function formatMoney(n: number) {
  return Number(n || 0).toLocaleString('en-GB', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

function formatHero(n: number) {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1000) return `£${(n / 1000).toFixed(n >= 10_000 ? 0 : 1)}k`;
  return `£${formatMoney(n)}`;
}

function timeAgo(iso: string | null | undefined) {
  if (!iso) return '—';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '—';
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

// One calm pill per row: green for won, red for lost, neutral otherwise.
function quoteStatusTone(status: string): PillTone {
  switch (status) {
    case 'Approved':
    case 'Client Accepted':
    case 'Converted':
      return 'green';
    case 'Rejected':
    case 'Client Declined':
      return 'red';
    default:
      return 'neutral';
  }
}

// A quote is "won" whether it was approved in-app, accepted by the client
// through the portal, or already converted to an invoice.
const WON_QUOTE_STATUSES = ['Approved', 'Client Accepted', 'Converted'];

function invoiceStatusTone(status: string): PillTone {
  switch (status) {
    case 'Paid':
      return 'green';
    case 'Overdue':
      return 'red';
    default:
      return 'neutral';
  }
}

function isThisMonth(iso: string | null | undefined) {
  if (!iso) return false;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

// Nothing ever writes status='Overdue' — derive it from due_date.
// Drafts are excluded: an invoice the client never received can't be
// "overdue" and must never get a client-facing Chase action.
const isOverdueInvoice = (inv: { status?: string | null; due_date?: string | null }) =>
  inv.status === 'Overdue' ||
  (inv.status !== 'Paid' &&
    inv.status !== 'Draft' &&
    !!inv.due_date &&
    inv.due_date < new Date().toISOString().slice(0, 10));

export function QuotesInvoicesSection() {
  const [showCreateQuote, setShowCreateQuote] = useState(false);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [convertQuote, setConvertQuote] = useState<Quote | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'quotes' | 'invoices' | 'overdue'>('all');
  // Chase flow: invoice being chased when no client email is on file
  const [chaseTarget, setChaseTarget] = useState<{ id: string; client: string } | null>(null);
  const [chaseEmail, setChaseEmail] = useState('');

  const { data: quotes = [], isLoading: quotesLoading } = useQuotes();
  const { data: invoices = [], isLoading: invoicesLoading } = useInvoices();
  const [searchParams, setSearchParams] = useSearchParams();

  // Deep-link: ?new=quote&client=…&email=…&phone=…&address=… opens a new quote
  // already filled in — used by "Write a quote" on a converted lead (ELE-1997).
  const [quotePrefill, setQuotePrefill] = useState<{
    client?: string;
    email?: string;
    phone?: string;
    address?: string;
    lines?: { description: string; note?: string }[];
    title?: string;
    /** ELE-2073: open the template picker first (a converted lead). */
    templates?: boolean;
  } | null>(null);
  // ELE-2065: ?view=owed is the "Who owes me" page (its own &invoice= opens a debtor).
  const owedView = searchParams.get('view') === 'owed';
  const [followUpOpen, setFollowUpOpen] = useState(false);
  useEffect(() => {
    if (searchParams.get('new') !== 'quote') return;
    // ELE-1832: a remedial quote from a signed certificate hands its
    // observations over in sessionStorage (too long for a URL).
    let lines: { description: string; note?: string }[] | undefined;
    if (searchParams.get('lines') === 'remedial') {
      try {
        lines = JSON.parse(sessionStorage.getItem('employer-remedial-lines') || '[]');
        sessionStorage.removeItem('employer-remedial-lines');
      } catch {
        lines = undefined;
      }
    }
    setQuotePrefill({
      client: searchParams.get('client') ?? undefined,
      email: searchParams.get('email') ?? undefined,
      phone: searchParams.get('phone') ?? undefined,
      address: searchParams.get('address') ?? undefined,
      lines,
      title: searchParams.get('title') ?? undefined,
      templates: searchParams.get('template') === 'pick',
    });
    setShowCreateQuote(true);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        ['new', 'client', 'email', 'phone', 'address', 'lines', 'title', 'template'].forEach((k) =>
          next.delete(k)
        );
        return next;
      },
      { replace: true }
    );
  }, [searchParams, setSearchParams]);

  // Deep-link: ?quote=<id> / ?invoice=<id> opens that record directly
  // (e.g. from a client's linked list).
  useEffect(() => {
    const qid = searchParams.get('quote');
    // On the "Who owes me" view, &invoice= belongs to that page.
    const iid = searchParams.get('view') === 'owed' ? null : searchParams.get('invoice');
    const tab = searchParams.get('tab');
    if (tab && ['all', 'quotes', 'invoices', 'overdue'].includes(tab)) {
      setActiveTab(tab as typeof activeTab);
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete('tab');
          return next;
        },
        { replace: true }
      );
    }
    if (!qid && !iid) return;
    // Wait for the lists: clearing the params before they load threw away
    // every deep link (Overview rows, client records) on a cold open.
    if ((qid && quotesLoading) || (iid && invoicesLoading)) return;
    if (qid && quotes.length) {
      const q = quotes.find((x) => x.id === qid);
      if (q) setSelectedQuote(q);
    }
    if (iid && invoices.length) {
      const inv = invoices.find((x) => x.id === iid);
      if (inv) setSelectedInvoice(inv);
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('quote');
        next.delete('invoice');
        return next;
      },
      { replace: true }
    );
  }, [searchParams, quotes, invoices, quotesLoading, invoicesLoading, setSearchParams]);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['quotes'] }),
      queryClient.invalidateQueries({ queryKey: ['invoices'] }),
      queryClient.invalidateQueries({ queryKey: ['firm-debtors'] }),
    ]);
  };

  const openOwed = () =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('view', 'owed');
      return next;
    });
  const closeOwed = () =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('view');
      next.delete('invoice');
      return next;
    });

  // Outstanding, cash in (30 days) and open quotes come from the shared
  // finance model so this page, the Finance and Clients hubs, Reports and
  // Accounts show the same numbers (ELE-1983).
  const { data: money } = useFinanceSummary(null, null);
  const outstanding = money?.outstanding;
  const paid30 = money?.paidLast30d;
  const openQuotesValue = money?.openQuoteValue;

  const wonThisMonth = useMemo(
    () =>
      // accepted_at, not updated_at: any later edit or bulk
      // update would count an old win as this month's.
      quotes.filter(
        (q) => WON_QUOTE_STATUSES.includes(q.status) && isThisMonth(q.accepted_at ?? q.updated_at)
      ).length,
    [quotes]
  );

  const overdueCount = useMemo(() => invoices.filter(isOverdueInvoice).length, [invoices]);

  // Debtor aging — £ outstanding by how long it's been past due.
  const aging = useMemo(() => computeAging(invoices as AgingInvoice[]), [invoices]);

  const sortedQuotes = useMemo(() => sortQuotes(quotes), [quotes]);
  const sortedInvoices = useMemo(() => sortInvoices(invoices), [invoices]);

  const combined: CombinedRow[] = useMemo(() => {
    const qRows: CombinedRow[] = sortedQuotes.map((q) => ({
      id: `q-${q.id}`,
      kind: 'quote',
      number: q.quote_number || '—',
      client: q.client || 'Unknown client',
      jobTitle: q.job_title || q.description || null,
      total: Number(q.value || 0),
      // ELE-2065: an invoiced quote says so, with the invoice's number.
      status: q.converted_invoice_id
        ? `Invoiced${q.converted_invoice_number ? ` · ${q.converted_invoice_number}` : ''}`
        : q.status,
      statusTone: quoteStatusTone(q.status),
      timestamp: new Date(q.updated_at || q.created_at || 0).getTime() || 0,
      timeAgo: timeAgo(q.updated_at || q.created_at),
      isBridged: isBridgedRecord(q),
      raw: q,
    }));
    const iRows: CombinedRow[] = sortedInvoices.map((inv) => ({
      id: `i-${inv.id}`,
      kind: 'invoice',
      number: inv.invoice_number || '—',
      client: inv.client || 'Unknown client',
      jobTitle: inv.project || null,
      total: Number(inv.amount || 0),
      status: inv.status,
      statusTone: invoiceStatusTone(inv.status),
      timestamp: new Date(inv.updated_at || inv.created_at || 0).getTime() || 0,
      timeAgo: timeAgo(inv.updated_at || inv.created_at),
      isBridged: isBridgedRecord(inv),
      raw: inv,
    }));
    return [...qRows, ...iRows].sort((a, b) => b.timestamp - a.timestamp);
  }, [sortedQuotes, sortedInvoices]);
  // ELE-2083: "Sent by" / "Raised by" on rows, once more than one person does the paperwork.
  const attribution = useQuoteAttribution(
    useMemo(() => combined.map((r) => (r.raw as { id: string }).id), [combined])
  );

  const sendChase = async (inv: { id: string; client: string }, email: string) => {
    try {
      await sendInvoiceService(inv.id, email);
      toast({ title: 'Reminder sent', description: `${inv.client} has been chased.` });
    } catch (err) {
      toast({
        title: 'Could not send',
        description: err instanceof Error ? err.message : 'Try again.',
        variant: 'destructive',
      });
    }
  };

  const handleChaseInvoice = (inv: {
    id: string;
    client: string;
    client_email?: string | null;
  }) => {
    const email = inv.client_email || undefined;
    if (!email) {
      // No address on file — ask for one in a proper sheet, not window.prompt
      setChaseEmail('');
      setChaseTarget(inv);
      return;
    }
    void sendChase(inv, email);
  };

  const chaseEmailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(chaseEmail.trim());

  // ELE-1960 — opened from a job sheet (?job=<id>): this job's quotes and
  // invoices only (quotes.employer_job_id), with a "Back to job" bar.
  const { jobId: contextJobId, job: contextJob } = useJobContext();
  const scopedRows = useMemo(
    () =>
      contextJobId
        ? combined.filter((row) => (row.raw as { job_id?: string | null }).job_id === contextJobId)
        : combined,
    [combined, contextJobId]
  );

  const filteredRows = useMemo(() => {
    const needle = searchQuery.trim().toLowerCase();
    return scopedRows.filter((row) => {
      if (activeTab === 'quotes' && row.kind !== 'quote') return false;
      if (activeTab === 'invoices' && row.kind !== 'invoice') return false;
      if (activeTab === 'overdue' && !isOverdueInvoice(row)) return false;
      if (!needle) return true;
      return (
        row.client.toLowerCase().includes(needle) ||
        row.number.toLowerCase().includes(needle) ||
        (row.jobTitle?.toLowerCase().includes(needle) ?? false)
      );
    });
  }, [scopedRows, activeTab, searchQuery]);

  const isLoading = quotesLoading || invoicesLoading;

  const handleConvertToInvoice = (quote: Quote) => {
    setConvertQuote(quote);
    setShowCreateInvoice(true);
  };

  const openRow = (row: CombinedRow) => {
    if (row.kind === 'quote') setSelectedQuote(row.raw as Quote);
    else setSelectedInvoice(row.raw as Invoice);
  };

  const tabs = [
    { value: 'all', label: 'All', count: scopedRows.length },
    {
      value: 'quotes',
      label: 'Quotes',
      count: contextJobId ? scopedRows.filter((r) => r.kind === 'quote').length : quotes.length,
    },
    {
      value: 'invoices',
      label: 'Invoices',
      count: contextJobId ? scopedRows.filter((r) => r.kind === 'invoice').length : invoices.length,
    },
    {
      value: 'overdue',
      label: 'Overdue',
      count: contextJobId ? scopedRows.filter((r) => isOverdueInvoice(r)).length : overdueCount,
    },
  ];

  // Live "Before you start" lines for the help (ELE-1980). Both queries are
  // the ones the invoice sheet and the quote builder already make (cached).
  const { data: actingFirmId } = useActingFirmId();
  const { data: firmCard } = useFirmCardPayments(actingFirmId);
  const { data: priceBook } = useFirmPriceBook();
  const helpBlockers: HelpBlocker[] = [];
  if (firmCard && firmCard.status !== 'active') {
    helpBlockers.push(
      firmCard.isOwner
        ? {
            text: 'Card payments are off, so invoices go out with no Pay now button and quotes cannot take a deposit by card.',
            fixLabel: 'Turn on card payments',
            onFix: () => navigate('/employer?section=settings'),
          }
        : {
            text: 'Card payments are off, so invoices go out with no Pay now button. Only the account owner can switch them on.',
          }
    );
  }
  if (priceBook && priceBook.length === 0) {
    helpBlockers.push({
      text: 'Your price book is empty, so every material on a quote is typed by hand.',
      fixLabel: 'Open the price book',
      onFix: () => navigate('/employer?section=pricebook'),
    });
  }
  const askContext = { page: 'quotes', tab: activeTab };

  const kindLabel = (row: CombinedRow) => {
    const n = row.number;
    if (/^(quote|invoice|qte|inv)/i.test(n)) return n;
    return `${row.kind === 'quote' ? 'Quote' : 'Invoice'} ${n}`;
  };

  // Live status line (the Overview's headline idea): what is owed, what is
  // late and what is waiting on a customer. Same figures as the strip.
  const statusLine = (() => {
    if (contextJobId) return "This job's quotes and invoices.";
    if (!money) return 'Create, send, track and get paid.';
    const parts: string[] = [];
    if (money.outstanding > 0) parts.push(`${formatHero(money.outstanding)} owed`);
    if (money.overdueCount > 0)
      parts.push(`${money.overdueCount} invoice${money.overdueCount === 1 ? '' : 's'} overdue`);
    const first = parts.length ? parts.join(', ') + '.' : 'Nothing owed to you.';
    const q =
      money.openQuoteCount > 0
        ? ` ${money.openQuoteCount} quote${money.openQuoteCount === 1 ? '' : 's'} waiting for an answer.`
        : '';
    return first + q;
  })();

  const waitingQuotes = useMemo(
    () => sortedQuotes.filter((q) => q.status === 'Sent').slice(0, 5),
    [sortedQuotes]
  );

  const heroActions = (
    <HeroActions>
      <HeroPrimary data-help="quotes.new-quote" onClick={() => setShowCreateQuote(true)}>
        New quote
      </HeroPrimary>
      <HeroSecondary data-help="quotes.new-invoice" onClick={() => setShowCreateInvoice(true)}>
        New invoice
      </HeroSecondary>
      <RefreshIcon onClick={handleRefresh} />
      <PageHelpButton help={QUOTES_HELP} blockers={helpBlockers} askContext={askContext} />
    </HeroActions>
  );

  // Every row bridged from the Electrical Hub: say it once, not on each row.
  const allBridged = filteredRows.length > 0 && filteredRows.every((r) => r.isBridged);

  const listPanel = (
    <section>
      <PanelTitle
        title={
          activeTab === 'quotes'
            ? 'Quotes'
            : activeTab === 'invoices'
              ? 'Invoices'
              : activeTab === 'overdue'
                ? 'Overdue invoices'
                : 'Quotes and invoices'
        }
        meta={
          allBridged && filteredRows.length
            ? `${filteredRows.length} · made in the Electrical Hub`
            : `${filteredRows.length}`
        }
      />
      <div className={cn(panel, 'overflow-hidden')}>
        {filteredRows.length === 0 ? (
          <PlainEmpty
            bare
            text={
              searchQuery
                ? 'Nothing matches that. Try a client name, number or job.'
                : activeTab === 'overdue'
                  ? 'Nothing is overdue.'
                  : 'Your quotes and invoices will show here.'
            }
            action={searchQuery || activeTab === 'overdue' ? undefined : 'New quote'}
            onAction={
              searchQuery || activeTab === 'overdue' ? undefined : () => setShowCreateQuote(true)
            }
          />
        ) : (
          <div data-help="quotes.list">
            <Rows>
              {filteredRows.map((row) => {
                const overdue =
                  row.kind === 'invoice' &&
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  isOverdueInvoice(row.raw as any);
                const daysOver = overdue
                  ? Math.max(
                      1,
                      Math.floor(
                        (Date.now() -
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          new Date((row.raw as any).due_date).getTime()) /
                          86400000
                      )
                    )
                  : 0;
                const detail = [
                  kindLabel(row),
                  row.jobTitle,
                  overdue ? null : row.timeAgo,
                  row.isBridged && !allBridged ? 'Electrical Hub' : null,
                ]
                  .filter(Boolean)
                  .join(' · ');
                // Who sent it gets its own line, so it is not cut off on a phone.
                const sentBy = attribution.severalPeople
                  ? attributionLine(
                      attribution.map.get((row.raw as { id: string }).id),
                      row.kind === 'quote' ? 'quote' : 'invoice'
                    )
                  : null;
                return (
                  <Row
                    chevron={false}
                    key={row.id}
                    title={row.client}
                    detail={detail}
                    meta={sentBy ? <span className="block truncate">{sentBy}</span> : undefined}
                    amount={`£${formatMoney(row.total)}`}
                    status={
                      overdue ? (
                        <StatusPill tone="red">{daysOver}d overdue</StatusPill>
                      ) : (
                        <StatusPill tone={row.statusTone}>{row.status}</StatusPill>
                      )
                    }
                    action={
                      overdue ? (
                        <button
                          type="button"
                          data-help="quotes.chase"
                          onClick={(e) => {
                            e.stopPropagation();
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            handleChaseInvoice(row.raw as any);
                          }}
                          className="inline-flex h-11 items-center rounded-full border border-white/[0.14] bg-white/[0.04] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.08]"
                        >
                          Chase
                        </button>
                      ) : undefined
                    }
                    onClick={() => openRow(row)}
                  />
                );
              })}
            </Rows>
          </div>
        )}
      </div>
    </section>
  );

  const agingRows: { label: string; value: number }[] = [
    { label: '1 to 30 days', value: aging.d1_30 },
    { label: '31 to 60 days', value: aging.d31_60 },
    { label: '61 to 90 days', value: aging.d61_90 },
    { label: 'Over 90 days', value: aging.d90_plus },
  ];

  const sidePanels = contextJobId ? undefined : (
    <>
      <section>
        <PanelTitle
          title="Overdue"
          meta={aging.totalOverdue > 0 ? formatHero(aging.totalOverdue) : undefined}
          action="Who owes me"
          onAction={openOwed}
        />
        <div className={cn(panel, 'overflow-hidden')}>
          {aging.totalOverdue > 0 ? (
            <Rows>
              {agingRows.map((a) => (
                <div
                  key={a.label}
                  className="flex min-h-[48px] items-center justify-between gap-3 px-4 py-2.5 sm:px-5"
                >
                  <span className="text-[14px] text-white">{a.label}</span>
                  <span
                    className={cn(
                      'text-[15px] font-semibold tabular-nums',
                      a.value > 0 && a.label !== '1 to 30 days' ? 'text-red-400' : 'text-white'
                    )}
                  >
                    {formatHero(a.value)}
                  </span>
                </div>
              ))}
            </Rows>
          ) : (
            <PlainEmpty
              bare
              text="Nothing is overdue. Late invoices show here by how long they are past due."
            />
          )}
        </div>
      </section>

      <section>
        <PanelTitle
          title="Waiting for an answer"
          meta={waitingQuotes.length ? `${waitingQuotes.length}` : undefined}
          action="Follow-up"
          onAction={() => setFollowUpOpen(true)}
        />
        <div className={cn(panel, 'overflow-hidden')}>
          {waitingQuotes.length ? (
            <Rows>
              {waitingQuotes.map((q) => (
                <Row
                  chevron={false}
                  key={q.id}
                  title={q.client || 'Unknown client'}
                  detail={`${q.quote_number || 'Quote'} · sent ${timeAgo(q.sent_date || q.created_at)}`}
                  amount={`£${formatMoney(Number(q.value || 0))}`}
                  onClick={() => setSelectedQuote(q)}
                />
              ))}
            </Rows>
          ) : (
            <PlainEmpty bare text="Sent quotes the customer has not answered yet show here." />
          )}
        </div>
      </section>

      {/* ELE-2073: owner and admins only; renders nothing for anyone else. */}
      <WinRatePanel />
    </>
  );

  const body = (
    <PageColumn>
      <PageHero title="Quotes & invoices" description={statusLine} actions={heroActions} />

      <HowItWorks help={QUOTES_HELP} blockers={helpBlockers} askContext={askContext} />

      <JobContextBar what="Quotes & invoices" />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          {/* Firm-wide totals — hidden while filtered to one job so they are
              never read as that job's numbers (its money is on the job sheet). */}
          {!contextJobId && (
            <FigureStrip
              figures={[
                {
                  label: 'Owed to you',
                  value: outstanding === undefined ? '—' : formatHero(outstanding),
                  sub:
                    money && money.overdueCount > 0
                      ? `${money.overdueCount} overdue`
                      : 'Sent and not paid',
                  tone: money && money.overdueCount > 0 ? 'red' : undefined,
                  // ELE-2065: who owes what, aged, with the next chase.
                  onOpen: money?.moneyVisible
                    ? openOwed
                    : () => setActiveTab(money && money.overdueCount > 0 ? 'overdue' : 'invoices'),
                },
                {
                  label: 'Paid in, 30 days',
                  value: paid30 === undefined ? '—' : formatHero(paid30),
                  sub: 'Money received',
                  onOpen: () => setActiveTab('invoices'),
                },
                {
                  label: 'Open quotes',
                  value: openQuotesValue === undefined ? '—' : formatHero(openQuotesValue),
                  sub: money ? `${money.openQuoteCount} waiting` : undefined,
                  onOpen: () => setActiveTab('quotes'),
                },
                {
                  label: 'Won this month',
                  value: wonThisMonth,
                  sub: `Quote${wonThisMonth === 1 ? '' : 's'} accepted`,
                  onOpen: () => setActiveTab('quotes'),
                },
              ]}
            />
          )}

          <FilterRow>
            <div data-help="quotes.tabs" className="min-w-0">
              <Segments
                items={tabs as { value: typeof activeTab; label: string; count?: number }[]}
                value={activeTab}
                onChange={setActiveTab}
              />
            </div>
            <SearchField
              className="w-full lg:w-72"
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search client, number or job"
            />
          </FilterRow>

          <TwoColumn main={listPanel} side={sidePanels} />
        </>
      )}

      <CreateQuoteDialog
        open={showCreateQuote}
        onOpenChange={(open) => {
          setShowCreateQuote(open);
          if (!open) setQuotePrefill(null);
        }}
        prefillClient={quotePrefill?.client}
        prefillEmail={quotePrefill?.email}
        prefillPhone={quotePrefill?.phone}
        prefillAddress={quotePrefill?.address}
        prefillLines={quotePrefill?.lines}
        prefillTitle={quotePrefill?.title}
        openTemplates={quotePrefill?.templates}
        jobId={contextJobId ?? undefined}
        {...(contextJob && !quotePrefill ? { prefillClient: contextJob.client } : {})}
      />
      <CreateInvoiceDialog
        open={showCreateInvoice}
        onOpenChange={(open) => {
          setShowCreateInvoice(open);
          if (!open) setConvertQuote(null);
        }}
        fromQuote={convertQuote || undefined}
        jobId={convertQuote ? undefined : (contextJobId ?? undefined)}
        jobTitle={convertQuote ? undefined : contextJob?.title}
      />
      <ViewQuoteSheet
        open={!!selectedQuote}
        onOpenChange={(open) => !open && setSelectedQuote(null)}
        // The live row, so Approve / Send / customer accepting update the
        // open sheet instead of leaving a stale snapshot on screen.
        quote={
          selectedQuote ? (quotes.find((q) => q.id === selectedQuote.id) ?? selectedQuote) : null
        }
        onConvertToInvoice={handleConvertToInvoice}
      />
      <ViewInvoiceSheet
        open={!!selectedInvoice}
        onOpenChange={(open) => !open && setSelectedInvoice(null)}
        invoice={
          selectedInvoice
            ? (invoices.find((i) => i.id === selectedInvoice.id) ?? selectedInvoice)
            : null
        }
      />

      <ResponsiveFormModal open={!!chaseTarget} onOpenChange={(o) => !o && setChaseTarget(null)}>
        <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
          <ResponsiveFormModalHeader>
            <ResponsiveFormModalTitle className="text-white">
              Chase this invoice
            </ResponsiveFormModalTitle>
          </ResponsiveFormModalHeader>
          <ResponsiveFormModalBody className="pb-6">
            <div className="space-y-4 py-4">
              <Field label={`Email address for ${chaseTarget?.client ?? 'client'}`} required>
                <Input
                  type="email"
                  placeholder="client@example.com"
                  value={chaseEmail}
                  onChange={(e) => setChaseEmail(e.target.value)}
                  className={inputClass}
                  autoComplete={autoCompleteOff}
                />
              </Field>
              <p className="text-sm text-white">
                A payment reminder with a secure payment link will be emailed to the client.
              </p>
            </div>
            <div className="flex gap-2 pb-2">
              <SecondaryButton onClick={() => setChaseTarget(null)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={() => {
                  if (!chaseTarget || !chaseEmailValid) return;
                  const target = chaseTarget;
                  setChaseTarget(null);
                  void sendChase(target, chaseEmail.trim());
                }}
                disabled={!chaseEmailValid}
                fullWidth
              >
                Send reminder
              </PrimaryButton>
            </div>
          </ResponsiveFormModalBody>
        </ResponsiveFormModalContent>
      </ResponsiveFormModal>
      <ChaseScheduleSheet open={followUpOpen} onOpenChange={setFollowUpOpen} initialTab="quotes" />
    </PageColumn>
  );

  // ELE-2065: the "Who owes me" page lives on this section (?view=owed).
  if (owedView) {
    const owed = (
      <WhoOwesMe
        onBack={closeOwed}
        focusInvoiceId={searchParams.get('invoice')}
      />
    );
    return isMobile ? <PullToRefresh onRefresh={handleRefresh}>{owed}</PullToRefresh> : owed;
  }

  if (isMobile) {
    return <PullToRefresh onRefresh={handleRefresh}>{body}</PullToRefresh>;
  }

  return body;
}
