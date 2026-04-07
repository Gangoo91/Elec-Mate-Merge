import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BusinessCard from '@/components/business-hub/BusinessCard';
import { useEmployerDashboardStats } from '@/hooks/useEmployerDashboardStats';
import { useVacancyStats } from '@/hooks/useVacancies';
import type { Section } from '@/pages/employer/EmployerDashboard';
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
  Bell,
  TrendingUp,
  Cpu,
  Loader2,
} from 'lucide-react';

interface OverviewSectionProps {
  onNavigate: (section: Section) => void;
}

// Get greeting based on time of day
const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
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
    ...(expiringCerts > 0
      ? [
          {
            type: 'cert',
            count: expiringCerts,
            label: 'Expiring certifications',
            urgent: true,
            section: 'elecid' as Section,
          },
        ]
      : []),
    ...(pendingExpenses > 0
      ? [
          {
            type: 'expense',
            count: pendingExpenses,
            label: 'Pending expense claims',
            urgent: false,
            section: 'expenses' as Section,
          },
        ]
      : []),
    ...(newApplications > 0
      ? [
          {
            type: 'app',
            count: newApplications,
            label: 'New job applications',
            urgent: false,
            section: 'vacancies' as Section,
          },
        ]
      : []),
    ...upcomingDeadlines
      .filter((d) => d.urgent)
      .map((d) => ({
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
      label: 'Team',
      color: 'elec-yellow',
      bgClass: 'from-elec-yellow/20 to-elec-yellow/5',
      borderClass: 'border-elec-yellow/30 hover:border-elec-yellow/60',
      textClass: 'text-elec-yellow',
      section: 'team' as Section,
    },
    {
      icon: Briefcase,
      value: activeJobs,
      label: 'Active Jobs',
      color: 'info',
      bgClass: 'from-info/20 to-info/5',
      borderClass: 'border-info/30 hover:border-info/60',
      textClass: 'text-info',
      section: 'jobs' as Section,
    },
    {
      icon: AlertTriangle,
      value: expiringCerts,
      label: 'Alerts',
      color: expiringCerts > 0 ? 'warning' : 'muted',
      bgClass: expiringCerts > 0 ? 'from-warning/20 to-warning/5' : 'from-muted/20 to-muted/5',
      borderClass:
        expiringCerts > 0
          ? 'border-warning/50 hover:border-warning/80'
          : 'border-muted/30 hover:border-muted/50',
      textClass: expiringCerts > 0 ? 'text-warning' : 'text-white/60',
      section: 'elecid' as Section,
      pulse: expiringCerts > 0,
    },
    {
      icon: ShieldCheck,
      value: `${safetyScore}%`,
      label: 'Safety',
      color: 'success',
      bgClass: 'from-success/20 to-success/5',
      borderClass: 'border-success/30 hover:border-success/60',
      textClass: 'text-success',
      section: 'safetyhub' as Section,
    },
  ];

  return (
    <div className="space-y-5 animate-fade-in pb-6">
      {/* KPI Strip — 4 stats in a row */}
      <div className="grid grid-cols-4 gap-2">
        {statsConfig.map((stat) => {
          const Icon = stat.icon;
          return (
            <button
              key={stat.label}
              onClick={() => onNavigate(stat.section)}
              className="relative flex flex-col items-center gap-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] touch-manipulation active:scale-[0.97] transition-transform"
            >
              {stat.pulse && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              )}
              <Icon className={`h-4 w-4 ${stat.textClass}`} />
              <span className={`text-lg font-bold ${stat.textClass} tabular-nums`}>{stat.value}</span>
              <span className="text-[9px] text-white/50 font-medium">{stat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Needs Attention — compact */}
      {attentionItems.length > 0 && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] p-4 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">Needs attention</span>
            </div>
            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
              {attentionItems.length}
            </span>
          </div>
          {attentionItems.slice(0, 3).map((item, index) => (
            <button
              key={`${item.type}-${index}`}
              onClick={() => onNavigate(item.section)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/20 transition-colors text-left group touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-1.5 h-1.5 rounded-full ${item.urgent ? 'bg-amber-400' : 'bg-white/30'}`} />
                <span className="text-sm text-white">
                  {item.count > 1 ? `${item.count} ${item.label}` : item.label}
                </span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-white group-hover:text-amber-400 transition-colors" />
            </button>
          ))}
        </div>
      )}

      {/* Quick Actions — clean row */}
      <div>
        <h2 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: Plus, label: 'New Job', color: 'text-elec-yellow', bg: 'bg-elec-yellow/10 border-elec-yellow/20', section: 'jobs' as Section },
            { icon: FileText, label: 'Quote', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', section: 'quotes' as Section },
            { icon: PoundSterling, label: 'Invoice', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', section: 'invoices' as Section },
            { icon: Receipt, label: 'Expense', color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', section: 'expenses' as Section },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => onNavigate(action.section)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border ${action.bg} touch-manipulation active:scale-[0.95] transition-transform`}
              >
                <Icon className={`h-5 w-5 ${action.color}`} />
                <span className="text-[10px] font-medium text-white">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Hub Grid - 2x2 using BusinessCard */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider">Your Hubs</h2>
          <TrendingUp className="h-4 w-4 text-white/60" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="People"
            description="Team, hiring, talent"
            icon={Users}
            onClick={() => onNavigate('peoplehub')}
            accentColor="from-elec-yellow via-amber-400 to-orange-400"
            iconColor="text-elec-yellow"
            iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
            liveSubtitle={!isSoloTrader && newApplications > 0 ? `${newApplications} new apps` : undefined}
          />
          <BusinessCard
            title="Jobs"
            description="Projects & tracking"
            icon={Briefcase}
            onClick={() => onNavigate('jobshub')}
            accentColor="from-blue-500 via-blue-400 to-cyan-400"
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10 border border-blue-500/20"
            liveSubtitle={activeJobs > 0 ? `${activeJobs} active` : undefined}
          />
          <BusinessCard
            title="Finance"
            description="Quotes & invoices"
            icon={PoundSterling}
            onClick={() => onNavigate('financehub')}
            accentColor="from-emerald-500 via-green-400 to-teal-400"
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border border-emerald-500/20"
            liveSubtitle={pendingExpenses > 0 ? `${pendingExpenses} pending` : undefined}
          />
          <BusinessCard
            title="HR & Safety"
            description="RAMS & compliance"
            icon={ShieldCheck}
            onClick={() => onNavigate('safetyhub')}
            accentColor="from-orange-500 via-amber-400 to-red-400"
            iconColor="text-orange-400"
            iconBg="bg-orange-500/10 border border-orange-500/20"
            liveSubtitle={expiringCerts > 0 ? `${expiringCerts} alerts` : undefined}
          />
        </div>
      </div>

      {/* Smart Docs - Premium Full Width Card */}
      <Card
        className="group relative overflow-hidden border-2 border-purple-500/30 hover:border-purple-500/60 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 touch-manipulation active:scale-[0.99]"
        onClick={() => onNavigate('smartdocs')}
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
              <p className="text-sm text-white/60 mt-0.5">
                Generate RAMS, designs & quotes instantly
              </p>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-white/60 group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300" />
        </CardContent>
      </Card>

      {/* Loading indicator - subtle, non-blocking */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-2 text-white/60">
          <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
          <span className="text-xs">Syncing...</span>
        </div>
      )}
    </div>
  );
}
