/**
 * PortfolioDetailSheet
 *
 * Bottom sheet for viewing and editing portfolio evidence details.
 * Shows full entry info, comments, and actions (share, edit, delete).
 */

import { useState, useEffect } from 'react';
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
  Circle,
  BookOpen,
  Tag,
  ShieldCheck,
  Hash,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { usePortfolioSharing } from '@/hooks/portfolio/usePortfolioSharing';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { useSupervisorVerification } from '@/hooks/portfolio/useSupervisorVerification';
import { SupervisorVerificationQRSheet } from '@/components/portfolio-hub/SupervisorVerificationQRSheet';
import { useEvidenceValidator } from '@/hooks/portfolio/useEvidenceValidator';
import { EvidenceValidationReport } from '@/components/portfolio-hub/ai/EvidenceValidationReport';
import { useAIEvidenceTagger, type AIAnalysisResult, getStrengthColor, getConfidenceBadgeClass } from '@/hooks/portfolio/useAIEvidenceTagger';
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
  const {
    createVerification,
    getVerificationForPortfolioItem,
    getVerificationUrl,
  } = useSupervisorVerification();
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
        photos: entry.evidenceFiles?.filter((f: any) => f.type?.startsWith('image/'))
          .map((f: any) => f.url).filter(Boolean) || [],
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

    const evidenceFile = entry.evidenceFiles?.find((f: any) =>
      f.type?.startsWith('image/') || f.type?.includes('pdf')
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
      ? 'image' as const
      : evidenceFile.type?.includes('pdf')
        ? 'document' as const
        : 'image' as const;

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
    draft: 'bg-muted text-white/80',
    'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    completed: 'bg-green-500/10 text-green-500 border-green-500/30',
    reviewed: 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30',
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    await addComment({
      contextType: 'evidence',
      contextId: entry.id,
      content: newComment,
    });

    setNewComment('');
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
      await navigator.clipboard.writeText(shareUrl);
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
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        {/* Drag handle */}
        <div className="w-12 h-1 bg-muted rounded-full mx-auto mt-3 mb-2" />

        <div className="flex flex-col h-full">
          {/* Header with image/preview */}
          <div className="relative h-48 bg-muted shrink-0">
            {entry.evidenceFiles?.[0]?.url ? (
              <img
                src={entry.evidenceFiles[0].url}
                alt={entry.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FileText className="h-16 w-16 text-white/80/30" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h2 className="text-xl font-bold text-foreground mb-2">{entry.title}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className={cn(statusColors[entry.status] || statusColors.draft)}
                >
                  {entry.status || 'draft'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {typeof entry.category === 'object' ? entry.category?.name : entry.category || 'N/A'}
                </Badge>
                {(entry.category?.id === 'site-diary-evidence' || entry.category === 'site-diary-evidence') && (
                  <Badge variant="outline" className="text-xs bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                    <NotebookPen className="h-3 w-3 mr-1" />
                    From Site Diary
                  </Badge>
                )}
                {isVerified && (
                  <Badge variant="outline" className="text-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
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
          <div className="flex border-b border-border shrink-0">
            <button
              onClick={() => setActiveTab('details')}
              className={cn(
                'flex-1 h-11 text-sm font-medium border-b-2 transition-colors touch-manipulation',
                activeTab === 'details'
                  ? 'border-elec-yellow text-elec-yellow'
                  : 'border-transparent text-white/80'
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
                  : 'border-transparent text-white/80'
              )}
            >
              Comments
              {comments.length > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] bg-elec-yellow/20 text-elec-yellow rounded-full">
                  {comments.length}
                </span>
              )}
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {activeTab === 'details' ? (
              <div className="p-4 space-y-6">
                {/* Description */}
                {entry.description && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white/80">Description</h3>
                    <p className="text-sm text-foreground">{entry.description}</p>
                  </div>
                )}

                {/* Reflection */}
                {entry.reflection && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white/80">Reflection</h3>
                    <p className="text-sm text-foreground">{entry.reflection}</p>
                  </div>
                )}

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-white/80 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Created
                    </span>
                    <p className="text-sm text-foreground">
                      {new Date(entry.dateCreated).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {entry.timeSpent && (
                    <div className="space-y-1">
                      <span className="text-xs text-white/80 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Time Spent
                      </span>
                      <p className="text-sm text-foreground">{entry.timeSpent} mins</p>
                    </div>
                  )}
                </div>

                {/* Skills / KSBs */}
                {entry.skills?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white/80">Skills & KSBs</h3>
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
                    <h3 className="text-sm font-medium text-white/80 flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      Assessment Criteria ({entry.assessmentCriteria.length})
                    </h3>
                    <div className="space-y-1.5">
                      {entry.assessmentCriteria.map((ac: string, i: number) => {
                        const isExpanded = expandedAC === ac;
                        // Try to find matching AI criteria for detail
                        const matchedDetail = aiAnalysis?.matchedCriteria?.find((mc) =>
                          ac.includes(mc.acCode) && ac.includes(mc.unitCode || '')
                        );
                        return (
                          <button
                            key={i}
                            onClick={() => setExpandedAC(isExpanded ? null : ac)}
                            className="w-full text-left p-2.5 rounded-lg bg-green-500/5 border border-green-500/15 touch-manipulation active:bg-green-500/10 transition-colors"
                          >
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-sm text-white">{ac}</span>
                            </div>
                            {isExpanded && matchedDetail && (
                              <div className="mt-2 ml-6 space-y-1">
                                <p className="text-xs text-white leading-relaxed">{matchedDetail.acText}</p>
                                {matchedDetail.reason && (
                                  <p className="text-[11px] text-white/70 leading-relaxed">{matchedDetail.reason}</p>
                                )}
                                <Badge variant="outline" className={cn('text-[10px]', getConfidenceBadgeClass(matchedDetail.confidence))}>
                                  {matchedDetail.confidence}% confidence match
                                </Badge>
                              </div>
                            )}
                            {isExpanded && !matchedDetail && (
                              <p className="mt-2 ml-6 text-xs text-white/60">
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
                    <h3 className="text-sm font-medium text-white/80 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
                      AI Analysis
                    </h3>
                    <div className="p-3 rounded-lg bg-elec-yellow/5 border border-elec-yellow/15 space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStrengthColor(aiAnalysis.evidenceStrength)}>
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
                            const sorted = [...aiAnalysis.matchedCriteria].sort((a, b) => b.confidence - a.confidence);
                            // Group by unit
                            const byUnit = new Map<string, typeof sorted>();
                            for (const mc of sorted) {
                              const key = mc.unitCode || 'General';
                              if (!byUnit.has(key)) byUnit.set(key, []);
                              byUnit.get(key)!.push(mc);
                            }
                            // Sort unit groups by their best confidence
                            const unitEntries = Array.from(byUnit.entries()).sort(
                              (a, b) => Math.max(...b[1].map((m) => m.confidence)) - Math.max(...a[1].map((m) => m.confidence))
                            );
                            return unitEntries.map(([unitCode, criteria]) => (
                              <div key={unitCode} className="rounded-lg bg-white/[0.04] border border-white/[0.08] overflow-hidden">
                                <div className="px-3 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                                  <span className="text-[10px] font-bold text-elec-yellow">Unit {unitCode}</span>
                                  {criteria[0]?.unitTitle && (
                                    <p className="text-xs text-white leading-snug mt-0.5">{criteria[0].unitTitle}</p>
                                  )}
                                </div>
                                <div className="px-3 py-2.5 space-y-2">
                                  {criteria.map((mc, i) => {
                                    const ref = `${mc.unitCode} AC ${mc.acCode}`;
                                    const isSelected = selectedClaimACs.has(ref);
                                    const alreadyClaimed = (entry.assessmentCriteria || []).includes(ref);
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
                                            ? 'border-green-500/30 bg-green-500/10 opacity-70'
                                            : isSelected
                                              ? 'border-elec-yellow/40 bg-elec-yellow/10'
                                              : 'border-white/[0.08] bg-transparent active:bg-white/[0.04]'
                                        )}
                                      >
                                        <div className="flex items-start gap-2">
                                          {alreadyClaimed ? (
                                            <CheckCircle2 className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                                          ) : isSelected ? (
                                            <CheckCircle2 className="h-4 w-4 text-elec-yellow shrink-0 mt-0.5" />
                                          ) : (
                                            <Circle className="h-4 w-4 text-white/30 shrink-0 mt-0.5" />
                                          )}
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                              <Badge variant="outline" className={cn('text-[10px] shrink-0', getConfidenceBadgeClass(mc.confidence))}>
                                                {mc.confidence}%
                                              </Badge>
                                              {alreadyClaimed && (
                                                <span className="text-[10px] text-green-400 font-medium">Claimed</span>
                                              )}
                                            </div>
                                            <p className="text-xs text-white leading-relaxed mt-1">
                                              <span className="font-bold">{mc.acCode}:</span> {mc.acText}
                                            </p>
                                            {mc.reason && (
                                              <p className="text-[11px] text-white/70 leading-relaxed mt-1">
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
                          className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-green-500/15 border border-green-500/30 text-green-400 text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
                        >
                          <CheckCircle2 className="h-4.5 w-4.5" />
                          Claim {selectedClaimACs.size} Selected ACs
                        </button>
                      )}

                      {/* Tips to strengthen */}
                      {aiAnalysis.qualityTips?.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <p className="text-xs font-semibold text-white uppercase tracking-wider">Tips to strengthen:</p>
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
                    <h3 className="text-sm font-medium text-white/80 flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                      Learning Outcomes ({entry.learningOutcomes.length})
                    </h3>
                    <div className="space-y-1.5">
                      {entry.learningOutcomes.map((lo: string, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 p-2.5 rounded-lg bg-blue-500/5 border border-blue-500/15"
                        >
                          <BookOpen className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{lo}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {entry.tags?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white/80 flex items-center gap-1.5">
                      <Tag className="h-3.5 w-3.5" />
                      Tags
                    </h3>
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
                    <span className="text-xs text-white/80 flex items-center gap-1">
                      <FileCheck className="h-3 w-3 text-green-500" />
                      Completed
                    </span>
                    <p className="text-sm text-foreground">
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
                    <h3 className="text-sm font-medium text-white/80">
                      Evidence Files ({entry.evidenceFiles.length})
                    </h3>
                    <div className="space-y-2">
                      {entry.evidenceFiles.map((file: any, i: number) => (
                        <a
                          key={i}
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors touch-manipulation min-h-[48px]"
                        >
                          <FileIcon type={file.type} />
                          <span className="flex-1 text-sm text-foreground truncate">
                            {file.name || `File ${i + 1}`}
                          </span>
                          <ExternalLink className="h-4 w-4 text-white/80" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Supervisor Feedback */}
                {entry.supervisorFeedback && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white/80">Supervisor Feedback</h3>
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <p className="text-sm text-foreground">{entry.supervisorFeedback}</p>
                    </div>
                  </div>
                )}

                {/* Supervisor Verification Status */}
                {(isVerified || existingVerification) && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white/80 flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                      Supervisor Verification
                    </h3>
                    {isVerified && existingVerification?.verified_at ? (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          <span className="text-sm font-medium text-emerald-400">
                            Verified by {existingVerification.supervisor_name}
                          </span>
                        </div>
                        {existingVerification.supervisor_company && (
                          <p className="text-xs text-white/50 ml-6">{existingVerification.supervisor_company}</p>
                        )}
                        {existingVerification.feedback_text && (
                          <p className="text-sm text-white/70 ml-6 italic">
                            "{existingVerification.feedback_text}"
                          </p>
                        )}
                        {existingVerification.verification_hash && (
                          <div className="flex items-center gap-1.5 ml-6 mt-1">
                            <Hash className="h-3 w-3 text-white/30" />
                            <span className="text-[9px] text-white/30 font-mono break-all">
                              {existingVerification.verification_hash}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : existingVerification ? (
                      <button
                        onClick={() => setShowVerificationQR(true)}
                        className="w-full p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-left touch-manipulation active:scale-[0.98]"
                      >
                        <p className="text-sm text-purple-400 font-medium">Verification pending</p>
                        <p className="text-xs text-white/40 mt-0.5">
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
                    <MessageSquare className="h-8 w-8 text-white/80 mx-auto" />
                    <p className="text-sm text-white/80">No comments yet</p>
                    <p className="text-xs text-white/80">
                      Start a discussion about this evidence
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment: any) => (
                      <div key={comment.id} className="space-y-2">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-muted">
                            <User className="h-4 w-4 text-white/80" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">
                                {comment.authorName}
                              </span>
                              <Badge variant="outline" className="text-[10px]">
                                {comment.authorRole}
                              </Badge>
                              <span className="text-xs text-white/80">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-foreground mt-1">{comment.content}</p>
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
                <div className="flex gap-2 pt-4 border-t border-border">
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
          <div className="border-t border-border shrink-0 bg-background px-2 pt-2 pb-20 sm:pb-3">
            <div className="flex justify-evenly">
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 rounded-lg hover:bg-muted/60 touch-manipulation active:scale-95 transition-colors"
              >
                <Share2 className="h-5 w-5 text-white/80" />
                <span className="text-[10px] text-white/60">Share</span>
              </button>

              {entry.evidenceFiles?.length > 0 && (
                <button
                  onClick={aiAnalysis ? handleValidateEvidence : handleAnalyseEvidence}
                  disabled={isAnalyzing}
                  className="flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 rounded-lg hover:bg-muted/60 touch-manipulation active:scale-95 transition-colors disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-elec-yellow" />
                  )}
                  <span className="text-[10px] text-elec-yellow/80">
                    {isAnalyzing ? 'Analysing' : aiAnalysis ? 'Validate' : 'Analyse'}
                  </span>
                </button>
              )}

              <button
                onClick={handleRequestVerification}
                disabled={isCreatingVerification || isVerified}
                className={cn(
                  'flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 rounded-lg hover:bg-muted/60 touch-manipulation active:scale-95 transition-colors disabled:opacity-70',
                  isVerified && 'bg-emerald-500/10'
                )}
              >
                {isCreatingVerification ? (
                  <Loader2 className="h-5 w-5 text-purple-400 animate-spin" />
                ) : (
                  <ShieldCheck className={cn('h-5 w-5', isVerified ? 'text-emerald-400' : 'text-purple-400')} />
                )}
                <span className={cn('text-[10px]', isVerified ? 'text-emerald-400' : 'text-purple-400/80')}>
                  {isVerified ? 'Verified' : 'Verify'}
                </span>
              </button>

              <button
                onClick={handleEdit}
                className="flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 rounded-lg hover:bg-muted/60 touch-manipulation active:scale-95 transition-colors"
              >
                <Edit className="h-5 w-5 text-white/80" />
                <span className="text-[10px] text-white/60">Edit</span>
              </button>

              <button
                onClick={() => setShowDeleteDialog(true)}
                className="flex flex-col items-center gap-0.5 min-w-[56px] py-1.5 rounded-lg hover:bg-muted/60 touch-manipulation active:scale-95 transition-colors"
              >
                <Trash2 className="h-5 w-5 text-destructive/80" />
                <span className="text-[10px] text-destructive/60">Delete</span>
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
                <Loader2 className="h-8 w-8 animate-spin text-white/80" />
              </div>
            ) : shareUrl ? (
              <>
                <div className="flex items-center gap-2">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="flex-1 h-11"
                  />
                  <Button
                    size="icon"
                    onClick={handleCopyLink}
                    className="h-11 w-11 shrink-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-white/80">
                  This link expires in 7 days. Anyone with the link can view this evidence.
                </p>
              </>
            ) : (
              <p className="text-sm text-white/80 text-center py-4">
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
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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

// File icon helper
function FileIcon({ type }: { type?: string }) {
  if (type?.startsWith('image/')) {
    return <ImageIcon className="h-5 w-5 text-blue-500" />;
  }
  if (type?.startsWith('video/')) {
    return <Video className="h-5 w-5 text-purple-500" />;
  }
  if (type?.includes('pdf')) {
    return <FileText className="h-5 w-5 text-red-500" />;
  }
  return <FileText className="h-5 w-5 text-white/80" />;
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
