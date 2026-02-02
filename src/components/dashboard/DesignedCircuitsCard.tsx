/**
 * DesignedCircuitsCard.tsx
 * Shows designed circuits from Circuit Designer on the I&T dashboard
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CircuitBoard,
  Zap,
  MapPin,
  Calendar,
  ChevronRight,
  FileCheck,
  Plus,
  AlertCircle,
  Archive,
  Trash2,
} from 'lucide-react';
import { useDesignedCircuits, useDeleteDesignedCircuit, useArchiveDesign, DesignedCircuit } from '@/hooks/useDesignedCircuits';
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
      pendingDesigns: all.filter(d => d.status === 'pending' || d.status === 'in-progress'),
      completedDesigns: all.filter(d => d.status === 'completed'),
      archivedDesigns: all.filter(d => d.status === 'archived'),
    };
  }, [designedCircuits]);

  const currentDesigns = useMemo(() => {
    switch (activeTab) {
      case 'pending': return pendingDesigns;
      case 'completed': return completedDesigns;
      case 'archived': return archivedDesigns;
      default: return pendingDesigns;
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
      <div className="bg-[#242428] border border-elec-yellow/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <CircuitBoard className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-semibold text-elec-yellow">Designed Circuits</span>
        </div>
        <Skeleton className="h-16 w-full rounded-xl bg-black/40" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm">Failed to load designed circuits</p>
      </div>
    );
  }

  const totalCount = pendingDesigns.length + completedDesigns.length + archivedDesigns.length;

  if (totalCount === 0) {
    return (
      <div className="bg-[#242428] border border-elec-yellow/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <CircuitBoard className="h-4 w-4 text-elec-yellow" />
          <span className="text-sm font-semibold text-elec-yellow">Designed Circuits</span>
        </div>
        <div className="text-center py-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
            <Zap className="h-6 w-6 text-elec-yellow/50" />
          </div>
          <p className="text-sm text-white/40 mb-4">No circuit designs yet</p>
          <Button
            onClick={() => navigate('/electrician/circuit-designer')}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 h-10 px-5 font-semibold rounded-xl"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Design
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#242428] border border-elec-yellow/30 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CircuitBoard className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-semibold text-elec-yellow">Designed Circuits</span>
            </div>
            {pendingDesigns.length > 0 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-elec-yellow/20 text-elec-yellow">
                {pendingDesigns.length} pending
              </span>
            )}
          </div>

          {/* Tabs */}
          <div className="flex bg-black/30 rounded-xl p-1">
            {(['pending', 'completed', 'archived'] as StatusTab[]).map((tab) => {
              const count = tab === 'pending' ? pendingDesigns.length : tab === 'completed' ? completedDesigns.length : archivedDesigns.length;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-1 py-2 px-2 text-xs font-medium rounded-lg transition-all touch-manipulation capitalize",
                    activeTab === tab
                      ? "bg-elec-yellow/20 text-elec-yellow"
                      : "text-white/40 hover:text-white/60"
                  )}
                >
                  {tab === 'completed' ? 'Done' : tab} {count > 0 && `(${count})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty state for tab */}
        {currentDesigns.length === 0 && (
          <div className="text-center py-8 px-4">
            <p className="text-sm text-white/40">No {activeTab} designs</p>
          </div>
        )}

        {/* Design List */}
        <div className="px-3 pb-3 space-y-2">
          <AnimatePresence mode="popLayout">
            {currentDesigns.slice(0, 3).map((design, index) => {
              const circuitCount = design.schedule_data?.circuits?.length || 0;
              const projectName = design.schedule_data?.projectInfo?.projectName || design.installation_address;
              const isClickable = design.status === 'pending' || design.status === 'in-progress';

              return (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl",
                    "bg-black/40",
                    isClickable && "hover:bg-black/50 cursor-pointer active:scale-[0.98] transition-all touch-manipulation"
                  )}
                  onClick={() => isClickable && handleUseDesign(design)}
                >
                  <div className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                    design.status === 'completed' ? 'bg-green-500/15' : 'bg-elec-yellow/15'
                  )}>
                    {design.status === 'completed' ? (
                      <FileCheck className="h-4 w-4 text-green-400" />
                    ) : design.status === 'archived' ? (
                      <Archive className="h-4 w-4 text-white/30" />
                    ) : (
                      <Zap className="h-4 w-4 text-elec-yellow" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{projectName}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-white/40 mt-0.5">
                      <span>{circuitCount} circuits</span>
                      <span>•</span>
                      <span>{formatDate(design.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteId(design.id); }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {isClickable && <ChevronRight className="h-5 w-5 text-elec-yellow/40" />}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {currentDesigns.length > 3 && (
          <div className="px-3 pb-3">
            <Button
              variant="ghost"
              className="w-full h-9 text-xs text-elec-yellow/60 hover:text-elec-yellow hover:bg-elec-yellow/10 rounded-xl"
              onClick={() => navigate('/electrician/circuit-designer')}
            >
              View All ({currentDesigns.length})
            </Button>
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-elec-yellow/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Design?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              This will permanently delete this circuit design.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
