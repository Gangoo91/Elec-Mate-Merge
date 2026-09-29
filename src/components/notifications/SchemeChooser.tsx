import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { useToast } from '@/hooks/use-toast';
import { SCHEME_OPTIONS, saveRegistrationScheme, type SchemeValue } from '@/utils/notificationHelper';

/**
 * "Which scheme are you with?" — asked once, on the page, when the company
 * profile doesn't say. 56 of the 86 electricians with tracker rows had no
 * scheme on their profile, so the page showed them "Find your council" and
 * preselected Building Control on submit; almost all of them are NAPIT or
 * NICEIC members. One tap fixes the portal button, the submit sheet and the
 * guidance, and it is saved to the profile so Settings agrees.
 */
interface Props {
  onChosen: (value: SchemeValue) => void;
}

const chipCn =
  'flex h-11 items-center justify-center rounded-xl border text-[13px] font-semibold text-white transition-all touch-manipulation active:scale-[0.98] border-white/[0.14] bg-white/[0.05] hover:bg-white/[0.09] disabled:opacity-60';

export const SchemeChooser = ({ onChosen }: Props) => {
  const haptic = useHaptic();
  const { toast } = useToast();
  const [saving, setSaving] = useState<SchemeValue | null>(null);

  const choose = async (value: SchemeValue) => {
    haptic.light();
    setSaving(value);
    const res = await saveRegistrationScheme(value);
    setSaving(null);
    if (!res.ok) {
      toast({ title: 'Could not save', description: res.error, variant: 'destructive' });
      return;
    }
    onChosen(value);
  };

  return (
    <div className="-mx-4 border-y border-elec-yellow/40 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5">
      <p className="text-[13.5px] font-semibold tracking-tight text-white">Which scheme are you registered with?</p>
      <p className="mt-0.5 text-[12.5px] leading-snug text-white">
        Sets the portal button and how "submitted" is recorded. Saved to your company profile.
      </p>
      <div className={cn('mt-3 grid gap-2', 'grid-cols-2 sm:grid-cols-4')}>
        {SCHEME_OPTIONS.map((o) => (
          <button
            key={o.value}
            type="button"
            disabled={saving !== null}
            onClick={() => choose(o.value)}
            className={cn(chipCn, saving === o.value && 'border-elec-yellow')}
          >
            {saving === o.value ? 'Saving…' : o.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SchemeChooser;
