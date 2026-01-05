import { Card, CardContent } from "@/components/ui/card";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
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
  Sparkles
} from "lucide-react";

interface JobsHubProps {
  onNavigate: (section: Section) => void;
}

export function JobsHub({ onNavigate }: JobsHubProps) {
  const { data: jobs = [], isLoading: isLoadingJobs } = useJobs();
  const { data: jobPacks = [], isLoading: isLoadingJobPacks } = useJobPacks();
  
  const isLoading = isLoadingJobs || isLoadingJobPacks;
  
  // Calculate real stats from Supabase data
  const activeJobs = jobs.filter(j => j.status === "Active").length;
  const activeJobPacks = jobPacks.filter(jp => jp.status === "In Progress").length;
  
  // These remain mock for now (separate features)
  const openIssues = jobIssues.filter(i => i.status === "Open").length;
  const testingInProgress = testingWorkflows.filter(t => t.status === "In Progress").length;
  
  // Fleet stats
  const activeVehicles = companyVehicles.filter(v => v.status === "Active").length;
  const getExpiryStatus = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntil < 30;
  };
  const motDueCount = companyVehicles.filter(v => getExpiryStatus(v.motExpiry)).length;

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6 animate-fade-in">
        <SectionHeader
          title="Jobs Hub"
          description="Manage projects and workflows"
        />
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-28 shrink-0" />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Jobs Hub"
        description="Manage projects and workflows"
      />

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{activeJobs}</p>
              <p className="text-xs text-muted-foreground">Active Jobs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Package className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{activeJobPacks}</p>
              <p className="text-xs text-muted-foreground">Job Packs</p>
            </div>
          </CardContent>
        </Card>
        {openIssues > 0 && (
          <Card className="bg-warning/10 border-warning/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{openIssues}</p>
                <p className="text-xs text-muted-foreground">Open Issues</p>
              </div>
            </CardContent>
          </Card>
        )}
        {testingInProgress > 0 && (
          <Card className="bg-info/10 border-info/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-info" />
              <div>
                <p className="text-lg font-bold text-foreground">{testingInProgress}</p>
                <p className="text-xs text-muted-foreground">Testing</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Job Setup */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Job Setup
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <FeatureTile
            icon={Package}
            title="Job Packs"
            description="Create jobs, auto-generate RAMS & method statements"
            onClick={() => onNavigate("jobpacks")}
            badge={activeJobPacks > 0 ? `${activeJobPacks} active` : undefined}
          />
          <FeatureTile
            icon={Sparkles}
            title="Smart Docs"
            description="AI-powered RAMS, designs, quotes"
            onClick={() => onNavigate("smartdocs")}
            badge="AI"
          />
          <FeatureTile
            icon={Briefcase}
            title="All Jobs"
            description="View and manage all projects"
            onClick={() => onNavigate("jobs")}
            badge={activeJobs > 0 ? `${activeJobs} active` : undefined}
          />
        </div>
      </div>

      {/* Live Workflow */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Live Workflow
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FeatureTile
            icon={Briefcase}
            title="Job Board"
            description="Kanban view"
            onClick={() => onNavigate("jobboard")}
            compact
          />
          <FeatureTile
            icon={Calendar}
            title="Timeline"
            description="Gantt & scheduling"
            onClick={() => onNavigate("timeline")}
            compact
          />
          <FeatureTile
            icon={Users}
            title="Tracking"
            description="Worker locations"
            onClick={() => onNavigate("tracking")}
            compact
          />
          <FeatureTile
            icon={FileText}
            title="Progress Logs"
            description="Daily diary"
            onClick={() => onNavigate("progresslogs")}
            compact
          />
          <FeatureTile
            icon={Camera}
            title="Photo Gallery"
            description="All job photos"
            onClick={() => onNavigate("photogallery")}
            badge={`${jobPhotos.length}`}
            compact
          />
        </div>
      </div>

      {/* Quality & Completion */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-info rounded-full"></span>
          Quality & Completion
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FeatureTile
            icon={AlertTriangle}
            title="Issues"
            description="Blockers"
            onClick={() => onNavigate("issues")}
            badge={openIssues > 0 ? `${openIssues}` : undefined}
            badgeVariant="warning"
            compact
          />
          <FeatureTile
            icon={CheckCircle}
            title="Testing"
            description="EIC sign-off"
            onClick={() => onNavigate("testing")}
            compact
          />
          <FeatureTile
            icon={ClipboardCheck}
            title="Quality"
            description="Snags"
            onClick={() => onNavigate("quality")}
            compact
          />
          <FeatureTile
            icon={FileText}
            title="Client Portal"
            description="Share progress"
            onClick={() => onNavigate("clientportal")}
            compact
          />
        </div>
      </div>

      {/* Operations */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-warning rounded-full"></span>
          Operations
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <FeatureTile
            icon={TrendingUp}
            title="Financials"
            description="Budget vs actual"
            onClick={() => onNavigate("financials")}
            compact
          />
          <FeatureTile
            icon={Car}
            title="Fleet"
            description="Vehicles & fuel"
            onClick={() => onNavigate("fleet")}
            badge={motDueCount > 0 ? `${motDueCount} MOT due` : undefined}
            badgeVariant="warning"
            compact
          />
        </div>
      </div>
    </div>
  );
}
