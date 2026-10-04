import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import { useHaptic } from '@/hooks/useHaptic';
import { CARD_BASE, CARD_NEUTRAL, CARD_PRIMARY } from '@/components/ui/card-recipe';
import { buttonPrimaryCn } from '@/components/forms/fieldStyles';
import { Section, ShellFooter } from '@/components/auth/SignupShell';
import { AuthFrame, AuthHeading } from '@/components/auth/AuthFrame';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

// Volt hub cards, no icons (2 Oct 2026) — same choice as the sign-up plan cards.
const roleOptions = [
  {
    value: 'electrician',
    label: 'Electrician',
    description: 'Run jobs, paperwork and tools in one place.',
  },
  {
    value: 'apprentice',
    label: 'Apprentice',
    description: 'Study, track progress and build confidence.',
  },
  {
    value: 'employer',
    label: 'Employer',
    description: 'See standards, team activity and compliance.',
  },
];

const CompleteProfile = () => {
  const { user, fetchProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const haptic = useHaptic();

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError('Please select your role');
      return;
    }

    if (!user?.id) {
      setError('Please sign in to continue');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          role: selectedRole,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) {
        setError('Failed to save your profile. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // fetchProfile needs the id. Called bare it fetched nothing, the role in
      // context stayed empty, and Dashboard's "no role" safety net sent the
      // user straight back here — a loop (found 2 Oct 2026).
      if (fetchProfile) {
        await fetchProfile(user.id);
      }

      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFrame
      panel={{
        headline: (
          <>
            One last thing, <span className="text-elec-yellow">then you're in.</span>
          </>
        ),
      }}
      footer={
        <ShellFooter>
          <button
            type="button"
            onClick={() => {
              haptic.light();
              void handleSubmit();
            }}
            disabled={!selectedRole || isSubmitting}
            className={cn(buttonPrimaryCn, 'flex w-full items-center justify-center')}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
              </>
            ) : (
              'Continue to dashboard'
            )}
          </button>
        </ShellFooter>
      }
    >
      <div className="space-y-6">
        <AuthHeading
          title="What best describes you?"
          sub="We use this to set up your dashboard and tools."
        />
        <Section>
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-400/40 bg-red-500/[0.10] px-4 py-3"
            >
              <p className="text-[13.5px] font-medium text-red-200">{error}</p>
            </div>
          )}
          <div
            role="radiogroup"
            aria-label="Your role"
            className="grid grid-cols-2 gap-2.5 [&>*:last-child]:col-span-2"
          >
            {roleOptions.map((option) => {
              const selected = selectedRole === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => {
                    haptic.light();
                    setSelectedRole(option.value);
                    setError(null);
                  }}
                  className={cn(
                    CARD_BASE,
                    selected ? CARD_PRIMARY : CARD_NEUTRAL,
                    'relative min-h-[112px] overflow-hidden p-4'
                  )}
                >
                  {!selected && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
                    />
                  )}
                  <span
                    className={cn(
                      'text-[17px] font-bold leading-tight tracking-tight',
                      selected ? 'text-black' : 'text-white group-hover:text-elec-yellow'
                    )}
                  >
                    {option.label}
                  </span>
                  <span
                    className={cn(
                      'mt-1 text-[12px] leading-snug',
                      selected ? 'text-black' : 'text-white'
                    )}
                  >
                    {option.description}
                  </span>
                </button>
              );
            })}
          </div>
        </Section>
      </div>
    </AuthFrame>
  );
};

export default CompleteProfile;
