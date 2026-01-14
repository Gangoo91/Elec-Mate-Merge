/**
 * DesignedCircuitsCard.tsx
 * Premium card showing designed circuits from Circuit Designer
 * Displays in the Inspection & Testing dashboard with status tabs
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
      <Card className="bg-card/50 backdrop-blur border-white/10">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="bg-card/50 backdrop-blur border-red-500/20">
        <CardContent className="py-6">
          <div className="flex items-center gap-3 text-red-400">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">Failed to load designed circuits</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalCount = pendingDesigns.length + completedDesigns.length + archivedDesigns.length;

  return (
    <>
      <Card className={cn(
        "overflow-hidden",
        "bg-gradient-to-br from-card/80 to-card/40",
        "backdrop-blur border-white/10",
        "transition-all duration-ios-normal"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "p-2.5 rounded-xl",
                "bg-elec-yellow/10 border border-elec-yellow/20"
              )}>
                <CircuitBoard className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Designed Circuits</h3>
                <p className="text-xs text-white/50">From AI Circuit Designer</p>
              </div>
            </div>
            {pendingDesigns.length > 0 && (
              <Badge className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20">
                {pendingDesigns.length} pending
              </Badge>
            )}
          </div>

          {/* Status Tabs */}
          {totalCount > 0 && (
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as StatusTab)} className="mt-4">
              <TabsList className="w-full bg-white/5 border border-white/10">
                <TabsTrigger
                  value="pending"
                  className="flex-1 text-xs data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300"
                >
                  Pending {pendingDesigns.length > 0 && `(${pendingDesigns.length})`}
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="flex-1 text-xs data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300"
                >
                  Completed {completedDesigns.length > 0 && `(${completedDesigns.length})`}
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="flex-1 text-xs data-[state=active]:bg-gray-500/20 data-[state=active]:text-gray-300"
                >
                  Archived {archivedDesigns.length > 0 && `(${archivedDesigns.length})`}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Empty State */}
          {currentDesigns.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-6 rounded-xl text-center",
                "bg-white/5 border border-dashed border-white/10"
              )}
            >
              <div className="inline-flex p-3 rounded-xl bg-white/5 mb-3">
                {activeTab === 'archived' ? (
                  <Archive className="h-6 w-6 text-white/40" />
                ) : activeTab === 'completed' ? (
                  <FileCheck className="h-6 w-6 text-white/40" />
                ) : (
                  <Zap className="h-6 w-6 text-white/40" />
                )}
              </div>
              <h4 className="text-sm font-medium text-white mb-1">
                {activeTab === 'pending' && 'No Pending Designs'}
                {activeTab === 'completed' && 'No Completed Designs'}
                {activeTab === 'archived' && 'No Archived Designs'}
              </h4>
              <p className="text-xs text-white/50 mb-4">
                {activeTab === 'pending' && 'Create circuit designs in the Electrical Hub to pre-populate EIC forms'}
                {activeTab === 'completed' && 'Completed designs will appear here after their EIC certificates are saved'}
                {activeTab === 'archived' && 'Archive completed designs to keep your workspace tidy'}
              </p>
              {activeTab === 'pending' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/electrician/circuit-designer')}
                  className={cn(
                    "gap-2",
                    "bg-elec-yellow/10 border-elec-yellow/30",
                    "hover:bg-elec-yellow/20 hover:border-elec-yellow/50",
                    "text-elec-yellow"
                  )}
                >
                  <Plus className="h-4 w-4" />
                  Create Design
                </Button>
              )}
            </motion.div>
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "group relative p-4 rounded-xl",
                    isClickable && "cursor-pointer",
                    "bg-white/5 hover:bg-white/10",
                    "border border-white/10",
                    isClickable && "hover:border-elec-yellow/30",
                    "transition-all duration-ios-fast"
                  )}
                  onClick={() => isClickable && handleUseDesign(design)}
                >
                  {/* Main Content */}
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg shrink-0",
                      design.status === 'archived' ? "bg-gray-500/10" :
                      design.status === 'completed' ? "bg-green-500/10" :
                      "bg-elec-yellow/10"
                    )}>
                      {design.status === 'archived' ? (
                        <Archive className="h-4 w-4 text-gray-400" />
                      ) : design.status === 'completed' ? (
                        <FileCheck className="h-4 w-4 text-green-400" />
                      ) : (
                        <Zap className="h-4 w-4 text-elec-yellow" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-white truncate">
                          {projectName}
                        </h4>
                        <Badge className={cn("shrink-0 text-[10px]", getStatusBadgeClasses(design.status))}>
                          {design.status === 'in-progress' ? 'in progress' : design.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-white/50">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[120px]">{design.installation_address}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(design.created_at)}</span>
                        </div>
                      </div>

                      {/* Circuit Count & Certificate Link */}
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="outline"
                          className="text-[10px] bg-white/5 border-white/10 text-white/70"
                        >
                          {circuitCount} circuit{circuitCount !== 1 ? 's' : ''}
                        </Badge>
                        {design.schedule_data?.supply?.earthingSystem && (
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-white/5 border-white/10 text-white/70"
                          >
                            {design.schedule_data.supply.earthingSystem}
                          </Badge>
                        )}
                        {design.certificate_id && (
                          <Badge
                            variant="outline"
                            className="text-[10px] bg-green-500/10 border-green-500/30 text-green-300 gap-1"
                          >
                            <ExternalLink className="h-2.5 w-2.5" />
                            Certificate linked
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Archive button for completed designs */}
                      {design.status === 'completed' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100",
                            "bg-gray-500/10 hover:bg-gray-500/20",
                            "text-gray-400 hover:text-gray-300",
                            "transition-all duration-ios-fast"
                          )}
                          onClick={(e) => handleArchive(e, design.id)}
                          title="Archive design"
                        >
                          <Archive className="h-4 w-4" />
                        </Button>
                      )}

                      {/* Delete button (only for pending/in-progress) */}
                      {(design.status === 'pending' || design.status === 'in-progress') && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100",
                            "bg-red-500/10 hover:bg-red-500/20",
                            "text-red-400 hover:text-red-300",
                            "transition-all duration-ios-fast"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteId(design.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}

                      {/* Chevron for clickable items */}
                      {isClickable && (
                        <div className={cn(
                          "p-1.5 rounded-lg",
                          "bg-elec-yellow/10 group-hover:bg-elec-yellow/20",
                          "transition-all duration-ios-fast"
                        )}>
                          <ChevronRight className="h-4 w-4 text-elec-yellow" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Use in EIC hint */}
                  {isClickable && (
                    <div className={cn(
                      "absolute bottom-1 right-3",
                      "text-[10px] text-white/30 opacity-0 group-hover:opacity-100",
                      "transition-opacity duration-ios-fast"
                    )}>
                      Click to use in EIC
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* View All Link */}
          {currentDesigns.length > 5 && (
            <Button
              variant="ghost"
              className="w-full text-white/50 hover:text-white hover:bg-white/5"
              onClick={() => navigate('/electrician/circuit-designer')}
            >
              View All ({currentDesigns.length})
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </CardContent>
      </Card>

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
