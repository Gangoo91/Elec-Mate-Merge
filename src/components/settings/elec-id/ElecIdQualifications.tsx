import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Drawer } from "vaul";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Plus,
  GraduationCap,
  Calendar,
  Building2,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  Loader2,
  Camera,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { UK_QUALIFICATIONS, getQualificationLabel } from "@/data/uk-electrician-constants";
import { getExpiryStatus, getDaysUntilExpiry } from "@/utils/elecIdGenerator";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  getQualificationsByProfileId,
  addElecIdQualification,
  updateElecIdQualification,
  deleteElecIdQualification,
  ElecIdQualification,
} from "@/services/elecIdService";

interface Qualification {
  id: string;
  qualificationValue: string;
  category: string;
  awardingBody: string;
  dateAchieved: string;
  expiryDate?: string;
  certificateNumber?: string;
  isVerified: boolean;
}

// Skeleton loader for qualifications
const QualificationSkeleton = () => (
  <div className="space-y-4">
    <div className="bg-white/[0.04] rounded-2xl border border-white/[0.06] overflow-hidden">
      <div className="p-4 border-b border-white/[0.06]">
        <Skeleton className="h-5 w-32 bg-white/10" />
      </div>
      <div className="p-4 space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="p-4 rounded-xl bg-white/[0.04]">
            <Skeleton className="h-5 w-48 mb-2 bg-white/10" />
            <Skeleton className="h-4 w-32 mb-1 bg-white/10" />
            <Skeleton className="h-3 w-24 bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ElecIdQualifications = () => {
  const { addNotification } = useNotifications();
  const { profile } = useElecIdProfile();
  const isMobile = useIsMobile();

  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingQual, setEditingQual] = useState<Qualification | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedQual, setSelectedQual] = useState<string>("");
  const [formData, setFormData] = useState({
    awardingBody: "",
    dateAchieved: "",
    expiryDate: "",
    certificateNumber: "",
  });

  const [qualifications, setQualifications] = useState<Qualification[]>([]);

  // Fetch qualifications from database
  useEffect(() => {
    const fetchQualifications = async () => {
      if (!profile?.id) {
        setIsFetching(false);
        return;
      }

      try {
        const data = await getQualificationsByProfileId(profile.id);
        const mapped = data.map((q: ElecIdQualification) => ({
          id: q.id,
          qualificationValue: q.qualification_name,
          category: q.category || q.qualification_type || 'core',
          awardingBody: q.awarding_body || '',
          dateAchieved: q.date_achieved || '',
          expiryDate: q.expiry_date || undefined,
          certificateNumber: q.certificate_number || undefined,
          isVerified: q.is_verified,
        }));
        setQualifications(mapped);
      } catch (error) {
        console.error('Error fetching qualifications:', error);
        addNotification({
          title: "Error",
          message: "Failed to load qualifications",
          type: "error",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchQualifications();
  }, [profile?.id]);

  const handleAddQualification = async () => {
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
      const newDbQual = await addElecIdQualification({
        profile_id: profile.id,
        qualification_name: selectedQual,
        qualification_type: selectedCategory,
        category: selectedCategory,
        awarding_body: formData.awardingBody || null,
        date_achieved: formData.dateAchieved || null,
        expiry_date: formData.expiryDate || null,
        certificate_number: formData.certificateNumber || null,
        is_verified: false,
      });

      const newQual: Qualification = {
        id: newDbQual.id,
        qualificationValue: selectedQual,
        category: selectedCategory,
        awardingBody: formData.awardingBody,
        dateAchieved: formData.dateAchieved,
        expiryDate: formData.expiryDate || undefined,
        certificateNumber: formData.certificateNumber || undefined,
        isVerified: false,
      };

      setQualifications((prev) => [...prev, newQual]);
      setIsAddSheetOpen(false);
      resetForm();

      addNotification({
        title: "Qualification Added",
        message: `${getQualificationLabel(selectedQual)} has been added to your profile.`,
        type: "success",
      });
    } catch (error) {
      console.error('Error adding qualification:', error);
      addNotification({
        title: "Error",
        message: "Failed to add qualification. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditQualification = async () => {
    if (!editingQual) return;
    setIsLoading(true);

    try {
      await updateElecIdQualification(editingQual.id, {
        awarding_body: formData.awardingBody || null,
        date_achieved: formData.dateAchieved || null,
        expiry_date: formData.expiryDate || null,
        certificate_number: formData.certificateNumber || null,
      });

      setQualifications((prev) =>
        prev.map((q) =>
          q.id === editingQual.id
            ? {
                ...q,
                awardingBody: formData.awardingBody,
                dateAchieved: formData.dateAchieved,
                expiryDate: formData.expiryDate || undefined,
                certificateNumber: formData.certificateNumber || undefined,
              }
            : q
        )
      );

      setIsEditSheetOpen(false);
      setEditingQual(null);
      resetForm();

      addNotification({
        title: "Qualification Updated",
        message: "Your qualification details have been updated.",
        type: "success",
      });
    } catch (error) {
      console.error('Error updating qualification:', error);
      addNotification({
        title: "Error",
        message: "Failed to update qualification. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQualification = async () => {
    if (!deleteConfirm.id) return;
    setIsLoading(true);

    try {
      await deleteElecIdQualification(deleteConfirm.id);

      const deletedQual = qualifications.find((q) => q.id === deleteConfirm.id);
      setQualifications((prev) => prev.filter((q) => q.id !== deleteConfirm.id));
      setDeleteConfirm({ open: false, id: null });

      addNotification({
        title: "Qualification Removed",
        message: deletedQual
          ? `${getQualificationLabel(deletedQual.qualificationValue)} has been removed.`
          : "Qualification has been removed.",
        type: "info",
      });
    } catch (error) {
      console.error('Error deleting qualification:', error);
      addNotification({
        title: "Error",
        message: "Failed to delete qualification. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditSheet = (qual: Qualification) => {
    setEditingQual(qual);
    setSelectedCategory(qual.category);
    setSelectedQual(qual.qualificationValue);
    setFormData({
      awardingBody: qual.awardingBody,
      dateAchieved: qual.dateAchieved,
      expiryDate: qual.expiryDate || "",
      certificateNumber: qual.certificateNumber || "",
    });
    setIsEditSheetOpen(true);
  };

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedQual("");
    setFormData({
      awardingBody: "",
      dateAchieved: "",
      expiryDate: "",
      certificateNumber: "",
    });
  };

  const getCategoryQualifications = (categoryKey: string) => {
    return UK_QUALIFICATIONS[categoryKey]?.items || [];
  };

  const getSelectedQualInfo = () => {
    if (!selectedCategory || !selectedQual) return null;
    const items = getCategoryQualifications(selectedCategory);
    return items.find((q) => q.value === selectedQual);
  };

  const selectedQualInfo = getSelectedQualInfo();

  // Form content - shared between sheet and dialog
  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-5">
      {/* Category Selection */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm font-medium">Category</Label>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          disabled={isEdit}
        >
          <SelectTrigger className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/20 max-h-60">
            {Object.entries(UK_QUALIFICATIONS).map(([key, cat]) => (
              <SelectItem key={key} value={key}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Qualification Selection */}
      {selectedCategory && (
        <div className="space-y-2">
          <Label className="text-foreground text-sm font-medium">Qualification</Label>
          <Select
            value={selectedQual}
            onValueChange={setSelectedQual}
            disabled={isEdit}
          >
            <SelectTrigger className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation">
              <SelectValue placeholder="Select qualification" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/20 max-h-60">
              {getCategoryQualifications(selectedCategory).map((qual) => (
                <SelectItem key={qual.value} value={qual.value}>
                  {qual.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Awarding Body */}
      {(selectedQualInfo || isEdit) && (
        <div className="space-y-2">
          <Label className="text-foreground text-sm font-medium">Awarding Body</Label>
          <Input
            value={formData.awardingBody || (selectedQualInfo?.awarding || "")}
            onChange={(e) =>
              setFormData({ ...formData, awardingBody: e.target.value })
            }
            className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation"
            placeholder="e.g., City & Guilds"
          />
        </div>
      )}

      {/* Date Achieved */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm font-medium">Date Achieved</Label>
        <Input
          type="date"
          value={formData.dateAchieved}
          onChange={(e) =>
            setFormData({ ...formData, dateAchieved: e.target.value })
          }
          className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation"
        />
      </div>

      {/* Expiry Date */}
      {(selectedQualInfo?.hasExpiry || formData.expiryDate || isEdit) && (
        <div className="space-y-2">
          <Label className="text-foreground text-sm font-medium">
            Expiry Date
            {selectedQualInfo?.expiryYears && (
              <span className="text-muted-foreground ml-2 font-normal">
                (renews every {selectedQualInfo.expiryYears} years)
              </span>
            )}
          </Label>
          <Input
            type="date"
            value={formData.expiryDate}
            onChange={(e) =>
              setFormData({ ...formData, expiryDate: e.target.value })
            }
            className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation"
          />
        </div>
      )}

      {/* Certificate Number */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm font-medium">
          Certificate Number
          <span className="text-muted-foreground ml-2 font-normal">(optional)</span>
        </Label>
        <Input
          value={formData.certificateNumber}
          onChange={(e) =>
            setFormData({ ...formData, certificateNumber: e.target.value })
          }
          placeholder="e.g., CG-2382-123456"
          className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation"
        />
      </div>
    </div>
  );

  // Form footer with buttons
  const FormFooter = ({ isEdit = false, onClose }: { isEdit?: boolean; onClose: () => void }) => (
    <div className="flex gap-3 pt-2">
      <Button
        variant="outline"
        className="flex-1 h-12 rounded-xl border-white/[0.1] touch-manipulation active:scale-[0.98]"
        onClick={() => {
          onClose();
          resetForm();
        }}
        disabled={isLoading}
      >
        Cancel
      </Button>
      <Button
        className="flex-1 h-12 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.98]"
        onClick={isEdit ? handleEditQualification : handleAddQualification}
        disabled={
          (!isEdit && (!selectedCategory || !selectedQual || !formData.dateAchieved)) ||
          isLoading
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
          "Add Qualification"
        )}
      </Button>
    </div>
  );

  // Loading state
  if (isFetching) {
    return <QualificationSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete Qualification?"
        description="This will permanently remove this qualification from your Elec-ID profile. This action cannot be undone."
        onConfirm={handleDeleteQualification}
        isLoading={isLoading}
      />

      {/* Mobile Bottom Sheet for Add */}
      {isMobile ? (
        <Drawer.Root open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[90vh] bg-background rounded-t-[20px] border-t border-white/[0.08]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>
              <div className="px-5 pb-2">
                <h3 className="text-lg font-bold text-foreground">Add Qualification</h3>
                <p className="text-sm text-muted-foreground">Add a new credential to your profile</p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">
                <FormContent />
              </div>
              <div className="p-5 border-t border-white/[0.08] bg-background/95 backdrop-blur-sm">
                <FormFooter onClose={() => setIsAddSheetOpen(false)} />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isAddSheetOpen} onOpenChange={setIsAddSheetOpen}>
          <DialogContent className="bg-elec-gray border-white/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add Qualification</DialogTitle>
            </DialogHeader>
            <FormContent />
            <FormFooter onClose={() => setIsAddSheetOpen(false)} />
          </DialogContent>
        </Dialog>
      )}

      {/* Mobile Bottom Sheet for Edit */}
      {isMobile ? (
        <Drawer.Root open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
            <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 flex flex-col max-h-[90vh] bg-background rounded-t-[20px] border-t border-white/[0.08]">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>
              <div className="px-5 pb-2">
                <h3 className="text-lg font-bold text-foreground">Edit Qualification</h3>
                <p className="text-sm text-muted-foreground">Update your credential details</p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">
                <FormContent isEdit />
              </div>
              <div className="p-5 border-t border-white/[0.08] bg-background/95 backdrop-blur-sm">
                <FormFooter isEdit onClose={() => setIsEditSheetOpen(false)} />
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
          <DialogContent className="bg-elec-gray border-white/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Edit Qualification</DialogTitle>
            </DialogHeader>
            <FormContent isEdit />
            <FormFooter isEdit onClose={() => setIsEditSheetOpen(false)} />
          </DialogContent>
        </Dialog>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Qualifications</h3>
          <p className="text-sm text-muted-foreground">
            {qualifications.length} credential{qualifications.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        <Button
          className="h-11 px-4 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold rounded-xl touch-manipulation active:scale-[0.97]"
          onClick={() => setIsAddSheetOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>

      {/* Qualifications List */}
      {qualifications.length > 0 ? (
        <div className="space-y-4">
          {Object.entries(UK_QUALIFICATIONS).map(([catKey, category]) => {
            const categoryQuals = qualifications.filter((q) => q.category === catKey);
            if (categoryQuals.length === 0) return null;

            return (
              <motion.div
                key={catKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/[0.04] rounded-2xl border border-white/[0.06] overflow-hidden"
              >
                {/* Category Header */}
                <div className="px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-purple-500/20">
                      <GraduationCap className="h-4 w-4 text-purple-400" />
                    </div>
                    <span className="font-medium text-foreground text-sm">{category.label}</span>
                    <Badge variant="secondary" className="ml-auto text-[10px] bg-white/10">
                      {categoryQuals.length}
                    </Badge>
                  </div>
                </div>

                {/* Qualification Cards */}
                <div className="divide-y divide-white/[0.06]">
                  {categoryQuals.map((qual, index) => {
                    const expiryStatus = qual.expiryDate
                      ? getExpiryStatus(qual.expiryDate)
                      : null;
                    const daysUntil = qual.expiryDate ? getDaysUntilExpiry(qual.expiryDate) : null;

                    return (
                      <motion.button
                        key={qual.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => openEditSheet(qual)}
                        className="w-full p-4 text-left flex items-start gap-3 hover:bg-white/[0.04] active:bg-white/[0.08] active:scale-[0.99] transition-all touch-manipulation"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-foreground text-[15px]">
                              {getQualificationLabel(qual.qualificationValue)}
                            </span>
                            {qual.isVerified && (
                              <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                            )}
                          </div>

                          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {qual.awardingBody || "Unknown"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {qual.dateAchieved ? new Date(qual.dateAchieved).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "N/A"}
                            </span>
                          </div>

                          {expiryStatus && (
                            <Badge
                              className={cn(
                                "text-[10px] font-medium",
                                expiryStatus.status === "expired"
                                  ? "bg-red-500/20 text-red-400 border-red-500/30"
                                  : expiryStatus.status === "expiring"
                                  ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                                  : "bg-green-500/20 text-green-400 border-green-500/30"
                              )}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {expiryStatus.status === "expired"
                                ? "Expired"
                                : expiryStatus.status === "expiring"
                                ? `${daysUntil} days left`
                                : "Valid"}
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-xl hover:bg-red-500/10"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirm({ open: true, id: qual.id });
                            }}
                            aria-label="Delete qualification"
                          >
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </Button>
                          <ChevronRight className="h-5 w-5 text-white/20" />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-2xl border border-white/[0.08] p-8 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-purple-400" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">No qualifications yet</h4>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
            Add your electrical qualifications to build your verified professional profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="h-12 px-6 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold rounded-xl touch-manipulation active:scale-[0.97]"
              onClick={() => setIsAddSheetOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Qualification
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 border-white/[0.1] rounded-xl touch-manipulation active:scale-[0.97]"
            >
              <Camera className="h-4 w-4 mr-2" />
              Scan Certificate
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ElecIdQualifications;
