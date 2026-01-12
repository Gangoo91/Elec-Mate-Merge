import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Section } from "@/pages/employer/EmployerDashboard";
import {
  Users,
  UserSearch,
  Briefcase,
  CreditCard,
  Clock,
  MessageSquare,
  UserPlus,
  ChevronRight,
  TrendingUp,
  Zap,
  Bell,
} from "lucide-react";
import { useActiveEmployees } from "@/hooks/useEmployees";
import { useTalentPool } from "@/hooks/useTalentPool";
import { useOpenVacancies } from "@/hooks/useVacancies";
import { useNewApplicationsCount } from "@/hooks/useVacancyApplications";
import { useTimesheets } from "@/hooks/useTimesheets";
import { useCommunicationStats } from "@/hooks/useCommunications";
import { useMemo } from "react";

interface PeopleHubProps {
  onNavigate: (section: Section) => void;
}

export function PeopleHub({ onNavigate }: PeopleHubProps) {
  // Real backend hooks - all run in parallel
  const { data: employees = [], isLoading: employeesLoading } = useActiveEmployees();
  const { totalCount: talentCount, availableNowCount, isLoading: talentLoading } = useTalentPool();
  const { data: openVacancies = [], isLoading: vacanciesLoading } = useOpenVacancies();
  const { data: newApplicationsCount = 0, isLoading: applicationsLoading } = useNewApplicationsCount();
  const { data: timesheets = [] } = useTimesheets();
  const { data: commStats } = useCommunicationStats();

  // Calculate stats
  const activeEmployees = employees.length;
  const openVacanciesCount = openVacancies.length;
  const unreadComms = commStats?.unreadCount || 0;

  // Calculate total hours this week
  const totalHoursThisWeek = useMemo(() => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = weekAgo.toISOString().split('T')[0];

    return timesheets
      .filter(ts => ts.date >= weekAgoStr)
      .reduce((sum, ts) => sum + (ts.total_hours || 0), 0);
  }, [timesheets]);

  // Stats configuration with individual loading states
  const statsConfig = [
    {
      icon: Users,
      value: activeEmployees,
      label: "Team",
      bgClass: "from-elec-yellow/20 to-elec-yellow/5",
      borderClass: "border-elec-yellow/30 hover:border-elec-yellow/60",
      textClass: "text-elec-yellow",
      section: "team" as Section,
      isLoading: employeesLoading,
    },
    {
      icon: UserSearch,
      value: availableNowCount,
      label: "Available",
      bgClass: "from-success/20 to-success/5",
      borderClass: "border-success/30 hover:border-success/60",
      textClass: "text-success",
      section: "talentpool" as Section,
      isLoading: talentLoading,
    },
    {
      icon: Briefcase,
      value: openVacanciesCount,
      label: "Open Roles",
      bgClass: "from-info/20 to-info/5",
      borderClass: "border-info/30 hover:border-info/60",
      textClass: "text-info",
      section: "vacancies" as Section,
      isLoading: vacanciesLoading,
    },
    {
      icon: UserPlus,
      value: newApplicationsCount,
      label: "New Apps",
      bgClass: newApplicationsCount > 0 ? "from-warning/20 to-warning/5" : "from-muted/20 to-muted/5",
      borderClass: newApplicationsCount > 0 ? "border-warning/50 hover:border-warning/80" : "border-muted/30 hover:border-muted/50",
      textClass: newApplicationsCount > 0 ? "text-warning" : "text-muted-foreground",
      section: "vacancies" as Section,
      pulse: newApplicationsCount > 0,
      isLoading: applicationsLoading,
    },
  ];

  return (
    <div className="space-y-6 pb-6">
      {/* Notification badge for new applications */}
      {!applicationsLoading && newApplicationsCount > 0 && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20 w-fit">
          <Bell className="h-3.5 w-3.5 text-warning" />
          <span className="text-xs font-medium text-warning">{newApplicationsCount} new applications</span>
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
              {stat.pulse && !stat.isLoading && (
                <div className="absolute top-2 right-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-warning"></span>
                  </span>
                </div>
              )}
              <CardContent className="p-3 md:p-4 flex flex-col items-center text-center">
                <div className="p-2 md:p-2.5 rounded-xl bg-background/60 backdrop-blur-sm mb-2">
                  <Icon className={`h-5 w-5 md:h-6 md:w-6 ${stat.textClass}`} />
                </div>
                {stat.isLoading ? (
                  <Skeleton className="h-7 w-8 mb-1" />
                ) : (
                  <p className={`text-xl md:text-2xl font-bold ${stat.textClass} tabular-nums`}>
                    {stat.value}
                  </p>
                )}
                <p className="text-[10px] md:text-xs text-muted-foreground mt-0.5 font-medium">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recruitment Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-success rounded-full"></span>
            Recruitment
          </h2>
          <TrendingUp className="h-4 w-4 text-success" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-success/50 bg-gradient-to-br from-elec-gray/50 via-background to-success/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-success/5"
            onClick={() => onNavigate("talentpool")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success/0 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors duration-300">
                  <UserSearch className="h-5 w-5 text-success" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-success group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Talent Pool</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Browse available sparkies
              </p>
              {talentLoading ? (
                <Skeleton className="mt-2.5 h-5 w-20" />
              ) : (
                <Badge className="mt-2.5 bg-success/20 text-success border-success/30 text-xs font-medium">
                  {talentCount} available
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-info/50 bg-gradient-to-br from-elec-gray/50 via-background to-info/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-info/5"
            onClick={() => onNavigate("vacancies")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-info/0 to-info/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-info/10 group-hover:bg-info/20 transition-colors duration-300">
                  <Briefcase className="h-5 w-5 text-info" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-info group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Job Vacancies</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                Post jobs & manage apps
              </p>
              {applicationsLoading ? (
                <Skeleton className="mt-2.5 h-5 w-16" />
              ) : newApplicationsCount > 0 ? (
                <Badge className="mt-2.5 bg-warning/20 text-warning border-warning/30 text-xs font-medium">
                  {newApplicationsCount} new
                </Badge>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Your Team Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            Your Team
          </h2>
          <Zap className="h-4 w-4 text-elec-yellow" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-elec-yellow/50 bg-gradient-to-br from-elec-gray/50 via-background to-elec-yellow/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/5"
            onClick={() => onNavigate("team")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/0 to-elec-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                  <Users className="h-5 w-5 text-elec-yellow" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Team List</h3>
              <p className="text-xs text-muted-foreground">
                Manage workers
              </p>
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-purple-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-purple-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5"
            onClick={() => onNavigate("elecid")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                  <CreditCard className="h-5 w-5 text-purple-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Credentials</h3>
              <p className="text-xs text-muted-foreground">
                Elec-ID & compliance
              </p>
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-orange-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-orange-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5"
            onClick={() => onNavigate("timesheets")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors duration-300">
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Timesheets</h3>
              <p className="text-xs text-muted-foreground">
                Hours & attendance
              </p>
              {totalHoursThisWeek > 0 && (
                <Badge className="mt-2 bg-orange-500/20 text-orange-500 border-orange-500/30 text-xs font-medium">
                  {Math.round(totalHoursThisWeek)}h this week
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-cyan-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-cyan-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
            onClick={() => onNavigate("comms")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <MessageSquare className="h-5 w-5 text-cyan-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Comms</h3>
              <p className="text-xs text-muted-foreground">
                Messages & alerts
              </p>
              {unreadComms > 0 && (
                <Badge className="mt-2 bg-cyan-500/20 text-cyan-500 border-cyan-500/30 text-xs font-medium">
                  {unreadComms} unread
                </Badge>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
