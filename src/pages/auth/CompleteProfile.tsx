import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Check,
  GraduationCap,
  Sparkles,
  UserCircle,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

const roleOptions = [
  {
    value: 'electrician',
    label: 'Electrician',
    icon: Zap,
    description: 'Run jobs, paperwork and tools in one place',
  },
  {
    value: 'apprentice',
    label: 'Apprentice',
    icon: GraduationCap,
    description: 'Study, track progress and build confidence',
  },
  {
    value: 'employer',
    label: 'Employer',
    icon: Building2,
    description: 'See standards, team activity and compliance clearly',
  },
];

const CompleteProfile = () => {
  const { user, fetchProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      if (fetchProfile) {
        await fetchProfile();
      }

      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-[100svh] bg-[#0a0a0a]"
      style={{
        background:
          'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(250,204,21,0.07) 0%, transparent 58%), #0a0a0a',
      }}
    >
      <div className="mx-auto grid min-h-[100svh] max-w-[1100px] items-stretch px-5 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-[calc(env(safe-area-inset-top)+24px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8">
        <div className="hidden lg:flex lg:flex-col lg:justify-between lg:py-10">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Elec-Mate" className="h-11 w-11 rounded-xl object-cover" />
              <span className="text-[22px] font-bold tracking-tight text-white">
                Elec-<span className="text-yellow-400">Mate</span>
              </span>
            </Link>

            <div className="mt-14 max-w-[28rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-yellow-300">
                <Sparkles className="h-3.5 w-3.5" />
                Final setup step
              </div>
              <h1 className="mt-6 text-[4rem] font-bold leading-[0.95] tracking-[-0.05em] text-white">
                Tell us who the platform is for.
              </h1>
              <p className="mt-5 max-w-[25rem] text-base leading-8 text-white/72">
                This lets us shape the first experience around the work you actually need to do.
              </p>
            </div>
          </div>

          <div className="grid gap-4 border-t border-white/10 pt-6 text-sm leading-7 text-white/72">
            <div>One final choice before the dashboard</div>
            <div>This sets your default experience and tools</div>
            <div>You can move straight into the platform after this</div>
          </div>
        </div>

        <div className="flex flex-col justify-center py-8 lg:py-10">
          <div className="mx-auto w-full max-w-[460px]">
            <div className="mb-10 flex items-center justify-center gap-3 lg:hidden">
              <img src="/logo.jpg" alt="" className="h-10 w-10 rounded-xl object-cover" />
              <span className="text-[20px] font-bold tracking-tight text-white">
                Elec-<span className="text-yellow-400">Mate</span>
              </span>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-8">
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-elec-yellow/10">
                  <UserCircle className="h-7 w-7 text-elec-yellow" />
                </div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-yellow-300/78">
                  Role selector
                </p>
                <h1 className="mt-3 text-[30px] font-bold tracking-[-0.04em] text-white">
                  Choose your role
                </h1>
                <p className="mt-3 text-[14px] leading-7 text-white/68">
                  We will use this to tailor your dashboard and first actions.
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-4"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-300" />
                    <p className="text-[14px] font-medium text-yellow-100">{error}</p>
                  </div>
                </motion.div>
              )}

              <div className="space-y-3">
                {roleOptions.map((option) => {
                  const selected = selectedRole === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedRole(option.value)}
                      className={cn(
                        'w-full rounded-2xl border p-4 text-left transition-all',
                        selected
                          ? 'border-elec-yellow bg-elec-yellow/10 shadow-[0_0_0_4px_rgba(255,209,0,0.08)]'
                          : 'border-white/12 bg-white/[0.03] hover:border-white/22'
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            'flex h-12 w-12 items-center justify-center rounded-xl',
                            selected ? 'bg-elec-yellow/18' : 'bg-white/8'
                          )}
                        >
                          <option.icon
                            className={cn(
                              'h-6 w-6',
                              selected ? 'text-elec-yellow' : 'text-white/82'
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <span className="block text-[16px] font-semibold text-white">{option.label}</span>
                          <span className="mt-1 block text-[13px] text-white/62">{option.description}</span>
                        </div>
                        {selected && <Check className="h-5 w-5 text-elec-yellow" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!selectedRole || isSubmitting}
                className="mt-6 h-14 w-full rounded-2xl bg-elec-yellow text-[16px] font-semibold text-black shadow-lg shadow-elec-yellow/20 transition-all hover:bg-elec-yellow/90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>Saving...</>
                ) : (
                  <>
                    Continue to dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
