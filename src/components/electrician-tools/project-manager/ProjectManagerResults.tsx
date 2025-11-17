import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download, Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { SendToAgentDropdown } from "@/components/install-planner-v2/SendToAgentDropdown";
import CriticalActionsCard from "./CriticalActionsCard";
import PhaseTimeline from "./PhaseTimeline";
import MaterialProcurementCard from "./MaterialProcurementCard";
import ComplianceChecklist from "./ComplianceChecklist";
import ClientImpactCard from "./ClientImpactCard";
import PhasesSection from "./PhasesSection";
import ResourcesSection from "./ResourcesSection";
import RisksSection from "./RisksSection";
import MilestonesSection from "./MilestonesSection";
import ProjectOverviewSection from "./ProjectOverviewSection";

interface ProjectManagerResultsProps {
  results: any;
  prompt: string;
  selectedType: string;
  projectName: string;
  startDate: string;
  onStartOver: () => void;
}

const ProjectManagerResults = ({
  results,
  prompt,
  selectedType,
  projectName,
  startDate,
  onStartOver
}: ProjectManagerResultsProps) => {
  const [phaseProgress, setPhaseProgress] = useState<Record<string, boolean>>({});
  const [materialProgress, setMaterialProgress] = useState<Record<string, { ordered: boolean; date?: string }>>({});

  const handleCopy = () => {
    if (results) {
      navigator.clipboard.writeText(JSON.stringify(results, null, 2));
      toast.success("Copied to clipboard");
    }
  };

  const handleExportPDF = () => {
    if (!results) return;
    
    try {
      const { generateProjectExecutionPlanPDF } = require('@/utils/pdf-generators/project-execution-plan-pdf');
      
      const pdfData = {
        projectName: projectName || 'Untitled Project',
        projectManager: 'AI Project Manager',
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: results.endDate || 'TBC',
        phases: results.projectPlan?.phases || [],
        resources: results.projectPlan?.resources || { materials: [], labour: [], totalCost: 0 },
        risks: results.projectPlan?.risks || [],
        milestones: results.projectPlan?.milestones || [],
        referencedDocuments: results.referencedDocuments || [],
        notes: results.notes
      };
      
      const pdf = generateProjectExecutionPlanPDF(pdfData);
      pdf.save(`Project-Plan-${projectName || 'Document'}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.success("PDF exported", { description: "Project Execution Plan downloaded successfully" });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Export failed", { description: "Could not generate PDF" });
    }
  };

  const handleExportCalendar = () => {
    if (!results?.projectPlan?.phases) return;
    
    try {
      const baseDate = startDate ? new Date(startDate) : new Date();
      let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AI Project Manager//EN\n';
      
      results.projectPlan.phases.forEach((phase: any, idx: number) => {
        const phaseStart = new Date(baseDate);
        phaseStart.setDate(phaseStart.getDate() + (phase.startDay ? parseInt(phase.startDay.replace('Day ', '')) - 1 : idx * 3));
        
        const phaseEnd = new Date(phaseStart);
        phaseEnd.setDate(phaseEnd.getDate() + (phase.duration || 1));
        
        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `SUMMARY:${phase.phase}\n`;
        icsContent += `DTSTART:${phaseStart.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`;
        icsContent += `DTEND:${phaseEnd.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`;
        if (phase.description) {
          icsContent += `DESCRIPTION:${phase.description.replace(/\n/g, '\\n')}\n`;
        }
        icsContent += `END:VEVENT\n`;
      });
      
      icsContent += 'END:VCALENDAR';
      
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName || 'project'}-timeline.ics`;
      a.click();
      
      toast.success("Calendar exported", { description: "Import to Google Calendar or Outlook" });
    } catch (error) {
      console.error('Calendar export error:', error);
      toast.error("Export failed", { description: "Could not generate calendar file" });
    }
  };

  const togglePhaseComplete = (phaseId: string) => {
    setPhaseProgress(prev => ({
      ...prev,
      [phaseId]: !prev[phaseId]
    }));
  };

  const toggleMaterialOrdered = (materialId: string, date?: string) => {
    setMaterialProgress(prev => ({
      ...prev,
      [materialId]: {
        ordered: !prev[materialId]?.ordered,
        date: date || new Date().toISOString().split('T')[0]
      }
    }));
  };

  const calculateProgress = () => {
    const totalPhases = results?.projectPlan?.phases?.length || 0;
    if (totalPhases === 0) return 0;
    const completedPhases = Object.values(phaseProgress).filter(Boolean).length;
    return Math.round((completedPhases / totalPhases) * 100);
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Header Actions */}
      <Card className="p-3 sm:p-4">
        <h4 className="font-semibold text-lg mb-3">Project Plan Results</h4>
        
        {/* Progress Bar - Full Width Mobile */}
        <div className="mb-3 pb-3 border-b border-border/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Overall Progress
            </span>
            <span className="text-sm font-bold text-pink-400">
              {calculateProgress()}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-pink-400 to-pink-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>
        
        {/* Action Buttons - Grid Layout Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button 
            type="button"
            size="sm" 
            variant="outline"
            onClick={handleCopy}
            className="touch-manipulation h-11 text-xs"
          >
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            Copy
          </Button>
          
          <Button 
            type="button"
            size="sm" 
            variant="outline"
            onClick={handleExportCalendar}
            className="touch-manipulation h-11 text-xs"
          >
            <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
            Export iCal
          </Button>
          
          <Button 
            type="button"
            size="sm" 
            variant="outline"
            onClick={handleExportPDF}
            className="touch-manipulation h-11 text-xs"
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export PDF
          </Button>
          
          <div className="col-span-2 sm:col-span-1">
            <SendToAgentDropdown 
              currentAgent="project-manager" 
              currentOutput={{ prompt, selectedType, projectName, results }} 
            />
          </div>
        </div>
      </Card>

      {/* Critical Actions Dashboard */}
      <CriticalActionsCard 
        materialProcurement={results.materialProcurement}
        complianceTimeline={results.complianceTimeline}
        clientImpact={results.clientImpact}
        startDate={startDate}
      />

      {/* Project Overview */}
      <ProjectOverviewSection response={results.response} />

      {/* Visual Timeline */}
      <PhaseTimeline 
        phases={results.projectPlan?.phases || []}
        startDate={startDate}
        criticalPath={results.projectPlan?.criticalPath || []}
      />

      {/* Material Procurement */}
      {results.materialProcurement && (
        <MaterialProcurementCard 
          materialProcurement={results.materialProcurement}
          materialProgress={materialProgress}
          onToggleMaterial={toggleMaterialOrdered}
        />
      )}

      {/* Client Impact */}
      {results.clientImpact && results.clientImpact.length > 0 && (
        <ClientImpactCard clientImpact={results.clientImpact} />
      )}

      {/* Compliance Checklist */}
      {results.complianceTimeline && (
        <ComplianceChecklist 
          complianceTimeline={results.complianceTimeline}
          compliance={results.compliance}
        />
      )}

      {/* Phases */}
      <PhasesSection 
        phases={results.projectPlan?.phases || []}
        totalDuration={results.projectPlan?.totalDuration}
        totalDurationUnit={results.projectPlan?.totalDurationUnit}
        phaseProgress={phaseProgress}
        onTogglePhase={togglePhaseComplete}
        startDate={startDate}
      />

      {/* Resources */}
      {results.projectPlan?.resources && (
        <ResourcesSection resources={results.projectPlan.resources} />
      )}

      {/* Risks */}
      {results.projectPlan?.risks && results.projectPlan.risks.length > 0 && (
        <RisksSection risks={results.projectPlan.risks} />
      )}

      {/* Milestones */}
      {results.projectPlan?.milestones && results.projectPlan.milestones.length > 0 && (
        <MilestonesSection milestones={results.projectPlan.milestones} />
      )}

      {/* Start Over Button */}
      <Button 
        type="button"
        variant="outline"
        onClick={onStartOver}
        className="w-full touch-manipulation h-12"
      >
        Create New Plan
      </Button>
    </div>
  );
};

export default ProjectManagerResults;
