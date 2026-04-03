import BusinessCard from '@/components/business-hub/BusinessCard';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { useJobs } from '@/hooks/useJobs';
import { useJobPacks } from '@/hooks/useJobPacks';
import { useJobIssueStats } from '@/hooks/useJobIssues';
import { useFleetStats } from '@/hooks/useFleet';
import {
  Briefcase,
  Package,
  AlertTriangle,
  ClipboardCheck,
  Car,
  Camera,
  Sparkles,
  Loader2,
} from 'lucide-react';

interface JobsHubProps {
  onNavigate: (section: Section) => void;
}

export function JobsHub({ onNavigate }: JobsHubProps) {
  const { data: jobs = [], isLoading } = useJobs();
  const { data: jobPacks = [] } = useJobPacks();
  const { data: issueStats } = useJobIssueStats();
  const { data: fleetStats } = useFleetStats();

  const activeJobs = jobs.filter((j) => j.status === 'Active').length;
  const activeJobPacks = jobPacks.filter((jp) => jp.status === 'In Progress').length;
  const openIssues = issueStats?.open ?? 0;
  const motDueCount = fleetStats?.motDue ?? 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-6 animate-fade-in">
      {/* Job Management */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Job Management
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Active Jobs"
            description="Projects & tracking"
            icon={Briefcase}
            onClick={() => onNavigate('jobs')}
            accentColor="from-elec-yellow via-amber-400 to-orange-400"
            iconColor="text-elec-yellow"
            iconBg="bg-elec-yellow/10 border border-elec-yellow/20"
            liveSubtitle={activeJobs > 0 ? `${activeJobs} active` : 'No active jobs'}
          />
          <BusinessCard
            title="Job Packs"
            description="Pre-configured packages"
            icon={Package}
            onClick={() => onNavigate('jobpacks')}
            accentColor="from-blue-500 via-blue-400 to-cyan-400"
            iconColor="text-blue-400"
            iconBg="bg-blue-500/10 border border-blue-500/20"
            liveSubtitle={activeJobPacks > 0 ? `${activeJobPacks} in progress` : undefined}
          />
        </div>
      </section>

      {/* Quality & Safety */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          Quality & Compliance
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Issues & Snags"
            description="Track & resolve"
            icon={AlertTriangle}
            onClick={() => onNavigate('issues')}
            accentColor="from-orange-500 via-amber-400 to-red-400"
            iconColor="text-orange-400"
            iconBg="bg-orange-500/10 border border-orange-500/20"
            liveSubtitle={openIssues > 0 ? `${openIssues} open` : 'All clear'}
          />
          <BusinessCard
            title="Testing"
            description="Quality assurance"
            icon={ClipboardCheck}
            onClick={() => onNavigate('testing')}
            accentColor="from-emerald-500 via-emerald-400 to-green-400"
            iconColor="text-emerald-400"
            iconBg="bg-emerald-500/10 border border-emerald-500/20"
          />
          <BusinessCard
            title="Photo Gallery"
            description="Job documentation"
            icon={Camera}
            onClick={() => onNavigate('quality')}
            accentColor="from-purple-500 via-violet-400 to-indigo-400"
            iconColor="text-purple-400"
            iconBg="bg-purple-500/10 border border-purple-500/20"
          />
          <BusinessCard
            title="Fleet"
            description="Vehicles & equipment"
            icon={Car}
            onClick={() => onNavigate('fleet')}
            accentColor="from-cyan-500 via-blue-400 to-blue-500"
            iconColor="text-cyan-400"
            iconBg="bg-cyan-500/10 border border-cyan-500/20"
            liveSubtitle={motDueCount > 0 ? `${motDueCount} MOT due` : undefined}
          />
        </div>
      </section>

      {/* AI Tools */}
      <section className="space-y-3">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
          AI Tools
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <BusinessCard
            title="Smart Docs"
            description="AI-generated project docs"
            icon={Sparkles}
            onClick={() => onNavigate('smartdocs')}
            accentColor="from-rose-500 via-pink-400 to-red-400"
            iconColor="text-rose-400"
            iconBg="bg-rose-500/10 border border-rose-500/20"
          />
        </div>
      </section>
    </div>
  );
}
