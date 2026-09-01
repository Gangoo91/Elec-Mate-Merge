/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Editorial Method Results
 *
 * Replaces the dialog/card-grid `InstallationResults` with a cohesive
 * editorial surface that matches the briefing + streaming pages: mobile
 * flat (no card chrome on mobile), full-bleed gutters, numbered cells,
 * eyebrows, white + yellow headlines with periods, tabular-nums.
 *
 * Reads the existing API shape so it slots in without touching the edge
 * function. When the BS 7671 grounding upgrade lands, the per-step
 * `bsReferences` strings will become richer objects — this component
 * already renders strings, so the swap is additive.
 */

import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  RefreshCcw,
  Pencil,
  Hammer,
  Package,
  Shield,
  BookOpen,
  ChevronDown,
  Download,
  Share2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Capacitor } from '@capacitor/core';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { buildMaintenancePdfPayload } from '@/utils/maintenance-pdf-payload-builder';
import { openOrDownloadPdf } from '@/utils/pdf-download';
import {
  MaintenanceMethodInputs,
  MAINTENANCE_INSTALLATION_OPTIONS,
} from '@/types/maintenance-method-inputs';

interface EditorialMaintenanceResultsProps {
  inputs: MaintenanceMethodInputs;
  methodData: any;
  jobId?: string | null;
  onNewMethod: () => void;
  onEditAndRegenerate?: () => void;
}

const RISK_TONE: Record<string, { dot: string; text: string }> = {
  low: { dot: 'bg-emerald-400', text: 'text-emerald-300' },
  medium: { dot: 'bg-amber-400', text: 'text-amber-300' },
  high: { dot: 'bg-red-400', text: 'text-red-300' },
};

const isStructuredSafetyNote = (
  s: unknown
): s is { note: string; regulation?: string; severity?: string } =>
  !!s && typeof s === 'object' && 'note' in (s as any);

/**
 * Split a long block of text into 2-3 sentence paragraphs so the
 * Method body stays readable on mobile. Conservative: respects existing
 * paragraph breaks if any, otherwise groups by sentence boundaries.
 */
function splitIntoParagraphs(text: string, sentencesPerPara = 2): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  // Honour any author-provided paragraph breaks first.
  if (trimmed.includes('\n\n')) {
    return trimmed
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
  }
  // Otherwise group sentences. The lookbehind keeps the punctuation.
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

export const EditorialMaintenanceResults = ({
  inputs,
  methodData,
  onNewMethod,
  onEditAndRegenerate,
}: EditorialMaintenanceResultsProps) => {
  const [activeStepIdx, setActiveStepIdx] = useState<number | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const { toast } = useToast();

  const handleExportPdf = async () => {
    setIsExportingPdf(true);
    try {
      const equipmentDetails = {
        equipmentType: inputs.equipmentType || 'Equipment',
        location: inputs.location || 'Not specified',
        installationType: inputs.installationType,
        additionalNotes: inputs.additionalNotes,
        ageYears: inputs.ageYears ? parseInt(inputs.ageYears, 10) || undefined : undefined,
      };
      const payload = buildMaintenancePdfPayload(methodData, equipmentDetails);
      const { data, error } = await supabase.functions.invoke('generate-maintenance-method-pdf', {
        body: payload,
      });
      if (error) throw error;
      if (data?.downloadUrl) {
        await openOrDownloadPdf(
          data.downloadUrl,
          data.filename || `Maintenance_${inputs.equipmentType || 'Instructions'}.pdf`
        );
        if (!Capacitor.isNativePlatform()) {
          toast({ title: 'PDF Downloaded', description: 'Your maintenance method PDF is ready.' });
        }
      } else {
        throw new Error('No download URL returned');
      }
    } catch (err: any) {
      console.error('[Maintenance PDF] Export failed:', err);
      toast({
        title: 'Export Failed',
        description: err?.message || 'Could not generate PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsExportingPdf(false);
    }
  };

  const steps: any[] = useMemo(
    () => (Array.isArray(methodData?.steps) ? methodData.steps : []),
    [methodData?.steps]
  );

  const summary: any = methodData?.summary ?? {};
  const overallRisk: 'low' | 'medium' | 'high' =
    summary.overallRiskLevel ?? methodData?.overallRiskLevel ?? 'medium';
  const totalSteps = summary.totalSteps ?? steps.length;
  const estimatedDuration: string =
    summary.estimatedDuration || methodData?.estimatedDuration || '—';

  // Aggregate tools / materials / qualifications across steps if the
  // top-level summary is missing them. Belt-and-braces for older edge
  // function payloads.
  const allTools = useMemo(() => {
    if (Array.isArray(summary.toolsRequired) && summary.toolsRequired.length) {
      return summary.toolsRequired;
    }
    const set = new Set<string>();
    steps.forEach((s) => (s?.toolsRequired ?? []).forEach((t: string) => t && set.add(t)));
    return Array.from(set);
  }, [summary.toolsRequired, steps]);

  const allMaterials = useMemo(() => {
    if (Array.isArray(summary.materialsRequired) && summary.materialsRequired.length) {
      return summary.materialsRequired;
    }
    const set = new Set<string>();
    steps.forEach((s) => (s?.materialsNeeded ?? []).forEach((m: string) => m && set.add(m)));
    return Array.from(set);
  }, [summary.materialsRequired, steps]);

  const allQualifications = useMemo(() => {
    if (Array.isArray(summary.requiredQualifications) && summary.requiredQualifications.length) {
      return summary.requiredQualifications;
    }
    const set = new Set<string>();
    steps.forEach((s) => (s?.qualifications ?? []).forEach((q: string) => q && set.add(q)));
    return Array.from(set);
  }, [summary.requiredQualifications, steps]);

  const allBsRefs = useMemo(() => {
    const set = new Set<string>();
    steps.forEach((s) => (s?.bsReferences ?? []).forEach((r: string) => r && set.add(r)));
    return Array.from(set);
  }, [steps]);

  const typeLabel =
    MAINTENANCE_INSTALLATION_OPTIONS.find((o) => o.value === inputs.installationType)?.label ??
    inputs.installationType;

  const riskTone = RISK_TONE[overallRisk] ?? RISK_TONE.medium;

  return (
    <div className="bg-elec-dark min-h-screen pb-24 -mx-3 sm:-mx-4 md:-mx-6 lg:-mx-8 -mt-1 sm:-mt-3 md:-mt-6">
      {/* Sticky editorial header */}
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
                Maintenance Specialist
              </span>
              <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
              <h1 className="text-[13px] sm:text-sm font-semibold text-white truncate tracking-tight">
                {inputs.projectName || methodData?.jobTitle || 'Method Statement'}
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

      <main className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:py-10 space-y-9 sm:space-y-12">
        {/* HERO */}
        <section className="space-y-3">
          <Eyebrow>METHOD STATEMENT</Eyebrow>
          <h2 className="text-[28px] sm:text-[40px] md:text-[48px] font-semibold tracking-tight leading-[1.02] text-white max-w-3xl">
            {methodData?.jobTitle || inputs.projectName || 'Maintenance Method'}
            <span className="text-elec-yellow">.</span>
          </h2>
          <p className="text-[14px] sm:text-[15px] text-white leading-relaxed max-w-2xl">
            {methodData?.installationGuide ||
              `A formal ${typeLabel.toLowerCase()} maintenance method statement, grounded in BS 7671.`}
          </p>

          {/* Stat strip */}
          <div className="grid grid-cols-3 -mx-4 sm:mx-0 mt-5 sm:mt-7 bg-[hsl(0_0%_8%)] sm:bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl border-white/[0.08] divide-x divide-white/[0.06]">
            <Stat label="Steps" value={String(totalSteps)} />
            <Stat label="Duration" value={estimatedDuration} />
            <Stat
              label="Risk"
              value={overallRisk}
              valueClass={cn('capitalize', riskTone.text)}
              dotClass={riskTone.dot}
            />
          </div>

          {/* Project tags */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-3 text-[12px] text-white">
            <span className="uppercase tracking-[0.16em] text-[10.5px] font-semibold text-white/70">
              {typeLabel}
            </span>
            {inputs.location && <span>{inputs.location}</span>}
            {inputs.clientName && <span>Client: {inputs.clientName}</span>}
            {inputs.expectedStartDate && <span>Start: {inputs.expectedStartDate}</span>}
          </div>
        </section>

        {/* STEPS */}
        {steps.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow>STEPS</Eyebrow>
              <span className="text-[11px] tabular-nums text-white/70">
                {steps.length} step{steps.length === 1 ? '' : 's'}
              </span>
            </div>
            <ol className="-mx-4 sm:mx-0 bg-[hsl(0_0%_8%)] sm:bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl border-white/[0.08] divide-y divide-white/[0.06] overflow-hidden">
              {steps.map((step, i) => (
                <StepRow
                  key={i}
                  step={step}
                  index={i}
                  expanded={activeStepIdx === i}
                  onToggle={() => setActiveStepIdx(activeStepIdx === i ? null : i)}
                />
              ))}
            </ol>
          </section>
        )}

        {/* OVERALLS — grid: tools, materials, competency, regs */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {allTools.length > 0 && (
            <ChipPanel eyebrow="TOOLS REQUIRED" icon={Hammer} items={allTools} />
          )}
          {allMaterials.length > 0 && (
            <ChipPanel eyebrow="MATERIALS" icon={Package} items={allMaterials} />
          )}
          {allQualifications.length > 0 && (
            <ChipPanel eyebrow="COMPETENCY" icon={Shield} items={allQualifications} />
          )}
          {allBsRefs.length > 0 && (
            <ChipPanel eyebrow="REGULATIONS" icon={BookOpen} items={allBsRefs} accent="bs" />
          )}
        </section>

        {/* ACTION BAR */}
        <section className="-mx-4 sm:mx-0 bg-[hsl(0_0%_8%)] sm:bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl border-white/[0.08] px-4 sm:px-5 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <Eyebrow>NEXT</Eyebrow>
            <p className="text-[13px] text-white mt-1 leading-snug">
              Tweak the brief and regenerate, or start a fresh method statement.
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
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              whileTap={{ scale: 0.98 }}
              className="h-11 px-4 rounded-xl text-[13px] font-semibold inline-flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.10] touch-manipulation disabled:opacity-50"
            >
              {isExportingPdf ? (
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
              ) : Capacitor.isNativePlatform() ? (
                <Share2 className="h-3.5 w-3.5" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              <span>{isExportingPdf ? 'Generating…' : Capacitor.isNativePlatform() ? 'Share PDF' : 'Download PDF'}</span>
            </motion.button>
            <motion.button
              type="button"
              onClick={onNewMethod}
              whileTap={{ scale: 0.98 }}
              className="h-11 px-4 rounded-xl text-[13px] font-semibold inline-flex items-center justify-center gap-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              <span>New method</span>
            </motion.button>
          </div>
        </section>
      </main>
    </div>
  );
};

/* ─── Sub-components ─────────────────────────────────────────────── */

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

const StepRow = ({
  step,
  index,
  expanded,
  onToggle,
}: {
  step: any;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) => {
  const number = step.stepNumber ?? index + 1;
  const risk = (step.riskLevel ?? 'medium') as 'low' | 'medium' | 'high';
  const tone = RISK_TONE[risk] ?? RISK_TONE.medium;
  const safety: (string | { note: string; regulation?: string; severity?: string })[] =
    step.safety ?? [];
  const tools: string[] = step.toolsRequired ?? [];
  const materials: string[] = step.materialsNeeded ?? [];
  const bsRefs: string[] = step.bsReferences ?? [];
  // Backwards-compat: legacy payloads have inspectionCheckpoints as a
  // plain string[]; new schema returns { check, acceptanceCriteria,
  // documentRequired }[]. Normalise to the structured shape so the
  // renderer can show all three columns when available.
  const checkpoints: Array<{
    check: string;
    acceptanceCriteria?: string;
    documentRequired?: string;
  }> = (step.inspectionCheckpoints ?? []).map((c: unknown) =>
    typeof c === 'string'
      ? { check: c }
      : (c as { check: string; acceptanceCriteria?: string; documentRequired?: string })
  );
  const subSteps: Array<{ order?: number; action: string; detail?: string }> = Array.isArray(
    step.subSteps
  )
    ? step.subSteps
    : [];
  const criticalDecisions: string[] = step.criticalDecisions ?? [];
  const commonMistakes: string[] = step.commonMistakes ?? [];
  const evidenceRequired: string[] = step.evidenceRequired ?? [];
  const purpose: string = step.purpose ?? '';
  const durationBreakdown = step.durationBreakdown as
    | { preparation?: string; execution?: string; verification?: string }
    | undefined;
  const duration = step.estimatedDuration;

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
              {step.title || 'Untitled step'}
            </h3>
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.16em] font-semibold',
                  tone.text
                )}
              >
                <span className={cn('h-1.5 w-1.5 rounded-full', tone.dot)} />
                {risk}
              </span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-white/60 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
              />
            </div>
          </div>
          {/* Meta strip — duration + content-summary chips so the user
              sees there's depth here even when collapsed. */}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/70">
            {duration && <span className="tabular-nums">~{duration}</span>}
            {subSteps.length > 0 && (
              <span className="tabular-nums">{subSteps.length} sub-steps</span>
            )}
            {safety.length > 0 && <span className="tabular-nums">{safety.length} safety</span>}
            {bsRefs.length > 0 && <span className="tabular-nums">{bsRefs.length} regs</span>}
            {checkpoints.length > 0 && (
              <span className="tabular-nums">{checkpoints.length} checks</span>
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
          {purpose && (
            <SubBlock label="Purpose">
              <p className="text-[13px] text-white leading-relaxed">{purpose}</p>
            </SubBlock>
          )}
          {step.content && (
            <SubBlock label="Method">
              <div className="space-y-3 text-[13px] text-white leading-relaxed">
                {splitIntoParagraphs(String(step.content)).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </SubBlock>
          )}
          {subSteps.length > 0 && (
            <SubBlock label="Sub-steps">
              <ol className="space-y-3">
                {subSteps.map((ss, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[10.5px] font-semibold tracking-[0.16em] text-elec-yellow tabular-nums mt-1 flex-shrink-0">
                      {String(ss.order ?? i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-[13px] font-semibold text-white leading-snug">
                        {ss.action}
                      </p>
                      {ss.detail && (
                        <p className="text-[12.5px] text-white leading-relaxed">{ss.detail}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </SubBlock>
          )}
          {durationBreakdown &&
            (durationBreakdown.preparation ||
              durationBreakdown.execution ||
              durationBreakdown.verification) && (
              <SubBlock label="Duration breakdown">
                <div className="grid grid-cols-3 gap-2">
                  {(['preparation', 'execution', 'verification'] as const).map((k) => {
                    const v = durationBreakdown[k];
                    if (!v) return null;
                    return (
                      <div
                        key={k}
                        className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-2.5 py-2"
                      >
                        <span className="text-[10px] uppercase tracking-[0.16em] text-white/60 block">
                          {k}
                        </span>
                        <span className="text-[12.5px] tabular-nums text-white block mt-0.5">
                          {v}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </SubBlock>
            )}
          {safety.length > 0 && (
            <SubBlock label="Safety">
              <ul className="space-y-2">
                {safety.map((s, i) => {
                  const note = isStructuredSafetyNote(s) ? s.note : (s as string);
                  const reg = isStructuredSafetyNote(s) ? s.regulation : undefined;
                  const sev = isStructuredSafetyNote(s) ? s.severity : undefined;
                  const sevTone =
                    sev === 'critical'
                      ? 'text-red-300'
                      : sev === 'warning'
                        ? 'text-amber-300'
                        : 'text-white';
                  return (
                    <li key={i} className="text-[12.5px] leading-relaxed flex items-start gap-2">
                      <span className={cn('text-[10px] mt-1', sevTone)}>•</span>
                      <span className="text-white">
                        {note}
                        {reg && (
                          <span className="ml-2 text-[11px] tabular-nums text-elec-yellow/80">
                            BS 7671 Reg {reg}
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </SubBlock>
          )}
          {tools.length > 0 && (
            <SubBlock label="Tools">
              <Chips items={tools} />
            </SubBlock>
          )}
          {materials.length > 0 && (
            <SubBlock label="Materials">
              <Chips items={materials} />
            </SubBlock>
          )}
          {bsRefs.length > 0 && (
            <SubBlock label="Regulations">
              <Chips items={bsRefs.map((r) => `Reg ${r}`)} accent="bs" />
            </SubBlock>
          )}
          {criticalDecisions.length > 0 && (
            <SubBlock label="Decisions on site">
              <ul className="space-y-2">
                {criticalDecisions.map((d, i) => (
                  <li
                    key={i}
                    className="text-[12.5px] text-white leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-[10px] text-amber-300 mt-1">◆</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </SubBlock>
          )}
          {commonMistakes.length > 0 && (
            <SubBlock label="Common mistakes">
              <ul className="space-y-2">
                {commonMistakes.map((m, i) => (
                  <li
                    key={i}
                    className="text-[12.5px] text-white leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-[10px] text-red-300 mt-1">⚠</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </SubBlock>
          )}
          {evidenceRequired.length > 0 && (
            <SubBlock label="Evidence required">
              <ul className="space-y-2">
                {evidenceRequired.map((e, i) => (
                  <li
                    key={i}
                    className="text-[12.5px] text-white leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-[10px] text-blue-300 mt-1">●</span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </SubBlock>
          )}
          {checkpoints.length > 0 && (
            <SubBlock label="Inspection checkpoints">
              <ul className="space-y-2">
                {checkpoints.map((c, i) => (
                  <li
                    key={i}
                    className="text-[12.5px] text-white leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-[10px] text-emerald-400 mt-1">✓</span>
                    <div className="min-w-0 space-y-0.5">
                      <p className="font-medium">{c.check}</p>
                      {c.acceptanceCriteria && (
                        <p className="text-[11.5px] text-white">
                          <span className="uppercase tracking-[0.14em] text-[9.5px] text-white/60 mr-1.5">
                            ACCEPT
                          </span>
                          {c.acceptanceCriteria}
                        </p>
                      )}
                      {c.documentRequired && (
                        <p className="text-[11.5px] text-white/70">
                          <span className="uppercase tracking-[0.14em] text-[9.5px] text-white/60 mr-1.5">
                            RECORD ON
                          </span>
                          {c.documentRequired}
                        </p>
                      )}
                    </div>
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
}) => (
  <section className="-mx-4 sm:mx-0 bg-[hsl(0_0%_10%)] border-y sm:border sm:rounded-2xl border-white/[0.08] px-4 sm:px-5 py-4 sm:py-5 space-y-3">
    <div className="flex items-baseline justify-between gap-3">
      <span className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/70">
        <Icon className="h-3.5 w-3.5 text-white/60" />
        {eyebrow}
      </span>
      <span className="text-[11px] tabular-nums text-white/60">{items.length}</span>
    </div>
    <Chips
      items={accent === 'bs' ? items.map((r) => (r.startsWith('Reg ') ? r : `Reg ${r}`)) : items}
      accent={accent}
    />
  </section>
);
