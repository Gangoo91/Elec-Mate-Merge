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
import { toast } from '@/hooks/use-toast';
import { FileText, Building, Send, Shield, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  TextAction,
  fieldLabelClass,
  inputClass,
  textareaClass,
  checkboxClass,
} from '@/components/employer/editorial';

interface TrainingRecord {
  id: string;
  name: string;
  provider: string;
  fundedBy?: string;
  completedDate: string;
  hasDocument: boolean;
}

interface RequestTrainingTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profileName: string;
  trainingRecords: TrainingRecord[];
}

export const RequestTrainingTransferDialog = ({
  open,
  onOpenChange,
  profileName,
  trainingRecords,
}: RequestTrainingTransferDialogProps) => {
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [employerEmail, setEmployerEmail] = useState('');
  const [message, setMessage] = useState(
    `Dear Former Employer,\n\nI am writing to request copies of training certificates completed during my employment with your company.\n\nUnder data protection regulations, I am entitled to copies of my personal training records.\n\nThank you for your assistance.`
  );

  const handleToggleRecord = (id: string) => {
    setSelectedRecords((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedRecords.length === trainingRecords.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(trainingRecords.map((r) => r.id));
    }
  };

  const handleSendRequest = () => {
    if (selectedRecords.length === 0) {
      toast({
        title: 'No Records Selected',
        description: 'Please select at least one training record to request.',
        variant: 'destructive',
      });
      return;
    }

    if (!employerEmail) {
      toast({
        title: 'Email Required',
        description: "Please enter the employer's email address.",
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Request Sent',
      description: `Training transfer request sent to ${employerEmail} for ${selectedRecords.length} record(s).`,
    });

    setSelectedRecords([]);
    setEmployerEmail('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto p-6 bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-white">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Request training transfer
          </DialogTitle>
          <DialogDescription className="text-white">
            Request training certificates from previous employers for {profileName}'s Elec-ID.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-elec-yellow/5 border border-elec-yellow/20 rounded-2xl p-4 flex items-start gap-3">
            <Shield className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-semibold text-white">Your training, your records</p>
              <p className="mt-1 text-[12px] text-white">
                Under GDPR and data protection law, you have the right to request copies of training
                records completed during your employment. These belong to you.
              </p>
            </div>
          </div>

          <FormCard eyebrow="Records to request">
            <div className="flex items-center justify-between">
              <label className={fieldLabelClass}>Select training records</label>
              <TextAction onClick={handleSelectAll}>
                {selectedRecords.length === trainingRecords.length ? 'Deselect all' : 'Select all'}
              </TextAction>
            </div>

            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {trainingRecords.length === 0 ? (
                <p className="text-[12px] text-white text-center py-4">
                  No training records available to request
                </p>
              ) : (
                trainingRecords.map((record) => {
                  const selected = selectedRecords.includes(record.id);
                  return (
                    <div
                      key={record.id}
                      className={cn(
                        'flex items-center gap-3 p-2.5 rounded-xl border transition-colors cursor-pointer touch-manipulation',
                        selected
                          ? 'border-elec-yellow/60 bg-elec-yellow/5'
                          : 'border-white/[0.06] bg-[hsl(0_0%_9%)] hover:border-elec-yellow/30'
                      )}
                      onClick={() => handleToggleRecord(record.id)}
                    >
                      <Checkbox
                        checked={selected}
                        onCheckedChange={() => handleToggleRecord(record.id)}
                        className={checkboxClass}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-medium text-white truncate">{record.name}</p>
                        <p className="text-[11px] text-white flex items-center gap-1.5 mt-0.5">
                          <Building className="h-3 w-3" />
                          {record.provider}
                          <span>·</span>
                          {new Date(record.completedDate).toLocaleDateString('en-GB', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                      {!record.hasDocument && (
                        <AlertCircle className="h-4 w-4 text-amber-400 flex-shrink-0" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <p className="text-[11px] text-white">
              <AlertCircle className="h-3 w-3 inline mr-1" />
              Records without certificates are marked with a warning icon
            </p>
          </FormCard>

          <FormCard eyebrow="Message">
            <Field label="Former employer email" required>
              <Input
                type="email"
                placeholder="hr@formeremployer.com"
                value={employerEmail}
                onChange={(e) => setEmployerEmail(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Request message">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className={`${textareaClass} min-h-[140px]`}
              />
            </Field>
          </FormCard>
        </div>

        <DialogFooter className="gap-2 sm:gap-2">
          <SecondaryButton onClick={() => onOpenChange(false)}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleSendRequest}>
            <Send className="h-4 w-4 mr-1.5" />
            Send request
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
