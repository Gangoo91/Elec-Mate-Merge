import { Card, CardContent } from "@/components/ui/card";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { QuickStats, QuickStat } from "@/components/employer/QuickStats";
import {
  AlertTriangle,
  Plus,
  FileWarning,
  ClipboardCheck,
  Search,
  CheckCircle2,
  Shield
} from "lucide-react";
import { safetyIncidents } from "@/data/employerMockData";

export function IncidentsSection() {
  const openIncidents = safetyIncidents.filter(i => i.status !== "Resolved").length;
  const resolvedIncidents = safetyIncidents.filter(i => i.status === "Resolved").length;
  const nearMisses = safetyIncidents.filter(i => i.type === "Near Miss").length;
  const daysSinceLastIncident = 45;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Incident Reports"
        description="Report and track safety incidents"
      />

      {/* Quick Stats */}
      <QuickStats
        stats={[
          ...(openIncidents > 0
            ? [
                {
                  icon: AlertTriangle,
                  value: openIncidents,
                  label: "Open",
                  color: "orange" as const,
                  pulse: true,
                },
              ]
            : []),
          {
            icon: Shield,
            value: daysSinceLastIncident,
            label: "Days Safe",
            color: "green",
          },
          {
            icon: FileWarning,
            value: nearMisses,
            label: "Near Misses",
            color: "blue",
          },
          {
            icon: CheckCircle2,
            value: resolvedIncidents,
            label: "Resolved",
            color: "purple",
          },
        ]}
      />

      {/* Quick Actions */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-warning rounded-full"></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <FeatureTile
            icon={Plus}
            title="Report Incident"
            description="Log a new incident"
            onClick={() => {}}
            compact
          />
          <FeatureTile
            icon={FileWarning}
            title="Near Miss"
            description="Report near miss"
            onClick={() => {}}
            compact
          />
          <FeatureTile
            icon={ClipboardCheck}
            title="RIDDOR"
            description="RIDDOR assessment"
            onClick={() => {}}
            compact
          />
          <FeatureTile
            icon={Search}
            title="Investigation"
            description="Start investigation"
            onClick={() => {}}
            compact
          />
        </div>
      </div>

      {/* Document Types */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          Documents & Forms
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <FeatureTile
            icon={AlertTriangle}
            title="Accident Report"
            description="Standard accident form"
            onClick={() => {}}
            compact
          />
          <FeatureTile
            icon={FileWarning}
            title="Near Miss Report"
            description="Near miss reporting"
            onClick={() => {}}
            compact
          />
          <FeatureTile
            icon={ClipboardCheck}
            title="Investigation Record"
            description="Investigation template"
            onClick={() => {}}
            compact
          />
        </div>
      </div>

      {/* Recent Incidents */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-info rounded-full"></span>
          Recent Incidents
        </h2>
        <div className="space-y-2">
          {safetyIncidents.map((incident) => (
            <Card key={incident.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      incident.type === "Near Miss" 
                        ? "bg-warning/10" 
                        : incident.type === "Minor Injury"
                        ? "bg-destructive/10"
                        : "bg-info/10"
                    }`}>
                      <AlertTriangle className={`h-4 w-4 ${
                        incident.type === "Near Miss" 
                          ? "text-warning" 
                          : incident.type === "Minor Injury"
                          ? "text-destructive"
                          : "text-info"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm md:text-base">{incident.description}</p>
                      <p className="text-xs text-muted-foreground">{incident.type} • {incident.location}</p>
                      <p className="text-xs text-muted-foreground mt-1">Reported by {incident.reportedBy} • {incident.date}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${
                    incident.status === "Resolved" 
                      ? "bg-success/10 text-success" 
                      : "bg-warning/10 text-warning"
                  }`}>
                    {incident.status}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
