import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Loader2,
  AlertTriangle,
  Info,
  XCircle,
  Cable,
  PoundSterling,
  Zap,
  Package,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { useSiteSurveyAnalysis } from '@/hooks/useSiteSurveyAnalysis';
import type { SiteVisit } from '@/types/siteVisit';
import type { SurveyAnalysisResult, RegulatoryFlag, SurveyIssue } from '@/types/surveyAnalysis';

interface SurveyAnalysisPanelProps {
  visit: SiteVisit;
}

function SeverityBadge({ severity }: { severity: 'info' | 'warning' | 'critical' }) {
  const config = {
    info: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'Info' },
    warning: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Warning' },
    critical: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Critical' },
  };
  const c = config[severity];
  return (
    <span className={`${c.bg} ${c.text} text-[10px] font-semibold px-2 py-0.5 rounded-full`}>
      {c.label}
    </span>
  );
}

function SeverityIcon({ severity }: { severity: 'info' | 'warning' | 'critical' }) {
  switch (severity) {
    case 'info':
      return <Info className="h-4 w-4 text-blue-400 flex-shrink-0" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-amber-400 flex-shrink-0" />;
    case 'critical':
      return <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />;
  }
}

function MaterialsTable({ items }: { items: SurveyAnalysisResult['materials_list'] }) {
  const total = items.reduce((sum, i) => sum + i.est_price_gbp * i.quantity, 0);
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-emerald-400" />
        <h4 className="text-sm font-semibold text-white">Materials List</h4>
      </div>
      <div className="space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="py-2 border-b border-white/[0.04] last:border-0">
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <p className="text-xs text-white font-medium flex-1">{item.description}</p>
              <span className="text-xs text-emerald-400 font-semibold flex-shrink-0">
                £{(item.est_price_gbp * item.quantity).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-white">
              <span>
                {item.quantity} {item.unit}
              </span>
              <span>£{item.est_price_gbp.toFixed(2)} each</span>
              {item.supplier && <span>{item.supplier}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs font-semibold pt-2 border-t border-white/10">
        <span className="text-white">Materials Total</span>
        <span className="text-emerald-400">£{total.toFixed(2)}</span>
      </div>
    </div>
  );
}

function RegulatoryFlagsSection({ flags }: { flags: RegulatoryFlag[] }) {
  if (flags.length === 0) return null;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-amber-400" />
        <h4 className="text-sm font-semibold text-white">Regulatory Flags</h4>
      </div>
      <div className="space-y-2">
        {flags.map((flag, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg border ${
              flag.severity === 'critical'
                ? 'border-red-500/30 bg-red-500/10'
                : flag.severity === 'warning'
                  ? 'border-amber-500/30 bg-amber-500/10'
                  : 'border-blue-500/30 bg-blue-500/10'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <SeverityIcon severity={flag.severity} />
              <span className="text-xs font-semibold text-white">{flag.regulation}</span>
              <SeverityBadge severity={flag.severity} />
            </div>
            <p className="text-xs text-white">{flag.description}</p>
            {flag.room && (
              <p className="text-[10px] text-white mt-1.5 pt-1.5 border-t border-white/[0.06]">
                Room: {flag.room}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CableSizingTable({ items }: { items: SurveyAnalysisResult['cable_sizing'] }) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Cable className="h-4 w-4 text-blue-400" />
        <h4 className="text-sm font-semibold text-white">Cable Sizing</h4>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-2.5">
              <p className="text-xs font-semibold text-white flex-1">{item.circuit}</p>
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full flex-shrink-0">
                {String(item.csa_mm2).replace(/\s*mm²?\s*/gi, '')} mm²
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] text-white flex-shrink-0 w-16">Cable</span>
                <span className="text-xs text-white font-medium text-right">{item.cable_type}</span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] text-white flex-shrink-0 w-16">Ref Method</span>
                <span className="text-xs text-white font-medium text-right">{item.ref_method}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CircuitRecommendationsSection({
  items,
}: {
  items: SurveyAnalysisResult['circuit_recommendations'];
}) {
  if (items.length === 0) return null;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-elec-yellow" />
        <h4 className="text-sm font-semibold text-white">Circuit Recommendations</h4>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-xs font-semibold text-white">{item.room}</p>
              <span className="text-[10px] font-semibold text-elec-yellow bg-elec-yellow/20 px-2 py-0.5 rounded-full">
                {item.rating_a}A
              </span>
            </div>
            <div className="space-y-1">
              <div>
                <p className="text-[10px] text-white mb-0.5">Circuit Type</p>
                <p className="text-xs text-white font-medium">{item.circuit_type}</p>
              </div>
              <div>
                <p className="text-[10px] text-white mb-0.5">Protection</p>
                <p className="text-xs text-white font-medium">{item.protection}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CostSummaryCard({
  summary,
  labour,
}: {
  summary: SurveyAnalysisResult['cost_summary'];
  labour: SurveyAnalysisResult['labour_estimate'];
}) {
  const confidenceColour = {
    low: 'text-red-400',
    medium: 'text-amber-400',
    high: 'text-emerald-400',
  };
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <PoundSterling className="h-4 w-4 text-elec-yellow" />
        <h4 className="text-sm font-semibold text-white">Cost Summary</h4>
      </div>

      {/* Total card */}
      <div className="p-4 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30 text-center">
        <p className="text-xs text-white mb-1">Estimated Total</p>
        <p className="text-2xl font-bold text-elec-yellow">
          £
          {summary.total_gbp.toLocaleString('en-GB', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className={`text-[10px] ${confidenceColour[summary.confidence]} mt-1 capitalize`}>
          {summary.confidence} confidence
        </p>
      </div>

      {/* Breakdown */}
      <div className="space-y-1.5 text-xs">
        <div className="flex justify-between">
          <span className="text-white">Materials</span>
          <span className="text-white font-medium">£{summary.materials_gbp.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white">Labour ({labour.total_hours}h)</span>
          <span className="text-white font-medium">£{summary.labour_gbp.toFixed(2)}</span>
        </div>
      </div>

      {/* Labour breakdown */}
      {labour.breakdown.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-blue-400" />
            <p className="text-xs text-white font-semibold">Labour Breakdown</p>
            <span className="text-[10px] text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full font-semibold ml-auto">
              {labour.total_hours}h total
            </span>
          </div>
          <div className="space-y-1.5">
            {labour.breakdown.map((task, i) => (
              <div
                key={i}
                className="flex items-start gap-2 py-2 border-b border-white/[0.04] last:border-0"
              >
                <p className="text-xs text-white flex-1">{task.task}</p>
                <span className="text-xs text-white font-semibold flex-shrink-0 tabular-nums">
                  {task.hours}h
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function IssuesSection({ issues }: { issues: SurveyIssue[] }) {
  if (issues.length === 0) return null;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-amber-400" />
        <h4 className="text-sm font-semibold text-white">Issues & Actions</h4>
      </div>
      <div className="space-y-2">
        {issues.map((issue, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg border ${
              issue.severity === 'critical'
                ? 'border-red-500/30 bg-red-500/10'
                : issue.severity === 'warning'
                  ? 'border-amber-500/30 bg-amber-500/10'
                  : 'border-blue-500/30 bg-blue-500/10'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <SeverityIcon severity={issue.severity} />
              <SeverityBadge severity={issue.severity} />
            </div>
            <p className="text-xs text-white font-medium mb-1.5">{issue.description}</p>
            <div className="pt-1.5 border-t border-white/[0.06]">
              <p className="text-[10px] text-white mb-0.5">Recommended Action</p>
              <p className="text-xs text-white font-medium">{issue.action}</p>
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
    <div className="space-y-3">
      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
        <div className="flex items-center gap-2 mb-3">
          <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
          <span className="text-sm font-medium text-white flex-1">
            {currentStep || 'Starting analysis...'}
          </span>
          <span className="text-xs font-mono text-elec-yellow tabular-nums">{timeStr}</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-elec-yellow rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[11px] text-white">This can take up to 2 minutes</p>
          <p className="text-xs text-white font-medium">{progress}%</p>
        </div>
      </div>
    </div>
  );
}

export const SurveyAnalysisPanel = ({ visit }: SurveyAnalysisPanelProps) => {
  const { status, progress, currentStep, result, error, startAnalysis, isStarting } =
    useSiteSurveyAnalysis(visit.id);

  const hasData = visit.rooms.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-elec-yellow" />
        <h3 className="text-sm font-semibold text-white">AI Analysis</h3>
      </div>

      {/* Idle state — show run button */}
      {(status === 'idle' || status === 'failed') && (
        <div className="space-y-3">
          {error && (
            <div className="p-3 rounded-lg border border-red-500/30 bg-red-500/10">
              <p className="text-xs text-red-400">{error}</p>
            </div>
          )}
          <button
            onClick={() => startAnalysis(visit)}
            disabled={isStarting || !hasData}
            className="w-full h-12 rounded-xl bg-elec-yellow/20 border border-elec-yellow/40 text-sm font-semibold text-white flex items-center justify-center gap-2 touch-manipulation active:bg-elec-yellow/30 disabled:opacity-50"
          >
            {isStarting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Starting Analysis...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-elec-yellow" />
                Run AI Analysis
              </>
            )}
          </button>
          {!hasData && (
            <p className="text-xs text-white text-center">
              Add rooms and items first to run analysis
            </p>
          )}
        </div>
      )}

      {/* Processing state — progress bar + timer */}
      {(status === 'pending' || status === 'processing') && (
        <AnalysisProgress progress={progress} currentStep={currentStep} />
      )}

      {/* Results */}
      {status === 'completed' && result && (
        <div className="space-y-4">
          {/* Cost Summary first — most important */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <CostSummaryCard summary={result.cost_summary} labour={result.labour_estimate} />
          </div>

          {/* Materials */}
          {result.materials_list.length > 0 && (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <MaterialsTable items={result.materials_list} />
            </div>
          )}

          {/* Regulatory flags */}
          {result.regulatory_flags.length > 0 && (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <RegulatoryFlagsSection flags={result.regulatory_flags} />
            </div>
          )}

          {/* Cable sizing */}
          {result.cable_sizing.length > 0 && (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <CableSizingTable items={result.cable_sizing} />
            </div>
          )}

          {/* Circuit recommendations */}
          {result.circuit_recommendations.length > 0 && (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <CircuitRecommendationsSection items={result.circuit_recommendations} />
            </div>
          )}

          {/* Issues */}
          {result.issues.length > 0 && (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <IssuesSection issues={result.issues} />
            </div>
          )}

          {/* Re-run button */}
          <button
            onClick={() => startAnalysis(visit)}
            disabled={isStarting}
            className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm font-medium text-white flex items-center justify-center gap-2 touch-manipulation active:bg-white/[0.06]"
          >
            <Sparkles className="h-4 w-4" />
            Re-run Analysis
          </button>
        </div>
      )}
    </div>
  );
};
