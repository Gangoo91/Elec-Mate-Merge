import type { Section } from '@/pages/employer/EmployerDashboard';
import { HubSkeleton } from '@/components/employer/skeletons';
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
  const pendingOrders = materialOrders.filter((o) => o.status !== 'Delivered');

  const revenue = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const totalPendingInvoices = pendingInvoices.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalOverdueInvoices = overdueInvoices.reduce((sum, i) => sum + Number(i.amount), 0);

  if (isLoading) {
    return <HubSkeleton statCount={4} cardCount={3} columns={2} />;
  }

  const fmtMoney = (v: number) => `£${(v / 1000).toFixed(v >= 1000 ? 1 : 0)}k`;

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
          label: 'Won this month',
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
          label: 'Profit 30d',
          value: fmtMoney(Math.max(revenue - totalOverdueInvoices, 0)),
          accent: true,
          onClick: () => onNavigate('financials'),
        },
      ]}
    >
      <SectionHeader eyebrow="Money flows" title="Quote, invoice, report" />

      <HubGrid columns={2}>
        <HubCard
          number="01"
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
          number="02"
          eyebrow="Bidding"
          title="Tenders"
          description="AI-powered estimating and bid responses."
          tone="purple"
          onClick={() => onNavigate('tenders')}
        />
        <HubCard
          number="03"
          eyebrow="Outgoings"
          title="Expenses"
          description="Review, approve and reimburse team expense claims."
          meta={pendingExpenses.length > 0 ? `${pendingExpenses.length} pending` : 'Up to date'}
          tone="orange"
          onClick={() => onNavigate('expenses')}
        />
        <HubCard
          number="04"
          eyebrow="Materials"
          title="Procurement"
          description="Material orders, suppliers and delivery tracking."
          meta={pendingOrders.length > 0 ? `${pendingOrders.length} open orders` : 'No open orders'}
          tone="cyan"
          onClick={() => onNavigate('procurement')}
        />
        <HubCard
          number="05"
          eyebrow="Profitability"
          title="Job Financials"
          description="Budget versus actual, margin and labour costs per job."
          tone="emerald"
          onClick={() => onNavigate('financials')}
        />
        <HubCard
          number="06"
          eyebrow="Insight"
          title="Reports"
          description="Revenue, cashflow and pipeline analytics."
          meta={`Revenue ${fmtMoney(revenue)}`}
          tone="blue"
          onClick={() => onNavigate('reports')}
        />
        <HubCard
          number="07"
          eyebrow="Sign-off"
          title="Signatures"
          description="Capture digital signatures on quotes and certificates."
          tone="indigo"
          onClick={() => onNavigate('signatures')}
        />
        <HubCard
          number="08"
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
