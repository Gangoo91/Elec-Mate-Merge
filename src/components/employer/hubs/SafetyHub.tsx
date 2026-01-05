import { Card, CardContent } from "@/components/ui/card";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import type { Section } from "@/pages/employer/EmployerDashboard";
import { 
  Shield, 
  AlertTriangle, 
  FileText, 
  BookOpen,
  ClipboardList,
  Award,
  Users,
  FileCheck
} from "lucide-react";

interface SafetyHubProps {
  onNavigate: (section: Section) => void;
}

export function SafetyHub({ onNavigate }: SafetyHubProps) {
  // Mock data - replace with real data from context
  const safetyScore = 98;
  const openIncidents = 1;
  const activeRAMS = 12;
  const hrDocuments = 24;
  const expiringCerts = 3;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="HR & Safety Hub"
        description="Documents, compliance, and safety management"
      />

      {/* Quick Stats */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        <Card className="bg-success/10 border-success/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-success" />
            <div>
              <p className="text-lg font-bold text-foreground">{safetyScore}%</p>
              <p className="text-xs text-muted-foreground">Safety Score</p>
            </div>
          </CardContent>
        </Card>
        {openIncidents > 0 && (
          <Card className="bg-warning/10 border-warning/20 shrink-0">
            <CardContent className="p-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <div>
                <p className="text-lg font-bold text-foreground">{openIncidents}</p>
                <p className="text-xs text-muted-foreground">Open Incidents</p>
              </div>
            </CardContent>
          </Card>
        )}
        <Card className="bg-elec-yellow/10 border-elec-yellow/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-elec-yellow" />
            <div>
              <p className="text-lg font-bold text-foreground">{activeRAMS}</p>
              <p className="text-xs text-muted-foreground">Active RAMS</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-info/10 border-info/20 shrink-0">
          <CardContent className="p-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-info" />
            <div>
              <p className="text-lg font-bold text-foreground">{hrDocuments}</p>
              <p className="text-xs text-muted-foreground">HR Docs</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safety Section */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Safety
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FeatureTile
            icon={AlertTriangle}
            title="Incident Reports"
            description="Report and track safety incidents"
            onClick={() => onNavigate("incidents")}
            badge={openIncidents > 0 ? `${openIncidents} open` : undefined}
            badgeVariant="warning"
          />
          <FeatureTile
            icon={FileText}
            title="RAMS"
            description="Risk assessments & method statements"
            onClick={() => onNavigate("rams")}
            badge={`${activeRAMS} active`}
          />
        </div>
      </div>

      {/* HR Documents Section */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          HR Documents
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <FeatureTile
            icon={BookOpen}
            title="Policies"
            description="Company policies & procedures"
            onClick={() => onNavigate("policies")}
            compact
          />
          <FeatureTile
            icon={ClipboardList}
            title="Contracts"
            description="Employment contracts & handbooks"
            onClick={() => onNavigate("contracts")}
            compact
          />
          <FeatureTile
            icon={Award}
            title="Training"
            description="Training records & certificates"
            onClick={() => onNavigate("training")}
            compact
          />
        </div>
      </div>

      {/* Compliance Section */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-warning rounded-full"></span>
          Compliance
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <FeatureTile
            icon={Users}
            title="Briefings"
            description="Safety briefings & toolbox talks"
            onClick={() => onNavigate("briefings")}
            compact
          />
          <FeatureTile
            icon={FileCheck}
            title="Compliance"
            description="Sign-offs & evidence packs"
            onClick={() => onNavigate("compliance")}
            compact
          />
        </div>
      </div>
    </div>
  );
}
