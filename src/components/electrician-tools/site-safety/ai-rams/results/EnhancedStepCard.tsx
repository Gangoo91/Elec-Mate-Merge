import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Wrench, Award, Clock, AlertTriangle, Edit3, Save, X, Trash2, Users, Plus, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRiskColorsByLevel } from '@/utils/risk-level-helpers';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import type { MethodStep } from '@/types/method-statement';
import { StepEditSheet } from './StepEditSheet';

interface EnhancedStepCardProps {
  step: MethodStep;
  index: number;
  editable?: boolean;
  onUpdate?: (stepId: string, updates: Partial<MethodStep>) => void;
  onRemove?: (stepId: string) => void;
}

export const EnhancedStepCard: React.FC<EnhancedStepCardProps> = ({
  step,
  index,
  editable = false,
  onUpdate,
  onRemove
}) => {
  const { isMobile } = useMobileEnhanced();
  const riskColors = getRiskColorsByLevel(step.riskLevel || 'low');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [editedStep, setEditedStep] = useState<MethodStep>(step);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedStep(step);
    if (isSaving) {
      setIsEditing(false);
      setIsSaving(false);
    }
  }, [step, isSaving]);

  const handleSave = () => {
    if (onUpdate) {
      setIsSaving(true);
      onUpdate(step.id, editedStep);
    }
  };

  const handleCancel = () => {
    setEditedStep(step);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onRemove && confirm('Delete this step?')) {
      onRemove(step.id);
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      setShowEditSheet(true);
    } else {
      setIsEditing(true);
      setIsExpanded(true);
    }
  };

  const addEquipment = () => {
    setEditedStep({
      ...editedStep,
      equipment: [...(editedStep.equipment || []), '']
    });
  };

  const updateEquipment = (idx: number, value: string) => {
    const updated = [...(editedStep.equipment || [])];
    updated[idx] = value;
    setEditedStep({ ...editedStep, equipment: updated });
  };

  const removeEquipment = (idx: number) => {
    const updated = (editedStep.equipment || []).filter((_, i) => i !== idx);
    setEditedStep({ ...editedStep, equipment: updated });
  };

  return (
    <>
      <StepEditSheet
        step={step}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={(stepId, updates) => { if (onUpdate) onUpdate(stepId, updates); }}
        onDelete={onRemove}
      />

      <div
        className={cn(
          'border-l-4 rounded-xl border border-white/5 transition-all duration-200 overflow-hidden',
          riskColors.border,
          isExpanded ? 'bg-white/[0.02]' : 'bg-transparent hover:bg-white/[0.02]'
        )}
      >
        <button
          onClick={() => !isEditing && setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-start gap-4 text-left"
        >
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0',
            riskColors.bg, riskColors.text
          )}>
            {index + 1}
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={editedStep.title}
                onChange={(e) => setEditedStep({ ...editedStep, title: e.target.value })}
                placeholder="Step title"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <h4 className="font-semibold text-white line-clamp-1">{step.title || 'Untitled Step'}</h4>
                <p className="text-sm text-white/50 line-clamp-1 mt-1">
                  {step.description || 'No description'}
                </p>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {step.duration && (
              <Badge variant="outline" className="text-xs border-white/10 text-white/60">
                <Clock className="h-3 w-3 mr-1" />{step.duration}
              </Badge>
            )}
            {editable && !isEditing && (
              <Button variant="ghost" size="sm" onClick={handleEditClick} className="h-8 w-8 p-0">
                <Edit3 className="h-4 w-4 text-white/50" />
              </Button>
            )}
            {!isEditing && (
              <ChevronDown className={cn('h-5 w-5 text-white/30 transition-transform', isExpanded && 'rotate-180')} />
            )}
          </div>
        </button>
        {isExpanded && (
          <div className="px-4 pb-4 space-y-4 border-t border-white/5 animate-slide-down">
            <div className="pt-4">
              <label className="text-xs font-medium text-white/50 uppercase tracking-wide">Description</label>
              {isEditing ? (
                <Textarea
                  value={editedStep.description}
                  onChange={(e) => setEditedStep({ ...editedStep, description: e.target.value })}
                  className="mt-2 min-h-[80px]"
                  placeholder="Describe the step"
                />
              ) : (
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{step.description}</p>
              )}
            </div>

            {(step.safetyRequirements?.length > 0 || isEditing) && (
              <div className="p-4 rounded-xl bg-amber-500/5 border-l-4 border-amber-500">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-bold text-amber-500">Safety Requirements</span>
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedStep.safetyRequirements?.join('\n') || ''}
                    onChange={(e) => setEditedStep({ ...editedStep, safetyRequirements: e.target.value.split('\n').filter(Boolean) })}
                    className="min-h-[80px]"
                    placeholder="One requirement per line"
                  />
                ) : (
                  <ul className="space-y-1">
                    {step.safetyRequirements?.map((req, i) => (
                      <li key={i} className="text-sm text-white/80 flex items-start gap-2">
                        <span className="text-amber-500 mt-1">•</span>{req}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {(step.equipment?.length > 0 || isEditing) && (
              <div>
                <label className="text-xs font-medium text-white/50 uppercase tracking-wide">Equipment</label>
                {isEditing ? (
                  <div className="mt-2 space-y-2">
                    {(props => (editedStep.equipment || []).map((item, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={item}
                          onChange={(e) => updateEquipment(idx, e.target.value)}
                          placeholder="Equipment item"
                        />
                        <Button variant="ghost" size="sm" onClick={() => removeEquipment(idx)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )))()}
                    <Button variant="outline" size="sm" onClick={addEquipment}>
                      <Plus className="h-4 w-4 mr-1" />Add
                  </Button>
                  </div>
                ) : (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {step.equipment?.map((item, i) => (
                      <Badge key={i} variant="outline" className="border-white/10 text-white/70">
                        <Wrench className="h-3 w-3 mr-1" />{item}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <label className="text-xs font-medium text-white/50">Duration</label>
                {isEditing ? (
                  <Input
                    value={editedStep.duration || ''}
                    onChange={(e) => setEditedStep({ ...editedStep, duration: e.target.value })}
                    className="mt-2"
                    placeholder="e.g. 30 mins"
                  />
                ) : (
                  <p className="mt-2 text-sm font-medium text-white">{step.duration || 'Not specified'}</p>
                )}
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <label className="text-xs font-medium text-white/50">Risk Level</label>
                {isEditing ? (
                  <Select
                    value={editedStep.riskLevel || 'low'}
                    onValueChange={(v) => setEditedStep({ ...editedStep, riskLevel: v as any })}
                  >
                    <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={cn('mt-2', riskColors.bg, riskColors.text)}>{step.riskLevel || 'Low'}</Badge>
                )}
              </div>
            </div>

            {(step.personnelRequired || isEditing) && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <Users className="h-5 w-5 text-white/50" />
                {isEditing ? (
                  <Input
                    type="number"
                    value={editedStep.personnelRequired || 1}
                    onChange={(e) => setEditedStep({ ...editedStep, personnelRequired: parseInt(e.target.value) || 1 })}
                    className="w-20"
                    min={1}
                  />
                ) : (
                  <span className="text-sm text-white/70">{step.personnelRequired || 1} person(s) required</span>
                )}
              </div>
            )}

            {editable && isEditing && (
              <div className="flex gap-2 pt-4 border-t border-white/5">
                <Button variant="outline" className="flex-1 border-red-500/40 text-red-400 hover:bg-red-500/10" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />Delete
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />Cancel
                </Button>
                <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />Save
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 1000px; }
        }
        .animate-slide-down { animation: slideDown 0.2s ease-out; }
      `}</style>
    </>
  );
};
