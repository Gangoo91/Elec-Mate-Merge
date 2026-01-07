/**
 * EvidenceRequirementsGuide
 *
 * Shows apprentices what evidence is required for their selected unit,
 * including both unit-level and tutor-assigned requirements.
 */

import React, { useMemo } from 'react';
import {
  Camera,
  FileText,
  Award,
  ClipboardList,
  Users,
  BookOpen,
  Calendar,
  Video,
  PenTool,
  Calculator,
  CheckCircle2,
  Circle,
  AlertCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  UserCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useCombinedRequirements } from '@/hooks/useCombinedRequirements';
import type { EvidenceTypeCode, CombinedEvidenceRequirement } from '@/types/evidence';

// Icon mapping for evidence types
const EVIDENCE_ICONS: Record<EvidenceTypeCode, React.ReactNode> = {
  photo: <Camera className="h-4 w-4" />,
  document: <FileText className="h-4 w-4" />,
  certificate: <Award className="h-4 w-4" />,
  test_result: <ClipboardList className="h-4 w-4" />,
  witness: <Users className="h-4 w-4" />,
  reflection: <BookOpen className="h-4 w-4" />,
  work_log: <Calendar className="h-4 w-4" />,
  video: <Video className="h-4 w-4" />,
  drawing: <PenTool className="h-4 w-4" />,
  calculation: <Calculator className="h-4 w-4" />,
};

interface EvidenceRequirementsGuideProps {
  categoryId: string;
  uploadedFiles?: File[];
  className?: string;
  compact?: boolean;
}

function RequirementItem({
  requirement,
  compact,
}: {
  requirement: CombinedEvidenceRequirement;
  compact?: boolean;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const statusIcon = requirement.is_complete ? (
    <CheckCircle2 className="h-4 w-4 text-green-500" />
  ) : requirement.is_mandatory ? (
    <AlertCircle className="h-4 w-4 text-amber-500" />
  ) : (
    <Circle className="h-4 w-4 text-muted-foreground" />
  );

  const isDueSoon = requirement.due_date && !requirement.is_complete && (() => {
    const due = new Date(requirement.due_date);
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    return due <= weekFromNow;
  })();

  const isOverdue = requirement.due_date && !requirement.is_complete && (() => {
    return new Date(requirement.due_date) < new Date();
  })();

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  if (compact) {
    return (
      <div
        className={cn(
          'flex items-center justify-between py-2 px-3 rounded-md',
          requirement.is_complete
            ? 'bg-green-500/10'
            : requirement.is_mandatory
            ? 'bg-amber-500/10'
            : 'bg-muted/50'
        )}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {statusIcon}
          <div className="flex items-center gap-1.5 flex-wrap">
            {requirement.evidence_types.slice(0, 2).map((type) => (
              <Tooltip key={type.code}>
                <TooltipTrigger>
                  <span style={{ color: type.color }}>
                    {EVIDENCE_ICONS[type.code as EvidenceTypeCode]}
                  </span>
                </TooltipTrigger>
                <TooltipContent>{type.name}</TooltipContent>
              </Tooltip>
            ))}
            {requirement.evidence_types.length > 2 && (
              <span className="text-xs text-muted-foreground">
                +{requirement.evidence_types.length - 2}
              </span>
            )}
          </div>
          <span className="text-sm truncate">
            {requirement.source === 'tutor'
              ? requirement.title
              : requirement.assessment_criterion}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground">
            {requirement.quantity_uploaded}/{requirement.quantity_required}
          </span>
          {requirement.source === 'tutor' && (
            <Tooltip>
              <TooltipTrigger>
                <UserCheck className="h-3 w-3 text-purple-500" />
              </TooltipTrigger>
              <TooltipContent>Tutor assigned</TooltipContent>
            </Tooltip>
          )}
          {requirement.due_date && (
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant={isOverdue ? 'destructive' : isDueSoon ? 'outline' : 'secondary'}
                  className="text-xs px-1.5 py-0"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(requirement.due_date)}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {isOverdue ? 'Overdue!' : isDueSoon ? 'Due soon' : 'Due date'}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
    );
  }

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div
        className={cn(
          'border rounded-lg overflow-hidden',
          requirement.is_complete
            ? 'border-green-500/30 bg-green-500/5'
            : requirement.is_mandatory
            ? 'border-amber-500/30 bg-amber-500/5'
            : 'border-border'
        )}
      >
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-3 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
              {statusIcon}
              <div className="flex items-center gap-2">
                {requirement.evidence_types.map((type) => (
                  <Tooltip key={type.code}>
                    <TooltipTrigger>
                      <span
                        className="p-1.5 rounded-md bg-background"
                        style={{ color: type.color }}
                      >
                        {EVIDENCE_ICONS[type.code as EvidenceTypeCode]}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{type.name}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">
                  {requirement.source === 'tutor'
                    ? requirement.title
                    : `AC ${requirement.assessment_criterion}`}
                </p>
                {requirement.source === 'tutor' && (
                  <Badge variant="outline" className="text-xs mt-1">
                    <UserCheck className="h-3 w-3 mr-1" />
                    Tutor assigned
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {requirement.due_date && (
                <Badge
                  variant={isOverdue ? 'destructive' : isDueSoon ? 'outline' : 'secondary'}
                  className="text-xs"
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {formatDate(requirement.due_date)}
                </Badge>
              )}
              <span className="text-sm text-muted-foreground">
                {requirement.quantity_uploaded}/{requirement.quantity_required}
              </span>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-3 pb-3 pt-0 border-t border-border/50 bg-muted/20">
            {requirement.assessment_criterion_text && (
              <p className="text-sm text-muted-foreground mt-2">
                {requirement.assessment_criterion_text}
              </p>
            )}
            {requirement.guidance && (
              <div className="mt-2 p-2 rounded-md bg-blue-500/10 border border-blue-500/20">
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">
                  Guidance
                </p>
                <p className="text-sm">{requirement.guidance}</p>
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-1">
              {requirement.evidence_types.map((type) => (
                <Badge key={type.code} variant="secondary" className="text-xs">
                  {type.name}
                </Badge>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}

export function EvidenceRequirementsGuide({
  categoryId,
  uploadedFiles,
  className,
  compact = false,
}: EvidenceRequirementsGuideProps) {
  const {
    mandatoryRequirements,
    optionalRequirements,
    progress,
    isLoading,
    overdueRequirements,
    upcomingDueRequirements,
  } = useCombinedRequirements({ categoryId });

  const [showMandatory, setShowMandatory] = React.useState(true);
  const [showOptional, setShowOptional] = React.useState(false);

  if (isLoading) {
    return (
      <Card className={cn('animate-pulse', className)}>
        <CardHeader className="pb-2">
          <div className="h-5 bg-muted rounded w-40" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (mandatoryRequirements.length === 0 && optionalRequirements.length === 0) {
    return null;
  }

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Evidence Requirements
          </CardTitle>
          <Badge variant={progress.allMandatoryComplete ? 'default' : 'outline'}>
            {progress.percentage}%
          </Badge>
        </div>
        <Progress value={progress.percentage} className="h-2 mt-2" />
        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
          <span>
            {progress.completed}/{progress.total} complete
          </span>
          {overdueRequirements.length > 0 && (
            <span className="text-destructive font-medium">
              {overdueRequirements.length} overdue
            </span>
          )}
          {upcomingDueRequirements.length > 0 && (
            <span className="text-amber-600">
              {upcomingDueRequirements.length} due soon
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mandatory Requirements */}
        {mandatoryRequirements.length > 0 && (
          <Collapsible open={showMandatory} onOpenChange={setShowMandatory}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded-md px-2 -mx-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="text-sm font-medium">
                  Mandatory ({mandatoryRequirements.length})
                </span>
                <Badge variant="outline" className="text-xs">
                  {progress.mandatoryCompleted}/{progress.mandatoryTotal}
                </Badge>
              </div>
              {showMandatory ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 mt-2">
                {mandatoryRequirements.map((req) => (
                  <RequirementItem key={req.id} requirement={req} compact={compact} />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Optional Requirements */}
        {optionalRequirements.length > 0 && (
          <Collapsible open={showOptional} onOpenChange={setShowOptional}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-muted/50 rounded-md px-2 -mx-2">
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  Optional ({optionalRequirements.length})
                </span>
              </div>
              {showOptional ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 mt-2">
                {optionalRequirements.map((req) => (
                  <RequirementItem key={req.id} requirement={req} compact={compact} />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}

export default EvidenceRequirementsGuide;
