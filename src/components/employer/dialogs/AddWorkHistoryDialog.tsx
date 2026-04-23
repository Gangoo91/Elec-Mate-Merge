import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useAddElecIdWorkHistory } from '@/hooks/useElecId';
import { toast } from '@/hooks/use-toast';
import { Briefcase } from 'lucide-react';
import {
  Field,
  FormCard,
  FormGrid,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  textareaClass,
  checkboxClass,
} from '@/components/employer/editorial';

interface AddWorkHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileId: string;
  profileName: string;
}

export const AddWorkHistoryDialog = ({
  open,
  onOpenChange,
  profileId,
  profileName,
}: AddWorkHistoryDialogProps) => {
  const addWorkHistory = useAddElecIdWorkHistory();
  const [formData, setFormData] = useState({
    employer: '',
    role: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    projects: '',
  });

  const handleSubmit = async () => {
    if (!formData.employer || !formData.role || !formData.startDate) {
      toast({
        title: 'Required Fields',
        description: 'Please fill in employer, role, and start date.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await addWorkHistory.mutateAsync({
        profile_id: profileId,
        employer_name: formData.employer,
        job_title: formData.role,
        start_date: formData.startDate,
        end_date: formData.isCurrent ? null : formData.endDate || null,
        is_current: formData.isCurrent,
        description: formData.description || null,
        projects: formData.projects
          ? formData.projects
              .split(',')
              .map((p) => p.trim())
              .filter(Boolean)
          : null,
        is_verified: false,
        verified_by_employer: false,
      });

      toast({
        title: 'Work History Added',
        description: `Employment record has been added to ${profileName}'s Elec-ID.`,
      });

      setFormData({
        employer: '',
        role: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        projects: '',
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add work history. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <Briefcase className="h-5 w-5 text-elec-yellow" />
            Add Work History
          </DialogTitle>
          <DialogDescription className="text-white">
            Add past employment to {profileName}'s Elec-ID profile
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <FormCard eyebrow="Employment details">
            <Field label="Employer" required>
              <Input
                id="employer"
                placeholder="e.g., ABC Electrical Ltd"
                value={formData.employer}
                onChange={(e) => setFormData((prev) => ({ ...prev, employer: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Job title / role" required>
              <Input
                id="role"
                placeholder="e.g., Senior Electrician"
                value={formData.role}
                onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <FormGrid cols={2}>
              <Field label="Start date" required>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
                  className={inputClass}
                />
              </Field>
              <Field label="End date">
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData((prev) => ({ ...prev, endDate: e.target.value }))}
                  disabled={formData.isCurrent}
                  className={inputClass}
                />
              </Field>
            </FormGrid>

            <div className="flex items-center gap-2">
              <Checkbox
                id="isCurrent"
                checked={formData.isCurrent}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isCurrent: checked as boolean, endDate: '' }))
                }
                className={checkboxClass}
              />
              <label htmlFor="isCurrent" className="text-[12.5px] text-white cursor-pointer">
                Currently working here
              </label>
            </div>

            <Field label="Description">
              <Textarea
                id="description"
                placeholder="Brief description of responsibilities and achievements..."
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                rows={3}
                className={textareaClass}
              />
            </Field>

            <Field label="Key projects (comma separated)">
              <Input
                id="projects"
                placeholder="e.g., Tesco Refit, Hospital Wing, EV Network"
                value={formData.projects}
                onChange={(e) => setFormData((prev) => ({ ...prev, projects: e.target.value }))}
                className={inputClass}
              />
            </Field>
          </FormCard>
        </div>

        <DialogFooter className="gap-2">
          <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSubmit} disabled={addWorkHistory.isPending}>
            {addWorkHistory.isPending ? 'Adding...' : 'Add to Elec-ID'}
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
