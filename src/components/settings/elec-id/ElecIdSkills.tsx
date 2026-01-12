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
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer } from "vaul";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Wrench,
  Trash2,
  CheckCircle2,
  TrendingUp,
  Loader2,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { UK_ELECTRICAL_SKILLS, SKILL_LEVELS, SkillLevel } from "@/data/uk-electrician-constants";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { useElecIdProfile } from "@/hooks/useElecIdProfile";
import {
  getSkillsByProfileId,
  addElecIdSkill,
  updateElecIdSkill,
  deleteElecIdSkill,
  ElecIdSkill,
} from "@/services/elecIdService";

interface Skill {
  id: string;
  skillName: string;
  category: string;
  level: SkillLevel;
  yearsExperience: number;
  isVerified: boolean;
}

// Skeleton loading component
const SkillsSkeleton = () => (
  <div className="space-y-5">
    {/* Header skeleton */}
    <div className="flex items-center justify-between px-1">
      <div>
        <Skeleton className="h-6 w-28 bg-white/[0.06]" />
        <Skeleton className="h-4 w-20 mt-1 bg-white/[0.06]" />
      </div>
      <Skeleton className="h-12 w-28 rounded-xl bg-white/[0.06]" />
    </div>

    {/* Summary cards skeleton */}
    <div className="grid grid-cols-4 gap-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-16 rounded-xl bg-white/[0.06]" />
      ))}
    </div>

    {/* Category groups skeleton */}
    {[1, 2].map((g) => (
      <div key={g} className="space-y-3">
        <Skeleton className="h-5 w-32 bg-white/[0.06]" />
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-full bg-white/[0.06]" />
          ))}
        </div>
      </div>
    ))}
  </div>
);

const ElecIdSkills = () => {
  const { addNotification } = useNotifications();
  const { profile } = useElecIdProfile();
  const isMobile = useIsMobile();

  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [formData, setFormData] = useState({
    level: "" as SkillLevel | "",
    yearsExperience: "",
  });

  const [skills, setSkills] = useState<Skill[]>([]);

  // Fetch skills from database
  useEffect(() => {
    const fetchSkills = async () => {
      if (!profile?.id) {
        setIsFetching(false);
        return;
      }

      try {
        const data = await getSkillsByProfileId(profile.id);
        const mapped = data.map((s: ElecIdSkill) => ({
          id: s.id,
          skillName: s.skill_name,
          category: 'installation',
          level: (s.skill_level || 'intermediate') as SkillLevel,
          yearsExperience: s.years_experience || 0,
          isVerified: s.is_verified,
        }));
        setSkills(mapped);
      } catch (error) {
        console.error('Error fetching skills:', error);
        addNotification({
          title: "Error",
          message: "Failed to load skills",
          type: "error",
        });
      } finally {
        setIsFetching(false);
      }
    };

    fetchSkills();
  }, [profile?.id]);

  const handleAddSkill = async () => {
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
      const newDbSkill = await addElecIdSkill({
        profile_id: profile.id,
        skill_name: selectedSkill,
        skill_level: formData.level as SkillLevel,
        years_experience: parseInt(formData.yearsExperience) || 0,
        is_verified: false,
      });

      const newSkill: Skill = {
        id: newDbSkill.id,
        skillName: selectedSkill,
        category: selectedCategory,
        level: formData.level as SkillLevel,
        yearsExperience: parseInt(formData.yearsExperience) || 0,
        isVerified: false,
      };

      setSkills((prev) => [...prev, newSkill]);
      setIsAddSheetOpen(false);
      resetForm();

      addNotification({
        title: "Skill Added",
        message: `${selectedSkill} has been added to your profile.`,
        type: "success",
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      addNotification({
        title: "Error",
        message: "Failed to add skill. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditSkill = async () => {
    if (!editingSkill) return;
    setIsLoading(true);

    try {
      await updateElecIdSkill(editingSkill.id, {
        skill_level: formData.level as SkillLevel,
        years_experience: parseInt(formData.yearsExperience) || 0,
      });

      setSkills((prev) =>
        prev.map((s) =>
          s.id === editingSkill.id
            ? {
                ...s,
                level: formData.level as SkillLevel,
                yearsExperience: parseInt(formData.yearsExperience) || 0,
              }
            : s
        )
      );

      setIsEditSheetOpen(false);
      setEditingSkill(null);
      resetForm();

      addNotification({
        title: "Skill Updated",
        message: "Your skill details have been updated.",
        type: "success",
      });
    } catch (error) {
      console.error('Error updating skill:', error);
      addNotification({
        title: "Error",
        message: "Failed to update skill. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSkill = async () => {
    if (!deleteConfirm.id) return;
    setIsLoading(true);

    try {
      await deleteElecIdSkill(deleteConfirm.id);

      const deletedSkill = skills.find((s) => s.id === deleteConfirm.id);
      setSkills((prev) => prev.filter((s) => s.id !== deleteConfirm.id));
      setDeleteConfirm({ open: false, id: null });

      addNotification({
        title: "Skill Removed",
        message: deletedSkill
          ? `${deletedSkill.skillName} has been removed.`
          : "Skill has been removed.",
        type: "info",
      });
    } catch (error) {
      console.error('Error deleting skill:', error);
      addNotification({
        title: "Error",
        message: "Failed to delete skill. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openEditSheet = (skill: Skill) => {
    setEditingSkill(skill);
    setSelectedCategory(skill.category);
    setSelectedSkill(skill.skillName);
    setFormData({
      level: skill.level,
      yearsExperience: skill.yearsExperience.toString(),
    });
    setIsEditSheetOpen(true);
  };

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedSkill("");
    setFormData({
      level: "",
      yearsExperience: "",
    });
  };

  const getCategorySkills = (categoryKey: string) => {
    return UK_ELECTRICAL_SKILLS[categoryKey as keyof typeof UK_ELECTRICAL_SKILLS]?.skills || [];
  };

  const getLevelInfo = (level: SkillLevel) => {
    return SKILL_LEVELS.find((l) => l.value === level);
  };

  const getLevelColor = (level: SkillLevel) => {
    const colors = {
      beginner: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
      intermediate: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
      advanced: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
      expert: { bg: "bg-elec-yellow/20", text: "text-elec-yellow", border: "border-elec-yellow/30" },
    };
    return colors[level] || colors.intermediate;
  };

  // Form content - reusable for both mobile and desktop
  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-5">
      {/* Category Selection */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Category</Label>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          disabled={isEdit}
        >
          <SelectTrigger className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-background border-white/[0.1] z-[200]">
            {Object.entries(UK_ELECTRICAL_SKILLS).map(([key, cat]) => (
              <SelectItem key={key} value={key} className="py-3 touch-manipulation">
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Skill Selection */}
      {selectedCategory && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">Skill</Label>
          <Select
            value={selectedSkill}
            onValueChange={setSelectedSkill}
            disabled={isEdit}
          >
            <SelectTrigger className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation">
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent className="bg-background border-white/[0.1] max-h-60 z-[200]">
              {getCategorySkills(selectedCategory).map((skill) => (
                <SelectItem key={skill} value={skill} className="py-3 touch-manipulation">
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Skill Level - Visual Selector */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-foreground">Proficiency Level</Label>
        <div className="grid grid-cols-2 gap-2">
          {SKILL_LEVELS.map((level) => {
            const colors = getLevelColor(level.value);
            const isSelected = formData.level === level.value;
            return (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData({ ...formData, level: level.value })}
                className={cn(
                  "p-3 rounded-xl border-2 text-left transition-all touch-manipulation active:scale-[0.98]",
                  isSelected
                    ? `${colors.bg} ${colors.border}`
                    : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]"
                )}
              >
                <div className={cn("font-medium", isSelected ? colors.text : "text-foreground")}>
                  {level.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {level.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Years Experience */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Years of Experience</Label>
        <Input
          type="number"
          min="0"
          max="50"
          value={formData.yearsExperience}
          onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
          placeholder="e.g., 5"
          className="h-12 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-base"
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
              <X className="w-5 h-5 text-muted-foreground" />
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
              onClick={isEdit ? handleEditSkill : handleAddSkill}
              disabled={
                (!isEdit && (!selectedCategory || !selectedSkill || !formData.level)) ||
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
                "Add Skill"
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
            onClick={isEdit ? handleEditSkill : handleAddSkill}
            disabled={
              (!isEdit && (!selectedCategory || !selectedSkill || !formData.level)) ||
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
              "Add Skill"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Show skeleton while fetching
  if (isFetching) {
    return <SkillsSkeleton />;
  }

  return (
    <div className="space-y-5">
      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete Skill?"
        description="This will permanently remove this skill from your ELEC-iD profile. This action cannot be undone."
        onConfirm={handleDeleteSkill}
        isLoading={isLoading}
      />

      {/* Add Sheet - Mobile or Desktop */}
      {isMobile ? (
        <MobileFormSheet
          open={isAddSheetOpen}
          onOpenChange={setIsAddSheetOpen}
          title="Add Skill"
        />
      ) : (
        <DesktopFormDialog
          open={isAddSheetOpen}
          onOpenChange={setIsAddSheetOpen}
          title="Add Skill"
        />
      )}

      {/* Edit Sheet - Mobile or Desktop */}
      {isMobile ? (
        <MobileFormSheet
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          title="Edit Skill"
          isEdit
        />
      ) : (
        <DesktopFormDialog
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          title="Edit Skill"
          isEdit
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Your Skills</h3>
          <p className="text-sm text-muted-foreground">
            {skills.length} skill{skills.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        <Button
          onClick={() => setIsAddSheetOpen(true)}
          className="h-12 px-4 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.97]"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {skills.length > 0 ? (
        <>
          {/* Level Summary - Compact Cards */}
          <div className="grid grid-cols-4 gap-2">
            {SKILL_LEVELS.map((level) => {
              const count = skills.filter((s) => s.level === level.value).length;
              const colors = getLevelColor(level.value);
              return (
                <motion.div
                  key={level.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "text-center p-3 rounded-xl border transition-all",
                    count > 0
                      ? `${colors.bg} ${colors.border}`
                      : "bg-white/[0.02] border-white/[0.04]"
                  )}
                >
                  <div className={cn(
                    "text-xl font-bold",
                    count > 0 ? colors.text : "text-muted-foreground/50"
                  )}>
                    {count}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {level.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skills by Category */}
          <div className="space-y-6">
            {Object.entries(UK_ELECTRICAL_SKILLS).map(([catKey, category]) => {
              const categorySkills = skills.filter((s) => s.category === catKey);
              if (categorySkills.length === 0) return null;

              return (
                <motion.div
                  key={catKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-2 px-1">
                    <Wrench className="h-4 w-4 text-elec-yellow" />
                    <h4 className="text-sm font-medium text-foreground">
                      {category.label}
                    </h4>
                    <Badge variant="secondary" className="ml-auto text-xs bg-white/[0.06]">
                      {categorySkills.length}
                    </Badge>
                  </div>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-2">
                    <AnimatePresence mode="popLayout">
                      {categorySkills.map((skill, index) => {
                        const levelInfo = getLevelInfo(skill.level);
                        const colors = getLevelColor(skill.level);

                        return (
                          <motion.button
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: index * 0.03 }}
                            onClick={() => openEditSheet(skill)}
                            className={cn(
                              "group flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all touch-manipulation active:scale-[0.97]",
                              colors.bg,
                              colors.border,
                              "hover:brightness-110"
                            )}
                          >
                            {/* Skill name */}
                            <span className="font-medium text-sm text-foreground">
                              {skill.skillName}
                            </span>

                            {/* Verified badge */}
                            {skill.isVerified && (
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                            )}

                            {/* Level indicator */}
                            <span className={cn(
                              "text-xs font-medium px-1.5 py-0.5 rounded-md",
                              colors.text,
                              "bg-white/10"
                            )}>
                              {levelInfo?.label}
                            </span>

                            {/* Years */}
                            <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                              <TrendingUp className="h-3 w-3" />
                              {skill.yearsExperience}y
                            </span>

                            {/* Edit indicator */}
                            <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.button>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}

            {/* Ungrouped skills (if category doesn't match) */}
            {skills.filter(s => !Object.keys(UK_ELECTRICAL_SKILLS).includes(s.category)).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 px-1">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <h4 className="text-sm font-medium text-foreground">Other Skills</h4>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter(s => !Object.keys(UK_ELECTRICAL_SKILLS).includes(s.category))
                    .map((skill, index) => {
                      const levelInfo = getLevelInfo(skill.level);
                      const colors = getLevelColor(skill.level);

                      return (
                        <motion.button
                          key={skill.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => openEditSheet(skill)}
                          className={cn(
                            "group flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all touch-manipulation active:scale-[0.97]",
                            colors.bg,
                            colors.border
                          )}
                        >
                          <span className="font-medium text-sm text-foreground">
                            {skill.skillName}
                          </span>
                          {skill.isVerified && (
                            <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                          )}
                          <span className={cn("text-xs font-medium px-1.5 py-0.5 rounded-md bg-white/10", colors.text)}>
                            {levelInfo?.label}
                          </span>
                          <span className="text-xs text-muted-foreground flex items-center gap-0.5">
                            <TrendingUp className="h-3 w-3" />
                            {skill.yearsExperience}y
                          </span>
                        </motion.button>
                      );
                    })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick Delete Section */}
          <div className="pt-4 border-t border-white/[0.06]">
            <p className="text-xs text-muted-foreground mb-3 px-1">
              Tap a skill to edit. Long press or swipe to delete.
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Button
                  key={skill.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setDeleteConfirm({ open: true, id: skill.id })}
                  className="h-8 px-2 text-xs text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  {skill.skillName}
                </Button>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/[0.04] flex items-center justify-center">
            <Wrench className="h-10 w-10 text-muted-foreground/50" />
          </div>
          <h4 className="text-lg font-medium text-foreground mb-2">No skills yet</h4>
          <p className="text-muted-foreground max-w-xs mx-auto mb-6">
            Add your electrical skills to showcase your expertise.
          </p>
          <Button
            onClick={() => setIsAddSheetOpen(true)}
            className="h-12 px-6 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.97]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Skill
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ElecIdSkills;
