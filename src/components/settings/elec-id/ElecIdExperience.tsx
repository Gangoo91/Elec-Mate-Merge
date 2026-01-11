import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { cn } from "@/lib/utils";
import {
  Plus,
  Briefcase,
  Calendar,
  Building2,
  MapPin,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  Loader2,
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

const ElecIdExperience = () => {
  const { addNotification } = useNotifications();
  const { profile } = useElecIdProfile();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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

  // Real work history from database
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
        // Map database schema to UI schema
        const mapped = data.map((w: ElecIdWorkHistory) => ({
          id: w.id,
          employerName: w.employer_name,
          jobTitle: w.job_title,
          location: undefined, // Not in current schema
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
      setIsAddDialogOpen(false);
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

      setIsEditDialogOpen(false);
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

  const openEditDialog = (exp: WorkExperience) => {
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
    setIsEditDialogOpen(true);
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
    if (years === 0) return `${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`;
    if (remainingMonths === 0) return `${years} year${years !== 1 ? "s" : ""}`;
    return `${years} yr${years !== 1 ? "s" : ""} ${remainingMonths} mo`;
  };

  // Group job titles by category
  const jobTitlesByCategory = UK_JOB_TITLES.reduce((acc, title) => {
    if (!acc[title.category]) acc[title.category] = [];
    acc[title.category].push(title);
    return acc;
  }, {} as Record<string, typeof UK_JOB_TITLES>);

  const ExperienceForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4 pt-4">
      {/* Employer Name */}
      <div className="space-y-2">
        <Label className="text-foreground">Employer Name</Label>
        <Input
          value={formData.employerName}
          onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
          placeholder="e.g., Spark Electrical Ltd"
          className="bg-white/5 border-white/20"
        />
      </div>

      {/* Job Title */}
      <div className="space-y-2">
        <Label className="text-foreground">Job Title</Label>
        <Select
          value={formData.jobTitle}
          onValueChange={(value) => setFormData({ ...formData, jobTitle: value })}
        >
          <SelectTrigger className="bg-white/5 border-white/20">
            <SelectValue placeholder="Select job title" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/20 max-h-60">
            {Object.entries(jobTitlesByCategory).map(([category, titles]) => (
              <React.Fragment key={category}>
                <div className="px-2 py-1.5 text-xs font-semibold text-elec-yellow">
                  {category}
                </div>
                {titles.map((title) => (
                  <SelectItem key={title.value} value={title.value}>
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
        <Label className="text-foreground">
          Location
          <span className="text-muted-foreground ml-2">(optional)</span>
        </Label>
        <Input
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="e.g., London"
          className="bg-white/5 border-white/20"
        />
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-foreground">Start Date</Label>
          <Input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="bg-white/5 border-white/20"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-foreground">End Date</Label>
          <Input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            disabled={isCurrent}
            className="bg-white/5 border-white/20"
          />
        </div>
      </div>

      {/* Current Position */}
      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
        <Checkbox
          id="current"
          checked={isCurrent}
          onCheckedChange={(checked) => setIsCurrent(checked as boolean)}
        />
        <Label htmlFor="current" className="text-foreground cursor-pointer flex-1">
          I currently work here
        </Label>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label className="text-foreground">
          Description
          <span className="text-muted-foreground ml-2">(optional)</span>
        </Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your responsibilities and achievements..."
          className="bg-white/5 border-white/20 min-h-[80px]"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          className="flex-1 border-white/20"
          onClick={() => {
            isEdit ? setIsEditDialogOpen(false) : setIsAddDialogOpen(false);
            resetForm();
          }}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
          onClick={isEdit ? handleEditExperience : handleAddExperience}
          disabled={
            !formData.employerName || !formData.jobTitle || !formData.startDate || isLoading
          }
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
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete Work Experience?"
        description="This will permanently remove this position from your Elec-ID profile. This action cannot be undone."
        onConfirm={handleDeleteExperience}
        isLoading={isLoading}
      />

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-elec-gray border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit Work Experience</DialogTitle>
          </DialogHeader>
          <ExperienceForm isEdit />
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Work History</h3>
          <p className="text-sm text-muted-foreground">
            {workHistory.length} position{workHistory.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-elec-gray border-white/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add Work Experience</DialogTitle>
            </DialogHeader>
            <ExperienceForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        {workHistory.length > 0 && (
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
        )}

        <div className="space-y-6">
          {workHistory.map((exp, index) => (
            <div
              key={exp.id}
              className={cn(
                "relative pl-10",
                "animate-in fade-in slide-in-from-left-2"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute left-2.5 w-3 h-3 rounded-full border-2 transition-all",
                  exp.isCurrent
                    ? "bg-elec-yellow border-elec-yellow shadow-lg shadow-elec-yellow/30"
                    : "bg-elec-gray border-white/30"
                )}
                style={{ top: "1.25rem" }}
              />

              <Card className="bg-elec-gray/50 border-white/10 hover:border-white/20 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-foreground">
                          {getJobTitleLabel(exp.jobTitle)}
                        </h4>
                        {exp.isCurrent && (
                          <Badge className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                            Current
                          </Badge>
                        )}
                        {exp.verifiedByEmployer && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <span className="flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          {exp.employerName}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                        </span>
                        <span className="flex items-center gap-1 text-elec-yellow font-medium">
                          <Clock className="h-4 w-4" />
                          {calculateDuration(exp.startDate, exp.isCurrent ? undefined : exp.endDate)}
                        </span>
                      </div>

                      {exp.description && (
                        <p className="text-sm text-foreground/70 mt-2 line-clamp-2">{exp.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-white/10"
                        onClick={() => openEditDialog(exp)}
                        aria-label="Edit experience"
                      >
                        <Edit2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-red-500/10"
                        onClick={() => setDeleteConfirm({ open: true, id: exp.id })}
                        aria-label="Delete experience"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {workHistory.length === 0 && (
        <Card className="bg-elec-gray/50 border-white/10">
          <CardContent className="py-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No work history yet</h4>
            <p className="text-muted-foreground mb-4">
              Add your work experience to build your professional timeline.
            </p>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Position
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ElecIdExperience;
