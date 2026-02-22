/**
 * DesignedCircuitsCard.tsx
 * Shows designed circuits from Circuit Designer on the I&T dashboard
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CircuitBoard,
  Zap,
  ChevronRight,
  FileCheck,
  AlertCircle,
  Archive,
  Trash2,
} from 'lucide-react';
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

  if (isLoading) {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <CircuitBoard className="h-5 w-5 text-elec-yellow" />
          <span className="text-base font-semibold text-white">Designed Circuits</span>
        </div>
        <Skeleton className="h-20 w-full rounded-2xl bg-white/[0.03]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-500/8 border border-red-500/15 rounded-2xl text-red-400">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm font-medium">Failed to load designed circuits</p>
      </div>
    );
  }

  const totalCount = pendingDesigns.length + completedDesigns.length + archivedDesigns.length;

  if (totalCount === 0) {
    return (
      <div>
        <div className="flex items-center gap-2.5 mb-4">
          <CircuitBoard className="h-5 w-5 text-elec-yellow" />
          <span className="text-base font-semibold text-white">Designed Circuits</span>
        </div>
        <button
          onClick={() => navigate('/electrician/circuit-designer')}
          className="group w-full flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.09] active:scale-[0.98] transition-all touch-manipulation text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-elec-yellow/12 flex items-center justify-center flex-shrink-0">
            <Zap className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">No designs yet</p>
            <p className="text-sm text-white mt-0.5">Tap to open Circuit Designer</p>
          </div>
          <ChevronRight className="h-5 w-5 text-elec-yellow flex-shrink-0" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div>
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <CircuitBoard className="h-5 w-5 text-elec-yellow" />
            <span className="text-base font-semibold text-white">Designed Circuits</span>
            {pendingDesigns.length > 0 && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-elec-yellow/15 text-elec-yellow">
                {pendingDesigns.length} pending
              </span>
            )}
          </div>
          {currentDesigns.length > 3 && (
            <button
              className="text-sm font-medium text-elec-yellow hover:underline touch-manipulation h-11 flex items-center"
              onClick={() => navigate('/electrician/circuit-designer')}
            >
              View All
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
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
                  'h-11 px-4 text-sm font-medium rounded-xl transition-all touch-manipulation capitalize',
                  activeTab === tab
                    ? 'bg-elec-yellow/12 text-elec-yellow border border-elec-yellow/20'
                    : 'bg-white/[0.03] text-white border border-white/[0.06] hover:bg-white/[0.09]'
                )}
              >
                {tab === 'completed' ? 'Done' : tab} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>

        {/* Empty state for tab */}
        {currentDesigns.length === 0 && (
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/[0.06] border border-white/[0.08]">
            <div className="w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
              <CircuitBoard className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm text-white text-left">No {activeTab} designs</p>
          </div>
        )}

        {/* Design List */}
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {currentDesigns.slice(0, 3).map((design, index) => {
              const circuitCount = design.schedule_data?.circuits?.length || 0;
              const projectName =
                design.schedule_data?.projectInfo?.projectName || design.installation_address;
              const isClickable = design.status === 'pending' || design.status === 'in-progress';

              return (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={cn(
                    'flex items-center gap-3.5 p-4 rounded-2xl',
                    'bg-white/[0.06] border border-white/[0.08]',
                    isClickable &&
                      'cursor-pointer hover:bg-white/[0.09] active:scale-[0.98] transition-all touch-manipulation'
                  )}
                  onClick={() => isClickable && handleUseDesign(design)}
                >
                  <div
                    className={cn(
                      'flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center',
                      design.status === 'completed' ? 'bg-green-500/12' : 'bg-elec-yellow/12'
                    )}
                  >
                    {design.status === 'completed' ? (
                      <FileCheck className="h-5 w-5 text-green-400" />
                    ) : design.status === 'archived' ? (
                      <Archive className="h-5 w-5 text-white" />
                    ) : (
                      <Zap className="h-5 w-5 text-elec-yellow" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">{projectName}</h4>
                    <div className="flex items-center gap-2 text-sm text-white mt-0.5">
                      <span>{circuitCount} circuits</span>
                      <span>·</span>
                      <span>{formatDate(design.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(design.id);
                      }}
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {isClickable && <ChevronRight className="h-5 w-5 text-elec-yellow" />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-[#1a1a1e] border-white/10">
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
