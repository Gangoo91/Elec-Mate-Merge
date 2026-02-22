/**
 * RecoverUnsavedWork - Clean inline banner for auto-draft certificates
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Trash2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { reportCloud, CloudReport } from '@/utils/reportCloud';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
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

interface RecoverUnsavedWorkProps {
  onNavigate: (section: string, reportId?: string, reportType?: string) => void;
  className?: string;
}

const RecoverUnsavedWork: React.FC<RecoverUnsavedWorkProps> = ({ onNavigate, className }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [deleteTarget, setDeleteTarget] = useState<CloudReport | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
  }, []);

  const { data: autoDrafts, isLoading } = useQuery({
    queryKey: ['auto-drafts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'auto-draft')
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
        .limit(10);

      if (error) return [];
      return (data || []) as CloudReport[];
    },
    enabled: !!user,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'minor-works':
        return 'MW';
      case 'eic':
        return 'EIC';
      case 'eicr':
        return 'EICR';
      default:
        return 'CERT';
    }
  };

  const handleRecover = (report: CloudReport) => {
    onNavigate(report.report_type, report.report_id, report.report_type);
    toast({
      title: 'Draft opened',
      description: 'Click "Save" to keep this certificate.',
    });
  };

  const handleDelete = async () => {
    if (!deleteTarget || !user) return;

    setIsDeleting(true);
    try {
      const result = await reportCloud.softDeleteReport(deleteTarget.report_id, user.id);
      if (result.success) {
        toast({ title: 'Draft deleted' });
        queryClient.invalidateQueries({ queryKey: ['auto-drafts'] });
      }
    } catch (error) {
      toast({ title: 'Delete failed', variant: 'destructive' });
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  if (isDismissed || isLoading || !autoDrafts || autoDrafts.length === 0) {
    return null;
  }

  const firstDraft = autoDrafts[0];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'rounded-2xl bg-white/[0.06] border border-white/[0.08] overflow-hidden',
          className
        )}
      >
        {/* Main tappable row */}
        <button
          onClick={() => handleRecover(firstDraft)}
          className="w-full flex items-center gap-3.5 p-4 text-left hover:bg-white/[0.09] active:scale-[0.98] transition-all touch-manipulation"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-500/12 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-amber-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-white">
                {autoDrafts.length} unsaved draft{autoDrafts.length !== 1 ? 's' : ''}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400">
                {getTypeLabel(firstDraft.report_type)}
              </span>
            </div>
            <p className="text-sm text-white truncate">
              {firstDraft.client_name || 'Untitled certificate'}
              {firstDraft.installation_address ? ` · ${firstDraft.installation_address}` : ''}
            </p>
          </div>

          <ChevronRight className="h-5 w-5 text-amber-400 flex-shrink-0" />
        </button>

        {/* Actions bar */}
        <div className="flex items-center border-t border-white/[0.06] px-4">
          <button
            onClick={() => setDeleteTarget(firstDraft)}
            className="h-11 flex items-center gap-1.5 text-sm text-white hover:text-red-400 transition-colors touch-manipulation"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="h-11 flex items-center gap-1.5 text-sm text-white ml-auto hover:text-white transition-colors touch-manipulation"
          >
            Dismiss
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="bg-[#1a1a1e] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete draft?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently delete "{deleteTarget?.client_name || 'Untitled'}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RecoverUnsavedWork;
