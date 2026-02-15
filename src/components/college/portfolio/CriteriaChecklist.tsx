/**
 * CriteriaChecklist
 *
 * Displays the full assessment criteria tree for a qualification unit,
 * grouped by learning outcome. Each AC has a checkbox the assessor
 * can tick to confirm it has been met, an evidence count badge,
 * and a link icon to see which portfolio items cover it.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  FileText,
  Link2,
  BookOpen,
  Loader2,
} from 'lucide-react';
import type {
  CriteriaChecklistData,
  LearningOutcomeGroup,
  CriterionItem,
} from '@/hooks/college/useSubmissionCriteria';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';

// ── Skeleton ───────────────────────────────────────────────────

export function CriteriaChecklistSkeleton() {
  return (
    <Card className="bg-white/5 border-elec-gray/40 animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="h-5 w-48 bg-white/10 rounded" />
          <div className="h-5 w-24 bg-white/10 rounded" />
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full mt-3" />
      </CardHeader>
      <CardContent className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-64 bg-white/10 rounded" />
            <div className="ml-6 space-y-2">
              <div className="h-4 w-full bg-white/5 rounded" />
              <div className="h-4 w-3/4 bg-white/5 rounded" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ── Props ──────────────────────────────────────────────────────

interface CriteriaChecklistProps {
  data: CriteriaChecklistData;
  isLoading?: boolean;
  onToggleCriterion: (acRef: string, verified: boolean) => void;
  onViewEvidence?: (acRef: string, linkedItemIds: string[]) => void;
  onOpenReference?: (acRef: string) => void;
  onLinkCriteria?: (acRef: string) => void;
  isToggling?: boolean;
}

// ── Component ──────────────────────────────────────────────────

const CriteriaChecklist: React.FC<CriteriaChecklistProps> = ({
  data,
  isLoading,
  onToggleCriterion,
  onViewEvidence,
  onOpenReference,
  onLinkCriteria,
  isToggling,
}) => {
  const { staggerContainer, staggerItem } = useHapticFeedback();
  const [expandedLOs, setExpandedLOs] = useState<Set<string>>(new Set(['0', '1']));

  const toggleLO = (loNumber: string) => {
    setExpandedLOs((prev) => {
      const next = new Set(prev);
      if (next.has(loNumber)) {
        next.delete(loNumber);
      } else {
        next.add(loNumber);
      }
      return next;
    });
  };

  if (isLoading) {
    return <CriteriaChecklistSkeleton />;
  }

  if (data.totalCriteria === 0) {
    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="py-8 text-center">
          <BookOpen className="h-10 w-10 text-white mx-auto mb-3" />
          <p className="text-white text-sm">No assessment criteria found for this unit.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/5 border-elec-gray/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
            Assessment Criteria
          </CardTitle>
          <Badge
            variant="outline"
            className={
              data.completionPercentage >= 100
                ? 'border-green-500/30 text-green-400'
                : 'border-elec-yellow/30 text-elec-yellow'
            }
          >
            {data.verifiedCriteria}/{data.totalCriteria} verified
          </Badge>
        </div>

        {/* Progress bar */}
        <div className="mt-3 space-y-1">
          <Progress value={data.completionPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-white">
            <span>{data.completionPercentage}% complete</span>
            <span>{data.evidencedCriteria} evidenced</span>
          </div>
        </div>

        {/* Evidence gap alert */}
        {data.hasGaps && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex items-start gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20"
          >
            <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <p className="text-xs text-white">
              {data.gapCriteria.length} criteria have no linked evidence. Review portfolio items to
              ensure full coverage.
            </p>
          </motion.div>
        )}
      </CardHeader>

      <CardContent className="space-y-2 pt-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {data.learningOutcomes.map((lo) => (
            <motion.div key={lo.loNumber} variants={staggerItem}>
              <LOGroup
                lo={lo}
                isExpanded={expandedLOs.has(lo.loNumber)}
                onToggleExpand={() => toggleLO(lo.loNumber)}
                onToggleCriterion={onToggleCriterion}
                onViewEvidence={onViewEvidence}
                onOpenReference={onOpenReference}
                onLinkCriteria={onLinkCriteria}
                isToggling={isToggling}
              />
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};

// ── LO Group ───────────────────────────────────────────────────

interface LOGroupProps {
  lo: LearningOutcomeGroup;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleCriterion: (acRef: string, verified: boolean) => void;
  onViewEvidence?: (acRef: string, linkedItemIds: string[]) => void;
  onOpenReference?: (acRef: string) => void;
  onLinkCriteria?: (acRef: string) => void;
  isToggling?: boolean;
}

function LOGroup({
  lo,
  isExpanded,
  onToggleExpand,
  onToggleCriterion,
  onViewEvidence,
  onOpenReference,
  onLinkCriteria,
  isToggling,
}: LOGroupProps) {
  const verifiedCount = lo.criteria.filter((c) => c.verified).length;
  const totalCount = lo.criteria.length;
  const allVerified = verifiedCount === totalCount;

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggleExpand}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors h-11 touch-manipulation">
        <div className="flex items-center gap-2 min-w-0">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-white shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 text-white shrink-0" />
          )}
          <span className="text-sm font-medium text-white truncate">
            LO{lo.loNumber}: {lo.loText}
          </span>
        </div>
        <Badge
          variant="outline"
          className={`ml-2 shrink-0 ${
            allVerified ? 'border-green-500/30 text-green-400' : 'border-white/20 text-white'
          }`}
        >
          {verifiedCount}/{totalCount}
        </Badge>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="ml-2 mt-1 space-y-1 border-l-2 border-white/10 pl-3">
          <AnimatePresence>
            {lo.criteria.map((criterion) => (
              <CriterionRow
                key={criterion.acRef}
                criterion={criterion}
                onToggle={onToggleCriterion}
                onViewEvidence={onViewEvidence}
                onOpenReference={onOpenReference}
                onLinkCriteria={onLinkCriteria}
                isToggling={isToggling}
              />
            ))}
          </AnimatePresence>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

// ── Criterion Row ──────────────────────────────────────────────

interface CriterionRowProps {
  criterion: CriterionItem;
  onToggle: (acRef: string, verified: boolean) => void;
  onViewEvidence?: (acRef: string, linkedItemIds: string[]) => void;
  onOpenReference?: (acRef: string) => void;
  onLinkCriteria?: (acRef: string) => void;
  isToggling?: boolean;
}

function CriterionRow({
  criterion,
  onToggle,
  onViewEvidence,
  onOpenReference,
  onLinkCriteria,
  isToggling,
}: CriterionRowProps) {
  const hasEvidence = criterion.evidenceCount > 0;
  const isGap = !hasEvidence && !criterion.verified;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start gap-3 p-2.5 rounded-lg transition-colors ${
        isGap
          ? 'bg-amber-500/5 border border-amber-500/10'
          : criterion.verified
            ? 'bg-green-500/5'
            : 'bg-white/[0.02]'
      }`}
    >
      {/* Checkbox */}
      <Checkbox
        checked={criterion.verified}
        onCheckedChange={(checked) => onToggle(criterion.acRef, checked === true)}
        disabled={isToggling}
        className="mt-0.5 h-5 w-5 shrink-0 touch-manipulation border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
      />

      {/* AC text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <span className="text-xs font-mono text-elec-yellow shrink-0">{criterion.acRef}</span>
          <p className="text-sm text-white leading-snug">{criterion.acText}</p>
        </div>

        {/* Evidence + action row */}
        <div className="flex items-center gap-2 mt-1.5">
          {/* Evidence count badge */}
          <Badge
            variant="outline"
            className={`text-xs cursor-pointer touch-manipulation ${
              hasEvidence ? 'border-blue-500/30 text-blue-400' : 'border-white/10 text-white'
            }`}
            onClick={() =>
              hasEvidence && onViewEvidence?.(criterion.acRef, criterion.linkedItemIds)
            }
          >
            <FileText className="h-3 w-3 mr-1" />
            {criterion.evidenceCount} evidence
          </Badge>

          {/* Link to criteria button */}
          {onLinkCriteria && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-white hover:text-elec-yellow touch-manipulation"
              onClick={() => onLinkCriteria(criterion.acRef)}
            >
              <Link2 className="h-3 w-3 mr-1" />
              Link
            </Button>
          )}

          {/* Reference button */}
          {onOpenReference && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-white hover:text-elec-yellow touch-manipulation"
              onClick={() => onOpenReference(criterion.acRef)}
            >
              <BookOpen className="h-3 w-3 mr-1" />
              Ref
            </Button>
          )}

          {/* Gap warning */}
          {isGap && (
            <span className="text-xs text-amber-400 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Gap
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CriteriaChecklist;
