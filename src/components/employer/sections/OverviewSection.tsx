import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { ActivityFeed } from "@/components/employer/ActivityFeed";
import { employees, jobs, certifications, businessMetrics, availableElectricians, jobVacancies, vacancyApplications, expenseClaims } from "@/data/employerMockData";
import type { Section } from "@/pages/employer/EmployerDashboard";
import {
  Users,
  Briefcase,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Calendar,
  UserPlus,
  CheckCircle,
  PoundSterling,
  UserSearch,
  Package,
  Camera,
  FileText,
  Receipt,
  Sparkles
} from "lucide-react";

interface OverviewSectionProps {
  onNavigate: (section: Section) => void;
}

const activities = [
  { id: "1", title: "New employee onboarded", description: "David Brown joined as Apprentice", time: "2 hours ago", icon: UserPlus },
  { id: "2", title: "Job completed", description: "EV Charging Points - NCP Car Parks", time: "5 hours ago", icon: CheckCircle },
  { id: "3", title: "New application received", description: "Ryan Hughes applied for Senior Electrician", time: "1 day ago", icon: UserSearch },
  { id: "4", title: "Certification expiring", description: "Sarah Mitchell - ECS Gold Card (45 days)", time: "1 day ago", icon: AlertTriangle },
  { id: "5", title: "Invoice paid", description: "Tesco Express - £22,500", time: "2 days ago", icon: TrendingUp },
];

const upcomingDeadlines = [
  { id: "1", title: "Part P Certification Expired", subtitle: "David Brown", date: "Overdue", urgent: true },
  { id: "2", title: "ECS Card Renewal", subtitle: "Sarah Mitchell", date: "45 days", urgent: true },
  { id: "3", title: "Commercial Rewiring Due", subtitle: "Tesco Express", date: "Feb 28", urgent: false },
];

export function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const activeEmployees = employees.filter(e => e.status === "Active").length;
  const activeJobs = jobs.filter(j => j.status === "Active").length;
  const expiringCerts = certifications.filter(c => c.status === "Warning" || c.status === "Expired").length;
  const availableTalent = availableElectricians.filter(e => e.status === "Available").length;
  const newApplications = vacancyApplications.filter(a => a.status === "New").length;
  const pendingExpenses = expenseClaims.filter(e => e.status === "Pending").length;

  // Determine if user is a sole trader (no employees other than themselves)
  const isSoloTrader = activeEmployees <= 1;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back to Elec-Mate for Business</p>
      </div>

      {/* Quick Stats - Scrollable on mobile */}
      <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card
          className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 shrink-0 w-[140px] md:w-auto touch-feedback cursor-pointer transition-all duration-200"
          onClick={() => onNavigate("team")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xl md:text-2xl font-bold text-elec-yellow">{activeEmployees}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Team</p>
              </div>
              <div className="p-2 rounded-lg bg-elec-yellow/10">
                <Users className="h-5 w-5 md:h-6 md:w-6 text-elec-yellow" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 shrink-0 w-[140px] md:w-auto touch-feedback cursor-pointer transition-all duration-200"
          onClick={() => onNavigate("jobs")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xl md:text-2xl font-bold text-info">{activeJobs}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Jobs</p>
              </div>
              <div className="p-2 rounded-lg bg-info/10">
                <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 shrink-0 w-[140px] md:w-auto touch-feedback cursor-pointer transition-all duration-200"
          onClick={() => onNavigate("elecid")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xl md:text-2xl font-bold text-warning">{expiringCerts}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Alerts</p>
              </div>
              <div className="p-2 rounded-lg bg-warning/10">
                <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 shrink-0 w-[140px] md:w-auto touch-feedback cursor-pointer transition-all duration-200"
          onClick={() => onNavigate("safetyhub")}
        >
          <CardContent className="p-3 md:p-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xl md:text-2xl font-bold text-success">{businessMetrics.safetyScore}%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Safety</p>
              </div>
              <div className="p-2 rounded-lg bg-success/10">
                <ShieldCheck className="h-5 w-5 md:h-6 md:w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Hub Cards */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Main Areas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {!isSoloTrader && (
            <FeatureTile
              icon={Users}
              title="People"
              description="Team management, recruitment, find electricians"
              onClick={() => onNavigate("peoplehub")}
              badge={newApplications > 0 ? `${newApplications} new apps` : `${availableTalent} available`}
              badgeVariant={newApplications > 0 ? "warning" : "default"}
            />
          )}
          {isSoloTrader && (
            <FeatureTile
              icon={Users}
              title="My Profile"
              description="Certifications, Elec-ID, training"
              onClick={() => onNavigate("elecid")}
            />
          )}
          <FeatureTile
            icon={Briefcase}
            title="Jobs"
            description="Projects, workflow, tracking, quality"
            onClick={() => onNavigate("jobshub")}
            badge={`${activeJobs} active`}
          />
          <FeatureTile
            icon={PoundSterling}
            title="Finance"
            description="Quotes, invoices, expenses, procurement"
            onClick={() => onNavigate("financehub")}
            badge={pendingExpenses > 0 ? `${pendingExpenses} pending` : undefined}
            badgeVariant="warning"
          />
          <FeatureTile
            icon={ShieldCheck}
            title="HR & Safety"
            description="Documents, RAMS, incidents, compliance"
            onClick={() => onNavigate("safetyhub")}
            badge={expiringCerts > 0 ? `${expiringCerts} alerts` : undefined}
            badgeVariant="warning"
          />
          <FeatureTile
            icon={Sparkles}
            title="Smart Docs"
            description="AI-powered RAMS, designs, quotes"
            onClick={() => onNavigate("smartdocs")}
            badge="AI"
          />
        </div>
      </div>

      {/* Solo Trader Quick Actions */}
      {isSoloTrader && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <FeatureTile
              icon={Briefcase}
              title="Today's Job"
              description="Current work"
              onClick={() => onNavigate("jobboard")}
              badge={activeJobs > 0 ? "Active" : undefined}
              compact
            />
            <FeatureTile
              icon={Camera}
              title="Quick Photo"
              description="Snap & upload"
              onClick={() => onNavigate("photogallery")}
              compact
            />
            <FeatureTile
              icon={FileText}
              title="Get Paid"
              description="Create invoice"
              onClick={() => onNavigate("quotes")}
              compact
            />
            <FeatureTile
              icon={Receipt}
              title="Log Expense"
              description="Snap receipt"
              onClick={() => onNavigate("expenses")}
              compact
            />
          </div>
        </div>
      )}

      {/* Team Quick Actions */}
      {!isSoloTrader && (
        <div>
          <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <FeatureTile
              icon={Package}
              title="New Job Pack"
              description="Create job with RAMS"
              onClick={() => onNavigate("jobpacks")}
              compact
            />
            <FeatureTile
              icon={UserSearch}
              title="Find Sparkies"
              description="Talent pool"
              onClick={() => onNavigate("talentpool")}
              badge={`${availableTalent}`}
              compact
            />
            <FeatureTile
              icon={Briefcase}
              title="Post Vacancy"
              description="Hire workers"
              onClick={() => onNavigate("vacancies")}
              compact
            />
            <FeatureTile
              icon={AlertTriangle}
              title="Credentials"
              description="Elec-ID & compliance"
              onClick={() => onNavigate("elecid")}
              badge={expiringCerts > 0 ? `${expiringCerts}` : undefined}
              badgeVariant="warning"
              compact
            />
          </div>
        </div>
      )}

      {/* Revenue & Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Revenue Progress */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground text-sm md:text-base">Revenue Progress</h3>
              <Badge variant="secondary" className="bg-success/20 text-success text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +16%
              </Badge>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Current</span>
                  <span className="text-elec-yellow font-medium">
                    £{businessMetrics.revenue.current.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-elec-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-elec-yellow to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${(businessMetrics.revenue.current / businessMetrics.revenue.target) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Target: £{businessMetrics.revenue.target.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground text-sm md:text-base">Upcoming Deadlines</h3>
              <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                <Calendar className="h-4 w-4 text-elec-yellow" />
              </div>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-elec-dark/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{deadline.title}</p>
                    <p className="text-xs text-muted-foreground truncate">{deadline.subtitle}</p>
                  </div>
                  <Badge variant={deadline.urgent ? "destructive" : "secondary"} className="shrink-0 text-xs">
                    {deadline.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <ActivityFeed activities={activities} />
    </div>
  );
}
