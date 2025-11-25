import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download, Calendar as CalendarIcon, RotateCcw, Edit3, Eye } from "lucide-react";
import { toast } from "sonner";
import { SendToAgentDropdown } from "@/components/install-planner-v2/SendToAgentDropdown";
import CriticalActionsCard from "./CriticalActionsCard";
import { MobilePhaseResults } from "./MobilePhaseResults";
import ProjectResultsTabs from "./ProjectResultsTabs";
import { useProjectPlanState } from "@/hooks/useProjectPlanState";
import { EditableProjectPlan } from "@/types/projectPlan";
import { v4 as uuidv4 } from 'uuid';

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
  const [isMobile, setIsMobile] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Convert AI results to EditableProjectPlan format
  const convertToEditablePlan = (aiResults: any): Partial<EditableProjectPlan> => {
    const phases = (aiResults?.projectPlan?.phases || []).map((phase: any, idx: number) => ({
      id: uuidv4(),
      phaseName: phase.phaseName || phase.phase || `Phase ${idx + 1}`,
      dayStart: phase.dayStart || phase.startDay || idx * 3 + 1,
      dayEnd: phase.dayEnd || phase.endDay || idx * 3 + 3,
      tasks: (phase.tasks || []).map((task: any) => ({
        id: uuidv4(),
        text: typeof task === 'string' ? task : task.text || task.task || '',
        completed: false,
        notes: task.notes || ''
      })),
      materials: (phase.materials || []).map((material: any) => ({
        id: uuidv4(),
        name: material.name || material.item || '',
        quantity: material.quantity || 1,
        unit: material.unit || '',
        orderBy: material.orderBy || '',
        ordered: false,
        supplier: material.supplier || '',
        unitCost: material.unitCost || 0
      })),
      holdPoints: phase.holdPoints || [],
      tradeCoordination: (phase.tradeCoordination || []).map((coord: any) => ({
        id: uuidv4(),
        trade: coord.trade || '',
        day: coord.day || 1,
        note: coord.note || '',
        contacted: false
      })),
      completed: false
    }));

    const risks = (aiResults?.projectPlan?.risks || []).map((risk: any) => ({
      id: uuidv4(),
      description: risk.description || risk.risk || '',
      mitigation: risk.mitigation || risk.control || '',
      status: 'open' as const,
      severity: (risk.severity || 'medium') as 'low' | 'medium' | 'high'
    }));

    const milestones = (aiResults?.projectPlan?.milestones || []).map((milestone: any) => ({
      id: uuidv4(),
      name: milestone.name || milestone.milestone || '',
      date: milestone.date || '',
      completed: false,
      description: milestone.description || ''
    }));

    return {
      projectName: projectName || 'Untitled Project',
      clientName: aiResults?.clientName || '',
      location: aiResults?.location || '',
      startDate: startDate || new Date().toISOString().split('T')[0],
      phases,
      risks,
      milestones,
      notes: aiResults?.notes || '',
      metadata: {
        estimatedDuration: phases.length * 3,
        totalBudget: aiResults?.projectPlan?.resources?.totalCost || 0,
        projectType: selectedType || 'domestic'
      }
    };
  };

  const editablePlan = convertToEditablePlan(results);
  
  const {
    plan,
    updatePhase,
    deletePhase,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    addRisk,
    updateRisk,
    deleteRisk,
    exportState
  } = useProjectPlanState({ initialPlan: editablePlan });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCopy = () => {
    const exportData = exportState();
    navigator.clipboard.writeText(exportData);
    toast.success("Copied to clipboard", {
      description: "Editable project plan copied as JSON"
    });
  };

  const handleExportPDF = () => {
    try {
      const { generateProjectExecutionPlanPDF } = require('@/utils/pdf-generators/project-execution-plan-pdf');
      
      const pdfData = {
        projectName: plan.projectName || 'Untitled Project',
        projectManager: 'AI Project Manager',
        startDate: plan.startDate,
        endDate: results.endDate || 'TBC',
        phases: plan.phases,
        resources: results.projectPlan?.resources || { materials: [], labour: [], totalCost: 0 },
        risks: plan.risks,
        milestones: plan.milestones,
        referencedDocuments: results.referencedDocuments || [],
        notes: plan.notes
      };
      
      const pdf = generateProjectExecutionPlanPDF(pdfData);
      pdf.save(`Project-Plan-${plan.projectName}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast.success("PDF exported", { description: "Project Execution Plan downloaded successfully" });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error("Export failed", { description: "Could not generate PDF" });
    }
  };

  const handleExportCalendar = () => {
    if (!plan.phases || plan.phases.length === 0) return;
    
    try {
      const baseDate = plan.startDate ? new Date(plan.startDate) : new Date();
      let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AI Project Manager//EN\n';
      
      plan.phases.forEach((phase, idx) => {
        const phaseName = phase.phaseName;
        
        const phaseStart = new Date(baseDate);
        phaseStart.setDate(phaseStart.getDate() + (phase.dayStart - 1));
        
        const phaseEnd = new Date(baseDate);
        phaseEnd.setDate(phaseEnd.getDate() + phase.dayEnd);
        
        icsContent += `BEGIN:VEVENT\n`;
        icsContent += `SUMMARY:${phaseName}\n`;
        icsContent += `DTSTART:${phaseStart.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`;
        icsContent += `DTEND:${phaseEnd.toISOString().replace(/[-:]/g, '').split('.')[0]}Z\n`;
        icsContent += `END:VEVENT\n`;
      });
      
      icsContent += 'END:VCALENDAR';
      
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${plan.projectName}-timeline.ics`;
      a.click();
      
      toast.success("Calendar exported", { description: "Import to Google Calendar or Outlook" });
    } catch (error) {
      console.error('Calendar export error:', error);
      toast.error("Export failed", { description: "Could not generate calendar file" });
    }
  };

  const calculateProgress = () => {
    const totalPhases = plan.phases.length;
    if (totalPhases === 0) return 0;
    const completedPhases = plan.phases.filter(p => p.completed).length;
    return Math.round((completedPhases / totalPhases) * 100);
  };

  return (
    <>
      {/* Mobile-First: Phase-by-Phase Navigation (< 768px) */}
      {isMobile ? (
        <MobilePhaseResults
          plan={plan}
          projectName={plan.projectName}
          startDate={plan.startDate}
          onExportPDF={handleExportPDF}
          onExportCalendar={handleExportCalendar}
          onStartOver={onStartOver}
          editMode={editMode}
          onToggleEditMode={() => setEditMode(!editMode)}
          onUpdatePhase={updatePhase}
          onDeletePhase={deletePhase}
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          onToggleTask={toggleTaskComplete}
        />
      ) : (
        /* Desktop: Tabbed Layout (>= 768px) */
        <div className="space-y-4 pb-6">
          {/* Header Actions */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-lg text-white">Project Plan Results</h4>
              <Button
                variant={editMode ? "default" : "outline"}
                size="sm"
                onClick={() => setEditMode(!editMode)}
                className="gap-2"
              >
                {editMode ? (
                  <>
                    <Eye className="h-4 w-4" />
                    View Mode
                  </>
                ) : (
                  <>
                    <Edit3 className="h-4 w-4" />
                    Edit Mode
                  </>
                )}
              </Button>
            </div>
            
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
                    currentOutput={{ 
                      prompt, 
                      selectedType, 
                      projectName: plan.projectName, 
                      plan: JSON.parse(exportState())
                    }} 
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
            startDate={plan.startDate}
          />

          {/* Tabbed Content */}
          <ProjectResultsTabs
            plan={plan}
            editMode={editMode}
            onUpdatePhase={updatePhase}
            onDeletePhase={deletePhase}
            onAddTask={addTask}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTaskComplete}
            onUpdateMaterial={updateMaterial}
            onDeleteMaterial={deleteMaterial}
            onUpdateRisk={updateRisk}
            onDeleteRisk={deleteRisk}
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
