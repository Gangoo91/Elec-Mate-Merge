/**
 * QuickCVSheet - Quick access to CV from Job Vacancies
 *
 * 85vh bottom sheet showing:
 * - Primary CV mini preview
 * - Sync status indicator
 * - Quick actions: Download, Edit, Sync
 * - Link to full Elec-ID profile
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  FileText,
  Download,
  Edit2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  IdCard,
  ArrowRight,
  Plus,
  Loader2,
  Star,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
} from "lucide-react";
import { usePrimaryCV, useCVs, calculateCVCompleteness } from "@/hooks/useCV";
import { useCVSyncStatus, useElecIdForCV } from "@/hooks/useCVSync";
import { generateCVPDFByTemplate } from "@/components/cv-builder/pdfGenerators";
import { toast } from "@/hooks/use-toast";

interface QuickCVSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

// Template color configurations
const TEMPLATE_STYLES: Record<string, { label: string; color: string; gradient: string }> = {
  classic: { label: "Classic", color: "text-blue-400", gradient: "from-blue-500 to-blue-700" },
  modern: { label: "Modern", color: "text-amber-400", gradient: "from-amber-500 to-orange-600" },
  creative: { label: "Creative", color: "text-purple-400", gradient: "from-purple-500 to-pink-500" },
  technical: { label: "Technical", color: "text-emerald-400", gradient: "from-emerald-500 to-teal-600" },
};

const QuickCVSheet = ({ isOpen, onClose }: QuickCVSheetProps) => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);

  // Fetch CV data
  const { data: primaryCV, isLoading: isLoadingPrimaryCV } = usePrimaryCV();
  const { data: allCVs, isLoading: isLoadingAllCVs } = useCVs();
  const { data: elecIdData } = useElecIdForCV();

  const isLoading = isLoadingPrimaryCV || isLoadingAllCVs;

  // Use primary CV if available, otherwise first CV
  const cv = primaryCV || allCVs?.[0];
  const cvSyncStatus = useCVSyncStatus(cv?.cv_data);

  const hasElecIdProfile = !!elecIdData?.profile;
  const templateStyle = cv ? TEMPLATE_STYLES[cv.template_id] || TEMPLATE_STYLES.classic : null;
  const completeness = cv ? calculateCVCompleteness(cv.cv_data) : 0;

  const handleDownload = async () => {
    if (!cv) return;

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

  const handleEditCV = () => {
    if (cv) {
      localStorage.setItem("elecmate-cv-draft", JSON.stringify(cv.cv_data));
      localStorage.setItem("elecmate-cv-template", cv.template_id);
      localStorage.setItem("elecmate-cv-editing-id", cv.id);
    }
    navigate("/electrician-hub/cv-builder");
    onClose();
  };

  const handleCreateCV = () => {
    navigate("/electrician-hub/cv-builder");
    onClose();
  };

  const handleViewElecId = () => {
    navigate("/settings?tab=elec-id");
    onClose();
  };

  const handleManageCVs = () => {
    navigate("/settings?tab=elec-id&subtab=cv");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/10 bg-background"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <IdCard className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <SheetTitle className="text-lg font-bold text-foreground">My CV</SheetTitle>
                <p className="text-xs text-muted-foreground">Quick access for job applications</p>
              </div>
              {hasElecIdProfile && (
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Linked
                </Badge>
              )}
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
              <LoadingSkeleton />
            ) : cv ? (
              <>
                {/* CV Preview Card */}
                <Card className={cn(
                  "border-white/10 bg-white/[0.03] overflow-hidden",
                  cv.is_primary && "border-elec-yellow/30 ring-1 ring-elec-yellow/20"
                )}>
                  <div className={cn(
                    "h-1 bg-gradient-to-r",
                    templateStyle?.gradient || "from-gray-500 to-gray-600"
                  )} />
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center shrink-0",
                        "bg-gradient-to-br",
                        templateStyle?.gradient || "from-gray-500 to-gray-600"
                      )}>
                        <FileText className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
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
                          {templateStyle?.label || "Classic"} template
                        </p>

                        {/* Quick stats */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center gap-1.5">
                            <div className={cn(
                              "h-2 w-2 rounded-full",
                              completeness >= 80 ? "bg-green-500" :
                              completeness >= 50 ? "bg-amber-500" : "bg-red-500"
                            )} />
                            <span className="text-xs text-muted-foreground">
                              {completeness}% complete
                            </span>
                          </div>
                          {!cvSyncStatus.isLoading && (
                            <div className="flex items-center gap-1.5">
                              {cvSyncStatus.needsSync ? (
                                <>
                                  <AlertCircle className="h-3 w-3 text-amber-500" />
                                  <span className="text-xs text-amber-500">
                                    Updates available
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
                      </div>
                    </div>

                    {/* CV Content Preview */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="grid grid-cols-2 gap-3">
                        <PreviewStat
                          icon={User}
                          label="Personal Info"
                          value={cv.cv_data.personalInfo.fullName || "Not set"}
                          complete={!!cv.cv_data.personalInfo.fullName}
                        />
                        <PreviewStat
                          icon={Briefcase}
                          label="Experience"
                          value={`${cv.cv_data.experience.length} entries`}
                          complete={cv.cv_data.experience.length > 0}
                        />
                        <PreviewStat
                          icon={GraduationCap}
                          label="Education"
                          value={`${cv.cv_data.education.length} entries`}
                          complete={cv.cv_data.education.length > 0}
                        />
                        <PreviewStat
                          icon={Wrench}
                          label="Skills"
                          value={`${cv.cv_data.skills.length} skills`}
                          complete={cv.cv_data.skills.length > 0}
                        />
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                      >
                        {isDownloading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <Download className="h-4 w-4 mr-2" />
                        )}
                        Download PDF
                      </Button>
                      <Button
                        onClick={handleEditCV}
                        variant="outline"
                        className="border-white/10 bg-white/5 hover:bg-white/10"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* All CVs count */}
                {allCVs && allCVs.length > 1 && (
                  <Button
                    variant="ghost"
                    onClick={handleManageCVs}
                    className="w-full justify-between text-muted-foreground hover:text-foreground"
                  >
                    <span>You have {allCVs.length} CVs</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </>
            ) : (
              <EmptyState onCreateCV={handleCreateCV} />
            )}

            {/* Elec-ID link */}
            <Card className="border-white/10 bg-white/[0.02]">
              <CardContent className="p-4">
                <Button
                  variant="ghost"
                  onClick={handleViewElecId}
                  className="w-full justify-between text-muted-foreground hover:text-foreground"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-elec-yellow/20 flex items-center justify-center">
                      <IdCard className="h-4 w-4 text-elec-yellow" />
                    </div>
                    <span>View full Elec-ID profile</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Preview stat component
const PreviewStat = ({
  icon: Icon,
  label,
  value,
  complete,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  complete: boolean;
}) => (
  <div className="flex items-center gap-2">
    <div className={cn(
      "w-7 h-7 rounded-lg flex items-center justify-center",
      complete ? "bg-green-500/20" : "bg-white/5"
    )}>
      <Icon className={cn("h-3.5 w-3.5", complete ? "text-green-400" : "text-muted-foreground")} />
    </div>
    <div className="min-w-0">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xs font-medium text-foreground truncate">{value}</p>
    </div>
  </div>
);

// Loading skeleton
const LoadingSkeleton = () => (
  <Card className="border-white/10 bg-white/[0.03]">
    <div className="h-1 bg-gray-600" />
    <CardContent className="p-4">
      <div className="flex items-start gap-4">
        <Skeleton className="w-14 h-14 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-24" />
          <div className="flex gap-3 mt-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-20" />
      </div>
    </CardContent>
  </Card>
);

// Empty state
const EmptyState = ({ onCreateCV }: { onCreateCV: () => void }) => (
  <Card className="border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10">
    <CardContent className="p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
        <FileText className="h-8 w-8 text-white" />
      </div>
      <h3 className="font-semibold text-foreground mb-2">No CV Yet</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Create your professional CV to apply for jobs with one click.
      </p>
      <Button
        onClick={onCreateCV}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Your CV
      </Button>
    </CardContent>
  </Card>
);

export default QuickCVSheet;
