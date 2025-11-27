import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TestResult } from "@/types/commissioning-response";

interface ExpectedReadingsCardProps {
  expectedResult?: TestResult | string;
  acceptanceCriteria: string;
}

export const ExpectedReadingsCard = ({ expectedResult, acceptanceCriteria }: ExpectedReadingsCardProps) => {
  if (!expectedResult) {
    return (
      <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4 sm:p-5">
        <div className="flex items-center gap-2 text-green-300 text-base font-semibold mb-2">
          <CheckCircle2 className="h-5 w-5" />
          Acceptance Criteria
        </div>
        <p className="text-sm sm:text-base text-foreground leading-relaxed">{acceptanceCriteria}</p>
      </div>
    );
  }

  // Handle string expected result
  if (typeof expectedResult === 'string') {
    return (
      <div className="bg-green-500/10 border-2 border-green-500/30 rounded-lg p-4 sm:p-5">
        <div className="flex items-center gap-2 text-green-300 text-base font-semibold mb-3">
          <CheckCircle2 className="h-5 w-5" />
          Expected Result
        </div>
        <p className="text-lg sm:text-xl font-bold text-green-300">{expectedResult}</p>
        <p className="text-sm text-foreground mt-3 leading-relaxed">{acceptanceCriteria}</p>
      </div>
    );
  }

  // Handle object expected result
  const calculated = expectedResult.calculated;
  const measured = expectedResult.measured;
  const maximumPermitted = expectedResult.maximumPermitted;
  const result = expectedResult.result;
  const passFail = expectedResult.passFail;
  const marginOfSafety = expectedResult.marginOfSafety;

  const isPassing = passFail?.toLowerCase().includes('pass');
  const isFailing = passFail?.toLowerCase().includes('fail');
  const isWarning = !isPassing && !isFailing && passFail;

  const statusColor = isPassing ? 'green' : isFailing ? 'red' : 'amber';
  const StatusIcon = isPassing ? CheckCircle2 : isFailing ? XCircle : AlertTriangle;

  return (
    <div className={cn(
      "border-2 rounded-lg p-4 sm:p-5",
      isPassing && "bg-green-500/10 border-green-500/30",
      isFailing && "bg-red-500/10 border-red-500/30",
      isWarning && "bg-amber-500/10 border-amber-500/30",
      !passFail && "bg-green-500/10 border-green-500/30"
    )}>
      {/* Header */}
      <div className="flex items-center gap-2 text-base font-semibold mb-4">
        <StatusIcon className={cn("h-5 w-5", `text-${statusColor}-300`)} />
        <span className={cn(`text-${statusColor}-300`)}>Expected Results</span>
      </div>

      {/* Main Readings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Expected/Calculated Reading */}
        {(calculated || measured) && (
          <div className="bg-background/50 rounded-lg p-4 text-center">
            <div className="text-xs sm:text-sm text-foreground/80 mb-1 uppercase tracking-wide">
              Expected Reading
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-green-300 tabular-nums">
              {calculated || measured}
            </div>
          </div>
        )}

        {/* Maximum Permitted */}
        {maximumPermitted && (
          <div className="bg-background/50 rounded-lg p-4 text-center">
            <div className="text-xs sm:text-sm text-foreground/80 mb-1 uppercase tracking-wide">
              Maximum Permitted
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
              {maximumPermitted}
            </div>
          </div>
        )}
      </div>

      {/* Result */}
      {result && (
        <div className="mb-4">
          <div className="text-sm text-foreground/80 mb-1">Result:</div>
          <div className="text-base sm:text-lg font-semibold text-green-300">{result}</div>
        </div>
      )}

      {/* Margin of Safety */}
      {marginOfSafety && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-foreground/80 mb-2">
            <span>Margin of Safety</span>
            <span className="font-semibold text-foreground">{marginOfSafety}</span>
          </div>
          {/* Visual progress bar */}
          <div className="h-2 bg-background/50 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-500",
                isPassing && "bg-green-500",
                isFailing && "bg-red-500",
                isWarning && "bg-amber-500"
              )}
              style={{ 
                width: `${Math.min(100, Math.max(0, parseFloat(marginOfSafety) || 0))}%` 
              }}
            />
          </div>
        </div>
      )}

      {/* Pass/Fail Status */}
      {passFail && (
        <div className={cn(
          "font-bold text-base sm:text-lg text-center py-2 rounded-lg",
          isPassing && "bg-green-500/20 text-green-300",
          isFailing && "bg-red-500/20 text-red-300",
          isWarning && "bg-amber-500/20 text-amber-300"
        )}>
          {passFail}
        </div>
      )}

      {/* Acceptance Criteria */}
      {acceptanceCriteria && (
        <div className="mt-4 pt-4 border-t border-border/40">
          <div className="text-sm text-foreground/80 mb-1">Acceptance Criteria:</div>
          <p className="text-sm text-foreground leading-relaxed">{acceptanceCriteria}</p>
        </div>
      )}
    </div>
  );
};
