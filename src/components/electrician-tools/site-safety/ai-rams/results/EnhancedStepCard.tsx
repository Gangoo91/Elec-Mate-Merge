import React, { useState, useEffect } from 'react';
import { ChevronDown, Save, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  chipBase,
  chipOff,
  chipOn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
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
 * Rich fields the method agent writes on `method_steps[]`, flattened onto the
 * step by mergeV2Steps(). None of these exist on the base MethodStep type, and
 * none of them were rendered before — the card showed a title and a paragraph
 * and discarded hold points, acceptance criteria, instruments, citations and
 * the hazards each step controls.
 */
type RichStep = MethodStep & {
  phase?: string;
  objective?: string;
  duration?: string;
  hold_points?: string[];
  quality_checks?: string[];
  acceptance_criteria?: string[] | Record<string, string>;
  named_instruments?: string[];
  named_values?: string[];
  bs7671_cites?: string[];
  safety_cites?: string[];
  ppe_required?: string[];
  competence_required?: string[];
  stop_work_triggers?: string[];
  documentation_produced?: string[];
  linked_hazard_titles?: string[];
  sign_off_required?: boolean;
};

const RISK_LEVELS = ['low', 'medium', 'high'] as const;

const Block: React.FC<{ label: string; children: React.ReactNode; wide?: boolean }> = ({
  label,
  children,
  wide,
}) => (
  <div className={cn('space-y-2', wide && 'sm:col-span-2')}>
    <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
      {label}
    </span>
    {children}
  </div>
);

const ChipList: React.FC<{ items: string[]; accent?: boolean }> = ({ items, accent }) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map((item, i) => (
      <span
        key={`${item}-${i}`}
        className={cn(
          'inline-flex items-center rounded-lg border px-2.5 py-1 text-[12px] font-medium',
          accent
            ? 'border-elec-yellow/30 bg-elec-yellow/[0.1] text-elec-yellow'
            : 'border-white/[0.14] bg-white/[0.06] text-white'
        )}
      >
        {item}
      </span>
    ))}
  </div>
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-1.5">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-white">
        <span className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-elec-yellow" />
        <span className="min-w-0 flex-1">{item}</span>
      </li>
    ))}
  </ul>
);

/** Accepts an array or an object map and returns a flat list of strings. */
const asList = (v: unknown): string[] => {
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (v && typeof v === 'object') {
    return Object.entries(v as Record<string, string>).map(([k, val]) => `${k}: ${val}`);
  }
  return [];
};

export const EnhancedStepCard: React.FC<EnhancedStepCardProps> = ({
  step,
  index,
  editable = false,
  onUpdate,
  onRemove,
}) => {
  const { isMobile } = useMobileEnhanced();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [editedStep, setEditedStep] = useState<MethodStep>(step);
  const [isSaving, setIsSaving] = useState(false);

  const s = step as RichStep;
  const riskColors = getRiskColorsByLevel(step.riskLevel || 'low');
  const duration = step.estimatedDuration || s.duration || '';

  useEffect(() => {
    setEditedStep(step);
    if (isSaving) {
      setIsEditing(false);
      setIsSaving(false);
    }
  }, [step, isSaving]);

  const handleSave = () => {
    if (!onUpdate) return;
    setIsSaving(true);
    onUpdate(step.id, editedStep);
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

  const holdPoints = asList(s.hold_points);
  const acceptance = asList(s.acceptance_criteria);
  const quality = asList(s.quality_checks);

  return (
    <>
      <StepEditSheet
        step={step}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={(stepId, updates) => onUpdate?.(stepId, updates)}
        onDelete={onRemove}
      />

      <div
        className={cn(
          'flex h-full flex-col overflow-hidden rounded-2xl border shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] transition-all',
          'bg-gradient-to-b from-white/[0.11] to-white/[0.055]',
          isEditing
            ? 'border-elec-yellow/45'
            : 'border-white/[0.14] hover:border-white/[0.22] hover:from-white/[0.14] hover:to-white/[0.07]'
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
          className="w-full cursor-pointer touch-manipulation p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/40 sm:p-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex min-w-0 items-baseline gap-2.5">
              <span className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'inline-flex h-6 shrink-0 items-center rounded-lg px-2 text-[10.5px] font-semibold uppercase tracking-[0.12em]',
                  riskColors.bg,
                  riskColors.text
                )}
              >
                {step.riskLevel || 'Low'}
              </span>
              {s.phase && (
                <span className="truncate text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                  {s.phase}
                </span>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-3">
              {duration && <span className="text-[11.5px] tabular-nums text-white">{duration}</span>}
              {editable && !isEditing && (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="min-h-11 text-[12.5px] font-medium text-white transition-colors hover:text-elec-yellow touch-manipulation"
                >
                  Edit
                </button>
              )}
              {!isEditing && (
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform duration-200',
                    isExpanded && 'rotate-180'
                  )}
                />
              )}
            </div>
          </div>

          <div className="mt-2.5">
            {isEditing ? (
              <input
                value={editedStep.title}
                onChange={(e) => setEditedStep({ ...editedStep, title: e.target.value })}
                placeholder="Step title"
                onClick={(e) => e.stopPropagation()}
                className={cn(inputCn, 'text-[16px]')}
              />
            ) : (
              <>
                <h4 className="text-[16px] font-semibold leading-snug tracking-tight text-white sm:text-[17px]">
                  {step.title || 'Untitled step'}
                </h4>
                {!isExpanded && (
                  <>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white">
                      {s.objective || step.description}
                    </p>
                    {/* Signals worth seeing without opening the step. */}
                    {(holdPoints.length > 0 || s.sign_off_required) && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {holdPoints.length > 0 && (
                          <span className="inline-flex items-center rounded-lg border border-amber-500/30 bg-amber-500/[0.1] px-2 py-0.5 text-[11px] font-medium text-amber-300">
                            {holdPoints.length} hold point{holdPoints.length === 1 ? '' : 's'}
                          </span>
                        )}
                        {s.sign_off_required && (
                          <span className="inline-flex items-center rounded-lg border border-elec-yellow/30 bg-elec-yellow/[0.1] px-2 py-0.5 text-[11px] font-medium text-elec-yellow">
                            Sign-off required
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-5 border-t border-white/[0.1] px-4 pb-5 pt-5 sm:px-5">
            {s.objective && !isEditing && (
              <Block label="Objective">
                <p className="text-[13.5px] leading-relaxed text-white">{s.objective}</p>
              </Block>
            )}

            <Block label="Method">
              {isEditing ? (
                <textarea
                  value={editedStep.description}
                  onChange={(e) => setEditedStep({ ...editedStep, description: e.target.value })}
                  className={cn(textareaCn, 'w-full min-h-[200px] resize-y')}
                  placeholder="Describe the step"
                />
              ) : (
                <p className="whitespace-pre-line text-[13.5px] leading-relaxed text-white">
                  {step.description}
                </p>
              )}
            </Block>

            {isEditing && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <span className={labelCn}>Estimated duration</span>
                  <input
                    value={editedStep.estimatedDuration ?? ''}
                    onChange={(e) =>
                      setEditedStep({ ...editedStep, estimatedDuration: e.target.value })
                    }
                    placeholder="e.g. 45 minutes"
                    className={inputCn}
                  />
                </div>
                <div>
                  <span className={labelCn}>Risk level</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {RISK_LEVELS.map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setEditedStep({ ...editedStep, riskLevel: lvl })}
                        className={cn(
                          chipBase,
                          editedStep.riskLevel === lvl ? chipOn : chipOff,
                          'px-0 capitalize'
                        )}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!isEditing && (
              <div className="grid gap-5 sm:grid-cols-2">
                {holdPoints.length > 0 && (
                  <Block label="Hold points">
                    <Bullets items={holdPoints} />
                  </Block>
                )}
                {acceptance.length > 0 && (
                  <Block label="Acceptance criteria">
                    <Bullets items={acceptance} />
                  </Block>
                )}
                {quality.length > 0 && (
                  <Block label="Quality checks">
                    <Bullets items={quality} />
                  </Block>
                )}
                {!!s.stop_work_triggers?.length && (
                  <Block label="Stop work if">
                    <Bullets items={s.stop_work_triggers} />
                  </Block>
                )}
                {asList(s.named_instruments).length > 0 && (
                  <Block label="Instruments">
                    <ChipList items={asList(s.named_instruments)} />
                  </Block>
                )}
                {asList(step.equipmentNeeded).length > 0 && (
                  <Block label="Equipment">
                    <ChipList items={asList(step.equipmentNeeded)} />
                  </Block>
                )}
                {asList(s.ppe_required).length > 0 && (
                  <Block label="PPE">
                    <ChipList items={asList(s.ppe_required)} accent />
                  </Block>
                )}
                {asList(s.competence_required ?? step.qualifications).length > 0 && (
                  <Block label="Competence">
                    <ChipList items={asList(s.competence_required ?? step.qualifications)} />
                  </Block>
                )}
                {!!s.linked_hazard_titles?.length && (
                  <Block label="Controls these hazards" wide>
                    <ChipList items={s.linked_hazard_titles} />
                  </Block>
                )}
                {asList(s.named_values).length > 0 && (
                  <Block label="Values to record" wide>
                    <ChipList items={asList(s.named_values)} accent />
                  </Block>
                )}
                {(!!s.bs7671_cites?.length || !!s.safety_cites?.length) && (
                  <Block label="References" wide>
                    <ChipList items={[...(s.bs7671_cites ?? []), ...(s.safety_cites ?? [])]} />
                  </Block>
                )}
                {!!s.documentation_produced?.length && (
                  <Block label="Produces" wide>
                    <ChipList items={s.documentation_produced} />
                  </Block>
                )}
              </div>
            )}

            {editable && isEditing && (
              <div className="flex items-center gap-2 border-t border-white/[0.1] pt-4">
                <button
                  type="button"
                  onClick={() => onRemove && confirm('Delete this step?') && onRemove(step.id)}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/[0.06] px-3.5 text-[13px] font-medium text-red-400 transition-colors hover:bg-red-500/[0.12] touch-manipulation"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditedStep(step);
                    setIsEditing(false);
                  }}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="ml-auto inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[13.5px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation sm:flex-none sm:min-w-[150px]"
                >
                  <Save className="h-4 w-4" />
                  Save step
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
