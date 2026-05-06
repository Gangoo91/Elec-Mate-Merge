/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Editorial Health & Safety Results
 *
 * Mirrors the editorial pattern from installation/maintenance results,
 * but the unit of work is a HAZARD instead of a step. Each hazard row
 * shows pre-control + residual risk score, click-to-expand reveals the
 * full control hierarchy, persons-at-risk, evidence, stop-work triggers
 * and cited references — all separated by gold gradient stripes.
 */

import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  RefreshCcw,
  Pencil,
  Shield,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import {
  HealthSafetyInputs,
  HEALTH_SAFETY_WORK_OPTIONS,
} from '@/types/health-safety-inputs';

interface EditorialHealthSafetyResultsProps {
  inputs: HealthSafetyInputs;
  outputData: any;
  jobId?: string | null;
  onNewMethod: () => void;
  onEditAndRegenerate?: () => void;
}

const RISK_BAND = (score: number) => {
  if (score >= 16) return { label: 'Unacceptable', dot: 'bg-red-500', text: 'text-red-300' };
  if (score >= 10) return { label: 'High', dot: 'bg-red-400', text: 'text-red-300' };
  if (score >= 5) return { label: 'Medium', dot: 'bg-amber-400', text: 'text-amber-300' };
  return { label: 'Low', dot: 'bg-emerald-400', text: 'text-emerald-300' };
};

const TIER_TONE: Record<string, { dot: string; text: string; label: string }> = {
  eliminate: { dot: 'bg-emerald-400', text: 'text-emerald-300', label: 'Eliminate' },
  substitute: { dot: 'bg-emerald-300', text: 'text-emerald-300', label: 'Substitute' },
  engineer: { dot: 'bg-blue-400', text: 'text-blue-300', label: 'Engineer' },
  admin: { dot: 'bg-amber-400', text: 'text-amber-300', label: 'Admin' },
  ppe: { dot: 'bg-yellow-400', text: 'text-yellow-300', label: 'PPE' },
};

function splitIntoParagraphs(text: string, sentencesPerPara = 2): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.includes('\n\n')) {
    return trimmed.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  }
  const sentences = trimmed
    .split(/(?<=[.!?])\s+(?=[A-Z(])/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length <= sentencesPerPara) return [trimmed];
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += sentencesPerPara) {
    out.push(sentences.slice(i, i + sentencesPerPara).join(' '));
  }
  return out;
}

export const EditorialHealthSafetyResults = ({
  inputs,
  outputData,
  onNewMethod,
  onEditAndRegenerate,
}: EditorialHealthSafetyResultsProps) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const hazards: any[] = useMemo(
    () => (Array.isArray(outputData?.hazards) ? outputData.hazards : []),
    [outputData?.hazards]
  );

  const summary: any = outputData?.summary ?? {};
  const overallResidual: 'low' | 'medium' | 'high' =
    summary.overallResidualRisk ?? 'medium';
  const totalHazards = summary.totalHazards ?? hazards.length;
  const highestPre = summary.highestRiskRating ?? 0;
  const criticalRefs: string[] = summary.criticalRegs ?? [];

  const allPpe = useMemo(() => {
    const set = new Set<string>();
    hazards.forEach((h) => (h?.ppeRequired ?? []).forEach((p: string) => p && set.add(p)));
    return Array.from(set);
  }, [hazards]);

  const allCompetency = useMemo(() => {
    const set = new Set<string>();
    hazards.forEach((h) =>
      (h?.competencyRequired ?? []).forEach((q: string) => q && set.add(q))
    );
    return Array.from(set);
  }, [hazards]);

  const typeLabel =
    HEALTH_SAFETY_WORK_OPTIONS.find((o) => o.value === inputs.workType)?.label ??
    inputs.workType;

  const overallTone =
    overallResidual === 'high'
      ? { dot: 'bg-red-400', text: 'text-red-300' }
      : overallResidual === 'low'
        ? { dot: 'bg-emerald-400', text: 'text-emerald-300' }
        : { dot: 'bg-amber-400', text: 'text-amber-300' };

  return (
    <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center h-12 gap-4">
            <button
              type="button"
              onClick={onNewMethod}
              className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>New</span>
            </button>
            <div className="flex-1 min-w-0 flex items-baseline gap-2.5">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white hidden sm:inline">
                H&amp;S Specialist
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                {inputs.projectName || outputData?.jobTitle || 'Risk Assessment'}
              </h1>
            </div>
            {onEditAndRegenerate && (
              <button
                type="button"
                onClick={onEditAndRegenerate}
                className="inline-flex items-center gap-1.5 text-[12px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
              >
                <Pencil className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Edit brief</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 [&>*+*]:mt-9 sm:[&>*+*]:mt-12 [&>*+*]:pt-9 sm:[&>*+*]:pt-12 [&>*+*]:relative [&>*+*]:before:content-[''] [&>*+*]:before:absolute [&>*+*]:before:top-0 [&>*+*]:before:left-0 [&>*+*]:before:right-0 [&>*+*]:before:h-[2px] [&>*+*]:before:rounded-full [&>*+*]:before:bg-gradient-to-r [&>*+*]:before:from-elec-yellow/40 [&>*+*]:before:via-elec-yellow/20 [&>*+*]:before:to-transparent">
        {/* HERO */}
        <section className="space-y-3">
          <Eyebrow>RISK ASSESSMENT &amp; METHOD STATEMENT</Eyebrow>
          <h2 className="text-[28px] sm:text-[40px] md:text-[48px] font-semibold tracking-tight leading-[1.02] text-white max-w-3xl">
            {outputData?.jobTitle || inputs.projectName || 'Risk Assessment'}
            <span className="text-elec-yellow">.</span>
          </h2>
          {outputData?.executiveSummary && (
            <div className="space-y-3 text-[14px] sm:text-[15px] text-white leading-relaxed max-w-2xl">
              {splitIntoParagraphs(String(outputData.executiveSummary), 2).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 -mx-4 sm:mx-0 mt-5 sm:mt-7 bg-[hsl(0_0%_8%)] sm:bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl border-white/[0.08] divide-x divide-white/[0.06]">
            <Stat label="Hazards" value={String(totalHazards)} />
            <Stat label="Highest pre-control" value={String(highestPre)} />
            <Stat
              label="Residual"
              value={overallResidual}
              valueClass={cn('capitalize', overallTone.text)}
              dotClass={overallTone.dot}
            />
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 text-[12px] text-white">
            <span className="uppercase tracking-[0.16em] text-[10.5px] font-semibold text-white/70">
              {typeLabel}
            </span>
            {inputs.location && <span>{inputs.location}</span>}
            {inputs.clientName && <span>Client: {inputs.clientName}</span>}
            {inputs.duration && <span>Duration: {inputs.duration}</span>}
          </div>
        </section>

        {outputData?.preparation && <PrepBlock prep={outputData.preparation} />}

        {hazards.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow>HAZARDS</Eyebrow>
              <span className="text-[11px] tabular-nums text-white/70">
                {hazards.length} hazard{hazards.length === 1 ? '' : 's'}
              </span>
            </div>
            <ol className="-mx-4 sm:mx-0 bg-[hsl(0_0%_8%)] sm:bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden">
              {hazards.map((h, i) => (
                <HazardRow
                  key={i}
                  hazard={h}
                  index={i}
                  expanded={activeIdx === i}
                  onToggle={() => setActiveIdx(activeIdx === i ? null : i)}
                />
              ))}
            </ol>
          </section>
        )}

        {outputData?.emergencyProcedures && (
          <EmergencyBlock proc={outputData.emergencyProcedures} />
        )}

        {(allPpe.length > 0 || allCompetency.length > 0 || criticalRefs.length > 0) && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {allPpe.length > 0 && (
              <ChipPanel eyebrow="PPE BASELINE" icon={Shield} items={allPpe} />
            )}
            {allCompetency.length > 0 && (
              <ChipPanel eyebrow="COMPETENCY" icon={Shield} items={allCompetency} />
            )}
            {criticalRefs.length > 0 && (
              <ChipPanel
                eyebrow="CRITICAL REFERENCES"
                icon={AlertTriangle}
                items={criticalRefs}
                accent="bs"
              />
            )}
          </section>
        )}

        <section className="-mx-4 sm:mx-0 bg-[hsl(0_0%_8%)] sm:bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl border-white/[0.08] px-4 sm:px-5 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <Eyebrow>NEXT</Eyebrow>
            <p className="text-[13px] text-white mt-1 leading-snug">
              Tweak the brief and regenerate, or start a fresh assessment.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {onEditAndRegenerate && (
              <motion.button
                type="button"
                onClick={onEditAndRegenerate}
                whileTap={{ scale: 0.98 }}
                className="h-11 px-4 rounded-xl text-[13px] font-semibold inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.10] touch-manipulation"
              >
                <Pencil className="h-3.5 w-3.5" />
                <span>Edit &amp; regenerate</span>
              </motion.button>
            )}
            <motion.button
              type="button"
              onClick={onNewMethod}
              whileTap={{ scale: 0.98 }}
              className="h-11 px-4 rounded-xl text-[13px] font-semibold inline-flex items-center justify-center gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              <span>New assessment</span>
            </motion.button>
          </div>
        </section>
      </main>
    </div>
  );
};

const Stat = ({
  label,
  value,
  valueClass,
  dotClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
  dotClass?: string;
}) => (
  <div className="px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-1.5 min-w-0">
    <span className="text-[10px] sm:text-[10.5px] font-semibold uppercase tracking-[0.16em] text-white/70">
      {label}
    </span>
    <span
      className={cn(
        'text-[18px] sm:text-[22px] font-semibold tracking-tight leading-tight tabular-nums truncate text-white',
        valueClass
      )}
    >
      {dotClass && (
        <span className={cn('inline-block h-2 w-2 rounded-full mr-2 align-middle', dotClass)} />
      )}
      {value}
    </span>
  </div>
);

const HazardRow = ({
  hazard,
  index,
  expanded,
  onToggle,
}: {
  hazard: any;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) => {
  const number = hazard.hazardNumber ?? index + 1;
  const pre = (hazard.likelihood ?? 0) * (hazard.severity ?? 0) || hazard.riskRating || 0;
  const residual =
    (hazard.residualLikelihood ?? 0) * (hazard.residualSeverity ?? 0) ||
    hazard.residualRiskRating ||
    0;
  const preBand = RISK_BAND(pre);
  const residualBand = RISK_BAND(residual);

  const controls: any[] = Array.isArray(hazard.controls) ? hazard.controls : [];
  const persons: string[] = hazard.personsAtRisk ?? [];
  const ppe: string[] = hazard.ppeRequired ?? [];
  const competency: string[] = hazard.competencyRequired ?? [];
  const bsRefs: string[] = hazard.bsReferences ?? [];
  const safetyRefs: string[] = hazard.safetyReferences ?? [];
  const evidence: string[] = hazard.evidenceRequired ?? [];
  const stopWork: string[] = hazard.stopWorkTriggers ?? [];
  const monitoring: string[] = hazard.monitoringChecks ?? [];

  return (
    <li className="px-4 sm:px-5 py-4 sm:py-5">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left flex items-start gap-3 sm:gap-4 touch-manipulation"
      >
        <span className="text-[10.5px] font-semibold tracking-[0.16em] text-elec-yellow tabular-nums mt-1 flex-shrink-0">
          {String(number).padStart(2, '0')}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[15px] sm:text-[16px] font-semibold tracking-tight text-white leading-snug">
              {hazard.title || 'Untitled hazard'}
            </h3>
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.16em] font-semibold',
                  preBand.text
                )}
              >
                <span className={cn('h-1.5 w-1.5 rounded-full', preBand.dot)} />
                {pre || '—'}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white/60 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
            </div>
          </div>
          {hazard.locationOfHazard && (
            <p className="mt-1 text-[12.5px] text-white/85 leading-snug">
              {hazard.locationOfHazard}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/70">
            {pre > 0 && (
              <span className="tabular-nums">
                Pre {hazard.likelihood}×{hazard.severity}={pre}
              </span>
            )}
            {residual > 0 && (
              <span className={cn('tabular-nums', residualBand.text)}>
                Residual {hazard.residualLikelihood}×{hazard.residualSeverity}={residual}
              </span>
            )}
            {controls.length > 0 && (
              <span className="tabular-nums">{controls.length} controls</span>
            )}
            {evidence.length > 0 && (
              <span className="tabular-nums">{evidence.length} evidence</span>
            )}
            {!expanded && (
              <span className="ml-auto text-[10.5px] uppercase tracking-[0.16em] font-semibold text-elec-yellow/70">
                Tap for detail
              </span>
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="pl-0 sm:pl-9 pt-4 mt-4 border-t border-white/[0.06] [&>*+*]:mt-5 [&>*+*]:pt-5 [&>*+*]:relative [&>*+*]:before:content-[''] [&>*+*]:before:absolute [&>*+*]:before:top-0 [&>*+*]:before:left-0 [&>*+*]:before:right-0 [&>*+*]:before:h-[2px] [&>*+*]:before:rounded-full [&>*+*]:before:bg-gradient-to-r [&>*+*]:before:from-elec-yellow/40 [&>*+*]:before:via-elec-yellow/20 [&>*+*]:before:to-transparent"
        >
          {hazard.primaryRisk && (
            <SubBlock label="Primary risk">
              <p className="text-[13px] text-white leading-relaxed">{hazard.primaryRisk}</p>
            </SubBlock>
          )}
          {hazard.rationale && (
            <SubBlock label="Rationale">
              <div className="space-y-3 text-[13px] text-white leading-relaxed">
                {splitIntoParagraphs(String(hazard.rationale)).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </SubBlock>
          )}
          {persons.length > 0 && (
            <SubBlock label="Persons at risk">
              <Chips items={persons} />
            </SubBlock>
          )}
          {controls.length > 0 && (
            <SubBlock label="Control measures">
              <ol className="space-y-3">
                {controls.map((c: any, i: number) => {
                  const tier = TIER_TONE[c.tier] ?? TIER_TONE.admin;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[10.5px] font-semibold tracking-[0.16em] text-elec-yellow tabular-nums mt-1 flex-shrink-0">
                        {String(c.order ?? i + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span
                            className={cn(
                              'inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] font-semibold',
                              tier.text
                            )}
                          >
                            <span className={cn('h-1.5 w-1.5 rounded-full', tier.dot)} />
                            {tier.label}
                          </span>
                          <p className="text-[13px] font-semibold text-white leading-snug">
                            {c.control}
                          </p>
                        </div>
                        {c.detail && (
                          <p className="text-[12.5px] text-white/85 leading-relaxed">
                            {c.detail}
                          </p>
                        )}
                        {c.responsibleRole && (
                          <span className="text-[11px] uppercase tracking-[0.14em] text-white/70">
                            Responsible: {c.responsibleRole}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </SubBlock>
          )}
          {ppe.length > 0 && (
            <SubBlock label="PPE required">
              <Chips items={ppe} />
            </SubBlock>
          )}
          {competency.length > 0 && (
            <SubBlock label="Competency required">
              <Chips items={competency} />
            </SubBlock>
          )}
          {(bsRefs.length > 0 || safetyRefs.length > 0) && (
            <SubBlock label="References">
              <Chips
                items={[...bsRefs.map((r) => `BS 7671 Reg ${r}`), ...safetyRefs]}
                accent="bs"
              />
            </SubBlock>
          )}
          {monitoring.length > 0 && (
            <SubBlock label="Monitoring during work">
              <ul className="space-y-2">
                {monitoring.map((m, i) => (
                  <li key={i} className="text-[12.5px] text-white leading-relaxed flex items-start gap-2">
                    <span className="text-[10px] text-blue-300 mt-1">●</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </SubBlock>
          )}
          {evidence.length > 0 && (
            <SubBlock label="Evidence required">
              <ul className="space-y-2">
                {evidence.map((e, i) => (
                  <li key={i} className="text-[12.5px] text-white leading-relaxed flex items-start gap-2">
                    <span className="text-[10px] text-blue-300 mt-1">●</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </SubBlock>
          )}
          {stopWork.length > 0 && (
            <SubBlock label="Stop-work triggers">
              <ul className="space-y-2">
                {stopWork.map((s, i) => (
                  <li key={i} className="text-[12.5px] text-white leading-relaxed flex items-start gap-2">
                    <span className="text-[10px] text-red-300 mt-1">⚠</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </SubBlock>
          )}
        </motion.div>
      )}
    </li>
  );
};

const PrepBlock = ({ prep }: { prep: any }) => {
  const items: Array<[string, string[]]> = [
    ['Competency required', prep.competencyRequired ?? []],
    ['Permits required', prep.permitsRequired ?? []],
    ['Documentation required', prep.documentationRequired ?? []],
    ['Site access', prep.siteAccess ?? []],
    ['PPE baseline', prep.ppeBaseline ?? []],
  ];
  if (items.every(([, arr]) => arr.length === 0)) return null;
  return (
    <section className="space-y-4">
      <Eyebrow>PREPARATION</Eyebrow>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {items
          .filter(([, arr]) => arr.length > 0)
          .map(([label, arr]) => (
            <ChipPanel key={label} eyebrow={label.toUpperCase()} icon={Shield} items={arr} />
          ))}
      </div>
    </section>
  );
};

const EmergencyBlock = ({ proc }: { proc: any }) => {
  const items: Array<[string, string[]]> = [
    ['First aid', proc.firstAid ?? []],
    ['Fire / evacuation', proc.fireEvacuation ?? []],
    ['Spill response', proc.spillResponse ?? []],
    ['Electrical incident', proc.electricalIncident ?? []],
  ];
  return (
    <section className="space-y-4">
      <Eyebrow>EMERGENCY PROCEDURES</Eyebrow>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {items
          .filter(([, arr]) => arr.length > 0)
          .map(([label, arr]) => (
            <ChipPanel
              key={label}
              eyebrow={label.toUpperCase()}
              icon={AlertTriangle}
              items={arr}
            />
          ))}
      </div>
      {proc.nearestA_E && (
        <p className="text-[12.5px] text-white/85">
          <span className="uppercase tracking-[0.16em] text-[10px] font-semibold text-white/70 mr-2">
            Nearest A&amp;E
          </span>
          {proc.nearestA_E}
        </p>
      )}
    </section>
  );
};

const SubBlock = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">
      {label}
    </span>
    {children}
  </div>
);

const Chips = ({ items, accent }: { items: string[]; accent?: 'bs' }) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map((it, i) => (
      <span
        key={`${it}-${i}`}
        className={cn(
          'inline-flex items-center min-h-7 py-1 px-2.5 rounded-md text-[11.5px] font-medium border leading-snug',
          accent === 'bs'
            ? 'bg-elec-yellow/[0.06] border-elec-yellow/25 text-elec-yellow tabular-nums'
            : 'bg-white/[0.04] border-white/[0.10] text-white'
        )}
      >
        {it}
      </span>
    ))}
  </div>
);

const COLLAPSED_LIMIT = 12;

const ChipPanel = ({
  eyebrow,
  icon: Icon,
  items,
  accent,
}: {
  eyebrow: string;
  icon: React.ComponentType<{ className?: string }>;
  items: string[];
  accent?: 'bs';
}) => {
  const [expanded, setExpanded] = useState(false);
  const overflow = items.length - COLLAPSED_LIMIT;
  const hasOverflow = overflow > 0;
  const visible = expanded || !hasOverflow ? items : items.slice(0, COLLAPSED_LIMIT);
  return (
    <section className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl border-white/[0.08] px-4 sm:px-5 py-4 sm:py-5 space-y-3">
      <button
        type="button"
        onClick={() => hasOverflow && setExpanded((e) => !e)}
        disabled={!hasOverflow}
        className={cn(
          'w-full flex items-baseline justify-between gap-3 text-left',
          hasOverflow && 'touch-manipulation cursor-pointer hover:opacity-90'
        )}
      >
        <span className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/70">
          <Icon className="h-3.5 w-3.5 text-white/60" />
          {eyebrow}
        </span>
        <span className="inline-flex items-center gap-2 text-[11px] tabular-nums text-white/60">
          {items.length}
          {hasOverflow && (
            <ChevronDown
              className={cn(
                'h-3.5 w-3.5 text-white/60 transition-transform duration-200',
                expanded && 'rotate-180'
              )}
            />
          )}
        </span>
      </button>
      <Chips items={visible} accent={accent} />
      {hasOverflow && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="text-[11px] font-medium text-elec-yellow/80 hover:text-elec-yellow transition-colors touch-manipulation"
        >
          Show {overflow} more
        </button>
      )}
      {hasOverflow && expanded && (
        <button
          type="button"
          onClick={() => setExpanded(false)}
          className="text-[11px] font-medium text-white/60 hover:text-white/80 transition-colors touch-manipulation"
        >
          Show less
        </button>
      )}
    </section>
  );
};
