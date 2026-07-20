import { useState } from 'react';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
} from '@/components/ui/responsive-form-modal';
import { toast } from '@/hooks/use-toast';
import {
  DestructiveButton,
  Field,
  SecondaryButton,
  textareaClass,
} from '@/components/employer/editorial';

interface RejectCandidateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidateName: string;
  /** Must throw on a failed write — the dialog only closes on success. */
  onConfirm: (reason: string) => Promise<void>;
}

/**
 * Destructive confirm for rejecting a candidate, with an optional private
 * reason. The reason is appended to the employer's notes on the application —
 * the candidate only ever receives the standard "not successful" update.
 */
export function RejectCandidateDialog({
  open,
  onOpenChange,
  candidateName,
  onConfirm,
}: RejectCandidateDialogProps) {
  const [reason, setReason] = useState('');
  const [pending, setPending] = useState(false);

  const handleConfirm = async () => {
    setPending(true);
    try {
      await onConfirm(reason.trim());
      setReason('');
      onOpenChange(false);
    } catch {
      toast({
        title: 'Could not reject candidate',
        description: 'Nothing was changed — please try again.',
        variant: 'destructive',
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <ResponsiveFormModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveFormModalContent className="bg-[hsl(0_0%_8%)] border-white/[0.08]">
        <ResponsiveFormModalHeader>
          <ResponsiveFormModalTitle className="text-white">
            Reject candidate
          </ResponsiveFormModalTitle>
        </ResponsiveFormModalHeader>

        <ResponsiveFormModalBody className="pb-6">
          <div className="space-y-4">
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-3">
              <p className="text-[11px] text-white uppercase tracking-[0.14em]">Rejecting</p>
              <p className="mt-1 text-[15px] font-semibold text-white">{candidateName}</p>
            </div>

            <Field
              label="Reason (optional)"
              hint="Kept in your private notes — the candidate only receives a standard update."
            >
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Not enough commercial experience"
                rows={3}
                className={textareaClass}
              />
            </Field>

            <div className="flex gap-2 pt-1">
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth disabled={pending}>
                Cancel
              </SecondaryButton>
              <DestructiveButton onClick={handleConfirm} fullWidth disabled={pending}>
                {pending ? 'Rejecting…' : 'Reject candidate'}
              </DestructiveButton>
            </div>
          </div>
        </ResponsiveFormModalBody>
      </ResponsiveFormModalContent>
    </ResponsiveFormModal>
  );
}
