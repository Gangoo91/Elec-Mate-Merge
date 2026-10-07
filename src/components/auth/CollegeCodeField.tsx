import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { buttonSecondaryCn, inputCn, labelCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { describeJoinCode, type JoinCodeInfo } from '@/lib/collegeInvite';

export type { JoinCodeInfo };

/* ==========================================================================
   CollegeCodeField — ELE-1899. One box on the sign-up page for whatever code
   the college gave the learner:

     - a cohort JOIN code (college_invites): kept until the account exists,
       then PendingCollegeInviteRedeemer enrols them; and if Elec-Mate has
       linked the college to a discount (college_signup_offers), that
       discount is applied too, so the learner only ever types one code;
     - a DISCOUNT code (promo_offers): applied as if it came in the link.

   The two codes stay separate in the data; only the experience is joined.
   describe_join_code is callable signed out and reveals only the college
   and cohort names and the discount code for a live learner code.
   ========================================================================== */

export function CollegeCodeField({
  onJoin,
  onDiscount,
}: {
  onJoin: (info: JoinCodeInfo) => void;
  /** A discount code typed here: valid per describe-offer. */
  onDiscount: (code: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apply = async () => {
    const code = value.trim().toUpperCase().replace(/\s/g, '');
    if (code.length < 4) {
      setError('Enter the code your college gave you.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const info = await describeJoinCode(code);
      if (info) {
        onJoin(info);
        return;
      }
      // Not a join code: is it a discount code?
      const { data } = await supabase.functions.invoke('describe-offer', { body: { code } });
      if ((data as { valid?: boolean } | null)?.valid) {
        onDiscount(code);
        return;
      }
      setError('That code was not recognised. Check it with your college.');
    } finally {
      setBusy(false);
    }
  };

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="-ml-1 h-11 touch-manipulation px-1 text-[13px] font-semibold text-elec-yellow"
      >
        Got a code from your college?
      </button>
    );
  }
  return (
    <div className="space-y-1.5">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label htmlFor="college-code" className={labelCn}>
            College or cohort code
          </label>
          <input
            id="college-code"
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value.toUpperCase());
              setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                void apply();
              }
            }}
            placeholder="AB12CD34"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            className={cn(inputCn, 'tracking-wider')}
          />
        </div>
        <button type="button" onClick={() => void apply()} disabled={busy} className={cn(buttonSecondaryCn, 'px-5')}>
          {busy ? 'Checking…' : 'Apply'}
        </button>
      </div>
      {error ? (
        <p className="text-[12.5px] font-medium text-orange-300">{error}</p>
      ) : (
        <p className="text-[12px] text-white">Your cohort join code, or your college discount code. Either works here.</p>
      )}
    </div>
  );
}
