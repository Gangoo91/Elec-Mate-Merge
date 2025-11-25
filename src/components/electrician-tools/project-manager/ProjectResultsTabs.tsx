import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar, Layers, AlertCircle } from "lucide-react";
import ProjectOverviewSection from "./ProjectOverviewSection";
import PhaseTimeline from "./PhaseTimeline";
import { Card } from "@/components/ui/card";
import { EditablePhaseCard } from "./editable/EditablePhaseCard";
import { EditableRiskItem } from "./editable/EditableRiskItem";
import { EditableProjectPlan, ProjectPhase, ProjectRisk } from "@/types/projectPlan";

interface ProjectResultsTabsProps {
  plan: EditableProjectPlan;
  editMode: boolean;
  onUpdatePhase: (phaseId: string, updates: Partial<ProjectPhase>) => void;
  onDeletePhase: (phaseId: string) => void;
  onAddTask: (phaseId: string, taskText: string) => void;
  onUpdateTask: (phaseId: string, taskId: string, updates: any) => void;
  onDeleteTask: (phaseId: string, taskId: string) => void;
  onToggleTask: (phaseId: string, taskId: string) => void;
  onUpdateMaterial: (phaseId: string, materialId: string, updates: any) => void;
  onDeleteMaterial: (phaseId: string, materialId: string) => void;
  onUpdateRisk: (riskId: string, updates: Partial<ProjectRisk>) => void;
  onDeleteRisk: (riskId: string) => void;
}

const ProjectResultsTabs = ({
  plan,
  editMode,
  onUpdatePhase,
  onDeletePhase,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTask,
  onUpdateMaterial,
  onDeleteMaterial,
  onUpdateRisk,
  onDeleteRisk
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
        <TabsTrigger value="risks" className="gap-2">
          <AlertCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Risks</span>
        </TabsTrigger>
      </TabsList>

      {/* Tab 1: Overview */}
      <TabsContent value="overview" className="space-y-4 mt-0">
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4">{plan.projectName}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {plan.clientName && (
              <div>
                <span className="text-muted-foreground">Client:</span>{' '}
                <span className="font-medium">{plan.clientName}</span>
              </div>
            )}
            {plan.location && (
              <div>
                <span className="text-muted-foreground">Location:</span>{' '}
                <span className="font-medium">{plan.location}</span>
              </div>
            )}
            <div>
              <span className="text-muted-foreground">Start Date:</span>{' '}
              <span className="font-medium">{new Date(plan.startDate).toLocaleDateString('en-GB')}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Phases:</span>{' '}
              <span className="font-medium">{plan.phases.length}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>{' '}
              <span className="font-medium">{plan.metadata.estimatedDuration} days</span>
            </div>
            <div>
              <span className="text-muted-foreground">Type:</span>{' '}
              <span className="font-medium capitalize">{plan.metadata.projectType}</span>
            </div>
          </div>
          {plan.notes && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Notes</h4>
              <p className="text-sm text-muted-foreground">{plan.notes}</p>
            </div>
          )}
        </Card>
      </TabsContent>

      {/* Tab 2: Timeline */}
      <TabsContent value="timeline" className="space-y-4 mt-0">
        <PhaseTimeline 
          phases={plan.phases.map(phase => ({
            phase: phase.phaseName,
            phaseName: phase.phaseName,
            duration: phase.dayEnd - phase.dayStart + 1,
            startDay: `Day ${phase.dayStart}`,
            criticalPath: false,
            tasks: phase.tasks.map(t => t.text)
          }))}
          startDate={plan.startDate}
          criticalPath={[]}
        />
        
        {plan.milestones && plan.milestones.length > 0 && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Milestones</h3>
            <div className="space-y-3">
              {plan.milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-start justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <h4 className="font-medium">{milestone.name}</h4>
                    {milestone.description && (
                      <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(milestone.date).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </TabsContent>

      {/* Tab 3: Phases */}
      <TabsContent value="phases" className="space-y-4 mt-0">
        {plan.phases.map((phase, idx) => (
          editMode ? (
            <EditablePhaseCard
              key={phase.id}
              phase={phase}
              onUpdate={(updates) => onUpdatePhase(phase.id, updates)}
              onDelete={() => onDeletePhase(phase.id)}
              onAddTask={(taskText) => onAddTask(phase.id, taskText)}
              onUpdateTask={(taskId, updates) => onUpdateTask(phase.id, taskId, updates)}
              onDeleteTask={(taskId) => onDeleteTask(phase.id, taskId)}
              onToggleTask={(taskId) => onToggleTask(phase.id, taskId)}
            />
          ) : (
            <Card key={phase.id} className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{phase.phaseName}</h3>
                <p className="text-sm text-muted-foreground">
                  Day {phase.dayStart} - {phase.dayEnd} ({phase.dayEnd - phase.dayStart + 1} days)
                </p>
              </div>
              
              {phase.tasks.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Tasks</h4>
                  <div className="space-y-1">
                    {phase.tasks.map((task) => (
                      <div key={task.id} className="flex items-start gap-2 text-sm">
                        <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                          • {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {phase.materials && phase.materials.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Materials</h4>
                  <div className="space-y-1">
                    {phase.materials.map((material) => (
                      <div key={material.id} className="text-sm bg-muted/30 rounded-md p-2">
                        {material.name} - {material.quantity}{material.unit || ''}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {phase.holdPoints && phase.holdPoints.length > 0 && (
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Hold Points</h4>
                  <div className="space-y-1">
                    {phase.holdPoints.map((point, idx) => (
                      <div key={idx} className="text-sm bg-orange-500/10 border border-orange-500/20 rounded-md p-2">
                        ⚠️ {point}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )
        ))}
      </TabsContent>

      {/* Tab 4: Risks */}
      <TabsContent value="risks" className="space-y-4 mt-0">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Risk Register</h3>
          {plan.risks.length === 0 ? (
            <p className="text-sm text-muted-foreground">No risks identified</p>
          ) : (
            <div className="space-y-3">
              {plan.risks.map((risk) => (
                editMode ? (
                  <EditableRiskItem
                    key={risk.id}
                    risk={risk}
                    onUpdate={(updates) => onUpdateRisk(risk.id, updates)}
                    onDelete={() => onDeleteRisk(risk.id)}
                  />
                ) : (
                  <div key={risk.id} className="p-4 bg-muted/30 rounded-lg border border-border/40">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{risk.description}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        risk.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                        risk.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Mitigation:</strong> {risk.mitigation}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      risk.status === 'open' ? 'bg-orange-500/20 text-orange-400' :
                      risk.status === 'mitigated' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {risk.status}
                    </span>
                  </div>
                )
              ))}
            </div>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ProjectResultsTabs;
