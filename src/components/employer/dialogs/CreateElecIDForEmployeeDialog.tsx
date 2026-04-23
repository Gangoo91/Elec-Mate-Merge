import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IdCard, Award, Loader2 } from 'lucide-react';
import { useCreateElecIdProfile } from '@/hooks/useElecId';
import { toast } from '@/hooks/use-toast';
import {
  Field,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
} from '@/components/employer/editorial';

interface CreateElecIDForEmployeeDialogProps {
  employeeId: string;
  employeeName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const ECS_CARD_TYPES = [
  { value: 'gold', label: 'Gold Card (Electrician)' },
  { value: 'blue', label: 'Blue Card (Approved Electrician)' },
  { value: 'black', label: 'Black Card (Senior/Manager)' },
  { value: 'white', label: 'White Card (Trainee)' },
  { value: 'green', label: 'Green Card (Labourer)' },
];

export function CreateElecIDForEmployeeDialog({
  employeeId,
  employeeName,
  open,
  onOpenChange,
  onSuccess,
}: CreateElecIDForEmployeeDialogProps) {
  const createProfile = useCreateElecIdProfile();

  const [formData, setFormData] = useState({
    ecsCardType: 'gold',
    ecsCardNumber: '',
    ecsExpiryDate: '',
    bio: '',
    specialisations: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProfile.mutateAsync({
        employee_id: employeeId,
        ecs_card_type: formData.ecsCardType,
        ecs_card_number: formData.ecsCardNumber || null,
        ecs_expiry_date: formData.ecsExpiryDate || null,
        bio: formData.bio || null,
        specialisations: formData.specialisations
          ? formData.specialisations.split(',').map((s) => s.trim())
          : null,
      });

      toast({
        title: 'Elec-ID Created',
        description: `Elec-ID profile created for ${employeeName}`,
      });

      onOpenChange(false);
      onSuccess?.();

      setFormData({
        ecsCardType: 'gold',
        ecsCardNumber: '',
        ecsExpiryDate: '',
        bio: '',
        specialisations: '',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create Elec-ID profile',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 flex items-center justify-center">
              <IdCard className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <DialogTitle className="text-white">Create Elec-ID</DialogTitle>
              <DialogDescription className="text-white">
                Set up digital ID for {employeeName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <FormCard eyebrow="ID profile">
            <Field label="ECS card type">
              <Select
                value={formData.ecsCardType}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, ecsCardType: value }))}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {ECS_CARD_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-amber-400" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="ECS card number">
              <Input
                placeholder="e.g. ECS123456"
                value={formData.ecsCardNumber}
                onChange={(e) => setFormData((prev) => ({ ...prev, ecsCardNumber: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Card expiry date">
              <Input
                type="date"
                value={formData.ecsExpiryDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, ecsExpiryDate: e.target.value }))}
                className={inputClass}
              />
            </Field>

            <Field label="Specialisations">
              <Input
                placeholder="e.g. Commercial, Industrial, Solar (comma separated)"
                value={formData.specialisations}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, specialisations: e.target.value }))
                }
                className={inputClass}
              />
            </Field>

            <Field label="Bio">
              <Textarea
                placeholder="Brief professional summary..."
                value={formData.bio}
                onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className={textareaClass}
              />
            </Field>
          </FormCard>

          <div className="flex gap-2 pt-2">
            <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit" disabled={createProfile.isPending} fullWidth>
              {createProfile.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <IdCard className="h-4 w-4 mr-2" />
                  Create Elec-ID
                </>
              )}
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
