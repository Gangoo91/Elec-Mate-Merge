import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { useAIPortfolioReview } from '@/hooks/college/useAIPortfolioReview';
import type { CriterionAnalysis } from '@/hooks/college/useAIPortfolioReview';
import { AIReviewSheet } from '@/components/college/sheets/AIReviewSheet';
import {
  useSubmissionDetail,
  SubmissionPortfolioItem,
} from '@/hooks/college/usePortfolioSubmissions';
import { useAssessorActions } from '@/hooks/college/useAssessorActions';
import { useSubmissionCriteria } from '@/hooks/college/useSubmissionCriteria';
import { EvidenceComments } from '@/components/portfolio-hub/comments/EvidenceComments';
import CriteriaChecklist, {
  CriteriaChecklistSkeleton,
} from '@/components/college/portfolio/CriteriaChecklist';
import { CriteriaLinkerSheet } from '@/components/college/sheets/CriteriaLinkerSheet';
import { CriteriaReferenceSheet } from '@/components/college/sheets/CriteriaReferenceSheet';
import {
  SuccessCheckmark,
  useHapticFeedback,
} from '@/components/college/ui/HapticFeedback';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  PageFrame,
  SectionHeader,
  Pill,
  EmptyState,
  LoadingState,
  type Tone,
} from '@/components/college/primitives';

interface SubmissionReviewPanelProps {
  submissionId: string;
  onBack: () => void;
  onComplete?: () => void;
}

const SubmissionReviewPanel: React.FC<SubmissionReviewPanelProps> = ({
  submissionId,
  onBack,
  onComplete,
}) => {
  const { submission, isLoading, refetch } = useSubmissionDetail(submissionId);
  const { startReview, submitFeedback, signOff, requestMoreEvidence } =
    useAssessorActions();
  const { staggerContainer, staggerItem, triggerSuccess } = useHapticFeedback();
  const { toast } = useToast();

  const {
    checklistData,
    isLoading: criteriaLoading,
    toggleCriterion,
    verifiedACs,
  } = useSubmissionCriteria(
    submission?.categoryId ?? null,
    submission?.qualificationId ?? null,
    submission?.studentId ?? null
  );

  const [feedback, setFeedback] = useState('');
  const [grade, setGrade] = useState<string>('');
  const [strengths, setStrengths] = useState('');
  const [improvements, setImprovements] = useState('');
  const [showSignOffSheet, setShowSignOffSheet] = useState(false);
  const [showRejectSheet, setShowRejectSheet] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [linkerOpen, setLinkerOpen] = useState(false);
  const [linkerItemId, setLinkerItemId] = useState('');
  const [linkerItemTitle, setLinkerItemTitle] = useState('');
  const [linkerCurrentACs, setLinkerCurrentACs] = useState<string[]>([]);
  const [isLinkSaving, setIsLinkSaving] = useState(false);

  const { reviewSubmission, isReviewing, result: aiResult, clearResult } = useAIPortfolioReview();
  const [aiSheetOpen, setAiSheetOpen] = useState(false);

  const [refSheetOpen, setRefSheetOpen] = useState(false);
  const [refSheetAC, setRefSheetAC] = useState<string | null>(null);
  const [refSheetACText, setRefSheetACText] = useState<string | undefined>();

  // ── Handlers ─────────────────────────────────────────────────

  const handleStartReview = async () => {
    if (!submission) return;
    await startReview.mutateAsync(submissionId);
    refetch();
  };

  const handleSubmitFeedback = async () => {
    if (!feedback || !grade) return;
    setIsSubmitting(true);
    try {
      await submitFeedback.mutateAsync({
        submissionId,
        feedback,
        grade: grade as any,
        strengthsNoted: strengths,
        areasForImprovement: improvements,
      });
      setShowSuccess(true);
      triggerSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onComplete?.();
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOff = async () => {
    setIsSubmitting(true);
    try {
      await signOff.mutateAsync({ submissionId });
      setShowSignOffSheet(false);
      setShowSuccess(true);
      triggerSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onComplete?.();
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestMoreEvidence = async () => {
    if (!rejectionReason) return;
    setIsSubmitting(true);
    try {
      await requestMoreEvidence.mutateAsync({
        submissionId,
        request: rejectionReason,
      });
      setShowRejectSheet(false);
      setShowSuccess(true);
      triggerSuccess();
      setTimeout(() => {
        setShowSuccess(false);
        onComplete?.();
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleCriterion = (acRef: string, verified: boolean) => {
    toggleCriterion.mutate({ acRef, verified });
  };

  const handleOpenLinker = (itemId: string, itemTitle: string, currentACs: string[]) => {
    setLinkerItemId(itemId);
    setLinkerItemTitle(itemTitle);
    setLinkerCurrentACs(currentACs);
    setLinkerOpen(true);
  };

  const handleSaveLinkage = async (itemId: string, selectedACs: string[]) => {
    setIsLinkSaving(true);
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .update({ assessment_criteria_met: selectedACs })
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: 'Criteria Linked',
        description: `${selectedACs.length} criteria linked to this evidence.`,
      });
      setLinkerOpen(false);
      refetch();
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      });
    } finally {
      setIsLinkSaving(false);
    }
  };

  const handleAIReview = async () => {
    if (!submission) return;
    setAiSheetOpen(true);
    await reviewSubmission(
      submission.id,
      submission.categoryId,
      submission.qualificationId,
      submission.portfolioItems.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        skills_demonstrated: item.skillsDemonstrated,
        reflection_notes: item.reflectionNotes || '',
        assessment_criteria_met: (item as any).assessmentCriteriaMet || [],
        evidence_files: item.evidenceFiles.map((f) => ({
          url: f.fileUrl,
          type: f.fileType,
          name: f.fileName,
        })),
      }))
    );
  };

  const handleApplyAIFeedback = (
    aiFeedback: string,
    aiGrade: string,
    aiStrengths: string,
    aiImprovements: string
  ) => {
    setFeedback(aiFeedback);
    setGrade(aiGrade);
    setStrengths(aiStrengths);
    setImprovements(aiImprovements);
    setAiSheetOpen(false);
    toast({
      title: 'Feedback Applied',
      description: 'AI-generated feedback has been added to the form. Review and edit before submitting.',
    });
  };

  const handleApplyAICriteria = (criteria: CriterionAnalysis[]) => {
    let applied = 0;
    for (const c of criteria) {
      if (c.status === 'met') {
        handleToggleCriterion(c.ac_ref, true);
        applied++;
      }
    }
    toast({
      title: 'Criteria Applied',
      description: `${applied} criteria marked as verified.`,
    });
  };

  const handleOpenReference = (acRef: string) => {
    const criterion = checklistData.learningOutcomes
      .flatMap((lo) => lo.criteria)
      .find((c) => c.acRef === acRef);
    setRefSheetAC(acRef);
    setRefSheetACText(criterion?.acText);
    setRefSheetOpen(true);
  };

  // ── Helpers ──────────────────────────────────────────────────

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getStatusTone = (status: string): Tone => {
    switch (status) {
      case 'submitted':
        return 'blue';
      case 'under_review':
        return 'purple';
      case 'resubmitted':
        return 'amber';
      case 'approved':
        return 'green';
      default:
        return 'yellow';
    }
  };

  // ── Loading state ────────────────────────────────────────────

  if (isLoading) {
    return (
      <PageFrame>
        <div className="space-y-6 pt-6 sm:pt-8">
          <div className="flex items-center gap-3 animate-pulse">
            <div className="h-10 w-10 rounded-lg bg-white/10" />
            <div className="space-y-2">
              <div className="h-5 w-48 bg-white/10 rounded" />
              <div className="h-3 w-32 bg-white/5 rounded" />
            </div>
          </div>
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-3 w-48 bg-white/5 rounded" />
              </div>
            </div>
          </div>
          <CriteriaChecklistSkeleton />
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3 animate-pulse"
            >
              <div className="h-4 w-3/4 bg-white/10 rounded" />
              <div className="h-3 w-full bg-white/5 rounded" />
              <div className="h-3 w-2/3 bg-white/5 rounded" />
            </div>
          ))}
        </div>
      </PageFrame>
    );
  }

  if (!submission) {
    return (
      <PageFrame>
        <EmptyState
          title="Submission not found"
          description="This submission may have been removed or is no longer accessible."
          action="Back to Queue"
          onAction={onBack}
        />
      </PageFrame>
    );
  }

  // ── Portfolio Item Card ──────────────────────────────────────

  const PortfolioItemCard = ({ item }: { item: SubmissionPortfolioItem }) => {
    const itemACs: string[] = (item as any).assessmentCriteriaMet || [];

    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[15px] font-medium text-white">{item.title}</div>
            <div className="mt-1 text-[11.5px] text-white/50">
              Created {formatDate(item.createdAt)} · {Math.floor(item.timeSpent / 60)}h logged
            </div>
          </div>
          <Pill tone="blue" className="capitalize shrink-0">
            {item.status}
          </Pill>
        </div>

        {item.description && (
          <p className="text-[13px] text-white/70 leading-relaxed">{item.description}</p>
        )}

        {item.skillsDemonstrated.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.skillsDemonstrated.map((skill, idx) => (
              <Pill key={idx} tone="indigo">
                {skill}
              </Pill>
            ))}
          </div>
        )}

        {item.reflectionNotes && (
          <div className="bg-[hsl(0_0%_9%)] border border-white/[0.06] rounded-xl p-4">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-blue-400">
              Student Reflection
            </div>
            <p className="mt-2 text-[13px] text-white/70 leading-relaxed">{item.reflectionNotes}</p>
          </div>
        )}

        {itemACs.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Linked Criteria ({itemACs.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {itemACs.map((ac) => (
                <button
                  key={ac}
                  onClick={() => handleOpenReference(ac)}
                  className="touch-manipulation"
                >
                  <Pill tone="yellow">AC {ac}</Pill>
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => handleOpenLinker(item.id, item.title, itemACs)}
          className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
        >
          Link to criteria →
        </button>

        {item.evidenceFiles.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Evidence Files ({item.evidenceFiles.length})
            </div>
            <div className="space-y-2">
              {item.evidenceFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.06]"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-white truncate">{file.fileName}</div>
                    <div className="mt-0.5 text-[11px] text-white/45">
                      {formatFileSize(file.fileSize)}
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(file.fileUrl, '_blank')}
                    className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation shrink-0"
                  >
                    Download →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-white/[0.06]">
          <EvidenceComments evidenceId={item.id} evidenceTitle={item.title} inline={true} />
        </div>
      </div>
    );
  };

  // ── Render ───────────────────────────────────────────────────

  return (
    <PageFrame>
      <SuccessCheckmark show={showSuccess} />

      {/* Header */}
      <div className="pt-6 sm:pt-8 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <button
            onClick={onBack}
            className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            ← Back
          </button>
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Review Submission
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-tight truncate">
              {submission.categoryName}
            </h1>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          {['submitted', 'under_review', 'resubmitted'].includes(submission.status) && (
            <button
              onClick={handleAIReview}
              disabled={isReviewing}
              className="h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isReviewing ? 'Reviewing…' : 'AI Review'}
            </button>
          )}
          <Pill tone={getStatusTone(submission.status)} className="capitalize">
            {submission.status.replace('_', ' ')}
          </Pill>
        </div>
      </div>

      {/* Student Info */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-semibold">
              {submission.studentName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-[15px] font-medium text-white truncate">
              {submission.studentName}
            </div>
            <div className="mt-0.5 text-[12.5px] text-white/55 truncate">
              {submission.qualificationTitle}
            </div>
          </div>
          <div className="text-right shrink-0 hidden sm:block">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Submitted
            </div>
            <div className="mt-0.5 text-[12.5px] text-white tabular-nums">
              {formatDate(submission.submittedAt)}
            </div>
            <div className="mt-1.5 text-[11px] text-white/45">
              Attempt #{submission.submissionCount}
            </div>
          </div>
        </div>
      </div>

      {/* Previous Feedback */}
      {submission.previousFeedback && (
        <div className="bg-[hsl(0_0%_12%)] border border-amber-500/20 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-400">
              Previous Feedback
            </div>
          </div>
          <p className="text-[13px] text-white/70 leading-relaxed">
            {submission.previousFeedback}
          </p>
          {submission.previousGrade && (
            <div className="mt-3">
              <Pill tone="amber">Previous Grade: {submission.previousGrade}</Pill>
            </div>
          )}
        </div>
      )}

      {/* Criteria Checklist */}
      {criteriaLoading ? (
        <CriteriaChecklistSkeleton />
      ) : (
        checklistData.totalCriteria > 0 && (
          <CriteriaChecklist
            data={checklistData}
            isLoading={criteriaLoading}
            onToggleCriterion={handleToggleCriterion}
            onOpenReference={handleOpenReference}
            onLinkCriteria={(acRef) => {
              if (submission.portfolioItems.length > 0) {
                const firstItem = submission.portfolioItems[0];
                handleOpenLinker(firstItem.id, firstItem.title, []);
              }
            }}
            isToggling={toggleCriterion.isPending}
          />
        )
      )}

      {/* Portfolio Items */}
      <div className="space-y-4">
        <SectionHeader
          eyebrow="03 · Evidence"
          title={`Portfolio Evidence (${submission.portfolioItems.length})`}
        />
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <Accordion type="single" collapsible className="space-y-2">
            {submission.portfolioItems.map((item, index) => (
              <motion.div key={item.id} variants={staggerItem}>
                <AccordionItem
                  value={item.id}
                  className="border border-white/[0.06] rounded-2xl overflow-hidden bg-[hsl(0_0%_12%)]"
                >
                  <AccordionTrigger className="hover:no-underline px-5 py-4 min-h-[56px] touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors">
                    <div className="flex items-center gap-3 text-left flex-1 min-w-0">
                      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40 tabular-nums shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[14px] font-medium text-white truncate">
                        {item.title}
                      </span>
                      <Pill tone="blue" className="ml-auto mr-3 shrink-0">
                        {item.evidenceFiles.length} files
                      </Pill>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-2">
                    <PortfolioItemCard item={item} />
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>

      {/* Start Review */}
      {submission.status === 'submitted' && (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
          <button
            onClick={handleStartReview}
            className="w-full h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 transition-opacity touch-manipulation"
          >
            Start Review
          </button>
        </div>
      )}

      {/* Feedback Form */}
      {(submission.status === 'under_review' || submission.status === 'resubmitted') && (
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-5">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
              Assessor Feedback
            </div>
            <h3 className="mt-1 text-lg font-semibold text-white">Provide detailed feedback</h3>
          </div>

          <div className="space-y-2">
            <Label className="text-[12.5px] text-white/70">Overall Feedback *</Label>
            <Textarea
              placeholder="Provide comprehensive feedback on the submission…"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/35 focus:border-elec-yellow/60 min-h-[120px] touch-manipulation text-base"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-[12.5px] text-white/70">Strengths Noted</Label>
              <Textarea
                placeholder="What did the student do well?"
                value={strengths}
                onChange={(e) => setStrengths(e.target.value)}
                className="bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/35 focus:border-elec-yellow/60 touch-manipulation text-base"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[12.5px] text-white/70">Areas for Improvement</Label>
              <Textarea
                placeholder="What could be improved?"
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                className="bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/35 focus:border-elec-yellow/60 touch-manipulation text-base"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[12.5px] text-white/70">Grade *</Label>
            <Select value={grade} onValueChange={setGrade}>
              <SelectTrigger className="h-11 bg-[hsl(0_0%_9%)] border-white/[0.08] text-white focus:border-elec-yellow/60 touch-manipulation rounded-xl">
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(0_0%_12%)] border-white/[0.08]">
                <SelectItem value="distinction">Distinction</SelectItem>
                <SelectItem value="merit">Merit</SelectItem>
                <SelectItem value="pass">Pass</SelectItem>
                <SelectItem value="refer">Refer (Resubmission Required)</SelectItem>
                <SelectItem value="not_yet_competent">Not Yet Competent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setShowRejectSheet(true)}
              className="h-11 px-5 rounded-full text-[13px] font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-colors touch-manipulation"
            >
              Request more evidence
            </button>
            <button
              onClick={handleSubmitFeedback}
              disabled={!feedback || !grade || isSubmitting}
              className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isSubmitting ? 'Submitting…' : 'Submit Feedback'}
            </button>
          </div>
        </div>
      )}

      {/* Sign-off Section */}
      {submission.status === 'approved' && (
        <div className="bg-[hsl(0_0%_12%)] border border-green-500/20 rounded-2xl p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-green-400">
              Ready for Sign-off
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white">Sign off submission</h3>
          <p className="mt-1 text-[13px] text-white/55">
            This submission has been approved. Sign off to complete the assessment.
          </p>
          <button
            onClick={() => setShowSignOffSheet(true)}
            className="mt-5 w-full h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 transition-opacity touch-manipulation"
          >
            Sign Off Submission
          </button>
        </div>
      )}

      {/* Sign-off Sheet */}
      <Sheet open={showSignOffSheet} onOpenChange={setShowSignOffSheet}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[50vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
        >
          <div className="flex flex-col">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <SheetHeader className="px-5 pb-4">
              <SheetTitle className="text-base text-white">Confirm Sign-off</SheetTitle>
              <p className="text-[13px] text-white/55 mt-1">
                By signing off this submission, you confirm that all evidence has been reviewed
                and meets the required standard for this qualification unit.
              </p>
            </SheetHeader>
            <SheetFooter className="border-t border-white/[0.06] p-5">
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowSignOffSheet(false)}
                  className="flex-1 h-11 px-5 rounded-full text-[13px] font-medium text-white/70 border border-white/[0.08] hover:bg-white/5 transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOff}
                  disabled={isSubmitting}
                  className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                >
                  {isSubmitting ? 'Confirming…' : 'Confirm Sign-off'}
                </button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Request Evidence Sheet */}
      <Sheet open={showRejectSheet} onOpenChange={setShowRejectSheet}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[60vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
        >
          <div className="flex flex-col">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <SheetHeader className="px-5 pb-4">
              <SheetTitle className="text-base text-white">Request Additional Evidence</SheetTitle>
              <p className="text-[13px] text-white/55 mt-1">
                Explain what additional evidence the student needs to provide.
              </p>
            </SheetHeader>
            <div className="px-5 pb-4">
              <Textarea
                placeholder="Describe the additional evidence required…"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="bg-[hsl(0_0%_9%)] border-white/[0.08] text-white placeholder:text-white/35 focus:border-elec-yellow/60 min-h-[100px] touch-manipulation text-base"
              />
            </div>
            <SheetFooter className="border-t border-white/[0.06] p-5">
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowRejectSheet(false)}
                  className="flex-1 h-11 px-5 rounded-full text-[13px] font-medium text-white/70 border border-white/[0.08] hover:bg-white/5 transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRequestMoreEvidence}
                  disabled={!rejectionReason || isSubmitting}
                  className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
                >
                  {isSubmitting ? 'Sending…' : 'Send Request'}
                </button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      <CriteriaLinkerSheet
        open={linkerOpen}
        onOpenChange={setLinkerOpen}
        itemTitle={linkerItemTitle}
        itemId={linkerItemId}
        checklistData={checklistData}
        currentLinkedACs={linkerCurrentACs}
        onSave={handleSaveLinkage}
        isSaving={isLinkSaving}
      />

      <CriteriaReferenceSheet
        open={refSheetOpen}
        onOpenChange={setRefSheetOpen}
        acRef={refSheetAC}
        acText={refSheetACText}
        categoryId={submission.categoryId}
      />

      <AIReviewSheet
        open={aiSheetOpen}
        onOpenChange={(open) => {
          setAiSheetOpen(open);
          if (!open) clearResult();
        }}
        result={aiResult}
        isReviewing={isReviewing}
        onApplyFeedback={handleApplyAIFeedback}
        onApplyCriteria={handleApplyAICriteria}
      />
    </PageFrame>
  );
};

export default SubmissionReviewPanel;
