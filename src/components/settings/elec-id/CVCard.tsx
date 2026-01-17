/**
 * CVCard Component
 *
 * Displays a CV card in the My CV tab with:
 * - Template style indicator
 * - CV title and last updated
 * - Sync status badge
 * - Primary CV badge
 * - Quick actions (Download, Edit, Delete, Set Primary)
 */

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FileText,
  Download,
  Edit2,
  Trash2,
  Star,
  StarOff,
  MoreVertical,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatDistanceToNow } from "date-fns";
import { UserCV, useDeleteCV, useSetPrimaryCV, calculateCVCompleteness } from "@/hooks/useCV";
import { useCVSyncStatus } from "@/hooks/useCVSync";
import { generateCVPDFByTemplate } from "@/components/cv-builder/pdfGenerators";
import { toast } from "@/hooks/use-toast";

// Template color configurations
const TEMPLATE_STYLES: Record<
  string,
  { label: string; color: string; bgColor: string; gradient: string }
> = {
  classic: {
    label: "Classic",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    gradient: "from-blue-500 to-blue-700",
  },
  modern: {
    label: "Modern",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
    gradient: "from-amber-500 to-orange-600",
  },
  creative: {
    label: "Creative",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
    gradient: "from-purple-500 to-pink-500",
  },
  technical: {
    label: "Technical",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
    gradient: "from-emerald-500 to-teal-600",
  },
};

interface CVCardProps {
  cv: UserCV;
  onEdit: (cv: UserCV) => void;
}

const CVCard = ({ cv, onEdit }: CVCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const deleteCV = useDeleteCV();
  const setPrimaryCV = useSetPrimaryCV();
  const { needsSync, pendingCount, isLoading: isCheckingSync } = useCVSyncStatus(cv.cv_data);

  const templateStyle = TEMPLATE_STYLES[cv.template_id] || TEMPLATE_STYLES.classic;
  const completeness = calculateCVCompleteness(cv.cv_data);
  const lastUpdated = formatDistanceToNow(new Date(cv.updated_at), { addSuffix: true });

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await generateCVPDFByTemplate(cv.cv_data, cv.template_id);
      toast({
        title: "CV Downloaded",
        description: "Your CV has been downloaded as a PDF.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteCV.mutateAsync(cv.id);
      toast({
        title: "CV Deleted",
        description: "Your CV has been deleted.",
      });
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const handleSetPrimary = async () => {
    try {
      await setPrimaryCV.mutateAsync(cv.id);
      toast({
        title: "Primary CV Set",
        description: "This CV will be used by default for job applications.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set primary CV. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className={cn(
            "relative overflow-hidden transition-all duration-200 touch-manipulation",
            "border-white/10 bg-white/[0.03]",
            cv.is_primary && "border-elec-yellow/30 ring-1 ring-elec-yellow/20"
          )}
        >
          {/* Template accent bar */}
          <div className={cn("absolute top-0 left-0 right-0 h-1 bg-gradient-to-r", templateStyle.gradient)} />

          <CardContent className="p-4 pt-5">
            <div className="flex items-start gap-4">
              {/* Template icon */}
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  templateStyle.bgColor
                )}
              >
                <FileText className={cn("h-6 w-6", templateStyle.color)} />
              </div>

              {/* CV info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground truncate">
                        {cv.title || "My CV"}
                      </h3>
                      {cv.is_primary && (
                        <Badge
                          variant="secondary"
                          className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-[10px] px-1.5 py-0"
                        >
                          <Star className="h-2.5 w-2.5 mr-0.5 fill-current" />
                          Primary
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {templateStyle.label} template • Updated {lastUpdated}
                    </p>
                  </div>

                  {/* Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-48 bg-elec-gray border-white/10"
                    >
                      <DropdownMenuItem onClick={() => onEdit(cv)}>
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit CV
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDownload} disabled={isDownloading}>
                        {isDownloading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4 mr-2" />
                        )}
                        Download PDF
                      </DropdownMenuItem>
                      {!cv.is_primary && (
                        <DropdownMenuItem
                          onClick={handleSetPrimary}
                          disabled={setPrimaryCV.isPending}
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Set as Primary
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-white/10" />
                      <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        className="text-red-400 focus:text-red-400 focus:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Status row */}
                <div className="flex items-center gap-3 mt-3">
                  {/* Completeness */}
                  <div className="flex items-center gap-1.5">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        completeness >= 80
                          ? "bg-green-500"
                          : completeness >= 50
                          ? "bg-amber-500"
                          : "bg-red-500"
                      )}
                    />
                    <span className="text-xs text-muted-foreground">{completeness}% complete</span>
                  </div>

                  {/* Sync status */}
                  {!isCheckingSync && (
                    <div className="flex items-center gap-1.5">
                      {needsSync ? (
                        <>
                          <AlertCircle className="h-3 w-3 text-amber-500" />
                          <span className="text-xs text-amber-500">
                            {pendingCount} updates available
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-green-500">Synced</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Quick actions */}
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs border-white/10 bg-white/5 hover:bg-white/10"
                    onClick={() => onEdit(cv)}
                  >
                    <Edit2 className="h-3 w-3 mr-1.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn(
                      "h-8 text-xs border-white/10 bg-white/5 hover:bg-white/10",
                      templateStyle.color
                    )}
                    onClick={handleDownload}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <Loader2 className="h-3 w-3 mr-1.5 animate-spin" />
                    ) : (
                      <Download className="h-3 w-3 mr-1.5" />
                    )}
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-elec-gray border-white/10">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete CV?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{cv.title || "My CV"}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/10 bg-white/5">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CVCard;
