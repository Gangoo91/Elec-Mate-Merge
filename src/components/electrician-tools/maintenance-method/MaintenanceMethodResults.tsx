import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MaintenanceMethodData, MaintenanceStep } from '@/types/maintenance-method';
import { MaintenanceStepCard } from './MaintenanceStepCard';
import {
  FileText,
  Download,
  Clock,
  Wrench,
  ShieldAlert,
  AlertTriangle,
  Plus,
  ChevronDown,
  ChevronUp,
  Copy,
  RotateCcw,
} from 'lucide-react';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { cn } from '@/lib/utils';
import { StickyGenerateButton } from '../commissioning/StickyGenerateButton';

interface MaintenanceMethodResultsProps {
  methodData: MaintenanceMethodData;
  onExportPDF?: () => void;
  onReset?: () => void;
}

// Helper to extract short duration from long text
const getShortDuration = (duration: string): string => {
  const match = duration.match(
    /(\d+\.?\d*\s*(?:to|-)\s*\d+\.?\d*\s*(?:hours?|hrs?|minutes?|mins?))/i
  );
  if (match) return match[1];
  const hoursMatch = duration.match(/(\d+\.?\d*)\s*(?:hours?|hrs?)/i);
  if (hoursMatch) return `${hoursMatch[1]} hrs`;
  return duration.length > 20 ? duration.slice(0, 20) + '...' : duration;
};

export const MaintenanceMethodResults = ({
  methodData,
  onExportPDF,
  onReset,
}: MaintenanceMethodResultsProps) => {
  const { maintenanceGuide, executiveSummary, summary, recommendations } = methodData;
  const { isMobile } = useMobileEnhanced();

  // Step management state
  const [steps, setSteps] = useState<MaintenanceStep[]>(methodData.steps);
  const [durationExpanded, setDurationExpanded] = useState(false);
  const [overviewExpanded, setOverviewExpanded] = useState(false);

  const updateStep = (index: number, updated: MaintenanceStep) => {
    setSteps((prev) => prev.map((step, i) => (i === index ? updated : step)));
  };

  const deleteStep = (index: number) => {
    setSteps((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((step, i) => ({
          ...step,
          stepNumber: i + 1,
        }))
    );
  };

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newSteps.length) return;

    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];

    // Renumber steps
    const renumbered = newSteps.map((step, i) => ({
      ...step,
      stepNumber: i + 1,
    }));

    setSteps(renumbered);
  };

  const addNewStep = () => {
    const newStep: MaintenanceStep = {
      stepNumber: steps.length + 1,
      title: 'New Step',
      content: 'Add step description here...',
      estimatedDuration: '10-15 minutes',
      riskLevel: 'low',
    };
    setSteps((prev) => [...prev, newStep]);
  };

  return (
    <div className={cn('space-y-6', isMobile ? 'space-y-4 pb-32' : 'pb-8')}>
      {/* Header */}
      <div className="flex items-start gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Wrench className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Maintenance Method</h1>
            <p className="text-sm text-white">Generated maintenance procedure</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="h-9 px-3 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] flex items-center gap-1.5 text-sm touch-manipulation active:scale-[0.98] transition-all">
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
          {onReset && (
            <button
              onClick={onReset}
              className="h-9 px-3 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] flex items-center gap-1.5 text-sm touch-manipulation active:scale-[0.98] transition-all"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Start Over
            </button>
          )}
        </div>
      </div>

      {/* Overview text */}
      <div className="text-sm text-white leading-relaxed text-left">
        {isMobile && !overviewExpanded ? (
          <>
            <p className="line-clamp-4">{maintenanceGuide}</p>
            {maintenanceGuide.length > 200 && (
              <button
                onClick={() => setOverviewExpanded(true)}
                className="text-emerald-400 mt-2 font-medium text-sm"
              >
                Show more
              </button>
            )}
          </>
        ) : (
          <>
            <p>{maintenanceGuide}</p>
            {isMobile && maintenanceGuide.length > 200 && (
              <button
                onClick={() => setOverviewExpanded(false)}
                className="text-emerald-400 mt-2 font-medium text-sm"
              >
                Show less
              </button>
            )}
          </>
        )}
      </div>

      {/* Executive Summary */}
      <div>
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5 mb-3">
          Executive Summary
        </h2>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] p-4 space-y-4">
          <h3 className="text-base font-bold text-white">{executiveSummary.equipmentType}</h3>

          {/* Key Information */}
          <div className="grid gap-3 sm:grid-cols-2 text-left">
            <div className="space-y-0.5">
              <span className="text-xs font-medium text-white uppercase tracking-wide">
                Equipment Type
              </span>
              <p className="text-sm text-white">{executiveSummary.equipmentType}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-medium text-white uppercase tracking-wide">
                Maintenance Type
              </span>
              <p className="text-sm text-white">{executiveSummary.maintenanceType}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-medium text-white uppercase tracking-wide">
                Frequency
              </span>
              <p className="text-sm text-white">{executiveSummary.recommendedFrequency}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-medium text-white uppercase tracking-wide">
                Condition
              </span>
              <p className="text-sm text-white">{executiveSummary.overallCondition}</p>
            </div>

            {executiveSummary.estimatedAge && (
              <div className="space-y-0.5">
                <span className="text-xs font-medium text-white uppercase tracking-wide">
                  Estimated Age
                </span>
                <p className="text-sm text-white">{executiveSummary.estimatedAge}</p>
              </div>
            )}
          </div>

          {/* Critical Findings */}
          {executiveSummary.criticalFindings && executiveSummary.criticalFindings.length > 0 && (
            <div className="space-y-2 p-3 rounded-lg bg-destructive/5 border border-destructive/30 text-left">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-xs font-bold text-destructive uppercase tracking-wide">
                  Critical Findings
                </span>
              </div>
              <ul className="space-y-1.5">
                {executiveSummary.criticalFindings.map((finding, idx) => (
                  <li key={idx} className="text-sm text-white flex items-start gap-2">
                    <span className="text-destructive mt-0.5 font-bold">•</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Summary Overview */}
      <div>
        <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5 mb-3">
          Maintenance Overview
        </h2>
        <div className={cn('space-y-4', isMobile && 'space-y-3')}>
          {isMobile ? (
            /* Mobile-optimised compact layout */
            <div className="space-y-3">
              {/* Compact stats row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-xl font-bold text-white">{summary.totalSteps}</p>
                    <p className="text-xs text-white">Steps</p>
                  </div>
                </div>
                <Badge
                  variant={
                    summary.overallRiskLevel === 'high'
                      ? 'destructive'
                      : summary.overallRiskLevel === 'medium'
                        ? 'default'
                        : 'secondary'
                  }
                  className="text-xs px-2 py-1"
                >
                  {summary.overallRiskLevel.toUpperCase()} RISK
                </Badge>
              </div>

              {/* Expandable duration section */}
              <div
                className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.08] touch-manipulation cursor-pointer"
                onClick={() => setDurationExpanded(!durationExpanded)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-white">
                      {getShortDuration(summary.estimatedDuration)}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    {durationExpanded ? (
                      <ChevronUp className="h-4 w-4 text-white" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white" />
                    )}
                  </Button>
                </div>
                {durationExpanded && (
                  <p className="text-xs text-white mt-2 leading-relaxed animate-fade-in">
                    {summary.estimatedDuration}
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* Desktop layout */
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-white">{summary.totalSteps}</p>
                  <p className="text-xs text-white">Total Steps</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-lg font-semibold text-white">{summary.estimatedDuration}</p>
                  <p className="text-xs text-white">Duration</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <ShieldAlert className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <Badge
                    variant={
                      summary.overallRiskLevel === 'high'
                        ? 'destructive'
                        : summary.overallRiskLevel === 'medium'
                          ? 'default'
                          : 'secondary'
                    }
                  >
                    {summary.overallRiskLevel.toUpperCase()}
                  </Badge>
                  <p className="text-xs text-white mt-1">Risk Level</p>
                </div>
              </div>
            </div>
          )}

          {summary.toolsRequired && summary.toolsRequired.length > 0 && (
            <div
              className={cn(
                'space-y-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-left',
                isMobile ? 'p-2.5' : 'p-3'
              )}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Wrench className="h-4 w-4 text-emerald-400" />
                Required Tools ({summary.toolsRequired.length})
              </div>
              <div className={cn('flex flex-wrap gap-1.5', isMobile ? 'ml-4' : 'ml-6')}>
                {summary.toolsRequired.map((tool, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className={cn(
                      'bg-emerald-500/15 text-white border-emerald-500/30',
                      isMobile && 'text-xs'
                    )}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Maintenance Steps */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">
            Detailed Maintenance Steps
          </h2>
          <button
            onClick={addNewStep}
            className="h-9 px-3 rounded-lg bg-white/[0.06] text-white ring-1 ring-white/[0.08] flex items-center gap-1.5 text-sm touch-manipulation active:scale-[0.98] transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Step
          </button>
        </div>
        {steps.map((step, index) => (
          <MaintenanceStepCard
            key={step.stepNumber}
            step={step}
            onUpdate={(updated) => updateStep(index, updated)}
            onDelete={() => deleteStep(index)}
            onMoveUp={index > 0 ? () => moveStep(index, 'up') : undefined}
            onMoveDown={index < steps.length - 1 ? () => moveStep(index, 'down') : undefined}
          />
        ))}
      </div>

      {/* Recommendations */}
      {recommendations && recommendations.length > 0 && (
        <div>
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5 mb-3">
            Recommendations
          </h2>
          <ul className="space-y-2 text-left">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="text-sm text-white flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sticky Download PDF Button */}
      {onExportPDF && (
        <StickyGenerateButton>
          <Button
            onClick={onExportPDF}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:scale-[1.02] active:scale-95 transition-all rounded-xl"
          >
            <Download className="h-5 w-5 mr-2" />
            Download PDF
          </Button>
        </StickyGenerateButton>
      )}
    </div>
  );
};
