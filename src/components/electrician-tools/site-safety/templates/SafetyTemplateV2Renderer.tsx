import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface SafetyTemplateV2RendererProps {
  v2: any;
}

const RISK_TONE = (rating: number) => {
  if (rating <= 4) return 'text-emerald-400';
  if (rating <= 9) return 'text-elec-yellow';
  if (rating <= 15) return 'text-amber-400';
  return 'text-red-400';
};

const RISK_LABEL = (rating: number) => {
  if (rating <= 4) return 'Low';
  if (rating <= 9) return 'Medium';
  if (rating <= 15) return 'High';
  return 'Critical';
};

interface EyebrowRowProps {
  label: string;
  value?: string;
}

const EyebrowRow: React.FC<EyebrowRowProps> = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="py-3 flex items-baseline gap-4">
      <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 w-32 shrink-0">
        {label}
      </span>
      <span className="text-[13.5px] text-white/85 flex-1 leading-relaxed">{value}</span>
    </div>
  );
};

interface NumberedListProps {
  items?: string[];
  tone?: string;
}

const NumberedList: React.FC<NumberedListProps> = ({ items, tone = 'text-white/55' }) => {
  if (!items || items.length === 0) return null;
  return (
    <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
      {items.map((item, idx) => (
        <li key={idx} className="py-3 flex items-baseline gap-3">
          <span
            className={cn(
              'text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums w-8 shrink-0',
              tone
            )}
          >
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className="text-[13.5px] text-white/85 leading-relaxed flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
};

interface HazardCardProps {
  hazard: any;
  index: number;
}

const HazardCard: React.FC<HazardCardProps> = ({ hazard, index }) => {
  const [open, setOpen] = useState(index < 2);
  const rating = hazard.risk_rating ?? (hazard.likelihood ?? 3) * (hazard.severity ?? 3);
  const residual =
    hazard.residual_risk_rating ??
    (hazard.residual_likelihood ?? 1) * (hazard.residual_severity ?? 1);
  const tone = RISK_TONE(rating);
  const label = RISK_LABEL(rating);
  const num = hazard.hazard_number ?? index + 1;

  return (
    <div
      className={cn(
        'border-l-2 sm:rounded-2xl border border-white/[0.08] transition-colors overflow-hidden',
        tone.replace('text-', 'border-l-'),
        open ? 'bg-[hsl(0_0%_10%)]' : 'bg-[hsl(0_0%_9%)] hover:bg-[hsl(0_0%_10%)]'
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-4 sm:p-5 flex flex-col gap-3 text-left touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/40"
      >
        <div className="flex items-baseline justify-between w-full gap-3">
          <div className="flex items-baseline gap-3 min-w-0">
            <span className={cn('text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums shrink-0', tone)}>
              H{String(num).padStart(2, '0')}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] tabular-nums shrink-0 bg-white/[0.05]',
                tone
              )}
            >
              {label} · {rating}
            </span>
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-white/55 transition-transform duration-200 shrink-0',
              open && 'rotate-180'
            )}
          />
        </div>
        <h4 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white leading-snug">
          {hazard.hazard}
        </h4>
      </button>

      {open && (
        <div className="px-4 sm:px-5 pb-5 space-y-6 border-t border-white/[0.06]">
          {/* Rationale */}
          {hazard.rationale && (
            <div className="pt-5">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                Why this matters
              </div>
              <p className="text-[13.5px] text-white/85 leading-relaxed">{hazard.rationale}</p>
            </div>
          )}

          {/* Who at risk */}
          {Array.isArray(hazard.who_at_risk) && hazard.who_at_risk.length > 0 && (
            <div>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                Who's at risk
              </div>
              <div className="flex flex-wrap gap-2">
                {hazard.who_at_risk.map((p: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-medium bg-[hsl(0_0%_13%)] border border-white/[0.08] text-white/85"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          {Array.isArray(hazard.controls) && hazard.controls.length > 0 && (
            <div>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-400 mb-3">
                Control measures
              </div>
              <ol className="space-y-3">
                {hazard.controls.map((c: any, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-amber-400/80 w-8 shrink-0 pt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        {c.tier && (
                          <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-white/45">
                            {c.tier}
                          </span>
                        )}
                        <p className="text-[14px] font-semibold text-white">{c.control}</p>
                      </div>
                      {c.detail && (
                        <p className="text-[13px] text-white/75 leading-relaxed">{c.detail}</p>
                      )}
                      {c.responsible_role && (
                        <p className="text-[11px] text-white/55">{c.responsible_role}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Residual risk */}
          <div className="flex items-baseline justify-between gap-3 pt-3 border-t border-white/[0.06]">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Residual after controls
            </span>
            <span className="text-[16px] font-semibold tabular-nums text-emerald-400">
              {residual}
            </span>
          </div>

          {/* Cites + competence + PPE in two-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.isArray(hazard.bs7671_cites) && hazard.bs7671_cites.length > 0 && (
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                  BS 7671
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {hazard.bs7671_cites.map((r: string, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-medium tabular-nums bg-[hsl(0_0%_13%)] border border-elec-yellow/30 text-elec-yellow"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {Array.isArray(hazard.safety_cites) && hazard.safety_cites.length > 0 && (
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                  HSE
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {hazard.safety_cites.map((r: string, i: number) => (
                    <span
                      key={i}
                      className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-medium tabular-nums bg-[hsl(0_0%_13%)] border border-white/[0.10] text-white/85"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {Array.isArray(hazard.ppe_required) && hazard.ppe_required.length > 0 && (
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                  PPE required
                </div>
                <ul className="space-y-1 text-[12.5px] text-white/85">
                  {hazard.ppe_required.map((p: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-white/45 shrink-0 mt-0.5">·</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {Array.isArray(hazard.competence_required) &&
              hazard.competence_required.length > 0 && (
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                    Competence
                  </div>
                  <ul className="space-y-1 text-[12.5px] text-white/85">
                    {hazard.competence_required.map((p: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-white/45 shrink-0 mt-0.5">·</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          {/* Evidence / monitoring / stop-work — three columns */}
          {(Array.isArray(hazard.evidence_required) ||
            Array.isArray(hazard.monitoring_checks) ||
            Array.isArray(hazard.stop_work_triggers)) && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3 border-t border-white/[0.06]">
              {Array.isArray(hazard.evidence_required) && hazard.evidence_required.length > 0 && (
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                    Evidence
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/75">
                    {hazard.evidence_required.map((p: string, i: number) => (
                      <li key={i}>· {p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {Array.isArray(hazard.monitoring_checks) && hazard.monitoring_checks.length > 0 && (
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                    Monitoring
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/75">
                    {hazard.monitoring_checks.map((p: string, i: number) => (
                      <li key={i}>· {p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {Array.isArray(hazard.stop_work_triggers) && hazard.stop_work_triggers.length > 0 && (
                <div>
                  <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400 mb-2">
                    Stop-work
                  </div>
                  <ul className="space-y-1 text-[12px] text-white/85">
                    {hazard.stop_work_triggers.map((p: string, i: number) => (
                      <li key={i}>· {p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface MethodStepCardProps {
  step: any;
  index: number;
}

const MethodStepCard: React.FC<MethodStepCardProps> = ({ step, index }) => {
  const [open, setOpen] = useState(index < 2);
  const num = step.step_number ?? index + 1;
  const tone =
    step.risk_level === 'high'
      ? 'text-red-400'
      : step.risk_level === 'medium'
        ? 'text-amber-400'
        : 'text-emerald-400';

  return (
    <div
      className={cn(
        'border-l-2 sm:rounded-2xl border border-white/[0.08] transition-colors overflow-hidden',
        tone.replace('text-', 'border-l-'),
        open ? 'bg-[hsl(0_0%_10%)]' : 'bg-[hsl(0_0%_9%)] hover:bg-[hsl(0_0%_10%)]'
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-4 sm:p-5 flex flex-col gap-2 text-left touch-manipulation"
      >
        <div className="flex items-baseline justify-between w-full gap-3">
          <div className="flex items-baseline gap-3 min-w-0">
            <span className={cn('text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums shrink-0', tone)}>
              {String(num).padStart(2, '0')}
            </span>
            {step.estimated_duration && (
              <span className="text-[11px] text-white/55 tabular-nums shrink-0">
                {step.estimated_duration}
              </span>
            )}
            {step.risk_level && (
              <span className={cn('text-[10.5px] uppercase tracking-[0.18em] font-semibold shrink-0', tone)}>
                {step.risk_level}
              </span>
            )}
          </div>
          <ChevronDown
            className={cn(
              'h-4 w-4 text-white/55 transition-transform duration-200 shrink-0',
              open && 'rotate-180'
            )}
          />
        </div>
        <h4 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white leading-snug">
          {step.title}
        </h4>
      </button>

      {open && (
        <div className="px-4 sm:px-5 pb-5 space-y-5 border-t border-white/[0.06]">
          {step.description && (
            <div className="pt-5">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                How
              </div>
              <p className="text-[13.5px] text-white/85 leading-relaxed whitespace-pre-wrap">
                {step.description}
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.isArray(step.safety_requirements) && step.safety_requirements.length > 0 && (
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-400 mb-2">
                  Safety requirements
                </div>
                <ul className="space-y-1 text-[12.5px] text-white/85">
                  {step.safety_requirements.map((p: string, i: number) => (
                    <li key={i}>· {p}</li>
                  ))}
                </ul>
              </div>
            )}
            {Array.isArray(step.equipment_needed) && step.equipment_needed.length > 0 && (
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                  Equipment
                </div>
                <ul className="space-y-1 text-[12.5px] text-white/85">
                  {step.equipment_needed.map((p: string, i: number) => (
                    <li key={i}>· {p}</li>
                  ))}
                </ul>
              </div>
            )}
            {Array.isArray(step.qualifications) && step.qualifications.length > 0 && (
              <div>
                <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                  Qualifications
                </div>
                <ul className="space-y-1 text-[12.5px] text-white/85">
                  {step.qualifications.map((p: string, i: number) => (
                    <li key={i}>· {p}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Renders the v2 (full-depth AI-regenerated) safety template content.
 * Used by SafetyTemplateViewer when version === 2.
 */
export const SafetyTemplateV2Renderer: React.FC<SafetyTemplateV2RendererProps> = ({ v2 }) => {
  if (!v2) return null;

  const hazards: any[] = Array.isArray(v2.hazards) ? v2.hazards : [];
  const methodSteps: any[] = Array.isArray(v2.method_steps) ? v2.method_steps : [];

  return (
    <div className="space-y-8">
      {/* Executive summary */}
      {v2.executive_summary && (
        <section className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            Executive summary
          </div>
          <p className="text-[14px] text-white/90 leading-relaxed">{v2.executive_summary}</p>
          {v2.rationale && (
            <p className="text-[12.5px] text-white/65 leading-relaxed">{v2.rationale}</p>
          )}
        </section>
      )}

      {/* Scope */}
      {v2.scope && (
        <section className="space-y-2">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Scope
          </div>
          <p className="text-[13.5px] text-white/85 leading-relaxed">{v2.scope}</p>
        </section>
      )}

      {/* Preparation */}
      {v2.preparation && (
        <section className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Preparation
          </div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {Array.isArray(v2.preparation.competency_required) &&
              v2.preparation.competency_required.length > 0 && (
                <EyebrowRow
                  label="Competency"
                  value={v2.preparation.competency_required.join(' · ')}
                />
              )}
            {Array.isArray(v2.preparation.permits_required) &&
              v2.preparation.permits_required.length > 0 && (
                <EyebrowRow
                  label="Permits"
                  value={v2.preparation.permits_required.join(' · ')}
                />
              )}
            {Array.isArray(v2.preparation.documentation_required) &&
              v2.preparation.documentation_required.length > 0 && (
                <EyebrowRow
                  label="Documentation"
                  value={v2.preparation.documentation_required.join(' · ')}
                />
              )}
            {Array.isArray(v2.preparation.site_access) &&
              v2.preparation.site_access.length > 0 && (
                <EyebrowRow label="Site access" value={v2.preparation.site_access.join(' · ')} />
              )}
            {Array.isArray(v2.preparation.ppe_baseline) &&
              v2.preparation.ppe_baseline.length > 0 && (
                <EyebrowRow label="PPE baseline" value={v2.preparation.ppe_baseline.join(' · ')} />
              )}
          </div>
        </section>
      )}

      {/* Hazards */}
      {hazards.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Hazard register
              </div>
              <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
                {hazards.length} hazards · controls · cites
              </h3>
            </div>
          </div>
          <div className="space-y-3">
            {hazards.map((h, i) => (
              <HazardCard key={h.id ?? i} hazard={h} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Method steps */}
      {methodSteps.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-3">
            <div className="space-y-1">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Method statement
              </div>
              <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
                {methodSteps.length} steps
              </h3>
            </div>
          </div>
          <div className="space-y-3">
            {methodSteps.map((s, i) => (
              <MethodStepCard key={s.id ?? i} step={s} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Tools / Materials / Tips / Mistakes */}
      {(Array.isArray(v2.tools_required) ||
        Array.isArray(v2.materials_required) ||
        Array.isArray(v2.practical_tips) ||
        Array.isArray(v2.common_mistakes)) && (
        <section className="space-y-5">
          {Array.isArray(v2.tools_required) && v2.tools_required.length > 0 && (
            <div className="space-y-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Tools required
              </div>
              <div className="flex flex-wrap gap-2">
                {v2.tools_required.map((t: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center h-7 px-2.5 rounded-md text-[11.5px] font-medium bg-[hsl(0_0%_10%)] border border-white/[0.10] text-white/85"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          {Array.isArray(v2.materials_required) && v2.materials_required.length > 0 && (
            <div className="space-y-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Materials required
              </div>
              <NumberedList items={v2.materials_required} />
            </div>
          )}
          {Array.isArray(v2.practical_tips) && v2.practical_tips.length > 0 && (
            <div className="space-y-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Practical tips
              </div>
              <NumberedList items={v2.practical_tips} tone="text-emerald-400" />
            </div>
          )}
          {Array.isArray(v2.common_mistakes) && v2.common_mistakes.length > 0 && (
            <div className="space-y-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-amber-400">
                Common mistakes
              </div>
              <NumberedList items={v2.common_mistakes} tone="text-amber-400" />
            </div>
          )}
        </section>
      )}

      {/* Site logistics */}
      {v2.site_logistics && (
        <section className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Site logistics
          </div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            <EyebrowRow label="Vehicle access" value={v2.site_logistics.vehicle_access} />
            <EyebrowRow label="Parking" value={v2.site_logistics.parking} />
            <EyebrowRow label="Material storage" value={v2.site_logistics.material_storage} />
            <EyebrowRow label="Waste management" value={v2.site_logistics.waste_management} />
            <EyebrowRow label="Welfare" value={v2.site_logistics.welfare_facilities} />
            <EyebrowRow label="Restrictions" value={v2.site_logistics.site_restrictions} />
          </div>
        </section>
      )}

      {/* PPE grid */}
      {Array.isArray(v2.ppe_grid) && v2.ppe_grid.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            PPE summary
          </div>
          <ul className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {v2.ppe_grid.map((p: any, i: number) => (
              <li key={i} className="py-3 flex items-baseline gap-3">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow w-8 shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-white">{p.name}</p>
                  {p.specification && (
                    <p className="mt-0.5 text-[12px] text-white/55">{p.specification}</p>
                  )}
                  {p.purpose && <p className="mt-0.5 text-[12px] text-white/65">{p.purpose}</p>}
                </div>
                {p.required && (
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-elec-yellow shrink-0">
                    Mandatory
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Emergency procedures */}
      {Array.isArray(v2.emergency_procedures) && v2.emergency_procedures.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400">
            Emergency procedures
          </div>
          <NumberedList items={v2.emergency_procedures} tone="text-red-400" />
        </section>
      )}

      {/* Competence requirements */}
      {Array.isArray(v2.competence_requirements) && v2.competence_requirements.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Competence requirements
          </div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {v2.competence_requirements.map((kv: any, i: number) => (
              <EyebrowRow key={i} label={kv.key} value={kv.value} />
            ))}
          </div>
        </section>
      )}

      {/* Compliance */}
      {(Array.isArray(v2.compliance_regulations) || Array.isArray(v2.compliance_warnings)) && (
        <section className="space-y-5">
          {Array.isArray(v2.compliance_regulations) && v2.compliance_regulations.length > 0 && (
            <div className="space-y-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Regulations referenced
              </div>
              <div className="flex flex-wrap gap-2">
                {v2.compliance_regulations.map((r: string, i: number) => (
                  <span
                    key={i}
                    className="inline-flex items-center h-7 px-2.5 rounded-md text-[11.5px] font-medium tabular-nums bg-[hsl(0_0%_10%)] border border-white/[0.10] text-white/85"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          )}
          {Array.isArray(v2.compliance_warnings) && v2.compliance_warnings.length > 0 && (
            <div className="space-y-3">
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-red-400">
                Compliance warnings
              </div>
              <NumberedList items={v2.compliance_warnings} tone="text-red-400" />
            </div>
          )}
        </section>
      )}

      {/* References */}
      {Array.isArray(v2.regulatory_references) && v2.regulatory_references.length > 0 && (
        <section className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Regulatory references
          </div>
          <ul className="space-y-2">
            {v2.regulatory_references.map((r: string, i: number) => (
              <li key={i} className="text-[13px] text-white/85 leading-relaxed">
                · {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Signature block */}
      {v2.signature_block && Array.isArray(v2.signature_block.entries) && (
        <section className="space-y-3">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
            Sign-off
          </div>
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {v2.signature_block.entries.map((e: any, i: number) => (
              <EyebrowRow key={i} label={e.role} value="Awaiting signature" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
