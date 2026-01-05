import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Search,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Zap,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { bs7671InspectionSections } from '@/data/bs7671ChecklistData';

interface InspectionsStepProps {
  data: Record<string, any>;
  onChange: (updates: Record<string, any>) => void;
  isMobile: boolean;
  onOpenFaultFinder?: () => void;
}

type OutcomeType = 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';

/**
 * Step: Inspections
 * Full BS7671 inspection checklist with mobile-optimized UI
 */
export const InspectionsStep: React.FC<InspectionsStepProps> = ({
  data,
  onChange,
  isMobile,
  onOpenFaultFinder,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const inspectionItems = data.inspectionItems || [];

  // Calculate stats
  const stats = {
    total: inspectionItems.length || bs7671InspectionSections.reduce((t, s) => t + s.items.length, 0),
    completed: inspectionItems.filter((i: any) => i.outcome && i.outcome !== '').length,
    satisfactory: inspectionItems.filter((i: any) => i.outcome === 'satisfactory').length,
    c1: inspectionItems.filter((i: any) => i.outcome === 'C1').length,
    c2: inspectionItems.filter((i: any) => i.outcome === 'C2').length,
    c3: inspectionItems.filter((i: any) => i.outcome === 'C3').length,
    na: inspectionItems.filter((i: any) => i.outcome === 'not-applicable').length,
  };

  const progress = stats.total > 0 ? (stats.completed / stats.total) * 100 : 0;

  // Initialize inspection items if not present
  React.useEffect(() => {
    if (!data.inspectionItems || data.inspectionItems.length === 0) {
      const initialItems = bs7671InspectionSections.flatMap(section =>
        section.items.map(item => ({
          id: item.id,
          section: section.title,
          item: item.item,
          clause: item.clause,
          inspected: false,
          outcome: '' as OutcomeType,
          notes: ''
        }))
      );
      onChange({ inspectionItems: initialItems });
    }
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const updateItemOutcome = (itemId: string, outcome: OutcomeType) => {
    const items = [...inspectionItems];
    const index = items.findIndex((i: any) => i.id === itemId);
    if (index !== -1) {
      items[index] = {
        ...items[index],
        outcome,
        inspected: outcome !== '' && outcome !== 'not-applicable'
      };
      onChange({ inspectionItems: items });

      // Auto-create observation for C1/C2/C3
      if (['C1', 'C2', 'C3'].includes(outcome)) {
        const existingObservations = data.defectObservations || [];
        const existingObs = existingObservations.find((o: any) => o.inspectionItemId === itemId);
        if (!existingObs) {
          const item = items[index];
          const newObservation = {
            id: Date.now().toString(),
            item: item.item,
            defectCode: outcome,
            description: `${item.item} - requires attention`,
            recommendation: 'Investigate and rectify as required to comply with BS 7671',
            rectified: false,
            inspectionItemId: itemId
          };
          onChange({ defectObservations: [...existingObservations, newObservation] });
        }
      }
    }
  };

  const bulkMarkSatisfactory = (sectionId: string) => {
    const section = bs7671InspectionSections.find(s => s.id === sectionId);
    if (!section) return;

    const items = [...inspectionItems];
    section.items.forEach(sItem => {
      const index = items.findIndex((i: any) => i.id === sItem.id);
      if (index !== -1) {
        items[index] = { ...items[index], outcome: 'satisfactory', inspected: true };
      }
    });
    onChange({ inspectionItems: items });
  };

  const bulkMarkNA = (sectionId: string) => {
    const section = bs7671InspectionSections.find(s => s.id === sectionId);
    if (!section) return;

    const items = [...inspectionItems];
    section.items.forEach(sItem => {
      const index = items.findIndex((i: any) => i.id === sItem.id);
      if (index !== -1) {
        items[index] = { ...items[index], outcome: 'not-applicable', inspected: false };
      }
    });
    onChange({ inspectionItems: items });
  };

  // Get section stats
  const getSectionStats = (sectionId: string) => {
    const section = bs7671InspectionSections.find(s => s.id === sectionId);
    if (!section) return { total: 0, completed: 0, issues: 0 };

    const sectionItemIds = section.items.map(i => i.id);
    const sectionItems = inspectionItems.filter((i: any) => sectionItemIds.includes(i.id));

    return {
      total: section.items.length,
      completed: sectionItems.filter((i: any) => i.outcome && i.outcome !== '').length,
      issues: sectionItems.filter((i: any) => ['C1', 'C2', 'C3'].includes(i.outcome)).length
    };
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Inspection Progress</h3>
            <span className="text-sm text-muted-foreground">
              {stats.completed} / {stats.total} items
            </span>
          </div>
          <Progress value={progress} className="h-2 mb-4" />

          {/* Stats Row */}
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="p-2 rounded bg-green-50 dark:bg-green-950/30">
              <p className="text-lg font-bold text-green-600 dark:text-green-400">{stats.satisfactory}</p>
              <p className="text-xs text-muted-foreground">Pass</p>
            </div>
            <div className="p-2 rounded bg-red-50 dark:bg-red-950/30">
              <p className="text-lg font-bold text-red-600 dark:text-red-400">{stats.c1}</p>
              <p className="text-xs text-muted-foreground">C1</p>
            </div>
            <div className="p-2 rounded bg-orange-50 dark:bg-orange-950/30">
              <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{stats.c2}</p>
              <p className="text-xs text-muted-foreground">C2</p>
            </div>
            <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/30">
              <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{stats.c3}</p>
              <p className="text-xs text-muted-foreground">C3</p>
            </div>
            <div className="p-2 rounded bg-gray-50 dark:bg-gray-950/30">
              <p className="text-lg font-bold text-gray-600 dark:text-gray-400">{stats.na}</p>
              <p className="text-xs text-muted-foreground">N/A</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Fault Finder Quick Access */}
      {onOpenFaultFinder && (
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-background">
          <CardContent className="py-4">
            <button
              onClick={onOpenFaultFinder}
              className="w-full flex items-center gap-3 text-left"
            >
              <div className="p-2 rounded-lg bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">AI Fault Finder</p>
                <p className="text-sm text-muted-foreground">
                  Get help diagnosing issues
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          </CardContent>
        </Card>
      )}

      {/* Inspection Sections */}
      <div className="space-y-3">
        {bs7671InspectionSections.map(section => {
          const sectionStats = getSectionStats(section.id);
          const isExpanded = expandedSections[section.id];
          const sectionProgress = sectionStats.total > 0
            ? (sectionStats.completed / sectionStats.total) * 100
            : 0;

          return (
            <Card key={section.id}>
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 flex items-center gap-3 text-left hover:bg-accent/50 transition-colors"
              >
                <div className={cn(
                  'p-2 rounded-lg',
                  sectionStats.issues > 0
                    ? 'bg-red-100 dark:bg-red-900/30'
                    : sectionProgress === 100
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-muted'
                )}>
                  {sectionStats.issues > 0 ? (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  ) : sectionProgress === 100 ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Search className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{section.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={sectionProgress} className="h-1.5 flex-1" />
                    <span className="text-xs text-muted-foreground shrink-0">
                      {sectionStats.completed}/{sectionStats.total}
                    </span>
                  </div>
                </div>
                {sectionStats.issues > 0 && (
                  <Badge variant="destructive" className="shrink-0">
                    {sectionStats.issues} issue{sectionStats.issues > 1 ? 's' : ''}
                  </Badge>
                )}
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </button>

              {/* Expanded Section Content */}
              {isExpanded && (
                <CardContent className="pt-0 space-y-3">
                  {/* Quick Actions */}
                  <div className="flex gap-2 pb-3 border-b">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => bulkMarkSatisfactory(section.id)}
                      className="gap-1 text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <CheckCircle className="h-3 w-3" />
                      All Satisfactory
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => bulkMarkNA(section.id)}
                      className="gap-1"
                    >
                      <XCircle className="h-3 w-3" />
                      All N/A
                    </Button>
                  </div>

                  {/* Inspection Items */}
                  <div className="space-y-2">
                    {section.items.map(item => {
                      const itemData = inspectionItems.find((i: any) => i.id === item.id);
                      const outcome = itemData?.outcome || '';

                      return (
                        <div
                          key={item.id}
                          className={cn(
                            'p-3 rounded-lg border',
                            outcome === 'satisfactory' && 'bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-800',
                            outcome === 'C1' && 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800',
                            outcome === 'C2' && 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800',
                            outcome === 'C3' && 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800',
                            outcome === 'not-applicable' && 'bg-gray-50/50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800',
                            !outcome && 'bg-background border-border'
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <Badge variant="outline" className="shrink-0 mt-0.5">
                              {item.clause}
                            </Badge>
                            <p className="text-sm flex-1">{item.item}</p>
                          </div>

                          {/* Outcome Buttons */}
                          <div className={cn(
                            'grid gap-1 mt-3',
                            isMobile ? 'grid-cols-3' : 'grid-cols-6'
                          )}>
                            <OutcomeButton
                              label="Pass"
                              value="satisfactory"
                              selected={outcome === 'satisfactory'}
                              onClick={() => updateItemOutcome(item.id, 'satisfactory')}
                              variant="success"
                              isMobile={isMobile}
                            />
                            <OutcomeButton
                              label="C1"
                              value="C1"
                              selected={outcome === 'C1'}
                              onClick={() => updateItemOutcome(item.id, 'C1')}
                              variant="danger"
                              isMobile={isMobile}
                            />
                            <OutcomeButton
                              label="C2"
                              value="C2"
                              selected={outcome === 'C2'}
                              onClick={() => updateItemOutcome(item.id, 'C2')}
                              variant="warning"
                              isMobile={isMobile}
                            />
                            <OutcomeButton
                              label="C3"
                              value="C3"
                              selected={outcome === 'C3'}
                              onClick={() => updateItemOutcome(item.id, 'C3')}
                              variant="amber"
                              isMobile={isMobile}
                            />
                            <OutcomeButton
                              label="N/V"
                              value="not-verified"
                              selected={outcome === 'not-verified'}
                              onClick={() => updateItemOutcome(item.id, 'not-verified')}
                              variant="default"
                              isMobile={isMobile}
                            />
                            <OutcomeButton
                              label="N/A"
                              value="not-applicable"
                              selected={outcome === 'not-applicable'}
                              onClick={() => updateItemOutcome(item.id, 'not-applicable')}
                              variant="default"
                              isMobile={isMobile}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Observations Summary */}
      {(data.defectObservations?.length || 0) > 0 && (
        <Card className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Defect Observations ({data.defectObservations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.defectObservations.slice(0, 3).map((obs: any) => (
                <div key={obs.id} className="flex items-center gap-2 text-sm">
                  <Badge
                    variant={obs.defectCode === 'C1' ? 'destructive' : 'secondary'}
                    className="shrink-0"
                  >
                    {obs.defectCode}
                  </Badge>
                  <span className="truncate">{obs.item}</span>
                </div>
              ))}
              {data.defectObservations.length > 3 && (
                <p className="text-sm text-muted-foreground">
                  +{data.defectObservations.length - 3} more observations
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

/**
 * Outcome button component
 */
interface OutcomeButtonProps {
  label: string;
  value: string;
  selected: boolean;
  onClick: () => void;
  variant: 'success' | 'danger' | 'warning' | 'amber' | 'default';
  isMobile: boolean;
}

const OutcomeButton: React.FC<OutcomeButtonProps> = ({
  label,
  value,
  selected,
  onClick,
  variant,
  isMobile,
}) => {
  const variantStyles = {
    success: selected
      ? 'bg-green-500 text-white border-green-500'
      : 'border-green-300 text-green-600 hover:bg-green-50',
    danger: selected
      ? 'bg-red-500 text-white border-red-500'
      : 'border-red-300 text-red-600 hover:bg-red-50',
    warning: selected
      ? 'bg-orange-500 text-white border-orange-500'
      : 'border-orange-300 text-orange-600 hover:bg-orange-50',
    amber: selected
      ? 'bg-amber-500 text-white border-amber-500'
      : 'border-amber-300 text-amber-600 hover:bg-amber-50',
    default: selected
      ? 'bg-gray-500 text-white border-gray-500'
      : 'border-gray-300 text-gray-600 hover:bg-gray-50',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-md border font-medium transition-all duration-200',
        isMobile ? 'py-2 text-sm' : 'py-1.5 text-xs',
        'active:scale-95',
        variantStyles[variant]
      )}
    >
      {label}
    </button>
  );
};

export default InspectionsStep;
