import React, { useState, useEffect, useRef } from 'react';
import { Loader2, ListChecks, FileText, RotateCcw, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DecimalInput } from '@/components/ui/decimal-input';
import { cn } from '@/lib/utils';
import { useSiteSurveyAnalysis } from '@/hooks/useSiteSurveyAnalysis';
import { useSurveyMaterialsActions } from '@/hooks/useSurveyMaterialsActions';
import { WholesalerRFQButton } from './WholesalerRFQButton';
import type { SiteVisit } from '@/types/siteVisit';
import type {
  SurveyAnalysisResult,
  RegulatoryFlag,
  SurveyIssue,
  MaterialItem,
} from '@/types/surveyAnalysis';

interface SurveyAnalysisPanelProps {
  visit: SiteVisit;
  /**
   * Kick off the analysis automatically when the panel mounts with no prior
   * result (Scope & Price step) — manual button remains the fallback/retry.
   */
  autoStart?: boolean;
}

/** Numbered eyebrow header — the section language used across v2 */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
      {children}
    </div>
  );
}

/** Severity rendered as a restrained dot — no badges, no tinted cards */
function SeverityDot({ severity }: { severity: 'info' | 'warning' | 'critical' }) {
  return (
    <span
      aria-label={severity}
      className={cn(
        'mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full',
        severity === 'critical'
          ? 'bg-red-400'
          : severity === 'warning'
            ? 'bg-amber-400'
            : 'bg-white/40'
      )}
    />
  );
}

const gbp = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/** Editorial cost header: one yellow numeral, hairline breakdown rows */
function CostSummary({
  summary,
  labour,
  materialsOverride,
}: {
  summary: SurveyAnalysisResult['cost_summary'];
  labour: SurveyAnalysisResult['labour_estimate'];
  /** Live materials total once the user has edited the list — keeps the
   *  header in step with the editable table below. */
  materialsOverride?: number;
}) {
  const materialsGbp = materialsOverride ?? summary.materials_gbp;
  const totalGbp = summary.total_gbp - summary.materials_gbp + materialsGbp;
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <SectionEyebrow>ESTIMATED TOTAL</SectionEyebrow>
          <p className="mt-1.5 text-[32px] font-semibold leading-none tracking-tight text-elec-yellow tabular-nums sm:text-[38px]">
            {gbp(totalGbp)}
          </p>
        </div>
        <p className="pb-1 text-[11px] capitalize text-white/45">{summary.confidence} confidence</p>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.08]">
        <div className="flex items-center justify-between bg-white/[0.02] px-3.5 py-2.5">
          <span className="text-[13px] text-white/75">Materials</span>
          <span className="text-[13px] font-medium tabular-nums text-white">
            {gbp(materialsGbp)}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.05] bg-white/[0.02] px-3.5 py-2.5">
          <span className="text-[13px] text-white/75">Labour · {labour.total_hours}h</span>
          <span className="text-[13px] font-medium tabular-nums text-white">
            {gbp(summary.labour_gbp)}
          </span>
        </div>
        {labour.breakdown.map((task, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-t border-white/[0.05] py-2 pl-7 pr-3.5"
          >
            <span className="text-[12px] text-white/55">{task.task}</span>
            <span className="text-[12px] tabular-nums text-white/55">{task.hours}h</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Editable materials table — ELE-1120. The AI estimate is a starting point;
 * the spark can correct quantity, unit, price and description, add or remove
 * lines, all on the review screen before it flows to the quote / materials
 * list. Totals (and the cost header above) update live.
 */
function EditableMaterialsTable({
  items,
  onChange,
}: {
  items: MaterialItem[];
  onChange: (next: MaterialItem[]) => void;
}) {
  const total = items.reduce((sum, i) => sum + (i.est_price_gbp || 0) * (i.quantity || 0), 0);

  const update = (idx: number, patch: Partial<MaterialItem>) =>
    onChange(items.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  const remove = (idx: number) => onChange(items.filter((_, i) => i !== idx));
  const add = () =>
    onChange([...items, { description: '', quantity: 1, unit: 'each', est_price_gbp: 0 }]);

  const fieldCls =
    'bg-white/[0.05] border border-white/[0.10] rounded-lg text-white caret-white px-2 ' +
    'focus:outline-none focus:border-elec-yellow focus:ring-2 focus:ring-elec-yellow/20 touch-manipulation';

  return (
    <div>
      <div className="flex items-center justify-between">
        <SectionEyebrow>MATERIALS · {items.length}</SectionEyebrow>
        <span className="text-[11px] text-white/45">Tap any field to edit</span>
      </div>
      <div className="mt-2 overflow-hidden rounded-xl border border-white/[0.08]">
        {items.map((item, i) => (
          <div key={i} className={cn('px-3 py-3', i > 0 && 'border-t border-white/[0.05]')}>
            <div className="flex items-start gap-2">
              <input
                value={item.description}
                onChange={(e) => update(i, { description: e.target.value })}
                placeholder="Item description"
                className={cn(fieldCls, 'h-11 min-w-0 flex-1 text-[13px]')}
              />
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label="Remove item"
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-white/40 transition-colors hover:text-red-400 active:bg-white/[0.06] touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <DecimalInput
                value={item.quantity}
                onChange={(v) => update(i, { quantity: v })}
                className={cn(fieldCls, 'h-11 w-14 text-center text-[13px]')}
              />
              <input
                value={item.unit}
                onChange={(e) => update(i, { unit: e.target.value })}
                placeholder="unit"
                className={cn(fieldCls, 'h-11 w-16 text-center text-[12px]')}
              />
              <span className="text-[12px] text-white/40">×</span>
              <div className="relative min-w-0 flex-1">
                <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[13px] text-white/70">
                  £
                </span>
                <DecimalInput
                  value={item.est_price_gbp}
                  onChange={(v) => update(i, { est_price_gbp: v })}
                  className={cn(fieldCls, 'h-11 w-full pl-6 text-[13px]')}
                />
              </div>
              <span className="w-20 flex-shrink-0 text-right text-[13px] font-medium tabular-nums text-white">
                {gbp((item.est_price_gbp || 0) * (item.quantity || 0))}
              </span>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="flex h-11 w-full items-center justify-center gap-1.5 border-t border-white/[0.08] text-[12px] font-medium text-white/60 transition-colors hover:text-white active:bg-white/[0.04] touch-manipulation"
        >
          <Plus className="h-3.5 w-3.5" />
          Add item
        </button>
        <div className="flex items-center justify-between border-t border-white/[0.08] bg-white/[0.02] px-3.5 py-2.5">
          <span className="text-[13px] font-medium text-white">Materials total</span>
          <span className="text-[13px] font-semibold tabular-nums text-white">{gbp(total)}</span>
        </div>
      </div>
    </div>
  );
}

function RegulatoryFlags({ flags }: { flags: RegulatoryFlag[] }) {
  if (flags.length === 0) return null;
  return (
    <div>
      <SectionEyebrow>REGULATORY FLAGS · {flags.length}</SectionEyebrow>
      <div className="mt-2 overflow-hidden rounded-xl border border-white/[0.08]">
        {flags.map((flag, i) => (
          <div
            key={i}
            className={cn('flex gap-2.5 px-3.5 py-2.5', i > 0 && 'border-t border-white/[0.05]')}
          >
            <SeverityDot severity={flag.severity} />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-medium text-white">{flag.regulation}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-white/65">{flag.description}</p>
              {flag.room && <p className="mt-1 text-[11px] text-white/45">{flag.room}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CableSizing({ items }: { items: SurveyAnalysisResult['cable_sizing'] }) {
  if (items.length === 0) return null;
  return (
    <div>
      <SectionEyebrow>CABLE SIZING</SectionEyebrow>
      <div className="mt-2 overflow-hidden rounded-xl border border-white/[0.08]">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center justify-between gap-3 px-3.5 py-2.5',
              i > 0 && 'border-t border-white/[0.05]'
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-white">{item.circuit}</p>
              <p className="mt-0.5 truncate text-[11px] text-white/45">
                {item.cable_type} · {item.ref_method}
              </p>
            </div>
            <span className="flex-shrink-0 text-[13px] font-medium tabular-nums text-white">
              {String(item.csa_mm2).replace(/\s*mm²?\s*/gi, '')} mm²
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CircuitRecommendations({
  items,
}: {
  items: SurveyAnalysisResult['circuit_recommendations'];
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <SectionEyebrow>CIRCUITS</SectionEyebrow>
      <div className="mt-2 overflow-hidden rounded-xl border border-white/[0.08]">
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'flex items-center justify-between gap-3 px-3.5 py-2.5',
              i > 0 && 'border-t border-white/[0.05]'
            )}
          >
            <div className="min-w-0 flex-1">
              <p className="text-[13px] text-white">{item.room}</p>
              <p className="mt-0.5 truncate text-[11px] text-white/45">
                {item.circuit_type} · {item.protection}
              </p>
            </div>
            <span className="flex-shrink-0 text-[13px] font-medium tabular-nums text-white">
              {item.rating_a}A
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Issues({ issues }: { issues: SurveyIssue[] }) {
  if (issues.length === 0) return null;
  return (
    <div>
      <SectionEyebrow>ISSUES &amp; ACTIONS · {issues.length}</SectionEyebrow>
      <div className="mt-2 overflow-hidden rounded-xl border border-white/[0.08]">
        {issues.map((issue, i) => (
          <div
            key={i}
            className={cn('flex gap-2.5 px-3.5 py-2.5', i > 0 && 'border-t border-white/[0.05]')}
          >
            <SeverityDot severity={issue.severity} />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] leading-snug text-white">{issue.description}</p>
              <p className="mt-1 text-[12px] leading-snug text-white/65">→ {issue.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalysisProgress({
  progress,
  currentStep,
}: {
  progress: number;
  currentStep: string | null;
}) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setElapsed(0);
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const timeStr = minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`;

  return (
    <div className="rounded-xl border border-white/[0.08] p-4">
      <div className="flex items-center gap-2.5">
        <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
        <span className="flex-1 text-[13px] font-medium text-white">
          {currentStep || 'Starting analysis…'}
        </span>
        <span className="text-[12px] tabular-nums text-white/55">{timeStr}</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-elec-yellow transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] text-white/45">
        Live trade prices and BS 7671 checks — up to 2 minutes
      </p>
    </div>
  );
}

export const SurveyAnalysisPanel = ({ visit, autoStart = false }: SurveyAnalysisPanelProps) => {
  const { status, progress, currentStep, result, error, startAnalysis, isStarting } =
    useSiteSurveyAnalysis(visit.id);
  const { saveToMaterialsList, sendToQuote } = useSurveyMaterialsActions();
  const [isSavingList, setIsSavingList] = useState(false);
  const autoStartedRef = useRef(false);

  // ELE-1120: editable copy of the AI materials list. Seeded from each fresh
  // analysis result; the spark's edits flow into "Send to quote" / "Save to
  // materials list" and the live cost header.
  const [materials, setMaterials] = useState<MaterialItem[]>([]);
  useEffect(() => {
    if (result?.materials_list) setMaterials(result.materials_list);
  }, [result]);
  const materialsTotal = materials.reduce(
    (s, i) => s + (i.est_price_gbp || 0) * (i.quantity || 0),
    0
  );

  const hasData = visit.rooms.length > 0;

  // Auto-run once per mount when there's scope and no prior result. The
  // mount-load of an existing job resolves quickly, so wait one tick of
  // status before deciding — never double-fire (analysis costs an AI run).
  useEffect(() => {
    if (!autoStart || autoStartedRef.current) return;
    if (!hasData || result || isStarting) return;
    if (status !== 'idle') return;
    const timer = setTimeout(() => {
      if (!autoStartedRef.current && !result && status === 'idle') {
        autoStartedRef.current = true;
        void startAnalysis(visit);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [autoStart, hasData, result, isStarting, status, startAnalysis, visit]);

  return (
    <div className="space-y-5">
      {/* Idle / failed — run button */}
      {(status === 'idle' || status === 'failed') && (
        <div className="space-y-3">
          <SectionEyebrow>AI PRICING</SectionEyebrow>
          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3.5 py-2.5">
              <p className="text-[12px] text-red-300">{error}</p>
            </div>
          )}
          <Button
            onClick={() => startAnalysis(visit)}
            disabled={isStarting || !hasData}
            className="h-12 w-full touch-manipulation rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-transform hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-50"
          >
            {isStarting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting…
              </>
            ) : (
              'Price this scope'
            )}
          </Button>
          {!hasData && (
            <p className="text-center text-[12px] text-white/55">
              Add rooms and items first, then pricing runs automatically
            </p>
          )}
        </div>
      )}

      {/* Processing */}
      {(status === 'pending' || status === 'processing') && (
        <div className="space-y-3">
          <SectionEyebrow>AI PRICING</SectionEyebrow>
          <AnalysisProgress progress={progress} currentStep={currentStep} />
        </div>
      )}

      {/* Results */}
      {status === 'completed' && result && (
        <div className="space-y-5">
          <CostSummary
            summary={result.cost_summary}
            labour={result.labour_estimate}
            materialsOverride={materialsTotal}
          />

          <EditableMaterialsTable items={materials} onChange={setMaterials} />
          {materials.length > 0 && (
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                onClick={() => sendToQuote(visit, materials)}
                variant="outline"
                className="h-11 flex-1 touch-manipulation rounded-xl border-white/[0.15] bg-white/[0.04] text-[13px] font-medium text-white transition-transform hover:bg-white/[0.08] active:scale-[0.98]"
              >
                <FileText className="mr-2 h-4 w-4" />
                Send to quote
              </Button>
              <Button
                onClick={async () => {
                  setIsSavingList(true);
                  await saveToMaterialsList(visit, materials);
                  setIsSavingList(false);
                }}
                disabled={isSavingList}
                variant="outline"
                className="h-11 flex-1 touch-manipulation rounded-xl border-white/[0.15] bg-white/[0.04] text-[13px] font-medium text-white transition-transform hover:bg-white/[0.08] active:scale-[0.98]"
              >
                {isSavingList ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ListChecks className="mr-2 h-4 w-4" />
                )}
                Save to materials list
              </Button>
              <WholesalerRFQButton visit={visit} materials={materials} />
            </div>
          )}

          <RegulatoryFlags flags={result.regulatory_flags} />
          <CableSizing items={result.cable_sizing} />
          <CircuitRecommendations items={result.circuit_recommendations} />
          <Issues issues={result.issues} />

          <button
            onClick={() => startAnalysis(visit)}
            disabled={isStarting}
            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg text-[12px] font-medium text-white/55 transition-colors touch-manipulation hover:text-white active:bg-white/[0.04]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Re-run pricing
          </button>
        </div>
      )}
    </div>
  );
};
