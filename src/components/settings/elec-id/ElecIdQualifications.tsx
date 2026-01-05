import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
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
} from "lucide-react";
import { UK_QUALIFICATIONS, getQualificationLabel } from "@/data/uk-electrician-constants";
import { getExpiryStatus, getDaysUntilExpiry } from "@/utils/elecIdGenerator";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

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

const ElecIdQualifications = () => {
  const { addNotification } = useNotifications();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingQual, setEditingQual] = useState<Qualification | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedQual, setSelectedQual] = useState<string>("");
  const [formData, setFormData] = useState({
    awardingBody: "",
    dateAchieved: "",
    expiryDate: "",
    certificateNumber: "",
  });

  // Mock qualifications - will be from database
  const [qualifications, setQualifications] = useState<Qualification[]>([
    {
      id: "1",
      qualificationValue: "nvq_level_3",
      category: "core",
      awardingBody: "City & Guilds",
      dateAchieved: "2020-06-15",
      isVerified: true,
    },
    {
      id: "2",
      qualificationValue: "18th_edition",
      category: "regulations",
      awardingBody: "City & Guilds",
      dateAchieved: "2023-03-20",
      expiryDate: "2028-03-20",
      certificateNumber: "CG-2382-123456",
      isVerified: true,
    },
    {
      id: "3",
      qualificationValue: "2391_52",
      category: "testing",
      awardingBody: "City & Guilds",
      dateAchieved: "2021-09-10",
      isVerified: true,
    },
    {
      id: "4",
      qualificationValue: "ev_charging",
      category: "renewable",
      awardingBody: "City & Guilds",
      dateAchieved: "2024-01-15",
      certificateNumber: "EV-2919-789012",
      isVerified: false,
    },
    {
      id: "5",
      qualificationValue: "first_aid",
      category: "specialist",
      awardingBody: "St John Ambulance",
      dateAchieved: "2023-06-01",
      expiryDate: "2026-06-01",
      isVerified: true,
    },
  ]);

  const handleAddQualification = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newQual: Qualification = {
      id: Date.now().toString(),
      qualificationValue: selectedQual,
      category: selectedCategory,
      awardingBody: formData.awardingBody,
      dateAchieved: formData.dateAchieved,
      expiryDate: formData.expiryDate || undefined,
      certificateNumber: formData.certificateNumber || undefined,
      isVerified: false,
    };

    setQualifications((prev) => [...prev, newQual]);
    setIsLoading(false);
    setIsAddDialogOpen(false);
    resetForm();

    addNotification({
      title: "Qualification Added",
      message: `${getQualificationLabel(selectedQual)} has been added to your profile.`,
      type: "success",
    });
  };

  const handleEditQualification = async () => {
    if (!editingQual) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

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

    setIsLoading(false);
    setIsEditDialogOpen(false);
    setEditingQual(null);
    resetForm();

    addNotification({
      title: "Qualification Updated",
      message: "Your qualification details have been updated.",
      type: "success",
    });
  };

  const handleDeleteQualification = async () => {
    if (!deleteConfirm.id) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const deletedQual = qualifications.find((q) => q.id === deleteConfirm.id);
    setQualifications((prev) => prev.filter((q) => q.id !== deleteConfirm.id));

    setIsLoading(false);
    setDeleteConfirm({ open: false, id: null });

    addNotification({
      title: "Qualification Removed",
      message: deletedQual
        ? `${getQualificationLabel(deletedQual.qualificationValue)} has been removed.`
        : "Qualification has been removed.",
      type: "info",
    });
  };

  const openEditDialog = (qual: Qualification) => {
    setEditingQual(qual);
    setSelectedCategory(qual.category);
    setSelectedQual(qual.qualificationValue);
    setFormData({
      awardingBody: qual.awardingBody,
      dateAchieved: qual.dateAchieved,
      expiryDate: qual.expiryDate || "",
      certificateNumber: qual.certificateNumber || "",
    });
    setIsEditDialogOpen(true);
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

  const QualificationForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-4 pt-4">
      {/* Category Selection */}
      <div className="space-y-2">
        <Label className="text-foreground">Category</Label>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          disabled={isEdit}
        >
          <SelectTrigger className="bg-white/5 border-white/20">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/20">
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
          <Label className="text-foreground">Qualification</Label>
          <Select
            value={selectedQual}
            onValueChange={setSelectedQual}
            disabled={isEdit}
          >
            <SelectTrigger className="bg-white/5 border-white/20">
              <SelectValue placeholder="Select qualification" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/20">
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
          <Label className="text-foreground">Awarding Body</Label>
          <Input
            value={formData.awardingBody || (selectedQualInfo?.awarding || "")}
            onChange={(e) =>
              setFormData({ ...formData, awardingBody: e.target.value })
            }
            className="bg-white/5 border-white/20"
          />
        </div>
      )}

      {/* Date Achieved */}
      <div className="space-y-2">
        <Label className="text-foreground">Date Achieved</Label>
        <Input
          type="date"
          value={formData.dateAchieved}
          onChange={(e) =>
            setFormData({ ...formData, dateAchieved: e.target.value })
          }
          className="bg-white/5 border-white/20"
        />
      </div>

      {/* Expiry Date */}
      {(selectedQualInfo?.hasExpiry || formData.expiryDate) && (
        <div className="space-y-2">
          <Label className="text-foreground">
            Expiry Date
            {selectedQualInfo?.expiryYears && (
              <span className="text-muted-foreground ml-2">
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
            className="bg-white/5 border-white/20"
          />
        </div>
      )}

      {/* Certificate Number */}
      <div className="space-y-2">
        <Label className="text-foreground">
          Certificate Number
          <span className="text-muted-foreground ml-2">(optional)</span>
        </Label>
        <Input
          value={formData.certificateNumber}
          onChange={(e) =>
            setFormData({ ...formData, certificateNumber: e.target.value })
          }
          placeholder="e.g., CG-2382-123456"
          className="bg-white/5 border-white/20"
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
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete Qualification?"
        description="This will permanently remove this qualification from your Elec-ID profile. This action cannot be undone."
        onConfirm={handleDeleteQualification}
        isLoading={isLoading}
      />

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-elec-gray border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit Qualification</DialogTitle>
          </DialogHeader>
          <QualificationForm isEdit />
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Your Qualifications</h3>
          <p className="text-sm text-muted-foreground">
            {qualifications.length} qualification{qualifications.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add Qualification
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-elec-gray border-white/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add Qualification</DialogTitle>
            </DialogHeader>
            <QualificationForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Qualifications List */}
      <div className="space-y-4">
        {Object.entries(UK_QUALIFICATIONS).map(([catKey, category]) => {
          const categoryQuals = qualifications.filter((q) => q.category === catKey);
          if (categoryQuals.length === 0) return null;

          return (
            <Card key={catKey} className="bg-elec-gray/50 border-white/10 overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground text-base flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-elec-yellow" />
                  {category.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryQuals.map((qual, index) => {
                  const expiryStatus = qual.expiryDate
                    ? getExpiryStatus(qual.expiryDate)
                    : null;

                  return (
                    <div
                      key={qual.id}
                      className={cn(
                        "flex items-start justify-between p-3 rounded-lg bg-white/5 border border-white/10",
                        "transition-all duration-200 hover:bg-white/10",
                        "animate-in fade-in slide-in-from-bottom-2"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground">
                            {getQualificationLabel(qual.qualificationValue)}
                          </span>
                          {qual.isVerified && (
                            <CheckCircle2 className="h-4 w-4 text-green-400 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {qual.awardingBody}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(qual.dateAchieved).toLocaleDateString("en-GB")}
                          </span>
                        </div>
                        {qual.certificateNumber && (
                          <p className="text-xs text-muted-foreground font-mono">
                            {qual.certificateNumber}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        {expiryStatus && (
                          <Badge
                            className={cn(
                              "text-xs",
                              expiryStatus.status === "expired"
                                ? "bg-red-500/20 text-red-400 border-red-500/30"
                                : expiryStatus.status === "expiring"
                                ? "bg-orange-500/20 text-orange-400 border-orange-500/30"
                                : "bg-green-500/20 text-green-400 border-green-500/30"
                            )}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            {expiryStatus.label}
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-white/10"
                          onClick={() => openEditDialog(qual)}
                          aria-label="Edit qualification"
                        >
                          <Edit2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-red-500/10"
                          onClick={() => setDeleteConfirm({ open: true, id: qual.id })}
                          aria-label="Delete qualification"
                        >
                          <Trash2 className="h-4 w-4 text-red-400" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {qualifications.length === 0 && (
        <Card className="bg-elec-gray/50 border-white/10">
          <CardContent className="py-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No qualifications yet</h4>
            <p className="text-muted-foreground mb-4">
              Add your electrical qualifications to build your professional profile.
            </p>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Qualification
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ElecIdQualifications;
