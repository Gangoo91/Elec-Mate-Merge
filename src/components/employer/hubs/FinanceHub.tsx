import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  useQuotes,
  useInvoices,
  useExpenseClaims,
  useMaterialOrders,
  useLowStockItems,
} from '@/hooks/useFinance';
import {
  HubLanding,
  SectionHeader,
  HubGrid,
  HubCard,
  LoadingBlocks,
} from '@/components/employer/editorial';

interface FinanceHubProps {
  onNavigate: (section: Section) => void;
}

export function FinanceHub({ onNavigate }: FinanceHubProps) {
  const { data: quotes = [], isLoading: quotesLoading } = useQuotes();
  const { data: invoices = [], isLoading: invoicesLoading } = useInvoices();
  const { data: expenseClaims = [], isLoading: expensesLoading } = useExpenseClaims();
  const { data: materialOrders = [], isLoading: ordersLoading } = useMaterialOrders();
  const { data: lowStockItems = [], isLoading: lowStockLoading } = useLowStockItems();

  const isLoading =
    quotesLoading || invoicesLoading || expensesLoading || ordersLoading || lowStockLoading;

  const pendingExpenses = expenseClaims.filter((e) => e.status === 'Pending');
  const pendingInvoices = invoices.filter((i) => i.status === 'Pending');
  const overdueInvoices = invoices.filter((i) => i.status === 'Overdue');
  const pendingQuotes = quotes.filter((q) => q.status === 'Sent');
  const pendingOrders = materialOrders.filter(
    (o) => !['Received', 'Cancelled'].includes(o.status)
  );

  const revenue = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const totalPendingInvoices = pendingInvoices.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalOverdueInvoices = overdueInvoices.reduce((sum, i) => sum + Number(i.amount), 0);

  if (isLoading) {
    return (
      <HubLanding
        eyebrow="Money"
        title="Finance"
        description="Quotes, invoices, tenders, expenses and reporting."
        tone="emerald"
      >
        <LoadingBlocks />
      </HubLanding>
    );
  }

  // £450 not £0.5k; £12,400 → £12.4k
  const fmtMoney = (v: number) =>
    v >= 1000 ? `£${(v / 1000).toFixed(1).replace(/\.0$/, '')}k` : `£${Math.round(v)}`;

  return (
    <HubLanding
      eyebrow="Money"
      title="Finance"
      description="Quotes, invoices, tenders, expenses and reporting."
      tone="emerald"
      stats={[
        {
          label: 'Outstanding £',
          value: fmtMoney(totalPendingInvoices + totalOverdueInvoices),
          tone: 'amber',
          onClick: () => onNavigate('quotes'),
        },
        {
          label: 'Paid invoices',
          value: fmtMoney(revenue),
          tone: 'emerald',
          onClick: () => onNavigate('reports'),
        },
        {
          label: 'Open quotes',
          value: pendingQuotes.length,
          tone: 'blue',
          onClick: () => onNavigate('quotes'),
        },
        {
          label: 'Overdue £',
          value: fmtMoney(totalOverdueInvoices),
          tone: 'red',
          accent: true,
          onClick: () => onNavigate('quotes'),
        },
      ]}
    >
      <SectionHeader eyebrow="Money flows" title="Quote, invoice, report" />

      <HubGrid columns={2}>
        <HubCard
          number="01"
          eyebrow="Customers"
          title="Clients"
          description="Every customer in one place — their quotes, invoices, jobs and balance."
          tone="yellow"
          onClick={() => onNavigate('clients')}
        />
        <HubCard
          number="02"
          eyebrow="Documents"
          title="Quotes & Invoices"
          description="Create, send and track quotes and invoices end to end."
          meta={
            pendingQuotes.length > 0
              ? `${pendingQuotes.length} pending · ${fmtMoney(totalPendingInvoices)} awaiting`
              : `${fmtMoney(totalPendingInvoices)} awaiting`
          }
          tone="yellow"
          onClick={() => onNavigate('quotes')}
        />
        <HubCard
          number="03"
          eyebrow="Bidding"
          title="Tenders"
          description="AI-powered estimating and bid responses."
          tone="purple"
          onClick={() => onNavigate('tenders')}
        />
        <HubCard
          number="04"
          eyebrow="Outgoings"
          title="Expenses"
          description="Review, approve and reimburse team expense claims."
          meta={pendingExpenses.length > 0 ? `${pendingExpenses.length} pending` : 'Up to date'}
          tone="orange"
          onClick={() => onNavigate('expenses')}
        />
        <HubCard
          number="05"
          eyebrow="Materials"
          title="Purchase orders"
          description="Raise POs, track suppliers and deliveries."
          meta={pendingOrders.length > 0 ? `${pendingOrders.length} open orders` : 'No open orders'}
          tone="cyan"
          onClick={() => onNavigate('procurement')}
        />
        <HubCard
          number="06"
          eyebrow="Profitability"
          title="Job Financials"
          description="Budget versus actual, margin and labour costs per job."
          tone="emerald"
          onClick={() => onNavigate('financials')}
        />
        <HubCard
          number="07"
          eyebrow="Insight"
          title="Reports"
          description="Revenue, cashflow and pipeline analytics."
          meta={`Revenue ${fmtMoney(revenue)}`}
          tone="blue"
          onClick={() => onNavigate('reports')}
        />
        <HubCard
          number="08"
          eyebrow="Sign-off"
          title="Signatures"
          description="Capture digital signatures on quotes and certificates."
          tone="indigo"
          onClick={() => onNavigate('signatures')}
        />
        <HubCard
          number="09"
          eyebrow="Pricing"
          title="Price Book"
          description="Materials catalogue, markup and stock levels."
          meta={lowStockItems.length > 0 ? `${lowStockItems.length} low stock` : 'Stock healthy'}
          tone="amber"
          onClick={() => onNavigate('pricebook')}
        />
      </HubGrid>
    </HubLanding>
  );
}
