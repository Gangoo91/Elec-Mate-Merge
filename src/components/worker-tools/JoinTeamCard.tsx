import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Clock, FileText, Loader2, Check } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Eyebrow,
  Divider,
  PrimaryButton,
  inputClass,
} from '@/components/employer/editorial';

/* ==========================================================================
   JoinTeamCard — worker-side entry to redeem an employer invite code.

   Mirrors the College Hub onboarding (JoinCollegeCard / accept_college_invite):
   the employer mints a team code, the worker enters it here, and
   accept_employer_invite links their pre-added roster row (by email) or
   creates one. Shown in Worker Tools only when the user has no team link.
   ========================================================================== */

interface Props {
  onJoined?: () => void;
}

const PERKS: { icon: typeof Briefcase; label: string; sub: string }[] = [
  { icon: Briefcase, label: 'Your assigned jobs', sub: 'See where you’re booked' },
  { icon: Clock, label: 'Clock in & out on site', sub: 'Live hours, no paperwork' },
  { icon: FileText, label: 'Timesheets, leave & expenses', sub: 'Submit straight to your employer' },
];

const MIN_CODE_LENGTH = 4;

export function JoinTeamCard({ onJoined }: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [code, setCode] = useState('');
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [touched, setTouched] = useState(false);

  const trimmed = code.trim();
  const tooShort = trimmed.length > 0 && trimmed.length < MIN_CODE_LENGTH;
  const canJoin = trimmed.length >= MIN_CODE_LENGTH && !joining && !joined;
  // Inline guidance under the field — only after the worker has started typing.
  const fieldError = touched && tooShort ? 'Codes are at least 4 characters.' : null;

  const handleJoin = async () => {
    if (trimmed.length < MIN_CODE_LENGTH) {
      setTouched(true);
      toast({
        title: 'Enter your invite code',
        description: 'Ask your employer for the team invite code.',
        variant: 'destructive',
      });
      return;
    }

    setJoining(true);
    try {
      const { data, error } = await supabase.rpc('accept_employer_invite', {
        p_invite_code: trimmed,
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = data as any;
      if (error || result?.error) {
        throw new Error(result?.error || error?.message || 'Could not join');
      }

      queryClient.invalidateQueries({ queryKey: ['my-employee-record'] });
      queryClient.invalidateQueries({ queryKey: ['qs-team-context'] });
      setJoined(true);
      toast({
        title: result?.already_member ? 'Already on this team' : 'Welcome to the team',
        description: `You're linked to ${result?.company_name || 'your company'} — your jobs, clock-in and timesheets are live.`,
      });
      setCode('');
      onJoined?.();
    } catch (err) {
      toast({
        title: 'Could not join',
        description: err instanceof Error ? err.message : 'Check the code and try again.',
        variant: 'destructive',
      });
    } finally {
      setJoining(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] sm:bg-[hsl(0_0%_12%)]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-orange-400/70 opacity-70" />

      {/* Code entry — primary action, kept at the top for thumb reach */}
      <div className="px-4 pt-5 pb-4 sm:px-6 sm:pt-6">
        <label htmlFor="team-invite-code" className="block">
          <Eyebrow>Invite code</Eyebrow>
        </label>
        <input
          id="team-invite-code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onBlur={() => setTouched(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canJoin) handleJoin();
          }}
          placeholder="e.g. AB12CD"
          autoCapitalize="characters"
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="done"
          inputMode="text"
          aria-invalid={!!fieldError}
          aria-describedby={fieldError ? 'team-invite-code-error' : undefined}
          disabled={joining || joined}
          className={`${inputClass} mt-2.5 text-center text-lg font-semibold uppercase tracking-[0.3em] placeholder:tracking-normal placeholder:text-white/40 placeholder:font-normal placeholder:normal-case disabled:opacity-60 ${
            fieldError ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/15' : ''
          }`}
        />
        {fieldError && (
          <p
            id="team-invite-code-error"
            className="mt-2 text-[11.5px] text-red-400 leading-relaxed"
          >
            {fieldError}
          </p>
        )}

        <PrimaryButton
          onClick={handleJoin}
          disabled={!canJoin}
          fullWidth
          size="lg"
          className="mt-3.5"
        >
          {joined ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Linked
            </>
          ) : joining ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Linking your account…
            </>
          ) : (
            'Join team'
          )}
        </PrimaryButton>

        <p className="mt-3 text-[11.5px] text-white/60 text-center leading-relaxed">
          Added by email already? Signing in with that email links you automatically.
        </p>
      </div>

      <div className="px-4 sm:px-6">
        <Divider label="What you’ll unlock" />
      </div>

      {/* What you’ll unlock */}
      <div className="px-4 pt-3 pb-5 sm:px-6">
        <div className="divide-y divide-white/[0.06]">
          {PERKS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0">
              <div className="h-9 w-9 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 grid place-items-center shrink-0">
                <Icon className="h-4 w-4 text-elec-yellow" />
              </div>
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-white leading-tight">{label}</p>
                <p className="text-[11.5px] text-white/60 leading-tight mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default JoinTeamCard;
