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
                size="sm"
                onClick={onChangeCourse}
                className="mt-2"
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
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-semibold">Course Requirements</CardTitle>
              {onChangeCourse && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeCourse();
                  }}
                  className="p-1 rounded hover:bg-muted transition-colors"
                  title="Change qualification"
                >
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {userSelection.qualification?.title || 'Your qualification'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-lg font-bold text-elec-yellow">{overallPercent}%</p>
              <p className="text-[10px] text-muted-foreground">
                {completedCategories}/{categories?.length || 0} categories
              </p>
            </div>
            {expanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </button>
      </CardHeader>

      {expanded && (
        <CardContent className="pt-0 space-y-4">
          {/* Overall Progress Bar */}
          <div className="space-y-2">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-elec-yellow transition-all"
                style={{ width: `${Math.min(overallPercent, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {totalCompleted} of {totalRequired} evidence items completed
            </p>
          </div>

          {/* Category List */}
          <div className="space-y-3">
            {categories?.map((category) => {
              const categoryCompliance = compliance?.find(c => c.category_id === category.id);
              const completed = categoryCompliance?.completed_entries || 0;
              const required = category.required_entries || 0;
              const isComplete = completed >= required;
              const percent = required > 0 ? Math.round((completed / required) * 100) : 0;

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {isComplete ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-foreground block truncate">
                          {category.name}
                        </span>
                        {category.description && (
                          <span className="text-xs text-muted-foreground block truncate">
                            {category.description}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs ml-2 flex-shrink-0',
                        isComplete
                          ? 'border-green-500/30 text-green-500 bg-green-500/10'
                          : 'border-muted-foreground/30 text-muted-foreground'
                      )}
                    >
                      {completed}/{required}
                    </Badge>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden ml-6">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all',
                        isComplete ? 'bg-green-500' : 'bg-elec-yellow'
                      )}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
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
