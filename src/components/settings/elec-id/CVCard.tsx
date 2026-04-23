import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { formatDistanceToNow } from 'date-fns';
import { UserCV, useDeleteCV, useSetPrimaryCV, calculateCVCompleteness } from '@/hooks/useCV';
import { useCVSyncStatus } from '@/hooks/useCVSync';
import { generateCVPDFByTemplate } from '@/components/cv-builder/pdfGenerators';
import { toast } from '@/hooks/use-toast';

const TEMPLATE_STYLES: Record<
  string,
  { label: string; tone: 'blue' | 'amber' | 'purple' | 'emerald' }
> = {
  classic: { label: 'Classic', tone: 'blue' },
  modern: { label: 'Modern', tone: 'amber' },
  creative: { label: 'Creative', tone: 'purple' },
  technical: { label: 'Technical', tone: 'emerald' },
};

const toneText: Record<string, string> = {
  blue: 'text-blue-400',
  amber: 'text-amber-400',
  purple: 'text-purple-400',
  emerald: 'text-emerald-400',
};

const toneBorder: Record<string, string> = {
  blue: 'bg-blue-500/70',
  amber: 'bg-amber-500/70',
  purple: 'bg-purple-500/70',
  emerald: 'bg-emerald-500/70',
};

interface CVCardProps {
  cv: UserCV;
  onEdit: (cv: UserCV) => void;
}

const CVCard = ({ cv, onEdit }: CVCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const deleteCV = useDeleteCV();
  const setPrimaryCV = useSetPrimaryCV();
  const { needsSync, pendingCount, isLoading: isCheckingSync } = useCVSyncStatus(cv.cv_data);

  const templateStyle = TEMPLATE_STYLES[cv.template_id] || TEMPLATE_STYLES.classic;
  const completeness = calculateCVCompleteness(cv.cv_data);
  const lastUpdated = formatDistanceToNow(new Date(cv.updated_at), { addSuffix: true });

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await generateCVPDFByTemplate(cv.cv_data, cv.template_id);
      toast({
        title: 'CV downloaded',
        description: 'Your CV has been downloaded as a PDF.',
      });
    } catch (error) {
      toast({
        title: 'Download failed',
        description: 'Failed to generate PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCV.mutateAsync(cv.id);
      toast({
        title: 'CV deleted',
        description: 'Your CV has been deleted.',
      });
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: 'Failed to delete CV. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleSetPrimary = async () => {
    try {
      await setPrimaryCV.mutateAsync(cv.id);
      toast({
        title: 'Primary CV set',
        description: 'This CV will be used by default for job applications.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to set primary CV. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.99 }}
      >
        <div
          className={cn(
            'relative bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden transition-all touch-manipulation',
            cv.is_primary && 'ring-1 ring-elec-yellow/30'
          )}
        >
          <div
            className={cn('absolute top-0 left-0 right-0 h-px', toneBorder[templateStyle.tone])}
          />

          <div className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-white truncate">{cv.title || 'My CV'}</h3>
                  {cv.is_primary && (
                    <span className="inline-flex items-center text-[10px] font-medium px-1.5 py-0 rounded-full border bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-[11.5px] text-white mt-0.5">
                  <span className={toneText[templateStyle.tone]}>{templateStyle.label}</span>{' '}
                  template · Updated {lastUpdated}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-11 w-11 shrink-0 text-white hover:bg-white/[0.04] touch-manipulation rounded-lg"
                    aria-label="Actions"
                  >
                    <span aria-hidden>⋯</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-[hsl(0_0%_12%)] border-white/[0.06]"
                >
                  <DropdownMenuItem onClick={() => onEdit(cv)}>Edit CV</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownload} disabled={isDownloading}>
                    {isDownloading ? 'Downloading…' : 'Download PDF'}
                  </DropdownMenuItem>
                  {!cv.is_primary && (
                    <DropdownMenuItem
                      onClick={handleSetPrimary}
                      disabled={setPrimaryCV.isPending}
                    >
                      Set as primary
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-white/[0.06]" />
                  <DropdownMenuItem
                    onClick={() => setShowDeleteDialog(true)}
                    className="text-red-400 focus:text-red-400 focus:bg-red-500/10"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5">
                <span
                  aria-hidden
                  className={cn(
                    'h-1.5 w-1.5 rounded-full',
                    completeness >= 80
                      ? 'bg-emerald-400'
                      : completeness >= 50
                        ? 'bg-amber-400'
                        : 'bg-red-400'
                  )}
                />
                <span className="text-xs text-white">{completeness}% complete</span>
              </div>

              {!isCheckingSync && (
                <div className="flex items-center gap-1.5">
                  <span
                    aria-hidden
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      needsSync ? 'bg-amber-400' : 'bg-emerald-400'
                    )}
                  />
                  <span className={cn('text-xs', needsSync ? 'text-amber-400' : 'text-emerald-400')}>
                    {needsSync ? `${pendingCount} updates available` : 'Synced'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Button
                variant="outline"
                className="h-11 px-3 text-xs rounded-xl border-white/[0.06] bg-white/[0.04] text-white hover:bg-white/[0.08] touch-manipulation"
                onClick={() => onEdit(cv)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                className={cn(
                  'h-11 px-3 text-xs rounded-xl border-white/[0.06] bg-white/[0.04] hover:bg-white/[0.08] touch-manipulation',
                  toneText[templateStyle.tone]
                )}
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? 'Downloading…' : 'Download'}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[hsl(0_0%_12%)] border-white/[0.06] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete CV?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently delete "{cv.title || 'My CV'}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/[0.06] bg-transparent text-white rounded-xl h-11 touch-manipulation">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl h-11 touch-manipulation"
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting…' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CVCard;
