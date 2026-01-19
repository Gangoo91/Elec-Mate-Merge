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
          location: undefined,
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
    <div className="space-y-5">
      {/* Employer Name */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Employer Name</Label>
        <Input
          value={formData.employerName}
          onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
          placeholder="e.g., Spark Electrical Ltd"
          className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base"
        />
      </div>

      {/* Job Title */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Job Title</Label>
        <Select
          value={formData.jobTitle}
          onValueChange={(value) => setFormData({ ...formData, jobTitle: value })}
        >
          <SelectTrigger className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation">
            <SelectValue placeholder="Select job title" />
          </SelectTrigger>
          <SelectContent className="bg-background border-white/[0.1] max-h-60 z-[200]">
            {Object.entries(jobTitlesByCategory).map(([category, titles]) => (
              <React.Fragment key={category}>
                <div className="px-3 py-2 text-xs font-semibold text-elec-yellow uppercase tracking-wide">
                  {category}
                </div>
                {titles.map((title) => (
                  <SelectItem
                    key={title.value}
                    value={title.value}
                    className="py-3 touch-manipulation"
                  >
                    {title.label}
                  </SelectItem>
                ))}
              </React.Fragment>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Location <span className="text-foreground/70 font-normal">(optional)</span>
        </Label>
        <Input
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g., London"
          className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base"
        />
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Start Date</Label>
          <Input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">End Date</Label>
          <Input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            disabled={isCurrent}
            className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation disabled:opacity-40"
          />
        </div>
      </div>

      {/* Current Position */}
      <button
        type="button"
        onClick={() => setIsCurrent(!isCurrent)}
        className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] touch-manipulation active:bg-white/[0.08] transition-colors"
      >
        <Checkbox
          id="current"
          checked={isCurrent}
          onCheckedChange={(checked) => setIsCurrent(checked as boolean)}
          className="h-5 w-5 border-white/30 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow"
        />
        <Label htmlFor="current" className="text-foreground cursor-pointer flex-1 text-left">
          I currently work here
        </Label>
      </button>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Description <span className="text-foreground/70 font-normal">(optional)</span>
        </Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your responsibilities and achievements..."
          className="bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base min-h-[100px] resize-none"
        />
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
                    "absolute left-[-14px] w-4 h-4 rounded-full border-2 transition-all z-10",
                    exp.isCurrent
                      ? "bg-elec-yellow border-elec-yellow shadow-lg shadow-elec-yellow/40"
                      : "bg-background border-white/30"
                  )}
                  style={{ top: "1.5rem" }}
                />

                {/* Card - tappable on mobile */}
                <button
                  onClick={() => openEditSheet(exp)}
                  className={cn(
                    "w-full text-left ml-2 p-4 rounded-2xl border transition-all touch-manipulation",
                    exp.isCurrent
                      ? "bg-gradient-to-br from-elec-yellow/10 to-amber-600/5 border-elec-yellow/20 shadow-lg shadow-elec-yellow/10"
                      : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] active:bg-white/[0.08] active:scale-[0.99]"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Company icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                      exp.isCurrent
                        ? "bg-elec-yellow/20"
                        : "bg-white/[0.06]"
                    )}>
                      <Building2 className={cn(
                        "w-6 h-6",
                        exp.isCurrent ? "text-elec-yellow" : "text-foreground/70"
                      )} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-semibold text-foreground truncate">
                            {getJobTitleLabel(exp.jobTitle)}
                          </h4>
                          <p className="text-sm text-foreground/70 truncate">
                            {exp.employerName}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-foreground/70 flex-shrink-0 mt-0.5" />
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 flex-wrap mt-2">
                        {exp.isCurrent && (
                          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                            Current
                          </Badge>
                        )}
                        {exp.verifiedByEmployer && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      {/* Meta info */}
                      <div className="flex items-center gap-3 mt-2 text-xs text-foreground/70">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                        </span>
                        <span className={cn(
                          "flex items-center gap-1 font-medium",
                          exp.isCurrent ? "text-elec-yellow" : "text-foreground/60"
                        )}>
                          <Clock className="h-3.5 w-3.5" />
                          {calculateDuration(exp.startDate, exp.isCurrent ? undefined : exp.endDate)}
                        </span>
                      </div>

                      {/* Location */}
                      {exp.location && (
                        <p className="text-xs text-foreground/70 mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </p>
                      )}

                      {/* Description preview */}
                      {exp.description && (
                        <p className="text-sm text-foreground/60 mt-2 line-clamp-2">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Delete button - positioned bottom right */}
                  <div className="flex justify-end mt-3 pt-3 border-t border-white/[0.04]">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 px-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg touch-manipulation"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm({ open: true, id: exp.id });
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-1.5" />
                      Delete
                    </Button>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/[0.04] flex items-center justify-center">
            <Briefcase className="h-10 w-10 text-foreground/70/50" />
          </div>
          <h4 className="text-lg font-medium text-foreground mb-2">No work history yet</h4>
          <p className="text-foreground/70 max-w-xs mx-auto mb-6">
            Add your work experience to build your professional timeline.
          </p>
          <Button
            onClick={() => setIsAddSheetOpen(true)}
            className="h-12 px-6 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.97]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Position
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ElecIdExperience;
