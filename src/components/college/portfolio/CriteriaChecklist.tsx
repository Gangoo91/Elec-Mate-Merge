/**
 * CriteriaChecklist
 *
 * Displays the full assessment criteria tree for a qualification unit,
 * grouped by learning outcome. Each AC has a checkbox the assessor
 * can tick to confirm it has been met, an evidence count, and action links.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type {
  CriteriaChecklistData,
  LearningOutcomeGroup,
  CriterionItem,
} from '@/hooks/college/useSubmissionCriteria';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { Pill, EmptyState, Eyebrow, checkboxClass } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

// ── Skeleton ───────────────────────────────────────────────────

export function CriteriaChecklistSkeleton() {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-5 w-48 bg-white/[0.06] rounded" />
        <div className="h-5 w-24 bg-white/[0.06] rounded" />
      </div>
      <div className="h-1 w-full bg-white/[0.06] rounded-full mt-4" />
      <div className="mt-4 space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-64 bg-white/[0.06] rounded" />
            <div className="ml-6 space-y-2">
              <div className="h-4 w-full bg-white/[0.04] rounded" />
              <div className="h-4 w-3/4 bg-white/[0.04] rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
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
      if (next.has(loNumber)) next.delete(loNumber);
      else next.add(loNumber);
      return next;
    });
  };

  if (isLoading) return <CriteriaChecklistSkeleton />;

  if (data.totalCriteria === 0) {
    return <EmptyState title="No assessment criteria found for this unit." />;
  }

  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <Eyebrow>Assessment Criteria</Eyebrow>
          <div className="mt-1 text-[13px] text-white tabular-nums">
            {data.verifiedCriteria}/{data.totalCriteria} verified · {data.evidencedCriteria}{' '}
            evidenced
          </div>
        </div>
        <Pill tone={data.completionPercentage >= 100 ? 'green' : 'yellow'}>
          {data.completionPercentage}%
        </Pill>
      </div>

      {/* Progress */}
      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            data.completionPercentage >= 100 ? 'bg-emerald-400/80' : 'bg-elec-yellow/80'
          )}
          style={{ width: `${data.completionPercentage}%` }}
        />
      </div>

      {/* Gap alert */}
      {data.hasGaps && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 bg-amber-500/[0.08] border border-amber-500/20 rounded-xl px-4 py-3"
        >
          <span aria-hidden className="w-[3px] h-8 rounded-full bg-amber-400 shrink-0" />
          <p className="text-[12.5px] text-amber-300 leading-snug">
            {data.gapCriteria.length} criteria have no linked evidence. Review portfolio items to
            ensure full coverage.
          </p>
        </motion.div>
      )}

      {/* LO groups */}
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
    </div>
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
      <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06] hover:bg-[hsl(0_0%_11%)] transition-colors h-11 touch-manipulation">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            aria-hidden
            className={cn(
              'text-[14px] font-medium text-white transition-transform shrink-0',
              isExpanded && 'rotate-90'
            )}
          >
            ›
          </span>
          <span className="text-[13px] font-medium text-white truncate">
            LO{lo.loNumber} · {lo.loText}
          </span>
        </div>
        <Pill tone={allVerified ? 'green' : 'yellow'}>
          {verifiedCount}/{totalCount}
        </Pill>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="ml-3 mt-2 space-y-1 border-l border-white/[0.08] pl-3">
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
      className={cn(
        'flex items-start gap-3 px-3 py-3 rounded-xl transition-colors',
        isGap
          ? 'bg-amber-500/[0.06] border border-amber-500/15'
          : criterion.verified
            ? 'bg-emerald-500/[0.06]'
            : 'bg-[hsl(0_0%_9%)]'
      )}
    >
      <Checkbox
        checked={criterion.verified}
        onCheckedChange={(checked) => onToggle(criterion.acRef, checked === true)}
        disabled={isToggling}
        className={cn(checkboxClass, 'mt-0.5 shrink-0')}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2">
          <span className="text-[11px] font-mono text-elec-yellow shrink-0 tabular-nums mt-0.5">
            {criterion.acRef}
          </span>
          <p className="text-[13px] text-white leading-snug">{criterion.acText}</p>
        </div>

        <div className="flex items-center flex-wrap gap-3 mt-2">
          <button
            onClick={() =>
              hasEvidence && onViewEvidence?.(criterion.acRef, criterion.linkedItemIds)
            }
            className="touch-manipulation"
          >
            <Pill tone={hasEvidence ? 'blue' : 'yellow'}>
              {criterion.evidenceCount} evidence
            </Pill>
          </button>

          {onLinkCriteria && (
            <button
              onClick={() => onLinkCriteria(criterion.acRef)}
              className="text-[11.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
            >
              Link
            </button>
          )}

          {onOpenReference && (
            <button
              onClick={() => onOpenReference(criterion.acRef)}
              className="text-[11.5px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
            >
              Ref
            </button>
          )}

          {isGap && (
            <span className="text-[11px] font-medium text-amber-400 inline-flex items-center gap-1.5">
              <span aria-hidden className="w-1 h-1 rounded-full bg-amber-400" />
              Gap
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default CriteriaChecklist;
