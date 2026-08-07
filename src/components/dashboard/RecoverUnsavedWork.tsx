/**
 * RecoverUnsavedWork - Drafts banner that opens a sheet listing all drafts
 * Tap the banner → bottom sheet with every draft, each individually openable/deletable
 */

import React, { useState } from 'react';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { reportCloud, CloudReport } from '@/utils/reportCloud';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { containerVariants, itemVariants } from '@/components/college/primitives';
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
    'fire-alarm-design': 'FA G1', 'fire-alarm': 'FA G2',
    'fire-alarm-commissioning': 'FA G3',
    'fire-alarm-inspection': 'FA G6', 'fire-alarm-modification': 'FA G7',
    'ev-charging': 'EV', 'emergency-lighting': 'EM LTG',
    'solar-pv': 'SOLAR PV', 'pat-testing': 'PAT',
    'smoke-co-alarm': 'SMOKE/CO', bess: 'BESS',
  };
  return labels[type] || type.toUpperCase().replace(/-/g, ' ').slice(0, 6);
};

// One quiet badge for every type — the graphite-and-volt system doesn't do
// per-type rainbow colours (Andrew, 2026-08-01).
const getTypeBadgeStyle = (_type: string) =>
  'bg-white/[0.08] text-white/70 border border-white/[0.14]';

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

  // ELE-1162 — Opening the confirm AlertDialog while the Sheet is still open
  // mounts two radix dialogs at once; their focus-traps and scroll-locks collide
  // and freeze the page. When a delete is triggered from INSIDE the sheet, close
  // the sheet first, then open the confirm once it has finished unmounting.
  const confirmFromSheet = (open: () => void) => {
    setShowSheet(false);
    setTimeout(open, 280); // ~ sheet exit animation
  };

  const handleDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    // Bound each delete so a hung/slow RPC can't freeze the sheet. The Supabase
    // client only gives up after 30s — far too long to sit on a spinner — so we
    // race each call against a 12s timeout and always let the UI recover.
    const withTimeout = <T,>(p: Promise<T>, ms = 12000): Promise<T> =>
      Promise.race([
        p,
        new Promise<T>((_, reject) =>
          setTimeout(() => reject(new Error('Delete timed out')), ms)
        ),
      ]);
    try {
      if (deleteAll && autoDrafts) {
        // allSettled (not all): one slow/failed draft must not abort the batch.
        const results = await Promise.allSettled(
          autoDrafts.map((d) => withTimeout(reportCloud.softDeleteReport(d.report_id, user.id)))
        );
        const failed = results.filter(
          (r) => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)
        ).length;
        toast(
          failed === 0
            ? { title: 'All drafts deleted' }
            : {
                title: `${autoDrafts.length - failed} deleted, ${failed} failed`,
                description: 'Some drafts could not be deleted — please try again.',
                variant: 'destructive',
              }
        );
        setShowSheet(false);
        setIsDismissed(true);
      } else if (deleteTarget) {
        const result = await withTimeout(
          reportCloud.softDeleteReport(deleteTarget.report_id, user.id)
        );
        toast(
          result.success
            ? { title: 'Draft deleted' }
            : { title: 'Delete failed', variant: 'destructive' }
        );
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

  // Unique type labels surfaced inline in the banner copy (no coloured pills).
  const uniqueTypes = [...new Set(autoDrafts.map((d) => d.report_type))]
    .slice(0, 3)
    .map(getTypeLabel)
    .join(' · ');

  return (
    <>
      {/* Banner — editorial hairline cell, same DNA as Continue + tool grids */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn('space-y-3', className)}
      >
        <motion.h2
          variants={itemVariants}
          className="text-[15px] font-semibold tracking-tight text-white"
        >
          Unsaved drafts
        </motion.h2>

        {/*
          Wide single row, not a five-row stack. This banner was ~230px tall to
          say one thing — "you have N drafts" — with a description, a rule, a
          "SEE ALL AND CHOOSE" helper next to "Open" (both meaning the same
          tap), and a second rule above Delete all / Dismiss. Now: count + types
          and the title on the left, Open on the right, with the two secondary
          actions on one quiet line beneath.
        */}
        <motion.div
          variants={itemVariants}
          className={cn('overflow-hidden rounded-2xl border border-white/[0.18]', CARD_SURFACE)}
        >
          <button
            type="button"
            onClick={() => setShowSheet(true)}
            className="group flex w-full items-center gap-3 px-4 py-3 text-left transition-colors touch-manipulation select-none [-webkit-tap-highlight-color:transparent] hover:bg-white/[0.05] active:bg-white/[0.07]"
          >
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]">
                <span className="tabular-nums text-elec-yellow">{autoDrafts.length}</span>
                <span className="min-w-0 truncate text-white">· {uniqueTypes || 'Drafts'}</span>
              </span>
              <span className="mt-1 block truncate text-[16px] font-bold leading-tight tracking-tight text-white transition-colors group-hover:text-elec-yellow">
                {autoDrafts.length} unsaved draft{autoDrafts.length !== 1 ? 's' : ''} waiting
              </span>
              <span className="mt-0.5 block truncate text-[11.5px] leading-snug text-white">
                Auto-saved before you closed the tab.
              </span>
            </span>
            <span className="shrink-0 text-[13px] font-bold text-elec-yellow">Open</span>
          </button>

          <div className="flex items-center gap-4 border-t border-white/[0.10] px-4">
            <button
              type="button"
              onClick={() => setDeleteAll(true)}
              className="flex h-11 items-center text-[11.5px] font-semibold text-white transition-colors touch-manipulation hover:text-red-300"
            >
              Delete all
            </button>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="ml-auto flex h-11 items-center text-[11.5px] font-semibold text-white touch-manipulation"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      </motion.section>

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
              <span className="rounded border border-white/[0.16] bg-white/[0.08] px-2 py-0.5 text-[10px] font-bold tabular-nums text-white">
                {autoDrafts.length}
              </span>
            </div>
            <p className="text-xs text-white/60 text-left">Tap a draft to continue editing</p>
          </SheetHeader>

          {/* Draft cards — same recipe as the cert pickers: gradient surface,
              per-type accent wash, action row pinned to the base */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {autoDrafts.map((draft) => {
                const updatedAgo = draft.updated_at
                  ? formatDistanceToNow(new Date(draft.updated_at), { addSuffix: true })
                  : 'Unknown';

                return (
                  <div
                    key={draft.report_id}
                    className={cn(
                      'group relative flex flex-col overflow-hidden rounded-2xl p-4',
                      'bg-gradient-to-b from-white/[0.07] to-white/[0.03] border border-white/[0.12]',
                      'transition-all duration-200 hover:border-white/[0.22] hover:from-white/[0.09] hover:to-white/[0.05]'
                    )}
                  >
                    <div className="relative flex items-center gap-2">
                      <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', getTypeBadgeStyle(draft.report_type))}>
                        {getTypeLabel(draft.report_type)}
                      </span>
                      <span className="text-[11px] text-white/50 ml-auto tabular-nums">{updatedAgo}</span>
                    </div>

                    <h4 className="relative mt-2.5 text-[15px] font-semibold tracking-tight text-white truncate">
                      {draft.client_name || 'Untitled'}
                    </h4>
                    <p className="relative text-[12px] text-white/60 truncate mt-0.5 min-h-[18px]">
                      {draft.installation_address || 'No address yet'}
                    </p>

                    <div className="relative mt-3 pt-3 flex items-center justify-between gap-2 border-t border-white/[0.07]">
                      <button
                        onClick={() => confirmFromSheet(() => setDeleteTarget(draft))}
                        className="h-11 px-2 -ml-2 text-[12px] font-semibold text-white/50 hover:text-red-400 transition-colors touch-manipulation"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleRecover(draft)}
                        className="h-11 px-5 rounded-xl text-[13px] font-bold bg-elec-yellow text-black touch-manipulation active:scale-[0.97] transition-transform"
                      >
                        Open
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sheet footer */}
          <div className="flex-shrink-0 px-5 py-4 border-t border-white/[0.06]">
            <button
              onClick={() => confirmFromSheet(() => setDeleteAll(true))}
              className="w-full h-11 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold active:scale-[0.98] transition-all touch-manipulation"
            >
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
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
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
