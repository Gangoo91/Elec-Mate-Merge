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
import { useTrainingRequests } from '@/hooks/useTrainingRequests';
import { GraduationCap, Loader2, AlertCircle, FileText } from 'lucide-react';
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

interface Worker {
  id: string;
  name: string;
  elecIdProfileId: string;
}

interface AddTrainingRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  worker: Worker | null;
}

const COMMON_PROVIDERS = [
  'City & Guilds',
  'EAL',
  'NICEIC',
  'NAPIT',
  'JIB',
  'In-house Training',
  'Other',
];

const COMMON_TRAINING = [
  '18th Edition BS7671',
  'Inspection & Testing',
  'PAT Testing',
  'EV Charging Installation',
  'Solar PV Installation',
  'Fire Alarm Systems',
  'Emergency Lighting',
  'Safe Isolation',
  'Working at Heights',
  'Manual Handling',
  'First Aid at Work',
  'Other',
];

export function AddTrainingRequestDialog({
  open,
  onOpenChange,
  worker,
}: AddTrainingRequestDialogProps) {
  const { createRequest, isSubmitting } = useTrainingRequests();

  const [trainingName, setTrainingName] = useState('');
  const [customTraining, setCustomTraining] = useState('');
  const [provider, setProvider] = useState('');
  const [customProvider, setCustomProvider] = useState('');
  const [completedDate, setCompletedDate] = useState('');
  const [notes, setNotes] = useState('');

  const resetForm = () => {
    setTrainingName('');
    setCustomTraining('');
    setProvider('');
    setCustomProvider('');
    setCompletedDate('');
    setNotes('');
  };

  const handleSubmit = async () => {
    if (!worker?.elecIdProfileId) return;

    const finalTrainingName = trainingName === 'Other' ? customTraining : trainingName;
    const finalProvider = provider === 'Other' ? customProvider : provider;

    if (!finalTrainingName) {
      return;
    }

    const success = await createRequest({
      workerProfileId: worker.elecIdProfileId,
      trainingName: finalTrainingName,
      provider: finalProvider || undefined,
      completedDate: completedDate || undefined,
    });

    if (success) {
      onOpenChange(false);
      resetForm();
    }
  };

  if (!worker) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-md bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
            Add Training Record
          </DialogTitle>
          <DialogDescription className="text-white">
            Request to add a training record to {worker.name}'s Elec-ID profile. They will need to
            approve this addition.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Info Banner */}
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
            <AlertCircle className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
            <p className="text-[12.5px] text-blue-300">
              The worker owns their Elec-ID profile. They must approve any training records you add.
            </p>
          </div>

          <FormCard eyebrow="Training details">
            <Field label="Training course">
              <Select value={trainingName} onValueChange={setTrainingName}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select training type" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {COMMON_TRAINING.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {trainingName === 'Other' && (
              <Field label="Custom training name">
                <Input
                  id="customTraining"
                  value={customTraining}
                  onChange={(e) => setCustomTraining(e.target.value)}
                  placeholder="Enter training name"
                  className={inputClass}
                />
              </Field>
            )}

            <Field label="Training provider">
              <Select value={provider} onValueChange={setProvider}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {COMMON_PROVIDERS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            {provider === 'Other' && (
              <Field label="Custom provider name">
                <Input
                  id="customProvider"
                  value={customProvider}
                  onChange={(e) => setCustomProvider(e.target.value)}
                  placeholder="Enter provider name"
                  className={inputClass}
                />
              </Field>
            )}

            <Field label="Completion date">
              <Input
                id="completedDate"
                type="date"
                value={completedDate}
                onChange={(e) => setCompletedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className={inputClass}
              />
            </Field>

            <Field label="Additional notes (optional)">
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional details about the training..."
                rows={2}
                className={textareaClass}
              />
            </Field>
          </FormCard>
        </div>

        <div className="flex gap-3">
          <SecondaryButton onClick={() => onOpenChange(false)} disabled={isSubmitting} fullWidth>
            Cancel
          </SecondaryButton>
          <PrimaryButton
            onClick={handleSubmit}
            disabled={isSubmitting || !trainingName || (trainingName === 'Other' && !customTraining)}
            fullWidth
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Send Request
              </>
            )}
          </PrimaryButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
