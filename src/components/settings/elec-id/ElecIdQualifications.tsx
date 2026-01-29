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
  ClipboardCheck,
  BookOpen,
  CreditCard,
  Shield,
  Zap,
  Bell,
  Network,
  Factory,
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

  // Get icon for category
  const getCategoryIcon = (categoryKey: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      core: GraduationCap,
      testing: ClipboardCheck,
      regulations: BookOpen,
      cards: CreditCard,
      specialist: Shield,
      renewable: Zap,
      fire_security: Bell,
      data_comms: Network,
      industrial: Factory,
    };
    return iconMap[categoryKey] || GraduationCap;
  };

  // Get color for category
  const getCategoryColor = (categoryKey: string) => {
    const colorMap: Record<string, { bg: string; text: string; border: string }> = {
      core: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
      testing: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      regulations: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
      cards: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      specialist: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
      renewable: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
      fire_security: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
      data_comms: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
      industrial: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' },
    };
    return colorMap[categoryKey] || colorMap.core;
  };

  // Form content - shared between sheet and dialog
  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-5">
      {/* Category Selection - Enhanced UI */}
      <div className="space-y-3">
        <Label className="text-foreground text-sm font-medium flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
          Category
        </Label>
        {isEdit ? (
          <div className="h-12 bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 flex items-center">
            <span className="text-foreground/70">{UK_QUALIFICATIONS[selectedCategory]?.label || selectedCategory}</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {Object.entries(UK_QUALIFICATIONS).map(([key, cat]) => {
              const IconComponent = getCategoryIcon(key);
              const colors = getCategoryColor(key);
              const isSelected = selectedCategory === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(key);
                    setSelectedQual(""); // Reset qualification when category changes
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl border transition-all touch-manipulation active:scale-[0.97]",
                    isSelected
                      ? `${colors.bg} ${colors.border} border-2`
                      : "bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.08]"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    isSelected ? colors.bg : "bg-white/[0.06]"
                  )}>
                    <IconComponent className={cn("h-5 w-5", isSelected ? colors.text : "text-foreground/60")} />
                  </div>
                  <span className={cn(
                    "text-xs font-medium text-center leading-tight",
                    isSelected ? "text-foreground" : "text-foreground/70"
                  )}>
                    {cat.label.replace('Health & Safety', 'H&S').replace('Data & Communications', 'Data/Comms').replace('Fire & Security', 'Fire/Security').replace('Industrial & Controls', 'Industrial')}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Qualification Selection - Enhanced scrollable list */}
      {selectedCategory && (
        <div className="space-y-3">
          <Label className="text-foreground text-sm font-medium flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
            Qualification
            <Badge variant="secondary" className="ml-auto text-[10px] bg-white/10">
              {getCategoryQualifications(selectedCategory).length} options
            </Badge>
          </Label>
          {isEdit ? (
            <div className="h-12 bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 flex items-center">
              <span className="text-foreground/70">{getQualificationLabel(selectedQual)}</span>
            </div>
          ) : (
            <div
              className="max-h-[200px] overflow-y-auto rounded-xl border border-white/[0.1] bg-white/[0.02] overscroll-contain"
              style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
            >
              <div className="divide-y divide-white/[0.06]">
                {getCategoryQualifications(selectedCategory).map((qual) => {
                  const isSelected = selectedQual === qual.value;
                  const colors = getCategoryColor(selectedCategory);
                  return (
                    <button
                      key={qual.value}
                      type="button"
                      onClick={() => setSelectedQual(qual.value)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3.5 text-left transition-all touch-manipulation",
                        isSelected
                          ? `${colors.bg}`
                          : "hover:bg-white/[0.04] active:bg-white/[0.08]"
                      )}
                    >
                      <div className={cn(
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                        isSelected
                          ? `${colors.border} ${colors.bg}`
                          : "border-white/20"
                      )}>
                        {isSelected && (
                          <div className={cn("w-2.5 h-2.5 rounded-full", colors.text.replace('text-', 'bg-'))} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={cn(
                          "text-sm font-medium block truncate",
                          isSelected ? "text-foreground" : "text-foreground/80"
                        )}>
                          {qual.label}
                        </span>
                        <span className="text-xs text-foreground/50">
                          {qual.awarding}
                          {qual.hasExpiry && ` • Expires every ${qual.expiryYears}y`}
                        </span>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className={cn("h-5 w-5 flex-shrink-0", colors.text)} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Awarding Body */}
      {(selectedQualInfo || isEdit) && (
        <div className="space-y-2">
          <Label className="text-foreground text-sm font-medium flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-foreground/60" />
            Awarding Body
          </Label>
          <Input
            value={formData.awardingBody || (selectedQualInfo?.awarding || "")}
            onChange={(e) =>
              setFormData({ ...formData, awardingBody: e.target.value })
            }
            className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base"
            placeholder="e.g., City & Guilds"
          />
        </div>
      )}

      {/* Date Fields in Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Date Achieved */}
        <div className="space-y-2">
          <Label className="text-foreground text-sm font-medium flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-foreground/60" />
            Date Achieved
          </Label>
          <Input
            type="date"
            value={formData.dateAchieved}
            onChange={(e) =>
              setFormData({ ...formData, dateAchieved: e.target.value })
            }
            className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base"
          />
        </div>

        {/* Expiry Date */}
        {(selectedQualInfo?.hasExpiry || formData.expiryDate || isEdit) && (
          <div className="space-y-2">
            <Label className="text-foreground text-sm font-medium flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-foreground/60" />
              Expiry Date
            </Label>
            <Input
              type="date"
              value={formData.expiryDate}
              onChange={(e) =>
                setFormData({ ...formData, expiryDate: e.target.value })
              }
              className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base"
            />
          </div>
        )}
      </div>

      {/* Expiry Info Badge */}
      {selectedQualInfo?.hasExpiry && selectedQualInfo?.expiryYears && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
          <span className="text-xs text-amber-400">
            This qualification requires renewal every {selectedQualInfo.expiryYears} year{selectedQualInfo.expiryYears > 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Certificate Number */}
      <div className="space-y-2">
        <Label className="text-foreground text-sm font-medium">
          Certificate Number
          <span className="text-foreground/50 ml-2 font-normal text-xs">(optional)</span>
        </Label>
        <Input
          value={formData.certificateNumber}
          onChange={(e) =>
            setFormData({ ...formData, certificateNumber: e.target.value })
          }
          placeholder="e.g., CG-2382-123456"
          className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base"
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
                <p className="text-sm text-foreground/70">Add a new credential to your profile</p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">
                {FormContent({})}
              </div>
              <div className="p-5 border-t border-white/[0.08] bg-background/95 backdrop-blur-sm">
                {FormFooter({ onClose: () => setIsAddSheetOpen(false) })}
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
            {FormContent({})}
            {FormFooter({ onClose: () => setIsAddSheetOpen(false) })}
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
                <p className="text-sm text-foreground/70">Update your credential details</p>
              </div>
              <div className="flex-1 overflow-y-auto px-5 pb-4">
                {FormContent({ isEdit: true })}
              </div>
              <div className="p-5 border-t border-white/[0.08] bg-background/95 backdrop-blur-sm">
                {FormFooter({ isEdit: true, onClose: () => setIsEditSheetOpen(false) })}
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
            {FormContent({ isEdit: true })}
            {FormFooter({ isEdit: true, onClose: () => setIsEditSheetOpen(false) })}
          </DialogContent>
        </Dialog>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Qualifications</h3>
          <p className="text-sm text-foreground/70">
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
                    {(() => {
                      const IconComponent = getCategoryIcon(catKey);
                      const colors = getCategoryColor(catKey);
                      return (
                        <div className={cn("p-1.5 rounded-lg", colors.bg)}>
                          <IconComponent className={cn("h-4 w-4", colors.text)} />
                        </div>
                      );
                    })()}
                    <span className="font-medium text-foreground text-sm">{category.label}</span>
                    <Badge variant="secondary" className="ml-auto text-[10px] bg-white/10">
                      {categoryQuals.length}
                    </Badge>
                  </div>
                </div>

                {/* Qualification Cards - Enhanced Design */}
                <div className="p-3 space-y-3">
                  {categoryQuals.map((qual, index) => {
                    const expiryStatus = qual.expiryDate
                      ? getExpiryStatus(qual.expiryDate)
                      : null;
                    const daysUntil = qual.expiryDate ? getDaysUntilExpiry(qual.expiryDate) : null;
                    const colors = getCategoryColor(catKey);
                    const IconComponent = getCategoryIcon(catKey);

                    // Determine card border color based on expiry
                    const cardBorderClass = expiryStatus?.status === "expired"
                      ? "border-red-500/40"
                      : expiryStatus?.status === "expiring"
                      ? "border-orange-500/40"
                      : "border-white/[0.08]";

                    return (
                      <motion.div
                        key={qual.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={cn(
                          "relative rounded-xl border bg-gradient-to-br from-white/[0.04] to-white/[0.01] overflow-hidden",
                          cardBorderClass
                        )}
                      >
                        {/* Expiry Warning Banner */}
                        {expiryStatus?.status === "expired" && (
                          <div className="px-4 py-2 bg-red-500/20 border-b border-red-500/30 flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <span className="text-xs font-medium text-red-400">
                              Expired - Renewal Required
                            </span>
                          </div>
                        )}
                        {expiryStatus?.status === "expiring" && daysUntil && daysUntil <= 30 && (
                          <div className="px-4 py-2 bg-orange-500/20 border-b border-orange-500/30 flex items-center gap-2">
                            <Clock className="h-4 w-4 text-orange-400" />
                            <span className="text-xs font-medium text-orange-400">
                              Expires in {daysUntil} day{daysUntil !== 1 ? 's' : ''} - Renew soon
                            </span>
                          </div>
                        )}

                        <button
                          onClick={() => openEditSheet(qual)}
                          className="w-full p-4 text-left hover:bg-white/[0.02] active:bg-white/[0.04] transition-all touch-manipulation"
                        >
                          <div className="flex gap-4">
                            {/* Icon */}
                            <div className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                              colors.bg
                            )}>
                              <IconComponent className={cn("h-6 w-6", colors.text)} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              {/* Title Row */}
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div className="min-w-0">
                                  <h4 className="font-semibold text-foreground text-[15px] leading-tight">
                                    {getQualificationLabel(qual.qualificationValue)}
                                  </h4>
                                  <p className="text-xs text-foreground/60 mt-0.5">
                                    {qual.awardingBody || "Unknown awarding body"}
                                  </p>
                                </div>
                                {qual.isVerified && (
                                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px] flex-shrink-0">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Verified
                                  </Badge>
                                )}
                              </div>

                              {/* Info Grid */}
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                                {/* Date Achieved */}
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-md bg-white/[0.06] flex items-center justify-center">
                                    <Calendar className="h-3.5 w-3.5 text-foreground/50" />
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-foreground/50 uppercase tracking-wide">Achieved</p>
                                    <p className="text-xs font-medium text-foreground/80">
                                      {qual.dateAchieved
                                        ? new Date(qual.dateAchieved).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                                        : "Not set"}
                                    </p>
                                  </div>
                                </div>

                                {/* Expiry Date */}
                                <div className="flex items-center gap-2">
                                  <div className={cn(
                                    "w-6 h-6 rounded-md flex items-center justify-center",
                                    expiryStatus?.status === "expired" ? "bg-red-500/20" :
                                    expiryStatus?.status === "expiring" ? "bg-orange-500/20" :
                                    qual.expiryDate ? "bg-green-500/20" : "bg-white/[0.06]"
                                  )}>
                                    <Clock className={cn(
                                      "h-3.5 w-3.5",
                                      expiryStatus?.status === "expired" ? "text-red-400" :
                                      expiryStatus?.status === "expiring" ? "text-orange-400" :
                                      qual.expiryDate ? "text-green-400" : "text-foreground/50"
                                    )} />
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-foreground/50 uppercase tracking-wide">Expires</p>
                                    <p className={cn(
                                      "text-xs font-medium",
                                      expiryStatus?.status === "expired" ? "text-red-400" :
                                      expiryStatus?.status === "expiring" ? "text-orange-400" :
                                      qual.expiryDate ? "text-green-400" : "text-foreground/50"
                                    )}>
                                      {qual.expiryDate
                                        ? new Date(qual.expiryDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                                        : "No expiry"}
                                    </p>
                                  </div>
                                </div>

                                {/* Certificate Number */}
                                {qual.certificateNumber && (
                                  <div className="flex items-center gap-2 col-span-2">
                                    <div className="w-6 h-6 rounded-md bg-white/[0.06] flex items-center justify-center">
                                      <span className="text-[10px] font-bold text-foreground/50">#</span>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-foreground/50 uppercase tracking-wide">Certificate No.</p>
                                      <p className="text-xs font-mono font-medium text-foreground/80">
                                        {qual.certificateNumber}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Status Badge Row */}
                              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/[0.06]">
                                {expiryStatus ? (
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
                                    {expiryStatus.status === "expired" ? (
                                      <>
                                        <AlertCircle className="h-3 w-3 mr-1" />
                                        Expired
                                      </>
                                    ) : expiryStatus.status === "expiring" ? (
                                      <>
                                        <Clock className="h-3 w-3 mr-1" />
                                        {daysUntil} days remaining
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle2 className="h-3 w-3 mr-1" />
                                        Valid
                                      </>
                                    )}
                                  </Badge>
                                ) : (
                                  <Badge className="text-[10px] font-medium bg-blue-500/20 text-blue-400 border-blue-500/30">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Lifetime qualification
                                  </Badge>
                                )}

                                <div className="ml-auto flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 text-xs rounded-lg hover:bg-white/[0.08]"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditSheet(qual);
                                    }}
                                  >
                                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                                    Edit
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 rounded-lg hover:bg-red-500/10"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setDeleteConfirm({ open: true, id: qual.id });
                                    }}
                                    aria-label="Delete qualification"
                                  >
                                    <Trash2 className="h-3.5 w-3.5 text-red-400" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </motion.div>
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
          <p className="text-sm text-foreground/70 mb-6 max-w-xs mx-auto">
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
