/**
 * RecoverUnsavedWork - Shows auto-draft certificates that haven't been manually saved
 *
 * Auto-drafts are created when:
 * - User starts typing in a certificate form
 * - Auto-sync saves to cloud every 2 seconds
 * - BUT user never clicks "Save" button
 *
 * This component lets users recover these abandoned drafts.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  FileWarning,
  Clock,
  MapPin,
  ChevronRight,
  Trash2,
  RefreshCw,
  AlertTriangle,
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

  // Query for auto-draft reports specifically
  const { data: autoDrafts, isLoading, refetch } = useQuery({
    queryKey: ['auto-drafts', user?.id],
    queryFn: async () => {
      if (!user) return [];

      // Query reports with auto-draft status
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'auto-draft')
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('[RecoverUnsavedWork] Error fetching auto-drafts:', error);
        return [];
      }

      return (data || []) as CloudReport[];
    },
    enabled: !!user,
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: true,
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 2) return '1h ago';
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'minor-works': return 'bg-blue-500/15 text-blue-400';
      case 'eic': return 'bg-green-500/15 text-green-400';
      case 'eicr': return 'bg-purple-500/15 text-purple-400';
      default: return 'bg-white/10 text-white/60';
    }
  };

  const handleRecover = (report: CloudReport) => {
    // Navigate to the form with the report ID - it will load and the user can manually save
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
        toast({
          title: 'Draft deleted',
          description: 'The unsaved draft has been removed.',
        });
        queryClient.invalidateQueries({ queryKey: ['auto-drafts'] });
      } else {
        throw new Error(result.error?.message || 'Delete failed');
      }
    } catch (error) {
      console.error('[RecoverUnsavedWork] Delete error:', error);
      toast({
        title: 'Delete failed',
        description: 'Could not delete the draft. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  // Don't show if dismissed, loading, or no auto-drafts
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
          'bg-amber-500/10 border border-amber-500/30 rounded-xl overflow-hidden',
          className
        )}
      >
        {/* Header */}
        <div className="p-3 border-b border-amber-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20">
                <FileWarning className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <span className="text-sm font-semibold text-amber-300">
                  Unsaved Work Found
                </span>
                <p className="text-[10px] text-amber-400/70">
                  {autoDrafts.length} certificate{autoDrafts.length !== 1 ? 's' : ''} not saved
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => refetch()}
                className="h-8 w-8 text-amber-400/60 hover:text-amber-400 hover:bg-amber-500/10"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDismissed(true)}
                className="h-8 w-8 text-amber-400/60 hover:text-amber-400 hover:bg-amber-500/10"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Draft List */}
        <div className="p-2 space-y-1.5 max-h-[200px] overflow-y-auto">
          <AnimatePresence>
            {autoDrafts.map((draft) => (
              <motion.div
                key={draft.report_id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={cn(
                  'rounded-lg border border-amber-500/20 bg-amber-500/5',
                  'p-2.5 flex items-center gap-2.5'
                )}
              >
                {/* Type Badge */}
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                  getTypeColor(draft.report_type)
                )}>
                  <span className="text-[10px] font-bold">
                    {getTypeLabel(draft.report_type)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-medium text-white truncate">
                      {draft.client_name || 'Untitled'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-amber-400/60">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                      <span className="truncate">
                        {draft.installation_address || 'No address'}
                      </span>
                    </span>
                    <span className="flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-2.5 h-2.5" />
                      {formatTimeAgo(draft.updated_at)}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(draft)}
                    className="h-8 w-8 text-red-400/60 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRecover(draft)}
                    className="h-8 px-2 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 gap-1"
                  >
                    Recover
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Warning Footer */}
        <div className="px-3 py-2 bg-amber-500/5 border-t border-amber-500/20">
          <p className="text-[10px] text-amber-400/60 flex items-center gap-1.5">
            <AlertTriangle className="h-3 w-3 flex-shrink-0" />
            These drafts will be automatically deleted after 7 days
          </p>
        </div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="bg-card border-border/50">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete unsaved draft?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the draft for "{deleteTarget?.client_name || 'Untitled'}".
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
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
