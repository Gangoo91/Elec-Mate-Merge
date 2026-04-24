import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Pill,
  LoadingState,
  SheetShell,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  Eyebrow,
  textareaClass,
  type Tone,
} from '@/components/college/primitives';
import { copyToClipboard } from '@/utils/clipboard';
import type { AIReviewResult, CriterionAnalysis } from '@/hooks/college/useAIPortfolioReview';

interface AIReviewSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: AIReviewResult | null;
  isReviewing: boolean;
  onApplyFeedback: (
    feedback: string,
    grade: string,
    strengths: string,
    improvements: string
  ) => void;
  onApplyCriteria: (criteria: CriterionAnalysis[]) => void;
}

const GRADE_TONE: Record<string, Tone> = {
  distinction: 'emerald',
  merit: 'blue',
  pass: 'yellow',
  refer: 'amber',
  not_yet_competent: 'red',
};

const QUALITY_TONE: Record<string, Tone> = {
  excellent: 'emerald',
  good: 'blue',
  adequate: 'yellow',
  insufficient: 'red',
};

const QUALITY_WIDTH: Record<string, number> = {
  excellent: 100,
  good: 75,
  adequate: 50,
  insufficient: 25,
};

const QUALITY_BAR: Record<string, string> = {
  excellent: 'bg-emerald-500',
  good: 'bg-blue-500',
  adequate: 'bg-elec-yellow',
  insufficient: 'bg-red-500',
};

const STATUS_TONE: Record<string, Tone> = {
  met: 'emerald',
  partially_met: 'amber',
  not_met: 'red',
};

const STATUS_LABEL: Record<string, string> = {
  met: 'Met',
  partially_met: 'Partial',
  not_met: 'Not Met',
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0.1 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export function AIReviewSheet({
  open,
  onOpenChange,
  result,
  isReviewing,
  onApplyFeedback,
  onApplyCriteria,
}: AIReviewSheetProps) {
  const [editedFeedback, setEditedFeedback] = useState('');
  const [expandedAC, setExpandedAC] = useState<string | null>(null);
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  if (result?.draft_feedback && !editedFeedback) {
    setEditedFeedback(result.draft_feedback);
  }

  const handleApplyFeedback = () => {
    if (!result) return;
    onApplyFeedback(
      editedFeedback || result.draft_feedback,
      result.grade_suggestion,
      result.strengths.join('\n'),
      result.improvements.join('\n')
    );
  };

  const handleApplyCriteria = () => {
    if (!result) return;
    onApplyCriteria(result.criteria_analysis.filter((c) => c.status === 'met'));
  };

  const handleCopyFeedback = async () => {
    await copyToClipboard(editedFeedback || result?.draft_feedback || '');
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2000);
  };

  const metCount = result?.criteria_analysis.filter((c) => c.status === 'met').length || 0;
  const totalCount = result?.criteria_analysis.length || 0;
  const coveragePercent = totalCount > 0 ? Math.round((metCount / totalCount) * 100) : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <div className="flex flex-col h-full bg-[hsl(0_0%_8%)]">
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {isReviewing && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
              <LoadingState />
              <div className="text-center">
                <p className="text-[16px] font-semibold text-white">Analysing Portfolio</p>
                <p className="text-[13px] text-white mt-1">
                  Reviewing evidence against qualification criteria…
                </p>
              </div>
            </div>
          )}

          {result && !isReviewing && (
            <SheetShell
              eyebrow="AI Portfolio Review"
              title="Review results"
              description={
                result.processing_time_ms
                  ? `Completed in ${(result.processing_time_ms / 1000).toFixed(1)}s`
                  : undefined
              }
              footer={
                <>
                  <SecondaryButton onClick={() => onOpenChange(false)}>
                    Close
                  </SecondaryButton>
                  <SecondaryButton onClick={handleApplyCriteria}>
                    Apply Criteria
                  </SecondaryButton>
                  <PrimaryButton fullWidth onClick={handleApplyFeedback}>
                    Apply Feedback →
                  </PrimaryButton>
                </>
              }
            >
              <ScrollArea className="flex-1">
                <motion.div
                  className="space-y-5"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={staggerItem}>
                    <FormCard eyebrow="Suggested Grade">
                      <div className="flex items-center justify-end -mt-1">
                        <Pill tone={GRADE_TONE[result.grade_suggestion] || 'yellow'}>
                          <span className="capitalize">
                            {result.grade_suggestion.replace('_', ' ')}
                          </span>
                        </Pill>
                      </div>
                      <p className="text-[13px] text-white leading-relaxed">
                        {result.grade_justification}
                      </p>
                    </FormCard>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <FormCard eyebrow="Quality Assessment">
                      <div className="space-y-3">
                        {(['evidence_range', 'reflection_quality', 'technical_depth'] as const).map(
                          (key) => {
                            const value = result.quality[key];
                            const label = key
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, (c) => c.toUpperCase());
                            return (
                              <div key={key}>
                                <div className="flex items-center justify-between mb-1.5">
                                  <span className="text-[12px] text-white">{label}</span>
                                  <Pill tone={QUALITY_TONE[value] || 'yellow'}>
                                    <span className="capitalize">{value}</span>
                                  </Pill>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                                  <motion.div
                                    className={`h-full rounded-full ${QUALITY_BAR[value] || 'bg-white/30'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${QUALITY_WIDTH[value] || 0}%` }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </FormCard>
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <FormCard eyebrow="Criteria Coverage">
                      <div className="flex items-center justify-end -mt-1">
                        <Pill tone="yellow">
                          {metCount}/{totalCount} met
                        </Pill>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-elec-yellow"
                          initial={{ width: 0 }}
                          animate={{ width: `${coveragePercent}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        {result.criteria_analysis.map((ac) => (
                          <button
                            key={ac.ac_ref}
                            className="w-full text-left p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08] hover:bg-[hsl(0_0%_11%)] transition-colors touch-manipulation"
                            onClick={() =>
                              setExpandedAC(expandedAC === ac.ac_ref ? null : ac.ac_ref)
                            }
                          >
                            <div className="flex items-center gap-2">
                              <span
                                aria-hidden
                                className={`inline-block h-1.5 w-1.5 rounded-full shrink-0 ${
                                  ac.status === 'met'
                                    ? 'bg-emerald-400'
                                    : ac.status === 'partially_met'
                                      ? 'bg-amber-400'
                                      : 'bg-red-400'
                                }`}
                              />
                              <span className="text-[12.5px] font-medium text-white flex-1 truncate">
                                AC {ac.ac_ref}
                              </span>
                              <Pill tone={STATUS_TONE[ac.status] || 'red'}>
                                {STATUS_LABEL[ac.status] || 'Not Met'}
                              </Pill>
                              <span className="text-[13px] text-white">
                                {expandedAC === ac.ac_ref ? '−' : '+'}
                              </span>
                            </div>
                            {expandedAC === ac.ac_ref && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                transition={{ duration: 0.15 }}
                                className="mt-2 pt-2 border-t border-white/[0.08]"
                              >
                                <p className="text-[12px] text-white leading-relaxed">
                                  {ac.reasoning}
                                </p>
                                {ac.evidence_item_ids.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {ac.evidence_item_ids.map((id) => (
                                      <Pill key={id} tone="yellow">
                                        {id.slice(0, 8)}…
                                      </Pill>
                                    ))}
                                  </div>
                                )}
                              </motion.div>
                            )}
                          </button>
                        ))}
                      </div>
                    </FormCard>
                  </motion.div>

                  {result.gaps.length > 0 && (
                    <motion.div variants={staggerItem}>
                      <FormCard eyebrow="Gaps Identified">
                        <div className="flex items-center justify-end -mt-1">
                          <Pill tone="amber">{result.gaps.length}</Pill>
                        </div>
                        <div className="space-y-2">
                          {result.gaps.map((gap, idx) => (
                            <div
                              key={idx}
                              className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20"
                            >
                              <p className="text-[12px] font-semibold text-amber-400 mb-1">
                                AC {gap.ac_ref}
                              </p>
                              <p className="text-[12px] text-white mb-1.5">
                                {gap.what_is_missing}
                              </p>
                              <p className="text-[12px] text-white">→ {gap.suggestion}</p>
                            </div>
                          ))}
                        </div>
                      </FormCard>
                    </motion.div>
                  )}

                  <motion.div
                    variants={staggerItem}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {result.strengths.length > 0 && (
                      <FormCard eyebrow="Strengths">
                        <ul className="space-y-2">
                          {result.strengths.map((s, idx) => (
                            <li
                              key={idx}
                              className="text-[12px] text-white flex items-start gap-2 leading-relaxed"
                            >
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </FormCard>
                    )}
                    {result.improvements.length > 0 && (
                      <FormCard eyebrow="Areas for Improvement">
                        <ul className="space-y-2">
                          {result.improvements.map((imp, idx) => (
                            <li
                              key={idx}
                              className="text-[12px] text-white flex items-start gap-2 leading-relaxed"
                            >
                              <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </FormCard>
                    )}
                  </motion.div>

                  <motion.div variants={staggerItem}>
                    <FormCard eyebrow="Draft Feedback">
                      <div className="flex items-center justify-end -mt-1">
                        <button
                          type="button"
                          onClick={handleCopyFeedback}
                          className="text-[12px] font-medium text-white hover:text-elec-yellow transition-colors touch-manipulation"
                        >
                          {copiedFeedback ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <textarea
                        value={editedFeedback}
                        onChange={(e) => setEditedFeedback(e.target.value)}
                        className={`${textareaClass} min-h-[160px]`}
                        placeholder="AI-generated feedback will appear here…"
                      />
                      <p className="text-[10px] text-white">
                        {editedFeedback.length} characters — edit as needed before applying
                      </p>
                    </FormCard>
                  </motion.div>
                </motion.div>
              </ScrollArea>
              <Eyebrow className="sr-only">AI review</Eyebrow>
            </SheetShell>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
