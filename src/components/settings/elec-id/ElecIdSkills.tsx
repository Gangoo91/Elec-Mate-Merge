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
  Plug,
  ClipboardCheck,
  Shield,
  Leaf,
  HardHat,
  PencilRuler,
  Laptop,
  Zap,
  Crown,
  TreePine,
  CircleDot,
  Star,
  Award,
  Clock,
  Edit3,
  BadgeCheck,
  Target,
  Flame,
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
      beginner: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30", gradient: "from-blue-500 to-blue-600" },
      intermediate: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30", gradient: "from-green-500 to-emerald-600" },
      advanced: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30", gradient: "from-orange-500 to-amber-600" },
      expert: { bg: "bg-elec-yellow/20", text: "text-elec-yellow", border: "border-elec-yellow/30", gradient: "from-yellow-400 to-amber-500" },
    };
    return colors[level] || colors.intermediate;
  };

  const getCategoryIcon = (categoryKey: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      installation: Plug,
      testing: ClipboardCheck,
      specialist: Shield,
      renewable: Leaf,
      maintenance: Wrench,
      design: PencilRuler,
      safety: HardHat,
      software: Laptop,
    };
    return icons[categoryKey] || Wrench;
  };

  const getCategoryColor = (categoryKey: string) => {
    const colors: Record<string, { bg: string; text: string; border: string }> = {
      installation: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
      testing: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
      specialist: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
      renewable: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
      maintenance: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
      design: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
      safety: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" },
      software: { bg: "bg-indigo-500/20", text: "text-indigo-400", border: "border-indigo-500/30" },
    };
    return colors[categoryKey] || colors.installation;
  };

  const getLevelIcon = (level: SkillLevel) => {
    const icons: Record<SkillLevel, React.ComponentType<any>> = {
      beginner: CircleDot,
      intermediate: Target,
      advanced: Flame,
      expert: Crown,
    };
    return icons[level] || Star;
  };

  // Form content - reusable for both mobile and desktop
  const FormContent = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="space-y-6">
      {/* Step 1: Category Selection - Visual Grid */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
          <span className="w-6 h-6 rounded-full bg-elec-yellow/20 text-elec-yellow flex items-center justify-center text-xs font-bold">1</span>
          <span>Select Category</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {Object.entries(UK_ELECTRICAL_SKILLS).map(([key, cat]) => {
            const Icon = getCategoryIcon(key);
            const colors = getCategoryColor(key);
            const isSelected = selectedCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (!isEdit) {
                    setSelectedCategory(key);
                    setSelectedSkill(""); // Reset skill when category changes
                  }
                }}
                disabled={isEdit}
                className={cn(
                  "p-3 rounded-xl border transition-all touch-manipulation text-left",
                  isSelected
                    ? `${colors.bg} ${colors.border}`
                    : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]",
                  isEdit && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    isSelected ? colors.bg : "bg-white/[0.06]"
                  )}>
                    <Icon className={cn(
                      "h-4 w-4",
                      isSelected ? colors.text : "text-foreground/60"
                    )} />
                  </div>
                  <span className={cn(
                    "text-sm font-medium",
                    isSelected ? colors.text : "text-foreground"
                  )}>
                    {cat.label}
                  </span>
                </div>
                <p className="text-[10px] text-foreground/50 mt-1 ml-10">
                  {cat.skills.length} skills
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Skill Selection - Scrollable List */}
      {selectedCategory && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
            <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">2</span>
            <span>Select Skill</span>
          </div>

          <div className="max-h-[200px] overflow-y-auto rounded-xl border border-white/[0.08] bg-white/[0.02]">
            {getCategorySkills(selectedCategory).map((skill) => {
              const isSelected = selectedSkill === skill;
              const catColors = getCategoryColor(selectedCategory);
              return (
                <button
                  key={skill}
                  type="button"
                  onClick={() => !isEdit && setSelectedSkill(skill)}
                  disabled={isEdit}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 border-b border-white/[0.04] last:border-0 transition-all touch-manipulation",
                    isSelected
                      ? `${catColors.bg}`
                      : "hover:bg-white/[0.04] active:bg-white/[0.08]",
                    isEdit && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0",
                    isSelected
                      ? `${catColors.border} ${catColors.bg}`
                      : "border-white/30"
                  )}>
                    {isSelected && (
                      <CheckCircle2 className={cn("h-3 w-3", catColors.text)} />
                    )}
                  </div>
                  <span className={cn(
                    "text-sm text-left",
                    isSelected ? catColors.text + " font-medium" : "text-foreground/80"
                  )}>
                    {skill}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Step 3: Proficiency Level - Visual Cards */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
          <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">3</span>
          <span>Your Proficiency</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {SKILL_LEVELS.map((level) => {
            const colors = getLevelColor(level.value);
            const Icon = getLevelIcon(level.value);
            const isSelected = formData.level === level.value;
            return (
              <button
                key={level.value}
                type="button"
                onClick={() => setFormData({ ...formData, level: level.value })}
                className={cn(
                  "p-4 rounded-xl border-2 text-left transition-all touch-manipulation active:scale-[0.98]",
                  isSelected
                    ? `${colors.bg} ${colors.border}`
                    : "bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    isSelected ? `bg-gradient-to-br ${colors.gradient}` : "bg-white/[0.08]"
                  )}>
                    <Icon className={cn(
                      "h-4 w-4",
                      isSelected ? "text-white" : "text-foreground/60"
                    )} />
                  </div>
                  <span className={cn("font-semibold", isSelected ? colors.text : "text-foreground")}>
                    {level.label}
                  </span>
                </div>
                <p className="text-xs text-foreground/60 leading-relaxed">
                  {level.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 4: Years of Experience */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
          <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
          <span>Years of Experience</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Clock className="h-5 w-5 text-foreground/40" />
            </div>
            <Input
              type="number"
              min="0"
              max="50"
              value={formData.yearsExperience}
              onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
              placeholder="Years"
              className="h-14 pl-12 pr-16 bg-white/[0.06] border-white/[0.1] rounded-xl touch-manipulation text-lg font-medium"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 text-sm">
              years
            </div>
          </div>
        </div>

        {/* Quick Select Buttons */}
        <div className="flex gap-2">
          {[1, 2, 5, 10, 15, 20].map((years) => (
            <button
              key={years}
              type="button"
              onClick={() => setFormData({ ...formData, yearsExperience: years.toString() })}
              className={cn(
                "flex-1 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation",
                formData.yearsExperience === years.toString()
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/[0.04] text-foreground/60 hover:bg-white/[0.08]"
              )}
            >
              {years}y
            </button>
          ))}
        </div>
      </div>

      {/* Summary Preview */}
      {selectedSkill && formData.level && (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
          <p className="text-xs text-foreground/50 uppercase tracking-wide mb-2">Preview</p>
          <div className="flex items-center gap-3">
            {(() => {
              const CatIcon = getCategoryIcon(selectedCategory);
              const catColors = getCategoryColor(selectedCategory);
              const levelColors = getLevelColor(formData.level as SkillLevel);
              return (
                <>
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    catColors.bg
                  )}>
                    <CatIcon className={cn("h-5 w-5", catColors.text)} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{selectedSkill}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge className={cn("text-xs", levelColors.bg, levelColors.text, levelColors.border)}>
                        {getLevelInfo(formData.level as SkillLevel)?.label}
                      </Badge>
                      {formData.yearsExperience && (
                        <span className="text-xs text-foreground/50">
                          {formData.yearsExperience} years
                        </span>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
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
          <p className="text-sm text-foreground/70">
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
          {/* Stats Overview */}
          <div className="grid grid-cols-2 gap-3">
            {/* Total Skills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-amber-600/5 border border-elec-yellow/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-elec-yellow/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-elec-yellow" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-elec-yellow">{skills.length}</p>
                  <p className="text-xs text-foreground/60">Total Skills</p>
                </div>
              </div>
            </motion.div>

            {/* Total Experience */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-600/5 border border-purple-500/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">
                    {skills.reduce((sum, s) => sum + s.yearsExperience, 0)}
                  </p>
                  <p className="text-xs text-foreground/60">Combined Years</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Level Distribution */}
          <div className="grid grid-cols-4 gap-2">
            {SKILL_LEVELS.map((level, idx) => {
              const count = skills.filter((s) => s.level === level.value).length;
              const colors = getLevelColor(level.value);
              const Icon = getLevelIcon(level.value);
              return (
                <motion.div
                  key={level.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn(
                    "text-center p-3 rounded-xl border transition-all",
                    count > 0
                      ? `${colors.bg} ${colors.border}`
                      : "bg-white/[0.02] border-white/[0.04]"
                  )}
                >
                  <Icon className={cn(
                    "h-4 w-4 mx-auto mb-1",
                    count > 0 ? colors.text : "text-foreground/30"
                  )} />
                  <div className={cn(
                    "text-lg font-bold",
                    count > 0 ? colors.text : "text-foreground/30"
                  )}>
                    {count}
                  </div>
                  <div className="text-[10px] text-foreground/50 uppercase tracking-wide">
                    {level.label}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skills by Category - Enhanced Cards */}
          <div className="space-y-4">
            {Object.entries(UK_ELECTRICAL_SKILLS).map(([catKey, category]) => {
              const categorySkills = skills.filter((s) => s.category === catKey);
              if (categorySkills.length === 0) return null;

              const CatIcon = getCategoryIcon(catKey);
              const catColors = getCategoryColor(catKey);

              return (
                <motion.div
                  key={catKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/[0.08] overflow-hidden"
                >
                  {/* Category Header */}
                  <div className={cn(
                    "px-4 py-3 flex items-center gap-3",
                    catColors.bg
                  )}>
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      catColors.bg,
                      catColors.border,
                      "border"
                    )}>
                      <CatIcon className={cn("h-5 w-5", catColors.text)} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        {category.label}
                      </h4>
                      <p className="text-xs text-foreground/60">
                        {categorySkills.length} skill{categorySkills.length !== 1 ? 's' : ''} recorded
                      </p>
                    </div>
                    <Badge className={cn(
                      "text-xs",
                      catColors.bg, catColors.text, catColors.border
                    )}>
                      {categorySkills.length}
                    </Badge>
                  </div>

                  {/* Skill Cards */}
                  <div className="p-2 space-y-2 bg-white/[0.01]">
                    <AnimatePresence mode="popLayout">
                      {categorySkills.map((skill, index) => {
                        const levelInfo = getLevelInfo(skill.level);
                        const levelColors = getLevelColor(skill.level);
                        const LevelIcon = getLevelIcon(skill.level);

                        return (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ delay: index * 0.03 }}
                            className="bg-white/[0.03] rounded-xl border border-white/[0.06] overflow-hidden"
                          >
                            {/* Skill Card Content */}
                            <button
                              onClick={() => openEditSheet(skill)}
                              className="w-full p-4 text-left touch-manipulation hover:bg-white/[0.02] active:bg-white/[0.05] transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                {/* Level Icon */}
                                <div className={cn(
                                  "w-12 h-12 rounded-xl flex flex-col items-center justify-center border",
                                  levelColors.bg, levelColors.border
                                )}>
                                  <LevelIcon className={cn("h-5 w-5", levelColors.text)} />
                                </div>

                                {/* Skill Info */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <h5 className="font-semibold text-foreground text-sm">
                                      {skill.skillName}
                                    </h5>
                                    <Edit3 className="h-4 w-4 text-foreground/30 flex-shrink-0" />
                                  </div>

                                  {/* Stats Row */}
                                  <div className="flex items-center gap-3 mt-2">
                                    <Badge className={cn(
                                      "text-xs",
                                      levelColors.bg, levelColors.text, levelColors.border
                                    )}>
                                      {levelInfo?.label}
                                    </Badge>
                                    <span className="text-xs text-foreground/50 flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {skill.yearsExperience} year{skill.yearsExperience !== 1 ? 's' : ''}
                                    </span>
                                    {skill.isVerified && (
                                      <span className="text-xs text-emerald-400 flex items-center gap-1">
                                        <BadgeCheck className="h-3 w-3" />
                                        Verified
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </button>

                            {/* Quick Actions */}
                            <div className="flex items-center justify-between px-4 py-2 border-t border-white/[0.04] bg-white/[0.01]">
                              <button
                                onClick={() => openEditSheet(skill)}
                                className="text-xs text-foreground/50 hover:text-foreground flex items-center gap-1 touch-manipulation"
                              >
                                <Edit3 className="h-3 w-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({ open: true, id: skill.id })}
                                className="text-xs text-red-400/60 hover:text-red-400 flex items-center gap-1 touch-manipulation"
                              >
                                <Trash2 className="h-3 w-3" />
                                Remove
                              </button>
                            </div>
                          </motion.div>
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
                className="rounded-2xl border border-white/[0.08] overflow-hidden"
              >
                <div className="px-4 py-3 flex items-center gap-3 bg-purple-500/10">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">Other Skills</h4>
                  </div>
                </div>

                <div className="p-2 space-y-2 bg-white/[0.01]">
                  {skills
                    .filter(s => !Object.keys(UK_ELECTRICAL_SKILLS).includes(s.category))
                    .map((skill, index) => {
                      const levelInfo = getLevelInfo(skill.level);
                      const levelColors = getLevelColor(skill.level);
                      const LevelIcon = getLevelIcon(skill.level);

                      return (
                        <motion.button
                          key={skill.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => openEditSheet(skill)}
                          className="w-full p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3 touch-manipulation hover:bg-white/[0.05]"
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center",
                            levelColors.bg, levelColors.border, "border"
                          )}>
                            <LevelIcon className={cn("h-5 w-5", levelColors.text)} />
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium text-foreground text-sm">{skill.skillName}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={cn("text-xs", levelColors.bg, levelColors.text, levelColors.border)}>
                                {levelInfo?.label}
                              </Badge>
                              <span className="text-xs text-foreground/50">{skill.yearsExperience}y</span>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-foreground/30" />
                        </motion.button>
                      );
                    })}
                </div>
              </motion.div>
            )}
          </div>
        </>
      ) : (
        /* Empty State - Enhanced */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-6"
        >
          <div className="rounded-2xl border border-dashed border-white/[0.15] bg-gradient-to-br from-white/[0.02] to-transparent p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-600/10 flex items-center justify-center">
              <Zap className="h-10 w-10 text-elec-yellow" />
            </div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Showcase Your Expertise</h4>
            <p className="text-foreground/60 max-w-sm mx-auto mb-6 leading-relaxed">
              Add your electrical skills to build a comprehensive profile that employers can trust.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mx-auto mb-2">
                  <ClipboardCheck className="h-5 w-5 text-blue-400" />
                </div>
                <p className="text-xs text-foreground/60">Track proficiency levels</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
                  <BadgeCheck className="h-5 w-5 text-emerald-400" />
                </div>
                <p className="text-xs text-foreground/60">Verification ready</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <p className="text-xs text-foreground/60">Show experience years</p>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mx-auto mb-2">
                  <Award className="h-5 w-5 text-orange-400" />
                </div>
                <p className="text-xs text-foreground/60">Build credibility</p>
              </div>
            </div>

            {/* Category Preview */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {Object.entries(UK_ELECTRICAL_SKILLS).slice(0, 4).map(([key, cat]) => {
                const Icon = getCategoryIcon(key);
                const colors = getCategoryColor(key);
                return (
                  <div
                    key={key}
                    className={cn(
                      "px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs",
                      colors.bg, colors.text, colors.border, "border"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {cat.label}
                  </div>
                );
              })}
              <div className="px-3 py-1.5 rounded-full bg-white/[0.05] text-foreground/50 text-xs">
                +{Object.keys(UK_ELECTRICAL_SKILLS).length - 4} more
              </div>
            </div>

            <Button
              onClick={() => setIsAddSheetOpen(true)}
              className="h-12 px-6 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation active:scale-[0.97]"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Skill
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ElecIdSkills;
