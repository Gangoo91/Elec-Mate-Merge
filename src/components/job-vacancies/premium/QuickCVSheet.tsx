/**
 * QuickCVSheet — editorial CV preview sheet.
 *
 * 85vh bottom sheet, type-led. Eyebrow + title, gradient surface preview
 * card, four-cell completeness strip, primary download CTA + edit. Drops
 * the cyan/blue gradient chrome for the College Hub editorial cadence.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Download,
  Edit2,
  CheckCircle2,
  AlertCircle,
  IdCard,
  ArrowRight,
  Plus,
  Loader2,
  Star,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  X,
} from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import { usePrimaryCV, useCVs, calculateCVCompleteness } from '@/hooks/useCV';
import { useCVSyncStatus, useElecIdForCV } from '@/hooks/useCVSync';
import { generateCVPDFByTemplate } from '@/components/cv-builder/pdfGenerators';
import { toast } from '@/hooks/use-toast';
import { storageSetJSONSync, storageSetSync } from '@/utils/storage';

interface QuickCVSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEMPLATE_LABEL: Record<string, string> = {
  classic: 'Classic',
  modern: 'Modern',
  creative: 'Creative',
  technical: 'Technical',
};

const QuickCVSheet = ({ isOpen, onClose }: QuickCVSheetProps) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  const { data: primaryCV, isLoading: isLoadingPrimaryCV } = usePrimaryCV();
  const { data: allCVs, isLoading: isLoadingAllCVs } = useCVs();
  const { data: elecIdData } = useElecIdForCV();

  const isLoading = isLoadingPrimaryCV || isLoadingAllCVs;
  const cv = primaryCV || allCVs?.[0];
  const cvSyncStatus = useCVSyncStatus(cv?.cv_data);

  const hasElecIdProfile = !!elecIdData?.profile;
  const templateLabel = cv ? TEMPLATE_LABEL[cv.template_id] || 'Classic' : null;
  const completeness = cv ? calculateCVCompleteness(cv.cv_data) : 0;
  const completenessTone =
    completeness >= 80 ? 'text-emerald-300' : completeness >= 50 ? 'text-amber-300' : 'text-red-300';

  const handleDownload = async () => {
    if (!cv) return;
    setIsDownloading(true);
    try {
      await generateCVPDFByTemplate(cv.cv_data, cv.template_id);
      toast({ title: 'CV downloaded', description: 'Your CV has been saved as a PDF.' });
    } catch {
      toast({
        title: 'Download failed',
        description: 'Could not generate the PDF — please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleEditCV = () => {
    if (cv) {
      storageSetJSONSync('elecmate-cv-draft', cv.cv_data);
      storageSetSync('elecmate-cv-template', cv.template_id);
      storageSetSync('elecmate-cv-editing-id', cv.id);
    }
    navigate('/electrician/cv-builder');
    onClose();
  };

  const handleCreateCV = () => {
    navigate('/electrician/cv-builder');
    onClose();
  };

  const handleViewElecId = () => {
    navigate('/settings?tab=elec-id');
    onClose();
  };

  const handleManageCVs = () => {
    navigate('/settings?tab=elec-id&subtab=cv');
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-3xl overflow-hidden border-t border-white/[0.10] bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)]"
      >
        <VisuallyHidden>
          <SheetTitle>Your CV</SheetTitle>
          <SheetDescription>Quick access to your CV for one-tap applications</SheetDescription>
        </VisuallyHidden>
        <div className="flex flex-col h-full">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 rounded-full bg-white/15" />
          </div>

          {/* Header */}
          <div className="flex items-start justify-between gap-3 px-5 sm:px-6 pt-2 pb-4 border-b border-white/[0.06]">
            <div className="space-y-1">
              <Eyebrow>YOUR CV</Eyebrow>
              <h2 className="text-[22px] sm:text-[26px] font-semibold tracking-tight leading-tight">
                <span className="text-elec-yellow">Apply</span>{' '}
                <span className="text-white">in one tap.</span>
              </h2>
              <p className="text-[12px] text-white/85">
                Download or refresh before sending — keeps everything sharp.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {hasElecIdProfile && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300 border border-emerald-500/40 bg-emerald-500/[0.08] rounded-md px-1.5 py-0.5">
                  <CheckCircle2 className="h-3 w-3" />
                  Linked
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-white/65 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center touch-manipulation transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
            {isLoading ? (
              <LoadingSkeleton />
            ) : cv ? (
              <>
                {/* CV preview card */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className={cn(
                    'rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden',
                    cv.is_primary ? 'border-elec-yellow/35' : 'border-white/[0.10]'
                  )}
                >
                  <div className="h-[2px] bg-elec-yellow" aria-hidden />

                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-elec-yellow/[0.08] border border-elec-yellow/30 shrink-0">
                        <IdCard className="h-5 w-5 text-elec-yellow" aria-hidden />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <Eyebrow>{templateLabel ?? 'CV'} TEMPLATE</Eyebrow>
                          {cv.is_primary && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-elec-yellow border border-elec-yellow/40 bg-elec-yellow/[0.08] rounded-md px-1.5 py-0.5">
                              <Star className="h-2.5 w-2.5 fill-current" />
                              Primary
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1.5 text-[16px] sm:text-[17px] font-semibold tracking-tight text-white truncate">
                          {cv.title || 'My CV'}
                        </h3>
                        <div className="mt-2 flex items-baseline gap-3 flex-wrap">
                          <div className="inline-flex items-baseline gap-1.5">
                            <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
                              Complete
                            </span>
                            <span className={cn('text-[13px] font-semibold tabular-nums', completenessTone)}>
                              {completeness}%
                            </span>
                          </div>
                          {!cvSyncStatus.isLoading && (
                            <span
                              className={cn(
                                'inline-flex items-center gap-1 text-[10.5px] uppercase tracking-[0.14em] font-semibold',
                                cvSyncStatus.needsSync ? 'text-amber-300' : 'text-emerald-300'
                              )}
                            >
                              {cvSyncStatus.needsSync ? (
                                <>
                                  <AlertCircle className="h-3 w-3" />
                                  Updates available
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="h-3 w-3" />
                                  Synced
                                </>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Completeness grid */}
                    <dl className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-2 gap-x-4 gap-y-3 text-[11px]">
                      <PreviewStat
                        icon={User}
                        label="Personal info"
                        value={cv.cv_data.personalInfo.fullName || 'Not set'}
                        complete={!!cv.cv_data.personalInfo.fullName}
                      />
                      <PreviewStat
                        icon={Briefcase}
                        label="Experience"
                        value={`${cv.cv_data.experience.length} ${cv.cv_data.experience.length === 1 ? 'role' : 'roles'}`}
                        complete={cv.cv_data.experience.length > 0}
                      />
                      <PreviewStat
                        icon={GraduationCap}
                        label="Education"
                        value={`${cv.cv_data.education.length} ${cv.cv_data.education.length === 1 ? 'entry' : 'entries'}`}
                        complete={cv.cv_data.education.length > 0}
                      />
                      <PreviewStat
                        icon={Wrench}
                        label="Skills"
                        value={`${cv.cv_data.skills.length} listed`}
                        complete={cv.cv_data.skills.length > 0}
                      />
                    </dl>

                    {/* Actions */}
                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2.5 min-h-[40px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDownloading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                        Download PDF
                      </button>
                      <button
                        type="button"
                        onClick={handleEditCV}
                        className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/85 border border-white/15 hover:border-white/30 rounded-full px-4 py-2.5 min-h-[40px] inline-flex items-center justify-center gap-2 touch-manipulation transition-colors"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit
                      </button>
                    </div>
                  </div>
                </motion.div>

                {/* All CVs link */}
                {allCVs && allCVs.length > 1 && (
                  <button
                    type="button"
                    onClick={handleManageCVs}
                    className="w-full inline-flex items-center justify-between gap-3 rounded-xl border border-white/[0.10] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.20] px-4 py-3 touch-manipulation transition-colors"
                  >
                    <span className="text-[12px] uppercase tracking-[0.14em] font-semibold text-white/85">
                      Manage your {allCVs.length} CVs
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/65" />
                  </button>
                )}
              </>
            ) : (
              <EmptyState onCreateCV={handleCreateCV} />
            )}

            {/* Elec-ID link */}
            <button
              type="button"
              onClick={handleViewElecId}
              className="w-full inline-flex items-center justify-between gap-3 rounded-xl border border-white/[0.10] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.20] px-4 py-3 touch-manipulation transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/30 flex items-center justify-center shrink-0">
                  <IdCard className="h-4 w-4 text-elec-yellow" aria-hidden />
                </div>
                <span className="text-[13px] font-semibold text-white truncate">
                  View full Elec-ID profile
                </span>
              </div>
              <ArrowRight className="h-4 w-4 text-white/65 shrink-0" />
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const PreviewStat = ({
  icon: Icon,
  label,
  value,
  complete,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  complete: boolean;
}) => (
  <div className="flex items-baseline gap-2 min-w-0">
    <Icon
      className={cn('h-3 w-3 shrink-0 self-center', complete ? 'text-emerald-300' : 'text-white/65')}
      aria-hidden
    />
    <div className="min-w-0 flex-1">
      <dt className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
        {label}
      </dt>
      <dd className="text-[12.5px] text-white truncate">{value}</dd>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] overflow-hidden">
    <div className="h-[2px] bg-white/15" />
    <div className="p-5">
      <div className="flex items-start gap-3">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-28" />
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
      </div>
      <div className="mt-5 flex gap-2">
        <Skeleton className="h-10 flex-1 rounded-full" />
        <Skeleton className="h-10 w-20 rounded-full" />
      </div>
    </div>
  </div>
);

const EmptyState = ({ onCreateCV }: { onCreateCV: () => void }) => (
  <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_15%)_0%,hsl(0_0%_11%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-6 sm:p-8 text-center">
    <div className="w-12 h-12 mx-auto rounded-xl bg-elec-yellow/[0.08] border border-elec-yellow/30 inline-flex items-center justify-center">
      <IdCard className="h-5 w-5 text-elec-yellow" aria-hidden />
    </div>
    <h3 className="mt-4 text-[18px] sm:text-[20px] font-semibold tracking-tight text-white">
      No CV yet.
    </h3>
    <p className="mt-2 text-[13px] leading-relaxed text-white/85 max-w-md mx-auto">
      Build your CV once — apply to roles in one tap. Your Elec-ID profile pre-fills the slow bits.
    </p>
    <button
      type="button"
      onClick={onCreateCV}
      className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-black bg-elec-yellow hover:bg-elec-yellow/90 active:bg-elec-yellow/85 rounded-full px-4 py-2.5 min-h-[40px] touch-manipulation transition-colors"
    >
      <Plus className="h-4 w-4" />
      Create your CV
    </button>
  </div>
);

export default QuickCVSheet;
