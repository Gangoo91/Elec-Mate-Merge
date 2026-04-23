import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAddElecIdSkill } from '@/hooks/useElecId';
import { toast } from '@/hooks/use-toast';
import { Star } from 'lucide-react';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';

const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'expert', label: 'Expert' },
];

const COMMON_SKILLS = [
  '18th Edition Wiring',
  'Testing & Inspection',
  'Fault Finding',
  'Consumer Unit Installation',
  'EV Charging',
  'Solar PV',
  'Fire Alarm Systems',
  'Data Cabling',
  'Smart Home Systems',
  'Commercial Installations',
  'Industrial Installations',
  'Domestic Installations',
  'Three Phase Systems',
  'Control Panels',
  'HVAC Electrical',
];

interface AddSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId: string;
  workerName: string;
}

export const AddSkillDialog = ({
  open,
  onOpenChange,
  profileId,
  workerName,
}: AddSkillDialogProps) => {
  const addSkill = useAddElecIdSkill();
  const [formData, setFormData] = useState({
    skillName: '',
    skillLevel: 'intermediate',
    yearsExperience: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.skillName) {
      toast({
        title: 'Skill Name Required',
        description: 'Please enter or select a skill name.',
        variant: 'destructive',
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
        title: 'Skill Added',
        description: `${formData.skillName} has been added to ${workerName}'s profile.`,
      });

      setFormData({ skillName: '', skillLevel: 'intermediate', yearsExperience: '' });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add skill. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-lg bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Star className="h-5 w-5 text-elec-yellow" />
            Add Skill
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormCard eyebrow="Skill details">
            <Field label="Skill name" required>
              <Input
                value={formData.skillName}
                onChange={(e) => setFormData((prev) => ({ ...prev, skillName: e.target.value }))}
                placeholder="e.g. EV Charging Installation"
                list="common-skills"
                className={inputClass}
              />
              <datalist id="common-skills">
                {COMMON_SKILLS.map((skill) => (
                  <option key={skill} value={skill} />
                ))}
              </datalist>
            </Field>

            <FormGrid cols={2}>
              <Field label="Skill level">
                <Select
                  value={formData.skillLevel}
                  onValueChange={(val) => setFormData((prev) => ({ ...prev, skillLevel: val }))}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {SKILL_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Years experience">
                <Input
                  type="number"
                  min="0"
                  max="50"
                  value={formData.yearsExperience}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, yearsExperience: e.target.value }))
                  }
                  placeholder="e.g. 5"
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <div className="flex gap-2 pt-2">
            <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={addSkill.isPending} fullWidth>
              {addSkill.isPending ? 'Adding...' : 'Add Skill'}
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
