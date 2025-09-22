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
      <Card className="border-elec-yellow/20 bg-elec-gray">
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
                        className={`border-elec-yellow/20 bg-elec-gray transition-all ${
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

                              {/* Linked Hazards */}
                              {step.linkedHazards && step.linkedHazards.length > 0 && (
                                <div>
                                  <Label className="flex items-center gap-2 text-foreground mb-2">
                                    <Shield className="h-4 w-4" />
                                    Linked Hazards ({step.linkedHazards.length})
                                  </Label>
                                  <div className="space-y-2">
                                    {step.linkedHazards.map((hazardId) => {
                                      const hazard = getHazardById(hazardId);
                                      if (!hazard) return null;
                                      return (
                                        <div key={hazardId} className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                          <div className="flex items-center gap-3">
                                            <div className="p-1 rounded bg-orange-500/20">
                                              <hazard.icon className="h-4 w-4 text-orange-400" />
                                            </div>
                                            <div>
                                              <div className="font-medium text-white">{hazard.name}</div>
                                              <div className="text-xs text-muted-foreground">{hazard.category}</div>
                                            </div>
                                          </div>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => unlinkHazardFromStep(step.id, hazardId)}
                                            className="text-red-400 hover:bg-red-500/10"
                                          >
                                            ×
                                          </Button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                               {/* Safety Requirements */}
                               <div>
                                <Label className="flex items-center gap-2 text-foreground mb-2">
                                  <Shield className="h-4 w-4" />
                                  Safety Requirements
                                </Label>
                                <div className="space-y-2">
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Add safety requirement"
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          addArrayItem(step.id, 'safetyRequirements', e.currentTarget.value);
                                          e.currentTarget.value = '';
                                        }
                                      }}
                                    />
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                        addArrayItem(step.id, 'safetyRequirements', input.value);
                                        input.value = '';
                                      }}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {step.safetyRequirements.map((req, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-red-500/10 border-red-500/30 text-red-300"
                                      >
                                        <Shield className="h-3 w-3 mr-1" />
                                        {req}
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-auto p-0 ml-2"
                                          onClick={() => removeArrayItem(step.id, 'safetyRequirements', index)}
                                        >
                                          ×
                                        </Button>
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Equipment Needed */}
                              <div>
                                <Label className="flex items-center gap-2 text-foreground mb-2">
                                  <Wrench className="h-4 w-4" />
                                  Equipment Needed
                                </Label>
                                <div className="space-y-2">
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Add equipment"
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          addArrayItem(step.id, 'equipmentNeeded', e.currentTarget.value);
                                          e.currentTarget.value = '';
                                        }
                                      }}
                                    />
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                        addArrayItem(step.id, 'equipmentNeeded', input.value);
                                        input.value = '';
                                      }}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {step.equipmentNeeded.map((equipment, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-blue-500/10 border-blue-500/30 text-blue-300"
                                      >
                                        <Wrench className="h-3 w-3 mr-1" />
                                        {equipment}
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-auto p-0 ml-2"
                                          onClick={() => removeArrayItem(step.id, 'equipmentNeeded', index)}
                                        >
                                          ×
                                        </Button>
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              {/* Qualifications */}
                              <div>
                                <Label className="flex items-center gap-2 text-foreground mb-2">
                                  <GraduationCap className="h-4 w-4" />
                                  Required Qualifications
                                </Label>
                                <div className="space-y-2">
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Add qualification"
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          addArrayItem(step.id, 'qualifications', e.currentTarget.value);
                                          e.currentTarget.value = '';
                                        }
                                      }}
                                    />
                                    <Button
                                      type="button"
                                      size="sm"
                                      onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                        addArrayItem(step.id, 'qualifications', input.value);
                                        input.value = '';
                                      }}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {step.qualifications.map((qual, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-green-500/10 border-green-500/30 text-green-300"
                                      >
                                        <GraduationCap className="h-3 w-3 mr-1" />
                                        {qual}
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-auto p-0 ml-2"
                                          onClick={() => removeArrayItem(step.id, 'qualifications', index)}
                                        >
                                          ×
                                        </Button>
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </>
                        ) : (
                          // Collapsed Card View - Enhanced Mobile Layout
                          <CardContent className="mobile-padding mobile-card-spacing">
                            <div className="flex items-center gap-3 w-full">
                              {/* Drag Handle */}
                              <div
                                {...provided.dragHandleProps}
                                className="text-muted-foreground hover:text-foreground transition-colors cursor-grab active:cursor-grabbing"
                              >
                                <GripVertical className="h-4 w-4" />
                              </div>
                              
                              {/* Step Number */}
                              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                                {step.stepNumber}
                              </div>
                              
                              {/* Actions */}
                              <div className="flex items-center gap-2">
                                <Badge className={getRiskColor(step.riskLevel)} variant="outline">
                                  {step.riskLevel}
                                </Badge>
                                {step.estimatedDuration && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    {step.estimatedDuration}
                                  </div>
                                )}
                                <Button
                                  onClick={() => setExpandedStep(step.id)}
                                  size="sm"
                                  variant="outline"
                                >
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            {/* Responsive Three Column Layout - Fixed for All Screen Sizes */}
                            <div className="responsive-method-grid">
                              {/* 
                                Grid Layout Breakdown:
                                - Mobile (320px-639px): Single column, full width cards
                                - Tablet (640px-1023px): Two columns, qualifications spans full width
                                - Desktop (1024px+): Three columns, equal distribution
                                Uses CSS Grid with fractional units for flexibility
                              */}
                              {/* Safety Requirements - Grid Item 1 */}
                              <div className="method-card-item space-y-3">
                                <div className="flex items-center gap-2 mb-3">
                                  <Shield className="h-4 w-4 text-red-400 flex-shrink-0" />
                                  <h4 className="text-sm font-medium text-foreground mobile-text">
                                    Safety Requirements ({step.safetyRequirements.length})
                                  </h4>
                                </div>
                                <ul className="space-y-2">
                                  {step.safetyRequirements.slice(0, 3).map((req, index) => (
                                    <li key={index} className="text-sm text-foreground flex items-start gap-2 leading-relaxed">
                                      <span className="text-red-400 mt-1 flex-shrink-0">•</span>
                                      <span className="break-words">{req}</span>
                                    </li>
                                  ))}
                                  {step.safetyRequirements.length > 3 && (
                                    <li className="text-sm text-foreground/80 font-medium">
                                      +{step.safetyRequirements.length - 3} more
                                    </li>
                                  )}
                                  {step.safetyRequirements.length === 0 && (
                                    <li className="text-sm text-foreground/60 italic">
                                      No safety requirements added
                                    </li>
                                  )}
                                </ul>
                              </div>

                              {/* Equipment - Grid Item 2 */}
                              <div className="method-card-item space-y-3">
                                <div className="flex items-center gap-2 mb-3">
                                  <Wrench className="h-4 w-4 text-blue-400 flex-shrink-0" />
                                  <h4 className="text-sm font-medium text-foreground mobile-text">
                                    Equipment ({step.equipmentNeeded.length})
                                  </h4>
                                </div>
                                <ul className="space-y-2">
                                  {step.equipmentNeeded.slice(0, 3).map((equipment, index) => (
                                    <li key={index} className="text-sm text-foreground flex items-start gap-2 leading-relaxed">
                                      <span className="text-blue-400 mt-1 flex-shrink-0">•</span>
                                      <span className="break-words">{equipment}</span>
                                    </li>
                                  ))}
                                  {step.equipmentNeeded.length > 3 && (
                                    <li className="text-sm text-foreground/80 font-medium">
                                      +{step.equipmentNeeded.length - 3} more
                                    </li>
                                  )}
                                  {step.equipmentNeeded.length === 0 && (
                                    <li className="text-sm text-foreground/60 italic">
                                      No equipment specified
                                    </li>
                                  )}
                                </ul>
                              </div>

                              {/* Qualifications - Responsive Grid Item */}
                              <div className="qualifications-grid-item space-y-3">
                                <div className="flex items-center gap-2 mb-3">
                                  <GraduationCap className="h-4 w-4 text-green-400 flex-shrink-0" />
                                  <h4 className="text-sm font-medium text-foreground mobile-text">
                                    Qualifications ({step.qualifications.length})
                                  </h4>
                                </div>
                                <ul className="space-y-2">
                                  {step.qualifications.slice(0, 3).map((qual, index) => (
                                    <li key={index} className="text-sm text-foreground flex items-start gap-2 leading-relaxed">
                                      <span className="text-green-400 mt-1 flex-shrink-0">•</span>
                                      <span className="break-words">{qual}</span>
                                    </li>
                                  ))}
                                  {step.qualifications.length > 3 && (
                                    <li className="text-sm text-foreground/80 font-medium">
                                      +{step.qualifications.length - 3} more
                                    </li>
                                  )}
                                  {step.qualifications.length === 0 && (
                                    <li className="text-sm text-foreground/60 italic">
                                      No qualifications required
                                    </li>
                                  )}
                                </ul>
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