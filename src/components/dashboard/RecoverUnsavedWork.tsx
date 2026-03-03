/**
 * RecoverUnsavedWork - Drafts banner that opens a sheet listing all drafts
 * Tap the banner → bottom sheet with every draft, each individually openable/deletable
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, Trash2, X, Clock, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { reportCloud, CloudReport } from '@/utils/reportCloud';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/ui/sheet';
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

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  'eic':         { label: 'EIC',   color: 'bg-green-500/15 text-green-400' },
  'eicr':        { label: 'EICR',  color: 'bg-blue-500/15 text-blue-400' },
  'minor-works': { label: 'MW',    color: 'bg-orange-500/15 text-orange-400' },
  'solar-pv':    { label: 'Solar', color: 'bg-yellow-500/15 text-yellow-400' },
  'ev-charging': { label: 'EV',    color: 'bg-purple-500/15 text-purple-400' },
};

const getTypeInfo = (type: string) =>
  TYPE_LABELS[type?.toLowerCase()] ?? { label: 'CERT', color: 'bg-amber-500/15 text-amber-400' };

const RecoverUnsavedWork: React.FC<RecoverUnsavedWorkProps> = ({ onNavigate, className }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CloudReport | null>(null);
  const [deleteAll, setDeleteAll] = useState(false);
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
        .limit(20);

      if (error) return [];
      return (data || []) as CloudReport[];
    },
    enabled: !!user,
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });

  const handleRecover = (report: CloudReport) => {
    setShowSheet(false);
    onNavigate(report.report_type, report.report_id, report.report_type);
    toast({ title: 'Draft opened', description: 'Continue where you left off.' });
  };

  const handleDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      if (deleteAll && autoDrafts) {
        await Promise.all(
          autoDrafts.map((d) => reportCloud.softDeleteReport(d.report_id, user.id))
        );
        toast({ title: 'All drafts deleted' });
        setShowSheet(false);
        setIsDismissed(true);
      } else if (deleteTarget) {
        const result = await reportCloud.softDeleteReport(deleteTarget.report_id, user.id);
        if (result.success) toast({ title: 'Draft deleted' });
      }
      queryClient.invalidateQueries({ queryKey: ['auto-drafts'] });
    } catch {
      toast({ title: 'Delete failed', variant: 'destructive' });
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
      setDeleteAll(false);
    }
  };

  if (isDismissed || isLoading || !autoDrafts || autoDrafts.length === 0) return null;

  const firstDraft = autoDrafts[0];
  const firstType = getTypeInfo(firstDraft.report_type);

  // Unique type labels for the banner badge
  const uniqueTypes = [...new Set(autoDrafts.map((d) => getTypeInfo(d.report_type).label))];

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
        {/* Main tappable row — opens sheet, not individual draft */}
        <button
          onClick={() => setShowSheet(true)}
          className="w-full flex items-center gap-3.5 p-4 text-left hover:bg-white/[0.09] active:scale-[0.98] transition-all touch-manipulation"
        >
          <div className="w-11 h-11 rounded-xl bg-amber-500/12 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-amber-400" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
              <span className="text-sm font-semibold text-white">
                {autoDrafts.length} unsaved draft{autoDrafts.length !== 1 ? 's' : ''}
              </span>
              {uniqueTypes.slice(0, 3).map((label) => (
                <span
                  key={label}
                  className={cn(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded',
                    getTypeInfo(
                      Object.entries(TYPE_LABELS).find(([, v]) => v.label === label)?.[0] ?? ''
                    ).color
                  )}
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="text-sm text-white/60 truncate">Tap to see all and choose one</p>
          </div>

          <ChevronRight className="h-5 w-5 text-amber-400 flex-shrink-0" />
        </button>

        {/* Actions bar */}
        <div className="flex items-center border-t border-white/[0.06] px-4">
          <button
            onClick={() => setDeleteAll(true)}
            className="h-11 flex items-center gap-1.5 text-sm text-white hover:text-red-400 transition-colors touch-manipulation"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete all
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

      {/* Drafts selection sheet */}
      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetContent
          side="bottom"
          className="bg-[#1a1a1e] border-white/10 rounded-t-2xl max-h-[80vh] flex flex-col p-0"
        >
          <SheetHeader className="px-5 pt-5 pb-3 border-b border-white/[0.07] flex-shrink-0">
            <SheetTitle className="text-white text-base font-semibold text-left">
              {autoDrafts.length} unsaved draft{autoDrafts.length !== 1 ? 's' : ''}
            </SheetTitle>
            <p className="text-sm text-white/50 text-left">Tap a draft to continue editing</p>
          </SheetHeader>

          {/* Draft list — scrollable */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/[0.06]">
            {autoDrafts.map((draft) => {
              const typeInfo = getTypeInfo(draft.report_type);
              const updatedAgo = draft.updated_at
                ? formatDistanceToNow(new Date(draft.updated_at), { addSuffix: true })
                : 'Unknown';

              return (
                <div key={draft.report_id} className="flex items-center gap-3 px-5 py-4">
                  {/* Draft info — tappable */}
                  <button
                    onClick={() => handleRecover(draft)}
                    className="flex-1 flex items-center gap-3 text-left active:opacity-70 transition-opacity min-w-0"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <FileText className="h-4.5 w-4.5 text-white/60" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className={cn(
                            'text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0',
                            typeInfo.color
                          )}
                        >
                          {typeInfo.label}
                        </span>
                        <span className="text-sm font-medium text-white truncate">
                          {draft.client_name || 'Untitled'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-white/40">
                        {draft.installation_address && (
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{draft.installation_address}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1 flex-shrink-0">
                          <Clock className="h-3 w-3" />
                          {updatedAgo}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-white/30 flex-shrink-0" />
                  </button>

                  {/* Individual delete */}
                  <button
                    onClick={() => setDeleteTarget(draft)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0 touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Sheet footer */}
          <div className="flex-shrink-0 px-5 py-4 border-t border-white/[0.07]">
            <button
              onClick={() => setDeleteAll(true)}
              className="w-full h-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-all touch-manipulation"
            >
              <Trash2 className="h-4 w-4" />
              Delete all drafts
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteTarget || deleteAll}
        onOpenChange={() => {
          setDeleteTarget(null);
          setDeleteAll(false);
        }}
      >
        <AlertDialogContent className="bg-[#1a1a1e] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              {deleteAll ? 'Delete all drafts?' : 'Delete draft?'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              {deleteAll
                ? `This will permanently delete all ${autoDrafts.length} unsaved drafts. This cannot be undone.`
                : `This will permanently delete "${deleteTarget?.client_name || 'Untitled'}". This cannot be undone.`}
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
