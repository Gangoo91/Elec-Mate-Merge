/**
 * EvidenceValidationReport
 *
 * 85vh bottom sheet showing AI evidence quality validation results.
 * Per-AC breakdown with sufficiency scores and improvement actions.
 */

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  X,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Loader2,
  Lightbulb,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  EvidenceValidationResult,
  ACValidation,
} from '@/hooks/portfolio/useEvidenceValidator';
import {
  getGradeColour,
  getStatusColour,
} from '@/hooks/portfolio/useEvidenceValidator';

interface EvidenceValidationReportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: EvidenceValidationResult | null;
  isLoading: boolean;
  onValidate?: () => void;
}

const STATUS_LABELS: Record<string, string> = {
  sufficient: 'Sufficient',
  minor_gaps: 'Minor Gaps',
  significant_gaps: 'Significant Gaps',
  insufficient: 'Insufficient',
};

const STATUS_ICONS: Record<string, typeof CheckCircle2> = {
  sufficient: CheckCircle2,
  minor_gaps: AlertTriangle,
  significant_gaps: AlertCircle,
  insufficient: XCircle,
};

const GRADE_LABELS: Record<string, string> = {
  A: 'Ready for Submission',
  B: 'Minor Gaps',
  C: 'Significant Gaps',
  D: 'Insufficient Evidence',
};

const PRIORITY_COLOURS: Record<string, string> = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

export function EvidenceValidationReport({
  open,
  onOpenChange,
  result,
  isLoading,
  onValidate,
}: EvidenceValidationReportProps) {
  const [expandedAC, setExpandedAC] = useState<string | null>(null);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
      >
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-5 w-5 text-elec-yellow" />
                Evidence Quality Report
              </SheetTitle>
              <button
                onClick={() => onOpenChange(false)}
                className="h-11 w-11 flex items-center justify-center rounded-xl hover:bg-muted touch-manipulation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-elec-yellow" />
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    Analysing evidence quality...
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    Checking each AC against assessor standards
                  </p>
                </div>
              </div>
            ) : !result ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="h-16 w-16 rounded-2xl bg-elec-yellow/10 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-elec-yellow" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    Validate your evidence
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    AI will check if your evidence meets each claimed AC
                  </p>
                </div>
                {onValidate && (
                  <button
                    onClick={onValidate}
                    className="h-11 px-6 rounded-xl bg-elec-yellow text-black font-medium text-sm touch-manipulation active:scale-95"
                  >
                    Start Validation
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Grade Badge */}
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'h-20 w-20 rounded-2xl flex flex-col items-center justify-center border',
                      getGradeColour(result.overallGrade).bg,
                      getGradeColour(result.overallGrade).border
                    )}
                  >
                    <span
                      className={cn(
                        'text-3xl font-bold',
                        getGradeColour(result.overallGrade).text
                      )}
                    >
                      {result.overallGrade}
                    </span>
                    <span className="text-[10px] text-white/40">
                      {result.overallScore}/100
                    </span>
                  </div>
                  <div className="flex-1">
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        getGradeColour(result.overallGrade).text
                      )}
                    >
                      {GRADE_LABELS[result.overallGrade]}
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">
                      {result.acValidations.length} assessment criteria checked
                    </p>
                  </div>
                </div>

                {/* Assessor Summary */}
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-elec-yellow" />
                    <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                      Assessor Summary
                    </span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {result.assessorSummary}
                  </p>
                </div>

                {/* Per-AC Breakdown */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                    Per-AC Breakdown
                  </h3>
                  {result.acValidations.map((ac) => (
                    <ACValidationCard
                      key={ac.acCode}
                      ac={ac}
                      expanded={expandedAC === ac.acCode}
                      onToggle={() =>
                        setExpandedAC(
                          expandedAC === ac.acCode ? null : ac.acCode
                        )
                      }
                    />
                  ))}
                </div>

                {/* Improvement Actions */}
                {result.improvementActions.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5" />
                      Improvement Actions
                    </h3>
                    <div className="space-y-2">
                      {result.improvementActions.map((action, i) => (
                        <div
                          key={i}
                          className={cn(
                            'flex items-start gap-3 p-3 rounded-lg border',
                            PRIORITY_COLOURS[action.priority]
                          )}
                        >
                          <span className="flex items-center justify-center h-5 w-5 rounded-full bg-white/10 text-[10px] font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-foreground">
                              {action.action}
                            </p>
                            {action.acCode && (
                              <p className="text-[10px] text-white/30 mt-0.5">
                                Related to: {action.acCode}
                              </p>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className="text-[10px] shrink-0"
                          >
                            {action.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Processing time */}
                <p className="text-[10px] text-white/20 text-center">
                  Analysed in {(result.processingTimeMs / 1000).toFixed(1)}s
                </p>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// --- AC Validation Card ---
function ACValidationCard({
  ac,
  expanded,
  onToggle,
}: {
  ac: ACValidation;
  expanded: boolean;
  onToggle: () => void;
}) {
  const StatusIcon = STATUS_ICONS[ac.status] || AlertCircle;
  const statusColour = getStatusColour(ac.status);

  return (
    <div className="rounded-xl border border-white/10 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3 text-left touch-manipulation active:bg-white/[0.02]"
      >
        <StatusIcon
          className={cn('h-4 w-4 shrink-0', statusColour.text)}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {ac.acCode}
          </p>
          <p className="text-xs text-white/40 truncate">{ac.acText}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Score bar */}
          <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className={cn('h-full rounded-full', statusColour.bg)}
              style={{ width: `${ac.sufficiencyScore}%` }}
            />
          </div>
          <span className="text-xs text-white/40 w-8 text-right">
            {ac.sufficiencyScore}
          </span>
          {expanded ? (
            <ChevronDown className="h-4 w-4 text-white/30" />
          ) : (
            <ChevronRight className="h-4 w-4 text-white/30" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-2 border-t border-white/5 pt-2">
          <Badge
            variant="outline"
            className={cn('text-[10px]', statusColour.text)}
          >
            {STATUS_LABELS[ac.status]}
          </Badge>
          <p className="text-sm text-white/60">{ac.feedback}</p>
          {ac.suggestedAdditions?.length > 0 && (
            <div className="space-y-1">
              <p className="text-[10px] text-white/30 font-semibold uppercase tracking-wider">
                Suggested Additions
              </p>
              {ac.suggestedAdditions.map((addition, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-xs text-white/50"
                >
                  <span className="text-elec-yellow mt-0.5">•</span>
                  {addition}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default EvidenceValidationReport;
