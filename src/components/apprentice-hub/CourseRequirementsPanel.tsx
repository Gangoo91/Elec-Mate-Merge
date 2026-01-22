/**
 * CourseRequirementsPanel
 *
 * Collapsible panel showing course requirements progress.
 * Uses useQualifications to get enrolled course and category requirements.
 * Includes option to change course.
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, Circle, GraduationCap, Pencil } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQualifications } from '@/hooks/qualification/useQualifications';

interface CourseRequirementsPanelProps {
  onChangeCourse?: () => void;
}

export function CourseRequirementsPanel({ onChangeCourse }: CourseRequirementsPanelProps) {
  const [expanded, setExpanded] = useState(true); // Default expanded
  const { userSelection, categories, compliance, isLoading } = useQualifications();

  if (isLoading) {
    return (
      <Card className="bg-card border-border animate-pulse">
        <CardHeader className="pb-3">
          <div className="h-5 w-48 bg-muted rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-20 bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  if (!userSelection) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-6">
          <div className="text-center space-y-3">
            <GraduationCap className="h-10 w-10 text-muted-foreground mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                No qualification selected
              </p>
              <p className="text-xs text-muted-foreground">
                Select a qualification to see your course requirements
              </p>
            </div>
            {onChangeCourse && (
              <Button
                variant="outline"
                onClick={onChangeCourse}
                className="mt-2 h-11 touch-manipulation active:scale-95"
              >
                Select Qualification
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate overall progress
  const totalRequired = categories?.reduce((sum, cat) => sum + (cat.required_entries || 0), 0) || 0;
  const totalCompleted = compliance?.reduce((sum, c) => sum + (c.completed_entries || 0), 0) || 0;
  const overallPercent = totalRequired > 0 ? Math.round((totalCompleted / totalRequired) * 100) : 0;

  // Get completed categories count
  const completedCategories = compliance?.filter(c =>
    c.completed_entries >= (categories?.find(cat => cat.id === c.category_id)?.required_entries || 0)
  ).length || 0;

  return (
    <Card className="bg-card/50 border-white/10 overflow-hidden">
      <CardHeader className="pb-0">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-left min-h-[56px] touch-manipulation active:opacity-80 transition-opacity -mx-1 px-1"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-bold">Course Requirements</CardTitle>
              {onChangeCourse && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeCourse();
                  }}
                  className="p-2 -m-2 rounded-full hover:bg-white/10 transition-colors touch-manipulation active:scale-95"
                  title="Change qualification"
                >
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 truncate pr-4">
              {userSelection.qualification?.title || 'Your qualification'}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-2xl font-bold text-elec-yellow leading-none">{overallPercent}%</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {completedCategories}/{categories?.length || 0} categories
              </p>
            </div>
            <div className={cn(
              'w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform',
              expanded && 'rotate-180'
            )}>
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </button>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-4 space-y-4">
          {/* Overall Progress Bar */}
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-foreground">Overall Progress</span>
              <span className="text-xs text-muted-foreground">
                {totalCompleted}/{totalRequired} items
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-elec-yellow transition-all duration-500"
                style={{ width: `${Math.min(overallPercent, 100)}%` }}
              />
            </div>
          </div>

          {/* Category List - Mobile Optimised */}
          <div className="space-y-2">
            {categories?.map((category) => {
              const categoryCompliance = compliance?.find(c => c.category_id === category.id);
              const completed = categoryCompliance?.completed_entries || 0;
              const required = category.required_entries || 0;
              const isComplete = completed >= required;
              const percent = required > 0 ? Math.round((completed / required) * 100) : 0;

              return (
                <div
                  key={category.id}
                  className={cn(
                    'p-3 rounded-xl border transition-colors',
                    isComplete
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-white/[0.02] border-white/10'
                  )}
                >
                  {/* Header Row */}
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5',
                      isComplete
                        ? 'bg-green-500 text-white'
                        : 'bg-white/10'
                    )}>
                      {isComplete ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <span className="text-xs font-medium text-muted-foreground">
                          {completed}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-foreground leading-tight">
                          {category.name}
                        </h4>
                        <span className={cn(
                          'text-xs font-medium flex-shrink-0 px-2 py-0.5 rounded-full',
                          isComplete
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-white/10 text-muted-foreground'
                        )}>
                          {completed}/{required}
                        </span>
                      </div>
                      {category.description && (
                        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                          {category.description}
                        </p>
                      )}
                      {/* Progress Bar */}
                      <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-500',
                            isComplete ? 'bg-green-500' : 'bg-elec-yellow'
                          )}
                          style={{ width: `${Math.min(percent, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {(!categories || categories.length === 0) && (
            <p className="text-sm text-muted-foreground text-center py-2">
              No categories defined for this qualification.
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
}

export default CourseRequirementsPanel;
