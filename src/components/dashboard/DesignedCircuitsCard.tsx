/**
 * DesignedCircuitsCard.tsx
 * Shows designed circuits from Circuit Designer on the I&T dashboard
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, Trash2 } from 'lucide-react';
import {
  useDesignedCircuits,
  useDeleteDesignedCircuit,
  useArchiveDesign,
  DesignedCircuit,
} from '@/hooks/useDesignedCircuits';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
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

type StatusTab = 'pending' | 'completed' | 'archived';

interface DesignedCircuitsCardProps {
  onNavigate?: (section: string, reportId?: string, reportType?: string) => void;
}

export const DesignedCircuitsCard = ({ onNavigate }: DesignedCircuitsCardProps) => {
  const navigate = useNavigate();
  const { data: designedCircuits, isLoading, error } = useDesignedCircuits();
  const deleteDesign = useDeleteDesignedCircuit();
  const archiveDesign = useArchiveDesign();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<StatusTab>('pending');

  const { pendingDesigns, completedDesigns, archivedDesigns } = useMemo(() => {
    const all = designedCircuits || [];
    return {
      pendingDesigns: all.filter((d) => d.status === 'pending' || d.status === 'in-progress'),
      completedDesigns: all.filter((d) => d.status === 'completed'),
      archivedDesigns: all.filter((d) => d.status === 'archived'),
    };
  }, [designedCircuits]);

  const currentDesigns = useMemo(() => {
    switch (activeTab) {
      case 'pending':
        return pendingDesigns;
      case 'completed':
        return completedDesigns;
      case 'archived':
        return archivedDesigns;
      default:
        return pendingDesigns;
    }
  }, [activeTab, pendingDesigns, completedDesigns, archivedDesigns]);

  const handleUseDesign = (design: DesignedCircuit) => {
    if (design.status === 'archived' || design.status === 'completed') {
      if (design.certificate_id) {
        navigate(`/electrician/inspection-testing?section=my-reports`);
        toast.info('Navigate to My Reports to view the certificate');
      }
      return;
    }
    navigate(`/electrician/inspection-testing?section=eic&designId=${design.id}`);
    toast.success('Loading design into EIC form...');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deleteDesign.mutateAsync(deleteId);
      toast.success('Design deleted');
    } catch (error) {
      toast.error('Failed to delete design');
    } finally {
      setDeleteId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
      case 'in-progress':
        return { label: 'Pending', style: 'bg-amber-500/15 text-amber-400' };
      case 'completed':
        return { label: 'Done', style: 'bg-green-500/15 text-green-400' };
      case 'archived':
        return { label: 'Archived', style: 'bg-white/10 text-white/50' };
      default:
        return { label: status, style: 'bg-white/10 text-white/50' };
    }
  };

  if (isLoading) {
    return (
      <div>
        <div className="border-b border-white/[0.06] pb-1 mb-4">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-500/40 to-cyan-500/10 mb-2" />
          <h2 className="text-xs font-medium text-white uppercase tracking-wider">Circuit Designer</h2>
        </div>
        <Skeleton className="h-24 w-full rounded-2xl bg-white/[0.03]" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="border-b border-white/[0.06] pb-1 mb-4">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-500/40 to-cyan-500/10 mb-2" />
          <h2 className="text-xs font-medium text-white uppercase tracking-wider">Circuit Designer</h2>
        </div>
        <div className="card-surface-interactive p-4 rounded-2xl">
          <p className="text-sm font-medium text-red-400">Failed to load designed circuits</p>
        </div>
      </div>
    );
  }

  const totalCount = pendingDesigns.length + completedDesigns.length + archivedDesigns.length;

  if (totalCount === 0) {
    return (
      <div>
        <div className="border-b border-white/[0.06] pb-1 mb-4">
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-500/40 to-cyan-500/10 mb-2" />
          <h2 className="text-xs font-medium text-white uppercase tracking-wider">Circuit Designer</h2>
        </div>
        <button
          onClick={() => navigate('/electrician/circuit-designer')}
          className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50 rounded-2xl touch-manipulation"
        >
          <div className="group relative overflow-hidden card-surface-interactive active:scale-[0.98] transition-all duration-200">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-400 opacity-30 group-hover:opacity-80 transition-opacity duration-200" />
            <div className="relative z-10 flex flex-col p-4">
              <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors">
                No designs yet
              </h3>
              <p className="mt-1 text-[12px] text-white leading-tight">Tap to open Circuit Designer</p>
              <div className="flex-grow min-h-[8px]" />
              <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] font-medium text-elec-yellow">Open</span>
                <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                  <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="border-b border-white/[0.06] pb-1 flex-1">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-cyan-500/40 to-cyan-500/10 mb-2" />
            <div className="flex items-center gap-2.5">
              <h2 className="text-xs font-medium text-white uppercase tracking-wider">Circuit Designer</h2>
              {pendingDesigns.length > 0 && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-elec-yellow/15 text-elec-yellow">
                  {pendingDesigns.length} pending
                </span>
              )}
            </div>
          </div>
          {currentDesigns.length > 3 && (
            <button
              className="text-xs font-medium text-elec-yellow hover:underline touch-manipulation h-11 flex items-center ml-3"
              onClick={() => navigate('/electrician/circuit-designer')}
            >
              View All
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-3">
          {(['pending', 'completed', 'archived'] as StatusTab[]).map((tab) => {
            const count =
              tab === 'pending'
                ? pendingDesigns.length
                : tab === 'completed'
                  ? completedDesigns.length
                  : archivedDesigns.length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'h-9 px-3.5 text-xs font-medium rounded-lg transition-all touch-manipulation capitalize active:scale-[0.98]',
                  activeTab === tab
                    ? 'bg-elec-yellow/15 text-elec-yellow border border-elec-yellow/25'
                    : 'bg-white/[0.04] text-white border border-white/[0.08] hover:bg-white/[0.07]'
                )}
              >
                {tab === 'completed' ? 'Done' : tab} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Empty state for tab */}
        {currentDesigns.length === 0 && (
          <div className="card-surface-interactive p-4 rounded-2xl">
            <p className="text-sm text-white/50 text-left">No {activeTab} designs</p>
          </div>
        )}

        {/* Design List — HubCard style */}
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {currentDesigns.slice(0, 3).map((design, index) => {
              const circuitCount = design.schedule_data?.circuits?.length || 0;
              const projectName =
                design.schedule_data?.projectInfo?.projectName || design.installation_address;
              const isClickable = design.status === 'pending' || design.status === 'in-progress';
              const badge = getStatusBadge(design.status);

              return (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div
                    className={cn(
                      'group relative overflow-hidden card-surface-interactive rounded-2xl',
                      isClickable && 'cursor-pointer active:scale-[0.98] transition-all duration-200'
                    )}
                    onClick={() => isClickable && handleUseDesign(design)}
                  >
                    {/* Gradient accent line */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-400 opacity-30 group-hover:opacity-80 transition-opacity duration-200" />
                    <div className="relative z-10 p-4">
                      {/* Top row: badges + date */}
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', badge.style)}>
                          {badge.label}
                        </span>
                        <span className="text-[10px] font-medium text-white/30 px-2 py-0.5 rounded bg-white/[0.04]">
                          {circuitCount} circuit{circuitCount !== 1 ? 's' : ''}
                        </span>
                        <span className="text-[11px] text-white ml-auto">
                          {formatDate(design.created_at)}
                        </span>
                      </div>

                      {/* Project name */}
                      <h3 className="text-[15px] font-semibold text-white leading-tight group-hover:text-elec-yellow transition-colors truncate">
                        {projectName || 'Untitled'}
                      </h3>

                      {/* Bottom row: action + delete + chevron */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-[11px] font-medium text-elec-yellow">
                          {isClickable ? 'Use in EIC' : design.status === 'completed' ? 'Done' : 'Archived'}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteId(design.id);
                            }}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                          {isClickable && (
                            <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all duration-200">
                              <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[hsl(240_5.9%_12%)] border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Design?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently delete this circuit design.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
