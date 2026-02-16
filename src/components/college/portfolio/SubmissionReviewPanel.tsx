import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import {
  FileText,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Download,
  Image,
  File,
  AlertTriangle,
  Award,
  Send,
  Loader2,
  ArrowLeft,
  Link2,
  Sparkles,
} from 'lucide-react';
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

  // Criteria hook — only active when we have submission data
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

  // Criteria linker sheet state
  const [linkerOpen, setLinkerOpen] = useState(false);
  const [linkerItemId, setLinkerItemId] = useState('');
  const [linkerItemTitle, setLinkerItemTitle] = useState('');
  const [linkerCurrentACs, setLinkerCurrentACs] = useState<string[]>([]);
  const [isLinkSaving, setIsLinkSaving] = useState(false);

  // AI Review
  const { reviewSubmission, isReviewing, result: aiResult, clearResult } = useAIPortfolioReview();
  const [aiSheetOpen, setAiSheetOpen] = useState(false);

  // Criteria reference sheet state
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

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // ── Loading state ────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center gap-3 animate-pulse">
          <div className="h-10 w-10 rounded-lg bg-white/10" />
          <div className="space-y-2">
            <div className="h-5 w-48 bg-white/10 rounded" />
            <div className="h-3 w-32 bg-white/5 rounded" />
          </div>
        </div>
        {/* Student info skeleton */}
        <Card className="bg-white/5 border-elec-gray/40 animate-pulse">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-white/10" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 bg-white/10 rounded" />
                <div className="h-3 w-48 bg-white/5 rounded" />
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Criteria skeleton */}
        <CriteriaChecklistSkeleton />
        {/* Items skeleton */}
        {[1, 2].map((i) => (
          <Card key={i} className="bg-white/5 border-elec-gray/40 animate-pulse">
            <CardContent className="p-4 space-y-3">
              <div className="h-4 w-3/4 bg-white/10 rounded" />
              <div className="h-3 w-full bg-white/5 rounded" />
              <div className="h-3 w-2/3 bg-white/5 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!submission) {
    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
          <p className="text-white">Submission not found</p>
          <Button
            variant="outline"
            onClick={onBack}
            className="mt-4 h-11 touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Queue
          </Button>
        </CardContent>
      </Card>
    );
  }

  // ── Portfolio Item Card ──────────────────────────────────────

  const PortfolioItemCard = ({ item }: { item: SubmissionPortfolioItem }) => {
    // Get ACs linked to this item from portfolio_items.assessment_criteria_met
    const itemACs: string[] = (item as any).assessmentCriteriaMet || [];

    return (
      <Card className="bg-white/5 border-elec-gray/40">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <CardDescription className="text-xs mt-1 text-white">
                Created {formatDate(item.createdAt)} •{' '}
                {Math.floor(item.timeSpent / 60)}h logged
              </CardDescription>
            </div>
            <Badge variant="outline" className="capitalize">
              {item.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {item.description && (
            <p className="text-sm text-white">{item.description}</p>
          )}

          {item.skillsDemonstrated.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.skillsDemonstrated.map((skill, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          {item.reflectionNotes && (
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <p className="text-xs text-blue-400 font-medium mb-1">
                Student Reflection
              </p>
              <p className="text-sm text-white">{item.reflectionNotes}</p>
            </div>
          )}

          {/* Assessment Criteria badges (NEW) */}
          {itemACs.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs text-white font-medium">
                Linked Criteria ({itemACs.length})
              </p>
              <div className="flex flex-wrap gap-1">
                {itemACs.map((ac) => (
                  <Badge
                    key={ac}
                    variant="outline"
                    className="text-xs border-elec-yellow/30 text-elec-yellow cursor-pointer touch-manipulation"
                    onClick={() => handleOpenReference(ac)}
                  >
                    AC {ac}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Link to Criteria button (NEW) */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 touch-manipulation text-white border-white/20 hover:border-elec-yellow/40 hover:text-elec-yellow"
            onClick={() => handleOpenLinker(item.id, item.title, itemACs)}
          >
            <Link2 className="h-3.5 w-3.5 mr-1.5" />
            Link to Criteria
          </Button>

          {item.evidenceFiles.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-white font-medium">
                Evidence Files ({item.evidenceFiles.length})
              </p>
              <div className="grid gap-2">
                {item.evidenceFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-elec-gray/40"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {getFileIcon(file.fileType)}
                      <span className="text-sm truncate">{file.fileName}</span>
                      <span className="text-xs text-white">
                        {formatFileSize(file.fileSize)}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-11 w-11 shrink-0 touch-manipulation"
                      onClick={() => window.open(file.fileUrl, '_blank')}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Per-item comments */}
          <div className="pt-3 border-t border-border/50">
            <EvidenceComments
              evidenceId={item.id}
              evidenceTitle={item.title}
              inline={true}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  // ── Render ───────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Success animation */}
      <SuccessCheckmark show={showSuccess} />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-11 w-11 touch-manipulation"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold">Review Submission</h2>
            <p className="text-sm text-white">{submission.categoryName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {['submitted', 'under_review', 'resubmitted'].includes(submission.status) && (
            <Button
              variant="outline"
              size="sm"
              className="h-11 touch-manipulation gap-2 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
              onClick={handleAIReview}
              disabled={isReviewing}
            >
              {isReviewing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              AI Review
            </Button>
          )}
          <Badge variant="outline" className="capitalize">
            {submission.status.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      {/* Student Info */}
      <Card className="bg-white/5 border-elec-gray/40">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow">
                {submission.studentName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{submission.studentName}</p>
              <p className="text-sm text-white">
                {submission.qualificationTitle}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                <span className="text-white">Submitted:</span>{' '}
                {formatDate(submission.submittedAt)}
              </p>
              <p className="text-sm">
                <span className="text-white">Attempt:</span> #
                {submission.submissionCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previous Feedback (if resubmission) */}
      {submission.previousFeedback && (
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-amber-400" />
              Previous Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white">{submission.previousFeedback}</p>
            {submission.previousGrade && (
              <Badge className="mt-2" variant="outline">
                Previous Grade: {submission.previousGrade}
              </Badge>
            )}
          </CardContent>
        </Card>
      )}

      {/* Assessment Criteria Checklist (NEW) */}
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
              // Find the first portfolio item to link to
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
        <h3 className="font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Portfolio Evidence ({submission.portfolioItems.length} items)
        </h3>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {submission.portfolioItems.map((item, index) => (
              <motion.div key={item.id} variants={staggerItem}>
                <AccordionItem
                  value={item.id}
                  className="border-elec-gray/40"
                >
                  <AccordionTrigger className="hover:no-underline px-4 py-3 bg-white/5 rounded-lg min-h-[44px] touch-manipulation">
                    <div className="flex items-center gap-3 text-left">
                      <span className="text-white text-sm">
                        #{index + 1}
                      </span>
                      <span className="font-medium">{item.title}</span>
                      <Badge variant="outline" className="ml-auto mr-4">
                        {item.evidenceFiles.length} files
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <PortfolioItemCard item={item} />
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>

      {/* Review Actions */}
      {submission.status === 'submitted' && (
        <Card className="bg-white/5 border-elec-gray/40">
          <CardContent className="p-4">
            <Button
              onClick={handleStartReview}
              className="w-full h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/80"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Review
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Feedback Form */}
      {(submission.status === 'under_review' ||
        submission.status === 'resubmitted') && (
        <Card className="bg-white/5 border-elec-gray/40">
          <CardHeader>
            <CardTitle className="text-base">Assessor Feedback</CardTitle>
            <CardDescription className="text-white">
              Provide detailed feedback on this submission
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Overall Feedback *</Label>
              <Textarea
                placeholder="Provide comprehensive feedback on the submission..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="bg-white/5 border-elec-gray/40 min-h-[120px] touch-manipulation text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Strengths Noted</Label>
                <Textarea
                  placeholder="What did the student do well?"
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  className="bg-white/5 border-elec-gray/40 touch-manipulation text-base"
                />
              </div>
              <div className="space-y-2">
                <Label>Areas for Improvement</Label>
                <Textarea
                  placeholder="What could be improved?"
                  value={improvements}
                  onChange={(e) => setImprovements(e.target.value)}
                  className="bg-white/5 border-elec-gray/40 touch-manipulation text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Grade *</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="bg-white/5 border-elec-gray/40 h-11 touch-manipulation">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-gray/40">
                  <SelectItem value="distinction" className="h-11 touch-manipulation">
                    Distinction
                  </SelectItem>
                  <SelectItem value="merit" className="h-11 touch-manipulation">
                    Merit
                  </SelectItem>
                  <SelectItem value="pass" className="h-11 touch-manipulation">
                    Pass
                  </SelectItem>
                  <SelectItem value="refer" className="h-11 touch-manipulation">
                    Refer (Resubmission Required)
                  </SelectItem>
                  <SelectItem value="not_yet_competent" className="h-11 touch-manipulation">
                    Not Yet Competent
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 h-11 touch-manipulation"
                onClick={() => setShowRejectSheet(true)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Request More Evidence
              </Button>
              <Button
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/80 h-11 touch-manipulation"
                onClick={handleSubmitFeedback}
                disabled={!feedback || !grade || isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Submit Feedback
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sign-off Section */}
      {submission.status === 'approved' && (
        <Card className="bg-green-500/10 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="h-5 w-5 text-green-400" />
              Ready for Sign-off
            </CardTitle>
            <CardDescription className="text-white">
              This submission has been approved. Sign off to complete the
              assessment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setShowSignOffSheet(true)}
              className="w-full bg-green-600 hover:bg-green-700 h-11 touch-manipulation"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Sign Off Submission
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Sign-off Bottom Sheet (converted from Dialog) */}
      <Sheet open={showSignOffSheet} onOpenChange={setShowSignOffSheet}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[50vh] p-0 rounded-t-2xl overflow-hidden"
        >
          <div className="flex flex-col bg-background">
            {/* Drag handle */}
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            <SheetHeader className="px-4 pb-4">
              <SheetTitle className="text-base">Confirm Sign-off</SheetTitle>
              <p className="text-sm text-white mt-1">
                By signing off this submission, you confirm that all evidence
                has been reviewed and meets the required standard for this
                qualification unit.
              </p>
            </SheetHeader>

            <SheetFooter className="border-t border-border p-4">
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1 h-11 touch-manipulation"
                  onClick={() => setShowSignOffSheet(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSignOff}
                  disabled={isSubmitting}
                  className="flex-1 bg-green-600 hover:bg-green-700 h-11 touch-manipulation"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Confirm Sign-off
                </Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Request Evidence Bottom Sheet (converted from Dialog) */}
      <Sheet open={showRejectSheet} onOpenChange={setShowRejectSheet}>
        <SheetContent
          side="bottom"
          className="h-auto max-h-[60vh] p-0 rounded-t-2xl overflow-hidden"
        >
          <div className="flex flex-col bg-background">
            {/* Drag handle */}
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            <SheetHeader className="px-4 pb-4">
              <SheetTitle className="text-base">
                Request Additional Evidence
              </SheetTitle>
              <p className="text-sm text-white mt-1">
                Explain what additional evidence the student needs to provide.
              </p>
            </SheetHeader>

            <div className="px-4 pb-4">
              <Textarea
                placeholder="Describe the additional evidence required..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="bg-white/5 border-elec-gray/40 min-h-[100px] touch-manipulation text-base"
              />
            </div>

            <SheetFooter className="border-t border-border p-4">
              <div className="flex gap-3 w-full">
                <Button
                  variant="outline"
                  className="flex-1 h-11 touch-manipulation"
                  onClick={() => setShowRejectSheet(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRequestMoreEvidence}
                  disabled={!rejectionReason || isSubmitting}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 h-11 touch-manipulation"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : null}
                  Send Request
                </Button>
              </div>
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>

      {/* Criteria Linker Sheet */}
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

      {/* Criteria Reference Sheet */}
      <CriteriaReferenceSheet
        open={refSheetOpen}
        onOpenChange={setRefSheetOpen}
        acRef={refSheetAC}
        acText={refSheetACText}
        categoryId={submission.categoryId}
      />

      {/* AI Review Sheet */}
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
    </div>
  );
};

export default SubmissionReviewPanel;
