import BusinessCard from '@/components/business-hub/BusinessCard';
import type { Section } from '@/pages/employer/EmployerDashboard';
import {
  PoundSterling,
  Receipt,
  FileText,
  TrendingUp,
  ShoppingCart,
  Gavel,
  BarChart3,
  CreditCard,
  PenTool,
  Package,
  AlertTriangle,
} from 'lucide-react';
import { HubSkeleton } from '@/components/employer/skeletons';
import {
  useQuotes,
  useInvoices,
  useExpenseClaims,
  useMaterialOrders,
  useLowStockItems,
} from '@/hooks/useFinance';

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

  // Calculate revenue from paid invoices
  const revenue = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const totalPendingInvoices = pendingInvoices.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalOverdueInvoices = overdueInvoices.reduce((sum, i) => sum + Number(i.amount), 0);

  // Stats configuration
  const statsConfig = [
    {
      icon: TrendingUp,
      value: `£${(revenue / 1000).toFixed(0)}k`,
      label: 'Revenue',
      bgClass: 'from-success/20 to-success/5',
      borderClass: 'border-success/30 hover:border-success/60',
      textClass: 'text-success',
      section: 'reports' as Section,
    },
    {
      icon: FileText,
      value: `£${(totalPendingInvoices / 1000).toFixed(0)}k`,
      label: 'Awaiting',
      bgClass: 'from-info/20 to-info/5',
      borderClass: 'border-info/30 hover:border-info/60',
      textClass: 'text-info',
      section: 'quotes' as Section,
    },
    {
      icon: AlertTriangle,
      value: `£${(totalOverdueInvoices / 1000).toFixed(0)}k`,
      label: 'Overdue',
      bgClass:
        totalOverdueInvoices > 0
          ? 'from-destructive/20 to-destructive/5'
          : 'from-muted/20 to-muted/5',
      borderClass:
        totalOverdueInvoices > 0
          ? 'border-destructive/50 hover:border-destructive/80'
          : 'border-muted/30 hover:border-muted/50',
      textClass: totalOverdueInvoices > 0 ? 'text-destructive' : 'text-white',
      section: 'quotes' as Section,
      pulse: totalOverdueInvoices > 0,
    },
    {
      icon: Receipt,
      value: pendingExpenses.length,
      label: 'Expenses',
      bgClass:
        pendingExpenses.length > 0 ? 'from-warning/20 to-warning/5' : 'from-muted/20 to-muted/5',
      borderClass:
        pendingExpenses.length > 0
          ? 'border-warning/50 hover:border-warning/80'
          : 'border-muted/30 hover:border-muted/50',
      textClass: pendingExpenses.length > 0 ? 'text-warning' : 'text-white',
      section: 'expenses' as Section,
    },
  ];

  if (isLoading) {
    return <HubSkeleton statCount={4} cardCount={3} columns={2} />;
  }

  return (
    <div className="space-y-5 pb-6 animate-fade-in">
      {/* Invoicing & Quotes */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Invoicing & Quotes
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Quotes & Invoices"
            description="Create & track docs"
            icon={FileText}
            onClick={() => onNavigate('quotes')}
            accentColor="from-emerald-500 via-emerald-400 to-green-400"
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border border-emerald-500/20"
            liveSubtitle={pendingQuotes.length > 0 ? `${pendingQuotes.length} pending` : undefined}
          />
          <BusinessCard
            title="Signatures"
            description="Digital sign capture"
            icon={PenTool}
            onClick={() => onNavigate('signatures')}
            accentColor="from-purple-500 via-violet-400 to-indigo-400"
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10 border border-purple-500/20"
          />
          <BusinessCard
            title="Tenders"
            description="AI-powered estimating & bids"
            icon={Gavel}
            onClick={() => onNavigate('tenders')}
            accentColor="from-elec-yellow via-amber-400 to-orange-400"
            iconColor="text-elec-yellow"
            iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
          />
        </div>
      </section>

      {/* Expenses & Procurement */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Expenses & Procurement
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Expense Claims"
            description="Review & approve"
            icon={Receipt}
            onClick={() => onNavigate('expenses')}
            accentColor="from-orange-500 via-amber-400 to-red-400"
            iconColor="text-orange-400"
            iconBg="bg-orange-500/10 border border-orange-500/20"
            liveSubtitle={pendingExpenses.length > 0 ? `${pendingExpenses.length} pending` : undefined}
          />
          <BusinessCard
            title="Procurement"
            description="Materials & suppliers"
            icon={ShoppingCart}
            onClick={() => onNavigate('procurement')}
            accentColor="from-blue-500 via-blue-400 to-cyan-400"
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10 border border-blue-500/20"
            liveSubtitle={pendingOrders.length > 0 ? `${pendingOrders.length} orders` : undefined}
          />
          <BusinessCard
            title="Price Book"
            description="Materials & markup"
            icon={Package}
            onClick={() => onNavigate('pricebook')}
            accentColor="from-amber-500 via-orange-400 to-orange-500"
            iconColor="text-amber-400"
            iconBg="bg-amber-500/10 border border-amber-500/20"
            liveSubtitle={lowStockItems.length > 0 ? `${lowStockItems.length} low stock` : undefined}
          />
        </div>
      </section>

      {/* Job Financials */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Job Financials
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Job Costs"
            description="Budget vs actual"
            icon={CreditCard}
            onClick={() => onNavigate('financials')}
            accentColor="from-cyan-500 via-blue-400 to-blue-500"
            iconColor="text-cyan-400"
            iconBg="bg-cyan-500/10 border border-cyan-500/20"
          />
          <BusinessCard
            title="Reports"
            description="Analytics & insights"
            icon={BarChart3}
            onClick={() => onNavigate('reports')}
            accentColor="from-rose-500 via-pink-400 to-red-400"
            iconColor="text-rose-400"
            iconBg="bg-rose-500/10 border border-rose-500/20"
          />
        </div>
      </section>
    </div>
  );
}
