import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEmployerDashboardStats } from "@/hooks/useEmployerDashboardStats";
import { useVacancyStats } from "@/hooks/useVacancies";
import type { Section } from "@/pages/employer/EmployerDashboard";
import {
  Users,
  Briefcase,
  AlertTriangle,
  ShieldCheck,
  PoundSterling,
  Sparkles,
  ChevronRight,
  Plus,
  FileText,
  Receipt,
  UserSearch,
  Bell,
  Loader2,
  TrendingUp,
  Calendar,
  Zap,
} from "lucide-react";

interface OverviewSectionProps {
  onNavigate: (section: Section) => void;
}

// Get greeting based on time of day
const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

// Format date nicely
const formatDate = (): string => {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
};

export function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const { stats, isLoading } = useEmployerDashboardStats();
  const { data: vacancyStats } = useVacancyStats();

  const {
    activeEmployees,
    activeJobs,
    expiringCertifications: expiringCerts,
    availableTalent,
    pendingExpenses,
    safetyScore,
    upcomingDeadlines,
  } = stats;

  const newApplications = vacancyStats?.newApplications || 0;

  // Calculate total attention items
  const attentionItems = [
    ...(expiringCerts > 0 ? [{ type: 'cert', count: expiringCerts, label: 'Expiring certifications', urgent: true, section: 'elecid' as Section }] : []),
    ...(pendingExpenses > 0 ? [{ type: 'expense', count: pendingExpenses, label: 'Pending expense claims', urgent: false, section: 'expenses' as Section }] : []),
    ...(newApplications > 0 ? [{ type: 'app', count: newApplications, label: 'New job applications', urgent: false, section: 'vacancies' as Section }] : []),
    ...upcomingDeadlines.filter(d => d.urgent).map(d => ({
      type: 'deadline',
      count: 1,
      label: d.title,
      urgent: true,
      section: 'elecid' as Section,
    })),
  ];

  // Determine if user is a sole trader
  const isSoloTrader = activeEmployees <= 1;

  // Stats configuration
  const statsConfig = [
    {
      icon: Users,
      value: activeEmployees,
      label: "Team",
      color: "elec-yellow",
      bgClass: "from-elec-yellow/20 to-elec-yellow/5",
      borderClass: "border-elec-yellow/30 hover:border-elec-yellow/60",
      textClass: "text-elec-yellow",
      section: "team" as Section,
    },
    {
      icon: Briefcase,
      value: activeJobs,
      label: "Active Jobs",
      color: "info",
      bgClass: "from-info/20 to-info/5",
      borderClass: "border-info/30 hover:border-info/60",
      textClass: "text-info",
      section: "jobs" as Section,
    },
    {
      icon: AlertTriangle,
      value: expiringCerts,
      label: "Alerts",
      color: expiringCerts > 0 ? "warning" : "muted",
      bgClass: expiringCerts > 0 ? "from-warning/20 to-warning/5" : "from-muted/20 to-muted/5",
      borderClass: expiringCerts > 0 ? "border-warning/50 hover:border-warning/80" : "border-muted/30 hover:border-muted/50",
      textClass: expiringCerts > 0 ? "text-warning" : "text-muted-foreground",
      section: "elecid" as Section,
      pulse: expiringCerts > 0,
    },
    {
      icon: ShieldCheck,
      value: `${safetyScore}%`,
      label: "Safety",
      color: "success",
      bgClass: "from-success/20 to-success/5",
      borderClass: "border-success/30 hover:border-success/60",
      textClass: "text-success",
      section: "safetyhub" as Section,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-6">
      {/* Hero Section with Gradient Background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-gray via-background to-elec-gray/50 border border-border/50 p-5 md:p-6">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-elec-yellow/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-info/5 rounded-full blur-2xl" />

        <div className="relative">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                <span className="hidden sm:inline">{getGreeting()}</span>
                <span className="sm:hidden">Dashboard</span>
              </h1>
              <div className="flex items-center gap-2 mt-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{formatDate()}</p>
              </div>
            </div>
            {/* Status indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs font-medium text-success">All systems go</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats - Hidden on mobile for native app feel */}
      <div className="hidden sm:grid grid-cols-4 gap-2 md:gap-3">
        {statsConfig.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={`relative overflow-hidden border-2 ${stat.borderClass} bg-gradient-to-br ${stat.bgClass} cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
              onClick={() => onNavigate(stat.section)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {stat.pulse && (
                <div className="absolute top-2 right-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-warning"></span>
                  </span>
                </div>
              )}
              <CardContent className="p-3 md:p-4 flex flex-col items-center text-center">
                <div className={`p-2 md:p-2.5 rounded-xl bg-background/60 backdrop-blur-sm mb-2`}>
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

      {/* Needs Attention Card */}
      {attentionItems.length > 0 && (
        <Card className="border-2 border-warning/30 bg-gradient-to-r from-warning/5 via-background to-warning/5 overflow-hidden">
          <CardHeader className="pb-2 pt-4 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-warning/20">
                  <Bell className="h-4 w-4 text-warning" />
                </div>
                <CardTitle className="text-base font-semibold">Needs Attention</CardTitle>
              </div>
              <Badge className="bg-warning/20 text-warning border-warning/30 font-semibold">
                {attentionItems.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-1">
            <div className="space-y-1.5">
              {attentionItems.slice(0, 4).map((item, index) => (
                <button
                  key={`${item.type}-${index}`}
                  onClick={() => onNavigate(item.section)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-background/60 hover:bg-background/90 border border-border/50 hover:border-warning/30 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${item.urgent ? 'bg-warning' : 'bg-muted-foreground/50'}`}>
                      {item.urgent && (
                        <span className="absolute w-2.5 h-2.5 rounded-full bg-warning animate-ping opacity-75" />
                      )}
                    </div>
                    <span className="text-sm font-medium">
                      {item.count > 1 ? `${item.count} ${item.label}` : item.label}
                    </span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-warning group-hover:translate-x-0.5 transition-all" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>
          <Zap className="h-4 w-4 text-elec-yellow" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Plus, label: "New Job", color: "elec-yellow", section: "jobs" as Section },
            { icon: FileText, label: "Quote", color: "info", section: "quotes" as Section },
            { icon: isSoloTrader ? PoundSterling : UserSearch, label: isSoloTrader ? "Invoice" : "Sparkies", color: "success", section: (isSoloTrader ? "invoices" : "talentpool") as Section, badge: !isSoloTrader && availableTalent > 0 ? availableTalent : undefined },
            { icon: Receipt, label: "Expense", color: "warning", section: "expenses" as Section, badge: pendingExpenses > 0 ? pendingExpenses : undefined },
          ].map((action) => {
            const Icon = action.icon;
            const colorMap: Record<string, string> = {
              'elec-yellow': 'text-elec-yellow bg-elec-yellow/10 hover:bg-elec-yellow/20 border-elec-yellow/20 hover:border-elec-yellow/40',
              'info': 'text-info bg-info/10 hover:bg-info/20 border-info/20 hover:border-info/40',
              'success': 'text-success bg-success/10 hover:bg-success/20 border-success/20 hover:border-success/40',
              'warning': 'text-warning bg-warning/10 hover:bg-warning/20 border-warning/20 hover:border-warning/40',
            };
            return (
              <button
                key={action.label}
                onClick={() => onNavigate(action.section)}
                className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${colorMap[action.color]}`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] md:text-xs font-medium text-foreground">{action.label}</span>
                {action.badge && action.badge > 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] rounded-full text-[10px] font-bold flex items-center justify-center px-1 ${
                    action.color === 'success' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'
                  }`}>
                    {action.badge > 9 ? '9+' : action.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Hub Grid - 2x2 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Your Hubs</h2>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* People Hub */}
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-elec-yellow/50 bg-gradient-to-br from-elec-gray/50 via-background to-elec-yellow/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/5"
            onClick={() => onNavigate("peoplehub")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/0 to-elec-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                  <Users className="h-5 w-5 text-elec-yellow" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">People</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Team, hiring, talent
              </p>
              {!isSoloTrader && newApplications > 0 && (
                <Badge className="mt-2.5 bg-warning/20 text-warning border-warning/30 text-xs font-medium">
                  {newApplications} new apps
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Jobs Hub */}
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-info/50 bg-gradient-to-br from-elec-gray/50 via-background to-info/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-info/5"
            onClick={() => onNavigate("jobshub")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-info/0 to-info/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-info/10 group-hover:bg-info/20 transition-colors duration-300">
                  <Briefcase className="h-5 w-5 text-info" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-info group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Jobs</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Projects & tracking
              </p>
              {activeJobs > 0 && (
                <Badge className="mt-2.5 bg-info/20 text-info border-info/30 text-xs font-medium">
                  {activeJobs} active
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Finance Hub */}
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-success/50 bg-gradient-to-br from-elec-gray/50 via-background to-success/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-success/5"
            onClick={() => onNavigate("financehub")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success/0 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors duration-300">
                  <PoundSterling className="h-5 w-5 text-success" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-success group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Finance</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Quotes & invoices
              </p>
              {pendingExpenses > 0 && (
                <Badge className="mt-2.5 bg-warning/20 text-warning border-warning/30 text-xs font-medium">
                  {pendingExpenses} pending
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Safety Hub */}
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-orange-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-orange-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5"
            onClick={() => onNavigate("safetyhub")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <ShieldCheck className="h-5 w-5 text-orange-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">HR & Safety</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                RAMS & compliance
              </p>
              {expiringCerts > 0 && (
                <Badge className="mt-2.5 bg-warning/20 text-warning border-warning/30 text-xs font-medium">
                  {expiringCerts} alerts
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Smart Docs - Premium Full Width Card */}
      <Card
        className="group relative overflow-hidden border-2 border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
        onClick={() => onNavigate("smartdocs")}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-elec-yellow/5 to-purple-500/10 bg-[length:200%_100%] group-hover:animate-shimmer" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-elec-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="relative p-4 md:p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-elec-yellow rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative p-3.5 rounded-2xl bg-gradient-to-br from-purple-500/20 to-elec-yellow/20 group-hover:from-purple-500/30 group-hover:to-elec-yellow/30 transition-colors border border-purple-500/20">
                <Sparkles className="h-6 w-6 text-elec-yellow" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                Smart Docs
                <Badge className="bg-purple-500/90 text-white border-purple-400 text-xs font-semibold shadow-sm">
                  AI Powered
                </Badge>
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                Generate RAMS, designs & quotes instantly
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
        </CardContent>
      </Card>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4 bg-card p-6 rounded-2xl border-2 border-elec-yellow/20 shadow-2xl">
            <div className="relative">
              <div className="absolute inset-0 bg-elec-yellow/20 rounded-full blur-xl animate-pulse" />
              <Loader2 className="relative h-8 w-8 animate-spin text-elec-yellow" />
            </div>
            <span className="text-sm font-medium">Loading dashboard...</span>
          </div>
        </div>
      )}
    </div>
  );
}
