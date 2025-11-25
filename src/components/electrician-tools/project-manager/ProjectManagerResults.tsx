import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download, Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { SendToAgentDropdown } from "@/components/install-planner-v2/SendToAgentDropdown";
import CriticalActionsCard from "./CriticalActionsCard";
import { MobilePhaseResults } from "./MobilePhaseResults";
import ProjectResultsTabs from "./ProjectResultsTabs";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopy = () => {
    if (results) {
      navigator.clipboard.writeText(JSON.stringify(results, null, 2));
      toast.success("Copied to clipboard", {
        description: "Project plan copied to clipboard"
      });
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
        const phaseName = (phase.phaseName || phase.phase || `Phase ${idx + 1}`).toString();
        const phaseDescription = (phase.description || '').toString();
        
        const phaseStart = new Date(baseDate);
        phaseStart.setDate(phaseStart.getDate() + (phase.startDay ? parseInt(phase.startDay.replace('Day ', '')) - 1 : idx * 3));
        
        const phaseEnd = new Date(phaseStart);
        phaseEnd.setDate(phaseEnd.getDate() + (phase.duration || 1));
        
        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `SUMMARY:${phaseName}\n`;
        icsContent += `DTSTART:${phaseStart.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`;
        icsContent += `DTEND:${phaseEnd.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`;
        if (phaseDescription) {
          icsContent += `DESCRIPTION:${phaseDescription.replace(/\n/g, '\\n')}\n`;
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
    <>
      {/* Mobile-First: Phase-by-Phase Navigation (< 768px) */}
      {isMobile ? (
        <MobilePhaseResults
          results={results}
          projectName={projectName}
          startDate={startDate}
          onExportPDF={handleExportPDF}
          onExportCalendar={handleExportCalendar}
          onStartOver={onStartOver}
        />
      ) : (
        /* Desktop: Tabbed Layout (>= 768px) */
        <div className="space-y-4 pb-6">
          {/* Header Actions */}
          <Card className="p-4">
            <h4 className="font-semibold text-lg mb-3 text-white">Project Plan Results</h4>
            
            {/* Progress Bar */}
            <div className="mb-4 pb-4 border-b border-border/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-white/80">
                  Overall Progress
                </span>
                <span className="text-base font-bold text-pink-400">
                  {calculateProgress()}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 h-3 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
            
            {/* Action Buttons - Primary & Secondary */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button"
                  onClick={handleExportPDF}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-semibold h-11"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={handleExportCalendar}
                  className="h-11"
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Export Calendar
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  type="button"
                  size="sm" 
                  variant="ghost"
                  onClick={handleCopy}
                  className="text-xs text-white/70"
                >
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Copy Data
                </Button>
                
                <div>
                  <SendToAgentDropdown 
                    currentAgent="project-manager" 
                    currentOutput={{ prompt, selectedType, projectName, results }} 
                  />
                </div>
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

          {/* Tabbed Content */}
          <ProjectResultsTabs
            results={results}
            startDate={startDate}
            phaseProgress={phaseProgress}
            materialProgress={materialProgress}
            onTogglePhase={togglePhaseComplete}
            onToggleMaterial={toggleMaterialOrdered}
          />

          {/* Start Over Button */}
          <Button 
            type="button"
            variant="outline"
            onClick={onStartOver}
            className="w-full touch-manipulation h-12"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Create New Plan
          </Button>
        </div>
      )}
    </>
  );
};

export default ProjectManagerResults;
