/**
 * RecoverUnsavedWork - Shows auto-draft certificates that haven't been manually saved
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Clock,
  ChevronRight,
  Trash2,
  X
} from 'lucide-react';
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

const RecoverUnsavedWork: React.FC<RecoverUnsavedWorkProps> = ({
  onNavigate,
  className
}) => {
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'minor-works': return 'MW';
      case 'eic': return 'EIC';
      case 'eicr': return 'EICR';
      default: return 'CERT';
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn(
          'bg-[#242428] border border-elec-yellow/30 rounded-2xl overflow-hidden',
          className
        )}
      >
        {/* Header */}
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">
                Unsaved Work
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-elec-yellow/20 text-elec-yellow">
                {autoDrafts.length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDismissed(true)}
              className="h-7 w-7 text-white/40 hover:text-white hover:bg-white/10 rounded-lg"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Draft List */}
        <div className="px-3 pb-3 space-y-2">
          <AnimatePresence>
            {autoDrafts.slice(0, 3).map((draft, index) => (
              <motion.div
                key={draft.report_id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.03 }}
                className="relative p-3 rounded-xl bg-black/40 hover:bg-black/50 border border-white/5 transition-colors"
              >
                {/* Top row: Type badge + Auto-draft + Time */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-elec-yellow/20 text-elec-yellow">
                    {getTypeLabel(draft.report_type)}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400">
                    Auto-draft
                  </span>
                  <span className="text-[10px] text-white/30 ml-auto flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(draft.updated_at)}
                  </span>
                </div>

                {/* Client name */}
                <h4 className="text-sm font-semibold text-white truncate text-left pr-24">
                  {draft.client_name || 'Untitled'}
                </h4>

                {/* Address */}
                <p className="text-xs text-white/40 truncate text-left mt-0.5 pr-24">
                  {draft.installation_address || 'No address'}
                </p>

                {/* Actions - positioned right */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    onClick={() => setDeleteTarget(draft)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleRecover(draft)}
                    className="flex items-center gap-1 h-8 px-3 rounded-lg bg-elec-yellow/10 text-elec-yellow font-medium text-xs hover:bg-elec-yellow/20 transition-colors touch-manipulation"
                  >
                    Recover
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-black/20 border-t border-white/5">
          <p className="text-[10px] text-white/30">
            Auto-deleted after 7 days
          </p>
        </div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="bg-[#242428] border-elec-yellow/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete draft?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
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
