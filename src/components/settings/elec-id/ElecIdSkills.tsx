import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Wrench,
  Trash2,
  Edit2,
  CheckCircle2,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { UK_ELECTRICAL_SKILLS, SKILL_LEVELS, SkillLevel } from "@/data/uk-electrician-constants";
import { useNotifications } from "@/components/notifications/NotificationProvider";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

interface Skill {
  id: string;
  skillName: string;
  category: string;
  level: SkillLevel;
  yearsExperience: number;
  isVerified: boolean;
}

const ElecIdSkills = () => {
  const { addNotification } = useNotifications();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string | null }>({
    open: false,
    id: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");
  const [formData, setFormData] = useState({
    level: "" as SkillLevel | "",
    yearsExperience: "",
  });

  // Mock skills - will be from database
  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", skillName: "Domestic Installation", category: "installation", level: "advanced", yearsExperience: 8, isVerified: true },
    { id: "2", skillName: "Commercial Installation", category: "installation", level: "advanced", yearsExperience: 6, isVerified: true },
    { id: "3", skillName: "Consumer Units", category: "installation", level: "expert", yearsExperience: 10, isVerified: true },
    { id: "4", skillName: "Initial Verification", category: "testing", level: "advanced", yearsExperience: 5, isVerified: true },
    { id: "5", skillName: "Periodic Inspection", category: "testing", level: "advanced", yearsExperience: 5, isVerified: true },
    { id: "6", skillName: "Fault Finding", category: "testing", level: "intermediate", yearsExperience: 3, isVerified: false },
    { id: "7", skillName: "Fire Alarm Systems", category: "specialist", level: "intermediate", yearsExperience: 2, isVerified: false },
    { id: "8", skillName: "Emergency Lighting", category: "specialist", level: "advanced", yearsExperience: 4, isVerified: true },
    { id: "9", skillName: "EV Charging", category: "renewable", level: "intermediate", yearsExperience: 1, isVerified: false },
    { id: "10", skillName: "Solar PV", category: "renewable", level: "beginner", yearsExperience: 1, isVerified: false },
  ]);

  const handleAddSkill = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const newSkill: Skill = {
      id: Date.now().toString(),
      skillName: selectedSkill,
      category: selectedCategory,
      level: formData.level as SkillLevel,
      yearsExperience: parseInt(formData.yearsExperience) || 0,
      isVerified: false,
    };

    setSkills((prev) => [...prev, newSkill]);
    setIsLoading(false);
    setIsAddDialogOpen(false);
    resetForm();

    addNotification({
      title: "Skill Added",
      message: `${selectedSkill} has been added to your profile.`,
      type: "success",
    });
  };

  const handleEditSkill = async () => {
    if (!editingSkill) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

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

    setIsLoading(false);
    setIsEditDialogOpen(false);
    setEditingSkill(null);
    resetForm();

    addNotification({
      title: "Skill Updated",
      message: "Your skill details have been updated.",
      type: "success",
    });
  };

  const handleDeleteSkill = async () => {
    if (!deleteConfirm.id) return;
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const deletedSkill = skills.find((s) => s.id === deleteConfirm.id);
    setSkills((prev) => prev.filter((s) => s.id !== deleteConfirm.id));

    setIsLoading(false);
    setDeleteConfirm({ open: false, id: null });

    addNotification({
      title: "Skill Removed",
      message: deletedSkill
        ? `${deletedSkill.skillName} has been removed.`
        : "Skill has been removed.",
      type: "info",
    });
  };

  const openEditDialog = (skill: Skill) => {
    setEditingSkill(skill);
    setSelectedCategory(skill.category);
    setSelectedSkill(skill.skillName);
    setFormData({
      level: skill.level,
      yearsExperience: skill.yearsExperience.toString(),
    });
    setIsEditDialogOpen(true);
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

  const getLevelProgress = (level: SkillLevel) => {
    const levels = { beginner: 25, intermediate: 50, advanced: 75, expert: 100 };
    return levels[level] || 0;
  };

  const getLevelColor = (level: SkillLevel) => {
    const colors = {
      beginner: "text-blue-400",
      intermediate: "text-green-400",
      advanced: "text-orange-400",
      expert: "text-elec-yellow",
    };
    return colors[level] || "text-muted-foreground";
  };

  const SkillForm = ({ isEdit = false }: { isEdit?: boolean }) => (
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
            {Object.entries(UK_ELECTRICAL_SKILLS).map(([key, cat]) => (
              <SelectItem key={key} value={key}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Skill Selection */}
      {selectedCategory && (
        <div className="space-y-2">
          <Label className="text-foreground">Skill</Label>
          <Select
            value={selectedSkill}
            onValueChange={setSelectedSkill}
            disabled={isEdit}
          >
            <SelectTrigger className="bg-white/5 border-white/20">
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent className="bg-elec-gray border-white/20">
              {getCategorySkills(selectedCategory).map((skill) => (
                <SelectItem key={skill} value={skill}>
                  {skill}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Skill Level */}
      <div className="space-y-2">
        <Label className="text-foreground">Proficiency Level</Label>
        <Select
          value={formData.level}
          onValueChange={(value) => setFormData({ ...formData, level: value as SkillLevel })}
        >
          <SelectTrigger className="bg-white/5 border-white/20">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent className="bg-elec-gray border-white/20">
            {SKILL_LEVELS.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                <div className="flex flex-col">
                  <span className={getLevelColor(level.value)}>{level.label}</span>
                  <span className="text-xs text-muted-foreground">{level.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Years Experience */}
      <div className="space-y-2">
        <Label className="text-foreground">Years of Experience</Label>
        <Input
          type="number"
          min="0"
          max="50"
          value={formData.yearsExperience}
          onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
          placeholder="e.g., 5"
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
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Delete Confirmation */}
      <ConfirmDeleteDialog
        open={deleteConfirm.open}
        onOpenChange={(open) => setDeleteConfirm({ ...deleteConfirm, open })}
        title="Delete Skill?"
        description="This will permanently remove this skill from your Elec-ID profile. This action cannot be undone."
        onConfirm={handleDeleteSkill}
        isLoading={isLoading}
      />

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-elec-gray border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">Edit Skill</DialogTitle>
          </DialogHeader>
          <SkillForm isEdit />
        </DialogContent>
      </Dialog>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Your Skills</h3>
          <p className="text-sm text-muted-foreground">
            {skills.length} skill{skills.length !== 1 ? "s" : ""} recorded
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-elec-gray border-white/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Add Skill</DialogTitle>
            </DialogHeader>
            <SkillForm />
          </DialogContent>
        </Dialog>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {Object.entries(UK_ELECTRICAL_SKILLS).map(([catKey, category]) => {
          const categorySkills = skills.filter((s) => s.category === catKey);
          if (categorySkills.length === 0) return null;

          return (
            <Card key={catKey} className="bg-elec-gray/50 border-white/10 overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-foreground text-base flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-elec-yellow" />
                  {category.label}
                  <Badge variant="secondary" className="ml-auto">
                    {categorySkills.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categorySkills.map((skill, index) => {
                  const levelInfo = getLevelInfo(skill.level);
                  return (
                    <div
                      key={skill.id}
                      className={cn(
                        "p-3 rounded-lg bg-white/5 border border-white/10",
                        "transition-all duration-200 hover:bg-white/10",
                        "animate-in fade-in slide-in-from-bottom-2"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{skill.skillName}</span>
                          {skill.isVerified && (
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-white/10"
                            onClick={() => openEditDialog(skill)}
                            aria-label="Edit skill"
                          >
                            <Edit2 className="h-3 w-3 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-red-500/10"
                            onClick={() => setDeleteConfirm({ open: true, id: skill.id })}
                            aria-label="Delete skill"
                          >
                            <Trash2 className="h-3 w-3 text-red-400" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className={getLevelColor(skill.level)}>
                            {levelInfo?.label}
                          </span>
                          <span className="text-muted-foreground flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {skill.yearsExperience} year{skill.yearsExperience !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <Progress value={getLevelProgress(skill.level)} className="h-1.5" />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      {skills.length > 0 && (
        <Card className="bg-gradient-to-br from-elec-gray/50 to-elec-dark/50 border-white/10">
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4">Skills Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SKILL_LEVELS.map((level) => {
                const count = skills.filter((s) => s.level === level.value).length;
                return (
                  <div
                    key={level.value}
                    className="text-center p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className={cn("text-2xl font-bold", getLevelColor(level.value as SkillLevel))}>
                      {count}
                    </div>
                    <div className="text-sm text-muted-foreground">{level.label}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {skills.length === 0 && (
        <Card className="bg-elec-gray/50 border-white/10">
          <CardContent className="py-12 text-center">
            <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No skills yet</h4>
            <p className="text-muted-foreground mb-4">
              Add your electrical skills to showcase your expertise.
            </p>
            <Button
              className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Skill
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ElecIdSkills;
