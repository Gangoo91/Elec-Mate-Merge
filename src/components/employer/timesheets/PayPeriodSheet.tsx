/**
 * Pay period and payday sheet (ELE-2009) — opened from Timesheets → Payroll
 * file. Owner/admin only: the caller hides the entry point from office
 * managers and set_firm_pay_settings refuses them too.
 */
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  useFirmPaySettings,
  useOfficeFirmId,
  useSetFirmPaySettings,
} from '@/hooks/useFirmPaySettings';
import { PayPeriodFields } from '@/components/employer/timesheets/PayPeriodFields';
import {
  draftFromSettings,
  draftsEqual,
  draftValid,
  type PayDraft,
} from '@/components/employer/timesheets/payDraft';
import { FormCard, PrimaryButton, SecondaryButton, SheetShell } from '@/components/employer/editorial';

export function PayPeriodSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const { data: firmId } = useOfficeFirmId();
  const { data: settings, isLoading } = useFirmPaySettings(firmId);
  const save = useSetFirmPaySettings();
  const [draft, setDraft] = useState<PayDraft>(() => draftFromSettings(null));

  useEffect(() => {
    if (open) setDraft(draftFromSettings(settings));
  }, [open, settings]);

  const changed = !draftsEqual(draft, draftFromSettings(settings));
  const valid = draftValid(draft);

  const onSave = async () => {
    if (!firmId) return;
    const monthly = draft.frequency === 'monthly';
    try {
      await save.mutateAsync({
        firmId,
        frequency: draft.frequency,
        anchor: draft.frequency ? draft.anchor : null,
        offsetDays: draft.frequency && !monthly ? draft.offsetDays : null,
        dayOfMonth: monthly ? draft.dayOfMonth : null,
        nextMonth: monthly ? draft.nextMonth : null,
      });
      toast.success(draft.frequency ? 'Pay period saved' : 'Pay period cleared');
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not save');
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={
          isMobile
            ? 'h-[85vh] p-0 rounded-t-2xl overflow-hidden border-t border-white/[0.06]'
            : 'w-full sm:max-w-xl p-0 border-l border-white/[0.06]'
        }
      >
        <SheetTitle className="sr-only">Pay period and payday</SheetTitle>
        <SheetShell
          eyebrow="Payroll"
          title="Pay period and payday"
          description="Each worker sees this on My pay with an estimate of their pay for the period."
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                disabled={!changed || !valid || save.isPending || !settings?.has_profile}
                onClick={onSave}
              >
                {save.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save
              </PrimaryButton>
            </>
          }
        >
          {isLoading || !firmId ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          ) : (
            <FormCard bleed className="-mx-5 sm:mx-0">
              <PayPeriodFields value={draft} onChange={setDraft} />
              {!settings?.has_profile && (
                <p className="text-[12.5px] leading-snug text-orange-300">
                  Set up your company profile first, then this can be saved.
                </p>
              )}
            </FormCard>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
