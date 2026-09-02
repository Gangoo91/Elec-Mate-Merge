/**
 * PortfolioDetailSheet
 *
 * Bottom sheet for viewing and editing portfolio evidence details.
 * Shows full entry info, comments, and actions (share, edit, delete).
 */

import { useState, useEffect } from 'react';
import { EvidenceImage } from '@/components/shared/EvidenceImage';
import { openEvidence } from '@/lib/evidenceUrl';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Share2,
  Edit,
  Trash2,
  MessageSquare,
  Send,
  Clock,
  Calendar,
  FileCheck,
  ExternalLink,
  Image as ImageIcon,
  FileText,
  Video,
  Link2,
  ChevronRight,
  User,
  Copy,
  Check,
  Loader2,
  NotebookPen,
  CheckCircle2,
  ShieldCheck,
  Hash,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getEvidenceReadiness, READINESS_LABELS } from '@/lib/portfolioReadiness';
import { copyToClipboard } from '@/utils/clipboard';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { usePortfolioSharing } from '@/hooks/portfolio/usePortfolioSharing';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { useSupervisorVerification } from '@/hooks/portfolio/useSupervisorVerification';
import { SupervisorVerificationQRSheet } from '@/components/portfolio-hub/SupervisorVerificationQRSheet';
import { useEvidenceValidator } from '@/hooks/portfolio/useEvidenceValidator';
import { EvidenceValidationReport } from '@/components/portfolio-hub/ai/EvidenceValidationReport';
import {
  useAIEvidenceTagger,
  type AIAnalysisResult,
  getStrengthColor,
  getConfidenceBadgeClass,
} from '@/hooks/portfolio/useAIEvidenceTagger';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useStudentQualification } from '@/hooks/useStudentQualification';

interface PortfolioDetailSheetProps {
  entry: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (entry: any) => void;
}

export function PortfolioDetailSheet({
  entry,
  open,
  onOpenChange,
  onEdit,
}: PortfolioDetailSheetProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'details' | 'comments'>('details');
  const [newComment, setNewComment] = useState('');
  const { getCommentsForEvidence, addComment } = usePortfolioComments();
  const { createShareLink, getShareUrl } = usePortfolioSharing();
  const { deleteEntry } = usePortfolioData();
  const { createVerification, getVerificationForPortfolioItem, getVerificationUrl } =
    useSupervisorVerification();
  const { validate, isValidating, result: validationResult } = useEvidenceValidator();
  const { analyze, isAnalyzing, result: aiAnalysis } = useAIEvidenceTagger();
  const { qualificationCode } = useStudentQualification();
  const { updateEntry } = usePortfolioData();

  // Dialog states
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showVerificationQR, setShowVerificationQR] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isCreatingShare, setIsCreatingShare] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCreatingVerification, setIsCreatingVerification] = useState(false);
  const [showValidationReport, setShowValidationReport] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedAC, setExpandedAC] = useState<string | null>(null);
  const [selectedClaimACs, setSelectedClaimACs] = useState<Set<string>>(new Set());

  // Auto-select ACs with >=75% confidence when AI analysis completes
  useEffect(() => {
    if (aiAnalysis?.matchedCriteria?.length) {
      const highConf = new Set(
        aiAnalysis.matchedCriteria
          .filter((mc) => mc.confidence >= 75 && mc.unitCode && mc.acCode)
          .map((mc) => `${mc.unitCode} AC ${mc.acCode}`)
      );
      setSelectedClaimACs(highConf);
    }
  }, [aiAnalysis]);

  if (!entry) return null;

  const meta = entry.metadata || {};
  const readiness = getEvidenceReadiness(entry);

  const existingVerification = getVerificationForPortfolioItem(entry.id);
  const isVerified = entry.isVerified || !!existingVerification?.verified_at;

  const handleRequestVerification = async () => {
    if (existingVerification) {
      setShowVerificationQR(true);
      return;
    }

    setIsCreatingVerification(true);
    try {
      const snapshot = {
        title: entry.title,
        description: entry.description,
        site_name: typeof entry.category === 'object' ? entry.category?.name : entry.category,
        date: entry.dateCreated,
        tasks: entry.assessmentCriteria || [],
        skills: entry.skills || [],
        learned: entry.reflection || '',
        photos:
          entry.evidenceFiles
            ?.filter((f: any) => f.type?.startsWith('image/'))
            .map((f: any) => f.url)
            .filter(Boolean) || [],
      };

      const profile = user?.user_metadata;
      const result = await createVerification({
        portfolioItemId: entry.id,
        evidenceSnapshot: snapshot,
        apprenticeName: profile?.full_name || profile?.name || 'Apprentice',
      });

      if (result) {
        setShowVerificationQR(true);
      }
    } catch (err) {
      console.error('Error creating verification:', err);
    } finally {
      setIsCreatingVerification(false);
    }
  };

  const handleValidateEvidence = async () => {
    setShowValidationReport(true);
    if (validationResult) return; // Already have results

    const evidenceText = [
      entry.title,
      entry.description,
      entry.reflection,
      entry.skills?.join(', '),
    ]
      .filter(Boolean)
      .join('\n');

    await validate({
      portfolioItemId: entry.id,
      evidenceText,
      evidenceUrls: entry.evidenceFiles
        ?.filter((f: any) => f.type?.startsWith('image/'))
        .map((f: any) => f.url)
        .filter(Boolean),
      claimedACs: entry.assessmentCriteria || [],
      qualificationCode: qualificationCode || '',
    });
  };

  const handleAnalyseEvidence = async () => {
    if (aiAnalysis) return; // Already have results

    const evidenceFile = entry.evidenceFiles?.find(
      (f: any) => f.type?.startsWith('image/') || f.type?.includes('pdf')
    );

    if (!evidenceFile?.url) {
      toast({
        title: 'No evidence file',
        description: 'Upload a photo or document first to use AI analysis',
        variant: 'destructive',
      });
      return;
    }

    const evidenceType = evidenceFile.type?.startsWith('image/')
      ? ('image' as const)
      : evidenceFile.type?.includes('pdf')
        ? ('document' as const)
        : ('image' as const);

    const result = await analyze({
      evidenceUrl: evidenceFile.url,
      evidenceType,
      title: entry.title,
      description: entry.description,
      qualificationCode,
      existingTags: entry.tags,
    });

    // Don't auto-apply — let the user claim ACs via the "Claim" button
  };

  // Claim selected ACs — saves in canonical "UNIT AC CODE" format for progress tracker
  const handleClaimACs = async () => {
    if (selectedClaimACs.size === 0) return;

    const newRefs = Array.from(selectedClaimACs);

    const existing = entry.assessmentCriteria || [];
    const merged = [...new Set([...existing, ...newRefs])];
    const added = merged.length - existing.length;

    if (added > 0) {
      await updateEntry(entry.id, { assessmentCriteria: merged } as any);
      toast({
        title: `${added} assessment criteria claimed`,
        description: 'Your qualification progress has been updated',
      });
    } else {
      toast({
        title: 'Already claimed',
        description: 'These criteria are already linked to this evidence',
      });
    }
  };

  const comments = getCommentsForEvidence(entry.id) || [];

  const statusColors: Record<string, string> = {
    draft: 'bg-white/[0.06] text-white',
    'in-progress': 'bg-white/[0.02] text-white border-white/[0.06]',
    completed: 'bg-white/[0.02] text-white border-white/[0.06]',
    reviewed: 'text-elec-yellow border-elec-yellow/60',
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    /*
     * author_name and author_role are NOT NULL on portfolio_comments, and
     * this call used to pass neither — so the insert was rejected before it
     * reached the table. The reply then appeared in the UI anyway (the hook
     * added it optimistically and swallowed the error), so the apprentice
     * believed their tutor had received it.
     */
    const name = user?.user_metadata?.full_name || user?.user_metadata?.name || 'Apprentice';
    try {
      await addComment({
        contextType: 'evidence',
        contextId: entry.id,
        authorId: user?.id,
        authorName: name,
        authorRole: 'student',
        authorInitials: name
          .split(' ')
          .map((part: string) => part[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        content: newComment,
        mentions: [],
        requiresAction: false,
        isResolved: false,
      });
      setNewComment('');
    } catch {
      toast({
        title: 'Comment not sent',
        description: 'We could not save your reply. Check your connection and try again.',
        variant: 'destructive',
      });
    }
  };

  const handleShare = async () => {
    setShowShareDialog(true);
    setIsCreatingShare(true);
    setCopied(false);

    try {
      const share = await createShareLink({
        entryIds: [entry.id],
        title: entry.title,
        description: entry.description,
        expiresIn: '7d',
      });

      if (share) {
        setShareUrl(getShareUrl(share.token));
      }
    } catch (error) {
      console.error('Error creating share link:', error);
      toast({
        title: 'Error',
        description: 'Failed to create share link',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingShare(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await copyToClipboard(shareUrl);
      setCopied(true);
      toast({
        title: 'Link copied',
        description: 'Share link copied to clipboard',
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy link',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(entry);
      onOpenChange(false);
    } else {
      toast({
        title: 'Edit mode',
        description: 'Opening edit view...',
      });
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteEntry(entry.id);
      toast({
        title: 'Evidence deleted',
        description: 'The evidence has been removed from your portfolio',
      });
      setShowDeleteDialog(false);
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete evidence',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] overflow-hidden rounded-t-2xl border-white/[0.06] bg-[hsl(0_0%_8%)] p-0"
      >
        {/* ONE column, handle included — a handle above the column pushed
            the action bar off the bottom of the sheet. */}
        <div className="flex h-full flex-col">
          <div className="mx-auto mt-3 h-1 w-12 shrink-0 rounded-full bg-white/15" />
          {/* Header with image/preview */}
          <div className="relative mt-2 h-48 shrink-0 bg-white/[0.04]">
            {entry.evidenceFiles?.[0]?.url ? (
              <EvidenceImage
                src={entry.evidenceFiles[0].url}
                alt={entry.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FileText className="h-16 w-16 text-white" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_8%)] via-[hsl(0_0%_8%)]/60 to-transparent" />

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="mb-2 text-xl font-bold text-white">{entry.title}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className={cn(statusColors[entry.status] || statusColors.draft)}
                >
                  {entry.status || 'draft'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {typeof entry.category === 'object'
                    ? entry.category?.name
                    : entry.category || 'N/A'}
                </Badge>
                {(entry.category?.id === 'site-diary-evidence' ||
                  entry.category === 'site-diary-evidence') && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-white/[0.02] text-white border-white/[0.06]"
                  >
                    <NotebookPen className="h-3 w-3 mr-1" />
                    From Site Diary
                  </Badge>
                )}
                {isVerified && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-white/[0.02] text-white border-white/[0.06]"
                  >
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
                {entry.skills?.slice(0, 3).map((skill: string, i: number) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Tab buttons */}
          <div className="flex shrink-0 border-b border-white/[0.08]">
            <button
              onClick={() => setActiveTab('details')}
              className={cn(
                'flex-1 h-11 text-sm font-medium border-b-2 transition-colors touch-manipulation',
                activeTab === 'details'
                  ? 'border-elec-yellow text-elec-yellow'
                  : 'border-transparent text-white'
              )}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={cn(
                'flex-1 h-11 text-sm font-medium border-b-2 transition-colors flex items-center justify-center gap-2 touch-manipulation',
                activeTab === 'comments'
                  ? 'border-elec-yellow text-elec-yellow'
                  : 'border-transparent text-white'
              )}
            >
              Comments
              {comments.length > 0 && (
                <span className="rounded-full bg-elec-yellow px-1.5 py-0.5 text-[10px] font-semibold text-black">
                  {comments.length}
                </span>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {activeTab === 'details' ? (
              <div className="p-4 space-y-6">
                {/* Assessor readiness (VACSR) */}
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-medium text-white">Assessor readiness</h3>
                    {readiness.ready ? (
                      <span className="text-[10px] uppercase tracking-[0.14em] text-elec-yellow">
                        Ready
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-[0.14em] text-white">
                        {readiness.score}/5
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {READINESS_LABELS.map(({ k, label }) => {
                      const on = readiness.checks[k];
                      return (
                        <span
                          key={k}
                          className={cn(
                            'inline-flex items-center gap-1 px-2 h-6 rounded-full text-[10px] font-medium border',
                            on
                              ? 'border-elec-yellow text-elec-yellow'
                              : 'border-white/[0.08] text-white'
                          )}
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              on ? 'bg-elec-yellow' : 'bg-white/30'
                            )}
                          />
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                {entry.description && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">Description</h3>
                    <p className="text-sm text-white">{entry.description}</p>
                  </div>
                )}

                {/* Reflection */}
                {entry.reflection && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">Reflection</h3>
                    <p className="text-sm text-white whitespace-pre-line">{entry.reflection}</p>
                  </div>
                )}

                {/* Work details (assessor metadata) */}
                {(meta.workDate ||
                  meta.siteRef ||
                  meta.role ||
                  meta.evidenceType ||
                  meta.witness?.name ||
                  meta.authenticityConfirmed) && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-white">Work details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {meta.workDate && (
                        <div className="space-y-1">
                          <span className="text-xs text-white flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Date of work
                          </span>
                          <p className="text-sm text-white">
                            {new Date(meta.workDate).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                      )}
                      {meta.siteRef && (
                        <div className="space-y-1">
                          <span className="text-xs text-white">Site / job</span>
                          <p className="text-sm text-white">{meta.siteRef}</p>
                        </div>
                      )}
                      {meta.evidenceType && (
                        <div className="space-y-1">
                          <span className="text-xs text-white">Evidence type</span>
                          <p className="text-sm text-white">
                            {EVIDENCE_TYPE_LABEL[meta.evidenceType] || meta.evidenceType}
                          </p>
                        </div>
                      )}
                    </div>
                    {meta.role && (
                      <div className="space-y-1">
                        <span className="text-xs text-white">What they personally did</span>
                        <p className="text-sm text-white">{meta.role}</p>
                      </div>
                    )}
                    {meta.witness?.name && (
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-white">
                          <User className="h-3 w-3" />
                          Witnessed by
                        </div>
                        <p className="text-sm text-white">
                          {meta.witness.name}
                          {meta.witness.role ? ` · ${meta.witness.role}` : ''}
                        </p>
                        {meta.witness.date && (
                          <p className="text-xs text-white">
                            {new Date(meta.witness.date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        )}
                      </div>
                    )}
                    {meta.authenticityConfirmed && (
                      <div className="flex items-center gap-1.5 text-xs text-white">
                        <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow" />
                        Apprentice confirmed this is their own work
                      </div>
                    )}
                  </div>
                )}

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-white flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Created
                    </span>
                    <p className="text-sm text-white">
                      {new Date(entry.dateCreated).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {/* `{0 && …}` renders a literal 0 in JSX — that stray "0"
                      was sitting next to the Created date on every entry with
                      no time logged. Compare, don't coerce. */}
                  {entry.timeSpent > 0 && (
                    <div className="space-y-1">
                      <span className="text-xs text-white flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Time Spent
                      </span>
                      <p className="text-sm text-white">{entry.timeSpent} mins</p>
                    </div>
                  )}
                </div>

                {/* Skills / KSBs */}
                {entry.skills?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">Skills & KSBs</h3>
                    <div className="flex flex-wrap gap-2">
                      {entry.skills.map((skill: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assessment Criteria */}
                {entry.assessmentCriteria?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">
                      Assessment Criteria ({entry.assessmentCriteria.length})
                    </h3>
                    <div className="space-y-1.5">
                      {entry.assessmentCriteria.map((ac: string, i: number) => {
                        const isExpanded = expandedAC === ac;
                        // Try to find matching AI criteria for detail
                        const matchedDetail = aiAnalysis?.matchedCriteria?.find(
                          (mc) => ac.includes(mc.acCode) && ac.includes(mc.unitCode || '')
                        );
                        return (
                          <button
                            key={i}
                            onClick={() => setExpandedAC(isExpanded ? null : ac)}
                            className="w-full text-left p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] touch-manipulation active:bg-white/[0.02] transition-colors"
                          >
                            <div className="flex items-start gap-2.5">
                              <span className="h-2 w-2 rounded-full bg-elec-yellow shrink-0 mt-1.5" />
                              <span className="text-sm text-white">{ac}</span>
                            </div>
                            {isExpanded && matchedDetail && (
                              <div className="mt-2 ml-6 space-y-1">
                                <p className="text-xs text-white leading-relaxed">
                                  {matchedDetail.acText}
                                </p>
                                {matchedDetail.reason && (
                                  <p className="text-[11px] text-white leading-relaxed">
                                    {matchedDetail.reason}
                                  </p>
                                )}
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    'text-[10px]',
                                    getConfidenceBadgeClass(matchedDetail.confidence)
                                  )}
                                >
                                  {matchedDetail.confidence}% confidence match
                                </Badge>
                              </div>
                            )}
                            {isExpanded && !matchedDetail && (
                              <p className="mt-2 ml-6 text-xs text-white">
                                Run AI analysis to see match details
                              </p>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* AI Analysis Results */}
                {aiAnalysis && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">AI Analysis</h3>
                    <div className="space-y-3 rounded-xl border border-elec-yellow/35 bg-white/[0.05] p-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={getStrengthColor(aiAnalysis.evidenceStrength)}
                        >
                          {aiAnalysis.evidenceStrength} evidence
                        </Badge>
                      </div>
                      <p className="text-sm text-white">{aiAnalysis.whyGoodEvidence}</p>

                      {/* Matched ACs — promoted above tips, this is the key insight */}
                      {aiAnalysis.matchedCriteria?.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <p className="text-xs font-semibold text-elec-yellow uppercase tracking-wider">
                            Assessment Criteria Mapped ({aiAnalysis.matchedCriteria.length})
                          </p>
                          {(() => {
                            // Sort by highest confidence first
                            const sorted = [...aiAnalysis.matchedCriteria].sort(
                              (a, b) => b.confidence - a.confidence
                            );
                            // Group by unit
                            const byUnit = new Map<string, typeof sorted>();
                            for (const mc of sorted) {
                              const key = mc.unitCode || 'General';
                              if (!byUnit.has(key)) byUnit.set(key, []);
                              byUnit.get(key)!.push(mc);
                            }
                            // Sort unit groups by their best confidence
                            const unitEntries = Array.from(byUnit.entries()).sort(
                              (a, b) =>
                                Math.max(...b[1].map((m) => m.confidence)) -
                                Math.max(...a[1].map((m) => m.confidence))
                            );
                            return unitEntries.map(([unitCode, criteria]) => (
                              <div
                                key={unitCode}
                                className="rounded-lg bg-white/[0.04] border border-white/[0.08] overflow-hidden"
                              >
                                <div className="px-3 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                                  <span className="text-[10px] font-bold text-elec-yellow">
                                    Unit {unitCode}
                                  </span>
                                  {criteria[0]?.unitTitle && (
                                    <p className="text-xs text-white leading-snug mt-0.5">
                                      {criteria[0].unitTitle}
                                    </p>
                                  )}
                                </div>
                                <div className="px-3 py-2.5 space-y-2">
                                  {criteria.map((mc, i) => {
                                    const ref = `${mc.unitCode} AC ${mc.acCode}`;
                                    const isSelected = selectedClaimACs.has(ref);
                                    const alreadyClaimed = (
                                      entry.assessmentCriteria || []
                                    ).includes(ref);
                                    return (
                                      <button
                                        key={i}
                                        onClick={() => {
                                          if (alreadyClaimed) return;
                                          setSelectedClaimACs((prev) => {
                                            const next = new Set(prev);
                                            if (next.has(ref)) next.delete(ref);
                                            else next.add(ref);
                                            return next;
                                          });
                                        }}
                                        className={cn(
                                          'w-full text-left rounded-lg p-2.5 border transition-colors touch-manipulation',
                                          alreadyClaimed
                                            ? 'border-white/[0.06] bg-white/[0.02] opacity-70'
                                            : isSelected
                                              ? 'border-elec-yellow bg-white/[0.06]'
                                              : 'border-white/[0.08] bg-transparent active:bg-white/[0.04]'
                                        )}
                                      >
                                        <div className="flex items-start gap-2">
                                          <span
                                            className={cn(
                                              'h-3 w-3 rounded-full shrink-0 mt-1 border-2',
                                              alreadyClaimed
                                                ? 'bg-white/40 border-white/40'
                                                : isSelected
                                                  ? 'bg-elec-yellow border-elec-yellow'
                                                  : 'bg-transparent border-white/30'
                                            )}
                                          />
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                              <Badge
                                                variant="outline"
                                                className={cn(
                                                  'text-[10px] shrink-0',
                                                  getConfidenceBadgeClass(mc.confidence)
                                                )}
                                              >
                                                {mc.confidence}%
                                              </Badge>
                                              {alreadyClaimed && (
                                                <span className="text-[10px] text-white font-medium">
                                                  Claimed
                                                </span>
                                              )}
                                            </div>
                                            <p className="text-xs text-white leading-relaxed mt-1">
                                              <span className="font-bold">{mc.acCode}:</span>{' '}
                                              {mc.acText}
                                            </p>
                                            {mc.reason && (
                                              <p className="text-[11px] text-white leading-relaxed mt-1">
                                                {mc.reason}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ));
                          })()}
                        </div>
                      )}

                      {/* Claim ACs button */}
                      {aiAnalysis.matchedCriteria?.length > 0 && selectedClaimACs.size > 0 && (
                        <button
                          onClick={handleClaimACs}
                          className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
                        >
                          <CheckCircle2 className="h-4.5 w-4.5" />
                          Claim {selectedClaimACs.size} Selected ACs
                        </button>
                      )}

                      {/* Tips to strengthen */}
                      {aiAnalysis.qualityTips?.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <p className="text-xs font-semibold text-white uppercase tracking-wider">
                            Tips to strengthen:
                          </p>
                          {aiAnalysis.qualityTips.map((tip, i) => (
                            <p key={i} className="text-xs text-white flex items-start gap-1.5">
                              <span className="text-elec-yellow mt-0.5">•</span>
                              {tip}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Learning Outcomes */}
                {entry.learningOutcomes?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">
                      Learning Outcomes ({entry.learningOutcomes.length})
                    </h3>
                    <div className="space-y-1.5">
                      {entry.learningOutcomes.map((lo: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06]"
                        >
                          <span className="h-2 w-2 rounded-full bg-white/40 shrink-0 mt-1.5" />
                          <span className="text-sm text-white">{lo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {entry.tags?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag: string, i: number) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Date Completed */}
                {entry.dateCompleted && (
                  <div className="space-y-1">
                    <span className="text-xs text-white flex items-center gap-1">
                      <FileCheck className="h-3 w-3 text-white" />
                      Completed
                    </span>
                    <p className="text-sm text-white">
                      {new Date(entry.dateCompleted).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                )}

                {/* Evidence Files */}
                {entry.evidenceFiles?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">
                      Evidence Files ({entry.evidenceFiles.length})
                    </h3>
                    <div className="space-y-2">
                      {entry.evidenceFiles.map((file: any, i: number) => (
                        <a
                          key={i}
                          href={file.url}
                          onClick={(e) => {
                            e.preventDefault();
                            void openEvidence(file.url);
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.06] hover:bg-white/[0.06] transition-colors touch-manipulation min-h-[48px]"
                        >
                          <FileIcon type={file.type} />
                          <span className="flex-1 text-sm text-white truncate">
                            {file.name || `File ${i + 1}`}
                          </span>
                          <ExternalLink className="h-4 w-4 text-white" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supervisor Feedback */}
                {entry.supervisorFeedback && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">Supervisor Feedback</h3>
                    <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                      <p className="text-sm text-white">{entry.supervisorFeedback}</p>
                    </div>
                  </div>
                )}

                {/* Supervisor Verification Status */}
                {(isVerified || existingVerification) && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">Supervisor Verification</h3>
                    {isVerified && existingVerification?.verified_at ? (
                      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-elec-yellow shrink-0" />
                          <span className="text-sm font-medium text-white">
                            Verified by {existingVerification.supervisor_name}
                          </span>
                        </div>
                        {existingVerification.supervisor_company && (
                          <p className="text-xs text-white ml-6">
                            {existingVerification.supervisor_company}
                          </p>
                        )}
                        {existingVerification.feedback_text && (
                          <p className="text-sm text-white ml-6 italic">
                            "{existingVerification.feedback_text}"
                          </p>
                        )}
                        {existingVerification.verification_hash && (
                          <div className="flex items-center gap-1.5 ml-6 mt-1">
                            <Hash className="h-3 w-3 text-white" />
                            <span className="text-[9px] text-white font-mono break-all">
                              {existingVerification.verification_hash}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : existingVerification ? (
                      <button
                        onClick={() => setShowVerificationQR(true)}
                        className="w-full p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] text-left touch-manipulation active:scale-[0.98]"
                      >
                        <p className="text-sm text-white font-medium">Verification pending</p>
                        <p className="text-xs text-white mt-0.5">
                          Tap to show QR code or share link
                        </p>
                      </button>
                    ) : null}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {/* Comments list */}
                {comments.length === 0 ? (
                  <div className="text-center py-8 space-y-2">
                    <MessageSquare className="h-8 w-8 text-white mx-auto" />
                    <p className="text-sm text-white">No comments yet</p>
                    <p className="text-xs text-white">Start a discussion about this evidence</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment: any) => (
                      <div key={comment.id} className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-white/[0.06]">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">
                                {comment.authorName}
                              </span>
                              <Badge variant="outline" className="text-[10px]">
                                {comment.authorRole}
                              </Badge>
                              <span className="text-xs text-white">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-white mt-1">{comment.content}</p>
                            {comment.requiresAction && !comment.isResolved && (
                              <Badge variant="destructive" className="mt-2 text-[10px]">
                                Action Required
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add comment */}
                <div className="flex gap-2 pt-4 border-t border-white/[0.10]">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[60px] resize-none touch-manipulation"
                  />
                  <Button
                    size="icon"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="shrink-0 h-11 w-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Actions — native icon toolbar */}
          <div
            className="shrink-0 border-t border-white/[0.08] bg-[hsl(0_0%_8%)] px-2 pt-2"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex justify-evenly">
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 min-h-11 rounded-lg touch-manipulation transition-colors hover:bg-white/[0.06] active:scale-95"
              >
                <Share2 className="h-5 w-5 text-white" />
                <span className="text-[10px] text-white">Share</span>
              </button>

              {entry.evidenceFiles?.length > 0 && (
                <button
                  onClick={aiAnalysis ? handleValidateEvidence : handleAnalyseEvidence}
                  disabled={isAnalyzing}
                  className="flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 min-h-11 rounded-lg touch-manipulation transition-colors hover:bg-white/[0.06] active:scale-95 disabled:text-white/70"
                >
                  {isAnalyzing ? (
                    <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-elec-yellow" />
                  )}
                  <span className="text-[10px] text-elec-yellow">
                    {isAnalyzing ? 'Analysing' : aiAnalysis ? 'Validate' : 'Analyse'}
                  </span>
                </button>
              )}

              <button
                onClick={handleRequestVerification}
                disabled={isCreatingVerification || isVerified}
                className={cn(
                  'flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 min-h-11 rounded-lg touch-manipulation transition-colors hover:bg-white/[0.06] active:scale-95 disabled:text-white/70',
                  isVerified && 'bg-white/[0.02]'
                )}
              >
                {isCreatingVerification ? (
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                ) : (
                  <ShieldCheck
                    className={cn('h-5 w-5', isVerified ? 'text-white' : 'text-elec-yellow')}
                  />
                )}
                <span className={cn('text-[10px]', isVerified ? 'text-white' : 'text-elec-yellow')}>
                  {isVerified ? 'Verified' : 'Verify'}
                </span>
              </button>

              <button
                onClick={handleEdit}
                className="flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 min-h-11 rounded-lg touch-manipulation transition-colors hover:bg-white/[0.06] active:scale-95"
              >
                <Edit className="h-5 w-5 text-white" />
                <span className="text-[10px] text-white">Edit</span>
              </button>

              <button
                onClick={() => setShowDeleteDialog(true)}
                className="flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 min-h-11 rounded-lg touch-manipulation transition-colors hover:bg-white/[0.06] active:scale-95"
              >
                <Trash2 className="h-5 w-5 text-red-400" />
                <span className="text-[10px] text-red-400">Delete</span>
              </button>
            </div>
          </div>
        </div>
      </SheetContent>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Evidence</DialogTitle>
            <DialogDescription>
              Share this evidence with your tutor, assessor, or employer
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {isCreatingShare ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            ) : shareUrl ? (
              <>
                <div className="flex items-center gap-2">
                  <Input value={shareUrl} readOnly className="flex-1 h-11" />
                  <Button size="icon" onClick={handleCopyLink} className="h-11 w-11 shrink-0">
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-white">
                  This link expires in 7 days. Anyone with the link can view this evidence.
                </p>
              </>
            ) : (
              <p className="text-sm text-white text-center py-4">
                Failed to create share link. Please try again.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Evidence</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{entry.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Supervisor Verification QR Sheet */}
      {existingVerification && (
        <SupervisorVerificationQRSheet
          open={showVerificationQR}
          onOpenChange={setShowVerificationQR}
          verification={existingVerification}
          verificationUrl={getVerificationUrl(existingVerification.verification_token)}
          evidenceTitle={entry.title}
        />
      )}

      {/* Evidence Validation Report */}
      <EvidenceValidationReport
        open={showValidationReport}
        onOpenChange={setShowValidationReport}
        result={validationResult}
        isLoading={isValidating}
      />
    </Sheet>
  );
}

const EVIDENCE_TYPE_LABEL: Record<string, string> = {
  observation: 'Observation',
  'work-product': 'Work product',
  'witness-testimony': 'Witness testimony',
  'professional-discussion': 'Professional discussion',
  photo: 'Photo',
  'reflective-account': 'Reflective account',
};

// File icon helper
function FileIcon({ type }: { type?: string }) {
  if (type?.startsWith('image/')) {
    return <ImageIcon className="h-5 w-5 text-white" />;
  }
  if (type?.startsWith('video/')) {
    return <Video className="h-5 w-5 text-white" />;
  }
  if (type?.includes('pdf')) {
    return <FileText className="h-5 w-5 text-red-500" />;
  }
  return <FileText className="h-5 w-5 text-white" />;
}

// Date formatter
function formatDate(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default PortfolioDetailSheet;
