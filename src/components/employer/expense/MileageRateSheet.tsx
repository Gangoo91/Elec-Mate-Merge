/**
 * The firm's mileage rate for worker claims (ELE-2001). Owner/admin only
 * (set_firm_mileage_rate). Default is the HMRC approved rate — 45p a mile for
 * the first 10,000 business miles in a tax year, 25p after — and it is only
 * ever called that when it IS that.
 */
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import {
  HMRC_MILEAGE,
  useFirmPaySettings,
  useOfficeFirmId,
  useSetFirmMileageRate,
} from '@/hooks/useFirmPaySettings';
import { FormCard, PrimaryButton, SecondaryButton, SheetShell } from '@/components/employer/editorial';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

export function MileageRateSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const { data: firmId } = useOfficeFirmId();
  const { data: settings, isLoading } = useFirmPaySettings(firmId);
  const save = useSetFirmMileageRate();
  const current = settings?.mileage_rate_pence ?? null;

  const [hmrc, setHmrc] = useState(true);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!open) return;
    setHmrc(current == null);
    setText(current == null ? '' : String(current));
  }, [open, current]);

  const pence = parseFloat(text);
  const validOwn = Number.isFinite(pence) && pence > 0 && pence <= 100;
  const next = hmrc ? null : validOwn ? Math.round(pence * 100) / 100 : undefined;
  const changed = next !== undefined && next !== current;

  const onSave = async () => {
    if (!firmId || next === undefined) return;
    try {
      await save.mutateAsync({ firmId, pence: next });
      toast.success(next == null ? 'Mileage at the HMRC approved rate' : `Mileage set to ${next}p a mile`);
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
        <SheetTitle className="sr-only">Mileage rate</SheetTitle>
        <SheetShell
          eyebrow="Expenses"
          title="Mileage rate"
          description="What a mile is worth when your team claims mileage. Worked out on the server, so a claim can't be typed in at the wrong rate."
          footer={
            <>
              <SecondaryButton fullWidth onClick={() => onOpenChange(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                fullWidth
                disabled={!changed || save.isPending || !settings?.has_profile}
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
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  aria-pressed={hmrc}
                  onClick={() => setHmrc(true)}
                  className={cn('h-11 rounded-full border text-[13px] touch-manipulation', hmrc ? chipOn : chipOff)}
                >
                  HMRC approved rate
                </button>
                <button
                  type="button"
                  aria-pressed={!hmrc}
                  onClick={() => setHmrc(false)}
                  className={cn('h-11 rounded-full border text-[13px] touch-manipulation', !hmrc ? chipOn : chipOff)}
                >
                  Our own rate
                </button>
              </div>
              {hmrc ? (
                <p className="text-[13px] leading-snug text-white">
                  {HMRC_MILEAGE.firstPence}p a mile for each person&rsquo;s first{' '}
                  {HMRC_MILEAGE.thresholdMiles.toLocaleString('en-GB')} business miles in the tax
                  year (from 6 April), then {HMRC_MILEAGE.afterPence}p. Paid at this rate there is
                  no tax or National Insurance on it.
                </p>
              ) : (
                <div>
                  <label className={labelCn} htmlFor="mileage-pence">
                    Pence per mile
                  </label>
                  <input
                    id="mileage-pence"
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min="1"
                    max="100"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="e.g. 40"
                    className={cn(inputCn, 'tabular-nums')}
                  />
                  <p className="mt-1.5 text-[12px] leading-snug text-white">
                    One flat rate for every mile. Above {HMRC_MILEAGE.firstPence}p (or{' '}
                    {HMRC_MILEAGE.afterPence}p after {HMRC_MILEAGE.thresholdMiles.toLocaleString('en-GB')} miles) the extra is
                    taxable, so check with your accountant.
                  </p>
                </div>
              )}
              <p className="border-t border-white/[0.1] pt-3 text-[12.5px] leading-snug text-white">
                New claims use the new rate. Claims already sent keep the amount they were sent
                with until the worker changes them.
              </p>
            </FormCard>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
