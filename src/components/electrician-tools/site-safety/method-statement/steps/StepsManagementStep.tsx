import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Plus, 
  Trash2, 
  GripVertical, 
  AlertTriangle, 
  Clock, 
  Shield,
  Wrench,
  GraduationCap,
  Copy,
  Lightbulb,
  Edit3
} from 'lucide-react';
import { MethodStep } from '@/types/method-statement';
import { stepTemplates } from '@/data/method-statement-templates';
import { useHazardDatabase } from '../../hooks/useHazardDatabase';
import HazardSelector from '../../components/HazardSelector';

interface StepsManagementStepProps {
  steps: MethodStep[];
  onStepsChange: (steps: MethodStep[]) => void;
  onNext: () => void;
  onBack: () => void;
  linkedHazards?: string[];
  onHazardLink?: (hazardId: string) => void;
}

const StepsManagementStep = ({ steps, onStepsChange, onNext, onBack, linkedHazards = [], onHazardLink }: StepsManagementStepProps) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHazardSelector, setShowHazardSelector] = useState(false);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const { getHazardById, getRiskColor: getHazardRiskColor } = useHazardDatabase();

  const addNewStep = () => {
    const newStep: MethodStep = {
      id: `step-${Date.now()}`,
      stepNumber: steps.length + 1,
      title: '',
      description: '',
      safetyRequirements: [],
      equipmentNeeded: [],
      qualifications: [],
      estimatedDuration: '',
      riskLevel: 'medium',
      isCompleted: false,
      linkedHazards: []
    };
    onStepsChange([...steps, newStep]);
    setExpandedStep(newStep.id);
  };

  const addStepFromTemplate = (template: any) => {
    const newStep: MethodStep = {
      id: `step-${Date.now()}`,
      stepNumber: steps.length + 1,
      title: template.title,
      description: template.description,
      safetyRequirements: [...template.safetyRequirements],
      equipmentNeeded: [...template.equipmentNeeded],
      qualifications: [...template.qualifications],
      estimatedDuration: template.estimatedDuration,
      riskLevel: template.riskLevel,
      isCompleted: false,
      linkedHazards: []
    };
    onStepsChange([...steps, newStep]);
    setShowTemplates(false);
  };

  const updateStep = (id: string, updates: Partial<MethodStep>) => {
    onStepsChange(steps.map(step => 
      step.id === id ? { ...step, ...updates } : step
    ));
  };

  const removeStep = (id: string) => {
    const updatedSteps = steps.filter(step => step.id !== id)
      .map((step, index) => ({ ...step, stepNumber: index + 1 }));
    onStepsChange(updatedSteps);
  };

  const duplicateStep = (step: MethodStep) => {
    const newStep: MethodStep = {
      ...step,
      id: `step-${Date.now()}`,
      stepNumber: steps.length + 1,
      title: `${step.title} (Copy)`,
      linkedHazards: [...(step.linkedHazards || [])]
    };
    onStepsChange([...steps, newStep]);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedSteps = Array.from(steps);
    const [removed] = reorderedSteps.splice(result.source.index, 1);
    reorderedSteps.splice(result.destination.index, 0, removed);

    // Renumber steps
    const numberedSteps = reorderedSteps.map((step, index) => ({
      ...step,
      stepNumber: index + 1
    }));

    onStepsChange(numberedSteps);
  };

  const addArrayItem = (stepId: string, field: 'safetyRequirements' | 'equipmentNeeded' | 'qualifications', value: string) => {
    if (!value.trim()) return;
    const step = steps.find(s => s.id === stepId);
    if (step) {
      updateStep(stepId, {
        [field]: [...step[field], value.trim()]
      });
    }
  };

  const removeArrayItem = (stepId: string, field: 'safetyRequirements' | 'equipmentNeeded' | 'qualifications', index: number) => {
    const step = steps.find(s => s.id === stepId);
    if (step) {
      const newArray = [...step[field]];
      newArray.splice(index, 1);
      updateStep(stepId, { [field]: newArray });
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500/20 text-green-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'high': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const linkHazardToStep = (stepId: string, hazardId: string) => {
    const step = steps.find(s => s.id === stepId);
    if (step) {
      const linkedHazards = step.linkedHazards || [];
      if (!linkedHazards.includes(hazardId)) {
        updateStep(stepId, {
          linkedHazards: [...linkedHazards, hazardId]
        });
      }
    }
    if (onHazardLink) {
      onHazardLink(hazardId);
    }
  };

  const unlinkHazardFromStep = (stepId: string, hazardId: string) => {
    const step = steps.find(s => s.id === stepId);
    if (step) {
      const linkedHazards = step.linkedHazards || [];
      updateStep(stepId, {
        linkedHazards: linkedHazards.filter(h => h !== hazardId)
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow">
              Method Steps ({steps.length})
            </CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={() => setShowHazardSelector(true)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Shield className="h-4 w-4" />
                Link Hazards
              </Button>
              <Button
                onClick={() => setShowTemplates(!showTemplates)}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Lightbulb className="h-4 w-4" />
                Step Templates
              </Button>
              <Button onClick={addNewStep} size="sm" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Step
              </Button>
            </div>
          </div>
          {showTemplates && (
            <div className="mt-4 p-4 border border-blue-500/20 rounded-lg bg-blue-500/5">
              <h4 className="text-blue-300 mb-3">Quick Step Templates</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {stepTemplates.map(template => (
                  <Button
                    key={template.id}
                    onClick={() => addStepFromTemplate(template)}
                    variant="outline"
                    size="sm"
                    className="h-auto p-3 flex flex-col items-start"
                  >
                    <div className="font-medium text-sm">{template.title}</div>
                    <div className="text-xs text-muted-foreground">{template.category}</div>
                    <Badge className={`mt-1 ${getRiskColor(template.riskLevel)}`} variant="outline">
                      {template.riskLevel} risk
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Steps List */}
      {steps.length === 0 ? (
        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-8 text-center">
            <div className="text-yellow-300 mb-2">No method steps added yet</div>
            <p className="text-muted-foreground mb-4">
              Click "Add Step" to start building your method statement, or use our step templates for common procedures.
            </p>
            <div className="flex justify-center gap-2">
              <Button onClick={addNewStep} variant="outline">
                Add Your First Step
              </Button>
              <Button onClick={() => setShowTemplates(true)} variant="outline">
                Browse Templates
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="steps">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {steps.map((step, index) => (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {(provided, snapshot) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`transition-all ${
                          snapshot.isDragging ? 'scale-105 shadow-lg' : ''
                        } ${expandedStep === step.id ? 'border-elec-yellow' : ''}`}
                      >
                        {expandedStep === step.id ? (
                          // Expanded Edit View
                          <>
                            <CardHeader className="pb-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div
                                    {...provided.dragHandleProps}
                                    className="text-muted-foreground hover:text-elec-yellow cursor-grab"
                                  >
                                    <GripVertical className="h-5 w-5" />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center font-bold">
                                      {step.stepNumber}
                                    </div>
                                   <div>
                                     <h4 className="font-semibold text-elec-yellow">
                                       {step.title || `Step ${step.stepNumber}`}
                                     </h4>
                                     <div className="flex gap-2 mt-1">
                                       <Badge className={getRiskColor(step.riskLevel)} variant="outline">
                                         {step.riskLevel} risk
                                       </Badge>
                                       {step.linkedHazards && step.linkedHazards.length > 0 && (
                                         <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                                           {step.linkedHazards.length} hazard{step.linkedHazards.length !== 1 ? 's' : ''}
                                         </Badge>
                                       )}
                                     </div>
                                   </div>
                                  </div>
                                </div>
                                 <div className="flex items-center gap-2">
                                   <Button
                                     onClick={() => {
                                       setSelectedStep(step.id);
                                       setShowHazardSelector(true);
                                     }}
                                     size="sm"
                                     variant="outline"
                                     className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                                   >
                                     <Shield className="h-4 w-4" />
                                   </Button>
                                   <Button
                                     onClick={() => duplicateStep(step)}
                                     size="sm"
                                     variant="outline"
                                   >
                                     <Copy className="h-4 w-4" />
                                   </Button>
                                   <Button
                                     onClick={() => setExpandedStep(null)}
                                     size="sm"
                                     variant="outline"
                                   >
                                     Done
                                   </Button>
                                   <Button
                                     onClick={() => removeStep(step.id)}
                                     size="sm"
                                     variant="outline"
                                   >
                                     <Trash2 className="h-4 w-4" />
                                   </Button>
                                 </div>
                              </div>
                            </CardHeader>

                            <CardContent className="space-y-6 border-t border-elec-yellow/20 pt-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <Label htmlFor={`title-${step.id}`} className="text-foreground">Step Title</Label>
                                  <Input
                                    id={`title-${step.id}`}
                                    value={step.title}
                                    onChange={(e) => updateStep(step.id, { title: e.target.value })}
                                    placeholder="Enter step title"
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`duration-${step.id}`} className="text-foreground">Estimated Duration</Label>
                                  <Input
                                    id={`duration-${step.id}`}
                                    value={step.estimatedDuration}
                                    onChange={(e) => updateStep(step.id, { estimatedDuration: e.target.value })}
                                    placeholder="e.g., 30 minutes"
                                    className="mt-1"
                                  />
                                </div>
                              </div>

                              <div>
                                <Label htmlFor={`description-${step.id}`} className="text-foreground">Step Description</Label>
                                <Textarea
                                  id={`description-${step.id}`}
                                  value={step.description}
                                  onChange={(e) => updateStep(step.id, { description: e.target.value })}
                                  placeholder="Describe what needs to be done in this step"
                                  rows={3}
                                  className="mt-1"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`risk-${step.id}`} className="text-foreground">Risk Level</Label>
                                <Select
                                  value={step.riskLevel}
                                  onValueChange={(value: 'low' | 'medium' | 'high') => 
                                    updateStep(step.id, { riskLevel: value })
                                  }
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="low">Low Risk</SelectItem>
                                    <SelectItem value="medium">Medium Risk</SelectItem>
                                    <SelectItem value="high">High Risk</SelectItem>
                                  </SelectContent>
                                </Select>
                               </div>
                            </CardContent>
                          </>
                        ) : (
                          // Simple Card View
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              {/* Step Number Badge */}
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold text-lg border-2 border-elec-yellow/30">
                                  {step.stepNumber}
                                </div>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                  <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-elec-yellow mb-2">
                                      {step.title || `Step ${step.stepNumber}`}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                      {step.description || 'No description provided'}
                                    </p>
                                  </div>
                                  
                                  {/* Time and Edit Button */}
                                  <div className="flex flex-col items-end gap-3">
                                    {step.estimatedDuration && (
                                      <div className="bg-muted/30 rounded-lg px-3 py-2 text-center border border-border">
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                                          <Clock className="h-4 w-4" />
                                        </div>
                                        <div className="text-lg font-semibold text-foreground">
                                          {step.estimatedDuration}
                                        </div>
                                      </div>
                                    )}
                                    
                                    <Button
                                      onClick={() => setExpandedStep(step.id)}
                                      size="sm"
                                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                                    >
                                      <Edit3 className="h-4 w-4 mr-2" />
                                      Edit
                                    </Button>
                                  </div>
                                </div>

                                {/* Risk Badge and Progress */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Badge className={getRiskColor(step.riskLevel)} variant="outline">
                                      {step.riskLevel} risk
                                    </Badge>
                                    {step.linkedHazards && step.linkedHazards.length > 0 && (
                                      <Badge variant="outline" className="border-orange-500/30 text-orange-400">
                                        {step.linkedHazards.length} hazard{step.linkedHazards.length !== 1 ? 's' : ''}
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <div className="w-24 bg-muted/50 h-2 rounded-full overflow-hidden">
                                      <div 
                                        className="h-full bg-elec-yellow transition-all duration-300"
                                        style={{ width: step.isCompleted ? '100%' : '25%' }}
                                      />
                                    </div>
                                    <span className="text-xs text-muted-foreground font-medium">
                                      {step.isCompleted ? 'Complete' : 'In Progress'}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Drag Handle */}
                              <div
                                {...provided.dragHandleProps}
                                className="flex-shrink-0 text-muted-foreground hover:text-elec-yellow cursor-grab p-1"
                              >
                                <GripVertical className="h-5 w-5" />
                              </div>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
       )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button onClick={onBack} variant="outline">
          Previous Step
        </Button>
        <Button onClick={onNext} disabled={steps.length === 0}>
          Next Step
        </Button>
      </div>

      {/* Hazard Selector Modal */}
      <HazardSelector
        open={showHazardSelector}
        onOpenChange={setShowHazardSelector}
        onHazardSelect={(hazard) => {
          if (selectedStep) {
            linkHazardToStep(selectedStep, hazard.id);
          }
          setSelectedStep(null);
        }}
        selectedTaskId={selectedStep}
      />
    </div>
  );
};

export default StepsManagementStep;