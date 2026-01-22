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

  // Filter designs by status
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
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-16 w-full rounded-xl" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm">Failed to load designed circuits</p>
      </div>
    );
  }

  const totalCount = pendingDesigns.length + completedDesigns.length + archivedDesigns.length;

  return (
    <>
      <div className="space-y-2.5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-white">Designed Circuits</span>
          </div>
          {pendingDesigns.length > 0 && (
            <span className="text-xs font-medium text-elec-yellow">
              {pendingDesigns.length} pending
            </span>
          )}
        </div>

        {/* Segmented Control Tabs */}
        {totalCount > 0 && (
          <div className="flex bg-card rounded-lg p-1 border border-elec-yellow/20">
            <button
              onClick={() => setActiveTab('pending')}
              className={cn(
                "flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-all touch-manipulation",
                activeTab === 'pending'
                  ? "bg-elec-yellow/20 text-elec-yellow"
                  : "text-white/50 hover:text-white/70"
              )}
            >
              Pending {pendingDesigns.length > 0 && `(${pendingDesigns.length})`}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={cn(
                "flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-all touch-manipulation",
                activeTab === 'completed'
                  ? "bg-elec-yellow/20 text-elec-yellow"
                  : "text-white/50 hover:text-white/70"
              )}
            >
              Done {completedDesigns.length > 0 && `(${completedDesigns.length})`}
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={cn(
                "flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-all touch-manipulation",
                activeTab === 'archived'
                  ? "bg-elec-yellow/20 text-elec-yellow"
                  : "text-white/50 hover:text-white/70"
              )}
            >
              Archive {archivedDesigns.length > 0 && `(${archivedDesigns.length})`}
            </button>
          </div>
        )}

        {/* Content */}
        <div className="space-y-2">
          {/* Empty State */}
          {currentDesigns.length === 0 && (
            <div className="py-6 text-center">
              <div className="w-11 h-11 mx-auto mb-3 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                {activeTab === 'archived' ? (
                  <Archive className="h-5 w-5 text-elec-yellow/50" />
                ) : activeTab === 'completed' ? (
                  <FileCheck className="h-5 w-5 text-elec-yellow/50" />
                ) : (
                  <Zap className="h-5 w-5 text-elec-yellow/50" />
                )}
              </div>
              <p className="text-sm text-white/40 mb-3">
                {activeTab === 'pending' && 'No pending designs'}
                {activeTab === 'completed' && 'No completed designs'}
                {activeTab === 'archived' && 'No archived designs'}
              </p>
              {activeTab === 'pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/electrician/circuit-designer')}
                  className="gap-2 bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/20 h-9 touch-manipulation"
                >
                  <Plus className="h-4 w-4" />
                  Create Design
                </Button>
              )}
            </div>
          )}

          {/* Design List */}
          <AnimatePresence mode="popLayout">
            {currentDesigns.slice(0, 5).map((design, index) => {
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
                    "flex items-center gap-3 p-3 rounded-xl border",
                    "bg-card border-elec-yellow/20",
                    isClickable && "hover:border-elec-yellow/40"
                  )}
                >
                  {/* Main clickable area */}
                  <button
                    className={cn(
                      "flex items-center gap-3 flex-1 min-w-0 text-left touch-manipulation",
                      isClickable && "active:opacity-70",
                      !isClickable && "cursor-default"
                    )}
                    onClick={() => isClickable && handleUseDesign(design)}
                    disabled={!isClickable}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-elec-yellow/15 flex items-center justify-center">
                      {design.status === 'archived' ? (
                        <Archive className="h-4 w-4 text-elec-yellow/50" />
                      ) : design.status === 'completed' ? (
                        <FileCheck className="h-4 w-4 text-elec-yellow" />
                      ) : (
                        <Zap className="h-4 w-4 text-elec-yellow" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-white truncate mb-0.5">
                        {projectName}
                      </h4>

                      <div className="flex items-center gap-2 text-[11px] text-white/40">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[80px]">{design.installation_address}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(design.created_at)}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[10px] px-1.5 py-0.5 bg-elec-yellow/10 rounded text-elec-yellow/70 font-medium">
                          {circuitCount} circuits
                        </span>
                        {design.schedule_data?.supply?.earthingSystem && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-elec-yellow/10 rounded text-elec-yellow/70 font-medium">
                            {design.schedule_data.supply.earthingSystem}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => setDeleteId(design.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    {isClickable && (
                      <ChevronRight className="h-5 w-5 text-elec-yellow/40" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* View All Link */}
          {currentDesigns.length > 5 && (
            <Button
              variant="ghost"
              className="w-full text-elec-yellow/60 hover:text-elec-yellow hover:bg-elec-yellow/10 h-9 text-sm touch-manipulation"
              onClick={() => navigate('/electrician/circuit-designer')}
            >
              View All ({currentDesigns.length})
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-card border-elec-yellow/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Delete Design?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              This will permanently delete this designed circuit schedule. This action cannot be undone.
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
