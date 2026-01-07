/**
 * DesignedCircuitsCard.tsx
 * Premium card showing pending designed circuits from Circuit Designer
 * Displays in the Inspection & Testing dashboard
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
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
  AlertCircle
} from 'lucide-react';
import { useDesignedCircuits, useDeleteDesignedCircuit, DesignedCircuit } from '@/hooks/useDesignedCircuits';
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

interface DesignedCircuitsCardProps {
  onNavigate?: (section: string, reportId?: string, reportType?: string) => void;
}

export const DesignedCircuitsCard = ({ onNavigate }: DesignedCircuitsCardProps) => {
  const navigate = useNavigate();
  const { data: designedCircuits, isLoading, error } = useDesignedCircuits();
  const deleteDesign = useDeleteDesignedCircuit();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleUseDesign = (design: DesignedCircuit) => {
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
      year: 'numeric'
    });
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

  const pendingDesigns = designedCircuits?.filter(d => d.status === 'pending') || [];

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
        </CardHeader>

        <CardContent className="space-y-3">
          {/* Empty State */}
          {pendingDesigns.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "p-6 rounded-xl text-center",
                "bg-white/5 border border-dashed border-white/10"
              )}
            >
              <div className="inline-flex p-3 rounded-xl bg-white/5 mb-3">
                <Zap className="h-6 w-6 text-white/40" />
              </div>
              <h4 className="text-sm font-medium text-white mb-1">No Pending Designs</h4>
              <p className="text-xs text-white/50 mb-4">
                Create circuit designs in the Electrical Hub to pre-populate EIC forms
              </p>
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
            </motion.div>
          )}

          {/* Design List */}
          <AnimatePresence mode="popLayout">
            {pendingDesigns.map((design, index) => {
              const circuitCount = design.schedule_data?.circuits?.length || 0;
              const projectName = design.schedule_data?.projectInfo?.projectName || design.installation_address;

              return (
                <motion.div
                  key={design.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "group relative p-4 rounded-xl cursor-pointer",
                    "bg-white/5 hover:bg-white/10",
                    "border border-white/10 hover:border-elec-yellow/30",
                    "transition-all duration-ios-fast"
                  )}
                  onClick={() => handleUseDesign(design)}
                >
                  {/* Main Content */}
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg shrink-0",
                      "bg-elec-yellow/10"
                    )}>
                      <Zap className="h-4 w-4 text-elec-yellow" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold text-white truncate">
                          {projectName}
                        </h4>
                        <Badge
                          className={cn(
                            "shrink-0 text-[10px]",
                            design.status === 'pending'
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                              : "bg-green-500/20 text-green-300 border-green-500/30"
                          )}
                        >
                          {design.status}
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

                      {/* Circuit Count */}
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
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
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
                      <div className={cn(
                        "p-1.5 rounded-lg",
                        "bg-elec-yellow/10 group-hover:bg-elec-yellow/20",
                        "transition-all duration-ios-fast"
                      )}>
                        <ChevronRight className="h-4 w-4 text-elec-yellow" />
                      </div>
                    </div>
                  </div>

                  {/* Use in EIC hint */}
                  <div className={cn(
                    "absolute bottom-1 right-3",
                    "text-[10px] text-white/30 opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-ios-fast"
                  )}>
                    Click to use in EIC
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* View All Link */}
          {pendingDesigns.length > 3 && (
            <Button
              variant="ghost"
              className="w-full text-white/50 hover:text-white hover:bg-white/5"
              onClick={() => navigate('/electrician/circuit-designer')}
            >
              View All Designs
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
