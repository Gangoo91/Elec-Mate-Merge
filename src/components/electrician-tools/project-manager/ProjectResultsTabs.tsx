import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Layers, AlertCircle } from "lucide-react";
import ProjectOverviewSection from "./ProjectOverviewSection";
import PhaseTimeline from "./PhaseTimeline";
import PhasesSection from "./PhasesSection";
import ResourcesSection from "./ResourcesSection";
import RisksSection from "./RisksSection";
import MilestonesSection from "./MilestonesSection";
import ComplianceChecklist from "./ComplianceChecklist";
import MaterialProcurementCard from "./MaterialProcurementCard";

interface ProjectResultsTabsProps {
  results: any;
  startDate: string;
  phaseProgress: Record<string, boolean>;
  materialProgress: Record<string, { ordered: boolean; date?: string }>;
  onTogglePhase: (phaseId: string) => void;
  onToggleMaterial: (materialId: string, date?: string) => void;
}

const ProjectResultsTabs = ({
  results,
  startDate,
  phaseProgress,
  materialProgress,
  onTogglePhase,
  onToggleMaterial
}: ProjectResultsTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-6">
        <TabsTrigger value="overview" className="gap-2">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Overview</span>
        </TabsTrigger>
        <TabsTrigger value="timeline" className="gap-2">
          <Calendar className="h-4 w-4" />
          <span className="hidden sm:inline">Timeline</span>
        </TabsTrigger>
        <TabsTrigger value="phases" className="gap-2">
          <Layers className="h-4 w-4" />
          <span className="hidden sm:inline">Phases</span>
        </TabsTrigger>
        <TabsTrigger value="resources" className="gap-2">
          <AlertCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Resources</span>
        </TabsTrigger>
      </TabsList>

      {/* Tab 1: Overview */}
      <TabsContent value="overview" className="space-y-4 mt-0">
        <ProjectOverviewSection response={results.response} />
      </TabsContent>

      {/* Tab 2: Timeline */}
      <TabsContent value="timeline" className="space-y-4 mt-0">
        <PhaseTimeline 
          phases={results.projectPlan?.phases || []}
          startDate={startDate}
          criticalPath={results.projectPlan?.criticalPath || []}
        />
        
        {results.projectPlan?.milestones && results.projectPlan.milestones.length > 0 && (
          <MilestonesSection milestones={results.projectPlan.milestones} />
        )}
      </TabsContent>

      {/* Tab 3: Phases */}
      <TabsContent value="phases" className="space-y-4 mt-0">
        <PhasesSection 
          phases={results.projectPlan?.phases || []}
          totalDuration={results.projectPlan?.totalDuration}
          totalDurationUnit={results.projectPlan?.totalDurationUnit}
          phaseProgress={phaseProgress}
          onTogglePhase={onTogglePhase}
          startDate={startDate}
        />
      </TabsContent>

      {/* Tab 4: Resources & Risks */}
      <TabsContent value="resources" className="space-y-4 mt-0">
        {results.materialProcurement && (
          <MaterialProcurementCard 
            materialProcurement={results.materialProcurement}
            materialProgress={materialProgress}
            onToggleMaterial={onToggleMaterial}
          />
        )}

        {results.projectPlan?.resources && (
          <ResourcesSection resources={results.projectPlan.resources} />
        )}

        {results.complianceTimeline && (
          <ComplianceChecklist 
            complianceTimeline={results.complianceTimeline}
            compliance={results.compliance}
          />
        )}

        {results.projectPlan?.risks && results.projectPlan.risks.length > 0 && (
          <RisksSection risks={results.projectPlan.risks} />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ProjectResultsTabs;
