import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Skeleton } from "@/components/ui/skeleton";
import type { Section } from "@/pages/employer/EmployerDashboard";
import { useJobPacks } from "@/hooks/useJobPacks";
import {
  Sparkles,
  FileText,
  Shield,
  ClipboardList,
  Users,
  Receipt,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

interface SmartDocsHubProps {
  onNavigate: (section: Section) => void;
}

export function SmartDocsHub({ onNavigate }: SmartDocsHubProps) {
  const { data: jobPacks = [], isLoading } = useJobPacks();

  // Calculate stats
  const totalJobPacks = jobPacks.length;
  const pendingRams = jobPacks.filter(jp => !jp.rams_generated && jp.status !== 'Completed').length;
  const pendingMethodStatements = jobPacks.filter(jp => !jp.method_statement_generated && jp.status !== 'Completed').length;
  const pendingBriefings = jobPacks.filter(jp => !jp.briefing_pack_generated && jp.status !== 'Completed').length;
  const readyForWork = jobPacks.filter(jp =>
    jp.rams_generated &&
    jp.method_statement_generated &&
    jp.briefing_pack_generated &&
    jp.status === 'In Progress'
  ).length;

  // Recently generated documents (simulated for now - would come from job_pack_documents)
  const recentDocuments = [
    { id: '1', type: 'RAMS', title: 'Office Rewire - ABC Corp', generatedAt: '2 hours ago', jobPack: 'Office Rewire' },
    { id: '2', type: 'Method Statement', title: 'Kitchen Refit', generatedAt: 'Yesterday', jobPack: 'Kitchen Refit' },
    { id: '3', type: 'Design Spec', title: 'EV Charging Points', generatedAt: '2 days ago', jobPack: 'NCP Car Parks' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4 md:space-y-6">
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-28 shrink-0" />)}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Package className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{totalJobPacks}</p>
              <p className="text-xs text-muted-foreground">Job Packs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{readyForWork}</p>
              <p className="text-xs text-muted-foreground">Ready</p>
            </div>
          </CardContent>
        </Card>
        {pendingRams > 0 && (
          <Card className="bg-warning/10 border-warning/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <Shield className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{pendingRams}</p>
                <p className="text-xs text-muted-foreground">Need RAMS</p>
              </div>
            </CardContent>
          </Card>
        )}
        {pendingBriefings > 0 && (
          <Card className="bg-info/10 border-info/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-info" />
              <div>
                <p className="text-lg font-bold text-foreground">{pendingBriefings}</p>
                <p className="text-xs text-muted-foreground">Need Briefing</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* AI Document Tools */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Document Tools
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <FeatureTile
            icon={Sparkles}
            title="AI Design Spec"
            description="Circuit designs & installation guidance"
            onClick={() => onNavigate("aidesignspec")}
            badge="AI"
            badgeVariant="default"
          />
          <FeatureTile
            icon={Shield}
            title="AI RAMS"
            description="Risk assessment & method statements"
            onClick={() => onNavigate("airams")}
            badge={pendingRams > 0 ? `${pendingRams} pending` : "AI"}
            badgeVariant={pendingRams > 0 ? "warning" : "default"}
          />
          <FeatureTile
            icon={ClipboardList}
            title="AI Method Statement"
            description="Step-by-step procedures"
            onClick={() => onNavigate("aimethodstatement")}
            badge={pendingMethodStatements > 0 ? `${pendingMethodStatements} pending` : "AI"}
            badgeVariant={pendingMethodStatements > 0 ? "warning" : "default"}
          />
          <FeatureTile
            icon={Users}
            title="AI Briefing Pack"
            description="Worker pre-job briefings"
            onClick={() => onNavigate("aibriefingpack")}
            badge={pendingBriefings > 0 ? `${pendingBriefings} pending` : "AI"}
            badgeVariant={pendingBriefings > 0 ? "warning" : "default"}
          />
          <FeatureTile
            icon={Receipt}
            title="AI Quote"
            description="Professional quote generation"
            onClick={() => onNavigate("aiquote")}
            badge="AI"
            badgeVariant="default"
          />
        </div>
      </div>

      {/* Job Pack Quick Access */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Job Pack Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Card
            className="border-elec-yellow/20 bg-elec-gray hover:bg-elec-gray/80 cursor-pointer transition-all duration-200"
            onClick={() => onNavigate("jobpacks")}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">Documentation Status</h3>
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Complete Documentation</span>
                  <Badge variant="secondary" className="bg-success/20 text-success">
                    {readyForWork}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Missing RAMS</span>
                  <Badge variant="secondary" className={pendingRams > 0 ? "bg-warning/20 text-warning" : ""}>
                    {pendingRams}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Missing Briefings</span>
                  <Badge variant="secondary" className={pendingBriefings > 0 ? "bg-warning/20 text-warning" : ""}>
                    {pendingBriefings}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-elec-yellow/20 bg-elec-gray">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">Recent Documents</h3>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                {recentDocuments.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-elec-dark/50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{doc.type}</p>
                      <p className="text-xs text-muted-foreground truncate">{doc.jobPack}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {doc.generatedAt}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Workflow Tips */}
      <Card className="border-info/20 bg-info/5">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="p-2 rounded-lg bg-info/10 h-fit">
              <Sparkles className="h-5 w-5 text-info" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-1">Smart Workflow</h3>
              <p className="text-sm text-muted-foreground">
                For complete job documentation: Generate <span className="text-info">RAMS</span> first,
                then <span className="text-info">Method Statement</span>, and finally the
                <span className="text-info"> Briefing Pack</span>. Documents auto-attach to your selected Job Pack.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
