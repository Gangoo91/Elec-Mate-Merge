/**
 * CourseRequirementsPanel
 *
 * Collapsible panel showing real qualification progress.
 * Uses useStudentQualification for code resolution and
 * QualificationProgress for per-unit breakdown.
 */

import { useState } from 'react';
import { ChevronDown, GraduationCap, Pencil, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useStudentQualification } from '@/hooks/useStudentQualification';
import { QualificationProgress } from '@/components/apprentice/portfolio/QualificationProgress';
import { QualificationRequirements } from '@/components/apprentice/portfolio/QualificationRequirements';

interface CourseRequirementsPanelProps {
  onChangeCourse?: () => void;
}

export function CourseRequirementsPanel({ onChangeCourse }: CourseRequirementsPanelProps) {
  const [expanded, setExpanded] = useState(true);
  const [requirementsOpen, setRequirementsOpen] = useState(false);
  const { qualificationName, qualificationCode, isLoading } = useStudentQualification();

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

  if (!qualificationCode) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-6">
          <div className="text-center space-y-3">
            <GraduationCap className="h-10 w-10 text-white/80 mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">No qualification selected</p>
              <p className="text-xs text-white/80">
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

  return (
    <>
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
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onChangeCourse();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        onChangeCourse();
                      }
                    }}
                    className="p-2 -m-2 rounded-full hover:bg-white/10 transition-colors touch-manipulation active:scale-95"
                    title="Change qualification"
                  >
                    <Pencil className="h-3.5 w-3.5 text-white/80" />
                  </div>
                )}
              </div>
              <p className="text-xs text-white/80 mt-0.5 truncate pr-4">
                {qualificationName || 'Your qualification'}
              </p>
            </div>
            <div
              className={cn(
                'w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-transform flex-shrink-0',
                expanded && 'rotate-180'
              )}
            >
              <ChevronDown className="h-5 w-5 text-white/80" />
            </div>
          </button>
        </CardHeader>

        {expanded && (
          <CardContent className="pt-4 space-y-3">
            <QualificationProgress
              qualificationCode={qualificationCode}
              qualificationName={qualificationName}
            />

            <button
              onClick={() => setRequirementsOpen(true)}
              className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/25 text-elec-yellow text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
            >
              <BookOpen className="h-4 w-4" />
              View Full Requirements
            </button>
          </CardContent>
        )}
      </Card>

      <QualificationRequirements
        open={requirementsOpen}
        onOpenChange={setRequirementsOpen}
        qualificationCode={qualificationCode}
      />
    </>
  );
}

export default CourseRequirementsPanel;
