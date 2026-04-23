import { useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import {
  useQuotes,
  useInvoices,
  useSendQuote,
  useMarkInvoicePaid,
} from '@/hooks/useFinance';
import { CreateQuoteDialog } from '@/components/employer/dialogs/CreateQuoteDialog';
import { CreateInvoiceDialog } from '@/components/employer/dialogs/CreateInvoiceDialog';
import { ViewQuoteSheet } from '@/components/employer/sheets/ViewQuoteSheet';
import { ViewInvoiceSheet } from '@/components/employer/sheets/ViewInvoiceSheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useQueryClient } from '@tanstack/react-query';
import { sortQuotes, sortInvoices } from '@/utils/financeSorting';
import type { Quote, Invoice } from '@/services/financeService';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/employer/editorial';

type RowKind = 'quote' | 'invoice';

interface CombinedRow {
  id: string;
  kind: RowKind;
  number: string;
  client: string;
  jobTitle: string | null;
  total: number;
  status: string;
  statusTone: Tone;
  timestamp: number;
  timeAgo: string;
  raw: Quote | Invoice;
}

function getInitials(name?: string | null) {
  if (!name) return '??';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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

function quoteStatusTone(status: string): Tone {
  switch (status) {
    case 'Approved':
      return 'emerald';
    case 'Sent':
      return 'blue';
    case 'Rejected':
      return 'red';
    case 'Draft':
    default:
      return 'amber';
  }
}

function invoiceStatusTone(status: string): Tone {
  switch (status) {
    case 'Paid':
      return 'emerald';
    case 'Overdue':
      return 'red';
    case 'Pending':
    default:
      return 'amber';
  }
}

function isWithin30Days(iso: string | null | undefined) {
  if (!iso) return false;
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return false;
  return Date.now() - then <= 30 * 24 * 60 * 60 * 1000;
}

function isThisMonth(iso: string | null | undefined) {
  if (!iso) return false;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return false;
  const now = new Date();
  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
}

export function QuotesInvoicesSection() {
  const [showCreateQuote, setShowCreateQuote] = useState(false);
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [convertQuote, setConvertQuote] = useState<Quote | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'quotes' | 'invoices' | 'overdue'>('all');

  const { data: quotes = [], isLoading: quotesLoading } = useQuotes();
  const { data: invoices = [], isLoading: invoicesLoading } = useInvoices();
  const sendQuoteMutation = useSendQuote();
  const markPaidMutation = useMarkInvoicePaid();
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['quotes'] }),
      queryClient.invalidateQueries({ queryKey: ['invoices'] }),
    ]);
  };

  const outstanding = useMemo(
    () =>
      invoices
        .filter((inv) => inv.status !== 'Paid')
        .reduce((acc, inv) => acc + Number(inv.amount || 0), 0),
    [invoices]
  );

  const paid30 = useMemo(
    () =>
      invoices
        .filter((inv) => inv.status === 'Paid' && isWithin30Days(inv.paid_date))
        .reduce((acc, inv) => acc + Number(inv.amount || 0), 0),
    [invoices]
  );

  const openQuotesValue = useMemo(
    () =>
      quotes
        .filter((q) => q.status === 'Draft' || q.status === 'Sent')
        .reduce((acc, q) => acc + Number(q.value || 0), 0),
    [quotes]
  );

  const wonThisMonth = useMemo(
    () => quotes.filter((q) => q.status === 'Approved' && isThisMonth(q.updated_at)).length,
    [quotes]
  );

  const overdueCount = useMemo(
    () => invoices.filter((inv) => inv.status === 'Overdue').length,
    [invoices]
  );

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
      status: q.status,
      statusTone: quoteStatusTone(q.status),
      timestamp: new Date(q.updated_at || q.created_at || 0).getTime() || 0,
      timeAgo: timeAgo(q.updated_at || q.created_at),
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
      raw: inv,
    }));
    return [...qRows, ...iRows].sort((a, b) => b.timestamp - a.timestamp);
  }, [sortedQuotes, sortedInvoices]);

  const filteredRows = useMemo(() => {
    const needle = searchQuery.trim().toLowerCase();
    return combined.filter((row) => {
      if (activeTab === 'quotes' && row.kind !== 'quote') return false;
      if (activeTab === 'invoices' && row.kind !== 'invoice') return false;
      if (activeTab === 'overdue' && row.status !== 'Overdue') return false;
      if (!needle) return true;
      return (
        row.client.toLowerCase().includes(needle) ||
        row.number.toLowerCase().includes(needle) ||
        (row.jobTitle?.toLowerCase().includes(needle) ?? false)
      );
    });
  }, [combined, activeTab, searchQuery]);

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
    { value: 'all', label: 'All', count: combined.length },
    { value: 'quotes', label: 'Quotes', count: quotes.length },
    { value: 'invoices', label: 'Invoices', count: invoices.length },
    { value: 'overdue', label: 'Overdue', count: overdueCount },
  ];

  const heroActions = (
    <>
      <PrimaryButton onClick={() => setShowCreateQuote(true)}>New quote</PrimaryButton>
      <SecondaryButton onClick={() => setShowCreateInvoice(true)}>New invoice</SecondaryButton>
      <IconButton onClick={handleRefresh} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  const body = (
    <PageFrame>
      <PageHero
        eyebrow="Money"
        title="Quotes & Invoices"
        description="Create, send, track and get paid."
        tone="yellow"
        actions={heroActions}
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : (
        <>
          <StatStrip
            columns={4}
            stats={[
              { label: 'Outstanding £', value: formatHero(outstanding), tone: 'amber' },
              { label: 'Paid 30d', value: formatHero(paid30), tone: 'emerald' },
              { label: 'Open quotes £', value: formatHero(openQuotesValue), tone: 'blue' },
              { label: 'Won this month', value: wonThisMonth, accent: true },
            ]}
          />

          <FilterBar
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(v) => setActiveTab(v as typeof activeTab)}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search quotes & invoices…"
          />

          <ListCard>
            <ListCardHeader
              tone="yellow"
              title="Quotes & Invoices"
              meta={<Pill tone="yellow">{filteredRows.length}</Pill>}
            />
            {filteredRows.length === 0 ? (
              <div className="p-2">
                <EmptyState
                  title={searchQuery ? 'No matches' : 'Nothing here yet'}
                  description={
                    searchQuery
                      ? 'Try a different client name, number or project.'
                      : 'Create your first quote or invoice to start tracking the money.'
                  }
                  action={searchQuery ? undefined : 'New quote'}
                  onAction={searchQuery ? undefined : () => setShowCreateQuote(true)}
                />
              </div>
            ) : (
              <ListBody>
                {filteredRows.map((row) => (
                  <ListRow
                    key={row.id}
                    lead={<Avatar initials={getInitials(row.client)} />}
                    title={`${row.kind.toUpperCase()} #${row.number} — ${row.client}`}
                    subtitle={`${row.jobTitle ? `${row.jobTitle} · ` : ''}£${formatMoney(
                      row.total
                    )} · ${row.timeAgo}`}
                    trailing={<Pill tone={row.statusTone}>{row.status}</Pill>}
                    onClick={() => openRow(row)}
                  />
                ))}
              </ListBody>
            )}
          </ListCard>
        </>
      )}

      <CreateQuoteDialog open={showCreateQuote} onOpenChange={setShowCreateQuote} />
      <CreateInvoiceDialog
        open={showCreateInvoice}
        onOpenChange={(open) => {
          setShowCreateInvoice(open);
          if (!open) setConvertQuote(null);
        }}
        fromQuote={convertQuote || undefined}
      />
      <ViewQuoteSheet
        open={!!selectedQuote}
        onOpenChange={(open) => !open && setSelectedQuote(null)}
        quote={selectedQuote}
        onConvertToInvoice={handleConvertToInvoice}
      />
      <ViewInvoiceSheet
        open={!!selectedInvoice}
        onOpenChange={(open) => !open && setSelectedInvoice(null)}
        invoice={selectedInvoice}
      />
    </PageFrame>
  );

  if (isMobile) {
    return (
      <PullToRefresh onRefresh={handleRefresh} className="px-4 pb-20">
        {body}
      </PullToRefresh>
    );
  }

  return body;
}
