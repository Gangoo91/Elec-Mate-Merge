import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Wrench, Award, Clock, AlertTriangle, Edit3, Save, X, Trash2, Users, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRiskColorsByLevel } from '@/utils/risk-level-helpers';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import type { MethodStep } from '@/types/method-statement';
import {
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent
} from '@/components/ui/mobile-accordion';
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
  const riskColors = getRiskColorsByLevel(step.riskLevel);
  const isEvenRow = index % 2 === 0;
  const [isEditing, setIsEditing] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [editedStep, setEditedStep] = useState<MethodStep>(step);
  const [isSaving, setIsSaving] = useState(false);

  // Sync editedStep with prop changes (e.g., after save)
  useEffect(() => {
    setEditedStep(step);
    
    // If we just saved, exit edit mode now that props have updated
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

  const handleRemoveEquipment = (equipIdx: number) => {
    const newEquipment = editedStep.equipmentNeeded.filter((_, idx) => idx !== equipIdx);
    setEditedStep({ ...editedStep, equipmentNeeded: newEquipment });
  };

  const handleAddEquipment = () => {
    const newEquip = prompt('Enter equipment name:');
    if (newEquip) {
      setEditedStep({ ...editedStep, equipmentNeeded: [...editedStep.equipmentNeeded, newEquip] });
    }
  };

  const handleRemoveQualification = (qualIdx: number) => {
    const newQuals = editedStep.qualifications.filter((_, idx) => idx !== qualIdx);
    setEditedStep({ ...editedStep, qualifications: newQuals });
  };

  const handleAddQualification = () => {
    const newQual = prompt('Enter qualification:');
    if (newQual) {
      setEditedStep({ ...editedStep, qualifications: [...editedStep.qualifications, newQual] });
    }
  };

  const handleRemoveSafety = (safetyIdx: number) => {
    const newSafety = editedStep.safetyRequirements.filter((_, idx) => idx !== safetyIdx);
    setEditedStep({ ...editedStep, safetyRequirements: newSafety });
  };

  const handleAddSafety = () => {
    const newSafety = prompt('Enter safety requirement:');
    if (newSafety) {
      setEditedStep({ ...editedStep, safetyRequirements: [...editedStep.safetyRequirements, newSafety] });
    }
  };

  const handleRemovePersonnel = (personIdx: number) => {
    const newPersonnel = (editedStep.assignedPersonnel || []).filter((_, idx) => idx !== personIdx);
    setEditedStep({ ...editedStep, assignedPersonnel: newPersonnel });
  };

  const handleAddPersonnel = () => {
    const newPerson = prompt('Enter team member name:');
    if (newPerson) {
      setEditedStep({ 
        ...editedStep, 
        assignedPersonnel: [...(editedStep.assignedPersonnel || []), newPerson] 
      });
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      setShowEditSheet(true);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
      <StepEditSheet
        step={step}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={(stepId, updates) => {
          if (onUpdate) {
            onUpdate(stepId, updates);
          }
        }}
        onDelete={onRemove}
      />
      <Card
      className={cn(
        "mb-3 overflow-hidden transition-all active:scale-[0.99]",
        `border-l-4 ${riskColors.border}`,
        isEvenRow ? "bg-card" : "bg-card/60"
      )}
    >
      <MobileAccordion type="single" collapsible>
        <MobileAccordionItem value="step-details" className="border-0">
          {/* Collapsed State - Mobile Optimised */}
          <div className="flex items-center gap-3 p-4">
            {/* Step Number Badge - Color indicates risk level */}
            <div className={cn(
              "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-lg",
              riskColors.bg,
              riskColors.text
            )}>
              {step.stepNumber}
            </div>

            {/* Step Title - Full width for better readability */}
            <div className="flex-1 min-w-0 pr-2">
              {isEditing ? (
                <Input
                  value={editedStep.title}
                  onChange={(e) => setEditedStep({ ...editedStep, title: e.target.value })}
                  className="font-bold text-base"
                  placeholder="Step title"
                />
              ) : (
                <h4 className="font-bold text-elec-light text-base leading-tight line-clamp-2">
                  {step.title}
                </h4>
              )}
            </div>

            {editable && !isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEditClick}
                className="shrink-0"
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Trigger for Expansion */}
          <MobileAccordionTrigger className="px-4 py-2 bg-transparent border-0 border-t border-primary/10 hover:bg-transparent">
            <span className="text-xs text-elec-light/70">Tap for full details</span>
          </MobileAccordionTrigger>

          {/* Expanded Content */}
          <MobileAccordionContent className="px-4 pb-4">
            <div className="space-y-4 mt-3">
              {/* Description Section */}
              <div className="bg-background/50 rounded-lg p-4">
                <h5 className="text-sm font-bold text-elec-light mb-2">Description</h5>
                {isEditing ? (
                  <Textarea
                    value={editedStep.description}
                    onChange={(e) => setEditedStep({ ...editedStep, description: e.target.value })}
                    className="min-h-[100px]"
                    placeholder="Step description"
                  />
                ) : (
                  <p className="text-sm text-elec-light/90 leading-relaxed whitespace-pre-wrap">
                    {step.description}
                  </p>
                )}
              </div>

              {/* Safety Requirements - Prominent */}
              <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-lg p-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-amber-500" />
                    <h5 className="text-sm font-bold text-elec-light">⚠️ Safety Requirements</h5>
                  </div>
                  {isEditing && (
                    <Button variant="ghost" size="sm" onClick={handleAddSafety}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <ul className="space-y-2">
                  {(isEditing ? editedStep : step).safetyRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-elec-light/90">
                      <span className="text-amber-500 mt-1">•</span>
                      <span className="flex-1">{req}</span>
                      {isEditing && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveSafety(idx)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipment Needed */}
              {((isEditing ? editedStep : step).equipmentNeeded.length > 0 || isEditing) && (
                <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-blue-400" />
                      <h5 className="text-sm font-semibold text-elec-light">Equipment Needed</h5>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="sm" onClick={handleAddEquipment}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(isEditing ? editedStep : step).equipmentNeeded.map((equip, idx) => (
                      <Badge key={idx} className="bg-blue-500/10 text-blue-400 border-blue-500/30 relative group">
                        {equip}
                        {isEditing && (
                          <button 
                            onClick={() => handleRemoveEquipment(idx)}
                            className="ml-1 hover:text-red-400"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Qualifications */}
              {((isEditing ? editedStep : step).qualifications.length > 0 || isEditing) && (
                <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-400" />
                      <h5 className="text-sm font-semibold text-elec-light">Qualifications Required</h5>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="sm" onClick={handleAddQualification}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(isEditing ? editedStep : step).qualifications.map((qual, idx) => (
                      <Badge key={idx} className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                        ✓ {qual}
                        {isEditing && (
                          <button 
                            onClick={() => handleRemoveQualification(idx)}
                            className="ml-1 hover:text-red-400"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Assigned Personnel */}
              {(((isEditing ? editedStep : step).assignedPersonnel && (isEditing ? editedStep : step).assignedPersonnel!.length > 0) || isEditing) && (
                <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-400" />
                      <h5 className="text-sm font-semibold text-elec-light">Assigned Personnel</h5>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="sm" onClick={handleAddPersonnel}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {((isEditing ? editedStep : step).assignedPersonnel || []).map((person, idx) => (
                      <Badge key={idx} className="bg-green-500/10 text-green-400 border-green-500/30">
                        👤 {person}
                        {isEditing && (
                          <button 
                            onClick={() => handleRemovePersonnel(idx)}
                            className="ml-1 hover:text-red-400"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Duration & Risk Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="h-4 w-4 text-green-400" />
                    <span className="text-xs font-semibold text-green-400">Duration</span>
                  </div>
                  {isEditing ? (
                    <Select
                      value={editedStep.estimatedDuration}
                      onValueChange={(value) => setEditedStep({ ...editedStep, estimatedDuration: value })}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15 minutes">15 minutes</SelectItem>
                        <SelectItem value="30 minutes">30 minutes</SelectItem>
                        <SelectItem value="1 hour">1 hour</SelectItem>
                        <SelectItem value="2 hours">2 hours</SelectItem>
                        <SelectItem value="4 hours">4 hours</SelectItem>
                        <SelectItem value="1 day">1 day</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm font-bold text-elec-light">{step.estimatedDuration}</div>
                  )}
                </div>
                <div className={cn(
                  "rounded-lg p-3 border",
                  (isEditing ? editedStep : step).riskLevel === 'high' 
                    ? 'bg-red-500/10 border-red-500/30' 
                    : (isEditing ? editedStep : step).riskLevel === 'medium'
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-green-500/10 border-green-500/30'
                )}>
                  <div className="flex items-center gap-2 mb-1">
                    <AlertTriangle className={cn(
                      "h-4 w-4",
                      (isEditing ? editedStep : step).riskLevel === 'high' ? 'text-red-400' : 
                      (isEditing ? editedStep : step).riskLevel === 'medium' ? 'text-amber-400' : 
                      'text-green-400'
                    )} />
                    <span className={cn(
                      "text-xs font-semibold",
                      (isEditing ? editedStep : step).riskLevel === 'high' ? 'text-red-400' : 
                      (isEditing ? editedStep : step).riskLevel === 'medium' ? 'text-amber-400' : 
                      'text-green-400'
                    )}>Risk Level</span>
                  </div>
                  {isEditing ? (
                    <Select
                      value={editedStep.riskLevel}
                      onValueChange={(value: 'low' | 'medium' | 'high') => setEditedStep({ ...editedStep, riskLevel: value })}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">LOW</SelectItem>
                        <SelectItem value="medium">MEDIUM</SelectItem>
                        <SelectItem value="high">HIGH</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="text-sm font-bold text-elec-light uppercase">{step.riskLevel}</div>
                  )}
                </div>
              </div>

              {/* Critical Points / Linked Hazards */}
              {step.linkedHazards && step.linkedHazards.length > 0 && (
                <div className="bg-red-500/10 border-l-4 border-red-500 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <h5 className="text-sm font-bold text-red-400">Critical Points</h5>
                  </div>
                  <p className="text-sm text-elec-light/90">
                    This step has {step.linkedHazards.length} linked hazard(s). See Risk Assessment tab for details.
                  </p>
                </div>
              )}

              {/* Edit Actions */}
              {editable && isEditing && (
                <div className="flex gap-2 pt-4 border-t border-primary/10">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-red-500/40 hover:border-red-500 hover:bg-red-500/10 text-red-400"
                    onClick={() => onRemove?.(step.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Step
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    variant="default"
                    onClick={handleSave}
                    className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </Card>
    </>
  );
};
