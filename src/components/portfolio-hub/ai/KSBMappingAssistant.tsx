import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import {
  Brain,
  Search,
  CheckCircle2,
  Circle,
  ChevronRight,
  BookOpen,
  Loader2,
} from 'lucide-react';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import {
  useQualificationACs,
  type QualificationUnit,
} from '@/hooks/qualification/useQualificationACs';

/**
 * KSB Mapping Assistant
 *
 * Shows real assessment criteria from qualification_requirements,
 * grouped by Unit, with progress tracking against evidenced ACs.
 */

interface KSBMappingAssistantProps {
  selectedKSBs?: string[];
  completedKSBs?: string[];
  onSelectKSB?: (code: string) => void;
  onDeselectKSB?: (code: string) => void;
  compact?: boolean;
}

export function KSBMappingAssistant({
  selectedKSBs = [],
  completedKSBs = [],
  onSelectKSB,
  onDeselectKSB,
  compact = false,
}: KSBMappingAssistantProps) {
  const { qualificationCode } = useStudentQualification();
  const { tree, isLoading } = useQualificationACs(qualificationCode);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);

  const completedSet = useMemo(() => new Set(completedKSBs), [completedKSBs]);

  // Calculate progress
  const totalACs = tree.totalACs;
  const completedCount = completedKSBs.length;
  const progressPercent = totalACs > 0 ? Math.round((completedCount / totalACs) * 100) : 0;

  // Filter units based on search
  const filteredUnits = useMemo(() => {
    if (!searchTerm.trim()) return tree.units;

    const q = searchTerm.toLowerCase();
    return tree.units
      .map((unit) => ({
        ...unit,
        learningOutcomes: unit.learningOutcomes
          .map((lo) => ({
            ...lo,
            assessmentCriteria: lo.assessmentCriteria.filter(
              (ac) =>
                ac.acText.toLowerCase().includes(q) ||
                ac.acFullRef.toLowerCase().includes(q),
            ),
          }))
          .filter(
            (lo) =>
              lo.assessmentCriteria.length > 0 ||
              lo.loText.toLowerCase().includes(q),
          ),
      }))
      .filter(
        (unit) =>
          unit.learningOutcomes.length > 0 ||
          unit.unitTitle.toLowerCase().includes(q) ||
          unit.unitCode.toLowerCase().includes(q),
      );
  }, [tree.units, searchTerm]);

  const toggleKSB = (code: string) => {
    if (selectedKSBs.includes(code)) {
      onDeselectKSB?.(code);
    } else {
      onSelectKSB?.(code);
    }
  };

  if (compact) {
    return (
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Brain className="h-4 w-4 text-elec-yellow" />
            Assessment Criteria Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center gap-2 py-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Loading...</span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Progress value={progressPercent} className="h-2 flex-1" />
                <span className="text-sm font-medium text-foreground">{progressPercent}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {completedCount} of {totalACs} criteria evidenced
              </p>
            </>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Assessment Criteria
          <Badge variant="outline" className="ml-auto">
            {completedCount}/{totalACs}
          </Badge>
        </CardTitle>
        <CardDescription>
          Track your progress against real qualification assessment criteria
        </CardDescription>

        {/* Progress Bar */}
        <div className="mt-3 space-y-2">
          <Progress value={progressPercent} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{progressPercent}% Complete</span>
            <span>{totalACs - completedCount} remaining</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          {!searchTerm && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            placeholder="Search criteria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(!searchTerm && "pl-9")}
          />
        </div>

        {/* Units */}
        <ScrollArea className="h-[400px] pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
            </div>
          ) : filteredUnits.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                {qualificationCode
                  ? 'No matching criteria found'
                  : 'Select a qualification to view criteria'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredUnits.map((unit) => {
                const isExpanded = expandedUnit === unit.unitCode;
                const unitACs = unit.learningOutcomes.flatMap(
                  (lo) => lo.assessmentCriteria,
                );
                const completedInUnit = unitACs.filter((ac) =>
                  completedSet.has(ac.acFullRef),
                ).length;

                return (
                  <div
                    key={unit.unitCode}
                    className="border border-border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedUnit(isExpanded ? null : unit.unitCode)
                      }
                      className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors touch-manipulation active:bg-muted/70"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
                          <BookOpen className="h-4 w-4 text-elec-yellow" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold text-elec-yellow">
                            Unit {unit.unitCode}
                          </p>
                          <p className="text-sm font-medium text-foreground line-clamp-1">
                            {unit.unitTitle}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {completedInUnit}/{unitACs.length} evidenced
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform',
                          isExpanded && 'rotate-90',
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className="border-t border-border divide-y divide-border">
                        {unit.learningOutcomes.map((lo) => (
                          <div key={`${unit.unitCode}-${lo.loNumber}`}>
                            {lo.loNumber && (
                              <div className="px-3 py-2 pl-12 bg-muted/20">
                                <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                                  LO{lo.loNumber}
                                </p>
                                <p className="text-xs text-foreground/80">
                                  {lo.loText}
                                </p>
                              </div>
                            )}
                            {lo.assessmentCriteria.map((ac) => {
                              const isSelected = selectedKSBs.includes(
                                ac.acFullRef,
                              );
                              const isCompleted = completedSet.has(
                                ac.acFullRef,
                              );

                              return (
                                <div
                                  key={ac.acFullRef}
                                  className={cn(
                                    'p-3 pl-12 transition-colors cursor-pointer touch-manipulation active:bg-muted/50',
                                    isSelected && 'bg-elec-yellow/10',
                                    isCompleted && 'bg-green-500/5',
                                  )}
                                  onClick={() => toggleKSB(ac.acFullRef)}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="mt-0.5 shrink-0">
                                      {isCompleted ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                      ) : isSelected ? (
                                        <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
                                      ) : (
                                        <Circle className="h-5 w-5 text-muted-foreground" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <Badge
                                        variant="outline"
                                        className="font-mono text-xs mb-1"
                                      >
                                        {ac.acFullRef}
                                      </Badge>
                                      <p className="text-sm text-foreground">
                                        {ac.acText}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default KSBMappingAssistant;
