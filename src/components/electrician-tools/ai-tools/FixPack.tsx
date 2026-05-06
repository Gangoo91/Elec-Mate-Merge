/**
 * FixPack — editorial fix pack display.
 *
 * Drops the EICR-code badge floods (red/amber/blue/slate), the per-difficulty
 * icon palette and the blue/amber/green inline section backgrounds. Each
 * collapsible section uses editorial eyebrow + numbered cadence. Steps,
 * materials, compliance all type-led with hairline dividers.
 */

import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

interface FixStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  safety_notes: string[];
  tools_required: string[];
  materials_needed: string[];
  regulation_reference?: string;
}

interface FixPackData {
  eicr_code: 'C1' | 'C2' | 'C3' | 'FI';
  finding: string;
  urgency: 'immediate' | 'urgent' | 'recommended';
  estimated_time: string;
  estimated_cost: string;
  difficulty: 'apprentice' | 'electrician' | 'specialist';
  safety_priority: 'critical' | 'high' | 'medium';
  steps: FixStep[];
  materials_list: Array<{
    item: string;
    quantity: string;
    estimated_cost: string;
    supplier_links?: string[];
  }>;
  verification_steps: string[];
  compliance_notes: string[];
}

interface FixPackProps {
  fixPack: FixPackData;
  userRole?: 'apprentice' | 'electrician';
  onStartWork?: () => void;
  onCompleteStep?: (stepId: string) => void;
  completedSteps?: string[];
}

const codeChipTone = (code: string) => {
  switch (code) {
    case 'C1':
      return 'text-red-300 border-red-500/40 bg-red-500/[0.08]';
    case 'C2':
      return 'text-orange-300 border-orange-500/40 bg-orange-500/[0.08]';
    case 'C3':
      return 'text-amber-300 border-amber-500/40 bg-amber-500/[0.08]';
    case 'FI':
      return 'text-blue-300 border-blue-500/40 bg-blue-500/[0.08]';
    default:
      return 'text-white/85 border-white/15';
  }
};

const urgencyChipTone = (urgency: string) => {
  switch (urgency) {
    case 'immediate':
      return 'text-red-300 border-red-500/40 bg-red-500/[0.08]';
    case 'urgent':
      return 'text-amber-300 border-amber-500/40 bg-amber-500/[0.08]';
    case 'recommended':
      return 'text-blue-300 border-blue-500/40 bg-blue-500/[0.08]';
    default:
      return 'text-white/85 border-white/15';
  }
};

const SectionTrigger = ({
  idx,
  title,
  open,
}: {
  idx: number;
  title: string;
  open: boolean;
}) => (
  <CollapsibleTrigger asChild>
    <button
      type="button"
      className="w-full flex items-center justify-between rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] hover:border-white/[0.20] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] px-5 py-4 touch-manipulation transition-colors"
    >
      <div className="flex items-baseline gap-3 min-w-0">
        <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
          {String(idx).padStart(2, '0')}
        </span>
        <span className="text-[13.5px] font-semibold text-white">{title}</span>
      </div>
      <ChevronDown
        className={cn(
          'h-4 w-4 text-white/65 shrink-0 transition-transform',
          open && 'rotate-180'
        )}
        aria-hidden
      />
    </button>
  </CollapsibleTrigger>
);

const FixPack: React.FC<FixPackProps> = ({
  fixPack,
  userRole = 'electrician',
  onStartWork,
  onCompleteStep,
  completedSteps = [],
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['steps']);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const completionPercentage = fixPack.steps?.length
    ? (completedSteps.length / fixPack.steps.length) * 100
    : 0;

  return (
    <section className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className={cn(
              'inline-flex items-center text-[10px] uppercase tracking-[0.14em] font-semibold border rounded-md px-1.5 py-0.5',
              codeChipTone(fixPack.eicr_code)
            )}
          >
            {fixPack.eicr_code}
          </span>
          <span
            className={cn(
              'inline-flex items-center text-[10px] uppercase tracking-[0.14em] font-semibold border rounded-md px-1.5 py-0.5',
              urgencyChipTone(fixPack.urgency)
            )}
          >
            {fixPack.urgency}
          </span>
          <span className="inline-flex items-center text-[10px] uppercase tracking-[0.14em] font-semibold text-white/85 border border-white/15 rounded-md px-1.5 py-0.5">
            {fixPack.difficulty}
          </span>
        </div>
        <h3 className="mt-3 text-[18px] sm:text-[20px] font-semibold tracking-tight text-white leading-tight">
          {fixPack.finding}
        </h3>
        {onStartWork && (
          <button
            type="button"
            onClick={onStartWork}
            className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 rounded-full px-4 py-2.5 min-h-[40px] touch-manipulation transition-colors"
          >
            Start work →
          </button>
        )}
      </div>

      {/* Stat strip */}
      <dl className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06]">
        <Stat label="Duration" value={fixPack.estimated_time} />
        <Stat label="Est. cost" value={fixPack.estimated_cost} accent />
        <Stat label="Safety" value={fixPack.safety_priority} />
      </dl>

      {/* Progress */}
      {completedSteps.length > 0 && (
        <div className="pt-4 border-t border-white/[0.06]">
          <div className="flex items-baseline justify-between gap-2">
            <Eyebrow>PROGRESS</Eyebrow>
            <span className="text-[10.5px] tabular-nums text-white/85">
              {completedSteps.length} / {fixPack.steps?.length || 0} steps
            </span>
          </div>
          <Progress value={completionPercentage} className="mt-2 h-1.5" />
        </div>
      )}

      {/* C1 alert */}
      {fixPack.eicr_code === 'C1' && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.05] p-4">
          <Eyebrow>DANGER · IMMEDIATE ACTION</Eyebrow>
          <p className="mt-2 text-[12.5px] leading-relaxed text-red-200">
            C1 indicates immediate danger — ensure safe isolation before proceeding.
            {userRole === 'apprentice' && ' Get supervision from a qualified electrician.'}
          </p>
        </div>
      )}

      {/* Steps */}
      <Collapsible
        open={expandedSections.includes('steps')}
        onOpenChange={() => toggleSection('steps')}
      >
        <SectionTrigger idx={1} title="Work steps" open={expandedSections.includes('steps')} />
        <CollapsibleContent className="mt-2 space-y-2">
          {fixPack.steps?.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            return (
              <div
                key={step.id}
                className={cn(
                  'rounded-xl border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4',
                  isCompleted
                    ? 'border-emerald-500/30 bg-emerald-500/[0.04]'
                    : 'border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)]'
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span
                        className={cn(
                          'text-[10.5px] tabular-nums font-semibold shrink-0 w-5',
                          isCompleted ? 'text-emerald-300' : 'text-elec-yellow'
                        )}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2 flex-wrap">
                          <h4 className="text-[14px] font-semibold tracking-tight text-white">
                            {step.title}
                          </h4>
                          <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/65 border border-white/15 rounded-md px-1.5 py-0.5 tabular-nums">
                            {step.duration}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/85">
                          {step.description}
                        </p>

                        {step.safety_notes.length > 0 && (
                          <div className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/[0.05] p-3">
                            <Eyebrow>SAFETY</Eyebrow>
                            <ul className="mt-1.5 space-y-1">
                              {step.safety_notes.map((note, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-baseline gap-2 text-[11.5px] leading-relaxed text-amber-200"
                                >
                                  <span
                                    className="w-1 h-1 rounded-full bg-amber-400 shrink-0 self-center"
                                    aria-hidden
                                  />
                                  <span>{note}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {(step.tools_required.length > 0 || step.materials_needed.length > 0) && (
                          <div className="mt-3 grid gap-2 sm:grid-cols-2">
                            {step.tools_required.length > 0 && (
                              <div className="rounded-lg border border-white/[0.10] bg-white/[0.02] p-3">
                                <Eyebrow>TOOLS</Eyebrow>
                                <ul className="mt-1.5 space-y-0.5 text-[11.5px] text-white/85">
                                  {step.tools_required.map((tool, idx) => (
                                    <li key={idx}>· {tool}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {step.materials_needed.length > 0 && (
                              <div className="rounded-lg border border-white/[0.10] bg-white/[0.02] p-3">
                                <Eyebrow>MATERIALS</Eyebrow>
                                <ul className="mt-1.5 space-y-0.5 text-[11.5px] text-white/85">
                                  {step.materials_needed.map((material, idx) => (
                                    <li key={idx}>· {material}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {step.regulation_reference && (
                          <p className="mt-3 text-[10.5px] uppercase tracking-[0.14em] font-semibold text-elec-yellow">
                            Ref · {step.regulation_reference}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {onCompleteStep && !isCompleted && (
                    <button
                      type="button"
                      onClick={() => onCompleteStep(step.id)}
                      className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/85 border border-white/15 hover:border-elec-yellow/40 hover:text-elec-yellow rounded-full px-3 py-1.5 min-h-[32px] inline-flex items-center justify-center touch-manipulation transition-colors shrink-0"
                    >
                      Done
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </CollapsibleContent>
      </Collapsible>

      {/* Materials */}
      <Collapsible
        open={expandedSections.includes('materials')}
        onOpenChange={() => toggleSection('materials')}
      >
        <SectionTrigger
          idx={2}
          title="Materials + cost breakdown"
          open={expandedSections.includes('materials')}
        />
        <CollapsibleContent className="mt-2">
          <ul className="rounded-xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] divide-y divide-white/[0.06]">
            {fixPack.materials_list.map((material, index) => (
              <li
                key={index}
                className="flex items-start justify-between gap-3 px-4 py-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white truncate">{material.item}</p>
                  <p className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
                    Qty {material.quantity}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[13px] font-semibold text-elec-yellow tabular-nums">
                    {material.estimated_cost}
                  </p>
                  {material.supplier_links && (
                    <button
                      type="button"
                      className="mt-0.5 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] font-semibold text-white/65 hover:text-elec-yellow transition-colors"
                    >
                      Find suppliers
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>

      {/* Compliance */}
      {fixPack.compliance_notes.length > 0 && (
        <Collapsible
          open={expandedSections.includes('compliance')}
          onOpenChange={() => toggleSection('compliance')}
        >
          <SectionTrigger
            idx={3}
            title="Compliance + verification"
            open={expandedSections.includes('compliance')}
          />
          <CollapsibleContent className="mt-2 space-y-3">
            <div className="rounded-xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] p-4">
              <Eyebrow>VERIFICATION STEPS</Eyebrow>
              <ol className="mt-3 divide-y divide-white/[0.06]">
                {fixPack.verification_steps.map((step, index) => (
                  <li key={index} className="py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[10.5px] tabular-nums font-semibold text-elec-yellow shrink-0 w-5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[12.5px] leading-relaxed text-white">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-xl border border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] p-4">
              <Eyebrow>COMPLIANCE NOTES</Eyebrow>
              <ul className="mt-3 space-y-2">
                {fixPack.compliance_notes.map((note, index) => (
                  <li
                    key={index}
                    className="flex items-baseline gap-2.5 text-[12.5px] leading-relaxed text-white"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-elec-yellow shrink-0 self-center"
                      aria-hidden
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}
    </section>
  );
};

const Stat = ({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <div className="text-center">
    <dd
      className={cn(
        'text-[14px] font-semibold tabular-nums capitalize',
        accent ? 'text-elec-yellow' : 'text-white'
      )}
    >
      {value}
    </dd>
    <dt className="mt-0.5 text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </dt>
  </div>
);

export default FixPack;
