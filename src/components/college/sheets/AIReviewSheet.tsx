import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MinusCircle,
  ChevronDown,
  ChevronUp,
  Star,
  TrendingUp,
  FileText,
  Clock,
  Copy,
  Check,
} from 'lucide-react';
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

const GRADE_COLOURS: Record<string, { bg: string; text: string; border: string }> = {
  distinction: {
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
  merit: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  pass: { bg: 'bg-elec-yellow/20', text: 'text-elec-yellow', border: 'border-elec-yellow/30' },
  refer: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  not_yet_competent: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
};

const QUALITY_COLOURS: Record<string, string> = {
  excellent: 'text-emerald-400',
  good: 'text-blue-400',
  adequate: 'text-elec-yellow',
  insufficient: 'text-red-400',
};

const QUALITY_WIDTH: Record<string, number> = {
  excellent: 100,
  good: 75,
  adequate: 50,
  insufficient: 25,
};

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'met':
      return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
    case 'partially_met':
      return <MinusCircle className="h-4 w-4 text-amber-400" />;
    case 'not_met':
      return <AlertCircle className="h-4 w-4 text-red-400" />;
    default:
      return null;
  }
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    met: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: 'Met' },
    partially_met: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'Partial' },
    not_met: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'Not Met' },
  };
  const c = config[status] || config.not_met;
  return <Badge className={`${c.bg} ${c.text} text-[10px]`}>{c.label}</Badge>;
}

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

  // Sync feedback when result arrives
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

  const handleCopyFeedback = () => {
    navigator.clipboard.writeText(editedFeedback || result?.draft_feedback || '');
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2000);
  };

  const metCount = result?.criteria_analysis.filter((c) => c.status === 'met').length || 0;
  const totalCount = result?.criteria_analysis.length || 0;
  const coveragePercent = totalCount > 0 ? Math.round((metCount / totalCount) * 100) : 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Loading State */}
          {isReviewing && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="h-10 w-10 text-elec-yellow" />
              </motion.div>
              <div className="text-center">
                <p className="text-lg font-semibold text-white">Analysing Portfolio</p>
                <p className="text-sm text-white mt-1">
                  Reviewing evidence against qualification criteria...
                </p>
              </div>
              <div className="w-48">
                <Progress value={undefined} className="h-1.5" />
              </div>
            </div>
          )}

          {/* Results */}
          {result && !isReviewing && (
            <>
              {/* Header */}
              <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-elec-yellow/20 border border-elec-yellow/30 flex items-center justify-center shrink-0">
                    <Sparkles className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-lg text-left">AI Portfolio Review</SheetTitle>
                    {result.processing_time_ms && (
                      <p className="text-xs text-white flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />
                        Completed in {(result.processing_time_ms / 1000).toFixed(1)}s
                      </p>
                    )}
                  </div>
                </div>
              </SheetHeader>

              {/* Scrollable Body */}
              <ScrollArea className="flex-1">
                <motion.div
                  className="p-4 space-y-5"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Grade Suggestion */}
                  <motion.div variants={staggerItem}>
                    <div
                      className={`rounded-xl border p-4 ${GRADE_COLOURS[result.grade_suggestion]?.bg || ''} ${GRADE_COLOURS[result.grade_suggestion]?.border || ''}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-white uppercase tracking-wide">
                          Suggested Grade
                        </p>
                        <Badge
                          className={`text-sm px-3 py-1 capitalize ${GRADE_COLOURS[result.grade_suggestion]?.bg || ''} ${GRADE_COLOURS[result.grade_suggestion]?.text || ''}`}
                        >
                          <Star className="h-3.5 w-3.5 mr-1" />
                          {result.grade_suggestion.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-white leading-relaxed">
                        {result.grade_justification}
                      </p>
                    </div>
                  </motion.div>

                  {/* Quality Assessment */}
                  <motion.div variants={staggerItem}>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                      Quality Assessment
                    </h3>
                    <div className="space-y-3">
                      {(['evidence_range', 'reflection_quality', 'technical_depth'] as const).map(
                        (key) => {
                          const value = result.quality[key];
                          const label = key
                            .replace(/_/g, ' ')
                            .replace(/\b\w/g, (c) => c.toUpperCase());
                          return (
                            <div key={key}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-white">{label}</span>
                                <span
                                  className={`text-xs font-semibold capitalize ${QUALITY_COLOURS[value] || ''}`}
                                >
                                  {value}
                                </span>
                              </div>
                              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                <motion.div
                                  className={`h-full rounded-full ${
                                    value === 'excellent'
                                      ? 'bg-emerald-500'
                                      : value === 'good'
                                        ? 'bg-blue-500'
                                        : value === 'adequate'
                                          ? 'bg-elec-yellow'
                                          : 'bg-red-500'
                                  }`}
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
                  </motion.div>

                  {/* Criteria Coverage */}
                  <motion.div variants={staggerItem}>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                      Criteria Coverage
                      <Badge className="bg-white/10 text-white text-[10px] ml-auto">
                        {metCount}/{totalCount} met
                      </Badge>
                    </h3>
                    <div className="mb-3">
                      <Progress value={coveragePercent} className="h-2" />
                    </div>
                    <div className="space-y-1.5">
                      {result.criteria_analysis.map((ac) => (
                        <button
                          key={ac.ac_ref}
                          className="w-full text-left p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors touch-manipulation"
                          onClick={() => setExpandedAC(expandedAC === ac.ac_ref ? null : ac.ac_ref)}
                        >
                          <div className="flex items-center gap-2">
                            <StatusIcon status={ac.status} />
                            <span className="text-xs font-medium text-white flex-1 truncate">
                              AC {ac.ac_ref}
                            </span>
                            <StatusBadge status={ac.status} />
                            {expandedAC === ac.ac_ref ? (
                              <ChevronUp className="h-3.5 w-3.5 text-white" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5 text-white" />
                            )}
                          </div>
                          {expandedAC === ac.ac_ref && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              transition={{ duration: 0.15 }}
                              className="mt-2 pt-2 border-t border-white/10"
                            >
                              <p className="text-xs text-white leading-relaxed">{ac.reasoning}</p>
                              {ac.evidence_item_ids.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {ac.evidence_item_ids.map((id) => (
                                    <Badge
                                      key={id}
                                      variant="outline"
                                      className="text-[9px] border-elec-yellow/30 text-elec-yellow"
                                    >
                                      <FileText className="h-2.5 w-2.5 mr-0.5" />
                                      {id.slice(0, 8)}...
                                    </Badge>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Gaps */}
                  {result.gaps.length > 0 && (
                    <motion.div variants={staggerItem}>
                      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                        Gaps Identified ({result.gaps.length})
                      </h3>
                      <div className="space-y-2">
                        {result.gaps.map((gap, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20"
                          >
                            <p className="text-xs font-semibold text-amber-400 mb-1">
                              AC {gap.ac_ref}
                            </p>
                            <p className="text-xs text-white mb-1.5">{gap.what_is_missing}</p>
                            <p className="text-xs text-white flex items-start gap-1">
                              <TrendingUp className="h-3 w-3 text-elec-yellow mt-0.5 shrink-0" />
                              {gap.suggestion}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Strengths & Improvements */}
                  <motion.div
                    variants={staggerItem}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {result.strengths.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Strengths
                        </h3>
                        <ul className="space-y-1.5">
                          {result.strengths.map((s, idx) => (
                            <li key={idx} className="text-xs text-white flex items-start gap-2">
                              <CheckCircle2 className="h-3 w-3 text-emerald-400 mt-0.5 shrink-0" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {result.improvements.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          Areas for Improvement
                        </h3>
                        <ul className="space-y-1.5">
                          {result.improvements.map((imp, idx) => (
                            <li key={idx} className="text-xs text-white flex items-start gap-2">
                              <TrendingUp className="h-3 w-3 text-blue-400 mt-0.5 shrink-0" />
                              {imp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>

                  {/* Draft Feedback */}
                  <motion.div variants={staggerItem}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                        Draft Feedback
                      </h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-white hover:text-elec-yellow"
                        onClick={handleCopyFeedback}
                      >
                        {copiedFeedback ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea
                      value={editedFeedback}
                      onChange={(e) => setEditedFeedback(e.target.value)}
                      className="touch-manipulation text-base min-h-[160px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500 text-white"
                      placeholder="AI-generated feedback will appear here..."
                    />
                    <p className="text-[10px] text-white mt-1">
                      {editedFeedback.length} characters — edit as needed before applying
                    </p>
                  </motion.div>
                </motion.div>
              </ScrollArea>

              {/* Footer Actions */}
              <SheetFooter className="flex-shrink-0 border-t border-border p-4">
                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex-1 h-11 touch-manipulation text-white"
                    onClick={() => onOpenChange(false)}
                  >
                    Close
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 touch-manipulation border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    onClick={handleApplyCriteria}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1.5" />
                    Apply Criteria
                  </Button>
                  <Button
                    className="flex-1 h-11 touch-manipulation gap-2 bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                    onClick={handleApplyFeedback}
                  >
                    <Sparkles className="h-4 w-4" />
                    Apply Feedback
                  </Button>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
