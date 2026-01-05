import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddElecIdSkill } from "@/hooks/useElecId";
import { toast } from "@/hooks/use-toast";
import { Star } from "lucide-react";

const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const COMMON_SKILLS = [
  "18th Edition Wiring",
  "Testing & Inspection",
  "Fault Finding",
  "Consumer Unit Installation",
  "EV Charging",
  "Solar PV",
  "Fire Alarm Systems",
  "Data Cabling",
  "Smart Home Systems",
  "Commercial Installations",
  "Industrial Installations",
  "Domestic Installations",
  "Three Phase Systems",
  "Control Panels",
  "HVAC Electrical",
];

interface AddSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId: string;
  workerName: string;
}

export const AddSkillDialog = ({ open, onOpenChange, profileId, workerName }: AddSkillDialogProps) => {
  const addSkill = useAddElecIdSkill();
  const [formData, setFormData] = useState({
    skillName: "",
    skillLevel: "intermediate",
    yearsExperience: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.skillName) {
      toast({
        title: "Skill Name Required",
        description: "Please enter or select a skill name.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addSkill.mutateAsync({
        profile_id: profileId,
        skill_name: formData.skillName,
        skill_level: formData.skillLevel,
        years_experience: formData.yearsExperience ? parseInt(formData.yearsExperience) : 0,
        is_verified: false,
      });

      toast({
        title: "Skill Added",
        description: `${formData.skillName} has been added to ${workerName}'s profile.`,
      });

      setFormData({ skillName: "", skillLevel: "intermediate", yearsExperience: "" });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-elec-yellow" />
            Add Skill
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Skill Name *</Label>
            <Input
              value={formData.skillName}
              onChange={(e) => setFormData(prev => ({ ...prev, skillName: e.target.value }))}
              placeholder="e.g. EV Charging Installation"
              list="common-skills"
            />
            <datalist id="common-skills">
              {COMMON_SKILLS.map(skill => (
                <option key={skill} value={skill} />
              ))}
            </datalist>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Skill Level</Label>
              <Select
                value={formData.skillLevel}
                onValueChange={(val) => setFormData(prev => ({ ...prev, skillLevel: val }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_LEVELS.map(level => (
                    <SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Years Experience</Label>
              <Input
                type="number"
                min="0"
                max="50"
                value={formData.yearsExperience}
                onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
                placeholder="e.g. 5"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={addSkill.isPending}>
              {addSkill.isPending ? "Adding..." : "Add Skill"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
