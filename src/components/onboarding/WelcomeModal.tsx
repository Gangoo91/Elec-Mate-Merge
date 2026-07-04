import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageSetSync } from '@/utils/storage';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useAuth } from '@/contexts/AuthContext';
import { trackFeatureUse } from '@/components/ActivityTracker';
import { cn } from '@/lib/utils';
import {
  Bot,
  Building2,
  ChevronRight,
  Clock,
  Compass,
  FileCheck,
  GraduationCap,
  ReceiptText,
  Users,
  Zap,
} from 'lucide-react';

/**
 * First-run intent question. One tap drops the user into the flow they came
 * for — a person who picked a goal activates at multiples of one who was
 * given a feature tour. The chosen intent is logged to user_events so we can
 * measure which first jobs convert.
 *
 * Every route here is a live, verified route — check the route files before
 * changing any `to` value.
 */

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IntentOption {
  key: string;
  icon: typeof Zap;
  label: string;
  desc: string;
  to: string;
}

const INTENTS: Record<string, IntentOption[]> = {
  electrician: [
    {
      key: 'certificate',
      icon: FileCheck,
      label: 'I’ve got a cert to do',
      desc: 'EICR, EIC, Minor Works — start it now',
      to: '/electrician/inspection-testing/new',
    },
    {
      key: 'quote',
      icon: ReceiptText,
      label: 'I’ve got a quote to send',
      desc: 'Build and send a branded quote',
      to: '/electrician/quote-builder/create',
    },
    {
      key: 'tools',
      icon: Bot,
      label: 'Show me the AI & calculators',
      desc: 'Board scanner, cost engineer, 70+ calcs',
      to: '/electrician',
    },
    {
      key: 'browse',
      icon: Compass,
      label: 'Just having a look around',
      desc: 'Start at the dashboard',
      to: '/dashboard',
    },
  ],
  apprentice: [
    {
      key: 'am2',
      icon: Zap,
      label: 'Preparing for my AM2',
      desc: 'The simulator with a real MFT dial',
      to: '/apprentice/am2-simulator',
    },
    {
      key: 'revision',
      icon: GraduationCap,
      label: 'Revising for exams',
      desc: 'Courses, quizzes and mock exams',
      to: '/study-centre/apprentice',
    },
    {
      key: 'ojt',
      icon: Clock,
      label: 'Logging OJT hours & portfolio',
      desc: 'Off-the-job hours and evidence',
      to: '/apprentice/ojt-hub',
    },
    {
      key: 'browse',
      icon: Compass,
      label: 'Just having a look around',
      desc: 'Start at the dashboard',
      to: '/dashboard',
    },
  ],
  employer: [
    {
      key: 'team',
      icon: Users,
      label: 'Set up my team',
      desc: 'Add your sparks and assign work',
      to: '/employer',
    },
    {
      key: 'jobs',
      icon: Building2,
      label: 'Manage jobs & compliance',
      desc: 'Job packs, timesheets, safety',
      to: '/employer',
    },
    {
      key: 'browse',
      icon: Compass,
      label: 'Just having a look around',
      desc: 'Start at the dashboard',
      to: '/dashboard',
    },
  ],
};

const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const { profile, user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [choosing, setChoosing] = useState<string | null>(null);

  const role = (profile?.role || 'electrician') as keyof typeof INTENTS;
  const options = INTENTS[role] || INTENTS.electrician;

  const completeOnboarding = async () => {
    storageSetSync('elec-mate-onboarding-done', 'true');
    if (user) {
      try {
        await updateProfile(user.id, { onboarding_completed: true });
      } catch (error) {
        console.error('Error completing onboarding:', error);
      }
    }
  };

  const choose = async (option: IntentOption) => {
    if (choosing) return;
    setChoosing(option.key);
    if (user) {
      trackFeatureUse(user.id, 'onboarding_intent', { intent: option.key, role });
    }
    await completeOnboarding();
    onClose();
    if (option.to !== '/dashboard') navigate(option.to);
    setChoosing(null);
  };

  const handleSkip = async () => {
    if (user) {
      trackFeatureUse(user.id, 'onboarding_intent', { intent: 'dismissed', role });
    }
    await completeOnboarding();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleSkip}>
      <DialogContent className="max-w-md gap-0 overflow-hidden border-white/10 bg-[#101010] p-0 sm:max-w-lg">
        <VisuallyHidden>
          <DialogTitle>What's on this week?</DialogTitle>
          <DialogDescription>
            Pick what you came to do and we'll take you straight there.
          </DialogDescription>
        </VisuallyHidden>

        {/* Header */}
        <div className="relative px-6 pb-5 pt-8 text-center sm:px-8">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/70 to-elec-yellow/0"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-500/25 bg-yellow-500/[0.08] px-3 py-1 text-[11px] font-semibold text-yellow-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-400" />
            Trial active — £0 today
          </span>
          <h2 className="mt-4 text-[1.6rem] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[1.8rem]">
            What's on <span className="text-yellow-400">this week?</span>
          </h2>
          <p className="mx-auto mt-2 max-w-[24rem] text-[13.5px] leading-[1.6] text-white/65">
            Pick one and we'll take you straight there — everything's unlocked.
          </p>
        </div>

        {/* Intent options */}
        <div className="space-y-2.5 px-6 pb-4 sm:px-8">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => choose(option)}
              disabled={!!choosing}
              className={cn(
                'group flex w-full touch-manipulation items-center gap-3.5 rounded-2xl border p-4 text-left transition-all duration-150',
                choosing === option.key
                  ? 'border-yellow-400/60 bg-yellow-500/[0.10]'
                  : 'border-white/[0.10] bg-white/[0.03] hover:border-yellow-400/40 hover:bg-white/[0.05] active:scale-[0.99]'
              )}
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-yellow-500/25 bg-yellow-500/[0.12]">
                <option.icon className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14.5px] font-semibold leading-tight text-white">
                  {option.label}
                </p>
                <p className="mt-0.5 text-[12px] text-white/60">{option.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 flex-shrink-0 text-white/40 transition-colors group-hover:text-yellow-400" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-1 sm:px-8">
          <p className="text-center text-[11px] text-white/45">
            7 days free · no charge until day 8 · cancel anytime
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
