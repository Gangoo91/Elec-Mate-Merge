/**
 * DesignedCircuitsCard.tsx
 * Premium card showing designed circuits from Circuit Designer
 * Displays in the Inspection & Testing dashboard with status tabs
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  CircuitBoard,
  Zap,
  MapPin,
  Calendar,
  ChevronRight,
  FileCheck,
  Trash2,
  Plus,
  AlertCircle,
  Archive,
  ExternalLink
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
      // For completed/archived, just show certificate if linked
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

  const handleArchive = async (e: React.MouseEvent, designId: string) => {
    e.stopPropagation();
    try {
      await archiveDesign.mutateAsync(designId);
      toast.success('Design archived');
    } catch (error) {
      toast.error('Failed to archive design');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'completed':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'archived':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default:
        return 'bg-white/20 text-white/60 border-white/30';
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-5 rounded" />
          <Skeleton className="h-5 w-32" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
        <Skeleton className="h-16 w-full rounded-lg" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center gap-3 p-4 bg-red-500/10 rounded-xl text-red-400">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm">Failed to load designed circuits</p>
      </div>
    );
  }

  const totalCount = pendingDesigns.length + completedDesigns.length + archivedDesigns.length;

  return (
    <>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircuitBoard className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm font-semibold text-white">Designed Circuits</span>
            <span className="text-xs text-white/40">AI Designer</span>
          </div>
          {pendingDesigns.length > 0 && (
            <Badge className="bg-elec-yellow/15 text-elec-yellow border-0 text-xs font-semibold px-2 py-0.5">
              {pendingDesigns.length} pending
            </Badge>
          )}
        </div>

        {/* Native Segmented Control Tabs */}
        {totalCount > 0 && (
          <div className="flex bg-white/5 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('pending')}
              className={cn(
                "flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all touch-manipulation",
                activeTab === 'pending'
                  ? "bg-amber-500/20 text-amber-300"
                  : "text-white/50 hover:text-white/70"
              )}
            >
              Pending {pendingDesigns.length > 0 && `(${pendingDesigns.length})`}
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={cn(
                "flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all touch-manipulation",
                activeTab === 'completed'
                  ? "bg-green-500/20 text-green-300"
                  : "text-white/50 hover:text-white/70"
              )}
            >
              Completed {completedDesigns.length > 0 && `(${completedDesigns.length})`}
            </button>
            <button
              onClick={() => setActiveTab('archived')}
              className={cn(
                "flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all touch-manipulation",
                activeTab === 'archived'
                  ? "bg-gray-500/20 text-gray-300"
                  : "text-white/50 hover:text-white/70"
              )}
            >
              Archived {archivedDesigns.length > 0 && `(${archivedDesigns.length})`}
            </button>
          </div>
        )}

        {/* Content */}
        <div className="space-y-2">
          {/* Empty State */}
          {currentDesigns.length === 0 && (
            <div className="py-8 text-center">
              <div className="text-white/30 mb-2">
                {activeTab === 'archived' ? (
                  <Archive className="h-8 w-8 mx-auto" />
                ) : activeTab === 'completed' ? (
                  <FileCheck className="h-8 w-8 mx-auto" />
                ) : (
                  <Zap className="h-8 w-8 mx-auto" />
                )}
              </div>
              <p className="text-sm text-white/50 mb-4">
                {activeTab === 'pending' && 'No pending designs'}
                {activeTab === 'completed' && 'No completed designs'}
                {activeTab === 'archived' && 'No archived designs'}
              </p>
              {activeTab === 'pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/electrician/circuit-designer')}
                  className="gap-2 bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow h-11 touch-manipulation"
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
              const borderColor = design.status === 'archived' ? 'border-l-gray-500' :
                                  design.status === 'completed' ? 'border-l-green-500' :
                                  'border-l-amber-500';

              return (
                <motion.button
                  key={design.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 min-h-[64px]",
                    "bg-white/5 border-l-4 rounded-lg",
                    borderColor,
                    "text-left touch-manipulation",
                    isClickable ? "active:bg-white/10" : "cursor-default"
                  )}
                  onClick={() => isClickable && handleUseDesign(design)}
                  disabled={!isClickable}
                >
                  {/* Icon */}
                  <div className={cn(
                    "flex-shrink-0",
                    design.status === 'archived' ? "text-gray-400" :
                    design.status === 'completed' ? "text-green-400" :
                    "text-elec-yellow"
                  )}>
                    {design.status === 'archived' ? (
                      <Archive className="h-5 w-5" />
                    ) : design.status === 'completed' ? (
                      <FileCheck className="h-5 w-5" />
                    ) : (
                      <Zap className="h-5 w-5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {projectName}
                      </h4>
                      <Badge className={cn("shrink-0 text-[10px] border-0", getStatusBadgeClasses(design.status))}>
                        {design.status === 'in-progress' ? 'in progress' : design.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-white/50">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate max-w-[100px]">{design.installation_address}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(design.created_at)}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-white/60">
                        {circuitCount} circuits
                      </span>
                      {design.schedule_data?.supply?.earthingSystem && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-white/60">
                          {design.schedule_data.supply.earthingSystem}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Chevron */}
                  {isClickable && (
                    <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>

          {/* View All Link */}
          {currentDesigns.length > 5 && (
            <Button
              variant="ghost"
              className="w-full text-white/50 hover:text-white hover:bg-white/5 h-11 touch-manipulation"
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
        <AlertDialogContent className="bg-card border-white/10">
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
