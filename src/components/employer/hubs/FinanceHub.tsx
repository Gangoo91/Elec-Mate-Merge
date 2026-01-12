import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Package,
  ChevronRight,
  Loader2,
  AlertTriangle,
  Zap,
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

  // Stats configuration
  const statsConfig = [
    {
      icon: TrendingUp,
      value: `£${(revenue / 1000).toFixed(0)}k`,
      label: "Revenue",
      bgClass: "from-success/20 to-success/5",
      borderClass: "border-success/30 hover:border-success/60",
      textClass: "text-success",
      section: "reports" as Section,
    },
    {
      icon: FileText,
      value: `£${(totalPendingInvoices / 1000).toFixed(0)}k`,
      label: "Awaiting",
      bgClass: "from-info/20 to-info/5",
      borderClass: "border-info/30 hover:border-info/60",
      textClass: "text-info",
      section: "quotes" as Section,
    },
    {
      icon: AlertTriangle,
      value: `£${(totalOverdueInvoices / 1000).toFixed(0)}k`,
      label: "Overdue",
      bgClass: totalOverdueInvoices > 0 ? "from-destructive/20 to-destructive/5" : "from-muted/20 to-muted/5",
      borderClass: totalOverdueInvoices > 0 ? "border-destructive/50 hover:border-destructive/80" : "border-muted/30 hover:border-muted/50",
      textClass: totalOverdueInvoices > 0 ? "text-destructive" : "text-muted-foreground",
      section: "quotes" as Section,
      pulse: totalOverdueInvoices > 0,
    },
    {
      icon: Receipt,
      value: pendingExpenses.length,
      label: "Expenses",
      bgClass: pendingExpenses.length > 0 ? "from-warning/20 to-warning/5" : "from-muted/20 to-muted/5",
      borderClass: pendingExpenses.length > 0 ? "border-warning/50 hover:border-warning/80" : "border-muted/30 hover:border-muted/50",
      textClass: pendingExpenses.length > 0 ? "text-warning" : "text-muted-foreground",
      section: "expenses" as Section,
    },
  ];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4 bg-card p-6 rounded-2xl border-2 border-success/20 shadow-2xl">
          <div className="relative">
            <div className="absolute inset-0 bg-success/20 rounded-full blur-xl animate-pulse" />
            <Loader2 className="relative h-8 w-8 animate-spin text-success" />
          </div>
          <span className="text-sm font-medium">Loading Finance Hub...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-6">
      {/* Overdue warning badge */}
      {totalOverdueInvoices > 0 && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 w-fit">
          <AlertTriangle className="h-3.5 w-3.5 text-destructive" />
          <span className="text-xs font-medium text-destructive">£{(totalOverdueInvoices / 1000).toFixed(0)}k overdue</span>
        </div>
      )}

      {/* Quick Stats - Centered Grid */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {statsConfig.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={`relative overflow-hidden border-2 ${stat.borderClass} bg-gradient-to-br ${stat.bgClass} cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] touch-manipulation`}
              onClick={() => onNavigate(stat.section)}
            >
              {stat.pulse && (
                <div className="absolute top-2 right-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive"></span>
                  </span>
                </div>
              )}
              <CardContent className="p-3 md:p-4 flex flex-col items-center text-center">
                <div className="p-2 md:p-2.5 rounded-xl bg-background/60 backdrop-blur-sm mb-2">
                  <Icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.textClass}`} />
                </div>
                <p className={`text-xl md:text-2xl font-bold ${stat.textClass} tabular-nums`}>
                  {stat.value}
                </p>
                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Invoicing & Quotes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-success rounded-full"></span>
            Invoicing & Quotes
          </h2>
          <TrendingUp className="h-4 w-4 text-success" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-success/50 bg-gradient-to-br from-elec-gray/50 via-background to-success/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-success/5"
            onClick={() => onNavigate("quotes")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success/0 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors duration-300">
                  <FileText className="h-5 w-5 text-success" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-success group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Quotes & Invoices</h3>
              <p className="text-xs text-muted-foreground">
                Create & track docs
              </p>
              {pendingQuotes.length > 0 && (
                <Badge className="mt-2.5 bg-info/20 text-info border-info/30 text-xs font-medium">
                  {pendingQuotes.length} pending
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-purple-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-purple-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5"
            onClick={() => onNavigate("signatures")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                  <PenTool className="h-5 w-5 text-purple-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Signatures</h3>
              <p className="text-xs text-muted-foreground">
                Digital sign capture
              </p>
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-elec-yellow/50 bg-gradient-to-br from-elec-gray/50 via-background to-elec-yellow/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/5 col-span-2"
            onClick={() => onNavigate("tenders")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/0 to-elec-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                  <Gavel className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    Tenders
                    <Badge className="bg-purple-500/90 text-white border-purple-400 text-xs font-semibold">
                      AI
                    </Badge>
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    AI-powered estimating & bids
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all duration-300" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Expenses & Procurement */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-warning rounded-full"></span>
            Expenses & Procurement
          </h2>
          <Zap className="h-4 w-4 text-warning" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-warning/50 bg-gradient-to-br from-elec-gray/50 via-background to-warning/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-warning/5"
            onClick={() => onNavigate("expenses")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warning/0 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-warning/10 group-hover:bg-warning/20 transition-colors duration-300">
                  <Receipt className="h-5 w-5 text-warning" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-warning group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Expense Claims</h3>
              <p className="text-xs text-muted-foreground">
                Review & approve
              </p>
              {pendingExpenses.length > 0 && (
                <Badge className="mt-2.5 bg-warning/20 text-warning border-warning/30 text-xs font-medium">
                  {pendingExpenses.length} pending
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-info/50 bg-gradient-to-br from-elec-gray/50 via-background to-info/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-info/5"
            onClick={() => onNavigate("procurement")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-info/0 to-info/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-info/10 group-hover:bg-info/20 transition-colors duration-300">
                  <ShoppingCart className="h-5 w-5 text-info" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-info group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Procurement</h3>
              <p className="text-xs text-muted-foreground">
                Materials & suppliers
              </p>
              {pendingOrders.length > 0 && (
                <Badge className="mt-2.5 bg-info/20 text-info border-info/30 text-xs font-medium">
                  {pendingOrders.length} orders
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-orange-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-orange-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5"
            onClick={() => onNavigate("pricebook")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <Package className="h-5 w-5 text-orange-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Price Book</h3>
              <p className="text-xs text-muted-foreground">
                Materials & markup
              </p>
              {lowStockItems.length > 0 && (
                <Badge className="mt-2.5 bg-warning/20 text-warning border-warning/30 text-xs font-medium">
                  {lowStockItems.length} low stock
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Job Financials */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-info rounded-full"></span>
            Job Financials
          </h2>
          <BarChart3 className="h-4 w-4 text-info" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-cyan-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-cyan-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
            onClick={() => onNavigate("financials")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <CreditCard className="h-5 w-5 text-cyan-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Job Costs</h3>
              <p className="text-xs text-muted-foreground">
                Budget vs actual
              </p>
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-pink-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-pink-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/5"
            onClick={() => onNavigate("reports")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors duration-300">
                  <BarChart3 className="h-5 w-5 text-pink-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-pink-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Reports</h3>
              <p className="text-xs text-muted-foreground">
                Analytics & insights
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
