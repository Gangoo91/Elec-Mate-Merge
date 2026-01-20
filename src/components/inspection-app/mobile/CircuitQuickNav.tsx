/**
 * CircuitQuickNav - Quick jump navigation sheet for circuits
 *
 * Bottom sheet with list of all circuits
 * Visual completion indicators (checkmarks, progress)
 * Tap to jump to specific circuit
 */

import React, { useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, Zap, AlertTriangle } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { cn } from '@/lib/utils';

interface CircuitQuickNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  circuits: TestResult[];
  currentIndex: number;
  onSelectCircuit: (index: number) => void;
}

// Calculate circuit completion percentage
const getCircuitCompletion = (circuit: TestResult) => {
  const checks = {
    designation: !!circuit.circuitDesignation,
    description: !!circuit.circuitDescription,
    conductors: !!(circuit.liveSize && circuit.cpcSize),
    device: !!(circuit.bsStandard && circuit.protectiveDeviceRating),
    continuity: !!(circuit.r1r2 || (circuit.ringR1 && circuit.ringR2)),
    insulation: !!(circuit.insulationLiveEarth || circuit.insulationLiveNeutral),
    polarity: !!circuit.polarity,
    zs: !!circuit.zs,
  };

  const completed = Object.values(checks).filter(Boolean).length;
  const total = Object.keys(checks).length;

  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100),
    isComplete: completed === total,
    hasIssues: (circuit.zs && circuit.maxZs && parseFloat(circuit.zs) > parseFloat(circuit.maxZs)),
  };
};

const CircuitQuickNav: React.FC<CircuitQuickNavProps> = ({
  open,
  onOpenChange,
  circuits,
  currentIndex,
  onSelectCircuit,
}) => {
  // Overall progress stats
  const stats = useMemo(() => {
    const completions = circuits.map(getCircuitCompletion);
    const fullyComplete = completions.filter(c => c.isComplete).length;
    const withIssues = completions.filter(c => c.hasIssues).length;
    const avgCompletion = circuits.length > 0
      ? Math.round(completions.reduce((sum, c) => sum + c.percentage, 0) / circuits.length)
      : 0;

    return { fullyComplete, withIssues, avgCompletion, total: circuits.length };
  }, [circuits]);

  const handleSelect = (index: number) => {
    onSelectCircuit(index);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[70vh] p-0 rounded-t-2xl overflow-hidden"
      >
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="px-4 py-3 border-b border-border/50 bg-muted/30">
            <SheetTitle className="text-lg font-semibold">All Circuits</SheetTitle>
            {/* Progress Summary */}
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                {stats.fullyComplete}/{stats.total} complete
              </span>
              {stats.withIssues > 0 && (
                <span className="flex items-center gap-1 text-amber-400">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  {stats.withIssues} with issues
                </span>
              )}
              <span className="ml-auto text-xs bg-muted px-2 py-0.5 rounded-full">
                {stats.avgCompletion}% avg
              </span>
            </div>
          </SheetHeader>

          {/* Circuit List */}
          <ScrollArea className="flex-1 px-2 py-2">
            {circuits.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                <Zap className="h-8 w-8 mb-2 opacity-50" />
                <p className="text-sm">No circuits yet</p>
                <p className="text-xs">Add circuits to see them here</p>
              </div>
            ) : (
              <div className="space-y-1">
                {circuits.map((circuit, index) => {
                  const completion = getCircuitCompletion(circuit);
                  const isCurrent = index === currentIndex;
                  const isThreePhase = circuit.phaseType === '3P';

                  return (
                    <button
                      key={circuit.id}
                      onClick={() => handleSelect(index)}
                      className={cn(
                        "w-full px-3 py-3 rounded-lg flex items-center gap-3",
                        "touch-manipulation transition-all duration-150",
                        "active:scale-[0.98]",
                        isCurrent
                          ? "bg-primary/20 border-2 border-primary/50"
                          : "bg-card hover:bg-muted/50 border border-border/30"
                      )}
                    >
                      {/* Completion indicator */}
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                        "text-sm font-bold",
                        completion.isComplete
                          ? "bg-green-500/20 text-green-400"
                          : completion.hasIssues
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {completion.isComplete ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          circuit.circuitDesignation || `${index + 1}`
                        )}
                      </div>

                      {/* Circuit info */}
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground truncate">
                            {circuit.circuitDesignation || `Circuit ${index + 1}`}
                          </span>
                          {isThreePhase && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 border-purple-500/50 text-purple-400">
                              3PH
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {circuit.circuitDescription || 'No description'}
                        </p>
                        {/* Quick info */}
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-muted-foreground">
                          {circuit.protectiveDeviceRating && (
                            <span>{circuit.protectiveDeviceRating}A</span>
                          )}
                          {circuit.liveSize && (
                            <span>{circuit.liveSize}mm²</span>
                          )}
                          {circuit.zs && (
                            <span className={cn(
                              completion.hasIssues && "text-amber-400"
                            )}>
                              Zs: {circuit.zs}Ω
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Completion percentage */}
                      <div className={cn(
                        "flex-shrink-0 text-right",
                        completion.isComplete
                          ? "text-green-400"
                          : completion.percentage >= 50
                          ? "text-amber-400"
                          : "text-muted-foreground"
                      )}>
                        <div className="text-sm font-semibold">
                          {completion.percentage}%
                        </div>
                        <div className="text-[10px]">
                          {completion.completed}/{completion.total}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          {/* Footer hint */}
          <div className="px-4 py-2 border-t border-border/50 bg-muted/20">
            <p className="text-xs text-center text-muted-foreground">
              Tap a circuit to jump to it
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CircuitQuickNav;
