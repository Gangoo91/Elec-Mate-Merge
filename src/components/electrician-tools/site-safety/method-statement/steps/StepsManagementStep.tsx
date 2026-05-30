import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MethodStep } from '@/types/method-statement';
import { stepTemplates } from '@/data/method-statement-templates';
import { useHazardDatabase } from '../../hooks/useHazardDatabase';
import HazardSelector from '../../components/HazardSelector';
import {
  FormCard,
  Field,
  Eyebrow,
  EmptyState,
  ListCard,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
  type Tone,
} from '@/components/college/primitives';

interface StepsManagementStepProps {
  steps: MethodStep[];
  onStepsChange: (steps: MethodStep[]) => void;
  onNext: () => void;
  onBack: () => void;
  linkedHazards?: string[];
  onHazardLink?: (hazardId: string) => void;
}

const RISK_PILL: Record<string, string> = {
  low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/25',
  high: 'bg-red-500/10 text-red-400 border-red-500/25',
};

function RiskPill({ level }: { level: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap',
        RISK_PILL[level] ?? 'bg-white/[0.05] text-white/55 border-white/10'
      )}
    >
      {level}
    </span>
  );
}

// One meaningful colour bar per risk level on the left edge of each step row.
function accentBar(level: string) {
  return cn(
    'w-[3px] self-stretch rounded-full shrink-0',
    level === 'low'
      ? 'bg-emerald-400'
      : level === 'high'
        ? 'bg-red-400'
        : 'bg-amber-400'
  );
}

const StepsManagementStep = ({
  steps,
  onStepsChange,
  onNext,
  linkedHazards = [],
  onHazardLink,
}: StepsManagementStepProps) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHazardSelector, setShowHazardSelector] = useState(false);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const { getHazardById } = useHazardDatabase();

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
      linkedHazards: [],
    };
    onStepsChange([...steps, newStep]);
    setExpandedStep(newStep.id);
  };

  const addStepFromTemplate = (template: (typeof stepTemplates)[number]) => {
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
      linkedHazards: [],
    };
    onStepsChange([...steps, newStep]);
    setShowTemplates(false);
  };

  const updateStep = (id: string, updates: Partial<MethodStep>) => {
    onStepsChange(steps.map((step) => (step.id === id ? { ...step, ...updates } : step)));
  };

  const removeStep = (id: string) => {
    const updatedSteps = steps
      .filter((step) => step.id !== id)
      .map((step, index) => ({ ...step, stepNumber: index + 1 }));
    onStepsChange(updatedSteps);
  };

  const duplicateStep = (step: MethodStep) => {
    const newStep: MethodStep = {
      ...step,
      id: `step-${Date.now()}`,
      stepNumber: steps.length + 1,
      title: `${step.title} (Copy)`,
      linkedHazards: [...(step.linkedHazards || [])],
    };
    onStepsChange([...steps, newStep]);
  };

  const onDragEnd = (result: { source: { index: number }; destination?: { index: number } | null }) => {
    if (!result.destination) return;
    const reordered = Array.from(steps);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    onStepsChange(reordered.map((step, index) => ({ ...step, stepNumber: index + 1 })));
  };

  const addArrayItem = (
    stepId: string,
    field: 'safetyRequirements' | 'equipmentNeeded' | 'qualifications',
    value: string
  ) => {
    if (!value.trim()) return;
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      updateStep(stepId, { [field]: [...step[field], value.trim()] });
    }
  };

  const removeArrayItem = (
    stepId: string,
    field: 'safetyRequirements' | 'equipmentNeeded' | 'qualifications',
    index: number
  ) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      const newArray = [...step[field]];
      newArray.splice(index, 1);
      updateStep(stepId, { [field]: newArray });
    }
  };

  const linkHazardToStep = (stepId: string, hazardId: string) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      const existing = step.linkedHazards || [];
      if (!existing.includes(hazardId)) {
        updateStep(stepId, { linkedHazards: [...existing, hazardId] });
      }
    }
    onHazardLink?.(hazardId);
  };

  const unlinkHazardFromStep = (stepId: string, hazardId: string) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      const existing = step.linkedHazards || [];
      updateStep(stepId, { linkedHazards: existing.filter((h) => h !== hazardId) });
    }
  };

  const ChipList = ({
    stepId,
    field,
    items,
    placeholder,
    tone,
  }: {
    stepId: string;
    field: 'safetyRequirements' | 'equipmentNeeded' | 'qualifications';
    items: string[];
    placeholder: string;
    tone: Tone;
  }) => (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          placeholder={placeholder}
          className={inputClass}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addArrayItem(stepId, field, e.currentTarget.value);
              e.currentTarget.value = '';
            }
          }}
        />
        <SecondaryButton
          size="sm"
          onClick={(e) => {
            const input = (e.currentTarget as HTMLButtonElement)
              .previousElementSibling as HTMLInputElement;
            addArrayItem(stepId, field, input.value);
            input.value = '';
          }}
        >
          Add
        </SecondaryButton>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item, index) => (
            <span
              key={index}
              className={cn(
                'inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11.5px] border',
                tone === 'red'
                  ? 'bg-red-500/10 text-red-300 border-red-500/25'
                  : tone === 'blue'
                    ? 'bg-blue-500/10 text-blue-300 border-blue-500/25'
                    : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
              )}
            >
              {item}
              <button
                type="button"
                onClick={() => removeArrayItem(stepId, field, index)}
                className="text-white/50 hover:text-white touch-manipulation"
                aria-label="Remove"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <FormCard eyebrow={`Method steps (${steps.length})`}>
        <div className="flex flex-wrap gap-2">
          <SecondaryButton size="sm" onClick={() => setShowHazardSelector(true)}>
            Link hazards
          </SecondaryButton>
          <SecondaryButton size="sm" onClick={() => setShowTemplates((v) => !v)}>
            {showTemplates ? 'Hide templates' : 'Step templates'}
          </SecondaryButton>
          <PrimaryButton size="sm" onClick={addNewStep}>
            Add step
          </PrimaryButton>
        </div>

        {showTemplates && (
          <div className="space-y-2 pt-1">
            <Eyebrow>Quick step templates</Eyebrow>
            <ListCard>
              {stepTemplates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => addStepFromTemplate(template)}
                  className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
                >
                  <span className={accentBar(template.riskLevel)} />
                  <span className="flex-1 min-w-0">
                    <span className="block text-[13.5px] font-medium text-white truncate">
                      {template.title}
                    </span>
                    <span className="block text-[11.5px] text-white/55 truncate">
                      {template.category}
                    </span>
                  </span>
                  <RiskPill level={template.riskLevel} />
                </button>
              ))}
            </ListCard>
          </div>
        )}
      </FormCard>

      {/* Steps list */}
      {steps.length === 0 ? (
        <EmptyState
          title="No method steps added yet"
          description="Add a step to start building your method statement, or use a step template for common procedures."
          action="Add your first step"
          onAction={addNewStep}
        />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="steps">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                {steps.map((step, index) => (
                  <Draggable key={step.id} draggableId={step.id} index={index}>
                    {(dragProvided, snapshot) => {
                      const isExpanded = expandedStep === step.id;
                      return (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          className={cn(
                            'bg-[hsl(0_0%_12%)] border rounded-2xl overflow-hidden',
                            snapshot.isDragging ? 'border-elec-yellow/60 shadow-lg' : 'border-white/[0.06]',
                            isExpanded && 'border-elec-yellow/40'
                          )}
                        >
                          {/* Header */}
                          <div className="flex items-center gap-3 px-4 sm:px-5 py-4">
                            <span className={accentBar(step.riskLevel)} />
                            <div
                              {...dragProvided.dragHandleProps}
                              className="text-white/40 hover:text-elec-yellow cursor-grab touch-manipulation shrink-0"
                              aria-label="Drag to reorder"
                            >
                              <GripVertical className="h-4 w-4" />
                            </div>
                            <div className="h-7 w-7 rounded-full bg-elec-yellow text-black flex items-center justify-center font-semibold text-[12px] shrink-0">
                              {step.stepNumber}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[14px] font-medium text-white truncate">
                                {step.title || `Step ${step.stepNumber}`}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <RiskPill level={step.riskLevel} />
                                {step.linkedHazards && step.linkedHazards.length > 0 && (
                                  <span className="text-[10.5px] uppercase tracking-[0.12em] text-orange-400">
                                    {step.linkedHazards.length} hazard
                                    {step.linkedHazards.length !== 1 ? 's' : ''}
                                  </span>
                                )}
                                {step.estimatedDuration && (
                                  <span className="text-[11px] text-white/45 tabular-nums">
                                    {step.estimatedDuration}
                                  </span>
                                )}
                              </div>
                            </div>
                            <SecondaryButton
                              size="sm"
                              onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                            >
                              {isExpanded ? 'Done' : 'Edit'}
                            </SecondaryButton>
                          </div>

                          {/* Expanded editor */}
                          {isExpanded ? (
                            <div className="border-t border-white/[0.06] p-4 sm:p-5 space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Field label="Step title">
                                  <input
                                    value={step.title}
                                    onChange={(e) => updateStep(step.id, { title: e.target.value })}
                                    className={inputClass}
                                    placeholder="Enter step title"
                                  />
                                </Field>
                                <Field label="Estimated duration">
                                  <input
                                    value={step.estimatedDuration}
                                    onChange={(e) =>
                                      updateStep(step.id, { estimatedDuration: e.target.value })
                                    }
                                    className={inputClass}
                                    placeholder="e.g. 30 minutes"
                                  />
                                </Field>
                              </div>

                              <Field label="Step description">
                                <textarea
                                  value={step.description}
                                  onChange={(e) =>
                                    updateStep(step.id, { description: e.target.value })
                                  }
                                  className={textareaClass}
                                  rows={3}
                                  placeholder="Describe what needs to be done in this step"
                                />
                              </Field>

                              <Field label="Risk level">
                                <Select
                                  value={step.riskLevel}
                                  onValueChange={(value: 'low' | 'medium' | 'high') =>
                                    updateStep(step.id, { riskLevel: value })
                                  }
                                >
                                  <SelectTrigger className={selectTriggerClass}>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className={selectContentClass}>
                                    <SelectItem value="low">Low Risk</SelectItem>
                                    <SelectItem value="medium">Medium Risk</SelectItem>
                                    <SelectItem value="high">High Risk</SelectItem>
                                  </SelectContent>
                                </Select>
                              </Field>

                              {/* Linked hazards */}
                              {step.linkedHazards && step.linkedHazards.length > 0 && (
                                <Field label={`Linked hazards (${step.linkedHazards.length})`}>
                                  <div className="space-y-2">
                                    {step.linkedHazards.map((hazardId) => {
                                      const hazard = getHazardById(hazardId);
                                      if (!hazard) return null;
                                      return (
                                        <div
                                          key={hazardId}
                                          className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl bg-orange-500/[0.08] border border-orange-500/20"
                                        >
                                          <div className="min-w-0">
                                            <div className="text-[13px] font-medium text-white truncate">
                                              {hazard.name}
                                            </div>
                                            <div className="text-[11px] text-white/55 truncate">
                                              {hazard.category}
                                            </div>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => unlinkHazardFromStep(step.id, hazardId)}
                                            className="text-red-400 hover:text-red-300 touch-manipulation shrink-0"
                                            aria-label="Unlink hazard"
                                          >
                                            ×
                                          </button>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </Field>
                              )}

                              <Field label="Safety requirements">
                                <ChipList
                                  stepId={step.id}
                                  field="safetyRequirements"
                                  items={step.safetyRequirements}
                                  placeholder="Add safety requirement"
                                  tone="red"
                                />
                              </Field>
                              <Field label="Equipment needed">
                                <ChipList
                                  stepId={step.id}
                                  field="equipmentNeeded"
                                  items={step.equipmentNeeded}
                                  placeholder="Add equipment"
                                  tone="blue"
                                />
                              </Field>
                              <Field label="Required qualifications">
                                <ChipList
                                  stepId={step.id}
                                  field="qualifications"
                                  items={step.qualifications}
                                  placeholder="Add qualification"
                                  tone="green"
                                />
                              </Field>

                              <div className="flex flex-wrap gap-2 pt-1">
                                <SecondaryButton
                                  size="sm"
                                  onClick={() => {
                                    setSelectedStep(step.id);
                                    setShowHazardSelector(true);
                                  }}
                                >
                                  Link hazard
                                </SecondaryButton>
                                <SecondaryButton size="sm" onClick={() => duplicateStep(step)}>
                                  Duplicate
                                </SecondaryButton>
                                <DestructiveButton size="sm" onClick={() => removeStep(step.id)}>
                                  Remove
                                </DestructiveButton>
                              </div>
                            </div>
                          ) : (
                            (step.description || step.safetyRequirements.length > 0) && (
                              <div className="border-t border-white/[0.06] px-4 sm:px-5 py-3.5 space-y-2">
                                {step.description && (
                                  <p className="text-[12.5px] text-white/70 leading-relaxed">
                                    {step.description}
                                  </p>
                                )}
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-white/45">
                                  <span>{step.safetyRequirements.length} safety</span>
                                  <span>{step.equipmentNeeded.length} equipment</span>
                                  <span>{step.qualifications.length} qualifications</span>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      );
                    }}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {steps.length > 0 && (
        <div className="flex justify-end pt-1">
          <PrimaryButton onClick={onNext}>Continue to hazards</PrimaryButton>
        </div>
      )}

      {/* Hazard selector modal */}
      <HazardSelector
        open={showHazardSelector}
        onOpenChange={setShowHazardSelector}
        onHazardSelect={(hazard) => {
          if (selectedStep) linkHazardToStep(selectedStep, hazard.id);
          setSelectedStep(null);
        }}
        selectedTaskId={selectedStep}
      />
    </div>
  );
};

export default StepsManagementStep;
