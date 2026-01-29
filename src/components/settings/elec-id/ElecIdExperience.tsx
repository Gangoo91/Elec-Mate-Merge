import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer } from "vaul";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Briefcase,
  Calendar,
  Building2,
  MapPin,
  CheckCircle2,
  Clock,
  Trash2,
  ChevronRight,
  Loader2,
  X,
  User,
  FileText,
  Zap,
  Award,
  TrendingUp,
  Edit3,
} from "lucide-react";
import { UK_JOB_TITLES, getJobTitleLabel } from "@/data/uk-electrician-constants";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import {
  getWorkHistoryByProfileId,
  addElecIdWorkHistory,
  updateElecIdWorkHistory,
  deleteElecIdWorkHistory,
  ElecIdWorkHistory,
} from "@/services/elecIdService";

interface WorkExperience {
  id: string;
  employerName: string;
  jobTitle: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  isVerified: boolean;
  verifiedByEmployer: boolean;
}

// Skeleton loading component
const ExperienceSkeleton = () => (
  <div className="space-y-4">
    {/* Header skeleton */}
    <div className="flex items-center justify-between px-1">
      <div>
        <Skeleton className="h-6 w-32 bg-white/[0.06]" />
        <Skeleton className="h-4 w-24 mt-1 bg-white/[0.06]" />
      </div>
      <Skeleton className="h-12 w-36 rounded-xl bg-white/[0.06]" />
    </div>

    {/* Timeline skeleton */}
    <div className="relative pl-6">
      <div className="absolute left-2 top-4 bottom-4 w-0.5 bg-white/[0.06]" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative mb-4">
          <div className="absolute left-[-14px] top-6 w-3 h-3 rounded-full bg-white/[0.06]" />
          <div className="bg-white/[0.03] rounded-2xl p-4 ml-2">
            <div className="flex items-start gap-3">
              <Skeleton className="w-12 h-12 rounded-xl bg-white/[0.06] flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40 bg-white/[0.06]" />
                <Skeleton className="h-4 w-32 bg-white/[0.06]" />
                <Skeleton className="h-4 w-24 bg-white/[0.06]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ElecIdExperience = () => {
  const { addNotification } = useNotifications();
  const { profile } = useElecIdProfile();
  const isMobile = useIsMobile();

  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<WorkExperience | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isCurrent, setIsCurrent] = useState(false);
  const [formData, setFormData] = useState({
    employerName: "",
    jobTitle: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [workHistory, setWorkHistory] = useState<WorkExperience[]>([]);

  // Fetch work history from database
  useEffect(() => {
    const fetchWorkHistory = async () => {
      if (!profile?.id) {
        setIsFetching(false);
        return;
      }

      try {
        const data = await getWorkHistoryByProfileId(profile.id);
        const mapped = data.map((w: ElecIdWorkHistory) => ({
          id: w.id,
          employerName: w.employer_name,
          jobTitle: w.job_title,
          location: w.location || undefined,
          startDate: w.start_date,
          endDate: w.end_date || undefined,
          isCurrent: w.is_current,
          description: w.description || undefined,
          isVerified: w.is_verified,
          verifiedByEmployer: w.verified_by_employer,
        }));
        setWorkHistory(mapped);
      } catch (error) {
        console.error('Error fetching work history:', error);
        addNotification({
          title: "Error",
          message: "Failed to load work history",
          type: "error",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchWorkHistory();
  }, [profile?.id]);

  const handleAddExperience = async () => {
    if (!profile?.id) {
      addNotification({
        title: "Error",
        message: "Profile not found. Please try again.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const newDbExp = await addElecIdWorkHistory({
        profile_id: profile.id,
        employer_name: formData.employerName,
        job_title: formData.jobTitle,
        location: formData.location || null,
        start_date: formData.startDate,
        end_date: isCurrent ? null : formData.endDate || null,
        is_current: isCurrent,
        description: formData.description || null,
        projects: null,
        is_verified: false,
        verified_by_employer: false,
      });

      const newExp: WorkExperience = {
        id: newDbExp.id,
        employerName: formData.employerName,
        jobTitle: formData.jobTitle,
        location: formData.location || undefined,
        startDate: formData.startDate,
        endDate: isCurrent ? undefined : formData.endDate || undefined,
        isCurrent,
        description: formData.description || undefined,
        isVerified: false,
        verifiedByEmployer: false,
      };

      setWorkHistory((prev) => [newExp, ...prev]);
      setIsAddSheetOpen(false);
      resetForm();

      addNotification({
        title: "Experience Added",
        message: `${formData.employerName} has been added to your work history.`,
        type: "success",
      });
    } catch (error) {
      console.error('Error adding experience:', error);
      addNotification({
        title: "Error",
        message: "Failed to add experience. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditExperience = async () => {
    if (!editingExp) return;
    setIsLoading(true);

    try {
      await updateElecIdWorkHistory(editingExp.id, {
        employer_name: formData.employerName,
        job_title: formData.jobTitle,
        location: formData.location || null,
        start_date: formData.startDate,
        end_date: isCurrent ? null : formData.endDate || null,
        is_current: isCurrent,
        description: formData.description || null,
      });

      setWorkHistory((prev) =>
        prev.map((exp) =>
          exp.id === editingExp.id
            ? {
                ...exp,
                employerName: formData.employerName,
                jobTitle: formData.jobTitle,
                location: formData.location || undefined,
                startDate: formData.startDate,
                endDate: isCurrent ? undefined : formData.endDate || undefined,
                isCurrent,
                description: formData.description || undefined,
              }
            : exp
        )
      );

      setIsEditSheetOpen(false);
      setEditingExp(null);
      resetForm();

      addNotification({
        title: "Experience Updated",
        message: "Your work experience has been updated.",
        type: "success",
      });
    } catch (error) {
      console.error('Error updating experience:', error);
      addNotification({
        title: "Error",
        message: "Failed to update experience. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExperience = async () => {
    if (!deleteConfirm.id) return;
    setIsLoading(true);

    try {
      await deleteElecIdWorkHistory(deleteConfirm.id);

      const deletedExp = workHistory.find((e) => e.id === deleteConfirm.id);
      setWorkHistory((prev) => prev.filter((e) => e.id !== deleteConfirm.id));
      setDeleteConfirm({ open: false, id: null });

      addNotification({
        title: "Experience Removed",
        message: deletedExp
          ? `${deletedExp.employerName} has been removed from your history.`
          : "Experience has been removed.",
        type: "info",
      });
    } catch (error) {
      console.error('Error deleting experience:', error);
      addNotification({
        title: "Error",
        message: "Failed to delete experience. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditSheet = (exp: WorkExperience) => {
    setEditingExp(exp);
    setFormData({
      employerName: exp.employerName,
      jobTitle: exp.jobTitle,
      location: exp.location || "",
      startDate: exp.startDate,
      endDate: exp.endDate || "",
      description: exp.description || "",
    });
    setIsCurrent(exp.isCurrent);
    setIsEditSheetOpen(true);
  };

  const resetForm = () => {
    setFormData({
      employerName: "",
      jobTitle: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setIsCurrent(false);
  };

  const formatDateRange = (start: string, end?: string, current?: boolean) => {
    const startDate = new Date(start).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
    if (current) return `${startDate} - Present`;
    if (!end) return startDate;
    const endDate = new Date(end).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
    return `${startDate} - ${endDate}`;
  };

  const calculateDuration = (start: string, end?: string) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      endDate.getMonth() -
      startDate.getMonth();
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} mo`;
    if (remainingMonths === 0) return `${years} yr${years !== 1 ? "s" : ""}`;
    return `${years}y ${remainingMonths}m`;
  };

  // Group job titles by category
  const jobTitlesByCategory = UK_JOB_TITLES.reduce((acc, title) => {
    if (!acc[title.category]) acc[title.category] = [];
    acc[title.category].push(title);
    return acc;
  }, {} as Record<string, typeof UK_JOB_TITLES>);

  // Form content - reusable for both mobile and desktop
  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-6">
      {/* Company Details Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
          <Building2 className="h-4 w-4 text-elec-yellow" />
          <span>Company Details</span>
        </div>

        {/* Employer Name */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Building2 className="h-5 w-5 text-foreground/40" />
          </div>
          <Input
            value={formData.employerName}
            onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
            placeholder="Company name"
            className="h-14 pl-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base placeholder:text-foreground/40"
          />
        </div>

        {/* Location */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <MapPin className="h-5 w-5 text-foreground/40" />
          </div>
          <Input
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Location (e.g., London, Remote)"
            className="h-14 pl-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base placeholder:text-foreground/40"
          />
        </div>
      </div>

      {/* Role Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
          <Briefcase className="h-4 w-4 text-blue-400" />
          <span>Your Role</span>
        </div>

        {/* Job Title - Visual Grid Selection */}
        <div className="space-y-3">
          <Label className="text-sm text-foreground/70">Select your job title</Label>
          <div className="max-h-[200px] overflow-y-auto rounded-xl border border-white/[0.08] bg-white/[0.02]">
            {Object.entries(jobTitlesByCategory).map(([category, titles], catIndex) => (
              <div key={category}>
                {catIndex > 0 && <div className="h-px bg-white/[0.06]" />}
                <div className="sticky top-0 z-10 px-4 py-2 bg-white/[0.04] backdrop-blur-sm border-b border-white/[0.06]">
                  <span className="text-xs font-semibold text-elec-yellow uppercase tracking-wide">
                    {category}
                  </span>
                </div>
                <div className="p-2">
                  {titles.map((title) => (
                    <button
                      key={title.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, jobTitle: title.value })}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg transition-all touch-manipulation",
                        formData.jobTitle === title.value
                          ? "bg-blue-500/20 border border-blue-500/40"
                          : "hover:bg-white/[0.04] active:bg-white/[0.08]"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                        formData.jobTitle === title.value
                          ? "border-blue-400 bg-blue-400"
                          : "border-white/30"
                      )}>
                        {formData.jobTitle === title.value && (
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <span className={cn(
                        "text-sm",
                        formData.jobTitle === title.value
                          ? "text-foreground font-medium"
                          : "text-foreground/80"
                      )}>
                        {title.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Duration Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
          <Calendar className="h-4 w-4 text-emerald-400" />
          <span>Employment Period</span>
        </div>

        {/* Current Position Toggle - Prominent */}
        <button
          type="button"
          onClick={() => setIsCurrent(!isCurrent)}
          className={cn(
            "w-full flex items-center gap-4 p-4 rounded-xl border transition-all touch-manipulation",
            isCurrent
              ? "bg-emerald-500/10 border-emerald-500/30"
              : "bg-white/[0.03] border-white/[0.06] active:bg-white/[0.08]"
          )}
        >
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
            isCurrent
              ? "bg-emerald-500/20"
              : "bg-white/[0.06]"
          )}>
            <Zap className={cn(
              "h-6 w-6 transition-colors",
              isCurrent ? "text-emerald-400" : "text-foreground/50"
            )} />
          </div>
          <div className="flex-1 text-left">
            <p className={cn(
              "font-medium transition-colors",
              isCurrent ? "text-emerald-400" : "text-foreground"
            )}>
              Current Position
            </p>
            <p className="text-xs text-foreground/60">
              {isCurrent ? "You're still working here" : "Toggle if this is your current role"}
            </p>
          </div>
          <div className={cn(
            "w-12 h-7 rounded-full p-1 transition-all",
            isCurrent ? "bg-emerald-500" : "bg-white/[0.15]"
          )}>
            <div className={cn(
              "w-5 h-5 rounded-full bg-white shadow-md transition-transform",
              isCurrent ? "translate-x-5" : "translate-x-0"
            )} />
          </div>
        </button>

        {/* Date Range */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs text-foreground/70 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Started
            </Label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className={cn(
              "text-xs flex items-center gap-1",
              isCurrent ? "text-foreground/30" : "text-foreground/70"
            )}>
              <Calendar className="h-3 w-3" />
              {isCurrent ? "Present" : "Ended"}
            </Label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              disabled={isCurrent}
              className={cn(
                "h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-sm",
                isCurrent && "opacity-40 cursor-not-allowed"
              )}
            />
          </div>
        </div>

        {/* Duration Preview */}
        {formData.startDate && (
          <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <Clock className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm text-foreground/70">
              Duration: <span className="text-elec-yellow font-semibold">
                {calculateDuration(formData.startDate, isCurrent ? undefined : formData.endDate)}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
          <FileText className="h-4 w-4 text-purple-400" />
          <span>Description</span>
          <span className="text-xs text-foreground/40">(optional)</span>
        </div>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your key responsibilities, projects, and achievements..."
          className="bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base min-h-[120px] resize-none placeholder:text-foreground/40"
        />
        <p className="text-xs text-foreground/50">
          Tip: Mention specific projects, certifications earned, or skills developed
        </p>
      </div>
    </div>
  );

  // Mobile bottom sheet for forms
  const MobileFormSheet = ({
    open,
    onOpenChange,
    title,
    isEdit = false
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    isEdit?: boolean;
  }) => (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[92vh] bg-background rounded-t-[20px] border-t border-white/[0.08]">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1.5 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-4 border-b border-white/[0.06]">
            <Drawer.Title className="text-lg font-semibold text-foreground">
              {title}
            </Drawer.Title>
            <button
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
              className="p-2 -mr-2 rounded-full hover:bg-white/[0.08] touch-manipulation"
            >
              <X className="w-5 h-5 text-foreground/70" />
            </button>
          </div>

          {/* Form content */}
          <div className="flex-1 overflow-y-auto px-5 py-5">
            <FormContent isEdit={isEdit} />
          </div>

          {/* Footer buttons */}
          <div className="flex gap-3 p-5 border-t border-white/[0.06] bg-background/80 backdrop-blur-sm">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl border-white/[0.15] touch-manipulation active:scale-[0.98]"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-12 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.98]"
              onClick={isEdit ? handleEditExperience : handleAddExperience}
              disabled={!formData.employerName || !formData.jobTitle || !formData.startDate || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isEdit ? "Saving..." : "Adding..."}
                </>
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Add Experience"
              )}
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );

  // Desktop dialog for forms
  const DesktopFormDialog = ({
    open,
    onOpenChange,
    title,
    isEdit = false
  }: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    isEdit?: boolean;
  }) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-background border-white/[0.1] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">{title}</DialogTitle>
        </DialogHeader>
        <FormContent isEdit={isEdit} />
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 border-white/[0.15]"
            onClick={() => {
              onOpenChange(false);
              resetForm();
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
            onClick={isEdit ? handleEditExperience : handleAddExperience}
            disabled={!formData.employerName || !formData.jobTitle || !formData.startDate || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                {isEdit ? "Saving..." : "Adding..."}
              </>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Add Experience"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Show skeleton while fetching
  if (isFetching) {
    return <ExperienceSkeleton />;
  }

  return (
    <div className="space-y-5">
      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete Work Experience?"
        description="This will permanently remove this position from your ELEC-iD profile. This action cannot be undone."
        onConfirm={handleDeleteExperience}
        isLoading={isLoading}
      />

      {/* Add Sheet - Mobile or Desktop */}
      {isMobile ? (
        <MobileFormSheet
          open={isAddSheetOpen}
          onOpenChange={setIsAddSheetOpen}
          title="Add Work Experience"
        />
      ) : (
        <DesktopFormDialog
          open={isAddSheetOpen}
          onOpenChange={setIsAddSheetOpen}
          title="Add Work Experience"
        />
      )}

      {/* Edit Sheet - Mobile or Desktop */}
      {isMobile ? (
        <MobileFormSheet
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          title="Edit Work Experience"
          isEdit
        />
      ) : (
        <DesktopFormDialog
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          title="Edit Work Experience"
          isEdit
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Work History</h3>
          <p className="text-sm text-foreground/70">
            {workHistory.length} position{workHistory.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        <Button
          onClick={() => setIsAddSheetOpen(true)}
          className="h-12 px-4 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.97]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {/* Timeline */}
      {workHistory.length > 0 ? (
        <div className="relative pl-6">
          {/* Timeline line */}
          <div className="absolute left-2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-elec-yellow via-white/20 to-transparent" />

          <AnimatePresence mode="popLayout">
            {workHistory.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                className="relative mb-4 last:mb-0"
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-[-14px] w-5 h-5 rounded-full border-2 transition-all z-10 flex items-center justify-center",
                    exp.isCurrent
                      ? "bg-elec-yellow border-elec-yellow shadow-lg shadow-elec-yellow/40"
                      : "bg-background border-white/30"
                  )}
                  style={{ top: "1.75rem" }}
                >
                  {exp.isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-elec-dark" />
                  )}
                </div>

                {/* Enhanced Card */}
                <div
                  className={cn(
                    "ml-3 rounded-2xl border overflow-hidden transition-all",
                    exp.isCurrent
                      ? "bg-gradient-to-br from-elec-yellow/10 to-amber-600/5 border-elec-yellow/20 shadow-lg shadow-elec-yellow/10"
                      : "bg-white/[0.03] border-white/[0.08]"
                  )}
                >
                  {/* Current Position Banner */}
                  {exp.isCurrent && (
                    <div className="px-4 py-2 bg-elec-yellow/20 border-b border-elec-yellow/30 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-elec-yellow" />
                        <span className="text-xs font-semibold text-elec-yellow">Current Position</span>
                      </div>
                      <Badge className="bg-elec-yellow/30 text-elec-yellow border-elec-yellow/40 text-xs">
                        Active
                      </Badge>
                    </div>
                  )}

                  {/* Verified Banner */}
                  {exp.verifiedByEmployer && !exp.isCurrent && (
                    <div className="px-4 py-2 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-400">Verified by Employer</span>
                    </div>
                  )}

                  {/* Main Content - Tappable */}
                  <button
                    onClick={() => openEditSheet(exp)}
                    className="w-full text-left p-4 touch-manipulation hover:bg-white/[0.02] active:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex gap-4">
                      {/* Large Duration Badge */}
                      <div className={cn(
                        "flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center",
                        exp.isCurrent
                          ? "bg-elec-yellow/20 border border-elec-yellow/30"
                          : "bg-white/[0.06] border border-white/[0.08]"
                      )}>
                        <Clock className={cn(
                          "h-5 w-5 mb-0.5",
                          exp.isCurrent ? "text-elec-yellow" : "text-foreground/60"
                        )} />
                        <span className={cn(
                          "text-sm font-bold",
                          exp.isCurrent ? "text-elec-yellow" : "text-foreground"
                        )}>
                          {calculateDuration(exp.startDate, exp.isCurrent ? undefined : exp.endDate)}
                        </span>
                      </div>

                      {/* Job Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="font-semibold text-foreground text-base">
                              {getJobTitleLabel(exp.jobTitle)}
                            </h4>
                            <p className="text-sm text-foreground/70 mt-0.5 flex items-center gap-1.5">
                              <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
                              {exp.employerName}
                            </p>
                          </div>
                          <Edit3 className="w-4 h-4 text-foreground/40 flex-shrink-0 mt-1" />
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3 text-xs">
                          <div className="flex items-center gap-1.5 text-foreground/60">
                            <Calendar className="h-3.5 w-3.5 text-foreground/40" />
                            <span>{formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}</span>
                          </div>
                          {exp.location && (
                            <div className="flex items-center gap-1.5 text-foreground/60">
                              <MapPin className="h-3.5 w-3.5 text-foreground/40" />
                              <span>{exp.location}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        {exp.description && (
                          <p className="text-sm text-foreground/50 mt-3 line-clamp-2 leading-relaxed">
                            {exp.description}
                          </p>
                        )}

                        {/* Status Badges */}
                        <div className="flex items-center gap-2 flex-wrap mt-3">
                          {exp.verifiedByEmployer && (
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          {!exp.verifiedByEmployer && (
                            <Badge variant="outline" className="bg-white/[0.03] text-foreground/50 border-white/[0.1] text-xs">
                              <User className="h-3 w-3 mr-1" />
                              Self-Reported
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Action Footer */}
                  <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                    <button
                      onClick={() => openEditSheet(exp)}
                      className="flex items-center gap-1.5 text-xs text-foreground/60 hover:text-foreground transition-colors touch-manipulation"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Edit Details
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg touch-manipulation text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm({ open: true, id: exp.id });
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8"
        >
          <div className="rounded-2xl border border-dashed border-white/[0.15] bg-gradient-to-br from-white/[0.02] to-transparent p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-600/10 flex items-center justify-center">
              <Briefcase className="h-10 w-10 text-elec-yellow" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Build Your Career Timeline</h4>
            <p className="text-foreground/60 max-w-sm mx-auto mb-6 leading-relaxed">
              Add your work experience to create a professional timeline that employers can verify.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 mb-6 text-center">
              <div className="p-3 rounded-xl bg-white/[0.03]">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 mx-auto mb-1.5" />
                <p className="text-xs text-foreground/60">Employer Verified</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03]">
                <Clock className="h-5 w-5 text-blue-400 mx-auto mb-1.5" />
                <p className="text-xs text-foreground/60">Track Duration</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03]">
                <TrendingUp className="h-5 w-5 text-purple-400 mx-auto mb-1.5" />
                <p className="text-xs text-foreground/60">Show Progress</p>
              </div>
            </div>

            <Button
              onClick={() => setIsAddSheetOpen(true)}
              className="h-12 px-6 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.97]"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Position
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ElecIdExperience;
