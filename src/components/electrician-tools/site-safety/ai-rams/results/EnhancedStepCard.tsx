import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
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

/**
 * Method step card — editorial. No icons, no heavy chips. Step number
 * is a small mono ordinal; risk level + duration are compact pills.
 * Expanded section uses the same eyebrow + content rhythm as the rest
 * of the document.
 */
export const EnhancedStepCard: React.FC<EnhancedStepCardProps> = ({
  step,
  index,
  editable = false,
  onUpdate,
  onRemove,
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

  const duration = step.estimatedDuration || step.duration;

  return (
    <>
      <StepEditSheet
        step={step}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={(stepId, updates) => {
          if (onUpdate) onUpdate(stepId, updates);
        }}
        onDelete={onRemove}
      />

      <div
        className={cn(
          'border-l-2 sm:rounded-2xl border border-white/[0.08] transition-colors overflow-hidden',
          riskColors.border,
          'bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_13%)]'
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => !isEditing && setIsExpanded(!isExpanded)}
          onKeyDown={(e) => {
            if (isEditing) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }
          }}
          aria-expanded={isExpanded}
          className="w-full p-4 sm:p-5 flex flex-col gap-3 text-left min-h-[80px] touch-manipulation active:bg-white/[0.04] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/40"
        >
          {/* Top row: ordinal + risk pill + duration */}
          <div className="flex items-baseline justify-between w-full gap-3">
            <div className="flex items-baseline gap-3 min-w-0">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums shrink-0 text-white/45">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] shrink-0',
                  riskColors.bg,
                  riskColors.text
                )}
              >
                {step.riskLevel || 'Low'}
              </span>
              {duration && (
                <span className="text-[11px] text-white/55 tabular-nums shrink-0">{duration}</span>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {editable && !isEditing && (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="text-[12px] font-medium text-white/55 hover:text-elec-yellow transition-colors touch-manipulation"
                >
                  Edit
                </button>
              )}
              {!isEditing && (
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white/55 transition-transform duration-200',
                    isExpanded && 'rotate-180'
                  )}
                />
              )}
            </div>
          </div>

          {/* Title + preview */}
          <div className="flex-1 min-w-0 pl-1">
            {isEditing ? (
              <Input
                value={editedStep.title}
                onChange={(e) => setEditedStep({ ...editedStep, title: e.target.value })}
                placeholder="Step title"
                onClick={(e) => e.stopPropagation()}
                className="h-11 text-base touch-manipulation"
              />
            ) : (
              <>
                <h4 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white leading-snug line-clamp-2">
                  {step.title || 'Untitled step'}
                </h4>
                <p className="mt-1.5 text-[13px] text-white/65 line-clamp-2 leading-relaxed">
                  {step.description || 'No description'}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Expanded */}
        {isExpanded && (
          <div className="px-4 sm:px-5 pb-5 space-y-6 border-t border-white/[0.06] animate-slide-down">
            {/* Description */}
            <div className="pt-5">
              <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 text-left block">
                Description
              </label>
              {isEditing ? (
                <Textarea
                  value={editedStep.description}
                  onChange={(e) => setEditedStep({ ...editedStep, description: e.target.value })}
                  className="mt-2 min-h-[80px]"
                  placeholder="Describe the step"
                />
              ) : (
                <div className="mt-2 text-[13.5px] text-white/85 leading-relaxed space-y-3 text-left">
                  {(step.description || '')
                    .split(/(?=(?:^|\n)\d+\.|[A-Z]{2,}:|•|\n\n)/gm)
                    .filter((section) => section.trim())
                    .map((section, idx) => (
                      <p key={idx} className="leading-relaxed text-left">
                        {section.trim()}
                      </p>
                    ))}
                </div>
              )}
            </div>

            {/* Safety requirements */}
            {((step.safetyRequirements?.length ?? 0) > 0 || isEditing) && (
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">
                  Safety requirements
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedStep.safetyRequirements?.join('\n') || ''}
                    onChange={(e) =>
                      setEditedStep({
                        ...editedStep,
                        safetyRequirements: e.target.value.split('\n').filter(Boolean),
                      })
                    }
                    className="min-h-[80px]"
                    placeholder="One requirement per line"
                  />
                ) : (
                  <ul className="space-y-2 text-left">
                    {step.safetyRequirements?.map((req, i) => (
                      <li
                        key={i}
                        className="text-[13.5px] text-white/85 flex items-start gap-3 leading-relaxed text-left"
                      >
                        <span className="text-amber-400 mt-0.5 shrink-0">·</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Equipment */}
            {((step.equipmentNeeded?.length ?? 0) > 0 || isEditing) && (
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-3">
                  Equipment
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedStep.equipmentNeeded?.join('\n') || ''}
                    onChange={(e) =>
                      setEditedStep({
                        ...editedStep,
                        equipmentNeeded: e.target.value.split('\n').filter(Boolean),
                      })
                    }
                    className="min-h-[80px]"
                    placeholder="One item per line"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {step.equipmentNeeded?.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center h-7 px-2.5 rounded-md text-[11.5px] font-medium bg-[hsl(0_0%_10%)] border border-white/[0.10] text-white/85"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Qualifications */}
            {((step.qualifications?.length ?? 0) > 0 || isEditing) && (
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-3">
                  Qualifications
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedStep.qualifications?.join('\n') || ''}
                    onChange={(e) =>
                      setEditedStep({
                        ...editedStep,
                        qualifications: e.target.value.split('\n').filter(Boolean),
                      })
                    }
                    className="min-h-[60px]"
                    placeholder="One qualification per line"
                  />
                ) : (
                  <ul className="space-y-2 text-left">
                    {step.qualifications?.map((q, i) => (
                      <li
                        key={i}
                        className="text-[13.5px] text-white/85 leading-relaxed text-left"
                      >
                        {q}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* v2 rich detail — only when AI emitted v2 fields, read-only */}
            {!isEditing && (() => {
              const s: any = step;
              const hasV2 =
                s.phase ||
                s.objective ||
                (Array.isArray(s.linked_hazard_titles) && s.linked_hazard_titles.length) ||
                (Array.isArray(s.inputs) && s.inputs.length) ||
                (Array.isArray(s.outputs) && s.outputs.length) ||
                (Array.isArray(s.named_instruments) && s.named_instruments.length) ||
                (Array.isArray(s.named_values) && s.named_values.length) ||
                (Array.isArray(s.hold_points) && s.hold_points.length) ||
                (Array.isArray(s.witness_points) && s.witness_points.length) ||
                (Array.isArray(s.quality_checks) && s.quality_checks.length) ||
                (Array.isArray(s.acceptance_criteria) && s.acceptance_criteria.length) ||
                (Array.isArray(s.bs7671_cites) && s.bs7671_cites.length) ||
                (Array.isArray(s.safety_cites) && s.safety_cites.length) ||
                (Array.isArray(s.ppe_required) && s.ppe_required.length) ||
                (Array.isArray(s.stop_work_triggers) && s.stop_work_triggers.length);
              if (!hasV2) return null;

              return (
                <div className="space-y-5">
                  {(s.phase || s.objective) && (
                    <div className="grid sm:grid-cols-2 gap-5">
                      {s.phase && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Phase
                          </div>
                          <p className="text-[13px] text-white/85">{s.phase}</p>
                        </div>
                      )}
                      {s.objective && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Objective
                          </div>
                          <p className="text-[13px] text-white/85 leading-relaxed">{s.objective}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {Array.isArray(s.named_instruments) && s.named_instruments.length > 0 && (
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                        Named instruments
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {s.named_instruments.map((m: string, i: number) => (
                          <span
                            key={i}
                            className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-medium bg-white/[0.05] border border-white/[0.10] text-white/85"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.isArray(s.named_values) && s.named_values.length > 0 && (
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-3">
                        Target values
                      </div>
                      <ul className="divide-y divide-white/[0.06] border border-white/[0.08] rounded-xl overflow-hidden">
                        {s.named_values.map((nv: any, i: number) => (
                          <li key={i} className="px-3 py-2.5 text-[12.5px]">
                            <div className="flex items-baseline justify-between gap-3">
                              <span className="font-medium text-white">{nv.parameter}</span>
                              <span className="tabular-nums text-elec-yellow font-semibold">
                                {nv.value}
                              </span>
                            </div>
                            {nv.method && (
                              <p className="mt-1 text-white/65 leading-relaxed">{nv.method}</p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {Array.isArray(s.acceptance_criteria) && s.acceptance_criteria.length > 0 && (
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-400/85 mb-2">
                        Acceptance criteria
                      </div>
                      <ul className="space-y-1.5 text-[13px] text-white/85">
                        {s.acceptance_criteria.map((c: string, i: number) => (
                          <li key={i} className="leading-relaxed">
                            · {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {((Array.isArray(s.inputs) && s.inputs.length > 0) ||
                    (Array.isArray(s.outputs) && s.outputs.length > 0)) && (
                    <div className="grid sm:grid-cols-2 gap-5">
                      {Array.isArray(s.inputs) && s.inputs.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Inputs
                          </div>
                          <ul className="space-y-1.5 text-[12.5px] text-white/80">
                            {s.inputs.map((x: string, i: number) => (
                              <li key={i} className="leading-relaxed">
                                · {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(s.outputs) && s.outputs.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Outputs
                          </div>
                          <ul className="space-y-1.5 text-[12.5px] text-white/80">
                            {s.outputs.map((x: string, i: number) => (
                              <li key={i} className="leading-relaxed">
                                · {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {((Array.isArray(s.hold_points) && s.hold_points.length > 0) ||
                    (Array.isArray(s.witness_points) && s.witness_points.length > 0) ||
                    (Array.isArray(s.quality_checks) && s.quality_checks.length > 0)) && (
                    <div className="grid sm:grid-cols-3 gap-5">
                      {Array.isArray(s.hold_points) && s.hold_points.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Hold points
                          </div>
                          <ul className="space-y-1.5 text-[12.5px] text-white/80">
                            {s.hold_points.map((x: string, i: number) => (
                              <li key={i} className="leading-relaxed">
                                · {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(s.witness_points) && s.witness_points.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Witness points
                          </div>
                          <ul className="space-y-1.5 text-[12.5px] text-white/80">
                            {s.witness_points.map((x: string, i: number) => (
                              <li key={i} className="leading-relaxed">
                                · {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(s.quality_checks) && s.quality_checks.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Quality checks
                          </div>
                          <ul className="space-y-1.5 text-[12.5px] text-white/80">
                            {s.quality_checks.map((x: string, i: number) => (
                              <li key={i} className="leading-relaxed">
                                · {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {((Array.isArray(s.bs7671_cites) && s.bs7671_cites.length > 0) ||
                    (Array.isArray(s.safety_cites) && s.safety_cites.length > 0) ||
                    (Array.isArray(s.linked_hazard_titles) && s.linked_hazard_titles.length > 0)) && (
                    <div className="space-y-3">
                      {Array.isArray(s.linked_hazard_titles) && s.linked_hazard_titles.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Linked hazards
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {s.linked_hazard_titles.map((h: string, i: number) => (
                              <span
                                key={i}
                                className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-medium bg-red-500/10 border border-red-500/30 text-red-300"
                              >
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {Array.isArray(s.bs7671_cites) && s.bs7671_cites.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            BS 7671
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {s.bs7671_cites.map((c: string, i: number) => (
                              <span
                                key={i}
                                className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-medium tabular-nums bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {Array.isArray(s.safety_cites) && s.safety_cites.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            HSE / CDM
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {s.safety_cites.map((c: string, i: number) => (
                              <span
                                key={i}
                                className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-medium tabular-nums bg-white/[0.05] border border-white/[0.10] text-white/80"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {Array.isArray(s.ppe_required) && s.ppe_required.length > 0 && (
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                        PPE for this step
                      </div>
                      <ul className="space-y-1.5 text-[12.5px] text-white/80">
                        {s.ppe_required.map((p: string, i: number) => (
                          <li key={i} className="leading-relaxed">
                            · {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {Array.isArray(s.stop_work_triggers) && s.stop_work_triggers.length > 0 && (
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400 mb-2">
                        Stop work
                      </div>
                      <ul className="space-y-1.5 text-[12.5px] text-red-300">
                        {s.stop_work_triggers.map((x: string, i: number) => (
                          <li key={i} className="leading-relaxed">
                            · {x}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Duration + Risk level */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Duration
                </div>
                {isEditing ? (
                  <Input
                    value={editedStep.estimatedDuration || ''}
                    onChange={(e) =>
                      setEditedStep({ ...editedStep, estimatedDuration: e.target.value })
                    }
                    className="mt-2"
                    placeholder="e.g. 30 mins"
                  />
                ) : (
                  <p className="mt-2 text-[14px] font-medium text-white tabular-nums">
                    {duration || 'Not specified'}
                  </p>
                )}
              </div>
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Risk level
                </div>
                {isEditing ? (
                  <Select
                    value={editedStep.riskLevel || 'low'}
                    onValueChange={(v) =>
                      setEditedStep({ ...editedStep, riskLevel: v as MethodStep['riskLevel'] })
                    }
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className={cn('mt-2 text-[14px] font-medium capitalize', riskColors.text)}>
                    {step.riskLevel || 'Low'}
                  </p>
                )}
              </div>
            </div>

            {/* Edit actions */}
            {editable && isEditing && (
              <div className="flex gap-2 pt-4 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 inline-flex items-center justify-center h-10 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-red-500/30 text-red-400 hover:border-red-500/50 transition-colors touch-manipulation"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 inline-flex items-center justify-center h-10 rounded-xl text-[13px] font-medium bg-white/[0.05] border border-white/[0.10] text-white/80 hover:border-white/20 transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 inline-flex items-center justify-center h-10 rounded-xl text-[13px] font-semibold bg-elec-yellow text-black hover:bg-elec-yellow/90 transition-colors touch-manipulation"
                >
                  Save
                </button>
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
