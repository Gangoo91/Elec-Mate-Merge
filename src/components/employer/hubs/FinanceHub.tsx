import { Card, CardContent } from "@/components/ui/card";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import type { Section } from "@/pages/employer/EmployerDashboard";
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
  Package
} from "lucide-react";
import { useQuotes, useInvoices, useExpenseClaims, useMaterialOrders, useLowStockItems } from "@/hooks/useFinance";

interface FinanceHubProps {
  onNavigate: (section: Section) => void;
}

export function FinanceHub({ onNavigate }: FinanceHubProps) {
  const { data: quotes = [], isLoading: quotesLoading } = useQuotes();
  const { data: invoices = [], isLoading: invoicesLoading } = useInvoices();
  const { data: expenseClaims = [], isLoading: expensesLoading } = useExpenseClaims();
  const { data: materialOrders = [], isLoading: ordersLoading } = useMaterialOrders();
  const { data: lowStockItems = [], isLoading: lowStockLoading } = useLowStockItems();

  const isLoading = quotesLoading || invoicesLoading || expensesLoading || ordersLoading || lowStockLoading;

  const pendingExpenses = expenseClaims.filter(e => e.status === "Pending");
  const pendingInvoices = invoices.filter(i => i.status === "Pending");
  const overdueInvoices = invoices.filter(i => i.status === "Overdue");
  const pendingQuotes = quotes.filter(q => q.status === "Sent");
  const pendingOrders = materialOrders.filter(o => o.status !== "Delivered");

  // Calculate revenue from paid invoices
  const revenue = invoices
    .filter(i => i.status === "Paid")
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const totalPendingInvoices = pendingInvoices.reduce((sum, i) => sum + Number(i.amount), 0);
  const totalOverdueInvoices = overdueInvoices.reduce((sum, i) => sum + Number(i.amount), 0);

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <SectionHeader title="Finance Hub" description="Finances, expenses, and procurement" />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-32 shrink-0" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Finance Hub"
        description="Finances, expenses, and procurement"
      />

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">
                £{(revenue / 1000).toFixed(0)}k
              </p>
              <p className="text-xs text-muted-foreground">Revenue</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">
                £{(totalPendingInvoices / 1000).toFixed(0)}k
              </p>
              <p className="text-xs text-muted-foreground">Awaiting</p>
            </div>
          </CardContent>
        </Card>
        {totalOverdueInvoices > 0 && (
          <Card className="bg-destructive/10 border-destructive/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <PoundSterling className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-lg font-bold text-foreground">
                  £{(totalOverdueInvoices / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-muted-foreground">Overdue</p>
              </div>
            </CardContent>
          </Card>
        )}
        {pendingExpenses.length > 0 && (
          <Card className="bg-warning/10 border-warning/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <Receipt className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">
                  {pendingExpenses.length}
                </p>
                <p className="text-xs text-muted-foreground">Expenses</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Invoicing & Quotes */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Invoicing & Quotes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FeatureTile
            icon={FileText}
            title="Quotes & Invoices"
            description="Create and track financial documents"
            onClick={() => onNavigate("quotes")}
            badge={pendingQuotes.length > 0 ? `${pendingQuotes.length} pending` : undefined}
          />
          <FeatureTile
            icon={PenTool}
            title="Customer Signatures"
            description="Digital signature capture"
            onClick={() => onNavigate("signatures")}
          />
          <FeatureTile
            icon={Gavel}
            title="Tenders"
            description="AI-powered estimating and bids"
            onClick={() => onNavigate("tenders")}
          />
        </div>
      </div>

      {/* Expenses & Procurement */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-warning rounded-full"></span>
          Expenses & Procurement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FeatureTile
            icon={Receipt}
            title="Expense Claims"
            description="Review and approve team expenses"
            onClick={() => onNavigate("expenses")}
            badge={pendingExpenses.length > 0 ? `${pendingExpenses.length} pending` : undefined}
            badgeVariant="warning"
          />
          <FeatureTile
            icon={ShoppingCart}
            title="Procurement"
            description="Materials, suppliers, and equipment"
            onClick={() => onNavigate("procurement")}
            badge={pendingOrders.length > 0 ? `${pendingOrders.length} orders` : undefined}
          />
          <FeatureTile
            icon={Package}
            title="Price Book"
            description="Materials library with markup"
            onClick={() => onNavigate("pricebook")}
            badge={lowStockItems.length > 0 ? `${lowStockItems.length} low stock` : undefined}
            badgeVariant="warning"
          />
        </div>
      </div>

      {/* Job Financials */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-info rounded-full"></span>
          Job Financials
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <FeatureTile
            icon={CreditCard}
            title="Job Costs"
            description="Budget vs actual"
            onClick={() => onNavigate("financials")}
            compact
          />
          <FeatureTile
            icon={BarChart3}
            title="Reports"
            description="Analytics & insights"
            onClick={() => onNavigate("reports")}
            compact
          />
        </div>
      </div>
    </div>
  );
}
