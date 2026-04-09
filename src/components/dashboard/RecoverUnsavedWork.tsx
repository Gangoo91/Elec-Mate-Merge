/**
 * RecoverUnsavedWork - Drafts banner that opens a sheet listing all drafts
 * Tap the banner → bottom sheet with every draft, each individually openable/deletable
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Trash2, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { reportCloud, CloudReport } from '@/utils/reportCloud';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
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

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    eicr: 'EICR', eic: 'EIC', 'minor-works': 'MW',
    'fire-alarm': 'FA G1', 'fire-alarm-commissioning': 'FA G2',
    'fire-alarm-inspection': 'FA G7', 'fire-alarm-modification': 'FA G4',
    'ev-charging': 'EV', 'emergency-lighting': 'EM LTG',
    'solar-pv': 'SOLAR PV', 'pat-testing': 'PAT',
    'smoke-co-alarm': 'SMOKE/CO', bess: 'BESS',
  };
  return labels[type] || type.toUpperCase().replace(/-/g, ' ').slice(0, 6);
};

const getTypeBadgeStyle = (type: string) => {
  if (type.startsWith('fire-alarm')) return 'bg-red-500/15 text-red-400';
  if (type === 'eicr') return 'bg-blue-500/15 text-blue-400';
  if (type === 'eic') return 'bg-emerald-500/15 text-emerald-400';
  if (type === 'minor-works') return 'bg-orange-500/15 text-orange-400';
  if (type === 'ev-charging') return 'bg-cyan-500/15 text-cyan-400';
  if (type === 'emergency-lighting') return 'bg-violet-500/15 text-violet-400';
  if (type === 'pat-testing') return 'bg-amber-500/15 text-amber-400';
  if (type === 'solar-pv') return 'bg-yellow-500/15 text-yellow-400';
  return 'bg-elec-yellow/15 text-elec-yellow';
};

const getTypeAccent = (type: string) => {
  if (type.startsWith('fire-alarm')) return 'from-red-500 via-rose-400 to-pink-400';
  if (type === 'eicr') return 'from-blue-500 via-blue-400 to-cyan-400';
  if (type === 'eic') return 'from-emerald-500 via-emerald-400 to-green-400';
  if (type === 'minor-works') return 'from-orange-500 via-amber-400 to-yellow-400';
  if (type === 'ev-charging') return 'from-cyan-500 via-cyan-400 to-blue-400';
  if (type === 'emergency-lighting') return 'from-violet-500 via-purple-400 to-indigo-400';
  return 'from-amber-500 via-amber-400 to-yellow-400';
};

const RecoverUnsavedWork: React.FC<RecoverUnsavedWorkProps> = ({ onNavigate, className }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // Unique type labels for the banner badges
  const uniqueTypes = [...new Set(autoDrafts.map((d) => d.report_type))];

  return (
    <>
      {/* Banner card */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'group relative overflow-hidden card-surface-interactive rounded-2xl',
          className
        )}
      >
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 opacity-50" />

        {/* Main tappable row */}
        <button
          onClick={() => setShowSheet(true)}
          className="w-full flex items-center gap-3.5 p-4 text-left active:scale-[0.98] transition-all touch-manipulation"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-semibold text-white">
                {autoDrafts.length} unsaved draft{autoDrafts.length !== 1 ? 's' : ''}
              </span>
              {uniqueTypes.slice(0, 4).map((type) => (
                <span
                  key={type}
                  className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', getTypeBadgeStyle(type))}
                >
                  {getTypeLabel(type)}
                </span>
              ))}
            </div>
            <p className="text-[12px] text-white">Tap to see all and choose one</p>
          </div>
          <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200 flex-shrink-0">
            <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black transition-all" />
          </div>
        </button>

        {/* Actions bar */}
        <div className="flex items-center border-t border-white/[0.06] px-4">
          <button
            onClick={() => setDeleteAll(true)}
            className="h-10 flex items-center gap-1.5 text-xs font-medium text-white hover:text-red-400 transition-colors touch-manipulation"
          >
            <Trash2 className="h-3 w-3" />
            Delete all
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="h-10 flex items-center gap-1.5 text-xs font-medium text-white ml-auto hover:text-white/80 transition-colors touch-manipulation"
          >
            Dismiss
            <X className="h-3 w-3" />
          </button>
        </div>
      </motion.div>

      {/* Drafts selection sheet */}
      <Sheet open={showSheet} onOpenChange={setShowSheet}>
        <SheetContent
          side="bottom"
          className="bg-background border-white/[0.06] rounded-t-2xl max-h-[80vh] flex flex-col p-0"
        >
          <SheetHeader className="px-5 pt-5 pb-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center gap-3">
              <SheetTitle className="text-white text-base font-semibold text-left">
                Unsaved Drafts
              </SheetTitle>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400">
                {autoDrafts.length}
              </span>
            </div>
            <p className="text-xs text-white text-left">Tap a draft to continue editing</p>
          </SheetHeader>

          {/* Draft list */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {autoDrafts.map((draft) => {
              const updatedAgo = draft.updated_at
                ? formatDistanceToNow(new Date(draft.updated_at), { addSuffix: true })
                : 'Unknown';

              return (
                <div
                  key={draft.report_id}
                  className="group relative overflow-hidden card-surface-interactive rounded-xl"
                >
                  <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity', getTypeAccent(draft.report_type))} />

                  <div className="relative z-10 flex items-center gap-2">
                    {/* Draft info — tappable */}
                    <button
                      onClick={() => handleRecover(draft)}
                      className="flex-1 text-left active:bg-white/[0.06] transition-colors min-w-0 p-3.5"
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', getTypeBadgeStyle(draft.report_type))}>
                          {getTypeLabel(draft.report_type)}
                        </span>
                        <span className="text-[11px] text-white/40 ml-auto">{updatedAgo}</span>
                      </div>
                      <h4 className="text-[13px] font-semibold text-white truncate group-hover:text-elec-yellow transition-colors">
                        {draft.client_name || 'Untitled'}
                      </h4>
                      {draft.installation_address && (
                        <p className="text-[12px] text-white truncate mt-0.5">{draft.installation_address}</p>
                      )}
                    </button>

                    {/* Delete + chevron */}
                    <div className="flex items-center gap-0.5 pr-2 flex-shrink-0">
                      <button
                        onClick={() => setDeleteTarget(draft)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <ChevronRight className="h-4 w-4 text-white/20" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sheet footer */}
          <div className="flex-shrink-0 px-5 py-4 border-t border-white/[0.06]">
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
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">
              {deleteAll ? 'Delete all drafts?' : 'Delete draft?'}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              {deleteAll
                ? `This will permanently delete all ${autoDrafts.length} unsaved drafts.`
                : `This will permanently delete "${deleteTarget?.client_name || 'Untitled'}".`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-full h-11 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 font-medium hover:bg-red-500/25 active:scale-[0.98] transition-all touch-manipulation"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
            <AlertDialogCancel
              disabled={isDeleting}
              className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0"
            >
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RecoverUnsavedWork;
