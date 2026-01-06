import { Card, CardContent } from "@/components/ui/card";
import { FeatureTile } from "@/components/employer/FeatureTile";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { Button } from "@/components/ui/button";
import { QuickStats, QuickStat } from "@/components/employer/QuickStats";
import {
  FileText,
  Sparkles,
  FolderOpen,
  Archive,
  Plus,
  Clock,
  CheckCircle2
} from "lucide-react";
import { rams } from "@/data/employerMockData";

export function RAMSSection() {
  const activeRAMS = rams.filter(r => r.status === "Approved").length;
  const pendingReview = rams.filter(r => r.status === "Pending Review").length;
  const totalRAMS = rams.length;

  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="RAMS"
        description="Risk assessments and method statements"
      />

      {/* Quick Stats */}
      <QuickStats
        stats={[
          {
            icon: CheckCircle2,
            value: activeRAMS,
            label: "Approved",
            color: "green",
          },
          ...(pendingReview > 0 ? [{
            icon: Clock,
            value: pendingReview,
            label: "Pending",
            color: "yellow" as const,
            pulse: true,
          }] : []),
          {
            icon: FileText,
            value: totalRAMS,
            label: "Total RAMS",
            color: "blue",
          },
        ]}
      />

      {/* AI RAMS - Prominent Card */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-elec-yellow rounded-full"></span>
          AI-Powered
        </h2>
        <Card className="border-elec-yellow/30 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-elec-yellow/20">
                <Sparkles className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">AI RAMS Generator</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate comprehensive risk assessments with AI. Describe your job and get a complete RAMS document in seconds.
                </p>
                <Button className="w-full md:w-auto" disabled>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Coming Soon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RAMS Management */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-success rounded-full"></span>
          Manage RAMS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <FeatureTile
            icon={FolderOpen}
            title="My RAMS"
            description="View and manage existing"
            onClick={() => {}}
            badge={`${totalRAMS} docs`}
            compact
          />
          <FeatureTile
            icon={Plus}
            title="Create New"
            description="Start from blank"
            onClick={() => {}}
            compact
          />
          <FeatureTile
            icon={FileText}
            title="Templates"
            description="Use pre-made templates"
            onClick={() => {}}
            compact
          />
          <FeatureTile
            icon={Archive}
            title="Archive"
            description="View archived RAMS"
            onClick={() => {}}
            compact
          />
        </div>
      </div>

      {/* Recent RAMS */}
      <div>
        <h2 className="text-base md:text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-info rounded-full"></span>
          Recent RAMS
        </h2>
        <div className="space-y-2">
          {rams.map((ram) => (
            <Card key={ram.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground text-sm md:text-base">{ram.project}</p>
                      <p className="text-xs text-muted-foreground">v{ram.version} • Updated {ram.lastUpdated}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    ram.status === "Approved" 
                      ? "bg-success/10 text-success" 
                      : "bg-warning/10 text-warning"
                  }`}>
                    {ram.status}
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
