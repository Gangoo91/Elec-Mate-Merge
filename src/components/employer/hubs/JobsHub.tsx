import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Section } from "@/pages/employer/EmployerDashboard";
import { useJobs } from "@/hooks/useJobs";
import { useJobPacks } from "@/hooks/useJobPacks";
import { jobIssues, testingWorkflows, companyVehicles, jobPhotos } from "@/data/employerMockData";
import {
  Briefcase,
  Package,
  Calendar,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  ClipboardCheck,
  TrendingUp,
  Car,
  Camera,
  Sparkles,
  ChevronRight,
  Zap,
  LayoutGrid,
} from "lucide-react";

interface JobsHubProps {
  onNavigate: (section: Section) => void;
}

export function JobsHub({ onNavigate }: JobsHubProps) {
  const { data: jobs = [], isLoading: isLoadingJobs } = useJobs();
  const { data: jobPacks = [], isLoading: isLoadingJobPacks } = useJobPacks();

  // Calculate real stats from Supabase data
  const activeJobs = jobs.filter(j => j.status === "Active").length;
  const activeJobPacks = jobPacks.filter(jp => jp.status === "In Progress").length;

  // These remain mock for now (separate features)
  const openIssues = jobIssues.filter(i => i.status === "Open").length;
  const testingInProgress = testingWorkflows.filter(t => t.status === "In Progress").length;

  // Fleet stats
  const getExpiryStatus = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil < 30;
  };
  const motDueCount = companyVehicles.filter(v => getExpiryStatus(v.motExpiry)).length;

  // Stats configuration with individual loading states
  const statsConfig = [
    {
      icon: Briefcase,
      value: activeJobs,
      label: "Active Jobs",
      bgClass: "from-elec-yellow/20 to-elec-yellow/5",
      borderClass: "border-elec-yellow/30 hover:border-elec-yellow/60",
      textClass: "text-elec-yellow",
      section: "jobs" as Section,
      isLoading: isLoadingJobs,
    },
    {
      icon: Package,
      value: activeJobPacks,
      label: "Job Packs",
      bgClass: "from-success/20 to-success/5",
      borderClass: "border-success/30 hover:border-success/60",
      textClass: "text-success",
      section: "jobpacks" as Section,
      isLoading: isLoadingJobPacks,
    },
    {
      icon: AlertTriangle,
      value: openIssues,
      label: "Issues",
      bgClass: openIssues > 0 ? "from-warning/20 to-warning/5" : "from-muted/20 to-muted/5",
      borderClass: openIssues > 0 ? "border-warning/50 hover:border-warning/80" : "border-muted/30 hover:border-muted/50",
      textClass: openIssues > 0 ? "text-warning" : "text-muted-foreground",
      section: "issues" as Section,
      pulse: openIssues > 0,
      isLoading: false,
    },
    {
      icon: CheckCircle,
      value: testingInProgress,
      label: "Testing",
      bgClass: "from-info/20 to-info/5",
      borderClass: "border-info/30 hover:border-info/60",
      textClass: "text-info",
      section: "testing" as Section,
      isLoading: false,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-elec-gray via-background to-info/5 border border-border/50 p-5 md:p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-info/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-elec-yellow/10 rounded-full blur-2xl" />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-info/10 border border-info/20">
              <Briefcase className="h-7 w-7 text-info" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                Jobs Hub
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Manage projects and workflows
              </p>
            </div>
          </div>
          {openIssues > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-warning/10 border border-warning/20">
              <AlertTriangle className="h-3.5 w-3.5 text-warning" />
              <span className="text-xs font-medium text-warning">{openIssues} issues</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats - Centered Grid */}
      <div className="grid grid-cols-4 gap-2 md:gap-3">
        {statsConfig.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className={`relative overflow-hidden border-2 ${stat.borderClass} bg-gradient-to-br ${stat.bgClass} cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
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

      {/* Job Setup */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            Job Setup
          </h2>
          <Zap className="h-4 w-4 text-elec-yellow" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-success/50 bg-gradient-to-br from-elec-gray/50 via-background to-success/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-success/5"
            onClick={() => onNavigate("jobpacks")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success/0 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors duration-300">
                  <Package className="h-5 w-5 text-success" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-success group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Job Packs</h3>
              <p className="text-xs text-muted-foreground">
                Create jobs & RAMS
              </p>
              {isLoadingJobPacks ? (
                <Skeleton className="mt-2.5 h-5 w-16" />
              ) : activeJobPacks > 0 ? (
                <Badge className="mt-2.5 bg-success/20 text-success border-success/30 text-xs font-medium">
                  {activeJobPacks} active
                </Badge>
              ) : null}
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-purple-500/30 hover:border-purple-500/60 bg-gradient-to-br from-elec-gray/50 via-background to-purple-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5"
            onClick={() => onNavigate("smartdocs")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground flex items-center gap-2 mb-1">
                Smart Docs
                <Badge className="bg-purple-500/90 text-white text-xs font-semibold">AI</Badge>
              </h3>
              <p className="text-xs text-muted-foreground">
                AI-powered docs
              </p>
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-elec-yellow/50 bg-gradient-to-br from-elec-gray/50 via-background to-elec-yellow/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-elec-yellow/5 col-span-2"
            onClick={() => onNavigate("jobs")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/0 to-elec-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 group-hover:bg-elec-yellow/20 transition-colors duration-300">
                  <Briefcase className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">All Jobs</h3>
                  <p className="text-xs text-muted-foreground">
                    View and manage all projects
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isLoadingJobs ? (
                  <Skeleton className="h-5 w-16" />
                ) : activeJobs > 0 ? (
                  <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs font-medium">
                    {activeJobs} active
                  </Badge>
                ) : null}
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-elec-yellow group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Live Workflow */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-success rounded-full"></span>
            Live Workflow
          </h2>
          <TrendingUp className="h-4 w-4 text-success" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: LayoutGrid, title: "Job Board", desc: "Kanban view", section: "jobboard" as Section, color: "info" },
            { icon: Calendar, title: "Timeline", desc: "Gantt & scheduling", section: "timeline" as Section, color: "purple" },
            { icon: Users, title: "Tracking", desc: "Worker locations", section: "tracking" as Section, color: "cyan" },
            { icon: FileText, title: "Progress", desc: "Daily diary", section: "progresslogs" as Section, color: "orange" },
            { icon: Camera, title: "Photos", desc: "Job gallery", section: "photogallery" as Section, color: "pink", badge: jobPhotos.length },
          ].map((item) => {
            const Icon = item.icon;
            const colorClasses: Record<string, { bg: string, hover: string, text: string }> = {
              info: { bg: "to-info/5", hover: "hover:border-info/50 hover:shadow-info/5", text: "text-info group-hover:text-info" },
              purple: { bg: "to-purple-500/5", hover: "hover:border-purple-500/50 hover:shadow-purple-500/5", text: "text-purple-500 group-hover:text-purple-500" },
              cyan: { bg: "to-cyan-500/5", hover: "hover:border-cyan-500/50 hover:shadow-cyan-500/5", text: "text-cyan-500 group-hover:text-cyan-500" },
              orange: { bg: "to-orange-500/5", hover: "hover:border-orange-500/50 hover:shadow-orange-500/5", text: "text-orange-500 group-hover:text-orange-500" },
              pink: { bg: "to-pink-500/5", hover: "hover:border-pink-500/50 hover:shadow-pink-500/5", text: "text-pink-500 group-hover:text-pink-500" },
            };
            const colors = colorClasses[item.color];
            return (
              <Card
                key={item.title}
                className={`group relative overflow-hidden border-2 border-border/50 ${colors.hover} bg-gradient-to-br from-elec-gray/50 via-background ${colors.bg} cursor-pointer transition-all duration-300 hover:shadow-xl`}
                onClick={() => onNavigate(item.section)}
              >
                <CardContent className="relative p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-xl bg-${item.color === 'info' ? 'info' : item.color + '-500'}/10`}>
                      <Icon className={`h-5 w-5 ${colors.text.split(' ')[0]}`} />
                    </div>
                    <ChevronRight className={`h-4 w-4 text-muted-foreground ${colors.text.split(' ')[1]} group-hover:translate-x-0.5 transition-all duration-300`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                  {item.badge && (
                    <Badge className={`mt-2 bg-${item.color === 'info' ? 'info' : item.color + '-500'}/20 ${colors.text.split(' ')[0]} text-xs font-medium`}>
                      {item.badge}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quality & Operations */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="w-1 h-5 bg-info rounded-full"></span>
            Quality & Operations
          </h2>
          <ClipboardCheck className="h-4 w-4 text-info" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-warning/50 bg-gradient-to-br from-elec-gray/50 via-background to-warning/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-warning/5"
            onClick={() => onNavigate("issues")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warning/0 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-warning/10 group-hover:bg-warning/20 transition-colors duration-300">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-warning group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Issues</h3>
              <p className="text-xs text-muted-foreground">Blockers</p>
              {openIssues > 0 && (
                <Badge className="mt-2 bg-warning/20 text-warning border-warning/30 text-xs font-medium">
                  {openIssues} open
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-success/50 bg-gradient-to-br from-elec-gray/50 via-background to-success/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-success/5"
            onClick={() => onNavigate("testing")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success/0 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-success/10 group-hover:bg-success/20 transition-colors duration-300">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-success group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Testing</h3>
              <p className="text-xs text-muted-foreground">EIC sign-off</p>
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-cyan-500/50 bg-gradient-to-br from-elec-gray/50 via-background to-cyan-500/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
            onClick={() => onNavigate("fleet")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <Car className="h-5 w-5 text-cyan-500" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-cyan-500 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Fleet</h3>
              <p className="text-xs text-muted-foreground">Vehicles & fuel</p>
              {motDueCount > 0 && (
                <Badge className="mt-2 bg-warning/20 text-warning border-warning/30 text-xs font-medium">
                  {motDueCount} MOT due
                </Badge>
              )}
            </CardContent>
          </Card>

          <Card
            className="group relative overflow-hidden border-2 border-border/50 hover:border-info/50 bg-gradient-to-br from-elec-gray/50 via-background to-info/5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-info/5"
            onClick={() => onNavigate("quality")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-info/0 to-info/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-info/10 group-hover:bg-info/20 transition-colors duration-300">
                  <ClipboardCheck className="h-5 w-5 text-info" />
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-info group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Quality</h3>
              <p className="text-xs text-muted-foreground">Snags & QC</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
