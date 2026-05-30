import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  SheetShell,
  Field,
  Eyebrow,
  PrimaryButton,
  inputClass,
} from '@/components/college/primitives';
import { SignatureField } from '../common/SignatureField';
import { useUpdateIsolationRecord } from '@/hooks/useSafeIsolationRecords';
import { toast } from 'sonner';

// ─── Checklist Items ───

const CHECKLIST_ITEMS = [
  {
    id: 'work_complete',
    label: 'All work is complete and tested',
  },
  {
    id: 'tools_removed',
    label: 'All tools and materials removed from work area',
  },
  {
    id: 'covers_replaced',
    label: 'All covers, guards, and barriers replaced',
  },
  {
    id: 'lock_off_removed',
    label: 'Lock-off device and warning notices removed',
  },
  {
    id: 'voltage_confirmed',
    label: 'Voltage indicator tested — circuit confirmed live after re-energisation',
  },
] as const;

// ─── Component ───

interface ReEnergisationSheetProps {
  recordId: string;
  open?: boolean;
  onComplete: () => void;
  onOpenChange?: (open: boolean) => void;
}

export function ReEnergisationSheet({
  recordId,
  open,
  onComplete,
  onOpenChange,
}: ReEnergisationSheetProps) {
  const updateMutation = useUpdateIsolationRecord();

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    work_complete: false,
    tools_removed: false,
    covers_replaced: false,
    lock_off_removed: false,
    voltage_confirmed: false,
  });
  const [name, setName] = useState('');
  const [signature, setSignature] = useState('');

  const allChecked = CHECKLIST_ITEMS.every((item) => checklist[item.id]);
  const canConfirm = allChecked && name.trim().length > 0;

  const handleToggle = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleConfirm = async () => {
    try {
      await updateMutation.mutateAsync({
        id: recordId,
        status: 're_energised',
        re_energisation_at: new Date().toISOString(),
        re_energisation_by: name.trim(),
      });
      toast.success('Circuit re-energised successfully');
      // Reset form
      setChecklist({
        work_complete: false,
        tools_removed: false,
        covers_replaced: false,
        lock_off_removed: false,
        voltage_confirmed: false,
      });
      setName('');
      setSignature('');
      onComplete();
    } catch {
      toast.error('Failed to update record. Please try again.');
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.08]">
        <SheetShell
          eyebrow="GS38 safe isolation"
          title="Re-energise circuit"
          description="Complete all checks before restoring power."
          footer={
            <PrimaryButton
              fullWidth
              size="lg"
              onClick={handleConfirm}
              disabled={!canConfirm || updateMutation.isPending}
            >
              {updateMutation.isPending ? 'Updating…' : 'Confirm re-energisation'}
            </PrimaryButton>
          }
        >
          {/* Warning banner */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-amber-500/25 bg-amber-500/[0.06] p-4 space-y-1"
          >
            <Eyebrow className="text-amber-300/90">Safety warning</Eyebrow>
            <p className="text-xs text-white/70 leading-relaxed">
              Verify all personnel are clear of the circuit before re-energising. Ensure all work
              has been completed and tested.
            </p>
          </motion.div>

          {/* Checklist */}
          <div className="space-y-2">
            <Eyebrow>Pre-energisation checklist</Eyebrow>
            {CHECKLIST_ITEMS.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleToggle(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 p-3.5 rounded-xl border text-left touch-manipulation active:scale-[0.99] transition-all',
                  checklist[item.id]
                    ? 'bg-emerald-500/[0.06] border-emerald-500/25'
                    : 'bg-[hsl(0_0%_10%)] border-white/[0.08]'
                )}
              >
                <span
                  className={cn(
                    'h-5 w-5 rounded-full border flex items-center justify-center shrink-0 text-[11px] leading-none',
                    checklist[item.id]
                      ? 'bg-emerald-500 border-emerald-500 text-black'
                      : 'border-white/25 text-transparent'
                  )}
                >
                  ✓
                </span>
                <span className="text-[13px] text-white/90">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Name / Signature */}
          <div className="space-y-3">
            <Eyebrow>Re-energised by</Eyebrow>
            <SignatureField label="Signature" value={signature} onChange={setSignature} />
            <Field label="Full name" required>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Enter your full name"
              />
            </Field>
          </div>

          {/* Completion state */}
          {allChecked && name.trim() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.06] p-3"
            >
              <p className="text-xs text-emerald-400 font-medium">
                All checks complete. Ready to re-energise.
              </p>
            </motion.div>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

export default ReEnergisationSheet;
